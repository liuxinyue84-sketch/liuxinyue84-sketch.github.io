'use strict';
const { chromium } = require('/Users/liuxinyue/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const root=path.resolve(__dirname,'../evaluation');
 const siteUrl=process.env.V2_SITE_URL || `${pathToFileURL(path.resolve(__dirname,'../website/index.html')).href}#highlights`;
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const page=await browser.newPage({viewport:{width:1512,height:1000},deviceScaleFactor:1});
 const errors=[]; const requests=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error' && !m.text().includes('Failed to load resource: the server responded with a status of 404')) errors.push(m.text())});
 page.on('request',r=>requests.push(r.url()));
 await page.goto(siteUrl,{waitUntil:'networkidle'});
 if(!(await page.locator('#rag-results').isHidden())) throw new Error('The empty results area should be hidden before a question');
 if(await page.locator('#rag-prompt, #rag-prompt-details').count()) throw new Error('The assembled prompt must not be exposed in the visitor UI');
 const outputs=[];
 async function capture(query, interaction){
  const refs=await page.locator('#rag-references').textContent();
  const ans=await page.locator('#rag-answer').innerText();
  const referencesOpen=await page.locator('#rag-reference-disclosure').evaluate(el=>el.open);
  const promptIncludesQuery=await page.evaluate(q=>window.V2RAG.buildPrompt(q,window.V2RAG.retrieve(q).hits).includes(q),query);
  outputs.push({query,referenceText:refs,answerText:ans,referencesOpen,promptIncludesQuery,fallback:ans.includes('Insufficient reference materials to answer this question.'),interaction});
  return {refs,ans,referencesOpen,fallback:ans.includes('Insufficient reference materials to answer this question.')};
 }
 async function choose(id){
  const button=page.locator(`[data-rag-query]`).nth(id);
  const query=await button.getAttribute('data-rag-query');
  await button.click();
  return capture(query,'suggested question');
 }
 async function ask(query){
  await page.locator('#rag-question').fill(query);
  await page.locator('#rag-form button[type=submit]').click();
  return capture(query,'typed question and submitted form');
 }
 const rag=await choose(0);
 if(!rag.refs.includes('RAG combines a pretrained LLM')) throw new Error('RAG clear-topic retrieval did not return the RAG definition');
 if(rag.referencesOpen || !rag.ans.includes('Retrieval-augmented generation') || !rag.ans.includes('[R1]')) throw new Error('RAG answer or default-closed references are incorrect');
 await page.locator('#rag-reference-disclosure summary').click();
 if(!(await page.locator('#rag-reference-disclosure').evaluate(el=>el.open))) throw new Error('Reference disclosure did not open');
 if(/KB-\d+|\\rightarrow|\$\{/.test(await page.locator('#rag-references').innerText())) throw new Error('Raw note markup leaked into references');
 await page.locator('.rag-v2-paper').screenshot({path:path.join(root,'evidence/V2-RAG-01_retrieved-answer-desktop.png')});
 const map=await choose(1);
 if(!map.ans.includes('Mappers') || !map.ans.includes('reducers') || map.referencesOpen) throw new Error('MapReduce answer or reference reset failed');
 const memory=await ask('What did we discuss about memory?');
 if(!memory.ans.includes('agent memory or computer memory')) throw new Error('Ambiguous memory query did not request clarification');
 const vague=await ask('Tell me about that thing from class.');
 if(!vague.fallback) throw new Error(`Vague query did not abstain: ${vague.ans}`);
 await page.locator('.rag-v2-paper').screenshot({path:path.join(root,'evidence/V2-RAG-02_insufficient-materials-desktop.png')});
 const unrelated=await ask('What is the best recipe for tiramisu?');
 if(!unrelated.fallback) throw new Error('Out-of-scope query did not abstain');
 const toolUse=await choose(2);
 if(!toolUse.ans.includes('right tool') || !toolUse.ans.includes('arguments') || !toolUse.ans.includes('[R1]')) throw new Error('Suggested tool-use question failed to explain evaluation criteria');
 const agent=await ask('agent是什么');
 if(!agent.refs.includes('智能体（Agent）的定义') || !agent.ans.includes('interacts with an environment') || agent.ans.includes('GNN') || agent.referencesOpen) throw new Error('Reported agent-definition failure has recurred');
 await page.locator('.rag-v2-paper').screenshot({path:path.join(root,'evidence/V2-RAG-03_agent-definition-desktop.png')});
 if((await page.locator('.rag-v2-paper').innerText()).includes('SYSTEM: You are a course-notes assistant')) throw new Error('Prompt text leaked into the visitor UI');
 const logs=await page.locator('#rag-feedback').innerText();
 const externalRequests=requests.filter(url=>/^https?:/.test(url)&&!url.startsWith('http://127.0.0.1:5584'));
 if(errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
 const summary={version:'V2-RAG',date:new Date().toISOString(),timezone:'Asia/Hong_Kong',date_local:'2026-10-24',browser:'Google Chrome headless',viewport:'1512x1000 desktop',url:siteUrl,testCount:7,tests:outputs,finalStatus:logs,consoleErrors:errors,externalRequests,screenshots:['evidence/V2-RAG-01_retrieved-answer-desktop.png','evidence/V2-RAG-02_insufficient-materials-desktop.png','evidence/V2-RAG-03_agent-definition-desktop.png']};
 fs.writeFileSync(path.join(root,'e2e_results_v2.json'),JSON.stringify(summary,null,2));
 console.log(JSON.stringify({passed:true,testCount:7,errors,externalRequests,screenshots:['V2-RAG-01_retrieved-answer-desktop.png','V2-RAG-02_insufficient-materials-desktop.png','V2-RAG-03_agent-definition-desktop.png']}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

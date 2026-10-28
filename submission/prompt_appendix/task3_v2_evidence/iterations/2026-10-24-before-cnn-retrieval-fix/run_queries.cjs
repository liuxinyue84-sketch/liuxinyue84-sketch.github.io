'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
class Element {
  constructor() { this.children=[]; this.listeners={}; this.dataset={}; this.className=''; this.textContent=''; this.value=''; this.open=false; this.innerHTML=''; }
  append(...els) { this.children.push(...els); }
  appendChild(el) { this.children.push(el); return el; }
  replaceChildren(...els) { this.children=els; this.textContent=''; }
  addEventListener(name, fn) { this.listeners[name]=fn; }
  setAttribute() {}
  get innerText() { return [this.textContent,...this.children.map(x=>x.innerText||x.textContent||'')].filter(Boolean).join('\n'); }
}
const els = new Map();
const form = new Element();
const document = {
  getElementById(id) { if (!els.has(id)) els.set(id,new Element()); return els.get(id); },
  querySelectorAll() { return []; },
  createElement() { return new Element(); },
  createTextNode(text) { return {textContent:text,innerText:text}; }
};
const window = {};
const ctx = {window, document, console, Set, Map, Math, Array, Number, String};
const base=path.resolve(__dirname,'../website');
vm.runInNewContext(fs.readFileSync(path.join(base,'rag-knowledge.js'),'utf8'),ctx);
vm.runInNewContext(fs.readFileSync(path.join(base,'rag-v2.js'),'utf8'),ctx);
const cases = [
 {id:'Q01', class:'clear-topic', query:'What is retrieval-augmented generation and how does it use retrieved context?'},
 {id:'Q02', class:'clear-topic', query:'How does MapReduce divide and combine work?'},
 {id:'Q03', class:'clear-topic', query:'How do I evaluate tool use by an LLM agent?'},
 {id:'Q04', class:'broad-query', query:'What did we discuss about memory?'},
 {id:'Q05', class:'vague-query', query:'Tell me about that thing from class.'},
 {id:'Q06', class:'out-of-scope', query:'What is the best recipe for tiramisu?'},
 {id:'Q07', class:'reported-failure-retest', query:'agent是什么'},
 {id:'Q08', class:'bilingual-paraphrase', query:'什么是智能体'},
 {id:'Q09', class:'bilingual-paraphrase', query:'What is an agent?'},
 {id:'Q10', class:'Chinese-definition', query:'什么是RAG'},
 {id:'Q11', class:'confounder-control', query:'什么是图神经网络'},
 {id:'Q12', class:'Chinese-definition', query:'什么是MapReduce'},
 {id:'Q13', class:'qualified-memory', query:'agent memory是什么'},
 {id:'Q14', class:'qualified-memory', query:'HDFS memory是什么'},
 {id:'Q15', class:'suggested-tool-use', query:'How do agents use tools?'},
 {id:'Q16', class:'retrieved-but-not-curated', query:'What are the limitations of RAG?'},
 {id:'Q17', class:'cross-source-summary', query:'How do diffusion models generate images?'},
 {id:'Q18', class:'generic-source-summary', query:'What is reinforcement learning?'}
];
const results=cases.map(test=>({
  id:test.id,
  category:test.class,
  ...window.V2RAG.runQuery(test.query),
  referenceDisclosureOpen:document.getElementById('rag-reference-disclosure').open,
  visitorReferenceText:document.getElementById('rag-references').innerText
}));
process.stdout.write(JSON.stringify({version:'V2-RAG',method:'client-side BM25 retrieval + source-checked English summaries or explicit abstention',knowledgeRecords:window.V2RAG.recordCount,tests:results},null,2));

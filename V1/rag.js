'use strict';
/* ============================================================
   RAG chat — answers questions with passages retrieved from
   the course notes in knowledge/ (in-browser BM25, no server).
   ============================================================ */
const ragSources = [
 { file: 'knowledge/5205-Introduction-to-AI.md', course: 'Introduction to AI' },
 { file: 'knowledge/5434-Big-Data-Computing-1.md', course: 'Big Data Computing · Part 1' },
 { file: 'knowledge/5434-Big-Data-Computing-2.md', course: 'Big Data Computing · Part 2' },
 { file: 'knowledge/5583-Agentic-Computing-1.md', course: 'Agentic Computing · Part 1' },
 { file: 'knowledge/5583-Agentic-Computing-2.md', course: 'Agentic Computing · Part 2' },
 { file: 'knowledge/5583-Agentic-Computing-3.md', course: 'Agentic Computing · Part 3' },
 { file: 'knowledge/5584-LLM-for-Agent-1.md', course: 'LLM for Agent · Part 1' },
 { file: 'knowledge/5584-LLM-for-Agent-2.md', course: 'LLM for Agent · Part 2' }
];

const ragLog = document.getElementById('rag-log');
const ragForm = document.getElementById('rag-form');
const ragInput = document.getElementById('rag-question');
const ragSuggestions = document.querySelector('.rag-suggest');

/* 【V1迭代新增】few-shot query → evidence patterns guide topic-aware ranking.
   These are transparent lexical hints, not an external LLM or generated answer. */
const FEWSHOT_TOPIC_PATTERNS = [
 { name: 'MapReduce', query: /map\s*reduce|mapreduce|mapper|reducer|shuffle/i, heading: /map\s*reduce|hadoop|workflow/i, terms: ['mapreduce','hadoop','mapper','reducer','shuffle','partition','map','reduce'] },
 { name: 'RAG', query: /retrieval.?augmented|\brag\b|knowledge retrieval/i, heading: /retrieval.?augmented generation|\brag\b/i, terms: ['retrieval','augmented','generation','retriever','evidence','knowledge'] },
 { name: 'agent planning', query: /agent.{0,24}plan|plan.{0,24}agent/i, heading: /planning|plan|reasoning/i, terms: ['agent','planning','plan','reasoning','action','goal'] }
];

const RAG_STOPWORDS = new Set(('a,an,the,and,or,but,if,of,at,by,for,from,in,into,is,are,was,were,be,been,being,it,its,this,that,these,those,i,you,he,she,we,they,me,him,her,us,them,my,your,his,our,their,what,which,who,whom,when,where,why,how,do,does,did,done,can,could,should,would,may,might,must,shall,will,about,above,after,again,all,also,am,any,as,because,before,between,both,each,few,further,has,have,had,having,here,there,more,most,other,over,own,same,so,than,too,very,just,with,through,during,without,on,off,out,up,down,then,once,some,such,no,nor,not,only,now,please,tell,explain,describe').split(','));

/* Latin words (lightly stemmed) plus CJK bigrams, so bilingual notes both match. */
function tokenize(text) {
 const tokens = [];
 (text.toLowerCase().match(/[a-z0-9]+/g) || []).forEach(word => {
  const stem = word.length > 3 && word.endsWith('s') ? word.slice(0, -1) : word;
  if (stem.length > 1 && !RAG_STOPWORDS.has(stem)) tokens.push(stem);
 });
 (text.match(/[\u4e00-\u9fff]+/g) || []).forEach(run => {
  if (run.length === 1) tokens.push(run);
  else for (let i = 0; i < run.length - 1; i++) tokens.push(run.slice(i, i + 2));
 });
 return tokens;
}

/* Strip markdown noise so chunks read like plain text. */
function plainText(markdown) {
 return markdown
  .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/```/g, ' ')
  .replace(/https?:\/\/\S+/g, ' ')
  .replace(/[#>*`|_\\]/g, ' ')
  .replace(/[ \t]+/g, ' ');
}

/* Split one note into heading-anchored chunks of at most ~900 characters. */
function buildChunks(markdown, course) {
 const chunks = [];
 const parts = markdown.split(/^(#{1,4}[^\n]*)$/m);
 const add = (heading, body) => {
  const text = plainText(body).replace(/\s+/g, ' ').trim();
  if (text.length < 60) return;
  const MAX = 900;
  for (let start = 0; start < text.length;) {
   let end = Math.min(start + MAX, text.length);
   if (end < text.length) {
    const cut = text.lastIndexOf('. ', end);
    if (cut > start + 450) end = cut + 2;
   }
   chunks.push({ course, heading, text: text.slice(start, end).trim() });
   start = end;
  }
 };
 add(course, parts[0]);
 for (let i = 1; i < parts.length; i += 2) {
  const heading = plainText(parts[i]).trim() || course;
  add(heading, parts[i + 1] || '');
 }
 return chunks;
}

let ragChunks = [];
let ragIndex = null;
let ragLoading = null;

/* Fetch every note once and build the BM25 index in memory. */
function loadKnowledge() {
 if (ragLoading) return ragLoading;
 ragLoading = Promise.all(ragSources.map(source =>
  (window.ARIA_KNOWLEDGE_NOTES?.[source.file]
   ? Promise.resolve(window.ARIA_KNOWLEDGE_NOTES[source.file])
   : fetch(source.file).then(response => {
      if (!response.ok) throw new Error(source.file);
      return response.text();
     })
  ).then(markdown => buildChunks(markdown, source.course))
 )).then(chunkLists => {
  ragChunks = chunkLists.flat();
  const docFreq = new Map();
  const chunkTokens = ragChunks.map(chunk => {
   const tokens = tokenize(`${chunk.heading} ${chunk.text}`);
   new Set(tokens).forEach(token => docFreq.set(token, (docFreq.get(token) || 0) + 1));
   return tokens;
  });
  const avgLength = chunkTokens.reduce((sum, tokens) => sum + tokens.length, 0) / Math.max(chunkTokens.length, 1);
  ragIndex = { docFreq, chunkTokens, avgLength, total: ragChunks.length };
  return ragIndex;
 });
 return ragLoading;
}

function searchNotes(question, limit) {
 const questionTokens = [...new Set(tokenize(question))];
 if (!questionTokens.length || !ragIndex) return [];
 const examplePattern = FEWSHOT_TOPIC_PATTERNS.find(pattern => pattern.query.test(question));
 const expandedTokens = new Set(questionTokens);
 if (examplePattern) examplePattern.terms.forEach(term => tokenize(term).forEach(token => expandedTokens.add(token)));
 const { docFreq, chunkTokens, avgLength, total } = ragIndex;
 const hits = [];
 chunkTokens.forEach((tokens, i) => {
  if (!tokens.length) return;
  const freq = new Map();
  tokens.forEach(token => freq.set(token, (freq.get(token) || 0) + 1));
  let score = 0;
  expandedTokens.forEach(token => {
   const f = freq.get(token);
   if (!f) return;
   const n = docFreq.get(token) || 0;
   const idf = Math.log(1 + (total - n + .5) / (n + .5));
   const isOriginalQueryTerm = questionTokens.includes(token);
   score += idf * (f * 1.9) / (f + 1.9 * (.25 + .75 * tokens.length / avgLength)) * (isOriginalQueryTerm ? 1 : .45);
  });
  const heading = ragChunks[i].heading;
  const topicMatch = Boolean(examplePattern && examplePattern.heading.test(heading));
  if (topicMatch) score += 3.2;
  const matchedTerms = questionTokens.filter(token => freq.has(token)).length;
  const coverage = matchedTerms / questionTokens.length;
  if (score > 0) hits.push({ score, coverage, matchedTerms, topicMatch, chunk: ragChunks[i] });
 });
 return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

function addMessage(text, kind) {
 const message = document.createElement('div');
 message.className = `rag-msg ${kind}`;
 message.textContent = text;
 ragLog.appendChild(message);
 ragLog.scrollTop = ragLog.scrollHeight;
 return message;
}

function trimExcerpt(text, max) {
 if (text.length <= max) return text;
 const cut = text.lastIndexOf('. ', max);
 const end = cut > max * .45 ? cut + 1 : max;
 return `${text.slice(0, end).trim()} …`;
}

function renderAnswer(question) {
 const hits = searchNotes(question, 6);
 const best = hits[0];
 if (!best || (!best.topicMatch && (best.coverage < .5 || best.matchedTerms < 2)) || best.score < .45) {
  addMessage('Hmm, I couldn’t find that in my notes. Try asking about prompt engineering, MapReduce, RAG or agent memory.', 'bot');
  return;
 }
 const reply = document.createElement('div');
 reply.className = 'rag-msg bot';
 const evidenceLabel = document.createElement('span');
 evidenceLabel.className = 'rag-evidence-label';
 evidenceLabel.textContent = 'CLOSEST NOTE EXCERPT';
 reply.appendChild(evidenceLabel);
 const excerpt = document.createElement('span');
 excerpt.textContent = trimExcerpt(best.chunk.text, 430);
 reply.appendChild(excerpt);
 const source = document.createElement('span');
 source.className = 'rag-src';
 source.textContent = `— from ${best.chunk.course} · “${best.chunk.heading}”`;
 reply.appendChild(source);
 const confidence = document.createElement('span');
 confidence.className = 'rag-confidence';
 confidence.textContent = best.topicMatch ? 'Topic matched' : 'Keyword match';
 reply.appendChild(confidence);
 const alt = hits.slice(1).find(hit => hit.score >= best.score * .45 && hit.chunk.heading !== best.chunk.heading);
 if (alt) {
  const more = document.createElement('span');
  more.className = 'rag-more';
  more.textContent = `Also mentioned in ${alt.chunk.course} · “${alt.chunk.heading}”.`;
  reply.appendChild(more);
 }
 ragLog.appendChild(reply);
 ragLog.scrollTop = ragLog.scrollHeight;
}

let ragBusy = false;
async function askQuestion(question) {
 if (ragBusy || !question) return;
 ragBusy = true;
 addMessage(question, 'user');
 const status = addMessage(ragIndex ? 'Searching my notes…' : 'Opening my course notes…', 'status');
 try {
  await loadKnowledge();
  status.textContent = `Searching ${ragChunks.length} passages from ${ragSources.length} lecture notes…`;
  await new Promise(resolve => setTimeout(resolve, 350));
  status.remove();
  renderAnswer(question);
 } catch {
  status.remove();
  addMessage('I could not load the course notes. Please keep knowledge-data.js beside index.html, or serve the complete site folder over HTTP and try again.', 'bot');
 } finally {
  ragBusy = false;
  ragInput.focus();
 }
}

ragForm.addEventListener('submit', event => {
 event.preventDefault();
 const question = ragInput.value.trim();
 if (!question) return;
 ragInput.value = '';
 askQuestion(question);
});

ragSuggestions.addEventListener('click', event => {
 const button = event.target.closest('button');
 if (button) askQuestion(button.textContent.trim());
});

'use strict';
/* Semantic spot checks against source-backed course-note questions. */
const {execFileSync} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const run = path.join(__dirname, 'run_queries.cjs');
const data = JSON.parse(execFileSync(process.execPath, [run], {encoding: 'utf8', maxBuffer: 30 * 1024 * 1024}));
const html = fs.readFileSync(path.join(__dirname, '../website/index.html'), 'utf8');
const suggestedQueries = [...html.matchAll(/<button\b[^>]*data-rag-query="[^"]*"[^>]*>([^<]*)<\/button>/g)].map(match => match[1].trim());
const requiredShortcuts = ['What is RAG?', 'How does MapReduce work?', 'How do agents use tools?'];
if (JSON.stringify(suggestedQueries) !== JSON.stringify(requiredShortcuts) || html.includes('data-rag-query="agent是什么"')) {
  throw new Error(`Visitor shortcuts do not match the three requested English labels: ${suggestedQueries.join(' | ')}`);
}
const cases = new Map(data.tests.map(test => [test.id, test]));
const checks = [];

function check(id, description, predicate) {
  const test = cases.get(id);
  const cleanVisitorCopy = test && !test.referenceDisclosureOpen &&
    !/KB-\d+|SYSTEM:|USER QUESTION:|RETRIEVED REFERENCE MATERIALS:|\$\{|\\text\{|\\rightarrow/.test(test.visitorReferenceText + test.pageAnswer) &&
    !/[\u4e00-\u9fff]/.test(test.pageAnswer);
  const sourceAnswerLinked = test && (test.retrievedPassages.length
    ? !test.pageAnswer.includes('Insufficient reference materials to answer this question.') && /\[R\d+\]/.test(test.pageAnswer)
    : test.pageAnswer === 'Insufficient reference materials to answer this question.');
  const passed = Boolean(test && cleanVisitorCopy && sourceAnswerLinked && predicate(test));
  checks.push({id, description, passed, topSource: test?.retrievedPassages[0]?.id || null, answer: test?.pageAnswer || null});
  if (!passed) throw new Error(`${id}: ${description}`);
}
function top(test) { return test.retrievedPassages[0] || {}; }

check('Q01', 'RAG question cites the RAG definition', t => /RAG Definition/.test(top(t).topic || '') && /Retrieval-augmented generation/.test(t.pageAnswer) && /\[R1\]/.test(t.pageAnswer));
check('Q02', 'MapReduce process includes both Mapper and Reducer', t => /MapReduce Pipeline/.test(top(t).topic || '') && /Mappers/.test(t.pageAnswer) && /reducers/.test(t.pageAnswer));
check('Q03', 'Tool-use evaluation answer discusses selection and parameters', t => /Evaluating Tool Use/.test(top(t).topic || '') && /right tool/.test(t.pageAnswer) && /arguments/.test(t.pageAnswer));
check('Q04', 'Ambiguous memory question summarizes both retrieved contexts', t => /two different contexts/i.test(t.pageAnswer) && /Agent memory/.test(t.pageAnswer) && /\[R2\]/.test(t.pageAnswer));
check('Q05', 'Vague question abstains', t => t.pageAnswer === 'Insufficient reference materials to answer this question.');
check('Q06', 'Unrelated question abstains', t => t.pageAnswer === 'Insufficient reference materials to answer this question.');
for (const id of ['Q07', 'Q08', 'Q09']) {
  check(id, 'Agent definition cites the agent section, not GNN', t => /智能体.*定义/.test(top(t).topic || '') && /interacts with an environment/.test(t.pageAnswer) && !/GNN|图是什么/.test(t.pageAnswer));
}
check('Q10', 'Chinese RAG definition cites the RAG section', t => /RAG Definition/.test(top(t).topic || '') && /Retrieval-augmented generation/.test(t.pageAnswer));
check('Q11', 'GNN definition is kept distinct from agent', t => /图神经网络/.test(top(t).topic || '') && /graph neural network/.test(t.pageAnswer));
check('Q12', 'MapReduce definition cites an introductory definition', t => /MapReduce Introduction/.test(top(t).topic || '') && /programming model/.test(t.pageAnswer));
check('Q13', 'Agent memory cites an agent-memory section', t => /智能体.*记忆/.test(top(t).topic || '') && /Episodic memory/.test(t.pageAnswer));
check('Q14', 'HDFS memory cites metadata in memory', t => /Metadata in Memory/.test(top(t).topic || '') && /metadata in main memory/.test(t.pageAnswer));
check('Q15', 'Suggested agent tool-use question has a grounded answer', t => /Tool Use Is a Layered System/.test(top(t).topic || '') && /tool definition/.test(t.pageAnswer));
check('Q16', 'RAG limitations query with retrieved evidence does not abstain', t => t.retrievedPassages.length > 0 && /rare questions/.test(t.pageAnswer) && /popular questions/.test(t.pageAnswer));
check('Q17', 'Diffusion process uses a cited sampling source', t => /Gaussian noise/.test(t.pageAnswer) && /\[R4\]/.test(t.pageAnswer));
check('Q18', 'Reinforcement learning cites the relevant retrieved definition', t => /receives a reward/.test(t.pageAnswer) && /\[R4\]/.test(t.pageAnswer));
for (const id of ['Q19', 'Q20', 'Q21']) {
  check(id, 'CNN significance retrieves the LeNet evidence and explains its contribution', t =>
    /LeNet/.test(top(t).topic || '') && /local connectivity and weight sharing/.test(t.pageAnswer) &&
    /handwritten digits/.test(t.pageAnswer) && /AlexNet/.test(t.pageAnswer) && /\[R1\]/.test(t.pageAnswer));
}

const result = {version: 'V2-RAG', kind: 'deterministic relevance regression and static shortcut check, not browser E2E', date: new Date().toISOString(), count: checks.length, suggestedQueries, passed: checks.every(item => item.passed), checks};
fs.writeFileSync(path.join(__dirname, '../evaluation/relevance_regression_v2.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({passed: result.passed, count: result.count}));

'use strict';
/* Semantic spot checks against source-backed course-note questions. */
const {execFileSync} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const run = path.join(__dirname, 'run_queries.cjs');
const data = JSON.parse(execFileSync(process.execPath, [run], {encoding: 'utf8', maxBuffer: 30 * 1024 * 1024}));
const cases = new Map(data.tests.map(test => [test.id, test]));
const checks = [];

function check(id, description, predicate) {
  const test = cases.get(id);
  const cleanVisitorCopy = test && !test.referenceDisclosureOpen &&
    !/KB-\d+|SYSTEM:|USER QUESTION:|RETRIEVED REFERENCE MATERIALS:|\$\{|\\text\{|\\rightarrow/.test(test.visitorReferenceText + test.pageAnswer) &&
    !/[\u4e00-\u9fff]/.test(test.pageAnswer);
  const passed = Boolean(test && cleanVisitorCopy && predicate(test));
  checks.push({id, description, passed, topSource: test?.retrievedPassages[0]?.id || null, answer: test?.pageAnswer || null});
  if (!passed) throw new Error(`${id}: ${description}`);
}
function top(test) { return test.retrievedPassages[0] || {}; }

check('Q01', 'RAG question cites the RAG definition', t => /RAG Definition/.test(top(t).topic || '') && /Retrieval-augmented generation/.test(t.pageAnswer) && /\[R1\]/.test(t.pageAnswer));
check('Q02', 'MapReduce process includes both Mapper and Reducer', t => /MapReduce Pipeline/.test(top(t).topic || '') && /Mappers/.test(t.pageAnswer) && /reducers/.test(t.pageAnswer));
check('Q03', 'Tool-use evaluation answer discusses selection and parameters', t => /Evaluating Tool Use/.test(top(t).topic || '') && /right tool/.test(t.pageAnswer) && /arguments/.test(t.pageAnswer));
check('Q04', 'Ambiguous memory question asks for the domain', t => /agent memory or computer memory/i.test(t.pageAnswer));
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

const result = {version: 'V2-RAG', kind: 'deterministic relevance regression, not browser E2E', date: new Date().toISOString(), count: checks.length, passed: checks.every(item => item.passed), checks};
fs.writeFileSync(path.join(__dirname, '../evaluation/relevance_regression_v2.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({passed: result.passed, count: result.count}));

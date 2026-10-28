'use strict';
/* Generic invariants for the shared semantic-filter-and-answer pipeline.
   No query-specific expected answer or topic is encoded here. */
const {execFileSync} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const run = path.join(__dirname, 'run_queries.cjs');
const data = JSON.parse(execFileSync(process.execPath, [run], {encoding: 'utf8', maxBuffer: 30 * 1024 * 1024}));
const html = fs.readFileSync(path.join(__dirname, '../website/index.html'), 'utf8');
const suggestedQueries = [...html.matchAll(/<button\b[^>]*data-rag-query="[^"]*"[^>]*>([^<]*)<\/button>/g)].map(match => match[1].trim());
const requiredShortcuts = ['What is RAG?', 'How does MapReduce work?', 'How do agents use tools?'];
const exactFallback = 'Insufficient reference materials to answer this question.';
const checks = [];

function record(rule, passed, detail) {
  checks.push({rule, passed, detail});
  if (!passed) throw new Error(`${rule}: ${detail}`);
}

record('visitor-controls', JSON.stringify(suggestedQueries) === JSON.stringify(requiredShortcuts), `shortcuts: ${suggestedQueries.join(' | ')}`);
record('reference-disclosure', html.includes('<summary>View Retrieved Reference Materials <span id="rag-reference-count"></span></summary>'), 'default disclosure title is present');

const nonempty = data.tests.every(test => Boolean(test.pageAnswer.trim()));
record('answer-totality', nonempty, 'every evaluation query produces visible text');

const branchInvariant = data.tests.every(test => {
  const relevant = test.relevanceAssessment.filter(item => item.relevant);
  return relevant.length ? test.pageAnswer !== exactFallback : test.pageAnswer === exactFallback;
});
record('semantic-branch', branchInvariant, 'relevant chunks always answer; zero relevant chunks always abstain');

const citationsValid = data.tests.every(test => {
  if (test.pageAnswer === exactFallback) return true;
  const relevantRefs = new Set(test.relevanceAssessment.filter(item => item.relevant).map(item => item.reference));
  const cited = [...test.pageAnswer.matchAll(/\[R(\d+)\]/g)].map(match => `R${match[1]}`);
  return cited.length > 0 && cited.every(ref => relevantRefs.has(ref));
});
record('relevant-only-citations', citationsValid, 'every citation points to a chunk accepted by the generic semantic filter');

const allHitsPreserved = data.tests.every(test => {
  const displayed = [...test.visitorReferenceText.matchAll(/\[R(\d+)\]/g)].length;
  return displayed === test.retrievedPassages.length;
});
record('retrieval-evidence-preserved', allHitsPreserved, 'all BM25 hits remain in the folded reference panel');

const visitorClean = data.tests.every(test => !test.referenceDisclosureOpen &&
  !/KB-\d+|SYSTEM:|USER QUESTION:|RETRIEVED REFERENCE MATERIALS:|\$\{|\\text\{|\\rightarrow/.test(test.visitorReferenceText + test.pageAnswer) &&
  !/[\u4e00-\u9fff]/.test(test.pageAnswer));
record('visitor-output-clean', visitorClean, 'answers are English and no internal prompt/debug identifiers are rendered');

const answerShape = data.tests.every(test => {
  if (test.pageAnswer === exactFallback) return true;
  const lines = test.pageAnswer.split('\n').filter(Boolean);
  return lines.length >= 1 && lines.length <= 5 && lines.every(line => /\[R\d+\](?:\[R\d+\])*$/.test(line));
});
record('answer-format', answerShape, 'answers contain one lead plus at most four cited points');

const result = {
  version: 'V2-RAG',
  kind: 'generic semantic-pipeline invariants, not per-query hard-coded assertions and not browser E2E',
  date: new Date().toISOString(),
  evaluationQueries: data.tests.length,
  genericRules: checks.length,
  suggestedQueries,
  passed: checks.every(item => item.passed),
  checks
};
fs.writeFileSync(path.join(__dirname, '../evaluation/relevance_regression_v2.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({passed: result.passed, queries: result.evaluationQueries, genericRules: result.genericRules}));

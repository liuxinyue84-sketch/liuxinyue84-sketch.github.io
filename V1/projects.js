'use strict';
/* Project stories — content sourced from Xinyue's CV. */
const projects = [
 {
  title: 'AI Agents for Data Annotation: A Review',
  category: 'research',
  label: 'Featured Research · Future Internet · 2025',
  purpose: 'A systematic look at how AI agents can support data annotation.',
  contribution: 'Co-author; my contribution is recorded as Review & Editing.',
  tags: 'AI Agents · Data Annotation · Review & Editing',
  detail: [
   'Co-authored with MM Karim, S Khan, DH Van, C Wang and Prof. Qiang Qu.',
   'Explores agent architectures, reasoning mechanisms and quality-control loops in annotation workflows.',
   'Future Internet, 2025, 17, 353 — Impact Factor 3.6, JCR-Q2.'
  ],
  link: 'https://doi.org/10.3390/fi17080353'
 },
 {
  title: 'LLM-Agent Framework for Financial Data Annotation',
  category: 'research',
  label: 'Undergraduate Thesis · Individual Research',
  purpose: 'A rule-LLM hybrid pipeline that keeps financial annotation traceable.',
  contribution: 'Designed and built the parsing, annotation, retrieval and validation workflow.',
  tags: 'LLM · RAG · BM25 · SQLite FTS5',
  detail: [
   "Prototyped on Ping An Bank's 2024 annual report to extract financial entities and risk-related semantics.",
   'Five-stage workflow: PDF parsing, text chunking, dual-layer annotation, database construction and RAG-backed QA validation, with breakpoint resume.',
   'JSON-Schema constrained prompts plus dictionary-regex guardrails; ablation studies and human evaluation strengthened numerical fidelity.'
  ]
 },
 {
  title: 'Intelligent Policy Q&A System',
  category: 'build',
  label: 'Course Capstone · Excellent Design',
  purpose: 'Retrieves policy evidence and answers questions in natural language.',
  contribution: 'Implemented text processing, vector search and automatic citation tagging.',
  tags: 'Python · ClickHouse · ChatGLM3',
  detail: [
   'Parsing pipeline with Python and regular expressions to normalize multi-level headers and Chinese numerals.',
   '1024D SentenceTransformer embeddings with ClickHouse vector indexing for millisecond-level ANN retrieval.',
   'ChatGLM3-6B generation with BERTScore citation tagging — 40% QPS improvement, BERTScore above 0.82.'
  ]
 },
 {
  title: 'Music Information Platform',
  category: 'build',
  label: 'Team Project · Provincial 2nd Prize',
  purpose: 'A full-stack platform for browsing and querying music culture data.',
  contribution: 'Led project organization, system architecture and end-to-end implementation.',
  tags: 'Vue 3 · Spring Boot · ECharts',
  detail: [
   'Spring Boot + MyBatis backend with a responsive Vue 3 frontend.',
   'ECharts spatio-temporal heatmaps and knowledge graphs for cultural data.',
   'ChatGLM3 natural language querying with optimized responses under 2 seconds.'
  ]
 }
];

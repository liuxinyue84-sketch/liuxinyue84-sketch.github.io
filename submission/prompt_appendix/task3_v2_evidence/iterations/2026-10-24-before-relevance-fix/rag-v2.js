'use strict';
/* V2-RAG: inspectable client-side retrieval + deterministic extractive answer demo.
   No network requests, backend, secrets, or external LLM are used. */
(() => {
  const records = Array.isArray(window.V2_RAG_KNOWLEDGE) ? window.V2_RAG_KNOWLEDGE : [];
  const form = document.getElementById('rag-form');
  if (!form) return;
  const input = document.getElementById('rag-question');
  const references = document.getElementById('rag-references');
  const answer = document.getElementById('rag-answer');
  const results = document.getElementById('rag-results');
  const feedback = document.getElementById('rag-feedback');
  const stop = new Set(('a an the and or but if of at by for from in into is are was were be been it its this that these those i you he she we they me my your what which who when where why how do does did can could should would may might will about above after again all also am any as because before between both each few has have had here there more most other over own same so than too very just with through during without on off out up down then once some such please tell explain describe discuss did we to is was thing class recipe best thingy stuff clas'.split(' ')));
  const tokenCache = new Map();
  let index;

  function tokenize(text) {
    if (tokenCache.has(text)) return tokenCache.get(text);
    const tokens = [];
    for (const word of (text.toLowerCase().match(/[a-z0-9]+/g) || [])) {
      const normalized = word.length > 3 && word.endsWith('s') ? word.slice(0, -1) : word;
      if (normalized.length > 1 && !stop.has(normalized)) tokens.push(normalized);
    }
    for (const run of (text.match(/[\u4e00-\u9fff]+/g) || [])) {
      if (run.length === 1) tokens.push(run);
      else for (let i = 0; i < run.length - 1; i++) tokens.push(run.slice(i, i + 2));
    }
    tokenCache.set(text, tokens);
    return tokens;
  }

  function getIndex() {
    if (index) return index;
    const docFreq = new Map();
    const tokenLists = records.map(record => {
      const tokens = tokenize(`${record.topic} ${record.sectionPath} ${record.originalParagraph}`);
      for (const token of new Set(tokens)) docFreq.set(token, (docFreq.get(token) || 0) + 1);
      return tokens;
    });
    const avgLength = tokenLists.reduce((sum, list) => sum + list.length, 0) / Math.max(1, tokenLists.length);
    index = { docFreq, tokenLists, avgLength, total: records.length };
    return index;
  }

  function retrieve(query, limit = 4) {
    const expanded = tokenize(query);
    const normalizedQuery = query.toLowerCase().replace(/[‐‑‒–—]/g, '-');
    // Small domain synonym expansion: make the named RAG concept match its course-note acronym.
    if (/retrieval\s*[- ]?\s*augmented\s+generation/.test(normalizedQuery)) expanded.push('rag');
    if (/mapreduce/.test(normalizedQuery)) expanded.push('mapper', 'reducer');
    const unique = [...new Set(expanded)];
    if (!unique.length) return { queryTokens: unique, candidates: [], hits: [] };
    const idx = getIndex();
    const scored = [];
    idx.tokenLists.forEach((tokens, recordIndex) => {
      if (tokens.length < 4) return;
      const rawBody = records[recordIndex].originalParagraph.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/https?:\/\/\S+/g, ' ').replace(/<[^>]+>/g, ' ').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
      if (rawBody.length < 18) return;
      const freq = new Map();
      tokens.forEach(token => freq.set(token, (freq.get(token) || 0) + 1));
      let score = 0;
      let matched = 0;
      for (const token of unique) {
        const f = freq.get(token) || 0;
        if (!f) continue;
        matched++;
        const n = idx.docFreq.get(token) || 0;
        const idf = Math.log(1 + (idx.total - n + 0.5) / (n + 0.5));
        const queryWeight = token === 'rag' && /retrieval\s*[- ]?\s*augmented\s+generation/.test(normalizedQuery) ? 6 : 1;
        score += queryWeight * idf * (f * 1.9) / (f + 1.9 * (0.25 + 0.75 * tokens.length / idx.avgLength));
      }
      if (score > 0) scored.push({ record: records[recordIndex], score, coverage: matched / unique.length });
    });
    scored.sort((a, b) => b.score - a.score || a.record.id.localeCompare(b.record.id));
    // Require evidence strength and some query coverage to reduce accidental matches.
    const candidates = scored.slice(0, limit);
    const best = candidates[0];
    const reliable = best && best.score >= 1.0 && best.coverage >= 0.24;
    const hits = reliable ? candidates.filter(hit => hit.score >= Math.max(0.55, best.score * 0.18)) : [];
    return { queryTokens: unique, candidates, hits };
  }

  function buildPrompt(query, hits) {
    const context = hits.length ? hits.map((hit, i) => `[R${i + 1}] Topic: ${hit.record.topic}\nSource: ${hit.record.source.file} — ${hit.record.source.course}\nPassage:\n${hit.record.originalParagraph}`).join('\n\n') : '[No reliable passages retrieved.]';
    return `SYSTEM: You are a course-notes assistant. Answer only from the reference passages. Preserve uncertainty. If the passages do not support an answer, say exactly: "Insufficient reference materials to answer this question." Cite supporting passages as [R1], [R2], etc.\n\nUSER QUESTION:\n${query}\n\nRETRIEVED REFERENCE MATERIALS:\n${context}\n\nTASK:\nCompose a concise answer grounded only in the retrieved materials, and include inline source citations. Do not add outside facts.`;
  }

  function plainExcerpt(text, max = 560) {
    const clean = text.replace(/```/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[#>*`|_]/g, '').replace(/\\([^\w\s])/g, '$1').trim();
    if (clean.length <= max) return clean;
    const end = clean.lastIndexOf(' ', max);
    return clean.slice(0, end > max * 0.6 ? end : max).trim() + ' …';
  }

  function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function renderReferences(hits) {
    references.replaceChildren();
    if (!hits.length) {
      references.className = 'rag-v2-empty';
      references.append(make('p', '', 'No matching source to show.'));
      return;
    }
    references.className = '';
    hits.forEach((hit, i) => {
      const card = make('details', 'rag-v2-reference');
      card.open = i === 0;
      const head = make('summary', 'rag-v2-reference-head');
      const topic = make('span', 'rag-v2-topic', plainExcerpt(hit.record.topic, 140));
      const id = make('span', 'rag-v2-ref-id', `R${i + 1} · ${hit.record.id}`);
      head.append(topic, id);
      head.append(make('small', 'rag-v2-source', `${hit.record.source.file} · ${plainExcerpt(hit.record.sectionPath, 120)}`));
      card.append(head, make('p', 'rag-v2-passage', hit.record.originalParagraph));
      references.append(card);
    });
  }

  function renderAnswer(hits) {
    answer.replaceChildren();
    if (!hits.length) {
      answer.className = 'rag-v2-empty';
      answer.append(make('p', '', 'Insufficient reference materials to answer this question.'));
      return;
    }
    answer.className = 'rag-v2-answer';
    const best = hits[0];
    const text = plainExcerpt(best.record.originalParagraph, 320);
    const first = make('p');
    first.textContent = `Closest source excerpt: “${text}” `;
    first.append(make('span', 'rag-v2-cite', '[R1]'));
    answer.append(first);
  }

  function runQuery(query) {
    const result = retrieve(query);
    const assembled = buildPrompt(query, result.hits);
    renderReferences(result.hits);
    renderAnswer(result.hits);
    results.hidden = false;
    feedback.textContent = result.hits.length
      ? `${result.hits.length} sources found. The answer quotes the first source.`
      : 'No supporting source found for this question.';
    return {
      query,
      queryTokens: result.queryTokens,
      candidatePassages: result.candidates.map(({record, score, coverage}) => ({id: record.id, topic: record.topic, source: record.source, score: Number(score.toFixed(4)), queryCoverage: Number(coverage.toFixed(4))})),
      retrievedPassages: result.hits.map(({record, score}) => ({id: record.id, topic: record.topic, sectionPath: record.sectionPath, originalParagraph: record.originalParagraph, source: record.source, score: Number(score.toFixed(4))})),
      assembledPrompt: assembled,
      pageAnswer: result.hits.length ? answer.innerText : 'Insufficient reference materials to answer this question.'
    };
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    runQuery(query);
  });
  document.querySelectorAll('[data-rag-query]').forEach(button => button.addEventListener('click', () => {
    input.value = button.dataset.ragQuery;
    runQuery(input.value);
  }));

  window.V2RAG = { retrieve, buildPrompt, runQuery, recordCount: records.length };
  feedback.textContent = 'Ready to search the course and project materials.';
})();

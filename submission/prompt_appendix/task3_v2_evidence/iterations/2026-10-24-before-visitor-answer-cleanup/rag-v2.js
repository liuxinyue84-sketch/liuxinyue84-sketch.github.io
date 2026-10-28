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
      if (stop.has(word)) continue;
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
    // Neighboring tiny paragraphs in one section form a single answer-bearing unit.
    // The original 9,831 records remain untouched in rag-knowledge.js for provenance.
    const units = [];
    let unit;
    let key = '';
    for (const record of records) {
      const nextKey = `${record.source.file}\u0000${record.sectionPath}`;
      const paragraph = record.originalParagraph.trim();
      if (!paragraph) continue;
      // A screenshot-only Markdown paragraph does not provide answer evidence.
      const searchableBody = paragraph.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/https?:\/\/\S+/g, '').trim();
      if (!searchableBody) continue;
      const join = unit && key === nextKey && unit.recordIds.length < 10 && unit.originalParagraph.length + paragraph.length < 850;
      if (join) {
        unit.originalParagraph += `\n\n${paragraph}`;
        unit.recordIds.push(record.id);
        unit.id = `${unit.recordIds[0]}–${record.id}`;
      } else {
        unit = {...record, recordIds: [record.id], sectionStart: key !== nextKey};
        units.push(unit);
      }
      key = nextKey;
    }
    const docFreq = new Map();
    const tokenLists = units.map(record => {
      const tokens = tokenize(`${record.topic} ${record.originalParagraph}`);
      for (const token of new Set(tokens)) docFreq.set(token, (docFreq.get(token) || 0) + 1);
      return tokens;
    });
    const avgLength = tokenLists.reduce((sum, list) => sum + list.length, 0) / Math.max(1, tokenLists.length);
    index = { docFreq, tokenLists, units, avgLength, total: units.length };
    return index;
  }

  function retrieve(query, limit = 4) {
    const normalizedQuery = query.toLowerCase().replace(/[‐‑‒–—]/g, '-');
    const definitionIntent = /\bwhat\s+(?:is|are)\b|\bdefine\b|什么是|是什么|定义/.test(normalizedQuery);
    const toolEvaluationIntent = /\bevaluat|评估|衡量/.test(normalizedQuery) && /\btool|工具/.test(normalizedQuery);
    const mapreduceProcessIntent = /mapreduce|映射归约/.test(normalizedQuery) && /divide|combine|pipeline|process|work|流程|分工|合并/.test(normalizedQuery);
    const agentProcessIntent = /\bagents?\b|智能体/.test(normalizedQuery) && /如何工作|怎么工作|怎样工作|how.*work|运作|运行模式/.test(normalizedQuery);
    // Remove question phrasing before tokenization. Otherwise rare Chinese bigrams
    // such as “是什” can outrank the actual subject (the reported agent/GNN failure).
    const subjectQuery = normalizedQuery.replace(/什么是|是什么意思|是什么呢|是什么|请问|如何工作|怎么工作|怎样工作|如何|怎么|为什么|有哪些/g, ' ');
    const baseTokens = tokenize(subjectQuery).filter(token => !['ai', 'work'].includes(token));
    const expanded = [...baseTokens];
    // Bilingual aliases help a focused definition query, but must not drown out
    // other intent terms such as “evaluate tool use”.
    if (/智能体/.test(normalizedQuery)) expanded.push('agent');
    if (/\bagents?\b/.test(normalizedQuery) && definitionIntent && expanded.length <= 2) expanded.push('智能', '能体');
    if (/retrieval\s*[- ]?\s*augmented\s+generation/.test(normalizedQuery)) expanded.push('rag');
    if (/\brag\b|检索增强生成/.test(normalizedQuery)) expanded.push('rag');
    if (/图神经网络|graph neural network|\bgnn\b/.test(normalizedQuery)) expanded.push('gnn');
    if (/mapreduce/.test(normalizedQuery)) expanded.push('mapper', 'reducer');
    const unique = [...new Set(expanded)];
    if (!unique.length) return { queryTokens: unique, candidates: [], hits: [] };
    const idx = getIndex();
    const scored = [];
    idx.tokenLists.forEach((tokens, recordIndex) => {
      if (tokens.length < 4) return;
      const record = idx.units[recordIndex];
      const sectionLabel = `${record.topic} ${record.sectionPath}`;
      if (toolEvaluationIntent && !/\btool|工具/i.test(sectionLabel)) return;
      if (baseTokens.length === 2) {
        const contentTokens = new Set(tokenize(`${sectionLabel} ${record.originalParagraph}`));
        if (!baseTokens.every(token => contentTokens.has(token))) return;
      }
      const rawBody = record.originalParagraph.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/https?:\/\/\S+/g, ' ').replace(/<[^>]+>/g, ' ').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
      if (rawBody.length < 34) return;
      const bodyFreq = new Map();
      tokenize(record.originalParagraph).forEach(token => bodyFreq.set(token, (bodyFreq.get(token) || 0) + 1));
      const topicFreq = new Map();
      tokenize(record.topic).forEach(token => topicFreq.set(token, (topicFreq.get(token) || 0) + 1));
      let score = 0;
      let matched = 0;
      let bodyMatched = 0;
      for (const token of unique) {
        const inBody = bodyFreq.get(token) || 0;
        const f = inBody + Math.min(1, topicFreq.get(token) || 0) * 0.3;
        if (!f) continue;
        matched++;
        if (inBody) bodyMatched++;
        const n = idx.docFreq.get(token) || 0;
        const idf = Math.log(1 + (idx.total - n + 0.5) / (n + 0.5));
        const queryWeight = token === 'rag' && /retrieval\s*[- ]?\s*augmented\s+generation/.test(normalizedQuery) ? 6 : 1;
        score += queryWeight * idf * (f * 1.9) / (f + 1.9 * (0.25 + 0.75 * tokens.length / idx.avgLength));
      }
      if (!bodyMatched) return;
      const topicMatchesSubject = unique.some(token => topicFreq.has(token));
      if (definitionIntent && topicMatchesSubject && /定义|definition|概念/i.test(record.topic) && record.sectionStart) score *= 3.5;
      if (definitionIntent && topicMatchesSubject && /introduction|overview|概述/i.test(record.topic) && /是.{0,12}(模型|系统|方法)|\bis a\b|\bis an\b/i.test(rawBody)) score *= 2.7;
      if (definitionIntent && topicMatchesSubject && /是什么|是.{0,10}(模型|系统|方法)|\bis (?:a|an)\b/i.test(rawBody)) score *= 1.7;
      const chineseSubject = subjectQuery.match(/[\u4e00-\u9fff]{4,}/)?.[0];
      if (definitionIntent && chineseSubject && record.topic.includes(chineseSubject)) score *= 2.2;
      // “Agent” is not interchangeable with “multi-agent system”.
      if (/\bagents?\b|智能体/.test(normalizedQuery) && !/multi[- ]?agent|多智能体/.test(normalizedQuery) && /multi[- ]?agent|多智能体/i.test(record.topic)) score *= 0.12;
      if (toolEvaluationIntent && /\bevaluat|评估|selection|指标|metric/i.test(sectionLabel)) score *= 2.2;
      if (toolEvaluationIntent) {
        const dimensions = ['selection', 'arguments', 'trajectory', 'task', 'efficiency', 'reliability', 'safety'];
        const covered = dimensions.filter(term => new RegExp(`\\b${term}\\b`, 'i').test(rawBody)).length;
        if (covered >= 3) score *= 1 + Math.min(covered, 6) * 0.55;
      }
      if (mapreduceProcessIntent && /pipeline|workflow|流程/i.test(record.topic)) score *= 2;
      if (agentProcessIntent && /agent|智能体/i.test(sectionLabel) && /观察|行动|感知|决策|observe|act/i.test(rawBody)) score *= 2.3;
      if (/\bagent\s+memory|智能体记忆/.test(normalizedQuery) && /智能体.*记忆|agent memory/i.test(record.topic)) score *= 2.2;
      if (/\bhdfs\b/.test(normalizedQuery) && /\bmemory\b|内存/.test(normalizedQuery) && /memory|内存/i.test(record.topic) && /hdfs|namenode/i.test(record.sectionPath)) score *= 2.5;
      if (score > 0) scored.push({ record, score, coverage: matched / unique.length });
    });
    scored.sort((a, b) => b.score - a.score || a.record.id.localeCompare(b.record.id));
    if (unique.length === 1 && unique[0] === 'memory') {
      const agentMemory = scored.find(hit => /LLM for Agent|Agentic Computing/i.test(hit.record.source.course || '') && /memory|记忆/i.test(hit.record.topic));
      const computerMemory = scored.find(hit => /Big Data Computing/i.test(hit.record.source.course || '') && /memory|内存/i.test(hit.record.topic));
      if (agentMemory && computerMemory) {
        const hits = [agentMemory, computerMemory];
        return { queryTokens: unique, candidates: hits, hits, clarification: 'Do you mean agent memory or computer memory? Please include the topic in your question.' };
      }
    }
    // Require evidence strength and some query coverage to reduce accidental matches.
    const candidates = [];
    const seenSections = new Set();
    for (const candidate of scored) {
      const sectionKey = `${candidate.record.source.file}\u0000${candidate.record.sectionPath}`;
      if (seenSections.has(sectionKey)) continue;
      candidates.push(candidate);
      seenSections.add(sectionKey);
      if (candidates.length >= limit) break;
    }
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

  function renderAnswer(hits, clarification) {
    answer.replaceChildren();
    if (clarification) {
      answer.className = 'rag-v2-answer';
      answer.append(make('p', '', clarification));
      return;
    }
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
    renderAnswer(result.hits, result.clarification);
    results.hidden = false;
    feedback.textContent = result.clarification
      ? 'The question has more than one possible course topic.'
      : result.hits.length
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

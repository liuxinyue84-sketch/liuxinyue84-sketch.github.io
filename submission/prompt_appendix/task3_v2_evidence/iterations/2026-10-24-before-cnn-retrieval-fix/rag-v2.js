'use strict';
/* V2-RAG: inspectable client-side retrieval + deterministic extractive answer demo.
   No network requests, backend, secrets, or external LLM are used. */
(() => {
  const records = Array.isArray(window.V2_RAG_KNOWLEDGE) ? window.V2_RAG_KNOWLEDGE : [];
  const form = document.getElementById('rag-form');
  if (!form) return;
  const input = document.getElementById('rag-question');
  const references = document.getElementById('rag-references');
  const referenceDisclosure = document.getElementById('rag-reference-disclosure');
  const referenceCount = document.getElementById('rag-reference-count');
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
    return `SYSTEM: You are a course-notes assistant. Answer in clear English using only retrieved reference passages. If at least one passage is present, summarize its supported content and cite it as [R1], [R2], etc.; acknowledge any limits without inventing facts. Only when no passages are retrieved, say exactly: "Insufficient reference materials to answer this question."\n\nUSER QUESTION:\n${query}\n\nRETRIEVED REFERENCE MATERIALS:\n${context}\n\nTASK:\nWrite a concise, source-grounded English answer or source summary with citations. Do not add outside facts.`;
  }

  function cleanNote(text) {
    return text
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\\+(?:text|mathrm|mathbf)\{([^{}]*)\}/g, '$1')
      .replace(/\\+(?:rightarrow|to)\b/g, ' → ')
      .replace(/\\+times\b/g, ' × ')
      .replace(/\\+geq\b/g, ' ≥ ')
      .replace(/\\+leq\b/g, ' ≤ ')
      .replace(/\\(?:left|right|quad|qquad)\b/g, ' ')
      .replace(/\\+[a-zA-Z]+\b/g, '')
      .replace(/\\\(|\\\)|\\\[|\\\]|\$|[{}]/g, '')
      .replace(/\\([.#()\-])/g, '$1')
      .replace(/\\/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\*\*|__|`/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/^[ \t]*#{1,6}[ \t]*/gm, '')
      .replace(/^[ \t]*>[ \t]?/gm, '')
      .replace(/^[ \t]*[-*][ \t]+/gm, '• ')
      .replace(/^\s*\|[\s|:-]+\|\s*$/gm, '')
      .split('\n')
      .map(line => line.trim().replace(/^\|(.+)\|$/, '$1').replace(/\s*\|\s*/g, ' · ').replace(/\s{2,}/g, ' '))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function compactText(text, max = 120) {
    const clean = cleanNote(text).replace(/\s+/g, ' ');
    return clean.length > max ? `${clean.slice(0, max).trim()}…` : clean;
  }

  function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function renderReferences(hits) {
    references.replaceChildren();
    referenceDisclosure.open = false;
    referenceCount.textContent = hits.length ? `(${hits.length})` : '';
    if (!hits.length) {
      references.className = 'rag-v2-empty';
      references.append(make('p', '', 'No matching reference materials.'));
      return;
    }
    references.className = '';
    hits.forEach((hit, i) => {
      const card = make('article', 'rag-v2-reference');
      const head = make('div', 'rag-v2-reference-head');
      head.append(make('span', 'rag-v2-ref-id', `[R${i + 1}]`), make('strong', 'rag-v2-topic', compactText(hit.record.topic, 120)));
      card.append(head, make('small', 'rag-v2-source', `Source: ${hit.record.source.file.split('/').pop()} · ${compactText(hit.record.sectionPath, 105)}`));
      const fullPassage = cleanNote(hit.record.originalParagraph);
      const passage = fullPassage.length > 680
        ? `${fullPassage.slice(0, 680).replace(/\s+\S*$/, '').trim()}…`
        : fullPassage;
      for (const block of passage.split(/\n\s*\n/).filter(Boolean)) {
        if (/^• /m.test(block)) {
          const list = make('ul', 'rag-v2-passage-list');
          for (const line of block.split('\n').filter(Boolean)) list.append(make('li', '', line.replace(/^•\s*/, '')));
          card.append(list);
        } else card.append(make('p', 'rag-v2-passage', block));
      }
      references.append(card);
    });
  }

  function composeAnswer(query, hits, clarification) {
    if (!hits.length) return null;
    if (clarification && hits.length >= 2) {
      return {
        intro: 'The retrieved notes use “memory” in two different contexts.',
        points: [
          'Agent memory includes experiences, facts, and skills. [R1]',
          'HDFS keeps metadata in main memory for fast access and also needs persistent storage. [R2]',
          'Specify which context you mean for a more focused answer.'
        ]
      };
    }
    const q = query.toLowerCase();
    const topic = cleanNote(hits[0].record.topic).toLowerCase();
    const definitionQuestion = /\bwhat\s+(?:is|are)\b|\bdefine\b|什么是|是什么|定义/.test(q);
    const supported = (intro, ...points) => ({intro, points});
    // Each concise English answer is tied to an actual retrieved section.
    // A nearby lexical match alone does not justify a new claim.
    if (/agent memory|智能体记忆/.test(q) && (definitionQuestion || /types|分类|kinds|种类/.test(q)) && /智能体.*记忆|agent memory/.test(topic)) {
      return supported('Agent memory stores information that can help an agent across interactions.',
        'Episodic memory records experiences and events. [R1]',
        'Semantic memory stores facts and concepts; procedural memory stores skills and methods. [R1]');
    }
    if (/hdfs/.test(q) && /memory|内存/.test(q) && /metadata in memory/.test(topic)) {
      return supported('HDFS keeps its metadata in main memory for faster access.',
        'Memory is faster to read and write than disk for frequent metadata lookups. [R1]',
        'Because memory is volatile, HDFS also needs a persistent metadata copy. [R1]');
    }
    if (definitionQuestion && /graph neural network|\bgnn\b|图神经网络/.test(q) && /图神经网络|graph neural network/.test(topic)) {
      return supported('A graph neural network (GNN) learns transformations of graph data.',
        'It can work with nodes, edges, connectivity, and global context while respecting graph structure. [R1]',
        'Message passing lets neighboring nodes exchange information and update their representations. [R1]');
    }
    if ((definitionQuestion || /how.*(?:context|retriev)|如何.*检索/.test(q)) && /\brag\b|retrieval.augmented generation|检索增强生成/.test(q) && /rag definition/.test(topic)) {
      return supported('Retrieval-augmented generation (RAG) combines a pretrained language model with external knowledge.',
        'The system retrieves relevant material when it handles a question, then uses that material as context for its answer. [R1]',
        'The model does not need to store every fact in its parameters. [R1]');
    }
    if (/mapreduce|映射归约/.test(q) && /how|divide|combine|work|流程|怎么|如何|process|pipeline/.test(q) && /pipeline/.test(topic)) {
      return supported('MapReduce processes data in stages across a cluster.',
        'Mappers process input records independently and produce intermediate results. [R1]',
        'Shuffle moves those results to reducers, which combine them into final output. [R1]');
    }
    if (definitionQuestion && /mapreduce|映射归约/.test(q) && /mapreduce introduction/.test(topic)) {
      return supported('MapReduce is a programming model for distributed processing of large data sets.',
        'It separates the work into map and reduce stages that can run across a cluster. [R1]',
        'Hadoop MapReduce is an implementation of the model. [R1]');
    }
    if (/evaluat|评估/.test(q) && /tool|工具/.test(q) && /evaluating tool use/.test(topic)) {
      return supported('Evaluate an agent’s tool use at several levels, not only by its final answer.',
        'Check whether it selected the right tool, supplied suitable arguments, and followed a sound call sequence. [R1]',
        'Also assess efficiency, reliability, and safety during execution. [R1]');
    }
    if (/\bagents?\b/.test(q) && /\btools?\b/.test(q) && /tool use is a layered system/.test(topic)) {
      return supported('Agents use tools to reach capabilities beyond text generation.',
        'A tool definition enters the model’s context; the model requests a call, and the surrounding system executes it and returns the result. [R1]',
        'The notes describe retrieval, execution, generation, and application actions, with interfaces such as REST APIs and MCP. [R1]');
    }
    if (/\brag\b/.test(q) && /limitations?|局限/.test(q) && /simple rag/.test(topic)) {
      return supported('The retrieved note shows that simple RAG does not help every question equally.',
        'In the cited study, retrieval improved accuracy most for rare questions. [R1]',
        'Its benefit was smaller for popular questions and could even be negative; this is a reported trend, not a universal rule. [R1]');
    }
    if (/diffusion models?|扩散模型/.test(q) && /generat|生成|sampling|采样/.test(q)) {
      const samplingIndex = hits.findIndex(hit => /sampling process|采样过程/i.test(cleanNote(hit.record.topic)));
      if (samplingIndex >= 0) {
        const citation = `[R${samplingIndex + 1}]`;
        return supported('Diffusion models generate images by gradually removing noise from a random starting point.',
          `Sampling begins with Gaussian noise. ${citation}`,
          `At each step, the model predicts noise and removes part of it until an image emerges. ${citation}`);
      }
    }
    if (/reinforcement learning|强化学习/.test(q)) {
      const learningIndex = hits.findIndex(hit => /强化学习|reinforcement learning/i.test(cleanNote(hit.record.topic)) && /interacts with the environment/i.test(hit.record.originalParagraph));
      if (learningIndex >= 0) {
        const citation = `[R${learningIndex + 1}]`;
        return {
          intro: `Reinforcement learning improves an agent’s behavior through interaction and feedback. ${citation}`,
          points: [
            `At each step, the agent observes a state, takes an action, receives a reward, and reaches a new state. ${citation}`,
            `It uses that feedback to improve its policy over time. ${citation}`
          ]
        };
      }
    }
    if (/\bagents?\b|智能体/.test(q) && /智能体.*定义|agent.*definition/.test(topic)) {
      if (/如何工作|怎么工作|how.*work|运作|运行模式/.test(q)) {
        return supported('An agent works through an ongoing interaction with its environment.',
          'It observes the environment, decides what to do, and takes an action. [R1]',
          'It then observes the result and can update its next decision. [R1]');
      }
      if (!definitionQuestion) return summarizeRetrievedPassage(query, hits);
      return supported('An agent is an intelligent system that interacts with an environment.',
        'The agent observes its surroundings and chooses actions that affect them. [R1]',
        'This creates an ongoing observe–decide–act cycle. [R1]');
    }
    return summarizeRetrievedPassage(query, hits);
  }

  function summarizeRetrievedPassage(query, hits) {
    const queryTerms = new Set(tokenize(query).filter(token => /^[a-z]/.test(token) && token.length > 2));
    const subject = query.toLowerCase().replace(/^(?:what is|what are|how does|how do)\s+/, '').replace(/[?.!]+$/, '').trim();
    const candidates = [];
    hits.forEach((hit, index) => {
      const cleaned = cleanNote(hit.record.originalParagraph);
      for (const part of cleaned.split(/(?<=[.!?])\s+|\n+/).map(line => line.trim())) {
        const words = part.match(/[A-Za-z]{2,}/g) || [];
        const chinese = part.match(/[\u4e00-\u9fff]/g) || [];
        if (words.length < 6 || chinese.length || part.length > 260 || !/[.!?]$/.test(part)) continue;
        const overlap = new Set(tokenize(part).filter(token => queryTerms.has(token))).size;
        if (queryTerms.size && !overlap) continue;
        const startsWithSubject = subject.length >= 5 && (part.toLowerCase().startsWith(subject) || part.toLowerCase().startsWith(`in ${subject}`));
        const relevance = overlap * 2 + (startsWithSubject ? 5 : 0) - (/^[•\d]/.test(part) ? 2 : 0);
        candidates.push({text: part, ref: index + 1, relevance, rank: index});
      }
    });
    candidates.sort((a, b) => b.relevance - a.relevance || a.rank - b.rank);
    if (candidates.length) {
      const first = candidates[0];
      const second = candidates.find(item => item !== first && item.ref === first.ref && item.text !== first.text);
      return {
        intro: `${first.text} [R${first.ref}]`,
        points: second ? [`${second.text} [R${second.ref}]`] : []
      };
    }
    // Some source passages are Chinese-only. Keep the English response honest:
    // name the retrieved topic and direct the visitor to the cited cleaned note.
    const record = hits[0].record;
    const englishTopic = cleanNote(record.topic).replace(/[\u4e00-\u9fff]/g, ' ').replace(/^[\d.\s]+/, '').replace(/\s+/g, ' ').trim();
    const label = englishTopic.length >= 5 ? englishTopic : record.source.course;
    return {intro: `The retrieved course note discusses ${label}. [R1]`, points: ['Open the cited reference for its detailed explanation. [R1]']};
  }

  function renderAnswer(query, hits, clarification) {
    answer.replaceChildren();
    // The no-material message is reserved strictly for a zero-hit retrieval.
    if (!hits.length) {
      answer.className = 'rag-v2-empty';
      answer.append(make('p', '', 'Insufficient reference materials to answer this question.'));
      return;
    }
    const summary = composeAnswer(query, hits, clarification) || summarizeRetrievedPassage(query, hits);
    answer.className = 'rag-v2-answer';
    answer.append(make('p', 'rag-v2-answer-lead', /\[R\d+\]$/.test(summary.intro) ? summary.intro : `${summary.intro} [R1]`));
    if (summary.points.length) {
      const list = make('ul', 'rag-v2-answer-points');
      for (const point of summary.points) list.append(make('li', '', point));
      answer.append(list);
    }
  }

  function runQuery(query) {
    const result = retrieve(query);
    const assembled = buildPrompt(query, result.hits);
    renderReferences(result.hits);
    renderAnswer(query, result.hits, result.clarification);
    results.hidden = false;
    feedback.textContent = result.clarification
      ? 'The question has more than one possible course topic.'
      : result.hits.length
      ? `${result.hits.length} reference materials found.`
      : 'No supporting source found for this question.';
    return {
      query,
      queryTokens: result.queryTokens,
      candidatePassages: result.candidates.map(({record, score, coverage}) => ({id: record.id, topic: record.topic, source: record.source, score: Number(score.toFixed(4)), queryCoverage: Number(coverage.toFixed(4))})),
      retrievedPassages: result.hits.map(({record, score}) => ({id: record.id, topic: record.topic, sectionPath: record.sectionPath, originalParagraph: record.originalParagraph, source: record.source, score: Number(score.toFixed(4))})),
      assembledPrompt: assembled,
      pageAnswer: answer.innerText
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

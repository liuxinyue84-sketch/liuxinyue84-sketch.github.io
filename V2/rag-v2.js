'use strict';
/* V2-RAG — inspectable retrieval and grounded answering for a static site.
   Pipeline: question → BM25 recall → title-gated relevance → evidence selection
   → cited answer (lead statement + ordered points) → folded reference trace.
   No network requests, no backend, no API keys and no live language model. */
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
  const FALLBACK = 'Insufficient reference materials to answer this question.';

  const STOP = new Set(('a an the and or but if of at by for from in into is are was were be been it its this that these those i you he she we they me my your what which who when where why how do does did can could should would may might will about above after again all also am any as because before between both each few has have had here there more most other over own same so than too very just with through during without on off out up down then once some such please tell explain describe discuss to thing class recipe best stuff'.split(' ')));
  /* Bilingual glossary used for query expansion only. It lets an English
     question reach Chinese-language notes and the reverse; it is not a
     per-topic answer table. */
  const ALIASES = [
    ['rag', '检索增强生成'], ['agent', '智能体'], ['gnn', '图神经网络'],
    ['cnn', '卷积神经网络'], ['gan', '生成对抗网络'], ['attention', '注意力'],
    ['memory', '记忆'], ['retrieval', '检索'], ['clustering', '聚类'],
    ['overfitting', '过拟合'], ['underfitting', '欠拟合'], ['diffusion', '扩散'],
    ['reinforcement learning', '强化学习'], ['embedding', '嵌入'],
    ['chunking', '分块'], ['hallucination', '幻觉'], ['planning', '规划'],
    ['tool', '工具'], ['prompt', '提示'], ['token', '词元']
  ];
  const tokenCache = new Map();
  let index;

  /* Light suffix stripping so "evaluating", "evaluated" and "evaluate" meet,
     and "tools" meets "tool". Counts are small and predictable. */
  function stem(word) {
    let value = word;
    if (value.length > 6 && /(?:ing|ed)$/.test(value)) value = value.replace(/(?:ing|ed)$/, '');
    else if (value.length > 5 && /ies$/.test(value)) value = value.replace(/ies$/, 'y');
    else if (value.length > 5 && /es$/.test(value)) value = value.replace(/es$/, '');
    else if (value.length > 3 && /s$/.test(value) && !/ss$/.test(value)) value = value.replace(/s$/, '');
    if (value.length > 4 && /e$/.test(value)) value = value.replace(/e$/, '');
    return value;
  }

  function tokenize(text) {
    if (tokenCache.has(text)) return tokenCache.get(text);
    const tokens = [];
    for (const word of (text.toLowerCase().match(/[a-z0-9]+/g) || [])) {
      if (STOP.has(word)) continue;
      const normalized = stem(word);
      if (normalized.length > 1 && !STOP.has(normalized)) tokens.push(normalized);
    }
    for (const run of (text.match(/[\u4e00-\u9fff]+/g) || [])) {
      if (run.length === 1) tokens.push(run);
      else for (let i = 0; i < run.length - 1; i++) tokens.push(run.slice(i, i + 2));
    }
    tokenCache.set(text, tokens);
    return tokens;
  }

  function hasCJK(text) {
    return /[\u4e00-\u9fff]/.test(text || '');
  }

  /* The course notes are bilingual: an English statement from the lecture is
     followed by its Chinese rendering on the same line. A Chinese answer must
     quote only the Chinese side, otherwise it echoes the classroom original
     word for word. A clause with almost no Chinese left is the English half of
     such a pair, so it is dropped; a long English lead-in is cut at the point
     where the translation starts. */
  function zhOnly(piece) {
    /* Clauses end at Chinese punctuation and at the full stop of an English
       sentence, which is how the two halves of a bilingual line are joined. */
    const clauses = String(piece || '').split(/(?<=[。！？；\n])|(?<=\.)\s+/).map(item => item.trim()).filter(Boolean);
    const kept = [];
    for (const clause of clauses) {
      const cjk = (clause.match(/[\u4e00-\u9fff]/g) || []).length;
      const latin = (clause.match(/[A-Za-z]/g) || []).length;
      if (!cjk) continue;
      if (cjk / (cjk + latin) < 0.18) continue;
      let text = clause;
      const firstCjk = text.search(/[\u4e00-\u9fff]/);
      /* A quoted English original that runs straight into its translation. */
      if (firstCjk > 28) text = text.slice(firstCjk);
      else text = text.replace(/[A-Za-z][A-Za-z0-9 ,.'"()\-/:;]{24,}/g, ' ');
      if ((text.match(/[\u4e00-\u9fff]/g) || []).length < 6) continue;
      kept.push(text);
    }
    const text = kept.join('').replace(/\s{2,}/g, ' ').replace(/^[\s，。；、]+/, '').trim();
    return text.length >= 10 ? text : '';
  }

  function escapeRe(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /* Markdown, LaTeX and table debris are stripped before anything is shown. */
  function cleanNote(text) {
    return String(text || '')
      .replace(/^\s*```[^\n]*$/gm, '')
      .replace(/\$[^$\n]{0,500}\$/g, '')
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
      .replace(/\*\*|__|`|~~/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/^[ \t]*#{1,6}[ \t]*/gm, '')
      .replace(/^[ \t]*>[ \t]?/gm, '')
      .replace(/^[ \t]*[-*][ \t]+/gm, '• ')
      .replace(/^[ \t]*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/gm, '')
      .replace(/^\s*\|[\s|:-]+\|\s*$/gm, '')
      .split('\n')
      .map(line => line.trim().replace(/^\|(.+)\|$/, '$1').replace(/\s*\|\s*/g, ' · ').replace(/\s{2,}/g, ' '))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function compact(text, max = 120) {
    const clean = cleanNote(text).replace(/\s+/g, ' ');
    return clean.length > max ? `${clean.slice(0, max).trim()}…` : clean;
  }

  function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function getIndex() {
    if (index) return index;
    /* Neighbouring short paragraphs of one section form a single answer unit.
       The 9,831 source records stay untouched for provenance. */
    const units = [];
    let unit;
    let key = '';
    for (const record of records) {
      const nextKey = `${record.source.file}\u0000${record.sectionPath}`;
      const paragraph = String(record.originalParagraph || '').trim();
      if (!paragraph) continue;
      const searchable = paragraph.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/https?:\/\/\S+/g, '').trim();
      if (!searchable) continue;
      const join = unit && key === nextKey && unit.recordIds.length < 10 && unit.originalParagraph.length + paragraph.length < 900;
      if (join) {
        unit.originalParagraph += `\n\n${paragraph}`;
        unit.recordIds.push(record.id);
        unit.id = `${unit.recordIds[0]}–${record.id}`;
      } else {
        unit = {...record, recordIds: [record.id]};
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
    index = {docFreq, tokenLists, units, avgLength, total: units.length};
    return index;
  }

  /* ---------------- query understanding ---------------- */

  const INTENT_WORDS = new Set(['what', 'define', 'definition', 'how', 'why', 'work', 'works', 'working', 'compare', 'comparison', 'difference', 'differences', 'example', 'examples', 'application', 'applications', 'use', 'uses', 'used', 'using', 'role', 'purpose', 'process', 'step', 'steps', 'workflow', 'problem', 'problems', 'limitation', 'limitations', 'challenge', 'challenges', 'mean', 'means', 'describe', 'explain', 'list', '几个', '举', '例子', '示例', '应用', '场景', '作用', '意义', '影响', '对比', '比较', '区别', '差异', '如何', '怎么', '为什么', '什么', '是什', '么是', '定义', '局限', '问题', '挑战', '流程', '步骤', '过程', '原理', '机制', '介绍', '说明']);

  function analyze(query) {
    const lower = query.toLowerCase().replace(/[‐‑‒–—]/g, '-');
    const cjkCount = (query.match(/[\u4e00-\u9fff]/g) || []).length;
    const latinWords = (query.match(/[A-Za-z][A-Za-z0-9-]*/g) || []).length;
    const lang = cjkCount >= 2 && latinWords <= 2 ? 'zh' : 'en';
    const intent = /对比|比较|区别|差异|versus|\bvs\b|compare|difference/.test(lower) ? 'comparison'
      : /例子|示例|应用场景|举|examples?|applications?|use cases?/.test(lower) ? 'example'
      : /局限|缺点|不足|问题|挑战|limitations?|problems?|challenges?/.test(lower) ? 'limitation'
      : /为什么|原因|意义|作用|影响|why|importance|impact|role|purpose/.test(lower) ? 'reason'
      : /如何|怎么|流程|步骤|过程|原理|机制|how|process|steps|workflow/.test(lower) ? 'process'
      : /什么是|是什么|定义|what is|what are|define/.test(lower) ? 'definition'
      : 'general';
    /* A secondary how/why clause must not dilute the main subject. */
    const primary = lower.split(/\s+(?:and|as well as|以及|并且|同时)\s+(?=(?:how|why|what|where|when|如何|怎么|为什么|什么))/i)[0];
    const subjectText = primary
      .replace(/什么是|是什么意思|是什么|的定义|定义|如何工作|怎么工作|怎样工作|如何|怎么样|怎么|为什么|有哪些|介绍一下|介绍|请问|的?(作用|意义|影响|区别|差异|对比|比较|局限|问题|挑战|流程|步骤|原理|机制)/g, ' ')
      .replace(/\b(?:what|is|are|was|were|how|does|do|did|why|when|where|which|who|the|a|an|about|of|to|for|and|or|explain|describe|tell|me|please|compare|differences?|between|role|purpose|limitations?|problems?|challenges?|examples?|applications?|work|works|working)\b/g, ' ');
    /* The primary clause decides what kind of question this is. In "What is X
       and how does it do Y?", X is still being defined, so a secondary how
       clause must not turn the answer into a stage list from another section. */
    /* The shape of the question is read the same way as the intent, from the
       noun the question is about: "what are the limitations of X" asks for the
       limitations, not for a definition, even though it opens with "what are". */
    const titleIntent = /对比|比较|区别|差异|versus|\bvs\b|compare|difference/.test(primary) ? 'comparison'
      : /例子|示例|举|examples?|applications?/.test(primary) ? 'example'
      : /局限|缺点|不足|limitations?|problems?|challenges?/.test(primary) ? 'limitation'
      : /如何|怎么|流程|步骤|过程|how|process|steps/.test(primary) ? 'process'
      : /什么是|是什么|定义|what is|what are|define/.test(primary) ? 'definition'
      : intent;
    const subjectTokens = [...new Set(tokenize(subjectText).filter(token => !INTENT_WORDS.has(token)))];
    const anchors = new Set();
    for (const raw of (query.match(/\b[A-Z][A-Za-z0-9-]{0,11}\b/g) || [])) {
      for (const token of tokenize(raw)) if (/^[a-z0-9-]{2,10}$/.test(token)) anchors.add(token);
    }
    /* Written-out phrases collapse to their initials: retrieval-augmented
       generation → rag, breadth first search → bfs. A conjunction means the
       clause holds two different subjects, so no acronym is inferred. */
    for (const group of (subjectText.toLowerCase().match(/[a-z]+(?:-[a-z]+)+/g) || [])) {
      const parts = group.split('-');
      if (parts.length >= 2 && parts.length <= 5) anchors.add(parts.map(part => part[0]).join(''));
    }
    const phraseWords = (subjectText.toLowerCase().match(/[a-z]+/g) || [])
      .filter(word => !INTENT_WORDS.has(word) && !STOP.has(word));
    if (!/\b(?:and|or)\b|,|和|与|、/.test(primary) && phraseWords.length >= 2 && phraseWords.length <= 4) {
      const initials = phraseWords.map(word => word[0]).join('');
      anchors.add(initials);
    }
    for (const anchor of [...anchors]) if (!/^[a-z]{3,8}$/.test(anchor)) anchors.delete(anchor);
    const weights = new Map();
    for (const token of subjectTokens) weights.set(token, 1);
    for (const anchor of anchors) if (/^[a-z0-9-]{2,10}$/.test(anchor)) weights.set(anchor, 1.1);
    for (const [en, zh] of ALIASES) {
      const phraseHit = lower.includes(en) || query.includes(zh);
      if (!phraseHit) continue;
      /* A translation match is weaker evidence than the asked term itself,
         otherwise a bilingual alias drowns the original subject. */
      if (!weights.has(en) && en.indexOf(' ') < 0) weights.set(en, 0.4);
      for (const token of tokenize(zh)) if (!weights.has(token)) weights.set(token, 0.4);
    }
    const expanded = [...weights.keys()];
    return {
      query,
      lower,
      lang,
      intent,
      titleIntent,
      subjectText: subjectText.trim(),
      subjectTokens,
      anchors: [...anchors],
      expanded,
      weights,
      bareConcept: intent === 'general' && subjectTokens.length > 0 && subjectTokens.length <= 3
    };
  }

  /* ---------------- recall ---------------- */

  function retrieve(query, limit = 7) {
    const profile = analyze(query);
    const tokens = profile.expanded;
    if (!tokens.length) return {profile, queryTokens: [], candidates: [], hits: []};
    const idx = getIndex();
    const scored = [];
    idx.tokenLists.forEach((unitTokens, unitIndex) => {
      if (unitTokens.length < 4) return;
      const record = idx.units[unitIndex];
      const titleTokens = new Set(tokenize(`${record.topic} ${record.sectionPath}`));
      const bodyFreq = new Map();
      tokenize(record.originalParagraph).forEach(token => bodyFreq.set(token, (bodyFreq.get(token) || 0) + 1));
      const topicFreq = new Map();
      const topicTokens = new Set(tokenize(record.topic));
      tokenize(record.topic).forEach(token => topicFreq.set(token, (topicFreq.get(token) || 0) + 1));
      let score = 0;
      let matched = 0;
      let bodyMatched = 0;
      let titleMatched = 0;
      for (const token of tokens) {
        const inBody = bodyFreq.get(token) || 0;
        const inTitle = topicFreq.get(token) || 0;
        const weighted = inBody + Math.min(2, inTitle) * 1.1;
        if (!weighted) continue;
        matched++;
        if (inBody) bodyMatched++;
        if (inTitle) titleMatched++;
        const df = idx.docFreq.get(token) || 0;
        const idf = Math.log(1 + (idx.total - df + 0.5) / (df + 0.5));
        const weight = profile.weights.get(token) || 0.4;
        score += weight * idf * (weighted * 1.9) / (weighted + 1.9 * (0.25 + 0.75 * unitTokens.length / idx.avgLength));
      }
      /* A section can answer from its heading alone: the pipeline section is
         titled MapReduce even though its body says mapping and reducing. */
      if (!(bodyMatched || titleMatched) || !score) return;
      if (!bodyMatched) score *= 1.15;
      const coverage = matched / tokens.length;
      const titleHits = profile.subjectTokens.filter(token => titleTokens.has(token)).length;
      const titleRatio = profile.subjectTokens.length ? titleHits / profile.subjectTokens.length : 0;
      score *= 1 + 1.2 * titleRatio;
      /* A heading that names the subject in the section title itself outranks
         one that only meets it in the parent path. The bonus is additive
         because Chinese bigrams have almost no IDF weight: without it a
         correctly titled section can be cut before the relevance gate runs. */
      const topicHits = profile.subjectTokens.filter(token => topicTokens.has(token)).length;
      if (profile.subjectTokens.length) score += 5 * (topicHits / profile.subjectTokens.length);
      score += coverage * 1.6;
      scored.push({record, score, coverage, titleHits, titleRatio, titleSubject: titleHits > 0 || profile.anchors.some(anchor => new Set(tokenize(record.topic)).has(anchor))});
    });
    /* Heading matches are the evidence gate, so they must reach the gate even
       when a long body elsewhere scores higher on raw term frequency. */
    scored.sort((a, b) => (Number(b.titleSubject) - Number(a.titleSubject)) || (b.score - a.score) || a.record.id.localeCompare(b.record.id));
    const candidates = [];
    const seen = new Set();
    for (const candidate of scored) {
      const sectionKey = `${candidate.record.source.file}\u0000${candidate.record.sectionPath}`;
      if (seen.has(sectionKey)) continue;
      candidates.push(candidate);
      seen.add(sectionKey);
      if (candidates.length >= 40) break;
    }
    const assessed = candidates.map(candidate => assess(candidate, profile));
    const relevant = assessed.filter(item => item.relevant)
      .sort((a, b) => b.score - a.score || a.candidate.record.id.localeCompare(b.candidate.record.id))
      .slice(0, limit);
    return {profile, queryTokens: tokens, candidates: assessed, hits: relevant};
  }

  /* Restrictive modifiers that turn a concept into a *different* concept:
     Self-RAG, Multimodal RAG, 传统 RAG, 多智能体系统, 长期记忆. A section whose
     heading carries one of these is about a variant, so it stays available as
     retrieved evidence but does not speak for the plain concept. The test is
     positional: the modifier must sit before the queried head noun, which is
     how both languages mark a subtype (modifier + head). Aspect words such as
     "Advantages of RAG" or "RAG Definition" follow the head and are not
     modifiers, so they are not affected. */
  const RESTRICTIVE = new Set(['self', 'multi', 'multimodal', 'corrective', 'traditional', 'simple',
    'naive', 'advanced', 'hybrid', 'long', 'short', 'term', 'agentic', 'adaptive', 'iterative',
    'dense', 'sparse', 'active', 'online', 'offline', 'static', 'dynamic', 'full', 'light',
    'mini', 'fast', 'slow', '传统', '多模', '模态', '多智', '多轮', '长期', '短期', '简单', '轻量', '复杂']);

  function isVariant(topic, profile) {
    const subject = new Set(profile.expanded);
    const tokens = tokenize(topic).filter(token => !/^\d+$/.test(token));
    if (!tokens.length) return false;
    /* Only the leading word can turn a term into a subtype ("Self-RAG",
       "传统 RAG", "Multi-turn ..."), and a heading that opens with the queried
       concept itself is never a variant, however it continues. */
    const first = tokens[0];
    return RESTRICTIVE.has(first) && !subject.has(first);
  }

  /* Title-led relevance: a passage may enter the answer only when its heading
     belongs to the queried subject. Body-only keyword hits stay visible in the
     folded reference panel as retrieval evidence. */
  function assess(candidate, profile) {
    const record = candidate.record;
    const idx = getIndex();
    const topic = cleanNote(record.topic);
    const body = cleanNote(record.originalParagraph);
    const topicTokens = new Set(tokenize(topic));
    const pathTokens = new Set(tokenize(record.sectionPath));
    const bodyTokens = new Set(tokenize(body));
    const subject = profile.subjectTokens;
    const matchTokens = profile.expanded;
    const df = token => idx.docFreq.get(token) || 0;
    const rare = token => df(token) <= idx.total * 0.12;
    /* A restrictive modifier on its own never establishes the topic: "self"
       appears in both "self-attention" and "Self-RAG", but the two sections
       are about different things, so the modifier only counts alongside the
       head of the phrase. */
    const primary = subject[subject.length - 1];
    const carries = token => !(RESTRICTIVE.has(token) && token !== primary);
    const subjectInTitle = subject.filter(token => topicTokens.has(token) && carries(token));
    const subjectInPath = subject.filter(token => pathTokens.has(token) && !topicTokens.has(token) && carries(token));
    const aliasInTitle = matchTokens.filter(token => !subject.includes(token) && topicTokens.has(token));
    const aliasInPath = matchTokens.filter(token => !subject.includes(token) && pathTokens.has(token) && !topicTokens.has(token));
    const titleHits = [...subjectInTitle, ...aliasInTitle];
    const pathHits = [...subjectInPath, ...aliasInPath];
    const anchorInTitle = profile.anchors.some(anchor => topicTokens.has(anchor));
    const anchorInPath = profile.anchors.some(anchor => pathTokens.has(anchor));
    /* The head of an English noun phrase is its last word, and Chinese
       compounds behave the same way. */
    const navigation = /目录|粗版大纲|table of contents|outline|navigation/i.test(topic);
    const summary = /小结|总结|summary|recap|回顾|本章/i.test(topic);
    /* Chapter openers and part headings are outlines, not evidence. */
    const chapterHeading = /^(?:part|lecture|chapter)\s*\d+|^\d+\s*$|part\s*\d+\s*[：:]?\s*$/i.test(topic);
    const exercise = /练习|练习题|习题|quiz|exercise|选择题/i.test(topic) && !/解析|答案|解答|原理/i.test(body);
    /* Heading evidence is weighted: the section title itself counts double, a
       parent heading counts once, and a translated alias counts less again.
       This keeps a chapter heading from making every child section relevant. */
    const headingStrength = subjectInTitle.length * 2 + subjectInPath.length
      + aliasInTitle.length + aliasInPath.length * 0.5;
    const headingMatches = anchorInTitle
      || (subject.length === 1 ? subjectInTitle.length >= 1 : headingStrength >= 3)
      || Boolean(primary && topicTokens.has(primary))
      || (subject.length === 1 && subjectInTitle.concat(aliasInTitle).length >= 1 && headingStrength >= 1)
      || subject.some(token => carries(token) && rare(token) && topicTokens.has(token));
    const bodySupported = matchTokens.some(token => bodyTokens.has(token)) || body.replace(/\s+/g, '').length >= 60;
    const relevant = Boolean(subject.length) && headingMatches && bodySupported && !navigation && !exercise;
    const specificityPenalty = Math.min(5, Math.max(0, topicTokens.size - 5) * 0.7);
    const titleBonus = /what is|definition|定义|是什么|introduction|overview|概述|基础/i.test(topic) ? 3.5 : 0;
    const intentTitleBonus = profile.intent === 'process' && /pipeline|workflow|process|mechanism|流程|步骤|过程|原理|机制/i.test(topic) ? 2.5
      : profile.intent === 'limitation' && /limitation|problem|challenge|局限|问题|挑战|不足|缺点/i.test(topic) ? 2.5
      : profile.intent === 'comparison' && /compare|versus|\bvs\b|对比|比较|区别|差异/i.test(topic) ? 2.5
      : profile.intent === 'example' && /example|application|use case|示例|例子|应用场景|案例/i.test(topic) ? 2.5
      : 0;
    /* Definition questions want the section that introduces the concept, not a
       variant of it ("Multimodal RAG", "Corrective RAG"). */
    const conceptIntent = profile.intent === 'definition' || profile.bareConcept;
    const definitionHeading = /definition|what is|定义|是什么|概念|简介|overview|introduction/i.test(topic);
    const phrase = normalizeTitle(profile.subjectText);
    const conceptHead = conceptIntent && profile.subjectTokens.length >= 2 && phrase.length > 3 && normalizeTitle(topic).includes(phrase);
    const extraQualifiers = conceptIntent
      ? [...topicTokens].filter(token => !matchTokens.includes(token) && !/^(?:definition|what|is|are|introduction|overview|concept|定义|概念|概述|简介|基础|是什么|的)$/.test(token) && !/^\d+$/.test(token)).length
      : 0;
    const qualifierPenalty = Math.min(4, extraQualifiers * 0.9);
    const variant = isVariant(topic, profile);
    let score = candidate.score + titleBonus + intentTitleBonus + titleHits.length * 1.2 - specificityPenalty - (summary ? 4 : 0) - qualifierPenalty;
    /* A variant section is still relevant, just less authoritative for a
       question about the plain concept. */
    if (variant && conceptIntent) score *= 0.72;
    if (chapterHeading) score *= 0.55;
    if (evidenceFor(record.topic)) score *= 1.25;
    /* "agent" is not interchangeable with "multi-agent system". */
    if (!/multi[- ]?agent|多智能体|多\s*agent/i.test(profile.lower) && /multi[- ]?agent|多智能体/i.test(topic)) score *= 0.5;
    if (conceptIntent && definitionHeading) score *= 1.8;
    else if (conceptHead) score *= 1.5;
    const reason = relevant
      ? (titleHits.length || anchorInTitle ? 'section heading names the queried subject' : 'section heading sits inside the queried subject')
      : headingMatches ? 'heading matches but the passage carries no usable evidence' : 'keywords appear only in the body or the heading is unrelated';
    return {candidate, record, relevant, score, titleHits, topicMatch: titleHits.length > 0 || anchorInTitle, variant, reason, semanticScore: Number(score.toFixed(4))};
  }

  /* ---------------- prepared English evidence ----------------
     The course notes are bilingual notes of English lectures: the technical
     statements exist in Chinese prose with English terminology. This layer
     holds the English rendering of each answer-bearing section, statement by
     statement, so the browser can quote the notes in English without a
     language model. Claim roles drive selection; the array order is the order
     of the section, which is what a process question needs. */

  const ROLES = {D: 'def', S: 'step', P: 'point', C: 'component', W: 'why', L: 'limit', E: 'example', X: 'compare'};

  const EVIDENCE = [
    {key: '1 3 retrieval-augmented generation', priority: 1, claims: [
      ['D', 'RAG brings external retrieval results into the generation process so the model can use information that is not stored in its parameters.'],
      ['P', 'A language model cannot encode all knowledge, especially long-tail knowledge, and information added after training is not necessarily available to it.'],
      ['P', 'Retraining or fine-tuning can add that knowledge, but the computation and data cost means it does not fit every knowledge update.'],
      ['X', 'Plain LLM use is a closed-book exam, while retrieval-augmented use is an open-book exam with reference material at hand.']
    ]},
    {key: 'rag definition', priority: 2, claims: [
      ['D', 'RAG combines a pretrained language model with external knowledge retrieved at inference time to support answer generation.'],
      ['S', 'The retriever searches the external source for the current question instead of relying on knowledge stored in the model parameters.'],
      ['P', 'The retrieved passages are grounded context for generation rather than the final answer, and the model itself is usually not retrained.'],
      ['P', 'The external source can be local documents, a knowledge base, web search or an API.'],
      ['X', 'RAG supplies knowledge at inference time while fine-tuning changes the model parameters, so updating knowledge means updating the index rather than retraining.']
    ]},
    {key: 'rag 的两个关键步骤', priority: 1, claims: [
      ['D', 'Every RAG system splits the work into retrieval, which collects useful information, and generation, which reasons over that information and answers.'],
      ['S', 'Retrieval decides which information should be handed to the model.'],
      ['S', 'Generation decides how to answer once that information is available.'],
      ['P', 'The split matters because the two failure modes need different repairs: a retrieval failure means the evidence was never found, a generation failure means it was found but used incorrectly.']
    ]},
    {key: 'key idea in rag', priority: 1, claims: [
      ['D', 'A language model already stores extensive knowledge, yet it can still benefit from an efficient retrieval phase.'],
      ['P', 'Retrieval mainly compensates for very recent information and specialised knowledge that training data does not cover or cannot expose.'],
      ['P', 'The knowledge base is pluggable: a question about hotels needs web pages, a question about cooking needs recipes, a question about a course needs the course documents.'],
      ['P', 'RAG augments the model instead of replacing it.']
    ]},
    {key: 'the rag architecture', priority: 1, claims: [
      ['D', 'In the RAG path the prompt is routed to a retriever, the retriever returns relevant documents from a knowledge base, and those documents build the model input.'],
      ['P', 'The retriever receives the query and decides which documents in the knowledge base are relevant.'],
      ['P', 'The knowledge base holds the external knowledge, such as course materials, company documents, web pages or code.'],
      ['P', 'The relevant documents are the output of retrieval and become the context for generation.']
    ]},
    {key: 'advantages of rag', priority: 1, claims: [
      ['D', 'RAG adds missing knowledge, updates knowledge without retraining, supports source citation, separates retrieval from generation and helps alleviate hallucination.'],
      ['P', 'Missing knowledge is filled from an external source, provided that source contains it and the retriever can find it.'],
      ['P', 'A knowledge update touches the data source and the index instead of the model parameters.'],
      ['P', 'Keeping the provenance of each passage is what makes citation possible, and separating the two stages keeps them maintainable.'],
      ['L', 'Every advantage is conditional: if the index is not synchronised, stale content can still be retrieved.']
    ]},
    {key: 'hallucinations in llm outputs', priority: 1, claims: [
      ['D', 'A hallucination is generated content that is factually incorrect or unfaithful to the supplied context.'],
      ['X', 'Factuality asks whether a claim agrees with verifiable real-world facts, while faithfulness asks whether the supplied passages support it.'],
      ['P', 'The two tests are independent: a true statement can still be unsupported by the retrieved context, and an unsupported answer can still happen to be true.']
    ]},
    {key: 'simple rag 的有效性与局限', priority: 1, claims: [
      ['D', 'Simple RAG helps most when the knowledge is rare, because popular knowledge is already stored in the model parameters.'],
      ['P', 'Retrieval gives the largest accuracy gain on rare topics, a clear gain on mid-popularity topics and little or negative gain on popular ones.'],
      ['W', 'Common knowledge is well covered parametrically, while rare knowledge depends on external non-parametric memory.'],
      ['L', 'The simple form still answers with whatever it retrieves, so it cannot flag a weak retrieval or verify that its own answer is grounded.']
    ]},
    {key: '传统 rag 的局限', priority: 1, claims: [
      ['D', 'In traditional RAG the knowledge base is read-only: a query is retrieved, handed to the model and answered, but nothing is written back.'],
      ['L', 'A read-only long-term memory is what separates traditional RAG from agent memory, which can write, update and consolidate what it has retrieved.']
    ]},
    {key: 'self-rag 的核心机制', priority: 1, claims: [
      ['D', 'Self-RAG adds learned reflection tokens so the model decides when to retrieve, whether the retrieved evidence is relevant and whether its own answer is supported.'],
      ['S', 'Retrieve? decides before retrieval whether external knowledge is needed at all.'],
      ['S', 'Relevant? decides after retrieval whether the documents are relevant to the question.'],
      ['S', 'Supported? decides after generation whether the answer is grounded in the evidence.'],
      ['P', 'Traditional RAG uses a fixed retrieve-then-generate pipeline, so these decisions are not learned; Self-RAG brings them into the model decision process.']
    ]},
    {key: 'bm25 scoring', priority: 1, claims: [
      ['D', 'BM25 is the Best Matching 25 ranking function, built on the Okapi retrieval system and tuned across TREC evaluation campaigns.'],
      ['P', 'It adds term-frequency saturation, so a term appearing twenty times scores less than twice a term appearing ten times.'],
      ['P', 'It replaces a fixed length penalty with tunable document-length normalisation controlled by the parameter b.'],
      ['P', 'Its two parameters, k1 and b, are products of empirical tuning rather than values derived from theory.']
    ]},
    {key: 'word embedding space', priority: 1, claims: [
      ['D', 'An embedding maps a text unit to a vector so that texts with similar meaning end up close together in that space.'],
      ['P', 'Embeddings can work at word, sentence or document granularity, and each granularity has its own model.'],
      ['P', 'Chunking is really a choice of granularity: chunks that are too small split a fact from its explanation, and chunks that are too large dilute one vector across several topics.']
    ]},
    {key: '语义分块', priority: 1, claims: [
      ['D', 'Semantic chunking sets boundaries from the semantic similarity of neighbouring text rather than from a fixed character length.'],
      ['S', 'The current chunk and the next sentence are encoded as vectors and their semantic distance is computed.'],
      ['S', 'A preset threshold decides whether the sentence joins the current chunk, and the test repeats sentence by sentence to the end of the document.'],
      ['P', 'The course material measures that distance with cosine distance, one minus the cosine similarity.']
    ]},
    {key: 'sparse retrieval 与 dense retrieval', priority: 1, claims: [
      ['D', 'Sparse retrieval represents a document by terms and their statistics, while dense retrieval represents it as a learned vector.'],
      ['P', 'A sparse pipeline runs from the document through tokenisation and an inverted index to relevance scoring.'],
      ['P', 'TF-IDF multiplies term frequency by inverse document frequency, and BM25 adds saturation and length normalisation on top of it.']
    ]},
    {key: 'corrective rag', priority: 1, claims: [
      ['D', 'Corrective RAG grades retrieved documents before generation and chooses a knowledge-handling strategy from that grade.'],
      ['S', 'Reliable evidence is used directly, while irrelevant or ambiguous evidence triggers a query rewrite and an external search before answering.'],
      ['W', 'The grade exists because a wrong retrieval can push the generator towards an answer that looks plausible but is wrong.']
    ]},
    {key: 'generative pre-trained transformer', priority: 2, claims: [
      ['D', 'GPT is a stack of Transformer blocks: the input is embedded and positionally encoded, passed through L identical blocks, then normalised, projected and softmaxed into a next-token distribution.'],
      ['C', 'A Transformer block is the repeated unit, and the whole model is that unit stacked L times.'],
      ['C', 'Inside a block the input is normalised and projected into three routes, query, key and value, which feed the multi-head attention sub-layer.'],
      ['C', 'Multi-head attention runs several heads in parallel, each with its own matrix multiplication, mask, softmax and dropout, and a linear layer merges their outputs.'],
      ['C', 'Residual connections sit after attention and after the feed-forward sub-layer, each followed by layer normalisation.']
    ]},
    {key: 'attention patterns', priority: 1, claims: [
      ['D', 'An attention pattern defines which tokens a given token is allowed to attend to.'],
      ['X', 'Bidirectional attention lets a token see other tokens in the sequence, while causal attention lets position t see only itself and earlier positions.'],
      ['P', 'Causal attention is enforced with a mask that sets future positions to minus infinity before the softmax.'],
      ['P', 'An encoder-decoder model uses bidirectional attention in the encoder and causal attention in the decoder, which reaches the encoder through cross-attention.']
    ]},
    {key: 'vision transformer', priority: 1, claims: [
      ['D', 'Vision Transformer applies the Transformer architecture from NLP directly to images.'],
      ['S', 'The image is cut into fixed-size patches such as 16 by 16 pixels, each patch is linearly embedded with position information, and the embeddings go into a standard Transformer encoder.']
    ]},
    {key: 'mapreduce pipeline', priority: 3, claims: [
      ['D', 'A MapReduce job runs in three stages, mapping, shuffling and reducing, keeping communication small and treating every record independently.'],
      ['S', 'Mapping: each node applies its mapper to the data it has already loaded locally.'],
      ['S', 'Shuffling: nodes exchange the intermediate data produced by the mappers.'],
      ['S', 'Reducing: reducers merge the results of the different mappers, produce the final output and store it locally.']
    ]},
    {key: 'mapreduce steps', priority: 0, claims: [
      ['D', 'Using MapReduce means checking that the problem is parallelisable and the data is write-once-read-many, then writing the two functions and launching the job.'],
      ['S', 'Decide whether the problem is parallelisable and solvable with MapReduce.'],
      ['S', 'Check that the data is write-once-read-many, which is what makes lock-free parallel access possible.'],
      ['S', 'Design and implement the Mapper class and the Reducer class.'],
      ['S', 'Configure the number of mappers and reducers and the input and output streams, load the data, then launch and monitor the job.']
    ]},
    {key: 'the core idea of mapreduce', priority: 1, claims: [
      ['D', 'The core idea is to move operations near the data and replace shared state with local state, so that locking is largely unnecessary.'],
      ['P', 'Each worker keeps its own counter table on local disk and updates only that table.'],
      ['P', 'Correctness then comes from partitioning, because the local tables are merged once the workers finish.']
    ]},
    {key: '5 1 1 input and output', priority: 1, claims: [
      ['D', 'The input of a MapReduce job is a directory or a dataset rather than a single file, and the output is a list of key-value pairs.'],
      ['P', 'The split granularity is decided at run time, and the key-value form is the interface between map and reduce.'],
      ['P', 'Input is large and output is small, so the shuffle moves far less data than the input size.']
    ]},
    {key: 'hdfs architecture', priority: 1, claims: [
      ['D', 'An HDFS cluster has a NameNode that manages the namespace and regulates access to files, plus DataNodes that store the actual data.'],
      ['P', 'There is usually one DataNode per machine, and each DataNode manages the storage attached to its own machine.'],
      ['P', 'A Secondary NameNode helps merge metadata; it is not a standby master and does not take over from the NameNode.']
    ]},
    {key: 'hdfs data replication', priority: 1, claims: [
      ['D', 'HDFS keeps several replicas of every block, and no two replicas of the same block sit on the same node.'],
      ['P', 'Five blocks with three replicas each occupy fifteen block positions across five nodes, so one failed machine still leaves two copies of every affected block.']
    ]},
    {key: 'divide and conquer', priority: 1, claims: [
      ['D', 'MapReduce is divide and conquer at the methodological level: partition the work, compute on the parts independently, then combine the partial results.'],
      ['P', 'Partition splits the input and assigns tasks before map runs, and combine merges the local results in the reduce stage.'],
      ['P', 'The intermediate exchange between map and reduce is the shuffle and sort step.']
    ]},
    {key: '1 1 智能体（agent）的定义', priority: 2, claims: [
      ['D', 'An agent is an intelligent system that interacts with an environment.'],
      ['C', 'The definition has three elements: the agent that decides and acts, the environment it sits in, and the interaction between the two.'],
      ['S', 'The agent observes the environment through observations and acts on it through actions, so its basic loop is observe, decide, act, observe.'],
      ['P', 'Compared with a system that answers in one turn, an agent emphasises continuous interaction, state updates and feedback from action.']
    ]},
    {key: '6 4 智能体长期记忆的分类', priority: 2, claims: [
      ['D', 'Agent memory is grouped by content into episodic, semantic and procedural memory.'],
      ['P', 'Episodic memory stores the specific events an agent has lived through, that is, its experiences and interaction records.'],
      ['P', 'Semantic memory stores stable knowledge abstracted from experience, such as facts, concepts and generalisations, rather than single events.'],
      ['P', 'Procedural memory stores skills and executable operations, which the course illustrates with systems such as Voyager.'],
      ['P', 'The classification is by content rather than by storage, so all three kinds can sit in a text database or a vector database.']
    ]},
    {key: '2 1 广度优先搜索 breadth-first search', priority: 1, claims: [
      ['D', 'Breadth-first search walks a graph level by level from a source vertex, finishing everything at one distance before touching anything further away.'],
      ['S', 'The source is given distance zero and pushed onto a FIFO queue.'],
      ['S', 'The vertex at the front of the queue is removed, and every unvisited neighbour receives its distance, records its parent and joins the queue.'],
      ['P', 'Because a nearer vertex is always finished before a farther one is touched, BFS returns shortest paths when every edge counts the same.'],
      ['L', 'On a weighted graph BFS is the wrong tool: it counts edges and ignores weights, so Dijkstra is needed instead.'],
      ['P', 'The traversal costs O(V + E) with an adjacency list, because each vertex enters and leaves the queue once.']
    ]},
    {key: '7 6 tool use is a layered system', priority: 2, claims: [
      ['D', 'Tool use for an agent is a layered system: capabilities, mechanics, constraints, interfaces and systems.'],
      ['P', 'Mechanics covers how tool definitions enter the model context, how the model emits a call, and how the harness executes it and returns the result.'],
      ['P', 'Constraints covers JSON Schema and grammar masks, which constrain the form of an output but cannot guarantee that its meaning is right.'],
      ['P', 'Interfaces covers how REST APIs and MCP expose external capabilities to the agent.'],
      ['P', 'Systems covers the whole arrangement: dependencies, concurrency, evaluation, cost control and failure handling.']
    ]},
    {key: '7 1 2 multi-turn', priority: 1, claims: [
      ['D', 'Multi-turn evaluation checks whether a model keeps using tools correctly across several interaction steps.'],
      ['P', 'In the base task the model has to reuse what an earlier call returned in order to make the next call.'],
      ['P', 'In the missing-function case the needed tool does not exist, and the correct behaviour is to say so rather than invent a call.'],
      ['P', 'In the missing-parameter case the user has not supplied an argument, so the model should ask for it instead of guessing.']
    ]},
    {key: 'from llm to agent system', priority: 1, claims: [
      ['D', 'An agent system breaks a complex task into a series of steps and decisions and combines model calls with external tools instead of relying on one prompt-response call.'],
      ['P', 'A typical system separates planning, research and writing across different model calls.'],
      ['P', 'The system can use external tools such as code execution, databases and internet resources.']
    ]},
    {key: '工具可用性与工具必要性', priority: 1, claims: [
      ['D', 'Having access to a tool does not mean the agent should use it, because availability and necessity are different questions.'],
      ['P', 'A tool is called when the answer needs fresh external information, such as the current time, or an action rather than text.'],
      ['P', 'The agent answers directly when its own knowledge is enough, for example a general estimate of the caffeine in green tea.'],
      ['P', 'Tool choice weighs information freshness, external dependencies, computation cost, whether existing knowledge suffices and whether an action is required.']
    ]},
    {key: 'react 工作的循环', priority: 1, claims: [
      ['D', 'In engineering terms an agent is a while loop: a model, a dictionary of tools and explicitly written stop conditions.'],
      ['P', 'The action space holds environment actions and language, and thoughts are free because they change nothing outside the model.'],
      ['P', 'The stop conditions, a step limit, a completion signal and loop detection, have to be written explicitly.']
    ]},
    {key: 'mcp 基础概念', priority: 1, claims: [
      ['D', 'MCP standardises the interface between AI applications and external tools, turning an N times M integration problem into N to 1 to M.'],
      ['P', 'Without MCP each of N applications adapts to each of M tools separately, so integration cost grows as a product.'],
      ['P', 'With one protocol a tool is integrated once, and a real deployment can still run several MCP servers.']
    ]},
    {key: 'mcp 的架构', priority: 1, claims: [
      ['D', 'MCP uses a client-server architecture with three roles: a host application, one client per connection and servers that expose capabilities.'],
      ['P', 'The host runs the model loop and the user interface and can own several clients.'],
      ['P', 'A client translates the intent of the host into MCP messages; it is not the model, which handles reasoning and tool selection.'],
      ['P', 'A server exposes external tools and data sources through the protocol.']
    ]},
    {key: '参数记忆与非参数记忆', priority: 1, claims: [
      ['D', 'Agent memory exists because a fixed context window and static parameters cannot carry experience across interactions.'],
      ['X', 'Parametric memory lives in the weights and changes only through training or editing, while non-parametric memory lives in an external store and can be updated directly.'],
      ['P', 'Editing parameters directly risks catastrophic forgetting, which is why external memory is preferred for continual learning.'],
      ['P', 'External memory supplies extra evidence but does not guarantee that the model uses it correctly.']
    ]},
    {key: 'evaluate the whole stack', priority: 1, claims: [
      ['D', 'Tool use is evaluated at four levels: tool selection, argument correctness, the quality of the whole trajectory and whether the task was completed.'],
      ['P', 'Selection compares the calls the model made with the calls it should have made, using precision and recall over correct, extra and missing calls.'],
      ['P', 'Arguments are checked with AST and schema matching, but a schema-valid call can still carry the wrong value.'],
      ['P', 'Trajectory and outcome are scored separately because a correct final answer can hide a poor process.']
    ]},
    {key: 'convolution definition', priority: 1, claims: [
      ['D', 'Convolution is one of the main building blocks of a CNN: it combines two functions into a third and merges two sets of information.'],
      ['P', 'Operationally, convolution slides a filter over the input and computes a weighted sum at every position.']
    ]},
    {key: 'pooling layer', priority: 1, claims: [
      ['D', 'Pooling reduces the dimensionality of the feature maps, which cuts the number of parameters and the computation in the network.'],
      ['P', 'Pooling merges the values in a window, most often by taking the maximum or the average, and each activation map is handled independently.'],
      ['P', 'Because the maps shrink, later layers cost less and training becomes faster.']
    ]},
    {key: 'cnn：convolutional neural network', priority: 1, claims: [
      ['D', 'A CNN is designed to reduce the number of parameters, preserve the image layout and allow a deeper network.'],
      ['P', 'Local connectivity and weight sharing cut the parameter count, and the two-dimensional layout of the image is kept instead of being flattened.'],
      ['P', 'A typical pipeline repeats convolution, activation and pooling, then flattens, applies fully connected layers and produces a classification output.']
    ]},
    {key: 'overfitting 过拟合', priority: 1, claims: [
      ['D', 'Overfitting fits the training set very well but fails to generalise to new examples, which is high variance.'],
      ['X', 'Bias comes from assumptions that are too simple and produces underfitting, while variance comes from sensitivity to the training data and produces overfitting.'],
      ['P', 'Overfitting usually appears when there are too many features or the model is too complex.']
    ]},
    {key: '梯度下降：gradient descent', priority: 1, claims: [
      ['D', 'Gradient descent is a first-order iterative algorithm that finds a local minimum of a differentiable function by stepping against the gradient.'],
      ['P', 'The step follows the direction of steepest descent, and the learning rate sets its size.']
    ]},
    {key: 'softmax function', priority: 1, claims: [
      ['D', 'Softmax is the output-layer activation that turns an arbitrary real vector into a probability vector whose entries are non-negative and sum to one.'],
      ['P', 'Each entry is the exponential of its score divided by the sum of all exponentials, so a larger score receives a larger probability.']
    ]},
    {key: 'bfs vs dfs', priority: 1, claims: [
      ['D', 'Breadth-first search expands layer by layer and visits nodes in order of distance from the start, so it finds shortest paths in unweighted graphs.'],
      ['X', 'BFS uses a FIFO queue and stores a distance field, while DFS uses recursion or a LIFO stack and stores only a tree depth.'],
      ['P', 'DFS suits topological sorting, cycle detection and connectivity, while BFS suits nearest-node and shortest-path queries.']
    ]},
    {key: '扩散模型是什么', priority: 1, claims: [
      ['D', 'Diffusion models are probabilistic generative models that turn noise into a representative data sample by reversing a gradual noising process.'],
      ['P', 'They borrow the idea from non-equilibrium thermodynamics: ink dropped into water spreads irreversibly until it is uniform, and the model learns to run that diffusion backwards.']
    ]},
    {key: 'gan main idea', priority: 1, claims: [
      ['D', 'A GAN trains two networks adversarially: a generator turns random noise into fake samples and a discriminator estimates whether a sample is real or fake.'],
      ['P', 'The generator never sees the real data directly; it learns from the feedback of the discriminator.'],
      ['P', 'The two networks are trained together until the fake samples become hard to tell apart from real ones.']
    ]},
    {key: 'perceptron: the artificial neuron', priority: 1, claims: [
      ['D', 'A perceptron is a function that maps an input vector to an output using parameters that are learned.'],
      ['P', 'The parameters are the values that give the best function approximation, and the body of the neuron applies the weighted sum before the activation.']
    ]},
    {key: 'multilayer perceptrons', priority: 1, claims: [
      ['D', 'A multilayer perceptron generalises the single-layer perceptron with an input layer, one or more hidden layers of computation nodes and an output layer.'],
      ['P', 'Each neuron normally uses a nonlinear and differentiable activation function, which is what allows the network to represent nonlinear functions.']
    ]},
    {key: 'tutorial 5 reinforcement learning', priority: 1, claims: [
      ['D', 'Reinforcement learning studies how an agent learns to choose actions through interaction with an environment in order to maximise expected cumulative reward.'],
      ['P', 'An action changes both the immediate reward and the future state, and feedback arrives as a scalar reward rather than a label.'],
      ['P', 'The policy maps states to actions, a trajectory records states, actions and rewards, and an episode ends in a terminal state.']
    ]},
    {key: 'gnn vs cnn', priority: 1, claims: [
      ['D', 'A graph represents entities as nodes and their relations as edges, and a graph neural network learns directly on that irregular structure instead of on a fixed grid.'],
      ['X', 'A CNN assumes a regular grid with a fixed input size and a fixed order, while a GNN has to handle graphs whose size and structure differ from sample to sample.'],
      ['P', 'A GNN keeps only two weight sets, one for the node itself and one for its neighbours, and it preserves permutation invariance rather than translation equivariance.']
    ]}
  ];

  function normalizeTitle(text) {
    return String(text || '').toLowerCase().replace(/\\/g, '')
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ').trim();
  }

  const EVIDENCE_INDEX = EVIDENCE.map(entry => ({...entry, normKey: normalizeTitle(entry.key)}))
    .sort((a, b) => b.normKey.length - a.normKey.length);

  function evidenceFor(topic) {
    const norm = normalizeTitle(topic);
    if (!norm) return null;
    for (const entry of EVIDENCE_INDEX) {
      if (norm.includes(entry.normKey)) return entry;
    }
    return null;
  }

  /* English sentences already written in the notes (bilingual slides). Used
     when a section has no prepared claims; never mixed into Chinese answers. */
  function englishSentences(record) {
    const text = cleanNote(record.originalParagraph).split(/\n+/);
    const out = [];
    for (const line of text) {
      for (const part of line.split(/(?<=[.!?])\s+/)) {
        const sentence = part.replace(/\s+/g, ' ').trim();
        if (sentence.length < 40 || hasCJK(sentence)) continue;
        const words = sentence.match(/[A-Za-z][A-Za-z0-9'-]*/g) || [];
        if (words.length < 7 || !/\b(?:is|are|was|were|has|have|can|uses?|combines?|refers?|means?|provides?|allows?|enables?|reduces?|improves?|takes?|returns?|stores?|processes?)\b/i.test(sentence)) continue;
        out.push(/[.!?]$/.test(sentence) ? sentence : `${sentence}.`);
      }
    }
    return [...new Set(out)].slice(0, 3);
  }

  /* ---------------- answer composition ---------------- */

  const INTENT_CUES = {
    example: /例如|比如|举例|应用|场景|案例|可以生成|用于/,
    limitation: /局限|不足|缺点|问题|挑战|无法|不能|难以|失败/,
    comparison: /相比|区别|差异|不同|而|反之/,
    reason: /因为|因此|原因|目的|为了|使得|带来/
  };

  const PREFERENCE = {
    definition: ['S', 'P', 'C', 'W'],
    process: ['S', 'P', 'W'],
    comparison: ['X', 'P'],
    example: ['E', 'P'],
    limitation: ['L', 'P', 'W'],
    reason: ['W', 'P', 'L'],
    general: ['P', 'C', 'W']
  };

  function claimList(unit, refIndex) {
    const entry = evidenceFor(unit.record.topic);
    const base = {
      ref: refIndex,
      /* Prepared evidence outranks sentences quoted straight from a passage. */
      priority: entry ? (entry.priority || 0) : -1,
      score: unit.score,
      topicMatch: Boolean(unit.topicMatch),
      variant: Boolean(unit.variant)
    };
    const claims = [];
    if (entry) {
      entry.claims.forEach((item, order) => {
        const [role, text] = item;
        if (!text || hasCJK(text)) return;
        claims.push({role, text, order, ...base});
      });
    } else {
      for (const text of englishSentences(unit.record)) claims.push({role: 'P', text, order: 0, ...base});
    }
    return claims;
  }

  function overlapRatio(a, b) {
    const left = new Set(tokenize(a));
    const right = new Set(tokenize(b));
    if (!left.size || !right.size) return 0;
    let common = 0;
    for (const token of left) if (right.has(token)) common++;
    return common / Math.min(left.size, right.size);
  }

  function composeEnglish(profile, units) {
    if (!units.length) return null;
    const all = [];
    units.forEach((unit, index) => all.push(...claimList(unit, index + 1)));
    if (!all.length) return null;
    /* When the notes carry prepared English evidence, quoted fragments from
       unrelated passages are not allowed to pad the answer. */
    const prepared = all.filter(item => item.priority >= 0);
    const pool = prepared.length >= 2 ? prepared : all;
    const rank = new Map();
    units.forEach((unit, index) => rank.set(index + 1, index));
    const tie = (a, b) => (Number(a.variant) - Number(b.variant)) || (b.priority - a.priority) || (Number(b.topicMatch) - Number(a.topicMatch))
      || ((rank.get(a.ref) || 0) - (rank.get(b.ref) || 0)) || (a.order - b.order);

    /* Variant sections are about a neighbouring concept (Self-RAG, multimodal
       RAG, multi-agent), so their statements may fill a gap but never take
       over the answer. */
    const variantSpeaks = profile.titleIntent === 'limitation' || profile.titleIntent === 'comparison';
    const plain = variantSpeaks ? pool : pool.filter(item => !item.variant);
    const core = plain.length >= 2 ? plain : pool;

    /* Lead: the definition of the queried subject when the notes give one,
       otherwise the first answer-bearing statement of the best section. */
    const leadOrder = profile.titleIntent === 'limitation' ? ['L', 'D', 'W'] : ['D', 'S', 'P', 'X', 'W'];
    let lead = null;
    for (const role of leadOrder) {
      const candidatesInRole = core.filter(item => item.role === role);
      if (!candidatesInRole.length) continue;
      lead = candidatesInRole.sort(tie)[0];
      break;
    }
    if (!lead) return null;

    const bullets = [];
    const limit = profile.titleIntent === 'process' ? 3 : 4;
    /* An answer reads best when it holds one argument: statements from the
       section that supplied the lead come first, other sections only fill. */
    const bulletTie = (a, b) => (Number(a.ref !== lead.ref) - Number(b.ref !== lead.ref)) || tie(a, b);
    const push = item => {
      if (!item || item === lead) return false;
      const text = item.text.replace(/\s+/g, ' ').trim();
      if (bullets.some(existing => existing.ref === item.ref && existing.text === text)) return false;
      if (overlapRatio(text, lead.text) > 0.62) return false;
      if (bullets.some(existing => overlapRatio(text, existing.text) > 0.55)) return false;
      bullets.push({...item, text});
      return true;
    };

    let usedStages = false;
    if (profile.titleIntent === 'process') {
      /* Process answers take their stages from one section and keep the order
         of that section; no other section may interleave its stages. */
      const stepUnits = units.map((unit, i) => ({
        ref: i + 1,
        priority: pool.find(item => item.ref === i + 1)?.priority ?? -1,
        topicMatch: Boolean(unit.topicMatch),
        variant: Boolean(unit.variant),
        steps: pool.filter(item => item.ref === i + 1 && item.role === 'S').sort((a, b) => a.order - b.order),
        score: unit.score
      })).filter(item => item.steps.length >= 2)
        .sort((a, b) => (Number(a.variant) - Number(b.variant)) || (b.priority - a.priority) || (Number(b.topicMatch) - Number(a.topicMatch))
          || (b.steps.length - a.steps.length) || (b.score - a.score));
      if (stepUnits.length) {
        for (const step of stepUnits[0].steps) push(step);
        usedStages = true;
      }
    }
    /* The section that supplied the lead is read forward from the lead, so the
       bullets keep the order of the notes instead of being re-sorted by role. */
    if (!usedStages) {
      for (const item of core.filter(entry => entry.ref === lead.ref && entry.order > lead.order).sort((a, b) => a.order - b.order)) {
        if (bullets.length >= limit) break;
        push(item);
      }
    }
    const order = PREFERENCE[profile.titleIntent] || PREFERENCE[profile.intent] || PREFERENCE.general;
    const preferred = order.filter(role => !(usedStages && role === 'S'));
    for (const role of preferred) {
      if (bullets.length >= limit) break;
      const candidatesInRole = core.filter(item => item.role === role && item !== lead).sort(bulletTie);
      for (const item of candidatesInRole) {
        if (bullets.length >= limit) break;
        push(item);
      }
    }
    if (!bullets.length) {
      for (const item of core.slice().sort(bulletTie)) {
        if (bullets.length >= limit) break;
        push(item);
      }
    }
    return {lead: {text: lead.text, refs: [lead.ref]}, bullets: bullets.map(item => ({text: item.text, refs: [item.ref]}))};
  }

  /* Chinese questions are answered from the Chinese statements of the same
     retrieved sections; the answer language follows the question language. */
  function composeChinese(profile, units) {
    if (!units.length) return null;
    /* A Chinese question about "overfitting" must still reach the Chinese
       sentences that say 过拟合, so the alias terms count here too. */
    const subject = new Set(profile.expanded);
    const runs = (profile.subjectText.match(/[\u4e00-\u9fff]{2,}/g) || []).filter(run => run.length >= 2);

    const sentencesOf = unit => cleanNote(unit.record.originalParagraph)
      .split(/\n+|(?<=[。！？；])/)
      .map(piece => zhOnly(piece.replace(/^\s*(?:\d+[.)、]|•)\s*/, '')))
      .filter(piece => {
        if (piece.length < 12 || piece.length > 240) return false;
        if (!hasCJK(piece) || /[?？]$/.test(piece) || /[：:]$/.test(piece)) return false;
        if (/^\|/.test(piece) || /^(?:符号|含义|问题|答案|总结|拓展|定理|定义)$/.test(piece)) return false;
        /* Table cells and diagram flows survive cleaning as "a · b ⇒ c"; they
           are not sentences, whatever their length. */
        if (/[⇒→·]/.test(piece)) return false;
        /* Course-meta commentary answers "what does this lecture cover", never
           the question that was asked. */
        if (/全讲|本讲|本课|本页|课件|讲义/.test(piece)) return false;
        /* A sentence that opens with a back-reference or with exam-note framing
           does not stand on its own once it is lifted out of the page. */
        if (/^(?:前者|后者|该|此|其|它|考点|掌握|注意|提示|技巧|口诀|复习)/.test(piece)) return false;
        return /是|指|表示|用于|允许|包括|通过|需要|可以|能够|产生|生成|计算|依赖|交互|学习|更新|得到|求出|减少|提高|支持|存储|保存|记录|包含|分为|区分|负责|决定|选择|描述|提供|形成|完成|使用|建立|导致|影响|处理|获取|检索|输入|输出|训练|预测|评估|优化|提升|降低|增加|进入|离开|返回|调度|分配|合并|切分|嵌入|映射|编码|解码/.test(piece);
      });

    /* A sentence is worth quoting when it names the concept early, states it
       rather than illustrating it, and matches the shape of the question. */
    const scoreSentence = piece => {
      const tokens = tokenize(piece);
      const hit = tokens.filter(token => subject.has(token)).length;
      const runBonus = runs.some(run => piece.includes(run)) ? 4 : 0;
      const definitional = /(?:是|指|表示|称为|定义为|包括)/.test(piece) ? 2 : 0;
      /* The concept named near the start of the sentence is the concept the
         sentence is about; a late mention is usually a passing remark. */
      const early = tokens.some(token => subject.has(token) && piece.indexOf(token) >= 0 && piece.indexOf(token) < 10) ? 2.5 : 0;
      /* "例如…" opens an illustration, not the statement of the concept. */
      const illustrative = /^(?:例如|比如|如图|下表|示例|举例|以.{2,10}为例)/.test(piece) ? -3 : 0;
      /* "前者…后者…" only means something next to the sentence before it. */
      const anaphoric = /^(?:前者|后者|该|此|其|它|这)/.test(piece) ? -2.5 : 0;
      /* The shape of the question says which sentences can answer it: an
         example question wants an applied sentence, a limitation question
         wants a sentence about what fails. */
      const cue = INTENT_CUES[profile.titleIntent];
      const intentBonus = cue && cue.test(piece) ? 3 : 0;
      return (hit * 3) + runBonus + definitional + early + illustrative + anaphoric + intentBonus;
    };

    /* How much of the question the section heading actually covers: a question
       about "agent memory" is better served by the section that names both
       ideas than by the one that only names the agent. Each queried term is
       one group, and either side of its translation counts for that group. */
    const groups = profile.subjectTokens.map(token => {
      const group = new Set([token]);
      for (const [en, zh] of ALIASES) {
        const side = tokenize(en).includes(token) ? zh : (tokenize(zh).includes(token) ? en : null);
        if (side) tokenize(side).forEach(item => group.add(item));
      }
      return group;
    });
    const coverageOf = unit => {
      const hay = new Set([...tokenize(unit.record.topic), ...tokenize(unit.record.sectionPath)]);
      return groups.filter(group => [...group].some(token => hay.has(token))).length;
    };
    /* One section carries one argument. Mixing sentences from several sections
       produced answers that jumped between topics, so sections are ranked by
       how much of the question their heading names, then the leading section is
       read in order and later sections only fill a shortfall. */
    const ordered = units
      .map((unit, index) => {
        const hits = sentencesOf(unit).filter(piece => tokenize(piece).some(token => subject.has(token)));
        const assertive = hits.some(piece => !/^(?:例如|比如|示例|如图|下表|举例|以.{2,10}为例)/.test(piece));
        return {unit, index, coverage: coverageOf(unit), hits, assertive};
      })
      .filter(entry => entry.hits.length)
      .sort((a, b) => (b.coverage - a.coverage)
        || (Number(Boolean(a.unit.variant)) - Number(Boolean(b.unit.variant)))
        || (Number(b.unit.topicMatch) - Number(a.unit.topicMatch))
        || (Number(b.assertive) - Number(a.assertive)) || (b.unit.score - a.unit.score));
    /* A section whose heading never names the subject cannot lead the answer,
       even if one of its sentences happens to mention it. */
    const named = ordered.filter(entry => entry.coverage > 0);
    if (named.length) ordered.splice(0, ordered.length, ...named);

    if (!ordered.length) return null;
    const primary = ordered[0];
    const pool = primary.hits.slice().sort((a, b) => scoreSentence(b) - scoreSentence(a));
    const leadText = profile.titleIntent === 'process' ? (primary.hits[0] || pool[0]) : pool[0];
    const bullets = [];
    const push = piece => {
      if (!piece || piece === leadText) return false;
      if (overlapRatio(piece, leadText) > 0.6) return false;
      if (bullets.some(existing => overlapRatio(piece, existing.text) > 0.55)) return false;
      bullets.push({text: piece, ref: primary.index + 1});
      return true;
    };
    if (profile.titleIntent === 'process') {
      for (const piece of primary.hits) {
        if (bullets.length >= 3) break;
        push(piece);
      }
    } else {
      for (const piece of pool) {
        if (bullets.length >= 3) break;
        push(piece);
      }
    }
    if (bullets.length < 2) {
      const scope = unit => String(unit.record.sectionPath).split(' / ').slice(0, 2).join(' / ');
      const nearby = ordered.slice(1).filter(item => scope(item.unit) === scope(primary.unit));
      const far = ordered.slice(1).filter(item => scope(item.unit) !== scope(primary.unit));
      for (const entry of nearby.concat(nearby.length ? [] : far)) {
        if (bullets.length >= 3) break;
        for (const piece of entry.hits.slice().sort((a, b) => scoreSentence(b) - scoreSentence(a))) {
          if (bullets.length >= 3) break;
          if (bullets.some(existing => overlapRatio(piece, existing.text) > 0.55)) continue;
          bullets.push({text: piece, ref: entry.index + 1});
        }
      }
    }
    return {lead: {text: leadText, refs: [primary.index + 1]}, bullets: bullets.map(item => ({text: item.text, refs: [item.ref]}))};
  }

  function appendCited(parent, text, refs) {
    parent.append(document.createTextNode(text));
    for (const ref of refs) {
      const cite = make('span', 'rag-v2-cite', ` [R${ref}]`);
      parent.append(cite);
    }
  }

  function renderAnswer(profile, units) {
    answer.replaceChildren();
    const summary = profile.lang === 'zh' ? composeChinese(profile, units) : composeEnglish(profile, units);
    if (!summary) {
      answer.className = 'rag-v2-empty';
      answer.append(make('p', '', FALLBACK));
      return null;
    }
    answer.className = 'rag-v2-answer';
    const lead = make('p', 'rag-v2-answer-lead');
    appendCited(lead, summary.lead.text, summary.lead.refs);
    answer.append(lead);
    if (summary.bullets.length) {
      const list = make('ul', 'rag-v2-answer-points');
      for (const point of summary.bullets) {
        const item = make('li');
        appendCited(item, point.text, point.refs);
        list.append(item);
      }
      answer.append(list);
    }
    return summary;
  }

  function renderReferences(hits, usedRefs) {
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
      head.append(make('span', 'rag-v2-ref-id', `[R${i + 1}]`), make('strong', 'rag-v2-topic', compact(hit.record.topic, 120)));
      card.append(head);
      card.append(make('small', 'rag-v2-source', `Source: ${hit.record.source.file.split('/').pop()} · ${compact(hit.record.sectionPath, 105)}`));
      const passage = cleanNote(hit.record.originalParagraph);
      for (const block of passage.split(/\n\s*\n/).filter(Boolean)) {
        if (/^• /m.test(block)) {
          const list = make('ul', 'rag-v2-passage-list');
          for (const line of block.split('\n').filter(Boolean)) list.append(make('li', '', line.replace(/^•\s*/, '')));
          card.append(list);
        } else {
          card.append(make('p', 'rag-v2-passage', block));
        }
      }
      card.append(make('small', 'rag-v2-source', usedRefs.has(i + 1) ? 'Cited in the answer.' : 'Retrieved for context; not used as evidence.'));
      references.append(card);
    });
  }

  function buildPrompt(query, units) {
    const context = units.length
      ? units.map((unit, i) => `[R${i + 1}] Topic: ${unit.record.topic}\nSource: ${unit.record.source.file}\nPassage:\n${unit.record.originalParagraph}`).join('\n\n')
      : '[No reliable passages retrieved.]';
    return `SYSTEM: Answer only from the retrieved course-note passages, cite every statement, and abstain when the passages do not support an answer.\n\nQUESTION:\n${query}\n\nRETRIEVED REFERENCE MATERIALS:\n${context}\n\nTASK:\nReturn a concise answer whose every sentence carries its reference number.`;
  }

  function runQuery(query) {
    const result = retrieve(query);
    const profile = result.profile;
    const units = result.hits.map(hit => ({record: hit.record, score: hit.score, topicMatch: hit.topicMatch, variant: hit.variant}));
    const summary = renderAnswer(profile, units);
    const usedRefs = new Set();
    if (summary) {
      for (const ref of [...summary.lead.refs, ...summary.bullets.flatMap(point => point.refs)]) usedRefs.add(ref);
    }
    renderReferences(result.hits, usedRefs);
    results.hidden = false;
    feedback.textContent = summary
      ? `${result.hits.length} passages retrieved; ${usedRefs.size} cited in the answer.`
      : `${result.hits.length} passages retrieved; none supports an answer.`;
    return {
      query,
      queryTokens: result.queryTokens,
      intent: profile.intent,
      answerLanguage: profile.lang,
      candidatePassages: result.candidates.map(({candidate, record, relevant, score}) => ({id: record.id, topic: record.topic, source: record.source, score: Number(candidate.score.toFixed(4)), relevant, gatedScore: Number(score.toFixed(4))})),
      retrievedPassages: result.hits.map(hit => ({id: hit.record.id, topic: hit.record.topic, sectionPath: hit.record.sectionPath, originalParagraph: hit.record.originalParagraph, source: hit.record.source, score: Number(hit.score.toFixed(4))})),
      relevanceAssessment: result.hits.map((hit, index) => ({reference: `R${index + 1}`, relevant: true, semanticScore: Number(hit.score.toFixed(4)), reason: hit.reason})),
      assembledPrompt: buildPrompt(query, result.hits),
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

  window.V2RAG = {retrieve, buildPrompt, runQuery, recordCount: records.length};
  feedback.textContent = 'Ready to search the course and project materials.';
})();

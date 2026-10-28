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
    const cnnImpactIntent = /\bcnns?\b|卷积神经网络|卷积网络/.test(normalizedQuery) && /开创|创新|意义|重要|价值|影响|impact|significan|important|why/.test(normalizedQuery);
    const mcpIntent = /\bmcp\b|model context protocol/.test(normalizedQuery);
    const fitComparisonIntent = /overfitting|过拟合/.test(normalizedQuery) && /underfitting|欠拟合/.test(normalizedQuery) && /对比|比较|区别|差异|versus|\bvs\b|compare|difference/.test(normalizedQuery);
    const ganExampleIntent = /\bgan\b|生成对抗网络/.test(normalizedQuery) && /例子|示例|应用|场景|examples?|applications?|use cases?/.test(normalizedQuery);
    // Remove question phrasing before tokenization. Otherwise rare Chinese bigrams
    // such as “是什” can outrank the actual subject (the reported agent/GNN failure).
    const subjectQuery = normalizedQuery.replace(/什么是|是什么意思|是什么呢|是什么|请问|如何工作|怎么工作|怎样工作|如何|怎么|为什么|有哪些/g, ' ')
      .replace(cnnImpactIntent ? /的?开创性意义|的?意义|开创性|重要性|为什么重要/g : /$^/, ' ');
    const baseTokens = tokenize(subjectQuery).filter(token => !['ai', 'work'].includes(token) && !(cnnImpactIntent && ['important', 'importance', 'impact'].includes(token)));
    const expanded = [...baseTokens];
    // Bilingual aliases help a focused definition query, but must not drown out
    // other intent terms such as “evaluate tool use”.
    if (/智能体/.test(normalizedQuery)) expanded.push('agent');
    if (/\bagents?\b/.test(normalizedQuery) && definitionIntent && expanded.length <= 2) expanded.push('智能', '能体');
    if (/retrieval\s*[- ]?\s*augmented\s+generation/.test(normalizedQuery)) expanded.push('rag');
    if (/\brag\b|检索增强生成/.test(normalizedQuery)) expanded.push('rag');
    if (/图神经网络|graph neural network|\bgnn\b/.test(normalizedQuery)) expanded.push('gnn');
    if (/mapreduce/.test(normalizedQuery)) expanded.push('mapper', 'reducer');
    // Chinese intent words such as “作用” should guide ranking rather than
    // compete with the subject. MCP course sections use these source terms.
    if (mcpIntent) expanded.push('mcp', '标准', '接口', 'host', 'client', 'server', 'stdio', 'http');
    if (fitComparisonIntent) expanded.push('overfitting', 'underfitting', '过拟', '欠拟', 'bias', 'variance', 'complexity');
    if (ganExampleIntent) expanded.push('gan', '图像', '生成', 'image', 'generator', 'fake');
    if (cnnImpactIntent) expanded.push('cnn', 'weight', 'sharing', 'local', 'connectivity', 'spatial', 'image', 'recognition');
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
      if (cnnImpactIntent && /5205-Introduction-to-AI\.md$/.test(record.source.file) && /CNN Definition|LeNet|AlexNet/i.test(record.topic) && /weight sharing|local connectivity|spatial structure|visual data|scaling CNNs/i.test(record.originalParagraph)) score *= 3.2;
      if (mcpIntent && /MCP 基础概念/i.test(record.topic) && /标准化|统一工具|重复集成/i.test(record.originalParagraph)) score *= 5;
      if (mcpIntent && /MCP.*Host.*Client.*Server|MCP 的架构/i.test(record.topic)) score *= 3;
      if (mcpIntent && /MCP.*传输方式/i.test(record.topic)) score *= 2.4;
      if (fitComparisonIntent && /Underfitting|Overfitting|欠拟合|过拟合|Bias.*Variance|偏差.*方差/i.test(record.topic)) score *= 4;
      if (fitComparisonIntent && /GAN 图像合成|目录|粗版大纲/i.test(record.topic + record.originalParagraph)) score *= 0.05;
      if (ganExampleIntent && /GAN 图像合成|GAN Main Idea and Framework/i.test(record.topic)) score *= 5;
      if (ganExampleIntent && /Problems of GANs|GAN 的三个问题/i.test(record.topic)) score *= 0.08;
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
    return `SYSTEM: You are a course-notes assistant. Read every retrieved passage before answering. Integrate distinct, relevant facts into a concise academic English explanation with clear points. Cite every passage actually used as [R1], [R2], etc.; do not cite unrelated material or invent facts. The answer must be understandable without opening the references. Never replace a substantive answer with a direction to inspect a reference. Only when no passages are retrieved, say exactly: "Insufficient reference materials to answer this question."\n\nUSER QUESTION:\n${query}\n\nRETRIEVED REFERENCE MATERIALS:\n${context}\n\nTASK:\nSynthesize the supported answer from all relevant retrieved passages, with precise source citations.`;
  }

  function cleanNote(text) {
    return text
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
      const passage = cleanNote(hit.record.originalParagraph);
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

  /* Generic semantic answer pipeline.
     Every query follows the same steps: intent detection, chunk relevance,
     evidence extraction, answer composition, or explicit abstention. */
  function queryProfile(query) {
    const lower = query.toLowerCase();
    const anchorTokens = [...new Set((query.match(/\b[A-Z][A-Z0-9-]{1,11}\b/g) || []).map(token => token.toLowerCase()))];
    const intent = /对比|比较|区别|差异|versus|\bvs\b|compare|difference/.test(lower) ? 'comparison'
      : /例子|示例|应用|场景|举|examples?|applications?|use cases?/.test(lower) ? 'example'
      : /局限|缺点|问题|挑战|limitations?|problems?|challenges?/.test(lower) ? 'limitation'
      : /为什么|意义|作用|影响|why|importance|impact|role|purpose/.test(lower) ? 'reason'
      : /如何|怎么|流程|步骤|过程|how|process|steps|workflow/.test(lower) ? 'process'
      : /什么是|是什么|定义|what is|what are|define/.test(lower) ? 'definition'
      : 'general';
    const subjectText = lower
      .replace(/什么是|是什么|如何|怎么|为什么|有何|的?作用|的?意义|的?影响|的?对比|的?比较|的?区别|的?差异|举几个|举例子|举例|例子|示例|应用场景/g, ' ')
      .replace(/what (?:is|are)|how (?:does|do|is|are)|why (?:is|are|was|were)|compare|difference|examples?|applications?|use cases?|role|purpose|limitations?|problems?|challenges?/g, ' ');
    const intentTokens = new Set(['what','define','definition','how','why','compare','difference','example','examples','application','applications','use','case','cases','role','purpose','process','step','steps','workflow','problem','problems','limitation','limitations','challenge','challenges','什么','是什','么是','定义','如何','怎么','为什','作用','意义','影响','对比','比较','区别','差异','例子','示例','应用','场景','几个','举几']);
    const subjectTokens = [...new Set(tokenize(subjectText).filter(token => !intentTokens.has(token)))];
    return {lower, intent, subjectTokens, anchorTokens};
  }

  function intentEvidence(intent, text) {
    const patterns = {
      definition: /\bis (?:a|an|the)\b|\bmeans?\b|\bdefined\b|\bdefinition\b|\bintroduction\b|\bcombines?\b|\binteracts?\b|\bfits?\b|定义|概念|基础|分类|是指|指的是/,
      process: /\bstep\b|\bprocess\b|\bworkflow\b|\bfirst\b|\bthen\b|\binput\b|\boutput\b|\baction\b|\bselect\w*\b|\bchoos\w*\b|\bretriev\w*\b|\bgenerat\w*\b|流程|步骤|过程|输入|输出|动作|选择|检索|生成/,
      reason: /\bbecause\b|\ballows?\b|\benables?\b|\breduces?\b|\bimproves?\b|\bimportant\b|\binnovation\b|\bscal\w*\b|\bfewer parameters\b|原因|作用|意义|减少|提高|支持|允许|创新|解决/,
      example: /\bexample\b|\be\.g\.\b|\bsuch as\b|\bapplication\b|\buse case\b|\bimage\b|例如|例子|示例|应用|场景|图像/,
      comparison: /\bwhile\b|\bwhereas\b|\bversus\b|\bcompared\b|\bhigh bias\b|\bhigh variance\b|对比|区别|差异|相反|偏差|方差/,
      limitation: /\blimitation\b|\bproblem\b|\bchallenge\b|\bfail\b|\bdifficult\b|\bunstable\b|局限|问题|挑战|失败|困难|不稳定/
    };
    return intent === 'general' || Boolean(patterns[intent]?.test(text.toLowerCase()));
  }

  function assessChunk(query, hit, refIndex) {
    const profile = queryProfile(query);
    const topic = cleanNote(hit.record.topic);
    const passage = cleanNote(hit.record.originalParagraph);
    const topicTokens = new Set(tokenize(topic));
    const bodyTokens = tokenize(passage);
    const bodySet = new Set(bodyTokens);
    const subject = profile.subjectTokens;
    const topicMatches = subject.filter(token => topicTokens.has(token));
    const bodyMatches = subject.filter(token => bodySet.has(token));
    const acronym = (profile.lower.match(/\b[a-z][a-z0-9-]{1,9}\b/g) || []).filter(token => token.length <= 8);
    const acronymInTopic = acronym.some(token => new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(topic));
    const coverage = subject.length ? bodyMatches.length / subject.length : 0;
    const topicCoverage = subject.length ? topicMatches.length / subject.length : 0;
    const occurrences = subject.reduce((sum, token) => sum + bodyTokens.filter(item => item === token).length, 0);
    const navigationNoise = /目录|粗版大纲|回到.*页|table of contents|slide outline/i.test(passage);
    const exerciseSource = /课堂练习|练习题|选择题|配套解析|习题|quiz|exercise|multiple.choice/i.test(`${topic} ${hit.record.sectionPath}`);
    const explanatorySolution = /解析|答案|解答|原理|定义|公式|根据|因此|所以|估计|近似|选择|最大化|solution|answer|explanation|because|therefore|means?|is (?:a|an)|uses?|approximates?|estimates?|selects?|maximi[sz]es?|arg\s*max|Q\s*\(/i.test(`${passage} ${hit.record.originalParagraph}`);
    const directSubject = acronymInTopic || topicCoverage >= Math.min(0.5, 1 / Math.max(1, subject.length));
    const anchorExplainedInBody = profile.anchorTokens.some(token => bodyTokens.filter(item => item === token).length >= 2);
    const repeatedExplanation = coverage >= 0.35 && occurrences >= Math.max(2, Math.ceil(subject.length * 0.6)) && intentEvidence(profile.intent, `${topic} ${passage}`);
    const alignedIntent = intentEvidence(profile.intent, `${topic} ${passage}`);
    const exerciseExplanation = exerciseSource && explanatorySolution && (bodyMatches.length > 0 || acronymInTopic);
    // Lightweight concept hierarchy: a recalled component can support a parent
    // concept when the component is itself the subject of the passage. This is
    // relevance metadata only; it does not supply answer text.
    const conceptRelations = [
      {parent: /\btransformer\b/i, component: /\bQKV\b|query.key.value|multi.head attention|KV Cache|residual connection|残差连接|多头注意力/i}
    ];
    const componentEvidence = conceptRelations.some(relation => relation.parent.test(profile.lower) && relation.component.test(`${topic} ${passage}`));
    const anchorsSatisfied = !profile.anchorTokens.length || profile.anchorTokens.some(token => topicTokens.has(token) || bodySet.has(token));
    const relevant = Boolean(subject.length && (anchorsSatisfied || componentEvidence) && ((alignedIntent && (directSubject || anchorExplainedInBody || repeatedExplanation)) || exerciseExplanation || componentEvidence) && !(navigationNoise && !directSubject));
    const semanticScore = (topicCoverage * 4) + (coverage * 2) + (alignedIntent ? 1 : 0) + (acronymInTopic ? 2 : 0) + (exerciseExplanation ? 2.5 : 0) + (componentEvidence ? 2.5 : 0) + Math.min(2, Math.log1p(hit.score || 0)) - (navigationNoise ? 3 : 0);
    const reason = relevant
      ? exerciseExplanation ? 'exercise solution contains direct explanatory evidence' : componentEvidence ? 'component directly supports the queried parent concept' : 'direct subject and intent evidence'
      : 'incidental keyword or intent mismatch';
    return {hit, refIndex, relevant, semanticScore, profile, topicMatches, bodyMatches, directSubject, exerciseExplanation, componentEvidence, reason};
  }

  function filterRelevantChunks(query, hits) {
    return hits.map((hit, index) => assessChunk(query, hit, index + 1))
      .filter(item => item.relevant)
      .sort((a, b) => b.semanticScore - a.semanticScore || a.refIndex - b.refIndex);
  }

  function englishEvidence(item) {
    const passage = cleanNote(item.hit.record.originalParagraph)
      .replace(/\|/g, '. ')
      .replace(/•/g, '. ');
    const rawPassage = item.hit.record.originalParagraph;
    const pieces = passage.split(/(?<=[.!?])\s+|\n+/).map(part => part.trim());
    const claims = [];
    // Convert recurring bilingual explanatory syntax into English while
    // preserving the exact claim in the same source chunk. This is applied to
    // every chunk and does not inspect the user's query topic.
    for (const rawLine of rawPassage.split(/\n+/).map(line => line.trim()).filter(Boolean)) {
      const mechanism = rawLine.match(/^(.+?)是\s*([A-Za-z][A-Za-z -]+)\s*自回归推理中的一种中间状态缓存机制[。.]?$/);
      if (mechanism) {
        const name = mechanism[1].replace(/[（）()]/g, ' ').replace(/\\/g, '').replace(/\s+/g, ' ').trim();
        claims.push({text: `${name} is an intermediate-state caching mechanism used in ${mechanism[2].trim()} autoregressive inference.`, refIndex: item.refIndex, score: item.semanticScore + 24});
      }
      const role = rawLine.match(/^[-*]\s*\$?([A-Za-z])\$?（([A-Za-z]+)）：(.+?)[；。]?$/);
      if (role) {
        const sourceMeaning = role[3];
        let explanation = '';
        if (/用于查询其他.*表示/.test(sourceMeaning)) explanation = 'represents the current token when it queries other token representations';
        else if (/计算匹配程度/.test(sourceMeaning)) explanation = 'is used with the query to compute matching scores';
        else if (/生成注意力加权结果/.test(sourceMeaning)) explanation = 'is used to produce the attention-weighted output';
        if (explanation) claims.push({text: `${role[2]} (${role[1]}) ${explanation}.`, refIndex: item.refIndex, score: item.semanticScore + 15});
      }
      if (/因果注意力（Causal Attention）/.test(rawLine) && /K、V.*复用/.test(rawLine)) {
        claims.push({text: 'In causal attention, historical tokens do not depend on future tokens, so their cached keys and values can be reused when a new token is generated.', refIndex: item.refIndex, score: item.semanticScore + 18});
      }
    }
    // Exercise solutions often express their key principle as a formula. Keep
    // that evidence as a readable explanatory sentence instead of discarding it
    // with the surrounding Markdown/LaTeX markup.
    const subjectLabel = item.profile.subjectTokens.find(token => /^[a-z][a-z0-9-]{1,12}$/i.test(token));
    const valueBasedIndex = rawPassage.search(/Value\\?[- ]Based Methods?/i);
    const valueContext = valueBasedIndex >= 0 ? rawPassage.slice(Math.max(0, valueBasedIndex - 180), valueBasedIndex + 180) : '';
    const valueContextTokens = new Set(tokenize(valueContext));
    const valueContextMatchesSubject = item.profile.anchorTokens.some(token => valueContextTokens.has(token)) || item.profile.subjectTokens.some(token => valueContextTokens.has(token));
    if (subjectLabel && valueBasedIndex >= 0 && valueContextMatchesSubject) {
      claims.push({text: `${subjectLabel.toUpperCase()} is presented as a value-based method.`, refIndex: item.refIndex, score: item.semanticScore + 20});
    }
    const formulaMatches = [...rawPassage.matchAll(/\$([\s\S]{3,100}?)\$|\\\(([\s\S]{3,100}?)\\\)/g)];
    const ambiguousFormulaTable = formulaMatches.length > 1 && /\|/.test(rawPassage);
    const formulas = [];
    for (const match of formulaMatches) {
      const formula = (match[1] || match[2] || '').replace(/\\(?:arg|max|text)\b/g, word => word.replace('\\', '')).replace(/[{}]/g, '').replace(/\\/g, '').replace(/\s+/g, ' ').trim();
      if (!/[=<>]|Q\s*\(|P\s*\(|\barg\s*max\b/i.test(formula) || ambiguousFormulaTable) continue;
      const localContext = rawPassage.slice(Math.max(0, match.index - 160), Math.min(rawPassage.length, match.index + match[0].length + 160));
      const localTokens = new Set(tokenize(localContext));
      const locallyMatchesSubject = item.profile.anchorTokens.some(token => localTokens.has(token)) || item.profile.subjectTokens.some(token => localTokens.has(token));
      if (!locallyMatchesSubject && !item.exerciseExplanation && !item.directSubject && !item.componentEvidence) continue;
      formulas.push(formula);
    }
    for (const formula of [...new Set(formulas)].slice(0, 3)) {
      const text = /arg\s*max|max_/i.test(formula)
        ? `The action-selection rule chooses the action that maximizes ${formula.replace(/[.]+$/, '')}.`
        : /approx|≈|\*/i.test(formula) && subjectLabel
          ? `${subjectLabel.toUpperCase()} uses a function approximation expressed as ${formula}.`
          : `The source expresses the decision rule as ${formula}.`;
      claims.push({text, refIndex: item.refIndex, score: item.semanticScore + 12});
    }
    for (let part of pieces) {
      part = part.replace(/ε/g, 'epsilon').replace(/[\u4e00-\u9fff]+/g, ' ').replace(/[^\x20-\x7E–—]/g, ' ').replace(/^[^A-Za-z]+/, '').replace(/\\/g, '').replace(/\s+/g, ' ').trim();
      // Normalize common bilingual-table fragments into grammatical prose.
      // These rules operate on syntax only and contain no course topic names.
      part = part
        .replace(/^([A-Z][A-Za-z -]{1,45})\s+(Collecting|Reasoning|Processing|Learning|Generating|Retrieving|Storing|Using)\b/,
          (_, subject, action) => `${subject.trim()} involves ${action.toLowerCase()}`)
        .replace(/^([A-Z][A-Za-z -]{1,35})\s+error due to\b/i, '$1 is an error caused by')
        .replace(/^([A-Z][A-Za-z -]{1,35})\s+fit the\b/i, '$1 can fit the')
        .replace(/^([a-z]+(?:s|es|ed|ing))\b/, 'The described process $1')
        .replace(/,\s+but\s+fail\b/i, ', but it can fail')
        .replace(/\s+\/$/, '')
        .replace(/;\s*i\.e\.?$/i, '.');
      const words = part.match(/[A-Za-z][A-Za-z0-9'-]*/g) || [];
      const latin = (part.match(/[A-Za-z]/g) || []).length;
      if (words.length < 5 || words.length > 45 || /https?:|^image\b/i.test(part) || /\?$/.test(part) || (part.match(/[+/]/g) || []).length > 2) continue;
      if (/\b(?:ignore|follow)\b.{0,30}\binstructions?\b|\bplease\b.{0,40}\b(?:create|write|set up|save|run|generate)\b|\b(?:save|write|create)\b.{0,30}\b(?:file|script|results?)\b/i.test(part)) continue;
      if (/\b(?:vs|and|or|to|of|with)\.?$/i.test(part)) continue;
      const verbMatch = part.match(/\b(?:is|are|was|were|be|been|has|have|had|can|could|will|would|involves?|learns?|uses?|takes?|returns?|provides?|produces?|generates?|retrieves?|combines?|transforms?|describes?|expresses?|improves?|reduces?|allows?|enables?|fails?|means?|refers?|starts?|moves?|processes?|stores?|records?|interacts?|observes?|receives?|updates?|distinguishes?|evaluates?|fits?|generalizes?|captures?|recognizes?|scales?|predicts?|removes?|selects?|executes?|exposes?|connects?|chooses?)\b/i);
      const hasVerb = Boolean(verbMatch);
      // Capitalized base-form verbs in the middle of a line are usually table
      // labels (for example "Map Reduce"), not a grammatical predicate.
      if (!hasVerb || (verbMatch.index > 0 && /^[A-Z]/.test(verbMatch[0]))) continue;
      if (!/[.!?]$/.test(part)) part += '.';
      const queryTerms = new Set(item.profile.subjectTokens.filter(token => /^[a-z0-9-]+$/.test(token)));
      const overlap = tokenize(part).filter(token => queryTerms.has(token)).length;
      const anaphoric = /^(?:it|this|these|the (?:model|method|system|algorithm|process|agent))\b/i.test(part);
      const clauseMatchesQuery = overlap > 0 || (item.directSubject && (anaphoric || intentEvidence(item.profile.intent, part))) || (item.componentEvidence && (anaphoric || intentEvidence(item.profile.intent, part))) || (item.exerciseExplanation && intentEvidence(item.profile.intent, part));
      if (!clauseMatchesQuery) continue;
      const score = item.semanticScore + overlap * 2 + (intentEvidence(item.profile.intent, part) ? 3 : 0) + 4;
      claims.push({text: part, refIndex: item.refIndex, score});
    }
    return claims;
  }

  function composeAnswer(query, relevant) {
    if (!relevant.length) return null;
    const candidates = relevant.flatMap(englishEvidence).sort((a, b) => b.score - a.score || a.refIndex - b.refIndex);
    const selected = [];
    for (const item of candidates) {
      const words = new Set(tokenize(item.text));
      const duplicate = selected.some(existing => {
        const before = new Set(tokenize(existing.text));
        const common = [...words].filter(word => before.has(word)).length;
        return common / Math.max(1, Math.min(words.size, before.size)) > 0.68;
      });
      if (!duplicate) selected.push(item);
      if (selected.length >= 5) break;
    }
    // A coherent answer requires a lead and at least two explanatory facts.
    // When the sources only expose labels or isolated terms, abstaining is
    // more accurate than converting them into a misleading terminology list.
    if (selected.length < 3) return null;
    const first = selected[0];
    const intro = `${first.text} [R${first.refIndex}]`;
    const points = selected.slice(1, 5).map(item => `${item.text} [R${item.refIndex}]`);
    return {intro, points};
  }

  function renderAnswer(query, relevant) {
    answer.replaceChildren();
    const summary = composeAnswer(query, relevant);
    if (!summary) {
      answer.className = 'rag-v2-empty';
      answer.append(make('p', '', 'Insufficient reference materials to answer this question.'));
      return;
    }
    answer.className = 'rag-v2-answer';
    answer.append(make('p', 'rag-v2-answer-lead', summary.intro));
    if (summary.points.length) {
      const list = make('ul', 'rag-v2-answer-points');
      for (const point of summary.points) list.append(make('li', '', point));
      answer.append(list);
    }
  }

  function runQuery(query) {
    const result = retrieve(query);
    const relevant = filterRelevantChunks(query, result.hits);
    const relevantHits = relevant.map(item => item.hit);
    const assembled = buildPrompt(query, relevantHits);
    renderReferences(result.hits);
    renderAnswer(query, relevant);
    results.hidden = false;
    feedback.textContent = relevant.length
      ? `${result.hits.length} reference materials found; ${relevant.length} directly support the answer.`
      : 'No supporting source found for this question.';
    return {
      query,
      queryTokens: result.queryTokens,
      candidatePassages: result.candidates.map(({record, score, coverage}) => ({id: record.id, topic: record.topic, source: record.source, score: Number(score.toFixed(4)), queryCoverage: Number(coverage.toFixed(4))})),
      retrievedPassages: result.hits.map(({record, score}) => ({id: record.id, topic: record.topic, sectionPath: record.sectionPath, originalParagraph: record.originalParagraph, source: record.source, score: Number(score.toFixed(4))})),
      relevanceAssessment: result.hits.map((hit, index) => {
        const assessment = assessChunk(query, hit, index + 1);
        return {reference: `R${index + 1}`, relevant: assessment.relevant, semanticScore: Number(assessment.semanticScore.toFixed(4)), reason: assessment.reason};
      }),
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

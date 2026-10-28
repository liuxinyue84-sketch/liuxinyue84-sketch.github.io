# V0 代码输出证据索引与关键片段

**来源限制：** 这些是当前冻结源码中的实际代码片段，用于说明最终交付行为；它们不是从 Trae 对话导出的逐轮原始 LLM 输出。完整代码作为 `coursework/website/V0/` 归档。

## 1. 页面加载本地嵌入语料

来源：`website/V0/index.html`

```html
<audio id="soundtrack" src="assets/traumerei.mp3" preload="auto" loop hidden></audio>
<p id="audio-status" class="sr-only" role="status" aria-live="polite"></p>
<script src="projects.js"></script>
<script src="knowledge-data.js"></script>
<script src="app.js"></script>
<script src="rag.js"></script>
```

## 2. RAG 检索源清单与双语分词

来源：`website/V0/rag.js`

```js
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

/* Latin words plus CJK bigrams, so bilingual notes both match. */
function tokenize(text) {
 const tokens = [];
 (text.toLowerCase().match(/[a-z0-9]+/g) || []).forEach(word => {
  const stem = word.length > 3 && word.endsWith('s') ? word.slice(0, -1) : word;
  if (stem.length > 1 && !RAG_STOPWORDS.has(stem)) tokens.push(stem);
 });
 (text.match(/[\\u4e00-\\u9fff]+/g) || []).forEach(run => {
  if (run.length === 1) tokens.push(run);
  else for (let i = 0; i < run.length - 1; i++) tokens.push(run.slice(i, i + 2));
 });
 return tokens;
}
```

## 3. 项目详情与收藏控件

来源：`website/V0/app.js`

```js
<button class="row-toggle" aria-label="Expand details of ${p.title}"
 aria-expanded="false" aria-controls="project-detail-${i}">＋</button>
<span>Open this note</span>
<button class="save-project" aria-label="Save ${p.title}"
 aria-pressed="false">♡</button>
```

## 4. 客人留言本地存储

来源：`website/V0/app.js`。存储键名是兼容性标识，并非网站版本名。

```js
const value = JSON.parse(localStorage.getItem('aria-guestbook-v2') || '[]');
```

请以 `website/V0/` 内的完整文件为最终源码证据；上列片段只作导航索引，不能替代逐轮生成日志。

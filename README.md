# Aria’s Sky Journal · V0

## 打开方式

双击 `index.html` 可浏览。RAG 课程笔记已经打包进 `knowledge-data.js`，双击打开也可直接检索；也可在此目录运行 `python3 -m http.server 8000`，再打开 `http://localhost:8000`。网站使用静态 HTML、CSS 和原生 JavaScript，可部署到 GitHub Pages。

## 页面内容

- Home：天空插画、舒曼《梦幻曲》开关与首页入口。
- Highlights：关于 Aria、教育背景、专业技能、项目经历与课程笔记检索。
- Projects：项目分类、项目详情和收藏。
- Life：校园与兴趣照片、钢琴/小提琴视频预览。
- Guestbook：访客留言体验。

保留水彩天空背景、毛玻璃区域、松散纸片项目卡、技能联动、BM25 课程笔记检索、响应式布局及用户提供的照片、视频和音乐素材。访客媒体预览在本机浏览器内进行，不会上传。

## 文件说明

- `index.html`：页面结构与导航。
- `style.css`：基础样式和合并后的完整视觉样式。
- `app.js`：项目展示、筛选、收藏、导航、多媒体、留言和装饰交互。
- `projects.js`：项目内容数据。
- `rag.js`：使用 BM25 从课程笔记检索片段并显示出处。
- `knowledge-data.js`：便携式内嵌语料，解决 `file://` 页面无法 fetch 本地 Markdown 的问题。
- `knowledge/`：可读的 Markdown 原始语料，与内嵌语料保持一致。
- `assets/`：插画、照片、视频与音频。
- `knowledge/`：课程笔记检索语料。


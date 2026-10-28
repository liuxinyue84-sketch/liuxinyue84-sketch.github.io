# 5434 Big Data Computing2

## Lecture 7 Graph Analytics

本讲是七讲里第一次处理「关系数据」：前几讲的数据都能排成一张表，本讲的信息藏在连接方式里。

七个部分的分工 

1. Part 1 图与应用：六类真实网络→ 定义加权 / 有向两种分类 → 邻居与度数 → 路径 → 完全图 → 三种存储模型。这是语言与表示。

2. Part 2 图遍历：BFS与 DFS→ 两页伪代码 → 两张算例。这是所有全局算法的发动机。

3. Part 3 中心性（上）：度中心性（数邻居）→ 接近中心性（到所有人的距离之和取倒数，C\(2\) = 1/9）→ 算法要对每个顶点各跑一次 BFS。这是局部与几何两种「重要」。

4. Part 4 PageRank：全局重要性 → 随机游走与阻尼因子 d → 迭代更新公式 → 两轮手工迭代算例（n = 4、d = 0\.8，结果写成/12 的分数）。这是被重要者指向才重要。

5. Part 5 最短距离与 Dijkstra：最优子结构观察 → 伪代码与松弛 → 五顶点六帧算例（δ\(s,t\) = 8）→ 归纳法正确性证明（可选）。这是加权图上的最短路。

6. Part 6 顶点相似度：链路预测问题 → Jaccard 相似度（共同邻居 ÷ 邻居并集）。这是用结构猜缺失的边。

7. Part 7 社区与聚类：连通分量（无向）、SCC 与 WCC（有向）、局部聚类系数（无向 1/3 / 有向 1/6）与平均聚类系数。这是把图切开看结构。

## Part 1 Graphs and Applications

### 1\.1 社交网络与用户/ 物品图 Social Networks / User\-Item Graphs

两者的结构差别：边是不是跨类型的。

1. Social Networks：节点是实体，边是关系

节点（顶点）：users、images 等 all kinds of entities（各种实体）。

边：friendship、followship 等 all kinds of relationships（各种关系）。

|任务|中文|在问什么|
|---|---|---|
|Community detection|社区发现|把图上抱团的节点群找出来（连通分量与聚类系数）|
|Link prediction|链路预测|预测两个节点之间将不会不会连上边（Jaccard 相似度就是它的工具）|
|Product/Ad advertisement|商品/广告投放|按图上的邻近关系决定推给谁|
|Node classification|节点分类|给节点打标签（例如机器人账号、高价值用户）|

### 1\.2 User\-Item Graphs：二部图（Bipartite Graph）

两类：users（用户）与 items（物品），这是二部图的第一条特征。

边：ratings / purchasing / reviewing ，边只能连接两类之间的节点，这是二部图的第二条特征。

典型任务：Recommendation systems（推荐系统）。

二部图与普通图的关键差别

|对比项|社交网络（普通图）|用户–物品图（二部图）|
|---|---|---|
|顶点类型|同一种（人）|两种（用户 / 物品）|
|边的方向性|通常是无向的（好友是互相的）|常有方向（谁买了谁）|
|边能不能出现在同类之间|可以（人–人）|不可以（只有用户–物品）|
|典型分析|社区发现、链路预测|推荐、二部图投影|

二部图不是有两种节点的图这么简单，关键是边只存在于两类之间。若允许用户–用户边，它就不再是二部图。

考点 ：看到 Bipartite 就要条件反射地想起两类顶点 \+ 边只跨类；看到 Recommendation systems 就要想到它是用户–物品图上的任务。

### 1\.3 应用：Web / 交易 / 电信 / 航空网络

1. Web Graphs

这是有向图最经典的原型：PageRank（Part 3）就是在这个图上定义的。

顶点Vertices: webpages（网页）；

边 Edges: hyperlinks（超链接），且有向，A 链到 B 不代表 B 链到 A。

2. Transaction Networks

典型任务：欺诈检测（Fraud detection），异常的资金环、异常的中转链在图上比在一张流水表里明显得多。

顶点：账户 / 商户 / 支付平台。

边：一笔转账或支付。

3. Telecommunication Networks

典型任务：社区发现（把通话圈子切出来）、关键节点识别（去掉哪个节点会切断网络）。

顶点：电话 / 手机 / 基站。

边：一次通话或一条链路。

4. Airline Networks

典型任务：枢纽识别（Hub identification，中心性度量）、连通性分析（连通分量）。

顶点：机场（或城市）。

边：一条直飞航线。

四类网络的共同结构

|网络|顶点 Vertices|边 Edges|有向？|本讲会用到的工具|
|---|---|---|---|---|
|Social Networks|users, images, etc|friendship, fellowship, etc|多为无向|连通分量、聚类系数|
|User\-Item Graphs|users, items|ratings, purchasing, reviewing …|常有向|Jaccard 相似度（推荐）|
|Web Graphs|webpages|hyperlinks|有向|PageRank|
|Transaction Networks|账户 / 商户|一笔支付（Third\-party payments）|有向|社区发现|
|Telecommunication Networks|电话 / 基站|通话 / 链路|可无向|社区发现、连通分量|
|Airline Networks|机场|直飞航线|多为无向|中心性、连通性|

### 1\.4 图的数学定义

Graph model G = \(V, E\)

V is a set of vertices; E is a set of edges; each edge is for a **pair** of vertices

G = \(V, E\) 图 = 顶点集合 \+ 边集合；V 是 vertex（顶点）的集合，E 是 edge（边）的集合。

边的定义：each edge is for a pair of vertices 每条边对应一对顶点。

Tips：定义里说的是 pair（一对），所以单独一个顶点不构成边；但单独一个顶点可以构成一个连通分量。

Example:

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjFhYzY1NzBlNzYyYTk4ODFiMWI4YzYzNWJjMzc5ZDJfOGZkZTAwYTk5MmVkMjg5ZmU3ZDhjNjVhZDUxOWRmMGFfSUQ6NzY5NTk1MDY4MTE0ODExNjUxOF8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

|项|取值|读法|
|---|---|---|
|顶点集合 V|\{1, 2, 3, 4\}|4 个顶点，编号 1–4|
|边集合 E|\{\(1,2\), \(2,3\), \(3,4\), \(2,4\)\}|4 条边|
|顶点 1 的邻居|\{2\}|只连到 2|
|顶点 2 的邻居|\{1, 3, 4\}|度数为 3（本图度数最大的顶点）|
|顶点 3 的邻居|\{2, 4\}|度数为 2|
|顶点 4 的邻居|\{2, 3\}|度数为 2|

#### 1\.4\.1 Weighted vs Unweighted / Directed vs Undirected

有向 ≠ 加权，两者是正交的

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDg1Yjk0NTJmZTRhMmRhNDU3Njc3ZTYzY2FjOGQ1OTdfZWU2ZTYyYTU0YWFjNTg4YmE0YzFmN2I0NmE5NjIyYmNfSUQ6NzY5NTk1MTE5MzM0NDA2OTE1N18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzA4NTA1MzI3YzQzNGEyNzgxMTgxYWI1ZDAyMGU3MzFfOTY4MjAxYzllMWE1ZWE0Y2U5YzRjZjZmZDU1M2NkMjVfSUQ6NzY5NTk1MTIxMDUyODEzMjYzN18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjdiZjdiNWFkYzZiNzE2Mjc5N2MxOWJhNjA0ODRjMTdfZDQxMTgyMDU4Mjg0ODcwZmQyMzM2ZGZlMThhZTE0OTdfSUQ6NzY5NTk1MTI4MTU2Mjk3OTg3N18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjhjN2JmMTI4NmZkYTkzOWFkNTFmZTIxOWFiZjA0YjJfNTU1NmQ4NjEwNTUyZTA2ZTdlM2QwMTBlMDg3MDBjNWFfSUQ6NzY5NTk1MTM0OTMxNzQ4ODE2M18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

|类型|定义|例子|
|---|---|---|
|Unweighted graph（无权图）|An edge does not have any weight<br>边不带任何权重|Facebook friend relationship（好友关系）|
|Weighted graph（加权图）|An edge has a weight<br>边带权重|road segment: length（路段：长度）；communication link: bandwidth（通信链路：带宽）|
|Undirected graph（无向图）|An edge can be traveled in both ways<br>一条边两个方向都能走|Facebook friend relationship（加好友是双向的）|
|Directed graph（有向图）|An edge can be traveled in one way<br>一条边只能单向走|Twitter follower relationship（单向关注）|

#### 1\.4\.2 邻居与度数 Neighbors and Degree of a Vertex

度数（degree）是图上最基础的局部指标。无向图只有一个度数；有向图拆成入度与出度两个。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NGFiNGNmNDcwYTY3OGQ4MjRkYjg3ZGQzZDE5Nzc4ZjBfMjZjNmI3M2JkMTA2NDc0ZmIzZDVlZTAyYWNiMGU1NDVfSUQ6NzY5NTk1MjI5MTg3ODQ4OTYyOV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

1. 无向图：邻居集合与度数

N\(v\) 表示顶点 v 的邻居集合。上图里 N\(2\) = \{1, 3, 4\}，所以顶点 2 的度数是 3。

等价说法：无向图中，度数 = 邻居个数 = 该顶点上的边数。

无向度数 = 入度 \+ 出度

2. 有向图：入邻居 / 出邻居，入度 / 出度

### 1\.5 路径 Paths

A path is a finite or infinite sequence of edges which joins a sequence of vertices\. In most definitions, edges and vertices are **distinct**\.

简单路径（simple path）是一串边，把一串顶点依次接起来。路径的长度是边的条数（不是顶点个数）。边不重复、顶点也不重复。

|对比项|无向图|有向图|
|---|---|---|
|可达是否对称|对称：a 能到 b ⇒ b 能到 a|不对称：4 → 1 可能不存在路径|
|最短路径|两端之间的最短路|从一个点到另一个点的最短路（方向固定）|
|连通性概念|连通分量 CC（Part 6\.1）|强连通 SCC / 弱连通 WCC|

无向图上的路径

1\<\-\>2 is a path with length 1；1\<\-\>2\<\-\>3 is a path with length 2；This is the shortest path between 1 and 3

结论：1\<\-\>2\<\-\>3 是顶点 1 与 3 之间的最短路径（the shortest path between 1 and 3）因为 1 与 3 之间没有直接相连的边，绕 2 是唯一的两步走法。

有向图上的路径

1\-\>2\-\>3\-\>4 is a path with length 3；1\-\>2\-\>4 is a path with length 2

This is the shortest path from 1 to 4\. There is no path from 4 to 1

### 1\.6 完全图与稠密度: Complete Graph

完全图是稠密度的标尺：它给出任意 n 个顶点最多能有多少条边，于是实际边数 ÷ 完全图边数就成了密度的定义。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjhkZWJmMTFjYjhkNDM5YTNkMDEwY2VlNjg5ZmViMjZfYWRhZjU3OTA3Yzk3N2U0YWZhZTEyMTc1MGM4OWZlNTBfSUQ6NzY5NTk1NTM4NTgzNTkwMDQ0NV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

A graph in which each vertex is connected to every other vertex is called a complete graph\.

Densest possible graph

How many edges are in an undirected complete graph with n vertices? —— n\(n\-1\)/2

How many edges are in a directed complete graph with n nodes? —— n\(n\-1\)

|类型|边数公式|怎么来的|
|---|---|---|
|无向完全图|n\(n−1\)/2|每个顶点连其余 n−1 个 ⇒ 有向意义上的 n\(n−1\) 条有序对；无向边 \(u,v\) 与 \(v,u\) 是同一条，故除以 2|
|有向完全图|n\(n−1\)|每个顶点有 n−1 条出边，共 n 个顶点，且 \(u→v\) 与 \(v→u\) 是两条不同的边，不除 2|

两个用途

Real\-world graphs are rarely complete\. 

Complete graphs are usually used as substructures to decide the density of a graph or a community in a graph

现实中很罕见，真实网络通常是稀疏的，边数远小于 n\(n−1\)/2。

可以当作分母用，完全图是密度的参照系：图（或社区）的稠密度 = 实际边数 ÷ 完全图边数。

局部聚类系数的分母正是v 的邻居们两两相连最多能有几条边，也就是邻居集合上的完全图边数。

### 1\.7 三种存储模型：Graph Models

四个顶点：V = \{1, 2, 3, 4\}。

四条边：\(1,2\) = 1\.2、\(1,3\) = 4\.3、\(2,3\) = 0\.8、\(3,4\) = 2\.6，注意这是加权无向图（邻接矩阵对称）。

度数：顶点 1 度 2、顶点 2 度 2、顶点 3 度 3、顶点 4 度 1（4 是唯一的叶子）。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MmNiNjRhY2RlYmNjMjY3YzMxOWZjMGNiNmIzNDRjZjBfZGM1MmYxNmU3NzhmYTViMDAzOWVlNGQ4NWFkZDhhZjFfSUQ6NzY5NTk1NjA5NzIxOTUxMzg5Ml8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

三种存储模型

|模型|形状|一句话|
|---|---|---|
|边表 Edge List|一张 \(V1, V2, Weight\) 的表，4 行|最省地方；要查某点的邻居必须扫全表|
|邻接矩阵 Adjacency Matrix|4 × 4 的方阵 A|查邻居 O\(1\)；但空间是O\(n²\)，稀疏图极浪费|
|邻接表 Adjacency Lists|每行一个顶点，后面跟 邻居\(权重\)|空间 O\(n \+ m\)；遍历邻居最常用|

邻接矩阵（完整数值）

对称性：矩阵关于主对角线对称（A\[i\]\[j\] = A\[j\]\[i\]），是无向图（有向图一般不对称）。对角线全是 0，说明没有自环。

行和 = 度数（加权图中的强度）：第 1 行 0\+1\.2\+4\.3\+0 = 5\.5；第 2 行 0\+1\.2\+0\.8\+0 = 2\.0；第 3 行 0\+4\.3\+0\.8\+2\.6 = 7\.7；第4 行 0\+0\+2\.6\+0 = 2\.6。

所有行和相加 = 所有边权之和的 2 倍：5\.5 \+ 2\.0 \+ 7\.7 \+ 2\.6 = 17\.8，而边权和 = 1\.2 \+ 4\.3 \+ 0\.8 \+ 2\.6 = 8\.9，17\.8 = 2 × 8\.9

邻接表（完整数值）

顶点 1 的邻居是 2（权重 1\.2）和 3（权重 4\.3）。每个顶点只出现一次作为行首，所以共 4 行对应 4 个顶点。2 \+ 2 \+ 3 \+ 1 = 8 条，正好是无向边数 4 的 2 倍，因为每条无向边在两端各登记一次。

|问题|边表|邻接矩阵|邻接表|
|---|---|---|---|
|查两点间是否有边|扫全表 O\(m\)|O\(1\)|扫该点邻居 O\(deg\)|
|列出某点的所有邻居|扫全表 O\(m\)|扫一行 O\(n\)|O\(deg\) 最优|
|空间|O\(m\) 最省|O\(n²\) 最费|O\(n \+ m\)|
|适合|存储 / 交换|稠密图、需要矩阵运算|稀疏图的算法（BFS/DFS/PageRank）|

## Part 2 Graph Traversal Methods：图遍历

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTNjZGVmODVlNTk0M2U4NTFjNjY0ZmExNTNjZTUwMWVfOTE4NTdmZmQ4ZWY3NTNlMjMzZDZkOTBmMDA2YTNjYmNfSUQ6NzY5NTk2MTMwNjAwMzc3MDkxNl8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

起点：从源顶点 s（source vertex）出发。换一个 s，整个遍历的次序就全变了，遍历是关于 s 的，不是关于图的。

覆盖：要走到图中的每一个顶点，一个都不能漏。

次序：按某个一定的顺序访问。BFS 与 DFS 的差别只在这个顺序上，其余（起点、覆盖、只访问一次）两条完全一样。

不重复：每个点只访问一次（visited 一次）。前提：图里有环，不做标记就会绕圈不停。

|对比项|BFS（广度优先）|DFS（深度优先）|
|---|---|---|
|推进策略|先近后远：把离 s 近的点全走完，才碰远一层的点|能深就深：沿当前顶点一直往下钻，钻不动了才回头|
|生活比喻|在水里投一颗石子，波纹一圈圈往外扩|走迷宫：一路往前，撞墙才退回来换岔路|
|课件原话|Visit the vertices level by level|Visit a vertex "deeper" in the graph whenever possible|
|被谁用到|无权图最短路、社交网络的分层扩散|连通性、环检测、拓扑排序、强连通分量|

判断遍历序列题：给一张图与起点 s，要求写出 BFS 序列或 DFS 序列。BFS 的答案唯一（按层）；DFS 的答案依赖邻接表顺序，题目必须指定「按顶点编号从小到大」或给定邻接表，否则答案不唯一。

### 2\.1 广度优先搜索 Breadth\-First Search

给定图 $G=(V,E)$ 和源点 s

按距离分层遍历：先访问离 s 更近的所有顶点，再访问更远的顶点，一层一层向外扩展（level by level）

- 遍历轨迹会生成一棵 BFS 树（breadth\-first tree），树是无环连通图

- 数据结构：FIFO 队列 Queue（先进先出）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGM4ZTFhY2Q4ODYxMmJkMTI4ZTdmZGJhOGEyZjg0NGRfZGU0MmJkOWU3YWQ2ZGZkYTRiMzkxOGEyYjAwM2NiZDJfSUQ6NzY5NTk2MjQxNTA0MDY5NTg0NV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjIzMTY0NmZjMzgxMzM5YzJkMGMxOTc2MDA4M2NlNmRfMWQ5MDc4MzZhODRhZWRiNDg0NGYyMTEwODNhMDI2MmRfSUQ6NzY5NTk2MjkzMTU0ODIyOTE1NV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

Tips: 

规则：离 s 近的顶点没走完，绝不碰离 s 远的顶点，**所以 BFS 拿到了最短路径**。

必须有一个起点 s，以及图 G = \(V, E\)。

访问序列天然是按层分块 \(level by level\) 的：第 0 层 \{s\}、第 1 层、第 2 层……

A tree is a connected graph containing no cycles\.

两个条件：连通（任意两点之间都有路）；无环（不存在回到自己的回路）。

副产品：广度优先树，无环 \+ 连通 → 任取一个点当根，父子关系不会出现一个点有两个爸爸的情形。同一个原图，可以生成**不同的 BFS 树**（邻接点遍历顺序不同）。但无论哪棵树，各顶点的 d 值完全相同。

BFS 森林: 如果图不连通，从 s 出发走不到所有点。此时对每个未访问的顶点再起一次 BFS，得到的若干棵树组成森林。

顶点属性

$u.p$：parent，u 的父节点

$u.d$：源点 s 到 u 的距离（无权图：两点之间最少边的数量）未访问顶点初始距离： $\infty$（无穷大）

n 个顶点的树恰好有 n − 1 条边。因为每次发现一个新顶点，恰好新增一条树边，从 1 个点长到 n 个点。

|用途|产出什么|成立条件|
|---|---|---|
|求最短路|从 s 到每个顶点的路径本身（沿 u\.p 一路回溯到 s）|仅无权图（或边权全相等）|
|求最短距离|从 s 到每个顶点的边数 u\.d|仅无权图；加权图要用 Dijkstra|
|检测环|遍历时若遇到一条边指向已访问且不是父亲的顶点，说明有环|无向图需额外排除回到父亲这条边|
|构造 BFS 树 / 森林|树 = 从单个 s 出发；森林 = 对每个未访问顶点各跑一次|任意图（有向无向皆可）|

#### 2\.1\.1  BFS Example：用队列一层层推

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTlkMjhmZjQ1MDJlZjUxZWE2ZjRlYTE4MjJmNmFjZmRfYWRmMjQ5NmY3NjEwYzRkYmExMDA5MDM2YjE2MTA4OWNfSUQ6NzY5NTk2NTUwOTgzNTI3OTkwOF8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDExZmFlZTNjZTc0YjgzMWNhMzI3YjIxOGM2NzJjNDVfMDQ2ZDg2NjhlMzMyYmZmNzJhNWI4YTk3NDhmODllN2JfSUQ6NzY5NTk2NTk4NDE4MzgxNTcwOV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

算法思想：

1. 源点距离设为 0，入队

2. 不断从队首取出节点u，遍历它所有邻接节点v

3. 如果v没有被访问（$v.d=\infty$）：更新距离、记录父节点，入队

性质：出队节点的距离一定是升序排列

矛盾点：边数少的那条（直达）反而贵一倍多。BFS 只看边数，看不见权重，于是给出错误答案。当所有边权相等（例如全为 1）时，边数最少与权重和最小重合，BFS 就是加权图上的特殊正确情形。

正确做法：加权图的单源最短路要用 Dijkstra 算法，它的松弛（relaxation）操作专门处理绕远路但更便宜的情形。

高频判断题：加权图上能否用 BFS 求最短路？不能。

**复杂度：** O\(V \+ E\) ，每个顶点最多入队出队一次（O\(V\)）；每个顶点的邻接表恰好扫一次（O\(E\)）。合计 O\(V \+ E\)。前提是用邻接表存储，若用邻接矩阵则是 O\(V²\)。

把队列换成栈会发生什么？答案：退化成 DFS。

### 2\.2 深度优先搜索： Depth\-First Search

DFS 与 BFS 的差别只是把队列换成递归栈，但行为完全不同：BFS 像水波扩散，DFS 像走迷宫，沿着一条路一直钻，钻到没新点可走才回头。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmRiYzllNjI0ZjFkYjYxNTM3NmIyZTk4OTcwYmFlZDhfZDZkYTU1NGNmYzdmZGM1MjQwOWM3NGEyNWE5ZTZiMDVfSUQ6NzY5NTk3NTU1MDcxOTkzODA4NF8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjFlY2NlMmJhOWYyN2ZjZGQwZjFlODc1YjliMDY4YjZfNTg0MDBkNGJiZjBhZmIzZjQ1MzhmNTRlM2U5YmQxMzZfSUQ6NzY5NTk3NTU2OTU2NTQwNDcwMV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

核心定义：给定源点 s，尽可能往深处走，走到底走不通再回溯（backtrack），像走迷宫。隐式生成一棵 DFS 树（depth\-first tree）；实现方式是递归（本质是调用栈 LIFO 后进先出）

顶点属性

$u.p$：parent 父节点

$u.depth$：节点在 DFS 树里的深度；未访问顶点初始深度：$\infty$

deeper = 离起点更远的树的层。只要当前顶点还有未被访问的邻居，就立刻钻过去，不先把同层邻居都走完。

implicitly（隐式）：BFS 的树是显式存的（每个点存 u\.p 并连边画出来）；DFS 的树是递归调用栈自己形成的，算法本身不维护一棵树对象。

算法思想：

1. 初始化所有节点深度无穷，源点深度 = 0，调用访问函数

2. DFS\-VISIT\(u\)：遍历 u 的所有邻接点 v

3. v 未访问，则更新深度、父节点，**递归访问 v**

4. 递归触底之后，执行回溯 backtrack

|细节|BFS|DFS|
|---|---|---|
|初始化范围|$G.V − {s}$（除源点）|G\.V（全部顶点，含源点）|
|源点赋值|$s.d ← 0 ; s.p ← NIL$（连父亲一起置空）|只写 s\.depth ← 0（父亲在初始化那步已置 NIL）|
|新点处理|标记 d、记父亲、入队（稍后处理）|标记 depth、记父亲、立刻递归（马上处理）|
|判重字段|v\.d = ∞|v\.depth = ∞|

#### 2\.2\.1 DFS Example：递归

课件例子（起点 node 1）

遍历顺序：1, 2, 3, 4, 6, 5, 7 步骤：

1. 访问 1 → 访问 2 →访问 3 →访问 4（到底）

2. 回溯回到 3，回溯回到 2

3. 访问 2 的另一个邻点 6 →访问 5（到底）

4. 回溯回到 6，回溯回到 2，回溯回到 1

5. 访问 1 剩下邻点 7

同一个原图，可以生成**不同的 DFS 树**（邻接点遍历顺序不同）

### 2\.3 BFS VS DFS

||BFS 广度优先|DFS 深度优先|
|---|---|---|
|核心思路|一层一层向外扩散，就近优先|一路往深处钻，走不动回溯|
|底层数据结构|队列 Queue（FIFO）|递归调用栈 Stack（LIFO）|
|适用场景|无权图最短路径，找最近节点|拓扑排序、找环、连通分量、迷宫搜索|
|遍历特点|按到起点距离从小到大访问|先一条路走到黑，再回头探索其他分支|
|树生成|BFS 树|DFS 树|
|树的形式|显式构造|隐式形成|
|层号字段|u\.d（distance，等于最短路）|u\.depth（只是树深）|
|实现要点|while 循环 \+ if v\.d = ∞|for 循环 \+ if v\.depth = ∞ \+ 递归调用|

1. BFS **只适用于无权图最短路径**，带权图 BFS 失效

2. BFS、DFS 树都不唯一，取决于邻接表遍历邻节点的先后顺序

3. BFS 距离 = 源点到该点最少边数；DFS 的 depth 只是树里深度，**不是原图最短距离**

4. BFS：队列；DFS 递归版本靠系统栈，迭代版需要手动栈

## Part 3  Centrality Measure

前置基础：BFS 用于无权图最短路径；Degree、Closeness 多用于无向图；PageRank 用于有向图（网页超链接） 

核心目标：衡量网络中每个节点的重要程度（how central/important a vertex is）

三种度量

|度量|特点|只看什么|计算代价|
|---|---|---|---|
|Degree Centrality|邻居数量多|局部：只看自己的度数|最便宜，读一遍边即可|
|Closeness Centrality|到其他所有顶点的距离之和小|全局几何：需要所有点对距离|贵：每个顶点各跑一次BFS|
|PageRank|被重要的顶点指向|全局迭代：靠迭代求解|较贵：多轮迭代直至收敛|

### 3\.1 度中心性：Degree Centrality

Degree centrality uses the vertex degree\. Higher degrees means more central\. It only considers local direct neighbors, ignoring global network structure\.

> 节点的度 = 和该节点直接相连的边数量 Rule：The higher the degree, the more central the node is\. 度越大，节点越重要、越处于网络中心。
> 
> 

核心思想：只看直接相邻的邻居（local 局部信息），不考虑整个网络的全局结构。

- 节点拥有越多直接相连的邻居 → 度越高 → 度中心性越高

- 在社交网络例子：一个人好友数量越多，度中心性越高

优点：计算最简单，开销极低，一眼就能算出；直观易懂。

缺点：只看局部，忽略全局信息 只统计直接相连节点，完全不考虑邻居本身是否重要，也不考虑节点到远处节点的距离。

> 例子：一个节点有 5 个普通邻居；另一个节点只有 2 个邻居，但这 2 个是网络超级核心节点。
> 
> Degree Centrality 会判定前者更重要，但真实影响力后者更强。 
> 
> 无法区分边的方向（有向图要拆成入度中心性 in\-degree / 出度中心性 out\-degree）
> 
> 

适用场景

快速粗略筛选网络中连接多的节点；简单无向网络。比如，社交网络找关键人物、Web 找权威页面、传播场景找阻断谁最有效。能高效地把信息传遍全图的顶点，就是最中心的顶点。

度最高的顶点一定是最中心的吗？不一定。度中心性只数邻居，不看邻居是谁；PageRank 恰恰相反，看的是邻居的质量。反例：页面 E 的入链比 C 多得多，PageRank 却只有 C 的四分之一。

### 3\.2 接近中心性：Closeness Centrality

Closeness centrality $C(v)=1/\sum dist(v,u)$\. We run BFS for each node to get shortest paths in unweighted graph\. Nodes with smaller total distance have higher closeness\. It is a global measure\. It works only for connected unweighted graphs\.

度中心性只看直接连着几个人；接近中心性看从我开始，到全图所有人，加起来要走多少条边，越小越中心。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjcxMzZiMzNhMWY1MGFkMjU5YTAyNTBkMDUwN2QxYTZfNzA4NTFmMDU1YzgyYzFiMzRkNWFhMTRmOWI3ZTRkZjlfSUQ6NzY5NTk4MDAxMzk1NDc2NDMyM18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2I0MWI4YTYyOWM5M2MwN2MyNGQzZTNjZjViYmY1MjlfMzU3MWY5ZWM1YmFmNWI5N2RiYjNhN2ZiMjk5OGU5MjhfSUQ6NzY5NTk4MDAyNDUwNzY0OTU3NF8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

$C(v)=\frac{1}{\sum_{u} dist(v,u)}$

- $dist(v,u)$：v 到 u 的最短路径距离（无权图：边的条数）

- $\sum_{u} dist(v,u)$：节点 v 到图中所有其他节点 u的最短路径距离之和（总距离）

- 总距离 $\sum dist(v,u)$ 越小 → $C(v)$ 越大

- High closeness centrality：这个节点离网络里所有其他节点都很近，信息可以快速传播到全网。

例题：vertex 2 到 1,3,4,5,6,7 的最短距离依次：1,1,2,2,1,2 Sum = 1\+1\+2\+2\+1\+2 = 9 → $C(2)=1/9$

|顶点 v|到其余 6 个点的距离|距离之和|C\(v\)|
|---|---|---|---|
|1|1, 2, 3, 3, 2, 1|12|1/12 ≈ 0\.0833|
|2|1, 1, 2, 2, 1, 2|9|1/9 ≈ 0\.1111（最大）|
|3|2, 1, 1, 3, 2, 3|12|1/12 ≈ 0\.0833|
|4|3, 2, 1, 4, 3, 4|17|1/17 ≈ 0\.0588（最小）|
|5|3, 2, 3, 4, 1, 2|15|1/15 ≈ 0\.0667|
|6|2, 1, 2, 3, 1, 1|10|1/10 = 0\.1|
|7|1, 2, 3, 4, 2, 1|13|1/13 ≈ 0\.0769|

排序 C\(2\) = 1/9 \> C\(6\) = 1/10 \> C\(1\) = C\(3\) = 1/12 \> C\(7\) = 1/13 \> C\(5\) = 1/15 \> C\(4\) = 1/17。

算法

Input: Unweighted graph G For each vertex v in graph:

1. Run BFS starting from v

2. Record shortest path distance $dist(v,u)$ from v to every other vertex u

3. Sum all distances, compute $C(v) = \frac{1}{\sum dist(v,u)}$ Return vertex $v'$ with maximum $C(v')$

关键点：BFS 是用来计算无权图最短路径的工具，Closeness Centrality 依赖 BFS，对每个顶点各跑一次 BFS。对 n 个顶点各跑一次，总代价 O\(V·\(V \+ E\)\)。稀疏图（E ≈ V）时约为 O\(V²\)。而度中心性只要 O\(V \+ E\)，一次遍历就够。接近中心性贵了整整一个因子 V。

优点：全局指标：考虑节点到网络全部节点的距离，不只是直接邻居；

衡量信息传播速度：closeness 高的节点，消息传递到全网更快。

缺点：只适用于无权连通图。如果图不连通，部分节点之间没有路径，距离无穷大，公式失效；

计算开销更大：每个节点都要单独跑一遍 BFS。n 个节点，复杂度$O(n(n+m))$，大图很慢；

不区分邻居的重要性，只看距离长短。

问题：度中心性为什么不足以刻画重要性？只看数量、不看质量，且只覆盖一步邻域

适用场景：连通、无权无向网络；找网络里 “到所有人最近” 的枢纽节点（交通枢纽、信息中转站）

### 3\.3 Google PageRank

PageRank is a global importance metric for directed graphs, originally for web search\. It can be interpreted by random walk\. With probability d, surfer follows out\-links; with $1-d$, jumps to a random page\. We iteratively update PR values\. A page is important if many high\-quality pages link to it\. Sum of all PR = 1\.

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2Y5YTllZjM4ZjIxMGQzYzI0YmQ2MWI0N2E0MDI5YTNfZWNmYzM3MmI0ZTY3ZDI0MGI0Mzc2ZjRhMDdkMTk0YTBfSUQ6NzY5NTk4NDU1NzI3MDY4MzE3M18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODUzMDkyY2UyZmQxNjgzYmNmYTc3YTRkMzEzNjhlZjBfNzAyMTEzNDU4NjY1YmQ0YzY2OGMzM2U0MTJiZWVkYzFfSUQ6NzY5NTk4NDU4NDY4ODk2MzExMF8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

PageRank：有向图上的全局节点重要性指标，谷歌早期搜索引擎用来给网页排序。 

Vertices = web pages；Directed edges = hyperlinks（超链接 A→B：网页 A 链接到网页 B）

度中心性与接近中心性都是在图上量距离，它们看不出邻居的质量。PageRank 的解决思路是把这件事做成一个递归，PageRank 量的是整个图范围内的重要性，而且这个重要性是被其他顶点投票投出来的。

核心思想

A webpage has high PageRank if:

1. Many other pages link to it（大量网页指向它）；AND/OR

2. The pages that link to it themselves have high PageRank value（指向它的网页本身是高权重权威页面）

课件例子：Page C has fewer incoming links than page E, but C’s PageRank is higher\. Because the page linking to C has very high value\. 不是单纯数入链数量，入链的质量 \> 入链数量

#### 3\.3\.1 Random Walk 随机游走模型

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjkyZjA5NjU4N2M4OWU3YjBhMTMwNjc5YmY5MWI2OTFfY2RkOWY5YWQwNWFlN2Y4ZTA2NWE1MDA1OWMwYTFlMTRfSUQ6NzY5NTk4NDIwMjQzMjY0NjY5Ml8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjU4OWJmZjI1NDQwZmI3ZjBhYzAyNThmOGFhNDliNjZfMTM2MjFiNmNjNzMwOWY5OTc5NzliYmViZWUzZTA5ODlfSUQ6NzY5NTk4NDI2NTk2ODA5NDc1NV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

想象一个随机上网的人（random surfer /random walker）：

d = damping factor 阻尼因子，经典取值 $d=0.85$，课件例题用$d=0.8$

1. With probability d：顺着当前网页的超链接，随机选择一个出邻居页面跳转

2. With probability $(1-d)$：不再点击链接，随机跳转到图中任意一个网页

$PR(v)$ = the probability that this random walker lands on page v 在稳态下，随机游走者停留在页面 v 的概率。

All PageRank values in a graph sum to 1。整张图所有节点 PR 之和 = 1。

阻尼因子$1-d$作用： 解决悬挂节点（dangling node，没有出链接的页面），防止游走卡死；同时模拟用户不想继续点链接，新开网页的行为。

#### 3\.3\.2 PageRank 迭代更新公式

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2NmYWQ0YThmOWQ3MTM3YjJhNzljMjkxZjhiN2U1N2JfNzQxZDBhZmNiY2IzODdmNzc4NTI4NTdjM2RmZWFhZGRfSUQ6NzY5NTk4NDMyODA5NDI0MDI5M18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2E5MmI3ZTVjMzEwYzJkMDMzYjFjZGVmMjU2MDVlMTFfM2ZjOTQxZjRhYjJjMGMyOTliN2NhZDJkYTUyMTEyMjNfSUQ6NzY5NTk4NDQ1NDk0MjQ3Nzg1M18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

$PR^t(v) = \frac{1-d}{n} + d \cdot \Big(\sum_{v'\in N_{in}(v)} \frac{PR^{t-1}(v')}{|N_{out}(v')|}\Big)$ 

- n：total number of nodes in graph 总节点数

- $N_{in}(v)$：in\-neighbors of v，指向 v 的节点集合（入邻居）

- $|N_{out}(v')|$：out\-degree of node $v'$，节点$v'$的出度（v' 向外链接多少个页面）

- $PR^{t-1}(v')$：上一轮（t\-1 迭代）节点 v' 的 PageRank 值

- $\frac{1-d}{n}$：随机跳转项。$1-d$这部分概率，平均分给所有 n 个节点

迭代完整流程

1. Initialization \(Iteration 0\)： 所有节点初始 PR 均等分配：$PR^0(v) = \frac1n$

2. Iteratively update PR： 不断用上面公式计算新的$PR^t$，每一轮用上一轮 t\-1 的 PR 结果

3. Convergence 收敛判断： 重复迭代，直到所有节点 PR 值变化很小，基本稳定，停止迭代。

4. 性质：每一轮迭代，全部节点 PR 总和始终等于 1

例子（n=4，d=0\.8）

Iteration0（初始化）：$PR(v_1)=PR(v_2)=PR(v_3)=PR(v_4)=\frac14$

Iteration 2：把 Iteration1 算出的$\frac{1.4}{12},\frac{2.6}{12},\frac{4.2}{12},\frac{3.8}{12}$作为旧值，再次代入公式，继续更新。反复迭代直到稳定。

5\. 优点：有向图全局指标；不只看链接数量，重视链接来源的质量；

抗简单作弊：单纯大量垃圾页面链接你的页面，提升 PR 效果有限，因为垃圾页面自身 PR 很低。

6\. 缺点：需要多次迭代计算，开销大；

是概率稳态值，依赖阻尼因子参数 d 的选择；

原始 PageRank 不考虑网页内容，只看链接结构。

### 3\.4 三种测量总结

|**指标**|**图类型**|**核心信息来源**|**计算方法**|**核心思想**|
|---|---|---|---|---|
|Degree Centrality<br>度中心性|无向图（有向图可拆入 / 出度）<br>Local 局部|直接相连邻居数量|统计节点度数<br>|连接越多邻居，越重要|
|Closeness Centrality<br>接近中心性|连通无权无向图<br>Global 全局|到所有节点最短路径总和|每个节点 BFS 求最短距离，公式 $C(v)=∑1/dist(v,u)$|离全网所有节点越近，越重要|
|PageRank|**有向图**<br>Global 全局|入链数量 \+ 入链页面自身权重|随机游走模型，迭代更新公式，阻尼因子 d|被高质量页面链接，则节点重要|

1. BFS 的定位：BFS 用来求无权图最短路径，是计算 Closeness Centrality 的底层算法；PageRank不使用 BFS，靠迭代。

2. Closeness Centrality：图必须连通；不连通图，部分 dist 无穷大，无法计算。

3. PageRank 公式分母：$\boldsymbol{|N_{out}(v')|}$ 是源节点 v' 的出度，不是目标节点 v 的度。

4. 阻尼因子d：0\.85 是经典值；$1-d$是随机跳转概率，均匀分给全部节点。

5. PageRank 所有节点 PR 之和恒等于 1；初始化全部等于$1/n$。

6. 区分：Degree：数邻居多少；Closeness：算距离远近；PageRank：看谁链接，重视链接来源质量（有向）。

## Part 4 Shortest Distance

加权图上 BFS 失效，靠**松弛**逐个把顶点的最短路确定下来；正确性的根基是最优子结构 \+ 非负权。

基础概念

Problem：给定图，求源点 source s到图中所有其他顶点的最短距离。 与接近中心性不同，那里要跑 n 次单源最短路，这里只跑一次。

Application：地图导航、路线规划。

$\delta(u,v)$：u 与 v 之间真实最短路径距离

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWVmMWZlYTkwZTQxNTYyNWQ0ZDNkYzRiOTFkOTg3ZTdfZGEyZDczODNhODk4NDY4MmVjNDNjZmNiOWI2ZDUxMTBfSUQ6NzY5NTk4Njk5OTU4MDIxNjg2N18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTAzM2FjYWQ5MzlmNWI4OWRiNjY5MGEwYzM5ZDQ2NWVfMmQ3ZWM0YmNlMGFiODhjNDdhYzFjNTg4ZDcwZTZkMWRfSUQ6NzY5NTk4NzEyMzAxNDQ1NDgxOV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

前提假设：图所有边权重 NON\-NEGATIVE（非负权重！Dijkstra 不能处理负权边）

### 4\.1 Optimal Substucture 最优子结构

If vertex u lies on the shortest path from s to v, then the subpath $s \to \dots \to u$ must be the shortest path from s to u\.  最短路的最短路仍然是最短路。 

推论：$\boldsymbol{\delta(s,u)\le \delta(s,v)}$ 

距离单调递增：最短路上的点，沿着路径走只会越来越远（因为非负权重）。

|记号|读法|含义|
|---|---|---|
|δ\(u, v\)|delta|真实的最短距离（true shortest distance）是想求但还不知道的那个真值|
|d\(s, v\)|d|算法当前维护的估计值（用 p\.45 的伪代码）是个会不断变小的上界|
|w\(u, p\)|w|边的权重（weight）课件假设 w ≥ 0（非负）|

解题思路：先求解离源点更近节点的最短距离，利用已经算出的近点结果，求解更远节点。

Dijkstra 为什么可以按距离从小到大逐个确定顶点？因为最优子结构 \+ 非负权，所有更远的顶点的距离一定不小于当前顶点，所以当前最小的 d 不可能再被改进。

### 4\.2 Dijkstra Algorithm 伪代码

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGYzOTMyNGE0ZTJmZWYzZjQyN2ZkNzA0YTI0OGYzNWFfZTM4MmQyZmNiOTE1YTc3Y2MyOTU5M2E1MGFlYzViMzVfSUQ6NzY5NjEzMjY2MDYwNjk2MzIyOV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

Input: 带非负权图 $G(V,E)$，源点s

1. 初始化：对所有顶点 $v\in V$，$d(s,v)=\infty$；源点 $d(s,s)=0$

2. 集合 Q：保存全部 $(v, d(s,v))$ 键值对（优先队列 / 最小堆，每次取出距离最小节点）

3. 集合 S：空集合，存放**已经确定最短距离**的节点

4. while $Q \neq \emptyset$：

    1. 从 Q 取出拥有最小$d(s,u)$的元组$(u,d(s,u))$，从 Q 删除

    2. 将u加入 S：$S = S \cup \{u\}$

    3. 遍历u的所有邻居p：if $d(s,p) > d(s,u)+w(u,p)$则$d(s,p)=d(s,u)+w(u,p)$，并更新p的距离值。

    **Relaxation（松弛操作）**：尝试用经过 u 的新路径，更新 p 的最短距离。只有新路径更短才更新。

|Q 的实现|取最小的代价|总复杂度|
|---|---|---|
|线性数组（扫一遍找最小）|O\(V\)|O\(V² \+ E\)|
|二叉堆 / 优先队列|O\(log V\)|O\(\(V \+ E\) log V\)|
|斐波那契堆|O\(1\) 摊还|O\(E \+ V log V\)|

#### 4\.2\.1 Example

结论：对所有自然数 n 成立，算法正确。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2U0MmU3ZTliZjEwZDU2MTE2Nzg2MDc3ZWZjYzQ1ZDFfNTYyYjM5OWU0MjFkZTFlMzlmMzAwNmIxZmE5NTYwMTNfSUQ6NzY5NjEzNTIyMDQwNzUwNDQyMF8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

操作轨迹：四个距离之和 8 \+ 5 \+ 9 \+ 7 = 29

|帧|取出的顶点（Q 中最小）|本轮发生的松弛|取出后的 d 值（s,t,x,y,z）|
|---|---|---|---|
|\(a\)|—（初始）|—|0, ∞, ∞, ∞, ∞|
|\(b\)|s（0）|s→t: ∞ → 10；s→y: ∞ → 5|0, 10, ∞, 5, ∞|
|\(c\)|y（5）|y→t: 10 → 8；y→x: ∞ → 14；y→z: ∞ → 7|0, 8, 14, 5, 7|
|\(d\)|z（7）|z→x: 14 → 13；z→s: 0 \< 14，不改|0, 8, 13, 5, 7|
|\(e\)|t（8）|t→x: 13 → 9；t→y: 5 \< 10，不改|0, 8, 9, 5, 7|
|\(f\)|x（9）|x→z: 7 \< 13，不改；Q 空 → 结束|0, 8, 9, 5, 7|

对比：BFS vs Dijkstra

BFS 无权图最短路径，边权重 = 1，队列，不处理权重。是加权最短路在等权特例下的退化形式。BFS 只用于无权图（边数最小）；

Dijkstra 非负加权图单源最短路径，最小优先队列，处理任意≥0 边权。若把所有边权都设成 1，结果与 BFS 完全一致，是 BFS 的加权推广。Dijkstra 用于边权非负的加权图（权重和最小）

> Dijkstra 限制：不能存在负权重边；负权图要用 Bellman\-Ford
> 
> 

#### 4\.2\.2 Dijkstra 正确性证明

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWI4ZjNjZDExNmQ3NWU4OWYyNmRmMDliZmEyNjFmMWNfMzY3ZDkzNTk3NmMxNmNhMzlmOTg0ZDkwMDU2MGI0MzhfSUQ6NzY5NjE0MzgyODkzOTczODY1OV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODc1MTgxOTZiNTA1NDVhZDAxYTUwODMzOGRmYzRhNDFfMTI5NGQ2NmU3ODExOWMxODFjODc3YjUwYmUwMDNmZjdfSUQ6NzY5NjE0Mzg2NjU0NTU4OTc5NV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

**命题**：算法结束时，对所有顶点v，$d(s,v)=\delta(s,v)$（预估距离 = 真实最短距离）

步骤：按取出次序做归纳；基例是源点；归纳步在最短路里取一条S → Q的跨界边\(x, y\)；用 δ\(s,y\) ≤ δ\(s,v\) ≤ d\(s,v\) ≤ d\(s,y\) 夹逼，得到 d\(s,v\) = δ\(s,v\)。

基础 Base case：第 1 个取出节点是源点s，$d(s,s)=0=\delta(s,s)$，成立。

归纳假设 Induction hypothesis：前$n-1$个从 Q 移除的节点，都满足$d=\delta$

归纳步骤 Inductive step：第n个取出节点v，证明$d(s,v)=\delta(s,v)$

1. 松弛操作只会**减小**$d(s,v)$**；一旦**$d(s,v)=\delta(s,v)$，值不会再改变。

2. 当节点v被从 Q 取出的时候，它的$d(s,v)$已经等于真实最短距离$\delta(s,v)$，不会有更短路径。

3. 利用最优子结构：最短路径上的子路径本身也是最短路径。

|步|内容|原理|
|---|---|---|
|归纳起点|n = 1 时取出的是源点 s，d\(s,s\) = δ\(s,s\) = 0，成立|初始化的定义|
|归纳假设|假设前 n − 1 个被取出的顶点都满足 d = δ|归纳法|
|找一条跨界的边|在第 n 个顶点 v 的真实最短路上，取第一条起点在 S、终点在 Q的边\(x, y\)|S 非空（至少含 s）、Q 含 v，所以这样的跨界边一定存在|
|夹逼（三个不等式）|由观察得 δ\(s,y\) ≤ δ\(s,v\)；由v 是Q 中最小得 d\(s,v\) ≤ d\(s,y\)；由第一部分得 δ\(s,v\) ≤ d\(s,v\)|最优子结构 \+ 贪心选择 \+ 单调性|
|夹逼（收口）|三式串成 δ\(s,y\) ≤ δ\(s,v\) ≤ d\(s,v\) ≤ d\(s,y\)；由归纳假设 d\(s,y\) = δ\(s,y\)，两端相等 → 中间全部相等 → δ\(s,v\) = d\(s,v\)|归纳假设把链条锁死|

Tips：

跨界的边：要证明 d\(s,v\) 已经降到 δ\(s,v\)，得说明在 v 之前一定已经有一条路径把正确的值送过来了。这条路径就是 s → … → x → y → … → v，其中 x 已在 S（已确定）、y 还在 Q。

夹逼：把不等式链条把四个量串在一起，两端相等就逼出中间全部相等。

d\(s,y\) = δ\(s,x\) \+ w\(x,y\) = δ\(s,y\) ：x 被取出时（由归纳假设 d\(s,x\) = δ\(s,x\)）它一定松弛过自己的邻居 y，把 y 的估计值设成了 δ\(s,x\) \+ w\(x,y\)；而这条路径本身是最短路的一段，所以这个值就是 δ\(s,y\)。即最短路的一部分必须是最短路。

## Part 5 Vertex Similarity/ Proximity Measures 链路预测

### 5\.1 链路预测 Link Prediction

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmRmMzNkYWI4NjI3YjczYjFiY2RmYjI4MjU3OTcwNjlfYjRiMTVhZjVkMGMyZDllMDgxMzQ4ZWNmNTJlMTNmMTZfSUQ6NzY5NjE0NDQwMjM3MjE1Mjg2N18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

目标：预测两个节点$v_1,v_4$之间未来会不会产生边，或者评估两个节点之间存在边的可能性。

核心思路：计算节点之间的相似度 similarity / 邻近度 proximity。

### 5\.2 雅卡尔相似度 Jaccard Similarity （无向图）

又称定点相似度：共同邻居 ÷ 邻居并集，一个 0 到 1 的数，用来预测这条边该不该存在。

链路预测为什么可以用相似度？因为真实网络有同质性（homophily），相似的人更容易产生联系，所以邻居重合度高的一对顶点未来连边的可能性更大。但相似度只是启发式，不是必然，最终要看预测任务的评价指标。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2RhYTk3N2E4YjlkZjE5MGM1YzM4YmNhMmIwMjU1Y2VfYWEwYzljNWNiZDkxNzUxNTQzMzhkZmFhNjlkYmNmNTNfSUQ6NzY5NjE0NDYwODUzNTEwNTA2MV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

$Jaccard(v_1,v_4)=\frac{|N(v_1)\cap N(v_4)|}{|N(v_1)\cup N(v_4)|}$

- $N(v)$：节点v的一阶邻居集合

- 分子：两个节点公共邻居的数量（交集大小）

- 分母：两个节点所有邻居总数（并集大小）

- 含义：Jaccard 越高，两个节点共享越多共同邻居，越有可能产生新边。常用于社交网络好友推荐。

例子：v1 邻居 \{v2,v3\}, v4 邻居 \{v2,v5\} 交集$N(v1)\cap N(v4)=\{v2\}$，并集$\{v2,v3,v5\}$ $Jaccard = \frac13$

|顶点对|交集|并集|Jaccard|是否已有边|
|---|---|---|---|---|
|\(v₁, v₂\)|\{v₃\} → 1|\{v₁,v₂,v₃,v₄\} → 4|1/4 = 0\.25|已有|
|\(v₁, v₃\)|\{v₂\} → 1|\{v₁,v₂,v₃,v₄\} → 4|1/4 = 0\.25|已有|
|\(v₁, v₄\)|\{v₂, v₃\} → 2|\{v₂, v₃\} → 2|1（最大）|没有 → 预测它就对了|
|\(v₂, v₃\)|\{v₁, v₄\} → 2|\{v₁,v₂,v₃,v₄\} → 4|1/2 = 0\.5|已有|
|\(v₂, v₄\)|\{v₃\} → 1|\{v₁,v₂,v₃,v₄\} → 4|1/4 = 0\.25|已有|
|\(v₃, v₄\)|\{v₂\} → 1|\{v₁,v₂,v₃,v₄\} → 4|1/4 = 0\.25|已有|

## Part 6 Community and Clustering Concepts：社区与聚类

### 6\.1 Connected Components 连通分量

#### 6\.1\.1 Undirected Graph 无向图：Connected Components \(CC\)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzgwMzgwYmMzMTcxMTUxY2NiYzViMzYwNDk5M2UwODVfZjc2Yjg2NDA0ZmRlMjAyM2U0MTYzNDEwYjI0MDRkMjdfSUQ6NzY5NjE0NTQ3NTM1OTExNjgzN18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmYxMjhjMDEyY2JmMzcxZTM5Yzg3MTNmNGRlODJiMmZfZjYwYzYxMmQ0ZGI3YjBkNzY2YjFjZTc5ZDlkNzBlODlfSUQ6NzY5NjE0NTQ4MDQwODg5NTAxNF8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

定义： A connected component \(CC\) is a maximal subgraph in which each pair of nodes is connected via paths\. 连通分量 CC 是极大连通子图：子图内部任意两点之间都存在路径；不能再加入更多节点而保持连通。

- 单个孤立节点本身也可以是一个连通分量。

寻找无向图连通分量算法（BFS/DFS）

Steps：

1. 全部顶点初始标记为未访问 not visited。

2. 重复直到所有节点都被访问：挑选一个未访问节点v，从v开始运行 DFS 或者 BFS 遍历；遍历过程中把所有可达节点标记为 visited；本次 DFS/BFS 遍历结束，得到一个连通分量。

为什么 DFS 和 BFS 都可以？两者都能从一点出发走到所有可达点，而 CC 只关心可达不可达，不关心访问次序。

外层循环跑几次？跑的次数正好等于 CC 的个数。从几个起点出发过，就知道图被切成了几块。

复杂度：合计O\(V \+ E\)，与一次遍历同阶。每次遍历把一批顶点标记一次，所有顶点总共只被访问一次、所有边也只被检查一次（无向图每条边检查两次）。

### 6\.1\.2 Directed Graph 有向图：SCC \& WCC

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTU3MzVmNjhkYzAxODliMjNmN2ZkNTZmZjVjNDRhMTNfYTMwNzMwNDM5ZmEyMjg1NzQwNWZkYTc5NDdlODBmMGRfSUQ6NzY5NjE0NTUxOTczOTE0NTc2Nl8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODBkMGQzNmFiZDhiMWY1N2M4MmMzMjI1YjhhNzU3ZmFfY2UwNDViY2VhYmFmMzczOWM1ODNjY2M4NTk1MWFjMzFfSUQ6NzY5NjE0NTU1MzQzMjAzODk0OV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

1. Strongly Connected Components \(SCC\) 强连通分量

A strongly connected component \(SCC\) of a directed graph is a maximal strongly connected subgraph\. Within SCC, there exists a path in both directions between every pair of vertices\. 

强连通分量 SCC：有向图的极大强连通子图。分量内部任意一对节点$u,v$，同时存在 u→v 和 v→u 双向路径。

- 单个孤立节点自身也可以是 SCC。

课件例题 SCC 结果：$\{1,2\},\{3\},\{4,5,8\},\{6\},\{7\}$

1 和 2 互相可达，构成 SCC；3 只能单向进出，自己单独 SCC；4,5,8 互相可达。

6 只能被 3 指向，无法返回；7 指向 6，无法回来，各自独立 SCC。

2. Weakly Connected Components \(WCC\) 弱连通分量

Treat directed graph as undirected graph \(ignore edge directions\)\. The connected components of this undirected graph = WCC of original directed graph\. 

把有向图忽略边方向，当成无向图看待，得到的无向连通分量就是原图的弱连通分量 WCC。 

Example

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzcxMmMzMjgyYzYwNzA5ZGJiMzgyOTFkYWM5NDVmNDNfZWZlMzA5MDI1NzU3MmM4ZTY3MjU1NGZhODc5MjllNDRfSUQ6NzY5NjE0OTU3ODg3NzI1OTI5OV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

例题 WCC 结果：$\{1,2,3,6,7\},\{4,5,8\}$ 只要不看箭头，节点之间能连通，就属于同一个 WCC，不要求双向路径。

|对比项|SCC（强连通）|WCC（弱连通）|
|---|---|---|
|用什么图算|保持有向|先转成无向|
|判据|任意一对顶点双向可达|任意一对顶点至少单向可达|
|要求强度|强|弱|
|数量关系|个数 ≥ WCC 个数|个数 ≤ SCC 个数|
|典型用途|找封闭的圈层（如互相转发的朋友圈）|找同一批人/同一个话题（不关心方向）|

SCC 是否一定是 WCC？是（前提是它作为子图还有意义）；

怎么求 WCC？把有向边当无向边，求连通分量即可。

### 6\.2 Local Clustering Coefficient 局部聚类系数 \& 平均聚类系数

衡量网络三角闭合程度（朋友之间互相认识的程度，社交网络经典指标）

#### 6\.2\.1 Undirected graph 无向图 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGNkOGE4Y2M3ZTMzYzU0ZGIzOTYxY2QxYjFkMjFmNzFfZDkzNmUxNjUxNjRlNjFkZDkyNTcwODMxMDgyOTg5NWNfSUQ6NzY5NjE1MjU0MjkyMDY0MjA4Nl8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

Local Clustering Coefficient $C_v$

$C_v=\frac{\text{number of edges between neighbors of }v}{\text{max possible edges among neighbors of }v} =\frac{\text{actual edges between neighbors}}{\frac{|N(v)|(|N(v)|-1)}{2}}$

分子：节点v的邻居们之间真实存在的边数量；

分母：v的邻居集合如果构成完全图，理论上最多能拥有多少边（组合公式 $C_k^2=\frac{k(k-1)}{2}$，k 是邻居数量$|N(v)|$）

课件例子：$C_2=\frac{2\times2}{4\times3}=\frac13$ 

|顶点|分子（邻居间的边数）|分母 k\(k−1\)/2|$C_v$|
|---|---|---|---|
|v₁|v₂–v₃ → 1|2 × 1 / 2 = 1|1（邻居连着）|
|v₂|v₁–v₃、v₄–v₅ → 2|4 × 3 / 2 = 6|1/3 ≈ 0\.333（课件给的）|
|v₃|v₁–v₂ → 1|2 × 1 / 2 = 1|1|
|v₄|v₂–v₅ → 1|2 × 1 / 2 = 1|1|
|v₅|v₂–v₄ → 1|2 × 1 / 2 = 1|1|

含义：$C_v\in[0,1]$

$C_v=1$：v 的所有邻居两两之间全部相连，邻居构成完全图；

$C_v=0$：v 的邻居之间没有任何边，没有三角结构。

#### 6\.2\.2 Directed graph 有向图 Local Clustering Coefficient

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDg3ODYyMjc0MmIzMzZmOTBkYTA2YzMyNDZmMzI1MDhfNzkyNzgzM2Q0NzM4NzExYzE5NjUwMTZiMWY2NmE1NWJfSUQ6NzY5NjE0OTcxMTYzMTUwMjg3N18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

邻居集合取入邻居∪出邻居 $N_{in}(v)\cup N_{out}(v)$

$C_v=\frac{\text{edges between nodes in }N_{in}(v)\cup N_{out}(v)}{|N_{in}(v)\cup N_{out}(v)|\cdot(|N_{in}(v)\cup N_{out}(v)|-1)}$

课件例子：$C_2=\frac{2}{4\times3}=\frac16$

|顶点|k|分子（并集内的有向边）|分母 k\(k−1\)|C\_v|
|---|---|---|---|---|
|v₁|2|v₃ → v₂ → 1|2 × 1 = 2|1/2|
|v₂|4|v₃ → v₁、v₄ → v₅ → 2|4 × 3 = 12|1/6（课件给的）|
|v₃|2|v₁ → v₂ → 1|2 × 1 = 2|1/2|
|v₄|2|v₂ → v₅ → 1|2 × 1 = 2|1/2|
|v₅|2|v₂ → v₄ → 1|2 × 1 = 2|1/2|

#### 6\.2\.3 Graph Average Clustering Coefficient 图平均聚类系数

整张图的平均聚类系数 = 图里所有节点的局部聚类系数的算术平均值

$C_{avg}=\frac1n\sum_{v\in V}C_v$ 

用来描述整个网络的整体聚集特性：高平均聚类系数代表网络有大量三角形、小团体结构（例如社交网络）。

# Lecture 8 Big Data Storage 大数据存储

## Part 1 数据类型与存储系统选择 Types of Data

数据的组织结构与更新频率直接影响存储系统的设计。课件从两个相互独立的维度对数据进行分类：结构化程度（Structured / Unstructured）与变化频率（Dynamic / Static），并通过四象限模型说明不同数据类型的存储需求。

### 1\.1 按结构化程度分类

|**类型**|**定义与特征**|**典型示例**|
|---|---|---|
|Structured Data（结构化数据）|具有预定义的数据模型，便于存储、处理、检索和管理，通常以表格形式组织|关系型数据（Relational Data）|
|Unstructured Data（非结构化数据）|不具有便于直接查询和处理的统一数据模型，通常需要额外解析或处理|文本、音频、视频等原始文件|

非结构化数据并非完全没有结构。 例如，音频文件仍然具有编码格式及相关元数据。两类数据的核心区别在于其组织形式是否便于直接检索与处理，而非是否存在任何内部结构。

### 1\.2 按变化频率分类

|**类型**|**定义**|**典型示例**|
|---|---|---|
|Dynamic Data（动态数据）|内容更新相对频繁|办公文档、金融数据库中的交易记录|
|Static Data（静态数据）|内容相对稳定，更新频率较低|MRI、CT 医学影像|

动态与静态描述的是数据内容的变化频率，而非访问频率。静态数据也可能被频繁读取。

### 1\.3 数据分类四象限 Data Classification Quadrants

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mzc0ZDgyMzUzYjUwZDllNTU2MTc2MzVkZDM0OThjNmJfYzRkMDkwYTNhYTU0OThjZTAwY2ZjNDk2NGI2ZDI1MTJfSUQ6NzY5ODYxODY5NjIxMzg1OTg3OF8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

Unstructured \+ Dynamic 动态非结构化，例如：媒体制作、eCAD、mCAD、办公文档

Unstructured \+ Static 静态非结构化，例如：媒体归档、广播内容、医学影像

Structured \+ Dynamic 动态结构化，例如：交易系统、ERP、CRM

Structured \+ Static 静态结构化，例如：BI（商业智能）、Data Warehousing（数据仓库）

横向：Dynamic → Static；纵向：Unstructured → Structured

分类的主要目的是辅助选择合适的存储方案（Storage Solution）：

- 关系型数据库（Relational Databases）：通常用于结构化数据，特别是需要事务管理的业务系统。

- 文件系统或 NoSQL 数据库：可用于静态非结构化数据的存储。

## Part 2 关系型数据库与 ACID 事务

### 2\.1 事务 Transaction

RDBMS（Relational Database Management System） 即关系数据库管理系统。

事务是数据库执行操作的逻辑单元，可以包含多个底层操作（Low\-level Tasks），用于将相关的数据修改作为一个整体进行管理。例如，账户 $A$ 向账户 $B$ 转账金额 $x$： $\begin{aligned} A'&=A-x\\ B'&=B+x \end{aligned} $，转账完成后应满足： $A'+B'=A+B $。

虽然转账涉及多个数据库操作，但这些操作必须共同满足业务约束。因此，RDBMS 通过 ACID 属性保障事务的正确执行。

### 2\.2 ACID 四大属性

|**属性**|**定义**|**核心要求**|
|---|---|---|
|Atomicity（原子性）|事务中的所有操作被视为不可分割的整体|全部成功或全部失败|
|Consistency（一致性）|事务开始和结束时，数据库均满足完整性约束|保持数据合法性|
|Isolation（隔离性）|并发事务不能访问其他事务未完成的中间状态|避免不当的并发干扰|
|Durability（持久性）|事务一旦提交，其修改必须持久保存|系统故障后仍保留已提交数据|

Atomicity： 若转账过程中扣款成功但入账失败，整个事务必须回滚，不能保留部分修改。

Consistency： 转账前后应保持资金总额不变，且数据库约束仍然成立。

Isolation： 一个事务不应读取其他事务尚未提交的中间修改。具体并发行为由数据库隔离级别决定。

Durability： 已提交的事务在系统故障后仍应能够恢复。

保障机制包括：Transaction Logs（事务日志）、Backups（备份）

需要区分：ACID 的 Consistency 指事务对数据完整性约束的维护，不等同于后续 CAP 定理中的分布式副本一致性。

## Part 3 数据库横向扩展 Scaling Out Databases

随着数据规模与访问需求增长，单台数据库服务器可能受到存储容量、计算资源和吞吐能力的限制。

数据库扩展主要有两种方式：

- Vertical Scaling（纵向扩展）：提高单台服务器的 CPU、内存或存储性能。

- Horizontal Scaling（横向扩展）：增加服务器数量，通过多台机器并行处理工作负载。

重点讨论横向扩展，主要技术包括 Sharding（数据分片） 和 Replication（数据复制）。

### 3\.1 Amdahl 定律：并行加速的理论上限

Amdahl's Law 用于描述程序中不可并行部分对整体加速效果的限制。

设：

- $T_1$：程序串行执行时间。

- $T_p$：使用 $p$ 个处理器并行执行的时间。

- $s$：程序中不可并行部分所占比例。

- $1-s$：程序中可并行部分所占比例。

- $p$：处理器或机器数量。

在理想情况下，不可并行部分耗时保持不变，可并行部分由 $p$ 个处理器均匀分担：

$T_p=sT_1+\frac{(1-s)T_1}{p} $

因此，加速比（Speedup）为：

${ S(p)=\frac{T_1}{T_p} =\frac{1}{s+\frac{1-s}{p}} } $

课件算例：80% 的程序可以并行，使用 4 个处理器。

已知：$s=0.2, 1-s=0.8, p=4$

代入公式：$S(4)=\frac{1}{0.2+\frac{0.8}{4}} =\frac{1}{0.4} ={2.5} $

因此，4 个处理器只能实现理想情况下的 2\.5 倍加速，而非 4 倍。

若串行执行总耗时为 100 个时间单位，则：

$T_1=20+80=100 $

$T_4=20+\frac{80}{4}=40 $

$S(4)=\frac{100}{40}=2.5 $

进一步，当处理器数量趋于无穷大时：

${ \lim_{p\to\infty}S(p)=\frac{1}{s} } $

本例的理论最大加速比为：

$S_{\max}=\frac{1}{0.2}=5$

结论：不可并行部分决定整体加速比的上限，增加处理器数量无法消除串行执行的限制。

### 3\.2 理想并行与实际并行

Amdahl 定律建立在理想条件下，假设任务能够均匀分配，且忽略通信与调度开销。

实际并行系统还受到以下因素影响：

|**限制因素**|**含义**|**影响**|
|---|---|---|
|Communication Overhead（通信开销）|处理器或服务器之间的数据传输、同步与协调|增加执行时间|
|Workload Imbalance（负载不均衡）|不同处理器承担的任务量不同|整体完成时间受最慢任务限制|

对于必须等待所有并行任务完成的程序，可将实际执行时间近似表示为：

$T_p^{\text{actual}} \approx sT_1+\frac{(1-s)T_1}{p} +T_{\text{communication}} +T_{\text{imbalance}} $

其中后两项是对课件理想模型的补充，分别表示额外通信成本与负载不均衡造成的延迟。

因此，实际加速比通常低于理想加速比。

提高并行效率需要遵循三项原则：

1. Maximize Parallelizable Fraction：提高可并行部分比例，减小 $s$。

2. Balance Workload：均衡各处理器的工作负载，减少等待。

3. Minimize Communication Time：降低节点之间的数据传输与同步开销。

### 3\.3 数据分片 Data Sharding

数据分片是将大型数据集划分为多个部分（Shards / Chunks），并分布到不同机器上，以支持并发和并行访问。

课件示例将一个大型文件划分为六个数据块：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjdmZmE1YTM2ZWEzYTdiMDUyY2EyODE5YmY1YjEwZmVfYTc1ZDY5NTk1MzlkYWM2ODBkZGQ1NWMzYmI5N2E3NzNfSUQ6NzY5ODYxODY5ODE3Njc0NDk5N18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

由于 Chunk 2、Chunk 4 和 Chunk 6 位于不同机器，因此可以同时访问。

分片的主要作用包括：

- 将数据存储需求分散到多台机器。

- 提高并行读取和处理能力。

- 在适当的分片策略下，提高整体吞吐量。

分片的主要挑战包括跨分片查询、数据分布不均与跨节点事务协调。

### 3\.4 数据复制 Data Replication

数据复制是将相同数据保存到多个服务器上，形成多个副本（Replicas）。

三项作用：

- Avoid Performance Bottlenecks：将访问请求分散到不同服务器，缓解性能瓶颈。

- Avoid Single Points of Failure：单个服务器故障时，可由其他副本继续提供服务。

- Enhance Scalability and Availability：提高系统的可扩展性与可用性。

分片与复制的核心区别如下：

|**对比**|**Sharding**|**Replication**|
|---|---|---|
|基本操作|拆分数据|复制数据|
|节点数据|不同节点保存不同部分|多个节点保存相同数据|
|主要目的|扩展容量、支持并行处理|提高容错能力、可用性与读吞吐量|
|主要挑战|跨分片访问与负载均衡|副本同步与一致性|

两种技术可以结合使用：将数据划分为多个分片，并为每个分片建立多个副本。

## Part 4 分布式一致性与两阶段提交 2PC

### 4\.1 数据复制带来的一致性问题

当同一份数据分布在多个服务器上时，数据修改必须在相关副本之间协调。

例如，电商系统将银行数据库复制到两台服务器。如果某次账户余额更新只在一台服务器上完成，而另一台尚未同步，则不同服务器可能返回不同余额。

因此，数据复制虽然提高了可用性与扩展性，但也引入了 Consistency Challenge（一致性挑战）。

Two\-Phase Commit Protocol（两阶段提交协议，2PC） 说明如何协调分布式事务的提交或中止，以维护原子性和一致性。

### 4\.2 两阶段提交协议 Two\-Phase Commit Protocol

2PC 包含两类角色：

- Coordinator（协调者）：组织投票并决定全局事务的提交或中止。

- Participants（参与者）：执行本地事务操作，并根据协调者的最终决定提交或回滚。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGU5NGVkNGJlOWNkOGYwZDEyMjhkN2VhYTkyMDg2MTVfNWM0ZjViZmQ5YzA4YWQwY2Q1MWUwZTU4OGM5MmIxMjJfSUQ6NzY5ODYxODY5NjQwNjgxNDI0M18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDg5ZWQwNjhiMDMzZTZlZjdjMjE4MGUzMzY2NDk5OTlfYjRmZGVkNjUxOGE2OGI0NWU2ODk1MDBhMTc5ODE3YTlfSUQ6NzY5ODYxODY5ODE3NjY3OTQ2MV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

协议分为两个阶段。

Phase I: Voting / Prepare（投票或准备阶段）

Coordinator: 发送 VOTE\_REQUEST

Participant 1: 准备事务并投票

Participant 2: 准备事务并投票

Participant 3: 准备事务并投票

返回 VOTE\_COMMIT 或 VOTE\_ABORT

执行过程：

1. 协调者向所有参与者发送 `VOTE_REQUEST`。

2. 各参与者执行可撤销的本地事务操作，并检查是否能够提交。

3. 能够提交的参与者返回 `VOTE_COMMIT`；否则返回中止投票。

4. 已准备提交的参与者需要保留必要的事务状态与锁，等待第二阶段的最终决定。

全局决策规则为： $\text{Decision}= \begin{cases} \text{Commit}, & \text{所有参与者均投赞成票}\\ \text{Abort}, & \text{否则} \end{cases} $

Phase II：Commit / Abort（提交或中止阶段）

若所有参与者均同意提交：

1. 协调者发送 `GLOBAL_COMMIT`。

2. 参与者执行 `LOCAL_COMMIT`，正式提交本地修改。

3. 参与者释放事务锁，并完成相应的提交确认。

若存在参与者无法提交：

1. 协调者决定全局中止（Global Abort）。

2. 参与者回滚尚未提交的本地事务。

3. 释放相关锁与资源。

需要区分两个阶段的操作：

|**第一阶段**|**第二阶段**|
|---|---|
|准备并检查事务能否提交|执行全局提交或中止决定|
|修改仍可撤销|提交后成为正式持久化结果|
|参与者可能持有锁|事务完成后释放锁|
|不产生最终提交决定|完成最终事务决策|

### 4\.3 2PC 的局限性

2PC 通过协调多个参与者的事务结果，实现跨节点的原子提交，但需要额外的通信与等待。

其主要代价包括：

- 锁持有时间增加：参与者在准备阶段完成后，通常必须等待全局决定才能释放相关锁。

- 通信开销增加：协调者需要与多个参与者交换消息。

- 阻塞风险（Blocking）：协调者在关键阶段发生故障时，已准备的参与者可能无法独立决定提交还是回滚。

- 可扩展性受限：参与者数量增加时，协调成本和资源占用可能上升。

因此，严格一致性（Strict Consistency）的实现可能限制系统的可扩展性（Scalability）。

2PC 主要保障分布式事务的原子提交，并不意味着仅凭 2PC 就能解决所有副本一致性或网络分区问题。

### 4\.4 小结

本部分内容围绕数据库从单机存储向分布式存储扩展时面临的问题展开，其核心逻辑为：

1. Data Classification 根据数据结构和变化频率选择存储系统

2. RDBMS \& ACID 通过事务保证数据库操作的正确性

3. Horizontal Scaling 通过并行处理、分片和复制扩展系统能力

4. Consistency Challenge 分布式数据更新引入跨节点协调问题

5. Two\-Phase Commit 通过协调提交保障分布式事务原子性，但增加通信与阻塞成本

**概念对照**

|**概念**|**主要解决的问题**|
|---|---|
|Data Classification|如何根据数据特征选择存储方案|
|ACID|如何保障事务的正确性与可靠性|
|Amdahl's Law|并行处理的理论加速上限|
|Sharding|如何分散数据和处理负载|
|Replication|如何提高可用性和容错能力|
|2PC|如何协调多个节点共同提交或中止事务|

结论： 横向扩展通过增加机器提高系统的存储与处理能力，但分片和复制使数据管理从单节点操作转变为跨节点协调。为了维护分布式事务的原子性与一致性，系统必须承担额外的通信、同步与等待成本。这也为后续 CAP Theorem、BASE Properties 和 NoSQL 数据库的讨论建立了基础。

## Part 5 CAP 定理与 BASE 属性 CAP Theorem \& BASE Properties

随着数据库从单机架构扩展到分布式架构，数据复制与跨节点通信使一致性问题更加复杂。CAP 定理揭示了网络分区发生时，一致性与可用性之间的根本权衡；BASE 则提供了一种适用于部分高可用分布式系统的宽松一致性设计思路。

### 5\.1 CAP 定理 CAP Theorem

CAP 定理指出：当分布式系统发生网络分区时，无法同时保证强一致性（Consistency）和可用性（Availability）。

CAP 包含三个属性：

|**属性**|**定义**|**核心要求**|
|---|---|---|
|C — Consistency（一致性）|每次读取都返回最近一次成功写入的数据，或者返回错误|不返回过期数据|
|A — Availability（可用性）|每个发送到正常运行节点的请求最终都获得非错误响应|请求能够得到服务|
|P — Partition Tolerance（分区容错性）|节点之间发生网络通信故障时，系统仍能继续运行|容忍网络分区|

CAP 中的 Consistency 与 ACID 中的 Consistency 不同：

- ACID Consistency：事务执行前后满足数据库完整性约束。

- CAP Consistency：强调分布式读写操作的单副本一致性，通常用线性一致性（Linearizability）描述。

CAP 的关键并非一般情况下只能拥有三个属性中的两个，而是网络分区发生时，必须在 C 和 A 之间作出选择。

### 5\.2 网络分区下的 CP 与 AP

假设两个节点 $N_1$ 和 $N_2$ 保存同一数据的副本，网络故障导致两者无法通信。

此时，如果客户端向其中一个节点发起更新操作，系统面临两种策略：

|**策略**|**CP（Consistency \+ Partition Tolerance）**|**AP（Availability \+ Partition Tolerance）**|
|---|---|---|
|核心目标|优先保证一致性|优先保证可用性|
|分区期间|拒绝或延迟无法安全执行的操作|尽可能继续响应请求|
|主要代价|部分请求不可用|可能读取旧数据或出现副本差异|
|适用倾向|对数据正确性要求较高的业务|对持续服务要求较高的业务|

CP： 当无法确认其他副本的状态时，系统可能拒绝操作，以避免违反一致性要求。

AP： 系统允许分区两侧继续处理请求，但可能产生暂时不一致，需要在网络恢复后进行同步或冲突解决。

需要注意，AP 并不意味着所有请求必然成功，也不意味着系统完全放弃一致性；CP 同样不意味着所有操作都不可用。

### 5\.3 一致性权衡

Google、Amazon 等企业在构建大规模数据库时，需要特别重视 24/7 Availability（全天候可用性），因为短时间停机也可能造成显著的业务损失。当数据库横向扩展至数千台服务器时，节点故障和网络故障的可能性增加。因此，系统必须考虑如何在网络分区下维持服务。

部分大规模系统选择优先保障可用性和分区容错性，并放宽严格一致性要求。

这种设计体现了以下权衡： $\text{Consistency Strictness} \quad\longleftrightarrow\quad \text{Availability / Scalability} $

一致性要求越严格，跨节点同步与协调成本通常越高；适当放宽一致性要求，则可能减少协调开销并改善可用性与扩展能力。Good\-enough Consistency（足够的一致性）：一致性级别应根据应用需求确定，而非所有系统都采用最严格的一致性模型。

例如，银行账户余额通常需要较强的一致性保障，而社交平台的点赞数量可以在一定时间内允许副本存在差异。

这并非严格一致性必然低效，而是分布式环境中的一致性保障通常需要额外的通信和协调。

### 5\.4 从 ACID 到 BASE

传统关系型数据库通常强调 ACID 事务，而部分面向大规模分布式应用的 NoSQL 系统采用 BASE 思路，以更宽松的一致性要求换取可用性与扩展能力。

BASE 可视为在一致性要求上更加宽松的设计思想，但并不是 ACID 的直接替代品。

|**BASE 属性**|**含义**|**说明**|
|---|---|---|
|Basically Available（基本可用）|系统在大多数情况下能够提供服务|允许部分功能降级或响应延迟|
|Soft State（软状态）|数据状态可能在没有新的外部输入时发生变化|副本同步等内部过程会改变系统状态|
|Eventually Consistent（最终一致性）|在停止更新且同步能够持续完成的条件下，各副本最终收敛到一致状态|允许暂时不一致|

最终一致性可以用以下形式表示：

设 $R_i(t)$ 表示第 $i$ 个副本在时刻 $t$ 的数据状态。如果系统停止接收新写入，且更新能够可靠传播，则：

$\exists T,\ \forall t\geq T: R_1(t)=R_2(t)=\cdots=R_n(t)$，该表达式表示在满足相应条件时，所有副本最终达到相同状态。

### 5\.5 ACID 与 BASE 对比

|**维度**|**ACID**|**BASE**|
|---|---|---|
|设计重点|事务正确性与可靠性|可用性与宽松一致性|
|一致性要求|保证事务维护完整性约束|允许副本暂时不一致|
|状态变化|强调事务边界及其约束|允许内部异步同步引起状态变化|
|典型应用|金融交易、订单事务|社交互动、内容分发、部分分布式存储系统|

ACID 与 BASE 并非完全互斥。现代分布式数据库可以同时支持 ACID 事务、复制与不同级别的一致性保证。

本部分逻辑：网络分区使 C 与 A 的冲突不可避免，而 BASE 为部分优先可用性的系统提供了最终一致性的设计方向。

## Part 6 NoSQL 数据库概述 Introduction to NoSQL

### 6\.1 NoSQL 的产生背景与定义

传统关系型数据库（RDBMS）长期是企业业务系统的主流存储方案。然而，Web 应用快速发展，特别是 Facebook、X 等社交平台带来的数据量和访问量激增，对数据库提出了新的要求：

- 海量数据存储与高并发访问。

- 跨多台服务器的水平扩展。

- 对半结构化及非结构化数据的灵活支持。

- 在分布式环境下维持较高的可用性。

传统 RDBMS 的事务协调、固定模式以及部分跨节点操作可能增加大规模分布式部署的复杂度，由此推动了 NoSQL 数据库的发展。

NoSQL（Not Only SQL） 表示“不仅仅是 SQL”，泛指一类不局限于传统关系模型的数据库系统。

其名称发展经历两个阶段：

- 1998 年：Carlo Strozzi 使用 NoSQL 命名其基于文件的数据库。

- 2009 年：Eric Evans 在讨论开源分布式数据库的活动中重新推广这一术语。

NoSQL 的核心思想不是否定关系型数据库，而是针对关系型数据库不适合解决的特定问题，采用不同的数据模型与系统架构。

### 6\.2 NoSQL 的主要特征

NoSQL 数据库通常具有以下特征：

|**特征**|**说明**|
|---|---|
|Non\-relational|采用非关系型数据模型|
|Flexible Schema|不要求所有记录遵循统一、严格的固定模式|
|Horizontal Scalability|通过增加节点扩展存储和处理能力|
|Partitioning|支持将数据分布到多个节点|
|Replication|通过数据副本提高容错能力与可用性|
|High Write Performance|部分系统针对大规模写入进行优化|
|Fast Access|针对特定访问模式提供快速读写|
|Open\-source Ecosystem|存在大量开源实现，可降低软件许可成本|

通过分片与复制，部分 NoSQL 系统能够在节点故障后重新分配任务或使用其他副本，避免单点故障（Single Point of Failure）。

但这些优势并非所有 NoSQL 产品都具备，具体性能取决于数据库实现、数据模型及工作负载。

### 6\.3 NoSQL 的局限性

相较于传统关系型数据库，部分 NoSQL 系统在复杂关系查询、统一查询接口和事务保障方面存在限制。

1. 关系型操作支持有限

部分 NoSQL 数据库不直接支持跨整个分布式集群的复杂关系操作，例如：

- `JOIN`：多表连接。

- `GROUP BY`：分组聚合。

- `ORDER BY`：排序。

- 跨分区参照完整性约束（Referential Integrity Constraints）。

这些操作可能需要在应用层实现，或借助额外的查询与计算组件。

2. 缺少统一的声明式查询语言

关系型数据库普遍使用 SQL，而不同 NoSQL 数据库的查询接口差异较大，因此可能增加开发与迁移成本。

3. 事务保障可能较弱

部分 NoSQL 系统放宽 ACID 约束，以减少分布式协调成本，但这也意味着开发者可能需要自行处理部分一致性与并发问题。

现代 NoSQL 数据库已有较大改进，例如 MongoDB 支持多文档事务，Neo4j 支持 ACID，因此不能将“不支持事务”视为 NoSQL 的普遍特征。

### 6\.4 NoSQL 的主要分类

按照数据模型，NoSQL 数据库主要分为四类：

|**类别**|**数据组织方式**|**课件代表产品**|
|---|---|---|
|Key\-Value（键值型）|通过唯一键访问对应值|DynamoDB、Voldemort、Scalaris|
|Column\-based（列族型）|通过列族组织相关数据|Bigtable、Cassandra、HBase|
|Document\-based（文档型）|以 JSON 等文档结构存储对象|MongoDB、CouchDB|
|Graph\-based（图数据库）|以节点和边表示实体及关系|Neo4j、InfoGrid|

主要区别：数据如何组织，以及数据库针对哪类查询操作进行优化。

早期应用案例：Google Bigtable、Amazon Dynamo、LinkedIn Voldemort，以及使用 Cassandra、HBase 等技术的互联网服务。这些案例说明 NoSQL 技术在大规模互联网应用中的发展背景，并不代表相关企业当前的完整技术架构。

## Part 7 四类 NoSQL 数据库 Various NoSQL Databases

四类 NoSQL 数据库的根本差异在于数据模型及其访问方式：键值型强调按键快速访问，列族型强调稀疏宽表与相关列的组织，文档型支持复杂嵌套对象，图数据库则面向实体之间的关联关系。

### 7\.1 键值型数据库 Key\-Value Stores

1. 数据模型与分布式架构

键值型数据库将数据组织为键值对集合： $D=\{(k_1,v_1),(k_2,v_2),\ldots,(k_n,v_n)\} $

其中 $k_i$ 是用于定位数据的键（Key），$v_i$ 是对应的值（Value）。

该模型结构简单，适合海量数据存储、高并发访问及水平扩展。

以 Amazon Dynamo 系列设计为背景，介绍了 Dynamo Ring Partitioning and Replication（环形分区与复制）：

- 通过键的哈希值确定数据分布位置。

- 将不同键的数据分配到不同节点。

- 为数据建立多个副本，提高容错能力。

其基本思想是通过键分布数据，而不是依赖单台服务器保存完整数据集。

2. DynamoDB 的复合主键

DynamoDB 示例采用复合主键（Composite Primary Key），由两部分构成：

- Partition Key（分区键）：决定数据所属的逻辑分区。

- Sort Key（排序键）：在同一分区键下区分并排序不同记录。

两者组合形成唯一主键： ${PK=(\text{Partition Key},\text{Sort Key})} $

例如：

|**Partition Key**|**Sort Key**|**Attributes**|
|---|---|---|
|ProductID = 1|Book ID|Odyssey、Homer、1871|
|ProductID = 2|Album ID|6 Partitas、Bach|
|ProductID = 2|Album ID : Track ID|Partita No\. 1|
|ProductID = 3|Movie ID|The Kid、Chaplin|

不同记录可以具有相同的分区键，但完整主键组合必须唯一。

DynamoDB 还允许不同 Item（数据项）具有不同的非主键属性，因此不要求所有记录遵循完全相同的模式。DynamoDB 也支持仅使用 Partition Key 的简单主键，并非所有表都必须采用复合主键。

3. 基本操作接口 APIs 

|**API**|**功能**|
|---|---|
|get\(key\)|根据键获取对应值|
|put\(key, value\)|创建或更新键值对|
|delete\(key\)|删除键及其对应值|
|execute\(key, operation, parameters\)|对指定键对应的数据结构执行操作|

其中 `execute` 可以用于操作 List、Set、Map 等数据结构，具体支持范围取决于数据库实现。

4. 优缺点

|**优点**|**局限性**|
|---|---|
|数据模型简单|难以直接表达复杂对象关系|
|按键访问速度快|复杂条件查询能力可能有限|
|易于按键进行水平分区|跨键关联操作可能需要应用层实现|
|可通过复制实现容错|分布式副本可能带来一致性问题|
|适合高并发访问|不适合所有复杂分析型查询|

将 Eventual Consistency（最终一致性）列为键值系统的常见特征，但不同产品支持的一致性级别并不相同。

5. 代表产品

|**产品**|**开发者或来源**|**数据模型与查询特点**|
|---|---|---|
|SimpleDB|Amazon|键关联属性集合，支持受限 SQL 风格查询及 GetAttributes、PutAttributes 等操作|
|Redis|Salvatore Sanfilippo 最初开发|支持 String、List、Set、Sorted Set、Hash 等数据结构，并提供相应操作原语|
|Dynamo|Amazon|分布式键值架构，强调简单的 Get/Put 操作及上下文相关的版本处理|
|Voldemort|LinkedIn|分布式键值存储，接口设计与 Dynamo 类似|

其中需要区分 Dynamo（Amazon 的分布式存储设计） 与 DynamoDB（Amazon 的托管数据库服务），二者并非同一产品。

### 7\.2 列族型数据库 Column\-Family Stores

1. 行式与列式存储

传统关系型数据库通常采用行式存储（Row\-oriented Storage），将同一记录的不同属性组织在一起。

列式存储（Column\-oriented Storage）则将相同列的数据集中组织，以便读取指定列的数据。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWQxYWUwZTU0OTQ2OWQyNTFmZGZjYTRmZTBkYTVlNGJfZDg0NGU3YTFkMWZkZjg1NWZjM2JkZDAwZGMzZjAyNGNfSUQ6NzY5ODYxODY5NjQwNjc5Nzg1OV8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWZkMWQyYjc3NzcxNWViYmJhYmEyMGY3ODFjNDVhMTJfZDExYmFiMzIzMGVjODVlN2I5ZDYyZWI3ZWNmYzY5YjlfSUQ6NzY5ODYxODY5Nzc3NDA0MjY2Ml8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

列式组织的主要优势是 Data Locality（数据局部性）：当查询仅涉及部分列时，数据库可以减少不必要的数据读取；相关数据集中存放，也有利于批量访问。

Bigtable、HBase、Cassandra 等属于宽列或列族数据库（Wide\-column Stores），其物理组织并不完全等同于分析型数据库中的纯列式存储。

2. 列族数据模型

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDM1ZTFiNWE5OTIwNjVlYmFiYmI5OWExNDM2MjExYjhfMDY2YTA5ZDI1Yzc5MzQ0NzhkMDM2OGY1NGMxY2MyOGVfSUQ6NzY5ODYxODY5NjIxMzg3NjI2Ml8xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

列族型数据库通过 Column Family（列族）组织相关列。

课件将其抽象为： $\text{Column Family}=(key,value)$

其中： $value=\{\text{Related Columns}\} $

其主要特点包括：

- 一个列族包含若干逻辑相关的列。

- 不同记录可以拥有不同数量的列，适合稀疏数据（Sparse Data）。

- 数据通常按照行键、列名或其他存储顺序组织。

- 通过数据局部性优化特定的范围读取与列访问。

例如，同一个用户表中，有的用户记录包含电话号码，有的用户记录包含地址，而不必为每条记录保存完全相同的属性集合。

3. 代表产品

|**产品**|**开发者或来源**|**数据模型**|**查询特点**|
|---|---|---|---|
|Bigtable|Google|基于行键、列与时间戳组织数据|支持行、列及时间戳范围选择|
|HBase|Apache|基于 Bigtable 思想的列族模型|Java API、Shell 操作|
|Hypertable|Hypertable 项目|类似 Bigtable|HQL（Hypertable Query Language）|
|Cassandra|Apache，最初由 Facebook 开发|分区键、聚簇列及列组织|按键查询、范围查询及指定列访问|
|PNUTS|Yahoo|支持哈希或有序表及灵活模式|主键查询、范围查询、排序及 Top\-k 等操作|

PNUTS 属于较早期的研究系统，表中的产品特征主要用于理解不同数据库模型的设计差异。

### 7\.3 文档型数据库 Document Stores

1. 数据模型

文档型数据库以文档（Document）作为基本存储单位，能够表示比简单键值对更复杂的数据对象。

其逻辑结构为： $D=\{d_1,d_2,\ldots,d_n\}$

每个文档可以包含多个字段、数组以及嵌套对象。

常见文档格式包括：

- JSON（JavaScript Object Notation）

- XML（Extensible Markup Language）

- 其他半结构化格式（Semi\-structured Formats）

文档模型能够表达对象、记录、结构体、列表、数组、映射和布尔值等结构。日期等类型通常由具体数据库的扩展格式支持，例如 MongoDB 的 BSON。

2. 嵌套文档示例

以下示例展示了如何在单个文档中表示个人信息、子女及联系电话：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDk3MWQ3ZDA2ZjVlYWVhZDYwNjhjYTZjYmVlZjlhZmJfNjMwOGYwODg5NGU3YWUzMzFlNWNhYzMxMzFkZWM5YmZfSUQ6NzY5ODYxODY5NjQwNjg5NjE2M18xNzkyNzQwMjUyOjE3OTI4MjY2NTJfVjM)

文档数据库可以直接保存这类嵌套结构，而不必将其全部拆分为多个关系表。

其优势在于：

- 能够自然表示复杂对象。

- 支持嵌套对象与数组。

- 允许不同文档具有不同字段。

- 可以通过文档 ID 或字段进行查询。

3. 文档型与列族型的区别

|**对比**|**Document\-based**|**Column\-family**|
|---|---|---|
|基本单位|Document|Row / Column Family|
|数据结构|支持多层嵌套|以行键和列族组织|
|模式|灵活、可变|通常需要定义列族或表结构|
|查询特点|文档字段、嵌套属性查询|行键、分区键及列范围查询|
|适用场景|用户档案、内容管理、复杂对象|海量稀疏数据、时序或大规模分布式写入|

课件将列族模型描述为相对固定的一至两层字典结构，而文档模型允许任意复杂的嵌套文档。这是对典型数据模型的概括，不代表所有列族数据库都无法保存嵌套值。

4. 代表产品

|**产品**|**开发者或来源**|**数据模型与查询特点**|
|---|---|---|
|MongoDB|10gen（后更名 MongoDB Inc\.）|文档存储于 Collection，每个文档具有唯一 \_id，支持字段查询、逻辑条件、更新和删除|
|Couchbase|Couchbase|以 JSON 文档存储数据，支持键访问及文档查询；课件介绍了 Views、JavaScript 和 MapReduce 等机制|

文档数据库特别适合对象结构复杂、字段变化较频繁的应用，但对于高度复杂的跨实体关系，仍可能需要额外的关联查询或数据建模设计。

### 7\.4 图数据库 Graph Databases

1. 数据模型

图数据库重点表示数据之间的连接关系（Interconnectivity），其设计受到图论（Graph Theory）的启发。

图可以表示为： ${G=(V,E)} $

其中：

- $V$：节点集合（Vertices / Nodes），表示实体。

- $E$：边集合（Edges），表示实体之间的关系。

在属性图模型（Property Graph）中，节点与边都可以具有属性（Properties）。

例如，社交网络中的用户可以表示为节点，关注关系可以表示为有向边。节点表示实体，边表示实体间的连接关系。

图数据库主要具有以下特征：

- 节点可以包含 ID 及其他属性。

- 边可以包含标签（Labels）、角色（Roles）及属性。

- 节点与边均可通过键值对表示属性。

- 不同产品提供不同的查询语言与访问接口。

- 适合邻居查询、路径搜索和多跳关系遍历。

图数据库尤其适用于关系结构复杂的数据，例如社交网络、知识图谱、推荐系统及欺诈检测。

2. 图查询

图数据库擅长执行 Graph\-like Queries，例如：

- 邻居查询（Neighbor Query）

- 路径查询（Path Query）

- 最短路径（Shortest Path）

- 多跳关系遍历（Multi\-hop Traversal）

例如，寻找两个节点之间的最短路径： $d(u,v)=\min_{p\in P(u,v)}|p| $。其中 $P(u,v)$ 表示从节点 $u$ 到节点 $v$ 的所有路径集合，$|p|$ 表示路径中的边数。该公式适用于无权图的最短路径定义。

3. 代表产品

|**产品**|**技术与来源**|**特征**|
|---|---|---|
|JanusGraph|Apache 生态相关集成；主要使用 Java|分布式图数据库，支持大规模图分析与查询，并可集成 Spark、Hadoop 等平台|
|Neo4j|属性图数据库|支持 ACID 事务、图查询与高可用部署，提供可视化图探索工具|
|FlockDB|Twitter 开发的图存储系统|面向大规模社交关系的存储与访问|
|Pregel|Google 图计算模型|面向大规模图计算，不属于典型的事务型图数据库|
|InfoGrid|图数据相关平台|以图结构组织和访问相互关联的数据|

Neo4j 产品表还列出了 Java、Python、Go、Ruby、PHP、R、C/C\+\+ 等语言生态。需要区分数据库本身的实现语言与其客户端支持语言。

### 7\.5 四类 NoSQL 数据库对比

|**维度**|**Key\-Value**|**Column\-family**|**Document**|**Graph**|
|---|---|---|---|---|
|核心模型|Key → Value|行键 \+ 列族|Document|Nodes \+ Edges|
|主要访问方式|按键访问|按键及列范围访问|按文档字段查询|沿关系遍历|
|结构复杂度|较低|中等|支持复杂嵌套|支持复杂关系|
|主要优势|简单、高吞吐、易分区|稀疏宽表、大规模数据访问|灵活模式、对象表达|关系查询与路径计算|
|主要局限|复杂查询较弱|查询受数据模型影响较大|跨文档关联可能复杂|大规模全局分析可能需要专用计算框架|
|典型场景|缓存、会话、键值查询|日志、时序数据、海量记录|用户档案、内容管理|社交网络、知识图谱|

数**据库选**型的核心依据

不同 NoSQL 模型并非简单的性能高低关系，而是分别针对不同的数据组织和访问模式进行优化。

- 主要通过唯一键读取数据：优先考虑 Key\-Value。

- 需要管理海量稀疏记录、按分区键或列范围访问：考虑 Column\-family。

- 数据包含复杂嵌套对象，且字段结构经常变化：考虑 Document。

- 主要查询实体之间的多跳关系或路径：考虑 Graph。

选型时还需结合一致性要求、事务能力、数据规模、读写比例及运维成本进行综合判断。

### 7\.6 本章知识总结

本章围绕大规模数据存储的架构演进展开，其核心逻辑为：

Data Types 数据结构与访问需求决定存储模型

Scaling \& Replication 横向扩展提高系统容量，但引入分布式协调问题

CAP \& BASE 网络分区下权衡一致性与可用性

NoSQL 采用不同数据模型满足特定规模与查询需求

本章需要重点掌握三个层面的区别：

1. ACID 与 BASE：前者是事务正确性的属性集合，后者是强调基本可用和最终一致性的分布式设计思路。

2. CAP 中的 C 与 ACID 中的 C：前者关注分布式操作的一致性，后者关注事务对数据库约束的维护。

3. 四类 NoSQL：分类依据是数据模型，而不是是否支持 SQL、是否支持 ACID 或是否使用分布式架构。

结论：NoSQL 的价值并非取代关系型数据库，而是通过不同的数据模型、分区机制和一致性策略，为特定的大规模数据存储与访问需求提供更合适的解决方案。




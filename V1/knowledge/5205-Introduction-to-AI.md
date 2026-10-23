# 5205 Introduction of AI

# Lecture 1

## Part 1 

### 1\.1 课程要求

理解人工智能的基本原理与算法 \(BFS、神经网络、大语言模型等\)。  Understand fundamental principles and algorithms of AI \(BFS, neural networks, LLMs, …\)\.

分析与评估不同 AI 方法的优势与局限。  Analyze and evaluate the strengths and weaknesses of various AI methodologies\.

将 AI 算法应用于工程、数据分析与优化场景。  Apply AI algorithms to engineering, data\-analytic and optimisation scenarios\.

设计与实现 AI 技术以解决实际问题 \(对应期末项目\)。  Design and implement AI techniques to solve practical problems \(final project\)\.

### 1\.2 AI 概述：Industry 4\.0 的核心引擎 

|阶段 Stage|时代 Era|核心驱动力 Core Driver|目标 Goal|
|---|---|---|---|
|Industry 1\.0|18 世纪末|机械化 Mechanization|机器取代人力|
|Industry 2\.0|19 世纪末|电气化 Electrification|大规模生产|
|Industry 3\.0|20 世纪后半|信息化 Informatization|计算机与互联网|
|Industry 4\.0|当下|智能化 Intellectualization|让日常生活更智能 \(by AI\)|

Merriam\-Webster 将 artificial 定义为"人为构造,常以自然事物为模型"。这暗示了 AI 的两条核心属性：由人创造、通过行为而非生物大脑来识别。  Merriam\-Webster defines "artificial" as "humanly contrived, often on a natural model"\. This implies two core attributes: \(1\) human\-made, \(2\) identified by behaviour, not biological substrate\.

### 1\.3 AI 的三种典型定义 Three Classic Definitions of AI

|提出者 / 时期 Author / Era|定义 Definition|
|---|---|
|McCarthy \& Minsky, 1950s|由程序或机器完成的任何任务,如果由人来完成需要运用智能。<br>Any task performed by a program or machine that, if a human carried out the same activity, would require the human to apply intelligence\.|
|John McCarthy \(现代定义 Modern definition\)|AI 又称机器智能 \(machine intelligence\),是与人类和动物自然智能相对的、由机器展示的智能。<br>Artificial intelligence — sometimes called machine intelligence — is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and other animals\.|
|Two emphasised points|\(1\) 由人创造 human\-made;\(2\) 通过行为而非生物大脑来识别 identified by behaviour rather than biological brain\.|

### 1\.4 AI 发展史与代表性里程碑 

AI 的发展可划分为两大时代： "深度学习前时代"与"大模型时代"。  

|Year|Milestone|Notes|
|---|---|---|
|1958|Perceptron 感知机|最早的神经网络模型之一 |
|1974|BP 神经网络 |反向传播算法使多层网络可训练|
|1998|CNN 卷积神经网络|LeNet 等开启深度卷积时代|
|2012|Google Brain / AlexNet|深度学习在 ImageNet 大放异彩；大数据 \+ HPC \+ 大存储 \+ 先进算法|
|2018|BERT \& GPT|进入预训练时代|
|2022|ChatGPT \(GPT\-3\.5\)|大模型时代到来 LLM era|
|2023|GPT\-4|大模型全面突破|
|2024|Agent 时代|多模态智能体与自主工作流|
|2025 \(Aug\)|GPT\-5|OpenAI 在 2025 年 8 月发布,作为 NLP 的里程碑|

Three supporting pillars 三大支柱：大数据 Big Data \+ HPC 高性能计算 \+ 先进算法 Adv\. Algorithms。  AI的三个演化阶段：

|阶段 |能力|典型例子 |
|---|---|---|
|ANI 弱人工智能 <br>Artificial Narrow Intelligence|专注于特定任务 Focus on specific tasks<br>|AlphaGo、语音识别、图像识别、机器翻译、AI 导师、自动驾驶等|
|AGI 通用人工智能 <br>Artificial General Intelligence|具备人类水平的思考、计划、理解与复杂问题求解能力；能从经验中学习、自适应。|尚未实现 Not yet realised|
|ASI 超级人工智能 <br>Artificial Super Intelligence|比最聪明的人类更聪明的 AI |理论上可发展出医学、纳米技术、自我复制机器人等所有可能技术|

### 1\.5 AI 的双重属性：工程与科学

AlphaFold 是 Google DeepMind 提出的蛋白质 3D 结构预测模型,解决了 50 年悬而未决的"蛋白质折叠问题"，给定氨基酸序列预测其三维构象。 AlphaFold 作为“AI 同时是科学也是工程”。

|视角 Perspective|关注点 Focus|本课侧重 |
|---|---|---|
|工程 Engineering|构建智能系统解决真实世界问题;研究支持性的机制、算法与表征。<br>Build intelligent systems to solve real\-world problems; study mechanisms, algorithms, representations that make them possible\.|主线 Mainstream|
|科学 Science|理解智能的本质 \(人或机器\);实现可评估的智能模型;探索算法/表征调整带来的影响。<br>Understand the nature of intelligence \(human or device\); implement evaluable models; explore consequences of algorithm/representation choices\.|适度覆盖 Covered, esp\. learning \& agents|

### 1\.6 AI 基础:图灵测试与深度学习 

#### 1\.6\.1 图灵测试  

1950 年 Alan Turing 提出图灵测试:若一台机器在对话中能让询问者无法区分其与人类,则可认为该机器具有智能。  In 1950 Alan Turing proposed the Turing test: if a machine's conversational responses are indistinguishable from a human's, the machine can be considered intelligent\.

“图灵测试关注行为表现而非内部机制。”
"The Turing test cares about behaviour, not internals\."

#### 1\.6\.2 深度学习的核心逻辑 

A deep neural network is a hierarchy of layers that progressively transforms input data into more abstract representations \(e\.g\., edge → nose → face\)\. The output layer combines those features to make predictions\.

深度神经网络由多层组成,每一层把输入数据转换为更抽象的表示 \(例如：边缘 → 鼻子 → 整张脸\)。输出层把这些特征组合起来完成预测。  

#### 1\.6\.3 规则驱动到数据驱动的范式转变 

|驱动力 Driver|含义|
|---|---|
|更好的模型 Better models|Rule\-based → Statistical → Deep Learning；以更多参数拟合更复杂的数据。|
|更强的算力 Better compute|更强大的 RAM / CPU / GPU;分布式计算平台。|
|更多的数据 More data|海量、可分析、含信息的数据可用 → “大数据”。|

"Big data is a collection of data sets so large and complex that it becomes difficult to process using on\-hand database management tools or traditional data processing applications\."

“大数据是指数据量大到传统数据库与处理工具难以处理的集合。”

### 1\.7 大数据  

#### 1\.7\.1 数据来源  

Data fueling model growth comes from everyday human activity — "Nearly every human action leaves a digital trace: medical, traffic, logistics, bioscience, weather, chemistry, education, system, finance, e\-commerce, manufacturing, …

#### 1\.7\.2 4V 特性  

|维度 Dimension|含义|典型数据|
|---|---|---|
|Volume 体量|从 TB 到 ZB 的数据规模需要处理。From terabytes to exabytes to zetabytes\.|2015: 8 billion TB;2020: 40 ZB;人均 \~5\.2 TB|
|Velocity 速度|批式、实时、流式数据,从毫秒到秒级响应。Batch, real\-time, streaming\.|毫秒级响应的实时推荐系统|
|Variety 多样性|结构化 / 半结构化 / 非结构化:文本、图片、视频、音频等。|Structured, semi\-structured, unstructured\.|
|Veracity 真实性|数据的不一致性、不完整性、歧义性、欺骗、近似模型带来的不确定性。|Uncertainty from inconsistency, incompleteness, ambiguity, deception\.|

### 1\.8 数据挖掘与机器学习 

#### 1\.8\.1 数据挖掘  

Data mining discovers patterns and models that are valid, useful, unexpected and understandable\. Examples: "milk \+ bread" often bought together \(descriptive\); tomorrow's weather \(predictive\)\.

数据挖掘旨在发现数据中“有效、有用、出乎意料、可解释”的模式与模型。

典型例子：从超市数据中发现“牛奶 \+ 面包”常被一起购买 \(描述型\)；从历史数据预测明日天气 \(预测型\)。  

|任务类别|目标|例子|
|---|---|---|
|描述型 Descriptive Methods|发现人类可解读的、描述数据的模式|购物篮分析 Milk and Bread|
|预测型 Predictive Methods|用部分变量预测其他变量的未知值或未来值|天气预测 weather prediction|

#### 1\.8\.2 经典机器学习 vs 深度学习

|阶段 |特征 Feature|模型 Model|
|---|---|---|
|经典机器学习 <br>Classical ML|手动设计特征<br>\(Handcrafted Feature Extraction → Feature Selection\)|统计模型 <br>Statistical models|
|深度学习 <br>Deep Learning|多层感知机自动学习特征<br>\(Automatic Feature Learning\)|神经网络 / 多层感知机 <br>Multi\-layer Perceptron|

Machine learning lets machines learn new things from data\. Deep learning, with more complex models, fits large\-scale data better\.

机器学习 \(Machine Learning\) 让机器能从数据中学习新东西；深度学习 \(Deep Learning\) 通过更复杂的模型拟合大规模数据,更适合大数据场景。  

### 1\.9 机器学习三大范式

|范式 Paradigm|数据特征|任务|典型例子 |
|---|---|---|---|
|监督学习 Supervised Learning|有标签 Labeled Data|预测标签 |价格预测 |
|无监督学习 Unsupervised Learning|无标签 Unlabeled Data|聚类 / 主题发现 |客户分群、主题挖掘|
|强化学习 Reinforcement Learning|基于奖励 Rewards|寻找好的行为|训练小狗 / 游戏 AI|

#### 1\.9\.1 监督学习：回归与分类

Supervised learning trains on labeled data to predict labels on new samples\. Predicting a real\-valued target = regression; predicting a discrete category = classification\.

监督学习的核心：用有标签数据训练模型，使其能对新样本做出预测。预测目标若是连续值，称为回归 \(Regression\)；若是离散类别，称为分类 \(Classification\)。  

回归例子 Example：用面积、楼层、位置预测房价 \(连续值\)。  

Predicting house prices from area, floor, location \(continuous\)\.

分类例子 Example：用肿瘤大小、患者年龄判断良性/恶性 \(离散\)。  

Predicting benign/malignant from tumour size and age \(discrete\)\.

As the number of features grows from 1 to few to many, models move from simple linear fits to high\-dimensional complex models — deep learning is the extreme of this trend\.

当特征从 1 个到少量再到大量时，模型从简单线性拟合逐步走向高维复杂模型，深度学习正是这种趋势的极致。  

#### 1\.9\.2 无监督学习 

In unsupervised learning, the dataset has no labels x\(1\), …, x\(n\); The goal is to discover interesting structures or patterns — clustering, topic discovery, dimensionality reduction, etc\.

无监督学习的数据集没有标签 x\(1\), …, x\(n\)，目标是发现数据中“有趣的”结构或模式，如聚类、主题、降维等。  

#### 1\.9\.3 强化学习 

In reinforcement learning, the agent interacts with the environment at discrete steps t = 1, 2, 3, …, T\. At each step the agent:

强化学习中，智能体 \(Agent\) 在离散时间步 t = 1, 2, 3, …, T 与环境 \(Environment\) 交互。在每一步，智能体:  观察状态 \(环境\) Observes the state \(environment\)；产生动作 Produces an action;；获得奖励 Gets the resulting reward；进入下一状态 And produces the next state。

Through a "try → collect feedback → improve policy" loop, the agent progressively learns better behaviour\. 通过“尝试策略并收集反馈 → 根据反馈改进策略”的循环，智能体逐步学会更好的行为。  

### 1\.10 伦理、法律与隐私

The rise of AI raises a number of unresolved ethical and legal questions:

数据隐私保护 How do we protect data and the use of data in AI?  How do we protect data and the use of data in AI?

人类对 AI 的控制 Should the law regulate the level of human control over AI?AI 是否应在某阶段被视为法律主体?  Should the law regulate the level of human control over AI? At what stage, if any, should AI be considered a legal person?

AI 决策的责任边界 Should machines be allowed to make decisions that affect whether people are injured \(e\.g\., self\-driving cars making life\-and\-death choices\)?  Should machines be allowed to make decisions that may injure people \(e\.g\., self\-driving cars\)?

自主武器 Should we allow AI in autonomous weapons that select and engage targets without human intervention?  Should AI be allowed in autonomous weapons that select and engage targets without human intervention?

# Lecture 2

# Overview

|周 Week|主题 Topic|核心内容 Key Content|
|---|---|---|
|Week 1|An Introduction |AI 定义 / 三大学习范式 / ANI–AGI–ASI|
|Week 2|Searching Techniques |无信息搜索（BFS / DFS）→ 启发式搜索（爬山法 / 最佳优先 / A\*）→ 元启发式（SA / GA）<br>先看什么信息都没有时怎么找解（BFS / DFS），再给搜索装上启发式（爬山法 / 最佳优先 / A\*），最后把找一个解升级成找最优解，于是引出两大元启发式：模拟退火（Simulated Annealing, SA）与遗传算法（Genetic Algorithm, GA）|
|Week 3|Evolutionary Computation |EA 总览 / PSO / DE / MA / MOEA / ETO / NAS|
|Week 4|Artificial Neural Network |神经元模型 / 感知机 / MLP / 反向传播|
|Week 5|Deep Learning \& Applications |深度网络、卷积、循环与注意力|

## Part 1 Searching

### 1\.1 Definition and Five Elements

Searching is the process of looking for a solution to a problem through a set of states\. 

搜索是在一组状态中寻找问题解的过程。

|要素|原文|理解|
|---|---|---|
|当前状态|Current state: the step of where we are|我们现在走到哪一步|
|目标状态|Goal state: the step where the solution is found|解所在的那一步|
|动作|Actions: move one state to another|把一个状态搬到另一个状态的操作|
|代价|Cost: how many steps needed to find the solution\.|找到解需要走多少步|
|解 |Solution: a path from the current state to the goal state\.|从当前状态到目标状态的一条路径|

解是一条路径（path），不是单个状态。这条约定决定了后面所有的搜索算法都在做同一件事，在状态图上从起点长出一棵树，直到某个叶子正好是目标。所以找到目标状态和给出到达目标的路径是两件事，后者需要回溯父节点。

### 1\.2 搜索的重要性

An agent can find a sequence of actions that achieves its goals when no single action is done\. 

当没有任何单个动作能直接达标时，智能体需要找出一串动作。

Almost every AI problem depends on a search procedure to find the solution\.

几乎每一个 AI 问题都依赖一个搜索过程来求解。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODk3ZTlkYTYwYWUxYTgyN2QwNDljYTg4ZmE2YTE5MzRfODY4ZTcxMWE3NjgzY2YxN2E3YjlhZDQxODY3MjBlZDhfSUQ6NzY5MjM1NTY5NDQzMDgxNzgyMF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

1. Check the current state \(reach the goal?\);  检查当前状态是否已达成目标；

2. Execute allowable actions to move to the next state;  执行允许的动作，移动到下一个状态；

3. Check if the new state is the goal state\.  检查新状态是不是目标状态：No 时回到 Search，Yes 时 End。

循环有一个终止条件：课件在流程图旁写得很清楚 —— The process is repeated until a solution is found or the state space is exhausted\.（这个过程一直重复，直到找到解，或者状态空间被穷尽）。

|算法|前提|特点|说明|
|---|---|---|---|
|Linear Search <br>线性搜索|数据无序也可用|逐个比较，最坏情况看完全部|无信息搜索（只能一格一格试，等价于 BFS 的机械展开）|
|Binary Search <br>二分搜索|数据必须有序|每次砍掉一半，快得多|有信息搜索（有序这个先验就是启发信息，它让每一步都能排除一半）|

### 1\.3 图与树 Graph and Tree Representation

节点 Nodes：the states in a searching process 搜索过程中的状态；

边 Edges：transitions between states \(actions\) 状态之间的转移（也就是动作）。

与或图（And\-Or Graph）：多条路都能成功

|节点类型|原文|含义|
|---|---|---|
|And 节点|a node with all edges emanating from it connected by a curved line|发出的所有边用一条弧线连起来，表示必须全部满足|
|Or 节点|a node has no line connecting its edges to indicate that any emanating path can be a solution|边之间没有连线，表示任选一条路径即可|

旅行商问题（TSP）：访问完所有城市是 And（每个城市都得去），先访问哪一个是 Or（顺序可以任选），这正是组合爆炸的来源。

### 1\.4 搜索方法  Searching Approaches

Uninformed \(Blind\) Search：Breadth\-first Search / Depth\-first Search

Informed \(Heuristic\) Search：Hill Climbing / Best\-first Search / A\* Algorithm Search / Simulated Annealing / Genetic Algorithm

|大类|方法|用不用启发信息|是否保证最优|
|---|---|---|---|
|无信息（盲）搜索|BFS 广度优先|不用|在边权相等时保证最优|
|无信息（盲）搜索|DFS 深度优先|不用|不保证（p\.20 明确说明）|
|有信息（启发式）|Hill Climbing 爬山法|用 h|不保证（会困在局部最优）|
|有信息（启发式）|Best\-first / Greedy|只用 h|不保证（贪心，p\.28 示例）|
|有信息（启发式）|A\*|g 与 h 都用|h 可采纳 / 一致时保证最优|
|元启发式（随机）|Simulated Annealing|用概率接受更差解|不保证|
|元启发式（随机）|Genetic Algorithm|用种群与适应度|不保证|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWM3MmFkOGZkNTk1ODAwMDFjZDQ4ODI5MzA2MmNlNzZfN2NhN2I1NDE1MzYyNzVhMWEzYTBlN2U4Nzc1ZTQ1YTJfSUQ6NzY5MjM1NTY5MDczOTk2MTM3Ml8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

A simplified road map of part of Romania（罗马尼亚部分路网简化图）,这张地图就是本讲后面所有实例的舞台：贪心搜索、 A\* 全过程，用的都是它（起点 Arad、终点 Bucharest）。



## Part 2 Generate \& Test 

### 2\.1 生成—测试（Generate \& Test）与井字棋 

最原始的搜索策略 Generate \& Test：

Step 1\. Generate a possible state 先生成一个可能的状态；

Step 2\. Test to see if it is a goal state \(found a solution\) 再测试它是不是目标状态。

用井字棋（Tic\-Tac\-Toe）来演示：从初始状态出发，按放 X（cross）或 O（zero）的规则不断生成新状态。

核心提问：How many states should be explored？

两个数：9\! = 362,880 数的是对局数（下棋的先后顺序不同，是不同的对局）；3^9 = 19,683 数的是棋盘局面数（只看到棋盘长什么样，不管怎么走到这里的）

### 2\.2 Open 与 Closed 

Move downwards, level by level, until goal is reached\.（一层一层向下推进，直到抵达目标）。

Open: a list of states that have been generated but whose children have not been examined\.

已经生成、但孩子还没被考察过的状态。决定下个展开谁，BFS 用队列（FIFO）实现它，DFS 用栈（LIFO）实现它。

Closed: a list of states already visited\. 

已经访问过的状态。防止重复展开与死循环，遇到图里的回路时，靠它把回头路挡住。

本讲开头说盲搜索不用任何额外信息，但记忆不算信息，它只是记录自己走过哪里。所以BFS非常吃内存，BFS 的 Open 表要同时存下整整一层的节点；而 DFS 的 Open/递归栈只存当前这一条路径。

## Part 3 广度优先搜索

### 3\.1 无信息搜索  Uninformed \(Blind\) Search

#### 3\.1\.1 Definition

The only information available is the ability to distinguish goal state from non\-goal state\. An uninformed \(blind\) search algorithm uses no information other than the initial state, the search operator and a test for a solution\.

唯一能用的信息就是分辨一个状态是不是目标；盲搜索除了初始状态、搜索算子、解的判定以外，不使用其他信息。

The different types of blind searches are characterized by the order in which they expand the nodes\. The order can have a dramatic effect on how well the search performs \(randomly\)\.

各种盲搜索的唯一区别就是展开节点的顺序，而这个顺序（会对搜索的表现产生巨大的影响）。

换句话说：BFS 与 DFS 的代码几乎相同，差别只在用队列还是用栈。

### 3\.2 广度优先搜索的定义

Expand the tree layer by layer, progressing in depth\. Expand the root node first, expand all nodes at level 1 before expanding level 2 OR expand all nodes at level j before expanding nodes at level j \+ 1\.

一层一层地展开，先展开根节点；先展开完第 1 层的全部节点，再去展开第 2 层，或者说，先展开完第 j 层的全部节点，再展开第 j\+1 层的节点。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTY2NmZkMjZhNTFmYzBhYzE0MmM1OGMwZWJlZjExZTJfODhlZjVmZThjM2U2Zjc2M2QxODJiMTE2MzA4NGYwMTBfSUQ6NzY5MjM1NTY5MjE0MDgyNjEzOV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2RhOGQ3YWZjM2U0M2U5YmEyN2M2ZGYxYzU3MDMyNDNfYWY2MjkwNWMxYzljOWI4NGYyMTdlYjQ5YTI1NTViMmZfSUQ6NzY5MjM1NTY5MDczOTk3Nzc1Nl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

BFS 在边权相等时保证最短：因为它是按层推进的，第 j 层的所有节点都比第 j\+1 层的离起点更近。所以第一次遇到目标时，走的一定是步数最少的路径。

#### 3\.2\.1 广度优先算法

课件把 BFS 画成一张带 Expand node（展开节点）的流程框图。它的文字层只有 Expand node 与 Breadth\-first Algorithm 两个标注，但流程本身与 2\.5 / 2\.7 的两个实例完全一致，可以还原成下面的伪代码：

> current = open\.pop\(0\)  ← 从队列头部取出（FIFO）
> 
> if child not in open and child not in closed: open\.append\(child\)  ← 追加到队尾
> 
> 

📌 「第几步」怎么数：课件 p\.13 与 p\.19 都写了 State space at the sixth step（第六步时的状态空间），说明课件把「展开一个节点」算作一步，并把每一步的 Open / Closed 内容都列出来。本笔记照此约定。

#### 3\.2\.2 Example 1：从 A 到 U 

课件给的搜索树以 A 为初始状态、U 为目标状态，并逐次标出展开的节点：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjczNTMxYmZhYWE5MDMyYzZkMWVlNTg1Mzc0Y2UxYTZfN2IyYjk0NGMxNzE4YmU3YTI4NzM1MGFkNmEzNGI1YzdfSUQ6NzY5MjM1NTY5NDAxOTgwODc5Ml8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2E3MTQ0NDdmNGFlOGI3YTlkY2IwNmEwMjM2ZGMxZWFfYzVlOTBjYTdkMjcwZTE2ZWExMjA0MjA4MTFkNjI0NTBfSUQ6NzY5MjM1NTY5MDc0MDAyNjkwOF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

#### 3\.2\.3 Example 2：八数码 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWY5ZDEwNGViYmY3NDVlODE2ZTMxMDgxMGRiM2VmYmNfMDMyM2Q3OWVhZGQ0MzljMTM2YWU1MGZkYzNkYzU3NThfSUQ6NzY5MjM1NTY5NDQzMDgzNDIwNF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Why only one expansion here? 为什么这里只扩展出一个？。

同一个棋盘局面可以由不同动作到达，因此生成时必须先做去重，否则搜索树会膨胀成一棵指数级的树。其余方向的邻居要么不合法、要么已经在 Open 或Closed 里（重复局面）。

#### 3\.2\.4 Example 3：从 S 走到 G 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGQ5MzM2OTY0Y2M2MmFhMWFhYzdlM2I0ZTg4MWI0MmVfNmViMTQ4ZDg4NWRhYzZkOWQyZTFjZDZlYTZiNDFiNzlfSUQ6NzY5MjM1NTY5MjE0MDgwOTc1NV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

这里的广度优先只有两步，而后面的深度优先结果 S\-A\-C\-G（3 步），所以证明了后续的 Depth\-first search does not find the shortest path（深度优先一般不找最短路径）。

第 3 步 A 的孩子 C 被追加到队尾，队里 B 还在前面，所以下一步展开的是 B 而不是 C；

第 4 步 B 的孩子里 C 已经在 open 里，于是不重复追加，只追加 G；

第 5 步 C 的两个邻居 A 与 G 都已在表里，于是open 只剩 G。

如果把②③的判重去掉，C 会被反复加入，搜索可能永远不结束。

## Part 4 深度优先搜索与两者对比

### 4\.1 深度优先搜索的定义 

Expand the tree as deep as possible, returning to upper levels when needed\. Select a child from left to right\. · Repeatedly go to the left child, as long as possible\. · Return to left\-over alternatives \(higher up\) only when needed\.

尽量往深里展开，需要时才退回上层；从左到右选一个孩子，只要可能就一直往左孩子走；只有在需要时，才回到（更上层的）那些还没走的分支。

### 4\.2 深度优先算法

与 BFS 一样，课件给的是一张带 Expand node（展开节点）的流程框图，文字层只留下 Depth\-first Algorithm 这个标题。按 p\.20 的实例还原如下：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmI3MDM2ZDk4ODQzZWE1YjBlZmM3OGVkYjYwYjI5NDRfOTI3ZDQ4MTdmMmMyOGZlYWIzOWFiYWU5OGVhYjg4YzlfSUQ6NzY5MjM1NTY5MjE0MjQ2NDUzOV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTY2OTFmYjEzNjViMTU0MzQ2NzFlMmU1ZGJjYThjYmZfMzlhZGE5YjJhODgzNDM4Y2Y1NGVkNjQ5YmUxMjhmYzVfSUQ6NzY5MjM1NTY5MjE0MjUxMzY5MV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)



> current = open\.pop\(\)  ← 从栈顶取出（LIFO）
> 
> for child in reversed\(current\.children\):  ← 倒序压栈，保证从左到右访问
> 
> 

### 4\.3 Example 1：从 A 到 U

同一棵搜索树（初始 A、目标 U），但展开次序完全不同：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODAzM2ZmODk2ZmEyYjU1NjRlM2IzODdhZjhmZjU2MzdfZmUyMDBhZTYwMWVlZmZkYWMyNjE1OTJkYzhiZjFlOGNfSUQ6NzY5MjM1NTY5MDc0MDA3NjA2MF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NWM3MTkxNTM1OTE3MTNkNWUyODFkNWNkZDg4Mjg2NTNfYjdjNWUzNTEzZWRiNTVlZjRmNDcxMGJiZjU2NzcwZmJfSUQ6NzY5MjM1NTY5MDc0MDA0MzI5Ml8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|对比项|BFS|DFS|
|---|---|---|
|初始 / 目标|Initial state: A / Goal state: U|Initial state: A / Goal state: U|
|展开序列|Expand A → Expand B → Expand C → Expand D → Expand E|Expand A → Expand B → Expand E → Expand K → Expand S → Expand L → Expand T → Expand F → Expand M → Expand C ……|
|形状|横向铺开，一层层推进|纵向钻下去，一路到底才回头|

### 4\.4 Example 2：从 S 走到 G

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTUwZTg1MmNlOTcyMWM1YTc2MGYzNTliMjhmMTQwZDhfYmIzZDRiODQ1ZWZkYzkyZDcwMzcxMzhiYzA5MmYxM2JfSUQ6NzY5MjM1NTY5MjE0MjU3OTIyN18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

结论：Solution path: S\-A\-C\-G

In the route example, by breadth\-first search, the path is S\-B\-G; by depth\-first search, the path is S\-A\-C\-G\. 深度优先一般找不到最短路径。同一个例子里，广度优先给的是 S\-B\-G，深度优先给的是 S\-A\-C\-G。

### 4\.5 深度优先 vs\. 广度优先 

They both find a solution if one exists \(and if the state isn't too big\)\. 

只要解存在（且状态空间不太大），两者都能找到解。

|对比维度|深度优先 DFS|广度优先 BFS|
|---|---|---|
|主要风险|跑进没有解的极深分支里空耗时间|内存占用极大|
|课件原文|If the search space contains very deep branches without solution, then depth\-first may waste much time in them\.|Is very demanding on memory\! Must remember the unexpanded nodes at a level, which could become very large as you go deeper into the tree/graph|
|要记住什么|depth\-first remembers just the path 只记当前这一条路径|要记住整整一层的未展开节点，越深越大|
|最短路径|不保证|边权相等时保证|
|何时该用|解深、内存紧、只要求「有解」|解浅、要求最短、内存够|

空间复杂度：设分支因子为 b、最大深度为 m。DFS 的空间是 O\(b·m\)（深度每加一层，每层只要记住还剩几个没走）；BFS 的空间是 O\(b^d\)（d 是解所在深度，因为要把整层都存下来）。在棋盘、地图这类分支因子很大的问题里，b^d 会瞬间爆炸，太过依赖记忆。 

## Part 5  启发式的有信息搜索： Hill Climbing, Best\-first and  A\*

### 5\.1 启发式搜索

#### 5\.1\.1 使用场景

AI problem solver employs heuristics in two situations:

AI 求解器会在两种情形下动用启发式。

1. A problem may not have an exact solution because of ambiguities in problem statements or available data\. Example: medical diagnosis\.  问题可能根本没有精确解，因为题面或数据本身就有歧义，例如医学诊断；

2. A problem may have an exact solution, but the computational cost of finding it may be prohibitive\.  问题有精确解，但找它的计算代价高到无法承受。

#### 5\.1\.2 优势与不足

1. Uninformed \(blind\) searches are normally very inefficient\. Information about the problem can sometimes be used to guide the search more efficiently\. 盲搜索通常效率很低；问题自身的信息有时可以用来让搜索更高效。

2. Informed search explores the node that is most "likely" to be the nearest to a goal state\. 有信息搜索优先展开那个「最可能」离目标最近的节点。 

3. Informed search works successfully in many cases, but its success is not guaranteed\. 有信息搜索在很多情况下有效，但成功没有保证。比如，爬山法会 stuck at local optima（卡在局部最优），贪心搜索遇到U 形障碍最优都保不住。

### 5\.2 爬山法（Hill Climbing）

Consider an eager but blind mountain climber: go uphill along the steepest possible path until you can go no further up\.

想象一个急于登顶却看不见全山的登山者，沿着最陡的坡一直往上爬，直到再也爬不上去为止。

把这个比喻写成算法，就是四条性质：

1. Hill\-climbing expands the current state and evaluates its children\.  展开当前状态，评估它的孩子；

2. The best child is selected for further expansion; Neither its siblings nor its parents are retained\.  选最好的那个孩子继续展开；它的兄弟节点和父节点都不保留；

3. Because it keeps no history, the algorithm cannot recover from failures of its strategy\.  因为它不保留历史，所以一旦策略失败就没法恢复。爬山法与 BFS / DFS 的根本分界。BFS 和 DFS 靠 Open / Closed 记住所有走过的路，所以不会迷路（要么找到解，要么穷尽）；爬山法主动扔掉兄弟与父节点，只带一个 Current 走。也是省内存和极快的代价；

4. Hill climbing performs well if the distance estimate \(quality measurement\) is locally consistent\. That is, the node with the shortest distance estimate will eventually lead to the goal\. 只有当距离估计（质量度量）局部一致时爬山法才表现良好，也就是距离估计最小的那个节点最终能通向目标。

Hill climbing may encounter the problem of stuck/trap at local optima\.  爬山法可能遭遇卡在局部最优的问题。

#### 5\.2\.1  爬山法三个困境

Local Maxima（局部极大）：四周都比自己低，但并非整座山的最高点，任何单步移动都变差，算法停住。

Plateaus（高原）：周围一片平，所有邻居的评估值都相同，算法看不出该往哪边走，只能随机游荡。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGZmNzFhN2IwZjA4MGJhZDRjM2YxZGUzYzRjNTFlMTJfZWRhY2NiMTM5YjcxZDZmZmUzMGVmOWU3YTVkZDExODZfSUQ6NzY5MjM1NTY5MjE0MDk0MDgyN18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

### 5\.3 最佳优先搜索 Best\-first search \(or Greedy Search\)

Select a node for expansion based on an evaluation function f\(n\), which is construed as a cost estimate\. The node with the lowest evaluation is expanded first\. i\.e\., argmin\(f\(n\)\)

按评估函数 f\(n\)（代价估计）来选下一个展开的节点；评估值最小的那个先展开，即argmin\(f\(n\)\)

启发成分 h\(n\)：

h\(n\) = estimated cost of the cheapest path from state at node n to a goal state

h\(n\) = 从节点 n 所在状态走到某个目标状态的**最便宜路径**的代价估计。

If n is a goal node, then h\(n\) = 0\.  

若 n 本身就是目标节点，则 h\(n\) = 0。

Tips: h\(n\) = 0 这条约定非常重要：它是后面 A\* 最优性讨论的基石。到了目标，剩余代价当然是 0，这条看起来理所当然的性质，正是可采纳性（admissible）与一致性（consistent）定义中反复使用的那一步。

#### 5\.3\.1 Example：启发函数为直线距离

Try to expand the node that is closest to the goal, on the grounds that this is likely to lead to a solution quickly\. Thus, it evaluates nodes by using just the heuristic function: f\(n\) = h\(n\)\.  We use the Straight\-Line Distance heuristic, which we call h\_SLD\. 

优先展开离目标最近的那个节点，理由是它看起来能更快到达解；于是它评估节点时只用启发函数：f\(n\) = h\(n\)；使用直线距离启发式，记作 h\_SLD。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzFkOGQ5NjgxYTZmOWJjMWU1NWI4NTNmNGVmZGI3MTZfZTYxMmE0NDRiYjEyZWM0OTRjZTIwODFjMmM0MDFmMTFfSUQ6NzY5MjM1NTY5MjE0MDg0MjUyM18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

启发式的具体形态：把离目标有多近量化成一个可以直接查表的数。整张表的来源是地图上的直线距离，也就是飞机能直飞的距离，与后面 A\* 里的 g\(n\)（沿公路实际走的里程）形成对照。

注意 Bucharest = 0：这就是 4\.4 中 if n is a goal node, then h\(n\) = 0 的实例。

#### 5\.3\.2 贪心搜索与局限

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmEwYjcwZjcwNTQ4NjliOGE5NDUwN2RiZGQxOGYzODZfMDQ0MzlkYTQ3MWUzNGUyNTRlMmYxNjg0NWRjNTk0N2NfSUQ6NzY5MjM1NTY5MjE0MjU5NTYxMV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

从 Arad 出发、直奔 Bucharest 的过程，每个节点旁边标的就是 h\_SLD：

把四步连起来看，贪心的短视一目了然：每一步都只做一件事，在眼前这些候选里挑 h\_SLD 最小的那个。它从不回头（不像 A\* 还留着 Oradea、Rimnicu Vilcea 在候选里），也从不比较已经走了多远（g 完全没出现）。

U 形障碍

However, it is not optimal\. This shows why the algorithm is called "greedy" \- at each step it tries to get as close to the goal as it can\. If it finds its way around the "U"\-shaped obstacle, it will follow the red path\. It is also incomplete even in a finite state space, much like depth\-first search\.

它不是最优的；这也解释了为什么叫贪心，每一步都只想尽量靠近目标。如果它能绕过那个U 形障碍，就会走上红色路径。即使状态空间有限，它也可能不完备，很像深度优先搜索。

蓝线是贪心，红线是最优：贪心会径直朝目标的直线方向冲，一头撞进 U 形的内壁，然后卡在凹底（因为它只会朝看起来更近的方向走，而任何往回走的移动都离目标更远，于是它不敢走）。这与爬山法卡在 Local Maxima 是同一个病根：只看一步、不记历史、不接受暂时变差。模拟退火，正是为了治这个病而设计的。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGE0ZjNhMDc0NzFiZTAwNmYxOGJjNThmM2M5ODZjNDJfY2EwNGU2Zjk1YWVkMjJhODJmMmYxMjQyZWJjMjE5OGVfSUQ6NzY5MjM1NTY5MjE0MjY0NDc2M18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

### 5\.4 A\* Search

#### 5\.4\.1 Definition and Core Idea

A\* is an algorithm that use heuristic to guide the search while ensuring that it will compute a path with the minimum cost\.

A\* 是一种一边用启发式引导搜索、一边保证算出的路径代价最小的算法。必须满足的目标：快（靠启发式）与优（保证最小代价），整节剩下的内容都在解释它怎么把这对矛盾统一起来。

核心公式：A\* computes the function f\(n\) = g\(n\) \+ h\(n\)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NWI1ZmY0MjRhMTJmMTZiYzc2MzZhYzc3NGEwYWE4MzBfNGJkMTZkN2Y1YmJlMGI1NGY1N2IyZWRkZWVmYTdmNTFfSUQ6NzY5MjM1NTY5NDAxOTg5MDcxMl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

h\(n\) 是 "estimated cost"（估计代价）

The h\(n\) value guides search toward heuristically promising states\. The function h\(n\) relies upon some heuristic information available from the problem domain\. It changes from heuristic to heuristic, and from problem to problem\. h\(n\) 把搜索带向启发式上看更有希望的状态；h\(n\) 依赖问题领域能提供的启发信息，换一个启发式、换一个问题；而且 A\* 的全部理论（可采纳性与一致性）都建立在h 不要估高了这一条假设上。

g\(n\) 是 "actual cost"（实际代价）

while the g\(n\) value prevents search from persisting indefinitely on a fruitless search\. h\(n\) in general weights how close node n is to the goal\. 而 g\(n\) 防止搜索在一条没有结果的路上一去不回，h\(n\) 总体上是在度量节点 n 离目标有多近。

|分量|是什么|方向|确定性|
|---|---|---|---|
|g\(n\)|起点 → n 的累计代价|向后看（回头路已定）|确定（实打实发生过的里程）|
|h\(n\)|n → 目标的最便宜路径估计|向前看（还有多少路）|不确定（靠启发式猜）|
|f\(n\)|两者之和|既是已付出也是还要付|排序用（每一轮选 f 最小的展开）|

解决了贪心搜索的U型障碍：贪心只带 h，所以冲进凹底就出不来；A\* 额外背着 g，于是已经绕了多远会不断抬升 f 值，让搜索有理由转向别的分支。

#### 5\.4\.2 Example 罗马尼亚地图上的 A\* 全过程

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzFhZjE2ZGE3NjMzOTQ5NzIxMDUzYzhiMmRiYmI2NmNfNGYyNWNlNjA5MWRkMzE2NThlOWRhOTBhN2FhYjAxMGJfSUQ6NzY5MjM1NTY5Mzg5ODE5MDM2M18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

最终答案：最优路径是 Arad → Sibiu → Rimnicu Vilcea → Pitesti → Bucharest，总代价 418

> Arad → Sibiu = 140 → g\(Sibiu\) = 140，f = 140 \+ 253 = 393；
> 
> Sibiu → Rimnicu Vilcea = 80 → g = 220，f = 220 \+ 193 = 413；
> 
> Rimnicu Vilcea → Pitesti = 97 → g = 317，f = 317 \+ 100 = 417；
> 
> Pitesti → Bucharest = 101 → g = 418，f = 418 \+ 0 = 418。
> 
> 四段相加：140 \+ 80 \+ 97 \+ 101 = 418 ✓ 与 \(f\) 完全一致。
> 
> 

为什么 \(e\) 先找到了 Bucharest = 450，却不停？

因为在 \(d\) 之后，候选队列里有 Pitesti = 417、Bucharest\(经 Fagaras\) = 450、Craiova = 526…… 417 \< 450，所以下一步必须先展开 Pitesti。展开 Pitesti 之后，它就给出了一个更便宜的 Bucharest = 418。如果换成贪心搜索，早在 \(e\) 见到 h\(Bucharest\) = 0 就会停下，拿到 450 这个次优解，这就是 A\* 与贪心那 32 英里差距的来源。

#### 5\.4\.3 Properties of A\* 前提

条件一：可采纳性（admissible）：

A\* generates an optimal solution if h\(n\) is admissible \(never overestimates the cost to reach the destination node, i\.e\., the cost it estimates to reach the goal is not higher than the lowest possible cost from the current point in the path\)\.

若 h\(n\) 是可采纳的，A\* 就能给出最优解。可采纳的意思是它从不高估到目标的代价，也就是估计值不高于从当前点出发理论上可能的最低代价。

条件二：一致性（consistent）：

A\* generates an optimal solution if h\(n\) is consistent, i\.e\., for every node n and for every successor node n' of n: h\(n\) ≤ c\(n, n'\) \+ h\(n'\)

若 h\(n\) 是一致的，A\* 也能给出最优解，一致的意思是对每个节点 n 和它的每个后继 n'，都有 h\(n\) ≤ c\(n, n'\) \+ h\(n'\)，其中 c\(n, n'\) 是从 n 到 n' 的边代价。一致 ⇒ 可采纳；可采纳 ⇏ 一致，一致是更强的条件。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDM2NGYxYmIyZGVmYTU2Y2FhMjdiYWM3OTU1ODA5YjJfNWEwYWY3MjMzZDdlMWJmYWFjYjQzYjZjM2IwY2VkODNfSUQ6NzY5MjM1NTY5Mzg5ODIwNjc0N18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

- If h\(n\) is consistent, f along any path is non\-decreasing\.  若 h\(n\) 一致，则沿任意路径的 f 都是不减的；

- If h\(n\) is consistent, then h\(n\) is admissible\.  若 h\(n\) 一致，则 h\(n\) 一定可采纳。

h\(n\) ≤ c\(n, n'\) \+ h\(n'\)，即 h\(n\) − h\(n'\) ≤ c\(n, n'\) 。从 n 到目标的估计距离减去从 n' 到目标的估计距离，不能超过 n 到 n' 的实际距离。走一条边，估计值最多只能减少这条边的代价。它保证了沿路径的 f 不会下降。而 f 只可能上升或持平，就意味着一旦某个节点被 A\* 展开（放进Closed），就再也不会被更便宜的路由绕回来。

## Part 6 从搜索到优化 Optimization

### 6\.1 优化问题

What are the values of x and y such that z is equal to the value at the peak? maximization? / minimization?

x 与 y 取什么值时 z 等于峰值？是最大化？还是最小化？

前面几节的目标是从起点走到目标，答案是一条路径；从这里开始，目标是找一组参数使目标函数取极值，答案是一个点。两者的共同骨架仍然是猜一组值 → 看结果好不好 → 改一改 → 重复。区别在于搜索的好不好是到没到目标，优化的好不好是一个数值。

### 6\.2 Simple Example

y = f\(x\) = x²，where x ∈ \[0, 10\]，Find the value of x that gives the minimum of y

y = f\(x\) = x²，其中 x 限制在区间 \[0, 10\] 内；求使 y 取最小值的那个 x。

优化问题的三要素：

① 决策变量 x；② 目标函数 f\(x\) = x²；③ 约束 x ∈ \[0, 10\]。

答案：f 在 \[0, 10\] 上单调递增，所以最小值在左端点 x = 0 处取得，y = 0。

### 6\.3 搜索空间扩大后的解

Not practical to evaluate ALL combinations\!  把所有组合都评估一遍是不现实的！

A String（一个串）与 Cost function or Fitness function（代价函数或适应度函数）。

|概念|为什么重要|
|---|---|
|A String（串 / 染色体）<br>对一个候选解的编码|优化算法不直接操作解，而是操作它们的编码|
|Cost function / Fitness function<br>给一个串打分的函数|整章唯一能判断好坏的依据，所有方法都靠它比较候选|

前面 BFS / DFS 的隐含前提是状态空间可以被穷尽（所以 BFS 敢说找到的一定最短）；当搜索空间大到无法穷举时，完备性就必须让位给在有限代价内拿到足够好的解。接下来两个方法（SA 与 GA）都有一个共同特征：都放弃了保证最优，换来了能在大空间里跑得动。

### 6\.4 传统做法：单点搜索与梯度下降 single point search

Conventional methods: single point search

Optimization problem: Finding a $P_o $where

$P_o = { P_o ∈ S | f(P_o) = \min_ {∀P_i∈ S } f(P_i) }$

优化问题就是找一个 $P_o
$：它属于解空间 S，且它的函数值 $f(P_o) $等于 S 中所有解的函数值里的最小值。这类方法叫 single point search（单点搜索），并标出小标题 Gradient\-driven search（梯度驱动的搜索），每次只维护一个当前解，沿着梯度往低处挪。

核心公式：

1. 极值点的必要条件：在极值点处，函数对参数的偏导为零（曲面的切线是水平的）

$∂f / ∂P = 0$

2. 迭代更新式：下一步的位置 = 当前位置 − 学习率 × 当前点的梯度。

$P_{n+1} = P_n − α · (∂f / ∂P) |_{P = P_n}$

$α$ is a small positive value – learning rate（α 是一个小的正数，称为学习率）。

负号的含义：梯度指向上升最快的方向，所以取负号就是在往下降最快的方向走。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjRjMzMxOWU2NjY5MWJmNWEwY2E3Y2FiYjQ1NzkzNWRfMWVjZGZjMjQzOGFkZjZkMzRiMTE0NzM1MWNhMTA1NzVfSUQ6NzY5MjM1NTY5NTAzMDU4NjkwNF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

图上有三支从右侧沿切线方向指向谷底的箭头，沿着切线一步步滑下去；谷底那个点上标着 ∂f / ∂P = 0 ，算法停下来的判据，就是梯度为零。

### 6\.5 梯度下降的三条局限 

1. Function must be continuous/differentiable 函数必须连续 / 可微；

2. Local optima 会陷在局部最优；

3. Performance depends on the starting point 表现依赖起始点。

|局限|问题|后果|解决|
|---|---|---|---|
|必须可微|现实中大量问题是离散的、组合的（排班、路径、选型），根本没有梯度可用|直接无法使用，这也是 GA 的立足点（GA 只需能算适应度，不需要导数）|GA 只要求能算适应度|
|局部最优|梯度只告诉附近哪里更低，从不告诉你全局最低在哪|可能停在半山腰的坑里，而它自己无从察觉|SA 用概率接受更差解|
|依赖起点|起点不同，滑进的那个坑可能完全不同|同一个算法跑十次得到十个不同答案|GA 同时维护一整群解|

## Part 7  模拟退火 Simulated Annealing

### 7\.1 从物理退火到算法

What is simulated annealing? The main idea is to avoid local minima by accepting moves to worse solutions probabilistically\. It is one of the first stochastic local search methods, inspired by the analogy to physical annealing\.

模拟退火（SA）的核心思想是通过以一定概率接受更差的解来避开局部极小，是最早的一批随机局部搜索方法之一，灵感来自物理退火的类比。

物理退火（Physical annealing）：

A process for obtaining the minimum energy state of a solid, whereby the melted solid is slowly cooled down until reaching its ground state\. A specific schedule is used to cool down the solid very slowly\.

退火是让固体达到最低能量状态的过程，把熔化了的固体缓慢冷却，直到它落到基态；并且会用一个特定的降温时间表，把固体降得非常慢。

计算机模拟（Computer simulation）：

The Metropolis algorithm is a simulation algorithm for the physical annealing process that can be applied to solve optimization problems\!

Metropolis 算法是对物理退火过程的模拟算法，它可以被用来解优化问题

|物理世界|优化世界|对应关系|
|---|---|---|
|固体的一个微观状态|一个候选解 s|状态与解|
|能量 E|代价函数值 f\(s\)|能量越低越好，代价越小越好|
|温度 T|控制参数 T|它决定敢不敢接受更差的解|
|基态（最低能量）|全局最优解|退火的目标|
|缓慢降温的时间表|降温计划（cooling schedule）|降得越慢，越可能落到真正的基态|

Tips：降温速度是 SA 成败的核心，所以慢是关键：如果降温太快，固体会来不及排列整齐就被冻住，停在一个亚稳态，这在优化里就是卡在局部最优。SA 用时间换质量，是它相对梯度下降最大的代价。

SA 可以看作是对 Hill Climbing 的改进。普通 hill climbing 只接受让目标函数变好的移动，因此很容易停在 local optimum；而 SA 在搜索早期温度较高时，允许以一定概率接受更差的解，从而有机会跳出局部最优。随着迭代次数增加，temperature T 逐渐降低，算法接受差解的概率也会下降，搜索行为会越来越接近 hill climbing，最终在低温阶段稳定到较优解附近。

### 7\.2 Metropolis 准则 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NGRhN2NmNmJiOTkyZTE4NjgxOThlZGE5OTUyZGFiZTRfNjIyOGYyZjhlMTNkMTE4Y2RkZDIxZjZiMjA2MGExMThfSUQ6NzY5MjM1NTY5Mzg5ODE1NzU5NV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

$k_B$ 是 Boltzmann constant（玻尔兹曼常数）， $T$是 temperature（温度）。

|情形|判据|动作|
|---|---|---|
|新状态更好或持平|$E_j ≤ E_i$|无条件接受 $s_j$|
|新状态更差|$E_j > E_i$|以概率 $ p = exp(−(E_j − E_i)/(k_B·T)) $接受|

差得越多，接受概率越小：ΔE 翻倍，概率是平方级下降；

温度越高，接受概率越大：T → ∞ 时 p → 1（高温时几乎什么都接受）；

温度越低，接受概率越小：T → 0 时 p → 0（低温时退化为纯爬山法，只接受更好的解）。

If the temperature is lowered slow enough, the solid may reach thermal equilibrium at each temperature\.  如果降温足够慢，固体可以在每个温度下达到热平衡；在优化里意味着在固定的 T 下反复采样足够多次之后，解会按玻尔兹曼分布停在各个状态上；T 缓慢降到 0 时，这个分布会逐渐集中到全局最优那一点。所以 SA 在理论上有概率收敛到全局最优（前提是降温足够慢）；但实践里足够慢意味着时间长得不可接受，所以工程上都是用它换一个足够好的解，而不是真等它收敛。

### 7\.3 SA 的算法框架

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjZhY2ZlZTg2NWNmZTBhY2M1ZWZiNDIwYTcyMTljYzBfZDYyZDNkNDllNDYzMzllN2ZlMjBmNmY0YjYyNjc3MDlfSUQ6NzY5MjM1NTY5Mzg5ODE0MTIxMV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Without loss of generality, minimization problem is assumed\. 

不失一般性，假定是最小化问题，意味着更好= 代价更小，$ f(s_i) < f(s) $就是新解更优解。

SA 的四步流程：

1. Generate neighboring solutions $s_i$ from S  

从 s 的邻域里生成邻近解 $s_i$；

2. Accept new solution if it is better in cost value, i\.e\., when f\(s\_i\) \< f\(s\)  

如果新解的代价更小，接受它；

3. Otherwise, make the decision whether or not to accept: Yes: Replace current solution with the new \(worse\) solution / No: Discard the new solution 

否则要做一个决定：接受（用这个更差的解替换当前解）或丢弃，SA 唯一能翻过山脊逃出局部最优的手段；

4. Probabilistic decision making based on: Difference between new and old cost values / Control parameter T

这个概率决定由两个量决定：新旧代价之差，以及控制参数 T。

### 7\.4 SA illustration

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Yzk2MzZlOWM0YmRmNTg0MmI3MmVkOTIxZGVkMDVlNDlfZWJlZjY0NmQ2MmM4NzMzODBkNGZkMTgyZjQ1OTEyMWJfSUQ6NzY5MjM1NTY5MjE0MjU2Mjg0M18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|图中标注|含义|
|---|---|
|HILL CLIMBING × 3|爬山法的轨迹：一条单调下降、然后平掉的曲线（陷入局部最优后不再改善）|
|AT INIT\_TEMP（初始温度）|SA 早期的行为：上下大幅抖动，差解被频繁接受|
|AT FINAL\_TEMP（终止温度）|SA 后期的行为：抖动收敛成一条单调下降线，形态与爬山法一致|
|Move accepted with probability = $ e^{(−(ΔC/temp))}$|以该概率接受更差移动，即 Metropolis 准则|
|Unconditional Acceptance（无条件接受）|更好的移动永远直接接受，不掷骰子|

在生成邻域解（neighborhood solution）时，可以随机生成一个邻近解，也可以系统性地生成邻近解，以确保整个邻域空间都被探索。SA 常用 Metropolis criterion 作为接受准则。

接受准则（Acceptance criterion）：若新解 s' 的 cost 不大于当前解 s，则直接接受：f\(s'\) ≤ f\(s\)；如果新解更差，即 f\(s'\) \> f\(s\)，则以如下概率接受该较差解：p = exp\( −\(f\(s'\) − f\(s\)\) / T \)。

7\.2 用的是能量版：p = exp\(−\(E\_j − E\_i\)/\(k\_B·T\)\)，分母里有玻尔兹曼常数 k\_B；

7\.4 用的是优化版：p = exp\(−\(f\(s'\) − f\(s\)\)/T\)，k\_B 被吸收进了 T。

两者等价，因为 k\_B 只是个常数，工程实现时常把它并到温度里统一调节。

其中 T 是当前温度。可以看到，当 T 较大时，即使 f\(s'\) − f\(s\) 较大，接受概率仍可能不低，因此算法更偏向随机搜索（exploration，探索）；当 T 逐渐降低时，接受差解的概率趋近于 0，算法更偏向爬山法（exploitation，开发）。也就是说，SA 前期通过偶尔接受坏解扩大搜索范围，后期通过降温逐渐收敛。

# Part 8 遗传算法 Genetic Algorithms

### 8\.1 GA Definition

A genetic algorithm is a search\-based algorithm based on natural selection, which can be used for solving AI optimization problems\.

遗传算法是一种基于自然选择的搜索型算法，可以用来求解 AI 优化问题。

|术语|课件原文|中文理解|
|---|---|---|
|Population 种群|This is a subset of all the probable solutions that can solve the given problem\.|能解决给定问题的全部可能解中的一个子集|
|Chromosomes 染色体|A chromosome/string is one of the solutions in the population\.|种群中的一个解，也叫串（string）|
|Gene 基因|This is an element in a chromosome\.|染色体里的一个元素（串上的一位）|
|Fitness function 适应度函数|This is a function that uses a specific input to produce an improved output\. The solution is used as the input while the output is in the form of solution suitability\.|以解为输入、以解的合适程度为输出的函数，它是 GA 判断好坏的唯一依据|
|Genetic operators 遗传算子|Genetic operators such as Selection, Crossover, Selection, are used for changing the genetic composition of chromosomes\.|用来改变染色体基因组成的操作，课件举的例子是选择与交叉|

### 8\.2 GA 的组成

A genetic algorithm repeatedly modifies a population of individual solutions\. At each step, the genetic algorithm selects individuals at random from the current population to be parents and uses them to produce the children for the next generation\. Over successive generations, the population "evolves" toward an optimal solution\.

GA 反复地改造一个由个体解构成的种群。每一步中，它从当前种群里随机挑个体当父母，用它们产生下一代的子女。经过一代又一代，种群会进化向一个最优解。

|算子|作用|
|---|---|
|选择 Selection|从当前种群挑出当父母的个体|
|交叉 Crossover / 重组 Recombination|把两个父母的基因片段交换，产生子女|
|变异 Mutation|随机改动个别基因|

重复与随机：repeatedly说明 GA 是迭代式的；selects individuals at random（随机挑选个体）说明选择并非确定性，适应度高的个体只是更可能被选中，不是一定被选中。这一层随机性就是 GA 能跳出局部最优的机制来源。

### 8\.3 A Simple Genetic Algorithm

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmJhOTMzM2VjMDRmMWI5ZjEyYmFlYjQ2NGVjZmE5ZTFfZTY5ZTIxMGU2NDY4NmUzZGFhNzkyNzUzYTY0ZmI1ZmJfSUQ6NzY5MjM1NTY5NDQzMDg4MzM1Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

1. 编码 Initial/random designs coded：把现实问题的方案，编码成染色体字符串。

2. 初始种群：生成一批随机候选解，附带各自适应度。

3. 解码 / 评估 / 仿真 Decoding / Evaluation / Simulation

    解码：字符串 → 还原回真实问题方案

    仿真计算，得到适应度分数

> 适应度评估一般在 GA 算法外部完成；仿真计算开销大，是 GA 主要算力消耗来源。
> 
> 

4. 选择 Selection：适应度越高，被选为父代的概率越大。

5. 交叉 Crossover：父代染色体片段交换，产生子代。

6. 变异 Mutation：随机修改某一处基因。

7. 新一代 New generation： 返回第 3 步评估，循环迭代。

8. 出口 Final optimized designs coded：迭代终止，输出编码形式的最优解。

交叉：`P₂: 4 0 0 3 0 | 1 6 1` 与 `P₃: 0 1 6 4 1 | 8 0 1`交换分割点后的尾巴得到两条子代。

变异：`P₂': 4 0 0 3 0 8 0 1` → `P₂'': 4 0 1 3 0 8 0 1`，第 3 位基因被修改。

### 8\.4 GA三步逐一演示

GA 的工程实现：GA 原生目标是**最大化适应度 fitness**；工程大多任务是最小化代价 cost，需要转换。

1. $\mathrm{fitness}=1/\mathrm{cost}$

2. $\mathrm{fitness}=C_\mathrm{max}-\mathrm{cost}$

3. $\mathrm{fitness}=\exp(-\mathrm{cost}/T)$

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjAwODI4ZTFiNWJkMmIzMTI2ZTNjMjUyYjAzMzBlNThfODIxN2E5NTZlZGU3Y2I2NjA3OTE0ZTllN2M2ODE1NjVfSUQ6NzY5MjM1NTY5MjE0MDg5MTY3NV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

初始种群：

$P_1: [1,2,0,9,0,2,1,7],\ f(P_1)=5\%$

$P_2: [4,0,0,3,0,1,6,1],\ f(P_2)=60\%$

$P_3: [0,1,6,4,1,8,0,1],\ f(P_3)=35\%$

1. 繁殖 Reproduction（选择）：按照适应度分配后代数量。$P_1$后代少，$P_2$生 2 个、$P_3$生 1 个。

> 仅选择：不改动染色体基因，不需要重新算适应度。
> 
> 

2. 交叉 Crossover：随机选分割点，交换父代片段。

> 交叉只重组已经存在的基因，不会创造全新基因；不需要算适应度。
> 
> 

3. 变异 Mutation：随机翻转 / 修改部分基因。唯一可以生成种群原本不存在的新基因。

> 变异后得到全新子代，进入下一轮循环必须重新评估适应度。
> 
> 

交叉只是重组已有的基因（不引入新基因），而变异引入了搜索空间里原本不存在的新基因。从评估预算角度看，这两步的成本是一样的（都产生新串）

### 8\.5 Basic Operations of a Simple GA：简单 GA 的基本算法



![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTMzMDAyOTllZWYyN2Q1MGRhMTdjMjhkMzk5N2JlYmFfMjgzNzI0Mzk3YWQ3MDgzZmMxMDNlYWExNTBhNWY5MGRfSUQ6NzY5MjM1NTY5NDQzMDg2Njk3Ml8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|步骤|作用|属于|
|---|---|---|
|Make initial population|生成初始种群|只做一次|
|Evaluate the fitness of all initial chromosomes|给初始种群整体打分|只做一次|
|Reproduce children from parents \(selection\)|按适应度选父母、产下一代|每代循环|
|Apply crossover to some chromosomes|对一部分染色体做交叉|每代循环|
|Apply mutation to some chromosomes|对一部分染色体做变异|每代循环|
|Preserve some elite individuals|保留若干精英个体|每代循环|
|Decode the best chromosome found|解码最优染色体|只在最后|

Tips：交叉、变异**不是对全部个体生效**。

交叉：较高概率，0\.6‑0\.9，成对操作；变异：每个基因很小概率，典型值 0\.02； 这两个概率是 GA 最重要调参旋钮。

### 8\.6 Details of Genetic Algorithms

Constant population size = n：**种群大小 n 全程固定不变。**资源受限的竞争：任何个体的加入，都意味着有另一个个体被挤出。而梯度下降只有一个点，无所谓竞争；GA 有一群点，并且每代都在做谁留下、谁出局的淘汰。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGQ4ODk1YTM0YzVlMjNjMDcwNGNlMzFiOWExZGNmZTlfOTZlYzIxMjA2ODJlOThiODM5ZGRlYjdhODAwOTNlZDBfSUQ6NzY5MjM1NTY5MjE0MDg1ODkwN18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

层级从上到下：

1. 种群 Population：一共 n 个个体，总数恒定 n。

2. 个体 / 染色体 Chromosome：共 n 条，每条附带自己适应度$f_i$。

3. 基因 Gene：每条染色体基因长度全部相等。

种群规模固定意味着：**每新增一个个体，就要淘汰另一个个体**，是资源竞争淘汰机制。 对比梯度下降，梯度下降只有单个搜索点，不存在竞争淘汰。

Constant population size = n 这条约束：种群规模在演化过程中保持不变。这带来一个必须被显式处理的后果，选择时必须填满 n 个名额（谁多生、谁不生、谁被淘汰，要凑够整数），这也正是用精英替换最差的 10% 子女这种做法能成立的前提：替换而不是增殖，所以总数不变。

### 8\.7 Designing a Representation

We have to come up with a method of representing an individual as a genotype\. When choosing a representation, we have to bear in mind how genotypes will be evaluated and what genetic operators might be\. 我们必须想出一种把个体表示成基因型的方法。选择表示法时，必须同时考虑两件事：基因型将如何被评估，以及遗传算子会是什么。

核心思想：表示形式决定算子怎么写，不同编码，交叉、变异实现完全不一样。

两条设计原则：

1. 需要把实际问题解表达成基因型（染色体串）。

2. 设计编码的时候，同时要想好两件事：怎么评估这个基因型、遗传算子如何实现。

|设计维度|选项|影响|
|---|---|---|
|基因的取值类型|binary, decimal, real, order\-based?（二进制 / 十进制 / 实数 / 基于次序）|决定变异怎么写|
|问题的性质|numerical or combinatorial?（数值型 / 组合型）|决定交叉怎么写|
|基因的最小单位|Bit or Binary number（位 或 二进制数）|决定串长与精度|

举例不同编码对应的变异实现

1. 二进制编码变异：比特位取反。

2. 基于次序编码（TSP 旅行商）变异：随机交换两个基因。不能简单改数字，否则出现重复城市。

3. 树形编码变异：随机替换树内部某个节点。

> 硬性约束：交叉、变异操作结束，**必须产出合法的染色体解**。
> 
> 

### 8\.8 基因型到表现型：二进制整数编码

$1\cdot 2^7+0\cdot2^6 +1\cdot2^5+0\cdot2^4+0\cdot2^3+0\cdot2^2+1\cdot2^1+1\cdot2^0 =128+32+2+1 =163$

8 位二进制串 10100011 按权展开求和得到 163，于是基因型 10100011 对应表现型整数 163。

课件把这两个概念并排写成一张对照表：图上标 8 bits（8 位），左边是 Genotype（基因型：编码字符串）、右边是 Phenotype（表现型：现实世界真实数值）。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWI0YTk0Y2QxODJlZTE4MTRjOGQ1ZDg3MzJhZDc1MmRfOTk3ZDNmMGViMmNkMzhkMTFkODQzNzc3Mzk5ZWMyM2JfSUQ6NzY5MjM1NTY5NDAxOTg0MTU2MF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

What if we have 10 parameters? How many bits in total? 

如果有 10 个参数呢？总共需要多少位？若每个参数都用 8 位精度，则总串长 10 × 8 = 80 位。

GA 的搜索空间随参数个数指数增长，1 个参数是 2⁸ = 256 种组合，10 个参数搜索空间大小就是 2⁸⁰ ≈ 1\.2 × 10²⁴ 种指数爆炸，**无法穷举全部组合**。

### 8\.9 二进制映射实数

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmY5ZmVhMTNjZGFjMTI2Y2I4NDVjNGMyZGUwMGQzODdfOTk1NjkyODhhZWJiM2FlN2JmOTRjY2QwMjIzNTAzMmFfSUQ6NzY5MjM1NTY5NDQzMDkxNjEyNF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

当表现型是实数时，例如用 8 位二进制表示区间 \[2\.5, 20\.5\] 上的一个数，则按线性映射把基因型的整数值163 折算成实数 x。把整数基因型线性映射到实数区间 $[2.5,20.5]$，区间跨度 $20.5-2.5=18$。

$x = 2.5 + \frac{163}{255}\times 18=13.9609$

分母 255：保证全 1 严格等于区间上界 20\.5；

分母 256：简单工程实现，但最大值达不到区间上界。

### 8\.10 Mutation Operators：变异算子

变异的核心设定：变异通常以很小的概率 $p_m$ 发生，例如每个基因 0\.02。

Mutation usually happens with small probability $p_m $\(e\.g\., 0\.02\) for each gene\.

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTM0NDUzOGRmZjg0ZDBiNWRjMzQyMjFkOTllM2VkNjNfZjI5OTBkYmMxMWMzMjk2NDE0NWY3ZmExMTNhYTI0ODBfSUQ6NzY5MjM1NTY5Mzg5ODE3Mzk3OV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

变异的三个条件：

1. At least one mutation operator should allow every part of the search space to be reached\.  至少要有一个变异算子，能让搜索空间的每一个部分都被抵达。没有变异，种群里的基因材料只会被重新组合，永远造不出初始种群没有的基因；搜索会退化成一个封闭的组合游戏。

2. The size of mutation is important and should be controllable\.  变异的幅度应当可控。幅度太大等于随机重启（丢掉父辈的全部信息），太小则形同没变，所以必须可调。

3. Mutation should produce valid chromosomes\. 变异必须产生合法的染色体。例如基于次序的表示里每个城市必须恰好出现一次，变异绝不能造出重复或缺失的城市。

Is mutation critical in GA?  变异在 GA 里是必需的吗？

是，交叉只能重组已有的基因（selection 与 crossover 都不产生新基因），因此变异是 GA 唯一的新基因来源，也是三条要求里第一条（every part of the search space to be reached）的直接依据。交叉负责开发（exploitation，用好现有材料），变异负责探索（exploration，去没去过的地方）。

表示法决定算子：同一个变异操作，在不同表示法下是完全不同的代码：

1. 二进制表示：把某一位取反

例：（1 1 1 1 1 1 1 → 1 1 1 0 1 1 1）；

2. 基于次序的表示（order\-based representation）：随机交换两个基因。交换两个基因会让同一个位置上出现重复取值。所以条件三才会专门强调 Crossover should produce valid chromosomes（交叉必须产生合法染色体）。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGNkZjE3M2ZhYWU2ZTNkNTZkYmI4Y2Y3MTNjNGNkNTFfYzcxNWFlZjQxY2E4N2FhMTU0Y2YyNjcxNDI3ZTYyN2RfSUQ6NzY5MjM1NTY5MjE0MjUzMDA3NV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OGJmNTU3YjJmYjAyYTNkMTlhZTU1ZjA3YzIxOTc5YzBfM2Y5N2M4MWJmMjFkNWU4YjIzNDU1Y2Q3N2FiNTVmYmJfSUQ6NzY5MjM1NTY5Mzg5ODI1NTg5OV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

例：（7 8 3 4 1 2 6 5 → 7 8 3 4 6 2 1 5）；

3. 树形表示：变异 = 随机把一个节点替换成另一个节点。

### 8\.11 交叉算子 

交叉（Crossover）：拿两个父代个体，交换基因片段来生成新子代，核心是混合两份父代的特征。 

交叉的两个条件：

1. The child should inherit something from each parent\. If this is not the case, then the operator is a mutation operator\. 子代必须同时继承来自两个父代的基因。如果子代完全只抄其中一方，这不叫交叉，本质等同于变异。

2. Crossover should produce valid chromosomes\. 交叉产生出来的子代染色体，必须是**合法有效的解**。

单点交叉：交换连续一大截基因。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDkwNzMyOWMzMjI5MmZhMmE4OTFkMjZhN2Y5YTM3YWJfMjViM2Q2NzFmNWY4ODEwNDZhYjc1YjVkYjY2YjBlYjBfSUQ6NzY5MjM1NTY5MjE0MDkyNDQ0M18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

把两条染色体，随机选一个切割位置，互相交换切割点**后面的一整段基因**。

退化情况：如果切割点在**最左端**：子代直接完整复制另一个父代，没有混合双方信息。如果切割点在**最右端**：子代和原来父代一模一样，没有产生任何新组合。 这两种不算有效交叉，代码实现时要重新随机选切割点。

均匀交叉：每一位都可以独立选择来源，基因打散重组更充分。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGJjNGNmMGVjZmYwMDA3Y2U0YzJiZDhjOWZhYjZhNzFfMDQ1NDdhZWIyNDM4MDdjMTk3YWJmZDkzN2I5OWFmZmFfSUQ6NzY5MjM1NTY5MjE0MDg3NTI5MV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

不再切一整块；生成一条和染色体长度一样的**掩码序列**，掩码每一位决定这一位基因取自哪个父代。

掩码 =0 → 该位置基因拿父代1

掩码 =1 → 该位置基因拿父代2

第3、5、8位是 1，取父代2的C、E、H；剩下位置取父代1。子代2会反过来，掩码0取父代2、掩码1取父代1。

缺点：单点交叉和均匀交叉都很容易把已经搭配得很好的一长串优良基因组合给拆碎。

基于次序表示的重组（用于TSP旅行商这类排列问题）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGU3YmU0NDhiMjBkNTI0MjU4MWU5ZTZjYTU5ODM5YmZfZjJjODIwNzY5YzdiZmM2YTY1ZTY2ZTZiMzkzNTNjNmVfSUQ6NzY5MjM1NTY5MjE0MjYyODM3OV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

场景：染色体代表访问城市的顺序，每个数字（城市）只能恰好出现一次。 普通单点/均匀交叉会造出重复城市、丢失城市，直接变成非法解。所以要用专门的次序重组逻辑。

执行步骤：

1. 在父代1上，截取一段连续基因片段，直接原样保留放到子代对应位置。

2. 剩下空出来的位置：从**父代2**拿基因，但跳过已经被截取片段里出现过的基因。

3. 填充顺序：从截取片段的切点往后填，填到染色体末尾就绕回最开头。

4. 两个父代互换角色，再生成第二个子代。

### 8\.12 选择策略 Selection Strategy

核心设计思想有两点：

> We want to have some way to ensure that better individuals have a better chance of being parents than less good individuals\. This will give us selection pressure which will drive the population forward\. We have to be careful to give less good individuals at least some chance of being parents – since they may include some useful genetic material\. The most commonly used selection methods include Roulette Wheel Selection, Rank Selection, Tournament Selection etc\.
> 
> 

1. 质量好的个体，有更大机会被选为父代。由此产生选择压力，驱动种群不断往更优的方向演化。

2. 但不能完全淘汰掉差的个体。就算表现差，它身上也可能藏有有价值的基因；要给它保留一点点被选中的可能性，避免基因多样性彻底消失。最常用的选择方法有：轮盘赌选择、排名选择、锦标赛选择等。

选择的核心目的：从当前种群里挑选个体当父代，用来做交叉、变异产生下一代。

|方法|怎么选|特点|
|---|---|---|
|轮盘赌 Roulette Wheel|按适应度占比分配被选概率（本页下一页的算例）|直观，但适应度差异大时会过早收敛|
|排名 Rank|按适应度的排名而非数值分配概率|抗超级个体适应度再大也只按名次算|
|锦标赛 Tournament|随机抽 k 个个体，取其中最优秀的|实现简单、参数少，最常用|

轮盘赌选择的两大缺陷

$P(x_i)=\frac{f_i}{\sum f_i}$ 

个体被选中概率和自身适应度**数值大小直接成正比**，想象一个轮盘，适应度越高占的扇区面积越大。

1. **早熟收敛 premature convergence** 如果出现一个适应度遥遥领先的“超级个体”，它被选中的概率会极高。几代之内种群大部分都变成它的后代，种群多样性直接丢失，算法卡在局部最优出不来。

2. **选择压力不足** 如果种群里面所有个体适应度都差不多，那大家被抽中的概率几乎一样。选父代接近随机抽签，演化几乎变成随机游走，很难向着好解推进。

为什么需要排名选择？ 排名选择扔掉原始适应度的绝对数值，只用排序名次。 哪怕某一个个体适应度爆炸式高，它也只能拿到第一名对应的概率，不会一家独大。既保留优胜者优先被选的机制，又规避超级个体垄断种群的风险。除了换排名选择，精英保留（8\.13）也是缓解这类问题的常用手段。

### 8\.13 精英保留 Elitism

Re\-introduce in the population previous best\-so\-far \(elitism\)\. For example, keep the best 10% of the parent population and re\-introduce them to the next generation by replacing the worst 10% child population\.

把算法运行到现在为止，历史表现最好的一批个体，重新放回下一代种群。例如，保留父代中最好的 10%，用它们替换掉子代中最差的 10%，从而进入下一代。

Example of a convergence trace（收敛轨迹示例）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjQ0ZTdkNjQ0OGVhOTA1MTI4NmE0OTYwODMyOGFjNWRfZTg3Y2QwMmNkZWJiNmU3ZmJlZjllMjVjYjhlNmI2ZTNfSUQ6NzY5MjM1NTY5NDQzMDg5OTc0MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|无精英保留|开启精英保留|
|---|---|
|之前找到的优秀解，可能被交叉变异破坏、直接丢失；最优适应度曲线上下震荡波动|历史最优个体一定会被保存。最优适应度曲线单调不降，呈现阶梯上升，很容易观察算法有没有继续进步。|

精英保留：只做保底。不会产生任何新基因、不会探索新区域，只管守住已经找到的好结果。

变异Mutation：负责探索，制造之前种群没有的新基因。 两者各司其职，不能互相替代。

### 8\.14 Stopping Criterion：停止准则

三条停止条件：

1. The optimum is reached\. 已经达到最优（基本不存在）

2. Limit on CPU resources: maximum number of fitness evaluations\. 计算资源上限：适应度评估的最大次数。

3. Limit on the patience: after some generations without improvement\. 耐心上限：连续若干代没有改善之后就停。

三条实验纪律：

1. Never draw any conclusion from a single run\.  不能只跑一次 GA 就下结论。

2. Use statistical measures \(e\.g\., average, standard deviation\)\.  报告统计指标：平均值、标准差，还可以补充最优、最差、中位数，再配上收敛曲线（最优值随迭代代数变化）。

3. Obtain results from a number of independent runs\.  必须跑多次独立重复实验。原因：GA 有大量随机性，初始种群是随机生成。单次运行结果有偶然性，一次跑的好不代表算法本身强。

### 8\.15 GA 的优点与局限

#### 8\.15\.1 优点

1. 不需要导数信息 梯度下降要求目标函数可微分才能更新参数。GA 不用求导，只要能算出适应度就行。

> 这是 GA 最大优势，特别适合组合优化问题，例如路径规划、排班，这类问题根本求不出导数。
> 
> 

2. 适配多种优化任务 不管是连续数值问题、离散问题，还是多目标优化都可以处理，适用面广。

3. 天然适合并行计算 一个种群里面有很多个体，每个个体算适应度互相之间互不干扰，可以同时跑。

> 如果适应度是仿真模拟，并行可以大幅节省运行时间，工程仿真场景很喜欢用 GA。
> 
> 

4. 结果随迭代持续变好 随着一代代演化，通常能够不断得到质量更高的候选解。

#### 8\.15\.2 局限

1. 简单可微问题效率低 如果目标函数光滑可求导，梯度下降收敛速度远快于 GA。GA 不是万能算法，它是梯度方法的备选方案，而不是替代品。

2. 不能保证得到全局最优解 如果参数、算子设置不合理，很容易卡在局部最优。就算调得很好，也没有理论保证一定找到全局最优。

> 在搜索空间巨大、没办法全部穷举的场景，GA 目标是有限算力下拿到 “足够好用的解”，不等于一定拿到理论上最好的解。
> 
> 

3. 适应度计算开销巨大 每一代所有个体都要计算适应度。如果适应度需要跑仿真、复杂模拟，算力消耗会非常高。

4. 实现细节影响结果 编码方式、交叉变异概率、选择策略、精英保留这些配置一旦设置错，最终结果会很差。

|优点 / 局限|呼应|
|---|---|
|不需要导数 |直接绕过了梯度下降必须可微这一条，这是 GA 能被用在组合优化（排班、路径、选型）上的根本原因|
|能处理离散与多目标 |适应度函数只需能算，不需要连续、不需要可微|
|并行能力极佳 |因为一整代个体彼此独立，可以并行评估，这是 GA 在工程仿真场景里特别受欢迎的原因|
|不保证最终解质量 |在无法穷举的空间里，没有任何方法能保证最优；GA 只是在有限预算内给出一个足够好的解|
|反复算适应度有计算挑战 |一次适应度评估可能就是一次完整的工程仿真|
|简单问题上效率不高 |简单问题（尤其可微的连续问题）应当直接用梯度方法；GA 是没有梯度可用时的备选，不是万能替代|

BFS / DFS（无信息、完备但昂贵）→ 爬山法、最佳优先与 A\* 算法（引入启发式）→ 模拟退火（用概率接受差解，逃出局部最优）→ 遗传算法（用种群与算子，在无法穷举的空间里做有方向的随机搜索）。

四类方法的共同骨架：猜一个解 → 用某个函数评价它 → 按某个规则改成新解 → 重复；区别只在怎么改与怎么评价。

## Part 9  Tutorial 2

### 9\.1 Exercise 1：广度优先搜索

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTIzNjE3ODVlN2RiYTUxNTlkMDIwY2E5MTQxOWFlODlfZTViNjRiNDlkMWM1OWZiZDg0NGQ4OTUxNGY3MGY2MjdfSUQ6NzY5MjM1NTY5MjE0MjQ4MDkyM18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NGZiN2VjMzRjYmU1NjQyZmVjNjljZWM0OTJiZDBjNzZfNGEwYjg4NjdkNDJhOGM2MzEwYTVlZGE5NWQxNGM5N2NfSUQ6NzY5MjM1NTY5MDc0MDAxMDUyNF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Given the problem\-solution graph in Figure 1, perform a breadth\-first search starting from the initial state A and ending in the goal state F\. If there are two or more nodes of the same preference, then handle the nodes alphabetically\.

给定 Figure 1 的问题—解图，从初始状态 A 出发、到目标状态 F 为止，执行一次广度优先搜索。若出现两个或以上优先级相同的节点，则按字母顺序处理。

按同层按字母升序的规则，BFS 逐层展开如下：

|步|展开|open（队列）|closed|
|---|---|---|---|
|1|A|\[B, C, D\]|\[A\]|
|2|B|\[C, D\]|\[A, B\]|
|3|C|\[D, E\]|\[A, B, C\]|
|4|D|\[E, F\]|\[A, B, C, D\]|
|5|E|\[F\]|\[A, B, C, D, E\]|
|6|F|—|—|

全部展开后才找到：A → B → C → D → E → F

### 9\.2 Exercise 2：深度优先搜索 

Given the problem\-solution graph in Figure 1, perform a depth\-first search starting from the initial state A and ending in the goal state F\. If there are two or more nodes of the same preference, then handle the nodes in descending \(rather than ascending\) alphabetical order\.

同样的 Figure 1，从 A 出发、到 F 为止，执行一次深度优先搜索。但这次优先级相同的节点改为按字母降序（而不是升序）处理。Exercise 2 与 Exercise 1 的区别就是descending \(rather than ascending\) ，升序改正降序

按同层按字母降序的规则：

|步|展开|孩子按降序|选择|open（栈）|
|---|---|---|---|---|
|1|A|D \> C \> B|选 D|\[B, C, D\]（D 在栈顶）|
|2|D|F \> E|选 F|\[B, C, E, F\]（F 在栈顶）|
|3|F|—|F 就是目标 → 结束|—|

解路径为 A → D → F，只用了 2 条边，因为降序规则恰好把搜索直接指向了最深处的目标 F。

### 9\.3 Exercise 3：四皇后问题的爬山法

The 4 queens problem consists of a 4 x 4 chessboard with 4 queens\. The goal is to place the 4 queens on the chessboard such that no two queens can attack each other\. Each queen attacks anything in the same row, in the same column, or in the same diagonal\.

在 4×4 棋盘放 4 个皇后。

规则：皇后可以攻击同一行、同一列、同一斜线上的其他皇后。要求任意两个皇后之间不能互相攻击。

好处：直接彻底消除同列冲突，不用再检查列；只需要判断同行、对角线斜线冲突。

表达方式：用数组 $[x_0,x_1,x_2,x_3]$。$x_i$ 代表第i列的皇后所在行号。

邻域操作：交换两列对应的行号。交换之后依旧保持每列 1 个皇后，不会产出非法解。

代价函数 cost

统计互相攻击的皇后对的数量。4 个皇后，两两组合一共 $\mathrm{C}_4^2=6$ 对。 对第i列、第j列的皇后（$i<j$，行号$x_i,x_j$）： 发生攻击，满足下面任意一条：

1. 同行：$x_i = x_j$

2. 斜线：$|x_i-x_j| = |i-j|$

> cost = 冲突的皇后对数。 cost = 0 代表完全没有冲突，就是问题的解。
> 
> 

并列候选的抉择规则

当多个邻居的代价 cost 一样好时： 优先选择被交换的两列下标数字最小的那一对。 例：可以交换$(x_0,x_1)$，也可以交换$(x_2,x_3)$，选$(x_0,x_1)$。

爬山法逻辑

1. 当前状态，把所有邻域（全部两列交换）全部枚举，算出每个邻居 cost。

2. 挑选代价最小的邻居作为下一步状态；多个一样优，就用上面下标最小规则破平局。

3. 重复，直到：所有邻居都不能比当前更好；或者直接达到`cost=0`（不可能再优化），算法终止。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzdmZmM2NzYzNzA4NWYzY2RkZTJhNWQyMDEyYzExNzVfMjQyZjNmMmM0ZGI0MzdjNGMxZjVmYWQxYmEyZjczMTVfSUQ6NzY5MjM1NTY5NDQzMDg1MDU4OF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OThiMzJhZjQwZTZmODk0NDdjNzFkYmVhZDcwY2M5NDRfNGUwZTZiZTcxYTZhOWUzNDk3MjZiMmY0ODNjODdjZWFfSUQ6NzY5MjM1NTY5NDAxOTg1Nzk0NF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjhlM2RkZjhjZWRkM2M2YmY3NjhjMGVlZjE1NzhjMDNfZTRkZGZkY2M1MDQ1NDc0YjE0M2U1YTUyY2VhNWJkOWVfSUQ6NzY5MjM1NTY5MjE0MjYxMTk5NV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mzc2OGUxMzNhNzA3Yjg4OGQyMWE2OWE2MGY3ZWZjOTFfNWE4OTI0YzZjMWU2NjUxMDIzMzUyYzMyMTE5MTQ4NDZfSUQ6NzY5MjM1NTY5NDQzMDk2NTI3Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

完整爬山执行步骤

初始状态：$[3,1,2,0]$，初始 cost=2 含义：第 0 列皇后在 3 行；第 1 列在 1 行；第 2 列在 2 行；第 3 列在 0 行。

第一轮：初始状态生成全部邻居

|序号|交换的列对|新状态 \(x₀, x₁, x₂, x₃\)|cost|
|---|---|---|---|
|1|\(x₀, x₁\)|\(1, 3, 2, 0\)|1|
|2|\(x₀, x₂\)|\(2, 1, 3, 0\)|1|
|3|\(x₀, x₃\)|\(0, 1, 2, 3\)|6|
|4|\(x₁, x₂\)|\(3, 2, 1, 0\)|6|
|5|\(x₁, x₃\)|\(3, 0, 2, 1\)|1|
|6|\(x₂, x₃\)|\(3, 1, 0, 2\)|1|
|初始|（基准）|\(3, 1, 2, 0\)|2|

最优代价是 cost=1，一共有 4 个邻居同时达到。看交换下标：$(x_0,x_1)$下标最小，所以下一步跳到状态 $[1,3,2,0]$。

第二轮，以$[1,3,2,0]$作为当前状态，再枚举全部邻居

|序号|交换的列对|新状态 \(x₀, x₁, x₂, x₃\)|cost|
|---|---|---|---|
|1|\(x₀, x₁\)|\(3, 1, 2, 0\)|2|
|2|\(x₀, x₂\)|\(2, 3, 1, 0\)|2|
|3|\(x₀, x₃\)|\(0, 3, 2, 1\)|4|
|4|\(x₁, x₂\)|\(1, 2, 3, 0\)|4|
|5|\(x₁, x₃\)|\(1, 0, 2, 3\)|2|
|6|\(x₂, x₃\)|\(1, 3, 0, 2\)|0 ← 目标！|
|当前|（基准）|\(1, 3, 2, 0\)|1|

出现 cost=0，已经完全没有冲突，得到四皇后的合法解。 cost 最小只能等于 0，不可能继续优化，爬山算法直接终止。最终解：$[1,3,0,2]$

### 9\.4 Exercise 4：A\* 算法

Perform the A\* Algorithm on the following graph\. Explicitly write down the queue at each step, where the red figure means the heuristic value, and the black figure is the path cost\.

在给定图上执行 A\* 算法，并显式写出每一步的队列；图上红色数字是启发值 h，黑色数字是路径代价 g。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mzk4ZTExMjM0MmU4NzI2NGE3N2EwZTRjNDY3N2MxYWVfYjE5ZDZmNzRmNWYyOTBiMDhhM2FlYzVjYzA0NjE2NDdfSUQ6NzY5MjM1NTY5MjE0MjU0NjQ1OV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDMzN2Y4MGUwNGU2NjhjMzc2MTA5MjRmZDBhNGIzOTVfZDRiODBjZmNiNmFiYTY5YTM5MzkxOWQ2NmRjYjU2NTRfSUQ6NzY5MjM1NTY5MjE0MjQ5NzMwN18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|i|c（展开谁）|open\_list|close\_list|本步发生了什么|
|---|---|---|---|---|
|0|—|\[S\]|\[ \]|初始化：open\_list\.append\(start\)|
|1|S|\[A, B, C\]|\[S\]|展开 S → 加入 A、B、C|
|2|C|\[A, B, D\]|\[S, C\]|f 最小者为 C（14）→ 加入 D|
|3|A|\[E, B, D\]|\[S, C, A\]|f 最小者为 A（16）→ 加入 E|
|4|E|\[B, D, F\]|\[S, C, A, E\]|f 最小者为 E（16）→ 加入 F|
|5|F|\[B, D, G\]|\[S, C, A, E, F\]|f 最小者为 F（17）→ 加入 G|
|6|D|\[B, G\]|\[S, C, A, E, F, D\]|f 最小者为 D（18，与 B 并列，课件取 D）；D → F 无改进|
|7|B|\[G, D, E\]|\[S, C, A, F, B\]|展开 B → E（f 降到 15）与 D（f 降到 14）被重开，从 close\_list 移出|
|8|D|\[G, E\]|\[S, C, A, F, B, D\]|f 最小者为 D（14） → 重新展开；D → F 仍无改进|
|9|E|\[G, F\]|\[S, C, A, B, D, E\]|f 最小者为 E（15） → E → F 使 F（f 降到 16）被重开|
|10|F|\[G\]|\[S, C, A, B, D, E, F\]|f 最小者为 F（16） → F → G 使 G 的 f 降到 18|
|11|G|—|—|current\_node == end → return，算法结束|

# Lecture 3

## part 1 Search\&Optimization Recap 搜索优化回顾

### 1\.1 Search

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjE5NzlkMmNjYzAxYjc3NzdjYmNmYzdkYTA3NGI0MDJfZGJhMjY5ZjIwOWI2NzI2NzdjMzk0NmQxNTg2ZTA2ZWJfSUQ6NzY4OTMzMzQwNDI3NzY0MDczNl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

**Search 搜索**：Agent（智能体）能够构造**动作序列**以达成其目标。

*The agent can construct sequences of actions that achieve its goals\.*

**Uninformed \(blind\) search 无信息（盲目）搜索**：除初始状态、搜索算子与解的测试外，不使用任何其他信息。*Uses no information other than the initial state, the search operator, and a test for a solution\.*

**Informed search 有信息搜索**：可访问启发函数 h\(n\)，用来估计从 n 到解的成本。*Has access to a heuristic function h\(n\) that estimates the cost of a solution from n\.*

|**算法    **<br>**Algorithm**|**展开准则    **<br>**Expansion Criterion**|**公式    **<br>**Formula**|
|---|---|---|
|Greedy Best\-First Search  <br>贪婪最佳优先|展开  h\(n\)  最小的节点|f\(n\) = h\(n\)|
|A\* Search|展开  f\(n\)  最小的节点|f\(n\) = g\(n\) \+ h\(n\)|

其中 g\(n\) = 从起点到 n 的实际成本，h\(n\) = 从 n 到目标的估计成本。

A\* 在 h 满足可采纳性（admissible）与一致性（consistent）时最优。

### 1\.2 Optimization

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDg1MzU3MTc2NWM3ZjIzNGNjMDFkZDFlMTdkNzBkMjdfMGYxNmQ5OTliZDk2ZDJiMDBlMTEyODc4NDlmNGZjYWRfSUQ6NzY4OTMzMzQzMTEwODYxOTgwMl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

**Optimization 优化**：通过**最小化成本函数**或**最大化适应度函数**，从一组候选中找出最佳解。*Finding the best solution from a set of candidates by minimizing a cost function or maximizing a fitness function\.*

**Simulated Annealing \(SA\) 模拟退火**：以**概率方式接受更差的动作**。概率取决于成本差 ΔE 与温度 T：**高温探索（explore）、低温利用（exploit）**，从而跳出局部极小。*Accepts worse moves probabilistically; high T explores, low T exploits\. It escapes local minima\.*

**Genetic Algorithms \(GA\) 遗传算法**：维持一个**种群**，通过**选择（selection）、交叉（crossover）、变异（mutation）**逐代进化出更好的解。*Maintain a population of solutions and apply selection, crossover, and mutation to evolve better solutions over generations\.*

**Schema Theorem 模式定理**：**定义长度短、阶数低、适应度高于平均**的模式（schema）获得指数级增长的试验次数，这些是搜索的**积木块（building blocks）**。*Short defining length, low order, above\-average schemata receive exponentially increasing trials\.*

## part 2** **Evolutionary Algorithms 进化算法

### 2\.1 Definition and Origin

EAs are **population\-based **search approaches that are inspired by the principles of natural selection and genetics\.

一类基于种群的搜索方法，其灵感来源于自然选择与遗传学原理。

|**Era**|**Milestone**|**Who / What**|
|---|---|---|
|1950|Alan Turing  提出用自然进化构建智能机器|*“Computing machinery and intelligence”, Mind 49: 433\-460, 1950\.* 进化驱动生物系统的适应、多样性与创新。|
|1960s <br>  Sprouting Period  萌芽期|Alexander Fraser  尝试模拟遗传系统并研究其进化动力学|Evolutionary Programming  思想萌芽|
|1980s / 1970s|**Genetic Algorithm 遗传算法**|John Holland  提出模拟自然进化过程来求解优化问题|
|1990s|**Particle Swarm Optimization 粒子群优化**|James Kennedy  （社会心理学家）  \& Russell Eberhart  （电气工程师）提出，模拟   **鸟群飞行行为**   求解优化问题（  1995  ）|
|1990s|**Genetic Programming 遗传编程**|John Koza  提出用遗传算法   **进化计算机程序代码**|
|1990s–2000s|**Neuroevolution 神经进化**|Kenneth Stanley \& Risto Miikkulainen  提出   **NEAT**   （  NeuroEvolution of Augmenting Topologies  ）算法|
|2016 <br> Applications in the New Era|Uber \& OpenAI  展示进化计算的强大能力|EC  进入新世代工业应用|
|Now  至今|ETO / NAS  等前沿方向持续发展|与深度学习、迁移学习融合|

### 2\.2 The Four\-Step Loop

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDE1NzI5YmUzNmZiYzQzMjFmYmUzMzk3ZDM1Mjg4ZjFfNzJjNWRkOWFjMjFhNjc3MWJhYjBiYmM0NTBhNmFjMjZfSUQ6NzY4OTM4NTQ1NTA0OTYyNTExNF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**Step**|**Operation**|**Description**|
|---|---|---|
|1|**Initial population** 初始种群|从一个初始种群（一组候选解）开始 <br> Start with an initial population|
|2|**Evaluation \& Selection** 评估与选择|评估并选择出更适应的个体 Evaluations and selection performed to identify fitter individuals|
|3|**Crossover \& Mutation** 交叉与变异|通过交叉和变异进行繁殖（  reproduction  ）   <br> Crossover and mutation carried out for reproduction|
|4|**Iterate** 迭代|迭代进化直到满足停止准则 <br> Iteratively evolves until stopping criteria are satisfied|

### 2\.3 Three Advantages

EA 的种群移动趋势本身携带**可跨问题迁移的信息**，可以用来引导搜索走向有希望的最优区域。*The population movement patterns carry transferable cross\-problem information to guide the search towards promising optimal regions\.*

特点：

1. **Strong global search capability 强大的全局搜索能力**

不依赖梯度，适合黑盒问题；

2. **Easy to implement 易于实现**

优化逻辑简单：初始化 → 评估 → 选择 → 交叉变异 → 迭代，易于实现；

3. **Self\-adaptation and self\-learning 自适应与自学习**

**过程信息可复用：**一次搜索中往哪里走更好的经验，可以被搬到同类问题上（Part 7 ETO范式）。

## Part 3 Particle Swarm Optimization

### 3\.1 Core Idea

PSO is a robust stochastic optimization technique based on the movement and intelligence of swarms\.

PSO 是一种鲁棒的随机优化技术，基于群体的运动与智能

PSO 将社会交互（social interaction）的概念应用于问题求解。

|**术语    Term**|**含义    Meaning**|
|---|---|
|Swarm 群体|由多个particles（粒子）构成，在搜索空间中移动寻找最优解。|
|Particle 粒子|N  维空间中的一个点，依据自身飞行经验与其他粒子的飞行经验调整其飞行。|
|pbest 个体最佳|该粒子自身迄今到达过的最佳位置（ personal best  ）。   <br> The best solution achieved so far by that particle\.|
|gbest 全局最佳|该粒子邻域内任意粒子迄今取得的最佳值（ global best ）。   <br> The best value obtained so far by any particle in the neighborhood\.|

The basic concept of PSO lies in accelerating each particle toward its p\-best and g\-best locations, with a random weighted acceleration at each time step\.

PSO 的基本原理：在每一时间步，以随机加权加速度将每个粒子朝其 pbest 与 gbest 位置加速。

### 3\.2 Update Equation

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDlkODVjOTg5ZDc0ODRkZTVmMDYxOGIyOGEyY2MxOTVfM2E4ZTc2YmEyZDFjMzY1NzBmNWQyMjc5NWM1MmZkZmNfSUQ6NzY4OTM4OTQ0OTEwNDgyMTc4OF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGVhMDk0ZTM2NjE0ZTZmM2IwYTI0MjVkZDljZWJiMjhfYmM1YmEyYWExNjgxODkyZTJjZDA0YTE4ZGJlODk5NzhfSUQ6NzY4OTM4OTU0NDc3MjgzMjc5Ml8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

$Vid = w · Vid + c1 · Rand() · (pid − xid) + c2 · Rand() · (gd − xid) (1)
$

$xid = xid + Vid   (2)
$

1. $w · Vid$  **惯性项**（inertia）：保持原有运动趋势；

2. $c1 · Rand() · (pid − xid)$ **认知项**（cognitive / personal）：向自身历史最佳靠拢；

3. $c2 · Rand() · (gd − xid) $ **社会项**（social）：向群体最佳靠拢。

|**Symbol**|**Meaning**|
|---|---|
|V id|每个粒子在每一维上的**速度**|
|i|粒子索引|
|d|维度|
|w|**惯性权重**|
|c 1 , c 2|常数，分别对应**认知与社会**分量|
|Rand\(\)|\[0, 1\] 之间的随机数|
|p id|每个粒子的 **最佳位置**|
|g d|**群体最佳位置**|
|x id|每个粒子在每一维上的**当前位置**|

### 3\.3 Parameters Tuning

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzMxMmE0MjVmY2JkNGVmZGJkMzQ4ZDllMGRjNTI3YjZfMzZjZjU2N2FmYjgzYjkyMTdlMmFmNGNhOTYzYjIyYTVfSUQ6NzY4OTM5MTEyOTYxNTE5MTU4NF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|**Parameter**|**Range**|**Effect**|
|---|---|---|
|**惯性权重 w** <br>Inertia Weight|\[0\.5, 1\.5\]|大w促进**全局搜索\(global search\); **<br>小w促进**局部搜索（local search\)。**<br>沿运行过程**线性递减**w比固定值表现更好。|
|**c1,c2**|\[0, 4\.0\]|若c2\>c1：社会信息影响更大；   <br>若c1\>c2：粒子更受个体最佳影响而非全局最佳。<br>c₂ 大听社会，c₁ 大听自己。|
|**Rand\(\)**|\[0, 1\]|均匀随机数|

### 3\.4 Comparison with other EC Techniques

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjNiZmFmOGRiNmNlYTVmOTI2Yzk2MjZkZmE0ZjY3NjNfMDYwNDJlNjRiYTkwYzU3MjlkYWFmZDQ5MDgxMzk4NDFfSUQ6NzY4OTM5MTcxODAyMTY0NzkwMF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|**特征    Feature**|**PSO**|**GA / EP / ES**|
|---|---|---|
|选择操作Selection|**没有**选择操作|有选择操作|
|种群存续|所有粒子**始终保留**在种群中|个体可能被淘汰|
|交叉/变异crossover / mutation|**不需要**|核心算子|
|全局vs局部平衡|通过**惯性权重 w** 调节|通过其他机制调节|

Tips: PSO 用速度 \+ 向最佳位置加速代替了 GA 的选择 \+ 交叉 \+ 变异

没有个体被淘汰，没有基因重组，全部通过连续的位置更新实现。

### 3\.5 Why Particle?

#### 3\.5\.1 Particle vs Point

问题：为什么PSO 里的个体叫 particle（粒子），而不是 point（点）

原因：粒子携带位置、速度与加速度，而点只有位置。

正因为粒子带着运动的惯性，它才能把上一次的运动方向保留下来（即公式中的 $w·Vid $惯性项），并在个体记忆（pbest）与群体信息（gbest）的共同作用下不断修正前进方向。

#### 3\.5\.2 In\-Class Demo

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTBhYmNlMDBiNzAyZGExNmQxYWZiMzExNDUyMzBkYzBfYjFhMTBhMDlkMDFjMGFkNjQ2ODg0NDY2MjlmYjQ2YzZfSUQ6NzY4OTM5MTMwMzE5NjcyNDc2M18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTI2NWVjNDRiNzI2MzE5MWUyMDgzNzJiYWRiNjk0NTJfNTdiNTY2Nzc2ZjgwYWQ5NzViZTYyZDE3MmQ4M2MwMTlfSUQ6NzY4OTM5MTM3ODcxOTI4MDY2Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmRkZGFhYWUwODYzYTU2ZTE5MDE3MGY1NTFlNGQ0MTJfOTc3NjRkMDRiNGNjZjQwMmViZDE1YWE4Y2YxMWU3NmFfSUQ6NzY4OTM5MTQwNzYxODUyNjc0Nl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**Step**|**Description**|
|---|---|
|初始配置|20个粒子，**随机或规则排布**，并赋一个**很小的****随机初速度**|
|运动规则|每个粒子同时追踪**pbest（自己的历史最佳）**与**gbest（群体的历史最佳）**|
|过程现象|粒子逐渐**漂移到有希望的区域**；公式中的随机项让粒子**不会过早停滞在局部极小**|
|最终结果|收敛到（近似）全局最优，**全程不需要梯度信息**|

Tips: 

1. 因为不依赖梯度，PSO 天然适用于**梯度不可得或不可微（gradient\-free）**的实际问题

2. 这里的随机成分不是为了增加随机性，而是**防早熟，**它让粒子有概率跳出当前正在聚集的区域，这与模拟退火的按概率接受更差解是同一种思路的两种表达。

## Part 4 Differential Evolution 差分进化

### 4\.1 Background

|**Item**|**Content**|
|---|---|
|提出者Authors|**Price\&Storn**，1995年|
|定位Positioning|被认为是**实数函数优化**最强大的进化算法之一|
|出处Paper|*“DifferentialEvolution—asimpleandefficientadaptiveschemeforglobaloptimizationovercontinuousspaces”,1995\.*|
|竞赛成绩Competition|1996年在Nagoya举行的首届国际进化计算竞赛中获得第3名|
|性能对比Performance|在**34函数测试集**上**优于GA和PSO**（Vesterstrom\&Thomsen,2004）|
|持续表现|在IEEECEC系列会议中，对动态、多目标、约束、多模态等各类优化问题持续展现卓越性能|

### 4\.2 Main Idea

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTM3ZDdlMGY1ZmUxYjM5OWZhOThhNjg2NDU4ZmQ5MThfNWM5ZTJkNTkxZWZmZmExZmJjMTNhNWI0NGUyNzMyZDlfSUQ6NzY4OTM5NDY2MDA3ODgwMDQxMV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

利用下式生成试验向量（trialvectors,v）：

$v=x_r1+F·(x_r2−x_r3)$

其中 $x_r1,x_r2,x_r3$从当前种群中随机选取，F称为缩放因子（scalingfactor）。



**优势：**DE的自适应变异引擎，具有**随种群收敛自动调节**的性质，是DE**参数极少、易用**（few parameter sto be  tuned）的根本原因。

**解读：**DE的差分体现在 $
x_r2,x_r3
$：用两个随机个体之差作为扰动方向与步长。这种扰动幅度不是人为设定的固定步长，而是有当前种群的分散程度决定的。

种群越分散， $(x_r2−x_r3)$步长越大，偏向探索（exploration）；

种群收敛， $(x_r2−x_r3)$步长自动减小，自适应地平衡探索与开发（exploitation）。

### 4\.3 DE Algorithm

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODMwNzlhZGEwMjMyYzM1YmUzZGIwOWVjYjFjM2RjMTlfM2NjMTYwMTI1ZDA5YTUwOThjZGM2MzM1NjMxZThkNTJfSUQ6NzY4OTQwMTAwMjYwODcwOTE0Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|**步骤**|**伪代码Pseudocode**|
|---|---|
|1|用**均匀随机值**初始化种群X|
|2|根据适应度函数确定X中各成员的质量|
|3|**repeat**（重复）|
|4|对种群中的每个父代Xc：|
|5|随机选择差分对Xa和Xb|
|6|计算X′c=Xc\+F·\(Xa−Xb\)|
|7|计算X″c=Crossover\(Xc,X′c\)|
|8|确定X″c的质量|
|9|**if **Xc″比Xc更好; **then**Xc″进入新种群; **else **Xc进入新种群|
|10|**endfor**；新种群替换旧种群|
|11|**until**种群收敛或达到代数上限|

Tips: DE采用1\-to\-1**贪婪选择（greedyselection）**，即只有当试验向量 $X_c$优于父代 $
X_c
$时才替换，否则保留父代。优势如下：

1. 种群规模恒定：每个父代对应一个试验向量，种群大小不随迭代变化

2. 适应度不退化：只有变好才接受，因此种群质量单调不降（fitnessneverdegrades）

3. 实现极简：不需要轮盘赌、不需要排序，一次比较即可

4. 与GA的差别：GA（先选父代→再重组）；DE是每个父代都给一次机会（只用进行一个减法和比较）选择与繁殖耦合更紧。

### 4\.4 DE Mutation Scheme 变异方案命名约定

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjU0YTg3M2E3MWQ3ODQ4MGZlYTVjMThmMmZiYWNiNjlfZTRiYTRmM2QzYzc2MzIxNjk0MDk4MDE4MjQxYjU4YTlfSUQ6NzY4OTQwMTA3Njc2Mzk1NDcxMl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**Symbol**|**Meaning**|
|---|---|
|DE|DifferentialEvolution（差分进化）|
|x|表示**被扰动向量**的字符串（thevectortobeperturbed）|
|y|用于扰动x的**差分向量个数**（numberofdifferencevectors）|
|z|所采用的**交叉类型**（typeofcrossover）|

## Part5 Memetic Algorithms

### 5\.1 Development in EC

|**Era**|**Method**|
|---|---|
|1960s|Evolutionary programming 进化规划|
|1970s|Genetic algorithm 遗传算法|
|1970s|Evolutionary strategies 进化策略|
|1990s|Evolutionary algorithms 进化算法|
|1990s|Genetic programming 遗传编程|
|1990s|**Memetical gorithms 模因算法**|

### 5\.2 Definition \& Metaphor

模因算法是一类同时整合全局搜索（交叉\+变异）与局部搜索的进化算法。

MA are evolutionary algorithms that are in corporate global search \(crossover\+mutation\) and local searches simultaneously\.

|**层次**|**机制**|**对应算法成分**|
|---|---|---|
|跨代<br>Cross\-generation|**进化适应**<br>Evolutionary adaptation|遗传算法GA|
|个体生命周期<br>Within a lifetime|**个体学习**<br>Individual learning|局部搜索器<br>problem\-specific local searchers|

### 5\.3 Preservation of Diversity

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDRjZDI1NTY2YzQwMWMwZjQyZTE0MGNhZmEyNWFlYWNfNDkxMWE1NzBjMTM2YjJjNjA4ODViOGE1NTI0NDFmMTZfSUQ6NzY4OTQzOTI5NzQzNDI5MTc0NF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

局部搜索（local search）：一种使算法能够在**当前个体的邻域**内获得更好解的机制。

Mechanism that enables the algorithm to obtain better solutions within the neighborhood of the current individual\.

问题：在MA中使用局部搜索很容易导致多样性丧失（lossofdiversity）因为所有点/个体都被移动到同一个局部最优。

|**Strategy**|**Description**|
|---|---|
|限制局部搜索比例|只允许**一小部分种群**进行局部搜索<br>Allow only a small fraction of the population to undergo local search|
|使用多种局部搜索器|引入**不同的搜索空间与不同的局部最优**<br>Use multiple local searchers to induce different search spaces and distinct local optima|
|选择算子去重|在选择算子中**防止重复**个体<br>Prevent duplicates in the selection operator|
|新的接受准则|为局部搜索引入新接受准则，如**Boltzmann方法**（类似模拟退火）<br>New acceptance criteria, e\.g\. Boltzmann method \(similar to Simulated Annealing\)|

### 5\.4 Utilizing Domain Knowledge

GA 可以通过引入问题特定的领域知识而更具针对性。领域知识表现为：

- Specialized crossover 专用交叉算子

- Specialized mutation 专用变异算子

- Problem specific representations 问题特定的表示

- Problem specific local search 问题特定的局部搜索让 EA 在具体任务上表现更好，就催生了模因算法（Memetic algorithms）

#### 5\.4\.1 General Workflow of MA

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDE1MjM0ODhjNzBjMjFjMWZlMmU0ZGI5YWIzOTQzODRfMzY3ZmI5OGJjZGQ5ODI0NTQ4MDkxMzUzOWQ5ZjExNzRfSUQ6NzY4OTQzODk0OTc4NTM0MTQ2OF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWQ3NDRiYTNhYjQ1YmE1YjMzZjk3Y2NkMjZmMjAzY2ZfNzZlM2I4OWJiYmRjNDY1YWRkZGE5YzQyMmUyOGVmOGVfSUQ6NzY4OTQzODY4Njk0MDg0MzU0OF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|**步**|**流程    Step**|
|---|---|
|1|Initialize population  初始化种群|
|2|Evaluate each candidate  评估每个候选|
|3|Selection and Recombination  选择与重组|
|4|Mutation  变异|
|5|**Improve via local search**   通过局部搜索改进  ← MA  特有|
|6|回到步骤2，循环（Improve via local search ）|

领域知识的注入位置是可选的 Multiple Injection Points

MA的工作流保留了标准进化循环（选择→重组→变异），差别只在第五步（评估之前多一步局部搜索）。但这一步的插入位置并不唯一：

- 可以在变异之后注入；

- 也可以在重组之后、评估之前注入；

- 还可以通过专门的进化算子把领域知识写进搜索过程。

具体插在哪，取决于问题的性质与算力预算。所以MA的本质就是全局评估\+局部精炼的循环。

### 5\.5 Performance of EA

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDkzYmMzZjFlYThiMGY5MGFjNjZmMmYxNDU5MjEwN2JfMzA0ZjUxOTc0YjdlOTYwNDdjNDgwMzQ4NGExMzU5ZDRfSUQ6NzY4OTQwNzM0MzExMjcwMzUxNF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

可见，早期进化算法在通用性上强，但在特定问题上不如专用算法；加入领域知识（→ MA）后可显著提升针对性。

|**方法类型**|**适用面**|**峰值表现**|
|---|---|---|
|**Generalist**   通用方法（纯  EA ）|广|中等但稳定|
|**Specialist** 专用方法|窄|很高|
|**EA \+ Domain Knowledge** （ → MA ）|**较广**|**较高**  ←  兼顾两者|

Tips: MA 是把**本问题**的知识注入，而 Part 7 的 ETO 是把**其他相似问题**的知识注入。两者动机相同，知识来源不同。

## Part 6 Multi\-objective Evolutionary Algorithms

### 6\.1 Rational and Motivation

1. 许多**现实问题**有多个（可能相互**冲突**的）目标需要优化。

2. 有些问题被**转化（或聚合）**成单目标问题（SOP），从而用单目标优化技术求解。

3. 把多目标问题（MOP）转成 SOP 需要**先验知识**来设定各目标的相对重要性。

4. 用**多目标框架**定义问题更**通用**，并为决策者提供不同目标之间的**权衡（tradeoffs）**。

5. **多目标优化（multi\-objective optimization）**又称多准则优化（multi\-criteria optimization），目标是找到**一组向量**，在满足给定约束的同时优化多个目标函数。

### 6\.2 Classification of MOP

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTI3NGU3ZTVhNjIzZDYzODU3YjI2MGM1YTkyNGZjNmVfYTM5MGM1NGI2NDliMTQxMjM2YjdmNDQwNTFhMjYxNGVfSUQ6NzY4OTQ0NDk1Mzg4OTUwODg5MF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

对一个 MOP，目标数 M 必须**大于 1**。根据约束可分类为：

|**不等式约束J**|**等式约束K**|$x _i^ L$|$x _i ^U$|**MOP Type**|
|---|---|---|---|---|
|0|0|−∞|∞|**Unconstrained MOP** 无约束|
|0|0|$C _1$|$C _2$|**Bound constrained MOP** 边界约束|
|\> 0|0|x|x|**Inequality constrained MOP** 不等式约束|
|0|\> 0|x|x|**Equality constrained MOP** 等式约束|

其中 C1、C2 为常数。为简化，用 S 表示**可行决策空间**（满足约束的区域）。MOP 可重写为：

$minx∈S [f_1(x), f_2(x), ⋯, f_M(x)]$

### 6\.3 Dominance Relation 支配关系

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2RlNmY3ZjI5YmU0Zjc1ODVmYmQ3NzI4YjZhYzFhMmRfMGQ1OWEwODc5Y2RhODU3MzFiY2NhZDlhMGI0NWYxNzFfSUQ6NzY4OTQ0Njc0OTQ0NjA0OTMwNl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Definition：**解 **$x_1
$**支配（dominate）另一个解 **$x_2
$，记作 $
x_1 ≼ x_2$，当且仅当以下两个条件同时成立：

1. $x_1$在**所有目标**上都不比 $x_2$差（no worse in all objectives）

2. $x_1$在**至少一个目标**上严格优于 $x_2$（strictly better in at least one objective）

$x_1 ≼ x_2$  ⟺ $ f_i(x1) ≤ f_i(x2) ∀i ∈ {1,…,M} $ 且  $∃j∈1,...,M | fj(x1) < fj(x2)$

### 6\.4 Three Key Definitions

|**Definition**|**内容    Content**|
|---|---|
|**非支配集 **<br>**Non\-Dominated Set**|在一组解P中，非支配解集P′ 由**不被 P 中任何成员支配**的解组成。 <br>Among a set of solutions, P, the non\-dominated set P′ are those not dominated by any member of P\.|
|**Pareto 最优集**<br> **Pareto Optimal Set** <br> （决策空间）|在**可行目标空间**中**非支配**的解的集合。 <br>The set of solutions that are non\-dominated in the feasible objective space\.|
|**Pareto 最优前沿**<br> **Pareto Optimal Front** <br> （目标空间）|在**可行目标空间**中的**非支配解集** 。 <br>The set of non\-dominated solutions in the feasible objective space\.|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTRjOTgwZjNlN2I3ZjdiNDQzNGU2ZTRkZjhmN2ZkMjNfNWVhNzU2YTgyYzBjYzUzZTdlOTE5MmUzZGE4N2Q4YTNfSUQ6NzY4OTQ0NzA4ODQ4ODI1NTAwMF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

**Two\-Objective Example**：两个待最小化目标 $f_1$ 与 $f_2$，Pareto 最优前沿是**一条最优权衡曲线（trade\-off curve）**，位于**不可行区域**（unfeasible region）的边界上。

which one is better?  Pareto 前沿上的点相等，所以**互不支配**，无法仅凭目标值判断谁更优，需依赖决策者偏好。

### 6\.5 Pareto Ranking

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjdkMTQxZjIxM2QzMTU1ZGU2ZDA2Y2UwMGMyMTBjMTZfYmZlYWUyYmYwNDFmZTJjYTE5ZDlmYzQ5OGIyMWUxZjFfSUQ6NzY4OTQ1ODQwNTE1NjkzMzE0Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Why is sharing needed for MO optimization? 为什么多目标优化需要共享机制？

答：Pareto 排序只关注收敛，会让种群聚集到前沿的某一小段；共享函数通过降低拥挤区域个体的适应度，迫使种群散布在整个前沿。

### 6\.6 Mainstream MOEAs

Evolutionary Multi\-objective Optimization \(EMO\)是进化算法用于求解多目标优化问题的应用。MOEA 用于逼近多目标问题的 Pareto 最优前沿。

|**Algorithm**|**Full Name**|
|---|---|
|**MOGA**|Multi\-objective Genetic Algorithm  多目标遗传算法|
|**NSGA\-II**|Non\-Dominated Sorting Genetic Algorithm II  非支配排序遗传算法  II|
|**IMOEA**|Incrementing Multi\-objective Evolutionary Algorithm  增量式多目标进化算法|
|**MOEA/D**|Multiobjective Evolutionary Algorithm based on Decomposition  基于分解的多目标进化算法|

这些算法主要在以下方面不同：适应度分配方案（fitness assignment scheme）、多样性保持（diversity preservation）、共享与精英策略（sharing and elitism strategies）。

#### 6\.7\.1 General MOEA Flow

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDJiNmJjYWRiYWRiMmQwYWQ0ZDE4Mjg0YjBiYmQwZjRfMTEwOGFlNDJmZGY2ZTljYWI4MzA4OGI3M2E5YTZmNWRfSUQ6NzY4OTQ1ODc3ODgxNDU2NTkxNV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**步**|**流程Step**|
|---|---|
|1|Initialization  初始化：  x 1 , x 2 , …, x N|
|2|Fitness Evaluation  适应度评估：  f\(x 1 \), f\(x 2 \), …, f\(x N \)|
|3|Mating Selection  交配选择|
|4|Recombination / Crossover  重组  /  交叉|
|5|Mutation  变异（  Perturb the generated offspring solution  扰动生成的子代解）|
|6|Fitness Evaluation  适应度评估|
|7|Selection  选择（  Select individual to survive  选择存活的个体）|
|8|Termination  终止检查（  Check terminated condition  ）|

#### 6\.7\.2 Issues\&Strengths

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjI4NDEzMDk5NTVhYjEzZjYxMjM1MDNlMWQ4Mjk2N2VfY2E2YzI2NjFkMTUxMmMxNDQ2NGYyZmE1YzFhYmJhMTFfSUQ6NzY4OTQ1NzM4Mzc3NjQ3MjYwMF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**EMO needs to address these issues**|**Why EA is powerful for MO**|
|---|---|
|适应度分配、偏好<br>（Fitness assignment, preference）|基于种群，能搜索**全局权衡**<br>（global trade\-off）|
|良好散布、均匀分布、最小邻近<br>（Good spread, uniform distribution, minimum proximity）|鲁棒，适用问题范围广<br>（Robust and applicable to a wide range of problems）|
|多目标、多约束<br>（Many objectives, constraints）|能处理**不连续与多维**问题<br>（discontinuous and multi\-dimensional）|
|噪声、动态环境、鲁棒优化<br>（Noise, dynamic landscape, robust optimization…）||

### 6\.6 What to change in Simple GA for MO optimization？

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDVkNGFlNjc4ODhiZWY5NzBjOTI1MDFkZjY0YmIxY2NfMGFhNjkxZjA3ZjQ0NjVjZjk5NWIyOTcyODBkYmIzYzdfSUQ6NzY4OTQ1OTA5MjM1MTQ4NzUxNF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

修改适应度计算（Modify the Fitness Computation）：

- 通过Pareto排序强调非支配解 → 促进收敛性（convergence）

- 通过共享函数（sharing function）强调不拥挤的解 → 促进多样性（diversity）

### 6\.8 A House\-Buying Example

#### 6\.8\.1 House Buying as a MOP

用买房来解释什么叫做相互冲突的多个目标：

|**目标  Objective**|**冲突  Conflict**|
|---|---|
|地段好坏|地段越好  →  价格越高|
|价格高低|价格越低  →  地段与房屋条件往往越差|
|房屋条件|条件越好  →  价格越高|

没有唯一最优解，只有不同的权衡（trade\-off）。

把这三个目标加权求和成单目标再优化，就必须先知道地段 vs 价格 vs 条件各自的权重，而这恰恰是决策者事先给不出的先验知识（prior knowledge）。

MOEA 的价值：不做加权聚合，直接求出一整组权衡解（Pareto 前沿），把最终选择留给决策者。

#### 6\.8\.2 Partial Ranking

偏序排序（partial ranking）的两个条件 

|**调整  Adjustment**|**作用  Effect**|
|---|---|
|**偏序排序 Partial ranking**|优先保留**非支配解，**促进**收敛（convergence）** ；<br>非支配个体rank = 1 ，其余个体 rank=1\+**支配它的个体数量**|
|**共享机制 Sharing**|优先保留**不拥挤的解**  →  促进**多样性（diversity）**|

#### 6\.8\.3 Why Sharing Is Necessary

Why sharing is needed for MO optimization?

|**只有Pareto排序**|**加上Sharing共享机制**|
|---|---|
|只强调**收敛（convergence）**|同时强调**多样性（diversity）**|
|种群会**聚集到Pareto前沿的某一个点或一小段**|通过**降低拥挤区域个体的适应度** ，迫使种群**散布在整个前沿**|
|结果：只拿到一个折中方案|结果：拿到**完整的前沿近似**|

偏序排序负责往前沿推，共享机制负责在前沿上散开，两者缺一不可。这也解释了为什么多目标优化比单目标更复杂：单目标只需回答哪个最好，多目标还要回答这一组解分布得够不够开。

### 6\.9 Limitation and Observation of EA

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2I2NDYxZGY4NTJmZmYxZDMwMTIwZDEyMmY4NWYzOTRfYTg3NzljMzE1MmFjMjkyMTRhYzU3YjY1YzJiNDE1MDRfSUQ6NzY4OTQ2MTQyMDIyODA1NDU1NV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

1. EA 中独立的搜索与迭代过程常导致缺乏有效引导、搜索效率低。

2. 当前的进化优化器往往从零开始搜索，不利用求解相似问题的经验。

3. 任务/问题之间的共同信息（common information）若被恰当利用，可有效帮助问题求解。

Sphere 函数优化过程中找到的解，**有可能**被用于帮助更复杂的 **Rastrigin 函数**的优化，这正是知识迁移的切入点，直接引出 Part 7 的 ETO。

## Part 7  Evolutionary Transfer Optimization \(ETO\)

### 7\.1 Motivation and Definition

Motivation: Knowledge Learning and Transfer\. 

人类具备跨任务学习与迁移知识的能力，机器可以通过微调（fine\-tuning）复用已训练的模型来实现知识迁移。

Definition: A paradigm that integrates evolutionary optimizers with knowledge learning and transfer across related domains for better searching performance\.

进化迁移优化（Evolutionary Transfer Optimization, ETO）是一种将进化优化器与跨相关领域的知识学习与迁移相结合，以获得更好搜索性能的范式。

EA \+ KT（Knowledge Transfer）→ 更好的性能 Performance

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODMxZWZhYjE4NTgyZmYxODc2YTFlNzFlNmZmMDE3NTlfYmFhMTZkN2NmNmI5Njk5MDJkZWJiZWY5ODMwM2Q1MjJfSUQ6NzY4OTQ2MTc1NjA2MTU2ODU0NF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**Benefit**|**Description**|
|---|---|
|**Head start** 更好的起点|从更好的初始点出发|
|**Faster convergence speed** 更快的收敛速度|缩短优化过程|
|**Closer approximation** 更接近的逼近|更接近最优解|

适用问题类型：约束优化问题（Constrained）、动态优化问题（Dynamic）、多目标优化问题（Multi\-objective）。

### 7\.3 Why ETO?

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YmM1N2VhNGY1M2ViMTk4ODY2NWJhMmZjMmE0NjJiZDlfZTliYTI1YjkxYmU2ZTY1NjI3OGMxMjQ5ZTAyNzU1MjJfSUQ6NzY4OTQ2ODg1NTYzNDE2OTM3MV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

ETO aims to guide and accelerate the search process in the new problem space by leveraging information and solutions from similar optimization problems\.

ETO 的目标：通过利用来自相似优化问题的信息与解，来引导并加速新问题空间中的搜索过程。

|**维度    Dimension**|**目标    Goal**|
|---|---|
|**Efficiency 效率**|提升搜索效率、 **减少计算资源**   <br>Enhance search efficiency and reduce computational resource |
|**Effectiveness 有效性**|处理**复杂问题**   <br>Handle complex problems|
|**Robustness 鲁棒性**|提升**适应性与鲁棒性 **Improve adaptability and robustness <br>应对**环境变化 **Environments Changing|

### 7\.4 Paradigms of ETO ETO范式

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjM1MDQyZjY3YjEzMTM2NTI2ZDNjYTNiMGM0MzEyMGNfMzI4NGE5ZjlmMTBmMGFiMmRlNmI4NGYxYjQ1M2YzM2VfSUQ6NzY4OTQ2ODk1NDQxNDI4ODQxNl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|**范式    Paradigm**|**知识来源    Knowledge Source**|**结构示意    Structure**|
|---|---|---|
|**Evolutionary ****Sequential**<br> **Transfer Optimization** <br> 进化序列迁移优化|从**先前已求解的源任务**中捕获的知识，支持后续优化<br>Knowledge captured from previously\-solved source tasks|Source Tasks → Knowledge Base → Target Task<br>|
|**Evolutionary ****Multitask**<br> **Transfer Optimization** <br> 进化多任务迁移优化|在**多个正在进行**的任务间**共享**的知识 <br>Knowledge shared across multiple ongoing tasks|Task 1 / Task 2 / … → Knowledge Base  （同时进行）|
|**Evolutionary ****Multiform**<br> **Transfer Optimization** <br> 进化多形式迁移优化|把**复杂原任务分解**成更简单的替代源任务，积累经验反哺原任务 <br>Knowledge obtained from alternate formulations of the original task|Formulation 1 / Formulation 2 → Knowledge Base → Target Task|
|**Evolutionary ****Dynamic**<br> **Transfer Optimization** <br> 进化动态迁移优化|从**历史信息**中提取的知识，提升当前任务的表现<br>Knowledge extracted from historical information|Dynamic Tasks 1 → 2 → … → t−1 → t  ，共享  Knowledge Base|

Tips: 序列 = 过去任务间；多任务 = 并行任务间；多形式 = 同一任务的不同表述间；动态 = 随时间变化的同一任务。

### 7\.5 Key Issues of ETO

设计新的知识学习与迁移方法对 ETO 而言是必要的。核心三问：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGFkMDI2MTQ1ODYyN2VlMTcxYTMxNGM1NmU4OGY4MDJfZDAxNWVlYmU2YzljOTJmZjdlZjZkZTk1N2Y2Mjg3YjFfSUQ6NzY4OTQ2OTA3NDY3NzU5OTc3MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**Question**|**Explanation**|
|---|---|
|**What to transfer？**|选择**具有跨任务共性（latent inter\-task communality）**的可迁移知识：解（ solutions ）、特征（ features ）、参数（ parameters ） …… 并挑出**最有希望**的候选|
|**When to transfer？**|需要**自适应的迁移时机**：迁得太频繁  →  **负迁移（negative transfer）**；<br>迁得太少  →  白白损失正向收益。或不迁移No transfer。|
|**How to transfer？**|选择合适的迁移方式，如**直接朴素平移（direct naive translation）**、**精细的拓扑变换（fine topological transformation）**等|

负迁移（Negative Transfer）

从不相关或弱相关的任务迁移知识，反而拖累当前任务的优化。ETO的关键难点之一就是只迁该迁的；在不该迁时，果断不迁。这也解释了为什么No transfer本身就是When to transfer的一个合法答案。

### 7\.6 ETO Successes

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTEwNTJmYTZmOTk3OTcxNTRjMWFhYzc5OWFmOTFlMGRfMDdiOTkyMTQ0ZjY5MTA2NjA3MzFkNmJiZGIxODQ2OGVfSUQ6NzY4OTQ2OTYzMzAyMzIzMzU2Ml8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**Application**|**Result**|
|---|---|
|能源系统优化|运营成本降低 **20%** |
|污染路径问题|污染扩散减少 **50%**  |
|油藏生产优化|收益增加 **700 万美元**   |
|气动设计优化|升阻比提升 **13%** |

### 7\.7 ETO benefits \&MA

|**收益  Benefit**|**课堂说明  Explanation**|
|---|---|
|更好的初始种群（Head start）|不用随机初始化，而是从一个表现更好的初始种群出发→ 稳健的领先优势|
|更快的收敛 \+ 更低的计算成本|复用存储下来的历史搜索经验 ，避免从零开始|
|更接近全局最优|借助简单问题到复杂问题之间的知识迁移提升解的质量 ；<br>对动态环境把历史状态知识迁移到当前已变化但相似的地形上，增强鲁棒性|

|**Dimension**|**MA 模因算法**|**ETO 进化迁移优化**|
|---|---|---|
|知识来源|**本问题自身**搜索过程中的局部搜索知识|**其他相似优化问题**（跨问题域）的信息|
|类比|一个人自己反复琢磨同一道题|把做过的同类题的解法搬过来|
|作用范围|单个优化过程内部|**问题与问题之间**|

## Part 8 Neural Architecture Search \(NAS\)

### 8\.1 Development of Neural Architecture

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODM3Zjk4ZjYyODczMjIyMmViOGY3OTJmN2JkM2U1N2ZfN2ZlNzQxMDRmZjk0YTNhNmI4NTRhNDM3MWEzZTllOWZfSUQ6NzY4OTQ3NDI2MzAwMjQ4NDI1MV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**Period**|**Stage**|**Representative Models**|
|---|---|---|
|1943\~1980|**Fundamentals** 基础|M\-P模型、  MLP（多层感知机）|
|1990s|**Various architectures** 多种架构|LSTM、LeNet\-5、RBM、HNN|
|2012|**Deep architecture** 深度架构|AlexNet|
|2014–2016|**Deeper models** 更深的模型|VGGNet 、ResNet 、DenseNet|
|2017|**Novel fundamental model** 全新基础模型|Transformer|
|Now  至今|**Large models** 大模型|BERT、GPT、Llama|

### 8\.2 NAS as an Optimization Problem

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjU3MDNkYTFkMzk2YzQyNTIwMDA1NDRlOTkyOTczZDBfMWNlNDdlMjk0M2UwOTYyMWY5ZGIyYjIzNWU5MTlmNzRfSUQ6NzY4OTQ3NDM0NDYwMjQ1NTU4NF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

神经网络架构设计常可被形式化为一个**优化问题**，神经架构搜索（Neural Architecture Search, NAS）正是为求解该问题而提出的。

NAS问题的三大特性

- Bi\-level optimization 双层优化：外层搜架构 arch，内层训练权重 w

- Black\-block optimization 黑盒优化：无法求梯度/无解析形式

- Expensive optimization 昂贵优化：每次评估都需训练并验证模型

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDkxYjE0ZjNhNmE1Y2Q0MTI0OTEzZGE1MmNkMWYzMGRfYjMzOTRiMThkMzA3MGI2OGYwYmIxNjBlYzE5OGE1ZjRfSUQ6NzY4OTQ3NDc4MTg4NDAyNjM5Ml8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**Component**|**Content**|
|---|---|
|Search space 搜索空间|A（架构空间）|
|Search method 搜索方法|强化学习Reinforcement Learning、进化算法Evolutionary Algorithm、梯度方法Gradient\-based|
|Performance evaluation 性能评估|准确率Accuracy、延迟Latency、计算量Flops、模型大小Model size|

### 8\.3 MTNAS：Knowledge Transfer Strategy

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDE2ODFiYTk3OTk2N2VkODg5OTRiNDAwMGJiZmNiMjhfODIyNmQwMTcyOWU3NmRhYThkYTllZmUzNjU0YmZjOThfSUQ6NzY4OTQ3Njc0NzY1NzQ5ODEzNl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MmMxYTE1ZmMyNDRmYzFlNWU5Yjg5NDE3MmQwMzJlZDNfNmNjZjVjMGVkZGFhNTliY2UxYTRkNjcyNjcwMmFhNDZfSUQ6NzY4OTQ3NjY1MDE2OTQ3MDQ4OF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

**问题：**多任务场景下（图像分类、图像分割、机器翻译），若对每个任务**独立运行 NAS**（Task1 → NAS、Task2 → NAS、Task3 → NAS），计算开销巨大且无法复用经验。

**思路**：让多个任务的架构搜索**共享知识，**这正是ETO思想在NAS上的落地。

|**Mechanism**|**Description**|
|---|---|
|**Knowledge extraction** <br> 知识提取|从搜索过程中提取可复用知识|
|**Knowledge reuse** <br> 知识复用|提出一种**局部搜索方法**用于知识复用|
|**Transfer probability adaption** <br> 迁移概率自适应|对每次搜索过程**自适应调整迁移概率** ： <br>divi：来自**搜索过程自身**的有用程度；<br>di：来自**公共档案（common archive）**的有用程度。|

迁移概率示意：0\.8 / 0\.7 / 0\.9 / 0\.6 / 0\.5 / 0\.5，随搜索进程动态变化。

### 8\.4 Results \& Ablation Study

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2M0YjkwYTFlYzc2NTY0ODM4Y2VjODU0OTNiZmVkZTRfYmVlYzhkN2VhMzkwNzU4OWYwYzRjNGZiZTM4NzY4NDRfSUQ6NzY4OTQ4MzgzMjE4NTA5Nzc1Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWNlMDUxMjdiNjM1ZjdjOWI3MmEwMTAxY2U3YmNmNjNfMGZlOTYwYWVhZmE4NDM3Y2QyYmNjOTIwNmY0ZjcwYWJfSUQ6NzY4OTQ4MzkyMTU3NDIxOTI5MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**Experiments**|**Conclusion**|
|---|---|
|Search Cost on NAS\-bench\-201|MTNAS至少实现**2×时间缩减**|
|Performance on Trans\-bench\-101|可实现 **2–10000× 加速**（2\-10000x speedup）|
|Performance on DARTS|能为**多个任务**找到更好的架构（find better architectures）|

|**Conclusion**|**Value**|
|---|---|
|NAS\-Bench\-201  基准|仅需现有SOTA方法**一半的评估次数**即可找到全局最优架构|
|性能vs时间成本|在性能与时间成本上**均优于**对比方法|
|消融验证的四个模块|**知识共享 / 知识提取 / 知识复用 / 迁移概率自适应，**每个模块都有效|
|搜索轨迹可视化|证明方法**快速移动到最优架构** ，并借助知识共享**逃离局部最优**|

### 8\.5 Visualization

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTg3MTFiM2E5ZDEzYzI0MWMyOGMwMTI4ODRjODZlNzVfZDIwMTUxMjllNDVjMzBiNjVlMjBkM2IyNTVhOGFmOTBfSUQ6NzY4OTQ4NDI2NTk4MTAwNTMzOF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

**Overview of the search space and search process**：可视化展示进化搜索过程如何在搜索空间中探索，以及如何**跳出局部最优（Escape from the local optima）**这是本章所有算法（EA / PSO / DE / MA / MOEA / ETO / NAS）的共同主题。

### 8\.6 NAS Loop \& MT\-NAS Archive 交互架构与共享机制

#### 8\.6\.1 The Common NAS Loop 通用交互架构

|**环节  Stage**|**内容  Content**|
|---|---|
|**定义搜索空间**|定义**极其庞大**的候选架构空间（ a massive search space ）|
|**应用搜索方法**|常用**进化算法** ，也有强化学习、梯度方法|
|**评估采样架构**|采样一个架构  →  **训练 \+ 验证**  →  得到性能|
|**反馈指导迭代**|把评估结果反馈回去， **指导下一轮搜索**|

#### 8\.6\.2 Two Problems of Single\-Task NAS

单任务架构在多任务场景中的困境

1. 成本线性增长：对每个目标任务独立跑一遍 NAS，任务数越多，总开销线性上升；

2. 没有万能架构：由于数据分布漂移（data distribution shifts），不存在一个架构能在所有任务上都最优。

结论：把**知识迁移**引入搜索空间，是降低多任务 NAS 成本的**有希望的方向**。

#### 8\.6\.3 The Shared Archive Mechanism 共享机制

|**机制  Mechanism**|**说明  Explanation**|
|---|---|
|**并行搜索 Parallel search**|基于EA的**并行搜索范式** ，同时为不同任务搜索各自的架构|
|**公共档案 Common archive**|设置一个**公共档案** ，存放**所有并行搜索过程中**发现的高性能架构|
|**选择性注入 Selective injection**|**有选择地**把这些有价值的架构加入**每一个**独立的搜索过程，从而加速整体优化|

Tips: ETO 思想在 NAS 上的落地：每个任务各搜各的，但**把别人的好架构放进一个共享仓库**，谁需要谁取。

## Part9 Exercise3

### 9\.1 Exercise1：GA 交叉子代适应度计算Crossover

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjU5Y2U4YzRmZTczNGUyYjQ2NjAyNTAzZGM5NTJjMGZfZDI3N2E3ZWNjZWJlODFmOGY2NzM0Y2UwOGIxZDIyNzJfSUQ6NzY4OTQ4NzU1ODE0MDcyNjgxMV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

三条染色体 00001, 01000, 11010 用于最大化 f\(x, y\) = x \+ y。x 由前 2 位表示，y 由后 3 位表示。第 1 与第 2 条染色体交叉，交叉点在第 4 位与第 5 位之间；第 1 与第 3 条染色体交叉，交叉点在第 2 位与第 3 位之间。请计算子代的适应度值。

注意解码时用二进制

**答案汇总**：4 个子代适应度分别为 **0, 2, 2, 4**（对应 00000、01001、00010、11001）。注意交叉时**前段取父代 1、后段取父代 2**（反之亦然），不要混淆分段归属。

### 9\.2 Exercise2: Selection \(Rank \& Fitness Weighting\) 选择算子

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDU3ZGViMjliZTcxM2RlZGM0OTg3MzlmOGQzZDdiNjFfOWY0YmFmOTZiNjM5YTNiYTViZjJmZjY3NDE2ZmYxYjFfSUQ6NzY4OTQ5MDgzNTIxMzQ1NDg3Ml8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2QxYmFjNTQ4MjgyZTljZTIxNjA4ZTk0OGI1MzI5NzhfYjQ5OGRlNDlhZDU1YTQ0OGVlMWY2MzQyNDJiNjdmZTBfSUQ6NzY4OTQ5MzQ2MDcxNzYyMDc2M18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

**题目**：一个含 4 个个体的二进制 GA，适应度如下（最大化问题）：

#### Q1：\(a\) 秩加权选择的概率表

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzA2ODU0YmQ1MjFkMmY5MzE0NTJlZjY5MTM4ZDUxMGZfM2U1NzU2MzI1ZjZmMTMwMTcwOWU3YWYwM2RiZTMzYWNfSUQ6NzY4OTQ5MTQ5MzYyNjY5NTE5Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

\(b\) 需选 2 个个体，随机数为 0\.15, 0\.82

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NGI3Njk3Y2Q2ZjQ3NzE2YTdlN2M4NzYxNDFjODA3MjBfY2NkODBlMmM3ZDAwMDg0YTJkZTMzZTc0Y2FjNGMyYzdfSUQ6NzY4OTQ5MTU3MTcyMDUwNjkwN18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

为了确定每个染色体对应的区间，需要计算累积概率： 

- 染色体 2: \[0, 0\.4\)，染色体 4: \[0\.4, 0\.7\)，染色体 1: \[0\.7, 0\.9\)，染色体 3: \[0\.9, 1\.0\)

所以选择染色体2和1。

#### Q2：\(a\) 适应度加权选择的概率表

适应度总和 = 169 \+ 576 \+ 64 \+ 361 = **1170**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWQ2NDQ1ZjM1OTY3MjUwYzk2YTM0MzRkNTlmZjA1ZjdfMTJmODFjNjYyMzU4MGE2ODkzYjM0MjQxZGU4NTgyNDFfSUQ6NzY4OTQ5MzM0NDc1MzMyMzU0Nl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

Q2：\(b\) 需选 2 个个体，随机数为 0\.15, 0\.82

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDc2MWU3YWJjMzRlMmI1ZDZlYjIyYTdjMjc5YTgyMDZfYzhjM2M3OTM2YWM5OGVjMGMxMDg2Y2U2Y2I5ZmQxM2RfSUQ6NzY4OTQ5NDEyMjkzNTI1ODY1MF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

累积区间：\#2 ∈ \[0, 0\.49\)，\#4 ∈ \[0\.49, 0\.80\)，\#1 ∈ \[0\.80, 0\.94\)，\#3 ∈ \[0\.94, 1\.0\)。

**Chromosomes 2 and 1**（与 Q1 结果相同，但**概率分布完全不同，**注意区分）。

### 9\.3 Exercise3: TSP 变异 \+ 秩加权选择

**题目**：两条染色体 ACDBE, ADECB 用于求解旅行商问题，5 个节点的距离矩阵如下。**变异算子**为交换两个变异点的位置。染色体 ACDBE：变异点为第 **2** 与第 **4** 位；染色体 ADECB：变异点为第 **5** 与第 **4** 位。若从父代与子代中按**秩加权选择**选出 2 条染色体，随机数为 0\.3, 0\.6，会选中哪两条？

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjJhMWM1MmUzNzFiYWI4MDIwZWM4NDJlMzk0MWZkNDBfZTc0MTM3YzM3YTI5ZGM1OWUwNzJhOTQxZDU1ZmMyZjJfSUQ6NzY4OTQ5NDQ5NTgyOTc0MTA4MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OGI4MzhmMjQyOTExMmMzMzdhYmRmNDg2NWRjYzc1MDVfMmQ0ZmU0ZDQ1NjExOWFjOTI2ODAwMjdhZGM1OWM3OGVfSUQ6NzY4OTQ5NDU1NjcyMjcyODQ3NV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

路径成本计算 · Cost Calculation

|**类型**|**染色体**|**成本计算    Cost**|**成本**|**秩**|
|---|---|---|---|---|
|Parent|ACDBE|AC \+ CD \+ DB \+ BE \+ EA = 31\+15\+40\+7\+10|**103**|2|
|Parent|ADECB|AD \+ DE \+ EC \+ CB \+ BA = 8\+5\+20\+9\+56|**98**|3|
|Offspring|ABDCE|AB \+ BD \+ DC \+ CE \+ EA = 56\+40\+15\+20\+10|**141**|1|
|Offspring|ADEBC|AD \+ DE \+ EB \+ BC \+ CA = 8\+5\+7\+9\+31|**60**|4|

Tips: TSP 是**最小化问题**，但 GA 需要最大化适应度。因此**成本越低 → 秩越高**：最优的 ADEBC（60）秩 4，最差的 ABDCE（141）秩 1。

秩加权概率表 · Rank Weighting Probability

|**Chromosome**|**Cost**|**Rank**|**Probability**|
|---|---|---|---|
|ADEBC|60|4|4/\(4\+3\+2\+1\) = **0\.4**|
|ADECB|98|3|3/\(4\+3\+2\+1\) = **0\.3**|
|ACDBE|103|2|2/\(4\+3\+2\+1\) = **0\.2**|
|ABDCE|141|1|1/\(4\+3\+2\+1\) = **0\.1**|

累积区间：ADEBC ∈ \[0, 0\.4\)，ADECB ∈ \[0\.4, 0\.7\)，ACDBE ∈ \[0\.7, 0\.9\)，ABDCE ∈ \[0\.9, 1\.0\)。选中 **ADEBC 和 ADECB**。

### 9\.4 Exercise4: 模式定理

**题目**：考虑繁殖、交叉与变异在遗传算法中的单独与联合作用，推导模式定理以考察种群中各种模式（相似模板）的增长率。第 0 代种群如下：异概率 Pm = 0\.01，交叉概率 Pcross = 1。用模式定理估计第 1 代中形如 1\*\*\*\* 的模式（schemata）的期望数量。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODQ4OTkyNDNhZjY3MGE5YmJhNDgwYzljMTYxYTQxN2JfNTU2YWYwZTU1ODdjN2U3ZTJiZmUyN2MxNjAyNzUyODFfSUQ6NzY4OTQ5NjM5NDU5OTYzMjQxNl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjZmY2JiOTUyNGEyY2NmNDU3NmNjNzY3OTJkNTg5MDRfYTk3Y2EwYjIwZDBmM2JiODZkMGJhZWI0MmRhNjgwNTBfSUQ6NzY4OTQ5Nzg3NTk1MjE3NjY2Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTJmYjdjNzJiZWY5NTVhZjcyOWMxMzgwNTBkM2Y2ZWJfZTYxYTViMDMyMjc3NDQ2ZDc3OTA3YTdiYjE1YTM4ZjJfSUQ6NzY4OTQ5NzkzMjU2MjcxNDEzOV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTYwMzBlMGIzNGY0YmM0ODM5OTJlYmRhZGQzZTMzZjlfYzRiOWY0Y2EzNjU4M2RhMTEwYTZhNjlhYmQ3MTdhZTZfSUQ6NzY4OTQ5ODA1OTM4MTg1MzcyM18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mzc4ZThhM2JjYTk2MmZlNTZiMGQ3M2MwYTExMWRiMWRfODA5YjEyNmZlZTc2YWU2NTg3NjAxMWI0MjJkM2NlYmJfSUQ6NzY4OTQ5NjYwMTEyNzE5NDE0MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

因为该模式**定义长度短（d=0）、阶数低（o=1）、适应度高于平均（15 \> 12\.5）**，所以它获得增长（2 → 2\.376）。

Tips：

1. 把 1\*\*\*\* 的 **d\(S\)** 误算成非 0（只有确定位才计定义长度，单个确定位 → d = 0）

2. 把 fit\(S\) 当成全体平均（应为**匹配该模式的串**的平均）

3. 忘记乘交叉破坏与变异破坏两个惩罚因子

## Part10 Overall

### 10\.1 关于模因算法 On Memetic Algorithms

**"General AI is a good starting point, but adding problem knowledge makes it much stronger\." **通用方法是很好的起点，但加入「问题知识」后，它会强得多。

**对应知识点**：MA = 全局进化搜索 \+ 问题特定的局部搜索；1990s 的 generalist / specialist / \+domain knowledge 三分法。

**为什么重要**：它一句话概括了 MA 的核心价值，也预示了 ETO 的思路，**引入外部知识**。

### 10\.2 关于进化迁移优化 On ETO

**"We human, we do not learn everything from scratch\."**我们人类，并不是什么都从零学起。

**对应知识点**：ETO 的核心动机——传统 EA **从零开始搜索**，不复用相似任务的已有经验；而人类会**跨任务迁移知识**。**为什么重要**：这是理解 ETO「为什么存在」的最直观入口，也是 What / When / How 三问的前提。

### 10\.3 关于遗传算法 On Genetic Algorithms

**"Genetic algorithms have been proved to be very powerful in escaping from the local optimum to search for the global maximum\."**遗传算法已被证明非常擅长逃离局部最优，去搜索全局最大值。

**对应知识点**：GA 相对传统启发式搜索（A\* 等）的核心优势。

**注意**：是**擅长逃离局部最优**，**不是保证全局最优**。

### 10\.4 串讲 The Through\-line

**GA 擅长跳出去（10\.3）→ 但通用方法还不够强，要加问题知识（10\.1）→ 而知识不只来自本问题，还能来自别的相似问题（10\.2）。**

这三步正好对应 Part 9（GA 定位）→ Part 5（MA）→ Part 7（ETO）的推进逻辑。

# Lecture 4

## part 1 Neural Network

### 1\.1 Definition

A massively parallel distributed processor 

Storing experimental knowledge and making it available for use

**神经网络是一个大规模并行分布式处理器，天生具有存储经验知识并使其可用的倾向**

Acquire knowledge by the network through a learning process

Store knowledge by the inter\-neuron connection strengths known as synaptic weights

**知识是通过学习过程获得的**

**神经元之间的连接强度，即突触权重（synaptic weights），用来存储知识**

ANN: **parameterized** **computational** **nonlinear** algorithms for numerical data/ signal/ image processing\.

人工神经网络是**带参数的、可计算的非线性算法**，用来处理（数值型）数据 / 信号 / 图像

Tips: **parameterized**（带参数 → 所以「学习」= 调参）与 **nonlinear**（非线性 → 所以能拟合真实世界的复杂数据；也让误差面变得非凸，见第 9\.3 节的局部极小

### 1\.2 Properties and Capabilities

#### 1\.2\.1 High computational power

Generalization: producing reasonable outputs for inputs not encountered during training/learning\.

Massively parallel distributed structure

#### 1\.2\.2 Useful properties and capabilities

Nonlinearity: most physical systems are nonlinear\.

Adapativity : adapt their **synaptic weights** to changes in the environment\.

Fault tolerance: if connecting links are damaged, the response may still be OK\.

Tips: 容错的来源是**分布式存储**（distributed nature of information stored in a network），而不是，网络足够大所以坏几个无所谓。

|**性质 Property**|**英文原文要点**|**含义与意义**|
|---|---|---|
|**高计算能力 High computational power**|embodied in two core aspects|体现在两点：**泛化** \+ **大规模并行分布式结构**|
|**泛化 Generalization**|Producing reasonable outputs for inputs **not encountered during training**|对**训练时没见过**的输入也能给出合理输出 —— 这才是能用的前提|
|**大规模并行分布式结构**|Has a massively parallel distributed structure|信息分布存储在许多单元上，支持大批量信息同时处理|
|**非线性 Nonlinearity**|Most physical systems are nonlinear|大多数物理系统是非线性的；线性模型表达不了|
|**自适应性 Adaptivity**|built\-in capability to adapt their **synaptic weights** to changes in the environment|环境变了就调突触权重 —— 这是「在线学习」的基础|
|**容错性 Fault tolerance**|If a neuron or its connecting links are damaged, the overall response **may still be ok**|因为信息是**分布式存储**的，坏掉个别神经元或连接，整体响应仍可接受|

### 1\.3 Biological Neural Networks

#### 1\.3\.1 Biological neurons vs\.silicon logic gates

Biological neurons, the basic building blocks of the brain, are slower than silicon logic gates\. So it makes up for the slow rate of operation with 2 factors;

**数量巨大: **A huge number of nerve cells\(neurons\) and interconnections\.

**单个神经元的功能远比一个逻辑门复杂: **The function of a biological neuron seems to be much more complex than that of a logic gate\.

#### **1\.3\.2 生物神经元的结构 **

**胞体 cell body：**信号处理的核心；

**轴突 axon** ：一根细长的管子（tubular axon），分成多个分支，末端是**终末小球（end bulbs）**，几乎触到其他细胞的树突；

**树突 dendrites** ：大量毛发状分支，形成围绕胞体的极细纤维丛（a very fine filamentary brush）

**突触（synapses）的三个要点**：

是**终末小球与树突之间的小间隙**（Small gap between an end bulb and a dendrite）；

是神经元之间相互作用（interactions）的**基本结构与功能单位**；

**可以对接纳信号的神经元施加兴奋（excitation, active）或抑制（inhibition, inactive）**

### 1\.4 Synapse to Weight

生物学习机制和人工学习机制

|**生物侧 Biological**|**人工侧 Artificial**|**对应关系**|
|---|---|---|
|突触的强度可随激活情况调整（adjustable, activation\-dependent strength）|连接权重 w\_kj|**突触强度 ↔ 权重**：这是全部学习发生的地方|
|兴奋 / 抑制（excitation / inhibition）|权重的**正 / 负号**|正权重 ≈ 兴奋性连接；负权重 ≈ 抑制性连接|
|学习与记忆的生物学基础|训练过程（training）改变权重|「学习」= 把权重调到合适的值|
|神经元的激活与否|激活函数 φ\(·\) 的输出|决定这个单元是否「被激活」向下游传递信号|

tips：人工神经网络里**唯一会被学习改变的东西，就是连接权重**（以及每个神经元的偏置）。网络结构、激活函数在训练开始前就定死了。反向传播，本质上就是在算每个权重该改多少。

## Part 2 Model of a Neuron

### 2\.1 Three Basic Components

A set of synapses or connecting links: characterized by a weight or strength of its own\. 

**一组突触 / 连接：每条连接都有自己的权重或强度**

tips：这里的权重是**可调的**，这正是学习发生的地方。

An adder: sum the input signals, weighted by the respective synapses of the neuron, for a linear combiner\.

**一个加法器：**把经过各自突触加权的输入信号求**线性组合**

An activation function: limit the amplitude of the neuron output, typically\[0,1\]or\[\-1,1\]\.

**一个激活函数**：用来**限制神经元输出的幅度**

### 2\.2 Mathematical Formulation

|**符号**|**含义**|**说明**|
|---|---|---|
|x₁, x₂, …, x\_m|输入信号|一共 m 个输入，即输入数据的**维度**（dimension of input data）|
|w\_k1, w\_k2, …, w\_km|神经元 k 的**突触权重**|每个输入对应一个权重，共 m 个|
|u\_k|线性组合器输出|u\_k = Σ w\_kj x\_j|
|b\_k|偏置 bias|一个与输入无关的常数项，**移动激活阈值**|
|φ\(·\)|激活函数|限制输出幅度、引入非线性|
|y\_k|神经元的输出信号|y\_k = φ\(u\_k \+ b\_k\)|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTdmMTE4MjNkNWEzOWUwN2UwYzM2MTI1YmI4YzZhNzlfMzcxYzhhYWYyMDZmNzQ4MjJiYjVkZWMxNmFhNDlmNDFfSUQ6NzY4ODY2MDc5NzU2ODE5MjAyM18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

### 2\.3 Effect of bias

偏置 b\_k 的作用：对 u\_k 做一次仿射变换（affine transformation）

#### **2\.3\.1 定义**

v\_k = u\_k \+ b\_k，这个量被称为**诱导局部场（induced local field）**。

#### **2\.3\.2 几何含义**

b\_k 把激活函数的输入**整体平移**，等价于**移动了神经元的激活阈值**（shifts the activation threshold）在Part4\.7中体现。

- **三个情形**（slide 10 的三张图）：b\_k \> 0 曲线左移（更容易被激活）；b\_k = 0 不变；b\_k \< 0 曲线右移（更不容易被激活）

- **一个细节**：当 u\_k = 0 时 v\_k = b\_k ，也就是说 单看偏置就能知道**没有任何输入时这个神经元的起点在哪里**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2I2YTdiMWFkMDJkMGJiMDFiNzI2MDM0OWM0NmEwNzlfZjA1MmUwNDRhZGM1YTNiNmUzMzI2ZTI5ZTNlNDJjMTNfSUQ6NzY4ODY2MTQ3MDQ1NjEwNjUxOV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

### 2\.4 Asborbing bias

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWEzZWIxMWU4NjFmZDRhNmViZjBlZmVlYTY3ZGQxODJfNTdjMGRlNzNmMzc4OGY1MGEyMDM5YjZhNTNjNGY2MjRfSUQ6NzY4ODY2MjU5ODI5NjE5NDU4M18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

改写做法：**额外增加一个输入 x₀ = \+1**（固定输入，fixed input），并令它的权重 w\_k0 = b\_k。

于是偏置就变成了一条**输入恒为 1 的特殊连接**（图注写作 Fixed Input, x0 = \+1），不再需要单独的加法项。

**好处**：记号统一（少写一个 b\_k）、**实现统一**（所有连接一视同仁，权重向量就是一个整体）。

|**改写前 Before**|**改写后 After**|
|---|---|
|输入向量 x = \(x₁, …, x\_m\)ᵀ|输入向量 x′ = \(x₀, x₁, …, x\_m\)ᵀ，其中 x₀ = \+1|
|权重向量 w = \(w₁, …, w\_m\)ᵀ|权重向量 w′ = \(w₀, w₁, …, w\_m\)ᵀ，其中 w₀ = b|
|y\_k = φ\(Σ\_\{j=1\}^\{m\} w\_kj x\_j \+ b\_k\)|y\_k = φ\(Σ\_\{j=0\}^\{m\} w\_kj x\_j\)|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGI1NzE1Y2M1NDg1ZmVkOTc0N2IyODk0M2Y4ZDRlNThfYmNlYTliOTA1MjZhZTFiMThkZTM2MDcwZmZhZjUxMzBfSUQ6NzY4ODY2MjkwMDczNjQ0NTk3NV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

## Part 3 Activation Functions

### 3\.1 Threshold Function 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTM0ODc5MTlmMzc2NDYxZjcxYTYxMjU2M2ZiNmJlOGJfZTA0MTYwZWM1MGNhOGZhZGUxYjdhMDhkZDFlMTY3YzVfSUQ6NzY4ODY2NDA0ODg1ODYzMTcwNl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

阈值函数

优点：简单，用符号判断。感知机就是它。

缺点：不可微，在0处不连续，其余位置导数恒为0。

后果：与梯度下降训练不兼容。梯度要么为0，要么不存在。

tips：为什么不能只用阈值函数？阈值函数**不能**用于多层网络的训练。

it adopts a **nonlinear \(differentiable\)** activation function for each neuron

所以 MLP 与反向传播，每个神经元**必须换成非线性且可微的激活函数**

### 3\.2 Sigmoid and its Derivative

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzA3NDI5ZDk2YmIyZmFmZWRhZDk0MDNlNzdmMTc3OTZfMGNhOWM3OGNlYzU5NmZjYTM5Y2MwY2E5YjRmM2NmZTRfSUQ6NzY4ODY2NDEwOTkxMDkwNDM0OF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

其中 **a 是斜率参数**（slope parameter），且 a \> 0、−∞ \< v \< ∞。极限值为 **0 和 1**

#### 3\.2\.1 三条性质

1. **严格单调递增**（Strictly increasing function）

2. **渐近逼近饱和值**（Asymptotically approach the saturation values）

3. **连续且可微**（Continuous \& differentiable everywhere）

#### 3\.2\.2 Example

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTBlMGQ2YTY3ZWYyZThjNjA0NTM0MGRhNGJmMTA2NjBfZmMwYmJjYWRmMjNhY2NlMDdjMzBiMDA1Njk4ZDI4MjJfSUQ6NzY4ODY2NDE4OTIyMDkwMDM3NV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

1. **只要知道神经元的输出 φ\(v\)，就能直接算出导数，不需要再单独求导 **

反向传播能把梯度算得又快又省的关键

2. **φ′ 在 φ\(v\) = 0\.5 时取最大值**（a/4）

3. **φ′ 在 φ\(v\) → 0 或 1 时趋近于 0** —— **梯度消失**（vanishing gradient）的数学根源

### 3\.3 Common Activation Functions

|**函数 Function**|**公式 Formula**|**输出范围**|**优点 Advantages**|**缺点 Drawbacks**|
|---|---|---|---|---|
|**Sigmoid** 逻辑函数|f\(x\) = 1/\(1\+e^\{−x\}\)|**\(0, 1\)**|平滑可微、导数可由输出自表达|**梯度消失 vanishing gradient**|
|**Tanh** 双曲正切|f\(x\) = \(e^x − e^\{−x\}\)/\(e^x \+ e^\{−x\}\)|**\(−1, 1\)**|**零中心（zero\-centered）**，梯度流动比 sigmoid 好|两端仍会饱和|
|**ReLU** 修正线性单元|f\(x\) = max\(0, x\)|**\[0, \+∞\)**<br>|**计算快**；x \> 0 时**没有梯度消失**|x \< 0 时出现 **dying ReLU**（神经元永久失活）|
|**Leaky ReLU** 带泄漏 ReLU|f\(x\) = max\(a·x, x\)，a 为小斜率|**\(−∞, \+∞\)**|用小斜率 a 修好 dying ReLU 问题|需要多调一个超参 a|
|**Softmax**|softmax\(z\_i\) = e^\{z\_i\} / Σ\_j e^\{z\_j\}|**\(0, 1\) 且和为 1**|输出可直接当**概率分布**|只用于**分类网络的输出层**（见 4\.4）|

**tips：为什么 Tanh 比 Sigmoid 好？零中心（zero\-centered）**

sigmoid 的输出恒为正，下一层神经元的输入就恒为正，于是每层梯度的符号高度相关，**参数更新会走出「之」字形（zig\-zag）路径**，收敛变慢。tanh 的输出关于 0 对称，这个问题就缓解了。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NWU0Mjc5ZDE2MDMxNzRmYzUwM2ZmZDFkM2M1ZmMxMmVfNjkyYzBjNzQ5OWRhZjdkMjFmMDRmODYyNzI0NTE2MzdfSUQ6NzY4ODY2NDIzNDY4MjYxNzM3MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

### 3\.4 Softmax 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWZkMGM1NDM1ZThlMTQ1M2MyYzcxNjlkYzU2ZjNjOTdfM2IzMzI1NjU0YjRkYzg2YzZmOTZiZTlkNTk1ODRjMDFfSUQ6NzY4ODY2NDI5MDI5OTM4MzMyM18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

**用途**：把一个 **logits 向量**转换成**概率分布**（a probability distribution）

**使用位置**：**分类网络的输出层**（Output layer of classification networks）

**性质**：所有输出之和为 **1\.0**

#### 3\.4\.1 Example

logits 为 \[2\.0, 1\.0, 0\.5, −0\.5\]

softmax = \[0\.5977, 0\.2199, 0\.1334, 0\.0491\]，逐项为 **\[0\.598, 0\.220, 0\.133, 0\.049\]**

#### 3\.4\.2 三条性质

1. 平移不变：softmax\(z\) = softmax\(z \+ c\) 

所以，logits 的绝对值不重要，只看差值，所以**logits 不是概率。**

2. 保序：z\_i \> z\_j ⟺ p\_i \> p\_j

所以，取最大概率 = 取最大 logit（argmax 不变）

3. 指数放大了差距：z 差 1 时概率比约 e ≈ 2\.72 倍

### 3\.5 How to Choose

|**使用场景**|**推荐选择**|**理由**|
|---|---|---|
|**分类任务的输出层**|**Softmax**（多类）/ Sigmoid（二类）|需要把输出解释成概率、且（多类时）和为 1|
|**回归任务的输出层**|**恒等函数（线性）**|输出不该被压进 \(0,1\)，需要实数范围|
|**隐藏层（现代默认）**|**ReLU / Leaky ReLU**|计算快、正区间不饱和、缓解梯度消失|
|**隐藏层（需要零中心）**|**Tanh**|输出关于 0 对称，收敛路径更直|
|**单神经元分类器（感知机）**|**阈值函数**|不需要求导，只需要符号判断|

tips：

1. **把 Softmax 用在隐藏层** —— 错。Softmax 只在分类网络的输出层用

2. **ReLU 完全解决梯度消失** —— 不严谨。ReLU 只在 **x \> 0** 时梯度恒为 1；**x \< 0 时梯度为 0**，这正是 dying ReLU 的成因

3. **Sigmoid 已经不用了** —— 在本讲的语境里不成立：课件后面推导反向传播用的**就是 Sigmoid**（因为它的导数能写成 y\(1−y\)，形式极简）

## Part 4 The Perceptron

### 4\.1 Definition and Structure

#### **4\.1\.1 Definition**

a machine that learns, using examples, to assign input vectors\(samples\) to different classes\.

一台通过样例学习、把输入向量（样本）分配到不同类别的机器。

本质是一个神经元：built around a nonlinear neuron（the hard limiter model）

用的3\.1的硬限幅器（阈值函数）

#### **4\.1\.2 Structure**

左边是线性部分（Linear，v = Σ wᵢxᵢ \+ b），右边是非线性部分（Non\-linear，硬限幅）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTA4ZjI3YzdhNTg1NzQyNTFkNzQzMDQzMzBkMTM4OTVfYjIzNTEzYWI4YzNmZGIwNjUxODY4NzdiNGNhNWIxY2ZfSUQ6NzY4ODY3MTk2OTczODQ0NDMxNV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

tips：

1. 它是一个线性分类器（linear classifier）：决策边界是一条直线（二维）/ 一个超平面（高维）

2. 为什么用感知机而不是逻辑回归？因为它不需要求导，是神经网络最早的、也是最简单的形态

3. 线性 \+ 非线性这个两段式结构是全部神经网络的通用模板：先做加权和（线性），再过激活函数（非线性）。感知机的特殊之处只是它的非线性部分换成了**取符号hard limiter**而已。

### 4\.2 Formulation and Decision Boundary

the equation of the hyperplane \(in this example, a straight line\) as decision boundary for a two\-dimensional, 2\-class pattern\-classification problem\.

用超平面（此例中是一条直线）作为 decision boundary，解决二维的两类模式分类问题

**Goal**

To correctly classify the set of externally applied stimuli x₁, x₂,\.\.\. Into one of two classes, C₁ and C₂

把外部施加的刺激 x₁, x₂, …, x\_n正确分类到两个类别 C₁ 与 C₂ 之一

**Difine**

输入向量：x′\(n\) = \[\+1, x₁\(n\), x₂\(n\), …, x\_m\(n\)\]ᵀ

权重向量：w′\(n\) = \[b\(n\), w₁\(n\), w₂\(n\), …, w\_m\(n\)\]ᵀ

线性组合器的输出：v\(n\) = w′ᵀ\(n\) · x′\(n\)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWVhZWYzMjliZGVjNzA3YWVlZTk3MDM1MGU1NTg5ZDNfNzhlYTc2NTZmZGMyNTMxY2E4NjY4YzhiMmFmNDA0ZTVfSUQ6NzY4ODY3NTI4NTQ3MDA4ODcyOF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

1. 方程 w′ᵀx′ = 0 在 **m 维空间**（坐标为 x₁, x₂, …, x\_m）中定义了一个**超平面（hyperplane）**，它就是两类输入之间的**决策面（decision surface）**

2. 二维时退化成一条**直线**（w₁x₁ \+ w₂x₂ \+ b = 0）

3. **判决规则**：w′ᵀx′ ≥ 0 → 判为 class 1（例如 y = 1）；w′ᵀx′ \< 0 → 判为 class 2（例如 y = 0）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzIzYmMzN2E3YTIwNjljY2NkZTQ1YzFmZGFlM2QwYzJfZjRiYzZmYjZjZjEwNTcyYmVlZDRjNjU4YWY2Nzg5MmZfSUQ6NzY4ODY3NTYwMDk1MzIzMjkxOV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Tips: 课件用 w′ᵀx′ ≥ 0 中**大于等于 0** 归到 class 1。这个≥ 还是 \>的约定**必须与题目一致，**因为 v = 0 恰好落在决策边界上，两种约定对**边界点**的判定结果不同

### 4\.3 How to Select the Weights

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDQ3NWRjM2M5MmRiNjI4MjI1MDhlNjkxOWJmYjExNmFfM2ZlZjcwOTM4YjFiMjA5NzU0YmY4NDlhOTk5ZjU4ZTJfSUQ6NzY4ODY3NzgxNTIxODQ5MDkwM18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**方法 Method**|**做法 How**|**适用场景**|**局限**|
|---|---|---|---|
|**离线计算（off\-line calculation）**|如果问题**相对简单**，往往可以**从问题的规范直接算出**权重向量|逻辑门这类结构已知的问题|复杂问题算不出来|
|**学习过程（learning procedure）**|从给定的（训练）输入—输出向量对（**exemplars**，样例）中确定权重，目标是**对训练向量取得最好的分类**|**本讲重点，也是神经网络的通用做法**|需要数据；收敛性依赖数据性质|

Tips: 两种方法的关系是可不可解：离线计算要求把边界先想出来再反推权重；学习过程则是把**确定边界**这一步也交给算法。NAND 门是前者（答案一眼可见），学习算法是后者

### 4\.4 Building NAND Gates——example

用感知机实现 NAND 门。所需的输入—输出关系由真值表与相应图示给出

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTdjMTAzOTNmN2EyMWM0NDZmMWY1ZWJhOTg0NTYzMzJfMjc5MzEwNjU2ZDZmNWM1ZjE0YWVjOWVmZThjYThjNGRfSUQ6NzY4ODY3ODI5NTIzMTI1NDA0NF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjVjMWQwZDcyMGU3ZTYyZTc5ZjQ3ZjY4Y2UzZWUzNDlfNDY3Y2Q5YjgxMWJjZjNiYjVjYzU0ZDExYTFiNTA2ZWRfSUQ6NzY4ODY3ODQwOTg1NzUzNTUxMl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

1. 输入模式（向量）分属两类，在输入空间（平面 \(x₁, x₂\)）中用两种记号标出；

2. 决策平面是一条直线，方程为 x₁ \+ x₂ = 1\.5，即 **− x₁ − x₂ \+ 1\.5 = 0**；其实只要阈值在 \(1,2\]  之间都行，**感知机的解不唯一**。

3. 为了让权重向量**指向 y = 1 的那一类**，选取 w = \(1\.5, −1, −1\)，即 w′ = \[b, w₁, w₂\] = \[1\.5, −1, −1\]；

4. 对每个输入向量计算输出信号 y = 1 if v ≥ 0 else 0，其中 v = 1\.5·1 − 1·x₁ − 1·x₂。

Tips: 

**线性可分**：感知机只能处理能用“直线”一刀切开的问题（所以它搞不定 XOR 异或门）。

**权重比例**：权重和偏置同比例缩放（如全部翻倍），决策直线的位置不变。

**只看符号**：分类结果只取决于计算结果是正还是负，而不取决于这个数有多大。感知机只看符号，所有权重同乘一个正数都等价。所以 \(1\.5,−1,−1\) 、\(3,−2,−2\) 、\(15,−10,−10\)  都表示同一个 NAND 分类器。

### 4\.5 2\-D Example

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjI1YjJlZmQ2NWFjNTg2NGM3NmFlNWQwYzQ1M2NhOGFfZTAwMGNhN2ViMTZmZTBhOTBmNzFiY2VmYTFmZmExNjBfSUQ6NzY4ODY4NDAzMDA2NTE1MTUxNF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

一个感知机（Perceptron）进行二分类的具体实例。它通过几何图形和数学模型直观地解释了感知机是如何工作的。

1. 分类任务

- 第一类（Class 1）：包含点 $(0, 0), (0, 1), (1, 0), (-1, -1)$；第二类（Class 2）：包含点 $(2.1, 0), (0, -2.5), (1.6, -1.6)$。目标是找到一条直线，把这两组点分开。

2. 左侧：几何划分（Geometric Partition）

- 取决策线 x₁ − x₂ = 2，即 x₁ − x₂ − 2 = 0。对应权重 w = \[\+1, −1, −2\]（依次为 x₁、x₂ 的权与偏置）

- $求和节点v：计算公式为 v = (+1 \times -2) + (x_1 \times 1) + (x_2 \times -1)，即v = x_1 - x_2 - 2$

- 原理：这条线把平面切成两半。 在线的右下方，满足感知机输出 1；在线的左上方，满足感知机输出 0

3. 右侧：感知机模型（Perceptron Model）

这部分展示了硬件或算法层面是如何实现的：

- 固定输入（Fixed Input）：它的权重（Weight）是 \-2。这其实就是偏置项（Bias, b）

- 激活函数（Hard limiter）：符号 $\phi(\cdot) $表示，如果算出 $ \ge 0$ 就输出 1，否则输出 0。

4. 总结：Output = 1 if \(x₁ − x₂ − 2\) ≥ 0, and 0 otherwise\.

### 4\.6 Equivalent Perceptrons 

等价感知机：无限多组权重 

硬阈值感知机（hard limiter / sign）的决策边界只由权重“比例”决定，不由绝对大小决定，所以有无穷多组等价权重

$核心点：感知机输出是阶跃函数，不关心 ∣v∣ 多大，只关心正负
$

$
所有权重同乘一个正数，边界不变：
(w0,w1,w2)∼λ(w0,w1,w2),λ>0$

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzcwNTFkYjM5OWZjZDY5Y2U5NTBiN2YxNjczODg5ZWRfYjg3MjQ0YmE2ZTlkY2NhOWUzOGY0ZmZjYzExMzI2ZjlfSUQ6NzY4ODc3OTE4MTIxNTIzOTcwNl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

### 4\.7 Linear Separability

\(a\) A pair of linearly separable patterns; 

线性可分：**当且仅当（至少）**存在一个权重向量 **w**，使感知机能正确完成分类。

\(b\) A pair of non\-linearly separable patterns\.

线性不可分：单层感知机**永远无法**解决 XOR。因为把四个点画在平面上，不可能用**一条直线**把 \(0,1\)、\(1,0\) 与 \(0,0\)、\(1,1\) 分开，**解不存在**。这个问题直到加上隐藏层才被解决，也是神经网络在 1969–1980 年代沉寂的直接原因。

|**逻辑函数**|**真值表（输出为 1 的组合）**|**是否线性可分**|**一条可用的判定线**|
|---|---|---|---|
|**AND**|仅 \(1,1\) → 1|**是**|x₁ \+ x₂ − 1\.5 = 0|
|**OR**|\(0,1\)、\(1,0\)、\(1,1\) → 1|**是**|x₁ \+ x₂ − 0\.5 = 0|
|**XOR**|\(0,1\)、\(1,0\) → 1|**否**|**不存在**这样一条直线|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTBjYjQ3ZTc4YzhiNjM0NTE2NGI4NTRjNjExNzFhZDRfNGUwYjY1YjlkMWY0MTQ5OTEyNDQzYzFkMTY3ZDg3NTlfSUQ6NzY4ODc5MDA4NTk2MDk5NDMzMV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

### 4\.8 Beyond Two Dimensions

#### 4\.8\.1 多维空间中的线性可分

当输入维度达到 3 维或更高时，我们不再使用简单的“直线”来划分数据，而是使用超平面（Hyperplane）。

- 超平面方程：在 $m$ 维空间中，超平面的数学表达式为

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YmRiNWYzODEyODQyZjA1NzM2MDNhMmI5MjRhYjc0ZmVfZTdlNjBlYTliNTdkNWI0NjRjMzk1ODE3ODMzNzMwM2ZfSUQ6NzY4ODc5MTQzMTkxNzQwNzc3Ml8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

- 空间划分：这个超平面将 $m$ 维空间划分为两个区域，分别对应不同的类别，不同区域满足不同方程： 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTU4ZWUyNTE4ZTJlMGU2YTg5Y2NjOWJiYjRjOTIyYThfMmEwOTY0YjViMWYwOTVmYzI3YWY1Y2JiYjk3NzM4M2VfSUQ6NzY4ODc5MTUxODI4NjQ2NjU4OF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

#### 4\.8\.2 维度挑战

- 二维空间：我们可以通过几何构造（即肉眼观察和作图）轻松判断数据是否线性可分，并找到合适的分类器。

- 三维及更高维：随着维度的增加，直观的几何判断变得不再直接，也无法通过简单的视觉观察来确定分类界限。

#### 4\.8\.3 核心问题

如果两个类别在数学上是线性可分的，是否存在一种机械化的程序（即算法）来自动获取感知机（Perceptron）的权重 $w$？

引出了机器学习中著名的**感知机学习算法**，它能够通过迭代自动找到这个超平面的权重。

## Part 5 Perceptron Learning

### 5\.1 Setting up the problem

假设感知机的输入变量来自两个**线性可分**的类 C₁ 和 C₂。

**已知**：若 C₁ 与 C₂ 线性可分，则**存在**权重向量 w′\* 使：

w′\*ᵀ·x′ \> 0  对所有 x ∈ C₁   … \(1\)

w′\*ᵀ·x′ \< 0  对所有 x ∈ C₂   … \(2\)

**给定训练集** X = X₁ ∪ X₂（其中 X₁ ∩ X₂ = ∅），且 X₁ ⊆ class C₁、X₂ ⊆ class C₂。

训练问题（Training problem）：寻找一个权重向量 w′\*，使感知机能正确分类训练集 X。注意这个定义里没有最小化误差，**感知机不优化误差**，它只是反复修正直到全部判对（这是**它与后面反向传播最本质的差别**）

### 5\.2 The Learning Algorithm

|**情形**|**d**|**y**|**\(d − y\)**|**更新式**|
|---|---|---|---|---|
|真实属于 C₁，却判成了 2|1|0|**\+1**|w′\_k = w′\_\{k\-1\} \+ η·x′（**朝 x′ 方向加**）|
|真实属于 C₂，却判成了 1|0|1|**−1**|w′\_k = w′\_\{k\-1\} − η·x′（**朝 x′ 反方向减**）|

感知机学习算法（Perceptron Learning Algorithm, PLA）的数学原理、具体计算步骤以及最终的收敛过程。

#### 5\.2\.1 感知机权重更新的几何直观

算法的核心逻辑：

- 动态调整：图中展示了决策边界（直线）随着迭代次数 $n=0, 1, 2, 3$ 的变化。通过不断旋转和移动，直到 $ w′ᵀx′ = 0
$ 这条线把所有 \+ 与 − 样本分到两侧。

- $w′ 
$是决策面的法向量，样本被漏判为正类时，把 $w′ 
$ 朝这个样本的方向拉$（+ηx′）
$让这个点在新的法向下投影变正；样本被误判为正类时，把 $w′ 
$朝它的反方向推 $（−ηx′）$。

- $η 
$只影响步长，不影响最终能否收敛（对线性可分数据）。

- 更新量正比于 $x′ 
$本身，所以离原点远的样本会造成更大的修正。

- 两种情形合起来就是 $w′_k = w′_{k-1} + η(d − y)x′$

- 对于**线性可分**的数据集，感知机学习算法会在**有限次训练轮（epoch）内收敛**到一个有效的决策边界。反之，**对线性不可分的数据（如 XOR），算法会持续振荡、永不收敛。**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzY3NmU3NzQ5ZDdkMjM4YWQ1YmJlYmJmMWRiNjZkM2VfZWZjMDAzMjZmNGNjY2EwMTQ2NDM0Y2M4OGE0YzY1MzJfSUQ6NzY4ODkxNjg0Nzc3Njk5Mjc5Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

```C++
Algorithm Perceptron;
Start with a randomly chosen weight vector w′₀;
Let k = 1;
while there exist input vectors that are misclassified by w′_{k-1}, do
    Let x′ be a misclassified input vector;
    Update the weight vector to w′_k = w′_{k-1} + η(d − y)x′
    where η > 0 and  →  d = 1 if x belongs to class C₁；d = 0 if x belongs to class C₂
    Increment k
end-while
```

### 5\.3 1\-D Worked Example

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmIwOWI4NTA5ZDlkZTQ0MGJiODZkMjFlZmIzYTFhZjhfYTdiZjg5NDI3YzE1N2U5MTkwNWU4YzAzMzVhMDk3ZDRfSUQ6NzY4ODkyOTExMDYzODMxNzA4OF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDAxYjc3ZWU0OGMxODFiMDVlN2E2YjEyYjlmM2Y3NWZfN2MzYzU2ZjA0ZTc2ODQ2YjRlNjI4YWFiYTUxMjRkMDBfSUQ6NzY4ODkyOTE0NjgwNjI3NTYxMF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

**题目给定的初始条件**：

学习率 η = 1；初始权重 w′₀ = \[−1\.5, −2\]ᵀ（依次为偏置 b 与权重 w）

**样本呈现顺序**：x′ = \(1, 0\.5\)ᵀ, \(1, −1\)ᵀ, \(1, 2\)ᵀ, \(1, −2\)ᵀ

**逐步推演（每一步都写全：算 v → 判 y → 比 d → 决定是否更新）**：

|**迭代**|**x′**|**真实 d**|**v = w′ᵀx′**|**判出 y**|**是否更新**|**更新后的 w′**|
|---|---|---|---|---|---|---|
|0|（初始）|—|—|—|—|\[−1\.5, −2\]|
|1|\(1, 0\.5\)|1|−1\.5·1 \+ \(−2\)\(0\.5\) = −2\.5|0|**是**（0 ≠ 1）|\[−0\.5, −1\.5\]|
|2|\(1, −1\)|0|−0\.5·1 \+ \(−1\.5\)\(−1\) = \+1\.0|1|**是**（1 ≠ 0）|\[−1\.5, −0\.5\]|
|3|\(1, 2\)|1|−1\.5·1 \+ \(−0\.5\)\(2\) = −2\.5|0|**是**（0 ≠ 1）|\[−0\.5, 1\.5\]|
|4|\(1, −2\)|0|−0\.5·1 \+ 1\.5·\(−2\) = −3\.5|0|**否**（0 = 0）|\[−0\.5, 1\.5\]|

**每次更新用了哪条分支**：

1. **迭代 1**：w′₁ = w′₀ \+ η\(1 − 0\)x′ = w′₀ \+ \(1, 0\.5\)ᵀ = \[−0\.5, −1\.5\]ᵀ（漏判为正类，**加**）；

2. **迭代 2**：w′₂ = w′₁ \+ η\(0 − 1\)x′ = w′₁ − \(1, −1\)ᵀ = \[−1\.5, −0\.5\]ᵀ（误判为正类，**减**）；

3. **迭代 3**：w′₃ = w′₂ \+ η\(1 − 0\)x′ = w′₂ \+ \(1, 2\)ᵀ = \[−0\.5, 1\.5\]ᵀ（漏判为正类，**加**）；

4. **迭代 4**：w′₄ = w′₃（本轮判对，**不更新**）。

至此完成了**第一个 epoch**。复用训练数据重复上述过程后可以发现，**该算法在这个问题上于第一个 epoch 之后就已经收敛**（即 w′₄ 就是解）： $w′₄ = [−0.5, 1.5]ᵀ
$

对应判定点为 $x = −b/w = −(−0.5)/1.5 = 1/3$

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODMwMjNlYjMzMzBkYWVlNjA2NmM1YjU2Mjg4NDZhNmFfNjI2YWM1MDMyNjUyOWU5MDA5NTVkOTk5NDdkYzFhMjhfSUQ6NzY4ODkyODY0ODU4OTUyODYwMF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

w′₁ = \[−0\.5, −1\.5\] → x = −1/3（1st）；

w′₂ = \[−1\.5, −0\.5\] → x = −3（2nd）；

w′₃ = w′₄ = \[−0\.5, 1\.5\] → x = \+1/3（3rd）。

初始权重 w′₀ = \[−1\.5, −2\] 对应的判定点为 x = −0\.75（即图上的 0th）—— 该图的横轴为非等距的自定义刻度，标注位置只作示意，不必按像素间距去反推数值。最终边界 x = 1/3 恰好落在 Class 2 的最大值（−1）与 Class 1 的最小值（0\.5）之间，所以它成功分开了两类 。

### 5\.4 2\-D Example

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGFlZTk3MjJkZjI1ODdhODY2NDZlYmJlYjZkNjZhMjJfMGViMmQyNTk0MmIzOTY5NGRhODQ4MDljMTlkNjYyOTlfSUQ6NzY4ODkzMDUxNjkwNDc5MTU4MF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mjc5ZTY0ZGQ0OGEwODgwNmIyNDQwODIzMjA1MWFkYjZfM2UyNjUyZGRiZjk2N2MwNzJmOTQ0ZWUzN2M3ODVmOTZfSUQ6NzY4ODkzMDU1ODc5NzgyNzYxNl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

有两类模式，分别围绕 \(1, 2\) 与 \(3, 1\)，**每类 5 个数据点**

- 用**感知机学习算法**训练；

- **经过 100 个 epoch 之后**，得到的权重向量为：

（自上而下依次为**偏置 **$b = 0.0041、w₁ = −0.0349、w₂ = 0.0534
$）

**因此判定线为**：$0.0041 − 0.0349·x₁ + 0.0534·x₂ = 0$

**这个结果怎么读**（把它整理成熟悉的斜截式）：

- 移项： $x₂ = (0.0349·x₁ − 0.0041) / 0.0534 ≈ 0.6536·x₁ − 0.0768
$；

- 代入 \(1, 2\)： $f = 0.0041 − 0.0349 + 0.1068 = +0.076 > 0$，落在正侧；

- 代入 \(3, 1\)： $f = 0.0041 − 0.1047 + 0.0534 = −0.047 < 0$，落在负侧；

- 两类确实被分到判定线两侧 —— 训练成功。

1. **权重都趋近于 0（0\.0041 / −0\.0349 / 0\.0534）**，说明算法在后期只做极小的修正 ，感知机在线性可分数据上收敛后，误分样本会越来越少，更新步长自然变小。注意这不是学习率自动衰减，而是错分的样本少了、修正的机会少了。

2. **w₁ 是负的、w₂ 是正的，与两类样本的位置关系一致**：x₁ 越大越可能属于 \(3,1\) 那一类，x₂ 越大越可能属于 \(1,2\) 那一类。权重的符号直接告诉你哪个特征指向哪一类，这是线性模型唯一可解释的地方，多层网络变黑箱的对照：多层网络的权重就没有这种直观含义了。

这两张图片从网络架构的角度，解释了感知机如何从简单的“单层结构”演变成能够处理复杂问题的“多层结构”。

## Part 6 Multilayer Perceptron 

### 6\.1 Network Architectures 

#### 6\.1\.1 网络架构的定义

分层网络（Layered Networks）：

1. 单个节点不足以解决许多实际问题（Single node is insufficient for many practical problems）；实践中经常使用大量节点组成的网络；

2. 网络架构（network architecture）定义节点之间如何连接；

3. 分层网络（Layered Networks）：节点被划分成若干子集，每个子集称为一层（layer）；如果 k \> j，则没有从第 k 层到第 j 层的连接（No connections lead from layer k to layer j if k \> j）；层内连接可能存在（Intra\-layer connections may exist）。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjI5ZGI3MWQyY2ZkODhkNWI1MTYwYTI1NzEzMjBlN2NfMjUyOGE0MjNkYmRhOTY2ZGI0ZDEyNTg3MzhiOGZmMGFfSUQ6NzY4ODkzNTU3MTAyODM0ODQ0NF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**层 Layer**|**名称**|**说明**|
|---|---|---|
|Layer 0|输入层 input layer|只负责接收外部数据，不做计算，不计入层数|
|Layer 1 … n−1|隐藏层 hidden layer\(s\)|夹在输入与输出之间，做非线性变换|
|Layer n|输出层 output layer|产出网络的最终结果|

### 6\.2 Single\-Layer Feedforward Networks 

单层前馈网络

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjBhYWM2YTc2YTFlNTQyNDVjZDhkODFkYzU2NmI0ODJfM2NhNzA5MWZmMDFiZDhiNjM0MjRjNWJmNDdlM2E5OThfSUQ6NzY4ODkzNTU2OTU2MDU3MTQxOV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

- 计算层：虽然图中有“输入”和“输出”两排节点，输入层（源节点）→ 一层输出神经元，中间没有隐藏层，它被称为“单层网络”。

- 原因：因为输入层的节点只负责分发信号，不进行任何数学运算（不加权、不求和、不激活）。只有输出层的神经元在进行计算 the layer refers to the **output layer of computation nodes**。

- 局限性：正如我们之前讨论的，这种**单层感知机**只能解决线性可分的问题。

### 6\.3 Multilayer Feedforward Networks 

多层前馈网络：从单层（只能画直线）到多层（可以画曲线、处理复杂逻辑）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWViOTdiMjlkODU4MWM0YzQ1NTFiZDdiNWQ2YjVlNDFfYzY0MTlhYTRhYWM0MDUxZTdhYzU4MWYwYmY0MzJjMzFfSUQ6NzY4OTAzNDE4MDczNDQyMjU1NV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

隐藏层（Hidden Layers）概念：

- 隐藏层节点：位于输入层和输出层之间，被称为“隐藏神经元”，是神经网络强大的核心。

- 特征提取：**隐藏层的作用（intervene between the external input and the network output）**是介入输入与输出之间，作为中间表达，对原始数据进行**加工**。通过多层非线性变换，**网络能够提取出数据中更深层次的特征**。

- 解决复杂问题：通过增加隐藏层，神经网络可以突破线性可分的限制，从而解决像 XOR（异或） 这样单层感知机无法处理的非线性问题，所以隐藏层的加入，使得神经网络具备了模拟任何复杂函数的能力。

- 全连接（Fully Connected）：图中展示了每一层的每个节点都与下一层的所有节点相连，这是最经典的多层感知机（MLP）结构 Neurons in each layer have as their inputs the **output signals of the preceding layer only**。

### 6\.4 Multilayer Perceptrons \(MLP\)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2Y0NjliOWI4MzJmNjQ4MTZlNzFjNzM2ZTE4NjdmMTFfYmY3MGRjMTBlODdjYjI3M2VlNTNiNWE2Mzc0NDkyZmVfSUQ6NzY4OTAzNzE1ODU1MTkxNjA1OF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

MLP 是**单层感知机的推广（Generalization of the single\-layer perceptron）**，由三部分组成：

1. 一个**输入层**（An input layer）

2. **一个或多个**由**计算节点组成**的**隐藏层**（One or more hidden layers of computation nodes）

3. 一个**输出层**（An output layer of computation nodes）

MLP **一般对每个神经元采用非线性（且可微）的激活函数** it adopts a **nonlinear \(differentiable\)** activation function for each neuron，例如**逻辑函数（logistic function）。**

其中 $v_j $是神经元 $ j $的**诱导局部场**（加权和 \+ 偏置），$y_j 
$是该神经元的输出：

$y_j = 1 / (1 + exp(−v_j))$

**Tips：**

**为什么必须是可微的？Training Algorithm: Back\-Propagation \(BP\) algorithm。因为训练要靠反向传播，而反向传播要靠链式法则求导，所以激活函数必须可微。**

**为什么不能就用阈值函数堆多层？因为不可微，梯度传不下去。**

这一个因果链串起了阈值函数不可微、必须换 logistic、BP 全部推导。

### 6\.5 The XOR Problem

1. 问题背景

- 任务是**对单位超立方体中的点（取 0 或 1）做分类**；

- **XOR 是非线性可分（nonlinearly separable）的典型**；

- **基本感知机无法解决 XOR 问题，**因为 **XOR 的决策边界不可能是一条直线，不是线性的**。

2. 解决方法

使用一个**两层网络**，每个神经元都用**阈值函数**作为激活函数。

网络含 3 个神经元：**Neuron 1、Neuron 2 在隐藏层，Neuron 3 在输出层**。

## Part 7 Back\-Propagation

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODZhNjk4OTBkYzUwMDkxM2ZjYTZhOTI0ZDFjMzk3MWZfY2M2ZGY0YThiOWU1OWZiN2Q3OTc5YjcwMzhjNGM2NzNfSUQ6NzY4OTI5NTA4MDI0MjM4NDQwOF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OGNiZTNlNDdkMTIxMDhkMGJkZWMwMDFmMDFlYzcyMmZfODViODczMjMyMjM3MjA3ODZhOTI5Nzg3ZTcwMWEwMmNfSUQ6NzY4OTI5NDk5MTA1ODk2Mzk5NV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

### 7\.1 Training as Optimization

目标：to minimize an energy function representing the instantaneous error\.

最小化一个表示「瞬时误差」（instantaneous error）的 energy function（能量函数）

**误差函数（能量函数）：**

$E = ½ Σ_{j=1}^{n₃} (d_qj − x⁽³⁾_{out,j})² = ½ ‖d_q − x⁽³⁾_{out}‖²
$

其中 $ d_q 
$是第 q 个输入模式的期望输出， $x⁽³⁾_out
$是 MLP 的实际输出，1/2是为了在求导时抵消平方带来的因子 2。

### 7\.2 The General Learning Rule

**权重更新通式：**

$Δw⁽ˢ⁾_ji = − η⁽ˢ⁾ · ∂E_q / ∂w⁽ˢ⁾_ji$

即，$w(n + 1) = w(n) − η·g(n)$

问题：怎么高效地算出 $∂E/∂w$？

解决：链式法则\+从输出层往输入层递推，即反向传播。

|**符号**|**含义**|
|---|---|
|s = 1, 2, 3|指定网络层（designates the appropriate network layer）|
|η⁽ˢ⁾ \> 0|对应层的学习率参数（learning rate parameter），例如取一个常数|
|∂E\_q/∂w|误差对权重的偏导（**反向传播要算的核心量）**|

### 7\.3 Output Layer 局部梯度的推导

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzlkM2Y2ZDkyMWRmMzE5ZDg0YTJmMzlmZjZiYWY0NjdfMmYxZWFiZDhmZjE3NDc2NWI0MjViYTMzODkyMDdjYzRfSUQ6NzY4OTI5NTI4ODcxMTk0MTY1Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

对输出层的神经元 j：

1. 先用链式法则（By chain rule）把要求的偏导拆成两部分：
$∂E/∂w⁽³⁾_ji = (∂E/∂v⁽³⁾_j) · (∂v⁽³⁾_j / ∂w⁽³⁾_ji)$

2. 第二部分： $v⁽³⁾_j = Σᵢ w⁽³⁾_ji · x⁽²⁾_{out,i}$，所以  $∂v⁽³⁾_j/∂w⁽³⁾_ji = x⁽²⁾_{out,i} $

3. 也就是前一层（第二层）的输出信号，即进入这个权重的那个输入；

4. 第一部分定义为局部梯度：

输出层的局部梯度：局部梯度 = （期望输出 − 实际输出）× 激活函数的导数，即

$δ⁽³⁾_j = − ∂E/∂v⁽³⁾_j = (d_qj − x⁽³⁾_{out,j}) · φ′(v⁽³⁾_j)$

最后得到输出层的权重更新规则：

$Δw⁽³⁾_ji = η⁽³⁾ · δ⁽³⁾_j · x⁽²⁾_{out,i}$

即  $w⁽³⁾_ji(k + 1) = w⁽³⁾_ji(k) + η⁽³⁾ · δ⁽³⁾_j · x⁽²⁾_{out,i}$

δ⁽³⁾\_j ：δ 被称为该神经元的局部梯度（local gradient），也叫局部误差（local error）。即这个神经元该往哪个方向改、改多猛，误差越大改得越多，激活函数在当前工作点的导数越大改得越多。

### 7\.4 Hidden Layers 局部梯度的递归

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjYyZDNiYzgyNDJhOTExYWMzZDM2ODYwYWZiNmNlNWVfZjYzZjZmMTlmYjJjMmYzOTZhYTk1YTc4MzNiMjgwM2JfSUQ6NzY4OTI5ODAxMzcwNTQ3MzU2OF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

原则：隐藏层的神经元没有直接的期望输出，所以它对总误差的贡献是间接的，它通过影响后一层，再影响输出，才作用到误差上。

推导过程（仍然是链式法则，只是展开得更长）：

1. 起点同样是  $Δw⁽²⁾_ji = − η⁽²⁾ · (∂E/∂v⁽²⁾_j) · (∂v⁽²⁾_j/∂w⁽²⁾_ji)$；

2. 第二部分依然简单： $∂v⁽²⁾_j/∂w⁽²⁾_ji = x⁽¹⁾_{out,i}$（第一层的输出）；

3. 难点全在  $∂E/∂v⁽²⁾_j$：要把误差函数展开，用链式法则对它求导，并引入输出层的局部误差来化简。

隐藏层的局部梯度：局部梯度 = 本层激活导数 × （后一层所有神经元的局部梯度，按连接权重加权求和）

$δ⁽²⁾_j = φ′(v⁽²⁾_j) · Σ_{k=1}^{n₃} δ⁽³⁾_k · w⁽³⁾_kj$

对应的权重更新规则：

$Δw⁽²⁾_ji = η⁽²⁾ · δ⁽²⁾_j · x⁽¹⁾_{out,i}
$

$w⁽²⁾_ji(k + 1) = w⁽²⁾_ji(k) + η⁽²⁾ · δ⁽²⁾_j · x⁽¹⁾_{out,i}$

可见何为反向？

输出层的 δ 用的是已知的期望值 d（直接可算）；隐藏层的 δ 用的是后一层已经算好的 δ。所以计算顺序必须从输出层开始，一层一层往回退。也正因为如此，只要激活函数可微，隐藏层有多少层都能用同一个递推式。

### 7\.5 Unified Form and Two Passes

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Njg0ZDI5MzU2MTQ3MmYwNzQyYTg5MGM4NTEwYzY5NzBfMzFhMzU1ZjQ1OWYzMDg0ZDM0NmEwN2I5ZWMxN2I4MGVfSUQ6NzY4OTI5OTMyMTcwMjkxMTUyMF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Yzc2N2M5ZjUzNmJhOWVmODIzYTdlMjdiM2EwMDFhMDJfNDY2NTI3YTliODE4ZGViODBkZDdlYmU4YTE4M2JhODJfSUQ6NzY4OTI5OTI4NzMzOTc2NTI3NF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

1. 两层的规则放在一起对照，权重更新统一式相同：

$w⁽ˢ⁾_ji(k + 1) = w⁽ˢ⁾_ji(k) + η⁽ˢ⁾ · δ⁽ˢ⁾_j · x⁽ˢ⁻¹⁾_{out,i}$

2. 区别：局部梯度的算法

输出层：局部梯度正比于期望输出与实际输出之差；

$δ⁽ˢ⁾_j = (d_qj − x⁽ˢ⁾_{out,j}) · φ′(v⁽ˢ⁾_j)$

隐藏层：局部梯度也可以理解为正比于该神经元期望输出与实际输出之差，但隐藏层神经元的期望输出是未知的，必须用所有相连神经元的误差信号递归估计出来； 

$δ⁽ˢ⁾_j = φ′(v⁽ˢ⁾_j) · Σ_{k} δ⁽ˢ⁺¹⁾_k · w⁽ˢ⁺¹⁾_kj$

Tips: 该式可以推广到任意数量隐藏层的 MLP（Eqn\. \(4\) can be generalized for MLP having an arbitrary number of hidden layers）

反向传播算法的计算（Back\-propagation: 2 passes of computation）：

1. 前向传播（Forward pass）：为每个神经元计算函数信号（function signals）。

2. 反向传播（Backward pass）：从输出层开始，递归地为每个神经元计算 δ，从输出层一直回到第一个隐藏层；在每一层，按（5）式的 delta 规则相应地修改突触权重。

Tips：BP 能撑起深度学习的最直接的工程原因：无论你的多层网络有多少个隐藏层，都可以用完全相同的递归方式来更新权重堆层不需要新算法，只需要多循环几次。

### 7\.6 Why Sigmoid Is Convenient

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzczMmRmMGMyOTY5NGQ5MTQ2YjFkZjM2Yzg4YjQyOGVfNDY1ODg5ZGE5NTk1ODA0OTc0MjdkOThiNmJkNTBmZDBfSUQ6NzY4OTI5OTQ2NzczNjA0MzAzMl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OGE0ZDZjNzlhYmY0ZGNhM2FkYzE1YjA3YmFkNWI5ODJfNTE5ODU3MGNkOTJiMmFjMGVlMzNlNzg5YmMyMTIxMTFfSUQ6NzY4OTI5OTUxMDY3NzczNjk4NF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

1. 激活函数的核心要求是可微（Differentiability）；常用的是 S 形函数，例如逻辑函数。简化后公式为：

$φ′(v) = a · y · (1 − y)$

此时，$φ′(v) $在 y = 0\.5 时取最大值，在 y = 0 或 1 时取最小值 0。

2. **梯度消失：**Sigmoid 饱和 →  $φ′ → 0 $→ 梯度消失 → 前面的层学不动

如果某个神经元的输出已经饱和（y 接近 0 或 1），它的 $ φ′(v) ≈ 0$，于是权重几乎不再更新，这个神经元学不动了。在多层网络里，这种衰减会逐层相乘，越靠前的层梯度越小，最后趋近于 0，这就是深层网络难以训练的经典原因。

3. 两个局部梯度都可以只用输出值表达：

|**情形**|**局部梯度表达式（Sigmoid 下）**|**含义**|
|---|---|---|
|**输出层神经元 j**|$δ⁽ˢ⁾_j = a · x⁽ˢ⁾_{out,j} · (1 − x⁽ˢ⁾_{out,j}) · (d_qj − x⁽ˢ⁾_{out,j})$|误差 × 导数，导数用输出值表示|
|**隐藏层神经元 j**|$δ⁽ˢ⁾_j = a · x⁽ˢ⁾_{out,j} · (1 − x⁽ˢ⁾_{out,j}) · Σ_k δ⁽ˢ⁺¹⁾_k · w⁽ˢ⁺¹⁾_kj$|后一层误差信号加权求和，再乘本层导数|

由于权重改变量正比于导数 $ φ′(v)$，对 Sigmoid 激活函数来说，那些函数信号处于中间范围的神经元，权重被改变得最多；局部梯度  $δ_j $可以在不需要显式知道激活函数的情况下算出来。

### 7\.7 Epoch and Stopping Criteria

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzA5MjRjYTM2OTc1MDI5YjFlYWQ0MzI1YTM2MjhkYmFfOGFkMTk4OWQ5ZjhkZGVkM2ViMmEzNWY2YzFiNGRkMWRfSUQ6NzY4OTMwMzE5NTc3NjIyNDc5NF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

#### 7\.7\.1 Epoch

An epoch = A complete presentation of the entire training set during the learning process\.   一个 epoch 就是把整个训练集完整过一遍，学习过程按 epoch 为单位反复进行（epoch\-by\-epoch），直到满足收敛准则（criterion of convergence）。

#### 7\.7\.2 三种停止准则

1. 每个 epoch 的均方误差的绝对变化率足够小（Absolute rate of change in mean squared error per epoch is sufficiently small）看的是**误差还在不在动**（一阶差分），哪怕误差还很大，只要不再下降就停；

2. 突触权重与偏置水平稳定下来（Synaptic weights and bias level stabilized）看的是**参数还动不动；**

3. 整个训练集上的均方误差小于某个最小值（Mean squared error over the entire training set is less than some minimum value）看的是**误差够不够小**（绝对水平）。

Tips: 三者可以独立使用，也可以组合。实践中常把1或3配一个**最大 epoch 数**做保险（否则可能永远不满足）。

### 7\.8 The Full Algorithm

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YmI5ZjQ2NmFkMDhjYjNhMWNmZDRhNzgzNjQ4NGYxMDNfYWUzY2M0ZTY3NGM5OWNmMDYxYzZiOTA4OWM2YTNkZWFfSUQ6NzY4OTMwNTA5ODQ2MzMwMTE0OF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

**用流程图标出五个步骤**：Initialization → Presentation of training examples → Forward computation → Backward computation → Is stopping criterion met? → No（回到呈现样本）/ Yes → End

1. **初始化（Initialization）**：初始化**权重与偏置**；

2. **呈现训练样本（Presentation of training examples）**：呈现一个 epoch 的训练样本；**对每个样本**执行前向与反向计算；

3. **前向计算（Forward computation）**：计算**误差信号**；

4. **反向计算（Backward computation）**：计算 **δ 并依据delta rule调整权重**；

5. **迭代（Iteration）**：若**未满足停止准则**，回到第 2、3、4 步。

### 7\.9 Structure vs Decision Regions

Different Nonlinearly Separable Problems

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2RhOWY1YjE2ZThmNDI3NWViYTRmMGU2ZGRkMDhhNDdfZWIzMGNiOWZiN2VkYjU2MDU3M2U3MjM5YzNhMzhkMjVfSUQ6NzY4OTMwNzUwNzk0OTg5OTI5MV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|**结构 Structure**|**决策域类型 Types of Decision Regions**|**XOR 问题**|**网格状区域 Meshed Regions**|**最一般形状 Most General**|
|---|---|---|---|---|
|**单层 Single\-Layer**|**由超平面界定的半平面**<br>Half Plane Bounded By Hyperplane|做不到|做不到|只得到半平面|
|**两层 Two\-Layer ****隐藏层 \+ 输出层**|**凸的开放或闭合区域**<br>Convex Open Or Closed Regions|能做到|部分可以|受限|
|**三层 Three\-Layer**|**任意形状（复杂度受节点数限制）**<br>Arbitrary \(Complexity Limited by No\. of Nodes\)|能做到<br>|能做到|最一般|

单层 → 半平面（一条直线 / 一个超平面）；

两层 → 凸的开放或闭合区域；

三层 → 任意形状，复杂程度只受节点数量限制。

需要注意：一个 MLP 在容量上可能足以表示某个函数（**三层能表示任意形状**），但梯度下降这个过程未必能找到那组权重，因为它在错误的盆地（basin）里下降到谷底就停下了。表达力是网络结构的问题，可学习性是优化过程的问题，两者不是一回事。

## Part 8 Limitations of Back\-Propagation

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Njk0ODg3ZTU4MjY2M2MwNjMxZjQ0YzVhYmE2MzU3ZjNfYmI2YmY5NjMyN2ExMTJhYjEyYzA4YTdiOTdkZDQxYWVfSUQ6NzY4OTMxMjAxNjQ0MzU1OTQ1MV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**编号**|**缺陷 Deficiency**|**课件原文 Key Sentence**|**含义**|
|---|---|---|---|
|①|**收敛慢 Slow convergence**|Learning often takes a long time to converge\. Complex functions often need **hundreds or thousands of epochs**\.|复杂函数要成百上千个 epoch，训练成本高|
|②|**黑箱 Black box**|It may provide a desired mapping between input and output vectors \(x, y\) but does not have the information of **why a particular x is mapped to a particular y**\.|只能给出映射，学到的只是操作性参数，没有可解释的因果说明|
|③|**容易陷入局部极小 Local minimum**|Gradient descent approach only guarantees to reduce the total error to a **local minimum** （E may not be reduced to zero）\.|误差曲面非凸、无唯一最小点，梯度下降可能困在局部极小；通常只能靠换结构、换初值、加随机扰动（如模拟退火）缓解。|
|④|**参数全靠经验 Empirical parameters**|The learning \(accuracy, speed, and generalization\) is highly dependent on a set of learning parameters… Most of them can only be determined **empirically \(via experiments\)**\.|初始权重、学习率、层数与节点数没有理论解，只能试|

Tips: 1\. 慢、2\. 说不清、3\. 可能不是最优、4\. 全靠调参。

前两条是工程代价，后两条是理论缺口。

第4条同时说明了一件事，神经网络的超参数（hyperparameter）这个概念就是从这儿来的：**权重与偏置是学出来的，层数 / 节点数 / 学习率 / 初始权重是人给的。**

### 8\.1 Long Training Time

1. 现象：复杂函数常常需要成百上千个 epoch才收敛。

2. 为什么慢：每个 epoch 都要对全部训练样本做一次前向 \+ 反向传播计算；而每次权重更新只挪动很小的一步（步长由学习率 η 决定）。

3. 与第7部分呼应：第 7\.3 / 7\.4 节的更新式 $w ← w + η·δ·x $里，如果 $ η $太小 → 步数多； $η $太大 → 可能在极小点附近来回震荡甚至发散。这就是第4条参数全靠经验的具体表现。

Tips：没有在这里给出怎么加速（动量、自适应学习率等都不在本讲范围）。本讲只要求记住：收敛慢是 BP 的固有代价，不是实现 bug。

### 8\.2 Black Box

The net is essentially a black box 这个网络本质上就是一个黑箱。

为什么它说不清：

1. 它能给出映射，但不给理由：It may provide a desired mapping between input and output vectors \(x, y\) but does not have the information of why a particular x is mapped to a particular y\.

2. 所以给不出直观的（例如因果的）解释：It thus cannot provide an intuitive \(e\.g\., causal\) explanation for the computed result\.

3. 根因在于隐藏单元与学到的权重没有语义：This is because the hidden units and the learned weights do not have a semantics\.

What can be learned are operational parameters, not general or abstract knowledge of a domain\.

能学到的只是操作性参数，而不是某个领域的通用或抽象知识。

operational parameters与abstract knowledge这组对立：一个训练好的网络里存的是一堆数字（权重与偏置），不是如果高频能量集中在 2 号频段，就说明是 Steve这类可以用语言说清楚的规则。这正是医疗、司法等需要高透明度决策的场景不能直接用 BP 网络的原因。

### 8\.3 Local Minima

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWE2YWEyOGMyOWU3MWFhYTlmMzhkODE5OTA0NTYwZWRfOGU3ZWE2ZTE5NzU0NGEwZWQ3ZDk0MzAxZDZhNzZhY2FfSUQ6NzY4OTMxNTQ2MDk5ODgxMTE2NF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

1. Gradient descent approach only **guarantees to reduce the total error to a local minimum** （E may not be reduced to zero）

2. **Cannot escape from the local minimum error state\.**

3. **Not every function that is representable can be learned\.**

可表示≠可学习，一个 MLP 在**容量上**可能足以表示某个函数，但**梯度下降这个过程**未必能找到那组权重，因为它在错误的盆地（basin）里下降到谷底就停下了。**表达力是网络结构的问题，可学习性是优化过程的问题，两者不是一回事。**

#### 8\.3\.1 How bad

depends on the shape of the error surface\. Too many alleys/wells will make it easy to be trapped in local minima\.

窄巷与坑越多，越容易被困在局部极小

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDQyYzIyYzc2ZDFiZjcwZGE0ZDQ1YjA5OTA1MWMzYjNfOWMyZDI5OTU3NWE2YTQ5ZGNiYjdjMTRkOTdkOTg2ZDNfSUQ6NzY4OTMxMTk2MDYxMzA4MDYwNF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

MLP with nonlinear activation functions have complex error surfaces \(e\.g\., plateaus, long valleys etc\.\) with no single minimum\.

含非线性激活函数的 MLP，其误差曲面是复杂的，**深度学习网络是非凸优化，分布山谷山脊，以山谷为例。在山谷震荡，不存在唯一的最小点**。

|**词汇 Vocabulary**|**中文**|**在误差曲面上的含义**|
|---|---|---|
|plateau|平台区|一大片几乎平坦的地方，梯度≈0 → 走得很慢，像是卡住了|
|long valley|长谷|一个方向陡、另一个方向平的长条形凹槽 → 在最速下降里会沿谷壁来回弹|
|alley|窄巷|又窄又深的通道，很容易把人关在里面|
|well|井 / 坑|局部极小点所在的凹陷处|
|local minimum|局部极小|比周围都低，但不是全局最低|
|global minimum|全局最小|整个曲面上真正的最低点 —— 我们想要的|

#### 8\.3\.2 Three Remedies

1. 换网络规模试试：Try nets with different \# of hidden layers and hidden units ——它们会带来不同的误差曲面，有些可能比另一些更好（they may lead to different error surfaces; some might be better than others）。

2. 换初始权重试试：Try different initial weights —— 相当于在曲面上换一个出发点（different starting points on the surface）。

3. 用随机扰动强行跳出：Forced escape from local minima by random perturbation（例如 simulated annealing）。

simulated annealing（模拟退火）正是 Week 2 讲过的允许以一定概率接受更差解的方法，Week 3 的进化计算也是同一思路（靠种群与随机变异维持探索）。

Tips：所以本讲最后给出的跳出局部极小的出路，其实是用的之前学的，**不依赖梯度的迭代搜索，梯度负责快，随机搜索负责别被困死**。

### 8\.4 No Theoretical Quality Guarantee

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTE5OGMwYTE5OTJjMDM3NDgwNTRkODkwZDEwMjQ4MjZfYmQ3ZTNhMzhjZjQ1ZTAyOGFlZmFiZGIzNzUzZmIzMmNfSUQ6NzY4OTMxNTU2ODI1NTg4MDczMV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

There is no theoretically well\-founded way to assess the quality of BP learning:

What is the confidence level one can have for a trained BP net, with the final E \(which may or may not be close to zero\)?

没有理论上站得住脚的办法去评价BP 学出来的东西有多好。训练完误差 E 可能很小、也可能不接近 0，而你对这个网络的信心该有多大，无法从理论上回答。

**问题出在学习参数上**：

1. 依赖哪些参数：Initial weights（初始权重）、learning rate（学习率）、\# of hidden layers and \# of units（隐藏层层数与节点数）…

2. 关键限制：Most of them can only be determined empirically \(via experiments\)\. —— 其中绝大多数只能靠实验（经验）来确定。

这一条与第9部分的衔接关系：既然训完不知道好不好，那就必须在训练集之外另拿一份数据去看，于是才有了下一部分的 validation error（验证误差）、underfitting / overfitting 与 learning curves。

## Part 9 Overfitting and Underfitting

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzBkYjFlMmMwOTFkYTEyZDE3YTZhYzJhMWZmM2JhNjhfNmNjMjBmMWU5ODdlMGMyZGU5ZjMxMzRiNzgyNzVlYzJfSUQ6NzY4OTMxOTA1NDc3MDgxODU4Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

### 9\.1 Three Regimes of Fit

|**状态 State**|**别名 Alias**<br>|**课件原文 Original Wording**|**训练误差**|**验证误差**|
|---|---|---|---|---|
|**Underfitting** 欠拟合|**High Bias** 高偏差|The model is too simple — **cannot capture the underlying pattern**\. Both training and validation errors are high\.|高|高（且与训练误差接近）|
|**Good Fit** 恰当拟合|**Balanced** 平衡|The model captures the true pattern **without memorizing noise**\. Both errors are low and close\.|低|低（且与训练误差接近）|
|**Overfitting** 过拟合<br>|**High Variance** 高方差|The model is too complex — **memorizes training data, including noise**\. **Low training error but high validation error\.**|低|**高**|

Tips: 

欠拟合 = 都高（训练也学不会）；

恰当拟合 = 都低且接近（学会了规律，没背住噪声）；

过拟合 = 训练低、验证高（把噪声也记下来了，换新数据就露馅）。

### 9\.2 The Bias\-Variance Tradeoff

模型复杂度与偏差：讨论模型该多大。

|**图例 Legend**|**中文**|**曲线形状（看图）**|**随复杂度怎么变**|
|---|---|---|---|
|$Bias^2 $\(underfitting\)|偏差平方（对应欠拟合）|红色，**单调下降**，由约 1\.0 降到接近 0|复杂度 ↑ → 偏差 ↓|
|Variance \(overfitting\)|方差（对应过拟合）|蓝色，**单调上升**，由接近 0 升到约 5|复杂度 ↑ → 方差 ↑|
|Total Error|总误差|绿色，**U 形**，最低处约 0\.97|先降后升，中间有个最低点|
|Irreducible Error|不可约误差|灰色虚线，**水平**，约 0\.05|与复杂度无关，降不下去|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmI5MTQzNThhYTlmZmFiYzQxODRkZDdkZjJlODQwMmJfY2NlNzcwZGQ1YzVjZGZmYzFhN2NjY2ZiZDk1NDFhNWZfSUQ6NzY4OTMyMDkyNzM4MTMxMTAwOF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Bias：来自假设过度简化的误差。

Variance：来自对训练数据中微小波动过度敏感的误差。

Goal：找到总误差最小的那个。

★**总误差曲线的最低点 **Optimal Complexity：**落在 Model Complexity ≈ 1\.7 的位置，再往左走偏差太大（欠拟合），再往右走方差太大（过拟合）**。

Tips: 

1. 三条曲线的关系：总误差 ≈ 偏差² \+ 方差 \+ 不可约误差。红色（偏差²）往下走、蓝色（方差）往上走，两者相加再加一条水平的灰线，得到的正是那条绿色的 U 形曲线。这就是权衡（tradeoff）这个词的来源：动复杂度，一边降另一边必然升，只能找平衡点。

2. 注意课件把偏差写成了 Bias^2（偏差的平方），不是 Bias。这不是笔误，标准分解式里偏差那一项本来就是平方项。所以图例读作bias squared，中文说偏差平方。

### 9\.3 Learning Curves as a Diagnostic

讨论训练集大小与误差（训练误差，验证误差）：讨论数据量该多少。

|**子图 Panel**|**两条曲线怎么走**|**诊断结论**|
|---|---|---|
|**Underfitting** 欠拟合|红线从约 **0\.38** 缓降到约 **0\.36**（几乎水平）；蓝线从约 **0\.47** 降到约 **0\.40**。**两条都高，且彼此贴得很近。**|Both training and validation errors are high and close together\. Adding more data does not help\-need a more complex model\.<br>**加更多数据没用，需要更复杂的模型。**|
|**Good Fit** <br>恰当拟合|红线从约 **0\.18** 降到约 **0\.09**；蓝线从约 **0\.28** 降到约 **0\.13**。**两条都低，且随数据量增加而收敛到一起。**|Both errors are low and converge\. The model generalizes well to unseen data\.<br>**模型对未见数据泛化得好。**|
|**Overfitting** <br>过拟合|红线从约 **0\.06** 降到约 **0\.015**（非常低）；蓝线只从约 **0\.48** 降到约 **0\.38**。**训练低、验证高，中间夹着一大片粉色区域。**|Large gap between training \(low\) and validation \(high\) error\. More training data can help reduce the generalization gap\.<br>**加更多训练数据有助于缩小泛化差距。**|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWEwYWQ2ZDExY2QyZGVlNTRjY2I1ZjVjOWE5ZjZlMjdfNmI5YjA3OThkNGZkODIwMTExYmI0YWVhODhiOWYxZDlfSUQ6NzY4OTMyMjEwNTMwMDY1MTU1Ml8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

**Tips：**Generalization gap（泛化差距），**它就是训练误差曲线与验证误差曲线之间的面积**。gap 越大 = 过拟合越严重。**过拟合的量化指标就是这个gap有多宽。**

**诊断口诀（**先用学习曲线判断是哪一种病，再用偏差\-方差权衡决定该往哪个方向调）：

1. **两条都高、且挤在一起 → 欠拟合**。

2. **两条都低、且收敛靠近 → 拟合恰当**。

3. **一条低一条高、中间 gap 很大 → 过拟合**。

### 9\.4 Five Remedies for Overfitting and Underfitting

#### 9\.4\.1 Five Remedies for Overfitting

1. 正则化 Regularization（L1/L2 penalty）：Adds penalty for large weights\. 

改目标函数：对大权重加惩罚项，逼网络别把权重推到极端值。

2. 随机失活 Dropout：Randomly deactivate neurons during training\. 

改训练过程：训练时随机关掉一部分神经元，让网络不能依赖某个特定神经元的组合。

3. 早停 Early Stopping：Stop when validation error starts increasing\.

改训练过程：验证误差一开始上升就停止训练（对应第 7\.7 节的停止准则，但这里用的是验证误差而不是训练误差）。

4. 数据增强 Data Augmentation：Increase training data diversity\. 

改数据/输入分布：增加训练数据的多样性（对应第 9\.3 节加数据能缩小 gap）。

5. 批归一化 Batch Normalization：Normalize layer inputs to stabilize training\. 

改数据/输入分布：把每层的输入归一化，稳定训练过程。

#### 9\.4\.2 Five Remedies for Underfitting

1. 增加模型复杂度 Increase Model Complexity：Add more layers or neurons\. 

加层或加节点。

2. 训练更久 Train Longer：Increase number of epochs\. 

加 epoch 数。

3. 减弱正则化 Reduce Regularization：Lower L1/L2 penalty or dropout rate\. 

把 L1/L2 惩罚或 dropout 率调小。

4. 更好的特征工程 Better Feature Engineering：Add more informative features\. 

补更有信息量的特征。

5. 换更强的结构 Use a Different Architecture：Try a more powerful model class \(e\.g\., deeper network\)\. 

换更深的网络等。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjEwYmFiYTQ1MTYzYzJkMmYxNWEyMWU2OGM4M2I1ZmVfZDU0OGY0Y2E4ZTljZTk5YWNmMzQzMWNkNjZkMmExMTNfSUQ6NzY4OTMyNTU1Njg4NTg4NDQ0M18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

Tips：

1. 过拟合要**减容量**（正则化、Dropout、早停）；欠拟合要**加容量**（加层加节点、训练更久、减弱正则化）。**唯一的例外是第4条的两侧不对称**：过拟合那边的数据增强是**造更多数据**，欠拟合这边的特征工程是**把现有数据表达得更好。**一个加量，一个提质，因为两种缺的东西不一样。

2. **减弱正则化这条容易被忽略**：如果你发现模型欠拟合，要先检查一下是不是**正则化开得太狠**、或者 **dropout 率设得太高，**这不一定是模型容量的问题，也可能是把它捆得太紧了。

3. 掌握：这是欠拟合还是过拟合、为什么、下一步该加数据还是改模型。

## Part 10 Case Study: Voice Recognition

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2RhNWEzZWY1M2E4MWQ0N2FiZDczMzgxZWFhMGEwZjZfNzVmZTk4YzY5YWU3YWMxNjAxMDVmMjFjYTc1ZjRjODFfSUQ6NzY4OTMyNTk5NDk3MjYzMDU1NF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGNiMTAyNGVlZjEwM2VkYTViMGYzZjY3NmY5YThkMDNfODA1ZDY0NzkyMjA3Y2VhZGI4NjVjYTFlZThiN2FlMmVfSUQ6NzY4OTMyNjAzMDc5MTc1NzMzOF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzA3OGM2N2ZhOTk4NGU1ODQ1NzU0MTFhNWI2ZmI5MjVfMzZmMmQ3Yjg1OWI0ODU4MWZiOTAxMTU2NGNhYWZkNmNfSUQ6NzY4OTMyNjEyMTA4Njg5NzY5Nl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)



![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTZlODc5NjMyOGY1MjYxODRmZjliMDAwOTQ2OGQ0YzZfOGViODAyMWExZjJmY2NlMjQyOTgyNzI5OTBhYzhiYTFfSUQ6NzY4OTMyNjE3MTU0NDQwNzU3OV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mjk5Y2EzZGZmYzExYjRjMTc3Nzc2MjYwYzNiM2U3NmVfZDk2NTM0YWIzYTVmZjEzN2U3ZjNkYjNhODZhNjIzZjdfSUQ6NzY4OTMyNjI2MjcyMDEwNjAxMl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODliMDkxMGZhNTc3NWIxNTA4ZmY3ZTJjMjgzNzE3YTFfOGQyZGQ4ZmQ3YjJlNmY2YmE2MzkyYTY2YTFmYTFiZWFfSUQ6NzY4OTMyNjMwMTQ3OTcwMjA0Ml8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|**本讲概念 Concept**|**在这个案例里对应什么**|
|---|---|
|**神经元模型与激活函数（Part 2–3）**|60 个频段值进入输入层；每个隐藏神经元做加权求和 \+ 激活，输出层同理|
|**MLP 结构（Part 6）**|60–6–2 的前馈网络，一个隐藏层；输入层不计入层数 → 两层网络|
|**前向传播（第 6\.6 节）**|从 60 维频谱算出 2 个输出值（第 10\.3 节的 0\.43 / 0\.26）|
|**误差函数（第 7\.1 节）**|输出与 one\-hot 目标之差（第 10\.4 节的四个误差）|
|**反向传播（第 7\.3–7\.5 节）**|按误差反推，调整 60×6（输入→隐藏）\+ 6×2（隐藏→输出）共 372 个权重与 8 个偏置|
|**epoch 与停止准则（第 7\.7 节）**|走完所有训练对= 一个 epoch；重复多次= 多个 epoch|
|**收敛（第 8\.2 节）**|输出从 \(0\.43, 0\.26\) 收敛到 \(0\.01, 0\.99\)|
|**过拟合 / 泛化（Part 9）**|已知样本与新样本都是 100% → 属于 Good Fit，未见明显过拟合|

权重个数怎么来的：输入层 60 → 隐藏层 6，所以输入到隐藏的权重有 60 × 6 = 360 个；隐藏层 6 → 输出层 2，所以隐藏到输出的权重有 6 × 2 = 12 个；合计 372 个权重。偏置每个神经元一个：6 \+ 2 = 8 个。逐层相乘再相加的算法在第 6\.6 节里有对应，也是第7部分推导里 w⁽ˢ⁾\_ji 的两个下标（i 遍历前一层、j 遍历本层）的由来。

## Part11 Exercise

#### 11\.1 Exercise1: Regression

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjczYTNlMDU3OGJjZWZmNjkyZDU0ZTJiZTlkOWU4NjBfODQ3ODZmNmUwMWMxYzYwOGE1ZWFlNzhiNjI1NjViNDlfSUQ6NzY4OTMyODc1MzgwNTIxNzMwN18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmNiY2M2MTc5MDBmZGJjNmE2NzVkNDY5NzI2ZGYxNGNfNzViYTBiYmNjMzYwODlmNzk2MjcyNWE5NDE0MjAyNDFfSUQ6NzY4OTMyODc4OTYyNDUwNzkzMV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDE1ZThmZjZkMzJlMTVkODMyZjhjMmU0MGY5NjQ2MWZfZGM4YjVhY2VlYTM5NzFkZTQ5YzBjMDUyOWQ3OGNiMTZfSUQ6NzY4OTMyODgzMTIwNjkxOTcwN18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

#### 11\.2 Exercise2: Gradient Descent

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzNiZWEzYzg2MzdlYjJlNzFhYTk4MWUyZjlkYWFkNWVfYmIyYmRiMDNmYmM0MGIyYjM4YzgwYzYzOGViYTMwYjFfSUQ6NzY4OTMyODg5OTgyOTc5NjM3OV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2NlZTkyMjZkZGYyNTQyYzE5NzdhOWMyODBlNjM4YzFfZWMxMzZjZGE4NDk4NjlkZGEwYTZjYzhjODllMDFjYzZfSUQ6NzY4OTMyODkzMzIxNjYwMzY3NF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDdjYzViNzBhMjY5NGYzYjBjMzNhOGY3OTlhZGRkN2JfNDlmMjQzOTNlZGQyZDQ3NzA4OWFmYmYwODIzNDViN2FfSUQ6NzY4OTMyODk2NzU3MjExNDk2OF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

# Lecture 5

## Part 0 Introduction

|**周 Week**|**主题 Topic**|**核心内容 Key Content**|
|---|---|---|
|Week 1|An Introduction AI 导论|AI 定义 / 机器学习三大范式 / ANI\-AGI\-ASI / 学术技能|
|Week 2|Searching \& Optimization 搜索与优化|BFS / DFS / Hill Climbing / Best\-First / A\* / SA / GA|
|Week 3|Evolutionary Computation 进化计算|EA 总览 / PSO / DE / MA / MOEA / ETO / NAS|
|Week 4|Artificial Neural Network 人工神经网络|神经元模型 / 激活函数 / 感知机 / MLP / 反向传播 / 过拟合引言|
|**Week 5**<br>|**Deep Learning \& Applications 深度学习与应用**|**CNN 卷积网络 / RNN\-LSTM 序列网络 / GNN 图网络 / 生成模型与扩散模型**|

本周回答了：同样一套反向传播，为什么堆得更深反而更强？面对图像、序列、图这三种完全不同的数据，网络结构要怎么改？

学习路线：深度学习总览 → CNN → 序列神经网络 → 图神经网络 → 生成模型与扩散模型 → 过拟合与欠拟合。

### 总结 

被装在四种不同的数据接口上的同一个反向传播引擎。

区别在于接口的类型：图像是规则网格，用滑动窗口（卷积）；序列有先后，用递归链（循环）；图没有顺序，用邻居聚合（消息传递）；要造新数据，换成对分布的建模（自编码 / 对抗 / 扩散）。

共同点：猜参数 → 看误差 → 反向传播改参数

|本讲的四条支线|解决什么|共同的技术手段|
|---|---|---|
|CNN|图像：把局部性 \+ 平移不变注入模型|权值共享；逐步加深；残差连接|
|RNN / LSTM|序列：处理变长输入与长程依赖|细胞状态的加性记忆通道|
|GNN / GCN|图：在无固定顺序的邻居集合上做聚合|邻居消息传递；置换不变|
|生成模型|造新数据：学数据分布本身|潜在空间正则；对抗博弈；迭代去噪|

## Part 1 From NN to Deep Learning

### 1\.1 Three Formulas and Levels

1. **单个神经元 Model of a neuron**：每个输入被一个权重缩放、与一个偏置求和，再过一层激活函数。

$v = Σ_{i=1}^{m} w_i x_i + b，y = φ(v)$

2. **感知机 Perceptron**：一个线性分类器。只有两类**线性可分（linearly separable）**时才收敛。

$w_{n+1} = w_n + η(d_n − y_n)x_n$

3. **MLP 与反向传播 MLP and backpropagation**：隐藏层去掉了线性限制；输出神经元与隐藏神经元使用**不同的局部梯度**。

$w_{n+1} = w_n − η·∂E/∂w$

Lecture4 得这些概念分别代表了单元（一个神经元）→ 能力边界（单层只能线性分类）→ 突破办法（多层 \+ 反向传播），本讲是这些的延伸，讲解层与层的联系。

### 1\.2 Deep Learning

Deep learning allows computational models that are composed  of multiple processing layers to learn representations of data  with multiple levels of abstraction\. 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjdlMDkxODMzMDM4MjQ3MGIzMmVhZmY2YWM2YjAxZTJfZTQwOTcyMDc0NDE1NjI1MzZlZjk0ZmY4MjYzODE0MGVfSUQ6NzY5MDUzNTA2MzMzOTEwOTkxNl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

**多个处理层 multiple processing layers**  即深，层的数量，不是参数的绝对规模。

**学习表示 learn representations** 即学，不再是人工设计的，而是从数据里生成的。神经网络是**实现**深度学习的方式之一。

**多个抽象层次 multiple levels of abstraction**  即层次的递进：边缘—鼻子\-脸。

### 1\.3 Two Paradigms

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjdmM2IwMzlkNTI1Yzg3NWI4Y2I4NjY4Y2E3ZTAyMjlfMGRhMzAyMmRjNjU4NDkyOGUzMjcxOTI3Zjc4NWQwYjRfSUQ6NzY5MDUzNDk5NzA4NTczNjQ4MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

两者的区别在特征提取器能否被训练：上面那张图的红色框圈住的是 hand\-crafted Feature Extractor，下面那张图的红色框圈住的是 Trainable Feature Extractor \+ Trainable Classifier 这个整体。

|**环节 Stage**|**传统模型（20 世纪 50 年代起）**|**深度学习模型**|
|---|---|---|
|**特征来源**|Fixed/engineered feature 人工设计、固定不变的特征提取器|Trainable feature extractor **可训练**的特征提取器|
|**分类器**|"Simple" Trainable Classifier  可训练的**简单**分类器（并非不可训练）|Trainable Classifier 可训练的分类器|
|**特征端代表方法**|HoG（方向梯度直方图）、SIFT（尺度不变特征变换）|不独立存在|
|**分类端代表方法**|两段式：人做特征 → 机器学分类<br>Linear Regression、SVM、Decision Tree、Random Forest|一体式：与特征端**连成一个整体**一起训练|
|**代表网络**|无|AlexNet、VGGNet、Inception、ResNet、ViT|

### 1\.4 Why is it called Deep？

It is deep if more than one stage of non\-linear feature transformation\.

只要有**多于一个阶段的非线性特征变换**就算深度。深的含义是表示被逐级复合地变换，与实现上是否有隐藏层、隐藏层有几个没有对应关系。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmZkMWU0NGIyYzVhZjBjNzRjZGVjMDIyYzkxMTQ4ZWRfZTVhMzUwNWY5MTIyZGMyNDQ2NjZmOTBkMWVhODcyMjJfSUQ6NzY5MDUzNTEyMDQ0ODc4NTk1Ml8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

### 1\.5 The ImageNet Trend

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWM2NTNlMzIzZjVhZmUzNTE0MmZjZTFhMmE1NzQwMmJfZWY1YzM1MTk3OTEyZjdhYmE5OGM2YmE5ODE4N2UwZTBfSUQ6NzY5MDYxMjE1Nzg4MDIyNTMwNF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

### 1\.6 Why Deep Learning Works

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzkzM2EyMmMwZmVjYjA4ZjYxMWI4OTVkMDA4N2MzNTBfNmRjOTQzMjFhMGQzMjlmOWRkMWI4NzFlNmM3ODllZGNfSUQ6NzY5MDUzNTc5MjkzNDIxMTEwMF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

1. 表示能力 Representation Power

**已知结论**：a shallow network can approximate any function\. 一个浅层网络可以逼近任意函数。

**代价**：this requires many hidden units\. 需要极多的隐藏单元。

**结论**：Depth gives an exponential advantage\. 深度带来指数级优势。同样表达力下，深层网络的参数需求远小于浅层。

2. 可优化性 Tractability of Optimization

**存在的问题**：Lots of local minima\. 误差曲面上布满局部极小（Lecture 4 第 8\.3\.1 ）。

**实践**：optimization still works\. 优化仍然能用。

**可行的解决方法**：with tricks like variants of adagrad, using relu / leaky relu, dropout, batch norm… —— 自适应学习率（Adagrad 的变体）、ReLU / Leaky ReLU 激活、Dropout、批归一化。

3. 泛化能力 Generalization Power

**存在的问题**：DNN can "memorize" a large training set \(huge capacity\) \. 深度网络容量巨大，完全有能力把训练集背下来。

**实践**：Yet they don't overfit \(when training data and model size is compatible\)\. 只要训练数据量与模型规模相匹配，它并不因此过拟合。

**可行的解决方法**：they don't just store the examples\. 它学到的不是样本本身。

Tips：表示能力承认浅层也能逼近、但代价指数级；可优化性承认满地局部极小、但工程技巧能压住；泛化承认容量足以背训练集、但实测没有背。

### 1\.7 A Brief History

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTM2OWI3YTc1OTk2ZGNhMmEyZGEyZDY0OGE2OTgwZWRfMWJhODliOTcwNGZhM2FmNjljYzJmYWU1NjdmYzAwNTJfSUQ6NzY5MDUzNjI5NzI3NDEzNDA0Ml8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

## Part 2 CNN I 卷积神经网络（卷积层与池化层）

### 2\.1 CNN Definition

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTVhNWRhNmYyNzA4MzdjMDJkNGE4NTg5OTFjMTFmNmVfNDMyYWI4Y2Y3M2I2OGU2OTkxZGIzZjJkY2EwODQ1N2NfSUQ6NzY5MDUzODEyMjEwMjMxMjQ3NF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Convolutional Neural Networks learn a complex representation of visual data using vast amounts of data\. They are inspired by the human visual system and learn multiple layers of transformations, which are applied to the top of each other to extract a progressively more sophisticated representation of the input\.

CNN 用**大量数据**学习视觉数据的复杂表示；它受**人类视觉系统（局部感受野 \+ 逐级抽象**）启发，学习**多层变换（每一层都在对上一层的输出做运算）**，这些**变换逐层叠加（至少一个非线性函数）**，从而提取出越来越精细的输入表示

### 2\.2 Convolution Definition 卷积

1. **数学定义：**Convolution is one of the main building blocks of a CNN\. The term convolution refers to the mathematical combination of two functions to produce a third function\. It merges two sets of information\. 卷积是两个函数的数学组合，产生第三个函数；它把两组信息合并。

2. **操作定义**：Convolution is essentially sliding a filter over the input\. 卷积本质上就是把一个滤波器/卷积核在输入上滑动。

3. **直觉定义**：A convolution can be thought as looking at a function's surroundings to make better/accurate predictions of its outcome\. 卷积可以理解为看一个函数的周围环境，以便对它的结果做出更准的预测。这就意味着，卷积的输出在某个位置上的值，取决于**输入在该位置邻域内的取值**，而不是该位置单独的取值。

### 2\.3 Convolutional Kernels 卷积核

|**英文术语**|**中文**|**课件原句**|
|---|---|---|
|filter / kernel|滤波器 / 卷积核|these terms are used interchangeably **两个词指的是同一个东西**，可互换使用|
|feature map|特征图|卷积在输入上滑动后**产生**的输出|
|sliding the filter over the input|滑动|At every location, a matrix multiplication is performed and sums the result onto the feature map\.|

Examples: 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWVjNzIxZmQzYjgxYjBmNTU1MTBkYWZiMzM5Yjg2Y2FfMDE5Yjg2OTJkMmRlZGUyZTMwNjg1MWFkYmIzYzUzZTFfSUQ6NzY5MDUzODQ3NDI5Nzk3MDIwMF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

1. 左图用全 1 的 2×2 卷积核对一张 4×4 的输入做卷积，步长（stride）为 2，得到一张 2×2 的特征图。

2. 右图真实输入图像得到特征图：用的核是 \[\[−1,−1,−1\], \[−1,8,−1\], \[−1,−1,−1\]\]。特点是中心权重远大于四周、且符号相反，它输出的特征图上只剩边缘，平坦区域被减成接近 0。**卷积核里装什么，特征图上就留下什么。**

### 2\.4 Pooling Layer 池化层

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2ViNzg1NTM3NmRmMDlkZTVmYzkwMmY4ZTE1NzZiMWZfNTM0NjNjYTc5NDM3YTMwNjIwOWYzYzcxOTQ0Zjc3NjNfSUQ6NzY5MDUzOTEyNTg0OTQ5MzAxNl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzljMjdiYTI0YzQzZWRkOWZlYjM5ODc3YTRkY2FmMDJfOWIwNmUyYTQ1MGM0MTE1NGZjMGQ2NDQzMDUzZWEwYTNfSUQ6NzY5MDUzOTE4NDY3NDY1NTc3Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

**功能角度**：The function of pooling is to continuously reduce the dimensionality to reduce the number of parameters and computation in the network\. 池化持续降低维度，以减少网络中的参数量与计算量。

**动作**：The function of pooling is the process of merging\. So it's basically for the purpose of reducing the size of the data\. 池化是合并的过程，目的是缩小数据尺寸。

**Example：**input image → convolutional layer → pooling layer → convolutional layer → pooling layer → fully\-connected layer，整条链被框在一个标着 CNN 的方框里，最右端输出 car（predicted class）。

**Tips：**最后一级是 fully\-connected layer（全连接层）而不是卷积层：特征提取完成之后，仍要靠全连接层把特征映射到类别。

#### 2\.4\.1 Max and Average Pooling

Example：

同一张 4×4 输入，2×2 窗口、步长 2，并排演示两种池化。

|**窗口位置**|**四个数 Four values**|**最大池化 Max pooling**|**平均池化 Average pooling**|
|---|---|---|---|
|左上|5, 3, 0, 2|5（最大值）|\(5\+3\+0\+2\)/4 = 2\.5|
|右上|3, 1, 8, 5|8（最大值）|\(3\+1\+8\+5\)/4 = 4\.25|
|左下|1, 4, 0, 9|9（最大值）|\(1\+4\+0\+9\)/4 = 3\.5|
|右下|4, 2, 2, 7|7（最大值）|\(4\+2\+2\+7\)/4 = 3\.75|

最大池化输出 \[\[5, 8\], \[9, 7\]\]，平均池化输出 \[\[2\.5, 4\.25\], \[3\.5, 3\.75\]\] 

Tips：

1. 池化层没有参数：它不是卷积，卷积核里的参数是学出来的，而池化的取最大或取平均是固定的运算，训练过程中不更新任何值。所以池化能降低维度和计算量，却不需要额外的学习容量。

2. 两种池化的分工：最大池化保留窗口内最强的响应，对某个特征在不在这类判断更敏感，也因此对微小位移更宽容；平均池化保留窗口内的整体强度，对这个区域大概有多活跃更敏感。实际网络里最大池化更常见。

### 2\.5 How CNN Works

#### 2\.5\.1 Two Kinds of Layers

卷积层 Convolution layer：is a feature detector that automatically learns to filter out not needed information from an input by using convolution kernel\.  一个特征检测器，靠卷积核自动学出该过滤掉输入里的哪些信息。

池化层 Pooling layers：compute the max or average value of a particular feature over a region of the input data \(downsizing of input images\)\. Also, it helps to detect objects in some unusual places and reduces memory size\. 在输入的一个区域上求某个特征的最大或平均值（即缩小输入图像）；还有助于检测出现在异常位置的物体，并减少内存占用。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWI5Nzg5NGIzYzNiZmVjMGUyZjI5MzQ2YzBjOTNhOWVfNGZhY2FhY2U5NTIxNzJhNTJlNTYzMGVlOTA5NTQwMzdfSUQ6NzY5MDU0MDAyNDA0NzQ3MjE1Nl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

#### 2\.5\.2 What Each Layer Learns

某一层的卷积核的响应模式：可视化（**边缘 → 纹理 → 部件 → 物体）**

|**层 Layer**|**学到的内容**|**含义**|
|---|---|---|
|Conv 1|Edge\+Blob（边缘与斑点）|最底层：只认边缘朝向与色块|
|Conv 3|Texture（纹理）|由边缘组合出的重复性图案|
|Conv 5|Object Parts（物体部件）|开始出现眼睛、轮子、鼻子这类可命名部件|
|Fc8|Object Classes（物体类别）|最顶层：整类物体（ship、sock、dining table、grocery store）|

## Part 3  CNN II 四个模型

### 3\.1 Four Milestone Models

eNet 证明卷积可行→ AlexNet 证明卷积能规模化→ ResNet 证明卷积能叠很深→ ViT 证明卷积是不是必须的。前三个模型都在**改进卷积的用法**，第四个模型**取消了卷积**。

|**对比项**|**LeNet\-5 \(1998\)**|**AlexNet \(2012\)**|**ResNet \(2015\)**|**ViT \(2020\)**|
|---|---|---|---|---|
|代表成绩|手写数字识别成功落地|ILSVRC 2012 Top\-5 错误率 15\.3%|ILSVRC 2015 Top\-5 错误率 3\.57%|JFT\-300M 上预训练后超越 CNN|
|核心创新|卷积 \+ 池化的基本结构；**权值共享 \+ 局部连接**|**ReLU \+ GPU \+ Dropout \+ 数据增强**|**残差（跳跃）连接**，学 F\(x\) = H\(x\) − x|**图像切成 patch \+ 纯注意力**，不用卷积|
|解决的问题|MLP 直连像素导致**参数爆炸、忽略空间结构**|把 CNN **放大到大数据集**（ImageNet 120 万张）|深层网络的**退化问题**与梯度消失/爆炸|CNN 的**归纳偏置**是否必要|
|遗留局限|浅、sigmoid/tanh、小数据集|层数仍有限|未提；后由注意力架构接续|需要**超大数据集**，小数据上效率低|

#### 3\.1\.1 LeNet\-5 第一个成功的卷积网络

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTc2NWM1NWViOGQxMzk4ZGIzNzgxMGNlNWMxM2RmYWJfN2FjYTY1ZDdkNDEyN2JiYjM5NjY5OTJlODY3OGY0ZDhfSUQ6NzY5MDU0MTM5NTQwODY3MDIzNV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

**架构**：经过 Conv、Pool、Conv、Pool 、FC 、 FC 、Output  两次卷积 \+ 池化，两次全连接。

**输入输出**：Input: 32x32 grayscale; Output: 10 digit classes \(0\-9\)

**应用**：handwritten digit recognition \(MNIST, postal codes\)  手写数字识别，如邮政编码。

**解决的问题**：MLPs on raw pixels had too many parameters, ignored spatial structure\. 在原始像素上做 MLP 参数量太大，且完全忽略空间结构。

**关键洞察**：weight sharing \+ local connectivity drastically reduce parameters\. 权值共享 \+ 局部连接大幅减少参数。

**局限**：shallow, sigmoid/tanh activations, small datasets\. 网络浅、用 sigmoid/tanh 激活、只在小数据集上验证过。

#### 3\.1\.2 AlexNet 把 CNN 推到大数据集上（进入GPU时代）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzFkNzBiYzI4MGQ3ODgwZDk3OTdjOWViZjc3Y2Q5MDZfZTY3MjcxYjk5MmJiOWZjMzgwY2E3ZTEyZmI5NmUzNDBfSUQ6NzY5MDU0MDIxMzc2MzkwMzAwMF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

**成绩**：Top\-5 error: 15\.3% vs\. 26\.2% \(second place, hand\-crafted features\) \.

**解决的问题：**scaling CNNs to large datasets \(ImageNet, 1\.2M images\) 把 CNN 扩展到大数据集。

**四项创新**：

1. **ReLU 激活**：ReLU activation \(faster training than sigmoid/tanh\)  训练比sigmoid/tanh更快。

2. **GPU 训练**：GPU training \(2 GPUs, major speedup\) 用 2 块 GPU，带来大幅加速。

3. **Dropout 正则化**：Dropout for regularization  用随机失活抑制过拟合。

4. **数据增强**：Data augmentation \(cropping, flipping, color jitter\) **裁剪、翻转、颜色抖动**。

#### 3\.1\.3 ResNet 用残差连接把网络做深

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MmE1ODk2OTQxNGFhNWY0YTdkMGViYzBkNjk3ZmJmZDBfYmY2MWU3MTBlMjZhYjRiYzEzYzFmYjFjOWJmYjBlZjhfSUQ6NzY5MDU0MTQzMjI1OTcxMDQ5MV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

**成绩**：3\.57% top\-5 error（对比 AlexNet 的 15\.3%）。

**解决的问题：**vanishing/exploding gradients in very deep networks\. 极深网络的梯度消失/爆炸。

##### **3\.1\.3\.4 The Degradation Problem 退化问题**

**现象**：deeper networks are harder to train — degradation problem \(not overfitting\) 更深的网络更难训练，这叫退化问题，而且它不是过拟合。

**证据**：Adding layers increases training error, contrary to expectation\. 加深层数反而让训练误差上升。（过拟合的表现是训练误差下降、验证误差上升）

**成因**：vanishing/exploding gradients 梯度在深层传播过程中消失或爆炸。

解法：学「残差」而不是学「映射」

**做法**：Solution: skip \(residual\) connections 加**跳跃连接（残差连接）**。

**改写的目标**：Learn residual F\(x\) = H\(x\) \- x, instead of H\(x\) directly 不去直接学目标映射 H\(x\)，而是学**残差 F\(x\) = H\(x\) − x**。

**更容易学习的原因：**Identity mapping is easy to learn: just set F\(x\) = 0  **恒等映射**：F\(x\) = 0 。

**效果**：Enabled networks of 50, 101, even 152 layers  使更深的网络成为可能。

Tips: Lecture 4 讲反向传播时提到过深层网络梯度会消失。ResNet 作为**工程解法，**用跳跃连接给梯度提供了一条**不经过任何非线性层**的直通路径，即x，使梯度可以直接回传到浅层。

#### 3\.1\.4 Vision Transformer 把 Transformer 直接用在图像上

apply the Transformer architecture \(from NLP\) directly to images 

把来自 NLP 的 Transformer 架构直接用到图像上。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTNmOGNkM2Y0Yjk4MmU0MjhkNTJiYWFiOGQ3MWMxNzhfNTJmNjc3MzIwN2M3YTAzY2Q4YWUzZjM2M2EzN2M3YjRfSUQ6NzY5MDYyNTIzNzU3ODE3Mzk3OF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2NlMWFjNjQyZmY2MjhmZDhlYTIwYzI3OGFhOTJhNWJfM2IyMWNiNDNiNGRlN2ZkZTQ3OGI4MjhhMjdmZmI4ZTNfSUQ6NzY5MDU0MTQ2MjMyNDQ0ODc5Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

**做法：**

1. Split image into fixed\-size patches \(e\.g\., 16x16\), linearly embed, add position 把图像切成固定大小的小块（如 16×16），做线性嵌入，再加上位置信息。

2. Feed patch embeddings into a standard Transformer encoder 把小块嵌入送进标准 Transformer 编码器。

3. 分类头与预训练：\[CLS\] token for classification; pretrain on large datasets \(JFT\-300M\)  用 \[CLS\] 标记做分类；在大规模数据集（JFT\-300M）上预训练。

**解决的问题:  **CNNs have inductive bias \(locality, translation equivariance\)  CNN 自带归纳偏置：局部性与平移等变。

Tips: CNN 的归纳偏置（局部性、平移等变）在数据有限时是巨大的优势，它注入了自然图像的规律。但数据量足够大时，它限制了模型去发现人类没预设过的模式。

**结论：**ViT shows that with enough data, a general attention model beats CNNs 数据足够时，让模型自己学，不要预设。

**局限：**needs huge datasets; less efficient on small data 需要**超大数据集**，在**小数据上效率低**。

## Part 4 序列神经网络 Sequential Neural Networks 

### 4\.1 Sequence Transduction Models

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGM1YjNlM2QxYjBmMjQ3M2Q5ODhlNWY1YWRjMmRjMmVfZmI4YTExNjcyYjZhNjlkNTMwZTY1ZGYwOGY2NmFmMmNfSUQ6NzY5MDU0MzQwNDIwMzIzMjgwMF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Sequence transduction models refer to a class of models that aim to transform one sequence of data into another sequence\. Such as Google's autocomplete feature predicts the rest of the words a user is typing\.

序列转换模型指的是一类**把一条数据序列变换成另一条序列**的模型，如谷歌补全词条。

优势：序列到序列的优势是输入和输出的长度可以变化。

### 4\.2 循环神经网络 Recurrent Neural Network 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODdlNDYxY2U0MTU0MGNjMjIxYzE0ZTA2NjA2MjM1NWNfNTg4ODMxN2E4NWZkNzA0NDFjMzc1ZWEwOWM4ZDQ0NGVfSUQ6NzY5MDU0Mzc5ODc5OTQwNDU3MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

**基本形式**：input sequence is transformed into output sequence in a one\-to\-one fashion 输入序列以**一对一（步进节拍：时间步 t 进一个 token、同一时间步出一个 token）**的方式变换为输出序列（每一步进一个、出一个）。

**设计目标**：Design an architecture that possesses the ability to generate output sequences of variable length, while incorporating contextual relevance and a memory mechanism that leverages prior inputs to influence the current input and output\.

1. 能产生任意长度的输出序列；

2. 兼顾上下文相关性；

3. 有一套记忆机制，让先前的输入能影响当前的输入与输出。

Tips: RNN是一对一，而Transformer 也是一步进一个位置、出一个位置，但它的上下文不再靠一条递归链传递，而是靠注意力一次性看全序列。

### 4\.3 RNN 的能力边界 RNN's Breaks Down 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjUxMDFlZTFlZWU5ODc2NmMwOTZiYzllMGE1NDUyOWFfNzliZjIxMGE0MDdjN2ZmYTg0ZWNiZTY3ZGNkNzEyOTZfSUQ6NzY5MDU0MzgzMzE1NDY4NjQ5Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

A small example where RNN can work perfectly: Prediction of the last word in the sentence: "The clouds are in the sky" 一个 RNN 能完美工作的例子 预测句子的最后一个词。

RNN can't handle situation where the gap between the relevant information and the point where it is needed is very large\. \(Long\-term dependency\)

当**相关信息**与**需要用到它的位置**之间的**间隔很大**时，RNN 处理不了。这就是**长程依赖（long\-term dependency）**问题。

1. Vanishing and exploding gradients 梯度消失与梯度爆炸。递归链上每一步都要乘一次权重矩阵，经过 t 步以后梯度里就带着权重矩阵的 t 次幂，若**矩阵特征值小于 1 就消失，大于 1 就爆炸。**

2. Limited memory capacity 记忆容量有限。

3. Computational complexity 计算复杂度（逐步递归，无法并行）。

### 4\.4 LSTM 

为了解决长期依赖：LSTMs – are a special kind of RNN, capable of learning long\-term dependencies\.  LSTM 是一种**特殊的 RNN**，**能够学习长程依赖**。

**结构：**All RNNs have the form of a chain of repeating modules of neural network\. In standard RNNs, this repeating module will have a very simple structure, such as a single tanh layer\.

所有 RNN 都是一条由重复模块组成的链。标准 RNN 的重复模块极简，例如只有一层 tanh；

LSTM has the same chain\-like structure except for the repeating module\.  LSTM 的**链式结构完全相同**，区别只在重复模块内部。

|**对照项**|**标准 RNN 的重复模块**|**LSTM 的重复模块**|
|---|---|---|
|结构复杂度|极简单，例如单层 tanh|明显复杂：多个门控与逐点乘法|
|输入输出|$x_t $进、 $h_t$ 出|$x_t $进，$h_t $与 $C_t$**（细胞状态）**同时维护|

左边（标准 RNN）每个方块标 A，方块里只有一条带 tanh 的支路；

右边（LSTM）每个方块标 A，内部有 **四个小的 σ / tanh 单元**以及多条交叉的加减与乘法节点。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmIwM2Y2MjJhM2ZiMGMzMDdlYjNjZWRiZTE3MDFlZjdfNjQ4ZGFjY2FkODllMzdjZmM0YjRjMGRlOTU1M2U0ZTRfSUQ6NzY5MDU0NTE5MTYyNzEzMjQ0OF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

#### 4\.4\.1 How to Work

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YmYzNmNiMDliODFlMzBmNTRjMTVlZGNmYTNjZDY3YTlfNDhkYjhkZTgzZDAwZWUyY2VkNzY5NDQzMzI5NTExZGNfSUQ6NzY5MDU0NjQwNDUxMDQ4NjA0M18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

The core idea behind LSTMs is the cell state, which acts as an information highway running through the entire sequence\.

LSTM 的核心是细胞状态（cell state），它像一条贯穿整条序列的信息高速公路。

#### 4\.4\.2 Three Gates

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGQxNjlkMGNiMzJkZTlmYTQ3NGRlN2Y4MmNjOGFmY2FfMDU3MDU1M2YyYzYwODE5YmRmNDI5ZWY5YTRiNTU4YjNfSUQ6NzY5MDU0NjU5OTY2NzMwNjAxMF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

The cell state is updated and controlled by three main structures called gates: the input gate, the forget gate, and the output gate\. These gates regulate the flow of information into, out of, and within the cell state, allowing LSTMs to selectively retain or forget information as needed\.

细胞状态由三个称为「门」的结构更新与控制 —— 输入门、遗忘门、输出门。这些门**调节信息流入、流出以及细胞状态内部**的流动，使 LSTM 能按需**选择性地保留或遗忘**信息。

|**门 Gate**|**作用**|**直觉**|
|---|---|---|
|input gate|把新信息**写进**细胞状态|决定「这一时刻要不要记住新东西」|
|forget gate|从细胞状态里**丢掉**信息|决定「过去记下的东西还要留多少」|
|output gate|把细胞状态里的信息**读出**来给输出|决定「这一刻要把记忆的哪一部分说出来」|

门的实现方式：

Gates are generally composed out of a sigmoid neural net layer and a pointwise multiplication operation  门一般由**一个 sigmoid 神经网络层 \+ 一次逐点乘法**组成。

sigmoid 输出在 \(0,1\)，乘上去就等价于**保留多少比例，**输出 0 是丢，输出 1 是留。

#### 4\.4\.3 The Four Equations

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzQyMTVlOGJmOWE5OGIxNTgzMDM2MmEwZDE0ZjBlZGNfMTU5YWJhODcyOGYxYzY1MzFkNGI5ZTRkMTc4MWY3M2NfSUQ6NzY5MDU0NjQ0NTA0ODUzMjUwOF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

LSTM 的四个核心方程。 $C_t $是细胞状态， $h_t $是隐藏状态， $x_t $是当前输入。

|**量**|**方程**|**读法**|
|---|---|---|
|遗忘门 |$f_t = σ(W_f · [C_{t−1}, h_{t−1}, x_t] + b_f)$|把**上一时刻的细胞状态、上一时刻的隐藏状态、当前输入**拼在一起，过 $σ$得到 0–1 之间的系数|
|输入门|$i_t = σ(W_i · [C_{t−1}, h_{t−1}, x_t] + b_i)$|同一组输入，另一套权重，得到「写入多少」的系数|
|输出门|$o_t = σ(W_o · [C_t, h_{t−1}, x_t] + b_o)$|注意这里用的是**更新后的** $C_t$，而不是 $C_{t−1}$|
|细胞状态|$C_t = f_t * C_{t−1} + (1 − f_t) * C̃_t$|旧记忆按 $f_t $的比例保留，新候选记忆 $C̃_t $按 $1 − f_t $的比例写入|

### 4\.5 SNN 问题What Issue Are They Facing?

|**短板**|**原文**|**中文**|
|---|---|---|
|**训练慢**|Slow to train \(inefficient / not parallelizable\)<br>This sequential dependency limits the ability to parallelize computations, as each step must wait for the completion of the previous step\.|训练慢、效率低、**无法并行化**<br>这种**顺序依赖**限制了并行计算能力，**每一步都必须等上一步算完**|
|**梯度问题**|Suffer from exploding or vanishing gradients|仍会遭遇梯度爆炸或梯度消失|
|**长程依赖仍受限**|Cannot handle very long\-term dependencies<br>In Seq\-Seq models, decoder only accesses the last hidden state\. Early information in sentences can be lost\.|仍然处理不了**极长**的依赖<br>在**序列到序列（Seq\-Seq）**模型里，解码器**只能拿到最后一个隐藏状态**，句子**早期的信息可能丢失**|

Tips: 主要问题是**并行性**（能不能同时算）和**信息通道宽度**（所有历史被压进一个固定长度的隐藏状态）。所以设计目标是 **既要能并行，又要能直接看到序列里的任意位置，而不是只透过一个固定大小的窗口。**

## Part 5 GNNs I: From Graphs to GNNs

图是什么 → 为什么不能直接用 DNN → GNN 怎么做

### 5\.1 Definition of Graph

A graph represents the relations \(edges\) between a collection of entities \(nodes\)\.

图表示**一组实体（节点）之间的关系（边）**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjZhMmI1NTQzMGYzNjU1YjQ0OGUwOWVmZTAyOTQ2MmRfZGZiZTM4NmZhNmNjZWY1NmRjZGYyZTlmNGZmZmIyZTlfSUQ6NzY5MDU1MTMyNjUzMDQ1NzExNF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|**属性类型**|**英文原文**|**中文**|**例子**|
|---|---|---|---|
|节点属性|V  Vertex \(or node\) attributes|顶点 / 节点属性|e\.g\., node identity, number of neighbors 节点的身份、邻居数量|
|边属性|E  Edge \(or link\) attributes and directions|边 / 链接属性与方向|e\.g\., edge identity, edge weight 边的身份、边的权重|
|全局属性|U  Global \(or master node\) attributes|全局 / 主节点属性|e\.g\., number of nodes, longest path 节点总数、最长路径|

属性分成 V / E / U ：后续所有 GNN 模型的输入清单，任何一个 GNN 层要做的事都可以写成拿 V、E、U 的一部分作为输入，输出更新后的 V、E、U。

### 5\.2 图的应用 Graphs Application 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2QyYjEyOWJhNGZmNWQxYWZiZDBkNGUwMzIyMTM4N2VfNGMzNzVhNzNiNGM5ZGFiY2NmNjEzNGFmZDk0NTVhYWRfSUQ6NzY5MDU1MTQ2MjI3NTEyNDc2M18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

#### 5\.2\.1 Images and Text as Graphs

图像和文本本身就是规则结构，把它们看成图只是换了一种表示。真正的图数据是下一组那些天生就没有规则网格结构的数据，图像和文本的图结构是规则、稠密、平移不变的，不需要通用的图方法。

#### 5\.2\.2 Graph\-Valued Data in the Wild

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Nzk4YWIyM2JjYWVmZjIzNzM4YWRhY2Y1Zjc5ZWUzZDVfMDkzYzNjYjRkMjFjY2M1YmQ2MTYzOGQ4MWI0ZDRiYWFfSUQ6NzY5MDU1MjEyNTM5NDM0MTQwNF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Molecules as graphs  **分子**：原子是节点，化学键是边。

Social network as graphs  **社交网络**：人是节点，关注或互动是边。

Brain network as graphs  **脑网络**：脑区是节点，功能或结构连接是边。

Graph data is everywhere around the world \! 

为什么要专门为图设计网络的动机：如果图数据真的无处不在，那把图塞进只能用于规则网格的 CNN 就会损失大量结构信息。

### 5\.3  图解决的问题 Solving Problems over Graphs

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTM1MmU0NmEyNWFkMDdlYTczMGE4NGU1MjA5MWRkYjZfODM0YjhjYTFkZjMzMTAxZDEzMDljNWEzNjAxMGYwZjFfSUQ6NzY5MDU1MjE1ODYwODk1Mjg1Nl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

图可以解决的五类问题（6\.3\.2）

|**任务 Task**|**定义**|**中文**|
|---|---|---|
|Node Classification|Classifying individual nodes\.|**节点分类**：对单个节点分类，对应 $softmax(z_n) $，**逐节点**过 softmax|
|Graph Classification|Classifying entire graphs\.|**图分类**：对整个图分类，对应 $softmax(Σ_n z_n)$，**先对所有节点求和**再过 softmax|
|Node Clustering|Grouping together similar nodes based on connectivity\.|**节点聚类**：按**连接关系**把相似节点归为一组|
|Link Prediction|Predicting missing links\.|**链接预测**：预测缺失的边|
|Influence Maximization|Identifying influential nodes\.|**影响力最大化**：找出有影响力的节点|

### 5\.4 图数据上用深度神经网络的挑战Challenges of Using Graphs in DNN

为什么不能使用DNN？图的特征对应CNN的前提不成立。

1. **Graph\-Structured Data（图结构的数据）**：Neural networks have been traditionally used to operate on fixed\-size and/or regular\-structured inputs \(such as sentences, images and video\)\. 神经网络传统上都用来处理**固定尺寸、规则结构**的输入，例如句子、图像和视频。**图两者都不是。**

2. **Lack of Consistent Structure（缺乏一致结构）**：Graphs are extremely flexible mathematical models; but this means they lack consistent structure across instances\.  图是**极其灵活**的数学模型，但这也意味着**不同样本之间结构不一致**：每个图的节点数、连边数、度数分布都可能不同。

3. **Node\-Order Equivariance（节点顺序等变）**：Graphs often have no inherent ordering present amongst the nodes\.  图的节点之间往往没有固有的顺序。任何 GNN 的输出不能依赖于节点的编号顺序。把输入节点重排一遍，输出的对应关系应该跟着重排，而数值不变。所以Invariance to permutations（置换不变）

Tips：CNN 靠平移不变来适应图像的位移，GNN 靠置换不变来适应图的重新编号。

### 5\.5 图神经网络 What is a Graph Neural Network?

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzUwNDBjNTUyMzlkNGIwMDQwZjgyMjZjYjNlZmI3ODRfMWUxZDkyZTVmMjViZTQwNDMxM2Q1Y2U3MmVhMzdiMjRfSUQ6NzY5MDU1NDE4ODkxMjQzMDYxNl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Define: 

A GNN is an optimizable transformation on all attributes of the graph \(nodes, edges, global\-context, connectivity\) that preserves graph symmetries\. 

GNN 是作用在图的全部属性（节点、边、全局上下文、连接关系）上的可优化变换，并且保持图的对称性。

Main Idea: 

Pass messages between nodes to refine node \(and possibly edge\) representation\. 

在节点之间传递消息，以此来精修节点（可能还有边）的表示。

1. 节点V、边E、全局上下文U、连接关系这四个属性全都要处理。

2. 可优化变换：GNN 不是一套固定规则，不是人为设定，它的参数是通过训练学的（与 CNN、MLP 同源）。

3. 保持图的对称性：节点换编号后结果不能变，这就是要保持的对称性。

4. 传递消息：这是 GNN 的工作方式，也是消息传递网络（Message Passing）每个节点从邻居那里收消息，更新自己的表示，然后进入下一层。

## Part 6 GNNs II: Graph Convolution

### 6\.1  单个像素的更新 Update for a Single Pixel 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODU2ODgxOTdjMTgzNmEwMzZlN2RjZmNjYzMwNDgwYjhfYjE3Yzg3YmZmNWQ0MjQwYzFlNzk1MGViMWRjNWZjYTRfSUQ6NzY5MDU1NjQ3MzMxODk4NTI0NF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

卷积的关键两个步骤：

1. Transform messages individually 每个邻居传来的信息 $ h_i $各自乘上一套权重 $W_i$，得到 $W_i h_i$。

Tips：在CNN中，每个位置一套独立权重，卷积核可以给每个位置配一套固定的权重 。但图的节点没有固定范围，一个节点的邻居不能确定数量和先后，所以卷积无法在图上使用。

2. Add everything up 把结果全部加起来 $ Σ_i W_i h_i$。

$h_i ∈ ℝ^F$ 是某个像素 / 节点的（隐藏层 hidden layer）激活值 activations of a pixel/node。

为了在图上使用，完整的单点更新式：

$h_4^{(l+1)} = σ( W_0^{(l)} h_0^{(l)} + W_1^{(l)} h_1^{(l)} + … + W_8^{(l)} h_8^{(l)} )$

中心节点编号为 4，它周围有 0–8 共 9 个位置（3×3 窗口，含自己），每一个位置各自的激活值先乘上各自的权重矩阵 $W_i$，全部相加，再过激活函数 σ。

### 6\.2  图卷积网络  Graph Convolution Networks \(GCNs\)

#### 6\.2\.1 更新规则 The Update Rule

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODg2NWRkZTY1YWM0ODNiYTc3ZWQwMzQ0YWZiOGU1MzdfOTBiNmNlOGQ4YjA1ZDRmZGJlNjkxMTRhZTEwZTYzNWFfSUQ6NzY5MDU1NjM3NTA2MzEyMTQ0MF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

$
h_i^{(l+1)} = σ( h_i^{(l)} W_0^{(l)} + Σ_{j∈N_i} (1/c_ij) h_j^{(l)} W_1^{(l)} )$

节点 i 在下一层的表示，等于两部分的加权和:

1. 它自己的表示 $h_i $乘一套权重 $W_0$；

2. 它的所有邻居 j 的表示 $h_j $各乘一套权重 $W_1$、再除以一个归一化常数 $c_ij$，然后全部加起来；

3. 最后过一个非线性激活 σ。

|**符号**|**说明**|**中文**|
|---|---|---|
|σ|σ 加在整体外面|非线性激活函数|
|$h_i^{(l)}$|节点 i 在第 l 层的表示|注意**自己的信息**单独乘 W\_0，不与邻居混在一起|
|$W_0^{(l)} / W_1^{(l)}$|两套权重矩阵|**只有两套**：一套给自己、一套给邻居|
|$N_i$|neighbor indices|节点 i 的**邻居索引集合**|
|$c_{ij}$|norm\. constant \(fixed/trainable\)|归一化常数，可以**固定**也可以**可训练**|

Tips：关键改动：邻居之间共享权重 Weight sharing over all locations，代价是丢失了邻居的相对方位，所以后来 GAT 等模型要引入注意力权重。

##### 6\.2\.2\.1 希望具备的四条性质  Four Desirable Properties

1. Weight sharing over all locations  在所有的位置上共享权重。

2. Invariance to permutations  对置换不变：重排节点编号，结果不变。

3. Linear complexity O\(E\) 线性复杂度，与边数 E 成正比。

4. Applicable both in transductive（**直推式）** and inductive（**归纳式）** settings 两种设定都能用。

直推式和归纳式的区分：直推式指训练时已经见过整张图（包括测试节点），只是不知道它们的标签，例如对一个固定的社交网络做节点分类，图是同一张，只是有一部分人没标注；归纳式指测试时要处理训练时没见过的新节点或新图，例如对一张全新的分子做预测。

为什么 GCN 两者都能用：因为它的更新规则只依赖邻居的现场表示与学好的共享权重。前者可以现场算出来，后者是训练阶段留下的参数；所以遇到新节点时不需要重新训练整个模型。

#### 6\.2\.3 谱方法 The Spectral View

Spectral\-based methods can be also interpreted as spatial\-based methods\.

基于谱的方法也可以被解释为基于空间的方法。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTEzN2NiMTRjYzA4OTcyNjY4M2MyZDM2YTFhY2U2YzhfMGI0MDNjOTU3NzNiMzRkNGZiZDcxNzA0M2VlYTUxNTJfSUQ6NzY5MTAxMDMzNzkxNDY4NzAwM18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

$
H^{(l+1)} = δ( D̂^{(−1/2)} Â D̂^{(−1/2)} H^{(l)} θ )$

含义：把整层所有节点的表示堆成矩阵 H，先左乘一个**归一化后的邻接矩阵** $ D̂^{(−1/2)} Â D̂^{(−1/2)} $（相当于聚合邻居），再乘可学习参数 θ，最后过一个非线性函数 δ。

|**记号**|**课件说明**|**中文**|
|---|---|---|
|A|A: Adjacency matrix|邻接矩阵|
|D|D: Degree matrix|度矩阵（对角阵，记录每个节点的邻居数）|
|Â|Â: A \+ I|带自环的邻接矩阵（加上单位阵 I，把自己也算作自己的邻居）<br>即更新规则里自己那一项 $h_i W_0$（把自己当成邻居）|
|D̂|D̂: D \+ I|带自环的度矩阵|
|θ|θ: learnable parameter|**可学习参数**|
|δ|δ: non\-linear activation function|**非线性激活函数**|

空间式更好理解（在邻居之间传消息），谱式更好实现（一次矩阵乘法算完一整层）。

### 6\.3 GNNs应用  GNNs for Application

#### 6\.3\.1 输入与逐层更新 Input and Layer Update

|**环节**|**课件内容**|**中文**|
|---|---|---|
|输入 1|Feature matrix $X ∈ ℝ^{(N×E)}$|特征矩阵 X，形状 N×E|
|输入 2|preprocessed adjacency matrix $Â$|预处理过的邻接矩阵$Â$|
|逐层更新|$H^{(l+1) }= σ( Â H^{(l)} W^{(l)})$|每一层做一次邻接聚合 → 线性变换 → 非线性激活|
|起始状态|$X = H^{(0)}$|输入特征矩阵就是第 0 层的表示|
|结束状态|$Z = H^{(N)}$|跑完 N 层之后得到的最终表示 Z|
|层间激活|图上每个隐层旁标注 ReLU 与 σ\(·\)|每层的非线性激活，与普通神经网络一致|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2EzNTVmZjA1MjQzMDA0ZWMyZGU2YmFlOTlhMjZiNWRfMjkyYjE4ZjZjYTgyZjYzMWQzMjVmNjYwOTA3MDBjMTdfSUQ6NzY5MDU1ODc3NTQzNDA1NTE5Ml8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

#### 6\.3\.2 三类下游任务 Three Readout Heads 

|**任务**|**输出头**|
|---|---|
|**节点分类** Node classification|$softmax(z_n) $对**每个节点**的表示过 softmax|
|**图分类** Graph classification|$softmax(Σ_n z_n)$ **先对所有节点求和**，再过 softmax|
|**链接预测** Link prediction|$p(A_ij) = σ(z_i^T z_j) $ 两个节点表示的内积再过 sigmoid|

区别是读哪里：**节点分类**读单个节点的向量；**图分类**读整张图的汇总（所以要先求和，把 N 个节点压成 1 个向量）；**链接预测**读两个节点的配对（所以用内积来衡量它们像不像应该相连）

回到 5\.3 节的五类任务 节点分类与图分类对应前两类，链接预测对应第四类；节点聚类与影响力最大化在本页没有给出式子。

### 6\.4 GNN vs CNN

|**对比维度**|**CNN（Part 2–3）**|**GNN / GCN（Part 5–6）**|
|---|---|---|
|数据形态|规则网格（图像）|不规则的图|
|输入尺寸|固定（如 224×224×3）|可变（节点数与边数都随样本变）|
|样本间结构|所有样本结构相同|**每个样本结构都可能不同**|
|节点顺序|有固定朝向（宽、高）|**无固有顺序**|
|要保的性质|**平移等变 / 不变**|**置换不变**|
|权重套数|每个相对位置一套（3×3 核 = 9 套）|**只有两套**： $W_0（自己）+ W_1（邻居）$|
|聚合方式|在固定窗口内做加权求和|在**邻居集合**$N_i $上求和，除以归一化常数 $c_{ij}$|
|复杂度|与图像尺寸、核大小相关|O\(E\)，与**边数**成正比|
|引入的归纳偏置|**局部性 \+ 平移等变**|**置换等变 \+ 邻居聚合**|

Tips: ViT 质疑的是CNN 的归纳偏置是否必需（3\.1\.4）；而 GNN 不是去掉归纳偏置，而是换一套更贴合图数据的归纳偏置（置换不变 \+ 邻居聚合）。两条路线的共同问题：当数据本身没有规则结构时，我们该把什么结构免费注入模型？

## Part 7 Generative Models I 生成问题（一）

前三个部分（CNN / RNN / GNN）的共同点：输入一段已有的数据（图像 / 序列 / 图），输出一个**判别结果**。从本部分开始换任务：输入一批样本，输出同一分布下的新样本。这是机器学习里一个完全不同的建模目标。不处理已经存在的数据的部分，而是造出新的数据。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzBlNzYyYzI3ODQ3NzgwZWRjODM5MDRjNmQ0NjEwZDhfNGQxNzQ5NTNhMzBlZTk2NjQwM2FlMWVmNzU3YmQwZTdfSUQ6NzY5MDU2MjMyODUzODEyMzgwOF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

### 7\.1 判别模型与生成模型 Discriminative vs Generative   

In Machine Learning, one can clearly distinguish between the two modelling types: 

1. Classifying an image as a dog or a cat falls under Discriminative Modelling,

2. Producing a realistic dog or a cat image is a Generative Modelling problem

机器学习可以清楚地区分两种建模类型：把一张图判成狗还是猫，属于判别式建模；生成一张逼真的狗或猫的图片，是生成式建模问题。判别模型学的是**边界**，生成模型学的是**分布**。

|**对比维度**|**判别模型 Discriminative**|**生成模型 Generative**|
|---|---|---|
|要回答的问题|**这是哪一类？**|**这类数据长什么样？**|
|学的是什么|条件分布 $p(y | x)$：给定输入 x，输出的标签概率|数据分布 $p_{data}(x)$ 本身|
|输出|一个标签（或一组概率）|一个**新样本**|

### 7\.2 Goal and Three Ingredients

#### 7\.2\.1 Goal

Goal: Given training samples, generate new samples from the same distribution\.

给定训练样本，**从同一分布中生成新的样本**。

In other words, generative models try to learn a model p\_model\(x\) similar to p\_data\(x\)\.

换句话说，生成模型试图学到一个 p\_model\(x\)，让它**接近真实的数据分布** p\_data\(x\)。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTEyMTQ3YzkxNzVjOTBkNDBjMzVhNmMwOGI0YTRkY2RfYWNiMGEzOGFkMjU5ZTIyZGFiZWE5NTY3MDEyZjcxY2ZfSUQ6NzY5MDU2ODMyMTY5MDg2NTE3Nl8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

#### 7\.2\.2 Three Ingredients

1. 一个模型 Model：we specify its parametric form, e\.g\., neural networks, etc\. 指定它的参数化形式，例如神经网络。

2. 一个学习目标 Learning objective：e\.g\., maximum likelihood 例如最大似然。

3. 一个优化算法：optimization algorithm to achieve the learning objective 一个用来达成该学习目标的算法。

Tips: 生成模型的三要素与神经网络框架一致：定结构 → 定损失 → 用梯度下降优化，区别在于生成模型的第二项，如何确定学习目标，因为 p\_data\(x\) 是一个无法直接写出的高维分布，所以测量模型离真实分布有多远要另想办法，所以引出了VAE、GAN、Diffusion 三条路线的分歧点。

### 7\.3 自编码器Autoencoders 

结构：Autoencoders are neural network architectures that consist of an encoder（编码器**）** and a decoder,（解码器） which work together to learn a **lower\-dimensional representation** of input data and **reconstruct** the data from the representation\. 

自编码器由与解码器组成，两者合作学习输入的低维表示，并从该表示重建数据。

核心任务：With the lower\-dimensional representation z, the fundamental task of an autoencoder is to reconstruct its input x as accurately as possible\.  用低维表示 z，**尽可能准确地重建输入 x**。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDI2MjFhMTFmNzFjZDViYzJkYmQ2Y2VjYzFiNzU3NzVfNzI4YzBmMmM0NGJjMmE2MTY2MDRhM2Q3MDlhZWMwZmZfSUQ6NzY5MDU3MDIxODM5NzM3MTkyOF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

**过程**：Through a process of encoding and decoding, the autoencoder learns to map the input data to a compressed representation and then decode this representation back to the original input space\. 

把输入映射到**压缩表示**，再解码回**原始输入空间**。

#### 7\.3\.1 数据通路与损失函数 Data Flow and Loss 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzQxM2QzNzYyZjQwYzIyOTgzZjNhYjRiYmZiZTFhMjRfYTcyOTA2MGI1YmVhZDYyYTZlNzExYjY2MmM1ODdkNjhfSUQ6NzY5MDU3NDM2NzMzNTU1MDQ5MF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|**环节**|**记号**|**含义**|
|---|---|---|
|输入|x|原始数据|
|编码器|E（encoder, x → z）|**降维**：把 x 压成 z|
|潜在编码|z|压缩后的低维表示|
|解码器 / 生成器|G（decoder/generator, z → x）|把 z 还原回数据空间|
|重建|x̂|重建出的输出|
|损失|L|重建误差，用均方误差衡量|

均方误差（Mean Squared Error, MSE） 把每个样本原始值与其重建值之差的平方求平均。n 是变量的个数（ where n is the number of variables）。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGYwYjJkZDAxNjZjZWU3YzViMzE5NTBhNjA2YmRjZGVfNWUyNTFiMWJmZDU1NGEwZmYzMjIxZDVhODgxMWQwZmFfSUQ6NzY5MDU3MDMwODU5MTQzOTM5Ml8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

$L = (1/n) Σ_{i=1}^{n} ( x^i − G(E(x^i)) )^2$

1. The encoder network is for dimension reduction, just like PCA 编码器的作用就是降维，和 PCA 类似；

2. Latent code: the compressed low dimensional representation of the input data 潜在编码：输入数据的压缩低维表示。

#### 7\.3\.2 自编码器的三条局限 Why it Cannot Generate

1. **训练目标里没有生成这一项。**损失函数 L 只要求 x̂ 尽量等于 x，也就是输入什么就还回来什么。一个完美重建的自编码器，它的输出空间里没有新样本的位置。

2. **潜在空间 z 没有被规定形状。**编码器可以学会把每个训练样本映射到潜在空间里一个孤立的点，只要解码器能把这些点，还原回来，损失就是 0。这时在潜在空间里随便取一个新点 z，解码器完全不知道该输出什么，因为它从没见过那个位置。

3. 问题的根源：它**只学了点对点的映射**，没学空间的结构，缺少一个可以安全采样的潜在空间。 这正是下一节 VAE 要解决的事。

### 7\.4 变分自编码器  Variational Autoencoders \(VAEs\)

#### 7\.4\.1 两条关键改动 Two Key Changes

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWEyZDgxN2ZmOTk5ZjczODExNzlhMWY3MWQ1NjUyZjJfNWYxNjc3M2ZiZmQ1YTVhZDNlMTc0NGQ4NWU4MGQwODVfSUQ6NzY5MTE0Mjk4NjY0NTcyMDYwMl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

改动一：Encode the latent features in a meaningful space, e\.g\., Gaussian distribution\. 把潜在特征编码到一个有意义的空间里，例如高斯分布。

改动二：Sample from the meaningful latent space to generate data\. 从这个有意义的潜在空间中采样来生成数据。

Example：Assume training data x is generated from the **Gaussian distribution** of latent representation z

**Intuition**: x is an image, z is latent factors used to generate x\.

假设训练数据 x 是由潜在表示 z 的**高斯分布**生成的。**直觉**：x 是一张图像，z 是**用来生成 x 的潜在因子**。

In a nutshell, a VAE is an autoencoder whose encoding distribution is **regularized** during the training in order to ensure that its latent space has good properties allowing us to generate some new data\.

简言之，VAE 就是在训练过程中对编码分布加正则的自编码器，目的是让潜在空间具备允许我们生成新数据的良好性质。

#### 7\.4\.2 两个概率分布与损失 Two Distributions, Two Losses

|**项**|**记号**|**读法**|
|---|---|---|
|编码（推断）|q\(z\|x\) Inference \(encoder\)|给定数据 x，推断潜在变量 z 的分布|
|解码（生成）|p\(x\|z\) generation \(decode\)|给定潜在变量 z，生成数据 x 的分布|
|重建损失|$L_{MSE}$|重建得像不像|
|正则损失|$L_{kl}$|**KL 散度**：把编码分布拉向标准高斯，让潜在空间有形状|
|总损失（核心）|$L_{total}= L_{MSE} + L_{kl}$|**两项相加**：既要重建得准，又要潜在空间规则|

$L_{total}= L_{MSE} + L_{kl}$ 这一行是 VAE 的核心。根据 7\.3\.2 的三条局限：只有 $L_{MSE}$（即普通自编码器）时，潜在空间可以是任意形状、点与点只有映射；加上 $L_{kl}$ 之后，编码器被迫把每个样本编码成**一个高斯分布**而不是一个点，于是整个潜在空间被铺满，**随便取一个点都能解码出合理的数据**。

Example：先验采样 → 解码生成的完整路径

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NGRiNTdhZDU1MWI2M2ZlN2M5MjRkMjg1MDUzMmYwYTZfMjY5NDlhZDcyNWNiNGQ4NTU5ODQxYzY2NTY1OGI4NTNfSUQ6NzY5MTE0MzAyNjk3MDE2ODg1Nl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

从 Latent features: z 经 Decoder 得到 Data: x，标注为 Generate x \~ p\_θ\(x\|z\)；而 z 是 Sample from true prior z \~ p\_θ\(z\)（从真实先验中采样）。生成时不再需要编码器，只需要从先验里取一个 z 然后解码。

### 7\.5 GAN 的提出动机 Why GANs

问题：VAEs define density function with latent z of Gaussian distribution\. However, it is non\-trivial（不容易） to model complex, high\-dimensional training data with an **explicit distribution**\.

VAE 用高斯分布的潜在变量 z 来定义密度函数。**但是**，要**用一个显式的分布**去建模复杂的、高维的训练数据，并不是一件容易的事。

#### 7\.5\.1 GAN 的两条路线选择 Two Design Choices

1. 放弃显式密度：GANs belong to "implicit density"（隐式密度）group, where any explicit density function of samples did not provide\.  GAN 属于隐式密度这一组，它不提供样本的显式密度函数。

即 VAE 的路线是写出密度，然后去逼近它；GAN 的路线是写不出密度，那就绕过它，既然无法显式写出 p\_data\(x\) 长什么样，那就让一张网络（判别器）来隐式地衡量 这像不像真数据，另一张网络（生成器）去把这个衡量推翻。

2. 用博弈论做动机：Motivated by game theory\. 

GAN 的代价是训练变得不稳定，因为它本质上是一个对抗性的博弈过程，而不是一个单纯的 误差下降。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzEyMWY2YjAyMTVkNjZhNDhlNjBkNzgyNmViOWEyN2FfN2FjNGFjY2MxNjM5ZjllNzk1OWNlZDU2NGVhNmQ2MzBfSUQ6NzY5MTE0NjMxNTY5ODgxODU4N18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|玩家|课件原文|中文|
|---|---|---|
|生成器 Generator|Generator tries to generate "fake" samples from its model \(tries to fool the discriminator\)|生成器试图从自己的模型里**造出假样本**，目标是骗过判别器|
|判别器 Discriminator|Discriminator tries to distinguish "fake" and "real" samples|判别器试图**区分假样本**与真样本<br>|

## Part 8 Generative Models II  生成问题（二）GANs and Diffusion Models

### 8\.1 GAN 的目标函数 The Minimax Objective

Minimax objective function（极小极大目标函数）与 How to train \(Alternative between\)（怎么训练：在两者之间交替）。

极小极大目标：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Nzc0YzRiZTRiNDFjZTBhYzNjY2FiYzcyMDZmMTBhZDhfNmFmNTcyYjNiMTg4NjJiZmM1YmQ4MWUwMWE3MTczMDFfSUQ6NzY5MTE0NzU2OTM4MDI5ODI2NF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

生成器参数$θg$想最小化、判别器参数$θd$想最大化同一个目标函数；它由两项组成，**真数据的对数和**与**假数据的1减去判别结果的对数和**。

|记号|中文|说明|
|---|---|---|
|$D_{θd}(x)$|判别器对真样本 x 的输出|判别器认为 x 为真的概率|
|$G_{θg}(z)$|生成器由噪声 z 造出的假样本|从先验 p\(z\) 采样 z，生成假样本|
|第一项 $E_{x~p_{data}} log D(x)$|真数据的损失|用红框标出，注为 Loss for real data x|
|第二项 $E_{z~p(z)} log (1 − D(G(z)))$|假数据的损失|图上用蓝框标出，注为 Loss for fake data x|

#### 8\.1\.1 两个网络 How It Works

判别器 D：D tries to maximize the cost such that D\(x\) close to 1 \(for real x\) and D\(G\(z\)\) close to 0 \(fake\) 

让真样本的输出趋近 1、假样本的输出趋近 0。

生成器 G：G tries to minimize the cost such that D\(G\(z\)\) is close to 1 \(try to make generated samples real\-looking as much as possible to fool D\)  让假样本的判别输出也趋近 1，即尽可能把假样本做得像真的去骗过 D。

#### 8\.1\.2 交替训练  Alternate Between

固定 G，训练 D：Fix G, D maximize the cost \(Gradient ascent on discriminator\) 判别器做梯度上升。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTZmMTA0YWZhNjg0ZTYwNDA5NmMzZDQ2NTU3YjM4ZmRfMDZkYzdkMzZlMzJkMzU2OGUwMWRmNjAzYjc2ZDI5N2NfSUQ6NzY5MTE0ODc0MjM1MDk0OTkxNV8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

固定 D，训练 G：Fix D, G minimize the cost \(Gradient descent on generator\) 生成器做梯度下降。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzZmZGU3MjFhMjM4N2NmMDczMWVjZGM4YzQ3NTYyMjhfNzNhNmE5MzM0MDdiOTFhYmVmZDA2ZGEzZWY0NmRiOWZfSUQ6NzY5MTE0ODg3NjE5OTI4NDI1MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

Tips：交替训练的问题：

普通的神经网络训练有一个静止的目标：损失函数在训练过程中形状不变（数据固定）。而 GAN 里，判别器每更新一次，生成器的损失函数就变了一次，这是博弈式建模的固有性质。

#### 8\.1\.3 GAN Lab

GAN Lab: Play with Generative Adversarial Networks in Your Browser\!  \(poloclub\.github\.io\)

GAN 的交替训练过程很难用静态文字讲清楚，生成器与判别器的决策边界在二维平面上一来一回地移动，这是 GAN Lab 最直观的地方。看生成器的样本点如何一步步逼近真实分布、判别器的分界线如何反复摆动。观察交替训练和不稳定性。

### 8\.3 GAN 的三个问题与扩散模型 Problems of GANs

|问题 Problem|原文|中文|
|---|---|---|
|梯度消失 Vanishing Gradients|when the discriminator doesn't provide enough information for the generator to make process\.|当判别器不能提供足够的信息让生成器取得进展时出现|
|模式崩塌 Mode Collapse|This is when generator starts producing the same output \(or a small set of output\) over and over again\.|生成器开始反复产出同一个输出（或很小的几个输出）|
|难以训练 Hard to train|GANs are very sensitive to hyperparameters\.|GAN 对超参数非常敏感|

GAN问题共同根源：判别器的设计。梯度消失来自判别器太强，模式崩塌来自生成器找到了骗过判别器的捷径，难训练来自两者需要保持脆弱的平衡。

解决：**Diffusion Models**: Emerging as powerful generative models, outperforming other deep generative models, such as GANs\.

扩散模型正在成为强大的生成模型，表现超过了 GAN 等其他深度生成模型。扩散模型的做法是它不训练判别器，而是训练一个网络去拟合一个明确的、已知的加噪过程。

### 8\.4 扩散模型是什么 What Are Diffusion Models

灵感来源：Inspired by non\-equilibrium thermodynamics to model the data distribution, diffusion models can describe the probability distribution of each step in the ink diffusion process\. 

受非平衡热力学启发，把一滴墨水滴进水里，它会逐步散开，最后完全均匀，这个过程是随机、不可逆的。扩散模型的做法是**反向学**这个过程：从完全均匀的噪声出发，一步步收拢回一滴墨水。

Diffusion models are a type of probabilistic generative model that transforms noise into a representative data sample\.  是一类概率生成模型，它把噪声变换成一个有代表性的数据样本。

### 8\.5 前向加噪与反向去噪 Forward and Reverse Processes

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTM2MGJlYjRlOGMwYjlhZDU4MmEwM2UyZmJlODliMmFfYTUzZTc4MjI2ZDk5ODQ0YmExOTc3YTRkYzlkNDQ4ZjNfSUQ6NzY5MTE1MjE2OTI5NDE4ODA1OV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Diffusion model aims to learn the reverse of noise generation procedure

扩散模型的目标是学习 噪声生成过程 的反过程。

具体而言，正向的加噪过程是我们自己定义的、完全已知的（每一步加多少高斯噪声固定的），所以模型只需要学怎么反向走一步，这是一个有明确监督信号的学习问题，不需要另一个网络来判别。

#### 8\.5\.1 两个方向 Two Directions

|方向|原文|中文|
|---|---|---|
|前向步 Forward step|\(Iteratively\) Add noise to the original sample<br>The sample x\_0 converges to the complete noise x\_T \(which is the Markov chain\)|（迭代地）给原始样本加噪声<br>样本 $x_0 $收敛到完全的噪声 $x_T$；这个过程是一条马尔可夫链|
|反向步 Reverse step|Recover the original sample from the noise<br>Note that it is generation procedure|从噪声中恢复出原始样本<br>注意：这一步就是 生成 过程|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NWM3NmU4NzBiZmYzZGVlYWYyNDE1OWE0MzdkOTk4OWVfNjY4YjRkYWZkMGI4OGUxNTc3MDljM2RmYjgxM2U1MzFfSUQ6NzY5MTE1MjI3NjY2NDQ1NDY4M18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

#### 8\.5\.2 训练目标 Training Objective

To train a Diffusion Model, the objective is to find the reverse Markov transitions that **maximize the likelihood of the training data\.**

训练扩散模型的目标，是找到那些能**最大化训练数据似然**的反向马尔可夫转移。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjkxMTg2NTE0MjYzNmI0NDA1Nzg0Njg4OTU0Mjc0ZDNfMTM3NDQ0NGY4OTEwMzZhMTI2OTkwZmI4ZWQ0NDc2MDhfSUQ6NzY5MTE1MjM1NTgxOTM3NjE2MF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

左边是交叉熵损失（负的、模型对真实样本的对数似然），右边是它的一个上界：分子$ q(x_{1:T}|x_0) $是我们自己定义的前向加噪分布，分母$p_θ(x_{0:T}) $是要学的反向生成分布。

### 8\.6 一个网络处理所有时间步  One Network for All Timesteps

For diffusion models, it is common to use a single network for all timesteps\. Something UNet\-like, which is very common in denoising and image\-to\-image problems\.

对扩散模型来说，常见做法是用一个网络处理所有时间步。这个网络大致是 U\-Net 形态，U\-Net 在去噪与图像到图像类问题里非常常见。

#### 8\.6\.1 训练时的六个步骤 The Training Process

1. Sampling a random timestep t for each training sample within the batch \(e\.g\. images\) 

为 batch 里的每个训练样本各采样一个随机时间步 t。

2. Adding Gaussian noise by using the closed\-form formula, according to their timesteps t 

按各自的 t，用闭式公式加上高斯噪声。

3. Converting the timesteps into embeddings for feeding the U\-Net or similar models \(or other family of models\)

把时间步转成嵌入向量，喂给 U\-Net 或同类模型。

4. Using the images with noise and time embeddings as input for predicting the noise present in the images 

用带噪图像 \+ 时间嵌入作为输入，去预测图中的噪声。

5. Comparing the predicted noise to the actual noise for calculating the loss function 

把预测噪声与真实噪声比较，算出损失。

6. Updating the Diffusion Model parameters via backpropagation using the loss function 

用损失做反向传播，更新参数。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2NkODU0NTYwMzA3Nzk0YmRkYjk5NWI2ODdiZWQzODhfMmRkZjJhNjVjODljYzU3YWJlYThiOGI4ZTk1NGM1MjlfSUQ6NzY5MTE1MzUyNjkzMjA5ODU4N18xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzA5YzMxOGM4MzgyM2Q5OTNhZmUzOWI1ZjFiODkzNjNfOWJjN2Y5YzdlYWMzNWJmM2Q3YWM2MTU2OTExZjVhODlfSUQ6NzY5MTE1MzIwNDM3MzI3ODI0MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

三张训练进度图：分成 EPOCH 1、EPOCH 2、EPOCH k 三栏，每栏里列出 TIME EMBEDDINGS（时间步嵌入）与 NOISY IMAGES（带噪图像）的配对。EPOCH 1 里是 t = 14 / 35 / 6，EPOCH 2 里是 t = 78 / 153 / 721，EPOCH k 里是 t = 64 / 4 / 9。这组数字要传达的是** 每个样本的 t 都是随机抽的** 同一个样本在不同 epoch 会配到不同的噪声强度，这样网络才能学会所有时间步。

U\-Net 结构图：Conv\+BatchNormalization\+ReLU（红色块）、Pooling operation（黄色块）、Upsampling Layer（蓝色块）、Skip\-Connection（箭头）。整图呈 U 形：左侧向下经过多次池化（Layer1 → Layer2 → Layer3 → Layer4），底部最窄，右侧向上经过多次上采样，并有跨过底部的跳跃连接把两侧同层连起来，就是 U\-Net 名字的由来，也是它能在去噪任务里保细节的原因。

### 8\.7 采样过程 The Sampling Process

与训练的唯一区别：For sampling new images, the difference lies in that we don't have an input image\. 

生成新图像时，区别在于我们手上没有输入图像。

起点：We sample random Gaussian noise and define how much steps of noise \(T\) to take for generating the new images\. 我们从随机高斯噪声出发，并规定要走的噪声步数 T。

每一步做什么：In each step, the Diffusion Model predict the whole noise present in the image, taking as input the current timestep\. Then, it removes just a fraction of this predicted noise\. —— 每一步里，模型以当前时间步为输入，预测整幅图中的噪声，然后只去掉其中的一小部分。

Tips: 为什么不一次把预测出来的噪声全减掉？因为网络在时间步 t 上的预测只在 t 这个噪声强度下可靠。一次性减完会直接跳到 $x_0，$但那个 $x_0 $是在 噪声还很多 的假设下估出来的，误差很大。逐步减去一小部分，等价于“走一小步、重新估一次、再走一小步”每一步都在新的噪声强度下重新用网络判断，误差不会累积放大。

结果：We obtain our image generation result after T inference steps\.  经过 T 次推理步后得到最终生成结果。

两段伪流程对应图：

1\. Sample Gaussian noise t = T = 1000、X\_1000 = N\(0, I\)，箭头标注 sample，指向一张纯噪声图；

2\. Iteratively denoise the image 下面画了多组 噪声图 → U\-Net → pred noise 的迭代。

关键等式  $X_{999} = X_{1000} − pred noise$、 $X_2 = X_1 − pred noise$、 $X_1 = X_2 − pred noise$，最后得到干净图像。

这些等式传达的正是减掉预测噪声这个动作，两者合起来看：预测的是全部噪声，但每次只减一部分。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Yjg5M2Q0NjM3ODY5NTdmM2E3ZGVhMDBlYTVmMWNkZjBfMmRjMWE3NjRiMjUxZTMwNjA1OGFkOWMwNjI1YWM1MjlfSUQ6NzY5MTE1NDEwMjAyNTUyMjcxNV8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

### 8\.8 扩散模型小结  Summary

生成质量更好：Generates better data than VAEs and GANs\. Diffusion models learn true distribution through step\-by\-step learning of Gaussian noise instead of raw data\. This makes learning objectives simpler and the generation quality better\.  扩散模型逐步学习高斯噪声而不是直接学原始数据，这让学习目标更简单、生成质量更好。

更容易训练：Easier to train\. Diffusion models are easier to train than GANs and do not suffer from mode collapse due to their inherent diffusion process\. 比 GAN 更容易训练，且由于其内在的扩散过程，不会遭遇模式崩塌。

In conclusion, Diffusion Models became a new effective paradigm for image generation and manipulation\. By combining the principles of diffusion processes with deep learning techniques, these models offer new avenues for generating high\-quality images\.

总而言之，扩散模型已经成为图像生成与图像编辑的一种新的有效范式。它把扩散过程的原理与深度学习技术结合，为生成高质量图像提供了新的路径。

### 8\.9 四类生成模型  Four Generative Paradigms

|对比项|Autoencoder（AE）|VAE|GAN|Diffusion|
|---|---|---|---|---|
|核心思路|编码降维 \+ 解码重建|在 AE 上给潜在空间加正则|生成器与判别器对抗博弈|学加噪的反过程|
|损失函数|$L = (1/n) Σ (x^i − G(E(x^i)))²$|$L_{total} = L_{MSE} + L_{kl}$|$min_{θg} max_{θd} E log D(x) + E log(1 − D(G(z)))$|$L_{CE} = −E log p_θ(x_0)$<br>（及其变分上界）|
|能否生成新样本|不能|能（从先验采样 z 再解码）|能（生成器直接造）|能（从纯噪声迭代去噪）|
|潜在空间|无约束，可能长成任意形状|被正则成高斯，可安全采样|隐式密度，无显式 z 空间要求|噪声强度 t 充当连续控制变量|
|主要毛病|无法生成|显式建模高维分布很难|梯度消失 / 模式崩塌 / 难训练|采样步数多（ T = 1000）|

AE 只会重建 → VAE 加正则让潜在空间可用 → GAN 绕过显式密度改用对抗 → Diffusion 放弃对抗改学一个已知的加噪过程。每一次转折都是在解决上一代的某个具体毛病：AE 的问题是不能生成，VAE 的问题是显式密度难写，GAN 的问题是训练不稳定，而 Diffusion 用有确定答案的回归问题换掉了没有确定答案的博弈问题。

## Part 9 Overfitting and Underfitting 过拟合与欠拟合 

### 9\.1 三种拟合状态  Three Fitting Regimes

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjNlYzU3NjI4YmI2ZDMyZjI4N2ZkOTY3MjUxODU5YTdfNDVjZGVmZGQ0MTk4YzJlOWQ5ZTFmODY4MmU3Y2QyMmRfSUQ6NzY5MTE2MTQ4MDc3OTA1ODcyMF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|状态|定义|中文|图上特征|
|---|---|---|---|
|欠拟合 Underfitting（高偏差 High Bias）|Model too simple \- cannot capture the underlying pattern\. Both training and validation errors are high\.|模型太简单，抓不住潜在规律；训练误差与验证误差都高|红色直线，几乎穿过数据的整体趋势，但完全跟不上那个弯|
|良好拟合 Good Fit（平衡 Balanced）|The model captures the true pattern without memorizing noise\. Both errors are low and close\.|抓住了真实规律而没有记住噪声；两个误差都低且接近|绿色曲线，与灰色虚线几乎重合|
|过拟合 Overfitting（高方差 High Variance）|Model too complex \- memorizes training data including noise\. Low training error but high validation error\.|模型太复杂，把训练数据连噪声一起背下来；训练误差低，但验证误差高|蓝色曲线，穿过每一个黑点，在黑点之间剧烈扭曲|

### 9\.2 偏差\-方差权衡  Bias\-Variance Tradeoff

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTAyOGZlN2NlYmU0YjVjMWFjNjJmOWEzN2IwYTcyNzdfOTUzMWE3ZjVlYmY3MGY1YmM3OGNjN2NhMWVhMTRmZDFfSUQ6NzY5MTE3NzE3MDI5MDU3NjkyMl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|曲线|走向|含义|
|---|---|---|
|偏差平方 Bias² \(underfitting\)|随复杂度单调下降|Bias: Error from oversimplified assumptions\. → Underfitting <br>来自假设过于简化的误差，对应欠拟合|
|方差 Variance \(overfitting\)|随复杂度单调上升|Variance: Error from sensitivity to small fluctuations in training data\. → Overfitting 来自对训练数据微小波动过于敏感的误差，对应过拟合|
|总误差 Total Error|先降后升，呈 U 形|偏差与方差之和；最低点就是最优复杂度|
|不可约误差 Irreducible Error|一条水平虚线|与模型复杂度无关、降不下去的那部分误差|

Find the sweet spot with minimum total error\. 即找到总误差最小的那个最佳点\(Optimal Complexity\)。

在复杂度 0 处，偏差平方约 1\.0、方差约 0\.05、总误差约 1\.05；随着复杂度增加到约 2，偏差降到约 0\.7、方差升到约 0\.3；到复杂度 10 时，偏差接近 0，但方差升到约 5。所以总误差的最低点并不在偏差最小或方差最小处，而在两者交叉附近。

权衡 Tradeoff: 降低偏差要靠更复杂的模型，而更复杂的模型必然带来更高的方差，两者是同一个动作的两面，不可能同时降。这与 1\.6 节 的第三条（泛化）直接相关：Yet they don't overfit \(when training data and model size is compatible\)\. 只要训练数据量与模型规模相匹配，它并不因此过拟合。

### 9\.3 诊断模型性能的学习曲线  Learning Curves

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjkyOTUwMjdlZWMyMzRhODBlOWMwN2U5MzE5NmVlMTFfMzU0MTA1OTA1MDg5OWI5YWM2NTBkNDI4YjgzZGNhODJfSUQ6NzY5MTE3ODg0OTYxODY2MDg5MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

|状态|定义|两曲线的形态|图上读数|
|---|---|---|---|
|欠拟合|Both training and validation errors are high and close together\. Adding more data does not help\-need a more complex model\.|两条线都很高且互相贴近，且随数据量增加几乎不下降|训练约 0\.38 → 0\.36；验证约 0\.47 → 0\.42|
|良好拟合|Both errors are low and converge\. The model generalizes well to unseen data\.|两条线都低、且随着数据增多收敛到一起|训练约 0\.19 → 0\.09；验证约 0\.28 → 0\.13|
|过拟合|Large gap between training \(low\) and validation \(high\) error\. More training data can help reduce the generalization gap\.|两条线之间差距很大；图例把这段差距标为 Generalization gap，并用粉色阴影涂出|训练约 0\.08 → 0\.02；验证约 0\.49 → 0\.38|

More training data can help reduce the generalization gap\. 更多的训练数据可以缩小泛化差距。这与欠拟合的状态：Adding more data does not help（加数据没用）形成对照。

注意图上过拟合曲线在横轴右端仍然没有收敛，这正是在说数据还不够。

欠拟合：两条曲线都高且贴在一起，加数据只是让它们更贴，误差下不去 → 该换更复杂的模型。

过拟合：两条曲线差距大，加数据会让验证误差往下追训练误差 → 该去收集更多数据。

### 9\.4 五条对策  How to Address Overfitting and Underfitting

这两类问题需要完全相反的动作。

|序号|对过拟合（缓解）|对欠拟合（增强）|
|---|---|---|
|1|Regularization \(L1/L2 penalty\) , adds penalty for large weights\. （对大的权重**加惩罚**）|Increase Model Complexity, Add more layers or neurons\. （加层或**加神经元**）|
|2|Dropout, randomly deactivate neurons during training\. （训练时随机失活一部分神经元）|Train Longer, Increase number of epochs\. （增加训练轮数）|
|3|Early Stopping, Stop when validation error starts increasing\. （早停：验证误差开始上升就停）|Reduce Regularization, Lower L1/L2 penalty or dropout rate\.（降低惩罚项或失活率）|
|4|Data Augmentation, Increase training data diversity\. （增加训练数据的**多样性**）|Better Feature Engineering, Add more informative features\. （加更有**信息量**的特征）|
|5|Batch Normalization, Normalize layer inputs to stabilize training\.（归一化每层输入以稳定训练）|Use a Different Architecture, try a more powerful model class \(e\.g\., deeper network\)\. （换更强的模型）|

## Part 10 Tutorial 5 Reinforcement Learning

Learning Objectives

1. 描述通过交互与延迟奖励来学习 describe learning through interaction and delayed rewards。

2. 把序列决策问题形式化成一个马尔可夫决策过程 formulate a sequential decision problem as a Markov decision process。

3. 区分策略、回报、状态价值与动作价值 distinguish policies, returns, and state and action values。

4. 解释贝尔曼最优方程与 Q\-learning 更新式 explain the Bellman optimality equation and the Q\-learning update。

5. 说出表格型 Q\-learning 的主要假设与局限 state the main assumptions and limitations of tabular Q\-learning。

### 10\.1 Introduction: Reward Now or Later

近处有一颗小星星，远处还有一颗更大的，但要多走一步。智能体该选哪条路？

眼前收益 vs 长期收益。后面 p\.9「等待的价值」会把这个问题算成具体数字。

注意插图本身不含技术信息（一个机器人在岔路口，左近右远）—— 本讲真正给出答案的是折扣因子 γ：γ 大就愿意等，γ 小就只顾眼前。

### 10\.2  Reinforcement Learning 

Reinforcement learning \(RL\) studies how an agent learns to choose actions through interaction with an environment to maximize expected cumulative reward\.

强化学习研究智能体如何通过与环境交互来学会选择动作，以最大化期望累积奖励。

Actions can change both the immediate reward and future states\. 动作会同时改变即时奖励与未来状态。

Feedback is typically a scalar reward, not the correct action for each state\. 反馈是一个标量奖励，而不是每个状态下的正确动作，与监督学习的区别。

The agent must balance using what it has learned with gathering new information\. 必须在使用已学到的信息与获取新信息之间权衡。

三类决策问题示例：robot control（机器人控制）、resource allocation（资源分配）、game playing（博弈）。

### 10\.3 The Agent–Environment Interaction

在时刻$t$，智能体观察$S_t$、选择 $A_t$、先把动作做出去，环境才给出反馈，于是收到奖励$R_{t+1}$ 与下一个状态$S_{t+1}$。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NGUwNmUyMDk0MWIyYjRiNzI0NDA1MGY3ODQ3NzUzODRfYmQ5YjZkM2U2MjA3ZWM3ZjI5MDEyODQxNjk2NGM5NThfSUQ6NzY5MTkxNjc5OTg1MTY5NTY0NF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

策略 policy：一个从状态到动作的映射，策略$π(a|s) $规定在状态 s 下如何选动作（给每个动作一个被选中的概率）。

轨迹 trajectory：训练数据，一条轨迹就是状态、动作、奖励交替出现的序列。

回合 episode：一条样本的结束，一个回合在终止状态（terminal state）结束；而持续性任务没有自然终点。LM的区别在于：RL 的样本不是别人给的，是智能体自己走出来的。An episode ends in a terminal state; Continuing tasks have no natural endpoint\. 

### 10\.4 序列决策的挑战

问题1：Delayed consequences: an action may have little immediate reward yet improve later outcomes  

延迟后果：某个动作即时奖励很少，却改善了后续结果。需要回报 G（把未来奖励折现加总），因为只看即时奖励就分不出好坏；

问题2：Uncertainty：the same action may lead to different next states or rewards

不确定性：同一个动作可能导向不同的下一状态或奖励。需要期望值 $E[·] $与转移概率 $p(s′,r|s,a)$

问题3：Exploration：information about unfamiliar actions is acquired by trying them

探索：关于陌生动作的信息，只能靠去试才能获得。需要$ε-greedy $这类行为策略

The objective is therefore to optimize a sequence of decisions, rather than each reward in isolation\.  要优化的是一连串决策，而不是孤立的每一个奖励。

### 10\.5 马尔可夫决策过程  MDP

Markov property: given the current state and action, the distribution of the next state and reward does not depend on the earlier history\.

给定当前状态与动作时，下一状态与奖励的分布不依赖于更早的历史。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzJjMDM5NzllYWFiYzIxODYyMmUxZDc3YmNiMDA4ZWNfZmY1ZDI5YjYzNDZjYjU3ODA2Mjk0ODgzNDljMzJhMjdfSUQ6NzY5MTk0ODg2Mjg4OTcwOTA4M18xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

状态与可行动作 states S and available actions A\(s\)。可行动作依赖当前状态。

转移与奖励律： $p(s′,r | s,a) = Pr(S_{t+1} = s′, R_{t+1} = r | S_t = s, A_t = a)$。在 s 做 a 之后，下一状态是 s′ 且奖励是 r 的概率。

折扣因子：a discount factor γ ∈ \[0,1\) for the discounted setting。

Tips：The state must therefore contain the information needed to predict the consequences of actions\. If only partial observations are available, an MDP state may not be directly observed\. 

马尔可夫决策的工程依据：如果你的状态表示漏掉了预测所必需的信息，那它就不是一个合格的状态。只能拿到部分观测时，MDP 里的状态可能根本观测不到。 

### 10\.6 Return, Value, and Bellman Equations 回报、价值与贝尔曼方程 

#### 10\.6\.1 回报与学习目标  Return and the Learning Objective

The return from time t is the discounted sum of future rewards：从时刻 t 出发的回报（return），是未来奖励的折现和。 $γ^k$ 是第 k 步之后那笔奖励的折扣权重。

$G_t = Σ_{k=0}^{∞} γ^k R_{t+k+1}, 0 ≤ γ < 1$

回合制任务：For an episodic task, the sum stops at the terminal time\. 求和到终止时刻就停。

γ 的作用：γ controls how strongly later rewards contribute to the objective\. γ 控制越晚的奖励对目标的贡献有多强。

γ ∈ \[0,1\) 这个区间是为了保证求和收敛。如果奖励有界（比如 \|R\| ≤ R\_max），那么 $ |G_t| ≤ R_max / (1 − γ)$ 越接近 1，这个上界越松，长期视野越长。 $γ = 0 $ 时 $
G_t = R_{t+1}$，智能体只看眼前一步。

学习目标：The goal is to find a policy maximizing expected return，写成 $π* ∈ argmax_π E[G_0]$（对某个指定的初始状态分布取期望）。

奖励设计也是问题的一部分：The objective depends on how rewards are defined; reward design is part of the problem formulation\.

#### 10\.6\.2 Example：The Value of Waiting

Suppose one action ends the episode with reward 2\. Another yields 0 now and rewards 5 on the following step, then ends the episode\.

|**路线**|**课件写法**|**含义**|
|---|---|---|
|**立即收益 Immediate reward**|$G_t = 2$|做完这一步回合就结束，直接拿 2|
|**延迟收益 Delayed reward**|$G_t = 0 + γ(5)$|第一步拿 0，第二步拿 5，但第二步的 5 要乘 γ 折现|

At γ = 0\.9, the delayed route returns 4\.5 and is preferable\. At γ = 0\.3, its return is 1\.5, so the immediate route is preferable\.

γ = 0\.9 时延迟路线的回报是 4\.5（0\.9 × 5 = 4\.5 \> 2），优于立即收益；γ = 0\.3 时回报是 1\.5（0\.3 × 5 = 1\.5 \< 2），立即收益更好。

γ 不是多重视未来这种含糊的说法，它直接改变最优决策。同一个环境、同一组奖励，只换了 γ，答案就从等翻成不等。取舍的分界点是 γ × 5 = 2，即 γ = 0\.4。γ \> 0\.4 等，γ \< 0\.4 不等，γ = 0\.4 两条路线完全相同（都是 2）。这个临界 γ是判断这类题最快的方法。

#### 10\.6\.3 状态价值与动作价值 State and Action Values

$v_π(s) = E_π[G_t | S_t = s]
$

$q_π(s,a) = E_π[G_t | S_t = s, A_t = a]$

$v_π(s)$：evaluates a state when actions follow π 评估在状态 s，之后都按策略 π 选动作时的期望回报。

$q_π(s,a)$：evaluates first taking a in s, then following π 评估在 s 先做 a，之后才按 π 走时的期望回报。因为选动作需要一个对每个候选动作打分的函数，而 v 给不出这个分数。

最优动作价值：对所有策略取最大，得到真正的最优动作价值。 

$q*(s,a) = max_π q_π(s,a) $

在有限 MDP 里，对 q\* 逐状态取 argmax 的策略就是最优策略。

### 10\.7 从回报到贝尔曼期望方程  From Return to Bellman Expectation

#### 10\.7\.1  Splitting the Return 把回报拆成现在 \+ 将来

The return separates into the next reward and the remaining return:

$G_t = R_{t+1} + γ G_{t+1}$

从今天看的回报 = 下一步的奖励 \+ 从下一步看的回报再折一次现。

1. 第一步，引入的是环境的不确定性$（p(s′,r|s,a)）：$先对可能的下一状态与奖励取条件 condition on the possible next state and reward \(s′, r\)。

2. 第二步，引入的是策略的不确定性$（π(a′|s′)）$：选择下一动作时按策略 π 走 follow policy π when choosing the next action a′。

3. 最后对所有这些结果取平均 average over these outcomes。

#### 10\.7\.2 The Bellman Expectation Equation 贝尔曼期望方程  

$q_π(s,a) = Σ_{s′,r} p(s′,r | s,a) [ r + γ Σ_{a′} π(a′ | s′) q_π(s′,a′) ]$

This equation separates action value into:

1. the immediate reward; 

2. the discounted value of subsequent decisions under π\.

|方程|对应上一步|说明|
|---|---|---|
|$Σ_{s′,r} p(s′,r | s,a) [ … ]$|第 1 步 \+ 第 3 步|对环境给出的所有 \(s′, r\) 按概率加权求和|
|$r$|第 1 步|括号里的即时奖励部分|
|$γ Σ_{a′} π(a′ | s′) q_π(s′,a′)$|第 2 步|后续决策的折现价值：下一状态上按策略 π 选动作得到的期望动作价值|

意义：它把一个无限长的期望变成了一步 \+ 同一个量。右边又出现了 $q_π $自己（bootstrapping）：用下一状态的价值来定义当前状态的价值。正因为有这个自指结构，才能迭代求解，而不必把无穷级数真的展开。

At the terminal next state, the continuation value is zero\. 若下一状态是终止状态，后续价值那一项为 0（此时只剩即时奖励）。

### 10\.8 从策略评估到最优控制 From Policy Evaluation to Optimal Control

From policy evaluation to optimal control, The Bellman optimality equation replaces the policy average with the best available next action:

唯一改动是把平均换成取最大（最好的动作），把评估换成了优化

贝尔曼最优方程：

$
q*(s,a) = Σ_{s′,r} p(s′,r | s,a) [ r + γ max_{a′} q*(s′,a′) ]$

|对比项|贝尔曼期望方程|贝尔曼最优方程|
|---|---|---|
|评估对象|$<br>q_π $给定策略 π 的价值|$<br>q*$最优价值|
|下一动作|$Σ_{a′} π(a′|s′) · (…)$按策略取加权平均|$max_{a′} (…)$直接取最大的|
|用途|策略评估：算这个 π 有多好|最优控制：算最好能有多好|
|对应的算法路线|迭代策略评估等评估类方法|Q\-learning 等最优控制方法|

Dynamic programming can use this equation when the transition and reward law is known\. 动态规划（DP）能用这条方程，前提是已知 p\(s′,r\|s,a\)；

Q\-learning estimates q\* from sampled transitions \(s,a,r,s′\) without requiring that law\.  Q\-learning 从采到的样本估计 q\*，不需要知道这个定律。

### 10\.9 From Bellman Optimality to Q\-learning

#### 10\.9\.1 三个替换 Three Substitutions

贝尔曼最优方程，需要对所有可能的环境输出结果求期望：$r + \gamma\max_{a'} q_*(s',a')$。 

但环境模型未知的时候，智能体只能采样观察到单条状态转移元组 $(s,a,r,s')$。 

因此需要做三处替换来得到可实际更新的目标：

1. Replace the unknown $q_*$ with the current estimate Q\. 把真实最优价值函数 $q_*$ 替换成模型当前的估计值 Q。自举（bootstrap）

2. Use the observed reward and the next state to form a one‑step target\. 利用真实观测得到的奖励 r 和下一状态 $s'$，构造一步更新目标。 随机近似（用单个样本代替整体期望）

3. Move $Q(s,a)$ partway toward that target\. 不再做完整平均，将 $Q(s,a)$ 向上面构造的目标值挪动一部分。步长 / 学习率控制更新幅度

#### 10\.9\.2 The Q\-learning Update

$Q(S_t,A_t) ← Q(S_t,A_t) + α_t(S_t,A_t) [ R_{t+1} +\gamma\max_{a'} Q(S_{t+1},a′) − Q(S_t,A_t) ]$

步长： $α_t(S_t,A_t) ∈ (0,1]$ is the step size for the updated pair\. α 是针对被更新那一对的步长，取值在 \(0,1\]。

The bracketed quantity is the temporal\-difference \(TD\) error\. 方括号整块就是时序差分误差。

终止状态：If $S_{t+1} $is terminal, the target is $R_{t+1}$: there is no future\-value term\. 若下一步是终止状态，目标就是 R\_\{t\+1\}，没有未来价值项。

|更新式|作用|
|---|---|
|$R_{t+1} + γ \max_{a′} Q(S_{t+1},a′)$<br>TD 目标（one\-step target）|用实际观测 \+ 当前估计拼出来的这一步应该是多少|
|$R_{t+1} + γ \max_{a′} Q(S_{t+1},a′) − Q(S_t,A_t)$<br>TD 误差 $δ$|目标比现值高多少；乘上 α 就是要修正的量|
|$α_t$<br>步长 / 学习率|一次修正走多远：α = 1 直接跳到目标，α 小则慢慢挪|

α 的写法是 $α_t(S_t,A_t)$ 而不是一个常数 α。这提示步长允许随状态动作对而不同，甚至允许随迭代轮次变化。

#### 10\.9\.3 Example： Q\-learning by Numbers

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTM4M2NlMjA4NDhhNDRlMzIwNDZmY2FlODk0YjkyMTJfM2FiNThkMmRkOTMwZWJkYjY1YTU3NDgzODI2NTliOWRfSUQ6NzY5MjAzMDMwMTEyNzkzNzU2Ml8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2FiMGE5MzZhYzkwZTllYzg5NTBmZTlkZTU0ZWZjMzdfYWIwNzAxZTM0ZjIwN2E1MWY1N2VhMjFiODM1OGI2ZWVfSUQ6NzY5MjAyNjg3MTAyMjE3NzgyNF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

|给定|值|
|---|---|
|当前估计 $Q(s,a)$|3|
|观测到的奖励 $r$|2|
|下一状态的最优估计 $\max_{a′} Q(s′,a′)$|4|
|折扣因子 γ|0\.9|
|步长 α|0\.5|

第 1 步，先算 TD 目标： $
r + γ \max_{a′} Q(s′,a′) = 2 + 0.9(4) = 5.6。$

第 2 步，更新估计： $
Q_{new}(s,a) = 3 + 0.5(5.6 − 3) = 4.3。$

## 10\.10 TD 误差 How to Interpret the TD Error

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWJhODJhYTc2MGVkYTE2YjU5ZjdjMGU3NmZjMzVhYmRfZDYyNTRlYTQzYzJlN2YzOTM3ZTJlMWU2NTcxZTVjOTZfSUQ6NzY5MjAzMDM2Mzk1ODUxMzE4MF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

Define the one\-step target and error as：

$
Y_t = R_{t+1} + γ \max_{a′} Q(S_{t+1},a′)$

$
δ_t = Y_t − Q(S_t,A_t)$

$Y_t $是一步目标， $
δ_t $是TD 误差 = 目标 − 当前估计。

课件的读法：更新把$Q(S_t,A_t) $按比例$α_t$ 朝样本目标$ Y_t $移动。

A positive $δ_t $means the sample target exceeds the current estimate; A negative value means it falls below it\.  $δ_t $为正表示样本目标高于当前估计；为负表示低于。

A single TD error is noisy, so its sign alone does not establish that the true action value is under\-or overestimated\.  单次 TD 误差是有噪声的，所以只看它一次的正负，并不能断定真实动作价值被低估或高估了。

## 10\.11  Exploration and Exploitation：ε\-greedy 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWZjODYwZjExMDYxOTkyNzFiMmY1MTQ5NTU4YWQ3NzJfYTc5NmMxOGIzYmEwMjhkMTJjMmQzYjFkMWEzZjM1NjBfSUQ6NzY5MjAyODc2NTQxMjgzODkzNl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Njk1ZGY2ZWI4MzI2ZDhkY2U4ZGNiM2YzNzU1MzE3Y2VfZWUxM2ZhYzIzNjM5MTFhMjcyOWFhNTQ0MzI0MmMzZTFfSUQ6NzY5MjAzMDQ2NzA0MTg3MzQzNF8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

以概率 $ε_t $随机选一个可行动作（探索）；其余概率下在 $arg max_a Q(S_t,a)$ 里选（利用）。

探索的作用：Exploration supplies information about less\-visited actions\. 提供较少被访问动作的信息。

利用的作用：Exploitation uses the currently highest\-valued action\. 使用当前估值最高的动作。

衰减必须有下限意义上的保障：A decay schedule must still provide sufficient visits to state–action pairs for tabular convergence claims to apply\.  衰减方案仍须保证状态动作对获得足够的访问次数。

## 10\.12 Quick Check: ε\-greedy Behavior

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzQxMWRjMzczZmE2MzQ2NjFkZDhiODQwMWVlNjJkNmFfZjA1MGY3ZTllMGY3ZTdlYTViZTkzZTBkZDAwYzg1ZmNfSUQ6NzY5MjAzMDU5MzE3NzE2MTI0MF8xNzkxNjM2MzkzOjE3OTE3MjI3OTNfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGJhM2IyOTBiNDYxMTZjZjFkYTZiZGM1MDk0MWI1NWVfODc3NTUyNzg4MjcyZWI4ZDg1NTJkMDc5NzNkNTU4MzJfSUQ6NzY5MjAzMDUyOTkzOTY3MjYwMl8xNzkxNjM2MzkyOjE3OTE3MjI3OTJfVjM)

一般式： $Pr(贪心动作) = (1 − ε) + ε · (1/n)$，其中 n 是可行动作数（本题 n = 2）。当 n 很大时，探索带来的这 ε/n 就接近于 0，这也说明探索在大动作空间里更稀释。

## 10\.13 Why Q\-learning Is Off\-Policy

> 核心现象： 智能体用$\varepsilon‑greedy$这种带探索的**行为策略去产生样本轨迹**； 但是更新目标里面用 $\boldsymbol{\max_{a'}Q(S_{t+1},a')}$，瞄准的是**完全贪心的目标策略**。
> 
> 关键定义： The policy generating experience need not match the policy whose value is being learned\. 生成样本的行为策略 ≠ 我们正在学习价值的目标策略 → 这就是 off‑policy（离策略）。
> 
> 

off‑policy ≠ 不需要探索 虽然更新不依赖行为策略，但依然要有充足探索。如果很多$(s,a)$从来没被访问，Q 得不到修正，$\max$就取不到真实最优值。

## 10\.14 Convergence of Tabular Q\-learning 表格型 Q‑Learning 收敛条件

前提：有限折扣 MDP，奖励有界。两组**充分条件**（满足就一定收敛；不满足不代表一定发散，只是定理不作保证）

1. 每一个相关状态‑动作对$(s,a)$被**无穷多次更新**。

2. 步长序列满足：

$\sum_{n}\alpha_n(s,a)=\infty,\quad \sum_{n}\alpha_n(s,a)^2<\infty$

含义拆解：

$\sum\alpha_n=\infty$：总步长要足够大，保证参数可以走到目标，不会中途卡住。

$\sum\alpha_n^2<\infty$：步长后期快速变小，压制样本噪声，不会持续震荡。

> 经典可行例子：$\boldsymbol{\alpha_n=\dfrac1n}$
> 
> 

两种不满足充分条件的实践做法：

1. **固定步长**：$\sum\alpha=\infty$成立，但$\sum\alpha^2=\infty$，第二条不满足。工程上大量使用，但没有该理论收敛保证。

2. $\varepsilon$衰减到 0，部分$(s,a)$再也不会被采样：第一条无穷次访问不满足。

在全部充分条件成立下：**表格 Q‑Learning 以概率 1 收敛到真实最优动作价值**$q_*$。

## 10\.15 适用范围与局限（每一条对应一类后续算法）

1. **内存爆炸**：Q 表内存大小正比于状态‑动作对总数，无法处理巨大、连续状态空间。

A Q\-table requires memory proportional to the number of state–action pairs and is unsuitable for very large or continuous spaces\. 

2. **稀疏 / 延迟奖励**：很难做探索和信用分配。

Sparse or delayed rewards can make exploration and credit assignment difficult\.

3. **部分可观测 POMDP**：需要额外记录历史信息或者更强模型。

Partial observability requires a representation of relevant history or a richer model\.

4. **函数逼近（神经网络如 DQN）**：可以跨状态泛化，**但是表格 Q‑Learning 那一套收敛保证不会自动继承过来。**

Function approximation can generalize across states, but tabular convergence guarantees do not automatically carry over\.

> 这四个局限催生三大方向：近似价值函数、策略梯度、基于模型强化学习。
> 
> 

The agent may behave according to an exploratory policy, such as ε\-greedy, while the update targets the greedy next action through $max_{a′} Q(S_{t+1},a′).$

智能体可能按探索性策略行动，但更新式瞄准的是贪心动作，与正在执行的策略无关。

Thus the policy generating experience need not match the policy whose value is being learned\.

产生经验的策略，不必等于被评估价值的那个策略。这就是 off\-policy（离策略）的含义。

This does not remove the need for adequate exploration\. 但 off\-policy 不等于不需要探索。行为策略可以随便与可以不去试是两件事。如果没有足够探索，Q 里那些没被访问过的状态动作对就永远得不到修正，max 也就取不到真正的最大。

### Overall

1. RL optimizes expected long\-term reward through interaction\. RL 通过交互优化期望长期奖励。

2. An MDP formalizes states, actions, rewards, and transition dynamics\. MDP 把状态、动作、奖励与转移动态形式化。

3. Bellman equations relate current values to future values\. 贝尔曼方程把当前价值与未来价值联系起来（这是能迭代求解的根源）。

4. Q\-learning uses sampled transitions to estimate optimal action values\. Q\-learning 用采样的转移估计最优动作价值。

5. Reliable learning depends on exploration, suitable step sizes, and the assumptions of the chosen model\. 可靠的学习依赖探索、合适的步长、以及所选模型的假设三者齐备。

目标 → 形式化 → 方程 → 算法 → 边界。G\_t 怎么定义 → MDP 三要素 → 贝尔曼期望 vs 最优（就差一个 max）→ 更新式的四块（现值、奖励、折现后继、步长）→ 收敛条件与四条局限。

## 


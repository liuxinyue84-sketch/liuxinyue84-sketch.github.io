# 5434 Big Data Computing1

# Lecture 4: Hadoop and MapReduce

## part 0 Navigation

**Hierarchical Structure**

|**层级**|**课件原文**|**内容**|**与本课程的关系**|
|---|---|---|---|
|第 1 层|**Data** 数据|Images, text documents, social networks, spatial data \(GPS\), time series data, transaction networks, gene networks, …|Week 1–3 处理过的对象|
|第 2 层|**Data analytics** <br>数据分析|Clustering, Community detection, Association rules, Classification, Neural Networks, Graph algorithms …|**Week 1–3 的内容全在这一层**|
|第 3 层|**Computational infrastructures** <br>计算基础设施|Hadoop, MapReduce, Spark, Hive, RDBMS, KV database, Graph database, …|**本讲与下一讲的内容**|
|第 4 层|**Applications** 应用|FinTech, Smart City, Bioinformatics, Social Media, Tourism, Transportation, ……|最终落点|

本节主讲：**当数据装不下一台机器时，把存储和计算都拆开、并把计算搬到数据旁边去。**这就是Hadoop的工程实现，MapReduce 是它的计算模型，整讲都在回答“为什么必须这样拆、拆了之后要额外解决哪些问题”。

**全篇脉络**：

100 PB 装不下单机

多线程只能解决效率（存储与内存仍无解）
 跨机器并行会 lost update（读\-改\-写非原子）
 加锁能保正确但降低并行度（reduced parallelism）
 改用“各写各的局部表 \+ 最后合并”——不需要共享可写状态
 这条思路就是计算向数据并拢MapReduce（move operations near the data）
  实现为分治法Partition/Combine = Map / Shuffle and Sort / Reduce
  → 用户只写两个函数，运行时自动并行、容错、均衡、限制通信

|**板块**|**内容**|
|---|---|
|**Hadoop** · Introduction|大数据四 V、两个核心关切、Hadoop 的定义与四个核心组件、历史、里程碑、设计目标|
|**Hadoop** · Ecosystem|四个核心模块 \+ 九个相关项目|
|**MapReduce** · Introduction|出身、收益、Google 的用途、典型应用|
|**MapReduce** · Motivations|词频统计算例、单机瓶颈、丢失更新、加锁代价、把计算搬到数据旁、分治法|
|**MapReduce** · Technical Ideas|并行编程的六类难题、负载均衡、MapReduce 隐藏了什么、三条设计立场、工作流全景|
|**MapReduce **· Workflow and Programming|Map / Reduce 抽象、伪代码逐行解读、数据分区、流水线、可解问题、使用步骤、局限|

## part 1 Hadoop Introduction

### 1\.1 background

大数据4V：Volume, Velocity, Variety, Veracity（体量、速度、多样性、真实性）；

数据经济：We are in a data/knowledge economy 我们处在数据/知识经济之中；

1. 数据是资产：Data is an important asset to any organization 数据对任何组织都是重要资产，需要存储。

2. 知识发现 Knowledge Discovery：基因组（速度）、奥巴马竞选（个体化）、Netflix 纸牌屋（内容决策）

### 1\.2 Two Main Concerns

How to process such a huge amount of data in a distributed system? 

处理：并行度与同步——Hadoop MapReduce

How to store such a huge amount of data in a distributed system?

存储：容量与可靠性——Hadoop Distributed File System \(HDFS\)

### 1\.3 Definition, Goal and Components

#### 1\.3\.1 Definition

1. **Hadoop**: an open\-source software framework that supports **data\-intensive distributed applications**, licensed under the **Apache v2** license\.

data\-intensive：数据密集而不是计算密集，所以瓶颈在 I/O 与存储，不在 CPU，把计算搬到数据旁边。

Apache v2 license**：**允许商用、允许修改与再分发。Hadoop 低成本的法律基础。

2. **HDFS **：A distributed file system that runs on large clusters of commodity machines\. 运行在大型商用机器集群上的分布式文件系统。

3. **YARN **：A framework for job scheduling and cluster resource management\. 作业调度与集群资源管理的框架。

#### 1\.3\.2 Goal

Goals: to solve the problems about process and storage of huge amount of data解决\.大规模数据的处理与存储问题。

1. 抽象并简化存储与处理 

Abstract and facilitate the storage and processing of large and/or rapidly growing data sets\. 抽象并简化大型（体量大）以及快速增长（在线扩容）的数据集的存储与处理。

2. 两类数据都要支持结构化与**非结构化**数据。这是 HDFS 与 HBase 并存的原因。

3. **简单的编程模型 Simple programming models**。

4. 高可扩展与高可用 **High scalability and availability** 。

open\-source implementation of frameworks for reliable, scalable, distributed computing and data storage\. 可靠（reliable）、可扩展（scalable）、分布式（distributed）的计算与数据存储。

5. 便宜、冗余少的商用硬件 **Use commodity hardware with little redundancy** 

a flexible and highly\-available architecture for large scale computation and data processing in a network of commodity hardware\. 硬件前提: 面向商用硬件网络的、灵活且高可用的架构。

6. 容错 **Fault\-tolerance** 

这是用廉价硬件的必要补偿：硬件不可靠，软件必须可靠。

7. 把计算搬向数据 **Move computation rather than data** 

**移动计算而不是移动数据**。数据量大、移动成本高，所以把程序送到数据所在节点执行。

|**因果链**|**内容**|
|---|---|
|成本 → 容错|用 **commodity \(cheap\!\) hardware with little redundancy** ⇒ 硬件会坏 ⇒ 必须有 **Fault\-tolerance** ⇒ 由软件层（HDFS 副本 \+ 任务重试）承担|
|数据大 → 移动计算|**data\-intensive** 且数据**rapidly growing** ⇒ 移动数据的 I/O 成本极高 ⇒ 必须 **Move computation rather than data** ⇒ 把操作搬到数据旁|

#### 1\.3\.3 Components

|**组件**|**职责**|**解决的问题**|
|---|---|---|
|Hadoop MapReduce|a system for parallel processing datasets <br>并行处理数据集的系统|处理|
|Hadoop Distributed File System|a system for distributed dataset storage <br>分布式数据集存储系统|存储|
|Yet Another Resource Negotiator<br>（Hadoop YARN）|a framework for job scheduling and cluster resource management<br>作业调度框架和集群资源管理|支撑前两者|
|Hadoop Common|Common utilities that support Hadoop <br>支撑 Hadoop 的通用工具|支撑前三者|

### 1\.4 Hadoop and MapReduce

1. MapReduce是一个计算模型（a Computational Model/Program）

2. Apache Hadoop是MapReduce这一思想的开源实现（an open\-source implementation of the MapReduce idea）

MapReduce这个思想不只Hadoop一个实现，它是 Google 提出的编程模型；Hadoop 只是Apache基金会把它工程化、开源化的产物。It is not a program, but an idea。

### 1\.5 Question and founders

1. The Question: "How to process big data with reasonable cost and time?"
如何以合理的成本与时间处理大数据？

传统方案用**高端服务器**换时间（scale up），成本极高；

Hadoop选择用**大量廉价机器**换时间（scale out），把可靠性问题交给软件层（fault\-tolerance）。

2. Google search engines

1998年的Google页面复杂，但2013年的Google界面极简，全部复杂度转移到后端。15 年间前端极简化、后端能力膨胀。用户看到的越简单，背后的分布式计算需求越大，所以需要Hadoop。

3. 从论文到 Apache

Nutch（2002，Doug Cutting \+ Mike Cafarella）→ GoogleFileSystem论文（2003，存）→ MapReduce 论文（2004，算）→ Yahoo 资助 → 2008 移交 Apache

### 1\.6 Google Origins

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjZmOTgyZDYzYTdkMWZjNGE5MjIxYTgyYTZlY2MyNDZfOTA3NGU1NGVkNzI0ZWFjY2JjNTJjZDg2YTM4MjgyMmVfSUQ6NzY4OTUzMjk5MjM4NDk5NDg0OF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

2003 存：GFS论文 → HDFS。HDFS 不是 Google 的实现，而是这篇论文的开源复现。

2004 算：MapReduce论文 → Hadoop MapReduce。这是本讲的主角。

2006 结构化存储：Bigtable 论文 → Apache HBase。解决结构化数据的分布式存储。

## part 2 Hadoop Economy

### 2\.1 Four Hadoop Core Modules

|**模块**|**课件定义原文**|**关键词**|
|---|---|---|
|**Hadoop Common**|A set of components and interfaces for distributed file systems and general I/O|components and interfaces（组件与接口）、general I/O（通用 I/O）|
|**Hadoop Distributed File System \(HDFS\)**|A distributed file system that runs on large clusters of commodity machines|runs on large clusters（跑在集群上）、commodity machines（商用机器）|
|**Hadoop MapReduce**|A distributed data processing model and execution environment that runs on large clusters of commodity machines|**model and execution environment**（模型**与执行环境**）|
|**Hadoop YARN**|A framework for job scheduling and cluster resource management|job scheduling（作业调度）、cluster resource management（集群资源管理）|

### 2\.2  Nine Hadoop\-Related Projects

|**项目**|**课件定义原文**|**中文与归类**|
|---|---|---|
|**Ambari**|A tool for provisioning, managing, and monitoring Hadoop clusters|集群**配置 / 管理 / 监控**工具 → 运维类|
|**Avro**|A serialization system for cross\-language RPC, and persistent data storage|**跨语言 RPC** 的序列化系统、持久化数据存储 → 数据格式类|
|**Cassandra**|A scalable multi\-master database with no single points of failure|可扩展的 **multi\-master** 数据库，**无单点故障** → NoSQL 类|
|**Chukwa**|A data collection system for managing large distributed systems|大型分布式系统的**数据采集**系统 → 采集类|
|**HBase**|A distributed, column\-oriented database|分布式**列式**数据库 → 数据库类（对应 2006 Bigtable）|
|**Hive**|A distributed data warehouse provides a query language based on SQL|分布式**数据仓库**，提供基于 **SQL** 的查询语言 → 数仓类|
|**Mahout**|A Scalable machine learning and data mining library|可扩展的**机器学习与数据挖掘**库 → 算法类|
|**Pig**|A data flow language and execution environment for exploring huge datasets|**数据流语言**及其执行环境，用于探索海量数据集 → 语言类|
|**ZooKeeper**|A distributed, highly available coordination service|分布式**高可用协调服务** → 协调类|

Tips: 

1. **HBase vs Hive：**HBase 是**数据库**（列式，直接存取行/列）；Hive 是**数据仓库**（用类 SQL 语言做批式查询）。一个是存储引擎，一个是查询层。

2. **Pig vs Hive：**两者都是用更简单的语言写MapReduce，但 Pig 是**数据流语言**（过程式），Hive 是**类SQL**（声明式）。

3. **Cassandra vs HBase：**Cassandra 的特点是multi\-master \+ no single points of failure（无中心节点，任一节点可写）；HBase的定位是 column\-oriented（列式）。

## part 3 MapReduce Introduction

3\.1 Definition

1. MapReduce is a programming model Google has used successfully for processing its "big\-data" sets\. 它是一个Google 成功用于处理其大数据集的编程模型。

2. A framework that allows for the distributed processing of large data sets across clusters of computers using simple programming models\. 它是一个允许用简单编程模型在计算机集群间分布式处理大数据集的框架。

3. It is not a program, but an idea\. MapReduce 是方法论层面的东西，不是一份可以下载运行的软件。

4. Hadoop MapReduce is an implementation of MapReduce\. Hadoop MapReduce 是它的实现。

MapReduce 是什么？它是 Google 提出的编程模型（不是程序），是允许在计算机集群上分布式处理大数据集的框架；Hadoop MapReduce 是它的开源实现，其底层运行时自动完成并行化、容错与通信。

### 3\.2 Function

|**课件原文**|**含义**|**对应 Part IV**|
|---|---|---|
|**The underlying ****runtime system**** automatically parallelizes the computation across large\-scale clusters of machines**|底层运行时**自动**在大型集群上把计算并行化|automatic parallelization and distribution|
|**The underlying system also handles machine failures**|运行时负责**处理机器故障**|fault\-tolerance、assume failures are common|
|…**efficient communications, and performance issues**|以及**高效通信**与**性能问题**|网络与磁盘传输优化|

**Tips: **

1. 自动化：这些在传统并行编程里必须手写的部分（调度、同步、容错、通信），MapReduce 全部自动化。

2. runtime system：它说明MapReduce包括一个在背后干活的系统（runtime）。用户只写Map和Reduce两个函数，剩下的交给runtime。

### 3\.3 Benefits

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTAxZGVhZTc2OWE5OTgyNTIzYjJmY2MwY2E2ZmY5YTZfMGQzMzdiZGQ5NjU4OGU1Y2MxODNkZTQ5Y2RhMjUwNjBfSUQ6NzY4OTY3NTc3ODU3NDMzOTYxNl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

|**含义**|**机制**|
|---|---|
|突破存储与计算的传统限制|把两者都拆到集群上|
|以廉价商用硬件为平台|commodity \(cheap\!\) hardware|
|提供从1到5000台服务器的线性可扩展性（scale out）|scale out：加机器即扩容|
|低成本、开源软件|Apache v2 license|

Tips：

linear scalability线性可扩展性：**性能随机器数量近似线性提升，**2 倍机器约 2 倍吞吐。这个性质的前提是任务之间足够独立（**数据量大而处理独立：**索引、聚类、报表、影像、语言模型、备份，每一项都是**逐条/逐片处理**，条目之间不需要互相等待），这正是MapReduce Pipeline要处理的问题（限制进程间通信量）。

### 3\.4 Scale Out \& Scale Up

|**维度**|**scale out（横向扩展）**|**scale up（纵向扩展）**|
|---|---|---|
|做法|增加**机器数量**（1 → 5000 台）|提升**单机性能**（换更强的服务器）|
|成本曲线|线性、可用廉价硬件|非线性、须高端专有硬件|
|上限|理论上可持续加机器|受单机物理上限限制|
|原文|**A large number of commodity low\-end servers is preferred over a small number of high\-end servers**|—|
|代价|必须解决**故障**与**通信**问题|成本高|

### 3\.5 Application

|**应用**|**中文**|**为什么适合 MapReduce**|
|---|---|---|
|**distributed pattern\-based searching**|分布式模式检索|逐条记录独立匹配模式，天然可并行|
|**distributed sorting**|分布式排序|分片局部排序 \+ 归并（Shuffle and Sort 的核心操作）；也是2008基准测试的题目|
|**web access log stats**|网站访问日志统计|日志逐行处理 \+ 按 key 聚合（与词频统计同构）|
|**inverted index construction**|倒排索引构建|词 → 文档列表的聚合，Map 输出 \(词, 文档\)，Reduce 汇总（**典型的两阶段结构）**|
|**document clustering**|文档聚类|Google News|
|**statistical machine translation**|统计机器翻译|需要大规模语料上的n\-gram统计|

**Tips: **

1. **倒排索引为什么是标准范例：**它是**结构上最贴合 MapReduce 的问题，**Map 阶段逐文档产出 \(term, docID\) 对，Shuffle 按 term 分组，Reduce 阶段把同一 term 的所有 docID 合成列表。与词频统计（Map 出 \(word,1\)、Reduce 求和）只差累加与收集的区别。

## part 4 MapReduce Technical Ideas

本节思路：100 PB 装不下 → 多线程只解决效率 （efficiency）→ 跨机器并行会丢更新（lose update）→ 加锁代价高 （lock solution）→ 改用局部状态 \+ 最后合并（MapReduce机制和分治法）→ 这就是 MapReduce 的起点

### 4\.1 Example：Word Count

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWQ5YzdjY2MyYTA3MmM1NzJkYjE4YWE1ZWIzMmE0ZjVfYzdjMWQ3OGMyYTY3MWRiMTM3YWQzMGY5NzRmYjNkYTNfSUQ6NzY4OTY3OTE5NzQzOTY0MzE2NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

问题：为什么统计一堆文档里面的词频单机做不了，MapReduce能做？

MapReduce 能默写 输入：文档集合；输出：\<term, frequency\> 列表

1. 结构最简：只需「拆分 → 计数 → 合并」三步，没有迭代、没有共享状态、没有先后依赖。典型解题四步正是从这里抽象出来的。

2. 可扩展性最强：把 100 PB 文档切成 N 片，每片独立计数，最后把 N 张局部表按词相加即可，这就是Separated data / Separated counters图的全部内容。

3. 与其他任务同构：倒排索引、访问日志统计、n\-gram 统计都是同一个形状，因此这个词频统计的解法可以原样迁移。

4\.2 Other Applications

|**应用**|**是什么**|**与词频表的关系**|
|---|---|---|
|**Word cloud** 词云|按词频决定字号的可视化|**直接**用频次作字号权重|
|**Inverted index** 倒排索引|从文档 → 词翻转为词 → 文档列表|把频次换成文档 id 列表，聚合结构相同|
|**TF\-IDF**|词频 × 逆文档频率，衡量词对文档的代表性|**TF 就是词频**；IDF 需要该词出现在多少篇文档中，这也是一次按词聚合|
|**Google Trend**|热门查询趋势报表|与Google 用例直接对应，是查询日志的词频统计|

1. 四个应用的共同点：都需要先按词聚合。词频表就是这个聚合的结果，因此它是这些任务的公共前置步骤。

2. TF\-IDF 的特殊地位：两个因子（TF 与 IDF）都能由一次 MapReduce 式的按词聚合算出。

3. 倒排索引的计算量：在 Google 的规模下，倒排索引的构建正是 MapReduce 的发源场景。

Lecture2 中的 TF\-IDF 与余弦相似度是用已经统计好的词频向量算的；本章说明那些词频向量本身也需要一个可扩展的方式来算。

### 4\.3 ** **Three Single Machine Problems

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzM3MDFmOWI0NWUzY2VkMjVmYjhlZTRmOGFiODhmNzVfMTJhMTEwZTA0Yjc5ZTIyNDdiNThkNDdlZGUxNmRjMGRfSUQ6NzY4OTY4MjA1Mjc1MjQ2MTMzOF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

词频统计在单机上的三个瓶颈及MapReduce的解决：

|**瓶颈**|**具体含义**|**MapReduce 的解法**|
|---|---|---|
|**Efficiency issue** 效率问题|单机串行扫描 100 PB 需要天文数字的时间；CPU 与磁盘带宽是上限|**并行化：**多 worker 同时处理不同分片|
|**Storage issue** 存储问题|一台机器装不下 100 PB；即使装下也无法可靠维护|**HDFS：**切块 \+ 多副本存在集群上|
|**Memory issue** 内存问题|词表本身可能大到装不进内存（不同词的个数也可以是上亿级）|**局部聚合：**每个 worker 只维护自己分片的局部计数表，最后再合并|

三个问题的独立性：三者不能互相替代，加 CPU 不能解决存储（数据还是装不下）；加磁盘不能解决效率（单机 I/O 带宽有限）；加内存不能解决前者（100 PB 远超任何单机内存上限）。必须同时换三套方案。

### 4\.4 For Efficiency Issues

#### 4\.4\.1 Naive Solution by Multiple Threading

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjAyOTJiZDY0MTQ5YzMzY2RlNmM1NDJiMTQzM2Y0ZjFfNzBlYWU0YjEyMWUzZDFjMzMzMWI0MjJjZWY4NWFhZjFfSUQ6NzY4OTY5OTk1NDk0Mzk1NDQ2MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

用多线程来应对效率问题（注意：本质是单机内的优化，所以只提效率，不能扩容存储与内存，后面必须走分布式）。

朴素方案：一份 Data collection 输入，连接到n 个计数器线程并行处理。单核串行变成多核并行，CPU 利用率提升，**效率问题的单机部分**被缓解。

弊端：1\. 数据仍要**全部在一台机器上**（存储问题未解决）；2\. 所有线程**读同一份数据**，I/O 带宽成为新瓶颈；3\. 各线程若共享一张全局计数表，就埋下了丢失更新的隐患。

#### 4\.4\.2 The Worker: Generalize to a larger scope

Worker: a basic instance to undertake the tasks\. 承担任务的基本执行单元
• A worker can be a thread or a processor\.
• Workers can be in a single machine or multiple machines\. 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NWZjNTA1YjIwOTg4N2Y3YWQ5YjU4NDM3ZmY4YmE1ZDRfMjhhMzY2NGJmOTUzZTEyZWI1YzFkYmRkZTI1OWRmZmRfSUQ6NzY4OTcwMTQ2OTk2ODI4OTMwOF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

|**Worker 的实现形态**|**所在位置**|**对应场景**|
|---|---|---|
|一个**线程**（thread）|单台机器内|多线程方案|
|一个**处理器**（processor）|多台机器上|真正的分布式计算|

Tips: 实际上，所有并发问题（同步、共享状态）在单机与多机上是同一类问题，不必重新发明一套问题描述。

#### 4\.4\.3 Distributed Computing

|课件原文|含义|
|---|---|
|A cluster of machines/nodes 一个机器/节点集群|分布式计算的最小前提：多台机器组成集群|
|Data is **split** into several parts and **stored** in distributed machines 数据被切成若干部分存放在分布式机器上|数据**先切分再分布**（这就是 HDFS 的角色）|
|Multiple workers work together simultaneously 多个 worker 同时协同工作|并行不是可选项，而是定义的一部分|

**Tips: **This requires **careful programming**\. Otherwise, we risk getting **incorrect**** results**\! 因为并行的风险不只是慢，而是**答案****错，并行与正确性之间存在张力。****并行计算不会自动得到正确结果，需要谨慎的编程（careful programming）**

#### 4\.4\.4 Lost Update

##### 4\.4\.4\.1 Lost Update Problem

为什么并行的风险是错呢？

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODM1ZTExNWIwNzFmNGJhMmJhYzY0MWI2NWM3Mzc1MzdfYjdlYWQxNDk2ZWFkZjM1NWM1ZjE2NDEyMTQxNjg4OTBfSUQ6NzY4OTcwNDU4MDYxOTQzOTY0Ml8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

- **场景描述**：介绍了一个全局数组“count”，存储在中心节点，并可由两个工作者访问。用红色文本强调潜在错误。假设两个工作者正在处理相同的术语“apple”。指出这个问题不仅存在于分布式系统中，也适用于本地多线程。

- 一个标记为“工作者”的框中包含5步伪代码算法：“读\-改\-写”循环

- **时间线**：**工作者1（蓝色柱）**：执行“读”操作，然后进行“写”操作；**工作者2（粉色柱）**：在工作者1的读取后执行“读取”，在工作者1的写入后进行“写入”。

- **结果**：数据库中的最终值为1，正确应为2，一个增量操作被覆盖，实际丢失了。

- **原因：**Worker 2 的那一次读发生得太早，读到了0，写发生得太晚。**根因是「读\-改\-写」不是原子操作，**中间有可被交错的时间窗口。

- **为什么两个 worker 同时处理同一个词：**这正是词频统计的常态。因此这个冲突**不是极端情况，而是必然发生**。

##### 4\.4\.4\.2 Locking\-based Solution

又如何解决呢？

A locking protocol may be used to ensure correctness\.
A worker must hold a lock on "count\[t\]" before using Read/Write\.

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzA1NGUwZGZlZDM0YjlkODY4MGE3MjMwNjg2OTkxM2RfNGRkZGRlYTYwNDQ1ZjhmZjI1MWQwZjJkODNhMjhlMWZfSUQ6NzY4OTcwNTI4MDY5ODg0Njc0NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

- **执行调度表**：将“工作者1”和“工作者2”分成两列。

- **工作者1列**：“Lock \( count\["apple"\] \)” \& “Read \( count\["apple"\] \)”

- **工作者2列**：显示工作者1持有锁时的情况：

    1. “Wait for Lock\( count\["apple"\] \)”用红色文本书写。

    2. 一个省略号（“\.\.\.”）表示工作者2被阻塞并在等待。

- **锁机制的工作原理：**当工作者1获得对特定资源（在此为“apple”的计数）的锁时，工作者2必须等待该锁被释放，这也体现了上文提到的“降低并行性”的概念。

- **缺点**：1\. 复杂性增加：实现代码变得复杂。2\. 运行时开销高：导致“降低并行性”。

##### 4\.4\.4\.3 The Cost of Solution

加锁这种方式的弊端

|**代价**|**含义**|**后果**|
|---|---|---|
|Complicate implementation|使实现变复杂|程序员必须自己管理锁的获取、释放、异常路径，这与Simple programming models（只写map和reduce代码）目标背道而驰|
|Expensive runtime overhead: reduced parallelism|运行开销昂贵：并行度下降|这是更致命的一条，为了正确性付出的是性能，而性能正是当初并行的目的|

1. 排队意味着串行化，并行度直接掉下来。

2. **锁的粒度问题：**若锁的粒度是单个词，不同词的worker仍可并行；但若共享表很大，锁管理的开销本身也会成为负担。

3. **与三个瓶颈的关系：**加锁只解决正确性问题，对 Storage issue 与 Memory issue 完全无解，还额外拖慢了效率。

#### 4\.4\.5 The Core Idea of MapReduce

Q：How to ensure correctness without or with less usage of locking?

加锁有很多问题，如何少用or不用锁呢？

A：引入Core Idea：move operations near the data 

把操作移向数据，再用局部状态代替共享状态。把加锁的全局表换成各写各的局部表最后并行。

1. Let each worker use its local storage \(hard disk\) to store a local array "count"

每个 worker 有一份**自己的**局部计数表（存在本机磁盘上）

2. Each worker can only update its local array

worker **只写自己的表**，绝不碰别人的 

3. When workers finish their tasks, they send their local arrays to the central node

全部完成后，把局部表**上交中心节点**

Cost：引入了一次**额外的通信**（上交局部表）与一次**额外的合并步骤**（把局部表相加）。这个代价可接受，因为合并发生在**所有 worker 完成后**，可以批处理，不打断并行。

### 4\.5 For Memory and Storage Issues

#### 4\.5\.1 Example: Peta\-Scale Data

Peta\-scale data is commonly distributed from data that can be easily stored or processed on a single machine\. 

大尺度数据通常来自那些可以在单台机器上轻松存储或处理的数据

|主题|与本节的关系|
|---|---|
|两个核心问题（处理和存储）|提出单机服务不了全部数据|
|100 PetaBytes \+ 三个瓶颈|给出具体体量与三条困难|
|集群与数据切分|给出物理形态（机器集群 \+ 切分后的数据）|
|Peta 级数据天然分布式（本节）|把分布式从方案确认为前提|
|分治法 Divide and Conquer|给出处理前提（分布式）下的方法论|

Peta 级数据无法在单机上存储/处理，因此必须是分布式的。

#### 4\.5\.2 Divide and Conquer 分治法

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDg5YTYzNDYwYzJjYWI4ZTI5Yzc4ZDZiYjQyMTI5YmNfODA0YzQxOTlhZmM0YjNlYWQ2MDExOWFkZTAxMjE2OTlfSUQ6NzY4OTc2ODQ3MTU4ODA5NzU2NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODcxNjA1Y2IxY2UyMmY1MmJmYjkxOWYwODkwY2MwZjFfNjFlNGIwYTk1ZTI4ODkxZWZiYTdjNjNiNjQ2YjZmZGNfSUQ6NzY4OTgyMTc2MzQxMjIwMDk4N18xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

方法论层面的答案：**分治法**

|标签|含义|MapReduce 术语|阶段|
|---|---|---|---|
|Partition|把一个巨大工作拆成三份子工作，分给三个 worker 各自计算，得到三个局部结果，最后合成 Result|输入切分（Split）\+ 任务分配|Map 之前（由运行时完成）|
|各 worker 独立计算||Map \+ 本地聚合|Map 阶段|
|（中间的通信）||Shuffle and Sort|Map 之后、Reduce 之前|
|Combine|把分与合正式命名为两个阶段|Reduce|Reduce 合并阶段|

1. **split 与 merge 成对出现：**每条边上都有 **split / merge**（split 用粉色箭头向下，merge 用蓝色箭头向上），在后面的内容中把这一页的两条边正式命名为 **Partition**（对应 split）与 **Combine**（对应 merge）。

2. **递归结构：**从 1 个 Problem 到 2 个 Subproblem 再到 4 个 Compute Subproblem，是**逐层二分**。实际的 MapReduce 分多少层都可以。

3. **compute 的位置：**计算发生在**叶层**（Compute Subproblem），中间层只负责**拆与合**。这对应 MapReduce 的两个阶段：Map 在叶层干活，Reduce 负责合并。

**分治法与前面各节的关系**

|**前面讲的问题**|**分治法给出的答复**|
|---|---|
|数据装不下|把 Problem **split** 成多个 Subproblem，每个都能放进一台机器|
|两个 worker 会冲突|让各 Subproblem **独立计算**，不共享可写状态|
|加锁拖慢|只在 **merge** 阶段通信，中间过程无需同步|
|结果怎么合|**merge** 就是把各局部结果合并的一步|

**Tips: ****分治法不保证正确****：**分治法给出的是**结构**，不是正确性保证。任务怎么分给 worker？部分结果怎么合并？worker 死了怎么办？这些问题分治法自身并不回答。

## part 5 MapReduce Workflow and Programming

分治法（Partition/Combine）→ 六类难题 → 负载均衡 → 自动化与三条设计立场 → 五段工作流 → 四步解题范式

### 5\.1 Basic Workflow of MapReduce

#### 5\.1\.1 Input and Output

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDMwNzZmZjhmZjQ3ZjVlODkzZjYzMWY4ODNiZjhlZWNfMjI1YWMwOGQ4N2VjMTVjZThlZjVkMDNkNTVkNGJkMzhfSUQ6NzY4OTc3Nzc0NDkzNDQyNDA5MF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

1\. 输入是一个目录或数据集，不是单个文件：Peta\-scale data collection意味着输入本身就是一个许多文件的集合，切分粒度在运行时决定。

2\. 输出是\<key, value\> 对的列表：词频表“hadoop 1”就是 key=hadoop、value=1。这个形态是Map与Reduce的接口。

3\. 输入输出是一对多与多对一的关系：合并步骤的通信量远小于输入数据量，输入很大（Peta 级）、输出很小（一张词频表）。The output usually contains a few pairs compared to input。

#### 5\.1\.2 DIvide and Conquer

MapReduce的最简形式：Split → Parser → Counter → 汇总

有Separated data and counters 独立的数据和计数器（数据分治\+局部数组）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmM4ZjQwMGNmYTg2Y2IxN2U1OWZiMmFhYzhiMmIyMTJfZjEzZDg5YTU3ZjJiNTI5ZDQ3Y2QzODQ5YTFjMzYzNzZfSUQ6NzY4OTc3OTYzMDg3OTUxMDA0OF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

|**级**|**节点**|**职责**|**MapReduce 对应**|
|---|---|---|---|
|第 1 级|**Split 1 … Split n**|把数据切成 n 份（分开的数据）|**Split：**输入分片 |
|第 2 级|**Parser 1 … Parser n**|逐份解析（切词）|**Map：**把记录变换成 \<key, value\> 对|
|第 3 级|**Counter 1 … Counter n**|各自统计本份的局部计数（分开的计数器）|**Map 的本地状态 / Combine：**局部聚合|
|汇总|（虚线箭头汇入右侧一张表）|把 n 张局部表合并|**Reduce：**按 key 合并|

**Tips: **

1. **Parser 与 Counter 完全可并行：**第 i 份数据的解析与计数只依赖第 i 份数据，与其他份无关，任务之间足够独立（linear scalability的前提）。

2. **汇总必须等待：**右侧那张表要等所有 Counter 都完成才能给出最终结果，**All Map should be completed before Reduce starts**（所有 Map 必须在 Reduce 开始前完成）。

### **5\.2 Challenges**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDc0YmFiMWVhNDIzYzE0MTkxZWNmNWJjMWVmZjFmYTZfZjU4MzIyYTg4OGIxMDBhNGVlOTFjOWQ3ZjBmN2ZkM2JfSUQ6NzY4OTc4OTQwOTQ5OTE3MjM4MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzM4YWM0NjMwNjJiZTcxNjk0NjBlN2Y1MjU1MTA2YzlfZWJjZmNmZWEyM2RhMGM5OWU5NDkxZDhkZGEzYjRjMDlfSUQ6NzY4OTc4OTI4MTIyNDgwNTkyMF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

给出一个具体的集群规格，在这样的集群上写程序要考虑什么？这些问题正是 MapReduce 运行时系统要自动处理的清单。

1. How do we assign work tasks to workers?

怎么把工作分配给 worker？调度问题。

2. What if we have more work tasks than workers?

任务比 worker 多怎么办？需要任务队列与排队机制。

3. What if workers need to share partial results?

worker 之间需要交换部分结果怎么办？通信问题。

4. How do we aggregate partial results?

怎么汇总部分结果？合并问题。

5. How do we know all the workers have finished?

怎么知道所有 worker 都完成了？同步/终止检测问题。

6. What if workers die?worker 

死了怎么办？容错问题（Assume failures are common）。

|**类别**|**对应问题**|**MapReduce 的处理**|
|---|---|---|
|**调度与负载**|1、2|**5\.4 load balancing**；任务数可配置|
|**通信与同步**|3、5|**Limit the amount of communication**；Map 全部完成后才进 Reduce|
|**结果合并**|4|**Shuffle and Sort \+ Reduce**|
|**容错**|6|**handling machine failures；Assume failures are common**|

### **5\.3 Managing Multiple Workers**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2U4NmJiNGRlMjNhZTk2ZGQzNzE4YTE5MWU0YWFjY2JfOTUwYjViMGFjZTg4MTNhNjVkNGRjZmRlYWY0MTBkN2FfSUQ6NzY4OTc5NDI1MDk1NDgwNDc2NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

不知道 worker **运行的顺序**。不知道 worker **何时互相打断**。不知道 worker **何时需要交换部分结果**。不知道 worker **访问共享数据的顺序**。（5\.4补充工作量不可知）

4\.4\.2 节把 Worker 抽象为一个执行单元；这一节说明这种执行单元的**时间行为不可预测**，这正是管理困难的全部来源。

|工具|操作|用途|
|---|---|---|
|Semaphores 信号量|Semaphores \(lock, unlock\)|互斥：保证同一时刻只有一个 worker 进入临界区|
|Conditional variables 条件变量|Conditional variables \(wait, notify, broadcast\)|同步：让 worker 在条件不满足时等待，条件成立时被唤醒|

**broadcast 的含义：**notify 唤醒一个等待者，broadcast 唤醒**所有**等待者。

#### 5\.3\.1 工具管理共享状态后仍然存在的问题

Still, lots of problems: e\.g\., Deadlock\. Cause of problems with resource access:
They need to access shared resources\.

死锁 Deadlock：加锁后多个 worker 互相等待对方持有的锁，谁也无法推进。

根因：They need to access shared resources 问题的根源是**worker仍然需要访问共享资源**。所以改用局部状态（如果不共享，这些工具与问题都不需要）。

### 5\.4 Load Balancing

MapReduce的**调度目标**：让所有 worker 同时结束

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzVmMDlhOGVkY2NmMmVlZDk2NGE0NTViNDVkNzMyODJfYjRlZDRiOGY2ZmE3ZTU0NmE1ZjY1NDBkZmQ5M2IwODRfSUQ6NzY4OTc5ODAzODY3NTYwNzA2Nl8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

Q 问题：如何优化worker运行和等待访问共享资源？原方案里Worker2承担了两个大任务，成为最慢的一环。总时间由最慢的worker决定，空闲的算力被浪费。

A 改进的办法：把Task4从Worker2移到Worker3，三条时间线的长度变得接近，最慢的那条变短，总时间随之缩短。图右侧用两条竖直红线标出Time Saved。

P 前提条件：这种移动任务只有在**任务之间互相独立**时才可能，与5\.1\.2节Split / Parser / Counter 同一前提。

Tips：任务的实际耗时取决于数据量，程序员事先无法精确预知。

所以Load balancing直接列为MapReduce运行时替用户完成的工作之一，因为手工做这件事需要预知任务耗时，而在集群上这是做不到的，所以MapReduce把这个自动化5\.4\.1。

### 5\.4 Problem Types

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjI3ZmM4M2FlN2YwYzFhYzM2NWIzYmIyYWRmZTcwMmNfYWQ5NGRiNzU4YjM5ZTFlNjk4NGIwY2Y3ODdiNjY3NWJfSUQ6NzY4OTgxMTIzMzgxNzUxMzUwNF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

|**类别**|**课件原文清单**|**解读**|
|---|---|---|
|**Fundamental issues** 基本问题|Scheduling, data distribution, synchronization, inter\-process communication, robustness, fault tolerance, …|调度、数据分布、同步、进程间通信、健壮性、容错——**与前两节的六个问题同源**|
|**Architectural issues** 体系结构问题|Flynn's taxonomy \(SIMD, MIMD, etc\.\), network topology, bisection bandwidth, cache coherence, …|Flynn 分类（SIMD/MIMD）、网络拓扑、对分带宽、缓存一致性——**偏硬件与体系结构**|
|**Common problems** 常见故障|Livelock, deadlock, data starvation, priority inversion, … dining philosophers, sleeping barbers, cigarette smokers, … Load balancing,…|活锁、死锁、数据饥饿、优先级反转；以及经典的哲学家就餐、理发师睡觉、吸烟者问题——**并发编程的经典病**|
|**Different programming constructs** 编程构件|Mutexes, conditional variables, barriers, … masters/slaves, producers/consumers, work queues, …|互斥量、条件变量、屏障；以及主从模式、生产者/消费者、工作队列——**实现这些机制的工具与模式**|

拓展：

Flynn 分类的两个缩写 

1. SIMD：Single Instruction Multiple Data 单指令多数据。同一条指令作用在一批数据上（如 GPU 的向量运算）。

2. MIMD：Multiple Instruction Multiple Data 多指令多数据。各处理单元执行不同的指令流（Hadoop 集群属于这一类）。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NGJiOWU3ZDVhYWU4OWNjZmY1NmM0YmVlMzFmNTJiZmJfZTQ5NmNiN2E1MzIwNTRlNjZmNTA4YzM3NWUzNTM0YWVfSUQ6NzY4OTgxMzE0OTM3NzMwMjA0MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

#### 5\.4\.1 Reason and Solution

**Problems arise from: **Access to shared resources \(e\.g\., data\), Communication between workers \(e\.g\., to exchange state\)\. 

两个根因：**访问共享资源；worker 之间需要通信**。

**MapReduce:  **Automate most of these for you\. 

MapReduce 把这些大部分自动化，把复杂性从程序员转移到运行时。从而实现了Hadoop的目标之一：Simple programming models。

注意是most而不是 all：MapReduce 不解决所有并行编程问题，只自动化了它面向的那一类（批式、读多写少的大数据处理）。

### 5\.5 MapReduce Features

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDFhNTBmNjJkY2I4ZmFkOWVjOWJjMzYyMGJkNGJlYzZfNjQ4YmJmMTFiZjhhYmFmYTFiMTZlZmNiZGQ2MDhkYmNfSUQ6NzY4OTgxNDg5MTQ4NTYxMzU5NV8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

Hide messy details in MapReduce **runtime library**

关键是 **runtime library** 复杂性被搬进**运行时库**，因此用户只需写Map与Reduce函数。

|Features|中文|对应5\.2的问题|
|---|---|---|
|**automatic** parallelization and distribution|自动**并行**化与**分发**|怎么把任务分给 worker（问题 1）|
|load balancing|负载均衡|Load imbalance（问题2）|
|network and disk transfer optimization|**网络与磁盘**传输优化|worker之间怎么交换结果（问题 3）\+ 节的通信虚线|
|handling machine failures|机器故障处理|worker 死了/终止怎么办（问题 5，6）\+ 节的容错|
|inherently designed for batch and high throughput processing jobs|天生面向批式与高吞吐的作业|说明它的适用范围，不是通用并行框架<br>Note that MapReduce is not designed to solve all kinds of problems\. 它是**有适用边界**的框架 |

三位一体：**scale out → failures common → co\-location**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWY1YTVlZmJmNDJiOGE3NjFhYzIwNWU2YmI2MTU1M2RfYzM1ODI0YjQ1NWViNmZlODJjMDA1MTBhMGQxMTA1NTNfSUQ6NzY4OTgxNDkxNzI1MTA5MTk5NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

1. Scale "out", not "up" **横向扩展**而不是纵向扩展。

A large number of commodity low\-end servers is preferred over a small number of high\-end servers\. 更倾向于使用大量低端的商品服务器，而不是少量高端服务器。

**out 必然导致 failures：**服务器数量一多，按概率就有机器在坏。选择廉价硬件就是选择接受故障，所以假设故障是常态。

2. Assume failures are common 假设故障是常态。

Fault\-tolerant service must cope with failures **without impacting the quality of service\. **容错服务必须能够应对故障，而不影响服务质量。

**failures 必须靠 co\-location 缓解：**如果计算与存储分离，机器一坏就要跨网络重传数据，代价极高；把processors与storage放在一起，坏了一台只需把它的任务在**别处就地重跑**（因为那里也有同一份数据的副本，HDFS备份机制）。

3. Moving processing to data 把处理移向数据。

MapReduce assumes an architecture where processors and storage are co\-located\. MapReduce 假设处理器和存储是共址的架构。

**processors and storage are co\-located：**前提是MapReduce 假设每一台机器**既是数据节点也是计算节点**，这是计算移到数据的物理实现，并与**HDFS配合保证数据在本地备份**，使 co\-location 的假设在发生故障后依然成立。

**「without impacting the quality of service」的分量 ·**容错不只是「不崩」，而是**服务质量不下降**——用户不应感知到某台机器坏了。这是一个较强的要求，靠的是副本与任务重试。

### 5\.6 MapReduce Workflow

Split → Map（local write）→ Shuffle and Sort（remote read, sort）→ Reduce（write）→ Output File

1. Map的定义

Map: a mapping that is responsible for dividing the data（划分数据） and transforming the original data into key\-value pairs（把原始数据变换成键值对）\.

2. Shuffle and Sort 的定义

Shuffle and Sort: the process of further organizing（组织） and delivering（传递） the Map output to the Reduce\.

The output of the Map must be sorted（排序） and segmented（分段/分组）, 

then passed（传递） to the corresponding Reduce

Communication occurs（唯一的跨网络通信发生）\.

3. Reduce 的定义

Reduce: a merge（合并） that processes the **values** with the same key and then outputs to the final result\.

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmMxZGMwMDgzYzM4ZjgxZjc2MGY0ZjcyYjA2MDNhNmNfZTdkZmM4MGFlZTRhOWI1NzdkYTE5NzJlYzI5OGI2NjFfSUQ6NzY4OTgyMzQ5MTA4Mzc2NzMyM18xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

|段|元素|说明|
|---|---|---|
|Input Data|Split 0 / Split 1 / Split 2 三个红框，带一条 read 箭头|输入数据被切成三片；read表示本地读取|
|Map|extract something you care about from each record 从记录提取需要的信息|3个worker 并行做 Map；输出本地写出local write（不跨网络）|
|Shuffle|remote read, sort|跨网络读取各 Map 的输出并排序，这是唯一的跨节点通信段|
|Reduce|aggregate, summarize, filter, or transform             聚合、汇总、过滤或变换|2个worker做 Reduce，把结果写出|
|Output Data|Output File 0 / Output File 1|Reduce 的输出文件；两个 Reduce ⇒ 两个输出文件|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzU0YjVhNDlhNTE2YmMzYzU5NDFjNGY1ZjFjNGQyNGFfMzczNmQwZGEyYmE1NzNkNzM0MDA4ZjE0ODczZjA2ZWNfSUQ6NzY4OTgyNzEzODE0MDExNDQ2NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

Tips:

1. local write与remote read ：Map 的输出是本地写（local write），Shuffle 是远程读（remote read）。跨网络的数据移动只发生在 Shuffle 这一步。

2. Map 任务数与 Reduce 任务数可以不同。

3. Shuffle 的两个动作：remote read（去各 Map 节点把属于自己 key 的数据取回来）\+ sort（把取回的数据按 key 排序，使同 key 的值相邻）。这两个动作合称 Shuffle and Sort，即将映射的数据进行组织和分组。

4. Map 是从记录中抽出（record → 若干键值对，一对多）；Reduce 是聚合/汇总/过滤/变换（同 key 的值集合 → 结果，多对一）。方向相反。

### 5\.7 Typical Problem Solving by MapReduce 

Read（读文档集）→ Map（每条记录产出 \(term, docID\)）→ Shuffle（按 term 分组）→ Reduce（收集同 term 的 docID 成列表）→ Write

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDg4NGFhODMzZWEyMzA0YTgxNzg5Mzk0ZTllM2Y5OWVfNjU3NjhmY2Y0YzVkYmZhNTBjNGY0ZDRjYTRiODAyODRfSUQ6NzY4OTgyOTUyMDY5Nzg4ODI4M18xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzU2OGRkYWMyMjQ2YTBjZDU5ZjRhOWU1MTAyOTIwNzZfYTEwZTQ2MTE2Y2Y3NzdhOWY3YmVhZjg1Y2Y3YWU3MTVfSUQ6NzY4OTgyOTU5OTE2ODk1Nzk4MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

#### 5\.7\.1 MapReduce 单词计数过程

如何通过 MapReduce 计算三个文件中单词的频率。

- **流程图:**  

    - **输入:** 来自三个文件的原始文本。

    - **Spliting 分割:** 文件被分成独立的块。

    - **Mapping 映射:** 每个块被拆分为键值对。

    - **Shulffing and Sorting 洗牌与排序:** 这些对被重组，使相同的键聚集在一起。

    - **Reducing 归约:** 对每个键的值进行求和（例如，“Bear, 2”）。

    - **最终结果:** 每个单词的汇总计数。

#### 5\.7\.2 Map抽象

- **输入:** 接受一个键值对，其中键引用输入值，值是待操作的数据集。

- **评估:** 对每个输入值应用用户定义的函数，可能需要解析。

- **输出:** 生成一组新的键值对，其数据类型可以与输入不同。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2MwMGM5NGM3YTA1Nzg0MmRkODY3ZTYyZGUxZWJiZDhfZjZhOGQ3NTM0OWVhYmNiOTM1MWJlNzhlYmY1ZTkxZTdfSUQ6NzY4OTgyOTYyMzc3NzAwNTA4OF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTllNzM3NTBkYjllMWEyYTEzYjQ3YWUwNzY4MTc2N2ZfYWMzZTg1Y2NjYTU4OTJkMDE0MjljYThmMDkwYWQ2ODJfSUQ6NzY4OTgyOTY2NjEzOTQ3NTQ4Ml8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

#### 5\.7\.3 Reduce抽象

- **输入:** 接受中间的键值对。

- **过程:** 系统在调用“reduce”函数之前执行“洗牌和排序”。所有共享相同键的对被分组在一起，迭代器将这些值提供给函数。

- **功能:** 其目的是聚合、汇总、过滤或转换数据。

- **输出:** 生成最终的键值对。输出通常比输入要小得多，因为它对数据进行了压缩（例如，对每个特定关键词的值求和）。

#### 5\.7\.4 编程模型

- **Map\(\):** 程序员指定一个函数，该函数接受输入数据并生成一组中间的键值对。

- **Reduce\(\):** 程序员指定一个函数，该函数接受中间的键值对并将其合并，以生成一组合并的输出值。

## part 6 Tutorial: Hadoop

### 6\.1 Pseudo\-Code

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjIxZGU3YTE1MTIxODFmYWUzNDBjZmM5YTU5YWZhMmFfMWUwOTE1OTA1ZDU0ZmZjNWEyYzk0NzM5M2YwZTQzZGNfSUQ6NzY4OTgzNjAxMDQxODQ5MDkwNl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGJkYTQ0Nzc4YjAxNmU2YzFlNDg2YmQ2NzdmZmMzYWJfZGU2NGFhYTZkMDE1YTk3ODc0MDA0ODZlY2QyOTJkOGRfSUQ6NzY4OTgzNjA0MDk4MjQwMDUzOF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

**MapReduce** 模型中用于“词频统计”（WordCount）的两个核心函数的伪代码：

1. **Map 函数**：处理输入数据，将文本行拆分为单个单词（Token），并为每个单词输出一个键值对，键是单词，值是1。

2. **Reduce 函数**：汇总处理结果，接收每个单词对应的所有计数值，进行累加求和，输出该单词及其总出现次数。

### 6\.2 Challenge and Solution

管理多个工作单元（Workers）时面临的挑战及相应的解决方案：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGY1ZmVmYzM1MGE0OTdkMzUyYTYyYWYxYTY2NjcxNWRfOWQ4ZGZhYzdlZjQ1NjAwYWIzN2JhZWMwMWE1ODQ1YTBfSUQ6NzY4OTgzNzUxODA2MTA4MDA5Ml8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

**面临的挑战**：工作单元的执行顺序不可预测，工作单元之间可能会相互干扰，难以确定工作单元何时需要交换中间结果，对共享数据的访问顺序不确定。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWMzZWM4YTY2Mzc5MmMzYmM5YTY4ZjA1MWQxMGVjOGJfY2JmMzVmZWY4YWNhZTc0ZGViNGYyMTMwNDkxNTA5MDdfSUQ6NzY4OTgzNzU0NDg4Nzg2NDg2MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

**解决方案**：限制工作单元立即访问共享数据，防止工作单元相互干扰，将操作移至数据附近执行，在工作单元完成后进行批量更新。

### 6\.3 MapReduce: Data Partition

问题：数据在什么时候、由谁切分？

答案：在加载时就分好，由 HDFS 负责

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWE1YjMxZTVkNGY1NzdlNDRjNjRmNmYyNzNiZWZmNzRfZDIxOGEyZWJkYTA0YjA4ZTE0ZmI0ZjFjOWQzMWZjMjNfSUQ6NzY4OTgzNzk1MjI0MzAxMTA5OF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

**数据分区与存储 \(Data Partitioning \& HDFS\)**：

|事实|含义|解决的问题|
|---|---|---|
|加载时即分布|数据在写入时就已经分布在集群各节点上，不是处理时才切分|解释了为什么Map能本地读取|
|切成 chunks|文件被切成块，每块由不同节点管理|决定了Split 1…Split n的颗粒度，数据切分大小由chunks决定|
|每块多副本|Each chunk is replicated across several machines|Assume failures are common 副本是容错的物理基础|

### 6\.3 MapReduce Pipeline

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NWNjNjBlNWFjZGQwNTk2ZjJkYTc4YzZmMDdiZDU0NGFfZDJlYmEyZWRmYTJjYWE0MzJmOTUzMGM0NWZiOGJiNDNfSUQ6NzY4OTgzODA3MjExNjE3MDI2NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

1. **限制通信**：旨在减少进程间的通信量。

2. **独立处理**：每个记录由 Mapper 独立处理，互不干扰。

3. **映射阶段 \(Mapping\)**：各节点对本地预加载的数据进行映射处理。

4. **洗牌阶段 \(Shuffle\)**：节点间交换 Mapper 生成的中间数据。

5. **归约阶段 \(Reducing\)**：Reducer 将不同 Mapper 的结果合并，生成最终输出并存储在本地。

### 6\.4 Classes of Problems

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2M1NGE5MTI2MWIxN2ZhNmM1YjNkYjE2YzQ5MzUyOGRfZGEwZDJiM2RjZjI3YjcyZjc3Y2VjNDRiZTFmZjI5YzlfSUQ6NzY4OTg0MDc0MzQ5NzczMTYwOF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

MapReduce 的适用场景（可并行化问题）：基准测试：数据密集型计算，如排序；Google 应用：用于词频统计、AdWords、PageRank 和数据索引；简单算法：如 grep（文本搜索）、文本索引和反向索引；其他行业应用：贝叶斯分类、Facebook 的人口统计分析、金融服务分析以及天文学中的高斯分析。

### 6\.5 MapReduce steps

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDkyNDFmYzA3YWYxODcyNDBjNWI2OTViOThmMjVjZTJfZTc0N2QxMDFkMDUzZDI5ZDc1ZTAxNThhZDFkMWVkMTRfSUQ6NzY4OTg0MDcwMDY0MDM4MjQ5MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

|阶段|课件原文|要点|
|---|---|---|
|判断适用性|Determine if the problem is parallelizable and solvable using MapReduce|两个条件：可并行 \+ 可用 MapReduce 解|
|检查数据形态|Is the data Write Once Read Many \(WORM\)?|WORM 数据一次写入、多次读取，是并行的前提（无需锁）|
|设计与实现|Design and implement Mapper class and Reducer class|两个函数|
|配置、加载与运行|Configure the application \(job\) as to the number of mappers and reducers \(tasks\), input and output streams；Load the data；Launch the job and monitor|任务数可配置；数据加载；提交并监控<br>|

### 6\.6 Limitation and Summary of MapReduce

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWE2NDFmMzA4OWEwODUxNTVlMjEzYTAwMTVlZjE2M2FfYWVkYjA2YWM0OTBmODAyMDA1M2EzNGNjYjIyMzM1MWNfSUQ6NzY4OTg0MDY0OTQ4MjM5MTA2NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

- **局限性**：

    1. 难以处理共享全局状态，依赖共享状态的算法在 MapReduce 中难以实现。

    Online learning：在线学习每来一个样本就更新一次模型参数，下一个样本的处理依赖上一次更新后的参数。这意味着：样本之间不独立；参数是共享可写状态。

    model parameters as shared global state：共享全局状态，只要有全局可变的模型，就无法用纯 MapReduce 表达。

    2. 不适合小数据集，该框架主要为大规模数据的批量处理而优化。

    要处理小数据集，框架必须改造。原因是MapReduce 的整套机制（切分、分发、Shuffle、容错）都有固定开销，数据量小的时候这些开销占比过高。

    batch 是设计目标而非缺陷。specially optimized for batch operations，这是它的设计选择。batch的另一面就是不擅长低延迟。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODc2ZDMyYjZiNmI0ZWRmYzcyYTFiMjMwYjViY2I2MjJfNzUyMTRjMzg2ZDBmMGEyYTg0MmRiZTljOTBhYzQ4NjlfSUQ6NzY4OTg0MDkxOTU4NzA5ODE0NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

# Lecture 5 HDFS and Spark

1. HDFS 动机：分布式系统的存储挑战 → 故障概率算式 → HDFS 的八条需求 → 文件系统定义与四个动机问题 → 两页设计目标。这是问题定义。

2. HDFS 技术细节（一）：块与副本、抽象拓扑、NameNode / DataNode / 2NN 的架构、两层物理部署、元数据与 FsImage \+ EditLog、DataNode 职责。这是静态结构。

3. HDFS 技术细节（二）：副本放置策略、机架与带宽、心跳与故障检测、复制引擎、2NN 的合并机制与恢复上限。这是容错机制。

4. HDFS 技术细节（三）：读操作七步、写操作七步、四个带宽层级、网络拓扑与距离定义、命令行接口。这是动态行为。

5. Hadoop 作业调度：JobTracker / TaskTracker、Master\-Slave 架构、七步调度流程、十步执行流程、Map/Reduce 数量、负载均衡、冗余执行、局部性优化。这是任务派发。

6. Spark 动机：MapReduce 的五条短板、Spark 的六项能力、内存 vs 磁盘共享、Daytona Gray 排序竞赛、Spark 组件栈。这是换引擎的理由。

7. Spark 技术细节：RDD 三个字母的含义、Transformation vs Action、窄变换与宽变换（shuffle）、DataFrame 与血统、DAG 与 stage 划分、Action 的语义。这是新引擎的原理。

8. Spark 应用与边界：八类用例、五个公司案例、三条不适用场景、全讲总结。这是落地与边界。

## Part 1 HDFS

### 1\.1 Motivation

#### 1\.1\.1 **Big data storage: Challenging**

1. Data volumes are massive 数据量巨大

2. Reliability of storing PBs of data is challenging 规模化存储的可靠性 

3. All kinds of failures: Disk / Hardware / Network Failures 故障种类多（磁盘故障、硬件故障、网络故障）

#### 1\.1\.2 Failures are Common

两条设计的前提：

1. Single machine cannot serve all the data（单机服务不了全部数据）

2. Failures are common in commodity hardware, **Failure is expected, rather than exceptional**（商用硬件上故障很常见，事故不是例外）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjhiMmFhNzk0OGZhY2Y5MjIxNzM4Zjc4ZWZjYzhlNzFfZjY5YzgzNzViZTFlZWZjMjk5YTQ1MzUwOGVmMzIzOTNfSUQ6NzY5NDU0ODc0NzY2OTcwNDIyMF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

在这里假设了独立同分布的算式隐含每块盘独立以 0\.01 的概率故障。真实系统里同机架、同批次的盘会相关失效，那时的概率会更高。

### 1\.2 Why HDFS？

HDFS: a distributed（分布式：文件跨机器存放） file system（文件系统）to store files with fault\-tolerance（自带容错） 一个带容错能力的分布式文件系统

|**原文**|**解读**|
|---|---|
|Need to process **huge datasets on large clusters of computers**|要在**大规模机器集群**上处理超大数据集|
|Very **expensive to build reliability into each application**|**把可靠性做进每个应用里太贵，**所以可靠性要下沉到基础设施层|
|**Nodes fail every day**<br>**Failure is expected, rather than exceptional**<br>The number of nodes in a cluster is **not constant**|节点**每天都在坏**<br>故障是**预期之内**，不是例外<br>集群节点数是**变化的，**扩容、下线、故障替换都要能在线完成|
|Need a **common infrastructure**<br>**Efficient, reliable, easy to use**<br>**Open Source, Apache Licence**|需要一个**公共基础设施**，而不是每个应用各做一套<br>三个品质要求：高效、可靠、易用<br>开源、Apache 许可|

### 1\.3 File System 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzUxMDk1ZTY2MWVmOTIwNTU4NzRjNmRhNTNiMDY3MTBfMTE4M2IwZWZjMDE1MDgwYzZhYjk2MTA2Yjc4ZTI4ODBfSUQ6NzY5NDU0ODc0NzI2NzExNjU3Ml8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

系统文件：In computing, file system \(often abbreviated to fs\) is a method and data structure that the operating system uses to control how data is stored and retrieved\.

两个组成：文件系统 = method（方法） \+ data structure（数据结构）。前者是组织规则，后者是磁盘上的实际布局。

职责范围：由操作系统用来控制数据存（stored）与取（retrieved）的方式。所以文件系统本来就是一个 OS 概念。

HDFS 的特殊之处：HDFS 是同一个抽象（方法 \+ 数据结构、存 \+ 取）在多机上的实现，所以它叫 distributed file system，而不是换了一个全新的东西。

### 1\.5 Motivation Question

四个动机问题与 HDFS 的对策

|问题|HDFS 的对策|**对应章节**|
|---|---|---|
|Problem 1: Data is too big to store on one machine\.|Store the data on multiple machines 把数据存到多台机器上|块与副本|
|Problem 2: High\-end machines are too expensive|Run on commodity hardware 跑在商用硬件上|物理部署|
|Problem 3: Many commodity hardware will fail occasionally|intelligent enough to handle hardware failure 足够聪明能处理硬件故障|心跳与故障检测|
|Problem 4: How to handle data on failed hardware|data replication 数据复制|副本放置|

### 1\.6 Goals of HDFS

|原文|解读|
|---|---|
|Very Large Distributed File System \(Scalability\)<br>10K nodes, 100 million files, 10PB|非常大的分布式文件系统，括号里点明对应的是可扩展性<br>三个具体刻度：1 万节点、1 亿文件、10 PB 数据|
|Assumes Commodity Hardware<br>Files are replicated to handle hardware failure<br>Detect failures and recover from them \(Failure tolerant\)|假设跑在商用硬件上<br>用副本应对硬件故障<br>检测 \+ 恢复两件事都要做，合起来才叫容错|
|Optimized for Batch Processing \(High Throughput\)<br>Data locations exposed so that computations can move to where data resides<br>Provides very high aggregate bandwidth|为批处理优化，追求高吞吐，不是低延迟<br>暴露数据位置，好让计算搬到数据所在处（局部性优化）<br>提供非常高的聚合带宽，聚合指整个集群合起来的总带宽，是靠多机并行 \+ 就近读得到的|

Tips：

1. High Throughput 吞吐量（throughput）与延迟（latency）是一对权衡。批处理场景要的是单位时间处理的数据量，允许单个任务慢。

2. It is not for low latency access\. 凡是要求毫秒级随机读写的场景（在线事务、交互式查询）都不该用 HDFS。

3. WORM: Write Once, Read Many\. 一次写入、多次读取，无需互斥锁。本讲把它升格为HDFS 的语义前提。。

## Part 2 HDFS Technical Details

### 2\.1 Data Organization: Blocks and Replicas

文件不是整体存放，而是被切成固定大小的块，每块再存多份副本。这两件事解释了 HDFS 的容量、容错与负载均衡。

|原文|解读|
|---|---|
|HDFS is a block\-structured file system|与普通文件系统最大的结构性差别是HDFS 是块结构的文件系统|
|Individual files are broken into blocks \(chunks\) of a fixed block size \(64MB by default\)|文件被切成固定大小的块，默认 64MB。固定大小让寻址变成算术，若块长可变，就必须维护一张索引表才能定位第 k 块。|
|Blocks are stored across a cluster of machines|块散在集群上 ≠ 块被切开：一个块整体存在一台机器上（不做条带化）。文件级才是分布式的，所以一台机器坏了丢的是若干整块，而不是每个文件的一小片。|
|Each copy of the block is called replica|每一份块的拷贝叫 replica（副本）|

Block size and replicas are configurable\. 

Block size 与 Replicas 都可配，所以 64MB 与默认 3 副本都只是默认值，不是固定约束。

#### 2\.1\.1 Why Block？

问题：既然已经有文件了，为什么还要多一层块？（为什么需要块抽象？）

1. 超出单盘容量：File can be larger than a single disk 文件可以比任何一块磁盘都大。把文件切成块后，各块落在不同机器上，文件总大小就不再受单盘限制。

2. 固定大小便于管理：Block is of fixed size, easy to manage and manipulate 块大小固定，于是管理与操作都变成等长单元的算术，无需处理变长边界。

3. 易复制且细粒度均衡：Easy to replicate and do more fine\-grained load balancing 块是复制的基本单位，也是负载均衡的基本单位：某台机器忙，就把它的块搬到别处。

### 2\.2 HDFS's Abstract Topology

抽象拓扑（只有角色与连线）

|角色|职责|
|---|---|
|HDFS Client|发起操作的客户端；与 NameNode 之间标注 FS / namespace / meta ops|
|NameNode|接收客户端的文件系统 / 命名空间 / 元数据操作；向下辐射到所有 DataNode|
|Secondary NameNode|与 NameNode 之间是灰色双向箭头，标注 Namespace backup（命名空间备份）|
|DataNode|每个 DataNode 内部画了 3 个彩色小方块（表示持有的块）；向下连到磁盘图标|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzcwNGRjMTlmNzJjMmI2NTQ3ZmVmMzc5NDM4YjhiMjZfYmUxM2NhZTAwNWMwZDU5MThmMGUxYmFiNDViNjRlMzNfSUQ6NzY5NDU0ODc0OTY5Njk5NDg0NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

② 图上的两条横向说明带 ·

中间黄色横带：Heartbeats, balancing, replication etc\.\.
底部黄色横带：Nodes write to local disk

Heartbeats（心跳，存活检测）、balancing（均衡，搬块）、replication（复制，补副本）这三件事都在 NameNode 与 DataNode 之间发生。

Nodes write to local disk  数据写在本地磁盘上。这是Move computation rather than data能成立的前提：数据既然在本地盘，把计算送过来比把数据送出去便宜。

Data serving（DataNode → 磁盘，表示实际的数据服务）与 Namespace backup（NameNode → 2NN）。

考点：NameNode 只有一个（中心）、DataNode 有很多个（5 个是示意）、数据落在本地磁盘。

### 2\.3 HDFS Architecture

组件：命名空间、NameNode（NN）、DataNode（DN）、Secondary NameNode（2NN），以及各自的语言与版本归属。

三处名词的层级：三者不构成主从复制关系。

NameNode（1 个） 管理命名空间；DataNode（N 个，通常一机一个） 存实际数据；Secondary NameNode（1 个） 帮 NameNode 合并元数据。

#### 2\.3\.1 命名空间与 NameNode

HDFS exposes a file system namespace and allows user data to be stored in files\.

命名空间：HDFS 对外暴露一个文件系统命名空间，用户数据以文件形式存放。接口仍然是我们熟悉的目录/文件。

The HDFS cluster consists of a NameNode \(NN\), a master node that manages the file system namespace and regulates access to files\.

NameNode：NN 是主节点（master node），负责管理命名空间并管制对文件的访问（manage是有哪些文件，regulate是谁能动）。

#### 2\.3\.2 DataNode

There are a number of DataNodes \(DN\), usually one per machine in a cluster\. The DataNodes manage storage attached to the machines that they run on\.

DataNode 数量、位置、管理范围：通常一台机器一个。每个 DN 只管自己这台机器上的存储\(data locality\)。

#### 2\.3\.3 Secondary NameNode

|原文|说明|
|---|---|
|Another node runs Secondary NameNode \(2NN\) to serve as a helper of NN|2NN 是 NameNode 的助手（helper）|
|Proposed in Hadoop 1\.x|Hadoop 1\.x 引入（Hadoop 2\.x 换成 CheckpointNode）|
|NOT a complete backup of NN|不是 NameNode 的完整备份|
|Written in Java, it also supports Python and Ruby|主体 Java，另外支持 Python 与 Ruby|

2NN 不是 NameNode 的完整备份（NOT a complete backup of NN），2NN 在合并 FsImage 与 EditLog，加速重启。

### 2\.4 HDFS Physical Deployment

把架构图落到机房布局：两层交换机、机架、每架节点数，并给出 NN/DN/JT/TT 在机架上的实际分布。物理部署（机房、机架、交换机）：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzllNjk3YTE5ZmQxMmNjYjE2MDFkNjE1ODFhMTBiNmZfOTBlNTdiNzYwNGNjOWVkYzkxMjdhMTFkMWJiMGRhZTFfSUQ6NzY5NDU0ODc0OTIzNDAxNTc3MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

两层架构

Aggregation switch（汇聚交换机）连到 Rack switch（机架交换机），每个机架交换机再连若干 Node（节点，每个带 Disk 图标）。

Ps\. Nodes are commodity PCs（节点是商用 PC）；30\-40 nodes/rack（每机架 30–40 个节点）。

机架内外的带宽差

同机架便宜、跨机架贵：Rack switch 内部（同机架）带宽高；Rack switch ↔ Aggregation switch（跨机架）带宽低。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDU1YWYxMDYyYjk1MTRmMTQ2NWZmODJhZWViYTIxNzdfYWFmNmM4MmIyZmQ5M2FhYWE1MmNhYTEwYzY0ZDUwZjVfSUQ6NzY5NDU0ODc0NzI2NzE0OTM0MF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

|机架|特殊角色|普通节点|说明|
|---|---|---|---|
|Rack 1|Name Node|DN \+ TT × 4|NameNode 与第一批数据节点同架|
|Rack 2|Job Tracker|DN \+ TT × 4|JobTracker（作业调度）在第 2 架|
|Rack 3|Secondary NN|DN \+ TT × 4|2NN 在第 3 架，刻意与 NameNode 分开<br>因为 NameNode 是单点故障，如果 2NN 与 NN 同架，一次机架级断电就同时失去两者。物理隔离是冗余的一部分。|
|Rack 4|Client|DN \+ TT × 4|客户端所在机架|
|Rack N|—|DN \+ TT × 5|省略号表示中间还有若干个同构机架|

HDFS: NameNode, DataNode
MapReduce: JobTracker, TaskTracker

World：向下连到两个顶层 switch，代表集群之外的外部网络。

### 2\.4 NameNode

#### 2\.4\.1 Functions of NameNode

1. Manages File System Namespace \(maintains and manages the file system metadata\): Maps a file name to a set of blocks; Maps a block to the DataNodes where it resides\.

管理文件系统命名空间，即维护与管理元数据，两条映射，文件名 → 块集合的映射（一个文件由哪些块组成）；块 → 所在 DataNode 集合的映射（每块在哪几台机器上）

2. Cluster Configuration Management 集群配置管理（有哪些节点、机架归属等）

3. Replication Engine for Blocks 块的复制引擎（检测失败并补副本）

Tips：两条映射合起来才构成读一个文件的完整寻址链：文件名 → 块列表 → 每块的位置。

NameNode 不存数据：五项功能里没有一项是存文件内容。

为什么叫中心而不是主节点复制：2\.3\.1 把NN 叫 master node，但 HDFS 的 master 与一般主从复制的 master 不同，它管的是元数据，不是数据本身。

#### 2\.4\.2 Types of metadata 

1\. List of files 文件清单（有哪些、在哪里） 

2\. List of Blocks for each file 每个文件的块清单

3\. List of DataNodes for each block 每个块的 DataNode 清单

4\. File attributes, e\.g\., creation time, replication factor 文件属性，如创建时间、副本因子等属性。

#### 2\.4\.3 Metadata in Memory 元数据放内存

The entire metadata is in main memory\. Memory read/write is faster than disk read/write

为什么放内存：内存读写比磁盘快。元数据每次操作都要查，放磁盘会成为瓶颈。

代价：Data in memory will be lost if the machine shuts down 机器一关，内存里的元数据全丢。

于是需要持久化：In addition to metadata in memory, we need a persistent copy of metadata 所以除了内存中的元数据，还需要一份持久化副本。所以 引入FsImage 与 EditLog。

##### 2\.4\.3\.1 FsImage and EditLog

内存元数据怎么落盘。答案是一对文件——只读的快照 FsImage \+ 记录增量的 EditLog，以及「重启时合并」这一套固定流程。

|文件|功能|性质|大小|
|---|---|---|---|
|FsImage|The persistent record of the metadata stored on the local disk is called FsImage|只读（Read\-only）的元数据持久化记录|随集群增长，大|
|EditLog|Records modifications to FsImage — file creations, file deletions, etc\.|记录对 FsImage 的修改（建文件、删文件等）本质是所有会改变元数据的操作。|Stored in disk\. \(smaller\)，较小|

分工：FsImage 本身不是备份，它是一份截至某时刻的元数据快照；EditLog 也不是备份，它是快照之后的增量。只有两者合起来（FsImage \+ EditLog）才等于当前元数据状态。

Metadata in memory will be modified as well 内存元数据也会同步改：内存里的那份会同步更新，所以服务期间的查询走内存，不走磁盘。

##### 2\.4\.3\.2 Current status and Restart

current status:  FsImage \+ EditLog
Restart
 1\. NameNode loads FsImage in memory, applies modifications logged into EditLog, and generates a new FsImage and empty EditLog to replace the old ones\.
 2\. Start service\.

1\. 回放合并：把 FsImage 载入内存 → 逐条应用 EditLog 的修改 → 生成新的 FsImage 与一个空的 EditLog，替换掉旧的。合并后 EditLog 归零，重新开始记录。

2\. 启动服务Start service：元数据就绪后才对外提供服务。

3\. 为什么这样设计：若不合并，EditLog 会无限增长，每次重启都要回放全部历史修改，重启时间越来越长。合并把它压成一份快照，重启时间与上次合并点而非集群总历史相关。

4\. 但这个合并谁来做：第 23 页只讲了 NameNode 自己重启时的合并。第二十节会讲 2NN 如何把这个合并从 NameNode 的重启路径里挪出去——这就是 2NN 存在的全部理由。

### 2\.5 DataNode

讲完名称（中心）节点，转向干活的一方。DataNode 有五件事：存块、存块的元数据、对外服务、定期汇报、参与流水线转发。

#### 2\.5\.1 Functions of DataNode

|原文|解读|
|---|---|
|Where HDFS stores the actual data；A Machine|实际数据存放处；物理上就是一台机器|
|Stores data blocks in the local file system |DataNode 不直接操作裸磁盘，而是把块写成本地文件|
|Stores metadata of a block|同时存块自身的元数据（注意：是块的元数据，不是文件系统元数据）|
|Serves data and metadata to Clients|向客户端提供数据与元数据，读操作的数据流直接从 DataNode 走|
|定期 BlockReport \+ 心跳 \+ 流水线转发||

Tips: NameNode 的元数据 = 文件名/块/位置的全局映射；DataNode 的块元数据 = 这一块自己的信息（校验和、长度等）。两者的范围完全不同。

#### 2\.5\.2 Block Report  心跳

Block Report：Periodically（3s/time） sends a report of all existing blocks（本机**现有全部块**的清单） to the NameNode \(heartbeat\)

汇报：因为 NameNode 才持有块，即DataNode 的映射。这份映射必须由 DataNode 主动上报才能维持准确，NameNode 不主动扫描。

#### 2\.5\.3 Facilitates Pipelining of Data

Forwards data to other specified DataNodes

转发：链式传递，写一个块时，客户端只把数据发给第一台 DataNode，由它转发给下一台。

流水线：若客户端给三台 DN 各发一份，客户端的出口带宽就是瓶颈。流水线让每台 DN 收一份、转一份，客户端只需一份出口带宽。

## Part 3 DataNodes and NameNode Illustration

如果坏了副本放哪、怎么发现坏了、怎么补，以及中心节点自己坏了的上限在哪里。

### 3\.1 DataNodes and NameNode Illustration

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWQ4MDkwOTMxOTU0ZGEyMjUwOGEyZTJmYjE3YzAyYzBfNWY3Y2JiZDFiZjUzOTgzNGZjMTIwM2ZmYzQwYmZkMWFfSUQ6NzY5NDU0ODc0OTY5Njk3ODQ2MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

NameNode 只存元数据，DataNode 存块，文件到块的映射关系就写在元数据里。

1. NameNode：Stores metadata only 只存元数据（文件名 → 块号列表）

foo → 1, 2, 4：文件 /user/aaron/foo 由块 1、块 2、块 4 三块组成

2. DataNodes: Store blocks from files 存块

图 1 持 \{1, 2, 4, 5\} 共 4 块、图 2 持 \{2, 3, 5\} 共 3 块、图 3 持 \{1, 3, 4\} 共 3 块，本例中 10 个块位置对应 5 个块，所以每块恰好 2 份副本。

Tips：foo → 1,2,4 与副本的关系：元数据里只记录哪些块，不记录每块有几份副本（副本数由 replication factor 属性控制）。所以 foo 的块 1 与块 4 在图1和3 各一份、块 2 在图 1和2 各一份，元数据侧不体现。

### 3\.2 Racks and Network Bandwidth

把同机架便宜、跨机架贵写成前提，并指出机架这个物理概念在 HDFS 里是被显式建模的。五条关于机架的事实：

||原文|解读|
|---|---|---|
|1|Many racks in a cluster|一个集群有很多机架|
|2|Communication between racks is through switches|跨机架通信要经过交换机，交换机就是带宽瓶颈的位置|
|3|Network bandwidth between machines on the same rack is greater than those on different racks|同机架带宽 \> 跨机架带宽（成本模型的基石）|
|4|NameNode determines the rack ID for each DataNode|NameNode 为每个 DataNode 判定机架 ID，机架归属是元数据的一部分|
|5|Racks play an important role in block replication|机架在块复制中扮演重要角色（副本放置的逻辑：既然跨机架贵，副本就不能全放一个机架。）|

Tips：

4 中的 机架 不是网络层自动知道的，而是 HDFS 主动建模的：管理员设计机架映射/感知（rack awareness），NameNode 据此计算距离、决定副本落点、决定该读哪份副本。

### 3\.3 HDFS Data Replication: Illustration 

块 2 在 Node A、B、D 三处被标成红色，即同一个块的三份副本分别落在哪。所以红色 = 同一块的多份副本。

总数守恒：5 个块 × 3 份 = 15 个块位置；5 个节点 × 3 个格位 = 15 个格位。两边相等，说明示意图是恰好铺满的设计。

副本不在同一节点：任何一块的 3 份副本分布在不同节点上。这是最直观的容错要求：一台机器坏了，该块仍有两份可用。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDdjZTY2N2NkMWQwNGIzYmVkNGRiOTBiYmJjNWMyNzNfYThjZjcwMWRhN2VmZDZhMTQwMmE1Y2YwMTAzNjE3YjdfSUQ6NzY5NDU0ODc0OTQ1NjI5NzQ5OV8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

### 3\.4 Replication：Block Placement

HDFS Rack\-aware replica placement

机架策略（本地/同机架 → 不同机架 → 同远程机架的另一节点）

1. To put one replica on the local machine if the writer is on a DataNode, otherwise on a random DataNode in the same rack as that of the writer\.

第一份副本的两种情形（在 DN 上 / 不在 DN 上）：若写入方本身在某个 DataNode 上，第一份就放在本地机器上，本地优先让写操作变成本地磁盘写，省掉一次跨网络传输。否则，放于与写入方同一机架的某个随机 DataNode。

2. Another on a node in a different \(remote\) rack 

第二份放另一个（远程）机架上的节点。

3. The last one on a different node in the same remote rack

第三份放在相同的远程机架里的另一台不同节点的机器上。

Ps\. If the replication factor is greater than 3, the placement of the 4th and following replicas is determined randomly\.

超过 3 份怎么办，第 4 份起随机放置。默认副本因子 3，前 3 份有策略，后面的不管。

To reduce communication costs, clients read from nearest replicas 

降低通信开销，读最近（按网络拓扑算距离）的那份副本。

策略意图：

1. 至少跨 2 个机架，机架断电不会丢块；

2. 最多跨 2 个机架，避免跨机架写入的带宽开销。

### 3\.5 Necessity for Replication

三个故障场景（节点级 → 数据级 → 设备级）

1. A Datanode may become unavailable

节点整机不可用：一台 DataNode 可能整机不可用（宕机、断电、网络隔离）。

2. A replica may become corrupted

副本被损坏：副本内容可能损坏（静默数据损坏 bit rot）。注意这里说的是 replica 而非 node。若只有节点故障，多副本就够了；但副本损坏意味着副本本身不可信，所以必须有校验机制来判断哪份副本是好的，所以需要后续的BlockReport 与校验和设计。

3. A hard disk on a Datanode may fail

磁盘故障：DataNode 上的某块硬盘可能坏掉（一机多盘时，坏盘不等于整机不可用）。

### 3\.6 心跳机制Heartbeats

复制解决坏了还能读，本节解决怎么知道坏了。

机制：DataNode 定期报平安，NameNode 超时就判死。

|课件原文|解读|
|---|---|
|DataNodes send heartbeat to the NameNode|DataNode → NameNode 发送心跳（DN 主动上报，不是 NN 去探）|
|Once every 3 seconds|heartbeat 周期 = 3 秒，唯一的具体时间数字|
|The Namenode receives a Heartbeat and a BlockReport from each DataNode in the cluster|NN 从每个 DataNode 收到心跳 \+ BlockReport两样东西；Heartbeat = 我还活着（存活信号）；BlockReport = 我有哪些块（内容清单）|
|BlockReport contains a list of all the blocks on a Datanode|BlockReport 的内容 = 该 DataNode 上全部块的清单|
|NameNode uses heartbeats to detect DataNode failure|NN 用心跳来判断 DataNode 故障|

### 3\.7 复制引擎 Replication Engine 

1. NameNode detects DataNode failures\. Data blocks on the failed Datanode are replicated on other Datanodes

NameNode 检测到 DataNode 故障。补副本：失效节点上的块在其他 DataNode 上重新复制。

2. Choose new DataNodes for new replicas

选新落点：为新副本选新的 DataNode。选新落点时的约束：Balance disk usage（均衡磁盘使用率）与 Balance communication traffic to DataNodes（均衡到各 DataNode 的通信流量）。

两个均衡目标的区别：磁盘均衡是容量维度（别让某台机器塞满）；通信均衡是带宽维度（别让某台机器成为热点）。

补副本 vs lecture4 重跑任务：第 4 讲的容错是重算（任务重跑）；本讲的容错是补数据（复制块）。同一思想在存储层与计算层各有一个实现。

### 3\.8 NameNode 故障

|代次|方案|说明|
|---|---|---|
|共性|唯一的单点故障 A single point of failure|NameNode 只有一个，它挂了整个 HDFS 不可用|
|Hadoop 1\.x|Secondary NameNode \(2NN\): Hadoop 1\.x|1\.x 的缓解方案（第 19–20 节展开）|
|Hadoop 2\.x|CheckpointNode \(CN\): Hadoop 2\.x|2\.x 改名为 CheckpointNode|

两代方案名字不同、性质相似：2NN 与 CN 都不是 NameNode 的活备份（NOT a complete backup），它们做的是元数据检查点的合并。

### 3\.8 Accelerate NameNode Restart

澄清一个最常见的误解：2NN 的第一职责不是备份，而是加速重启。它会合并 FsImage 与 EditLog，并周期性把结果回传。

#### 3\.8\.1 五步工作流程

copy → merge → upload → purge → 目的是加速重启

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mzc5OTEwYjFiYjEzNGU5YzExNmFiYzZlZDU5ZThlMjRfNGRkNjY5NTk4NWJiNjU1YmRkMDRkNzFkOGI3YzQ1NDNfSUQ6NzY5NDU0ODc0OTIzMzk5OTM4Nl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

没有 2NN（Original 原始版本）

NN 重启时，必须：加载旧 FsImage → 重放整条完整 EditLog，日志越长，重启越慢。

搭配 2NN 的版本

2NN 已经提前做完 Checkpoint，生成了合并后的新 FsImage。 NN 重启时，只需要加载 2NN 生成的最新 FsImage，只重放 Checkpoint 之后新增的一小段 EditLog（绿色增量），大幅缩短启动时间。2NN 本地保存一份最新 FsImage 副本。

1. 2NN copies FsImage and EditLog from NameNode

取文件：2NN 从 NameNode 拷贝 FsImage 与 EditLog。2NN 是读取方，不是被写入方，它不可能实时同步。

2. 2NN merges FsImage and EditLogs periodically 

合并：2NN 周期性合并两者（2NN 的核心动作）。

3. 2NN uploads new FsImage to the NameNode

回传：把新的 FsImage 上传回 NameNode。

4. EditLog on NameNode is purged 

清理：NameNode 上的 EditLog 被清空（因为它已经合并进新 FsImage 了）。

5. It is designed to accelerate the speed of NameNode's restarting

目的：设计目的是加速 NameNode 重启。如果 EditLog 很大，重启会耗很多时间。2NN 把回放长日志这件事提前、离线做掉了，NameNode 重启时只需载入一份新鲜的快照。

检查点（checkpoint）：2NN 做的事情本质是检查点合并器，把快照 \+ 增量压成新快照 \+ 空增量，NameNode 之外执行，于是 NameNode 重启变快。

#### 3\.8\.2 备份能力与限制

Additional features: It can provide a copy if NameNode fails\. Not the latest one\.

NN 挂了可以用 2NN 上的 FsImage 临时顶替，所以 2NN 常被误认为备份。2NN 只在每次合并的时点持有快照，两次合并之间的修改（新产生的 EditLog）它没有。所以丢掉的是上次合并到故障时刻这段更新。所以，这不是完整备份（NOT a complete backup of NN），数据是滞后的，两页合起来才是完整答案。

易错点：2NN 的 Secondary 不是第二主节点，而是次要的、辅助的。它不接管 NameNode 的在线服务，也不参与读写路径。

### 3\.9 2NN Works

F = **FsImage**（文件系统镜像，NameNode 的持久化元数据快照） 

E = **EditLog**（编辑日志，记录后续所有文件系统操作的增量日志）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWRmZTJkZjMxY2ZkNGFjOTZlNjY3YTA1MjEwODA4MDZfNzMxNTgwZjkwYmEwYzYxNDFkMmI2YjQyMDRmYTU3N2ZfSUQ6NzY5NDU0ODc0OTQ1NjI2NDczMV8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

1. NameNode\(NN\)

    NN 初始：FsImage \(F\) \+ 空 EditLog \(E\)

    客户端操作不断写入 EditLog\(E\)（红色代表新增日志），FsImage 保持不变

    此时：FsImage 是旧快照，所有新改动存在 EditLog 里

2. SecondaryNameNode\(2NN\) 周期性触发Checkpoint检查点操作：

    拉取（fetch）NN 当前的 FsImage \+ EditLog

    合并（merge）：把 EditLog 的所有操作应用到 FsImage，生成新的 FsImage

    把合并完成的最新 FsImage 保存在 2NN 本地

    再将新 FsImage 传回 NameNode，NN 替换旧 FsImage，并清空自己的 EditLog

2NN 不是 NN 热备，只定期帮 NN 做 FsImage\+EditLog 合并，生成最新快照，减轻 NN 重启加载压力

### 3\.10 NameNode Recovery

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjJjMTM5OGRhZjcyZmM2NjRlMjQzY2MyZjllZmE0ZjBfYTQ2OWFkZWZiMjVkMzg0Yzk0NGZjZWFmNDZlNDY4MDJfSUQ6NzY5NDU0ODc0OTY5NTMyMzY3Ml8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

场景：NameNode 在两次 2NN Checkpoint 之间崩溃

1. NN 宕机时，最新的增量修改（绿色部分）只存在 NN 本机 EditLog，还没同步合并到 2NN

2. 2NN 手里，只有上一次 Checkpoint 完成的 FsImage 快照（缺少崩溃前这一段新操作）

3. 故障恢复： 

    把 2NN 上保存的 FsImage 副本拿出来，作为恢复的基础镜像

    缺点：Checkpoint 之后、宕机之前的新增元数据（绿色更新）会丢失

重点考点：

1. 2NN ≠ NameNode 备用节点，**不**能在 NN 宕机后自动切换接管，只是定期做 Checkpoint、生成 FsImage 备份。

2. Checkpoint：2NN 拉取 FsImage\+EditLog，回放日志合并生成新镜像。

3. NN 正常重启：有 2NN 可以减少需要回放的 EditLog，加快启动。

4. NN 崩溃恢复：2NN 不能做到实时热备份，只能恢复到最近一次 2NN checkpoint 时刻，两次 checkpoint 之间的元数据更新丢失。

## Part 4 HDFS 读和写操作

### 4\.1 HDFS Architecture \(Read and Write Path\)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGMwYTgyZDM4ZjlkZGMwMTkzNjMzNmM1ZjgzMGVjNGZfNTA1ZWQ3NTg3YmUzODc4YjUwZTcxMDgxNWY5YjdhYzlfSUQ6NzY5NDU0ODc0NzY2OTgwMjUyNF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

Read 路径：读走同机架的 DataNode；

Replication 路径：跨机架复制

**1\. NameNode（NN）**

- 管理**所有元数据**：文件名、目录、权限、Block编号、Block所在DN位置

- **不存储业务数据**，只存索引信息

- 接收客户端RPC请求，调度读写，**不参与数据传输**

**2\. DataNode（DN）**

- 真正**存储文件Block真实数据**

- 定时向NN心跳、汇报块状态

- 负责读写数据、副本存储、Pipeline传输

**3\. Client 客户端**

- 负责文件拆分Block、组装数据、容错重连、流水线控制

- Client 到 NameNode，标注 Metadata ops，只读写不传数据

- Client 到 DataNode，标注 Write，真正的直接流，读时 Client 直接向 DataNode 取，写时 Client 发起流水线；

### 4\.3 HDFS读操作

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTkzZmRmZDBhZWMyNzBlYmE1YjhiMWRkMTE1MGE5MDhfYjIyNzQ2NWUwM2RmYWY0YjJjYTExNjdmMjQyMDM3MDlfSUQ6NzY5NDU0ODc0NzI2NzE2NTcyNF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

步骤1：Client connects to NN to request data read\.

Client发起 open\(\) 请求。客户端想要读取 HDFS 文件，首先通过 RPC 向 NameNode 发送 open 请求，询问该文件的元数据信息。

步骤2：NN tells the client where \(i\.e\., DN\) to find the data blocks\. 

NameNode 返回 Block 位置列表。NN 查询自己内存中的元数据，返回：

- 该文件包含哪些 Block（Block1、Block2、Block3…）

- 每个 Block 的所有副本分别位于哪些 DataNode 节点

- 返回的列表已经经过机架感知排序（就近优先）

重点：NN 只返回位置，不传输任何数据！

步骤3：Client reads blocks directly from data nodes \(without going through NN\) 

Client 主动连接最优的 DataNode。客户端根据 NN 返回的有序 DN 列表，优先连接距离最近、负载最低的 DN，建立 Socket 连接。

步骤4：DN 以 Packet 数据包形式返回数据

DataNode 从本地磁盘读取 Block 数据，拆分为 Packet（默认64KB），逐包发送给 Client。

Client 持续接收、缓存、拼接数据。

步骤5：n case of node failures, client connects to another node that serves the missing block 

读取失败自动容错（核心考点）如果当前 DN 掉线、卡顿、读取出错：

- 客户端立刻断开当前连接

- 从同 Block 的其他副本节点中选择下一个最优 DN

- 从失败的 Packet 位置继续读取，不重头读整个块

步骤6：一个 Block 读完，读取下一个 Block

当前 Block 的全部 Packet 接收完毕，客户端继续读取文件的下一个 Block，重复上述流程。

步骤7：全部读取完成，执行 close\(\)

文件所有 Block 读取完毕，客户端关闭数据流、释放连接，读操作结束。

1\.  客户端连接 NameNode，请求读数据。

2\. NN 告诉客户端到哪个 DataNode 去找这些块。

3\.  客户端直接从 DataNode 读块，不经过 NN。

4\. I节点故障时，客户端改连另一台持有该块的节点。

#### 4\.2\.1 两个问题

Why does HDFS choose such a design for reading? 

Why not ask clients to read blocks through NN?

|原因|解读|
|---|---|
|Prevent NN from being the bottleneck of the cluster|防止 NameNode 成为集群瓶颈，所有数据若都过它，带宽立刻打满|
|Allow HDFS to scale to large number of concurrent clients|让 HDFS 能扩展到大量并发客户端，瓶颈一旦在中心，并发度就被锁死|
|Spread the data traffic across the cluster|让数据流量分散到整个集群，而不是集中到一个节点出口|

#### 4\.2\.2 机架感知机制

HDFS 将集群网络抽象为三层树状拓扑：数据中心 → 机架 → 节点，读取副本优先级（速度从快到慢）：

1. 本节点读取（最快，无网络开销）

2. 同机架不同节点（同交换机，带宽高、延迟低）

3. 同机房不同机架（跨交换机，速度下降）

4. 跨机房（最慢、延迟最高）

作用：减少跨机架流量、提升读取速度、降低集群网络压力

#### 4\.2\.3 读操作核心特点

数据不经过 NameNode，避免 NN 瓶颈

控制流走 NN，数据流直连 DN

天然支持容错，副本自动切换

支持顺序读、大文件吞吐极强，不适合随机读

### 4\.3 HDFS 写操作

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWM4ZDJkYzg5YTMxZmIxZGIyODQ5MzJmYjk2Y2Y0YTFfZDExZWQ4NjM5NWRhMjdmNGU5MDAxMWI0NTVjMjZjNDBfSUQ6NzY5NDU0ODc0OTY5NTM1NjQ0MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

步骤1：Client 向 NN 发送 create\(\) 创建文件请求。客户端想要上传文件，先 RPC 请求 NameNode 创建空文件。

步骤2：NN 执行权限、路径、状态校验，NN 检查：用户权限是否合法；文件路径是否已存在；父目录是否存在；集群是否可写。校验通过后，NN 在元数据中生成一个空文件（此时文件对用户可见，但未完成）。

步骤3：NN 分配 Pipeline 节点列表（副本节点策略），NN 根据副本机制（默认3副本）智能选择一组 DN，形成流水线顺序：放置策略（必考）：

1. 副本1：写入客户端所在节点（就近写入，速度最快）

2. 副本2：写入同机架不同节点（防单节点故障）

3. 副本3：写入不同机架节点（防机架整体断电/故障）

NN 将有序的 DN 列表返回给 Client。

步骤4：Client 构建 Pipeline 流水线。客户端根据返回的 DN 顺序，依次和 DN1、DN2、DN3 建立链式 Socket 通道，形成流水线。

步骤5：客户端切分 Packet，链式传输写入。客户端将文件数据切分为 Packet（默认64KB），先发给第一个 DN：

- DN1 收到 Packet → 落盘保存 → 立刻转发给 DN2

- DN2 收到 Packet → 落盘保存 → 立刻转发给 DN3

- DN3 收到 Packet → 落盘保存（最后节点，不转发）

整条流水线并行写多副本，极大提升写入效率

步骤6：反向 ACK 确认机制（核心重难点）。每一个 Packet 写完后，ACK 从后往前逐级返回：

- DN3 写完 → 发 ACK 给 DN2

- DN2 收到后 → 发 ACK 给 DN1

- DN1 收到后 → 最终 ACK 传回 Client

规则：必须收到整条流水线的 ACK，才算当前 Packet 写入成功，才会继续发送下一个 Packet。

步骤7：Block 写满，继续写下一个 Block。当一个 Block 写满（默认128M）：

- Client 关闭当前 Block

- 重新向 NN 请求新的 DN 节点列表

- 开启新 Pipeline，写下一个 Block

步骤8：文件全部写完，Client 发送 complete\(\) 完成写入。文件所有 Block 写完后：

- Client 调用 close\(\)

- 向 NN 发送 complete 信号

- NN 将文件状态从“正在写入”改为“已完成”

此时文件正式对外可读。

#### 4\.3\.1 写操作容错机制

流水线中任意一个 DN 故障（掉线、卡死、磁盘坏）：

1. Client 立刻检测到 ACK 超时/失败

2. 自动剔除故障 DN

3. 用剩余健康 DN 重建新 Pipeline

4. 从上一个成功 ACK 的 Packet 位置继续写入，不重头写整个文件

5. 后续 NN 会自动补充副本，保证副本数量达标

考点：HDFS 写过程支持断点续写、动态重建流水线

#### 4\.3\.2 写操作核心特性

- 控制流走 NN，数据流走 Pipeline

- 采用链式流水线批量写副本，效率高

- 严格 ACK 校验，保证数据强一致性

- 写入过程文件处于“未完成状态”，不可读

- 支持动态容错、节点剔除、续写

### 4\.4 HDFS 读写操作

|对比维度|读操作 Read|写操作 Write|
|---|---|---|
|NN 作用|只返回 Block 位置列表，不参与数据传输|创建文件、分配DN、最后标记文件完成|
|数据流向|DN → Client 单点直连|Client→DN1→DN2→DN3 流水线链式传输|
|副本策略|就近读（机架感知择优）|跨机架三副本策略，保证容灾|
|容错方式|节点失败，切换同块其他副本继续读|节点失败，重建Pipeline，剔除坏节点续写|
|数据包单位|Packet|Packet，带反向ACK确认|
|文件状态|文件必须已完成|写入中文件临时不可读，complete后才可见|

1\. 为什么 HDFS 读写数据不经过 NameNode？

为了避免 NameNode 成为集群性能瓶颈，分离控制流和数据流，让大量读写流量分散到各个 DataNode，支持高并发、高吞吐，提升集群扩展性。

2\. HDFS 三副本放置策略是什么？

第一副本存客户端当前节点，第二副本存同机架不同节点，第三副本存不同机架节点。兼顾写入速度和容灾能力，防止单节点、单机架故障导致数据丢失。

3\. 什么是 Pipeline 流水线写入？

客户端将数据 Packet 依次传递给多个 DataNode，链式完成多副本写入，并逐级返回ACK确认。实现多副本并行写入，大幅提升写入效率，同时保证数据一致性。

4\. 读操作机架感知的作用？

根据网络拓扑选择距离最近的副本节点读取数据，减少跨机架网络传输，降低延迟、节省带宽、提升读取性能。

## Part 5 Hadoop’s Job Scheduling 作业调度

本文讲解的是 MapReduce v1（MRv1），即 Hadoop 1\.x 时代的经典版本。采用Master/Slave 主从架构，核心组件为 JobTracker \+ TaskTracker。

该版本存在致命架构缺陷，在 Hadoop 2\.x 后被 YARN 完全替代，是大数据面试、考试、入门的核心基础知识点。

核心定位：MapReduce 是 Hadoop 生态圈中的分布式离线计算框架，负责对海量HDFS存储数据进行分片、并行计算、汇总输出，主打高容错、高可靠、可横向扩展。

### 5\.1 JobTracker \& TaskTracker 作业调度

HDFS 解决了数据放哪，这一节转向任务派给谁。

### 5\.1 MRv1 整体集群架构

MRv1 架构严格分为Master 主节点 和 Slave 从节点，同时依赖 HDFS 的 NameNode、DataNode 实现数据存储，全程是计算与存储绑定的设计思路。

与 HDFS 的镜像关系：NameNode : DataNode ≈ JobTracker : TaskTracker。前者管元数据与任务，后者管块与执行。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjlmNGQzZjQwNzcyNmVmMWViMWM0NTFkMzQzNTRiMDZfOTNkMjg2NTVhMGMyMTRhOGU3NzZjYzJiM2M3OTcwOWFfSUQ6NzY5NDU0ODc0NzY2OTc4NjE0MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTZlODAwNWJjYmQ3NDZiOGYxMmFhYjcyN2Q1NDY1YThfNjAxZGZmMjQwMmMxYmI2Y2FkNWZlNmE4MTFhYjdhM2ZfSUQ6NzY5NDU0ODc0OTY5NTI5MDkwNF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

#### 5\.1\.1 Master 主节点核心进程

Master 节点仅部署 JobTracker（JT） 一个计算调度进程，同时集群的 NameNode 通常也部署在主节点，负责文件系统管理。

JobTracker = central control node，负责 split 与 send；

TaskTracker = worker node 上接受 Map / Reduce / Shuffle 任务的进程。

YARN 改进此结构（out of scope）。

JobTracker 核心职责（全局调度中心）

A central control node runs JobTracker \(JT\)\. JobTracker splits up data into smaller tasks\("Map"\) and sends it to the TaskTracker process in each node 

把数据切成更小的任务 Map，再派发给各节点的 TaskTracker 进程。

- 作业接收与注册：专门接收客户端提交的完整 MapReduce Job 作业，分配全局唯一的 JobID，初始化作业运行环境。

- 作业拆分与分片规划：解析用户提交的作业配置、输入路径、计算逻辑，自动将一个大 Job 拆分为若干个 MapTask 和若干个 ReduceTask，同时根据文件大小生成输入分片（InputSplit）。

- 任务调度与分配：集群唯一的任务决策者，实时感知所有 Slave 节点的资源空闲状态、数据存储位置，精准分配 Map/Reduce 任务，实现负载均衡和数据本地性优化。

- 集群状态监控：维持与所有 TaskTracker 的心跳通信，实时监控节点存活状态、资源占用、任务运行进度。

- 故障判定与重试：检测节点故障、任务运行失败、任务卡顿等异常，自动触发任务重试、节点拉黑、作业容错机制。

- 作业进度管理与结果汇总：全局统计作业运行进度，记录任务运行日志，作业完成后更新最终状态，通知客户端获取结果。

#### 5\.1\.2 Slave 从节点

所有从节点同时部署两个进程，分别负责计算执行和数据存储，是真正干活的节点：

1\. TaskTracker（TT）计算执行代理

Worker Nodes also run TaskTracker \(TT\)\. A TaskTracker is a node in the cluster that accepts tasks — Map, Reduce, and Shuffle operations — from a JobTracker

在工作节点上运行 TaskTracker。集群里接受 JobTracker 派发任务的节点。

每个 Slave 节点有一个 TaskTracker，是 JobTracker 的从属工作进程，无自主调度权限，只服从主节点指令。

- 心跳上报：默认每3秒向 JobTracker 发送一次心跳，上报节点CPU、内存、空闲槽位、正在运行的任务状态等信息。

- 任务接收与执行：接收 JobTracker 下发的 MapTask、ReduceTask，独立启动子JVM运行任务，避免任务之间相互干扰。

- 资源管控：管理当前节点的任务运行槽位（Map槽位、Reduce槽位），限制单节点最大并发任务数，防止资源耗尽。

- 状态反馈：实时向 JobTracker 汇报任务启动、运行、完成、失败、卡顿等状态。

2\. DataNode（DN）数据存储节点

负责存储 HDFS 数据块，保存所有待计算的原始数据、任务中间临时数据，为本地性调度提供数据支撑。计算任务优先读取本节点 DataNode 的数据，减少网络传输。

#### 5\.1\.3 Client 客户端

用户程序入口，无需常驻集群，仅负责作业提交、资源上传、进度查询、结果获取，核心操作：

- 封装 Job 配置信息（输入输出路径、Map/Reduce逻辑、任务参数）；

- 向 JobTracker 申请 JobID；

- 将作业Jar包、配置文件、依赖资源上传至HDFS临时目录；

- 正式提交作业，轮询查询作业运行进度，作业结束后输出结果。

### 5\.2 MRv1 完整作业执行流程

整个流程分为 作业准备阶段、任务调度阶段、任务运行阶段、作业收尾阶段 四大阶段，全程自动化执行。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTMwOTk5ZTQ2NDMzY2ExZDE5Njc0ZDI5M2UxNDZmNjJfZjE5Njg3N2FhYzZjYTE1YzRiMTk0MzIzMmE1Yzc2MTBfSUQ6NzY5NDU0ODc0NzY2OTc2OTc1Nl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

阶段1：客户端作业准备

1. 用户编写 MapReduce 程序，设置作业参数，打包为Jar文件；

2. Client 连接 JobTracker，请求分配唯一 JobID；

3. Client 在 HDFS 中创建该作业的专属临时目录，上传Jar包、配置文件、切片信息等资源；

4. Client 正式向 JobTracker 提交完整作业。

阶段2：JobTracker 作业初始化

1. JobTracker 接收作业，校验配置合法性，初始化作业运行上下文；

2. JobTracker 主动请求 NameNode，查询本次作业所有输入文件的 数据块存储位置、副本分布节点；

3. 根据文件大小、Block大小，自动切分 InputSplit 输入分片，一个分片对应一个MapTask，确定Map任务总数；

4. 初始化 ReduceTask 数量，创建任务调度队列，等待节点资源空闲。

阶段3：任务调度与下发

1. 所有 TaskTracker 持续向 JobTracker 发送心跳，上报空闲资源；

2. JobTracker 基于数据本地性优先、节点负载均衡原则，筛选合适的TaskTracker；

3. JobTracker 通过心跳响应，将 MapTask/ReduceTask 分配给目标节点；

4. TaskTracker 接收任务指令，从HDFS下载作业Jar包和配置资源。

阶段4：任务运行执行

1. TaskTracker 为每个任务启动独立子JVM进程（核心隔离机制，单个任务崩溃不影响节点和其他任务）；

2. 子JVM 运行 MapTask：读取本地HDFS数据块，执行Map逻辑，输出局部中间数据；

3. 所有MapTask执行完成后，启动Shuffle洗牌阶段，对数据分区、排序、合并；

4. 运行ReduceTask：拉取对应分区的Map中间数据，聚合汇总，执行Reduce业务逻辑；

5. 任务运行中持续向TaskTracker反馈状态，TT同步上报JobTracker。

阶段5：作业收尾

1. 当所有MapTask、ReduceTask全部执行成功，JobTracker 标记作业为完成状态；

2. 清理HDFS中的作业临时资源、日志缓存；

3. 客户端轮询获取作业完成状态，读取HDFS中的最终输出结果；

4. 若存在任务失败，触发重试机制，重试次数耗尽则标记作业失败。

### 5\.3 MapTask与ReduceTask数量确定规则

#### 5\.3\.1 MapTask 数量规则

MapTask 是数据分片并行处理的核心，数量直接决定作业并行度。

- 默认规则：MapTask 数量 = 输入文件的 HDFS Block 块数量。Hadoop 默认Block块大小128M，一个1G文件会被分为8个Block，默认启动8个MapTask。

- 核心原理：一个 InputSplit 对应一个 MapTask，分片大小默认等于Block大小，最大限度贴合数据存储粒度，避免跨块读取。

- 手动调整方式：可通过修改最小分片大小、最大分片大小，主动增加或减少MapTask数量，适配小文件、大文件场景。

- 优化原则：小文件过多会产生大量小MapTask，造成资源浪费，需提前合并小文件；超大文件可适当调大分片，减少任务数量。

#### 5\.3\.2 ReduceTask 数量规则

- 默认值：默认ReduceTask数量为1，所有数据汇总到一个Reduce任务中处理。

- 常规生产配置：手动设置，数量远小于MapTask数量，通常根据Key的种类、数据量分配。

- 性能风险：ReduceTask数量过少，会导致单个Reduce任务处理海量数据，成为作业瓶颈；数量过多会产生大量小输出文件，增加文件系统压力。

- 特殊场景：无需聚合汇总的任务，可设置ReduceTask数量为0，只执行Map阶段，提升效率。

### 5\.4核心优化机制（底层原理）

#### 5\.4\.1 数据本地性优化（Locality Optimization）

核心思想：移动计算，不移动数据。大数据场景下，磁盘IO速度远大于网络传输速度，跨节点传输数据是最大性能瓶颈。

三层调度优先级（从高到低）

1. 本地节点优先：将Map任务调度到「存储该数据块的Slave节点」，直接读取本地磁盘数据，无网络开销；

2. 同机架优先：若数据所在节点繁忙，调度到同一机架的空闲节点，机架内网络传输速度快、延迟低；

3. 跨机架调度：无本地、同机架资源时，才调度到其他机架节点，产生跨网络传输。

价值：极大降低集群网络IO压力，是MapReduce海量数据处理高效运行的核心保障。

#### 5\.4\.2 推测执行机制（Speculative Execution / 冗余执行）

问题背景

集群中部分节点会因磁盘老化、CPU负载高、网络卡顿、资源抢占等问题，运行速度远慢于其他节点。单个慢任务会拖慢整个作业的完成时间，形成木桶效应。

机制原理：JobTracker 实时对比同批次所有任务的运行进度，当检测到某一个任务进度远低于平均进度、长期卡顿，不会无限等待，而是主动在空闲节点启动一个相同的备份任务（冗余任务）。

执行规则：谁先执行完成，就采用谁的结果，后完成的任务直接被强制终止，释放资源。

适用与禁用场景

- 适用：离线批量计算、只读数据任务；

- 禁用：会写入数据、非幂等性任务，避免重复写入导致数据错乱。

#### 5\.4\.3 负载均衡机制

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjUxMDBhYjA2MDZjYTllMDc5YjA3NjE2NDJjODMzMTZfYzQwNzdhMWQ4ZWRkZDA1Y2EwZWMzMGY4N2QzYmExZWJfSUQ6NzY5NDU0ODc0OTY5NTMwNzI4OF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mzg1NGM1ODBlNjRmNzA5YTk0N2FiNzU0YTY3NDc1MjJfYmNmZGUxMjExNThkYzYwZGQwYmQ0ZDk0ZWUyOWMyZWJfSUQ6NzY5NDU0ODc0NzI2NzIxNDg3Nl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

JobTracker 调度时不仅看数据本地性，还会实时统计每个TaskTracker的当前任务负载、空闲槽位、资源使用率，避免任务集中分配到少数节点。

通过动态分配任务，让所有Slave节点的任务执行时长、资源占用尽量均衡，杜绝部分节点过载、部分节点空闲的问题，最大化利用集群整体算力。

#### 5\.4\.4 任务 JVM 复用机制

MRv1 默认每个任务新建 JVM，开销大。支持开启 JVM 复用，同一作业的多个小任务可复用同一个 JVM，减少启停开销，极大提升小任务集群效率。

### 5\.5 故障恢复机制

MapReduce v1 具备完善的容错机制，可应对绝大多数节点、任务异常，保障集群稳定运行。

#### 5\.5\.1 TaskTracker（Slave节点）故障

故障判定：JobTracker 依靠心跳机制判定节点故障：默认心跳超时时间为10次心跳无响应（约30秒），超时则直接判定该TaskTracker宕机。

恢复策略

- JobTracker 立即清除该节点的所有任务运行记录；

- 该节点上正在运行的未完成MapTask、ReduceTask，全部重新调度到其他空闲节点执行；

- 若该节点频繁故障、卡顿，JobTracker 会将其加入集群黑名单，不再分配任务，人工排查修复后可解除黑名单；

- 已完成的任务结果无需重跑，仅重试未完成的任务，最大限度节省资源。

#### 5\.5\.2 单个Task任务故障

故障场景：任务代码异常、内存溢出、数据读取失败、子JVM崩溃等。

恢复策略

- TaskTracker 检测到任务失败，立即上报JobTracker；

- JobTracker 自动重新分配该任务，更换节点重试；

- 重试次数限制：默认最大重试4次，超过次数仍失败，则判定作业失败，终止任务并打印错误日志。

#### 5\.5\.3 JobTracker（Master节点）故障

MRv1 最大的架构短板：JobTracker 单点故障（SPOF）。

- 整个集群只有一个JobTracker，无备用节点、无故障转移机制；

- 一旦JobTracker进程挂掉、主节点宕机，整个集群调度彻底瘫痪：所有正在运行的作业终止、新作业无法提交、节点全部失联；

- 恢复方式：仅能重启JobTracker进程，但重启后所有正在运行的作业全部丢失，需要重新提交执行，无法断点续跑。

核心结论：这是MRv1被YARN彻底替代的最根本原因。YARN将JobTracker的职责拆分，解决了单点故障问题，同时实现资源与任务解耦。

### 5\.6 MRv1 架构优缺点

核心优点

- 架构简单清晰，主从分工明确，入门门槛低，易于运维；

- 容错机制完善，节点、任务故障可自动恢复，适合海量离线数据处理；

- 数据本地性优化优秀，极大规避网络IO瓶颈，计算效率高；

- 任务粒度细，单任务崩溃不影响全局，集群稳定性较好。

致命缺点（核心考点）

- 单点故障问题：JobTracker 单节点运行，宕机即集群瘫痪，无高可用；YARN later , Hadoop improved this structure\. \(out of scope\)  后续版本的 Hadoop 用 YARN 改进了这个结构；

- 资源耦合严重：计算资源、任务调度、作业管理全部由JobTracker承担，压力极大；

- 扩展性差：集群节点数量过多时，JobTracker 心跳处理、任务调度压力过载，性能急剧下降；

- 资源利用率低：任务资源固定分配，无法动态调整，容易出现资源闲置或资源不足。

## Part 6  Spark Motivation

### 6\.1 MapReduce的缺陷

**1\. Force your data processing into Map and Reduce**

强制将所有数据处理逻辑限定在 Map 和 Reduce 两个固定阶段。

扩展知识点：MapReduce 编程模型极度固化，无论业务简单或复杂，都必须拆分为映射、归约两个步骤。面对多表关联、多层嵌套计算、复杂统计逻辑时，代码冗余度极高，开发效率很低，灵活性极差。

**2\. Not good for jobs with a shared global state**

不支持带有全局共享状态的计算任务。

扩展知识点：MapReduce 是无状态计算模型，不同任务、不同阶段之间无法直接共享内存变量。对于需要累计参数、迭代更新状态的场景（机器学习、图计算），无法直接实现，只能通过磁盘文件进行中转。

**3\. Read and write to Disk before and after Map and Reduce \(stateless machine\)**

Map、Reduce 阶段前后均需要磁盘读写，属于无状态计算机制。

扩展知识点：这是 MapReduce 最大的性能瓶颈。每一轮计算的中间结果都会强制落地到 HDFS 磁盘，下一轮计算再重新读取。磁盘IO速度远低于内存读写，大量重复读写造成极大资源浪费。stateless 无状态指集群节点不会保留任何中间计算数据。

**4\. Not efficient for iterative tasks, i\.e\. Machine Learning**

迭代式计算任务效率极低，典型场景为机器学习。

扩展知识点：机器学习、深度学习、图算法都需要成千上万次迭代运算。MapReduce 每次迭代都要落盘、读盘，迭代次数越多，IO 累积开销越大，几乎无法支撑大规模迭代计算。

**5\. Only for Batch processing**

仅支持离线批处理计算。

扩展知识点：MapReduce 只能处理已经完全存储完毕的静态数据，无法处理实时增量数据，不适合实时业务场景。

**6\. Does not support interactivity, streaming data**

不支持交互式查询与流式数据处理。

扩展知识点：MapReduce 每次提交任务都需要完整调度执行，无法即时返回查询结果，不适合数据分析人员交互式探索数据，也无法处理源源不断的实时流数据。

**核心总结**：MapReduce 痛点集中在：模型死板、磁盘IO频繁、不支持迭代计算、仅离线批处理、无交互、无实时能力，这也是 Spark 诞生的核心原因。

### 6\.2 Apache Spark

**1\. A new general framework, which solves many of the shortcomings of MapReduce**

全新的通用分布式计算框架，解决了 MapReduce 的绝大多数缺陷。Spark 2009年诞生，核心设计理念是**内存计算**，将中间计算结果缓存至内存，规避 MapReduce 频繁磁盘读写的短板，大幅提升计算速度。

**2\. It leverages the Hadoop ecosystem, e\.g\., HDFS, YARN, HBase, S3**

完全兼容并复用 Hadoop 生态，支持 HDFS、YARN、HBase、S3 等主流组件。Spark **不替代 Hadoop**，只替代 MapReduce 计算引擎。Spark 可以直接部署在现有 Hadoop 集群上，沿用原有存储和资源调度体系，迁移成本极低，生态兼容性极强。

**3\. Has around 30 efficient distributed operations**

内置约30种高效分布式数据操作算子，包含 join、filter、flatMap、groupByKey、reduceByKey、sortByKey、collect、count 等。MapReduce 仅有 Map、Reduce 两个基础算子，而 Spark 提供丰富的开箱即用算子，复杂的数据清洗、分组、关联、排序逻辑只需少量代码实现，开发效率成倍提升。

**4\. In\-memory caching of data for iterative, graph, and machine learning algorithms**

支持数据内存缓存，适配迭代计算、图计算、机器学习算法场景。可将高频使用的中间数据集缓存于集群内存，多次计算可重复复用数据，无需重复读取磁盘，是 Spark 迭代任务秒杀 MapReduce 的核心原因。

**5\. Native Scala, Java, Python, and R support**

原生支持 Scala、Java、Python、R 四种开发语言。适配不同岗位需求，后端高性能开发优先使用 Scala，数据分析人员常用 PySpark，统计分析可使用 SparkR，受众更广。

**6\. Supports interactive shells for exploratory data analysis**

支持交互式命令行，可用于探索性数据分析。通过 spark\-shell、pyspark 可实现逐行代码执行、即时出结果，适合临时数据分析、代码调试、数据探索，完美弥补 MapReduce 无法交互的缺陷。

**7\. Spark API is extremely simple to use**

Spark API 简洁易用，封装度高。高层API屏蔽了分布式底层细节，开发者无需关注集群调度、节点通信、数据分片，专注业务逻辑即可。

Spark 与 MapReduce 核心机制对比

|方案|流程|每轮之间|
|---|---|---|
|Hadoop: Use Disk for Data Sharing|HDFS read → Iteration1 → HDFS Write → HDFS read → Iteration2 → HDFS Write|落盘（每次交接都是一次 HDFS 读 \+ 一次 HDFS 写）|
|Spark: In\-Memory Data Sharing|HDFS read → Iteration1 →（内存）→ Iteration2 →（内存）|留在内存（只有最开始一次 HDFS read）|

Hadoop MapReduce：依靠磁盘共享中间数据，每轮计算结束强制落盘，迭代任务反复读写磁盘，IO开销巨大。

Spark：依靠内存共享中间数据，计算结果常驻内存，多轮迭代直接读取内存数据，跳过磁盘IO，性能大幅提升。

官方排序测试结论：Spark 仅用 1/10 的集群节点，实现 3 倍于 MapReduce 的计算速度，单机资源利用率远高于 MapReduce。

### 6\.3 The Spark Stack 组件栈 

Apache Spark supports data analysis, machine learning, graphs, streaming data, etc\. It can read/write from a range of data types and allows development in multiple languages\.

Apache Spark 支持数据分析、机器学习、图计算、流式数据处理等多类场景，支持读写多种数据源，兼容多语言开发。Spark 是**一站式全域大数据计算平台**，并非单一计算引擎，覆盖离线、实时、机器学习、图计算全场景。

#### 6\.3\.1 Spark 分层架构（由上至下）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjVjZTg0YmJkMzE5ODBkNDJmMWIxYjcwYWNiOWI1YzJfMzMyZDJlOTI3ODNkNTViYTQyOTBlZDgwMDIyNDUzNDBfSUQ6NzY5NDU0ODc0NzI2NzEzMjk1Nl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

1\. 应用层：支持 Scala、Java、Python、R、SQL 多语言开发

2\. 高层API层：DataFrames、ML Pipelines 结构化、机器学习流水线API

3\. 核心组件层：Spark SQL（结构化查询）、Spark Streaming（实时流计算）、MLlib（机器学习库）、GraphX（图计算库），所有组件均基于内核构建

4\. 底层内核：Spark Core，负责任务调度、内存管理、容错机制、RDD 核心抽象

5\. 数据源层：兼容 HDFS、Hive、HBase、MySQL、S3、流式数据、JSON、高性能分布式文件系统等几乎所有存储介质

## Part 7  Spark Technical Details

新引擎的原理层：一个统一抽象（RDD）、两类算子、一条依赖图（DAG），以及它们如何决定快慢。

### 7\.1 RDD 弹性分布式数据集

Resilient Distributed Datasets \(RDDs\) are a fundamental data structure of Spark\. It is an immutable distributed collection of objects\.

RDD（弹性分布式数据集）是 Spark 的基础核心数据结构，是一组不可变的分布式对象集合。RDD 是 Spark 所有功能的底层基石，Spark SQL、Streaming、MLlib 高层 API 底层全部依赖 RDD 实现。immutable 不可变是 RDD 的核心特性，创建后无法修改，只能通过算子生成新 RDD，保证数据安全、支持容错。

#### 7\.1\.1 三大核心特性

**1\. Resilient \- capable of rebuilding data on failure**

弹性，在节点故障时可自动重建丢失的数据。依靠**血缘依赖（Lineage）**记录所有计算过程，无需备份数据，故障后只需重放上游算子即可恢复数据，轻量化容错。

**2\. Distributed partition data across various nodes in a cluster**

分布式，数据被切分为多个分区，分散在集群的不同节点。Partition 分区是 Spark 的最小并行计算单元，分区数量决定并行度，分区越多，并行计算能力越强。

**3\. Dataset \- a collection of partitioned data with values**

数据集，用于存储被分区的真实业务数据。

All the different processing components in Spark share the same abstraction: RDD\. RDD is created by parallelizing a collection or reading a file\.

Spark 的所有计算组件共用 RDD 抽象，RDD 可通过并行化本地集合、读取外部文件两种方式创建。日常开发两种常用的创建方式：本地集合并行化 sc\.parallelize\(\)、外部文件读取 sc\.textFile\(\)，覆盖绝大多数数据初始化场景。

RDD vs HDFS 块的对照

HDFS 块：物理存在的、多副本的、可寻址的数据单元。

RDD：逻辑上的、不可变的、可重算的数据集合。RDD 是分布在 HDFS 之上的逻辑视图。

### 7\.2 Spark 的两大算子

Spark Operations = TRANSFORMATIONS \+ ACTIONS；

Action 给出 non\-RDD values（判据）、触发 DAG 执行、将结果返回程序或写入外部存储。Action 才触发计算，那么调试时看一个 Spark 程序是否真的运行，就看有没有 Action，只写一串 Transformation 的程序什么都不会发生。

#### 7\.2\.1 Transformation 转换算子

Transformation 是 RDD → RDD 的函数，且是惰性的（不会立刻执行）。因为变换是惰性的，Spark 就能在真正执行前优化整条链（合并、剪枝、决定分区）

Spark Transformation is a function that **produces a new RDD** from the existing RDDs\. It takes RDD as input and produces one or more RDDs as output\.

转换算子是以已有 RDD 为输入，生成新 RDD 的函数操作。转换算子具备**懒加载特性**，调用后不会立即执行计算，仅记录血缘依赖、构建 DAG 执行图，无任务调度、无资源消耗。同时天然支持容错，可链式连续调用。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZThjNjAyMTU5ZTQ5MzBlYzNiYjEzNmNlOWU1M2Y4YzNfNjdiZTU4NGRiNzUyZjhkYzRlMjI0Y2U1NmVjOGZkZWVfSUQ6NzY5NDU0ODc0OTY5NTM0MDA1Nl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWM1YTQ0OWUwNWM2YTFmZGYxNWRkMTdlNjg5OGM1YTlfMTA5NmY0YzlkODI3MTM4NDQ0YjZiNDdkNDAxMWRkMjNfSUQ6NzY5NDU0ODc0OTQ1NjI4MTExNV8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

窄依赖 Narrow Transformation

Each input partition will contribute to only one output partition\.

每一个输入分区仅对应一个输出分区。一对一数据依赖，无需跨节点网络传输（无 Shuffle），计算速度快、开销低。常见算子：map、filter、flatMap。

宽依赖 Wide Transformation

Input partitions that contribute to many output partitions require a shuffle\.

输入分区数据会分发到多个输出分区，需要 Shuffle 洗牌操作。一对多数据依赖，需要跨节点网络传输数据，是 Spark 的最大性能开销。Shuffle 的目的是将相同 Key 的数据汇聚到同一分区，完成分组、聚合。常见算子：groupByKey、reduceByKey、join、sortByKey。

#### 7\.2\.2 Action 行动算子

Action is performed when we need actual dataset results; it does not form a new RDD and triggers DAG execution\.

行动算子用于获取最终计算结果，不会生成新 RDD，同时触发 DAG 完整执行。行动算子返回非 RDD 结果（数值、列表、文件），是**真正触发集群计算**的唯一入口。所有懒加载的转换操作，都会在遇到 Action 后统一执行。结果可返回到 Driver 端或写入外部存储。

三个副作用：

1\. 触发 DAG 执行 Triggers the execution of the DAG 

2\. 返回结果给程序 Returns the results to the program 

3\. 或者把数据写入 HDFS 或文件 Or writes the data to HDFS or to a file 

看返回值：返回 RDD ⇒ Transformation；返回非 RDD（数字、列表、写文件）⇒ Action。Transformation 产生新 RDD，Action 不产生。这是两者的形式差别；语义差别是记录 vs 求值。

Action 是惰性的终点： Action 触发执行。所以一个 Spark 程序里，只有 Action 会出现真正的计算。

**极简区分口诀**：转换懒加载、只构图不运算；行动触发执行、出结果、跑任务。

### 7\.3 DataFrames \& Spark SQL

DataFrames are distributed datasets organized in named columns, similar to a relational database or a Pandas DataFrame, immutable, and track lineage\.

DataFrame 是按命名列组织的分布式数据集，结构类似关系型数据库表、Pandas 表格，具备不可变性与血缘追踪能力。Pandas DataFrame 是单机、仅能处理小数据；Spark DataFrame 是分布式、支持 TB/PB 级大数据。和 RDD 一致，不可变、可容错、支持分布式并行计算。

DataFrame 构建方式

Construct from files, existing DFs, or a parallelizing Python collection\.

可通过读取文件、转换已有 DataFrame、并行化本地集合三种方式构建。

1\. 读文件 Read from file\(s\) 

2\. 从已有 DataFrame 变换 Transforming an existing DF \(Spark or Pandas\) 

3\. 把 Python 的 list 并行化  Parallelizing a Python collection list。

三种方式对应三个数据来源 ·外部文件 / 已有的表 / 内存里的 Python 对象。第二条特别实用：可以把小规模的 Pandas DataFrame 接进来。

RDD 与 DataFrame 对比扩展

RDD 是底层接口，DataFrame 建在它之上，并且多了模式与优化。RDD 是底层低级 API，无数据结构描述，Spark 无法自动优化，需要手动优化代码。

DataFrame 基于 RDD 构建，自带 Schema 表结构（列名、数据类型），Spark 可通过 **Catalyst 优化器**自动优化执行计划，运行速度远快于原生 RDD，是企业开发主流用法。

|原文|层级 / 含义|
|---|---|
|RDDs provide a low\-level interface into Spark|RDD 是面向 Spark 的底层接口|
|DataFrames are built on top of the RDDs and the core Spark API|DataFrame 建立在 RDD 与 Spark Core API 之上|
|DataFrames have a schema|DataFrame 有模式（schema）即列名与类型|
|DataFrames are cached and optimized by Spark|DataFrame 被 Spark 缓存并优化|

### 7\.4 Spark DAG 有向无环图

DAG consists of vertices \(RDDs\) and edges \(operations\)\. Action triggers DAG submitted to scheduler and splits into stages\.

DAG 由顶点（RDD）和边（算子操作）组成，调用 Action 后，DAG 提交调度器并切分为多个 Stage 执行。DAG 完整记录数据计算血缘与依赖关系。

Stage 划分核心规则：**遇到宽依赖 Shuffle 就切分 Stage**，单个 Stage 内部全部为高效窄依赖操作。集群根据 Stage、Task 完成分布式并行计算，故障时可根据 DAG 血缘重算恢复数据。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjEwNmY4YjA1OTVlY2NhMzI3ZjJmZmVlMzllNzU0ZDVfMDI1ZDUyNjJlMDliNGMzM2YxZjhhMTVkNjYwMDE3NmRfSUQ6NzY5NDU0ODc0NzY2OTgxODkwOF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

边清单：A→B、B→C、B→D、B→E、C→E、S→D、D→E、E→F

顶点 = RDD，边 = 操作（Transformation）；Action 触发 DAG 提交给 DAG Scheduler，再由它切成 stages；会算一张给定 DAG 的源点 / 汇点 / 汇合点与边数。

## Part 8 Spark Application

### 8\.1 Spark's Main Use Cases 主要用例

三类用例：时序类（Streaming、Batch、Interactive）、算法类（Machine Learning、Graph、Spatial/GIS）、数据组织类（Data Warehousing、Exploratory Data Analysis）。

1\. 流处理 Streaming Data 流式数据。Spark Streaming

2\. 机器学习 Machine Learning 机器学习。MLlib

3\. 交互式分析 Interactive Analysis 交互式分析。

4\. 数据仓库 Data Warehousing 数据仓库。Spark SQL

5\. 批处理 Batch Processing 批处理（与 MapReduce 重叠的那一块）。

6\. 探索性数据分析 Exploratory Data Analysis 探索性数据分析（EDA）。

7\. 图数据分析 Graph Data Analysis 图数据分析。GraphX

8\. 空间（GIS）数据分析 Spatial \(GIS\) Data Analysis 空间/GIS 数据分析。

### 8\.2 Spark in the Real World

|公司|行业|核心技术组合|业务目标|
|---|---|---|---|
|Uber|出行|Kafka \+ Spark Streaming \+ HDFS|实时 ETL：原始事件 → 结构化数据|
|Pinterest|图片社交|Spark ETL \+ Spark Streaming|实时推荐相关 Pin、推断购买与旅行意向|
|Conviva|流媒体视频|Spark|优化视频流 / 管理直播流量，降低 churn|
|Capital One|金融|Spark \+ data science algorithms|理解客户、欺诈侦测|
|Netflix|流媒体|Spark|观看习惯洞察 \+ 影片推荐 \+ 内容创作|

### 8\.3 Spark的边界

三条限制

Even though Spark is versatile, that doesn't mean Spark's in\-memory capabilities are the best fit for all use cases

|原文|解读|
|---|---|
|For many simple use cases Apache MapReduce might be a more appropriate choice|对许多简单用例，Apache MapReduce 可能更合适|
|Spark users are required to know that memory they have is sufficient for a dataset|用户必须自己确认内存够放这个数据集|
|Spark was not designed as a multi\-user environment|Spark 不是为多用户环境设计的|

局限 2 \+ 局限 3 ：Spark 把中间数据放在共享的内存里，内存是独占且有限的资源，既要求单次数据集能装下（局限 2），又要求没有别的用户来抢（局限 3）
局限 1 ：通用框架有额外开销，简单任务的调度开销可能大于收益。

### 8\.4 Summary

|块|课件原文|
|---|---|
|Hadoop \(HDFS, MapReduce\)|Provides an easy solution for processing Big Data；Brings a paradigm shift in programming distributed system<br>为大数据处理提供简单的解决方案；带来了分布式系统编程的范式转变。|
|Spark|Has extended MapReduce for memory computations；for streaming, interactive, iterative and machine learning tasks<br>为内存计算扩展了 MapReduce；四类任务：流式 / 交互式 / 迭代式 / 机器学习。|
|Changing the World|Made data processing cheaper and more efficient and scalable；It is the foundation of many other tools and software<br>让数据处理变得更便宜、更高效、更可扩展；是许多其他工具与软件的基础。|

# Lecture 6 神经网络

## Part 1 Neural Network：神经网络

问题定义：神经网络的沉浮史 → 图像识别 → 二分类 vs 多分类 → 车辆检测算例（2500 / 7500 / ≈300 万特征）→ 线性假设的两条不足。

线性假设需要手工造组合特征，而组合数会爆炸。

### 1\.1 神经网络  Neural Networks for Classification

Neural Networks for Classification are very powerful, but have been dumped for decades because of their complexity and large computational resources

神经网络被弃用，因为复杂性和算力需求赶不上。
Resurrected a few years ago because of cheaper CPU, RAM, GPU, large clusters with many machines, high\-speed networks, and many more training examples \(big data\)\. Now, like Deep Learning\. 

复兴原因：算力条件（更便宜的CPU / RAM / GPU 处理器、更大的集群large clusters with many machines、更快的网络 high\-speed network）；数据条件（样本更多、就是大数据many more training examples, big data）。

深度学习是神经网络复兴后的名字，不是另起炉灶的新方法。神经网络是方法，深度学习是它复兴后的名字，图像识别是它最典型的任务。

### 1\.2 Classification

|对比项|二分类|多分类|
|---|---|---|
|标签写法|Giraffe / Not Giraffe|Giraffe / Car / Cat|
|正类个数|1 个正类，其余全归为负类|k 个互斥类别，每张图恰好属于 1 个|
|输出层|1 个输出单元（sigmoid → 概率）|k 个输出单元\+ Softmax|
|真值 y 的形式|标量 0 或 1|one\-hot 向量，只有 1 维是 1|
|用到的损失|交叉熵的 k = 2 特例|交叉熵/ 均方误差|

#### 1\.2\.1 Binary Classification 

只有是 / 不是两种结果，可以用一个概率表示。三张图里只有长颈鹿是 Giraffe，另外两张（车、猫）都被归为 Not Giraffe。正类 1 个、负类归成一堆。

#### 1\.2\.2 Multi\-class Classification

类别数从 2 变成 3，输出层就不能再用一个概率表示。需要多个输出单元，每个类别一个三个互斥标签，同一组图换成 Giraffe / Car / Cat 三个互斥类别，每张图只属于其中一个。

#### 1\.2\.3 Example: Car Detection

如果把像素两两相乘当特征，会有 300 万个特征。所谓识别，就是从这堆数字里判断它是不是车，输入是数值，不是概念。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzdjYTFjNDZiNTljZWI2ZTJlZmVhMTZjNGU1MTU4MmFfYzMyOTU5MTYyOWM3MmUwNWU4YzYxYTIzODIzMGQ2YzlfSUQ6NzY5NDk1MjIxMDcxMDYxMzUyOF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

灰度图每像素 1 个数 ⇒ 50 × 50 = 2500；RGB 每像素 3 个数（R/G/B）⇒ 2500 × 3 = 7500。

x 把 50×50 的图按顺序摊平成一个 2500 维列向量，图像从此就是普通的特征向量，可以喂给任何学习算法。

二次特征的量级 ·把像素两两乘积 xᵢ × xⱼ 也当特征，个数 ≈ n² / 2 = 2500² / 2 ≈ 312 万，所以课件写 ≈ 3 million features。

### 1\.3 Motivation

动机总结：复杂度爆炸，所以换方法

1. Need non\-linear decision boundary

需求一：非线性边界，右上角的图：x₁–x₂ 平面上蓝色空心圈与红色叉无法用一条直线分开。

2. Need complicated hypothesis with different combinations of features

需求二：复杂的组合假设，算式里除了一次项$θ₁x₁、θ₂x₂$，还出现了特征两两相乘的项，
$  g(θᵀX) = g(θ₀ + θ₁x₁ + θ₂x₂ + ⋯ + θ_k x₁x₂ + θ_{k+1} x₁x₃ + ⋯)$

The computation complexity is extremely large\. Hence we have to take another method, called Neural Network\.

线性假设不够 → 手工加特征组合 → 组合数爆炸（≈3 million）→ 算不动 → 改用神经网络自动学特征。

## Part 2  Perceptron：感知机

最小单元。大脑启发 → 线性神经元的阈值与偏置 → Sigmoid 激活 → 感知机四部件 → AND / OR 的权重解 → XNOR 线性不可分 → 两层网络解决。

### 2\.1 Models and Perceptron

#### 2\.1\.1 Models

It learns new features from input features\. 模型自动学特征
Its architecture is based on our brain structure\. 架构来源于人的神经网络，但并不模拟生物机制
The axon terminal（轴突末梢）of one neuron connects with the dendrite（树突）of another neuron, which consists of quite a complicated neural network\. 

#### 2\.1\.2 Perceptron: The Artificial Neuron

$xᵢ $are inputs and $a = h(x; θ)$ is the output\.

> 感知机 = 把输入向量 x 映射成输出 a 的函数 h\(x; θ\)，θ 是要学、要逼近最优的那个参数组
> 
> x is an input vector\. In this example, x = \(x₁, x₂, x₃\)
> θ is the parameters that result in the best function approximation 需要学习的最佳参数
> 
> 

Node in orange represents the body of neuron\.

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzliYWMzZGViOTZhMTc4NTQ0NjQ5ODc4ZjUxNjEzMDlfNWI1ZWM0YzU1Y2U5NWIzYjRlN2ZlMjEzOTFhZTI2OWRfSUQ6NzY5NDk1MjIwOTY0NTMyNTg0OF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

### 2\.2 A Simple Linear Neuron **线性神经元：阈值与偏置**

运算：加权和 \+ 阈值判定 把偏置并进权重

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OGI3YWM2NzBmODlmOTIxMTk1YjE4YjkxYmU5MzlhNjhfMDAxYmNkYWMzNWI0NTJmZmMxOWNmMTI2YzFkMjUwYjFfSUQ6NzY5NDk1MjIxMjY2NTAxMTc0MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

输出结果是 1 或 0 两种，没有中间值。逻辑神经元是光滑的 sigmoid。

三种等价写法：阈值式（≥ −b）⇔ 偏置式（\+b ≥ 0）⇔ 内积式（wx ≥ 0）。

### 2\.3 Logistic Neuron 与 Sigmoid 激活 

把阶跃换成光滑的 sigmoid，输出就变成 \(0,1\) 区间里的数，可当概率用。

#### 2\.3\.1 Linear vs Logistic

Logistic Neuron: Sigmoid, Non\-linear Activation Function
Linear：直接输出

$h(x; θ) = wx$

Logistic：经过激活函数 f（= sigmoid），输出被压进 \(0, 1\)

$h(x; θ) = f(wx) = 1 / (1 + e^{(−wx)})$

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTM4M2FhNjVlMDY5ZWJlYThlZmU5ZDFkMWYwMWY1YjlfODk2MDJmMTM1M2VmOWNiYWQ1OWU2YzUwZDJjZGNkZGJfSUQ6NzY5NDk1MjIxMDMwNzk5MzEyMF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

#### 2\.3\.2 Perceptron four parts

一个感知机的四个部件：输入 → 参数 → 加权和 → 激活 → 输出

|部件|说明|
|---|---|
|Inputs|输入 $xᵢ$（可以是像素矩阵拉直后的向量）|
|Parameters \(weights and biases\)|权重 $w₁…wₙ$ 与偏置 $b（= w₀）$|
|Weighted Sum|$Σ wᵢxᵢ $或内积 $wx$|
|Activation Functions|sigmoid（也可换成别的非线性函数）|

Tips：sigmoid 是非线性激活（Non\-linear Activation Function）。如果激活也是线性的，多层叠加仍等价于一层线性模型，非线性是多层有用的前提。

### 2\.4 特征学习 Feature Learning:

一个神经元能学出什么：AND 与 OR 都是线性可分问题，各由一组权重实现。

#### 2\.4\.1 AND：权重已知的算例

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mjk1Yzk5MTA5YTM3MTZlNjRlOGE2ZGJlOGQ1MmNhZTZfZjhiZDRjODU5N2ZlNmNlMDAwMzY1ZGFhNmU5MDFiMmVfSUQ6NzY5NDk1MjIwOTY0NTM1ODYxNl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

先算 $
 z = w₁x₁ + w₂x₂ + w₀$，再取 g\(z\)。

#### 2\.4\.2 OR：同样的形式，权重留白

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2RjNjlmM2E0ZWJiMTc0OTNkMjIzN2ViNjAxZTNiYTBfMDFmYWI5YTFkNjdhOWJlNjcwYjQ4MTU1ZDAzZTRkOTdfSUQ6NzY5NDk1MjIxMjAzMTgwMjkxMl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

把三个权重都留给读者自己解。

一组可行解：取 w₁ = w₂ = 20、w₀ = −10，符合 OR 真值表。

与 AND 的差别：AND 的 w₀ = −30，OR 的 w₀ = −10；两条权重都是 20。偏置决定门槛有多高。

#### 2\.4\.3 线性假设 Linear Hypothesis

两者都是线性可分问题，一个单神经元就能解决。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWQxYjJhNWZkMTUwZWI0NTU3ZDZiNWQxZDZlODU1YzZfYzNkMTQxNDJlZGQzMDExNjVhZjk2NjJiNGU2NDEyYTNfSUQ6NzY5NDk1MjIxMjY2NTA0NDUwOF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

衔接：线性不可分的反例，XNOR。

### 2\.5 Non\-Linear and Multi\-Layer NN

问题：XNOR 一条直线分不开，加一层隐藏层就能分开，多层的价值在这里被具体化。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDQzYzcxNzE0N2IxOWZlOGY2OTY5OGQ0YzY4ODE4ZjdfMzNmYTE0MzkyZTRlOGRmOWVlMDRlZWRjZjBiMDNlYjdfSUQ6NzY5NDk1MjIxMzcwNTEzMzU5NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

解决： Multi\-Layer NN Model
$  x₁, x₂  →  a₁, a₂  →  h$

a₁ 的偏置 −30； $x₁→a₁ = 20，x₂→a₁ = 20$
a₂ 的偏置 \+10； $x₁→a₂ = −20，x₂→a₂ = −20$

$ a₁→h = 20，a₂→h = 20$；h 的偏置 −10

第一层学出 AND 与 NOR 两个中间特征，a₁ 算的是 AND（只有 \(1,1\) 为 1），a₂ 算的是 NOR（只有 \(0,0\) 为 1）。

第二层再把这两个新特征 OR 起来 → 正好是 XNOR。

a₁ 列 = 0,0,0,1 是 AND；a₂ 列 = 1,0,0,0 是 NOR；h 列 = 1,0,0,1 是 XNOR。

## Part 3 多层神经网络与前向计算

模型的语言：三种网络形状 → aᵢ⁽ʲ⁾ / w\_ki⁽ʲ⁾ ；

符号约定 → 一层的标量式与矩阵式 → 网络 = 函数复合。

### 3\.1 网络形状与符号约定  Neural Network and Notation

1. input layer \(4\) , hidden layer \(5/3/2\) , output layer \(1\)

四层网络；三层隐藏层说明深就是把隐藏层一路叠下去

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWM3ZTMxYjM0ZDBiYmFjZDRiNzFmODY3NjFjNWM5OWFfZmM2ODAyNmZiMjg4OGY2MTU5MDIwNzM0MDlhYTBhYWFfSUQ6NzY5NDk1MjIxMDcxMDYyOTkxMl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

2. Input layer \(3\) , hidden layer \(4\) , output layer \(2\)

输出 2 个单元，适用于二分类或多标签任务

3. input layer \(3\) , hidden layer 1 \(4\) , hidden layer 2 \(4\) , output layer \(1\)

两个隐藏层 \+ 单输出，适用于二分类

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGYyZGI2YzgzYjI1NDNkOWQ2YWJkNWJkNzI2YTE4ZDdfMDg5YTI4NzVkMDU0MTRmYmMzNTJkNTQ2Y2UyZjQzMTdfSUQ6NzY5NDk1MjIwOTQwMjEzODEzOV8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MmM4ZWUxMmE5Y2Y4MmIwODM1Zjk1ZmE3YTBmNTIzMDJfNzFiZDQ5ODZkZmZjZjRiZWVkMmY0NDBhNDM4MDEzMTdfSUQ6NzY5NDk1MjIwOTY0NTM0MjIzMl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

### 3\.2 Model Representation

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2U5MzdmZGI0YzE4ZjVkZWZkYmViNjc4ZGEzMmZhMWFfYzEwNGY0ZDVlNzE1OGQ2YWQxMDZiNTZhYTk2N2FhNzhfSUQ6NzY5NDk1MjIwOTY0NTM3NTAwMF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

|符号|读法要点|
|---|---|
|aᵢ⁽ʲ⁾ 第 j 层第 i 个神经元（同时也是它的输出值）|上标 j 是层号，下标 i 是层内序号；神经元与它的输出共用同一符号|
|w\_ki⁽ʲ⁾ 从 aᵢ⁽ʲ⁻¹⁾ 连到 a\_k⁽ʲ⁾ 的权重|第一个下标 k 是去哪，第二个下标 i 是从哪来|
|X 输入向量|\(1, x₁, x₂, x₃\)ᵀ，第一维恒为 1（偏置项）|
|a⁽ʲ⁾ 第 j 层的输出向量|\(1, a₁⁽ʲ⁾, …\)ᵀ，同样第一维为 1|
|θ 全部参数的统称|每层各有一份：θ⁽¹⁾、θ⁽²⁾|

前向传播

1. 逐个神经元写 Connections between Input Layer and Hidden Layer 1:

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjQwZWEwOTAxNWVhMjYyZWRiM2E4MjY2OWE0NjAzMjVfMTFkZWI2ZjBmOWQ5MDBhMWZkOWMxMjRmNDA1ZjBjMzRfSUQ6NzY5NDk1MjIxMjAzMTc4NjUyOF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

$
  a₁⁽¹⁾ = f⁽¹⁾( w₁₀⁽¹⁾ + w₁₁⁽¹⁾x₁ + w₁₂⁽¹⁾x₂ + w₁₃⁽¹⁾x₃ )
$
$
  a₂⁽¹⁾ = f⁽¹⁾( w₂₀⁽¹⁾ + w₂₁⁽¹⁾x₁ + w₂₂⁽¹⁾x₂ + w₂₃⁽¹⁾x₃ )$
$
  a₃⁽¹⁾ = f⁽¹⁾( w₃₀⁽¹⁾ + w₃₁⁽¹⁾x₁ + w₃₂⁽¹⁾x₂ + w₃₃⁽¹⁾x₃ )$

三条式子结构相同：一个偏置 \+ 三个加权输入，外面套同一个激活 f⁽¹⁾。三条并列，就是三个隐藏神经元各自的计算

$w₁₀⁽¹⁾ / w₂₀⁽¹⁾ / w₃₀⁽¹⁾$即 bias，三个偏置和 b 是一回事，只是写成了这个形式。

2. 合并成矩阵：Rewrite it by matrix calculation

$a⁽¹⁾ = f⁽¹⁾( W⁽¹⁾ x )$

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTdkZDMxYTBmYWEwOGI2ZDc3YWQzN2U4ZTI2OGIwODdfY2YzMTU4NzUyYjg3NTBmMGIyYzQxMjUwMDkxODgxODlfSUQ6NzY5NDk1MjIxMDcxMDcxMTgzMl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

Function f⁽¹⁾ applies to each component in a vector f⁽¹⁾ 

逐分量作用，因为 sigmoid 一次只能算一个数，向量上的用法是对每个分量分别算

W⁽¹⁾ 的三行对应三个隐藏神经元，四列对应 \(偏置1, x₁, x₂, x₃\)；矩阵乘法的结果就是一个 3 维向量。

3. 逐层复合：Layer Composition

把隐藏层 1 → 输出层也写成矩阵式，然后把两层叠起来，网络的最终假设就是各层函数的复合。

Connections between Hidden Layer 1 and Output Layer:

$a₁⁽²⁾ = f⁽²⁾( w₁₀⁽²⁾ + w₁₁⁽²⁾a₁⁽¹⁾ + w₁₂⁽²⁾a₂⁽¹⁾ + w₁₃⁽²⁾a₃⁽¹⁾ )$

对比上一步，把输入从 x 换成 a⁽¹⁾：上一层的输出就是下一层的输入。bias 同样存在。

$  a⁽²⁾ = f⁽²⁾( W⁽²⁾ a⁽¹⁾ )$

Function f⁽²⁾ applies to each component in a vector

输出层只有一个神经元，所以结果是一个标量（写成 1 维向量）。

第一层算出来的 a⁽¹⁾ 只有三个数，进第二层前前面补一个 1，才能让第二层的偏置项进得来。每往下一层都要补一次。叠起来：整个网络是一个复合函数

$a⁽²⁾ = f⁽²⁾( W⁽²⁾a⁽¹⁾ ) = h⁽²⁾( a⁽¹⁾ ; θ⁽²⁾ )$
$  a⁽¹⁾ = f⁽¹⁾( W⁽¹⁾x )  = h⁽¹⁾( x ; θ⁽¹⁾ )$
$ a⁽²⁾ = h⁽²⁾( h⁽¹⁾( x ; θ⁽¹⁾ ) ; θ⁽²⁾ ) = h( x ; θ )$

Each layer is a function\.  每一层 = 一个函数 $h⁽ʲ⁾(x; θ⁽ʲ⁾)$
The final value is a function composition from layer functions\. The latter one will be the outer one\.

整个网络 = 各层函数依次复合，训练网络就是拟合一个复合函数，不是拟合 k 个独立函数；后面的层写在外层；全网络只有一组参数 θ，梯度下降是对整体 θ 做的。 

三层结构被压缩成$h(x; θ) = h⁽²⁾(h⁽¹⁾(x)) $。深：再叠一层就是再复合一个函数。

## Part 4 多分类输出与 Softmax

多分类要多个输出单元，还要一层归一化才能当概率用。

### 4\.1 多分类 Multi\-class Classification

输出向量之和不是 1，不能直接当概率。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzQzYTAwOGY1Mzg3NjZlMTE4MDkyOWZmNTU0ZTQ4ZTNfZGNhMjczZWVjMDM5N2U4Zjg0ZTVhODlkZjAyYTRlNWZfSUQ6NzY5NDk1MjIxMjY2NTAyODEyNF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

Multiple output units: One\-vs\-all 每个输出单元 负责 回答 是 不是 这一类。输出单元数 = 类别数 k。

one\-hot：真值 y⁽ⁱ⁾ 是四个向量之一，只有一个分量为 1，其余为 0。

问题：课件给的输出向量不是概率分布。单看这组数，既不能求和为 1、也不好直接比较。如果按取最大（argmax）判断，最大的是 0\.3，对应第 4 类 Truck。

解决：把 \[0\.2, 0\.1, 0\.05, 0\.3\] 这种原始输出归一化成概率向量，这就是 Softmax。原始输出的各分量之和不一定为 1，需要 Softmax 才能当概率用。

### 4\.2 Softmax Function

Softmax 是输出层的激活函数：接收任意实数向量，输出一个和为 1、每项非负的概率向量。

Softmax is an activation function to normalize the outputs\. Given a real vector a ∈ R^k   \(Classification with k classes\)

$ s_j(a) = e^{(a_j)} / Σ_{i=1..k} e^{(a_i)}$



![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjJlM2RkZTk4NTU2NWMwN2I3YzE4ZDZiZWQ5MzkwMTJfYWZiZjkyNzdjODUyYWRhMGM4ODFjYTliYmNjYTlhOGRfSUQ6NzY5NDk1MjIxMzcwNTE0OTk3OF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjM0MzVhMWEwMjkxMzU3MmMyZWE2Y2I3NjhhNzg3ZjRfM2JiNTBhYjFmNjY2NzVlYjlhOTAyMTM5M2ZmMjEyOTdfSUQ6NzY5NDk1MjIxMDcxMDY2MjY4MF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

|性质|数学形式|作用|
|---|---|---|
|非负|$<br>e^{(a_j)} > 0$|分子是正数，输出恒为正|
|归一|$Σ_j s_j(a) = 1$|分母是所有 e^\(a\_i\) 之和 ⇒ 输出和为 1|
|放大最大项|$a_j ≫ a_i ⇒ s_j(a) → 1$|指数把差距放大，明显的类更明显|
|可当概率|s\(a\) 是 probability vector|固定搭配：softmax输出后配交叉熵Cross\-entropy loss，直接与 one\-hot 真值比较|

Softmax 是激活函数（activation function），作用位置是输出层；它本身不带参数，只是归一化。

## Part 5  代价函数与梯度下降

### 5\.1 代价函数：Cost Function

作用：衡量模型预测结果到底有多差

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NGZjYzAxMDhmYzg0MDVmMDIwNzg3NWRlMjJkZjEzYjBfMjUwNTlmMzlkM2E3ZjY3NTM4OGRlMWFmODQ4N2Y0YzVfSUQ6NzY5NDk1MjIxMDcxMDY0NjI5Nl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

|符号|含义|对应|
|---|---|---|
|$y = (y₁, …, y_k)$|ground truth，one\-hot 向量（ $y_j = 1$ 当且仅当属于第 j 类）|四个 4 维向量|
|$h(x; θ)$|probability prediction，第 j 个分量给出第 j 类的预测概率|s\(a\)，即 Softmax 之后的输出|
|$h(x; θ)_j$|第 j 类的预测概率（下标取分量）|0\.2 / 0\.1 / 0\.05 / 0\.3|
|cost function|评价预测有多差的函数|Cross\-entropy loss and mean squared error cost|

对于k分类任务： 真实标签$y = [y₁,y₂…y_k]$

one\-hot 编码：样本属于类别 j 则$y_j=1$，其余全部 = 0；

模型预测输出向量$h(x;\theta)$，$[h(x;\theta)]_j$ 代表模型预测该样本属于第 j 类的概率

不同任务可以选不同代价函数，h\(x; θ\) 与 y 的区别是 y 是硬标签（只有 0/1），h\(x; θ\) 是软概率（0 到 1 之间的实数）。代价函数就是衡量这两者的差距。

different scenarios：不同场景用不同代价函数，交叉熵与均方误差不是替代关系，而是并列可选项。

y 是真值（one\-hot）、h\(x; θ\) 是预测概率向量、J\(θ\) = L\(y, h\) 是代价。

#### 5\.1\.1 交叉熵损失：Cross\-Entropy Loss

分类问题的常用代价：只惩罚真值的预测概率，预测得越不自信，损失越大。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjQxNmJiZWYwYzFlMmFiMjQ3MDZlMmRmMGIxMzk1YzlfNWFlODA2NWQxMjI2ZmE1ZjQ2MTc5OWQ1NmMyY2NkMTJfSUQ6NzY5NDk1MjIxMDMwODA0MjI3Ml8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

$L(y,h)=-\sum_{j=1}^k y_j\log_2[h(x;\theta)]_j=-y^T\log_2 h(x;\theta)$

- y 只有 1 个位置是 1，其余为 0，公式简化：$L = -\log(\text{模型预测真实类别的概率})$

- 如果模型给真实类别的预测概率很低 → 损失 L 很大； 训练目标：调整参数$\theta$，尽量让损失变小。

预测低的 Loss越大，越不自信，罚得越狠，而且是指数级的严厉。

算例：若softmax  \[0\.2584, 0\.2338, 0\.2224, 0\.2855\]，则 L = −log₂0\.2855 = 1\.8083 bit。

Change θ to keep cost as low as possible 改变参数使代价最小，即使用梯度下降。

#### 5\.1\.2 均方误差损失：Mean Squared Error Cost

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NGFjMTk3NmVjNjNjNDAwYjE1OThhZWQ5Y2U2OTUzY2JfZjJkMzVmNzY1OWJlZWZmZmZkYTA5ODI4NGE1NjM1YWFfSUQ6NzY5NDk1MjIwOTY0NTQwNzc2OF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

$L(y,h)=\frac1k\sum_{j=1}^k\big([h(x;\theta)]_j-y_j\big)^2$

- 预测值 h 和真实 y 越接近，损失 L 越小

- 分类任务也可以用，但不如交叉熵好用（梯度容易消失）

同一个任务可以换一把「尺子」：均方误差衡量预测向量与真值向量之间的欧氏距离，本页与上一页构成两种并列选择。

|对比项|交叉熵|均方误差|
|---|---|---|
|形式|$−Σ_j y_j log₂ h_j$|$(1/k) Σ_j ( h_j − y_j )²$|
|用到 y 的几维|只有 1 维（因为 y 里只有一维是 1）|全部 k 维（每维都参与平方）|
|对自信的错误的惩罚|极严厉（log 在 0 附近发散）|有上界（最大 1，因为 h\_j、y\_j ∈ \[0,1\]）|
|梯度表现|误差越大梯度越大，收敛快|预测接近 0 或 1 时梯度会变小（饱和）|

算例：真类为第 4 类，h = \[0\.2584, 0\.2338, 0\.2224, 0\.2855\] ，各项平方和为 0\.6813，除以 k = 4 得 L = 0\.1703。

两种损失区别：交叉熵只取真值那一维、对自信的错误惩罚更狠；均方误差用全部 k 维、惩罚有上界。

### 5\.2 梯度下降：Gradient Descent

一阶导数迭代优化算法，用来找损失函数的局部最小值

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OGNhN2ZkZjg4MWI1ZjlkNDRjYmYxZTBlYWQzNzEzNDFfMmNkMDgyNWU2N2YzZjA3MGFmYzNlMDQzZWYwZmVkNzVfSUQ6NzY5NDk1MjIxMjY2NTA2MDg5Ml8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

Gradient descent is a first\-order iterative optimization algorithm for finding a local minimum of a differentiable function\. The idea is to take repeated steps in the opposite direction of the gradient of the function at the current point, because this is the direction of steepest descent\.

核心思想：沿着**梯度的反方向**一步步更新参数，直到走到（局部）最小值。

$x = x_0 - \alpha\left.\frac{\partial f(x)}{\partial x}\right|_{x=x_0}$

- $\boldsymbol{\alpha}$learning rate 学习率，控制每一步走多大。太大可能越过最低点甚至发散；太小则收敛很慢。

- $∂f/∂x $当前的导数（陡峭程度与方向）。

- 减号表示往梯度反方向走，梯度指向上升最快的方向，所以要下降就走反方向。

神经网络参数更新公式：

$w_i = w_i - \alpha \frac{\partial J(\theta)}{\partial w_i}$

每一步用参数的梯度，减去学习率 × 梯度，更新权重 w，降低代价 J

局限： local minimum

## Part 6  反向传播：误差传回

链式法则 \+ 中转量复用 \+ 反转的工作流 \+ 梯度乘权重。

### 6\.1 Chain Rules

神经网络是多层嵌套复合函数，求梯度必须用链式法则：

若 $z=f(y),\ y=g(x)$

$\frac{\partial z}{\partial x}=\frac{\partial z}{\partial y}\cdot\frac{\partial y}{\partial x}$ 

例子：$z=\frac12(x-5)^2$，令$y=x-5,\ z=\frac12 y^2$ $z'(x)=f'(y)\cdot g'(x)=y\cdot1=x-5$

### 6\.2 单层网络及梯度拆解 Single Network and Gradient Decomposition

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDE5MWE1NThmNzBkODFhZGY0M2VlYTkxY2QyZWU5MTJfN2U5M2QwOGNhNGYyNDdjNGQ5ODhkMjhlNGU5YjdkZjVfSUQ6NzY5NDk1MjIxMDcxMDY3OTA2NF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTBiODdlMGVlMzc3MWU4MGU1ZmJkNWVlODE1MTZhMThfMWU2MzNkZDBlMjlkMDAyNmI0ZmExNjYwYzhlMWQ3NDFfSUQ6NzY5NDk1MjIxMjAzMTgxOTI5Nl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

$a = h(x;\theta)=f(z)=f(w_0+w_1x_1)$

$z = w_0 + w_1x_1$ 

$J(\theta)=L(y,a)$ 

- f 激活函数；a 输出预测；J损失函数；

- 目标：求权重$w_1,w_0$的梯度，用梯度下降更新 ；

- 链式展开：

$\frac{\partial J}{\partial w_i}=\frac{\partial J}{\partial a}\cdot\frac{\partial a}{\partial z}\cdot\frac{\partial z}{\partial w_i}$ 

1. $\frac{\partial J}{\partial a}$：代价函数对输出 a 求导，选定的损失函数决定；

2. $\frac{\partial a}{\partial z}$：激活函数 f 的导数，选定的激活函数决定；

3. $\frac{\partial z}{\partial w_i}$：线性部分$z=w_0+w_1x_1$对权重求导

### 6\.3 两层网络

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YmE4ZDg5NzNkZTk2Nzg0Nzg0MDJjMDU0NWE3ODdjZGFfODAxMzJjYzhjZTZhNWU3MWI1MmNhNmU5M2RkOGU1NWZfSUQ6NzY5NDk1MjIxMzcwNTE2NjM2Ml8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjBkZGFlOTZiMTQzMDNjYjc5NGVkYWU5Zjg1MjFhNmJfNDk0NzIzODdkOWZlZDQ2ZTE0YzZkYzdjMTlmMWU2NzJfSUQ6NzY5NDk1MjIxMzcwNTE4Mjc0Nl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

两层网络（每层 1 个神经元，引出反向传播）

$a^{(2)} = f\big(w_{21}a^{(1)}+w_{20}\big)=f\big(w_{21}f(w_{11}x_1+w_{10})+w_{20}\big)$

$w_{10},w_{20}$是 bias 偏置 

网络链路：

$x_1 \rightarrow z^{(1)} \rightarrow a^{(1)} \rightarrow z^{(2)} \rightarrow a^{(2)} \rightarrow J$

继续链式展开：

$\frac{\partial J}{\partial w_{11}}=\frac{\partial J}{\partial a^{(2)}}\frac{\partial a^{(2)}}{\partial z^{(2)}}\frac{\partial z^{(2)}}{\partial a^{(1)}}\frac{\partial a^{(1)}}{\partial z^{(1)}}\frac{\partial z^{(1)}}{\partial w_{11}}$

|节点|关系|图中标注|
|---|---|---|
|z⁽¹⁾|由 x₁ 与权重 w₁₀、w₁₁ 汇入|第一层的加权和|
|a⁽¹⁾|由 z⁽¹⁾ 经过外层函数得到|第一层的输出（下一层的输入）|
|z⁽²⁾|由 a⁽¹⁾ 与权重 w₂₀、w₂₁ 汇入|第二层的加权和|
|a⁽²⁾|由 z⁽²⁾ 得到，即 prediction|网络的最终预测|
|J|由 a⁽²⁾ 与真值 y 得到|代价|

### 6\.4 反向传播：Backward Propagation

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWRlZTdlMDkxMzJkNmIxMzQxNTVkOTZkNWIzNjJhY2FfN2MzZTMzMjBkYmViNzUxMDQ5NmUwMjk3NTc2Zjk0MjBfSUQ6NzY5NDk1MjIxMjY2NTA5MzY2MF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTcxZTEwMTk3NzJmMDBhMWFmNTc2YjA1MTZlNGNlNjVfMzJjYzk5ODEzM2E3MGI5N2VhZWIzMTllMjE1N2VjM2RfSUQ6NzY5NDk1MjIwOTY0NTM5MTM4NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

核心：从输出层往输入层反向算梯度，复用已经算好的结果$δJ/δz$ ，避免重复计算。

正向传播：从左往右，输入→计算每层$z,a$，得到预测与损失 ；

反向传播：从右往左（输出层往回）逐层求梯度。梯度反向流动，乘权重，一层一层往前传。

1. 第 L 层神经元先算出$\frac{\partial J}{\partial z^{(L)}}$

2. 用这个值，计算本层权重梯度 $\frac{\partial J}{\partial w_{Li}}$

3. 再乘以本层权重，把梯度传递给上一层 \(L\-1\)：$\frac{\partial J}{\partial a^{(L-1)}}=\frac{\partial J}{\partial z^{(L)}}w_{L1}$

4. 上一层继续计算$\frac{\partial J}{\partial z^{(L-1)}}$，不断向前传递

拓展：一层多个神经元

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTA1N2RhMWRhOWNhNTY5OTA4Y2Y1YmJjZWQ5ZDFkMDRfNDA2ZDQ2NGUzY2VhOWJkZTE0ODMzN2U5ZGZhZDc0Y2NfSUQ6NzY5NDk1MjIxMDcxMDcyODIxNl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

公式形式不变，需要对后一层所有神经元求和：

$\frac{\partial J(\theta)}{\partial a_k^{(L-1)}}=\sum_{j=1}^{n_L}\frac{\partial J(\theta)}{\partial a_j^{(L)}}\frac{\partial a_j^{(L)}}{\partial z_j^{(L)}}w_{jk}^{(L)}$ 

$n_L$ = L 层神经元数量

每一层把 $δJ/δa$ 这个信号传给上一层，上一层再补上自己那段激活导数继续往下传，逐层回传。

|量|单神经元|一层多神经元|
|---|---|---|
|本层加权和|$z = w₀ + w₁a⁽ᴸ⁻¹⁾$|$z_j⁽ᴸ⁾ = w_j0⁽ᴸ⁾ + Σ_k w_jk⁽ᴸ⁾a_k⁽ᴸ⁻¹⁾$|
|本层权重梯度|$δJ/δw_Li = (δJ/δz)(δz/δw_Li)$|$δJ/δw_jk⁽ᴸ⁾ = (δJ/δa_j⁽ᴸ⁾)(δa_j⁽ᴸ⁾/δz_j⁽ᴸ⁾)(δz_j⁽ᴸ⁾/δw_jk⁽ᴸ⁾)$|
|回传给上一层|$δJ/δa⁽ᴸ⁻¹⁾ = (δJ/δz⁽ᴸ⁾)·w_L1$|$δJ/δa_k⁽ᴸ⁻¹⁾ = Σ_j (δJ/δa_j⁽ᴸ⁾)(δa_j⁽ᴸ⁾/δz_j⁽ᴸ⁾)·w_jk⁽ᴸ⁾$|
|是否需要求和（二者区别）|不需要（只有一个上层神经元）|需要，求和范围 1…n\_L|

### 6\.5 多条训练记录的训练循环：Multiple Training Records

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTBmYzdiN2VkYzQ0ZDY0MjZkNzNlZjBhYjRkYzY0ZGVfM2Q3Y2Y4NjFhZmFjYjQ3MDg0ZTBlZmNhNmJkNTZmZTdfSUQ6NzY5NDk1MjIxMDMwODAyNTg4OF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

把单样本的前向 → 算代价 → 反向 → 更新（Forward → Calculate Cost → Backward → Update weights）放进数据集循环，构成完整的训练流程。

训练集 $\{(x^{(1)},y^{(1)}),...,(x^{(m)},y^{(m)})\}$，对每一条样本：

1. 前向传播 Forward Propagation：从左向右，逐层算出所有层$a_j^{(L)}$

2. 计算当前样本的代价 $J(θ)$

3. 反向传播 Backward Propagation：从右向左，逐层算出$\frac{\partial J}{\partial z_j^{(L)}}$和所有权重梯度$\frac{\partial J}{\partial w_{jk}^{(L)}}$

4. 更新后的$θ$（用梯度下降）：梯度下降更新全部权重，循环迭代直到损失收敛

## Part 7  从神经网络到深度学习

层数堆上去带来的问题：错误率、层次化特征。

### 7\.1 深度学习

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDhhZWVkNDIzODkzM2ZiMGZhNGMxYzEwZTQ4ZjdhZjlfMzE1NjkzMWM4MmI2NjY5NGI0Zjk2ZmRiNjc3YThhYTlfSUQ6NzY5NDk1MjIxMjY2NTExMDA0NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTI2NDExNzI2NWFkNjE1OTRiMDRmOGY0MDAxYTQ1YjlfNzM5YmQzYzc5YzgxMjVkNzI2NDM4YWVkZWJmZTE5NWNfSUQ6NzY5NDk1MjIxMDcxMDY5NTQ0OF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

浅层前馈网络 vs 深度神经网络

Non\-deep feedforward NN（浅层前馈网络）：单个隐藏层，特征提取能力弱，依赖人工设计特征，泛化能力差。

Deep neural network（深度神经网络）：≥2 个隐藏层，多层堆叠，分层自动特征学习，无需人工设计特征。

> 定义：深度 = 隐藏层数量，层数越多，网络越深
> 
> 

ImageNet：深度带来性能飞跃（Revolution of Depth）

网络越深，图像识别错误率越低；ResNet 解决了深层网络训练难的问题。

深层的好处：层次化特征

- 浅层：学习底层基础特征。线条、边缘、色块、纹理

- 中层：学习局部组合特征。轮廓、部件（眼睛、鼻子、纹理块）

- 深层：学习高层语义特征。完整物体、人脸、场景、抽象概念

深度学习的本质：通过多层嵌套，自动从数据中学习从简单到复杂的特征层级。

### 7\.2 Modern Applications

#### 7\.2\.1 Generative Pre\-trained Transformer（文本）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzYwOWUzNzI2Yzc5YWYxYmFlOGEyMDExYWUyNDljNzFfNDIwM2U0ZjJhNGUzMzBlZjhkNDdkODgxM2U4ZThhMWJfSUQ6NzY5NDk1MjIxMjAzMTgzNTY4MF8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

GPT 的整体流水线：Input → Input Embedding（旁边并入 Positional Encoding）→ Dropout → Transformer Block Layer 1 → Layer 2 → … → Transformer Block Layer L → LayerNorm → Linear → Softmax → Output。

Transformer Block 是重复单元，堆叠 L 层。单个Transformer Block的内部：LayerNorm → Linear（分出三路 → 就是 Q/K/V）→ 多头注意力（三路各自走 MatMul / Mask / Softmax / Dropout，图上标 Head1 / Head2 / Head3）→ Linear（合并各头）→ Dropout → 残差相加 → LayerNorm → Linear → GELU → Linear → Dropout → 残差相加 → 输出。

残差连接：一处在注意力之后、一处在 GELU 前馈之后。

#### 7\.2\.2 扩散模型：Diffusion Model（文生图）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2ZkYTdlZDUwMTViZWY0YTI5YjNmZDE4OTkyMGM1YmRfODExN2Y1NzM2ZGZiMmQzYWNlZjhhMDA2ZDM0NTkyMzBfSUQ6NzY5NDk1MjIxMzcwNTMxMzgxOF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

扩散模型是生成模型：输入一段文字，输出一张图。

两代并排是为了展示迭代速度：同一类模型在一年内效果明显提升。

生成模型的另一条技术路线是 GAN，两者都在回答如何让网络生成新数据。

## Part 8  卷积神经网络

网络过深会出现：梯度消失/梯度爆炸 \+ 模型退化（层数增加，训练精度反而下降）

ResNet 创新：残差连接（shortcut），允许梯度直接跨层传递，避免链式累乘导致的梯度消失，支持超深层网络训练。

全连接在图像上要 10 亿个参数；局部连接 \+ 参数共享把这件事变得可行。

### 8\.1 全连接处理图像：Fully Connected on Images

深度网络中 1000×1000 的图像接 1000 个隐藏单元，需要 10 亿个参数。

Spatial correlation is local（空间相关性是局部的：一个像素只和它附近的像素相关）；

Better to put resources elsewhere\!（别把资源全砸在每个输入连每个单元上）。

若将1000×1000图像拉直为一维向量输入全连接网络：

1. **参数量爆炸**：产生数亿甚至十亿级参数，算力消耗极大、极易过拟合

2. **丢失空间信息**：二维图像的位置、相邻相关性被彻底破坏

3. **特征冗余**：全连接层认为每个像素独立，忽略图像局部相关性（相邻像素高度关联，远距离像素无关）

### 8\.2 局部连接与参数共享：Reduce Connection to Local Regions

局部连接 \+ 参数共享 = 卷积

减少参数的两种做法：每个神经元只看图像的一小块（局部连接），同一组参数在图像各处重复使用（参数共享）。

1. 局部连接：不再让神经元接收整张图输入，每个神经元只感知图像局部小区域。大幅减少连接数与参数量，贴合图像局部相关性规律。

2. 参数共享：图像的基础特征（边缘、纹理、角点）具有**平移不变性**：左上角的边缘特征和右下角的边缘特征原理一致。同一个卷积核（Filter/Kernel）在整张图像滑动，全程复用同一套权重参数，极大压缩参数量，这是CNN高效的根本原因。

Convolutions with learned kernels\(filter\)。学出来的卷积核就是那组共享的小矩阵。

### 8\.3 CNN：Convolutional Neural Network

Convolutional Neural Network \(CNN\) is proposed to reduce the number of parameters, preserve the image layout information, and make the network deeper
减少参数（局部连接 \+ 参数共享）、保存图像的布局信息（不是拉直成向量，行列结构保留）、使网络更深（参数省了，就有余力加层）。

Key Components in CNN

流水线：输入图像 → 卷积层（提特征）→ 激活层（非线性）→ 池化层（降维）→ 重复堆叠 → 拉直Flatten → 全连接层 → 分类输出

Input → Convolution → Pooling → Fully Connected → Output。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2MwYWFkNTdmOWY3Nzk4NDZjYThiZWNmMWU3MzMyNGJfNDJhY2VlOWJhZjVlOWJlNjU3ZGE3NzQ1OTA5OTY2MTlfSUQ6NzY5NDk1MjIxMjY2NTIyNDczMl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

|阶段|包含的层|作用|
|---|---|---|
|Feature Extraction|Convolution → Pooling|从像素里逐层抽取特征|
|Classification|Fully Connected → Output|把抽出的特征映射到类别|

### 8\.4 卷积层：Convolution Layer

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGJiNzRhNzIxY2U2NjRiMjFhNTdmMGY3Y2ZlZGFmZGJfOTdhMzcxM2FmMzUwNmRjMmU1Y2E3ZTg5ZjVkNTI5NTZfSUQ6NzY5NDk1MjIxMjAzMTkzMzk4NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

操作规则：卷积核在特征图上按固定步幅滑动，每滑动一个位置，执行对应位置像素相乘，全部求和，输出一个特征值，最终生成全新特征图。

超参数详解

Kernel Size 卷积核尺寸：常用3×3、5×5，尺寸越大感受野越大

Stride 步幅：每次滑动的像素数，stride越大输出特征图越小

Padding 填充：图像边缘补0，保留边缘特征、控制输出尺寸

卷积核数量：一个卷积核提取一种特征，多个卷积核可同时提取边缘、纹理、色块等多类特征，输出多通道特征图

### 8\.5 池化层：Pooling Layer

降采样：把特征图变小以减少计算量，常见做法是取最大值或取平均值。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2Y0ZTYwOGEzZDNhYzU5ODEyZmI4Y2RlYWZjNDhkZDNfMDliYjA1ZTgwNGUxMWIwMWEyMWM4Y2ZmNmYxY2YxYzdfSUQ6NzY5NDk1MjIxMzkzNTkxODYxOV8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

作用：

1. Makes the representations smaller and more manageable 让表示更小更易管理；

2. Operates over each activation map independently 逐特征图独立处理；

3. Max pooling and average pooling are widely used  max / average 两种最常用；

4. Pooling can speed up the training process 尺寸减半，后面各层的计算量与参数量大幅下降。

两种池化方式对比

最大池化 Max Pooling（最常用）：取窗口内最大值，保留最强特征，抗干扰能力强

平均池化 Average Pooling：取窗口平均值，保留整体特征，但容易模糊细节

关键区别：卷积层有可学习参数，池化层无任何可学习参数，只是固定的统计操作。

例：max pool 2×2、stride 2

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzIwYTcyMDZmZTBmNTRkODhkYmEwYTUxZDYyNjMxMjhfNzFhNzg3NjU3OWQ5MTUwMmNmMDUwYzZjOTFiNTFkZTNfSUQ6NzY5NDk1MjIxMDcxMDgxMDEzNl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

## Part 9 GAN：生成对抗网络 

和Diffusion Model 扩散模型一样，都在回答如何让网络生成新数据。

两个网络、一个损失、方向相反：从纳什均衡到极小极大博弈。

### 9\.1 纳什均衡：Nash Equilibrium

In game theory, the Nash equilibrium, is a set of strategies that players act out, with the property that no player benefits from changing their strategy\. Intuitively, if any given player were told the strategies of all their opponents, they still would choose to retain their original strategy\. 

纳什均衡来自博弈论，是一组策略集合：博弈里所有玩家选定策略之后，任何单独一个玩家单方面改变自己的策略，都不会获得更好的收益。这是 GAN 对抗训练的核心思想。

Nash showed that there is a Nash equilibrium for every finite game, a finite number of players in which each player can choose from finitely many pure strategies

纳什定理：任何有限博弈，一定存在纳什均衡。优先博弈是玩家数量有限，每个玩家可选的纯策略数量也是有限的。
When it reaches Nash Equilibrium, if any competitors change their current strategies, they will get a worse result\.

结论：达到纳什均衡后，任意竞争者单方面改变策略，结果会变差。

GAN 里，Generator 生成器、Discriminator 判别器，就是博弈里的两个玩家，训练目标就是到达纳什均衡。

第 62 页先补一段博弈论：GAN 的对抗训练，目标就是让两个网络走到纳什均衡。

### 9\.2 GAN Main Idea and Framework

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Nzc2MGI0YWYwYTJmNTIzNzllNTgzNTI1ZDQ4OTJlOTJfNjVkODIzZTk4MWU3N2Y2ODIxZjQxZGQ2MWQ4N2JhN2FfSUQ6NzY5NDk1MjIxMjAzMTkwMTIxNl8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWVhOTA0OTViYmMwZTNlYTFkOTBjM2VlYjkyY2M2OThfM2FhZjU2NjIyZWI3MTc0N2VmZjI2NjJkNjBmYzM1MmJfSUQ6NzY5NDk1MjIxMDMwODE0MDU3Nl8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

GAN 包含两个独立神经网络，对抗式同步训练：

1. Generator takes in random noise and returns a fake image\.

2. Discriminator takes in both real and fake images and returns probabilities with 1 representing authenticity and 0 fake

3. One neural network, called the generator, generates new data instances

4. One neural network, called the discriminator, evaluates them for authenticity; i\.e\. decides whether each image is real\.

|角色|输入|输出|目标|
|---|---|---|---|
|Generator（G）|random noise（随机噪声）|fake image（图中生成了一个手写的 8）|造出以假乱真的样本|
|Discriminator（D）|both real and fake images|probabilities：1 = 真，0 = 假|分辨真伪|

训练循环： 生成器造假图 → 判别器判断真假 → 两者互相迭代对抗，共同提升能力。

真实样本x：从真实数据集采样，送入判别器D，$D(x)$希望越接近 1 越好（识别为真）

噪声z输入生成器G，得到伪造样本$G(z)$送入判别器； 

D希望$D(G(z))$尽量接近 0（识别出这是假图）；

G希望$D(G(z))$尽量接近 1（欺骗 D，让 D 以为是真图）

D 和 G 玩极小极大对抗游戏，目标最终达到纳什均衡，联合训练得到强大的生成器和判别器

### 9\.3 极小极大博弈：Min\-Max Game

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGVkMmQ0OGYxYWU1MzM4ZWJjNWFlOGQ2MzM3ODI2OWFfM2JlNzZmMDhhMzNjMGIyNWQ4M2E1NGQ1ZGI4Y2JjOGFfSUQ6NzY5NDk1MjIxNDYwNjkwODk1NF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

损失函数：

$L = E_x[\log(D(x))] + E_z[\log(1-D(G(z)))]$ 

符号拆解：

1. $D(x)$：判别器评估真实数据x是真样本的概率

2. $E_x[\dots]$：在全部真实数据上求数学期望

3. $G(z)$：生成器根据噪声z输出伪造样本

4. $D(G(z))$：判别器评估生成器造的假样本是真样本的概率

5. $E_z[\dots]$：在全部随机噪声输入上求期望

博弈目标：

- 判别器 D：最大化这个 Loss，尽可能分清真假

- 生成器 G：最小化这个 Loss，尽可能让判别器分不清真假

minimax（极小极大）博弈：D 最大化损失，G 最小化损失，二者对抗。

### 9\.4 GAN 图像合成

GAN 能生成多个类别、逼真度较高的图像。



第 67 页回到粗版大纲 ·三条：Neural Networks / Deep Neural Networks / Overfitting and Underfitting——与第 2 页同一版本。位置在 GAN 之后、Overfitting and Underfitting 之前，标志进入全讲最后一块。

考点 · 能列举 GAN 的典型应用场景（图像合成 / 生成）；并知道它与扩散模型同属生成模型两条路线。

## Part 10  Overfitting and Underfitting：过拟合与欠拟合

属于机器学习基础问题，GAN 训练也同样会遇到过拟合问题。欠拟合、过拟合是机器学习算法的通用问题，不只在分类任务中出现，在回归任务中同样存在。

### 10\.1 Underfitting 欠拟合

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmMzNzY4YmZmMzU2MTNiOTEyNzY3NjNhNzBmZDI5YmVfNTkzMTdiYWJmMjk1YmYzNWNiZGE1OWQzNTlkODE0NDVfSUQ6NzY5NDk1MjIxMjAzMTkxNzYwMF8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

|左图|中图|右图|
|---|---|---|
|θ₀ \+ θ₁x|θ₀ \+ θ₁x \+ θ₂x²|θ₀ \+ θ₁x \+ θ₂x² \+ θ₃x³ \+ θ₄x⁴|
|High Bias（Underfitting）|Low Bias, Low Variance（Goodfitting）|High Variance（Overfitting）|
|一条直线，明显拟合不上|一条平缓抛物线，贴合趋势|一条蛇形曲线，穿过每个点|

模型拟合能力太弱，连训练集的数据规律都学不好。

特点：高偏差 High Bias，低方差 Low Variance

原因：模型太简单，假设过于简化，无法捕捉数据内在模式。

例子：用一条直线去拟合带曲线趋势的数据

理想模型：Low Bias \+ Low Variance，既能学到真实规律，又不会被噪声干扰（$\theta_0+\theta_1x+\theta_2x^2$）

### 10\.2 Overfitting 过拟合

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTQwZThmNTVjOGI5ZjA0MDQzNjYzNWY2ZWJiMzI3NjRfMDRmZTU5N2M0OWQ2M2VhYTYxOTg5NGU4OTEwODViYWZfSUQ6NzY5NDk1MjIxMjY2NTI0MTExNl8xNzkyNzQwMjQwOjE3OTI4MjY2NDBfVjM)

|概念|课件原话|中文|什么时候出现|
|---|---|---|---|
|Overfitting|fit the training set very well, but fail to generalize to new examples \(high variance\)|训练集拟合得很好，但泛化失败|特征太多（too many features）/ 模型太复杂|
|Bias|error due to overly simplistic assumptions in the learning algorithm|由假设过于简单带来的误差|模型太简单 ⇒ 欠拟合 ⇒ high bias|
|Variance|error due to the model’s sensitivity to fluctuations in the training data|由对训练数据波动过于敏感带来的误差|模型太复杂 ⇒ 过拟合 ⇒ high variance|

模型能力太强，把训练集里的噪声、随机波动也当成规律记住了（曲线）。

在训练集上效果极好，但是泛化能力差，在新的测试样本上表现很差 → 高方差 High Variance

原因：特征数量过多，模型复杂度过高，过度记住训练集的细节。

### 10\.3 Model Complexity 复杂度曲线

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzNmMTc2ZTQzMTVhYWQwNjYyMmMwOGNkNDZhNThiNzNfYWJjNTUwNDZjNDcwNWFmYTAyMGM2MTI4OWIzNGM5ODJfSUQ6NzY5NDk1MjIxMDcxMDc5Mzc1Ml8xNzkyNzQwMjQxOjE3OTI4MjY2NDFfVjM)

训练误差与测试误差画成两条曲线，给出诊断规则。

② 复杂度曲线：训练误差与测试误差（第 72 页）· Underfitting and Overfitting

|图中元素|内容|
|---|---|
|横轴|model complexity，分成 low / medium / high 三档|
|纵轴|prediction error \(1 − prediction accuracy\)|
|实线|Training data 训练误差|
|虚线|Test data 测试误差|
|标号 1 / 2 / 3|训练误差上的三个点，分别在 low / medium / high 复杂度|
|标号 4 / 5 / 6|测试误差上的三个点，分别在 low / medium / high 复杂度|

两条曲线之间的间距就是泛化误差。

训练误差高 \+ 测试误差高 ⇒ 欠拟合（high bias）；

训练误差很低 \+ 测试误差回升 ⇒ 过拟合（high variance）；

测试误差最低处 ⇒ 好模型。

### 10\.4 Ways to Address

欠拟合 = More data \+ More powerful model；加（加数据、加模型能力）

过拟合 = Feature Selection \+ Regularization。减或约束（减特征、压参数）

欠拟合

1. More data

2. A more powerful model\. e\.g\., Neural Networks, rather than simple linear regression

过拟合

|手段|做法|适用场景|
|---|---|---|
|Feature Selection（特征选择）|Manual selecting which features to keep \(by domain knowledge\) 手工挑，靠领域知识|Okay esp\. when some features are useless\.（有些特征完全没用时最合适）|
|Regularization（正则化）|Keep all features, but reduce their influence by giving smaller values to the parameter θᵢ 保留全部特征，但把 θᵢ 压小|Okay when many features, each of which contributes a bit to predicting y（特征很多、每个都贡献一点点时最合适）|



# 


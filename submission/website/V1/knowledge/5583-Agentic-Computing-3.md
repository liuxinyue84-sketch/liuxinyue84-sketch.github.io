# 5583 Agentic Computing3

# Lecture 8 智能体系统设计 Design of Agentic Systems

本讲围绕智能体系统（Agentic Systems）的设计展开，重点讨论如何从单一语言模型构建具有自主决策、工具调用、任务规划和反馈修正能力的智能体系统。

课程内容按照以下逻辑组织：

1. 智能体系统基础（Agentic System Foundations）：理解 AI Model、AI System、Agent 和 Multi\-Agent System 的区别，掌握智能体的组成及自主性程度。

2. 智能体工作流设计（Agentic Workflow Design）：理解顺序、并行、迭代和条件工作流，学习任务分解与组件选择。

3. 智能体推理与决策（Agentic Reasoning and Decision\-Making）：研究智能体如何利用感知、记忆、目标与约束选择行动。

4. 自反思与反馈优化（Self\-Reflection and Feedback）：理解内部反思、外部反馈及其在代码生成、SQL 查询等任务中的应用。

## Part 1 智能体系统基础 Agentic System Foundations

### 1\.1 从语言模型到智能体系统

人工智能应用可以按照系统能力与组织形式，区分为四个层次：

$\text{AI Model} \rightarrow \text{AI System} \rightarrow \text{Agent} \rightarrow \text{Multi-Agent System}$

从基础模型能力到自主行动、再到多智能体协作的系统演进

#### 1\.1\.1 四个层次

|**层次**|**核心定义**|**主要特征**|
|---|---|---|
|AI Model|提供基础计算与智能能力的模型|生成文本、理解信息、进行预测|
|AI System|将模型能力集成到应用程序中|包含模型、界面、数据及业务逻辑|
|Agent|能够围绕目标自主选择行动的系统|具有决策、规划、工具调用和反馈能力|
|Multi\-Agent System|由多个具有决策能力的智能体组成的系统|支持智能体之间的交互、分工与协作|

1. AI Model：基础模型

模型提供计算能力，但通常不直接负责完整的业务流程。例如，LLM 可以根据输入生成文本。

这一形式描述了单次模型调用，但并不包含外部工具、任务执行或环境反馈。

2. AI System：人工智能系统

AI System 将模型能力封装为能够完成实际任务的应用。例如，智能客服系统可能包含：LLM：理解用户问题并生成回复、数据库：保存用户信息与订单记录、API：查询物流状态、用户界面：展示交互结果。

因此，AI System 的重点是将多个组件组织为完整应用，而不一定具备自主规划能力。

3. Agent：智能体

Agent 不仅生成信息，还能够根据目标与环境状态决定下一步行动。

典型行为包括：判断是否需要检索信息、选择合适的外部工具、将复杂任务分解为多个步骤、根据执行结果调整后续行动、判断任务是否已经完成。

智能体的关键特征是 Goal\-directed Action（目标导向的行动）。

4. Multi\-Agent System：多智能体系统

多智能体系统由多个能够独立作出一定决策的智能体组成。不同智能体可以承担不同职责，例如：Research Agent：负责资料检索、Analysis Agent：负责信息分析、Writing Agent：负责内容生成、Review Agent：负责质量检查。

多个智能体通过通信、任务分配和结果整合共同完成复杂任务。需要注意，增加智能体数量不一定提高系统性能。多智能体协作也可能引入通信开销、协调冲突及错误传播。

### 1\.2 智能体的核心组成 Components of an Agent

将智能体能力划分为核心能力（Core Capabilities）与附加能力（Additional Capabilities）。

### 1\.2\.1 核心能力

|**核心能力**|**英文**|**作用**|
|---|---|---|
|感知|Perception|获取并理解环境或用户输入|
|自主行动|Agency|根据目标选择并执行行动|
|推理与规划|Reasoning and Planning|分析当前状态并组织行动步骤|
|记忆|Memory|保存和利用历史信息|
|反馈与学习|Feedback / Learning|根据执行结果调整行为|

1. Perception：感知

感知是智能体获取环境信息的过程。

输入可以来自用户文本、文件、数据库、搜索结果或外部系统。

感知不仅意味着接收数据，还包括从输入中提取与当前任务相关的信息。

2. Agency：自主行动

Agency 指智能体根据目标采取行动的能力。

与单纯生成文本不同，具有自主行动能力的智能体可以决定是否调用工具、执行操作或进入下一阶段。

3. Reasoning and Planning：推理与规划

推理用于判断当前状态和行动选择，规划用于组织实现目标所需的步骤。

两者密切相关，但侧重点不同：

- Reasoning：当前应该做什么，以及为什么。

- Planning：完成目标需要哪些步骤，以及这些步骤如何安排。

4. Memory：记忆

记忆使智能体能够利用先前的信息，而不是在每次调用时重新开始。

可以进一步区分为：

- 短期记忆：当前任务的上下文、中间结果和工具反馈。

- 长期记忆：历史经验、用户偏好或持久化知识。

这种区分是对课件内容的扩展，具体实现可能采用上下文窗口、数据库或向量检索等方式。

5. Feedback / Learning：反馈与学习

反馈机制使智能体能够判断当前行动是否达到预期。

例如，代码执行失败后，智能体可以读取错误信息、修改代码并重新执行。

这里的学习不一定意味着更新模型参数，也可以表现为任务执行过程中的策略调整。

#### 1\.2\.2 附加能力

|**附加能力**|**英文**|**作用**|
|---|---|---|
|多模态|Multimodality|处理文本、图像、音频等不同模态|
|通信|Communication|与用户、工具或其他智能体交换信息|
|具身性|Embodiment|通过物理或虚拟环境中的行动与外界交互|

具身智能体（Embodied Agent）可以通过传感器感知环境，并通过执行器采取行动。例如，机器人能够观察物体位置、规划移动路径并执行抓取操作。

#### 1\.2\.3 智能体的基本运行循环

综合上述能力，可以将智能体抽象为：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mjc1NWE2YWZjOTkyOGZhMGJiYWQwMGVkZjM3NGMxM2VfMWU4YWM0MDZmNzI2YjQxYTZkZDlhYTdiZTE4NjQ1ODNfSUQ6NzY5OTA0MjQwMjg1Nzg5NzUxMF8xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)

1. Perception 获取用户输入与环境状态

2. Reasoning \& Planning 结合目标、约束与记忆制定行动

3. Action 生成回复或调用外部工具

4. Feedback \& Memory Update 检查结果并更新任务状态

未完成时继续循环；满足完成条件后终止。这一循环是智能体区别于单次模型调用的重要特征。

### 1\.3 智能体自主性程度 Degrees of Agent Autonomy

#### 1\.3\.1 自主性是连续谱

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTZhNTRmZDRiYmRhNWExOTZmNjY3NzIzZjI2NGExZWNfYzMxODM4ODM4MmMzNzIzODJiODEwOWM1NTU5Y2VkMGNfSUQ6NzY5OTA0MjYzMTE5NzI4MTgyN18xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTUyMjFjN2NlMDNiMmE4NTk1Zjc0N2IyYTMxZWMwMTRfZTExZmJmZTNmNTAxNDUwMWE4OTA4YzgzYTg4YmZlOTJfSUQ6NzY5OTA0MjY2MTAxMjg4NTAyOF8xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)

与其争论某个系统是否属于真正的 Agent，不如承认系统存在不同程度的 Agentic Behavior（智能体行为）。因此，智能体不应简单地被划分为“是 Agent”或“不是 Agent”，而应根据其自主决策程度进行分析。

低自主性：固定流程、固定工具、有限决策

半自主性：能够选择行动，但工具集合预定义

高自主性：自主规划较多步骤，可能动态创建工具

#### 1\.3\.2 三种自主性水平

|**维度**|**低自主性**|**半自主性**|**高自主性**|
|---|---|---|---|
|工作流程|所有步骤预先确定|部分步骤由模型决定|多数步骤可自主决定|
|工具使用|工具调用硬编码|从预定义工具中选择|可能动态创建新工具|
|决策能力|主要局限于文本生成|能够选择部分行动|能够自主规划与调整|
|灵活性|较低|中等|较高|
|可预测性|通常较高|中等|相对较低|

高自主性系统具有更大的灵活性，但也需要更严格的权限控制、执行监测与结果验证。

#### 1\.3\.3 自主性系统比较及原则

方案 A：低自主性系统

$\text{User Task} \rightarrow \text{LLM} \rightarrow \text{Web Search} \rightarrow \text{Web Fetch} \rightarrow \text{LLM} \rightarrow \text{Essay}$

1. LLM 生成搜索查询。

2. 系统执行网页搜索。

3. 系统抓取网页内容。

4. LLM 根据资料撰写文章。

流程基本预先确定，LLM 对整体流程的修改空间有限。

方案 B：更高自主性系统

$\text{Task} \rightarrow \text{LLM} \rightarrow \text{Research} \rightarrow \text{LLM} \rightarrow \text{Fetch Sources} \rightarrow \text{Draft} \rightarrow \text{Reflect} \rightarrow \text{Revise}$

该系统能够从预定义工具集合中选择工具，包括：Web Search、News、arXiv、Web Fetch、PDF to Text

模型先决定如何搜索，再选择和获取资料，随后生成初稿并进行反思修改。

还明确包含获取五个最佳来源（Fetch 5 Best Sources）的步骤。

两种系统的主要区别不是使用了多少个模型，而是模型对行动选择、工具使用和任务流程具有多大控制权。

自主性设计原则

应根据任务特点选择适当的自主性程度。

对于流程明确、风险较高且需要严格审计的任务，固定工作流可能更合适；对于开放性研究、探索性任务或动态环境，较高自主性可能提供更强的适应能力。

因此，系统设计目标不是最大化自主性，而是在灵活性、可靠性、成本与可控性之间取得平衡。

## Part 2 智能体工作流设计 Agentic Workflow Design

智能体工作流是指将模型推理、工具调用、条件判断和反馈修正组织为完整任务执行过程的方法。

合理的工作流设计可以提高任务完成质量、执行效率和系统可维护性。

### 2\.1 四种基本工作流模式

四种常见模式：Sequential、Parallel、Iterative 和 Conditional。

|**模式**|**核心机制**|**主要优势**|**典型场景**|
|---|---|---|---|
|Sequential|依次执行|依赖关系清晰|多阶段数据处理|
|Parallel|独立任务同时执行|缩短执行时间|多来源检索|
|Iterative|根据反馈反复修正|改善输出质量|代码调试、文章修改|
|Conditional|根据条件选择路径|提高流程灵活性|RAG 路由、异常处理|

#### 2\.1\.1 顺序工作流 Sequential Workflow

顺序工作流要求各步骤依次执行，后续步骤通常依赖前一步的输出。

例如： $\text{Extract Information} \rightarrow \text{Analyze} \rightarrow \text{Generate Report}$

适用于存在明确依赖关系的任务。若三个步骤执行时间分别为 $T_A,T_B,T_C$，忽略额外调度开销，则：

$T_{\text{sequential}}=T_A+T_B+T_C$

#### 2\.1\.2 并行工作流 Parallel Workflow

并行工作流将能够独立执行的任务分配到不同分支。

例如，研究报告可以同时执行多个独立的信息检索任务，再将检索结果整合为报告。

在任务真正独立、资源允许且忽略调度开销的情况下： $T_{\text{parallel}}\approx\max(T_1,T_2,\ldots,T_n)$

相较于串行执行： $T_{\text{sequential}}=\sum_{i=1}^{n}T_i $，并行执行能够降低等待时间。

但如果任务存在数据依赖、资源冲突或副作用，就不能简单地并行执行。

#### 2\.1\.3 迭代工作流 Iterative Workflow

迭代工作流通过反复检查与修正来改善结果。

$\text{Draft} \rightarrow \text{Review} \rightarrow \begin{cases} \text{Done}, & \text{通过检查}\\ \text{Revise}\rightarrow\text{Review}, & \text{未通过} \end{cases}$

典型应用包括：文章撰写与修改、代码生成与调试、数据查询与错误修正、复杂任务的多轮优化。

迭代工作流的核心是利用反馈改善输出，而不是仅增加模型调用次数。

#### 2\.1\.4 条件工作流 Conditional Workflow

条件工作流根据当前状态或判断结果选择不同执行路径。

$\text{Check} \rightarrow \begin{cases} \text{Route A}, & C=\text{True}\\ \text{Route B}, & C=\text{False} \end{cases}$

例如：

- 如果已有知识足以回答问题，则直接生成答案。

- 如果需要外部证据，则先进行检索。

条件工作流可以避免不必要的工具调用，也可以根据任务类型选择不同的处理方式。

### 2\.2 智能体工作流的主要优势

三项关键优势：

1. 潜在的性能提升（Potentially Better Performance）

复杂任务可以经过多轮推理、检查和修改，而不必依赖单次模型生成。

例如： $\text{Draft} \rightarrow \text{Review} \rightarrow \text{Revise} $

但多轮执行并不保证性能一定提升。如果反馈质量较差，迭代也可能引入新的错误。

2. 通过并行执行提高效率（Faster Execution Through Parallel Work）

当多个任务相互独立时，可以同时执行，从而降低整体延迟。

例如，三个检索任务可以并行运行，完成后再整合结果。

3. 模块化（Modularity）

模块化设计使系统能够独立更新工具和模型。

例如：替换搜索 API、增加数据库查询工具、将原有 LLM 替换为其他模型、单独优化评估模块。

模块化能够降低系统维护与扩展的复杂度。

### 2\.3 任务分解与组件选择 Task Decomposition

#### 2\.3\.1 任务分解的基本原则

任务分解是将复杂任务划分为能够由模型、工具或二者组合完成的子任务。

两个核心问题：

1. 一个 LLM、一个工具，或二者组合能否完成当前步骤？

2. 如果不能，是否需要进一步分解，或引入人工参与（Human\-in\-the\-Loop）？

一个合理的子任务应具有明确的输入、输出和完成标准。任务分解过粗可能导致模型无法稳定完成任务；分解过细则可能增加调用次数、延迟和系统复杂度。

#### 2\.3\.2 客户邮件处理案例

课件中的客户 Susan Jones 发送了一封投诉邮件：客户订购了蓝色 KitchenPro 搅拌机，订单号为 `#8847`，但实际收到的是烤面包机。客户希望在女儿周末生日派对前收到正确商品。系统需要处理三个子任务。

第一步：信息提取。从邮件中提取结构化信息；

第二步：订单查询。模型根据订单号调用数据库工具，核实订单记录与实际履约状态；

第三步：生成回复并执行操作。模型根据核实的信息撰写回复，再通过邮件工具发送。

需要注意，课件描述的是“撰写并发送回复”的流程，并未说明系统已经确认能够补发商品。因此，不应在缺少订单查询结果时擅自承诺具体补救措施。

在实际业务系统中，涉及退款、补发或其他具有业务后果的操作时，可以增加权限校验或人工审批。

### 2\.4 智能体系统的基本构建模块 Building Blocks

将可用组件分为 Models 和 Tools 两大类。

|**类别**|**组件**|**典型用途**|
|---|---|---|
|Models|LLMs|文本生成、工具调用、信息提取|
|Models|Other AI Modules|文本转语音、图像分析|
|Tools|APIs|网页搜索、实时数据获取、发送邮件、日历查询|
|Tools|Information Retrieval|数据库查询、文档检索、RAG|
|Tools|Code Execution|基础计算、数据分析|

模型主要负责语义理解、推理、决策及内容生成。

工具主要负责访问外部资源、执行确定性操作或与实际系统交互。

例如，查询订单时：

- LLM 负责理解用户请求并生成查询参数。

- 数据库工具负责执行查询并返回真实记录。

- LLM 再根据返回结果组织后续行动。

选择组件时应考虑：任务是否需要实时信息、是否涉及精确计算、是否需要读取或修改外部数据、是否要求结果可验证、是否具有安全或权限限制。

例如，涉及数值计算时应优先使用代码执行；涉及当前订单状态时应调用数据库，而不能仅依赖模型预训练知识。

## Part 3 智能体推理与决策 Agentic Reasoning and Decision\-Making

### 3\.1 推理与决策的基本机制

智能体推理：智能体利用可用信息，决定下一步应该采取什么行动，以实现目标。

推理过程依赖三个主要信息来源：

1. Perception / Grounding：当前感知与外部事实。

2. Memory：历史信息与已有状态。

3. Goals / Constraints：任务目标与约束条件。

这些信息共同支持智能体的决策与行动。

可以抽象为： $a_t=\pi(o_t,m_t,g,c)$

$a_t$：时刻 $t$ 选择的行动、$o_t$：当前观测信息、$m_t$：记忆或历史状态、$g$：任务目标、$c$：约束条件、$\pi$：智能体的决策策略。

#### 3\.1\.1 推理的主要作用

推理主要完成三项任务：

1. 理解当前状态与任务目标

识别当前已经掌握的信息、尚未完成的工作以及最终目标。

2. 在多个候选行动之间作出选择

例如，面对用户查询，智能体可能选择：直接回答、调用搜索工具、查询数据库、请求补充信息。

3. 评估权衡、证据与约束

行动选择不仅取决于能否完成任务，还应考虑：证据是否充分、工具是否可用、时间与计算成本、安全性与权限、用户提出的约束条件。

#### 3\.1\.2 推理的三个主要应用场景

|**场景**|**英文**|**作用**|
|---|---|---|
|反思|Reflection|诊断问题并修正输出|
|工具使用|Tool Use|决定何时以及如何调用工具|
|规划|Planning|组织多步骤行动与依赖关系|

这三种能力相互联系。

规划决定整体任务结构，工具使用负责执行具体操作，反思则利用结果反馈修正执行过程。

## Part 4 自反思与反馈优化 Self\-Reflection and Feedback

自反思（Self\-Reflection）是指智能体对已有输出进行检查，识别其中的问题，并根据评价结果生成改进版本。

两种反思方式：基于模型评价的内部反思、基于工具执行结果的外部反馈反思。

### 4\.1 基于模型评价的自反思

#### 4\.1\.1 基本流程

$\text{Task} \rightarrow \text{LLM Draft} \rightarrow \text{Code V1} \rightarrow \text{LLM Review} \rightarrow \text{Code V2}$

首先，模型根据任务生成初始代码；随后，模型检查代码是否符合用户要求，并生成修订版本。

例如：def do\_task\(args\):    \.\.\.

经过反思后生成：def do\_task\_v2\(args\):    \.\.\.

其中，第二版代码应根据审查结果修正第一版存在的问题，而不只是改变函数名称。

#### 4\.1\.2 反思模型的配置

Reviewer 可以使用不同的 LLM，例如专门用于推理的模型。因此，生成器与审查器不一定必须是同一个模型。

可以采用： $y_1=G(x) $，$f=R(x,y_1)$，$y_2=G(x,y_1,f)$

$G$：生成模型、$R$：审查模型、$f$：反馈信息、$y_1$：初始输出、$y_2$：修订输出。

使用不同模型可能提供互补的评价能力，但并不能保证审查结果一定正确。

### 4\.2 基于外部反馈的自反思

#### 4\.2\.1 基本原理

内部反思主要依赖模型对已有结果的判断，而外部反馈利用实际执行结果指导修改。

课件展示的流程为： $\text{Task} \rightarrow \text{Draft} \rightarrow \text{Code V1} \rightarrow \text{Execute} \rightarrow \text{Output / Errors} \rightarrow \text{Revise} \rightarrow \text{Code V2}$

与内部反思相比，外部反馈提供了来自执行环境的可观察信息。

例如，程序执行后返回：SyntaxError: unterminated string literal \(detected at line 1\)

该错误表明代码中存在未正确结束的字符串字面量。

模型可以利用错误类型及行号定位问题，修改代码并重新执行。

#### 4\.2\.2 内部反思与外部反馈的区别

|**维度**|**内部反思**|**外部反馈**|
|---|---|---|
|反馈来源|模型自身或审查模型|代码解释器、测试工具、数据库等|
|主要依据|语义理解、规则与评价标准|实际输出、错误信息、测试结果|
|优势|不一定需要执行环境|具有更直接的可观察依据|
|局限|可能重复原有错误|反馈质量取决于测试与执行条件|
|典型场景|文本审查、需求检查|代码调试、SQL 验证|

外部反馈的价值在于将模型的主观判断与实际执行结果结合起来。

但程序能够正常执行，并不意味着逻辑一定正确。因此，除检查运行错误外，还需要测试输出是否符合预期。

### 4\.3 反思提示的设计原则 Reflection Prompt Design

课件指出，一个有效的反思提示应明确三个要素：

1. Review Action：需要执行什么审查操作。

2. Review Criteria：依据哪些标准进行检查。

3. Revised Output：最终需要输出什么修订结果。

**案例一：域名筛选**

课件要求模型检查之前生成的域名建议。

评价标准包括：是否容易发音、是否有利于口头传播、是否可能在其他语言中具有负面含义。

最终只输出符合标准的域名候选列表。

该案例说明，反思不一定意味着修改已有文本，也可以通过评价与筛选减少不合格候选项。

**案例二：邮件优化**

课件要求模型审查邮件初稿。

评价标准包括：语气是否专业、是否存在粗鲁或不敏感的表达、事实是否准确、日期是否准确、承诺是否准确。

审查完成后，模型应输出下一版本的完整邮件。

这一案例说明，反思提示应针对具体任务设置明确标准，而不能仅使用“改进一下”之类的模糊要求。

### 4\.4 反思机制的实现与评估 Implementing and Evaluating Reflection

#### 4\.4\.1 SQL 查询修正流程

课件以销售数据查询为例，说明如何通过反思提高查询准确性。

用户问题为：2025 年 5 月共售出了多少件商品？

系统执行流程：User Question 查询 2025 年 5 月商品销量

LLM：Generate SQL V1 生成初始 SQL 查询

LLM：Review V1 and Write SQL V2 审查并修正查询

Execute SQL V2 执行修订后的 SQL

LLM：Generate Final Answer 根据查询结果回答

课件展示的是先审查 SQL V1，再执行 SQL V2 的流程；并未展示 V1 的具体 SQL 语句或错误原因，因此不能据此断定第一版究竟遗漏了哪个字段或筛选条件。

#### 4\.4\.2 反思前后的实验结果

|**测试问题**|**Ground Truth**|**No Reflection**|**With Reflection**|
|---|---|---|---|
|2025 年 5 月售出多少件商品？|1201|980|1201|
|最昂贵的商品是什么？|Airflow sneaker|Airflow sneaker|Airflow sneaker|
|经营多少种款式？|14|14|14|

- Ground Truth：标准答案。

- No Reflection：未使用反思机制的结果。

- With Reflection：使用反思机制后的结果。

在第一个问题中，未使用反思机制时得到 980，与标准答案相差： $E_{\text{before}}=|980-1201|=221$

使用反思机制后： $E_{\text{after}}=|1201-1201|=0 $

若计算相对误差： $\text{Relative Error} = \frac{|980-1201|}{1201}\times100\% \approx18.40\%$

反思使该示例中的相对误差从约 $18.40\%$ 降至 $0\%$，另外两个问题在反思前后均正确。

因此，在课件展示的三个测试问题中： $\text{Accuracy}_{\text{before}}=\frac23\approx66.67\%$， $ \text{Accuracy}_{\text{after}}=\frac33=100\%$

这只是三个示例构成的小规模比较，不能直接推断反思机制在所有任务中的整体准确率。

### 4\.4\.3 反思机制的适用条件与局限

反思通常更适合以下任务：存在明确评价标准、可以获取外部反馈、允许多次生成与修改、错误能够通过审查或测试被发现。例如，代码生成、SQL 查询、结构化数据处理及文档审查都可以采用反思机制。

但反思也具有局限：

1. 增加计算与调用成本

反思通常需要额外的模型调用，甚至多次工具执行。

若初始生成成本为 $C_g$，审查成本为 $C_r$，执行验证成本为 $C_e$，则： $C_{\text{total}}=C_g+C_r+C_e$

2. 不保证每次修改都正确

审查模型可能遗漏错误，也可能错误地修改原本正确的内容。

3. 需要合理的终止条件

如果系统持续反思而没有明确停止标准，可能造成无效循环。

可以设置：最大迭代次数、评价分数阈值、测试通过条件、成本或时间预算。

例如，令第 $k$ 次修订结果的质量分数为 $Q_k$，当： $Q_k\geq\tau$或达到最大迭代次数 $K_{\max}$ 时终止。

其中，$\tau$ 为预设质量阈值。

## Part 5 Agentic RAG 与智能体工作流的综合应用

本讲开头回顾了 Agentic RAG System 与 RAG Workflow。它们可以作为前述智能体概念的具体应用。

### 5\.1 RAG 的基本工作流

RAG（Retrieval\-Augmented Generation）通过检索外部知识，为语言模型生成答案提供依据。

课件将完整流程划分为两个阶段。

#### 5\.1\.1 离线准备 Offline Preparation

离线阶段负责构建可检索知识库。

主要步骤包括： $\text{Raw Documents} \rightarrow \text{Preprocessing} \rightarrow \text{Chunking} \rightarrow \text{Embedding / Indexing} \rightarrow \text{Knowledge Base} $

1. 原始数据准备

知识来源可以包括：PDF 文档、图像、视频、其他多模态数据。

多模态 RAG 可以通过适当的模型或预处理方法，将不同模态的信息转换为可检索表示。

2. 文档预处理

清理与规范化文档内容，使其适合后续检索。

3. 文档分块（Chunking）

课件列举三种方式：Fixed\-size Chunking：固定长度分块、Semantic Chunking：语义分块、Context\-aware Chunking：上下文感知分块。分块策略影响检索单元的语义完整性和相关性。

4. 向量化与索引

通过 Embedding 将文档片段转换为向量，并建立索引。ANN 与 HNSW 等近似最近邻检索技术能够支持大规模向量搜索。

#### 5\.1\.2 在线推理 Online Inference

在线阶段从用户查询开始，经过检索、证据选择和答案生成。

$ \text{Query} \rightarrow \text{Query Processing} \rightarrow \text{Retriever} \rightarrow \text{Candidate Documents} \rightarrow \text{Final Evidence} \rightarrow \text{Generation} \rightarrow \text{Response} $

关键步骤包括：

1. 查询处理（Query Processing）

可以采用查询解析、查询改写或可选的 HyDE 方法改善检索输入。

2. 检索（Retrieval）

课件列举的检索方法包括：Bi\-encoder：双编码器检索、ColBERT：基于后期交互的检索方法、ANN / HNSW：近似最近邻检索。

3. 证据筛选（Evidence Selection）

从候选文档中选择与问题最相关的证据，减少无关信息进入生成阶段。

4. 增强提示与生成（Augmented Prompt \& Generation）

将用户问题与检索证据共同提供给模型，生成有依据的回答。Self\-RAG 与 Agentic Workflow 可以参与检索和生成过程，通过判断是否需要更多证据来调整系统行为。

### 5\.2 Agentic RAG 的决策与反馈机制

普通 RAG 往往采用相对固定的检索与生成流程，而 Agentic RAG 可以增加路由、证据评估与迭代检索。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGI4Yzc0NjA5YzMyNDFiZDNlNzA3NTVlZmY0MWU1ZTdfYjdjMTU1YTI4OWI4MWI0MDY4YjhlNWZjZWYyNWMyOWJfSUQ6NzY5OTA2MDA1NTg3NDIyNzc0OF8xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)

其关键在于三个决策点。

1. 是否需要检索：Router LLM 判断当前问题能否直接回答，还是需要外部知识。

2. 检索证据是否充分：Evidence Evaluation 模块判断检索结果能否支持回答。如果证据不足，则重新检索。

3. 是否能够生成有依据的答案：当证据充分时，模型生成答案并引用相应来源。

这体现了智能体工作流中的条件分支与迭代反馈。

### 5\.3 RAG 系统的主要优化方向

不同技术对应的优化目标：

|技术|主要优化目标|
|---|---|
|Chunking|提高检索相关性|
|Bi\-encoder / ColBERT|提高匹配质量|
|Query Rewriting / Parsing|改善搜索输入|
|Multimodal RAG|支持更丰富的证据类型|
|ANN / HNSW|提高大规模检索速度|
|Self\-RAG|增强自适应控制与可靠性|
|Evaluation / Security|提高鲁棒性与部署准备程度|

这些技术并非互相替代，而是分别作用于数据准备、检索、证据选择、生成控制与系统保障等不同环节。

## Part 6 智能体的工具调用与动态决策 Tool Use and ReAct

前文已经介绍智能体的基本组成、工作流设计、推理与决策机制，以及自反思能力。本部分进一步讨论智能体如何选择和执行工具、如何根据外部反馈动态调整决策，以及如何通过代码执行扩展智能体的能力。

### 6\.1 工具调用的决策机制 Tool\-Use Decision Making

#### 6\.1\.1 工具可用性与工具必要性

智能体能够访问某个工具，并不意味着每次任务都需要调用该工具。

Having access to a tool doesn't mean the agent always needs to use it\.

工具调用涉及两个不同的问题：

1. Tool Availability（工具可用性）：系统提供了哪些工具？

2. Tool Necessity（工具必要性）：当前任务是否需要使用某个工具？

例如，系统提供 `get_current_time` 工具时：

|**用户问题**|**是否调用工具**|**原因**|
|---|---|---|
|What time is it?|是|当前时间属于动态外部信息|
|How much caffeine is in green tea?|通常不需要|可以利用已有知识给出一般性估计|

对于第一个问题，执行流程为： $\text{Query} \rightarrow \text{LLM} \rightarrow \texttt{get\_current\_time} \rightarrow \text{Tool Result} \rightarrow \text{LLM} \rightarrow \text{Answer} $

课件中的工具返回 `15:20:45`，模型将其整理为 `It's 3:20 p.m.`对于第二个问题，模型可以直接回答：一杯绿茶通常含有约 $25\sim50$ mg 咖啡因。具体含量取决于茶叶种类、冲泡时间和用量。

这说明工具调用是智能体根据任务需求作出的独立决策，而不是固定执行步骤。

#### 5\.1\.2 工具选择的判断依据

工具选择通常需要考虑以下因素：

- 信息时效性：是否需要当前时间、实时价格或最新记录。

- 外部依赖：是否需要访问数据库、文件或其他系统。

- 计算复杂度：是否需要精确计算或程序执行。

- 知识充分性：模型已有信息是否足以支持回答。

- 执行必要性：任务是否要求实际操作，而非仅生成文本。

可以将工具调用决策抽象为： $a_t=\pi(q_t,s_t,\mathcal{T})$

$q_t$：当前任务或查询；$s_t$：当前系统状态；$\mathcal{T}$：可用工具集合；$a_t$：选择的行动，包括调用工具或直接回答。

### 5\.2 基于代码的工具调用 Code\-Based Tool Use

工具可以通过普通编程函数定义，再向 LLM 提供其名称、功能描述和参数信息。

使用 Python 的 `datetime` 模块定义时间查询工具

- `datetime.now()`：获取运行环境的当前本地时间。

- `strftime("%H:%M:%S")`：将时间格式化为字符串。

- Docstring：描述函数的用途，帮助模型理解工具能力。

随后，课件使用 `aisuite` 将工具提供给模型：在该示例中，`aisuite` 可以根据 Python 函数信息生成模型可理解的工具描述，使模型能够判断是否调用 `get_current_time`。

需要区分两个层次：模型负责决定调用什么工具，运行环境负责真正执行工具。

因此： $\text{Tool Calling} = \text{Tool Selection} + \text{Argument Generation} + \text{Tool Execution} + \text{Result Processing} $

工具执行通常需要由运行时程序完成。模型本身生成工具调用请求，并不等于已经执行相应操作。

### 5\.3 工具之间的依赖关系 Dependencies Between Tools

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjRkNzI5OTE4MTlmMzJhNzQyZTE3MzRiNGY3OWFjODNfMzY1OWY3NTc5ODBmZDgxYmVmYjg0MGIzYmU4YzViYmZfSUQ6NzY5OTA2MzcwNDA1NDY0ODM1NV8xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)

复杂任务往往需要连续调用多个工具，而后续调用可能依赖前一次调用的结果。

**日历预约案例**

用户请求：Find a free slot on Thursday in my calendar and make an appointment with Alice\.

系统提供三个工具：`check_calendar, make_appointment, delete_appointment`

$ \text{User Request} \rightarrow \texttt{check\_calendar} \rightarrow \text{Available Slots} \rightarrow \texttt{make\_appointment} \rightarrow \text{Confirmation}$

1. LLM 选择 `check_calendar`。

2. 工具返回周四 `15:00`、`16:00`、`18:00` 可用。

3. LLM 选择 `make_appointment`。

4. 工具返回预约创建成功。

5. LLM 确认预约时间为周四 `15:00`。

**数据依赖与执行顺序**

预约工具需要使用日历查询得到的可用时间，因此： $\texttt{check\_calendar} \prec \texttt{make\_appointment}$

其中，$\prec$ 表示前置依赖关系。

类似地，只有预约工具确认成功后，系统才能向用户报告预约已经完成。

因此： $\text{Successful Booking} \prec \text{Success Confirmation} $

这一案例说明：工具执行顺序应由数据依赖与实际执行结果决定，而不能仅根据预先生成的步骤机械执行。

### 5\.4 ReAct：推理与行动的协同 Reasoning and Acting

ReAct 是一种将推理、行动和环境观察结合起来的智能体执行方法。

**ReAct 包含三个核心环节：**

Reason: 分析当前状态并选择下一步行动

Act: 调用工具或执行操作

Observe: 读取工具返回结果或环境反馈

利用新观察更新状态，继续下一轮推理

在时刻 $t$，智能体根据当前状态选择行动： $
a_t=\pi(s_t)$

执行行动后，环境返回观察： $
o_{t+1}=\operatorname{Execute}(a_t)$

系统利用观察更新状态： $s_{t+1}=\operatorname{Update}(s_t,a_t,o_{t+1})
$

随后根据更新后的状态决定下一步行动： $a_{t+1}=\pi(s_{t+1})$

智能体的决策不是一次性完成，而是能够随着新信息的出现不断调整。

**Tool Calling、ReAct 与 Reflection 的区别**

|**概念**|**主要作用**|**核心问题**|
|---|---|---|
|Tool Calling|提供执行外部行动的接口|如何调用工具？|
|ReAct|结合推理、行动与观察|如何根据新信息调整下一步行动？|
|Reflection|检查并修正已有结果|如何发现和纠正错误？|

三者并不互斥。ReAct 可以使用工具调用执行行动，也可以在循环内部加入 Reflection 来检查中间结果。

**ReAct 与其他提示方法的比较**

引用 ReAct 论文中的 HotpotQA 示例，对比四种方法：

|**方法**|**主要特征**|**局限**|
|---|---|---|
|Standard|直接生成答案|缺少显式推理与外部验证|
|CoT（Reason Only）|通过多步推理生成答案|可能基于错误知识持续推理|
|Act\-Only|调用工具获取信息|缺少明确的推理指导|
|ReAct（Reason \+ Act）|交替进行推理、工具调用和观察|需要管理循环、工具成本与终止条件|

示例问题：除了 Apple Remote 之外，最初设计用于交互的程序还可以通过什么设备控制？

课件中的 ReAct 示例通过搜索逐步发现：Apple Remote 与 Front Row 有关、Front Row 是 Apple 的媒体中心软件、Front Row 也可以通过键盘功能键控制。

最终得到正确答案：Keyboard function keys（键盘功能键）。

这一案例体现了 ReAct 的优势：通过外部检索纠正不完整或错误的初始判断。

### 5\.5 为什么需要协同推理与行动？

新证据可以改变下一步行动

课件继续使用日历预约案例，展示了环境状态可能发生变化。

初次查询显示 `15:00` 可用，但预约执行时该时间已被占用。

因此，系统不能继续按照原计划执行，而应根据错误反馈重新查询并选择其他时间。

其决策过程为： $\text{Plan} \rightarrow \text{Act} \rightarrow \text{Observe Conflict} \rightarrow \text{Replan} \rightarrow \text{Act Again}$

这也是 ReAct 相较于固定工作流的重要优势：能够处理动态环境中的执行失败与状态变化。

新证据可以改变最终答案

以校园 AI 使用政策为例。

任务：Write an evidence\-backed summary of the campus rules on AI use\.

执行过程分为三个阶段：

Search：初步检索，搜索结果声称学校允许使用 AI。

Read：阅读权威来源，进一步阅读官方页面后发现，允许使用 AI 存在附加条件：必须遵守具体作业规定。

Update：更新答案，最终回答应缩小原有结论的适用范围，明确引用官方条件，并在缺少具体作业规则时建议用户向相关负责人确认。

这一案例说明，ReAct 不仅可以改变工具调用顺序，也可以根据新证据修正最终结论。

### 5\.6 ReAct 的最小实现与终止机制

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjE4YzAxNWMzMTIyODEzM2QyN2JiYmQ1YTE2MzE2MTFfYjVhODNmOTVkZTliYTgwODZlNWRjMWE3YzdiMTFlZWFfSUQ6NzY5OTA2Njk2NTczMDM4MTM0MV8xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)

有界执行循环 Bounded Loop

**ReAct 的三种终止结果**

每次循环都会消耗时间，也可能产生新的外部影响，因此必须设置停止规则。

1. Finish：正常完成

当任务成功条件满足，且结果具有充分证据支持时，终止。

2. Recover：有限恢复

当出现暂时性错误时，可以在固定预算内重试。

例如：网络请求暂时失败、数据库连接超时、日历预约发生时间冲突。

3. Escalate or Stop：升级或停止

当出现以下情况时，应停止自动执行：缺少必要权限、证据不足、已耗尽执行预算、达到最大迭代次数。

可以定义： $N_{\text{steps}}\leq N_{\max}$以及 $C_{\text{total}}\leq C_{\max}$

其中，$N_{\max}$ 是最大执行步数，$C_{\max}$ 是允许的最大执行成本。

需要特别注意，达到步数上限并不意味着任务已经成功。系统应明确报告未完成状态，而不是生成缺乏依据的成功结论。

### 5\.7 代码生成与执行能力 Code Generation and Execution

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGNmZjNkZmVkNGQ3YWZkN2FkZWVlNTdiZjYxYzlhMTNfMWM2M2RmYWQwYTA5ZGZiYzIwZTdlMjdlZjZhODdlN2JfSUQ6NzY5OTA2NzAyMTk2NzU3NjYxM18xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)

#### 5\.7\.1 通过代码执行扩展模型能力

LLM 可以生成代码，再交由外部运行环境执行。

课件以计算 $\sqrt{2}$ 为例： $ \sqrt{2}\approx1.4142135623730951$

系统提示要求模型将 Python 代码放入特定标签：

Write code to solve the user's query\.
Return your answer as Python code delimited
with \<execute\_python\> and \</execute\_python\> tags\.

模型生成：import mathprint\(math\.sqrt\(2\)\)

执行结果：1\.4142135623730951

模型读取执行结果后，生成自然语言回答。

整体流程为： $ \text{Question} \rightarrow \text{LLM Generates Code} \rightarrow \text{Execute Code} \rightarrow \text{Result} \rightarrow \text{LLM Answer}$

与直接依赖模型生成数值相比，代码执行可以为确定性计算提供更可靠的结果。

#### 5\.7\.2 生成代码的安全执行

直接执行 LLM 生成的代码可能产生严重风险。例如，错误生成的删除命令可能删除项目目录中的 Python 文件。因此，代码执行需要受控环境。

Sandbox（沙箱） 是一种隔离执行机制，用于限制代码可以访问的文件、资源和系统操作。

两个相关工具：Docker：容器化运行环境、E2B：面向代码执行的沙箱服务。

需要注意，Docker 容器并不天然等于安全沙箱。安全性还取决于实际配置，例如文件挂载、网络权限、用户权限和资源限制。

实际系统通常需要控制：文件系统访问权限、网络访问权限、CPU 与内存使用、执行超时时间、系统命令权限、敏感数据访问。

安全原则：模型可以生成代码，但代码的实际执行必须受到运行环境的独立约束。

## Part 6 智能体规划与结构化执行 Planning and Structured Execution

### 6\.1 规划能力的定义

Planning 是将复杂任务组织为多个有序行动的能力。

与单次工具调用相比，规划更关注：完成任务需要哪些步骤、每个步骤应该使用什么工具、步骤之间是否存在依赖、如何利用前一步结果执行后续步骤。

规划可以表示为： $P=(a_1,a_2,\ldots,a_n)$。其中，$a_i$ 表示第 $i$ 个行动。

若行动之间存在依赖关系，则必须满足相应的执行顺序。

### 6\.2 客户服务智能体的规划案例

用户询问：Do you have any round sunglasses in stock that are under $100?

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTNhZGJhOTc3MGUyZjgxNjNjM2IwMmMzYjUxMDdlMjZfMjA5NzcxZTA1MTk4OGQxYjMzZDU3MDFhNWRiZjJhMzlfSUQ6NzY5OTA2NzQxOTE4MjA0MjY1OV8xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)

完成当前任务只需要前三个工具。合理规划为：

1. 使用 `get_item_descriptions` 查找圆形太阳镜。

2. 使用 `check_inventory` 判断候选商品是否有库存。

3. 使用 `get_item_price` 检查有库存商品是否低于或等于 100 美元。

整体依赖关系为： $\text{Product Search} \rightarrow \text{Inventory Check} \rightarrow \text{Price Check} $

只有满足商品形状、库存和价格三个条件，才能给出符合要求的推荐。

**Example：邮件助手中的行动依赖**

Reply to that email invitation from Bob about dinner in New York and tell him I'll attend\. Then archive his email\.

可用工具包括：`search_email, send_email, move_email, delete_email`

执行计划为：

1. 搜索 Bob 发送的、提及纽约晚餐的邀请邮件。

2. 使用 `send_email` 回复并确认出席。

3. 使用 `move_email` 将原邮件移动到归档文件夹。

依赖关系为： $
\text{Search Email} \prec \text{Send Reply} \prec \text{Archive Email} $

归档操作应在回复成功后进行，以免任务尚未完成就改变邮件状态。

说明：规划不仅是列出步骤，还必须明确步骤之间的依赖关系与完成条件。

### 6\.4 使用 JSON 表示结构化计划

JSON（JavaScript Object Notation）是一种文本形式的结构化数据交换格式。它能够让模型生成的计划被程序解析、验证和执行。JSON 要求对象键名和字符串值使用双引号。

**JSON 序列化与反序列化**

Python 使用 `json` 模块进行转换：

- `json.dumps()`：将 Python 对象序列化为 JSON 字符串。

- `json.loads()`：将 JSON 字符串解析为 Python 对象。

转换过程为： $\text{Python Object} \xrightarrow{\texttt{json.dumps()}} \text{JSON String} $, $\text{JSON String} \xrightarrow{\texttt{json.loads()}} \text{Python Object}$

解析 JSON 只完成数据转换，并不会自动执行其中描述的操作。

**将行动计划表示为 JSON**

要求每个计划步骤包含四个字段：

`step`：步骤编号；`description`：步骤描述；`tool`：工具名称；`args`：工具参数。

这种结构使程序能够识别工具名称、参数和执行顺序。但其中的 `"results from step 1"` 只是描述性占位符。实际执行时，运行环境需要将其解析为第一步返回的真实数据。

因此，结构化计划执行至少包含： $\text{Generate Plan} \rightarrow \text{Parse JSON} \rightarrow \text{Validate Plan} \rightarrow \text{Resolve Dependencies} \rightarrow \text{Execute Tools}$

对于更复杂的系统，还可以增加参数类型验证、工具白名单及异常处理机制。

### 6\.5 多工具规划的复杂性

咖啡店交易数据说明：当工具数量和任务类型增加时，规划难度也会提高。

Find the month with the highest hot\-chocolate revenue\.

**多工具组合问题**

这里假设每条记录代表一件商品交易，且 `price` 是该交易的实际收入；若存在数量、退款或折扣字段，还需要调整计算方法。

**多工具规划的主要困难**

两个核心问题：

- More combinations：工具组合数量增加。

- More edge cases：边界情况增加。

例如，系统需要处理：日期格式不一致、商品名称存在不同写法、数据包含缺失值、查询条件涉及多个字段、工具之间存在复杂依赖。

随着工具数量增加，模型不仅需要选择正确的工具，还必须决定调用顺序和参数传递方式。

**通过代码执行简化复杂规划**

对于复杂的数据分析任务，可以让 LLM 生成完整代码，再由运行环境执行。

“查询最近五笔交易金额”

- `pd.read_csv()`：读取交易数据。

- `pd.to_datetime()`：将日期转换为时间类型。

- `sort_values()`：按日期降序排列。

- `head(5)`：选取最近五条记录。

- `to_list()`：将金额转换为列表。

与连续调用多个细粒度工具相比，代码执行能够将筛选、排序和聚合等操作组合为完整程序。但这并不意味着代码执行一定优于工具调用。

代码执行需要额外考虑：代码正确性、执行环境安全、文件访问权限、异常处理、结果验证。

因此，适合采用哪种方式取决于任务复杂度、工具能力与执行风险。

### 6\.6 单智能体能力总结

核心能力：

|**能力**|**示例**|**主要作用**|
|---|---|---|
|Reflection|修改邮件、审查代码|检查并改善已有输出|
|Tool Use|查询当前时间、创建预约|获取外部信息并执行行动|
|ReAct|预约冲突后重新查询日历|根据新观察调整行动|
|Planning|查询商品、库存与价格|组织多步骤任务及依赖关系|

这四项能力可以组合在同一个智能体中。然而，单个智能体不一定适合所有复杂任务。某些任务需要多个具有不同专业能力或评价标准的决策角色，因此引出多智能体系统。

## Part 7 多智能体系统基础 Multi\-Agent Fundamentals

### 7\.1 多智能体系统的定义

多智能体系统（Multi\-Agent System, MAS）由多个能够进行决策的智能体组成，这些智能体在共享任务或环境中相互作用。其核心不是简单增加 LLM 数量，而是引入多个具有独立职责、局部状态和决策能力的实体。

|要素|含义|
|---|---|
|Agents|多个能够基于观察和历史信息选择行动的智能体|
|Goals|智能体可能具有共享、不同或相互竞争的目标|
|Environment|多个智能体共同观察和改变的环境|
|Interaction|智能体通过行动、消息或共享状态相互影响|

某些复杂任务包含多个互补的专业角色。多个智能体能够将不同知识、工具和职责分配给专门的角色。但并非所有任务都需要多智能体架构。只有当新增智能体能够解决具体任务限制时，才具有引入价值。

### 7\.2 多智能体协作案例

一家商店希望推广售价为 HK$299 的圆形、哑光黑色太阳镜。

目标输出：一张宣传图片、一段不超过 50 个英文单词的宣传文案。系统设置三个专业智能体。

1. Researcher Agent

负责：选择信息来源、检查产品相关声明、确认宣传内容是否有证据支持。

输出：已核实的产品事实、来源说明。

2. Designer Agent

负责：选择视觉风格、设计并修改宣传图片、确保图片符合任务要求。

输出：与营销需求一致的宣传图片。

3. Writer Agent

负责：撰写宣传文案、根据反馈修改内容、控制文案长度。

输出：清晰且不超过 50 个单词的宣传文案。

三个智能体围绕同一营销目标工作，但分别承担事实核查、视觉设计和文本创作。

### 7\.3 采用多智能体系统的五个理由

1. 专业化能力（Specialized Expertise）

不同智能体可以具有不同知识、工具或职责。

例如：Researcher 侧重事实与证据、Designer 侧重视觉表达、Writer 侧重语言与传播效果。

专业化的核心是能力分工，而不是简单地将同一任务重复交给多个模型。

2. 独立并行工作（Independent Parallel Work）

当任务之间不存在必要依赖时，可以并行执行。

例如： $\text{Approved Facts} \rightarrow \begin{cases} \text{Visual Design}\\ \text{Copywriting} \end{cases} \rightarrow \text{Campaign}$

设计与文案可以在共享已核实事实的基础上同时进行，再整合为最终宣传素材。

需要区分：Specialization 关注不同智能体具备什么能力、Parallelism 关注任务之间是否存在执行依赖。专业化不意味着一定能够并行执行。

3. 上下文隔离（Context Isolation）

每个智能体可以维护独立工作上下文，减少无关信息干扰。

Local Context每个角色只保留完成自身任务所需的证据和历史信息。

Shared Constraints 多个角色共享统一的任务要求和已核实事实。

Handoff 智能体之间传递结论、来源和未解决问题。

例如：Researcher 保存详细检索记录、Designer 主要接收产品视觉要求与已确认事实、Writer 主要接收营销目标、产品事实和长度限制。这样可以减少上下文冗余，同时保持关键约束的一致性。

4. 独立验证（Independent Verification）

独立验证用于检查已有结果是否满足证据、约束与推理要求。

例如，Writer 生成：These sunglasses are the most popular product this summer\.

如果缺乏销量或市场调查数据，这一声明可能没有充分依据。独立审查智能体可以质疑原有假设，并要求删除或修改未经证实的表述。因此，验证不仅检查文本是否通顺，更重要的是检查结论是否受到证据支持。

5. 多视角评价（Multiple Perspectives）

不同智能体可以采用不同评价标准。

例如：Researcher：事实准确性、Designer：视觉质量、Writer：语言清晰度与传播效果。

最终决策需要在不同标准之间进行权衡。

需要特别区分：Independent Verification 主要关注结果是否正确、有依据；Multiple Perspectives 主要关注不同评价标准之间的平衡。

### 7\.4 多智能体系统的目标与成功标准

Completing individual subtasks does not mean the overall task is complete\.

即使所有智能体分别完成自己的工作，也不代表整体任务已经成功。

因此，成功标准需要在三个层次上定义。

|**层次**|**核心目标**|**评价重点**|
|---|---|---|
|Task Level|交付可使用的最终成果|输出完整性、任务约束|
|Agent Level|完成分配的职责|单个贡献的质量与完整性|
|Interaction Level|可靠整合多个贡献|一致性、问题解决、终止条件|

例如，太阳镜营销任务中：

- Researcher 必须提供可靠产品信息。

- Designer 必须生成符合要求的图片。

- Writer 必须提供合格文案。

- 整体系统必须保证图片与文案一致，并符合最终交付要求。

逻辑关系：$\text{Task Success} \Rightarrow \text{Required Outputs Valid} \land \text{Constraints Satisfied} \land \text{Integration Valid} $

单个智能体完成任务只是整体成功的必要组成部分，不一定构成充分条件。

### 7\.5 单个智能体角色的定义

为了使多智能体系统具有明确的职责边界，课件提出六个角色描述字段。

|**字段**|**需要回答的问题**|
|---|---|
|Name|如何标识该智能体？|
|Inputs|可以使用哪些证据和上下文？|
|Responsibilities|负责哪些决策？|
|Tools|允许使用哪些工具和行动？|
|Output|必须交付什么结果？|
|Goal|应追求什么目标？|

一个清晰的角色定义应将职责与可检查的行动和输出联系起来。这种结构有助于明确智能体的职责边界，避免多个角色重复执行相同任务或遗漏关键工作。

### 7\.6 多智能体目标关系 Goal Relationships

多个智能体之间的目标关系可以分为三类。

1. 合作型（Cooperative）

多个智能体通过共享成果共同受益。

主要协调问题包括：贡献分配、信息共享、联合成功标准。

例如，Researcher、Designer 和 Writer 共同完成营销活动。

2. 竞争型（Competitive）

一个智能体的成功可能以其他智能体的利益受损为代价。

主要协调问题包括：策略选择、资源分配、信息访问。

例如，多个竞价智能体竞争有限资源。

3. 混合目标型（Mixed\-Motive）

智能体在部分目标上合作，在其他目标上存在冲突。

主要协调问题包括：谈判、局部激励协调、共同目标与个体目标的平衡。

三种关系的区别如下：

|**目标关系**|**主要特征**|**协调重点**|
|---|---|---|
|Cooperative|共享成果|合作与信息共享|
|Competitive|利益可能相互冲突|策略与资源竞争|
|Mixed\-Motive|部分合作、部分竞争|谈判与激励协调|

多智能体系统的交互机制应根据目标关系设计，而不能默认所有智能体始终具有完全一致的利益。

### 7\.7 多智能体交互、记忆

**社会模拟中的生成式智能体 Generative Agents**

该研究使用多个生成式智能体模拟虚拟社区中的日常行为。每个智能体拥有自己的日程、记忆和计划，并通过行动和对话影响其他智能体。

研究关注的问题包括：智能体是否具有共同目标？每个智能体能够观察到什么？一个智能体如何影响其他智能体？不同智能体之间有哪些差异？

社会模拟强调：多智能体系统中的整体行为可以由多个个体的局部行动与交互共同产生。

#### 7\.7\.1 生成式智能体的记忆与交互机制

1. Memory Stream：记忆流

智能体将观察到的事件、经历和交互记录保存到记忆中。

例如：与其他角色的对话、曾经执行的行动、环境中发生的事件、已经制定的计划。

2. Memory Retrieval：记忆检索

智能体并非每次都读取全部历史记录，而是检索与当前情境相关的记忆。

检索结果用于支持当前决策。

3. Reflection：反思

反思能够将具体经历整合为更高层次的理解。

例如，智能体可能从多次互动中总结其他角色的习惯或偏好。

4. Planning：规划

智能体根据当前目标、环境状态和相关记忆制定行动计划。

5. Social Interaction：社会交互

智能体的行动和对话会改变共享环境，并成为其他智能体的新观察。

因此，系统形成持续循环： $\text{Perceive} \rightarrow \text{Store Memory} \rightarrow \text{Retrieve} \rightarrow \text{Reflect / Plan} \rightarrow \text{Act} \rightarrow \text{New Observations}$

记忆使智能体能够保持行为连续性，交互则使多个智能体之间产生动态影响。

#### 7\.7\.2 局部观察与上下文 Local Observations

多个智能体可以共享同一个环境，但不一定拥有相同的信息。

1. World State：世界状态。环境包括其他智能体及其行动。

2. Local Observation：局部观察。每个智能体只能获取自身可访问的信息。

3. Private Context：私人上下文。不同智能体可以拥有不同的记忆、信念和计划。

假设真实环境状态为 $s_t$，智能体 $i$ 的观察为： $o_t^i=O_i(s_t)$

其中，$O_i$ 是智能体 $i$ 的观察函数。

即使处于同一环境，也可能存在： $o_t^i\neq o_t^j $

因此，两个智能体可能基于不同信息作出不同决策。

这种现象称为 Partial Observability（部分可观测性）。

### 7\.8 多智能体系统的主要挑战

多智能体系统由于包含多个决策主体，会引入信息、协调和学习方面的复杂性。

#### 7\.8\.1 部分可观测性 Partial Observability

不同智能体掌握的信息不完整，可能导致不兼容的决策。

例如，一个智能体已经修改任务状态，但另一个智能体尚未收到更新，仍然按照旧状态执行。

因此，系统需要合理设计状态共享、消息传递和信息同步机制。

#### 7\.8\.2 规模扩展 Scale

随着智能体数量增加，系统需要处理更多：消息路由、工具调用、协调过程、结果整合、计算与通信成本。

更多智能体不一定意味着更高效率。

#### 7\.8\.3 策略依赖 Policy Dependence

一个智能体行动的价值可能取决于其他智能体的行为。

例如，在竞争资源分配的任务中，某个智能体是否应该立即行动，可能取决于其他智能体是否也在竞争相同资源。

可以表示为： $
U_i=U_i(a_i,a_{-i})$

- $U_i$：智能体 $i$ 的效用。

- $a_i$：智能体 $i$ 的行动。

- $a_{-i}$：其他智能体的联合行动。

因此，智能体不能总是独立评估自身行动的价值。

#### 7\.8\.4 非平稳性 Non\-Stationarity

当多个智能体同时学习或调整策略时，环境对于某个智能体而言可能不断变化。

例如，智能体 $j$ 的策略从： $
\pi_j^{(t)} $，更新为： $ \pi_j^{(t+1)} $

那么即使智能体 $i$ 策略没有变化，它面对的交互环境也可能发生改变。

这会增加策略学习、行为预测和系统稳定性维护的难度。

### 7\.9 综合总结

从单智能体到多智能体，系统设计关注点发生了变化。

|**维度**|**单智能体系统**|**多智能体系统**|
|---|---|---|
|决策主体|一个主要决策实体|多个决策实体|
|任务组织|内部规划与工具调用|角色分工与协同执行|
|信息管理|单一主要工作上下文|局部上下文与共享状态|
|反馈机制|工具结果、自反思|个体反馈与智能体间交互|
|主要挑战|工具选择、规划、执行安全|协调、通信、信息不完整、策略依赖|
|成功标准|完成整体任务|个体贡献与整体协作均满足要求|

${ \text{Tool Use} \rightarrow \text{ReAct} \rightarrow \text{Planning} \rightarrow \text{Multi-Agent Coordination} }$

其中：

- Tool Use 使智能体能够获取外部信息并执行行动。

- ReAct 使智能体能够根据新观察动态调整决策。

- Planning 使智能体能够组织多步骤任务及其依赖关系。

- Multi\-Agent Coordination 使多个具有不同职责和局部信息的智能体能够共同完成任务。

这些能力之间并不是简单的替代关系，而是可以相互组合。

最终，智能体系统设计的核心问题是：如何将模型、工具、推理、规划、记忆和交互机制组织为一个能够可靠完成任务的系统，同时控制执行成本、风险和协调复杂性。

## Part 8 多智能体系统设计 Designing Multi\-Agent Systems

前文介绍了多智能体系统的基本概念、角色分工、目标关系、局部观察和交互机制。

本章进一步讨论如何将这些概念转化为可实施的系统架构，重点解决任务如何分配、智能体如何协调、工作流如何组织、信息如何交换，以及系统如何安全终止和评估等问题。

多智能体系统设计并非简单地增加智能体数量，而是根据任务依赖、控制需求和协调成本，构建具有明确职责、执行流程和通信规则的协作系统。

### 8\.1 多智能体系统的核心设计维度 Design Decisions

多智能体系统设计包含四个相互关联的维度。

|**设计维度**|**核心问题**|**主要设计内容**|
|---|---|---|
|Task and Roles（任务与角色）|谁负责每项决策和输出？|任务分解、职责分配、权限边界|
|Coordination（协调机制）|谁负责分配工作和解决冲突？|集中式、去中心化、混合式协调|
|Workflow / Architecture（工作流与架构）|智能体、控制逻辑和状态如何组织？|顺序、并行、迭代及图结构工作流|
|Communication（通信机制）|哪些信息需要传递，在哪里保存？|消息格式、路由、共享状态、版本控制|

四个维度分别解决不同层次的问题：

- 任务与角色决定系统中有哪些工作，以及由谁负责。

- 协调机制决定决策权和任务分配权如何组织。

- 工作流与架构决定各项任务如何随时间执行。

- 通信机制决定智能体之间如何交换信息、共享状态和传递结果。

区分：协调模型描述的是谁作出决策，执行工作流描述的是任务以什么顺序执行。两者相关，但并不等同。

### 8\.2 任务分解、职责分配与角色契约

#### 8\.2\.1 任务分解与分配 Task Decomposition and Allocation

任务分解（Decomposition）是将总体目标拆分为具体输出和子任务，并识别它们的依赖关系与所需输入。

任务分配（Allocation）则是将这些子任务交给具有相应能力的智能体，并明确责任归属和交付条件。

二者的区别如下：

|**维度**|**Decomposition**|**Allocation**|
|---|---|---|
|核心问题|需要完成哪些工作？|由谁完成这些工作？|
|主要内容|子任务、输入、输出、依赖|能力匹配、责任归属、交付条件|
|主要产物|任务分解结构|角色与任务映射关系|

任务分解时应明确每个子任务的输入、输出及前置条件，避免将存在数据依赖的任务错误地安排为并行执行。

#### 8\.2\.2 角色边界、工具与权限 Role Boundaries, Tools and Permissions

角色契约（Role Contract）不仅需要说明智能体应当完成什么工作，还必须明确它被允许执行哪些操作。

角色边界分为三个方面：

1. Decision Ownership：决策归属

明确智能体能够独立作出哪些决策，以及哪些决策需要其他角色或人工确认。

2. Tool Access：工具访问权限

明确智能体能够访问哪些数据，以及允许执行哪些系统操作。

3. Escalation Boundary：升级处理边界

明确哪些不确定情况、冲突或高风险操作必须提交上级协调者或人工处理。

这一原则体现了最小权限设计思想（Principle of Least Privilege）：每个智能体只应获得完成其职责所必需的操作权限。

#### 8\.2\.3 智能体之间的交接契约 Handoff Contracts

Handoff 指一个智能体完成阶段性工作后，将结果及必要上下文传递给另一个智能体。

有效的交接不应只包含“任务已完成”的通知，而应提供能够支持下一步决策的可用产物。

四项交接内容：

|**组成部分**|**应包含的信息**|
|---|---|
|Content|结论、结果及支持证据|
|Traceability|信息来源和产物版本|
|Status|已验证、不确定或等待审查|
|Open Questions|尚未解决的问题以及下一责任方|

这种结构能够减少信息丢失，并使后续智能体判断哪些内容可以直接使用，哪些内容需要进一步验证。

### 8\.3 多智能体协调模型 Coordination Models

协调机制决定任务分配、决策和结果整合发生在系统的什么位置。

三种主要模式：集中式、去中心化和混合式。

1. 集中式协调（Centralized Coordination）

集中式架构由一个 Manager Agent 负责分配任务、协调执行并整合结果。

其典型流程为： $\text{Manager} \rightarrow \text{Task Assignment} \rightarrow \text{Worker Execution} \rightarrow \text{Manager Integration}$

优势是责任明确、便于统一规划和结果整合。

主要代价是 Manager Bottleneck（管理者瓶颈）：随着任务数量增加，中央管理者可能承担过多通信、决策和整合工作。

2. 去中心化协调（Decentralized Coordination）

去中心化架构中，各智能体可以直接与其他智能体交换信息，并在本地作出决策。

其特点包括：

- 没有唯一的中央决策者。

- 智能体能够根据局部状态自主协商。

- 信息与任务可以在多个节点之间流动。

这种模式适合规模较小、需要灵活交流的协作团队。但由于缺少统一控制者，系统更难达成全局一致决策，可能出现重复工作、冲突或信息不一致。

3. 混合式协调（Hybrid Coordination）

混合式架构结合集中式的全局规划和去中心化的局部自主性。

例如： $\text{Global Manager} \rightarrow \begin{cases} \text{Team A Coordinator}\\ \text{Team B Coordinator} \end{cases} \rightarrow \text{Local Workers} $

上层负责整体目标、资源分配和跨团队协调，下层负责具体任务执行与局部决策。

这种模式可以降低中央管理者的直接负担，但需要设计额外的层级通信和责任边界。

三种模式的对比如下：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2IxZDI4ZGNlMDhhM2JiZTliNmQ3NDM5MWM5YmIwYzFfYzU5YjMwYmI2NGUyMmJhMzY2ODc3NzJlYWNmODkwOWJfSUQ6NzY5OTA3NjUyMjQzODYyNjg1M18xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)

|**模型**|**决策方式**|**主要优势**|**主要代价**|
|---|---|---|---|
|Centralized|中央管理者分配与整合|全局控制清晰|中央瓶颈|
|Decentralized|智能体自主协调|灵活性高|全局一致性较难|
|Hybrid|全局规划与局部自治结合|兼顾控制与自主性|架构复杂度增加|

### 8\.4 执行工作流与系统架构 Execution Workflows and Architecture

协调模型回答“谁负责决策”，执行工作流回答“任务如何随时间组织”。

### 8\.4\.1 顺序、并行与迭代工作流

课件介绍三种基本执行模式。



![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzIzZDJmY2ViYWMxMGVlZjY1ZjRhYTJmNGE2ZTI1NTFfYTdjMDZhYTA4ODk3ZjllNTFmM2ZhOGFjOGNmMDRjMGRfSUQ6NzY5OTA3NjYwODQzODg4MTgzMF8xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWJjMjVmZTViMGNiMjI4M2UwNzU1YmJmOTUxNWQwZmFfZDc5NzAwNTA3YzdmZTY2ZGNmMzYxNDY0NTUwNGYxODZfSUQ6NzY5OTA3NjUyMjUzOTI3Mzc2Nl8xNzkyNzQwMjA4OjE3OTI4MjY2MDhfVjM)



对于顺序工作流，若任务耗时为 $T_1,T_2,\ldots,T_n$，忽略调度开销： $ T_{\text{sequential}}=\sum_{i=1}^{n}T_i $

对于相互独立且同时启动的并行任务： $T_{\text{parallel}}\approx\max(T_1,T_2,\ldots,T_n)$

实际系统还需要考虑调度、通信与结果整合开销。

迭代工作流则需要明确退出条件，避免无界循环。

### 8\.4\.2 对等网络与层级架构 Peer Networks and Hierarchies

智能体之间的连接方式也会影响通信成本与协调效率。

**Peer Network（对等网络）**

智能体之间可以直接通信，具有较高灵活性，但需要消息路由规则和通信预算。

若 $n$ 个智能体形成完全连接的无向网络，潜在连接数量为： $E=\frac{n(n-1)}{2} $

因此，完全连接网络的连接规模为： $E=O(n^2)$

这里描述的是潜在连接数量，不代表每次任务都必须发生这么多次通信。

**Hierarchical Architecture（层级架构）**

智能体被组织为多个局部团队，由上层协调者处理跨团队信息交换。

这种方式能够减少直接跨团队通信，但增加了信息传递层级。

因此，对等网络与层级架构的主要权衡是： $\text{Communication Flexibility} \quad\text{vs.}\quad \text{Coordination Overhead} $

#### 8\.4\.3 黑板架构 Blackboard Architecture

黑板架构允许多个智能体通过共享工作空间进行协作，而不必为每项任务建立直接通信连接。

共享工作空间可以保存：Evidence：证据、Requests：任务请求、Drafts：草稿、Priorities：优先级、Status：执行状态。智能体读取共享状态，并向其中提交自己的工作成果。

黑板架构需要解决三个问题。

1. Shared Workspace：共享工作空间

确保各智能体能够访问相关任务状态和中间结果。

2. Contributions and Control：贡献与控制

通过调度或控制策略决定下一步应由哪个智能体作出贡献。

3. Consistency：一致性

对共享产物进行版本管理，并处理多个智能体同时写入时的冲突。

例如，Researcher 更新了产品事实后，Writer 应基于最新已核实版本修改文案，而不是继续使用旧信息。

因此，共享可见性不等于自动实现协调。黑板架构仍需要明确调度、权限和一致性规则。

#### 8\.4\.4 图结构与混合工作流 Graph\-Based and Hybrid Workflows

图结构工作流将执行节点、数据依赖和路由条件显式表示出来。

可以抽象为有向图： $G=(V,E)$

- $V$：执行节点集合。

- $E$：节点之间的依赖关系或状态转移。

|**组成部分**|**作用**|
|---|---|
|Node Types|定义 Agent、模型调用、工具、函数和人工输入等节点|
|Routes|定义分支、汇合与循环的条件|
|Guards|检查权限、状态、合法转移和执行限制|

例如，内容生成工作流可以设计为：这种设计的优势是控制流明确，便于验证任务状态、执行条件和终止规则。

### 8\.5 系统架构选择 Architecture Selection

课件根据任务结构、控制需求和协调成本，比较了五类架构模式。

|**架构模式**|**适用情况**|**主要权衡**|
|---|---|---|
|Pipeline|依赖关系稳定的任务|上游错误容易向下游传播|
|Centralized|需要统一任务分解与结果整合|管理者瓶颈|
|Peer Network|小规模团队需要灵活交流|消息与协调成本|
|Blackboard|多个智能体共同维护动态状态|一致性与调度|
|Graph|存在明确分支、循环和混合节点|控制流设计与维护成本|

架构选择应优先分析任务结构，而不是直接选择最复杂的模式。

例如：

- 稳定的数据处理流程适合 Pipeline。

- 需要统一分工的研究团队适合 Centralized。

- 小规模自主协商任务适合 Peer Network。

- 需要持续共享中间成果的任务适合 Blackboard。

- 包含条件分支、人工审批和重试循环的任务适合 Graph。

需要注意，这些架构并不完全互斥。实际系统可以采用集中式协调，同时通过图结构定义工作流，并使用共享状态保存执行结果。

### 8\.6 多智能体通信设计 Communication Design

通信不仅是信息传输机制，也是影响智能体后续决策的重要组成部分。

一个消息可能改变另一个智能体的知识状态，从而改变其下一步行动。

**通信设计的四个方面**

|**设计方面**|**核心问题**|
|---|---|
|Message Format|传递什么结果、请求或证据？|
|Routing and Turn\-Taking|谁接收消息，谁下一步行动？|
|Shared State|使用哪个产物及其版本？|
|Termination|消息是否触发继续、完成或升级？|

通信系统必须能够识别消息发送者、接收者、任务上下文、执行状态以及后续处理责任。

**结构化消息模式（Message Schema）**

这一结构使系统能够明确：Writer 请求 Researcher 检查第二版文案中的“今年夏天最受欢迎”声明是否有证据支持。

**消息验证机制**

要求在消息接收和回复后进行不同层次的验证。

1. Structure Validation：结构验证

检查必需字段是否存在，字段类型是否合法。

例如，`task_id` 应为有效任务标识，`recipient` 应为可识别的智能体。

2. Permission and State Validation：权限与状态验证

检查：发送者是否有权发起该请求、接收者是否允许执行指定操作、当前任务状态是否允许该转移、产物版本是否仍然有效。

3. Evidence Validation：证据验证

当 Researcher 返回结果后，需要进一步判断来源是否支持原有声明。

因此： $\text{Valid Message} \not\Rightarrow \text{Valid Claim}$，结构正确、权限合法的消息，其内容仍可能缺乏事实依据。

### 8\.7 直接消息与共享状态 Direct Messaging and Shared State

智能体可以通过直接消息或共享产物交换信息。

1. 直接消息（Direct Messaging）

直接消息具有明确的发送者和接收者，通常用于：

- 请求其他智能体执行操作。

- 传递特定任务结果。

- 追踪消息送达与回复责任。

例如： $\text{Writer} \xrightarrow{\text{Evidence Request}} \text{Researcher}$

这种机制适合需要明确责任归属的任务交接。

2. 共享状态（Shared State）

共享状态允许多个智能体读取或更新共同的任务产物。

系统需要管理：Artifact Version：产物版本、Access Control：访问权限、Write Ownership：写入责任、Consistency：数据一致性。

例如，多个智能体可以共享同一份产品事实文件，但必须保证 Writer 和 Designer 使用的是一致且经过确认的版本。

**两种机制的区别**

|**维度**|**Direct Messaging**|**Shared State**|
|---|---|---|
|交互方式|向特定接收者发送消息|读取或修改共同产物|
|适用场景|明确请求、任务交接|持续共享信息与中间结果|
|关键管理问题|路由、送达、回复责任|版本、访问权限、写入冲突|

两种机制可以结合使用：通过直接消息通知任务变化，通过共享状态保存完整产物。

### 8\.8 在 Prompt 中描述协作智能体

智能体需要知道系统中有哪些其他角色，以及什么时候应该与它们通信。

因此，应在角色指令中包含协作智能体的描述。

1. Capability（能力）

智能体需要了解其他角色具备哪些工具和权限，以便将请求发送给合适的对象。

2. Knowledge（知识）

智能体需要判断其他角色已经掌握哪些证据、信息和产物版本，避免基于过期或缺失的信息进行协作。

3. Objective（目标）

智能体需要了解其他角色的职责和优先级，以预测其响应方式并协调共同目标。

例如，Writer 在发现宣传声明缺乏证据时，应知道 Researcher 负责事实核查，并将具体声明及文案版本发送给 Researcher，而不是自行假定声明成立。

这种设计有助于减少角色之间的通信歧义，但实际权限仍应由运行时系统独立验证，而不能仅依赖 Prompt 约束。

### 8\.9 多智能体系统的终止、恢复与升级机制

多智能体系统需要明确区分正常完成、错误恢复、替代执行、升级处理和强制停止。

五种执行结果：

|**结果**|**触发条件**|**系统响应**|
|---|---|---|
|Done|满足验收标准|返回经过验证的结果|
|Retry|可恢复的暂时性错误|在固定限制内重试|
|Fallback|存在获得授权的替代方案|使用替代方案并记录变化|
|Escalate|存在无法解决的冲突或不确定性|提交相关状态，请求进一步决策|
|Stop|达到预算、权限或安全限制|停止执行并报告未完成工作|

**Retry 与 Fallback 的区别**

Retry 表示在相同或修正后的条件下再次尝试原操作。例如，网络请求暂时失败后重新请求。

Fallback 表示使用另一种被允许的执行方式。例如，主要数据服务不可用时，改用经过授权的备用数据源。

前者主要针对可恢复错误，后者主要针对可替代执行路径。

**Escalate 与 Stop 的区别**

Escalate 表示自动决策无法继续，需要其他角色或人工介入。

Stop 表示执行必须终止，例如预算耗尽、权限不足或安全约束被触发。

二者都可能导致当前自动流程暂停，但 Escalate 强调移交决策责任，Stop 强调终止当前执行。

**有界执行与停止条件**

多智能体系统可以同时设置步数、成本和时间限制：

$N_{\text{steps}}\leq N_{\max}$，$C_{\text{total}}\leq C_{\max} $， $T_{\text{elapsed}}\leq T_{\max}$

- $N_{\max}$：最大执行步数。

- $C_{\max}$：最大允许成本。

- $T_{\max}$：最大执行时间。

达到限制后，系统应返回实际完成状态，并记录尚未完成的任务，而不是将停止误判为成功。

### 8\.9 多智能体系统评估与风险规划 Evaluation and Risk Planning

多智能体系统的评估不能只检查最终输出，还应考虑执行成本、响应时间以及系统在异常情况下的行为。

1. 质量与价值（Quality and Value）

应将多智能体系统与单智能体基线进行比较。

主要指标包括：Quality：任务完成质量、Cost：模型调用、工具使用和协调成本、Latency：任务完成延迟。

如果多智能体系统增加了大量成本，却没有带来明显的质量改善，就需要重新评估其架构合理性。

2. 失败与预算测试（Failure and Budgets）

除了正常任务测试，还应验证系统在异常情况下的行为，包括：权限不足、工具执行失败、证据缺失、智能体之间出现冲突、重试次数耗尽、资源预算不足、需要人工介入。

评估重点不仅是系统能否成功完成任务，还包括它能否在无法完成任务时安全、明确地终止。

多智能体系统设计检查清单（Design Review Checklist）

在正式实施前，应检查以下五个方面。

|**检查维度**|**关键问题**|
|---|---|
|Tasks|需要交付什么？如何判断任务成功？|
|Roles|谁负责各项职责？允许执行哪些操作？|
|Coordination / Architecture|谁负责分配任务、解决冲突和整合结果？|
|Messages|哪些信息需要传递？是否需要结构与版本验证？|
|Stop and Recover|何时完成、重试、升级或停止？|

这五项检查共同确保系统的任务、职责、控制、状态和完成规则在实施前已经明确。

### 8\.10 本章总结

本章从系统工程角度讨论了多智能体系统的设计方法，核心结论如下。

1. 任务分解与角色分配是设计起点。 系统需要先明确子任务、依赖关系、输入输出和责任归属，再决定需要哪些智能体。

2. 协调模型与执行工作流属于不同设计维度。 集中式、去中心化和混合式描述决策权的组织方式；顺序、并行和迭代工作流描述任务的时间执行关系。

3. 系统架构必须与任务结构匹配。 Pipeline、Peer Network、Blackboard 和 Graph 等架构具有不同的适用条件与协调成本，不存在对所有任务都最优的单一架构。

4. 通信是多智能体决策机制的一部分。 消息格式、路由规则、共享状态、版本管理和证据验证会直接影响智能体的后续行动。

5. 终止机制与评估机制不可缺少。 系统必须明确完成、重试、替代、升级和停止条件，并综合评价质量、成本、延迟及异常处理能力。

其中，单智能体已经能够完成工具调用、规划、反思和动态决策。多智能体系统则进一步通过专业化分工、信息交换和协作控制处理复杂任务。

因此，多智能体设计的核心不是增加智能体数量，而是通过合理的角色划分、协调架构、执行工作流和通信规则，提高整体任务的完成质量与可靠性。

### 8\.11 课堂练习 In\-Class Exercises

Q1：工具观察结果与当前计划矛盾时，ReAct 允许智能体做什么？

正确答案：A\. Use observation to revise the next action\.

ReAct 允许智能体根据新观察修改下一步行动，而不是忽略新信息或每次都重新启动整个任务。

Q2：两个智能体共享同一环境，但收到不同观察结果，意味着什么？

正确答案：A\. Each may need to decide using incomplete information\.

共享环境不意味着具有相同观察。不同智能体可能只能访问环境状态的不同部分，因此需要基于局部信息进行决策。

Q3：Researcher 表示“Research done”，还应增加什么信息才能使交接对 Writer 更有用？

正确答案：A\. The findings, their sources, and unresolved questions\.

有效交接需要包含结论、来源、验证状态和未解决问题，使后续智能体能够直接利用研究成果并判断其可靠性。


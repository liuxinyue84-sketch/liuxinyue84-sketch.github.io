# 5583 Agentic Computing1

# Lecture 4 Deep Reinforcement Learning II \& Introduction to Prompt Engineering

深度强化学习进阶与提示工程导论

本讲主要包括三个部分：深度强化学习的进阶方法、现代 LLM 智能体的信息获取机制，以及强化学习策略训练实践。

整体知识体系可归纳为六个相互衔接的主题：

1. 强化学习基础回顾：智能体与环境的交互、价值函数、DQN 与策略梯度。

2. 强化学习中的奖励与探索问题：稀疏奖励、奖励塑形、课程学习。

3. 深度强化学习的典型应用：AlphaGo 系列、多智能体强化学习。

4. 现代 LLM 智能体与知识边界：预训练知识的来源、覆盖范围、质量与时效性。

5. 联网搜索与信息可靠性：搜索触发、来源选择、信息过滤与多步搜索。

6. 深度研究与自主任务执行：研究规划、多源评估、迭代检索、证据整合与 Agentic AI。

## Part 1 强化学习基础

### 1\.1 强化学习的基本框架

强化学习（Reinforcement Learning, RL）是一种通过与环境交互、利用奖励反馈优化决策策略的机器学习方法。其核心目标是学习能够最大化长期期望回报的策略，而非仅优化单步奖励。

强化学习系统包含以下基本要素：

|**要素**|**符号**|**含义**|
|---|---|---|
|Agent（智能体）|—|与环境交互并作出决策的学习主体|
|Environment（环境）|—|智能体执行动作并获得反馈的外部系统|
|State（状态）|\\\(s\_t\\\)|环境在时刻 \\\(t\\\) 的状态|
|Observation（观测）|\\\(o\_t\\\)|智能体能够感知的环境信息|
|Action（动作）|\\\(a\_t\\\)|智能体在当前状态下采取的行为|
|Reward（奖励）|\\\(r\_t\\\)|环境对动作结果提供的数值反馈|
|Policy（策略）|\\\(\\pi\\\)|从状态或观测到动作或动作概率的映射|

智能体与环境的交互过程可以表示为：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2Q0ZTA1Nzg3ZTA1NzJlNWEwYjgxNDY4MjQwNGE5NWZfYTEzMDE5ODAwM2FiNWJmZDE2YzQ1MTUwMGJkYTkxNzJfSUQ6NzY5ODY3NjAzNDI2MjA3Njk2M18xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

每一时间步的交互流程为：

1. 智能体接收当前状态或观测。

2. 根据策略 $\pi$ 选择动作 $a_t$。

3. 环境执行状态转移，并返回奖励与下一状态。

4. 智能体根据反馈更新策略，重复交互过程。

以电子游戏为例，游戏画面构成观测，移动或射击构成动作，得分构成奖励，游戏模拟器则充当环境。

回报（Return） 是一个回合（Episode）内获得的累计折扣奖励。

$R=\sum_{t=1}^{T}\gamma^t r_t $

- $T$：回合长度。

- $r_t$：第 $t$ 步的即时奖励。

- $\gamma\in[0,1]$：折扣因子（Discount Factor），控制未来奖励的重要程度。

一般而言，$\gamma$ 越接近 1，智能体越重视长期收益；$\gamma$ 越小，智能体越偏向近期收益。

强化学习的优化目标为： ${ \pi^*=\arg\max_{\pi}\mathbb{E}_{\pi}[R] }$，即寻找能够最大化期望累计回报的最优策略。

### 1\.2 状态价值函数与动作价值函数

强化学习通过价值函数（Value Function）评估不同状态或动作的长期收益，主要包括两种形式。

1. 状态价值函数（State\-Value Function）

状态价值函数 $V^\pi(s)$ 衡量：从状态 $s$ 出发，持续遵循策略 $\pi$ 时能够获得的期望回报。

${ V^\pi(s)= \mathbb{E}_{\pi} \left[ \sum_{k=0}^{\infty}\gamma^k r_{t+k} \mid s_t=s \right] }$

例如，在网格导航任务中，靠近目标位置的状态通常具有较高价值，而靠近危险区域的状态通常具有较低价值。

2. 动作价值函数（Action\-Value Function）

动作价值函数 $Q^\pi(s,a)$ 衡量：在状态 $s$ 下首先执行动作 $a$，之后遵循策略 $\pi$ 时的期望回报。

${ Q^\pi(s,a)= \mathbb{E}_{\pi} \left[ \sum_{k=0}^{\infty}\gamma^k r_{t+k} \mid s_t=s,a_t=a \right] } $

两者的区别在于：

- $V^\pi(s)$ 评价状态本身的长期价值。

- $Q^\pi(s,a)$ 评价特定状态下执行某一动作的长期价值。

对于离散动作空间，若已经获得最优动作价值函数 $Q^*(s,a)$，则最优动作可由以下规则确定：

$pi^*(s)=\arg\max_a Q^*(s,a)$

课件中的机器人导航示例：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NGEwMWU4YjhkMzJmZGQ2ZDkwOGExMTczZTM5MWI1OWRfMzhjMDc4MzE0YTE5MTc2NWQ3ZGRmYTkzYzdhNTZhNGFfSUQ6NzY5ODY3NjcwODQ1MDU2OTc2M18xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTVjNmI5MGIyYzRkYmNmMTA0ZTc5NGU3MGQ5MzZiYWFfNzczZjhkMmUzZjJjZTNjYWU5YjgzMWMxMzdiZmY5YzFfSUQ6NzY5ODY3NjY4MjQ2Mjc0NDA5OV8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

由于向右的 Q 值最高，因此贪心策略选择向右移动。

需要注意，Q 值表示期望回报，而非动作概率，因此可以为负，也不要求归一化。

### 1\.3 深度 Q 网络与策略梯度

深度强化学习（Deep Reinforcement Learning, DRL）利用深度神经网络近似价值函数或策略函数，从而处理高维状态空间，例如游戏图像、机器人传感器数据等。

两类方法：

1. 深度 Q 网络（Deep Q\-Network, DQN）

DQN 属于基于价值的方法（Value\-Based Methods），利用深度神经网络估计不同动作的 Q 值： 

$Q(s,a;\theta)\approx Q^*(s,a)$

其中，$\theta$ 表示神经网络参数。其动作选择规则为： $\pi(s)=\arg\max_a Q(s,a;\theta)$

课件中的游戏示例：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGRjMGFjZmQxYTc1ODJkYTZlYTdkNGM5OTIwZTBlZmZfN2MzNDUxMzhlYWY0NTRiOGIxOGZlMjQ5YTBjNjdiMDRfSUQ6NzY5ODY3Njk5MTY5MTgyMDU3M18xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

由于 $Q(s,\text{Fire})=10$ 最大，DQN 选择射击。随后智能体执行动作，观察下一状态及奖励，继续更新网络。

2. 策略梯度（Policy Gradient）

策略梯度属于基于策略的方法（Policy\-Based Methods），不通过 Q 值间接选择动作，而是直接学习参数化策略： $\pi_\theta(a\mid s)=P(a\mid s;\theta)$

神经网络（Actor）输出动作概率分布，再根据该分布采样： $a_t\sim\pi_\theta(\cdot\mid s_t)$

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjQ0YTViMTI3YWY5YjMyMTIyZGMwMDM4ZWYwMmI4MjFfYTFkZDdmOGQ0NDI0NjIyN2I5ZjJlZTFiMDIwYmUwNzBfSUQ6NzY5ODY3NzMxMzkyMzY2NTQ0NV8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWZkM2MwODZkZjZiZThiMmVjYTFkODQ4MTQ2OWE5ZWNfNjhmOTJmNDg0YmQ3NDgzNTU0ZDI4Y2MyZGI1ZjkwYWVfSUQ6NzY5ODY3NzM0NDIyNzU0NDYwNV8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)



尽管 Fire 的概率最高，策略仍可能采样到 Move right。课件展示的采样结果就是 Move right。

对于离散动作空间，动作概率必须满足： $\sum_{a\in\mathcal A}\pi_\theta(a\mid s)=1$

对于连续动作空间，策略也可以采用概率分布表示，例如： $pi_\theta(\cdot\mid s) = \mathcal N\bigl(\mu_\theta(s),\sigma_\theta^2(s)\bigr)$

以高斯分布为例，展示了根据均值、方差生成动作分布，再采样得到连续动作（如速度 $0.4\ \mathrm{m/s}$）的过程。

两类方法的核心区别如下：

|**维度**|**DQN**|**Policy Gradient**|
|---|---|---|
|方法类别|Value\-Based|Policy\-Based|
|网络输出|动作价值  $Q(s,a)$|动作概率  $pi_\theta(a\mid s)$|
|动作选择|选择最大 Q 值动作|根据策略分布采样|
|输出约束|Q 值可正可负|概率非负且总和为 1|
|主要优化对象|价值函数|策略函数|

Actor\-Critic 方法：Actor\-Critic 结合价值估计与策略优化

- Actor：学习策略，负责动作选择。

- Critic：估计价值，为 Actor 的更新提供评价信号。

## Part 2 稀疏奖励、奖励塑形与课程学习

### 2\.1 稀疏奖励问题 Sparse Rewards

稀疏奖励是强化学习中的重要困难，指智能体在大多数交互步骤中无法获得具有充分指导意义的奖励，或者奖励仅在任务完成后才出现。

|**任务**|**奖励特点**|**主要困难**|
|---|---|---|
|围棋（Go）|胜负奖励可能仅在终局产生|奖励延迟，难以评价中间落子|
|机械臂套环（Ring\-on\-Peg）|成功套环时才获得有效奖励|随机探索很难达到目标状态|

稀疏奖励主要造成两方面的问题：

- 探索效率低：智能体难以通过随机尝试发现成功路径。

- 信用分配困难（Credit Assignment）：最终奖励难以准确反映此前各个动作的贡献。

例如，在机械臂套环任务中，若只有成功套环时奖励为 1，其余时刻奖励为 0，则可表示为：

$r_t= \begin{cases} 1,&\text{成功完成套环}\\ 0,&\text{其他情况} \end{cases} $

当成功概率极低时，大量训练轨迹可能完全没有正奖励，导致策略难以获得有效改进。

### 2\.2 奖励塑形 Reward Shaping

奖励塑形通过引入中间奖励，为智能体提供更密集的学习信号，缓解稀疏奖励问题。其基本思想是在原始任务奖励之外，对接近目标、完成中间步骤等行为提供反馈，同时保留任务完成时的主要奖励。

一般可写为： $r'_t=r_t+F(s_t,a_t,s_{t+1})$

- $r_t$：原始环境奖励。

- $F$：额外设计的塑形奖励。

- $r'_t$：用于学习的调整后奖励。

例如，在目标导航任务中，可以奖励智能体缩短与目标的距离： $F_t=\lambda(d_t-d_{t+1}) $

其中 $d_t$ 表示当前位置与目标之间的距离，$\lambda$ 为奖励权重。

当 $d_{t+1}<d_t$ 时，智能体获得正向反馈。

奖励塑形的风险与改进：不合理的中间奖励可能使智能体追求代理目标，而非真正完成任务。例如，若持续奖励移动行为，智能体可能反复移动以获取奖励。

一种具有理论保证的设计方式是基于势函数的奖励塑形（Potential\-Based Reward Shaping）：

${ F(s_t,s_{t+1}) = \gamma\Phi(s_{t+1})-\Phi(s_t) }$

其中 $\Phi(s)$ 为状态势函数。在适当的终止条件等假设下，该形式能够保持原始任务的最优策略不变。

### 2\.3 ViZDoom 奖励塑形案例

以 ViZDoom 第一人称射击竞赛说明复杂环境中的奖励设计。任务目标不仅是击败敌人，还需要考虑生存、弹药、移动及资源获取等因素。因此，奖励函数由多个部分组成：

$r_t= r_{\text{living}} +r_{\text{health}} +r_{\text{ammo}} +r_{\text{pickup}} +r_{\text{distance}} +\cdots$

其中，living 是课件中对持续存活状态施加的每动作惩罚，不应误解为单纯奖励生存时间。

奖励塑形的**核心价值**在于将复杂任务的最终目标转化为训练过程中更容易观察的反馈信号。

### 2\.4 课程学习 Curriculum Learning

课程学习通过将复杂任务组织为一系列难度逐渐增加的子任务，使智能体能够从较容易的问题开始学习，再逐步迁移到目标任务。

其一般过程为： $\mathcal T_1 \rightarrow \mathcal T_2 \rightarrow \cdots \rightarrow \mathcal T_n$

其中： $\operatorname{Difficulty}(\mathcal T_1) < \operatorname{Difficulty}(\mathcal T_2) < \cdots < \operatorname{Difficulty}(\mathcal T_n)$

以机械臂套环任务介绍反向课程学习（Reverse Curriculum Learning）。传统训练直接从随机初始位置开始，机械臂很难偶然完成套环，因此难以获得有效奖励。

反向课程学习则从接近目标的位置开始训练：阶段 1 靠近目标 低难度、阶段 2 扩大起点范围、阶段 3 随机初始位置 高难度。通过逐步扩大初始状态范围，智能体可以在已有能力的基础上学习更困难的任务。

**奖励塑形与课程学习的区别如下：**

|**维度**|**Reward Shaping**|**Curriculum Learning**|
|---|---|---|
|核心思想|增加中间奖励|调整任务训练顺序|
|主要改变|奖励函数|任务或初始状态分布|
|主要作用|增强反馈信号|降低早期探索难度|
|典型应用|ViZDoom 奖励设计|机械臂反向课程学习|

两者可以结合使用，以进一步提高复杂强化学习任务的训练效率。

## Part 3 深度强化学习的典型应用

### 3\.1 AlphaGo：监督学习与自我对弈

围棋是深度强化学习的典型应用场景，具有以下特点：

- 状态空间极大：19×19 围棋的合法局面数量远超可观测宇宙中的原子估计数量（约 $10^{80}$）。

- 奖励稀疏且延迟：胜负通常需要在对局结束后才能确定。

- 长期决策依赖显著：单步落子的价值需要结合后续多步变化判断。

围棋的复杂性使得简单穷举所有可能局面不可行。AlphaGo 通过结合神经网络、搜索与强化学习应对上述问题。

其中有两个学习阶段：

**阶段一：基于人类棋谱的监督学习（Supervised Learning）**

利用专家对局数据训练策略网络，学习在给定棋局下模仿专家落子： $pi_\theta(a\mid s)$

其中 $s$ 为棋盘状态，$a$ 为落子位置。

可以使用交叉熵损失进行训练：

$\mathcal L_{\mathrm{SL}}(\theta) = -\frac{1}{N} \sum_{i=1}^{N} \log \pi_\theta(a_i^{*}\mid s_i)$

其中 $a_i^{*}$ 为专家在状态 $s_i$ 下选择的动作。

监督学习可以快速获得具有基本棋力的策略，但其局限在于人类棋谱无法覆盖全部可能的棋盘状态。

**阶段二：基于自我对弈的强化学习（RL Self\-Play）**

在监督学习策略的基础上，通过智能体之间的自我对弈生成新的训练经验，并利用胜负结果继续优化策略。

该阶段不再局限于模仿人类行为，而是通过自主探索改进决策质量。

因此，两阶段学习分别解决：

- 监督学习：提供有效的初始策略，降低训练难度。

- 强化学习：突破专家数据覆盖范围，提高策略表现。

蒙特卡洛树搜索（Monte Carlo Tree Search, MCTS）

AlphaGo 还利用 MCTS 在决策时探索未来可能的落子序列，并结合策略网络与价值网络提高搜索效率。

其中：

- 策略网络提供候选动作的先验信息。

- 价值网络估计棋盘局面的胜率或价值。

- MCTS 在有限计算预算内搜索具有较高潜力的决策路径。

### 3\.2 AlphaGo、AlphaZero 与 MuZero 的演进

三代系统展示强化学习从依赖人类经验逐步走向自主学习与规划的发展过程。

|**系统**|**人类棋谱依赖**|**环境知识**|**核心特点**|
|---|---|---|---|
|AlphaGo|使用专家棋谱进行监督预训练|已知围棋规则|监督学习、强化学习与树搜索结合|
|AlphaZero|不依赖专家棋谱|已知游戏规则|从自我对弈中学习，可应用于围棋、国际象棋和将棋|
|MuZero|不依赖专家棋谱|不要求预先提供完整环境动态模型|学习用于规划的环境模型|

AlphaGo 人类棋谱 \+ 自我对弈、AlphaZero 从零开始自我对弈、MuZero 学习环境模型并规划

三代系统的主要区别在于学习所依赖的先验知识，减少对人类示范及预先提供的环境动态知识的依赖。

AlphaGo 利用人类专家数据进行初始化；AlphaZero 通过自我对弈学习策略；MuZero 则进一步学习用于规划的环境动态表示。

需要区分：MuZero 不需要预先提供完整的环境转移模型，但仍然需要可交互的环境、动作接口以及奖励等任务信息，并非完全不需要任何规则或环境知识。

### 3\.3 多智能体强化学习 Multi\-Agent Reinforcement Learning

多智能体强化学习（MARL）研究多个智能体在共享环境中同时学习与决策的问题。

与单智能体强化学习相比，MARL 的关键特点是一个智能体的决策结果不仅取决于自身动作，还取决于其他智能体的行为。

对于包含 $N$ 个智能体的系统，联合动作可以表示为： $\mathbf a_t=(a_t^1,a_t^2,\ldots,a_t^N)$

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTE1ZGYzYWJiM2IzNWFkZGQ4NWIxMDM4ZDQ0ODJlZmVfZmIwZWVjOTQxOTExM2NiNmNiZmJlMjY5OWZkZWVhMmJfSUQ6NzY5ODc1ODQ1NDQzMjkyNzI2OF8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDczODlmNjBlZmNlZTU4OGJjMmM1NTY0NTMzOWFlMDBfZDQ2ZTFiMGQyNjdjNzdkYmQwODQyNDg2YTRhNGM1ZTRfSUQ6NzY5ODc1ODUyMzA2MDA4MDE2NF8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

环境状态转移依赖所有智能体的联合动作： $P(s_{t+1}\mid s_t,a_t^1,\ldots,a_t^N)$

每个智能体 $i$ 的目标仍然是最大化自身期望回报：

$\max_{\pi_i} \mathbb E_{\pi_i,\pi_{-i}} \left[ \sum_{t=0}^{T}\gamma^t r_t^i \right] $

其中 $\pi_{-i}$ 表示其他智能体的策略集合。

以多智能体 Hide and Seek 环境作为示例，说明多个智能体能够在同一环境中相互影响、学习和行动。

根据奖励目标的关系，多智能体系统可分为三种类型：

|**类型**|**目标关系**|**课件示例**|
|---|---|---|
|Cooperative（合作）|共享目标与团队收益|仓库机器人协同配送|
|Competitive（竞争）|目标相互对立|网球比赛中的双方选手|
|Mixed（混合）|同时存在合作与竞争|足球比赛中队内合作、队间竞争|

奖励设计决定了智能体之间的行为关系。例如，网球比赛中的胜负奖励使双方成为竞争者，而仓库配送任务中的共享奖励则鼓励合作。

### 3\.4 多智能体独立学习的困难

每个智能体可以独立采用 DQN 或策略梯度进行训练，但这种方式存在两项主要困难。

1. 环境非平稳性（Non\-Stationarity）

在单智能体强化学习中，通常假设环境转移规律相对稳定。但在多智能体环境中，其他智能体也会不断更新策略。因此，从某个智能体的视角看，即使自身状态和动作不变，下一状态及奖励的分布也可能随着其他智能体的策略变化而改变：

$P(s_{t+1}\mid s_t,a_t^i;\pi_{-i})$

当 $\pi_{-i}$ 不断变化时，该转移分布也随之变化。

这会导致：

- 已学习的有效动作可能失效。

- 历史经验可能与当前环境不一致。

- 策略优化过程更难稳定收敛。

2. 团队信用分配问题（Multi\-Agent Credit Assignment）

在合作任务中，多个智能体可能共享一个团队奖励：

$R_{\mathrm{team}} = \sum_{t=0}^{T}\gamma^t r_t^{\mathrm{team}}$

但团队奖励无法直接指出每个智能体对最终结果的具体贡献。

例如，多个机器人共同完成配送后获得奖励，但无法仅根据最终得分判断哪个机器人的动作最关键。

一种常见解决思路是 Centralized Training with Decentralized Execution：

- 训练阶段：Critic 可以利用多个智能体的联合状态、动作等信息进行价值评估。

- 执行阶段：每个 Actor 根据自身可获得的观测独立选择动作。

CTDE 可以缓解部分非平稳性与信用分配问题，但不能保证完全消除这些困难。

## Part 4 现代 LLM 智能体及信息来源

### 4\.1 智能体架构的转变

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjYzMTEzZGRjMDQ5MmQ0ZTFlMzZiMDEzM2E0ZjEyY2NfMTRmMDZlZDU3YjM2Yjc3YjhhODJmOGU4ZTNlZWJlYmJfSUQ6NzY5ODc1NDU0MzY5MzMzNjEwMF8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

以传统 AI Agent 与现代 AI Agent 的对比，引出基于大语言模型的智能体。

传统强化学习智能体主要通过环境交互获得奖励，再利用梯度更新模型参数。现代 LLM 智能体则以预训练语言模型为核心，结合记忆、自然语言指令、工具调用与反馈进行任务执行。

|**维度**|**传统 RL Agent**|**现代 LLM Agent**|
|---|---|---|
|核心模型|策略网络、价值网络|大语言模型|
|决策依据|状态、价值估计、奖励|语言上下文、预训练知识、外部信息|
|主要学习机制|奖励驱动的参数优化|预训练与后训练，推理时可结合反馈调整行动|
|反馈利用|更新策略参数|可通过反思、记忆与重新规划调整后续步骤|
|外部能力|环境交互|搜索、工具、记忆及其他系统|

两种不同的反馈机制：

- 传统 RL 中的梯度下降通常用于更新模型参数。

- LLM Agent 的反思推理通常是在推理过程中利用反馈调整后续行动，不必然修改模型参数。

两类智能体并非完全互斥。现代 LLM 也可以通过强化学习进行后训练，LLM Agent 也可以使用价值评估或奖励机制。

整门课程划分为四个阶段：

|**阶段**|**课程**|**核心内容**|
|---|---|---|
|Agent Foundations|L1–L3|AI Agent 概述、多模态嵌入、神经网络、Transformer、经典 RL、深度 RL|
|Agent Interaction|L4–L7|Prompt Engineering、Chain of Thought、工具增强智能体、Retrieval、RAG、Grounding 与 Verification|
|Agent Systems|L8–L10|单智能体与多智能体系统、Codex、Skills、具身智能体、Vision\-Language\-Action 模型|
|Integration|L11–L13|系统评估、前沿研究与项目实践|

本讲是 Agent Interaction 阶段的起点，重点从传统 RL 决策机制过渡到 LLM 智能体的信息获取与任务执行机制。

### 4\.2 大语言模型的知识边界 Knowledge Boundary of LLMs

#### 4\.2\.1 预训练知识的来源

大语言模型通过大规模预训练语料学习语言模式、事实关联及其他知识表示。

主要预训练知识来源包括：

|**数据来源**|**代表平台或资源**|
|---|---|
|Internet Forums（网络论坛）|Reddit、Quora|
|Books（书籍）|Google Books、Open Library|
|Encyclopedias（百科）|Wikipedia、Wikidata|
|News Sites（新闻网站）|The New York Times、BBC|
|Academic Articles（学术论文）|arXiv、PubMed|

这些来源共同构成模型可能接触的知识基础，但并不意味着每个模型都实际使用了上述所有平台的数据。

LLM 的知识能力受到训练数据的覆盖范围、质量、频率和时间范围等因素影响。

#### 4\.2\.2 预训练知识的覆盖与频率差异

Pretraining data shapes the agent's internal knowledge structure\.

预训练数据的分布会影响模型内部形成的知识表示。不同主题在训练数据中的出现频率并不相同。

|**知识类别**|**课件示例**|**数据分布特点**|
|---|---|---|
|高频知识|Cooking、Celebrities、Movies|相关语料较丰富|
|相对低频知识|Cantonese、Quasars|相关语料相对有限|
|非公开知识|Secret / Proprietary Data|可能未包含在可访问训练语料中|

通常，某个主题在训练数据中出现得越频繁，模型就越有机会学习与其相关的语言和事实模式。

但知识频率并不等同于知识正确性。高频错误同样可能被模型学习，而低频知识也不一定无法被准确掌握。

此外，模型可能在缺乏充分依据时生成表面合理但事实上不正确的内容，即产生幻觉（Hallucination）。

#### 4\.2\.3 对不完美自然语言的理解能力

LLM 对自然语言具有一定鲁棒性，可以处理拼写错误、缩写和不完整表达。

- 非标准输入：can u cook egs in microwav

- 标准表达：Can you cook eggs in the microwave?

模型能够识别两者表达的基本意图，并给出关于微波炉加热鸡蛋的安全提示，例如某些加热方式可能导致鸡蛋爆裂。

这一能力说明，LLM 不必依赖严格的关键词匹配或固定命令格式，即可从自然语言中推断用户意图。但自然语言容错不意味着模型能够可靠识别所有错误前提，因此仍需要事实验证。

#### 4\.2\.4 训练数据的质量问题

训练数据中可能存在的三类错误：

1. Typos（拼写错误）：例如 `cookin egs` 等不规范表达。

2. Misconceptions（错误观念）：未经验证或不符合事实的观点。

3. Outdated Information（过时信息）：例如将北京 2022 年冬奥会描述为尚未举行的事件。

这些问题可能影响模型输出的准确性与可靠性。

从知识形成过程看，模型主要通过学习数据中的统计规律获得能力，而非对每条训练信息进行独立的事实核验。

因此，训练数据中的错误、偏差和过时内容可能反映在模型生成的答案中。

#### 4\.2\.5 知识截止日期 Knowledge Cutoff

预训练知识具有时间边界。

课件以 GPT\-5\.4 为例，将 2025 年 8 月 31 日标记为其知识截止日期，用于说明模型无法仅依靠该截止日期之前的预训练数据掌握之后发生的新事件。这一日期是课件示例，并不代表所有模型具有相同的知识截止时间。

知识截止日期带来的问题包括：无法仅依靠预训练知识获得最新新闻、无法保证掌握当前营业信息、政策及价格、无法确认训练截止日期之后发生的事件、可能沿用已经失效的历史事实。

因此，预训练知识适合提供相对稳定的基础知识，但不能替代实时信息检索。

### 4\.3 联网搜索与信息可靠性 Web Search

#### 4\.3\.1 联网搜索的适用场景

联网搜索（Web Search）使 LLM Agent 能够在推理过程中获取外部信息，以弥补预训练知识的局限。

问题分为两类：预训练知识和 Web Search

联网搜索的主要触发条件可概括为：

- Real\-time：需要当前或近期信息。

- Location\-specific：需要特定地理位置的信息。

- Niche：涉及相对小众、训练数据可能覆盖不足的知识。

例如，查询香港红磡附近的健身房时，需要结合近期用户评价、健身房官网及地理位置信息。而对于长洲抢包山比赛，搜索可以补充活动背景、规则和具体安排。

#### 4\.3\.2 联网搜索的触发机制

两种搜索触发方式：

1. 模型自主触发（Model\-Initiated Search）

模型根据用户问题判断是否需要外部信息。

例如，当问题涉及实时、本地或小众知识时，模型可以主动选择搜索。

2. 用户显式触发（User\-Initiated Search）

用户明确要求模型使用网络搜索，或在界面中主动启用搜索功能。

两种方式的区别主要在于工具调用决策由模型还是用户发起。

#### 4\.3\.3 搜索来源的可靠性与时效性

联网搜索可以获取外部信息，但并不保证搜索结果天然准确。两个风险：

1. 来源可靠性差异（Source Reliability）

搜索结果可能来自：社交媒体、博客、网络论坛、百科平台、政府机构、专业组织、学术研究。

不同来源的可靠性、证据质量和适用范围存在差异。2025 年 LLM 常见引用域名统计中，Reddit、Wikipedia、YouTube、Google、Yelp 等平台占据较高位置，说明模型可能大量引用热门网络来源。但引用频率并不能直接证明来源可靠。

2. 来源时效性问题（Source Freshness）

以美国内华达州 Henderson 的跑步地点查询为例。模型检索到一条发布于 2003 年的跑步论坛帖子，但该信息距离查询时间已有约 23 年，相关场地可能已经关闭。

这说明：成功检索到信息，不代表该信息仍然有效。对于营业状态、交通路线、设施开放情况等动态信息，必须核查发布时间、更新日期和当前官方公告。

#### 4\.3\.4 来源引导 Source Guidance

来源引导是提示工程中控制搜索质量的重要方法。

普通提示：How safe are gray\-market peptides?

来源约束提示：How safe are gray\-market peptides? Use official health organizations and rigorous scientific studies\.

第二种提示明确要求使用官方卫生机构与严谨科学研究，能够引导搜索过程优先考虑更符合证据要求的信息来源。提示不仅决定搜索主题，也可以影响搜索来源的选择与信息过滤规则。

需要注意，权威机构和学术论文也应结合具体问题评估其适用性、发布时间与证据质量，而不能仅根据机构名称判断结论一定正确。

#### 4\.3\.5 联网搜索的多步骤工作流

课件将 Web Search 描述为一个包含检索、筛选和综合的多步骤过程：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGZjZDRhYWY1MDdlNjE1YTRhMGM3YTM0Yjg2MTJkMjNfYzMyN2U0ZjY4MWZkZDI3MWUxMzBhNTAyYjE0NDdlM2FfSUQ6NzY5ODc1NzU4MjU1NDU0OTc4OV8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Yjc3ZjA4NGM1NmJmYWUwNTQwZDg2MmVkOTYwNTNhOGZfMzhmZWYwNzRmYjgzNzYxYmQ0ZWMwYTE2OTFmN2E2ODdfSUQ6NzY5ODc1Nzc5MjkxMTc4OTYwNF8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

用户提示中的主要信息包括：

- Topic：研究主题。

- Task：需要完成的任务。

- Target Sources：目标信息来源。

- Desired Depth：期望的信息深度。

搜索系统据此执行检索、扫描结果、过滤不相关内容、汇总信息和生成回答。

其中，信息过滤不仅要考虑主题相关性，还应结合可靠性、时效性和来源质量。

**案例：黄山徒步**

该案例说明，复杂度适中的搜索任务可以分解为多个具体信息需求，再将结果整合为可执行的建议。

#### 4\.3\.7 搜索引擎与 AI 模型的选择

传统搜索引擎与 LLM 在信息处理方式上具有不同优势。

|**搜索引擎（Search Engine）**|**AI 模型（AI Model）**|
|---|---|
|快速浏览多个搜索结果|综合多个来源的信息|
|定位具体网站或页面|解释复杂概念|
|查看信息原始形式|比较不同来源的观点|
|适合明确的导航和查找任务|适合解释、比较与综合任务|

两个典型例子：

搜索 2013 Honda Civic air filter：更适合通过搜索引擎定位 The Home Depot、Walmart 等商品页面；查询维生素补充剂的利弊：更适合利用 AI 综合 WHO、FDA、EMA 等机构的相关信息。

因此，搜索引擎更适合获取原始页面与定位资源，而 AI 模型更适合跨来源的信息解释与综合。两者可以结合使用。

### 4\.4 Deep Research 与 Agentic AI 

#### 4\.4\.1 深度研究的基本概念

深度研究（Deep Research）是一种面向复杂问题的多步骤信息获取与分析工作流。

与普通联网搜索相比，其主要特点是：

1. Plan a Research Task：将复杂目标分解为多个研究子任务。

2. Read and Evaluate Sources：阅读并评估不同来源的内容。

3. Synthesize Findings with Citations：综合研究结果，并提供可追溯的引用。

深度研究通常需要多次搜索、阅读、评估和迭代，而不是执行一次检索后直接生成答案。

### 4\.4\.2 深度研究的迭代工作流

课件展示的完整流程为：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTg2Y2E3M2M0NDEyNzk4NmQxYmY3MTA4ZGEwZjRiMDVfMTM0OTM3N2YzM2M1ZTJmNTFiNDUxNjY1MGYxZDhmMjlfSUQ6NzY5ODc1ODgwNDA3NDEzOTE3Ml8xNzkyNzQwMTg1OjE3OTI4MjY1ODVfVjM)

1. Plan Research Task 研究规划与子问题分解

2. Web Search 多次检索；Read Sources 阅读资料

3. Evaluate Sources 判断相关性、可靠性与充分性

4. More Needed 返回检索阶段补充证据；Sufficient 进入结果综合阶段

5. Synthesize → Draft → Add Citations 综合证据、撰写报告并添加引用

6. Final Answer with Sources 

深度研究的关键在于评估结果是否充分，并据此决定继续检索还是生成最终报告。

这构成一个基于证据充分性的反馈循环，而不是固定执行一次的线性流程。

Agentic AI：模型能够在给定任务范围内，自主决定下一步需要执行的操作。

这种自主性体现在：

- 根据任务目标分解研究步骤。

- 判断不同子任务需要哪些信息来源。

- 在执行过程中决定下一步搜索或阅读内容。

- 整合检索结果并生成报告。

但自主执行并不等于不需要用户控制。用户仍然可以通过任务范围、约束条件及必要的确认步骤限制智能体行为。

### 4\.5 Web Search 与 Deep Research 的区别

|**维度**|**Web Search**|**Deep Research**|
|---|---|---|
|问题类型|通常是单个聚焦问题|多个相互关联的问题|
|任务复杂度|相对较低|相对较高|
|来源数量|通常少量来源|可能几十条或更多|
|典型耗时|几秒至几分钟|几分钟或更长|
|处理过程|检索、过滤、总结|规划、检索、阅读、评估、迭代、综合|
|主要产出|聚焦的事实或答案|带证据的综合分析报告|
|案例一|寻找附近高评分健身房|研究每日步数对长期健康的影响|
|案例二|查询迪拜本周天气|分析天气对迪拜旅游业的影响|

两者的主要区别不是是否使用搜索工具，而是研究任务的复杂度、证据整合要求及是否需要多轮迭代。

### 4\.6 智能体信息来源的综合比较

现代 LLM 智能体的三种信息获取方式对比：

|**维度**|**Pretrained Knowledge**|**Web Search**|**Deep Research**|
|---|---|---|---|
|信息来源|模型内部参数知识|外部检索结果|多轮外部检索与分析|
|检索来源数量|无|通常少量|可能几十条以上|
|信息时效性|受训练数据限制|取决于来源|取决于来源|
|典型耗时|秒级|秒至分钟级|分钟级或更长|
|主要用途|定义、常识、基础解释|实时、本地、小众信息|复杂问题的多源综合|
|课件示例|手机掉入汤中如何处理|寻找附近健身房|每日步数与长期健康关系|

三种方式不是相互排斥的独立技术，而是可以组合使用的信息获取机制。

例如，深度研究通常同时利用：

- 预训练知识理解任务、生成研究计划。

- Web Search 获取外部证据。

- LLM 的推理与综合能力整理资料。

- 引用机制提高结果的可追溯性。

因此，现代 LLM Agent 的能力不仅取决于模型自身掌握多少知识，也取决于其能否正确判断信息需求、选择工具、评估来源并综合证据。

### 4\.7 本讲核心知识总结

本讲的内容可以归纳为两条主要技术路线。

第一条：从奖励驱动的学习到复杂环境中的自主决策。

强化学习通过奖励优化策略，DQN 和策略梯度分别代表基于价值与基于策略的典型方法。

当任务具有稀疏奖励时，可以通过奖励塑形和课程学习改善训练条件。AlphaGo 系列展示了监督学习、自我对弈、搜索与模型学习的结合；多智能体强化学习则进一步引入环境非平稳性与团队信用分配问题。

第二条：从预训练知识到外部信息增强的智能体。

LLM 具备广泛的预训练知识，但受到数据覆盖、知识频率、数据质量及知识截止日期等限制。

联网搜索通过外部信息补充模型知识，同时引入来源可靠性和时效性问题。深度研究进一步将信息获取组织为规划、检索、评估、迭代与综合的完整工作流。

两条路线共同体现了智能体研究的核心问题：如何使智能体在不确定环境中利用反馈与信息持续改进决策。

## Part 5 思维链推理与问题分解 

本部分讨论如何通过提示工程（Prompt Engineering）提高大语言模型处理复杂任务的能力。其核心思想是：将复杂任务分解为可管理的中间步骤，并根据任务性质选择语言推理、程序计算或外部工具。

主要涉及三种方法：

1. 思维链推理（Chain\-of\-Thought, CoT）：通过中间推理步骤解决复杂问题。

2. 程序辅助语言模型（Program\-Aided Language Models, PAL）：利用语言模型生成程序，再由程序执行精确计算。

3. 问题分解与提示链（Problem Decomposition \& Prompt Chains）：将复杂任务拆分为多个子任务，通过模型与工具的多轮调用完成。

### 5\.1 思维链提示 Chain\-of\-Thought Prompting

#### 5\.1\.1 基本原理

思维链提示是一种通过引导模型生成中间推理步骤来完成复杂任务的提示技术；传统提示通常要求模型直接输出最终答案，而思维链提示则要求模型先完成必要的中间计算或逻辑分析，再得出结论。

1. 以网球数量计算为例：Roger 原本有 5 个网球，又购买了 2 罐网球，每罐有 3 个。他现在共有多少个网球？

标准提示（Standard Prompting）可能直接得到答案，而思维链提示会提供分步求解。

2. 通过苹果数量问题说明两种方法的区别：某食堂原有 23 个苹果，使用 20 个制作午餐，之后又购买 6 个。

标准提示示例错误地回答为 27，而思维链提示按照步骤求解。

显式分解问题可以帮助模型处理多步骤计算，降低遗漏条件或错误组合运算的风险。但需要注意，思维链并不保证结果正确。模型生成的推理步骤仍可能存在逻辑错误或计算错误，因此不能仅凭推理过程完整就认定结论可靠。

#### 5\.1\.2 Few\-shot CoT 与 Zero\-shot CoT

思维链提示主要有两种实现方式。

|**比较维度**|**Few\-shot CoT**|**Zero\-shot CoT**|
|---|---|---|
|提示方式|提供包含中间步骤的完整示例|直接使用推理指令|
|是否需要示例|需要|不需要|
|主要机制|上下文学习（In\-context Learning）|通过指令诱导模型进行分步推理|
|提示长度|相对较长|相对简短|

1. Few\-shot Chain\-of\-Thought

通过在提示中提供若干完整的解题示例，使模型学习任务的推理结构。

其形式可以表示为： $P=\{(x_1,r_1,y_1),\ldots,(x_k,r_k,y_k),x_{\text{new}}\}$

- $x_i$：示例问题。

- $r_i$：示例中的中间推理步骤。

- $y_i$：示例的最终答案。

- $x_{\text{new}}$：需要解决的新问题。

模型根据上下文中的示例，生成新问题的求解步骤及答案。这种方法属于上下文学习，不需要更新模型参数。

2. Zero\-shot Chain\-of\-Thought

即使没有提供完整的推理示例，模型也可能通过简单指令生成中间推理步骤。

典型指令为：Let's think step by step\.

该研究涉及 PaLM 和 InstructGPT 等模型。模型能够在缺少示例的情况下产生推理步骤，可能与预训练数据中包含的推理范例，以及系统指令等因素有关。

**CoT 的适用边界**

思维链更适合多步骤推理、逻辑分析和复杂问题求解，而不是所有任务都必须生成详细推理文本。对于简单事实查询，直接回答通常更高效；对于精确计算，则应优先使用程序验证。

### 5\.2 程序辅助语言模型 Program\-Aided Language Models, PAL

#### 5\.2\.1 基本思想

程序辅助语言模型（PAL）通过结合自然语言理解与程序执行，提高复杂计算任务的可靠性。

核心原则：由语言模型理解问题并生成程序，由程序解释器执行计算并返回结果。

传统语言模型直接生成计算结果，可能产生算术错误。PAL 将自然语言推理与数值计算分离，使计算过程能够通过确定性程序执行。

整体流程：自然语言问题（Question）；LLM：理解问题并生成程序；Python Interpreter：执行程序；计算结果（Answer）。

#### 5\.2\.2 PAL 的实现方式

两项关键方法：

1. 在提示中提供结合自然语言与代码的示例。

2. 由 LLM 生成程序，并使用 Python 解释器执行程序以获得答案。

#### 5\.2\.3 PAL 的优势与局限

PAL 的主要优势包括：

- 计算准确性：使用程序执行算术运算，减少语言模型直接计算产生的错误。

- 可复现性：相同输入和相同程序通常能够得到相同结果。

- 可验证性：可以检查生成的代码、变量定义及计算逻辑。

- 工具扩展性：可进一步使用 Python 库处理统计分析、符号计算及数据可视化任务。

需要区分两类错误： $\text{最终结果错误} = \text{问题形式化错误} \;\lor\; \text{程序执行或计算错误}$

这一表达式用于说明错误来源，而不是概率公式。即使程序能够正确执行，如果模型错误理解题意、遗漏条件或生成错误公式，最终结果仍然可能不正确。

因此，PAL 的可靠性依赖于两个环节：

1. 语言模型是否正确地将问题转化为程序。

2. 程序是否正确执行并产生预期结果。

### 5\.3 问题分解与提示链 Problem Decomposition and Prompt Chains

#### 5\.3\.1 问题分解

问题分解是指将复杂任务划分为多个规模较小、目标明确的子问题，并逐步解决。

典型工作流（重复执行）： $\text{提出子问题} \rightarrow \text{搜索引擎检索} \rightarrow \text{获取中间答案} \rightarrow \text{继续提问} $

例如，问题为：Theodore Haeker 和 Harry Vaughan Watkins 谁活得更久？

模型首先需要分别查询两人的死亡年龄，再比较结果；另一示例涉及查询当前最高的木制格构塔及其建成年份。模型首先通过搜索确定目标建筑为 Gliwice Radio Tower，随后继续查询其建成年份，得到 1935 年。

复杂信息查询往往需要利用前一步的检索结果来确定下一步的检索目标。通过 Few\-shot Examples 示范如何提出子问题、调用搜索工具以及根据检索结果继续追问。

#### 5\.3\.2 提示链 Prompt Chains

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWNjZTI5OGI2NDM0MWNkZTQ0ZjZlM2Q1NWM4YzlhYzBfYWFmZTg1ZmNhM2Y0MjlhZDliZTI2MGIzY2Y2ZmJhYTVfSUQ6NzY5ODc2NDEwODM3MTUxMjg2OF8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

提示链是将多次语言模型调用与外部函数调用按照一定顺序连接起来的工作流。

#### 5\.3\.3 思维链与提示链的区别

|**维度**|**思维链（CoT）**|**提示链（Prompt Chains）**|
|---|---|---|
|核心对象|推理过程|系统执行流程|
|主要形式|中间推理步骤|多次模型或工具调用|
|是否必须调用工具|否|否，但可以集成工具|
|中间结果|推理步骤或中间答案|结构化数据、文本或工具结果|
|主要作用|提升复杂推理能力|提高复杂任务的可管理性|

两者可以结合使用：提示链中的某个模型调用可以采用思维链提示，而整个任务由多个调用共同完成。

总结： CoT 解决如何组织推理，PAL 解决如何借助程序计算，Problem Decomposition 解决如何拆分任务，Prompt Chains 则将这些步骤组织为可执行的工作流。

## Part 6 多模态人工智能与内容生成 Multimodal AI and Content Generation

多模态人工智能能够处理不同形式的信息，包括文本、图像、音频和视频。

本部分主要讨论多模态输入输出、视觉理解的局限、图像提示工程以及生成模型的基本原理。

### 6\.1 多模态输入与输出 Multimodal Inputs and Outputs

#### 6\.1\.1 多模态系统的基本结构

传统文本模型主要处理自然语言，而多模态模型可以同时接收不同类型的信息，并生成一种或多种形式的输出。

多模态任务可以抽象为： $Y=f_{\theta}(X_{\text{text}},X_{\text{image}},X_{\text{audio}}) $

其中，$f_{\theta}$ 表示多模态模型，$X$ 表示不同模态的输入，$Y$ 表示输出结果。

#### 6\.1\.2 多模态生成的价值

课件通过两个示例说明生成式 AI 在视觉表达方面的应用：

1. 从设计概念到可视化效果

通过生成图像，可以将蛋糕设计构想转化为具体的视觉参考，从而提高设计方案的可沟通性。

2. 生成现实中难以拍摄的场景

例如，生成一个人缩小到昆虫大小的画面。相较于静态图像，视频还包含时间维度上的变化，包括人物动作、物体运动以及场景演化。

因此，视频生成不仅需要保证单帧画面的合理性，还需要维持连续帧之间的一致性。

### 6\.2 多模态理解的局限与图像提示策略

#### 6\.2\.1 细粒度视觉识别的挑战

尽管多模态模型能够理解图像中的主要对象，但在识别外观高度相似的物体时，仍可能发生错误。

课件中的健身器械案例：图像整体语义理解能力不等于细粒度视觉辨别能力。对于具有相似外观的设备，模型可能忽略决定其功能的局部结构。

实际应用中，应重点关注物体的结构、连接方式、操作部件和功能差异，而不应仅依赖整体外观。

#### 6\.2\.2 图像与文本的联合推理

课件以餐厅收据为例，说明多模态模型需要同时完成图像信息提取、文本条件匹配和数值计算。

这一案例反映出多模态任务可能同时包含三种误差来源：

1. 图像识别错误，例如读取了错误的商品价格。

2. 语义匹配错误，例如未正确识别用户消费的商品。

3. 数值计算错误，例如错误计算税费或合计金额。

因此，对于涉及票据、报表等结构化信息的任务，应将信息提取与数值计算分开处理，并对最终结果进行复核。

#### 6\.2\.3 图像提示的实践原则

课件提出以下建议：

1. 利用图像文字识别能力：模型可以读取图像中的基本文字，例如收据、标牌和截图。

2. 注意视觉细节遗漏：对关键数字、细小文字和相似物体进行额外检查。

3. 必要时提供多张图像：使用不同角度、不同区域或不同时间的图像补充信息。

4. 明确每张图像的作用：说明各图提供的具体信息，减少模型对图像关系的错误理解。

其中，第四点尤为重要。例如，分析某个设备时，可以明确规定：图一展示设备整体结构、图二展示控制面板、图三展示接口与连接方式。这种方式能够提高输入信息的组织程度，使模型更容易围绕任务目标提取有效信息。

### 6\.3 多模态生成的能力、时间与成本

#### 6\.3\.1 多模态生成技术的发展

课件通过不同阶段的生成结果说明图像、视频和语音生成能力的发展。

视频生成方面，对比了：Imagen Video（2022）、Seedance 系列视频生成模型

语音生成方面，对比了早期与近期的 AI 语音生成效果。这些示例主要说明多媒体生成在视觉质量、动作表现和语音自然度等方面取得了显著进展。

#### 6\.3\.2 不同模态的生成成本

课件按照典型生成时间与成本，从低到高给出以下排列： $\text{Text} < \text{Speech} < \text{Images} < \text{Video}$

这里的 $C$ 表示课件中的典型成本趋势，而非适用于所有模型的严格不等式。

实际生成成本还取决于模型、输出长度、分辨率、采样设置及服务定价。

在工程实践中，可以先使用低成本的文本交互确定需求，再进行图像生成或视频生成，从而减少不必要的高成本调用。

### 6\.4 图像生成提示工程 Image Generation Prompt Engineering

#### 6\.4\.1 图像提示的核心组成

课件建议通过 AI 辅助编写图像生成提示，将简短需求扩展为包含具体视觉信息的描述。

例如，原始需求为：生成一只猫在夜晚秘密经营咖啡店的图像。

扩展后的提示包含三个主要组成部分。

|**组成**|**英文**|**主要内容**|
|---|---|---|
|场景|Setting|时间、地点、环境、背景|
|角色细节|Character Details|主体外观、服装、动作|
|氛围与风格|Mood / Style|情绪、艺术风格、画面表现|

例如：

- Setting：夜间咖啡店、温暖的室内环境。

- Character Details：橘猫、围裙、制作浓缩咖啡。

- Mood / Style：奇幻、温馨、卡通风格。

这一结构能够将抽象创意转化为更具体的视觉生成要求。

#### 6\.4\.2 使用明确的视觉风格词汇

课件列举了四种典型风格：相比于“让图片更好看”等模糊要求，明确指定视觉风格更容易形成可执行的生成约束。此外，课件还建议让 AI 描述参考图像，将参考图中的构图、光线、色彩与风格转化为文字提示。

图像生成提示的扩展结构

在课件三个组成部分的基础上，可以进一步加入构图与限制条件：

- $S$：Setting，场景。

- $C$：Character Details，主体细节。

- $M$：Mood / Style，氛围与风格。

- $K$：Composition，构图与镜头。

- $R$：Restrictions，限制条件。

### 6\.5 图像生成模型的基本原理

#### 6\.5\.1 自回归生成与扩散生成

两种生成机制：

1. 自回归模型（Autoregressive Models）

自回归语言模型通常根据已有 token 序列，逐个预测后续 token。其联合概率可以表示为：

$P(x_1,\ldots,x_T) = \prod_{t=1}^{T}P(x_t\mid x_1,\ldots,x_{t-1})$

其中，$x_t$ 表示第 $t$ 个 token。

2. 扩散模型（Diffusion Models）

扩散模型通过多个步骤，将噪声逐渐转化为具有结构的图像。简化的反向生成过程为：

$x_T\rightarrow x_{T-1}\rightarrow\cdots\rightarrow x_0$

$x_T$：初始噪声；$x_t$：中间去噪状态；$x_0$：最终生成图像。

对于文本条件图像生成，模型根据文本提示对应的条件表示引导去噪过程，使最终图像符合用户描述。

简化流程：$\text{Text Prompt} \rightarrow \text{Text Understanding} \rightarrow \text{Latent Representation} \rightarrow \text{Image Generation}$

文本理解模块负责处理提示中的词语及其关系，图像生成模块根据条件信息生成视觉内容。需要注意，扩散模型并非唯一的图像生成方法，实际系统也可能使用其他生成架构。

#### 6\.5\.2 从低维潜在分布生成图像

课件进一步介绍了生成模型的一般思想：通过生成器，将低维潜在变量映射到高维图像空间。

设潜在变量为： $z\sim p_z(z)$

其中，$p_z$ 可以是标准正态分布： $z\sim\mathcal{N}(0,I)$

生成器执行映射： $y=G_{\theta}(z)$

- $z$：低维潜在向量。

- $G_{\theta}$：生成器。

- $y$：生成的高维图像表示。

生成器通过学习，将简单潜在分布映射为复杂的数据分布，从而生成具有不同外观与特征的图像。

#### 6\.5\.3 生成对抗网络 Generative Adversarial Networks, GAN

GAN 由两个网络组成：

- Generator（生成器）：生成尽可能逼真的图像，以欺骗判别器。

- Discriminator（判别器）：判断输入图像来自真实训练数据还是生成器。

训练过程可以理解为生成器与判别器之间的对抗博弈。

其经典目标函数为： $\min_G\max_D V(D,G) = \mathbb{E}_{x\sim p_{\text{data}}} [\log D(x)] + \mathbb{E}_{z\sim p_z} [\log(1-D(G(z)))]$

- $D(x)$：判别器认为真实图像 $x$ 为真的概率。

- $G(z)$：生成器根据潜在向量 $z$ 生成的图像。

- $D(G(z))$：判别器认为生成图像为真的概率。

生成器希望生成图像难以被判别器识别为伪造，判别器则希望提高真假识别能力。在反复训练过程中，生成器逐渐学习真实图像的数据分布。

GAN 与扩散模型的主要区别

|**维度**|**GAN**|**Diffusion Model**|
|---|---|---|
|核心机制|生成器与判别器对抗训练|学习逐步去噪|
|生成过程|通常一次生成映射|通过多个去噪步骤生成|
|典型训练特点|对抗优化|去噪目标优化|
|主要挑战|训练不稳定、模式崩溃|采样计算成本等|

## Part 7 使用 AI 进行数据分析 Data Analysis with AI

本部分讨论如何结合语言模型、代码执行工具与数据可视化完成数据分析任务。

核心原则：模型负责理解分析目标、组织流程和解释结果，代码负责数据处理、数值计算及绘图。

### 7\.1 AI 数据分析的基本流程

三个步骤：

1. Ask a clear question about your data：明确数据分析问题。

2. Use code to calculate and plot：使用代码计算并绘制图表。

3. Review the resulting insights：审查分析结果与结论。

这一流程强调，数据分析不能仅依赖模型生成的文字解释，而应建立在实际数据计算和结果验证的基础上。

#### 7\.1\.1 明确分析目标

分析问题决定了需要使用的数据字段、统计指标和可视化方式。

例如：我的跑步配速和距离如何变化？该问题至少涉及时间、跑步距离和配速三个变量。

#### 7\.1\.2 使用程序计算与可视化

课件展示了个人跑步记录的分析案例。

### 7\.1\.3 审查分析结论

数据分析完成后，应检查：

- 指标定义和单位是否正确。

- 统计结果是否与原始数据一致。

- 图表是否正确反映数据变化。

- 模型给出的解释是否具有数据依据。

尤其需要区分相关关系与因果关系，不能仅根据趋势同时变化就认定存在因果联系。

### 7\.2 代码执行作为智能体工具

#### 7\.2\.1 AI 工具的基本类型

课件将代码执行与其他工具放在同一个智能体框架中。

其中，代码执行工具主要用于需要精确计算或生成图表的任务。

#### 7\.2\.2 工具调用与推理循环

智能体可以根据当前上下文判断是否需要使用工具，并将工具返回结果重新纳入后续处理。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTk5ZDhmNGU1YWQ1OThhODc1ZDA3YmM3ZTVmZTMzOWFfMzU3MWM0MzY2MGE0OTQzOGVjMzc1MGIxZGI5MzU4NzZfSUQ6NzY5ODc2NzE1NTk0NDQ5MjU4MF8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

这一流程将语言模型的推理能力与外部工具的执行能力结合起来。

### 7\.2\.3 商业销售数据分析

以小型企业销售数据为例，展示 AI 如何通过代码执行完成月度分析。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTVmMzdiNTljM2U5ZTQzNWVjZDM2NjZjMzgzYzU1MTFfZDA0OWI4NGY4OTBiYjFmNzNjZTUwNWY5ZGY3ZWEzN2NfSUQ6NzY5ODc2NjcwMDY3MzU1MTkxMF8xNzkyNzQwMTg1OjE3OTI4MjY1ODVfVjM)

数据包含：Date：日期；Orders：订单数量；AvgOrderValue：平均订单金额；Revenue：营业收入

基本关系为： $R_i=N_i\times A_i$

其中，$R_i$ 表示第 $i$ 天营业收入，$N_i$ 表示订单数，$A_i$ 表示平均订单金额。

月度营业收入为： $R_{\text{month}}=\sum_{i=1}^{n}R_i $

模型可以通过代码计算月度营业收入、生成图表并识别异常值。

该案例展示了 AI 从自然语言问题到可执行数据分析流程的转换。

### 7\.3 从数据中提取洞察 Getting Insights from Data

课件以饮品销售数据为例，要求识别销售变化最大的饮品并绘制图表。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGY5MGI4MWYxOWNlYWQyOGI5NDg3MTE2MmM1MDViMWRfNzJiMTI5ODY2MTczMWIwNzlkNWU4Y2YyN2MzZDMwYzRfSUQ6NzY5ODc2NjQyNzY0OTc4OTQ3Nl8xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

模型执行的主要步骤为：

1. Inspecting the data：检查数据。

2. Calculating monthly changes：计算月度变化。

3. Identifying outstanding drinks：识别变化显著的饮品。

4. Plotting selected drinks：绘制选定饮品的趋势图。

图表同时使用 Others \(avg\) 作为其他饮品的平均销售基线，并标注 Spring Promo、Summer Push 和 Fall Launch 三个营销阶段。

**销售变化的计算：**设某饮品在月份 $t$ 的销售额为 $S_t$。

绝对变化量： $\Delta S_t=S_t-S_{t-1}$

相对变化率： $r_t=\frac{S_t-S_{t-1}}{S_{t-1}}\times100\%$

其中，变化率仅在 $S_{t-1}\neq0$ 时可直接使用。

绝对变化量反映实际销售额的变化规模，相对变化率反映相对于原有销售水平的变化幅度。

可视化不仅是展示数据，更应突出与分析问题相关的变化、异常和对照关系。

## Part 8 人工智能的能力与责任 AI Capabilities and Responsibility

### 8\.1 生成式 AI 的双重用途

随着生成式 AI 能力增强，技术应用不仅需要考虑功能实现，还需要考虑安全性、授权和潜在社会影响。

课件通过 AI 语音生成说明同一种技术既可以支持合理应用，也可能被用于欺诈。

|**应用场景**|**具体用途**|**风险性质**|
|---|---|---|
|Podcast Editing|修复播客中的口误或音频问题|正当编辑用途|
|Character Voice Generation|为虚拟角色生成逼真的语音|创意内容制作|
|Voice Impersonation|模仿亲属声音实施诈骗|身份冒充与欺诈|

语音生成本身并不能决定应用是否安全，关键取决于具体使用方式、是否获得授权以及是否具有误导或欺诈目的。

#### 8\.1\.1 负责任使用 AI 的原则

在实际系统中，可以从以下方面降低风险：

- 知情同意：使用真实人物声音或形象时，应获得必要授权。

- 透明性：在适当场景中标明内容由 AI 生成或修改。

- 隐私保护：避免未经授权收集或处理个人敏感数据。

- 身份验证：对涉及资金、账户及身份的高风险请求进行独立验证。

- 人工监督：对可能产生重大影响的输出设置审核机制。

这一部分与前文的多模态生成形成对应关系：模型生成能力越强，越需要将安全约束纳入实际应用设计。

## Part 9 使用 AI 构建应用 Building Apps with AI

本部分介绍如何通过自然语言提示，让 AI 辅助生成交互式应用程序。

课件强调将 AI 的代码生成能力与明确的应用需求结合起来，并通过简单项目逐步积累开发经验。

### 9\.1 AI 辅助应用开发

AI 可以将用户描述的功能需求转换为程序代码，并组合界面、交互逻辑与算法。

应用类型包括：Game App：游戏应用、Study Timer：学习计时器、Quiz App：测验应用、Habit Tracker：习惯追踪应用、Expense Splitter：费用分摊工具。

应用开发的关键不只是让模型生成代码，还包括准确描述需求并验证生成结果。

### 9\.2 AI 应用提示的三个基本要素

三个基本模块组织应用开发提示。

|**模块**|**英文**|**核心问题**|
|---|---|---|
|Goal|What to create|要开发什么应用？|
|Input|What users provide|用户如何提供输入或操作？|
|Output|What the app shows|应用应该显示什么结果？|

三者共同构成应用需求的基本描述框架。

#### 9\.2\.1 示例：寻路游戏（Pathfinding Game）

用户希望构建一个可以放置障碍物与目标位置，并模拟路径搜索的游戏。

其需求可以拆分为：

- Goal：构建交互式寻路游戏。

- Input：用户在画布上设置障碍物、起点和终点。

- Output：显示搜索到的路径，并通过动画演示。

模型使用单个 HTML 文件实现交互式游戏，并使用 A\* 算法进行路径搜索。

A\* 算法的评价函数为： $f(n)=g(n)+h(n)$

- $g(n)$：从起点到当前节点 $n$ 的已知路径代价。

- $h(n)$：从当前节点到目标节点的估计代价。

- $f(n)$：用于选择搜索节点的估计总代价。

当启发函数满足相应条件时，A\* 可以找到最优路径。

#### 9\.2\.2 示例：烟花模拟器（Fireworks Simulator）

用户要求：构建一个交互式烟花应用，点击屏幕后从底部发射烟花并产生爆炸效果。

其需求结构为：

- Goal：生成烟花模拟器。

- Input：用户点击或触摸屏幕。

- Output：显示彩色烟花的发射、爆炸与消散动画。

课件中的模型使用 HTML5 Canvas 与 JavaScript 实现烟花动画，并引入重力、摩擦和渐隐拖尾等效果。该案例说明，用户可以先描述应用目标与交互行为，再由模型选择适当的实现技术。但对于重要功能，仍需要在提示中明确约束，避免模型自行补充不符合预期的设计。

### 9\.3 应用需求描述与验证

#### 9\.3\.1 学习计时器（Study Timer）

课件要求创建一个包含以下功能的学习计时器：25 分钟专注时间。5 分钟休息时间。Start、Pause 和 Reset 控制。倒计时结束时显示完成消息。提供 10 秒测试模式，便于课堂验证完整流程。

该任务不仅定义了应用功能，还包含明确的测试要求。从软件工程角度看，测试模式可以帮助开发者快速验证状态转换、计时逻辑及完成反馈是否正常。

#### 9\.3\.2 Flappy Bird 游戏

课件要求根据参考图片生成 Flappy Bird 游戏。

与学习计时器不同，该任务没有提供完整的文字规格，因此需要从参考图像和游戏规则中补充：游戏目标。玩家操作方式。障碍物与碰撞规则。得分机制。游戏结束条件。

这一案例说明，AI 辅助开发并不能消除需求分析的重要性。即使模型能够生成代码，仍需要明确预期行为与验收标准。

### 9\.4 应用复杂度与开发策略

不同应用的实现难度存在显著差异，应优先从简单项目开始。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzM5MDJmZDhiMGE0NDA2OWJiM2UyZGI1OWVjOGE2NTZfMTA3ODVkMWRjYzliNDdjNWM5NGU3NjM3ZDE1ZmY2MzRfSUQ6NzY5ODc2ODQ4NTE2MTIwOTM3M18xNzkyNzQwMTg0OjE3OTI4MjY1ODRfVjM)

简单应用通常具有明确的规则、有限的状态以及较少的外部依赖。

复杂应用则可能涉及：网络通信与服务器。多用户状态同步。实时模型调用。响应延迟。API 成本。异常处理与系统可靠性。

因此，合理的开发策略是先完成最小可行产品（Minimum Viable Product, MVP），再逐步加入复杂功能。

## Part 10 Take\-home Points and Exercises

### 10\.1 本讲核心知识总结

课件最后将整讲内容归纳为四个方面。

第一，借鉴人类学习策略提高智能体性能。

课程学习（Curriculum Learning）与奖励塑形（Reward Shaping）等策略可以改善智能体的训练效果。

第二，将预训练知识与外部搜索结合。

LLM 智能体能够利用已有知识，并通过搜索与研究工具获取当前、小众或复杂的信息。

第三，通过思维链与问题分解处理复杂任务。

将复杂问题转化为中间步骤，并在必要时结合程序计算与外部工具，提高任务处理的可验证性。

第四，利用提示工程完成实际应用。

通过明确目标、输入、输出和约束，AI 可以辅助完成图像生成、代码编写及简单应用开发。

从智能体能力提升到实际应用构建的整体逻辑：

$\text{学习与优化} \rightarrow \text{知识与工具增强} \rightarrow \text{推理与任务分解} \rightarrow \text{多模态生成与应用开发} $

### 10\.2 课堂练习

**练习一：DQN 的贪婪动作选择**

问题：采用贪婪策略时，DQN 选择什么动作？

A\. Estimated Q\-value 最大的动作

B\. Policy Sampling Probability 最大的动作

C\. 上一次即时奖励最大的动作

正确答案：A。

DQN 根据估计的动作价值选择动作： $
a^*=\arg\max_a Q(s,a)$

**练习二：应用提示的三个组成部分**

问题：哪个提示同时包含应用目标、用户输入与输出？

A\. 输入账单和人数，显示每个人应支付的金额。

B\. 创建一个设计美观且实用的学生应用。

C\. 创建一个使用最先进的 AI 的账单应用。

正确答案：A。同时明确了费用分摊目标、账单与人数输入，以及每人应付金额的输出。

**练习三：模型推理详细但计算错误**

问题：AI 给出了详细推理过程，但最终总额错误，应如何处理？

A\. 因为推理详细而接受答案。

B\. 检查单位并使用代码重新计算。

C\. 要求模型提供更长的解释。

正确答案：B。详细推理不等于正确计算。对于可形式化的数值任务，应通过代码执行与结果复核提高可靠性。

建立一套完整的方法体系：通过推理与分解理解任务，通过代码与工具执行任务，通过多模态技术扩展输入输出形式，最终将这些能力组合为可验证、可交互的 AI 应用。


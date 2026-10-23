# 5583 Agentic Computing2

# Lecture 5 Prompt Engineering II

## Part 1 Brainstorming

### 1\.1 Roadmap

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2Y5OTRhMThjMDcyNzE4ZmVlMjQ3OGI1OTkwNTg2MmZfNDU4MGZmNjhmNDEwZTcyYjE5MjY4ZDUzYTg0YjQxOTZfSUQ6NzY5MzA0OTYzMDQwOTQ5NDA0OF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

Brainstorming 上下文 \+ 选项 \+ 迭代

Context Management 上下文管理：上下文窗口里到底装了什么、什么是相关的、什么是干扰的。

In\-Context Learning 上下文学习：不改参数，只靠提示里的示例改变模型行为。

Reasoning \& Sycophancy 推理与谄媚：模型怎么想多步问题，以及它为什么会顺着你的话讲。

Writing \& Revision 写作与修订：拆解 AI 味的来源，用大纲、逐段编辑、评分标尺来改进产出。

Tutorial: Prompt Engineering Practice 提示工程实践。

### 1\.2 Modern Agent

Recap: from classical RL agents to modern LLM agents

从经典强化学习智能体过渡到以语言模型为核心的智能体。

Recap: several key concepts in prompt engineering

复习提示工程的几个关键概念，为第二部分的深入做铺垫。

Recap: GPT with next\-token prediction

下一词预测是后面为什么采样能带来多样性的机制前提。

### 1\.3 How people use GPT

AI 最常被用来做的是写和给建议，而创意发散只占很小一块分，这是一项被低估、但值得专门练的能力。

Writing：Editing text / Personal communication / Translation / Summarization / Writing fiction。

Practical Guidance：Learning / How\-to advice / Health, fitness, beauty / Creative ideation。

其余并列大类：Finding info\. / Technical help / Multimedia / Self\-expression / Other。

### 1\.4 Brainstorming with an AI agent

三个可复用动作

1. 上下文具体化：Providing more context 提供更多上下文，把可量化条件一次给全。

2. 限定输出形态：Give 3 plans 明确要三个方案而不是一段建议。

3. 反馈式迭代：Iterating multiple rounds（多轮迭代）I can’t stick to these 把问题说成我做不到而不是你的方案不好



$p(x_{t+1} | x_{1:t}, W)$

From next\-token prediction $p(x_{t+1} | x_{1:t}, W)$ to varied responses through sampling。

W 是模型参数（权重）， $x_{1:t} $是已经生成的前缀， $x_{t+1} $是下一个 token。

模型输出的不是一个词，而是一个概率分布；从分布里采样（sampling）而不是取最大，就会得到不同结果。

Sampling can produce different responses 同一句提示问两遍，答案可能不同，原因就在这里。

注意 W 在这句里是固定不变的：多样性来自采样过程，不是来自模型更新。

### 1\.5 Recap: GPT with next\-token prediction

Given the previous tokens, the model tries to predict the next token。

训练目标是自回归（autoregressive）：给定前 t 个 token，最大化第 t\+1 个 token 的似然。所以模型的一切行为，顺着你说、写 AI 味的句子、给出常见答案，都源于预测下一个最可能的 token这一件事。

理解了这个目标，才能理解为什么 prompt 有这么大影响（改变的是条件分布）。

### 1\.6 How to encourage creativity?

给出上下文（决定在哪个区域采样）和多个选项（决定采几个点）

1. 只给上下文、不要多个选项。模型给一个看起来很合理的方案，没有比较的余地；

2. 只要多个选项、不给上下文。模型可能给的是分布中心的三个变体。

### 1\.7 Brainstorming is iterative

三轮对话的节奏：发散 → 收敛 → 落地

第一轮给约束（4 人 / 10 分钟 / 下周五），产出 3 个结构不同的方案；

第二轮给反馈（不能线下见面 / 有人紧张 / 只有 20 分钟线上），产出 3 个针对新约束的方案；

第三轮做选择（Plan 4 sounds workable）并要求展开到日程级别。

注意第三轮的关键动作：先明确说保留什么（Keep the shared outline and short rehearsal），再要求细化，这样模型不会在细化过程中把前两轮谈定的东西改掉。

### 1\.8 头脑风暴流水线　Brainstorming recipe

把前三节收成一条流水线，并给出AI 当思考伙伴的完整定义。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTYzMDIwMDA0MDg3NzhlZjIxZmY2MWQxYjMxYzlmMWRfZGMxNDkyNDExYjI4NWQ2NDJiYWYyMzM2YTQyY2Q3ZGFfSUQ6NzY5MzA0OTYyOTUzMjkwMDg5Ml8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

Context（上下文） 说清楚约束与现状；

Options（选项）一次要多个，不要一个；

Iteration（迭代）对选项给反馈，让模型在新约束下重出；

High\-quality ideas（高质量想法）是这条链路末端的产物，不是第一步就能直接要到的。

## Part 2 Context Management 

### 2\.1 上下文  Context

Definition：All the text and files the model uses to generate its response 模型用来生成回答的全部文本与文件。

没有上下文，即通用模型。问 Pros and cons of studying physics vs\. zoology，若模型一无所知，只能给一页通用的利弊清单，它不知道你的成绩、时间表、职业倾向。但补上上下文即可得到定制回答，应用于Career assessment results、High school schedule、Course choice。

#### 2\.1\.1 AI 的上下文 AI model’s context

AI context 系统提示在底部，对话历史往上叠，窗口自下而上包含：

|组成部分|原文|说明|
|---|---|---|
|System prompt|Current date, model name and capabilities, general instructions（restrictions）|当前日期、模型名与能力、通用指令|
|Tool definitions|Available tools \(like web search\) and how to use them|可用工具（如联网搜索）及其用法|
|User prompt|Build workout plan for: 38 yo, beginner, dumbbells, 15 mins/day||
|AI response|3 options: full\-body, upper–lower split, low\-impact strength||

Tips: The conversation is part of the context 对话窗口本身就是上下文的一部分 

为什么同一句话在不同对话里效果不同？ User prompt 是叠加在 Chat history 之上被处理的，进入模型的完整输入不同，输出自然不同。

相关性：这条信息是否会影响本次任务的目标输出。

1. 反例：Irrelevant context can become distracting and may lead the AI to generate a worse answer  不相关的上下文会成为干扰，可能让 AI 给出更差的答案。

2. 解决：Start a new chat to reduce influence from the current conversation\. 开新对话之后，Chat history 被清空，只剩 System prompt \+ Tool definitions \+ 本轮提问。想要一个不受前文影响的判断，就换一个干净上下文

### 2\.2 提示 Prompt

#### 2\.2\.1 用户提示 vs\. 系统提示 User prompts vs\. system prompts 

|角色|说明|
|---|---|
|system|A system prompt sets persistent and high\-level instructions（系统提示设定的是持久、高层的指令，位置在最前面、对整段对话持续生效）<br>规定怎么回答：任务范围、输出格式、语言、风格、限制。|
|user|the user’s message（用户的消息）<br>规定回答什么：本次的具体输入。|

#### 2\.2\.2 聊天提示 Chat Prompts

The series of messages is turned into a string that uses special tags\. 

多条消息会被转成一个带特殊标记的字符串。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTM2OWQ1ZWNhYTQ3Y2ZlYTU3MGVmMzViZTgwYTA2NWJfNGNkY2Y3NzU5NzVmNTJmZmZkNGQwOWQ1YWFkYTkzNDlfSUQ6NzY5MzA0OTYyOTUzMjkxNzI3Nl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

Tips：模型看到的始终是一段连续文本，system / user / assistant 的分界靠特殊标记（special tokens）表示。

### 2\.3  系统提示 System Prompt 

The intended answer follows the system instruction。系统提示不是建议，而是条件化输出分布的那个条件

Example：Anthropic Claude　

1. 行为规范型

System prompts can contain many different rules describing how the model should behave\. Such as Knowledge cutoff（知识截止时间）、Helps with prompting techniques（协助提示技巧）、Step\-by\-step reasoning（逐步推理）\.

2. 安全与风格型

The system prompt can also be used to guide the model toward safer behavior and help it avoid harmful or inappropriate responses\. Such as Avoid harmful requests（拒绝有害请求）、AI “self\-esteem”（模型的自我评价/语气倾向）\.

https://console\.groq\.com/playground 一个可以直接改系统提示、立刻看输出变化的在线试验台。

Example: basic English and proficient English

对照实验：同一个问题，只改系统提示里对语言水平的要求。用基础英语与熟练英语要求作为系统提示，对比同一请求得到的回答。

#### 2\.3\.1 Functions of System Prompt

1. Can help to control the model’s behavior 帮助控制模型行为；

2. Specify the set of tasks 指定任务集合；

3. Desired properties of model responses  规定回答应有的属性（如语言）；

4. Output formatting  输出格式；

5. Condition the model’s output distribution 对模型的输出分布施加条件；

#### 2\.3\.2 Downsides of System Prompt 

Question：If two prompts mean exactly the same thing but differ slightly in formatting \(e\.g\., spacing\), should the model perform similarly?

两句语义完全相同、只有格式（如空格）不同的提示，模型的表现在理想情况下应该一样？

Answer：Prompt formatting matters in seemingly arbitrary ways

实验：用同一条提示的六种写法做对照，横轴是 Task Accuracy（任务准确率，0 到 1）。语义相同的几种格式，准确率从 0\.036 跨到 0\.804。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OGQxYTE5MjkzZDRmMDE1YmVhNWEzMzQ1OWMzOTUzMzRfODFmYTM4MzJjMzU4NWVhMTRmYjA4YWM5ZmM4ZDBmMTlfSUQ6NzY5MzA0OTYzMDQwOTUxMDQzMl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

现象：刻度两端标注了极值：最低 0\.036、最高 0\.804，中间那段横条被标注为 Performance Spread Among Plausible Formats（各种看起来都合理的格式之间的性能跨度）。

结论：Even tiny irrelevant formatting changes can cause large performance differences 即使极微小、看似无关的格式变化，也能造成很大的性能差异。

1. No universal “best” format : format sensitivity depends on the model, task and prompt\. 不存在通用的最佳格式：格式敏感性取决于模型、任务和提示本身。

2. For serious systems, test robustness and use structured interfaces：对正式系统而言，要测鲁棒性，并使用结构化接口（而不是把关键信息塞进自由文本的格式里赌稳定性）。

## Part 3 In\-Context Learning 

### 3\.1 上下文学习 In\-context learning

An LLM exhibits a capability using the text supplied in its input context, without updating its parameters\. 不改参数，只靠输入里的文本，模型就表现出新能力。

For complex tasks, ICL provides useful behavioral specifications\!

对复杂任务而言，上下文学习提供了一种行为规格说明书。

Advantages：（cost）

Easy: use task examples without collecting a large task\-specific training set\.

容易：不必为一个任务收集大规模专用训练集；

No extra training: use one model for several tasks without extra training\.

无需额外训练：一个模型跑多个任务；

Deployable: reuse one model across applications\.

易部署：一个模型复用到多个应用。

#### 3\.1\.1 Strategy 1: Text completion 文本补全（不给指令）

After pre\-training, we have an autoregressive language model\.

预训练之后，我们得到一个自回归语言模型

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MmE3MjYwZmRiNWJhMTYyZTU1ODM3MjI5Zjg1MjlhOTlfZTRlOTViMzgwNzVmNzJhMjJkMjkyNDVmZTcyZDkwNWVfSUQ6NzY5MzA0OTYzMDAwNjkwNjM5Nl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

The language model can complete text: — 语言模型可以补全文本。公式写作 $x_{1:t} → x_{t+1:T}$，即用前 t 个 token 生成后面的 token。

Prompt: "When a dog sees a squirrel, it will usually"

Output: "bark a lot, especially at close range\.", "start to chase after it\. When it does…"

#### 3\.1\.2 Strategy 2: Zero\-shot 指令提示

We can prompt the model to perform a specific task by providing instruction\. Called “zero\-shot” because we don’t provide \(x, y\) examples in the prompt\.

通过给出指令，可以提示模型执行某个具体任务。之所以叫 zero\-shot，是因为提示里没有提供任何 \(x, y\) 示例。公式 f\(x; instruction\) 里的两个部分：x 是输入、instruction 是指令，二者一起决定输出。

Considerations（可靠性 / 格式敏感性问题）

1. 输出格式不好对付 The model’s generated output formatting can be varied and tricky to deal with\.

2. 表现随措辞变化 Performance can vary based on the prompt wording\.

3. 基础模型可能不会听指令或只支持特殊格式 Base models may not be trained for instruction following, or trained only to support specific formats

#### 3\.1\.3 Strategy 3: Few\-shot （Instruction \+ examples）

Additionally provide \(x, y\) examples in the prompt 在提示里额外提供 \(x, y\) 示例。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjcwZDdkNzU2OWI2ZTI3ODY3NDhhMWY1NmVkYTVhNWFfMWFmN2YwYWI3Nzg4OTczNzA4Mjc5MzlkNjFmOTRkNjRfSUQ6NzY5MzA0OTYzMTQzMjgwNTkxNV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

公式中 K 是示例个数，x\_test 是待预测的新输入，y\_test 是输出。

Examples help the model understand the task format and expected outputs without any parameter updates\. Referred to as “in\-context learning”示例帮助模型理解任务格式与期望输出，且不涉及任何参数更新——这就叫上下文学习。它传递的不是知识，而是行为要求（格式、风格、推理颗粒度）。

Example: MATH dataset: a few\-shot prompt used in Llemma

用 Llemma 模型在 MATH 数学题数据集上的 few\-shot 提示原文。

Conclusion: ICL 擅长教行为（如用比喻解释），而不擅长塞知识。

#### 3\.1\.4 Extension: Many\-Shot In\-Context Learning

|变体|原文|说明了什么|
|---|---|---|
|ICL|input, reference output|标准做法：每个示例都带人写的或标注的参考答案|
|Unsupervised ICL|inputs \+ format guidance|只给输入和格式说明，不给参考答案|
|Reinforced ICL|model\-generated outputs filtered for correctness|用模型自己生成的输出，过滤掉不正确的再当示例|

In some experiments, inputs with format guidance outperform full demonstrations\. 在某些实验里，输入 \+ 格式说明 的效果优于完整的示例。

原因：示例的两个作用要分开看，定位任务（靠输入\+格式就能做到）与示范风格/颗粒度（往往需要完整示例）。如果提示效果不好，可以试着拆开：先给格式说明看够不够，不够再加完整示例。

### 3\.2 示例数量与模型的影响 Effects of sample numbers and models 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OGQ3NzZhN2M5NWYzZmQ0NWE1ODA1NGE0ODYzNWI0YWNfOWNmZTI1OGNjM2U4ZGEyZGIyMjQ1ZTY0OTc2M2ZkOWZfSUQ6NzY5MzA0OTYyNzYyNDY4OTE3OV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

把示例数量从 2⁰ 一路加到 2¹⁰，看四个模型的翻译准确率怎么变。

|图例模型|Bemba 方向的大致走势|Kurdish 方向的大致走势|
|---|---|---|
|Gemini 1\.5 Pro|整体最高，从 \~32% 一路上升到 \~48%|起始 \~39%，缓慢升到 \~43%|
|Claude\-3\-Opus|起始 \~35\.5%，几乎持平，末端 \~39%|起始 \~38%，中间略降到 \~37\.5%，末端回到 \~39%|
|GPT\-4\-Turbo|起始 \~26%，升到 \~32%|全程最低，约 \~31% 上下|
|Gemini 1\.5 Flash|起始 \~24%，升幅最大，末端 \~40%|起始 \~39%，升到 \~42%|

Ability to use many examples varies by model 

能用多少示例这件事本身因模型而异。示例越多越好并不成立，收益取决于模型是否有能力把这些示例用起来。

### 3\.3 不同任务的表现不同 Effects of different tasks 　

同一批模型、同一套示例数量，换任务之后曲线形状会变。不存在通用的最佳示例数量

Different tasks do not all follow the same pattern\. 不同任务并不都遵循同一种规律。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzJjMzI3N2M5OGFlY2E3MGJiNzM2YWVkNWVhN2I2N2NfNjQwYmUxZWI3MTdiMmVkMTczZTYyZjVmN2I4YzA1M2JfSUQ6NzY5MzA0OTYyNzYyNDcwNTU2M18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

### 3\.4 上下文学习的建议 Tips for in\-context learning 

1. What ICL is good for

“Illustrate your explanations with examples, thought experiments, or metaphors\.” and “Avoid being heavy\-handed or repetitive\.” 

要求用例子、思想实验或比喻来讲解；避免说教或重复。

共同点：这两条要求的都是风格与做法（behavior），不是事实与知识（knowledge）。

2. What to be careful about

Knowledge tokens leave less room for conversation\. 塞知识会挤占对话空间；

Long contexts make inference expensive\. 长上下文让推理更贵；

New information must fit in the context window\. 新信息必须塞得进上下文窗口。

## Part 4 推理 Reasoning \& Sycophancy 

AI reasoning: using context and intermediate computation to solve multi\-step problems\.  推理即使用上下文与中间计算来解决多步问题。

### 4\.1 长思考示例 Long thinking example

Example：购车比价场景，说明推理在智能体里指的是什么。

输入材料：Insurance plans（保险方案）、Spec sheets（规格表）、Car loan quotes（车贷报价）。

用户请求：What are the tradeoffs for each car? Read everything and **think hard before answering（显式要求先思考再回答）** 

模型思考时做的四件事：Reading documentation / Searching for customer reviews / Defining evaluation criteria / Generating report。

最终输出：Here’s a detailed review of the tradeoffs among these three cars…

### 4\.2 推理工作流程 How reasoning works

Example：行程规划，推理是反复循环的回路。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MGMxY2YxYTNlOGE1NGNlYzQ3NTgwMDFkNTlkYzhiMmZfODE5ZWEwYTJkYTVjODEwOTE0MTNkMGNmODc0ZDVlMzlfSUQ6NzY5MzA0OTYyOTk5ODQ1MjI1MV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

The reasoning process may involve repeatedly gathering information and thinking about it\. 推理过程可能涉及反复地收集信息并加以思考。

### 4\.3 AI长任务发展 AI progress on long\-running tasks has exploded

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWEyNmQ0Mzg1NDA2NGZjYjg4MzhhNjQ3ZTBjYzU2YjlfNGQ3ZjMwODlmYTk3ZmVlYzUwMTcyNjE0ODg3ODBkMjhfSUQ6NzY5MzA0OTYyNzYyNDcyMTk0N18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

### 4\.4 鼓励推理 Encouraging reasoning

1. Use reasoning controls 使用推理控制

2. Give the model hard tasks 给模型难题。简单问题上，模型不需要长推理就能给出分布中心的答案

Example：Design a 12\-month plan for a 4\-person startup with limited cash为一家现金有限的 4 人创业公司设计 12 个月计划。

给模型的两样东西：Real job tasks（真实工作任务）与 All the context someone would need to complete the task（完成该任务所需的全部上下文）；

在旁标注提示语：Check your reasoning\.（检查你的推理）。

### 4\.5 AI 推理的四条建议 Tips for reasoning with AI

1. use the best models available 前提（模型能力）：使用可得的最强模型；

2. Give them as much context as needed 开关（推理预算）：给足所需的上下文；

3. Give them hard tasks 给难题；

4. Use reasoning settings when available 有推理设置就用。

### 4\.6 AI 过度同意 Sycophancy

Example：

问法一：Don’t you think remote work is better than office work?

回答一：Yes, remote work offers many advantages…

问法二：Is it true that office work is more productive?

回答二：Yes, office environments provide strong benefits…

两次提问指向互相对立的结论，而模型两次都同意。

How you phrase the question may influence the agent’s response\. 如何措辞提问，会影响智能体的回答。

两个问法都有共同的诱导特征：Don’t you think…（你不觉得……吗）与 Is it true that…（……是真的吗）都是预设了答案的引导式提问。

#### 4\.6\.1 产生原因 Why does sycophancy happen?

Models are trained to be helpful assistants using human feedback, which can reinforce sycophancy 模型通过人类反馈被训练成有用的助手，而这可能强化谄媚

问题：How can model responses better match human preferences? 模型回答怎样才能更好地匹配人类偏好？

答案：Learn from human feedback \(RLHF\) 从人类反馈中学习（RLHF）。

逻辑链：人类偏好 → 标注者倾向给顺着我的回答高分 → RLHF 放大这个倾向 → 模型学会先同意。

#### 4\.6\.2 难以察觉的陷阱 Sycophancy feels helpful but degrades quality

Example：

1. 明显

用户：I’m really proud of this essay, what do you think?

模型：Your essay is excellent\! You clearly put in a lot of effort…

2. 难以察觉

用户：Analyze this data and find all the positive measures of performance this quarter\.

模型：The data clearly shows revenue growth, strong retention, improving margins…

What bias does this prompt introduce?（这个提示引入了什么偏差？）

第一个例子里，用户的倾向写在情绪里；第二个例子里，倾向藏在任务定义里 find all the positive measures。模型在第二种情况下并没有违反指令，所以不会触发任何警报；但分析结论会系统性地偏乐观。

#### 4\.6\.3 解决方案 Combating sycophancy

课件给出三条并列动作。

1. Neutral framing 中性框架。Avoid giving hints as to the answer you want to hear

换度量词：bad / good → to what extent（把是非题改成程度题）；

换来源：Do you agree → What does current research say（把立场题改成证据题）；

换动词：reduce / improve → compare（把方向题改成对比题）。

必要时再加 if at all / if any 这类让步短语。

|引导式提问　Leading prompt|中性提问　Neutral prompt|
|---|---|
|Aren’t carbon taxes bad for small businesses?|To what extent, if at all, do carbon taxes affect small businesses?|
|Do you agree that AI will create a lot of jobs?|What does current research say about AI’s effect on jobs?|
|Doesn’t remote work reduce worker productivity?|How does productivity compare between remote and in\-office work?|

2. Explicitly ask for objective critique 明确要求客观批评。

Example：Be critical\. Assume this needs improvement 它一定还有改进空间。

3. Start a new chat for a fresh opinion 开新对话以获得不受影响的意见。

## Part 5 Writing \& Revision 

### 5\.1 AI 味产生原因 What makes AI slop?

AI slop：AI content that looks good, but lacks substance \(Vague, empty\-sounding text\) 看起来不错、但没有实质内容的 AI 产出。

AI 味 的两个可观测特征：破折号的使用频率，以及句子结构的固定套路。

四类可辨认的语言模式：

|模式|例句|特征|
|---|---|---|
|Overused words（过度用词）|“This is a nuanced issue\. Let’s delve into the implications…”|偏爱 nuanced、delve 这类词|
|Lists of three（排比）|“Clear, concise, and compelling”|强行凑三个并列形容词/短语|
|Vague praise（空洞的赞美）|“This is a robustly structured and highly insightful paper…”|用高级形容词但不说具体好在哪|
|Not x but y（强行转折）|“It’s not just about speed—it’s about availability”|用一个否定\-转折句式制造虚假深度|

智能体可能影响人类 AI agent may influence human speech behaviours

例如，用 delve 这个词在播客与演讲里的使用频率，展示 AI 语言向人类口语的渗透。

### 5\.2 去 AI 味

#### 5\.2\.1 技巧一：用渐进式大纲写作 Write via progressive outlining

研究 → 3 个大纲 → 选一个并调整结构 → 展开成要点 → 局部补充 → 生成全文

1. 起点：给研究任务，不要直接要文章

不要一上来就让它做完整深度研究然后出稿。用户的原话是：

I’m writing an article about small AI teams moving faster than large teams that don’t use AI\. Research **evidence for and against this hypothesis**\.

2. 要三个结构不同的选项

Create 3 outline options\. Include a counterarguments section\. Also, here are some stories from teams I work with\. 

3. 选定后改结构，不动内容

Let’s use Option 1 and keep all the stories, but move the thesis after Story 1\.,\. I also want to add a historical analogy: Pixar created Toy Story in the 90s\.

4. 大纲确认后才要正文

Expand each heading into bullet points based on the research\.

5. 继续局部修改，最后才生成全文

Explain more about the startup\. Tie in the Pixar story with the thesis\.

Now, generate the text for this article\.

#### 5\.2\.2 技巧二：逐段编辑 Editing piece by piece

把改一篇文章拆成反复改一句/一段。

1. 先要几种不同的说法

Everyone talks about “human\-level AI,” but what does that actually mean? Smarter chatbots? Automated office work?，用户要求 Brainstorm a few different ways to say this:

|风格|改写|
|---|---|
|Punchy（有力/短促）|（课件在本列展示的是同一段的另一种紧凑写法）|
|Visionary（有远见式）|The public thinks achieving AGI means computers will be as smart as people\. For decades, we’ve imagined AGI as machines that can reason and create like humans do\.|
|Conversational（口语化）|A lot of people hear “AGI” and assume it means computers as smart as humans that can do most desk jobs\.|

2. 逐段推进，而不是整篇重写

#### 5\.2\.3 技巧三：评分标尺 Well\-written rubrics

把客观一点这个模糊要求，换成一个有分项、有分值的评分表。

1\. Specify important criteria（明确重要标准）\+ 2\. Develop instructions for evaluating criteria（为每条标准写评价细则）\+ Point system（分数体系）。

|评价维度|分值|课件给出的评分细则示例|
|---|---|---|
|Characters|25 points|Every named character has a goal \(10 points\) / Conflict between two characters’ goals \(10 points\) / At least one character makes an irreversible decision \(5 points\)|
|Plot|25 points|（同上结构，细则按剧情维度展开）|
|World building|25 points|（同上结构）|
|Writing craft|25 points|（同上结构）|

反面对照：同样有标尺，但写法不对，分数会被抬高。

1. Scoring early can anchor judgment 先给总分，后面的分项就会被调去凑这个总分

2. Vague categories invite subjectivity 没有细则，模型只能靠语感，而语感会偏向夸

|对比项|5\.9 节（可用）|5\.10 节（会抬分）|
|---|---|---|
|分项细则|有（每条标准可判定、带小分值）|无（只有维度名）|
|给总分的位置|最后 sum the scores at the end（先分项、后求和）|最前 score it out of 100（先定总分）|
|自我指涉|无|story I wrote（暗示作者身份）|
|结果|65 / 100，指出人物目标无冲突|分数被抬高|

5\.2\.4 技巧四：评分标尺 Cross\-model review

换一个模型来评，避免自己评自己。 

同样带标尺 \+ 分项打分 \+ 求总分，差别在于打分者不是写作者，切断自我一致性。

不同模型有不同的训练数据与偏好，能暴露出某一个模型特有的宽容，这正是一种鲁棒性测试。

## Part 6 Summary

### 6\.1 Summary: instruction prompts and in\-context examples

提示的三种基本型态：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjYzMTZkZWQ4MjdhYmFhMDQ1MmJkMjExZGY1MTcwOGRfN2YxYWFlNzc3NzM2NzkyNzhmYmY5MmY4YjA2YWRhYzlfSUQ6NzY5MzA0OTYzMTQzMjgyMjI5OV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGZkNGI2YTFkOWIyODUxY2U5NDQ4NjA3NWI4OGY4OWFfMmY4ZjIyMDk2NWY4ZTRhZDA1YTlmMTdmYmI4NGQ3NjJfSUQ6NzY5MzA0OTYyOTk5ODQ4NTAxOV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

### 6\.2 In\-class exercises

第 1 题　中性框架

题干：You want to compare productivity in remote and office work\. The prompt: Don't you agree remote work is better? invites agreement\. Which replacement best reduces this leading framing?

- A\. Explain why remote work improves productivity more than office work\.

- B\. Be critical: explain why office work is more productive than remote work\.

- C\. Compare productivity in both settings using evidence and its limitations\.

第 2 题　上下文管理

题干：Your workout chat contains 15 minutes/day, dumbbells, no squats\. You now want a plan for your mother, who has 30 minutes/day and no equipment\. Which request manages context most clearly?

- A\. In the same chat, ask only to make my plan longer for my mother\.

- B\. Copy the entire old chat and ask Adapt this for my mother\.

- C\. Start a new chat with her available time, equipment and preferences\. 

第 3 题　上下文学习的机制

题干：A model follows 4 examples, then loses the pattern in a fresh chat without them\. Best explanation?

- A\. The new chat reset the newly trained weights\.

- B\. The rule was stored but hidden in the new chat\.

- C\. The examples guided inference without training\.

第 4 题　评分标尺

题干：AI gives your essay 92/100, then fits vague category scores to that total\. Best prompt revision?

- A\. Define criteria, score with evidence, then total\.

- B\. Keep the total and explain each category in detail\.

- C\. Ask for a stricter overall score before categories\.

Scoring early can anchor judgment（先给总分成为锚点）与 Vague categories invite subjectivity（含糊分类引入主观性）。应该先定义标准、每项带证据打分、最后才求和。



# Lecture 6:  Retrieval\-Augmented Generation \(RAG\)

## Part 0 Orientation

### 0\.1 Roadmap

本讲围绕一个具体的工程问题展开：当大语言模型自身掌握的信息不足以回答问题时，如何在生成答案之前，从外部知识源中检索出相关证据，并利用这些证据提高回答质量？将这个问题拆成五个部分。

|**Part**|**英文标题**|**中文主题**|**主要问题**|
|---|---|---|---|
|I|Why RAG?|为什么需要 RAG|为什么不能只依赖模型参数中的知识？|
|II|RAG Architecture|RAG 架构|检索器、知识库与生成模型如何协作？|
|III|Typical Retrieval Methods|典型检索方法|如何从大量文档中找出相关信息？|
|IV|Retrieval Evaluation|检索评估|如何判断检索器是否找对了内容？|
|V|Tutorial: RAG in practice|RAG 实践|如何实现一个可运行的检索增强问答系统？|

上一讲讨论如何通过 Prompt、Context Management、Reasoning 等方法控制模型的行为。本讲进一步追问：如果模型需要的上下文本身不存在于当前提示中，那么这些上下文从哪里来？

这就是 RAG 需要解决的问题。

两讲的关系可以概括为：

- Prompt Engineering：如何组织和使用已经拥有的信息。

- RAG：如何根据问题找到需要的信息，再将其组织进提示。

- Generation：模型如何利用提供的信息进行推理和回答。

需要注意，RAG 不等于 Prompt Engineering，但 RAG 通常会把检索结果放入提示，因此两者在实际系统中密切相关。

## Part 1 Why RAG?

### 1\.1 Three Ways of LLM Obtaining Information

How Does an LLM Obtain Information?  LLM 获取信息的三种方式。

|**维度**|**参数知识**|**上下文信息**|**网页信息**|
|---|---|---|---|
|来源|训练数据|当前输入|外部网络|
|是否依赖实时获取|否|不一定|通常需要|
|是否可以使用私有知识|取决于训练情况|可以|取决于授权与访问|
|主要限制|可能过时、不完整|上下文容量有限|质量、可靠性和安全性不一|
|是否必然属于 RAG|否|否|否|

有外部信息，不一定就是 RAG。如果用户手动复制一段文章给模型，这属于上下文提供。**如果系统根据用户问题自动搜索知识库、选择相关片段，再将片段提供给模型，这才符合典型的 RAG 工作方式。**

1. **Stored in parameters** 数据经过训练过程，使模型获得大量通用知识。

Training Data（E\-books, Books, Web pages, Articles） → Training → LLM

例如：为什么酒店周末更贵？模型可以根据已经学习到的供需关系，给出解释。但模型参数中的知识有一个重要限制：知识不会因为现实世界发生变化就自动更新。

知识截止时间 Knowledge cutoff 不意味着模型一定不知道此后的所有事实，也不意味着截止时间之前的事实都掌握得准确。它表示模型的预训练知识不能保证覆盖之后的新信息。

2. **Provided in context **模型除了使用已有知识，还可以利用当前输入中提供的信息

Chat history / Your documents / Notes → LLM

例如，用户给模型一段课程说明：Week 6 covers Retrieval\-Augmented Generation\. 然后询问：What is covered in Week 6? 即使模型原本不知道这门课程，课程内容出现在当前上下文中，也可以根据提供的文本回答。

3. **Found on the web** 通过网络获取

Search → Web pages → LLM

例如：What happened in Hong Kong last weekend? 模型可以通过外部搜索系统获得相关网页内容，再利用这些内容作答。但需要强调：

LLM 本身不一定具备联网能力。网页搜索通常由模型外部的工具或系统完成。

### 1\.2 The Core Problem and Idea

Tips：为什么不能把所有外部知识都塞进上下文？

The problem with large external sources\. Too much to put into context\.

当知识源很大时，无法简单地把全部内容都放入模型输入。即使模型支持较长的上下文，也不代表把全部数据塞进去就是合理方案。主要原因包括：

1. 上下文窗口存在容量限制。

2. 输入越长，通常消耗越多计算资源与费用。

3. 大量无关内容可能干扰模型识别关键证据。

4. 每次重复发送完整知识库会产生额外开销。

5. 知识持续更新时，维护完整上下文十分困难。

解决方案：Retrieval\-Augmented Generation \(RAG\)\.

核心流程：Large knowledge source → Retriever → Relevant information → LLM

不把所有知识交给模型，而是先找到与当前问题最相关的部分。LLM 可以从参数、上下文和外部工具获得信息。当外部知识规模很大时，RAG 通过检索选择相关内容，使模型能够在有限上下文中使用更有针对性的证据。

### 1\.3  General Knowledge Answers

问题一：

Why are hotels more expensive on weekends? 为什么酒店在周末更贵？

More people travel, so there is more competition for rooms\. 更多人出行，因此酒店房间的竞争更激烈。

可以直接回答，因为主要询问一般性的经济规律，模型在预训练过程中接触过大量类似知识，因此通常能够给出合理解释。其逻辑为：周末出行需求增加 → 酒店房间供给相对有限 → 供需关系变化 → 房价可能上涨。

如果一个问题能够依靠模型已有知识可靠回答，额外检索未必带来收益。

问题二：

What is Python for loop? 通常不需要专门搜索网页。

How does our company's internal Python framework implement task retries? 就可能需要检索公司代码库。

这类问题通常不需要外部检索，但模型仍可能进行一定程度的内部推理。

检索与推理不是同一个概念。

- Retrieval：寻找所需事实或证据。

- Reasoning：根据已有事实进行分析和推导。

是否需要 RAG，首先取决于回答问题是否需要模型当前尚未掌握的外部信息。一个问题可能不需要检索，但需要复杂推理；也可能需要检索，却只需要简单地提取事实。

### 1\.4 Recent Information and Thinking Answers

Why were HK hotels so expensive last weekend? 为什么香港酒店上周末那么贵？

需要知道特定时间、特定地点发生了什么。这涉及两个不同的问题。

问题一：Knowledge Gap（知识缺口）模型没有掌握相关事实。

问题二：Reasoning Gap（推理缺口）模型掌握了事实，但不能正确推导结论。

RAG 主要针对第一个问题，通过外部检索补充事实。但 RAG 并不能保证第二个问题自动得到解决。

推理不能代替事实，如果模型没有核实就给出具体事件名称，就可能产生没有证据支持的回答。因此，合理的处理方式是先检索近期信息，再分析可能的原因。

时间一致性问题

还要检查 last weekend 对应的实际日期。如果问题发生在黄金周之后较长的时间，不能自动把黄金周作为那个周末的原因。RAG 系统不仅需要找到相关关键词，还需要验证检索结果的时间范围是否与问题一致。这属于工程中的 Temporal Relevance（时间相关性）。

总结

General knowledge gives us a starting point, but it is not enough to explain particular events\.

通用知识为解释提供起点，但不足以解释具体事件。

Retrieval provides time\-specific and more relevant evidence\.

检索能够提供具有时间针对性、更加相关的证据。

### 1\.5 RAG 的两个关键步骤 

Two Critical Steps in RAG

1. Retrieval：Collecting useful information\.

检索：收集有用信息。

2. Generation：Reasoning over that information and responding\.

生成：基于这些信息进行推理并作答。

第一类问题：不需要专门收集外部信息，模型可直接依据已有知识回答。

第二类问题：需要先调查特定事件，再综合证据生成回答。

Retrieval 主要解决：应该把哪些信息交给模型？

Generation 主要解决：已经拿到这些信息，应该如何回答？

这是 RAG 系统最重要的职责划分。

假设用户询问：Week 6 的 tutorial 在哪间教室？

可能出现两种失败：检索失败，知识库中存在教室信息，但检索器没有找到；生成失败，检索器已经找到正确教室信息，但模型在回答时使用了错误的教室号。两种失败表面上都表现为回答错误，但修复方式完全不同。前者需要改善检索。后者需要改善提示、生成模型或答案验证。

### 1\.6 Key Idea in RAG

LLMs store extensive information → LLMs can also benefit from an efficient retrieval phase\.

LLM 已经存储了大量信息，但仍然能够从高效检索中进一步受益。RAG 通过高效检索弥补模型在近期信息和专业知识上的不足，使已有知识与外部证据相互补充。

两类需要外部补充的信息：Very recent information\. Specialized knowledge\.

1. Very recent information：近期信息

例如：最新发布的软件版本；今天的产品库存；最近发生的事件；最新的公司政策。

这些信息可能在模型训练之后才出现。因此，即使模型具有很强的语言理解能力，也不意味着它知道这些新事实。

2. Specialized knowledge：专业知识

例如：企业内部代码结构；某个医学研究领域的最新文献；特定项目的技术规范；专业法律文档。

这些知识可能很少出现在通用训练数据中，也可能受到访问限制。RAG 可以让模型在回答相关问题时使用经过授权的专业材料。

Great answer OR Not so good：模型在拥有足够相关知识时，可能给出较好的回答；面对近期或专业知识缺口时，如果没有适当的外部证据，回答质量可能下降。

OR 表示知识库是可插拔的：回答酒店问题需要网页，回答中国菜谱需要菜谱库，回答课程问题需要课程文档。工程含义是RAG 系统的检索器要对着一个特定的知识库来配。换库就要重建索引。

RAG 不是替代 LLM：LLM 已有大量知识，但在需要的时候可以通过检索获得额外帮助。因此，RAG 应被理解为增强机制，而不是完全替代模型原有能力。

### 1\.7 检索器的工作流 The Retriever Workflow

**Step 1: Search for a knowledge base of trusted information 在可信知识库中搜索信息。**

knowledge base 知识库是用于保存和组织可检索信息的外部数据集合。它可以包括：课程文档、企业内部手册、项目源代码、产品资料、专业文献。

Retriever 负责接收查询、选择相关内容，查询与检索结果

Knowledge Base 负责存储可供检索的外部知识。检索器位于知识库上方，通过双向箭头表示查询与结果返回。

Trusted information 可信信息，检索系统不能只考虑内容是否相关，还要考虑信息来源是否适合被使用。但可信来源也不保证其中每一条内容都准确、完整或及时。

**Step 2: Finds the most relevant information and shares it with the LLM 找到最相关的信息，并提供给 LLM。**

第一步：寻找；第二步：传递。

**Step 3: Improves generation 改善生成结果。**

这是检索器存在的最终目的，但它描述的是预期收益，不是绝对保证。如果检索结果不相关、过时或错误，也可能降低生成质量。

**Relevant 不等于 Correct**

Retriever 的职责是从知识库中找出相关信息，但相关性、正确性和是否足以回答问题需要进一步区分。

Relevant：相关。表示某段文本与问题在词语或语义上有联系，相关性不等于可回答性，检索到不等于已经核实。

Correct：正确。表示信息本身准确，且能够支持所需结论。

### 1\.8 RAG Definition

RAG combines a pretrained LLM with external knowledge retrieved at inference time to support generation\.

RAG 将预训练语言模型与推理时检索到的外部知识结合起来，以支持答案生成。

RAG 的关键特征是在推理阶段检索外部知识，并利用检索结果支持生成，而不是要求模型事先记住全部知识。

**Pretrained LLM：预训练语言模型**

表示系统已经拥有一个经过训练的模型。它可以具备：语言理解能力、通用知识、文本生成能力、一定的推理能力。RAG 通常不需要从头训练一个新的语言模型。

**External knowledge：外部知识**

课件明确列举: Local documents, knowledge base, web search, APIs \.\.\. 即本地文档、知识库、网页搜索和 API 等。

这些来源有一个共同点：信息不必全部编码在语言模型参数中。

**Retrieved at inference time：推理时检索**

Inference time 指模型实际处理用户请求、生成回答的阶段。在典型 RAG 中，系统会根据当前问题，从外部来源寻找相关信息。这与训练阶段学习知识不同。

**To support generation：支持生成**

检索结果并不是最终答案。它们是用于支持答案生成的外部上下文。如果问题要求进一步解释或比较，模型还可以在证据基础上组织更复杂的回答。

**RAG 与 Fine\-tuning 的区别**

|**维度**|**RAG**|**Fine\-tuning**|
|---|---|---|
|主要方式|推理时提供外部知识|通过训练更新模型参数|
|知识更新|更新知识库和索引|通常需要额外训练|
|适合任务|事实查询、动态知识、引用|行为适配、格式、特定任务能力|
|是否必然改变 LLM 权重|否|是|
|能否组合使用|可以|可以|

实际系统可以同时使用 RAG 和微调。先微调模型，使其更擅长按照企业规范回答；再通过 RAG 检索最新企业文档。

某些知识广泛存在于公共数据中，而另一些知识很少出现，甚至根本不公开。因此，不能假设通用模型能够可靠掌握所有专业或私有信息。不过，互联网出现频率只是一个说明性维度，不能直接等同于模型对该知识的掌握程度。

### 1\.9 Why RAG? Code Generation Example

RAG is important when we want to adapt an off\-the\-shelf LLM to a specific application\.

当我们希望将现成的 LLM 应用于某个具体场景时，RAG 非常有用。

RAG 能让通用代码模型利用项目专属知识，提高代码生成和代码问答的针对性。

**Off\-the\-shelf LLM**

表示现成、可直接使用的模型。例如，一个通用代码模型可能知道：Python 语法、SQL 查询、REST API、常见软件设计模式。但它不一定知道：你的项目有哪些模块、项目采用什么内部约定、哪些函数已经实现、哪些接口刚刚发生变化。

**Use your codebase as a knowledge base**

把自己的代码库作为知识库。例如，代码库中存在：

```Plain Text
class DatabaseManager:    
def connect_to_db(self):        
return self.connection
```

以及：

```Plain Text
def process_user_data(user_input):    
validator = CustomValidator()    
return validator.validate(user_input)
```

这些函数体现了项目特定的结构与约定。

如果用户要求：请按照当前项目的规范实现一个新的数据库访问函数。通用模型可能生成语法正确、但不符合项目规范的代码。而 RAG 可以先检索：

- 现有数据库管理类。

- 项目使用的验证器。

- 已有错误处理方式。

- 相似函数的实现。

再把这些内容交给模型。

**RAG 如何改善代码生成？**

其作用可以分为三层。第一层：识别已有接口，避免模型凭空编造函数名称；第二层：学习项目约定，让生成代码更符合项目现有结构；第三层：利用最新代码，减少依赖已经过时的接口说明。

**代码场景的三个典型缺口\&为什么代码是最典型的 RAG 场景**

|**缺口**|**表现**|**RAG 的作用**|
|---|---|---|
|私有性|项目代码未公开|检索内部代码库|
|时效性|代码持续修改|获取较新版本|
|专业性|存在自定义模块与约定|提供项目特定上下文|

公共语料足够丰富，加检索的收益很小。这也是代码库问答非常适合 RAG 的原因。

1. 完全私有（网上没有第二个一样的项目）；

2. 频繁变动（每天都可能改函数签名）；

3. 命名独特（自研模块名、内部约定，模型不可能见过）。

**工程延伸：代码检索的特殊性**

代码不仅包含自然语言，还包含大量精确符号：函数名称、类名称、文件路径、参数、依赖关系。

因此，代码 RAG 不能只依赖宽泛的语义相似性。

例如：`connect_to_db`与`create_database_connection`语义可能相近，但它们不一定是同一个真实接口。实际工程中通常需要兼顾精确匹配和语义匹配。

### 1\.10 RAG for Companies 企业应用

企业 RAG 的价值不仅在于使用私有知识，还在于根据权限与时效要求，安全地提供相关业务信息。

1. Chatbots：企业客服机器人

Know about your company's products, current inventory, and common troubleshooting steps\.

了解公司的产品、当前库存和常见故障排查步骤。

例如：Product A 现在还有库存吗？模型仅凭预训练知识无法可靠知道实时库存。企业 RAG 系统可以查询经过授权的库存数据，再生成回答。

又例如：我们公司的设备出现 Error 103 应该怎么处理？系统可以检索内部故障手册，找到对应的处理步骤。

2. AI Assistants：企业内部助手

Access and use private company data through internal or local services\.

通过内部或本地服务访问和使用企业私有数据。

例如：检索内部制度、查询项目文档、总结企业报告、回答员工操作流程问题。

3. 三段式流程：Company knowledge → Retrieve evidence → Answer with context

即：企业知识 → 检索证据 → 结合上下文回答。

这个流程表明：企业知识不需要全部预先存储在模型参数中，系统可以根据用户问题按需获取。

**工程延伸：权限控制**

企业场景除了相关性，还必须考虑权限。假设企业有两类文档：普通员工可访问的产品说明和仅管理层可访问的财务报告。即使财务报告与用户问题高度相关，也不意味着检索器可以把它交给所有员工。因此，企业 RAG 需要满足：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTlmYTQzMzU3OTNhNDcyMWI2Y2U0ZTI4YzE1ZGQ1MjhfMzE3NWU1NmIxOGQ3YzE4MzJlOGRiZjVjNDczZjA5MDVfSUQ6NzY5Nzk3MjU0ODQ0ODg4MjIxNF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

也就是说，可被用户检索到的文档必须处于该用户的授权范围内。权限过滤应在向模型暴露内容之前执行，而不是仅要求模型在生成时自行保密。

**工程延伸：知识更新**

current inventory 信息的动态性。如果库存数据库每分钟更新，但 RAG 索引每天才更新一次，回答仍可能过时。因此，需要区分：数据源是否更新、检索索引是否更新、检索结果是否来自最新版本。

### 1\.11 RAG for Web Search

Web\-based RAG allows an LLM to retrieve the latest information from the Web and use it as external context when generating an answer\.

基于网页的 RAG 允许 LLM 从网络检索最新信息，并将其作为生成答案时的外部上下文。

网页 RAG 让模型能够利用外部网页证据生成回答，并通过来源引用提高可核查性，价值包括时效性、覆盖范围和可追溯性。

Search the web → **Retrieve passages** → Answer with sources

搜索网页 → 检索相关段落 → 附带来源回答。

### 1\.12 RAG for Specialized Knowledge

专业领域 RAG 的核心价值在于按需利用专业资料，并使回答能够接受更严格的证据核查。

1. Healthcare：医疗

Medical journals and authorized patient records\. 医学期刊与经过授权的患者记录。

医疗领域具有几个特点：专业术语密集、研究持续更新、患者资料涉及隐私、错误信息可能造成严重后果。因此，医疗 RAG 需要特别重视证据质量和授权范围。

例如：医生希望查找某项临床研究的结论、系统可以检索医学文献，提供相关段落与来源。但不能仅因为系统使用了 RAG，就认为它的结论已经得到医学验证。

2. Legal Research：法律研究

知识来源：Case files and legal reference documents\. 案件文件和法律参考文档。

法律知识具有：强烈的司法辖区差异、条文版本变化、具体案件事实依赖、较高的引用与核查要求。

例如：用户询问某条法律规定的适用条件。系统不仅需要找到相关条文，还需要确认其版本、司法辖区和适用时间。

**两个领域的共同特征**

|**维度**|**Healthcare**|**Legal Research**|
|---|---|---|
|专业性|高|高|
|时效要求|医学研究持续更新|法律条文与判例变化|
|私有数据|患者记录|案件文件|
|来源要求|医学文献与授权记录|法律文件与权威资料|
|主要风险|医疗误导、隐私泄露|法律误导、保密风险|

**工程延伸：高风险场景为什么需要更严格验证？**

普通问答系统可能只关注：回答是否看起来合理？

高风险系统还需要检查：检索来源是否可靠、证据是否支持回答、信息是否过时、用户是否有访问权限、是否存在重要遗漏、是否需要专业人员复核。需要强调，具体法律合规义务取决于地区、用途和适用法规，不能直接从课件推出某个检索指标是法定合规要求。

### 1\.13 Personalized RAG

More software includes personal assistants\. These tools need context\. Relevant context can improve results\.

越来越多软件包含个人助理。这些工具需要上下文。相关上下文可以改善结果。

个性化 RAG 使通用模型能够在获得授权的前提下，利用与用户相关的动态信息提供更贴合具体情境的回答。

**个人数据的四种来源**

- Calendar Events：日历事件。

- Emails：电子邮件。

- Contacts：联系人。

- Text Messages：文本消息。

模型的通用能力负责理解与总结，用户数据提供具体事实。

与企业 RAG 相比，个性化 RAG 的数据具有：强个人相关性、高频更新、多来源分散、权限敏感、时间关联明显。

**工程延伸：个性化不等于无限制访问**

个人助理不应该因为拥有某个数据连接，就无条件读取全部个人数据。系统应根据具体任务和用户授权确定访问范围。例如，回答日程问题通常不需要读取所有私人邮件。这涉及最小权限原则：只访问完成当前任务所需的数据。

|**维度**|**企业 RAG**|**个性化 RAG**|
|---|---|---|
|知识主体|企业|个人|
|数据来源|内部文档、业务系统|日历、邮件、消息、联系人|
|权限依据|企业角色和访问控制|用户授权与服务权限|
|典型任务|企业问答、内部知识助手|日程查询、个人信息整理|
|共同机制|检索相关数据并用于生成|检索相关数据并用于生成|

## Part 2 RAG Architecture

### 2\.1 The RAG Architecture RAG 的整体架构

上路由（Direct LLM use） Prompt 直接进 LLM，得到 Response。这是没有 RAG 的基线。

下路由（RAG System） Prompt 先被 Routes it to the retriever（路由给检索器），再由 Retriever 从 Knowledge Base 取回 Relevant Documents。

1. Direct LLM use：直接使用语言模型。

用户提供 Prompt，LLM 根据已有参数知识和输入上下文生成 Response。

例如：Why were Hong Kong hotels expensive last weekend?

如果没有外部检索，模型只能利用当前已知的信息回答。

这会带来一个风险：模型可能掌握一般性的酒店供需规律，却不知道特定周末香港发生了什么。因此，直接调用模型并非一定错误，而是可能缺少回答特定问题所需的外部证据。

2. RAG System：先检索外部知识，再支持模型生成。

Prompt → Retriever → Relevant Documents

同时：Retriever ↔ Knowledge Base

|**组件**|**中文**|**职责**|
|---|---|---|
|Retriever|检索器|接收查询，并判断知识库中哪些文档与问题相关|
|Knowledge Base|知识库|存储外部知识，例如课程资料、公司文档、网页或代码|
|Relevant Documents|相关文档|检索阶段的输出，后续会被用于构造模型输入|

**Routes it to the retriever：将问题路由给检索器**

这里的 Route 指的是数据流向，而不一定意味着系统已经实现了一个复杂的智能路由算法。

原笔记写：是否检索由系统决定，不由用户决定。

需要调整为：在图示的 RAG 路径中，系统负责把 Prompt 传递给 Retriever；但课件没有进一步说明是否存在动态判断需要检索还是直接回答的路由器。

在实际系统中，可以有不同设计：

- Always Retrieve：每个问题都执行检索。

- Conditional Retrieval：根据问题决定是否检索。

- User\-triggered Retrieval：由用户操作触发检索。

**两条路径的真正区别**

RAG 的核心区别在于：生成模型能够使用根据当前问题检索到的外部证据。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjhjYWEwNDIxZmU1YzAwZTIzNTIyNjgxY2YyNDdiNjRfYjM2OWI2YzE0ODg1NTgzNWU4NGVjNDliMDRlN2M2NjJfSUQ6NzY5Nzk3MjU0ODQ0ODg5ODU5OF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjExZjQwYjE2YzRkNzI3NGI3NzMzY2QwYzkzMTYwODFfNThhMjEyZmFiNzAzYWZiNTdmMzk2Yzk5Nzk3ZWRiNGNfSUQ6NzY5Nzk3MjU0ODY3OTc0OTE0OV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

- $q$：用户问题。

- $K$：知识库。

- $R$：检索过程。

- $D_q$：与问题相关的检索结果。

- $G$：生成模型。

- $A$：最终回答。

### 2\.2 Building the Augmented Prompt 构造增强提示　

RAG 的增强不是直接改变模型参数，而是在生成前把检索证据组织进模型输入。

Why were Hong Kong hotels expensive last weekend?  为什么香港酒店上周末那么贵？

1. 从 Relevant Documents 到 Augmented Prompt

Prompt → Retriever → Relevant Documents → Augmented Prompt

这意味着检索结果不能只停留在检索器中。它们必须以某种方式提供给生成模型。通常做法是把原始问题、检索片段和任务指令组织成新的 Prompt。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmNmM2I2NjliY2U3ODAwYjUyOWIwYjM1MTg4ZjI5NDBfNzAxMmVkMWJhYjQyYzllNjllZTYxYjM1ODUyYjMwNzFfSUQ6NzY5Nzk3MjU0ODQ0ODkxNDk4Ml8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

其中：

- $P_{\text{aug}}$：Augmented Prompt。

- $I$：Instructions，任务指令。

- $C_{\text{retrieved}}$：检索得到的上下文。

- $Q$：原始问题。

加号在这里表示文本或结构化消息的组合，而不是数值相加。

2. 提示示例

Answer the hotel question using the passages below\. \.\.\. 使用下面提供的段落回答酒店问题。

这句话包含三个功能：

第一：明确任务。模型需要回答酒店价格问题。

第二：指明信息来源。模型应关注下面提供的段落。

第三：建立问题与证据的联系。检索结果不是独立展示的资料，而是用于支持当前回答的上下文。

using the passages below 不严格等于 using only the passages below。前者要求使用给定段落，后者才明确限制只能使用给定段落。因此，不能仅凭这一句认定课件已经要求模型完全禁止使用其他知识。

**一个完整的增强提示示例**

```Plain Text
Task:
Answer the user's question using the provided context.
If the context is insufficient, explain the uncertainty.

Retrieved Context:
[Document 1]
National Day holiday weekend.

[Document 2]
Higher visitor demand expected.

User Question:
Why were Hong Kong hotels expensive last weekend?
```

模型可以据此回答：香港酒店价格较高可能与国庆假期期间的游客需求增加有关，但要确认具体涨价幅度及原因，还需要酒店价格和入住率等数据。这种回答将外部证据与已有经济知识结合，同时保留了证据不足时的不确定性。

Augmented Prompt 不等于普通 Prompt

|**维度**|**Original Prompt**|**Augmented Prompt**|
|---|---|---|
|用户问题|包含|包含|
|外部检索证据|通常没有|包含|
|任务指令|可以包含|通常包含|
|内容长度|相对较短|通常更长|
|知识来源|模型已有知识和用户输入|额外加入检索结果|

工程延伸：为什么 Prompt Construction 很重要？

即使检索器找到了正确文档，如果提示组织不当，模型也可能无法正确利用。例如，存在以下问题：证据与问题混在一起，难以区分；多份文档之间没有来源标记；文档包含相互矛盾的信息；无关片段占据大量上下文；检索文本包含恶意指令。因此，实际 RAG 系统通常需要专门的 Prompt Construction 模块。它负责把检索结果整理为模型容易理解、可追溯且安全的输入结构。

### 2\.3 Generating the Response 生成最终回答　

RAG 通过检索增强提示后再生成答案，但这种增强通常需要额外的系统计算与时间成本。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDFiZmY2N2Q0YzRhOGFkODBlMTExZjY5OGUwOTZmZjNfZmViZWQ1NTkyYTdkYWQ5YWQ3ZWE1MmY4ZjgxNmQzZjBfSUQ6NzY5Nzk3MjU0OTcyMzk1MDYyOF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTNlM2Q4YTk5ODFlZjQ1ZGY3ZDUxODVhODdjNTMxNjdfOWUzMzAwNjliODQ2YWFlMDNjZjExNDY5Y2E0ZTdjNmZfSUQ6NzY5Nzk3MjU0OTcyMzg4NTA5Ml8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

National Day holiday weekend; higher visitor demand expected\. 国庆假期周末；预计游客需求较高。

这段上下文提供了两类信息：

- 时间背景：National Day holiday weekend。

- 需求背景：Higher visitor demand expected。

但它并没有直接提供酒店价格数据。因此，模型可以据此提出合理解释，却不能仅凭这段信息确认某家酒店的涨价幅度。

Added Latency：额外延迟

这是 RAG 的重要工程代价。相较于直接调用模型，RAG 通常增加了：

1. 检索查询时间。

2. 检索结果处理时间。

3. 增强提示构造时间。

4. 可能增加的模型输入处理时间。

RAG 通常引入额外的检索开销，但不能保证在所有实现、所有请求下都比直接生成更慢。

**工程延伸：如何降低 RAG 延迟？**

|**方法**|**工作原理**|**潜在代价**|
|---|---|---|
|缓存|复用已有检索结果|可能出现过期数据|
|调整 Top\-K|减少进入模型的片段|可能遗漏证据|
|优化索引|提高检索效率|需要索引维护|
|并行检索|同时查询多个来源|增加资源使用|
|压缩上下文|减少输入 token|可能丢失信息|

关键词检索并非在所有场景下都比向量检索快。速度取决于索引结构、规模、硬件和具体实现。

### 2\.4 Advantages of RAG RAG 的五项优势

RAG 的优势不仅在于提高回答质量，还包括知识更新、来源追溯和模块化维护；但这些优势都是有条件的，而不是自动保证。　

|**课件原文**|**中文解释**|**核心机制**|
|---|---|---|
|Adds missing knowledge|补充缺失知识|外部知识弥补模型知识缺口|
|Updates knowledge without retraining|不重新训练即可更新知识|更新数据源与检索索引|
|Supports source citation|支持来源引用|保留检索结果的来源信息|
|Separates retrieval from generation|检索与生成分离|模块化设计|
|Helps alleviate hallucinations|有助于缓解幻觉|提供与问题相关的证据|

1. Adds missing knowledge：补充缺失知识

例如，模型不知道某个企业的最新产品规格。RAG 可以从企业知识库检索规格文档，再用于回答。

它解决的是知识不足的问题。但前提是外部知识源确实包含所需内容，而且检索器能够找到。

2. Updates knowledge without retraining：不重训即可更新知识

传统模型的参数知识通常依赖训练过程。RAG 可以在不修改生成模型参数的情况下，更新外部知识。

例如：旧文档：Product A warranty: 12 months

新文档：Product A warranty: 24 months

系统更新数据源和必要的索引后，就可以检索新的保修政策。但这不意味着 RAG 自动拥有最新知识。如果索引没有同步更新，仍可能检索旧内容。此外，并非每次更新都必须完整重建索引；一些系统支持增量更新。

3. Supports source citation：支持来源引用

RAG 可以保留文档的来源信息，例如：文件名称、URL、文档 ID、页码、片段位置。回答时可以展示引用，帮助用户核查。但要区分：能够引用来源与引用正确支持答案。前者是系统功能，后者需要额外验证。

4. Separates retrieval from generation：检索与生成分离

这是重要的工程优势。当回答错误时，可以分别检查：

- Retriever 是否找到了正确证据？

- Generator 是否正确使用了证据？

例如，检索结果正确但回答错误，问题可能出在生成阶段。反过来，如果检索器根本没有找到关键文档，单纯修改生成提示可能无法解决根本问题。这种模块化设计使系统更容易测试、替换和优化。

5. Helps alleviate hallucinations：缓解幻觉

检索证据能够降低模型在缺少信息时随意补充事实的风险。但它不能彻底消除幻觉。因为模型仍可能：

- 误读证据。

- 引用不相关片段。

- 混合不同来源的事实。

- 将推测表述成确定结论。

- 使用错误或过期的检索内容。

### 2\.5 Recap: Autoregressive Generation 回顾自回归生成　

New tokens depend on the tokens already generated\. 新生成的 token 依赖此前已经生成的 token。

模型并不是一次性直接输出整个答案，而是逐步生成 token。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTBkZDY1NjFkNDU0MzY4OWM2YmNjYjNlYzA3M2Y0NjlfNTk4Y2MzYzg4MzgwYmQ3YjBkNGZiYWQxNTlkZTFiMTlfSUQ6NzY5Nzk3MjU0ODY3OTU4NTMwOV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

Sampling：采样

With sampling, the same prompt can produce different completions\.

使用采样时，相同的 Prompt 可以产生不同的续写。这两个续写都可能符合语法与语义。因此，模型生成具有概率性，而不必然是固定输出。

**Sampling 与 Greedy Decoding 的区别**

Greedy Decoding：每一步选择概率最大的 token。

Sampling：按照概率分布采样 token。

采样能够提高输出多样性，但也可能引入不稳定性。

为什么自回归机制与幻觉有关？

自回归模型的基本目标是生成符合其学习到的语言分布的后续 token。但语言上的合理性不等于事实正确性。

例如：A marathon doubled hotel prices\. 

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjdmYmU3ZjdiNTZjNmZiYmYzYjM0MjQ5Y2QzYTJjOWZfMTkzNTczZGY1YzBlYjI1MDhmNzFiNGJkZTg4YzM5OTZfSUQ6NzY5Nzk3MjU0ODM0ODI1MTY4Nl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzExNzc0ZTBmMDJlNDhiOGIxOWRlNTdjZDdjMmJiMzRfOTJhODBlNjhmNjE2MTExNmI2MmU2OTY3N2EyOWNkMzVfSUQ6NzY5Nzk3MjU0OTY5MDMzMDY2MF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

这句话在语法上完全成立，也符合某种可能的经济因果关系。但它是否真实发生，需要额外证据。因此，自回归生成机制本身不保证输出事实正确；事实核查需要依赖模型能力、提示策略或额外验证机制。

### 2\.6 Hallucinations in LLM Outputs LLM 输出中的幻觉

Factuality 关注回答是否符合现实事实；Faithfulness 关注回答是否受到给定上下文的支持。

Generated content that is factually incorrect or unfaithful to the supplied context \(unsupported\)\.

生成内容在事实上不正确，或者不忠实于给定上下文、缺乏上下文支持。

1. Factuality：事实性

Does the claim agree with verifiable real\-world facts? 这个说法是否符合可验证的现实世界事实？

例如：A marathon doubled hotel prices\. 一场马拉松使酒店价格翻倍。

判断事实性时，需要检查：

- 是否确实发生了马拉松？

- 酒店价格是否真的翻倍？

- 是否存在支持两者因果关系的证据？

如果缺少这些验证，就不能认定该说法为真。

2. Faithfulness to Context：对上下文的忠实度

Do the supplied passages support the claim? 提供的段落是否支持这一说法？

假设检索内容只有：National Day holiday weekend\. Higher visitor demand expected\.

但模型回答：A marathon doubled hotel prices\. 这段回答没有得到给定上下文的支持。

因为上下文没有提到：

- 马拉松。

- 酒店价格翻倍。

- 马拉松与价格之间的因果关系。

因此，它属于 unsupported answer（缺乏证据支持的答案）。

3. Factuality 与 Faithfulness 的区别

||**Faithful：有上下文支持**|**Unfaithful：无上下文支持**|
|---|---|---|
|Factual：事实正确|事实正确且有证据支持|事实正确，但不是由给定证据支持|
|Non\-factual：事实错误|忠实复述了错误资料|事实错误且无证据支持|

**RAG 能改善哪个维度？**

RAG 能为模型提供外部证据，从而帮助改善 Faithfulness。同时，如果外部证据准确、及时，RAG 也可能改善 Factuality。但两者都不是自动保证的。因此，更准确的结论是：RAG 可以同时帮助事实正确性和上下文忠实度，但必须结合检索质量、来源质量和生成行为进行判断。

### 2\.7 Grounding Responses with RAG 用 RAG 为回答提供依据　

RAG 通过在生成前提供相关证据，使模型有机会给出更加有依据的回答faithfulness，但证据使用是否正确factuality仍需验证。

Relevant context “grounds” the LLM's responses\. RAG adds evidence before the model answers\.

相关上下文为模型回答提供依据。RAG 在模型回答之前加入证据。

Grounding 让模型回答与可识别的外部证据建立联系。

用户问：Why were Hong Kong hotels expensive last weekend? 没有证据时，模型可能提出各种猜测。

加入相关证据后：National Day holiday weekend\. Higher visitor demand expected\.

模型就可以围绕假期需求解释酒店价格。

Grounding 的三个环节

1. Retrieval 找到与问题相关的证据

2. Context Construction 把证据组织进模型输入

3. Evidence\-aware Generation 要求模型参考证据生成答案

Grounding 与 Citation 不一样

Grounding 关注：回答是否由证据支持？

Citation 关注：回答是否标出了来源？

例如：香港酒店价格上涨是因为国庆假期。\[Source 1\]

即使附有 Source 1，也必须检查 Source 1 是否真的支持这个因果结论。

因此：有引用不等于有充分证据支持。

Grounding 是否保证不会幻觉？

不能。模型可能忽略部分证据、错误理解检索结果、引入证据之外的细节、将相关性误认为因果关系。

因此，Grounding 是降低无依据生成风险的机制，不是正确性的数学保证。

### 2\.8 RAG 的计算限制

上下文窗口与计算资源都有限，因此 RAG 必须在信息覆盖范围和上下文成本之间进行选择。

1. Higher Computational Cost：更高计算成本

Longer prompts require more computation and memory\.

更长的 Prompt 通常需要更多计算与内存资源。

Long contexts can still increase latency\.

长上下文仍然可能增加延迟。

例如：输入 2,000 tokens 与输入 200,000 tokens，模型需要处理的上下文规模明显不同。即使模型支持长上下文，也不代表处理成本可以忽略。

2. Context Window Limit：上下文窗口限制

长上下文通常增加计算与内存压力，但具体增长方式取决于模型架构、推理阶段和实现。

Prompt and answer share a limited context budget\.

Prompt 与 Answer 共享有限的上下文预算。

Capacity depends on the model and configuration\.

**为什么检索比全部输入更合理？**

假设知识库包含 10,000 个片段。用户的问题只需要其中 5 个。全部输入意味着大量无关内容进入上下文。选择性检索则只需要返回相关片段。这样可以降低上下文占用。

但也引入新问题：如果检索器没有选对片段怎么办？这正是后续 Retriever Tradeoffs 和 Retrieval Evaluation 要解决的问题。

### 2\.9 Example

How can I find some recipes to make Shanghai\-style baozi at home? 怎样找到在家制作上海风味包子的食谱？

图书馆拥有大量书籍，但用户不可能逐本阅读。因此，需要一种高效的查找机制。

|**组成部分**|**课件原文**|**作用**|
|---|---|---|
|Collection|Books on many topics|收藏不同主题的书|
|Organization|Different shelves and sections|按书架与区域组织|
|Search|A librarian helps you find the best sections or books|图书管理员帮助查找|

|**图书馆**|**RAG 系统**|**工程作用**|
|---|---|---|
|Books|Documents|存储原始知识|
|Shelves and sections|Index|组织可检索信息|
|Librarian|Retriever|根据问题查找文档|

检索系统不仅需要信息集合，还需要组织信息与查找信息的机制。

**Organization：索引**

如果文档没有组织结构，查找可能非常低效。索引可以帮助系统快速定位候选内容。

索引是提升检索效率的重要工具，但不是所有检索算法在逻辑上都必须依赖索引。

不同索引的组织方式不同。常见索引包括：

- Inverted Index：倒排索引。

- Vector Index：向量索引。

- Metadata Index：元数据索引。

**Search：检索**

用户提出问题后，Retriever 根据查询寻找相关文档。

例如：

问题：How can I make Shanghai\-style baozi?

检索器可能优先返回：Baozi Basics

而不是：Shanghai History

What's the Role of a Librarian?

1. Understands the meaning of your question 理解问题的含义。

例如：How can I make Shanghai\-style baozi?

系统需要识别用户希望寻找的是制作方法，而不是上海的历史介绍。

在检索系统中，这通常涉及 Query Understanding（查询理解）。

2. Identifies the right shelves to search 确定应该查找哪些书架。

3. Eventually finds relevant books 最终找到相关书籍。

|**图书管理员行为**|**检索系统概念**|
|---|---|
|理解问题|Query Understanding / Representation|
|定位书架|Candidate Selection / Filtering|
|找到相关书籍|Retrieval / Ranking|

需要注意，课件是在用人类图书管理员进行概念类比。它并不意味着所有 Retriever 都必须严格分成三个独立模块。例如，一个向量检索器可以直接把查询编码为向量，再进行近邻搜索。查询表示与候选选择可能在同一套检索过程中完成。

优秀的检索器需要根据问题选择合适的候选内容，并将相关结果返回给后续生成阶段。

### 2\.10 Ranking Retrieved Documents 检索文档排序

检索器不仅需要找到候选文档，还需要对它们排序；但检索分数代表算法定义的匹配程度，不等于事实正确性或可回答概率。　

How can I find some recipes to make Shanghai\-style baozi at home? 检索器返回四个结果。

Ranking 是将候选文档按相关性得分排序。检索器通常希望相关文档的得分高于不相关文档。

检索器需要考虑：What does the prompt mean? 问题表达了什么含义？以及 What documents in the knowledge base are similar? 知识库中哪些文档与问题相似？这两个问题体现了查询理解与文档匹配。但它们不能严格对应为两条互斥的技术路线。关键词检索也需要查询处理，语义检索也需要计算相似度。

检索分数是不是概率？不是必然。

某篇文档即使与问题存在部分相关性，也不一定包含回答问题所需的信息。

相似度较高，不代表文档足以回答问题。

### 2\.11 Retriever Tradeoffs 检索器的取舍　

检索结果过少可能遗漏证据，过多可能引入噪声。系统需要通过指标和实际测试选择合适的检索配置。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2VlNzc3NTNmOTZlMzFkOTA3MGI1ZTM1ZTQ2NTdjMDFfNTRlM2QyZDMxZDJlYjM4NTg2ZDljZGU5NzJmMTgyMzhfSUQ6NzY5Nzk3MjU0NjEyMTE3NDU2Nl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

检索系统的核心权衡：应该返回多少文档？

1. Relevance vs Irrelevance: Need to return relevant documents and withhold irrelevant ones\.

应该返回相关文档，并尽量排除不相关文档。这看起来很简单，但实际并不容易。因为检索器无法保证每个评分都完全符合真实相关性。

2. Return Every Document? Irrelevant documents waste the context window\.

如果返回全部文档：优点：可能减少遗漏。缺点：大量不相关文档占用上下文窗口。

3. Return the Single Highest Ranked Document?

如果只返回排名第一的文档：优点：上下文更短，输入成本更低。缺点：可能遗漏其他有价值的信息。

4. Top\-K 的基本思想

Top\-K 表示返回评分最高的 K 个结果。K 越大，通常能够覆盖更多候选信息，但也可能增加噪声和上下文成本。

5. Precision 与 Recall 的权衡

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTNjNTEzZTBkYTk4ZDNmNWJmNGJiN2IxMmJmZTg5MjJfYjQyYjkwMzY4ZWEyZjJlMTk4ZTdkZThlODY4MjMwZjFfSUQ6NzY5Nzk3MjU0ODQ0OTA3ODgyMl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzJmMGVkNGJmMzMxYzUzNTEwMzgyOTdhZTI3ZjZiYWVfM2RiZjJiM2Q1OTVjYWIzM2MwNTU5MTkwNjI1MWFhYmVfSUQ6NzY5Nzk3MjU0OTcyMzkxNzg2MF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

Precision：表示返回的结果中，有多少是真正相关的。

Recall：表示全部相关文档中，有多少被成功找回。

6. No Perfect Solution：没有完美方案

No perfect solution: Scoring and monitoring\. Change settings to find what works\.

通过评分、监控和调整配置，寻找适合实际任务的方案。这意味着 Top\-K 并不存在一个对所有系统都最好的固定值。

7. 工程延伸：为什么不能只追求 Recall？

如果为了找回全部相关文档而返回大量候选内容，Recall 可能上升，但无关片段也可能增加。

这会导致：上下文成本上升、模型更难定位关键证据、可能出现证据冲突、回答质量不一定提高。

因此，检索系统的目标不是简单地让 K 越大越好，而是在覆盖率、精确率、延迟和生成质量之间取得平衡。

### 2\.12 RAG 的改进

RAG 建立在成熟的信息检索技术之上，并通过语言模型将检索结果转化为面向用户的生成式回答。

信息检索并不是随着 LLM 和 RAG 才出现的技术。

1. Search Engine：搜索引擎

Retrieves relevant webpages\. 检索相关网页。

2. Database：数据库

Retrieves relevant tables and rows\. 检索相关的数据表和数据行。数据库根据查询条件返回符合要求的记录。

需要注意，数据库中的精确条件查询与搜索引擎的相关性排序并不完全相同，但两者都涉及从大量信息中定位所需内容。

3. Information Retrieval 是成熟领域

Information retrieval was already mature before LLMs, and ideas from this field underlie the design of retrievers and RAG systems\.

在 LLM 出现之前，信息检索已经是一个成熟领域，而该领域的思想构成了 Retriever 和 RAG 系统设计的重要基础。

**RAG 继承了哪些经典技术？**

|**技术**|**主要作用**|**与 RAG 的关系**|
|---|---|---|
|TF\-IDF|词项重要性加权|关键词检索|
|BM25|文档相关性排序|稀疏检索|
|Inverted Index|快速定位包含词项的文档|检索索引|
|Cosine Similarity|比较向量方向相似性|稀疏与稠密向量检索|
|Precision|衡量返回结果的准确程度|检索评估|
|Recall|衡量相关结果覆盖程度|检索评估|
|MAP / MRR|衡量排序检索表现|排序评估|

需要区分，向量相似度方法可以与经典信息检索技术结合，但现代神经嵌入模型的发展也引入了新的检索能力。

**RAG 真正增加了什么？**

传统搜索引擎主要返回：相关文档或网页。

RAG 在此基础上进一步执行：将检索结果提供给生成模型，让模型综合信息生成自然语言答案。

RAG 的创新重点不是从零发明检索，而是将检索机制与语言生成系统结合。

## Part 3 Typical Retrieval Methods 典型检索方法

### 3\.1 The Retrieval Challenge 检索的挑战　

Retriever Goal: find documents in the knowledge base that can help an LLM respond to a prompt\.

从知识库中找到能够帮助 LLM 回答用户问题的文档。

|**角色**|**课件定义**|**实际困难**|
|---|---|---|
|Prompts|Unstructured conversation|用户表达自由、口语化|
|Retriever|Find relevant documents quickly|必须同时兼顾相关性与速度|
|Documents|Many formats written for humans|文档格式复杂、表达不统一|

1. 用户问题不一定与文档使用相同的词。

例如，用户问：How can I make baozi at home? 文档可能写：Use flour and yeast for Shanghai\-style baozi dough\. 用户关心的是制作方法，但文档不一定包含完整的提问表达。

2. 检索命中不等于文档能够回答问题。

如果文档写的是：Shanghai baozi shops offer home delivery\. 它虽然包含 baozi 和 home，却没有提供制作包子的方法。因此需要区分两个概念：

- Lexical Match（词面匹配）：查询词是否出现在文档中。

- Relevance（相关性）：文档是否真正有助于回答问题。

这正是后面引入语义检索的原因。

### 3\.2 检索器内部　

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWIxNmUyYWQxOGNlMjAxNTI5YTBiZTE4MzY0ZGY4NTJfYjM3OGY4MzhkOWYxNjdmY2M2OTllODg3NWI4MDEyYzFfSUQ6NzY5Nzk3MjU0OTcyMzkwMTQ3Nl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

How can we efficiently search the knowledge base?

这里的 efficiently（高效）不仅是运行速度快，还意味着能够从大量文档中优先找出相关内容。

Retriever 本身并不负责生成最终答案，而是为 LLM 提供更有用的上下文。

因此，检索质量会直接影响后续生成质量：

- 检索遗漏关键文档，LLM 可能缺少必要信息。

- 检索返回大量无关文档，有限的上下文窗口可能被噪声占用。

- 检索返回高相关文档，LLM 更容易生成有依据的回答。

### 3\.3 Two Search Approaches 两种搜索范式　

||**Keyword Search**|**Semantic Search**|
|---|---|---|
|中文|关键词检索|语义检索|
|核心依据|Exact words|Similar meaning|
|关注的问题|词是否相同？|意思是否接近？|
|典型方法|TF\-IDF、BM25|Embeddings|
|主要优势|精确词匹配|同义表达匹配|
|主要局限|难处理同义词|可能忽略精确标识符|

查询：How can I make baozi?

文档 A：Instructions for preparing steamed buns\.

文档 B：Baozi shops provide home delivery\.

关键词检索可能更偏向 B，因为它直接包含 baozi。语义检索则可能更偏向 A，因为 preparing steamed buns 与制作包子在含义上更接近。两种方法的差异，不是有没有向量，而是向量表示的是什么。

关键词检索用向量表示词项出现情况；语义检索用模型学习出的向量表示文本含义。

### 3\.4 Search Techniques 检索技术总览　

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWU2MTdmNmZjYTU0ZDJhYTkyMDQ3ZjM1ZGQ5ODk0YmVfNWY1MWQ3ZDdhMzI1ZjY1YWEwMWI2MTdjMjY0ZDllOGJfSUQ6NzY5Nzk3MjU0ODM0ODQzMTkxMF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

三个数量概念：

1. 候选文档数量：检索器最初召回的文档。

2. 过滤后数量：满足元数据约束的文档。

3. Top\-K 数量：最终返回给 RAG 后续环节的最高排名文档。

后面还会引入 RRF（Reciprocal Rank Fusion），用于把关键词检索和语义检索得到的两个排名列表融合成一个。

### 3\.5 Metadata Filtering 元数据过滤　

元数据（Metadata）指描述文档属性的信息，而不一定是文档正文。

Metadata Filtering 的核心不是计算相关性，而是判断文档是否满足硬性条件。

例如，用户要求只查询 2024 年 6–7 月的文章，即使一篇 2023 年的文章内容高度相关，也应当被排除。

**优点与局限**

|Benefits（收益）|Limits（局限）|
|---|---|
|Easy to understand and debug　容易理解与调试|Does not interpret document content　不解读文档内容|
|Fast, mature implementations　实现快且成熟|Does not rank by relevance　不按相关性排序|
|Enforces exact metadata conditions　严格执行元数据条件|Usually paired with a search method　通常需与检索方法搭配|

- 第一条收益 debug 很实际，过滤是布尔逻辑，出错了可以直接看出是哪条条件写错，不像打分那样难定位。

- 第一条限制是根本性的，它只读元数据，不读正文，所以无法判断内容是否切题。

- 第二条限制让它无法独自完成检索，它只能缩小范围，不能提供排序，最终还是需要一个排序器。

- 第三条既是限制也是用法说明，通常与检索方法搭配把它的定位钉死为预处理，而非独立方案。

其中最重要的区别是：Filtering（过滤）不等于 Ranking（排序）。假设有三篇文档：

|**文档**|**发布日期符合要求？**|**内容相关性**|
|---|---|---|
|Doc A|是|高|
|Doc B|是|低|
|Doc C|否|很高|

元数据过滤会保留 A、B，排除 C。但它不会自动判断 A 比 B 更相关。这需要关键词检索或语义检索等排序方法。因此，Metadata Filtering 通常作为检索流水线中的约束机制，与搜索算法配合使用。

### 3\.7 Typical Retrieval Methods 典型检索方法　

课件接下来正式进入三个主要方法：

1. Keyword Search：Bag of Words、TF\-IDF、BM25。

2. Semantic Search：Embedding、Vector Similarity、Positive and Negative Training Pairs。

3. Hybrid Search：结合关键词与语义检索结果。

这三种方法并非完全替代关系，而是逐步解决不同的问题。关键词检索回答的是哪些词匹配，语义检索回答的是哪些含义接近，混合检索则尝试综合两种证据。

### 3\.8 Introduction to Keyword Search

关键词检索可以找到字面相似的文档，但词项重合不等于内容相关。

Match words in the query to words in documents\. Shared terms provide a simple basis for ranking\.

关键词检索通过统计查询与文档之间的共有词项来衡量相关性。给这些共有词项打分。

1. BoW 把文本转换为词频统计

2. Sparse Vector 把词频表示成向量

3. TF 衡量词在文档中出现的频率

4. IDF 衡量词在整个文档集合中的罕见程度

5. BM25 进一步控制词频饱和与文档长度影响

这一条技术路线的逻辑是：

最初只判断词有没有出现，随后考虑出现多少次，再考虑这个词是否常见，最后处理重复词带来的过度加分以及文档长短不公平的问题。

Example：包子查询中的关键词匹配

用户的问题是：How can I make baozi at home?

**关键词检索首先寻找共有词**

把问题拆开，可以得到：`how`、`can`、`I`、`make`、`baozi`、`at`、`home`

这些词并不具有相同的信息价值。

Doc 1 包含 baozi，并提供了制作面团的信息。

Doc 2 包含 baozi 和 home，但讨论的是外送。

Doc 3 包含 Baozi，却主要介绍餐厅。

因此，包含更多相同词项，并不一定意味着文档更能回答问题。

后续关键词检索的三个问题：

1. 不同关键词是否应该具有相同权重？

2. 同一个词出现很多次，是否应该持续增加得分？

3. 长文档比短文档包含更多关键词，是否就应该排名更高？

接下来的 BoW、TF\-IDF 和 BM25，就是逐步解决这些问题。

#### 3\.8\.1 Bag of Words 词袋模型　

Bag of Words represents text by counting how often each word appears\. Word order is ignored, only word presence and frequency matter\.

词袋模型通过统计每个词出现的次数来表示文本。

模型只关心有哪些词，以及每个词出现了多少次，而不关心词的排列顺序。

BoW 本质上是一种词项统计表示，而不是完整的语义表示。

**词袋模型为什么仍然有用**

虽然它丢失词序，却带来两个重要优势。

第一，文本可以转换为数字。

第二，不同长度、不同内容的文本，可以映射到同一个词汇空间中进行比较。

这为后面的稀疏向量、词项—文档矩阵和相关性评分建立了基础。

#### 3\.8\.2 稀疏向量 Sparse Vectors

词频表可以表示成一个向量。

构造词汇表，按照课件展示的词项顺序，可以整理为：

|**Term**|**Value**|**Term**|**Value**|**Term**|**Value**|
|---|---|---|---|---|---|
|making|1|baozi|2|without|1|
|a|1|steamer|1|rice|0|
|flour|0|dough|0|tea|0|
|bowl|0|water|0|salt|0|
|soup|0|yeast|0|filling|0|

向量长度为 15，因为词汇表有 15 个词项。只有 5 个位置非零。

One vocabulary term per position; most entries are zero\.

Sparse 即每个位置对应词汇表中的一个词，而大部分位置都是 0。

例如，一个真实知识库可能有几十万个不同词项，但一篇短文只包含其中几百个。因此，其向量绝大多数维度都是 0。这就形成了高维稀疏向量。

**稀疏向量与稠密向量的区别**

||**Sparse Vector**|**Dense Vector**|
|---|---|---|
|中文|稀疏向量|稠密向量|
|典型用途|关键词检索|语义检索|
|维度含义|对应具体词项|学习得到的特征维度|
|数值分布|大量为 0|通常多数非零|
|代表方法|BoW、TF\-IDF|Embedding Models|

稀疏向量的每一维通常可以解释为一个具体词项；语义嵌入向量的单个维度通常没有这种直接可读的含义。

**工程上为什么不直接存储所有 0**

如果一个向量有 100,000 维，只有 100 个非零值，那么直接存储全部数值非常浪费空间。实际系统可以只存储：非零元素所在的位置、对应的数值。

在真实检索系统中，倒排索引（Inverted Index）通常比直接逐篇比较完整稀疏向量更适合关键词搜索。

#### 3\.8\.3 The Term\-Document \(TD\) Matrix 词项—文档矩阵　

如果知识库有很多篇文档，如何把它们组织到同一个数据结构里？

答案是 Term\-Document Matrix，即词项—文档矩阵。

**矩阵的基本结构**

- 行：Terms（词项）。

- 列：Document Vectors（文档向量）。

- 单元格：某个词项在某篇文档中的匹配或词频信息。

其中：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTcwNWFhMjIzZWViYTljOTZjZjIzYTI4OTJjZGU4ZGRfOGU3NGJlMDhhY2E0NGQzOWRmODAxYTJjMjgzNDliMjZfSUQ6NzY5Nzk3MjU0OTcyMzkzNDI0NF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

- $t_i$：第 $i$ 个词项。

- $d_j$：第 $j$ 篇文档。

- $M_{ij}$：该词项在该文档中的出现次数。

**从矩阵到排序**

这个过程可以概括为：文本 → 词频向量 → 文档矩阵 → 查询匹配 → 相关性得分 → 排序。

课件后面的 TF\-IDF 仍然使用这个结构，只是把矩阵中的简单词频替换为带权重的词频。

因此，TF\-IDF 不是推翻词袋模型，而是在已有的词项表示基础上改进权重。

**Scoring a Keyword Match 计算相关性**

规则：每匹配一个查询词项，就加 1 分。

这个公式对应的是 Binary Term Matching（二值词项匹配）。

它只判断词项是否出现，不考虑出现次数。

问题一：常见词与罕见词同权。a 命中一次也 \+1，baozi 命中一次也 \+1，但显然后者更有信息量，归一化解决。

问题二：长文档天然占优。文档越长，越可能包含查询里的词，命中数自然更高，词重要性（IDF）解决。

**Scoring All Query Terms 对全部查询词打分**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NWM4YmQ5MjUyNmMwNzE0NGYwZWE2MDg2YzJlYmJmYmRfNzRhYjdiNDYyZjhjZTcxMWNhMThkZTkwY2QzY2QxMjJfSUQ6NzY5Nzk3MjU0ODM0ODQxNTUyNl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

在当前规则下：

- `baozi` 匹配，加 1 分。

- `a` 匹配，也加 1 分。

但从信息价值来看，两者显然不同。`baozi` 能帮助识别文档主题。`a` 几乎不能帮助区分哪些文档与制作包子相关。不同词项是否应该具有不同的重要性？后面的 IDF 就是为此设计的。

#### 3\.8\.4 Frequency\-Based Scoring

前面的简单匹配规则只考虑词有没有出现。那么一个查询词在文档中出现很多次，是否意味着文档更相关？

课件定义：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODQ5MTBmMjAyZDI3NjY1ZWMyNmFmYmNhMzBjZjcwOTdfNjQ1MmFmYzBhYzA3YWQ0NjkwNWIyY2M5MjE5ODY4MDdfSUQ6NzY5Nzk3MjU0NjEyMTE1ODE4Ml8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjEyM2U2MTUyMDQ2MTM5M2Y1Yjc2NGJlNGU2NDllYThfN2I5YzEyYzhhMGYzY2NjOTI3OTJhZDRiNjE1MDAwZDJfSUQ6NzY5Nzk3MjU0OTcyNDA2NTMxNl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MmYzMzgyY2NjNDg4MDIyNzk0OTJjYmM2ODkyMWEzYjNfYmRiMjdlMGM5MzAyOWY0OTQ5OGEzNDk0NmYwZDAzYzdfSUQ6NzY5Nzk3MjU0OTcyNDExNDQ2OF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

**TF 的优势与问题**

TF 比简单的二值匹配更细致，因为它考虑了重复出现的词项。但它存在一个明显问题：较长的文档往往天然包含更多词，因此也更容易获得较高的原始 TF 分数。

例如，一篇 10,000 字的文章，可能比一篇 100 字的文章包含更多次 baozi。但这不代表前者一定更相关。

所以，课件下一页引入长度归一化。

#### 3\.8\.5 Normalized Term Frequency 归一化词频　

Issue: Raw counts can favor longer documents\.

原始词频可能偏向长文档。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmQ0ZGU1MjNlMDk5NTI1OGQxM2E1YmMyYmMzYWUzNGRfYmM4OTg4YmEzNWRlOGRiN2IxYjk1ZjA4MzBiMGVhZjZfSUQ6NzY5Nzk3MjU0OTcyNDE0NzIzNl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmVmYTg1YTMwNjE5M2Y1MzYyYzdiZWUzYTBlOGIyY2FfZGYzMmU2ZWQ1ODBmM2M2NGVmYWRhNzUzMGM4NDM2OWFfSUQ6NzY5Nzk3MjU1MDQxNjA1OTk0MV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

排名发生了逆转

Raw TF：Document 2 更高；Normalized TF：Document 1 更高

这说明：仅仅改变评分中的长度处理方式，就可能改变最终的检索排序。

**归一化是否完全解决了长度问题？**

没有。简单地除以文档长度，可能过度奖励非常短的文档。例如，一篇只有 5 个词的文档，其中 3 个是查询词，它的归一化分数可能很高。但这篇文档不一定包含足够的信息来回答问题。

这也是后面 BM25 不直接使用简单的 $TF/|d|$，而采用更灵活的长度归一化机制的原因之一。

#### 3\.8\.6 TF\-IDF：词频与逆文档频率

前面已经解决了两个问题：词是否出现。词出现多少次。

现在还剩一个重要问题：不同词的重要性是否应该相同？

Basic TF scoring treats all words equally, whether they're common filler words or rare, meaningful terms\.

基础 TF 评分把所有词都看得一样重要，不论它是常见词还是具有区分性的关键词。

例如：`the`：非常常见；`baozi`：相对少见，并且具有明确主题信息。因此，引入 TF\-IDF。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjkzNGNkZGI5MDliMDhjOTNlYjgzOGE0ZTg5ZjY5ZWNfMDA2NjZiMWM4ZDEwNzdhZTJmMDE2NjJlZDc2NTNhMTBfSUQ6NzY5Nzk3MjU1MDQxNjA0MzU1N18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODI2NmFiNzBkMWI2N2RhMWY1MDNkYzk1MmFmZWU2YjhfNzBkYTU2YmJhZDEwMDg0ZmI1OTY0M2NkNzQ0YTc2NjBfSUQ6NzY5Nzk3MjU0ODY3OTcxNjM4MV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

注意，TF\-IDF 有多种实际实现形式，TF 可以使用原始次数、对数缩放或归一化形式，IDF 也可以进行平滑处理。这里先严格按照课件给出的基本公式理解。

**为什么要使用逆文档频率**

假设有 100 篇文档。`the` 出现在全部 100 篇中。`baozi` 只出现在 5 篇中。

`the` 几乎不能帮助检索器区分文档，因为每篇都有。`baozi` 则更具有区分性，因为只有少量文档包含它。

所以一个词越少见，它在区分文档方面通常越有价值。这就是 IDF 的基本思想。

##### 3\.8\.6\.1 Calculating Inverse Document Frequency 计算逆文档频率　

第一步：统计文档频率

第二步：取倒数

第三步：取自然对数

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTc0ZDFmNmIwZTM3MTlhNjkzZDRkMWZjMmYyM2JmNzRfYjEyZWE5ODkwZTEzNzhhM2NkZjliMTcwNDNkMzlkNTJfSUQ6NzY5Nzk3MjU0OTcyNDIyOTE1Nl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjFjMTkxOTJmZGRkMDU3NTlmZTkzMGNhZjJkY2Q0ZWJfMzk2ZmJlYzE2N2I4M2RjNTcyMDM0ZDhkZWQ0MzBkNzZfSUQ6NzY5Nzk3MjU1MDQxNjE1ODI0NV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

为什么还要取对数？如果直接使用 $N/df$极罕见词可能得到非常大的权重。

例如：出现在 10 篇文档中：倒数为 10；出现在 1 篇文档中：倒数为 100。两者相差 10 倍。

取对数后，差距被压缩。因此，对数变换既保留了罕见词权重更高的趋势，又避免权重增长得过快。

##### 3\.8\.6\.2 Applying TF\-IDF Weights

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDRjMzg4ZTAyZmU4NDAwMDg2ZGRkZGYyYTA3NzA5ODZfNTE2NjcwNGFiZGUyZWE2ODFlMGU5M2MyY2MzYzgzZjVfSUQ6NzY5Nzk3MjU1MDQxNTk5NDQwNV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzRkYjRiYzllN2VmNTFkMzM4ZmFmM2M2NTIzYzRkZDJfMjIxZDg0NmY2OGUyNjMwZGI0ZTJlN2ZmMWUxNTU0NWFfSUQ6NzY5Nzk3MjU1Mjk4Mjg1OTMwMl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzEwY2U5OThjZTFiNGEwMzNhODNhM2MwODZmZDk2YjNfM2RmYjM1OTY2MTJmNmUxN2E1NzQyMjI5YzI3NThiNGZfSUQ6NzY5Nzk3MjU0ODM0ODM4Mjc1OF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)



##### 3\.8\.6\.3 Ranking with TF\-IDF 用 TF\-IDF 排序　

Rare keywords can contribute more to the score than common words

罕见关键词对分数的贡献可以超过常见词

加了 TF 之后，同一个词的得分变化，但词与词之间的相对高低仍由 IDF 主导

**TF\-IDF 解决了什么**

相比原始词频，TF\-IDF 能够降低大量普通词的影响。

例如，一篇文档反复出现 `a`、`the`、`and`，不应仅仅因为这些词出现得越多就获得高相关性。

**TF\-IDF 仍然存在什么问题**

TF\-IDF 并不是完整的相关性理解模型，仍然依赖词项重合。

例如：查询：How to prepare steamed buns? 文档：Instructions for making baozi\.

即使两个文本语义非常接近，如果没有合适的词形处理或词项扩展，传统 TF\-IDF 也可能无法有效匹配。

此外，原始 TF\-IDF 中的词频可能持续增长，长文档长度问题也需要额外处理。

这两个问题正是 BM25 重点改进的方向。

#### 3\.8\.7 From TF\-IDF to BM25

BM25 refines keyword scoring with saturation and length normalization\.

BM25 通过词频饱和与文档长度归一化，进一步改进关键词相关性评分。

两个核心概念：

1. Term Frequency Saturation（词频饱和）

一个词出现 20 次，不应该必然获得出现 10 次时的两倍得分。

2. Document Length Normalization（文档长度归一化）

长文档包含更多词，但不应该仅仅因为篇幅更长而获得不合理的排名优势。

这两点构成 BM25 相比简单 TF\-IDF 的主要改进。

Modern RAG systems often use BM25 to refine keyword scoring\.

BM25 是现代检索系统中广泛使用的关键词排序方法。

##### 3\.8\.7\.1 BM25 Scoring

BM25 全称 Best Matching 25，来自 1990 年代的 Okapi 检索系统，是 TREC 评测里迭代出的第 25 版公式。它不是从理论推导出来的，而是在大量评测中调出来的经验公式。这也解释了为什么它带有 k₁ 和 b 两个需要人工设定的参数，它们是评测调优的产物。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTI2MGQwMmI3ODNlY2EzODk1YzVkMmQxM2VlMjIwNmZfZmE3YmYzMDA1ODgwZmZjNWNkM2UxMWY5ODZiN2MzOTJfSUQ6NzY5Nzk3MjU0OTY5MDU2MDAzNl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzM4NzM0ODJhZjdiNzAwMjdjNTM3OGY5ODBjNGE2MTFfN2Y3NGYxODkzNmY5ZmIzYmE3ODRjM2MxY2E5YzBmNGVfSUQ6NzY5Nzk3MjU0OTY5MDYwOTE4OF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2FhNjIyY2VmNGJlYmIxM2ExNGQyNWNiZWFjYTM0NmZfNDhmZjVkZmJlN2UxNjMwMzQ3MjVlODhjNzYzMThiMmJfSUQ6NzY5Nzk3MjU0OTcyNDAzMjU0OF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDFjMGQ3YzM2NDU4MmIxZmZlZDE1NzNiY2U5ODM0NzBfN2RhZGNhMWY3NjRjZGZjNDE5ZWI0NTk3OWE0OWRmMDVfSUQ6NzY5Nzk3MjU1Mjk4Mjg5MjA3MF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

BM25 Tunable Parameters BM25 可调参数　

|维度|Raw TF\-IDF|BM25|
|---|---|---|
|词频增长|10 次 = X → 20 次 = 2X（线性）|20 次 → Score \< 2X（饱和）|
|短文档|Short Doc = Higher Score|Short Doc = Less Penalty|
|长文档|Long Doc = Lower Score|Long Doc = Tunable Penalty|
|惩罚性质|Fixed length penalty　固定|Tunable Penalty　可调（由 b 控制）|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODI4YTI5NzI0MWFlNzIzZjg4MjBkZmZkYzYyMjljM2FfZjM4MzU1NzM5ZjJlZGJiYzVkOGRiOGE4MmE5NGIwOGZfSUQ6NzY5Nzk3MjU0OTY5MDYyNTU3Ml8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTNiZWVkOTFjM2QxN2MxNWFiNzI3NzQ1MmMxMzE1ZjlfNjdlNTQ3OWYwOGIzNDRkMjZkZjQxMzhlNjYwNTBhMTFfSUQ6NzY5Nzk3MjU0OTcyNDIxMjc3Ml8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

Two Improvements in BM25 BM25 的两项改进　

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWYxZjNmYjEyNDkyZmIyOTAwZmI3NzM0ODY2NWJlNjRfY2IxMWM4NjViNTQ2MDViYWNjMTVhOGIyYmRkYzE1MzVfSUQ6NzY5Nzk3MjU0OTY5MDU3NjQyMF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

第一项：词频饱和

- 简单线性词频评分：rice 出现 10 次得到 X，出现 20 次得到 2X。

- BM25：出现 20 次的得分通常小于出现 10 次得分的两倍。

原因是重复出现的词会产生递减收益。例如，一篇文档已经多次讨论 rice，再增加一次 rice，提供的额外相关性证据可能并不多。

第二项：文档长度归一化

- 简单按长度归一化可能形成固定比例的长度惩罚。

- BM25 使用可调节的长度惩罚。

这让检索器可以适应不同类型的文档集合。例如：新闻标题：文本普遍较短。学术论文：文本较长。RAG 文本块：长度可能较为接近。这些集合不一定适合完全相同的长度惩罚。

**工程上的重要细节**

如果 RAG 系统已经把长文档切成长度相近的 Chunk，BM25 的长度归一化效果可能与直接检索完整文档时不同。

因为此时长度比例接近 1。这意味着，Chunking 策略会间接影响 BM25 的评分行为。

饱和为什么符合直觉？一篇文档里出现 10 次 rice，已经足够说明它在讲米饭；出现 20 次，信息量并没有翻倍。如果一篇文档反复刷同一个词，多半是垃圾内容或关键词堆砌，不应该无限加分。饱和机制正是对这种噪声的防御，它是边际效用递减在检索打分里的实现。

TF\-IDF vs\. BM25

|**维度**|**TF\-IDF**|**BM25**|
|---|---|---|
|词频处理|基本形式可线性增长|饱和函数|
|词项罕见程度|IDF|IDF|
|文档长度|依赖具体实现，可另行归一化|内置可调长度归一化|
|参数|基础公式较简单|$(k_1,b)$|
|工程应用|经典检索基线|常用生产级关键词排序方法|
|语义理解|不直接理解语义|不直接理解语义|

BM25 比基础 TF\-IDF 更灵活，不代表它在任何数据集上都必然更好。最终效果仍然需要通过检索评估指标和实际任务测试判断。

工程实现上

默认选 BM25：成本相近、质量更好、生态成熟

用 TF\-IDF：语料很小、需要极简实现、或需要一个能看懂每一步的教学基线——Tutorial 用的就是 TF\-IDF，因为 13 个分块、345 个词项的规模下，BM25 的两个参数反而增加理解负担。

#### 3\.8\.8 关键词检索小结

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjExMzExNjM3MTMwOGVlZjA2NmY5YmM2N2U1M2VlM2JfYzQxZjg5MmQ1MWQ1YmZjZTVjOTExM2ZiOWE0OThkZTJfSUQ6NzY5Nzk3MjU1MDQxNjE0MTg2MV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

To match a prompt according to how frequently the prompt’s keywords appear in each document

按提示关键词在各文档中出现的频次来匹配提示

1. TF\-IDF 的三项加权： Keyword rarity（关键词罕见度）、Term frequency（词频）、Document length（文档长度）。

2. BM25（最常用）的两项改进：Document length normalization 与 Term Frequency Saturation。

3. 流程四个动词 ：Sparse Vectors → Scored → Ranked（稀疏向量 → 打分 → 排序）

4. What are the pros and cons?——Why Meaning Matters？

### 3\.9 Semantic Search and Embeddings

#### 3\.9\.1 语义的重要性

关键词检索的两类系统性失败：

失败一：同义词（Synonyms）

失败后果：文档里写 glad，查询里写 happy，共有词为零，分数为零。

失败二：同形异义（Same spelling, different meaning）

失败后果：查询里的 Python（编程语言）与文档里的 Python（蟒蛇）字面相同，会被判为高度相关。

|现象|方向|关键词检索的表现|语义检索的期望表现|
|---|---|---|---|
|Synonyms　同义词|漏检|happy vs glad 分数为 0|两者向量接近，能命中|
|Polysemy　同形异义|误检|Python 语言 vs 蟒蛇被当作同一回事|由上下文决定向量位置，可区分|

关键词检索的全部信息就是字面是否相同，它没有别的线索可用，所以这两类错误是方法层面的，不是参数层面的。 要解决它们的问题，需要引入embedding，让表示本身携带语义。

#### 3\.9\.2 关键词检索与语义检索

Both approaches represent the query and documents as vectors\.

关键词检索和语义检索都可以把查询与文档表示为向量。两种方法都把查询与文档表示成向量，最大的区别不在于是否使用向量，而在于向量表示什么。

1. Keyword Search：A sparse lexical space 稀疏词汇空间

关键词检索统计词汇表中各个位置上的词。例如：每一维通常对应一个具体词项。如果词汇表包含 50,000 个词，向量就可能具有 50,000 个维度。大部分维度为零。

2. Semantic Search：语义嵌入空间

语义检索使用 Embedding Model，将文本转换为能够表达学习到的语义特征的向量。

|**维度**|**Keyword Search**|**Semantic Search**|
|---|---|---|
|构造方式|Count words in vocabulary positions<br>在词表位置上计数|Use an embedding model to represent meaning<br>用嵌入模型表示含义|
|空间名称|A sparse lexical space（稀疏的词法空间）|A semantic \(embedding\) space（语义/嵌入空间）|
|表示依据|词项出现与频率|学习得到的语义特征|
|维度特点|词表有多大就有多少维，绝大多数为 0|维度固定（如 384），几乎每维都有值|
|典型向量|Sparse Vector|Dense Vector|
|可解释性|高：分数可拆到具体词项|低：分数是整体相似度|
|核心方法|BoW、TF\-IDF、BM25|Embedding Model|
|主要优势|精确词项匹配|语义相似性匹配|
|主要局限|同义词与上下文理解|可能忽略精确词项差异|

两种检索方式都能使用向量，但关键词向量表示词项统计，语义向量表示模型学习到的文本特征。 

- 共同点比差异更重要，既然两者都产出向量，那么相似度计算方式、排序方式、top\-k 截断方式都可以共用。

- 差异只在怎么造这个向量，这正是混合检索可行的技术前提。

#### 3\.9\.3 Word Embedding Space 词嵌入空间

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzI0ZGI2NDgzYWUzZjkyMDcyNjAxNTIxMjI0OWNhZWRfNTMzZTU2N2VlOThhZjlkMWFiOGIxNzQ4ZDQ3ZTQyNTJfSUQ6NzY5Nzk3MjU0OTcyNDI2MTkyNF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjFhZmUxYjkyNjdmNGM3MmM3MGZkMzhlOGZjMjUxMmZfY2MxNWRmYjFmZGQyYTJjYzExOWYzNDViNjEwYTQ3YjRfSUQ6NzY5Nzk3MjU1MjYzMDYwMzMwMF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDJkMTRmZTczODNhMTgxNmM2YjhmMzg5MGQyNDMxZjlfOWVjZGY4YzA1MDhkMWI0YzlkN2U2MWMwNWNhMWIwZWRfSUQ6NzY5Nzk3MjU1MDQxNjE3NDYyOV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDQyNjZhMjZlOThiMzkxY2RjYThjMTg5ZDZmMjNmMWZfNjZjM2QxYzhjOGU2M2RjMTRkNDE3NTY0ODFkMGM0NjlfSUQ6NzY5Nzk3MjU0OTY5MDY0MTk1Nl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTVhN2ZhODAwMjE1Y2U1ZmQ4MDg3MmYxNTBiMjAzYmVfNDQ0NWMwNzc4MmI3ZGFkOTBjMTllMmJhYzdhNDM3N2RfSUQ6NzY5Nzk3MjU1MjYzMDY1MjQ1Ml8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

Embedding Different Text Units 嵌入不同的文本单元

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTAxZWNiMjhjNWY0MGJjMTVjOTM2MTk2NjY1NWIyNzFfYjU0MzUxYzI1OTI4OTI1MDFmY2M4MzIxZGNhNDRmOWFfSUQ6NzY5Nzk3MjU0ODQ0OTA0NjA1NF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDdiMTZmNjdhNWZiZjdjZTNjY2FmYzJmNDFmZDk3NTdfMjAzMDczYjdmYTc1Njc1MmJmNDAwOWViODY5NWQwMGVfSUQ6NzY5Nzk3MjU1MjczOTY4Nzk3M18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

嵌入可以作用在三个粒度上，各有各的模型。

|文本单元|模型|课件示例|
|---|---|---|
|Word　词|Embedding Model|cat · happy|
|Sentence　句子|Sentence Embedding Model|The weather is nice · What a lovely day|
|Document　文档|Document Embedding Model|（课件以空框示意，未给示例句）|

分块（chunking）本质上是在选粒度。块太小，一个事实会与它的解释被切开；块太大，一个向量要概括太多主题，相似度会被稀释，模型要处理的信息越多。一个句子需要处理语序与修饰关系；一篇文档还要处理长距离依赖。

Sentence Embedding Example 句子嵌入示例　

三句话、三个向量：意思接近的两句在空间里靠得近

1. He spoke softly in class\.

2. He whispered quietly during class\.

3. Her daughter brightened the gloomy day\.

第一句和第二句：spoke softly、whispered quietly 表达的动作和语境相近；第三句则表达了不同的内容。

- 课件结论句 — Once we project these sentences into an embedding space, we can use vector similarity to measure the semantic meaning\.

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWRjOTY2ZWY1N2ViMWUyMTM2MzkwM2ZhN2U2NzFjMTVfMmU3MTRmOGM0MzI2YzhmMTViZDIwNjY4NTNiNWJjZDFfSUQ6NzY5Nzk3MjU1MjczOTY3MTU4OV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjA5N2I5ZTNjZmZkMjUwZmRjNWYxNTQ5NWI1YmE5N2JfYzYzYjY0ZWNlNTI2ZTRhYWI3ZDE4ZTcxY2EzMTQ3OTlfSUQ6NzY5Nzk3MjU1MDQxNjAyNzE3M18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

示意：A、B 方向更接近，余弦相似度更高；C 与它们的方向差异更大。

### 3\.10 语义检索流程 Semantic Search

Documents/Prompt → Embedding Model → Vector Space

- 第一步，用 Embedding Model 把 Documents 全部转成向量，放进 Vector Space。

- 第二步，用同一个模型把 Prompt 转成向量，也放进 Vector Space。

- 第三步，Rank by distance and return the closest documents（按距离排序，返回最近的文档）。

距离近 = 语义近。

欧氏距离（L2）：越小越相似。

余弦相似度：越大越相似（值域 \-1 到 1，非负向量时为 0 到 1）。

必须是同一模型，换模型意味着两个向量不在同一个空间，比较结果失去意义。

### 3\.11 Embedding Models Learn from？

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWEyZDU3ODViZDAxYjRiM2MzYmNlZTQ0NjMyMjAwMGZfM2NhYTMwOWIxZjMwMWRmNTc0NmFmNmViNWJkMzIyMTdfSUQ6NzY5Nzk3MjU1MDQxNjE5MTAxM18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

前面已经知道：相似的文本应该在向量空间中更接近。

但这引出了一个新问题：模型怎么知道哪些文本相似，哪些文本不相似？

课件使用三个例子：Hello、Good morning\!、Noisy trombone

Hello 和 Good morning\! 都属于问候语。

Noisy trombone 则表示一种不同的概念。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmY4MGJiYjkyMmY2YTkyYjdmNGIxNDJiYWVkYjY4ZTVfODY3N2EzZTMwNzcwMTBhMGIwMTRiMzQ1ZjFjYWVjM2ZfSUQ6NzY5Nzk3MjU1MjYzMDY2ODgzNl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

1. 向量位置不是天然正确的

在训练前，模型并不会天然拥有一个符合任务目标的语义空间。课件通过散点图展示了不同文本在空间中的位置。模型需要利用训练数据和损失函数，逐步调整参数，让空间结构更符合训练目标。

2. 训练的三个基本组成部分：

Training Data（训练数据）告诉模型哪些文本相似，哪些文本不同。

Architecture（模型结构）负责将文本映射为向量。

Loss Function（损失函数）衡量当前向量表示是否符合训练目标。

训练过程不断更新模型参数：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDE2NzI0ODNiMzMwYzc1MzczNDI1ZTFiMjliYWRkZjBfMmVlMjNiODI2ZWJlMjhmYzU3Y2I0YjUzNjMxYTdmYjBfSUQ6NzY5Nzk3MjU0ODM0ODM2NjM3NF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

### 3\.12 Positive and Negative Training Pairs 正样本对与负样本对　

|样本类型|课件例子|含义|训练动作|
|---|---|---|---|
|Positive pair　正样本对|Good Morning ↔ Hello|Similar meaning|拉近两个向量|
|Negative pair　负样本对|Good Morning ↔ Noisy trombone|Different meanings|推远两个向量|

**为什么正负样本需要同时存在**

如果只训练正样本，模型可能只学会让某些相似文本靠近，却缺乏足够的区分能力。

负样本提供了对照：不仅要知道什么是相似的，还要知道什么是不相似的。

这种利用相似与不相似关系学习表示的方法，是 Contrastive Learning（对比学习）的核心思想。

### 3\.13 Training data

Compile massive training dataset of positive and negative pairs

构建大规模正负样本训练数据集

**为什么需要大量训练数据**

单独一个正样本对：`Good Morning` — `Hello`只能告诉模型这两个表达比较相似。但真实语言具有大量不同的语义关系。例如：问候语、同义词、主题相似、问题与答案、描述与标题。

因此，模型需要从大量样本中学习更一般化的表示能力。

**样本关系与训练目标**

在语义检索中，一个正样本对不一定是两句完全相同意思的话。

Query：How do I make baozi?

Positive Document：Steps for preparing steamed buns at home\.

它们不是同一句话，但文档可以回答查询，因此在检索任务中可以被视为相关样本。

这说明：检索模型学习的不仅可以是语言意义上的相似性，也可以是查询与文档之间的任务相关性。

这是对课件正负样本概念的检索场景的延伸。 

### 3\.14 Further Reading

#### 3\.14\.1 Contrastive Loss

公式说明正负样本是如何被同时拉近与推远的

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTE0Y2ExNjY4YTZiOWZiMTkwMzNlNjRiOGI5ZDRkZjNfMzgzM2Y5Njk5YWZjZWZiMTI1ZDk2NjZiYWY3ZTk3OTBfSUQ6NzY5Nzk3MjU1MjczOTcwNDM1N18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTkxZWRhYzI0NDNjNTljYmYwOTAzOWNmY2YwMDEyMDNfNDRjZTc5Y2JjMGFkMTYyZTU4YzM5NWRjNjBlMzU1ZTZfSUQ6NzY5Nzk3MjU1MjczOTcyMDc0MV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjIxMDUxZThmOGFmMTkyOGZjODQ2MTliMzY2ZjM2YzdfMDFhN2EyMTIwNzFhNWJmMzM4MWViZTU3ZTA5NTJhZWRfSUQ6NzY5Nzk3MjU1MDQxNjIwNzM5N18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

Contrastive Loss 通过比较正负样本的相对相似度，引导模型学习具有区分能力的嵌入空间。

#### 3\.14\.2 Updating the Embedding Model

上一页定义了训练目标。这一页展示模型如何通过重复训练改善向量空间。

把训练过程画成一个循环：Embed（嵌入当前样本）→ Score（按损失函数打分）→ Evaluate（评估误差）→ Update（更新模型参数）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDUyMDAxYWY4YTNlZWU1ZjkzNTM2OWQ0MTNhNTZkYWFfM2QwMTYyZmQ2NGVjYWYwZGYzNjQ2ZTYxYmFmNjVmMGZfSUQ6NzY5Nzk3MjU0OTY5MDY1ODM0MF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWI5NmI0NTQ1YmMwMWVhNDI2NzQwMDIyZGE0MDBkNGJfYzhiYjU3NDU3ZTFkZGQ3Yjc0ZDA5NDhmOTRmYTNhOTRfSUQ6NzY5Nzk3MjU1MjYzMDYzNjA2OF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

训练集上的正负样本分离并不能自动保证检索效果良好。实际还需要在独立评估数据上验证模型的泛化能力。

#### 3\.14\.3 High\-Dimensional Embeddings

More dimensions mean more room to form clusters and capture nuanced relationships\.

更多维度为模型表示复杂关系提供了更大的空间。高维表示可以帮助模型学习这些复杂因素之间的关系。不过，这并不意味着每一个维度都对应某个明确、独立、可解释的语义属性。

**高维空间仍然遵循相同原则**

The same principles hold\. Close vectors, similar meanings\.

即使嵌入向量有数百甚至数千维，基本思想仍然相同：在模型采用的相似度度量下，语义相关的文本应该具有较高相似度。

**高维不一定更好**

增加维度可能提升表示容量，但也可能增加：向量存储成本、检索计算开销、索引内存需求。

因此，Embedding Dimension 需要在表示能力、检索效果和系统成本之间取得平衡。

### 3\.15 嵌入模型要点

|课件原文|含义|
|---|---|
|Vector locations are arbitrary before training\.|训练之前，向量位置没有意义|
|Training data and constrative loss form the learning|学习由训练数据与对比损失共同塑造|
|compare vectors from the same embedding model\.|只有同一模型产出的向量才能互相比较|
|Pretrained models can be used directly for retrieval\.|预训练模型可以直接拿来做检索，无需自己训练|

1. Vector locations are arbitrary before training

训练之前，向量的位置并不天然对应所需的语义结构。通过训练，模型逐步学习有用的表示。

2. Training data and contrastive loss from learning

课件强调训练数据与 Contrastive Loss 的共同作用。训练数据定义哪些文本应该接近、哪些应该区分。损失函数把这些关系转换为可以优化的数学目标。

3. Compare vectors from the same embedding model

工程原则：不同嵌入模型即使输出相同维度的向量，也不代表这些向量位于同一个兼容空间中。虽然维度相同，但如果两个模型独立训练，直接比较其输出通常没有可靠的语义意义。对于 RAG 系统，文档和查询通常需要使用同一个嵌入模型，或者使用经过联合训练、明确兼容的查询与文档编码器。

4. Pretrained models can be used directly for retrieval\.

预训练模型可以直接用于检索，也就是说，并不是每个 RAG 项目都需要从头训练一个 Embedding Model。可以使用已有的预训练嵌入模型，为查询和知识库文档生成向量。这显著降低了语义检索系统的构建门槛。

这一部分从关键词检索的局限出发，解释了语义检索的完整逻辑。

|**核心问题**|**对应概念**|**解决思路**|
|---|---|---|
|不同词能否表达相同意思？|Semantic Similarity|比较语义而非仅比较词项|
|文本如何变成数字？|Embedding Model|映射到向量空间|
|哪些文本更相关？|Vector Similarity|比较查询与文档向量|
|模型如何知道相似关系？|Positive / Negative Pairs|提供训练监督|
|如何训练嵌入空间？|Contrastive Loss|拉近正样本、区分负样本|
|如何改善模型？|Embed–Score–Update–Evaluate|反复优化|
|如何用于实际 RAG？|Pretrained Embeddings|生成向量并检索|

### 3\.16 Comparing Retrieval Methods 比较各种检索方法　

|方法|课件原文|中文|
|---|---|---|
|Metadata filtering|Applies strict criteria such as permissions or region\.|施加严格判据，如权限或地区|
|Keyword search|Matches exact terms and provides a strong lexical baseline\.|匹配精确词项，提供强的词法基线|
|Semantic search|Finds similar meanings even when wording differs\.|即使措辞不同也能找到相近含义|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzBjYmU5NjdmMWM3ZDUzNzkzZGM4Yzk4YTczYzZkNGZfNjVkZTUxODUxMTg2YzY3ZWVmZmQ1ZWQ2NWIzOTA1MDNfSUQ6NzY5Nzk3MjU1Mjk4MjkyNDgzOF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Mzc2ZTE1Njk4MDNiYTg0MjY4MmE1NWY1YWEzYzc0OTVfMGE1ZDQ1NmNkYjg5YmUwMTA1N2QyNDE3MmRjYjM5MGNfSUQ6NzY5Nzk3MjU1Mjk4MjkwODQ1NF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTk3MDQwZDhiNmExNzhkZTExYjFhNjhmZjc4YWRkNjdfOGU4ODg0MzE1NjlkNmE2NmNiZDRlMWViYmY4OGJhMDBfSUQ6NzY5Nzk3MjU1MDQxNjI3MjkzM18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTc5OWQ0MzBiMDdlNzc4YmZlYmNlYTc0ZTVkMjIxMTBfYWY0YzY5OGYwODZmNzBlYjk3M2NjNWIzOWY1YzQzNzRfSUQ6NzY5Nzk3MjU1Mjk4Mjk0MTIyMl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

这三种方法并不互相排斥。实际系统可以先使用元数据约束候选范围，再利用关键词和语义检索找到相关内容。

### 3\.17 Combining Ranked Lists 合并排序列表　

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTdkNjBkNmEyZjY3ZjUwYzYxYmZhYzgyODlhNThmMGZfNWJhZDIxOWNmZGFkNDE5MDJiZjcxMzRjNjIwZTc2MWRfSUQ6NzY5Nzk3MjU1MjYzMDcxNzk4OF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

混合检索的目标：Lists combined to form single ranking 把多个排序列表合成一个排序。

**为什么两个结果列表不同？**

因为两种检索方法使用不同的相关性标准。

Keyword Search 可能认为 Document A 最相关，因为它包含更多精确匹配的关键词。

Semantic Search 则可能认为 Document C 最相关，因为它在嵌入空间中更接近查询。

注意，两个列表也存在重叠，例如 Document B 和 Document C。

这意味着某些文档同时得到了两种检索方法的支持。

**合并不是简单拼接**

假设直接把两份列表连接起来，就可能出现两个问题：

- 同一篇文档重复出现。

- 两个列表之间缺少统一的相关性顺序。

融合要解决的核心难题：分数不可比

关键词检索的分数是 TF\-IDF/BM25 值（无上界，量纲依赖于语料）；语义检索的分数是余弦相似度（通常在 0–1）。两者的数值不能直接相加，加出来的结果没有任何意义。因此，Hybrid Search 需要一个 Ranking Fusion（排序融合）机制，丢掉分数、只用排名。 Reciprocal Rank Fusion，正是用于解决这个问题。

### 3\.18 Reciprocal Rank Fusion 倒数排名融合　

Reciprocal Rank Fusion，简称 RRF。是一种根据文档在多个检索结果列表中的排名，计算综合得分的方法。与直接合并 BM25 分数和向量相似度不同，RRF 主要使用排名位置。

1. Rewards documents for being highly ranked on each list 按每个列表里的排名高低给分，排名越高奖励越多

2. Optional weights balance keyword and semantic rankings 可选权重用来平衡两路排序的比重

**RRF 的基本思想**

- 排名越靠前，贡献越大。

- 可以使用权重平衡关键词和语义排名。

- 当 $k=0$ 时，第 1 名得 1 分，第 2 名得 0\.5 分。可以看到，排名越靠后，得分越低。当 $k$ 增大时，靠前和靠后排名之间的贡献差距会变得相对平缓。课件没有指定生产系统应该使用的固定 $k$ 值；在实际实现中，该参数可以根据系统需求设置。

- 各个排名列表的得分相加，决定最终排名。

核心逻辑是：一篇文档在多个列表中排名越靠前，最终的融合得分通常越高。

An RRF Calculation

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjVmMjE5YzQzNzFiYmU2Mjc3ZTJhODAzZWY5YzhhNmJfMWM4NzA5N2FiMzQyOGY4ODQ0ODVhOTRmZmY0ZTY2NmFfSUQ6NzY5Nzk3MjU1MjYzMDY4NTIyMF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTMxMGFjZGZmMmQ3ZjEzNzcyMzY2NzBjNTFkZDliMDZfZDU1ODgzMDExMWVjMzEzZTJjMDE5MmViMGRjZWUxOWJfSUQ6NzY5Nzk3MjU1MjYzMDcwMTYwNF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjRmNGQ1OGFjYzVkNTE5ODk3YWNhYjdmZmMxMGY4YmFfMmRmNTk0NGVmOGUzYzBlYjY0MzYxMGQzNzI4NGU3MzVfSUQ6NzY5Nzk3MjU1MjczOTc1MzUwOV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTRlYjVhMzQ2NjMxYjkyOWIwOTYxYjZlZTVkYjIxNTlfZDFlMTFlZjkzYjFhYjk0ODkyOThmNDg0Y2YwODJkZjFfSUQ6NzY5Nzk3MjU1MjYzMDczNDM3Ml8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

### 3\.19 Weighting Semantic and Keyword Search 语义与关键词的加权　

除了排名融合的方式，还有一个更直接的控制手段：给两路结果加权重 β。

- β = 0\.8 的情形 — Semantic Search 占 80%，Keyword Search 占 20%。

- β = 0\.7 的情形 — Semantic Search 占 70%，Keyword Search 占 30%。

- β 调的是比重 ——直接决定两路贡献的相对大小，作用在加权求和式的融合里。

- RRF 的 k / c 调的是排名差的压缩程度 ——它不改变两路谁更重要，只改变排名靠前这件事的收益有多陡。

|β|Semantic Search|Keyword Search|适用倾向|
|---|---|---|---|
|0\.8|80%|20%|问题措辞灵活、依赖语义理解|
|0\.7|70%|30%|含精确串（编号、型号、专名），需要字面匹配|

### 3\.20 Returning the Top K Documents 返回前 K 篇文档

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWNhNTMyNDIxMmZiNzY4OWMyNTY0M2IxOTU0ZmU4ZTJfZDI5YzJkOWJjMTA0MDg2YjI2MjljMWM5OWVjN2U0YTBfSUQ6NzY5Nzk3MjU1NDAyMzA2MzA3N18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

前面已经完成：Keyword Search、Semantic Search、Metadata Filtering、Ranking Fusion

接下来，系统需要决定：最终应该把多少篇文档返回给 LLM？

课件给出的答案是：Return the “top\_k” highest\-ranked documents\. 即返回排名最高的 K 篇文档。

区分：课件重点讲的是检索结果如何融合并返回 Top\-K，图中的完整 LLM 生成流程是与前面 RAG 架构内容的衔接。

**为什么不返回全部文档**

如果把检索到的所有文档都交给 LLM，可能带来：更高的上下文 Token 消耗、更多无关信息、更长的输入处理时间、更高的生成成本。因此，Top\-K 的作用是限制最终进入后续处理阶段的候选文档数量。

**K 越大越好吗**

不一定。较小的 K 可能减少无关内容，但也可能遗漏有用信息。较大的 K 可以覆盖更多候选文档，但也可能引入噪声。因此，K 的选择需要结合检索质量、上下文预算和具体任务。

**Hybrid RAG 的最终结论**

Hybrid RAG search is still a mainstream and effective design\. 混合检索仍然是一种主流且有效的 RAG 检索设计。

它不是简单地选择关键词检索或语义检索其中之一，而是将不同方法的优势组合起来。

### 总结

三种技术各自负责什么

|**技术**|**核心作用**|**典型方法**|
|---|---|---|
|Metadata Filtering|严格约束候选文档|字段条件筛选|
|Keyword Search|精确词项相关性|BM25|
|Semantic Search|语义相关性|Embedding \+ Vector Similarity|
|Ranking Fusion|合并不同检索结果|RRF|
|Top\-K Selection|选择最终返回的文档|排序截取|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTA4NjFlMzA4NTgxMDk0OTdhMDYzOWNlNGQwOWQzZWNfNjhhMjNkOWNlMWE0NzdhZDg1NDQ3NWNmYjFmOTQ1MTBfSUQ6NzY5Nzk3MjU1MjczOTc2OTg5M18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjE5YTJlOTU4Y2JlMTQwNTg4YzM0NmYxNWM5NzQyNmRfMzQxNDIzYjBjMWQyMDQ3MWVjMjIxMTgzNWIwNjFkZDFfSUQ6NzY5Nzk3MjU1Mzk4NTMxNDM0MV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

**五个核心问题**

1. 为什么需要 Retrieval？ 因为 LLM 需要从外部知识库获取与用户问题相关的信息。

2. BM25 为什么比简单词频更有效？ 因为它结合了词项重要性、词频饱和与文档长度归一化。

3. Embedding 为什么能用于语义检索？ 因为模型学习了可比较的向量表示，使相关文本具有较高的向量相似度。

4. RRF 为什么适合 Hybrid Search？ 因为它根据排名融合结果，不需要直接比较不同检索器的原始分数。

5. Top\-K 的作用是什么？ 从融合后的排序中选出有限数量的高排名文档，供后续 RAG 流程使用。

核心结论：高质量 RAG 检索不只依赖一种匹配方式，而是通过关键词匹配、语义相似性、元数据约束与排序融合，共同找到最适合回答用户问题的文档。

## Part 4 Retrieval Evaluation 检索评估

Part 3 解决了一个问题：如何从知识库中找到相关文档？ Keyword Search、BM25、Semantic Search、Hybrid Search，以及 RRF 排序融合。但找到文档并不代表检索效果一定好。

例如，两个 Retriever 都返回了 10 篇文档：

- Retriever A 返回了 8 篇相关文档。

- Retriever B 返回了 5 篇相关文档。

我们可能认为 A 更好，但如果 A 把真正重要的文档排在最后，而 B 把它们排在最前面，情况就没那么简单。

因此，Part 4 要解决三个核心问题：

1. Precision： 返回的文档有多少是相关的？

2. Recall： 所有相关文档中，有多少被成功找回？

3. MAP： 相关文档是否排在检索结果的前面？

### 4\.1 Retrieval Quality Metrics 检索质量指标　

三要素：查询、排序结果、标准答案。

|课件元素|含义|
|---|---|
|Query: The specific information needs being evaluated|被评估的那个具体信息需求|
|Ranked results: Documents returned in ranked order|按排名返回的文档列表|
|Ground truth: Documents labeled relevant or irrelevant|被标注为「相关 / 不相关」的文档|

Ground truth 是评估的前提，没有人工标注的相关性判断，任何指标都算不出来。常见来源：人工标注（最准、最贵）、用户行为日志（点击/停留，规模大但有噪声）、合成标注（用模型生成，最便宜但可能有偏）。

To evaluate a retriever, you need relevant judgments\. 评估检索器需要相关性判断，指的是一批查询、每个查询一批标注，不是单点结论。这一步的成本常被低估，标注需要人工，规模越大成本越高，但它是所有指标的地基。

### 4\.2 Precision and Recall 精确率与召回率　

|指标|公式|课件追问|
|---|---|---|
|Precision　精确率|Relevant retrieved / total retrieved|How many returned documents are relevant?|
|Recall　召回率|Relevant retrieved / total relevant|How many relevant documents were returned?|

Precision：你找回来的东西，有多少是对的？

Recall：所有对的东西，你找回来了多少？

#### 4\.2\.1 The Precision–Recall Trade\-off 精确率与召回率的取舍　

|运行|Retrieved|Relevant|Precision|Recall|
|---|---|---|---|---|
|First Run|Retrieved: 12 Documents|Relevant: 8 Documents|8/12 = 66\.7%|8/10 = 80%|
|Second Run|Retrieved: 15 Documents|Relevant: 9 Documents|9/15 = 60%|9/10 = 90%|

**提高一个必然牺牲另一个，为什么会发生这种变化？**

第二次检索多返回了 3 篇文档，但只有 1 篇是相关的。

因此：Recall 提高，因为多找回了一篇相关文档；Precision 降低，因为额外引入了两篇无关文档。

Precision penalizes returning irrelevant documents\. Precision 惩罚返回无关文档。

Recall penalizes leaving out relevant documents\. Recall 惩罚遗漏相关文档。

如果检索器能更准确地找到相关文档，两者也可能同时提高。

### 4\.3 Evaluating the Top K Results 评估前 K 个结果　

1. Retrieval metrics are influenced by how many documents the retriever returns（指标受返回数量影响）。

2. Metrics are discussed in terms of top\-k documents（指标都以 top\-k 的方式讨论）。

返回得越多，Precision 的分母越大（一般会被拉低），Recall 的分子越大（一般会被抬高）。

**为什么 K 会影响指标？Retrieval metrics are influenced by how many documents the retriever returns\.**

因为 K 改变了被评估的文档集合。当 K 增大时：

- Recall@K 不会下降，因为已经找到的相关文档仍然保留。

- Precision@K 可能上升，也可能下降，取决于新增文档是否相关。

**实际应用应该如何选择 K？Evaluate at a cutoff that matches the number of results your application uses\.**

评估时使用的 K，应该与实际应用使用的结果数量一致。

例如，如果 RAG 系统只把前 5 篇文档交给 LLM，那么 Precision@5、Recall@5 就比只报告 Precision@100 更贴近实际使用情况。

#### 4\.3\.1 Precision and Recall at K 前 K 个结果的精确率与召回率　

同一个排序列表，换个截断位置，指标就变了。

|截断|课件标注|计算|结果|
|---|---|---|---|
|Precision@5|2 out of 5|前 5 位命中 2 个相关|40%|
|Precision@10|6 out of 10|前 10 位命中 6 个相关|60%|

Precision@K 不一定随着 K 增大而下降。

Evaluate at a cutoff that matches the number of results your application uses\.

如果后面新增的文档中有较高比例的相关文档，Precision@K 反而可能上升。

### 4\.4 Mean Average Precision 平均精度均值　

前面的 Precision@K 只关心前 K 篇文档里有多少篇相关。但它没有充分体现相关文档具体排在什么位置。

例如：

- Retriever A：相关文档排在第 1、2、3 位。

- Retriever B：相关文档排在第 4、5、6 位。

假设只有这 3 篇相关文档，两者在 K=6 时，虽然两个指标相同，但显然 A 把相关文档排得更靠前。这就是 Average Precision（AP）要解决的问题。MAP 解决的是光看 Precision@k 看不出排序好坏这件事。

**MAP averages Average Precision \(AP\) across queries\. MAP 把各查询的 AP 再做平均。**

AP 步骤

1. 找出所有相关文档所在的排名。

2. 将这些排名位置对应的 Precision@K 相加。

3. 除以全部相关文档的数量。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2I4YTJlMDhhM2NiOGJjOTliYjIxMTUzNWVlZmU2ZTlfNjc2OThhMDhjMWZiZGI2MjY3MWJiNzYwZmVjNTQ0NGZfSUQ6NzY5Nzk3MjU1Mjk4Mjk1NzYwNl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTdkMmUyMmVjYmJmOGIyZjRjZjQ5ZGQyYWZjNTg3YjhfMTU5MWM3OGQ2YzllY2VhZWVlZjhjNzBkYjQwZDMzM2JfSUQ6NzY5Nzk3MjU1MDQxNjI1NjU0OV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzIxOTVhNzk2YTJjYjEyYWVjYTA0YTZhNmViZGNhZjNfNzBlMDFkNDdlMzU3ZTUxMmQ4YWI1OGZhZDc4MjFmYzdfSUQ6NzY5Nzk3MjU1Mjk4Mjk3Mzk5MF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWYwYzE1MTkyOGQzY2I1ZmYzMjkxN2E0NmNmNDlkNzdfZGFkYTU2ZTk4ZWViYzljNzY5MTBjMzgxYmM4Y2YzMjFfSUQ6NzY5Nzk3MjU1MDQxNjI4OTMxN18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmVkODNkOGRlYmE4MzczYWJkNWU0NGRkMGM0MTUyMzZfOWFjMjA2MWQ1MjIwNTQyZDQ2YzM0Njg4MmYzMzRhNzZfSUQ6NzY5Nzk3MjU1MDQxNjI0MDE2NV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

### 4\.5 Using Retrieval Metrics 检索指标怎么用　

|指标|课件定位|回答的问题|
|---|---|---|
|Recall@K|Coverage of the relevant documents|“Did we retrieve the relevant information?”|
|Precision 与 MAP|Result relevance and ranking quality|“How much of what we retrieved is relevant?” / “Are the relevant results ranked near the top?”|

不同指标与实际检索系统的调优目标

1. Recall@K：Coverage

Coverage of the relevant documents\. 相关文档的覆盖程度。

核心问题：Did we retrieve the relevant information? 如果 Recall@K 很低，说明检索系统遗漏了大量相关文档。

可能的改进方向包括：

- 增加候选召回数量。

- 引入 Semantic Search 补充关键词检索。

- 调整过于严格的非权限类过滤条件。

但权限过滤不能为了提高 Recall 而随意放宽。

2. Precision：Result Relevance

How much of what we retrieved is relevant? Precision 衡量返回结果中相关文档所占的比例。

如果 Precision 很低，说明检索结果包含较多无关内容。

可能的改进方向：

- 调整 Top\-K。

- 改进关键词与语义检索的匹配策略。

- 使用更有效的相关性排序或过滤方法。

3. MAP：Ranking Quality

Are the relevant results ranked near the top? MAP 关注相关文档是否排在前面。

如果系统 Recall 较高，但 MAP 较低，可能意味着：相关文档虽然已经被检索出来，却排在较靠后的位置。

这时可以考虑调整：

- BM25 参数。

- Embedding Model。

- Hybrid Search 的权重 β。

- RRF 的融合设置。

这些属于基于指标的工程调优思路，并非课件保证有效的固定操作。

4. 指标与调优方向总结

|**指标**|**主要关注**|**偏低时可能的问题**|
|---|---|---|
|Recall@K|覆盖率|遗漏相关文档|
|Precision@K|结果纯度|无关文档太多|
|MAP|排序质量|相关文档排得靠后|

**为什么要在同一组查询上比较？**

Compare settings on the same labeled query set\.

如果 Retriever A 使用一组简单查询，而 Retriever B 使用另一组困难查询，那么两者的指标无法公平比较。

正确的实验方法是：固定相同的 Query Set 和 Ground Truth，再比较不同的检索设置。通过比较，可以判断哪一种设置更符合应用需求。评估指标的意义不只是给检索器打分，更重要的是帮助选择和改进检索配置。

### 4\.6 全讲要点

1. Knowledge beyond training

RAG can provide private, recent or specialized information\.

RAG 可以补充模型训练之外的私有、近期或专业信息。

2. Retrieval before generation

Relevant documents ground the answer in supplied evidence\.

先检索相关文档，再基于检索证据生成回答。

3. Retrieval methods

Keywords match terms, embeddings match meaning, and filters enforce criteria\.

关键词匹配词项，Embedding 匹配语义，Metadata Filter 执行条件约束。

4. Evaluation guidance

Use recall and precision to compare retrieval settings\.

使用召回率与精确率等指标比较不同检索设置。

为什么需要外部知识 → 如何把外部知识提供给 LLM → 如何找到相关知识 → 如何判断找得好不好。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWU4YjlhYmQ5NThjMTI2ZTA5OWI0ZTUzM2EwODcxOTZfNmRjOTc3MDM4MTIxNGUwNzI1YWU1OWM1ZmQwMzRjNGFfSUQ6NzY5Nzk3MjU1NDAyMzA0NjY5M18xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2FmZmI0OTgxN2RkOTNhMDcxODMxYTAwMjJiMzk5ODhfZDg0YWJlNTVmYmJkMTZmYmJmY2ZjZjA3NmVjZDUyMWJfSUQ6NzY5Nzk3MjU1Mjk4Mjk5MDM3NF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

# Lecture 7 Retrieval Optimization and Agentic RAG Systems 检索优化与智能体 RAG

## Part 1 Scalable Retrieval  可扩展检索

### 1\.1 RAG 工作流与检索方法回顾

#### 1\.1\.1 RAG Workflow

传统 LLM 与 RAG 的主要区别在于是否引入外部知识检索。

- Direct LLM Use： Prompt → LLM → Response。模型直接利用自身参数中存储的知识生成答案。

- RAG System： Prompt → Retriever → Relevant Documents → Augmented Prompt → LLM → Response。检索器从外部知识库（Knowledge Base）获取相关文档，将其与原始问题组合为增强提示，再交给 LLM 生成答案。

RAG 将外部知识引入生成过程，因此检索质量与检索效率都会影响最终系统表现。

#### 1\.1\.2 三种典型检索方法 Typical Retrieval Methods

|**方法**|**核心原理**|**特点**|
|---|---|---|
|Keyword Search（关键词检索）|根据查询与文档之间的词项匹配进行检索|依赖词汇匹配|
|Semantic Search（语义检索）|将查询和文档编码为向量，根据语义相似度检索|可以匹配不同措辞表达的相近含义|
|Hybrid Search（混合检索）|结合关键词检索与语义检索结果|将两路结果融合为统一排序|

关键词与语义检索分别返回 50 篇文档，经过元数据过滤后分别剩余 35 篇和 30 篇，再融合为单一排序。

其中，Metadata Filter（元数据过滤） 根据文档属性进一步筛选候选结果；Hybrid Ranking（混合排序） 则将不同检索路径的结果整合，而不是简单地分别返回两组列表。

#### 1\.1\.3 语义检索流程 Semantic Search

语义检索以向量表示为基础，主要包括三个阶段：

1. Embedding Model（嵌入模型）： 将文档和查询分别编码为向量，使其能够在统一的向量空间中进行比较。

2. Vector Space（向量空间）： 语义相近的文档和查询通常具有更接近的向量表示。

3. Rank by Distance（距离排序）： 根据向量距离或相似度对文档排序，返回与查询最接近的结果。

这一流程构成后续 KNN、ANN、NSW 和 HNSW 的共同基础。不同方法的主要区别不在于是否使用向量，而在于如何高效定位距离查询向量最近的候选文档。

### 1\.2 精确向量检索与规模挑战 KNN \& Scaling Challenges

#### 1\.2\.1 KNN：精确最近邻检索

KNN（k\-Nearest Neighbors，k 近邻）通过比较查询向量与所有文档向量之间的距离，确定最近的 $k$ 个文档。检索流程：

1. Embed documents and the query： 将文档和查询编码为向量。

2. Compare with every document： 计算查询向量与每个文档向量的距离。

3. Rank by distance： 按距离从近到远排序。

4. Return the nearest k documents： 返回距离最近的 $k$ 个文档。

在完整扫描的前提下，KNN 能够找到全局最近邻，但必须对整个文档集合进行距离计算。

设知识库包含 $N$ 个文档向量，每次查询需要：N次向量距离比较。因此，距离计算的时间复杂度为：O\(N\)

这里的线性复杂度针对距离比较阶段；完整检索还包含编码和结果选择等操作。

### 1\.2\.2 规模扩展问题 Scaling Challenges

随着知识库规模扩大，精确扫描的比较次数同步线性增长。

示意图：仅表示距离比较次数与文档数量的线性关系。

文档向量可以提前计算并存储，但每次新查询仍需要与全部文档向量比较。因此，主要的扩展性瓶颈是逐一比较全部文档，而非文档向量的初始编码。

### 1\.3 近似最近邻检索 Approximate Nearest Neighbors, ANN

ANN 的核心思想是通过预先建立的索引（Index）缩小搜索范围，只访问部分候选向量，而不对所有文档执行完整扫描。三个基本特征：

- Searches fewer candidates using an index： 利用索引减少候选文档数量。

- Trades exactness for speed： 通过放弃严格的最近邻保证来提高检索速度。

- The closest result is not guaranteed： 检索结果可能不是全局最近邻。

ANN 是一类近似检索方法，而 NSW、HNSW 是其中基于邻近图（Proximity Graph）的具体实现。

KNN 与 ANN 对比

|**比较维度**|**KNN（精确扫描）**|**ANN**|
|---|---|---|
|搜索范围|所有文档向量|部分候选向量|
|索引|不依赖近似索引|利用预建索引|
|最近邻保证|保证全局最近邻|不保证全局最近邻|
|大规模检索|线性扫描成本较高|通常显著更快|
|主要取舍|精确性优先|速度与召回率平衡|

ANN 的性能需要同时考虑两个维度：

- Search Speed（检索速度）： 完成一次查询所需的时间或计算量。

- Recall（召回率）： 近似检索找到的结果与真实相关结果或精确最近邻结果的重合程度，具体取决于评估定义。

因此，ANN 的优化目标不是单纯追求最快，而是在可接受的召回率下减少检索成本。

### 1\.4 可导航小世界图 Navigable Small World, NSW

NSW 是一种基于图结构的 ANN 方法，通过建立文档向量之间的邻近关系，将全局扫描转化为局部图导航。

#### 1\.4\.1 邻近图的构建 Proximity Graph Construction

邻近图由节点（Nodes）和边（Edges）构成：

- Node： 代表一个文档向量。

- Edge： 表示两个向量之间建立的邻近连接。

构建过程包括：

1. Compute distances between all document vectors： 计算文档向量之间的距离，确定邻近关系。

2. Connect each node to its nearest neighbors： 将每个节点与其附近的若干节点连接。

3. Insert document vectors incrementally： 支持增量插入新的文档向量。

4. Traverse the graph along edges： 查询时沿图中相邻节点之间的边进行搜索。

前面三个要点描述索引构建与维护，第四个要点描述索引在查询阶段的使用。

邻近图的构建具有一定计算成本，但可以预先完成，并在后续多次查询中重复使用。

#### 1\.4\.2 NSW 检索算法：贪心游走 Greedy Walk

NSW 的检索过程，四个阶段。

阶段一：选择入口（Entry Point）

从图中随机选择一个节点作为初始候选节点。该节点不需要接近查询向量。

阶段二：比较相邻节点（Neighbor Comparison）

计算当前节点及其相邻节点与查询向量的距离，只考虑当前节点直接连接的邻居。

若存在距离查询更近的邻居，则沿对应的边移动，并将其更新为当前候选节点。

阶段三：重复局部搜索（Iterative Search）

在新的候选节点上重复相同操作：

$v_{t+1}=\arg\min_{u\in N(v_t)}d(u,q)$

其中：

- $q$：查询向量（Query Vector）

- $v_t$：当前候选节点

- $N(v_t)$：当前节点的邻居集合

- $d(u,q)$：邻居节点与查询向量之间的距离

只有当所选邻居比当前节点更接近查询时，才执行移动。

阶段四：终止搜索（Stopping Condition）

当所有相邻节点都不比当前节点更接近查询向量时，终止当前贪心游走。

$d(v_t,q)\leq d(u,q),\quad \forall u\in N(v_t)$

此时得到的是局部最优（Local Optimum），不一定是全局最近邻（Global Nearest Neighbor）。

#### 1\.4\.3 NSW 的优势与局限

NSW 通过沿图边访问候选节点，通常能够以更少的距离比较找到接近查询的文档，并可用于寻找多个近邻。但由于贪心搜索只考虑当前节点的直接邻居，搜索可能在局部最优位置停止，即使图中其他区域存在更接近查询的节点。

因此，NSW 与精确 KNN 的根本区别是：

KNN 比较全部向量以确定全局最近邻；NSW 通过邻近图进行局部导航，以较少的比较次数寻找近似最近邻。

### 1\.5 分层可导航小世界图 Hierarchical Navigable Small World, HNSW

HNSW 在 NSW 邻近图的基础上引入层级结构（Hierarchy），通过不同密度的图实现从粗粒度定位到细粒度检索。

#### 1\.5\.1 HNSW 的层级结构

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjRkNmMwMTcyYjQ1NGRkMzU2ZDIzNDAwMGY0YzJiODZfYzUyNWM2YjkyYjk1ZjNjYWQwYjEyMzc2MjRmNjM4MmFfSUQ6NzY5ODM4NjIwMjQ2NjAxMjcwOF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

HNSW 由稀疏上层、中间层和稠密底层组成。

|**层级**|**结构特征**|**检索任务**|
|---|---|---|
|Sparse Upper Layer|节点数量少、图稀疏|Coarse Navigation：粗粒度导航|
|Intermediate Layer|节点数量增加|Narrow the Search：缩小搜索范围|
|Dense Base Layer|包含全部文档向量|Local Refinement：局部精细检索|

Start with fewer nodes\. Refine the search as the layers get denser\.

其核心思想是从节点较少的上层开始搜索，再逐层进入更密集的图，逐步提高定位精度。

#### 1\.5\.2 分层索引构建 Building the Hierarchy

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjRhMWM0NDFjODhhNmE2YWNkZTFmYmNhYTJmYzczZmFfZDc0NWZiYWIwYzU2NjQ2ZjM4YjlkNmEwYmY2ODgzMjdfSUQ6NzY5ODM4NjIwMTI3OTEzOTM2NV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

课件以包含 1,000 个文档向量的数据集为例，构建三层邻近图：

上层节点更少，底层包含全部文档向量。图中数量为课件示例，并非固定配置。

- Layer 3： 随机选择 10 个向量构建邻近图，用于最高层的快速导航。

- Layer 2： 随机选择 100 个向量构建邻近图，用于中间层搜索。

- Layer 1： 包含全部 1,000 个向量，用于最终检索。

上层节点也是下层节点的一部分，使搜索能够在不同层级之间连续进行。课件采用的 10、100、1,000 是用于说明稀疏到稠密结构的示例规模。

#### 1\.5\.3 HNSW 检索流程 Top\-down Search

HNSW 采用自顶向下（Top\-down）的搜索方式。

第一阶段：Layer 3 — Coarse Navigation

从最高层随机选择一个入口节点，在稀疏邻近图中搜索距离查询较近的候选节点。由于上层节点较少，可以通过较少的比较完成初步定位（Make Big Jumps Early）。

第二阶段：Layer 2 — Intermediate Search

以上一层找到的最佳候选节点作为本层的起点，在节点数量更多的邻近图中继续搜索，进一步缩小与查询向量的距离。

第三阶段：Layer 1 — Local Refinement

以 Layer 2 的最佳候选作为起点，在包含全部文档向量的底层图中执行最终搜索，得到近似最近邻结果。

这一过程的关键是：

$\text{Best Candidate}_{L3}
\rightarrow
\text{Entry Point}_{L2}$

$\text{Best Candidate}_{L2}
\rightarrow
\text{Entry Point}_{L1}$

每一层都继承上一层的搜索结果，而不是重新随机选择入口。

因此，HNSW 与 NSW 使用相似的邻居比较机制，但 HNSW 通过多层图组织搜索过程，减少在大规模底层图中进行无效导航的成本。

#### 1\.5\.4 检索复杂度与性能 Complexity \& Performance

KNN 的线性增长 vs HNSW 的近似对数增长

|**方法**|**检索增长趋势**|**主要原因**|
|---|---|---|
|KNN|$O(N)$|与全部文档向量比较|
|HNSW|通常近似 $O(\log N)$|利用稀疏上层导航和逐层细化减少候选访问|

这里的 $O(\log N)$ 是课件对 HNSW 常见检索表现的近似描述，不是所有数据分布、索引配置和召回率要求下都成立的严格保证。

HNSW 的实际检索速度还取决于：

- Index Settings（索引设置）： 影响图结构与搜索范围。

- Recall Targets（召回率目标）： 对结果准确性的要求越高，通常需要检查更多候选节点。

因此，HNSW 能够显著改善大规模向量检索的扩展性，但仍需要在速度、召回率与索引构建成本之间进行权衡。

### 1\.6 KNN、NSW 与 HNSW 综合比较

|**维度**|**KNN**|**NSW**|**HNSW**|
|---|---|---|---|
|检索类型|精确检索|近似检索|近似检索|
|数据结构|向量集合|单层邻近图|多层邻近图|
|搜索策略|全量距离比较|单层贪心游走|自顶向下逐层搜索|
|入口节点|不需要|随机图节点|最高层入口节点|
|候选范围|全部向量|当前节点及邻居|各层的局部候选|
|最近邻保证|有|无|无|
|扩展性|线性扫描|减少距离比较|通常近似对数增长|
|索引构建成本|无需建立近似图索引|需要预建邻近图|需要预建多层邻近图|
|主要局限|大规模查询成本高|可能陷入局部最优|索引复杂，性能受参数和召回目标影响|

### 1\.7 总结

本部分介绍的优化路径可以归纳为三个层次：

1. KNN → ANN：减少比较数量。 精确 KNN 对所有文档向量进行距离计算，查询成本随知识库规模线性增长。ANN 通过索引缩小候选范围，以牺牲全局最近邻保证换取更高的检索效率。

2. ANN → NSW：通过图结构组织候选搜索。 NSW 将文档向量组织为邻近图，查询时沿连接边进行局部贪心搜索，从而避免全量扫描，但可能因局部最优而错过全局最近邻。

3. NSW → HNSW：通过层级结构进一步优化导航。 HNSW 将邻近图划分为从稀疏到稠密的多个层级，先在上层快速定位，再在下层精细检索，通常能够获得更好的大规模检索效率。

最终结论： ANN 的优势来自预计算索引与减少在线距离比较。其代价是更高的索引构建成本，以及检索速度与召回率之间的权衡。

从系统执行阶段来看：

$\underbrace{
\text{Document Vectors}
\rightarrow
\text{Build Index}
}_{\text{Offline Index Construction}}$

$\underbrace{
\text{Query Vector}
\rightarrow
\text{Visit Candidates}
\rightarrow
\text{Top-}k
}_{\text{Online Retrieval}}$

将较高的计算成本前移至离线索引构建阶段，使在线查询不再需要遍历全部文档向量，是本部分可扩展检索技术的共同设计思路。

## Part 2 分块、查询改写与检索编码器

Chunking, Query Rewriting and Retrieval Encoders

本部分围绕 RAG 检索质量的三个核心问题展开：文档如何组织、查询如何表达，以及查询与文档如何匹配。

- Chunking（文档分块）：确定知识库中的基本检索单元，平衡信息完整性、相关性与存储成本。

- Query Rewriting（查询改写）：消除用户输入中的歧义与冗余，使查询更适合检索。

- Retrieval Encoders（检索编码器）：通过不同的编码与交互机制，平衡检索精度、速度及存储开销。

三者分别作用于文档侧、查询侧和匹配阶段，共同决定最终检索证据的质量。

### 2\.1 文档分块 Document Chunking

#### 2\.1\.1 分块的必要性

Chunking 是将长文档划分为较小的文本单元的过程。其核心目标不是单纯缩短文本，而是使每个检索单元包含足够的信息，同时尽量减少无关内容。

**分块的作用**

|**目的**|**说明**|
|---|---|
|Respect embedding token limits|避免文档超过嵌入模型的输入长度限制|
|Improve retrieval relevance|减少不同主题之间的语义干扰，提高检索相关性|
|Send focused context to the LLM|向生成模型提供聚焦且充分的证据，减少上下文窗口浪费|

**不分块的问题（Indexing without Chunking）**

假设知识库包含 1,000 本书，每本书整体编码为一个向量。这种方式虽然减少了向量数量，却存在两个主要问题。

首先，整本书可能包含多个主题，而单个向量只能表达文档的整体语义，难以准确表示具体章节或段落。不同主题的信息混合后，可能降低特定查询的匹配效果。

其次，即使检索到相关书籍，也可能需要将大量无关内容送入 LLM，占用有限的上下文窗口。

因此，分块的关键是将检索粒度由整个文档细化为更有意义的局部内容。

#### 2\.1\.2 分块粒度与大小权衡

文档可以按不同粒度划分：

$\text{Book}\rightarrow\text{Page}\rightarrow
\text{Paragraph}\rightarrow\text{Sentence}$

随着粒度减小，检索单元通常更加具体，但单个片段包含的上下文也会减少。

|**分块大小**|**主要问题**|**对检索的影响**|
|---|---|---|
|Too large（过大）|包含多个主题和大量无关内容|语义混杂，匹配不够精确|
|Too small（过小）|缺少必要上下文|语义不完整，匹配能力减弱|
|Just right（适中）|保留回答问题所需的信息|兼顾相关性与信息充分性|

Useful evidence contains enough information to answer the question without large amounts of unrelated material\.

分块质量的核心标准是有效证据应包含足以回答问题的信息，同时避免大量无关内容。

因此，最佳分块大小并非固定值，而取决于文档结构、查询需求和模型输入限制。

#### 2\.1\.3 主要分块方法

1. 固定长度分块（Fixed\-size Chunking）

按照预设字符数划分文档，不考虑文本语义或结构。假设每块包含 $C=250$ 个字符，且没有重叠，则第 $k$ 个块的字符范围为：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjQzZjFiOTMyMDU2YzdmYjk5YTUyNDYxODRlNWZjZDZfYTMwNDQ0NjkxZjFlYzNmYjkyMGY1Y2ZhNjZhNDQ2NTlfSUQ6NzY5ODM4NjIwMDkzNTI1NTU4OF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

其中，$N$ 表示文档总字符数。

优点：实现简单、计算成本低、块大小可预测，适合作为分块策略的基线。

缺点：切分位置可能位于句子或概念内部，破坏语义完整性。

2. 重叠分块（Overlapping Chunking）

在固定长度分块的基础上，使相邻文本块共享部分内容，以减少边界处的上下文损失。设：

- $C$：Chunk Size，块长度。

- $O$：Overlap Size，重叠长度。

- $S$：Stride，分块步长。

三者关系为：

$ S=C-O $

重叠比例为：

$r=\frac{O}{C} $

课件采用：

$C=250,\quad O=25 $

因此：

$S=250-25=225$

$r=\frac{25}{250}=10\% $

|**Chunk**|**字符范围**|**与前一块的重叠**|
|---|---|---|
|Chunk 1|1–250|无|
|Chunk 2|226–475|226–250|
|Chunk 3|451–700|451–475|

对于从 1 开始计数的字符位置，第 $k$ 个块的起点为：

${Start}_k=1+(k-1)(C-O) $

重叠分块能够保留边界附近的上下文，但也增加了向量数量、存储成本及检索结果的冗余。

忽略最后一个不足整块的片段，对于较长文档，重叠引起的存储量放大比例近似为：

$Storage Factor\approx\frac{C}{C-O} $

在课件示例中：

$\frac{250}{225}\approx1.111$

即相较于不重叠分块，存储的文本量约增加 $11.1\%$。

3. 递归字符切分（Recursive Character Splitting）

递归字符切分优先利用文档的自然结构划分文本，而不是直接按照固定字符位置截断。

典型的分隔符优先级可以表示为：

$\text{Paragraph} \rightarrow\text{Line} \rightarrow\text{Sentence} \rightarrow\text{Character}$

处理过程是先使用较高层级的分隔符；如果某个片段仍超过长度限制，再使用更细粒度的分隔符继续切分。

主要特点：

- 尽可能保留段落和句子的完整性。

- 不同文本块的长度可以不同。

- 相较于固定长度分块，更符合文档的自然结构。

4. 结构感知分块（Structure\-aware Chunking）

对于具有明确结构的文档，应优先利用其原有结构信息确定分块边界。

|**文档类型**|**分块依据**|
|---|---|
|HTML|标题标签、段落标签，如 \<h1\>、\<p\>|
|Python|函数定义、类结构|
|Markdown|标题层级、段落结构|
|普通文本|换行、段落或递归字符分隔符|

例如，Python 代码按函数定义进行分块，可以保留函数签名、参数和实现逻辑之间的联系，避免将一个完整函数切割成无法独立理解的片段。

关键原则：分块应尽可能遵循文档已有的结构边界。

#### 2\.1\.4 分块边界与语义完整性

Chunk Boundaries Can Change Meaning 分块不仅影响检索精度，还可能改变文本的原始含义。

That night she dreamed, as she did often, that she was finally an Olympic champion\.

原句表达的是“她梦见自己成为奥运冠军”，并非真实发生的事件。

如果分块后仅保留：She was finally an Olympic champion\. 则可能被误解为已经发生的事实。

相反，保留：She dreamed \.\.\. She was finally an Olympic champion\. 可以维持原始语义。

因此，分块应尽量保留影响事实判断的限定信息，例如时间、否定、条件、假设以及主语与谓语之间的关系。

这一问题也是引入语义分块与 LLM 分块的重要原因。

#### 2\.1\.5 语义分块（Semantic Chunking）

语义分块根据相邻文本的语义相似程度确定边界，而非使用固定字符长度。其基本流程为：

1. 将当前文本块与下一句分别编码为向量。

2. 计算二者的语义距离。

3. 根据预设阈值判断是否合并。

4. 逐句重复，直至处理完整篇文档。

课件使用 Cosine Distance（余弦距离） 作为判定依据。

首先计算余弦相似度：

$\operatorname{sim}(\mathbf a,\mathbf b) = \frac{\mathbf a\cdot\mathbf b} {\|\mathbf a\|\|\mathbf b\|} $

再定义余弦距离：

$d_{\cos}(\mathbf a,\mathbf b) = 1-\operatorname{sim}(\mathbf a,\mathbf b) $

其中：

- $\mathbf a$：当前 Chunk 的语义向量。

- $\mathbf b$：下一句的语义向量。

- $\tau$：预设距离阈值。

简化判定规则为：

$\begin{cases} d_{\cos}(\mathbf a,\mathbf b)<\tau &\Rightarrow \text{Add to current chunk}\\[4pt] d_{\cos}(\mathbf a,\mathbf b)\geq\tau &\Rightarrow \text{Start new chunk} \end{cases} $

即：

- 距离低于阈值：语义相近，合并。

- 距离达到或超过阈值：语义差异较大，创建新块。

注意这里使用的是 Distance，不是 Similarity，因此数值越小表示语义越接近。

以加拿大的枫糖浆、山脉与自然景观为例，说明语义分块可以将相关句子组织在一起，不必按照固定字符位置截断。

优点：能够保留相关语义，减少不合理的文本边界。

缺点：需要额外的 Embedding 和 Similarity/Distance Computation，增加预处理时间与计算成本。

**Evaluate whether better retrieval justifies the extra computation\.**

因此，语义分块是否值得采用，应根据实际检索质量提升与计算成本进行评估。

#### 2\.1\.6 基于 LLM 的分块 LLM\-based Chunking

LLM\-based Chunking 直接利用语言模型理解文档内容，并按照指定规则生成文本块。

与语义分块依赖向量距离不同，LLM 可以根据自然语言指令识别概念、主题转换和内容之间的逻辑关系。

典型指令包括：

- 将同一概念的相关内容保留在同一块中。

- 当文档开始讨论新主题时，创建新块。

- 尽量保留每个片段的语义完整性。

处理流程为：

$\text{Document} \xrightarrow{\text{LLM}} \{C_1,C_2,\ldots,C_n\} $

其中 $C_i$ 表示模型生成的第 $i$ 个文本块。这种方法能够进行更复杂的语义判断，但需要额外的 LLM 推理成本。

上下文感知增强（Context\-aware Enrichment）

除了决定分块边界，LLM 还可以为已有的 Chunk 生成简短的上下文描述。

课件示例：

|**Original Fragment**|**Added Context**|
|---|---|
|Reflections on Launching Our First App|App\-launch title|
|After six months \.\.\. We launched our first app|Launch announcement|
|The biggest lessons were around user feedback|Lessons learned|
|Thanks to Daniel Townsend|Contributors|

其核心思想是：为缺乏上下文的文本片段补充必要的主题或角色信息，使其在检索时更容易被正确理解。

例如，一个只包含人名的致谢片段，如果缺乏文档背景，可能难以匹配“项目贡献者”相关查询。增加 Contributors 标签后，可以改善其语义表达。

上下文增强不要求必须采用 LLM 分块，也可以与固定长度、递归或语义分块结合使用。

成本发生在哪个阶段？

|**阶段**|**操作**|**成本特点**|
|---|---|---|
|Before queries arrive|LLM 为 Chunk 添加上下文，并建立索引|增加离线预处理成本|
|When a query arrives|检索增强后的 Chunk，再生成答案|不需要为添加 Chunk 上下文额外调用 LLM|

因此，上下文增强的主要成本发生在索引构建阶段，而不是每次查询时。

需要注意，这并不代表整个 RAG 查询过程没有 LLM 调用；生成最终答案仍然可能需要调用 LLM。

#### 2\.1\.7 分块策略的综合比较

|**方法**|**切分依据**|**主要优势**|**主要局限**|
|---|---|---|---|
|Fixed\-size|字符数量|简单、高效、适合作为基线|容易破坏语义|
|Overlapping|固定长度 \+ 重叠区域|减少边界信息丢失|增加存储与冗余|
|Recursive|自然分隔符|较好保留文本结构|块长度不一致|
|Structure\-aware|文档结构标记|保留逻辑结构|依赖文档格式|
|Semantic|向量语义距离|保留相关主题|额外 Embedding 成本|
|LLM\-based|模型语义理解|更灵活的概念划分|推理成本与复杂度较高|

选型建议：先建立简单基线，再根据检索效果决定是否引入更复杂的方法。

固定长度分块适合作为初始方案；语义分块和 LLM 分块可能改善效果，但应通过实验验证收益。上下文增强则可以与不同分块策略结合使用。

### 2\.2 查询改写 Query Rewriting

分块优化的是文档侧，而查询改写优化的是用户输入侧。

其目标是将不明确、冗余或不适合检索的自然语言输入转化为更清晰的查询，同时保留用户的原始意图。

#### 2\.2\.1 查询改写的必要性

用户在对话中经常使用省略、指代或非正式表达。

课件示例：Hey, can you tell me about that climate thing we talked about?

that climate thing 缺少明确的主题信息。如果检索器无法获取之前的对话内容，就难以确定用户实际需要检索什么。

因此，Query Rewriting 需要利用已有对话上下文补全指代；如果上下文仍不足，则应要求用户澄清，而不是自行猜测主题。

#### 2\.2\.2 查询改写的主要操作

课件以医学文档检索为例。

原始查询：My dog yanked hard on the leash\. Three days later, my shoulder is still numb and my fingers are all pins and needles\.

改写后：Sudden shoulder traction; shoulder numbness and finger tingling for three days\. Potential causes?

改写过程主要包括四项操作：

|**操作**|**英文术语**|**目的**|
|---|---|---|
|消除歧义|Clarify ambiguous phrases|明确指代和模糊表达|
|术语规范化|Use domain terminology|使查询与专业文档用语一致|
|同义词扩展|Add synonyms|增加不同表述之间的匹配机会|
|删除冗余信息|Remove distracting information|减少无关信息对检索的干扰|

在示例中，pins and needles 被规范化为 finger tingling，同时保留了症状持续三天这一重要信息。

查询改写的关键约束是：Preserve the user's meaning（保留用户原意）。

改写可以改变表达方式，但不应添加未经用户提供或上下文支持的事实，也不能改变用户真正想要解决的问题。

#### 2\.2\.3 查询改写的工作流程

$Q_{\text{original}} \xrightarrow{\text{Query Rewriter (LLM)}} Q_{\text{optimized}} \xrightarrow{\text{Retriever}} D_{\text{relevant}}$

其中：

- $Q_{\text{original}}$：用户原始查询。

- $Q_{\text{optimized}}$：改写后的检索查询。

- $D_{\text{relevant}}$：检索到的相关文档。

查询改写发生在检索之前，属于在线处理阶段。

### 2\.2\.4 收益与代价

|**Potential Benefits**|**Trade\-offs**|
|---|---|
|Clearer queries：查询表达更清晰|Extra LLM latency and cost：增加调用延迟与费用|
|Better retrieval relevance：提高检索相关性|Risk of changing user intent：可能偏离用户原意|

查询改写特别适用于对话式检索、指代较多的输入以及口语表达与专业文档用词差异较大的场景。

对于已经明确、简洁且包含准确术语的查询，额外改写不一定带来明显收益。

因此，是否启用 Query Rewriting 同样需要考虑检索质量与额外在线成本之间的权衡。

### 2\.3 检索编码器 Retrieval Encoders

检索编码器决定查询与文档如何被表示和比较。

三种主要架构：Bi\-encoder、Cross\-encoder 和 ColBERT。

三者的区别在于编码方式、交互粒度以及计算与存储成本。

#### 2\.3\.1 双编码器 Bi\-encoder 

Bi\-encoder 将 Query 和 Document 分别编码为独立的语义向量。

$\mathbf q=E_q(Q) $

$\mathbf d_i=E_d(D_i)$

其中，$E_q$ 与 $E_d$ 分别表示查询编码器和文档编码器，两者可以共享权重。

随后，通过向量相似度计算相关性：

$s(Q,D_i)= \frac{\mathbf q\cdot\mathbf d_i} {\|\mathbf q\|\|\mathbf d_i\|} $

对于大规模知识库，通常使用 ANN（Approximate Nearest Neighbor）快速搜索相近向量。

**关键特点 **

Precomputed Document Vectors（文档向量预计算）：文档可以在查询到来之前完成编码，并存储在向量数据库中。

因此：

- Offline：编码全部文档并建立索引。

- Online：仅编码新查询，再执行 ANN 搜索。

这种机制避免了每次查询都重新处理全部文档，具有较高的检索速度和可扩展性。

但由于 Query 与 Document 独立编码，模型在编码过程中无法直接建立两者之间的细粒度 Token 交互。

适用场景：大规模语义检索和第一阶段候选文档召回。

#### 2\.3\.2 交叉编码器（Cross\-encoder）

Cross\-encoder 将 Query 与 Document 拼接后共同输入模型，直接生成相关性分数。

$s(Q,D_i)=f_{\text{cross}}(Q,D_i)$

与 Bi\-encoder 不同，Cross\-encoder 可以在编码过程中建模查询与文档之间的上下文交互。

课件示例：Query：Great places to eat in New York

|**Document**|**Relevance Score**|
|---|---|
|Manhattan restaurants|0\.7|
|New York subway|0\.12|
|Brooklyn food scene|0\.85|

因此，排序结果为：$D_{\text{Brooklyn}} > D_{\text{Manhattan}} > D_{\text{Subway}} $

Cross\-encoder 能够结合查询意图与文档语义进行更细致的相关性判断，而不只是匹配共同出现的词语。

优势

- 能直接建模 Query–Document 的上下文交互。

- 通常可以提供比 Bi\-encoder 更精细的相关性评分。

- 适合对初步检索结果进行重新排序。

局限

Cross\-encoder 必须针对每一个 Query–Document Pair 单独计算分数。

若候选文档数量为 $N$，则一次查询需要进行：$N_{\text{pair evaluations}}=N$次模型评分。

此外，相关性分数依赖当前 Query，因此不能像 Bi\-encoder 的文档向量一样提前独立计算。

当文档规模达到百万级或十亿级时，直接使用 Cross\-encoder 对全部文档评分通常成本过高。

适用场景：对较小候选集进行 Reranking（重排序），而非大规模初始检索。

#### 2\.3\.3 ColBERT：Token\-level Matching

ColBERT 采用 Late Interaction（后期交互）机制，在 Bi\-encoder 的独立编码与 Cross\-encoder 的联合交互之间取得平衡。核心思想是：分别编码 Query 和 Document，但保留每个 Token 的向量，而不是将整个文本压缩成单一向量。

假设查询包含 $m$ 个 Token，文档包含 $n$ 个 Token，则：

$Q=\{\mathbf q_1,\mathbf q_2,\ldots,\mathbf q_m\} $

$D=\{\mathbf d_1,\mathbf d_2,\ldots,\mathbf d_n\} $

其中：

- $\mathbf q_i$：查询中第 $i$ 个 Token 的上下文向量。

- $\mathbf d_j$：文档中第 $j$ 个 Token 的上下文向量。

与 Bi\-encoder 每个文档只生成一个向量不同，ColBERT 为文档中的多个 Token 分别生成向量。

#### 2\.3\.4 Token 相似度矩阵

ColBERT 首先计算每个 Query Token 与各个 Document Token 的相似度。

$S_{ij}=\operatorname{sim}(\mathbf q_i,\mathbf d_j)$

如果采用点积作为相似度函数：

$ S_{ij}=\mathbf q_i^\top\mathbf d_j $

对于已归一化的向量，点积等价于余弦相似度。

所有 Token 两两比较后形成相似度矩阵：

$\mathbf S= \begin{bmatrix} S_{11}&S_{12}&\cdots&S_{1n}\\ S_{21}&S_{22}&\cdots&S_{2n}\\ \vdots&\vdots&\ddots&\vdots\\ S_{m1}&S_{m2}&\cdots&S_{mn} \end{bmatrix}$

矩阵维度为：$\mathbf S\in\mathbb R^{m\times n} $。每一行对应一个 Query Token，每一列对应一个 Document Token。

例如，查询中的 eat 可能与文档中的 cuisine 具有较高的语义相似度，即使二者并非相同单词。

这使 ColBERT 能够捕获比整篇文档向量更细粒度的语义匹配关系。

#### 2\.3\.5 MaxSim Scoring

MaxSim 是 ColBERT 的核心评分机制。对于每一个 Query Token，找到与其最相似的 Document Token，并将这些最大相似度相加。

其公式为：

${ \operatorname{MaxSim}(Q,D) = \sum_{i=1}^{m} \max_{1\leq j\leq n} \operatorname{sim}(\mathbf q_i,\mathbf d_j) }$

如果使用点积：

$\operatorname{MaxSim}(Q,D) = \sum_{i=1}^{m} \max_{1\leq j\leq n} \mathbf q_i^\top\mathbf d_j $

公式包含两个运算：

1. Max：对每个 Query Token，在所有 Document Token 中寻找最佳匹配。

2. Sum：将所有 Query Token 的最佳匹配分数相加，得到文档总分。

课件示例中，各查询 Token 的最大相似度为：

|**Query Token**|**最大相似度**|
|---|---|
|Great|0\.3|
|places|0\.3|
|to|0\.2|
|eat|0\.7|
|in|0\.3|
|New|0\.8|
|York|0\.8|

因此，Token 相似度列的求和结果：

$\begin{aligned} \operatorname{MaxSim}(Q,D) &=0.3+0.3+0.2+0.7={3.4} \end{aligned} $

需要注意：MaxSim 分数不是概率，也不要求落在 $[0,1]$ 区间内。 它是多个 Token 匹配分数的累加结果。

#### 2\.3\.6 ColBERT 的存储与性能权衡

Bi\-encoder 通常为每篇文档存储一个向量：$ D_i\rightarrow\mathbf d_i $

ColBERT 则为文档中的多个 Token 存储向量：$D_i\rightarrow \{\mathbf d_{i1},\mathbf d_{i2},\ldots,\mathbf d_{in}\}$

因此，ColBERT 需要更大的向量存储空间。

|**Pros**|**Cons**|
|---|---|
|结合独立编码的可扩展性与 Token 级交互|需要存储大量 Token 向量|
|支持较细粒度的语义匹配|索引体积和存储成本较高|
|可用于实时或近实时检索|评分过程比单向量相似度更复杂|

ColBERT 的优势在于：文档 Token 向量可以预计算，同时保留查询到来后进行细粒度匹配的能力。

因此，它在检索质量、速度和存储之间提供了一种折中方案。

### 2\.4 三种检索编码器的综合比较

|**比较维度**|**Bi\-encoder**|**Cross\-encoder**|**ColBERT**|
|---|---|---|---|
|编码方式|Query 与 Document 分别编码|Query 与 Document 联合编码|分别编码，保留 Token 向量|
|表示粒度|文档级向量|Query–Document Pair|Token 级向量|
|评分方法|向量相似度|模型直接预测相关性|MaxSim|
|交互机制|独立编码后比较|编码过程中交互|编码后 Token 级交互|
|检索质量|较好|通常较高|通常接近 Cross\-encoder|
|检索速度|快|慢|中等|
|向量存储需求|较低|较低|较高|
|文档预计算|支持|无法预计算查询相关分数|支持|
|典型用途|大规模初始检索|候选结果重排序|细粒度语义检索|

三种架构的本质区别

Bi\-encoder：整体向量匹配

$s_{\text{bi}}(Q,D) = \operatorname{sim}(E_q(Q),E_d(D))$

Cross\-encoder：联合编码评分 

$s_{\text{cross}}(Q,D) = f_{\text{cross}}(Q,D) $

ColBERT：Token 级最大相似度求和

$s_{\text{ColBERT}}(Q,D) = \sum_{i=1}^{m} \max_{j} \operatorname{sim}(\mathbf q_i,\mathbf d_j)$

三种方法分别代表不同的检索设计取向：

- Bi\-encoder 优先考虑检索效率和可扩展性。

- Cross\-encoder 优先考虑精细的相关性判断。

- ColBERT 在保留文档预计算能力的同时，引入 Token 级交互以改善匹配质量。

### 2\.5 本章总结

本部分的知识点可以归纳为三个相互衔接的层次。

|**层次**|**核心问题**|**主要技术**|**优化目标**|
|---|---|---|---|
|Document Processing|文档应如何组织？|Fixed\-size、Overlap、Recursive、Semantic、LLM Chunking|语义完整性与证据相关性|
|Query Processing|用户查询应如何表达？|Query Rewriting|消除歧义、规范术语、保留用户意图|
|Retrieval Matching|如何判断查询与文档是否相关？|Bi\-encoder、Cross\-encoder、ColBERT|匹配质量、速度与存储成本|

完整流程可以概括为：

$\text{Documents} \xrightarrow{\text{Chunking}} \text{Chunks} \xrightarrow{\text{Encoding}} \text{Index}$

查询阶段：

$\text{User Query} \xrightarrow{\text{Query Rewriting}} \text{Optimized Query} \xrightarrow{\text{Retrieval}} \text{Relevant Chunks} $

最终：

$\text{Relevant Chunks}+\text{Query} \xrightarrow{\text{LLM}} \text{Answer} $

本部分的核心结论是：RAG 检索质量不仅取决于搜索算法，还取决于检索单元的设计、查询表达的质量，以及编码器对语义相关性的建模能力。

在实际系统中，应以简单且可扩展的方案建立基线，再通过实验判断语义分块、查询改写和更复杂的编码架构是否带来足以抵消额外成本的性能提升。

## Part 3 Advanced RAG Architectures 进阶 RAG 架构

从优化单一检索模块，扩展到优化 RAG 系统的知识表示、检索决策、生成质量与整体工作流。

传统 RAG 通常采用固定的 Retrieve → Generate（检索 → 生成） 流程，但存在三个主要问题：

- 知识表示受限：传统文本 RAG 难以充分处理图像、图表和复杂 PDF 版式。

- 检索与生成缺乏自我判断：系统可能执行不必要的检索，使用不相关的证据，或生成缺乏证据支持的答案。

- 控制流程缺乏灵活性：固定的线性流程难以处理需要条件分支、反复修正或多任务并行的复杂问题。

因此，本章围绕三个方向展开：

|**方向**|**核心技术**|**主要解决的问题**|
|---|---|---|
|Multimodal and PDF RAG|多模态嵌入、视觉 Patch 检索|如何检索非纯文本知识|
|Self\-RAG|Reflection Tokens、自适应检索与自我批判|何时检索、证据是否相关、生成是否有依据|
|Agentic RAG Workflows|Routing、Evaluation、Iteration、Parallelism|如何组织复杂的检索与生成任务|

### 3\.1 Multimodal and PDF RAG 多模态与 PDF RAG

#### 3\.1\.1 Multimodal RAG：多模态检索增强生成

传统 RAG 主要针对文本进行检索，而实际知识库可能同时包含文本（Text）、图像（Images），以及音频（Audio）和视频（Video）；多模态 RAG（Multimodal RAG）通过多模态嵌入模型（Multimodal Embedding Model），使不同模态的信息能够在统一的语义空间中表示与检索。

核心要求：Match the retriever and generator to the modalities you use\.

即检索器（Retriever）和生成器（Generator）都必须支持系统所使用的模态。

- Retriever：能够处理相应模态并检索相关内容。

- Generator：能够理解检索返回的多模态信息，并据此生成回答。

例如，即使检索器成功找到了相关图像，如果生成模型无法理解图像内容，系统仍然无法充分利用这部分证据。

#### 3\.1\.2 Multimodal Embedding Model：共享嵌入空间

多模态嵌入模型的关键是将文本和图像映射到 Shared Embedding Space（共享嵌入空间）。

对于文本 $t$ 和图像 $I$，分别进行编码：

$\mathbf{e}_t=f_{\text{text}}(t)$

$\mathbf{e}_I=f_{\text{image}}(I) $

其中：

- $f_{\text{text}}$：文本编码函数。

- $f_{\text{image}}$：图像编码函数。

- $\mathbf{e}_t,\mathbf{e}_I$：处于共享向量空间中的表示。

共享空间的目标是使语义相近的内容具有相近的向量表示，而不受原始模态限制。

例如，课件展示了两个语义聚类：

|**语义类别**|**输入示例**|**向量空间中的关系**|
|---|---|---|
|Dogs|“dog”“puppy”、狗的图像|语义相近，聚集在同一区域|
|Trees|“tree”、树的图像|聚集在另一区域|

因此，文本查询可以检索图像，图像查询也可以检索相关文本。

跨模态相似度可用余弦相似度表示：

$\operatorname{sim}(t,I) = \frac{\mathbf{e}_t^\top\mathbf{e}_I} {\|\mathbf{e}_t\|\|\mathbf{e}_I\|}$

该公式是对共享向量空间检索原理的数学表达，课件本页没有单独给出此公式。

#### 3\.1\.3 Multimodal Vector Retrieval：多模态向量检索

多模态向量检索同时处理知识库内容和用户查询，多模态查询与知识库通过共享向量空间实现语义匹配

完整流程可以概括为：

1. 将多模态知识库中的文本、图像编码为向量。

2. 使用兼容的多模态编码模型处理用户查询。

3. 在共享向量空间中进行相似度匹配，返回相关内容。

4. 将检索结果提供给支持相应模态的生成模型。

与传统 RAG 的根本区别：传统文本 RAG 主要比较文本语义，多模态 RAG 则能够进行跨模态语义匹配。

#### 3\.1\.4 PDF RAG：基于视觉 Patch 的文档检索

PDF 和 Slides（幻灯片）通常具有较高的信息密度，可能同时包含：Text：正文文本、Captions：图注、Charts：图表、Images：图像。

传统方法依赖复杂的文档检测和版面解析算法（Sophisticated Detection Algorithms）

PDF RAG 采用 将PDF 页面切分为视觉 Patch 后分别向量化 \(Split into patches, then vectorize\)

主要优势：保留原始文档的视觉内容（Preserve Visual Content），包括文字、图形及版式信息，减少仅依赖文本提取造成的信息损失。

**PDF RAG 与 ColBERT 的联系**

Each prompt token finds the most similar patch in a document, and the maximum similarity scores are summed\.

PDF RAG 的评分方式与 ColBERT 相似：设查询包含 $m$ 个 Token，文档被切分为 $n$ 个视觉 Patch：

$ Q=\{\mathbf q_1,\ldots,\mathbf q_m\} $ $D=\{\mathbf p_1,\ldots,\mathbf p_n\}$

则其 MaxSim 风格的相关性评分可表示为：

${ S(Q,D)= \sum_{i=1}^{m} \max_{1\le j\le n} \operatorname{sim}(\mathbf q_i,\mathbf p_j) }$

其中：

- $\mathbf q_i$：第 $i$ 个查询 Token 的向量。

- $\mathbf p_j$：第 $j$ 个文档 Patch 的向量。

- $\max$：为每个查询 Token 选取最相似的 Patch。

- $\sum$：汇总所有查询 Token 的最大相似度。

|**比较维度**|**ColBERT**|**PDF RAG**|
|---|---|---|
|文档表示|多个 Token 向量|多个视觉 Patch 向量|
|匹配方式|Query Token 对 Document Token|Query Token 对 Document Patch|
|评分机制|MaxSim \+ Sum|MaxSim \+ Sum|
|主要特点|细粒度文本匹配|保留文档视觉细节|

PDF RAG 的代价

一份文档需要存储多个 Patch 向量，因此会带来：

- Larger Vector Index：向量数量增加，索引和存储成本上升。

- Higher Matching Cost：需要比较更多向量，增加检索计算开销。

因此，PDF RAG 需要在视觉信息保留、检索质量、存储成本和匹配成本之间进行权衡。

### 3\.2 Self\-RAG：Retrieval and Self\-Critique 检索与自我批判

#### 3\.2\.1 Simple RAG 的有效性与局限

在介绍 Self\-RAG 前，需要明确传统 RAG 的优势及其不足。

1. Effectiveness of Simple RAG

不同知识流行度下检索增强的准确率趋势，研究展示的主要趋势是：

- Rare（冷门知识）：检索带来的准确率提升最大。

- Neutral（中等流行度知识）：检索仍然具有明显收益。

- Popular（热门知识）：检索收益可能较小，甚至出现负面影响。

原因：语言模型对常见知识通常具有较充分的参数化记忆（Parametric Memory），而冷门知识更依赖外部的非参数化记忆（Non\-parametric Memory）。

结论：Retrieval improves accuracy most on rare questions in this study\.

需要注意，这是课件引用研究中的实验结论，并不意味着检索对所有冷门问题都一定有效。

2. Limitations of Simple RAG

传统 RAG 主要存在以下四类局限：

|**局限**|**含义**|**影响**|
|---|---|---|
|Unnecessary Retrieval|对无需外部知识的问题仍执行检索|增加不必要的计算成本|
|Unhelpful Context|检索结果不相关或具有误导性|模型可能被错误上下文干扰|
|Unsupported Citations|引用来源不一定支持生成的结论|降低答案的可验证性|
|Increased Latency|检索内容增加输入上下文长度|增加编码和推理延迟|

说明无效检索的危害的典型案例

User Query: Who is Sam Altman?

Retrieved Context: Samuel Adams \(Sam Adams\) was an American statesman, political philosopher and a founding father of the U\.S\.

Incorrect Response: He was a U\.S\. founding father\.

错误产生的原因是检索结果中的 Samuel Adams 与查询对象 Sam Altman 不一致，而生成模型没有识别这种不相关性，直接采纳了错误证据。

这一案例说明：检索结果并不必然提高答案质量；检索相关性与证据支持性必须得到验证。

#### 3\.2\.2 Self\-RAG 的核心机制: Reflection Tokens 

传统 RAG 通常使用固定的两阶段流程：

$\text{Input}\rightarrow\text{Retrieve}\rightarrow\text{Generate} $

Self\-RAG（Self\-Reflective Retrieval\-Augmented Generation）引入可学习的反思 Token（Learned Reflection Tokens），使模型能够在检索和生成过程中进行自主判断。

三个判断：

|**Reflection Token**|**核心问题**|**判断阶段**|**作用**|
|---|---|---|---|
|Retrieve?|Is retrieval needed?|检索之前|判断是否需要外部知识|
|Relevant?|Are documents relevant?|检索之后|判断检索证据是否相关|
|Supported?|Is generation supported?|生成之后|判断生成内容是否受到证据支持|

这三个判断分别对应：

1. Retrieval Decision：是否检索。

2. Evidence Relevance：证据是否相关。

3. Generation Grounding：生成内容是否有依据。

与固定检索流程相比，Self\-RAG 的关键变化是将检索与证据评估纳入模型学习的决策过程。

#### 3\.2\.3 Self\-RAG Control Flow：自适应检索与生成

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTFhN2YyODUzYzJhOGU2M2Y2ZGNlNTExYTE0Y2E0MWFfYjZlMmVkOWNlOTBmMzM2NGM5OTM2YTBiZDkyZmU0ZTVfSUQ6NzY5ODM4NjIwMTI3OTEyMjk4MV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

这三个判断共同构成 Self\-RAG 的自适应检索与自我批判机制：

**第一阶段：检索需求判断**

模型根据问题决定是否检索。如果已有知识足以回答，则可以直接生成；否则调用检索器获取外部证据。

**第二阶段：证据相关性判断**

检索完成后，模型评估返回文档是否与问题相关，避免将无关内容直接纳入生成过程。

**第三阶段：生成支持度判断**

生成答案后，模型评估回答中的陈述是否得到检索证据支持。

#### 3\.2\.4 Relevance vs\. Support：相关性与支持度

Self\-RAG 不仅关注检索到的内容是否相关，还关注生成的具体陈述是否得到证据支持。

两者的区别是：

- Relevance：内容是否与用户问题相关。

- Support：检索证据是否足以支持生成的陈述？

相关内容不一定能充分支持生成的结论。

课件案例: Scientific Literature Synthesis

用户请求: Suggest papers showing how LLMs help scientists synthesize scientific literature\.

模型检索到以下两类证据：

- OpenScholar is a retrieval\-augmented LM designed to synthesize literature\.

- GPT\-4o has been shown to generate new research ideas\.

在此基础上，模型生成不同陈述并评估其支持程度。

|**Generated Statement**|**Relevance**|**Support**|
|---|---|---|
|OpenScholar is an LM for literature synthesis\.|Relevant|Fully supported|
|Studies show GPT\-4o can help scientists with idea generation and literature synthesis\.|Relevant|Partially supported|

第一条陈述与检索证据一致，因此被评为 Fully supported。

第二条陈述虽然与科研任务相关，但证据仅支持 GPT\-4o 能够帮助产生研究想法，并未充分证明其具有文献综合能力，因此被评为 Partially supported。

两个支持度评分（用于体现候选陈述的证据支持程度）：

OpenScholar 陈述：0\.9 Fully supported

GPT\-4o 陈述：0\.5 Partially supported

**Self\-RAG 的关键意义**：将检索需求、证据相关性和生成支持性转化为模型可学习、可评估的判断，从而提高答案的可靠性。

### 3\.3 Agentic RAG Workflows 智能体 RAG 工作流

#### 3\.3\.1 From LLM to Agent System：从单模型到智能体系统

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmQ2Yjc0ZmE3MDEzMzUwMTFiMDE1MmFlNmExMDZmNTJfZGI3MTVlNzM1OGRkYTFlMTI2N2RkODQ0ODg5MWE1MjZfSUQ6NzY5ODM4NjIwMDkzNTIzOTIwNF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

传统单模型调用通常采用：

$
\text{Prompt}\rightarrow\text{LLM}\rightarrow\text{Response} $

这种结构适合相对简单的任务，但对于需要规划、检索、评估和多步骤处理的复杂任务，单次调用可能难以完成全部工作。而Agent System（智能体系统）通过将复杂任务分解为一系列步骤与决策，并结合外部工具完成任务。

课件展示了三类典型子任务：

- Planning LLM：规划任务步骤。

- Research LLM：执行信息检索和研究。

- Writing LLM：整合信息并生成最终回答。

智能体系统可以访问外部工具，包括代码工具、数据库和互联网资源。

其主要特点是 a series of steps and decisions（由多个步骤和决策组成），而不是依赖单次模型调用。

#### 3\.3\.2 Example Agentic RAG System

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MTY5Y2QyYjUyOTUwNWY2MjA3NGRlMjJlYmYyZGUwZTVfMDYyMzQ0ZTU3ODliZDNlZTFhM2MxODViYTA2YjVjMzFfSUQ6NzY5ODM4NjIwMTI3OTE1NTc0OV8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

Agentic RAG：路由、证据评估、重新检索与回答生成

完整逻辑为：

1. Router LLM 判断问题是否需要检索。

2. 如果不需要检索，直接生成回答。

3. 如果需要检索，则执行 Retrieve。

4. Evaluate Evidence 判断当前证据是否充分。

5. 如果证据不足，返回检索阶段再次检索；如果充分，则生成带引用的回答（Generate \+ Cite）。

6. 输出最终 Response。

这个系统同时包含条件分支与迭代机制，说明 Agentic RAG 并不局限于单一工作流模式。

#### 3\.3\.3 Agentic Systems as Flowcharts：流程图式系统设计

智能体系统可以表示为流程图（Flowchart），由不同的节点和连接关系组成。每个 LLM 节点完成一个特定任务，并将输出传递给下一节点。

Different LLMs for different tasks\. 不同任务可以采用不同规模和能力的模型：

|**任务**|**推荐模型类型**|**设计目的**|
|---|---|---|
|Routing|Lightweight Models|低成本完成路径选择|
|Evaluation|Lightweight Models|高效判断结果质量|
|Response Generation|Larger Models|提高最终回答质量|
|Citations|Specialized Models|处理引用与证据对应关系|

因此，Agentic RAG 的设计不仅涉及模型能力，还包括任务分解、模型分配、流程控制和外部工具调用。

#### 3\.3\.4 Four Workflow Patterns：四种典型工作流

四种基本工作流：

1. Sequential Workflow：顺序工作流

信息按照固定顺序依次经过多个 LLM 调用，前一步的输出成为后一步的输入。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjM0YzQ0YmJhYTg5MWM5YTg5NmNmOTc1MTZhMDdhYzdfNjViMzQ0YmE0NTYyNTNmYTI1YzI0NDEwODk0OTM1M2FfSUQ6NzY5ODM4NjIwMTYxMDc1MTUyNl8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

示例为 Q\&A Chatbot：

$\text{Parse} \rightarrow\text{Rewrite} \rightarrow\text{Retrieve} \rightarrow\text{Generate with Citations} $

特点：结构简单、执行顺序明确，适用于步骤固定且存在前后依赖关系的任务。

其局限是缺少动态决策和自动回退机制，前一阶段的错误可能传递至后续阶段。

2. Conditional Workflow：条件工作流

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDRhMjYzOTg1MzI1YTQ3OWUyMWNhMjBmNGEyZjc5ZGZfNjhhOWYxOGNiMGMwOWRmMjNkNWEzYzRhYmIyYThjZDhfSUQ6NzY5ODM4NjIwMTYxMDcxODc1OF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

条件工作流通过 Router 判断输入应进入哪条处理路径。

例如：

- Knowledge needed：先检索外部知识，再生成回答。

- No retrieval needed：跳过检索，直接回答。

特点：根据输入动态选择执行路径，可以减少不必要的检索开销，并降低无关上下文带来的干扰。

其主要风险是 Router 的判断错误可能导致系统选择不合适的处理路径。

3. Iterative Workflow：迭代工作流

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDlkYmRkMTRhY2E4ODViZDBmNmE4MWI1MDM2YWM4MzdfYzNhYWU3NjQzMDc5YTJiNmFhYjE5ZjhkZjc1NzViNmFfSUQ6NzY5ODM4NjIwMTYxMDQ1NjYxNF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

迭代工作流允许系统根据评估结果返回之前的步骤，重新执行任务。

课件使用 AI Coding 作为示例：

$\text{Generate Code} \rightarrow\text{Run Tests} \rightarrow\text{Identify Errors} \rightarrow\text{Revise Code} \rightarrow\text{Test Again} $

系统包含两个主要角色：

- Writer：生成候选结果。

- Evaluator：评估结果并提供 Feedback。

当评估未通过时，Feedback 返回 Writer，触发下一轮修改。

终止条件：

$\text{Stop}= \begin{cases} \text{Accepted}, & \text{结果满足要求}\\ \text{Iteration Limit}, & \text{达到最大迭代次数} \end{cases} $

设置最大迭代次数 $N$ 可以避免无限循环。

特点：适用于需要多轮验证和改进的任务，例如代码生成、答案修订和证据补充。

4. Parallel Workflow：并行工作流

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmVhYzg1OTk4MDQwODZmMDZkYTIxMjUzZjAzNGRmMWVfYjUyYTk0MDI0YTg0YTFmYWM5ZjUxMGNlNjA3MDFiNTFfSUQ6NzY5ODM4NjIwMjQ2NjMwNzYyMF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

并行工作流将任务分解为多个相互独立的子任务，同时执行，再将结果整合为最终回答。

核心组件包括：

- Orchestrator：拆分任务并协调执行。

- LLM Agents / Router：执行独立子任务或负责分配任务。

- Synthesizer：整合多个子任务的结果。

课件示例为 AI Travel Planner（AI 旅行规划系统），可以分别处理航班、住宿和景点信息，再整合为完整行程。

并行执行的前提是 Independent Subtasks（子任务相互独立）。若子任务之间存在数据依赖，则不能简单并行。对于 $n$ 个独立子任务，其顺序执行时间可近似表示为：

$T_{\text{seq}}=\sum_{i=1}^{n}T_i $

并行执行时间可近似表示为：

$T_{\text{parallel}} \approx \max(T_1,T_2,\ldots,T_n)+T_{\text{overhead}} $

其中 $T_{\text{overhead}}$ 包含编排、通信和结果合成开销。

特点：通过同时执行独立任务降低整体等待时间，但需要额外的任务协调与结果合成机制。

#### 3\.3\.5 四种工作流综合比较

|**Workflow**|**控制流特征**|**核心组件**|**适用场景**|
|---|---|---|---|
|Sequential|线性执行|多个顺序 LLM 调用|固定步骤的问答处理|
|Conditional|根据条件选择分支|Router|按需检索|
|Iterative|评估后回退并重新执行|Writer \+ Evaluator|代码修正、答案优化|
|Parallel|独立子任务同时执行|Orchestrator \+ Synthesizer|多来源研究、旅行规划|

四种工作流并非互斥关系，而是可以组合使用的控制结构。

例如，一个完整的 Agentic RAG 系统可以先通过 Router 判断是否需要检索，再并行查询多个知识源，随后评估证据充分性；若证据不足，则重新检索，最终生成带引用的回答。

#### 3\.3\.6 Implementing Agentic Systems：工程实现

三项实现原则：

第一，简单系统可以手动实现。

对于规模较小、步骤明确的 Agentic System，可以直接编写工作流逻辑，无需引入复杂框架。

第二，复杂系统可以使用工具、库或平台。

当系统包含较多模型调用、条件分支、循环及并行任务时，可以考虑使用专门的工具、库或平台进行管理。

第三，不同工作流模式可以组合。

实际智能体系统通常综合使用顺序、条件、迭代和并行结构，以满足不同任务需求。

### 3\.4 本章总结

本章的三个进阶方向分别从知识表示、模型决策和系统控制流三个层面改进传统 RAG。

|**层面**|**技术**|**核心改进**|
|---|---|---|
|Knowledge Representation|Multimodal RAG|通过共享嵌入空间支持跨模态检索|
|Document Retrieval|PDF RAG|将视觉 Patch 向量化，保留文档图表和版式|
|Retrieval Decision|Self\-RAG|使用 Reflection Tokens 判断是否检索|
|Evidence Verification|Self\-RAG|判断证据相关性与生成支持度|
|System Orchestration|Agentic RAG|将复杂任务拆分为多个 LLM 节点|
|Workflow Control|Sequential / Conditional / Iterative / Parallel|支持顺序执行、动态分支、循环修正与并行处理|

1. Multimodal RAG 的基础是 Shared Embedding Space，使不同模态的信息能够进行语义匹配。

2. PDF RAG 通过视觉 Patch 保留文档内容，并使用类似 ColBERT 的 MaxSim 评分机制，但需要承担更高的向量存储和匹配成本。

3. Simple RAG 对冷门知识问题具有明显收益，但不必要的检索、无关上下文、错误引用及更长的输入上下文可能降低系统表现。

4. Self\-RAG 通过 Retrieve?、Relevant? 和 Supported? 三类反思判断，实现自适应检索与证据支持性评估。

5. Agentic RAG 将复杂任务组织为由多个模型节点及外部工具构成的工作流，不同节点可以采用不同能力与成本的模型。

6. Four Workflow Patterns 分别提供线性执行、条件路由、迭代反馈和并行执行机制，并且可以组合使用。

结论： 进阶 RAG 的目标不只是检索更多信息，而是使系统能够处理更丰富的知识形式、判断何时及如何使用证据，并通过灵活的工作流提高答案质量与执行效率。

## Part 4 RAG Systems Evaluation RAG 系统评估

本章核心： RAG 系统的评估不仅需要衡量检索结果和生成答案的质量，还需要考察系统在真实生产环境中的响应延迟、吞吐能力与可扩展性，并通过组件级性能分析定位和优化瓶颈。

本章围绕三个方面展开：

1. Evaluation Challenges：真实用户请求的不可预测性，以及高并发环境下的性能压力。

2. Performance and Quality Metrics：从性能和质量两个维度评估完整 RAG 系统。

3. Evaluation and Optimization：通过延迟分析、模型优化以及自动化与人工评估改进系统。

### 4\.1 Evaluation Challenges RAG 系统评估的挑战

与固定测试集上的离线检索评估不同，生产环境中的 RAG 系统需要持续处理复杂、多样且不断增长的用户请求，因此面临两项主要挑战。

#### 4\.1\.1 Unpredictability of Prompts：用户输入的不可预测性

真实用户的请求具有创造性（Creative）和不可预测性（Unpredictable），即使经过严格测试，也无法预先覆盖系统可能接收到的所有问题。

课件通过 Google AI Overview 对异常问题的回答说明这一风险：当用户询问每天应该吃多少石头时，系统可能将不可靠的检索内容转化为具有误导性的建议。

这反映了 RAG 系统的两个问题：

- 有限的测试覆盖率：离线测试集无法穷举真实用户的输入类型。

- 较高的生产错误成本：不准确或缺乏证据支持的回答可能在实际应用中造成严重影响。

因此，离线测试表现良好并不意味着系统在生产环境中始终可靠，还需要持续评估真实请求及其生成结果。

#### 4\.1\.2 Scaling Performance：系统性能的可扩展性

随着用户数量和请求流量增加，RAG 系统需要处理更高的计算负载。

课件强调三个方面：

- Latency and Load：流量增长会增加系统负载，并可能导致响应延迟上升。

- Memory and Compute Costs：请求数量增加会提高内存与计算资源需求。

- Scalability：系统需要在扩大服务规模的同时维持较高的性能。

两个挑战分别对应不同的评估重点：

|**评估挑战**|**核心问题**|**主要关注**|
|---|---|---|
|Prompt Unpredictability|能否可靠处理未知或异常输入|回答质量与可靠性|
|Scaling Performance|能否在请求增长时保持服务能力|延迟、吞吐与资源开销|

结论： RAG 系统评估必须同时覆盖 Quality（质量）和 Performance（性能），仅衡量检索准确率不足以反映系统的整体表现。

### 4\.2 Performance and Quality Metrics 性能与质量指标

课件将系统评估划分为两个维度：

- Performance：How efficiently does it run? 衡量系统运行效率。

- Quality：How useful are the results? 衡量检索与生成结果的有效性。

四项核心指标如下：

|**评估维度**|**Metric**|**定义**|**评估对象**|
|---|---|---|---|
|Performance|Latency|完成一次请求所需的时间|响应速度|
|Performance|Throughput|单位时间内处理的请求数量|系统处理能力|
|Quality|Relevance|检索文档是否与用户问题相关|检索质量|
|Quality|Faithfulness|生成答案是否得到证据支持|生成可靠性|

#### 4\.2\.1 Performance Metrics：性能指标

1. Latency：响应延迟

Latency 表示系统从接收用户请求到返回响应所经历的时间。

对于第 $i$ 个请求： $ L_i=t_{\text{response},i}-t_{\text{request},i} $

其中，$t_{\text{request},i}$ 为请求到达时间，$t_{\text{response},i}$ 为响应完成时间。

若统计 $N$ 个请求，其平均延迟为： ${ L_{\text{avg}}=\frac{1}{N}\sum_{i=1}^{N}L_i }$，延迟越低，通常意味着用户等待时间越短。

2. Throughput：系统吞吐量

Throughput 表示系统在单位时间内能够处理的请求数量，常以 Requests per Second（RPS）衡量。

${ \text{Throughput}=\frac{N_{\text{completed}}}{\Delta t} }$

其中：

- $N_{\text{completed}}$：统计时间内完成的请求数。

- $\Delta t$：统计时间长度。

吞吐量越高，说明系统在给定条件下能够处理更多请求。

Latency 与 Throughput 的区别： Latency 衡量单个请求的完成时间，Throughput 衡量系统整体的处理能力。二者需要结合分析，高吞吐量并不必然意味着低延迟。

#### 4\.2\.2 Quality Metrics：质量指标

1. Relevance：检索相关性

Relevance 衡量检索返回的文档是否与用户问题相关。

其评估对象是： $ \text{Query}\longleftrightarrow\text{Retrieved Documents}$

这一指标与前面介绍的检索评估指标相衔接，例如：

- Precision@K：前 $K$ 个结果中相关文档的比例。

- Recall@K：前 $K$ 个结果覆盖全部相关文档的比例。

- MRR：首个相关文档的排名质量。

这些指标用于量化不同方面的检索相关性。

2. Faithfulness：生成忠实度

Faithfulness 衡量模型生成的陈述是否能够得到提供给模型的证据支持。

其评估对象是： $\text{Generated Response} \longleftrightarrow \text{Retrieved Evidence}$

例如，若检索文档明确记载某航天任务有两名宇航员，而模型回答三名，即使文档检索正确，生成结果仍存在 Faithfulness 问题。

因此：

- Relevance 关注是否检索到了正确的信息。

- Faithfulness 关注生成答案是否正确使用了这些信息。

二者相互关联，但不能互相替代。高检索相关性并不保证生成答案具有高忠实度。

### 4\.3 System Latency Analysis and Optimization 系统延迟分析与优化

#### 4\.3\.1 End\-to\-End Latency：端到端延迟

RAG 系统通常采用以下处理流程：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NWNhYTdhYzVkMWRhZmE2MThlNmJkZDBiMWQ0N2FhNTdfOWRmYzhjZjFkYzZlN2M1MjUxMDg5M2U4ODFhNGRjZWNfSUQ6NzY5ODM4NjIwMTYxMDQ0MDIzMF8xNzkyNzQwMjAwOjE3OTI4MjY2MDBfVjM)

端到端延迟（End\-to\-End Latency）表示从用户提交问题到系统返回完整响应的总耗时。

对于顺序执行的 RAG 流程，可以将其分解为：${ T_{\text{total}} = T_{\text{query}} + T_{\text{retrieval}} + T_{\text{generation}} + T_{\text{other}} } $

其中：

- $T_{\text{query}}$：查询处理时间。

- $T_{\text{retrieval}}$：检索耗时。

- $T_{\text{generation}}$：LLM 生成耗时。

- $T_{\text{other}}$：其他处理、通信等开销。

两个测量层次：

|**测量层次**|**指标**|**作用**|
|---|---|---|
|System\-Level|End\-to\-End Latency|判断系统整体响应是否存在性能问题|
|Component\-Level|Retriever Timing / Generation Timing|定位延迟主要来自哪个组件|

核心原则： 端到端延迟用于发现整体性能问题，组件级测量用于定位具体瓶颈。

#### 4\.3\.2 Latency Bottleneck：延迟瓶颈

典型 RAG 流程： Query Processing、Retrieval 和 LLM Generation 三部分，Transformer Inference 往往是主要延迟来源。

课件的主要结论是：

- Transformer Inference can dominate latency\.

- LLM Calls are often the main bottleneck\.

- Retrieval and database operations are typically faster\.

但这一结论并非适用于所有配置。如果检索阶段包含高成本的重排序或复杂计算，Retriever 也可能成为主要瓶颈。因此，优化应当以实际测量结果为依据，而不是预先假定某一组件最慢。

#### 4\.3\.3 Reducing LLM Latency：降低生成延迟

当组件级测量表明 LLM 推理是主要瓶颈时，课件提出两种优化方法。

1. Smaller or Quantized Models：使用小模型或量化模型

- Smaller Model：采用参数规模较小的模型，减少推理计算需求。

- Quantized Model：采用低精度数值表示模型参数，降低存储与计算资源需求。

两种方法都可能降低推理成本，但实际加速效果及输出质量变化需要通过 Benchmark 验证。

2. Route by Task Complexity：根据任务复杂度进行模型路由

Router 根据任务复杂程度选择不同模型：

- 简单任务交由较小的模型处理，以减少推理成本。

- 复杂任务交由能力更强的模型处理，以维持回答质量。

这一策略通过差异化分配计算资源，在效率和质量之间进行权衡。

Benchmark the Speedup：评估加速效果

优化完成后，需要比较优化前后的推理耗时。

加速比（Speedup）可以表示为： ${ \text{Speedup} = \frac{T_{\text{before}}}{T_{\text{after}}} }$

例如，加速比为 $2$ 表示优化后完成相同任务所需的时间为原来的一半。

但性能优化不能只关注加速比，还应检查 Relevance 与 Faithfulness 是否受到影响。

因此，完整的优化过程是： ${ \text{Measure} \rightarrow \text{Locate Bottleneck} \rightarrow \text{Optimize} \rightarrow \text{Benchmark} } $

即先测量系统表现，再定位瓶颈，针对性实施优化，最后验证性能和质量变化。

### 4\.4 Evaluation Methods 系统评估方法

除直接测量性能与质量指标外，区分两种评估器：Code\-Based Evaluators 与 Human Feedback Evaluators。

#### 4\.4\.1 Code\-Based Evaluators：基于代码的评估器

Code\-Based Evaluators 使用程序自动检查系统运行情况和可明确判定的输出要求。

典型检查包括：

- Track Requests per Second：统计每秒请求处理数量，衡量吞吐量。

- Check for Valid JSON Output：检查输出是否符合合法 JSON 格式。

- Low Evaluation Cost：自动化评估通常成本较低，执行简单。

其优势是便于自动化、成本低，适合频繁执行的系统检查。

但传统规则型代码评估器通常难以直接判断开放式回答的语义正确性或证据支持程度。

#### 4\.4\.2 Human Feedback Evaluators：人工反馈评估器

Human Feedback Evaluators 通过用户或人工评审人员评价系统输出。

三种方式：

- Thumbs Up / Down Ratings：通过点赞或点踩收集总体评价。

- Detailed Text Feedback：收集具体文字反馈，识别回答存在的问题。

- Manual Quality Assessments：通过人工审查判断回答的相关性、正确性与证据支持程度。

人工评估能够发现代码规则难以识别的语义和质量问题，但需要更多时间和人力成本。

#### 4\.4\.3 两类评估方法的比较

|**比较维度**|**Code\-Based Evaluators**|**Human Feedback Evaluators**|
|---|---|---|
|成本|较低|较高|
|自动化程度|高|较低|
|评估重点|吞吐量、输出格式等可程序化检查的内容|用户体验、语义质量、证据支持|
|主要优势|简单、高效、可重复执行|能发现代码检查遗漏的问题|
|主要局限|难以覆盖复杂语义问题|成本高，难以全面覆盖所有请求|

结论： 两种方法具有互补性。代码评估器适合大规模自动化检查，人工反馈评估器则用于识别难以通过固定规则判断的质量问题。

### 4\.5 本章总结

|**技术方向**|**关键方法**|**核心权衡**|
|---|---|---|
|Scalable Retrieval|ANN、HNSW|检索速度与 Recall|
|Chunking and Query Processing|Chunking、Query Rewriting|上下文保留与检索有效性|
|Ranking|Cross\-Encoder、ColBERT|排序质量与计算、存储成本|
|Advanced RAG|Multimodal RAG、Self\-RAG、Agentic Workflows|系统能力与架构复杂度|
|System Evaluation|Relevance、Faithfulness、Latency|结果质量与运行效率|

五项核心原则

1. Scalable Vector Search

使用 Approximate Nearest Neighbor（ANN）提高大规模向量检索速度，但需要权衡速度与检索召回率。

2. Effective Chunking and Query Processing

通过合理分块和查询改写提高检索有效性，同时保留原始上下文及用户意图。

3. Improved Ranking

利用 Cross\-Encoder 或 ColBERT 改善排序质量，但需要考虑额外的计算开销和向量存储成本。

4. Advanced RAG Architectures

根据任务需求引入多模态证据、Self\-RAG 自我批判机制和 Agentic Workflows，提高系统对复杂任务的处理能力。

5. Measurement\-Driven Optimization

同时评估 Retrieval Quality、Answer Faithfulness 和 End\-to\-End Latency，并针对实际测得的性能瓶颈实施优化。

核心关系：

- Relevance 与 Faithfulness 分别衡量检索证据的相关性和生成内容的证据支持程度。

- Latency 与 Throughput 分别衡量单次请求响应时间和系统单位时间处理能力。

- End\-to\-End Latency 与 Component\-Level Timing 分别用于识别整体性能问题和定位具体瓶颈。

- Code\-Based 与 Human Feedback Evaluators 分别提供低成本自动化检查和更深入的人工质量判断。

最终，RAG 系统的优化应遵循 Evaluation → Bottleneck Identification → Targeted Optimization → Benchmarking 的过程，在检索质量、生成可靠性、响应速度和资源成本之间取得平衡。

### 4\.6 In\-Class Exercise

|**题目**|**正确答案**|**核心依据**|
|---|---|---|
|Q1\. ColBERT 的 Token\-Level Representation 相比每篇文档一个向量的主要权衡是什么？|A|更细粒度的匹配能力，但需要存储更多向量|
|Q2\. HNSW 为什么先搜索稀疏的上层，再进入密集的底层？|C|先进行大范围导航，再逐层缩小范围，完成局部精细搜索|
|Q3\. 从精确搜索切换到 ANN 的主要权衡是什么？|B|减少距离比较次数，提高速度，但可能错过真正的最近邻|

$\text{ColBERT}: \quad \text{Matching Detail} \leftrightarrow \text{Vector Storage} $

$\text{HNSW}: \quad \text{Coarse Navigation} \rightarrow \text{Local Refinement} $

$
\text{ANN}: \quad \text{Search Speed} \leftrightarrow \text{Retrieval Recall} $

其中，ColBERT 的多向量表示不同于 Cross\-Encoder 对查询与文档进行联合编码；HNSW 的上层用于导航，并非删除不相关文档；ANN 减少的是搜索时的比较次数，并不必然减少存储文档的数量或向量维度。






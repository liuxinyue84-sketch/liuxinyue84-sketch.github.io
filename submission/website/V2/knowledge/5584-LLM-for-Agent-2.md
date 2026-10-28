# 5584 LLM for Agent2

# Lecture 6 Tool Use for LLM Agents

|章节|内容|
|---|---|
|1 Capabilities|tools add retrieval, execution, generation, and application actions\.　<br>工具给模型加上检索、执行、生成与应用动作|
|2 Mechanics|schemas enter the prompt; model protocols emit calls; harnesses validate, dispatch, and match results by ID\.　<br>schema 进提示、模型按各自协议吐调用、harness 校验并派发、按 ID 配对结果|
|3 Constraints|JSON Schema and grammar masks guarantee form—not semantic correctness\.　<br>JSON Schema 与语法掩码只保证形式合法，不保证语义正确|
|4 Interfaces|Direct REST calls and MCP are alternative ways to expose capabilities and manage credentials\.　<br>直连 REST 与 MCP 是暴露能力、管理凭据的两条路|
|5 Systems|orchestrate dependencies and concurrency; evaluate selection, arguments, outcomes, cost, and operational failures\.　<br>编排依赖与并发，并评估选择、参数、结果、成本与运行故障|

本讲的三个阶段

第一阶段（Part 1–2）：工具是什么、调用怎么走 —— 能力与机制。

第二阶段（Part 3–4）：怎么保证调用能用、外部能力怎么接 —— 约束与接口。

第三阶段（Part 5–6）：多个调用怎么协同、怎么度量 —— 系统与评估。

## Part 1  Capabilities 工具的能力 

### 1\.1  Tool Definition

A tool is an interface through which a language model can invoke an external computer program\.

工具是一个接口（interface），语言模型通过这个接口去调用一个外部计算机程序。接口说明它是一份契约，不是一段能力与外部说明程序不在模型参数里，模型无法凭自身参数完成这件事。 

The model proposes that external software decides whether and how to execute it\.

责任分界线：模型只提议，无法绕过 harness 直接产生副作用；是否执行、如何执行，由外部软件决定。

### 1\.2 Benefits of Tools

|动词|中文|说明|
|---|---|---|
|扩展<br>Extend|Access information or actions unavailable in the model's parameters\.　<br>访达到模型参数里根本没有的信息或动作|Extend 解决的是能力边界：模型参数里没有今天 PolyU 发了什么公告，再大的模型也答不出来|
|分担<br>Facilitate|Delegate operations external programs perform more reliably or efficiently\.　<br>把外部程序做得更可靠或更高效的操作交给它们|解决的是可靠性：18 \+ 23 \+ 41 \+ 54 的平均数模型其实会算，但会算错；交给程序算是为了让错误率从偶尔降到几乎不可能。|

### 1\.3 Example of Tools 典型工具

Search 检索：把模型不知道变成去查一下。

Calculator 计算器：把模型算不准变成交给确定性的程序算。

Browser 浏览器：把读到静态文本变成在网页上操作。

Python 代码解释器：一个能表达任意控制流的通用工具。

API 外部服务接口：把私有数据与业务动作接进来。

|Need|Example tool|Benefit|
|---|---|---|
|Current information　当前信息|Search|Fresh evidence　新鲜证据|
|Exact computation　精确计算|Calculator or Python|Reliable execution　可靠执行|
|Private state　私有状态|Account API|Authorized application data　经授权的应用数据|
|External action　外部动作|Browser or API|Changes the environment　改变环境|

工具并不是越多越好，把 30 个工具一次性塞进提示，会同时抬高四类代价：提示更长（延迟与成本）、候选更多（选错工具的概率上升）、权限面更大（风险）。

Call tools only when their benefit outweighs latency, cost, failure, and risk\. Start with the abilities we want, then define a narrow interface for each kind of interaction\.

只有当工具的收益超过延迟、成本、失败与风险时，才去调用它。从想要的能力出发，为每一类交互定义一个窄接口（接口窄，则参数少、校验简单、权限小）。

- latency 延迟：一次工具往返要多久？串行四次就是四倍等待。

- cost 成本：检索调用、API 调用通常按次计费，长任务里会累积。

- failure 失败：工具可能超时、限流、返回畸形数据，harness 要有兜底。

- risk 风险：对外部动作类工具（External action），副作用不可撤销。

**第一类：harness 控制动作 finish\(text\)**

Return the final text and stop the agent loop\. This is a harness control action, not an external program\.

智能体循环需要一个出口。返回最终文本并停止智能体循环。这是一个 harness 控制动作，不是外部程序。 

**第二、三类：检索、计算与生成**

三类工具的共同骨架，三者的返回类型不同：

检索类返回的是文本证据（Three matching news items\.\.\.）；计算类返回的是一个确定性数值（34\.0）；生成类返回的是一个文件引用（generated\_image\.png）。

信息检索 search\_web\(query\)

Retrieve information from the web\. 从网上检索信息。

代码执行 execute\_code\(code\)

Run a program in an isolated environment and return its output\. 在隔离环境里跑一个程序并返回输出。

图像生成 generate\_image\(query\)

Generate an image from a textual description\. 从文字描述生成一张图。

**第四类：应用专属工具 create\_grocery\_cart\(items\)**

前三类工具是通用的（谁都能用），第四类是专属于某个应用的。

Expose an application\-specific capability through one typed call\.　

用一次带类型的调用暴露一个应用专属的能力。

Tips：重点：带类型

好处：模型不需要读懂返回内容，只要按字段取用；下游代码也不需要解析自然语言，可以直接断言 items == 3、total == 31\.42。这也是生成时约束的东西：JSON Schema 管住了输入的形式，而工具返回结构的约定管住了输出的形式

**第五类：代码作为元工具 execute\_code\(code\)**

前四类工具都是一个工具做一件事，而代码是工具之上的工具，所以叫 meta\-tool（元工具）。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Nzg1NTc2ZTc5MGFiMDQyOTExMzFjZmEzNzZiNGNkZTVfNWJmZGNmNzY5ZGQyOTJmYzBiZmE3MmM5OWM0ZWMzNGVfSUQ6NzY5NjQyMzIwMzQyNTgxNjA5OV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

Code combines control flow, libraries, and multiple operations into a single action\.

代码把控制流、库与多个操作组合进一个动作里。control flow 是循环与分支（面包题里的连减）、libraries 是外部库（pandas）、multiple operations 是多次操作的编排（视觉问答三步）。

### 1\.4 程序化组合：同一任务的两种智能体

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2E2MWE3Mjk5OTNjMGFmNDI4MDBlZDU2OTQzOTk1NDFfYTgzMTcyYjhlOGUzNmM1NDk3MmZiODA5MTgxZGVmNDFfSUQ6NzY5NjQyNTQ5MzA4ODUwNTM4Ml8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

左边：传统 LLM Agent（Text / JSON as Action，典型就是 ReAct）

Action = JSON 结构化文本调用工具，一次 Action 只能调用 1 个工具 

流程：`Think → JSON Action调用单个API → Environment返回结果 → 重复循环` 

任务：计算 4 个国家手机 CodeAct 1 的美元总价，找出最便宜国家

1. 第一轮：`lookup_rates(country=Germany)` → 拿到汇率、税率

2. 第二轮：`lookup_phone_price(model="CodeAct 1", country=Germany)` → 当地售价

3. 第三轮：`convert_and_tax(price, rate, tax)` → 换算 \+ 计税

4. 还要单独调用`estimate_shipping_cost`、`estimate_final_price`

5. 然后重复全部步骤，逐个国家（USA/Japan/India）循环调用 缺点：

- 需要非常多轮 LLM 调用、多步交互，每一步只能执行单一工具调用

- 大量重复的 Think\-Action\-Observe 循环，token 消耗高、速度慢

- 循环逻辑、批量计算、`min()`这种聚合操作都无法一步完成

右边：CodeAct Agent（Code as Action，代码作为动作）

Action = 一段可执行 Python 代码，单段代码内可以连续调用多个 API、写循环、保存中间变量、调用内置函数

优势（图中标注）

1. Fewer Actions Required：更少动作 / 更少 LLM 轮次。一次性写循环遍历全部 4 国，一次性完成全部 API 调用、计算、比较，不需要一步一步逐个工具交互

2. Control \& Data Flow of Code Simplifies Complex Operations：代码自带循环、变量存储、分支逻辑，天然支持复杂流程

3. Re\-use `min` Function from Existing Software Infrastructures\(Python library\)：直接复用 Python 内置函数，不用让 LLM 手写比较逻辑

||**Text/JSON Action Agent \(ReAct\)**|**CodeAct \(Code as Action\)**|
|---|---|---|
|Action type|JSON / 结构化文本|可执行 Python 代码|
|单次 Action 能力|只能调用单个工具|可以调用多个工具 \+ 循环 / 变量 / 内置函数|
|Interaction rounds|Many（多轮）|Much fewer（少轮次）|
|Strength|简单任务，易解析|复杂计算、批量任务、多步骤逻辑|
|Weakness|长任务下大量交互，容易出错|需要代码沙箱执行环境，有安全风险|

CodeAct：LLM Agent 把动作表达为可执行代码，而不是 JSON 工具调用。 

论文结论：代码作为动作，表达能力更强、减少交互轮次，处理多步计算类任务表现更好。

代码的两面性：动作空间宽带来的三个结果

|维度|内容|对策|
|---|---|---|
|强<br>Expressive|Loops · variables · libraries　循环、变量、库<br>表达能力来自动作空间宽|Good for multi\-step data manipulation and composition\.|
|难管<br>Harder to constrain|Broad action space　动作空间宽<br>难约束也来自动作空间宽|Validation is less precise than for a narrow typed function\.|
|危险<br>Higher impact|Files · network · processes　文件、网络、进程<br>高影响同样来自动作空间宽|Use sandboxing, resource limits, permissions, and audit logs\.|

四条对策：

sandboxing（沙箱）把执行环境隔离，让副作用出不了笼子。

resource limits（资源限额）限制 CPU、内存、时长，防住一个死循环拖垮整个 agent。

permissions（权限）决定这段代码能碰什么，是最小权限原则的落地。

audit logs（审计日志）出事后能回答它到底做了什么，这也是合规的前提。

## Part 2 Mechanics 工具的机制

工具调用本质上就是**特殊标记（tokens）**，是大模型生成文本序列的一部分。

### 2\.1  工具调用作为 token 序列

LLM 生成有两种输出分支：

1. Text continuation（普通文本续写）：正常自然语言回答，例：The weather is sunny\.

2. Tool continuation（工具调用续写）：模型输出特殊控制标记，触发工具调用，例：\<tool\_call\> get\_weather\(\.\)

模型不区分 “回答文字” 和 “调用工具”，两者都是模型生成的 token。 当模型输出工具标记，外部执行框架（harness）捕获到这个动作，去执行工具。

messages become model input

API 的多轮消息（system /user/assistant）不能直接喂给模型，需要通过 chat template 序列化为一整条 token 输入序列。

- API messages：按 role 组织（system、user、assistant）

- Chat template：加上特殊分隔符标签（如 Qwen 的\<\|im\_start\|\>、\<\|im\_end\|\>）拼接成一串文本，作为模型输入。

### 2\.2 Tools add structure to the request 给请求增加结构化信息

Tool definition：提前把工具的 JSON schema 传给模型。定义工具名称、参数类型、必填字段（比如get\_weather需要city字符串参数）

API request：调用 chat completion 接口时，除了messages，额外传入tools=\[tool\_schema\]

框架把消息 \+ 工具定义一起送入模板，暴露给模型阅读。

Definition in, tool call out

Prompt 内部包含\<tools\> \.\.\. \</tools\>，里面是全部工具的 JSON 定义。 模型读到工具定义后，生成带标记的工具调用输出：\<tool\_call\> \{name, arguments\} \</tool\_call\> API 会给这个调用分配唯一call\_id。

### 2\.3 Same tool call, different model protocols 

同一工具调用，不同模型有不同协议格式

One schema; model\-specific serialization and parsing\. 

|模型|协议名|形态特征|
|---|---|---|
|Qwen 3\.8|Function \+ parameter tags|层层嵌套的标签：函数名与参数名都做成标签|
|Mistral Small 4|Control token \+ call ID|一个控制 token 加一段 JSON（JSON 里带 id）|
|DeepSeek V3\.2|DSML invocation block|一套 DSML 标签，参数上还带类型标注|

工具的底层 schema 是统一的，但是不同模型家族，使用不同特殊 token / 标签序列化工具调用。

重点：每个模型有自己专属的控制 token 格式。Agent 框架必须为不同模型写对应的 parser，把模型输出的文本解析成统一的\{name, args\}结构。

### 2\.4 OpenHands 工具调度流程

|对照项|初始化阶段|每次调用阶段|
|---|---|---|
|图上编号|1 Register at initialization|2 Dispatch each model call|
|发生几次|一次|每次模型调用一次|
|主要动作|resolve\_tool\(spec, state\)|Parse → Lookup → Validate → Execute → Return|
|产出|tools\_map\[name\]|ObservationEvent\(call\_id\)|
|单次代价|高：解析 schema、构造类型、准备执行器|低：查表、校验、执行|

两大阶段：

Register at initialization（初始化注册阶段）

1. 输入 Tool spec（工具描述，如 BashTool）

2. resolve\_tool\(spec, state\)：解析、配置工具

3. 存入tools\_map\[name\]：字典映射，工具名 → 工具定义 \+ 执行器 executor

Dispatch each model call（每一次模型输出后的调度）

1. Parse：解析模型输出，得到\{name, args\}

2. Lookup：在tools\_map查找对应工具定义

3. Validate：校验参数合法性（参数类型、必填项）

4. Execute：调用 executor 执行工具 action

5. Return：封装结果为ObservationEvent\(call\_id\)返回

|步骤|表示|作用|失败后果|
|---|---|---|---|
|Parse|\{ name, args \}|从模型输出里抽出函数名与参数|The harness cannot parse it\.|
|Lookup|tools\_map\[name\]|按名字查阶段一注册好的表|查不到就是未知工具|
|Validate|action\_from\_arguments\(args\)|把裸参数转成强类型 Action|类型或必填项不符就校验失败|
|Execute|executor\(action\)|真正执行，产生副作用|抛异常则变成一次失败结果|
|Return|ObservationEvent\(call\_id\)|把结果打包成事件，带上call\_id|不带 ID 就无法配对|

### 2\.5 通过 call ID 返回工具结果

结果里为什么一定要带 call\_id？

**用来绑定工具调用和返回结果，支持并行多工具调用（parallel tool calls），保证结果对应正确的调用。**

一次模型响应可能带多个调用，harness 可能并发执行它们，完成先后取决于各工具快慢，而不是发出顺序。如果结果按第几个回来配对，一旦乱序就会把 A 的结果填给了 B，而且这种错误不会报错，只会让模型拿到错的数据继续往下推理。只有 ID 能让结果回到正确的调用上。

Example：若同时发出两个调用（例如查两个城市的天气），harness 可能并发执行，谁先完成取决于网络与工具耗时。

没有 ID：只能假设先发的先回，一旦乱序就把 A 的结果填进了 B。这种错误不会抛异常，只会让模型拿着错的数据继续推理，这是最难排查的一类 bug。

有 ID：无论谁先回来，都能放回正确的位置。

### 2\.6 小结

工具调用完整流程：

1. 系统将工具 schema 渲染进 prompt，放在\<tools\>标签内送入模型。

2. 模型读取工具定义，按照自身专属协议输出\<tool\_call\>（携带工具名、参数、唯一call\_id）。

3. 外部执行框架 harness 处理： Parse：解析模型输出；Lookup：查询注册好的工具映射表；Validate：校验参数合法性；Execute：运行外部工具；Return：封装工具返回内容。

4. 工具返回tool 角色消息：role="tool"，tool\_call\_id与之前调用的 id 匹配，携带结果content。

5. 把工具结果放回对话上下文，模型读取观测结果，生成最终自然语言回答。

完整一轮工具交互链路： 

1. assistant：tool\_call（发起调用，带 call\_id）

2. tool：tool\-result（返回观测，匹配 call\_id）

3. assistant：最终文本回答

机制要点：call\_id 的作用是绑定调用和返回结果，支持并行工具调用；工具调用本质是模型生成的特殊 token，不同模型协议标签格式不一样。

易错：

1. 模型不知道自己的 call ID；

2. tool call 不是函数调用，是一段字符串；

3. 结果靠 tool\_call\_id 配对，不靠顺序（including parallel calls）。

## Part 3  Constrained Decoding 工具的约束：只保证形式合法

JSON Schema 校验工具调用的结构合法性；PDA 用来处理 JSON 嵌套；Token Masking 在解码阶段提前阻止模型输出非法 token，减少 malformed tool calls。

事后校验与事前约束的分工

|做法|对应|时机|代价|
|---|---|---|---|
|事后校验|The harness cannot parse it\.|整段生成完之后|整段输出作废，需要重试，多一次完整往返|
|事前约束|Constrained Decoding|生成的每一步|每步多一次掩码计算（CPU 开销）|

解码层保证结构上能解析：畸形括号这类问题。

harness 保证业务上能用：Validate（action\_from\_arguments）。

但要注意约束的射程：受约束解码消除的是形式类错误。\{"city":"PittsburghX"\} 是合法 JSON、类型也对，城市名却是错的，那已经越出形式约束的范围，要靠Values 甚至更外层的业务校验。 

### 3\.1  Malformed tool calls 格式错误的工具调用

模型输出语法破损的 JSON，例如少闭合大括号，harness无法解析，直接调用失败。

Tool\-call constraints 工具调用的四层约束（后一层以前一层为前提）

|约束|约束|作用|例子|
|---|---|---|---|
|Syntax|valid JSON|合法 JSON|缺一个 \} 就不是 valid JSON|
|Shape|expected fields|字段符合预期|name, arguments 等必填 key 存在|
|Types|city is a string|参数类型匹配 schema|city 必须是字符串 string|
|Values|值在允许范围内|值在允许范围内|units 只能是`C`或`F`|

Constraints ensure form—not truth, permissions, tool choice, or task success\.

约束只保证格式合法，不能保证工具返回结果是真的，也不能保证选对工具。

四类约束执行时机

|约束|解码时（掩码能做吗）|派发时（harness 做什么）|
|---|---|---|
|Syntax|能：字节级语法掩码|解析失败即拒：The harness cannot parse it\.|
|Shape|能：required 编译进文法|缺字段则 Validate 失败|
|Types|能："type": "string" 进文法|action\_from\_arguments 里做类型转换与检查|
|Values|能：enum 限制候选取值|业务层可再校验一次|
|truth / permissions / tool choice / task success|不能|需要额外机制：接口与凭据、评估|

Tips：加了 JSON Schema 就绝对安全吗？

真伪要靠工具自身返回真实数据，以及额外的交叉验证；权限要靠 harness 的白名单与凭据边界；选对工具要靠评估里的 selection 指标。任务成功要靠端到端的结果评测。

### 3\.2  JSON Schema

Vocabulary for describing JSON data\. Definite Types, required fields, allowed values

JSON Schema 是一套用来描述 JSON 数据结构的机器可读规则，定义字段类型、必填字段、允许枚举值（enum）、禁止额外字段。

示例：city:string，units: enum \["C","F"\]，required:\["city"\]，additionalProperties:false

Schema\-valid vs schema\-invalid 是否可以推导出来derives

Valid：\{"city":"Pgh","units":"F"\} 结构、类型、取值全部匹配 schema

Invalid：\{"city":"Pgh","units":"K"\} JSON 语法没问题，但K不在允许枚举集合里，schema 校验失败

1. JSON valid：文本语法能被 JSON 解析器读

2. Schema valid：不仅语法对，数据结构、类型、取值完全符合预先定义的 schema

### 3\.3 A pushdown automaton** **PDA，下推自动机

PDA = **有限状态控制 Finite control \+ 栈 Stack memory**

#### 3\.3\.1 两个部件

|部件|原句|记住什么|记不住什么|
|---|---|---|---|
|Finite control<br>有限状态控制器|The state records the local position in a grammar rule\.|当前文法规则内部走到哪一步（expect value / inside value / expect separator）|嵌套层级有多深|
|Stack memory<br>栈存储|The stack remembers arbitrarily deep nesting\.|每一层嵌套对应的结构类型（object /array），支持任意深度 arbitrarily deep|当前这条文法规则内部的局部位置|

State tracks current rule; stack remembers where nested rules return\. 

状态跟踪当前规则；栈记住嵌套结束后要返回的上层规则。栈可以无限增长，有限状态做不到。 

栈为空 = 所有括号配平。

底层原理： 纯有限状态机（正则表达式）无法表达任意深度的配对括号，只能处理固定深度嵌套。JSON 存在无上限嵌套，所以必须使用 PDA。

#### 3\.3\.2 文法检查 Grammar checking happens below tokenization

语法检查运行在tokenization 底层，字节层面

- Token 边界 ≠ 语法边界：单个 token 可能跨多个语法终结符，或者在文法中间截断。不能把 token 边界当成语法边界。

- 流程：预先编译文法 → 构建字节级 PDA；对每一个候选 token，解码为字节，送入 PDA 校验。

示例：PDA 栈演算

1. 读取 `{` → push `object`，栈：`[object]`（深度 1）

2. 读取 `[` → push `array`，栈：`[object, array]`（深度 2，array 在栈顶）

3. 读取 `]` → pop array，栈：`[object]`（深度 1）

4. 读取 `}` → pop object，栈：empty（深度 0）

最终栈为空：括号配平； 缺`}`（malformed 例子）：栈停留在`object`，不为空，直接判定语法错误。仅机械栈操作，不需要理解语义。

#### 3\.3\.3 PDA 能力边界

对接前面 4 类 tool\-call 约束：Syntax / Shape / Types / Values 

PDA 可以校验：

- Syntax：括号、引号配对（JSON 配平，本职）

- Shape：必填字段、合法字段名

- Values 里的有限枚举（`units ∈ {"C","F"}`）

上面这些都可以写成上下文无关文法的产生式

PDA **无法校验**：跨字段业务语义、外部事实知识

例：`units="C"` 时 city 必须是加拿大城市，需要外部知识库，不属于文法范畴。

**Constraints ensure form—not truth, permissions, tool choice, or task success\.** 

约束只保证**形式合法**，不能保证事实真伪、权限、工具选择、任务是否成功。

### 3\.4 Token masking 令牌掩码

问题：非法 token 判定依赖 PDA 栈状态，如果每次生成 token 都完整重算，开销很高。

缓存掩码流水线思路：大部分 token 查表缓存，少数上下文依赖的 token 现场实时计算。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjA0NWRkZWNmMGE3NjUzYWE2YThjOTY1NmU4NTczMDdfYWFhMzI2MzMwN2JlNTA1ZjVhMTQ4Y2Y3YmQ2ZmRkMTlfSUQ6NzY5NjQ0NTY0MjMyMzExOTY1MV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

1. **Parse the prefix** 

prefix = 已经生成输出的字节序列。persistent PDA stacks持久化栈，不需要每次从头重建栈，直接在已有栈状态上，用已经输出的字节向前推进状态。

解决：长序列每次重建栈带来的平方复杂度开销。

2. **Fetch cached decisions **

栈顶对应文法节点，索引预计算好的缓存表，直接查询上下文无关 token（context\-independent tokens）是否合法。核心操作就是查表，速度很快。

对应图：Retrieve token mask cache from stack top / Adaptive Token Mask Cache

3. **Check the minority **

只对少量上下文依赖 token（context\-dependent tokens），拿完整 PDA 栈现场校验。 

union results across matching stacks：存在多分支、多条并行栈状态时，把多条栈得到的合法性结果做并集。

对应图：Context\-dependent tokens \(minority，黄色窄条\)

4. **Mask and continue **

合并查表 \+ 现场校验得到的全部判定结果；对模型 logits 施加 token 掩码；采样选出一个 token；更新 PDA 栈。更新后的栈，交给下一轮Parse the prefix使用，四步形成闭环。

对应图：Complete Token Mask，输出 Sampled Token

三种实现策略取舍

|**策略**|**代价**|**缺点**|
|---|---|---|
|全部缓存|按栈状态 × 词表 V预计算|栈状态组合爆炸，缓存表容量不可行|
|全部现场计算|每一个候选 token 都完整跑 PDA|词表 V 上万，CPU 计算开销巨大，拖慢 GPU 推理|
|缓存 \+ 少数现场计算|预缓存大部分，仅少数 context\-dependent 实时校验|需要处理分支多栈、结果并集逻辑|

定性代价模型

词表大小V； m = 上下文无关、可以查表的 token 占比； $1-m$ = 少数需要现场计算的 token 占比。

- 全现算：每一步成本正比于 V

- 缓存方案：每一步成本 ≈ 一次查表 \+ 正比于 $(1-m)V$ 的现场校验

加速幅度近似由m决定；m越大，加速效果越好。

课件只定性：成本随 minority 占比线性下降，不给出具体数值。 

配图：绿色（允许）\+ 红色（拒绝）占绝大部分词表；黄色上下文依赖 token 只是很小一部分，m很大。

persistent 持久栈的关键意义：

如果不使用 persistent 栈，每次生成新 token，把全部 prefix 字节从头重新跑一遍 PDA。总开销随生成长度平方增长，越长越慢；Persistent 栈只对新增字节推进栈状态，单步是常数复杂度。 所以这套四步流水线不只是用来生成掩码，还解决了长文本生成过程中掩码计算越来越慢的性能隐患。

LLM 推理输出 logits，token mask 是 0/1 掩码：

- 1：允许采样该 token；0：屏蔽，logits 置`-∞`，softmax 后概率归零

- 流程：LLM 输出原始 logits → 乘 mask 得到 masked logits → softmax 得到概率分布 → sampler 采样 token

### 3\.5 Cached token\-mask generation 带缓存的掩码生成，加速方案

1. Parse the prefix：用已经生成的字节，推进持久化 PDA 栈

2. Fetch cached decisions：栈顶节点直接读取预计算缓存，大部分 token 是上下文无关的，直接查表

3. Check the minority：少数上下文依赖的候选 token，用完整 PDA 栈实时校验

4. Mask and continue：合并掩码，屏蔽非法 token，采样新 token，更新 PDA 栈

Case study：加速来源

约束只管形式，加速靠缓存与重叠

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTY0MGRlYTkyOTUyMDZjMWQ5YWVhMDhlYmE0YTE1MDFfODQ1MDBmZTg5MjZmNzBhMDhkODc2NTk1NmY1MDI2ZjVfSUQ6NzY5NjQ0NzI2Njk2NTU1Njc2NV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

1. **Caching**：绝大多数 token 是上下文无关，直接读取预计算 mask，不用实时跑 PDA（大头提速）

2. **Persistent stacks**：持久化 PDA 栈，支持分支、多候选路径

3. **CPU/GPU overlap**：CPU 做语法 / 掩码计算，和 GPU LLM 推理并行，不阻塞模型生成

|设计|图上|含义|
|---|---|---|
|栈的持久性|Maintained by persistent execution stacks |栈跨步保留，不做每步重建（persistent）|
|栈的分支|Matching Stack States 里同时列出 \[0\]\<array\> 与 \[3\]\<str\>|不确定走哪条分支时同时维护多条栈，最后取并集（union results）|
|token 级查表|Retrieve token mask cache from stack top|查表的键是栈顶节点（Node ）|
|与推理重叠|Overlapping with LLM engine |CPU 侧的掩码计算与 GPU 侧的推理并行，不是串行等|

每步总成本 ≈ cache 查询 \+ minority × 现场判定

Caching handles most tokens;  大多数 token 查缓存；

persistent stacks support branching;  多栈并行，使不确定走哪条分支不至于卡住；

CPU work overlaps GPU inference\. 把 CPU 的工作与 LLM engine 重叠。

多数段直接查缓存（Context\-independent: Fetched from cache \(fast, majority\)）

少数段运行时判定（Context\-dependent: Checked at runtime \(slow, minority\)） 

## Part 4 REST API 工具接口

### 4\.1 Library API

#### 4\.1\.1 API 的本质

Python Library API 是程序内部暴露给其他代码使用的编程接口。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjAyYmNiOTE2ZTM4NGMzODk3ZDc3YzA4YTU2ZmE4NWRfYjRmNmViNzY0ZDA1NmQ4MmZhMmZjNjFiOTRjM2JjOThfSUQ6NzY5NjcxODg1MTg4MjY4MzkzM18xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

Caller and function share one process\. Python supplies the name, arguments, types, and return type\.

Python 库函数是带类型的编程接口，不是网络服务。示例 get\_weather，调用方和函数共享同一个进程、共享内存地址空间。 Python 直接提供函数名、参数、类型、返回类型，直接传内存对象，不需要地址、协议、序列化、认证。

#### 4\.1\.2 局限与前提

局限：不能远程调用，而进程内调用靠共享地址空间，跨网络没有共享内存。 

所以有跨网络调用硬性需求：

1. `address`地址：远端服务的位置

2. `protocol`协议：两端交互报文约定

3. `serialization`序列化：内存对象编码为网络字节流

4. `authentication`认证：验证调用者身份

|缺件|进程内为什么不需要|跨网络为什么必须有|
|---|---|---|
|address 地址|同一进程里，函数名就是入口|服务在另一台机器上，得先知道它在哪里|
|protocol 协议|Python 的调用约定就是协议|两端可能不是同一种语言，要约定报文格式与交互次序|
|serialization 序列化|参数就是内存里的对象，直接传引用|网络只能传字节，对象必须先编码成可传输的形态|
|authentication 认证|同进程内没有谁在调用这个问题|任何到达端点的请求都必须先证明自己是谁|

Pydantic BaseModel 定义返回结构，这套类型标注会一路传递：Python 类型 → JSON 响应 → OpenAPI JSON Schema → MCP 工具 schema。

### 4\.1\.2 缺点

不能直接远程调用：进程内部可以直接使用 Python 函数调用机制。但如果调用方在另一台计算机上，就无法直接使用同一个内存地址空间。因此，远程调用必须解决四个问题：

|**问题**|**进程内部**|**跨网络调用**|
|---|---|---|
|Address|通过函数引用找到代码|必须知道远程服务地址|
|Protocol|Python 调用约定|必须约定通信协议|
|Serialization|直接传递 Python 对象|需要编码为可传输数据|
|Authentication|由进程和应用权限控制|通常需要验证远程调用者|

其中，Serialization（序列化）尤其重要。

例如，Python 对象：

```Plain Text
Weather(    summary="Sunny",    temperature=75.2)
```

通过网络传输时，可以表示为 JSON：

```Plain Text
{
  "summary": "Sunny",
  "temperature": 75.2
}
```

这里 JSON 是一种数据表示格式，不是网络协议本身。

本节结论：Library API 是 typed programming interface，而不是 network service。

### 4\.2 REST APIs：通过 HTTP 暴露函数

#### 4\.2\.1 REST API 的核心思想

REST API 使外部客户端可以通过 HTTP 请求访问服务端提供的资源和操作。

在课程案例中，我们希望将：get\_weather\("Pittsburgh", "F"\)

转换成远程请求：GET /weather?city=Pittsburgh\&units=F

它们实现类似的业务功能，但使用不同的调用方式。

#### 4\.2\.2 FastAPI 如何实现这一转换？

**REST APIs expose functions over HTTP**

把库函数挂到一个 URL 上，让它可以被一次 HTTP 请求触发。用 FastAPI 把本地库函数绑定到 HTTP 端点，对外提供网络调用能力。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzFlNzNlZDdmYmQwZDY0MGZiOTI5YzJmYzMxZTUzYmVfZDI2NjQ2ODMxNjdiOWNhNjg0ZDUwM2M2ZDNlMDYzODZfSUQ6NzY5NzIwNjMwOTEwMzY4NTE1OF8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

|元素|代码|
|---|---|
|GET /weather|@app\.get\("/weather", \.\.\.\) HTTP 方法与路径|
|city =Pittsburgh|city: str 这个参数，以查询参数形式传进来（课件原样多印了一个空格）|
|units F 与孤立的 =|units: Literal\["C", "F"\] = "F" 参数名、取值、默认值被版式拆散了|
|Header: X\-API\-Key|APIKeyHeader\(name="X\-API\-Key"\) 凭据走 HTTP 头，不走 URL|
|Response: Weather as JSON|\-\> Weather 返回类型被序列化成 JSON|

注意：`verify(key)` 是验证函数。

**第一：创建 HTTP Endpoint**

- `GET`：HTTP Method。

- `/weather`：Endpoint Path。

- `get_weather`：OpenAPI 中的 Operation ID。

特别注意：Python 路由函数名是 `weather`，但 Operation ID 被显式指定为 `get_weather`。这让后面 OpenAPI 与 MCP 工具映射可以使用一致的操作名称。不过，`operationId` 并不要求必须与底层 Python 函数同名。

**第二：解析请求参数**

city: strunits: Literal\["C", "F"\] = "F"，FastAPI 根据参数声明解析 Query Parameters。

请求示例：/weather?city=Pittsburgh\&units=F

**第三：获取 API Key 并认证**

key\_header = APIKeyHeader\(name="X\-API\-Key"\)

X\-API\-Key 放在 HTTP header；FastAPI 只取出 key，业务代码 verify \(key\) 负责校验合法性。

客户端在 HTTP Header 中提交：X\-API\-Key: YOUR\_API\_KEY，然后 key: Annotated\[str, Security\(key\_header\)\] 表示从指定的安全依赖中取得 Key。

FastAPI 负责提取该凭证；示例中的 `verify(key)` 负责判断它是否有效。

- 声明类型：str 这个值是一个字符串。

- 声明来源：Security\(key\_header\) 它不从查询串来，而是由 APIKeyHeader\(name="X\-API\-Key"\) 从HTTP 头里取。

- 声明职责：函数体里 verify\(key\) 负责校验，框架不替你做这一步，FastAPI 只管把值取出来，管不管用是你的事。

**第四：执行函数并返回 JSON**

请求：GET /weather，city/units放在 query 参数

返回：Python Weather 对象序列化为 JSON

verify\(key\)return get\_weather\(city, units\) 服务器先检查凭证，再调用 Python 库函数。

返回的 `Weather` 对象由 FastAPI 序列化为 JSON 响应。

FastAPI binds the library function to a REST endpoint and documents its API key header\. 

FastAPI 将库函数绑定到 REST 端点，并且自动生成包含 API 密钥头的机器可读文档。即端点 \+ 说明书。

### 4\.3 OpenAPI：API 的机器可读说明书

#### 4\.3\.1 OpenAPI 的作用

有了 REST API，客户端已经可以调用天气服务。但 Agent 仍然需要知道：有哪些 Endpoint？使用 GET 还是 POST？参数叫什么？参数是否必填？数据类型是什么？如何认证？OpenAPI 就是用来描述这些信息的规范。

#### 4\.3\.2 OpenAPI 的结构

OpenAPI describes the HTTP operation; embedded JSON Schema describes its values\.

- OpenAPI 负责：HTTP 路径、请求方法、参数位置、安全方案

- JSON Schema 负责：类型、枚举、必填、默认值

- required 默认 false；in="query" 只是参数位置，**不等于必填**，二者相互独立。

- OpenAPI 是发布物，是框架自动生成的产物。

三部分：

1. Operation

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YWIwMDI3NDAwNDBiMjg0N2JiZjNiODM4MTFmMjA2MDBfZDU0MDVmNDI5MmY1ZjAzYjRhOTgxN2MxNDg1MzFlNmJfSUQ6NzY5NzIzMzc3NjcxMTYzNDQ2MV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

表示有一个 `GET /weather` 操作，其标识为 `get_weather`。

2. Parameters

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTgxNDEwZmRkMzQ0MDliZDFmZjQxN2U4YzJlZTM2OWNfMDZkZTI5N2E4ZDgwYmY1ZjI5ZTk4ODZlZTExNDFlMDdfSUQ6NzY5NzIzMzg5MzM0MjA3MjM0OV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

|**OpenAPI 字段**|**含义**|
|---|---|
|name|参数名称|
|in|参数的位置|
|required|参数是否必填|
|schema\.type|参数类型|
|schema\.enum|允许的取值|
|schema\.default|默认值|

`in: query` 表示参数来自 URL 查询字符串，并不代表该参数必填。

3. Security

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTdjNGNmMTFlOTVlYjM2ODJiYTc1ZDlhNGI2MzBkMTFfZDYzODk4NzJkN2U3ODdjOWJmMDQ2NGU1MWU1MDViYjBfSUQ6NzY5NzIzNDI2MDc0NjQ3Mjk5N18xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

- 认证方案是 API Key。

- API Key 位于 HTTP Header。

- Header 名称是 `X-API-Key`。

#### 4\.3\.3 OpenAPI 与 JSON Schema 的区别

|**OpenAPI**|**JSON Schema**|
|---|---|
|描述 HTTP API|描述 JSON 数据结构|
|HTTP Method|数据类型|
|URL Path|枚举值|
|参数位置|对象属性|
|认证方案|数据约束|
|请求和响应结构|数据格式与验证规则|

OpenAPI 可以在参数和请求、响应模型中使用 JSON Schema。

因此，课程中有一条重要的数据结构演变路线：Python Type Hints / Pydantic；FastAPI Response \& Validation；OpenAPI \+ JSON Schema；MCP Tool Input Schema。这解释了为什么已有的 OpenAPI 描述可以被 FastMCP 复用。

### 4\.4  curl 直连

#### 4\.4\.1 curl 的作用

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YThkOTgxZDg0NzY5MmExMGRlMzY1NDE5YjMwMDYyMGRfY2JlZmUzY2NjYmQyNzM5MTdlZmEyNDQ4OGNhMDJhMTdfSUQ6NzY5NzIzNTI2MTcwODYwMjkxNl8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

`curl` 是命令行 HTTP 客户端。

|**参数**|**含义**|
|---|---|
|\-sS|减少输出，同时保留错误信息|
|\-G|将数据参数添加到 URL Query|
|\-\-data\-urlencode|URL 编码参数|
|\-H|设置 HTTP Header|
|$WEATHER\_API\_KEY|从 Shell 环境变量读取密钥|

Agent 可以根据 OpenAPI 文档构造并执行这个命令。

#### 4\.4\.2 Agent 的三步调用过程

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MzU4ZjliNWRlZmM1NTQ1NTFlYjMxZWFjMzU2N2RjMDlfNWM2YjU3YTMxYTZlM2UzODcwYzJjMDZmNmY0YTQwYjNfSUQ6NzY5NjcxODY0MjU2OTkyNDEzMl8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

三个步骤及失败模式

|步骤|说明|典型失败|
|---|---|---|
|1 Read the API description|Select the operation and required parameters\.<br>读说明书，挑出要调哪个操作、需要哪些参数|读的是过期的文档，调用了一个已经不存在的操作或改了名的参数|
|2 Construct the command|The shell expands the environment variable; curl sends HTTP\.<br>shell 展开环境变量，curl 负责把 HTTP 发出去|环境变量没导出（展开成空串），请求带着空凭据打到服务端|
|3 Limit the credential|A coding agent with shell access may also read or misuse that secret\.<br>能进 shell 的智能体也能读到、甚至滥用密钥|凭据权限过大（不只读天气，还能改别的资源），一旦泄露损失放大|

Step 1  Read the API Description

读取 OpenAPI，找到正确的 Endpoint、参数和认证方式。

Step 2  Construct the Command

根据接口要求构造 curl 命令。

Shell 展开环境变量，curl 发送 HTTP 请求。

Step 3  Limit the Credential

尽量限制 API Key 的权限、有效期和使用范围。

为什么需要第三步？因为运行 curl 的 Shell 环境需要取得 API Key。如果 Agent 能在这个环境中任意执行 Shell 命令，就可能读取或滥用该凭证。

Tips：

与MCP路线的区别：同一个需求，两条路线的第一反应

REST 直连：怎么把命令写对。凭据问题被当成一个注意点，写在 Limit the credential。

MCP ：怎么让凭据不进入会执行代码的那一侧。所以它先引入服务端，再谈工具清单。

#### 4\.4\.3 安全问题的本质

存在凭证暴露风险：`WEATHER_API_KEY` 可由 Shell 访问。

这里并不是说 curl 不安全，而是说如果 Agent 的执行环境同时拥有广泛的 Shell 权限和敏感凭证，安全边界就比较弱。这为下一章 MCP 的凭证隔离设计提供了动机。

### 4\.5 本章小结

本章建立了下面这条链路：

Python Library → FastAPI → REST API → OpenAPI → curl / HTTP Client

它解决了三个核心问题：

1. 如何让内部函数能够被远程调用。

2. 如何让机器理解 API 的调用方式。

3. Agent 如何直接调用 HTTP API，以及这种方式可能带来的凭证风险。

三步流程：

1. Read the API description：读取 OpenAPI 文档，选择操作、确定参数

2. Construct the command：shell 展开环境变量，curl 发送 HTTP 请求

3. Limit the credential：密钥暴露在 shell 环境，一旦泄露风险高；只能做最小权限限制，无法完全隐藏。限制它的最小权限、短期有效、随时可撤销。

Direct REST access is simple, but the agent's shell receives the API credential\. 

核心结论：直接访问 REST 简单，但智能体所在 shell 会拿到 API 凭据，存在密钥泄露风险。

MCP 诞生的核心动机：不让密钥落到 shell/agent 一侧，把凭据放在服务端。

六组对照（Part4\&5）：

|**关键词**|**必须理解的内容**|
|---|---|
|Library API → REST API|从进程内部调用变成网络调用|
|FastAPI → OpenAPI|从 HTTP 服务变成机器可读的接口描述|
|OpenAPI → FastMCP|从 REST 操作变成 MCP 工具|
|MCP Host → Client → Server|AI 应用与外部工具的通信架构|
|tools/list → tools/call|先发现工具，再执行工具|
|MCP Key → Upstream Key|客户端认证与上游认证分离|

## Part 5 Model Context Protocol

### 5\.1 MCP 基础概念

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDA2Y2ZkYzdmMWU1ODY5MGMwODgzNzUzMTQ2MTU4OWVfZjAxM2M4NGQ3ODliY2NmY2Y4MjYzNmZiNGU5ZjMyYzlfSUQ6NzY5NjcyMjEyMTUxMDcxOTAxMl8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

核心问题：假设有 N 个 AI 应用和 M 个外部工具，如果每个 AI 应用都需要单独适配每个工具，可能产生 N × M 套集成工作。例如：Without MCP：不同 AI 应用分别适配不同工具；MCP 通过标准化工具接口减少重复适配。

即在没有MCP之前，连接 N 个大模型 \(LLM\) 和 M 个外部工具 / 数据源，是 N×M 的全连接问题。每一个 LLM 都要单独对接每一个工具，对接成本随数量爆炸式增长。

解决：With MCP：使用统一协议进行工具集成，课程使用 N→1→M 来描述这一思想。但要注意，它表示的是统一接口标准，而不是所有工具必须经过同一个中央服务器。实际系统可以包含多个 MCP Server。

即引入 MCP，MCP 将 LLM 和外部工具之间的通信标准化，变成 N→1→M 的星形架构：所有 LLM 只对接 MCP 中间层，MCP 再统一对接所有外部工具；大幅减少集成工作量。

MCP 的主要作用是：

- 统一工具发现方式。

- 统一工具调用方式。

- 减少重复集成工作。

- 支持不同类型的外部能力。

- 允许通过服务端隔离上游凭证。

MCP 不是 REST API 的必要替代品。

对于只需要调用少量 HTTP API 的简单系统，直接使用 REST 也完全合理。

### 5\.2 MCP 的架构：Host、Client、Server

架构：客户端 \- 服务器模型（Client\-Server）

三个角色

|角色|本质|作用|
|---|---|---|
|host|一个应用／进程|承载模型循环与用户界面，持有多个client|
|client|一条连接的连接器|只负责把 host 的意思翻译成 MCP 报文并送出去|
|server|一个能力提供方|把外部的工具与数据源按 MCP 暴露出来|

host 并不是服务端：host 与 server 方向正好相反：host 在客户端一侧，server 是提供能力的一方。MCP is an alternative agent\-facing interface 里的 agent\-facing，指的正是 host 这一侧看到的东西，接口是给 host 里的智能体用的。

- **MCP Client**：需要调用工具 / 读取数据的 Agent（嵌入在 AI 主机 / LLM 应用内部）

- **MCP Server**：对外暴露外部工具、数据源的服务，包装底层能力给 LLM 调用

- **MCP Host**：承载 LLM \+ MCP Client 的 AI 应用程序（如 Claude、DeepSeek 这类 AI 应用）

- **Without MCP**：LLMs 和工具两两直连，网状结构；With MCP：所有 LLM 连接 MCP 中间节点，MCP 再连接全部外部工具

Tips：工具（tool）是可以被调用的动作，资源（resource）是可以被读取的数据。

#### 5\.2\.1 MCP Host

Host 是承载 AI 应用的整体环境，它可以管理多个 MCP Client。例如：

```Plain Text
AI Application
├── LLM
├── MCP Client A
└── MCP Client B
```

#### 5\.2\.2 MCP Client

MCP Client 负责：与 Server 建立连接；发现工具；发送工具调用请求；接收工具结果。需要注意，MCP Client 不等于 LLM。LLM 负责推理和工具选择，Client 负责实际协议通信。

#### 5\.2\.3 MCP Server

MCP Server 负责暴露外部能力。

例如：文件系统工具；数据库查询工具；GitHub 操作工具；REST API 封装工具；MCP Server 可以部署在本地，也可以部署在远程。

### 5\.3 MCP的两种传输方式

MCP is an alternative agent\-facing interface—not that is not a requirement for calling REST APIs\.

MCP 是一个面向智能体的替代接口，它并不是调用 REST API 的必要条件。

MCP Host（AI 应用）可以同时创建多个 MCP Client，分别对接不同类型 MCP 服务：

1. Client A → LOCAL: STDIO Filesystem server（本地文件系统 MCP 服务）

2. Client B → REMOTE: HTTP Sentry server（远程 HTTP 的 Sentry 服务）

MCP 是面向 Agent 的接口方案；不是调用 REST API 的必需替代品，是一套上层封装协议。

|元素|层级|
|---|---|
|MCP HOST|宿主机：跑 AI 应用的整体|
|AI application|宿主机里的应用：AI 应用本身|
|Client A / Client B|客户端：host 内部为每一个服务端各开一个客户端|
|LOCAL: STDIO \+ Filesystem server|服务端与传输：本地服务端，走 STDIO（标准输入输出）|
|REMOTE: HTTP \+ Sentry server|服务端与传输：远程服务端，走 HTTP|

host 与 client 之间是一对多的关系。host 里同时挂着多个客户端，每个客户端各管一条连接，互不干扰。而 client 与服务端之间是一对一的。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Njk2NzYzODQ2NjE0MzliZjkwMTE5M2MyMzVkNzcyNDVfYTFhMDQ2MTRkMjg0MDkzNTBkMmJhOTBhNGUzZTY5YTRfSUQ6NzY5NjcyNDY2OTEyMjU2MzYyMl8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

stdio 是 Standard Input / Standard Output。

典型特点：通过本地进程的标准输入输出通信；通常不需要网络端口；适合本地文件、开发工具等能力。

HTTP Transport 用于通过 HTTP 进行 MCP 通信。

典型特点：可以连接远程服务器；支持网络部署；可以结合 HTTPS 和认证机制。

重点：MCP 定义上层交互协议，stdio 和 HTTP 是承载消息的传输方式。

同一个 Host 可以同时连接使用不同 Transport 的 MCP Server。

|传输|配对例子|它在哪一侧|适合什么|
|---|---|---|---|
|LOCAL：STDIO|Filesystem server|同一台机器上|本地文件、本地进程这类不出机器的能力|
|REMOTE：HTTP|Sentry server|远端|第三方服务、SaaS 平台这类跨网络的能力|

传输方式不是偏好，是被能力的位置决定的。比如Filesystem server（文件系统服务端）要读的是本机文件，把它放到远端反而多绕一圈，所以走STDIO，而 Sentry server（Sentry 是一个 SaaS 错误监控平台）本体就在网上，所以走 HTTP。

所以，同一个 host 里两种传输可以并存，这正是 client\-server model 的价值：接口统一，底下的连接方式可以不同。

### 5\.4 MCP 完整调用流程（时序图）

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2IzMTg2OWNjYTM4Mzk2MTdmYjQ4ZjgyNTgyODM1MjNfNzcxNDc2N2NmM2RhMDcxNTNkMDMyNDdjOWU4MjA0ODRfSUQ6NzY5NzIzNzcxOTQ5MTMxNzI4NV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YzJlYjhmNTA0OTc3YjAxMmZmODgxNjlhMmIzMDMyOTlfZDY0ODc0MjEwZjdkOWZiZWQ4OWY1M2Q2NjAwOWE5OTdfSUQ6NzY5NzIzNzc2NzQwMjYzODg4NV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

对应课程时序图的十个步骤：

1. User 向 MCP Host 输入 Query。

2. LLM 根据问题选择工具。

3. 模型输出工具调用信息。

4. Host 根据策略决定是否需要用户审批。

5. MCP Client 向 MCP Server 发送请求。

6. MCP Server 执行工具或调用第三方 API。

7. 底层工具产生结果。

8. MCP Server 将结果返回 Client。

9. Host 将工具结果提供给 LLM。

10. LLM 生成最终自然语言回答。

注意，用户审批是可能出现的安全控制，不是每次调用都必须发生。

#### 5\.4\.1 两个关键 MCP 方法

工具发现：tools/list，用于获取服务器提供的工具及其 Schema。

工具调用：tools/call，用于指定工具名称并传入参数。

例如：

```Plain Text
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "city": "Pittsburgh",
      "units": "F"
    }
  }
}
```

### 5\.5 MCP 三元素的关系

MCP is an alternative agent\-facing interface—notn't a requirement for calling REST APIs\.

MCP 是一个面向智能体的替代接口，它并不是调用 REST API 的必要条件。

MCP Host（AI 应用）可以同时创建多个 MCP Client，分别对接不同类型 MCP 服务：

1. Client A → LOCAL: STDIO Filesystem server（本地文件系统 MCP 服务）

2. Client B → REMOTE: HTTP Sentry server（远程 HTTP 的 Sentry 服务）

MCP 是面向 Agent 的接口方案；不是调用 REST API 的必需替代品，是一套上层封装协议。

|元素|层级|
|---|---|
|MCP HOST|宿主机：跑 AI 应用的整体|
|AI application|宿主机里的应用：AI 应用本身|
|Client A / Client B|客户端：host 内部为每一个服务端各开一个客户端|
|LOCAL: STDIO \+ Filesystem server|服务端与传输：本地服务端，走 STDIO（标准输入输出）|
|REMOTE: HTTP \+ Sentry server|服务端与传输：远程服务端，走 HTTP|

host 与 client 之间是一对多的关系。host 里同时挂着多个客户端，每个客户端各管一条连接，互不干扰。而 client 与服务端之间是一对一的。

### 5\.6 FastMCP：将 OpenAPI 映射成 MCP Tools

#### 5\.6\.1 FastMCP

如果已经有 REST API 和 OpenAPI 文档，就不一定需要重新编写一套工具定义。x

默认行为：FastMCP 会把 OpenAPI 里每一条路由，自动变成一个可被 LLM 发现的 MCP 工具。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=N2IyZTc5NDYyY2JjNjgyZWQ0ZGIzYTZkNzkzMzQxMDFfNmEwYjk4YjlkM2RjOTNhODU2ZjM5OWQ5Y2VlZWYyMzJfSUQ6NzY5NzIzOTQzNjA4NTQ5NzM4Ml8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

执行逻辑：

1. 使用 `httpx.get()` 获取 OpenAPI 文档。

2. 解析文档中的 API 描述。

3. 创建用于访问原始 REST API 的 HTTP Client。

4. 通过 `FastMCP.from_openapi()` 构建 MCP Server。

5. 将 OpenAPI 操作映射为 MCP 能力。

#### 5\.6\.2 自动映射的优点

- 复用已有 OpenAPI 描述。

- 减少重复编写工具 Schema。

- 降低 REST API 与工具定义不一致的风险。

- 适合快速接入已有服务。

#### 5\.6\.3 自动映射的局限

问题一：工具数量可能过多

如果 OpenAPI 包含上百个操作，自动映射可能产生大量 MCP 工具。这会增加工具发现、上下文管理、模型选择和权限管理的复杂度。同时放大四类代价：延迟（latency）；成本（token / 计费 cost）；失败概率（failure rate）；安全风险（risk）

问题二：接口名称不一定适合 LLM

仅做结构层面映射，不做语义优化 映射只看 OpenAPI 结构，不理解业务语义。

接口命名清晰（如GET /weather）：自动生成的工具 get\_weather 效果很好；

接口命名模糊、语义不清：转换后的工具，LLM 很难判断什么时候该调用，选择准确率下降。

适合场景：API 接口数量少、接口命名清晰规范的场景，自动映射性价比很高。 当接口数量庞大时，自动映射只是第一步，生成工具列表之后，必须额外增加一层筛选、分组能力，精简暴露给 LLM 的工具集合。

例如：GET /weather，转换成：get\_weather 含义非常清晰。但如果原始 API 命名不规范：POST /v2/action/process 即使成功转换，LLM 也未必能判断什么时候应该调用它。

因此，实际工程中可能需要：

- 筛选工具。

- 改善工具名称和描述。

- 按业务场景分组。

- 对敏感操作设置权限。

注意：具体默认映射行为取决于 FastMCP 的版本与配置，不能笼统认为任何版本都会把所有路由无条件暴露为工具。

### 5\.7 Credential Separation：独立凭证机制

#### 5\.7\.1 独立凭证的作用

直接 REST 调用的问题

Agent 的执行环境需要取得上游 API Key。

使用 MCP 后

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZjI4ZmM0ZDk1NTY2MzZlODMxYzliMGY2NGNmYzMwNzRfNTRmNzE0M2QwNTViNTcxYmI1MTE2Mjc2YWM0NzZlZTlfSUQ6NzY5NzI0MzkyMDEyOTQ2MTc5OF8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YmYxZjgwYTkwNzAwOTYxNmU4ZjhhNzYzNWRmYWVmNmRfNGVjN2U4YzM2Njc1NzE4NDJiNDJiOGM5ODJhMDA1NWZfSUQ6NzY5NzI0NDM5Njc2ODcxMDE4Ml8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

||**MCP\_API\_KEY**|**UPSTREAM\_API\_KEY**|
|---|---|---|
|使用者|MCP Client|MCP Server|
|验证方|MCP Server|REST API Server|
|保护对象|MCP 服务入口|上游 API|
|是否需要交给模型|不需要|不需要|

#### 5\.7\.2 Server 端代码

核心思想：MCP 客户端密钥 和 上游第三方 API 密钥互相隔离，MCP Server 作为中间代理，做凭证中转。

MCP Server 启动：两套密钥

- UPSTREAM\_API\_KEY：用来调用上游第三方 API（天气服务）

- MCP\_API\_KEY：用来保护 MCP 服务端点，供 MCP 客户端接入

> 教学演示使用静态 token；生产环境推荐 JWT 或者 OAuth。
> 
> 

代码可以分成三个逻辑模块：

模块 A：上游 HTTP Client，使用 `UPSTREAM_API_KEY` 访问原始天气 API。

upstream = httpx\.AsyncClient\(\.\.\.\)

模块 B：MCP Authentication，验证 MCP Client 提交的凭证。

mcp\_auth = StaticTokenVerifier\(\.\.\.\)

模块 C：MCP Server，把工具映射、上游 HTTP Client 和 MCP 认证机制组合起来。

mcp = FastMCP\.from\_openapi\(\.\.\.\)

#### 5\.7\.3 Client 端代码

MCP Client 侧：只持有 MCP 密钥

凭证代理（Credential brokering）

- Agent/Harness 只持有 MCP key，不知道上游 API 密钥

- MCP Server 负责：验证 MCP 客户端身份 → 授权 → 使用独立的上游密钥去调用第三方 API

- 优势：大模型本身看不到任何上游密钥，密钥不会暴露给 LLM，安全隔离。

两个关键调用：

await client\.list\_tools\(\)，发现工具。

await client\.call\_tool\(\.\.\.\)，执行工具。

整个过程中，Client 不需要获取 `UPSTREAM_API_KEY`。这就是 Credential Brokering（凭证代理）。

#### 5\.7\.4 安全边界

Separate credentials allow the MCP server to mediate access rather than forward its upstream secret\. 

独立凭证让 MCP 服务器充当访问中介，而不是把上游密钥转发出去。

Agent 不知道上游 API Key不等于Agent 完全接触不到任何凭证。MCP Client 仍然持有 MCP\_API\_KEY。如果 Agent 拥有对该客户端环境的广泛访问权限，这个凭证也可能暴露。

所以，MCP 可以把上游凭证隔离在 Server 端，但 MCP 本身并不自动保证所有凭证安全。生产环境还需要身份认证、细粒度授权、最小权限、密钥轮换和审计等措施。

两套凭据：upstream 与 MCP

|变量|保护的是|读法|
|---|---|---|
|UPSTREAM\_API\_KEY|MCP 服务端 → 天气 API 这一段|上游凭据|
|MCP\_API\_KEY|客户端 → MCP 服务端这一段|入口凭据|

UPSTREAM\_API\_KEY authorizes API calls; MCP\_API\_KEY protects the MCP endpoint\.

UPSTREAM\_API\_KEY 授权对上游 API 的调用；MCP\_API\_KEY 保护 MCP 端点本身。

前者是 authorizes（授权对外发起调用），后者是 protects（保护自家入口）。 

### 5\.8 REST API 与 MCP 的最终对比

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjczNjMwMjVkOTUyODA1ZGQ2N2E1YmY4ODFkMjM0MGVfNjM1NzVkY2E2ZDkzNDUyOGY2MGQ1MzNmNDE3NjJkMmJfSUQ6NzY5NzI0NTU1ODk5MzQ0MDI5MV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

|**维度**|**REST API / OpenAPI**|**MCP**|
|---|---|---|
|Shared|名称、描述、JSON Schema|名称、描述、JSON Schema|
|Discovery|获取 OpenAPI 文档|tools/list|
|Invocation|HTTP Method \+ Path \+ Parameters|tools/call|
|Authentication|Client 向 API 认证|Client 向 MCP 认证，上游认证可以独立|
|Scope|描述 HTTP 操作|Tools、Resources、Prompts 等|

重点一：Shared Schemas

REST API 和 MCP 可以共享结构化输入的 Schema 信息。

因此，FastMCP 才能利用 OpenAPI 生成工具定义。

重点二：不同的 Discovery

REST API：GET /openapi\.json，REST 客户端通过 API 描述了解操作。

MCP：tools/list，MCP Client 通过协议发现 Server 当前提供的工具。

重点三：不同的 Invocation

REST：GET /weather?city=Pittsburgh\&units=F，REST 使用 HTTP 方法、路径和参数。

MCP：tools/call\( name="get\_weather", arguments=\{\.\.\.\} \)，MCP 使用统一的工具调用接口。

重点四：不同的 Authentication Boundary

直接 REST 调用：Client → REST API 

MCP 代理方案：Client → MCP Server → REST API

后者可以把客户端认证与上游认证分开。但这种凭证隔离是一种可采用的架构设计，不是 MCP 独有或自动提供的安全保证。

重点五：不同的 Scope

OpenAPI 主要描述 HTTP API。MCP 除了 Tools，还支持 Resources 和 Prompts 等能力。

|**MCP 能力**|**主要用途**|
|---|---|
|Tools|执行操作|
|Resources|提供上下文数据|
|Prompts|提供可复用的提示模板|

## Part 6 Multiple Tool Calls：串行、并行与依赖

前面我们学习了 Agent 如何发现和调用一个外部工具，现在要解决新的问题：当 Agent 需要调用多个工具时，应该一个接一个执行，还是同时执行？如何减少延迟，同时保证执行结果正确？

五个递进的知识模块：

1. Serial Tool Calls：为什么串行调用很慢？

2. Parallel Tool Calls：并行如何减少模型生成轮数和等待时间？

3. Dependencies：哪些工具可以并行，哪些必须串行？

4. Concurrent Execution：如何用 `asyncio.gather()` 实现并发？

5. Call ID \& Result Matching：多个结果如何正确对应原始调用？

### 6\.1 Serial Tool Calls：串行调用的代价

#### 6\.1\.1 串行工具调用

Serial Tool Calls 指多个工具按照先后顺序执行。

在最基本的串行模式中，Agent 每次生成一个工具调用，等待工具执行完成，再根据返回结果继续生成下一次调用。

课程使用三个工具作为例子：

- Weather：查询天气。

- Calendar：读取日历。

- Flight：查询航班。

串行执行流程如下：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTNhNTAyNjEwOWMwOTRlOTU0OWRmMmY1OGU0OTUwZGVfNzIyZDIyNmUxMzVkMmE5ZmU2ZDdmNDEyNzk5ODQ4YzRfSUQ6NzY5NzI0OTU4MzM3MTA5NTU4OV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

#### 6\.1\.2 四次 Generate

一次工具调用通常经历：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Nzk4ZWExNzE0YTg1ZWE5OTdmYmU5MTc5MjRjMzQxNjdfNjUwZGQ1NTBmMWRjZGM1MjgwNzE3MzZmNTAwOGE1YmVfSUQ6NzY5NzI0OTkyMDQzNjMyNTkyM18xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZThmODhjNmUwOTk0NWEyOWRhMWFmYTM2OTc2Y2ViNmZfMGFiYzZiMTQ2NzBmMmYwYTM3ZTc4YThkNTg2NzVlNDRfSUQ6NzY5NzI1MDAzMTg2NjUxNDk3OV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

在课件的串行模式中：

- 第一次 Generate：决定调用 Weather。

- 第二次 Generate：读取天气结果，决定调用 Calendar。

- 第三次 Generate：读取日历结果，决定调用 Flight。

- 第四次 Generate：读取航班结果，生成最终回答。

因此，这个例子中：3 次串行工具调用需要 4 次模型生成。如果每轮只调用一个工具，并且每次结果返回后都重新调用模型，那么：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDI4YTdjMjA1ZGQwYzM3YmYwMjliMzRiMmU5NTAyZmJfNTBmNmQzMWMxMDkyYTY0M2YzODVmNGM2N2ZjM2U1ZjBfSUQ6NzY5NzI1MDIyMjgwNzk0NDc0MV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

这是一种特定串行执行模式下的公式，不代表所有多工具系统都必须这样运行。

#### 6\.1\.3 串行调用的代价

串行调用的延迟来自两个部分。

1. Model Generation Cost 模型生成本身需要时间。

2. Tool Waiting Cost 模型需要等待工具完成，才能继续下一步。

因此，仅仅优化工具速度还不够。如果三个工具都能瞬间完成，仍然需要四次模型生成，总计 3\.2 秒。

串行代价的三层结构

- 生成不可重叠：四次生成各 0\.8s，串行时只能排队，合计 3\.2s。

- 等待不可隐藏：工具执行时模型在空等，那 3\.2s 里没有任何计算在推进。

- 失败会放大：链条上任何一环变慢或出错，后面全部顺延；串行的链条越长，尾部风险越大。

### 6\.2 Parallel Tool Calls：并行工具调用

#### 6\.2\.1 并行的核心思想

如果多个工具互不依赖，Agent 可以在同一次模型生成中提出多个工具调用，再由执行环境并发运行它们。

例如：用户希望获得天气、日历和航班信息。这三个查询在输入已经确定、且彼此独立的情况下，可以同时执行。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWI1YjcxYjVkOTM1OTI5ZTQ3NmNiNDRmYWQwMWMwN2JfYTY3ZTMxOTI3MDQzNDhiZjI5ODA4NzU2NjVkZTQ2MjBfSUQ6NzY5NzI1MTE2NzA0NjI1ODIwNV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

#### 6\.2\.2 两次 Generate

串行模式：Generate → Weather；Generate → Calendar；Generate → Flight；Generate → Final Answer

并行模式：Generate → \[Weather, Calendar, Flight\]→ Collect Results；Generate → Final Answer

因此，课件中的并行模式只有两个模型生成阶段，中间不再需要为每个独立工具分别进行一次模型生成：

1. 第一次 Generate：同时产生三个工具调用。

2. 第二次 Generate：读取全部工具结果，生成最终回答。

#### 6\.2\.3 并行总耗时的计算

在课件的理想化模型中：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjRmMWJlMDYzYmI3NDY1ZjA0YjRlMzM1YzMxZDQxZmFfYWE0M2E3OTRiYTljZGNlZjY4NjBmODJlNzVkYmUzMTBfSUQ6NzY5NzI1MTU0Nzg4OTI3NDQwNl8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

因为三个工具同时执行，最终需要等待的是耗时最长的那个工具 max\(\)。

例如：Weather：1\.2s；Calendar：0\.9s；Flight：1\.1s

三个工具一起开始，Calendar 最先完成，Flight 随后完成，Weather 最后完成。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDM5MjZiMDFkYWEzNjhkYjVmMjlkNjIyNzA1ZTYzYzZfZmQ1MTM4MzJmMGQ5MTkyMmY1YzBjODEzNjU1NDYxYzhfSUQ6NzY5NzI1MTYwNTEzNzA4Mzk0Ml8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

这个公式假设工具能够同时启动、没有额外调度开销，而且模型生成与工具等待没有其他重叠。

#### 6\.2\.4 串行与并行性能对比

所以并行优化有两个来源：减少模型生成轮数 \+ 重叠工具等待时间。

需要特别注意：并行没有让 Weather 从 1\.2 秒变成更短，它只是让 Weather、Calendar 和 Flight 的执行时间互相重叠。

#### 6\.2\.5 并行的性能瓶颈

并行总耗时由最慢的分支决定。如果三个工具耗时分别是：Weather: 1\.2s；Calendar:  0\.9s；Flight:  1\.1s。那么优先优化 Calendar，可能对整体完成时间没有帮助，因为 Weather 仍然需要 1\.2 秒。只有降低最长分支，或改变关键路径，才可能进一步降低这批调用的完成时间。

结论：并行的价值不是让单个工具变快，而是减少串行往返，并让独立工具的等待时间重叠。

### 6\.3 Dependencies 并行条件

Parallelize only independent, safely concurrent calls\.

即：只并行那些相互独立、并且能够安全并发执行的调用。

#### 6\.3\.1 可以并行: Independent Calls

Weather for Pittsburgh; Read today's calendar; Look up flight status

如果三个工具所需的输入已经确定，它们不需要等待彼此的输出。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OWUwMDNmNzU0N2U2ZjI5MWI2MDI0M2ZiYWM2MDg4NWZfNmY5NzA0ZjBlNjNkNjZjZmU2NmQ4ZmMyYjY4ODk0MDdfSUQ6NzY5NzI1MjQ3NTk0MTkzMjU3OV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

#### 6\.3\.2 必须串行: Dependent Calls

Find customer ID; Use ID to fetch orders; Refund selected order

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OGVlNTFkNDcwOTY0NGVkNzk1YTZkNjAzM2U4MjU2YWVfMzZlNTk3MjUwYjBmYTkwNDE5NzlmNDMxMTUzNWY2OGJfSUQ6NzY5NzI1Mjc3ODgxNjc1MzE4OF8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

因为第二步需要第一步返回的 `customer_id`，第三步又需要前面查询并选择出的订单信息。在第一步完成之前，第二步所需的输入还不存在。因此，它们存在 Data Dependency（数据依赖）。

#### 6\.3\.3 三种常见依赖

- 数据依赖：后一步的参数来自前一步的返回值（ID → orders）。

- 控制依赖：后一步是否执行取决于前一步的结果（查不到客户，就不该发起退款）。

- 副作用依赖：后一步改变的状态必须建立在前一步已提交的状态之上（先退款、再记账）。

|**类型**|**定义**|**示例**|
|---|---|---|
|Data Dependency|后一步需要前一步的输出|获取客户 ID → 查询订单|
|Control Dependency|后一步是否执行取决于前一步结果|查询是否有库存 → 决定是否下单|
|Side\-effect Dependency|多个操作会影响共享状态或执行顺序|更新余额 → 记录交易|

第三种尤其重要，因为没有数据依赖，不代表并发一定安全。

例如：Tool A: Withdraw $100; Tool B: Withdraw $200

两个调用可能都知道账户 ID 和金额，不需要彼此提供参数。但如果同时修改同一账户余额，且底层系统没有正确处理并发，就可能产生 Race Condition（竞态条件）。因此，并行判断至少需要检查：

- 输入是否已经全部确定。

- 一个调用是否依赖另一个调用的结果。

- 多个调用是否会修改共享状态。

- 底层服务是否支持安全并发。

#### 6\.3\.4 真实任务通常是混合执行

不是所有任务都必须完全串行或完全并行。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2U3NGI4N2ViMGM1NDlhZDYzOTBhNWMyOTNiYThmMWJfY2VlNzUyOThjM2FkMDQzMmY3NzRmMTAyMTZhMWRmYWZfSUQ6NzY5NzI2ODcwNjM4NDE4NjkxN18xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

在这个例子中：

- Weather 可以与 Find Customer ID 并行。

- Fetch Orders 必须等待 Customer ID。

- Refund Order 必须等待订单查询与必要确认。

这种结构可以理解为一个有向依赖图（Dependency Graph）。工具调用的执行顺序由依赖关系决定，而不是简单地由工具数量决定。

### 6\.4 Concurrent Execution：使用 asyncio 实现并发

前面解释了什么时候应该并行，现在看代码如何实现。课程使用 Python 的 `asyncio.gather()`。

#### 6\.4\.1 课程代码

```Plain Text
import asyncioimport json
async def execute(call):    //定义一个 Coroutine Function（协程函数）。
调用它会得到协程对象，可以由 asyncio 事件循环调度执行。
args = json.loads(call.arguments)    //解析参数,假设模型返回的参数是 JSON 字符串
value = await TOOLS[call.name](**args)    //根据名称选择工具,通过工具名称查找对应函数,传递参数并等待工具结果
return call.call_id,  //保留 Call ID
valueresults = await asyncio.gather(    
*(execute(call) for call in function_calls),    
return_exceptions=True,
)
```

这里假设：

- `TOOLS` 是工具名称到异步函数的映射。

- `function_calls` 包含本轮需要执行的工具调用。

- 每个 `call` 有 `name`、`arguments` 和 `call_id`。

### 6\.5 asyncio\.gather\(\)：一次调度多个协程

#### 6\.5\.1 gather 的作用

```Plain Text
results = await asyncio.gather(    
*(execute(call) for call in function_calls),    //为每个工具调用创建一个协程
//* 将这些协程展开，作为多个位置参数传给 gather()
return_exceptions=True,)
```

`asyncio.gather()` 可以并发运行多个可等待对象，并等待它们完成。

#### 6\.5\.2 并发完成顺序可能不同

假设同时执行：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjgzZjQyMDdjZDJkMzZmZTZkYzk1Y2U1MzNmMzQ2YjdfYjgyMjM2ODc4MzFhYzgxM2NiZDNiYzVlYTVkZTM1ZTdfSUQ6NzY5NzI3MDUzNDE4MjMwOTQxMV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

`asyncio.gather()` 返回的结果顺序与输入的协程顺序一致，而不是与实际完成顺序一致。并发执行时，谁先跑完谁先回来，这个顺序是不确定的。工具响应时间不同、网络抖动，都会改变完成次序，结果乱序完成时，要靠 ID 把它们对回原调用。

例如，输入顺序为：\[execute\(weather\),    execute\(calendar\),    execute\(flight\),\]，那么 `gather()` 返回的结果仍然按照：\[weather\_result,    calendar\_result,    flight\_result,\] 排列，即使 Calendar 最先完成。

因此，不能根据位置匹配 gather 返回结果，对于同一次 `gather()` 调用，只要保留原始输入顺序，位置对应关系是有保证的。但在完整 Agent 系统中，仍然应该保留 Call ID，因为工具结果需要与协议层的原始调用关联，不能依赖偶然的执行或消息顺序。

#### 6\.5\.3 Call ID 

例如：return call\.call\_id, value

可以产生：\[\("call\_001", weather\_result\),    \("call\_002", calendar\_result\),    \("call\_003", flight\_result\),\]

三个主要作用：

- Result Matching：把结果与原始工具调用配对。

- Traceability：在日志中追踪某次调用。

- Error Handling：将错误与具体调用关联。

在采用工具调用协议的系统中，返回结果通常需要携带与原始调用对应的标识符。

#### 6\.5\.4 return\_exceptions=True 的作用

return\_exceptions=True

表示某个协程抛出异常时，`gather()` 将该异常作为对应位置的结果返回，而不是立即把它作为整个 `gather()` 的异常抛出。

例如：\[weather\_result,    TimeoutError\(\),    flight\_result,\]

这样，Calendar 失败不一定阻止其他两个工具完成。但异常对象不会自动变成成功的工具结果。执行环境仍然需要识别异常，并构造对应的错误响应。

### 6\.6 总结

|**维度**|**Serial Tool Calls**|**Parallel Tool Calls**|
|---|---|---|
|执行方式|依次执行|同时发起独立调用|
|模型生成|可能需要多轮|可以在一轮生成中提出多个调用|
|工具等待|耗时累加|主要由最慢工具决定|
|依赖处理|自然满足先后依赖|必须提前检查依赖|
|执行实现|顺序 await|asyncio\.gather\(\) 等|
|结果配对|使用 Call ID|同样需要 Call ID|
|课件耗时|6\.4s|2\.8s|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZmE1ODNiMjZmMDE3MDA4ZjI2MzIwNWI1MTc4MWExZDJfNTAwOTdlZmM2NWNhNzNlODM2MWVmOGI5ZTkwYzc3ZmFfSUQ6NzY5NzI3MjI0MTEzODEyNjM3Ml8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

其中：

- $N$：工具数量。

- $G$：每次模型生成耗时。

- $T_i$：第 $i$ 个工具的执行时间。

1. Serial Calls：多个工具依次执行，会累加模型生成时间和工具等待时间。

2. Parallel Calls：独立工具可以在同一轮生成中提出，并发执行以降低延迟。

3. Dependencies：只有相互独立、并发安全的调用才能同时执行。

4. Concurrent Execution：Python 可以使用 `asyncio.gather()` 并发运行异步工具。

5. Call ID：工具结果必须能与原始调用正确对应，尤其是在异步和并发系统中。

这章最核心的思想是：优化多工具调用，不是盲目地把所有工具同时运行，而是根据依赖关系，在保证正确性的前提下，尽量减少不必要的模型生成轮数和等待时间。

它与前面 REST API、MCP 两章的关系也很清晰：

- REST API 解决如何通过网络调用工具。

- MCP 解决 Agent 如何标准化地发现和调用工具。

- Multiple Tool Calls 解决 Agent 如何高效、正确地组织多个工具调用。

## Part 7 Evaluating Tool Use

前一章解决的是如何让 Agent 高效、正确地组织多个工具调用？这一章进一步讨论我们如何判断一个 Agent 的工具使用能力到底好不好？评估不能只看最终答案是否正确，还要检查它有没有选对工具、传对参数、安排好调用顺序，以及在真实运行环境中是否足够快、稳定、安全。

本章知识框架

1. Benchmark：考什么？BFCL 的四类测试场景

2. Evaluation Levels：在哪一层判断对错？Selection → Arguments → Trajectory → Task

3. Operational Quality：真实运行表现如何？Efficiency · Reliability · Safety

4. Failure Attribution：错误来自哪里？Model · Harness · Provider / Tool

5. Production Evaluation：真实数据怎么看？Provider Tool\-call Error Rates

6. Layered System：整讲知识 Capabilities → Mechanics → Constraints → Interfaces → Systems

### 7\.1 BFCL：工具调用能力的四类测试

Berkeley Function Calling Leaderboard 是用于评估大语言模型 Function Calling 能力的基准测试。

核心问题：模型能不能在不同场景下正确使用工具？

课件将测试场景分为四类：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NWRlMzJhMjM3YWNkZmU5MDE0NGYyZTQ2ZTg0ODJkYzdfZTZlNzkyMTFlNjJiZmRlNGI3ZGM1MzA5YWQxYmEwMGVfSUQ6NzY5NzI3NDYyMjk4MjUyNDQ1M18xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

#### 7\.1\.1 Single Turn：单轮工具调用

Single Turn 评估模型在一次交互中生成正确工具调用的能力。

例如：

Simple: 调用单个工具

get\_weather\(city="Paris"\)

Multiple: 一次生成多个工具调用

get\_weather\(city="Paris"\)

get\_calendar\(date="today"\)

Parallel: 同一工具的多个独立调用

get\_weather\(city="Paris"\)

get\_weather\(city="London"\)

get\_weather\(city="Tokyo"\)

Multiple\-parallel: 多种工具的多个并行调用

get\_weather\(city="Paris"\)

get\_weather\(city="London"\)

get\_calendar\(date="today"\)

get\_flight\(flight\_no="AF123"\)

这里需要区分：

Single Turn 中的 multiple 和 parallel 都涉及多个调用，但 parallel 特别强调同类调用的独立并发场景；multiple\-parallel 则组合了多工具和多次调用。这与 Part 6 的 Parallel Tool Calls 直接对应。

#### 7\.1\.2 Multi\-turn：多轮工具调用

Multi\-turn 评估模型在多个交互步骤中能否持续正确使用工具。

课件列出四个子任务。

1. Base：基本多轮任务

评估模型能否利用上一轮工具返回的信息继续执行。例如：

```Plain Text
User: 帮我查一下客户订单
Agent → find_customer()
Tool  → customer_id
Agent → get_orders(customer_id)
Tool  → order_list
Agent → Final Answer
```

2. Missing Function：缺少必要工具

例如用户要求：“帮我给客户退款。”但系统只提供：

```Plain Text
TOOLS = {    
"get_customer": ...,    
"get_orders": ...
}
```

没有退款工具。模型不应该编造一个不存在的 `refund_order()` 调用。

3. Missing Parameter：缺少必要参数

例如：

```Plain Text
get_flight_status(flight_number)
```

用户只说：“帮我查一下航班状态。”却没有提供航班号，也没有其他信息可以确定航班。正确行为通常是请求补充必要信息，而不是随意编造航班号。

4. Long Context：长上下文

在很长的对话中，测试模型是否仍能正确找到工具、参数和之前的任务信息。

#### 7\.1\.3 Agentic：智能体场景

课件给出两个方向：

- Web Search：使用搜索工具获取外部信息。

- Memory：使用记忆信息支持后续任务。

相比简单的函数调用，这类测试更接近 Agent 的实际工作方式。

例如，一个 Agent 可能需要搜索信息、读取结果、决定下一步，再综合完成用户目标。

#### 7\.1\.4 Robustness：鲁棒性

Robustness 关注的是：当输入不理想时，模型是否仍然可靠？

两个测试方向

1. Hallucination Measurement 测试模型是否会编造工具、参数或不存在的结果。

2. Format Sensitivity 测试模型对格式变化是否敏感。

例如同一个工具调用需求，分别用 JSON、自然语言、不同排列顺序或不同格式描述，模型的表现是否会发生明显变化。这与 Constraints 的内容相关：格式合法不代表语义正确，格式变化也可能影响模型选择。

### 7\.2 Evaluate the Whole Stack：四层评估体系

一次工具调用究竟应该从哪些层面判断正确性？四个层次：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODlmMDQ0MDY2NjdhYzY0NzU3YWQwOTk3NWU2ZWRhZDVfOGJmZGEyNDE0NjM0ZjQ4ZjkwYmNiMWMxMTAxMjgzZmJfSUQ6NzY5NzQ5MTc3NjE2NDIwNDA2OF8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

#### 7\.2\.1 Selection：选择工具

第一层检查 Tool Selection。

例如用户说：“查询巴黎天气。”

系统提供：get\_weather\(city\); get\_calendar\(date\); book\_flight\(destination\)

模型应该选择：get\_weather\(city="Paris"\)，如果调用了 `get_calendar()`，就是选错工具；如果本应调用工具却没有调用，就是 Missing Call如果调用了不必要的工具，就是 Extra Call。

常见评估指标：

- Precision：模型发出的调用中，有多少是应该发出的。

- Recall：应该发出的调用中，有多少被模型正确发出。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MDBmM2E3ZTE2NDFmNWVlYWM4MzU5YjU2YzgyYzE0MzNfMTdjNzFhZTI2NDVmNWYyOWY0NDJhODg5OWNiYjAzMzBfSUQ6NzY5NzQ5MzA5NDYxODU0OTc5Nl8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

其中 TP 是正确调用，FP 是多余或错误调用，FN 是遗漏调用。实际评测还需要明确如何匹配预测调用与标准调用。

#### 7\.2\.2 Arguments：检查参数

第二层检查 Tool Arguments，即使工具选对，参数仍然可能错误。

例如：get\_weather\(city="London"\)，用户要求的是巴黎的天气，这个调用可能满足 JSON Schema，但 `city` 的语义值错误。

两个检查方向：

- AST Match：比较工具调用的结构。

- Schema Match：检查参数结构与字段是否符合要求。

需要注意：Schema Match 主要保证结构合法，不能单独保证参数值符合用户意图。

#### 7\.2\.3 Trajectory：调用顺序

第三层评估调用轨迹（Trajectory），这与 Part 6的 Dependencies 直接对应。

例如：Correct Trajectory；Find Customer ID；Fetch Orders；Refund Selected Order

如果模型先退款，再查询订单，就违反了依赖关系，即使每个工具本身正确，整个执行序列也可能错误。

课件使用 Sequence Success 作为示例指标，并指出这一层通常需要执行或观察工具交互过程。

#### 7\.2\.4 Task：最终目标

第四层检查 End\-to\-end Task Success，这是最接近用户真实体验的指标。

例如：用户要求：“帮我查询明天的航班状态。”

Agent：

1. 正确选择航班工具。

2. 正确传入航班号。

3. 正确执行查询。

4. 却在最终回答中说错了航班时间。

前三步可能都通过，但 Task 仍然失败。课件给出的典型失败是：Plausible Wrong Answer：看起来合理，但实际上错误的答案。它尤其难发现，因为错误可能不是格式问题，也不是工具执行异常，而是模型对结果的理解或使用出了问题。

### 7\.3 Operational Quality：运行质量的三个维度

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDEwYjk5M2U1NzZiYjIxZGZiZmIxZjUxYzI0M2Q0MTlfNjEyMzI4OTczNjgyNDg4NWQyOGEzNGZiNmNlNjcyMWZfSUQ6NzY5NzQ5NDE3NDg3ODI0MDI5Ml8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

#### 7\.3\.1 Efficiency：效率

A correct agent can still be unusably slow or expensive\.

即使 Agent 能正确完成任务，也可能因为延迟过高或成本过高而无法实际使用。

四个指标分别是：

|**指标**|**关注什么**|
|---|---|
|Latency|完成任务需要多久|
|Calls|调用了多少次工具|
|Tokens|消耗了多少 Token|
|Cost|完成任务的实际成本|

Part 6 的串行与并行对比就是典型的 Efficiency 问题。串行耗时 6\.4 秒，并行耗时 2\.8 秒。虽然工具查询结果可能完全相同，但并行执行改善了响应延迟。

#### 7\.3\.2 Reliability：可靠性

Reliability 关注系统在真实运行条件下能否稳定完成任务。

Timeouts 工具没有在规定时间内返回结果。

Retries 请求失败后重新尝试。

Partial Failure 一批调用中部分成功、部分失败。

例如三个并发工具：

Weather  → Success
Calendar → Timeout
Flight   → Success

系统需要决定：是否重试 Calendar？是否可以利用已经成功的两个结果？是否向用户说明部分信息不可用？

这与上一章 `asyncio.gather(return_exceptions=True)` 的异常处理直接相关。

#### 7\.3\.3 Safety：安全性

Safety 关注 Agent 的工具调用是否符合权限和安全约束。

课件列出：

- Policy：政策与规则约束。

- Permissions：权限控制。

- Side Effects：执行操作带来的状态变化。

例如：

```Plain Text
delete_file(path)
transfer_money(amount)
send_email(recipient, content)
```

这些工具不仅查询信息，还可能产生真实影响。所以除了判断调用是否正确，还需要评估调用是否经过授权、是否符合安全规则，以及执行后是否造成不必要的副作用。

#### 7\.3\.4 三个维度之间的权衡

真实系统中，这三个维度可能互相影响。

例如：

- 增加重试可能提高 Reliability，但增加 Latency 和 Cost。

- 增加权限校验可能提高 Safety，但增加处理时间。

- 减少工具调用可能提高 Efficiency，但如果省略必要的检查，也可能降低任务成功率。

因此，生产环境不能只追求单一指标。

本节结论：Agent 的质量不仅取决于是否正确，还取决于是否高效、可靠、安全。

### 7\.4 Operational Tool Failures：三类故障来源

当一次工具调用失败时，错误究竟来自模型、执行框架，还是外部工具？

课件将故障分为三个来源。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTkyOWU1MWVkNGJkNzUzZmM3ZTQxYTk0M2U3YzUwZDRfZTQyOGU1YzczMDlmYWYwZDAzMGYzYzdiYWE2YjQ1NWFfSUQ6NzY5NzQ5NTM0MzIxNDI1MTU0OV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

#### 7\.4\.1 Model：模型侧错误

模型侧主要负责决定调用什么工具、传递什么参数，以及如何理解返回结果。

三种典型错误：Wrong Tool 模型选错工具；Bad Arguments 工具正确，但参数不正确；Ignores Result 工具已经返回结果，但模型忽略结果，仍然生成错误答案。

例如：

```Plain Text
Tool result:
Flight delayed by 2 hours
Agent final answer:
The flight is on time.
```

这里工具执行成功，错误发生在模型对结果的使用阶段。

#### 7\.4\.2 Harness：执行框架错误

Harness 是模型与工具之间的编排执行层，主要负责解析、验证、派发调用，以及将结果匹配回原始调用。

四种故障：Parse 无法正确解析模型生成的工具调用内容；Auth 调用时出现认证或授权问题；Validation 工具参数不符合 Schema 或其他校验规则；ID Mismatch 工具返回结果与原始 Call ID 配对错误。最后一种直接呼应 Part 7的并发执行。

例如：

```Plain Text
call_001 → Weather
call_002 → Calendar
```

如果 Harness 把 Calendar 的结果错误关联到 `call_001`，就会导致工具调用与结果不一致。

#### 7\.4\.3 Provider or Tool：供应商或工具侧错误

即使模型和 Harness 都正确，外部服务仍然可能失败。

Timeout 服务响应超时；Rate Limit 调用频率超过服务限制；Execution Error 工具执行时出现错误。例如：

```Plain Text
Model:
Correct tool + correct arguments
Harness:
Valid request + correct dispatch
Provider:
HTTP 429 Too Many Requests
```

这种情况下，失败不是模型选错了工具，而是外部服务限流。

#### 7\.4\.4 故障的不同处理

同样是 Task Failure，不同来源需要不同处理方式。

|**错误来源**|**典型改进方向**|
|---|---|
|Model|改善提示词、工具描述、模型能力或训练|
|Harness|修复解析、验证、授权与结果配对逻辑|
|Provider / Tool|超时控制、退避重试、熔断、降级|

Production evaluation needs benchmark accuracy and operational failure rates\.

生产级评估既需要 Benchmark Accuracy，也需要 Operational Failure Rates。仅仅知道模型在测试集上的工具选择准确率，并不能说明整个 Agent 系统在真实环境中有多可靠。

### 7\.5 Provider Tool\-call Error Rates：真实错误率数据

Tool Call Error Rate by Provider 不同供应商的工具调用错误率。

图表按时间展示供应商侧的错误率变化，观察外部工具调用在运行中发生错误的情况。

图表纵轴标注为 Error Rate \(%\)，但截图中的悬浮读数没有单独显示单位。这里保留截图中的原始数值，不额外推断统计口径。

Cloudflare 的 15\.1 明显高于其余可见读数，是这张截图中的突出异常值。

不过，单凭截图不能判断异常的具体原因，也不能据此评价供应商长期的整体可靠性。

总结

第一，供应商错误率是随时间变化的。同一服务可能在不同日期出现不同的错误水平。

第二，不同供应商的运行稳定性可能不同。即使模型使用完全相同的工具调用策略，外部服务的失败也可能影响最终任务成功率。

第三，评估需要区分模型能力与运行环境。BFCL 测试的是模型工具调用能力的不同方面。Provider Error Rate 则提供运行环境可靠性的另一类证据。这两类指标应该结合分析，而不是互相替代。

### 7\.6 Tool Use Is a Layered System

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDdkZmFkMWM1NDUwYTBjMTc3NjEwNmNiM2IxMjk5ZDJfZTI4M2UwMWNmYzllNzhlYThmZDI1MzJjNGI1OTk1YzFfSUQ6NzY5NzQ5NjQ1MzI3ODg0NjUwMl8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

Tool Use for LLM Agents 五层内容：

1. Capabilities 说明工具为模型扩展了哪些能力。Retrieval · Execution · Generation · Application Actions

2. Mechanics 说明工具定义如何进入模型上下文，模型如何产生调用，Harness 如何执行并返回结果。Schemas · Model Protocols · Harness · Call IDs

3. Constraints 说明 JSON Schema 和 Grammar Masks 可以约束输出形式，但不能保证语义正确。JSON Schema · Grammar Masks

4. Interfaces 说明 REST API 与 MCP 如何向 Agent 暴露外部能力。Direct REST Calls · MCP

对应：Part 6：如何组织多个工具调用，优化执行效率。

5. Systems 则负责把前面所有部分组织成完整的系统：管理依赖、并发执行、评估正确性、控制成本并处理运行故障。Dependencies · Concurrency · Evaluation · Failures

对应：Part 7：如何评估这些工具调用及其最终结果。

### 7\.7 总结

假设用户要求 Agent 查询航班信息。

Agent 调用了航班查询工具，最后给出航班状态。

我们可以依次检查：

1. Selection：是否选择了航班工具，而不是天气工具？

2. Arguments：航班号、日期等参数是否正确？

3. Trajectory：是否按照必要的依赖顺序执行？

4. Task：最终航班信息是否正确？

5. Efficiency：是否用了过多时间、Token 或工具调用？

6. Reliability：超时、限流或部分失败时能否妥善处理？

7. Safety：是否遵守权限与安全约束？

8. Failure Attribution：如果失败，究竟是模型、Harness，还是外部服务的问题？

这就是Evaluate the whole stack 的真正含义：不仅评估模型生成了什么调用，还要评估整个调用过程以及最终结果。

# Lecture 7  Agent Memory and RAG

## Part 1 RAG 的研究动机与基本原理

### 1\.1 大语言模型的局限性

大语言模型（Large Language Models, LLMs）依靠大规模训练数据和模型参数获得语言理解与生成能力，但仍存在四类主要问题。

|**挑战**|**定义与表现**|
|---|---|
|Hallucination（幻觉）|生成不准确、无意义或缺乏事实依据的内容|
|Domain\-specific Knowledge \& Expertise（领域知识不足）|缺乏医学、法律、金融等专业领域的知识与推理经验|
|Privacy（隐私）|在训练、部署及调用过程中可能产生敏感信息泄露与数据安全风险|
|Inconsistency（不一致性）|不同调用中回答质量不稳定，可能出现相互矛盾或与问题无关的内容|

其中，幻觉和领域知识不足是引入外部检索的重要动机，但 RAG 并不能自动消除隐私风险或保证生成结果完全一致。

**垂直领域中的幻觉问题**

斯坦福研究人员发表于 Journal of Legal Analysis（2024）的论文：Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models。研究指出，LLM 在回答可核验的联邦法院案件问题时，可能产生较高比例的法律幻觉。在特定法律问题上，幻觉率可达到 69%–88%。图中的 58%–88% 则是所展示模型的平均幻觉率范围，两种表述不应混为同一个统计口径。

这一结果说明：语言流畅性与事实可靠性并不等价，通用模型的能力也不能直接代表其专业领域能力。

### 1\.2 参数化知识与非参数化知识

课件用 Big Model \+ Big Training Data 概括 LLM 的能力来源，并提出两种知识存储方式。

|**比较维度**|**Parametric Knowledge**|**Non\-parametric Knowledge**|
|---|---|---|
|中文|参数化知识|非参数化知识|
|存储位置|模型参数|外部文档、数据库、索引|
|获取方式|模型前向推理|Information Retrieval（IR）|
|更新方式|通常需要训练或参数更新|更新外部知识库及索引|
|优势|无需每次显式检索|易更新、可追溯、可扩展|
|局限|知识更新成本高，难以覆盖全部长尾知识|依赖检索质量与外部数据|

参数化知识通过训练过程隐式编码于模型权重 $\theta$ 中，模型基于输入 $x$ 生成回答： $P_\theta(y\mid x) $

其中 $x$ 表示输入，$y$ 表示生成结果。非参数化知识则通过外部语料库 $\mathcal D$ 存储，并在需要时执行检索：

$\mathcal D_q=\operatorname{Retrieve}(q,\mathcal D) $

其中 $q$ 为查询，$\mathcal D_q$ 为检索得到的相关文档集合。

两者并非相互替代：LLM 提供语言理解与生成能力，外部知识库提供可动态访问的信息。

### 1\.3 Retrieval\-Augmented Generation（RAG）

1. LLM 无法将全部知识，尤其是长尾知识（Long\-tail Knowledge），完整编码进参数。

2. 训练结束后新增的信息与专业领域知识，也不一定能够被模型准确获取。

重新训练或微调（Re\-training / Fine\-tuning）可以改变模型能力，但通常需要较高的计算与数据成本，并不适合所有知识更新需求。Retrieval\-Augmented Generation（RAG）通过将外部检索结果引入生成过程，使模型能够利用参数之外的信息完成任务。

其基本过程为：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWQ3NTU0YzY2NjhjYmFkYjBmZGVjMzQyYzg5OGVmODFfMTVmZWYwNWZiMDFkOWQ3YjhiMWQzMDg5ZDJhODJkNGVfSUQ6NzY5ODY2NzUwMDA1MzQwMTEyNV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NmMwYzBiZTM1MjliNDVkZDE0ZDU5ZmViZjU1NzNkNzhfODg1ODJkZGRmNGIwMTUwNjBlM2Y1OThkNjI0Yzk3ZWRfSUQ6NzY5ODY2NzUwMDE2NjU4MTc5N18xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

常见的输入级 RAG 可形式化为： $y\sim P_\theta(y\mid q,\mathcal D_q) $

案例：询问 2023 年女足世界杯冠军。未使用 RAG 的旧模型可能由于知识截止时间而无法回答；使用 RAG 后，模型通过外部信息获得事实，回答 Spain。

传统 LLM 与 RA\-LLM =可以类比为：闭卷考试与开卷考试

- Close\-book Exam：仅依赖模型参数中已有的知识。

- Open\-book Exam：允许检索外部参考资料，再生成答案。

其关系可以概括为： ${\text{RA-LLM}=\text{LLM Generation}+\text{Information Retrieval}} $

课件将训练数据与外部知识库作如下对比：

|**Data for Training LLMs**|**External Knowledge Base**|
|---|---|
|Low quality|High\-quality knowledge|
|General|Specialized knowledge|
|Fixed|Scalable|
|Hard to update|Easy\-updated|

训练数据也可以具有高质量和专业性，外部知识库同样可能包含错误或过时信息。RAG 的主要优势在于知识可更新、可检索和可扩展，但其最终可靠性仍取决于知识库质量、检索准确率与生成模型的证据使用能力。

## Part 2 RA\-LLM 的研究体系与标准架构

### 2\.1 RA\-LLM Research Taxonomy

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ODIzMGRkZmJjMTUwY2E3ZDgyMjUzYTU5OGFhMjJhNDFfNWRmYWQ5ZmI0YTA3YWQ3ZTZhYzg4ZTQwMWY4ZTgxNzlfSUQ6NzY5ODY2NzUwMTU1NDk0NTU3Ml8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZGQ5MzQzZjM1Yjk1MWUyYzg1NGFlNDYzYmUxODE3NmRfZGJjN2RkZDJkNjliNTM5MWJhYTc4ZWNmZjdlNDNiZGVfSUQ6NzY5ODY2NzUwNDM0MzgxMzY2N18xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

从 Architecture、Learning 和 Application Tasks 三个维度建立 RA\-LLM 的研究分类。

Architecture：架构维度

三种 Augmentation 方式的主要区别是检索知识进入生成模型的位置。

1. Input\-layer Integration（输入层集成）

将检索文本与查询拼接，作为模型输入。课件后续介绍的 RAG 与 In\-Context RALM 均采用这种思路。

2. Intermediate\-layer Integration（中间层集成）

在模型内部表示或中间计算过程中引入检索信息。

3. Output\-layer Integration（输出层集成）

在输出阶段结合检索证据，例如通过输出概率或候选结果的融合影响最终预测。

Learning：学习维度

|**训练方式**|**含义**|
|---|---|
|Independent|检索器与生成器分别训练|
|Sequential|按阶段依次训练不同组件|
|Joint|对检索与生成进行联合优化|

Application Tasks：应用维度

- NLP：Question Answering、Fact Verification

- Downstream：Recommendations、Software Engineering

- Domain\-specific：Science、Finance

三维分类分别回答：系统如何构建、组件如何学习、技术应用于哪些任务。

### 2\.2 RAG 技术演进（2019–2024）

课件通过时间轴展示四条研究路线：

|**技术路线**|**代表模型或方法**|
|---|---|
|RAG Framework / Pipeline|kNN\-LM、REALM、RAG、FiD、RETRO、Atlas、Self\-RAG、In\-Context RALM|
|RAG Learning|REALM、RAG、EMDR2、RETRO、Atlas、Self\-RAG|
|Retriever Learning|DPR、Contriever、EPR、CEIL、UDR、RA\-DIT|
|Pre\-/Post\-Retrieval Techniques|SPALM、Re2G、HyDE、Query2doc、RECOMP、QueryRewriter|

其中，REALM、RAG 等早期工作奠定了神经检索与语言模型结合的基础；后续研究逐渐扩展至检索器训练、检索前后处理以及更复杂的自适应检索流程。

需要注意，同一研究可能同时属于多个类别。例如 RAG 既是一种架构，也涉及检索与生成的学习机制。

### 2\.3 RA\-LLM Standard Pipeline

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTBlODYyMjZlNGM5ZTA4MmNjZjcxODRlNTdhY2Q2OGJfZmNiN2M1Y2Q5OGFmMTM2Mjg4MWIyNTEzYjU1NDU1M2VfSUQ6NzY5ODY2NzQ5OTgxODUyMDA5M18xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Y2EzYTc4N2NlMWE1ODdlNmU1ZTYzNWQzMTRhNzJmYTBfMjIyMjA2NDNlZWZhMDcyMWMxZDQzY2VhNTQ2OGY4YTFfSUQ6NzY5ODY2NzUwMTU1NDk2MTk1Nl8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

标准 RA\-LLM 由两个必要组件和两个可选模块组成：

Retrieval 和 Generation 是必要组件（Major Components），Pre\-retrieval 与 Post\-retrieval 属于可选的辅助模块（Affiliated Modules）。Integration 表示检索与生成之间的信息融合关系，而不是额外的独立处理模块。

### 2\.4 两种典型的检索增强模型

1. RAG：DPR \+ BART

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWZlMzhlNzBkNGEwZDk1MjAyYzJjMmY4MDc0YWVlNzlfZThiMGNhYjIyYzJhNjYyNjQ1NmEyMmVmMDU4Mjk5NWJfSUQ6NzY5ODY2NzUwNDExMzE3NjEwMF8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

- Retrieval：Dense Passage Retriever（DPR）\+ Maximum Inner Product Search（MIPS）

- Generation：BART

- Integration：将检索段落分别与问题拼接

对于查询 $q$ 和检索文档 $z$，模型可按文档概率对生成结果进行边缘化：

$P(y\mid q) = \sum_{z\in\operatorname{TopK}(q)} P_\eta(z\mid q) P_\theta(y\mid q,z)$

其中：

- $P_\eta(z\mid q)$：检索器选择文档 $z$ 的概率。

- $P_\theta(y\mid q,z)$：生成器在查询与文档条件下生成答案的概率。

该式对应经典 RAG\-Sequence 的文档级边缘化形式，是对课件架构图的理论补充；不同 RAG 变体的概率融合方式可能不同。RAG 可以通过查询编码器 $q_\eta$ 和生成器 $p_\theta$ 的梯度反向传播进行端到端学习。

2. In\-Context RALM：BM25 / BERT / Contriever \+ GPT\-series

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTk2MTU5Y2U2MDc0Njc4OTQ4OTFmZGJjMzE2YzAxM2FfZDFmZThlYjg3NDU3ZTc4MGIzZmE2OTBlMDM5NjQ4YzVfSUQ6NzY5ODY2NzUwMDE2NjYxNDU2NV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

In\-Context RALM 使用 BM25、BERT 或 Contriever 等检索方法，并将检索段落前置到模型输入中。

$x'=\operatorname{Concat}(d_1,\ldots,d_k,q) $

$y\sim P_\theta(y\mid x') $

其中 $d_1,\ldots,d_k$ 为检索文档。

与前述经典 RAG 模型相比，这种方式通常不要求对生成模型进行端到端训练，而是通过上下文提示利用检索证据。世界杯扩军案例：模型可以从检索文本中获取“2026 年世界杯扩军至 48 支球队”的信息，而无需将该知识重新写入模型参数。

|**比较**|**经典 RAG**|**In\-Context RALM**|
|---|---|---|
|检索器|DPR \+ MIPS|BM25 / BERT / Contriever|
|生成器|BART|GPT\-series|
|集成方式|问题与各检索段落分别结合|将检索内容前置到输入|
|学习机制|可端到端联合训练|通常直接利用预训练 LLM|
|主要特点|显式建模检索文档与生成概率|实现简洁，适用于黑盒 LLM|

## Part 3 Retriever：检索器的分类、原理与训练

检索器（Retriever）负责从知识库中筛选与查询相关的信息，是 RAG 系统中决定证据质量的关键组件。不同检索器不仅影响 Retrieval Performance，也会进一步影响生成模型的输出质量。

### 3\.1 检索器的两个分类维度

|**分类依据**|**类型**|**核心区别**|
|---|---|---|
|Relevance Measurement|Sparse / Dense|如何表示文本并计算相关性|
|Retriever Learning|Task\-specific / General\-purpose|如何获得检索能力、适应什么任务|

Sparse 与 Dense 是表示和评分方式的区别；Task\-specific 与 General\-purpose 则是训练目标与适用范围的区别。

不同检索器对生成质量的影响

课件使用 Perplexity（困惑度）衡量不同检索器辅助语言模型时的生成效果。

$ \operatorname{PPL}(x) = \exp\left( -\frac{1}{T}\sum_{t=1}^{T} \log P_\theta(x_t\mid x_{<t}) \right) $

PPL 越低，表示模型对测试文本的预测越好。

课件实验数据：不同检索器下的 PPL。困惑度越低越好。两种模型规模下，BM25 均取得最低 PPL。

实验结果表明：

- 对 GPT\-2 117M，BM25 的 PPL 为 30\.2，优于 No Retrieval 的 37\.8。

- 对 GPT\-2 1\.5B，BM25 的 PPL 为 16\.7，优于 No Retrieval 的 19\.9。

- BERT 的表现略差于不检索，说明加入检索不一定改善生成质量。

- 大模型整体 PPL 更低，但不同检索方法之间的差距有所缩小。

这一实验说明，检索器的选择应依据下游任务效果，而不能仅依据是否采用了更复杂的神经网络。

### 3\.2 Sparse Retrieval 与 Dense Retrieval

两者的根本区别在于文本表示方式与相关性计算机制。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YmJmY2NjNDE2OTdjNjY2OGJmNzI4YWQ5Njk2OTJjMWVfNTY2MjlkNzg2ZWQ5ZmYwNDFmNTFlODUzZGM3NzQwZjVfSUQ6NzY5ODY2NzUwMTg5MDI2MDUxNV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

Sparse Retrieval（稀疏检索）

稀疏检索通过词项及其统计特征表示文档，通常在高维词汇空间中进行匹配。

基本过程： $\text{Document} \rightarrow \text{Tokenization} \rightarrow \text{Inverted Index} \rightarrow \text{Relevance Scoring} $

代表方法：

1. TF\-IDF 词频（Term Frequency）与逆文档频率（Inverse Document Frequency）相结合：

$\operatorname{TFIDF}(t,d) = \operatorname{TF}(t,d)\operatorname{IDF}(t) $

常见 IDF 形式为：

$\operatorname{IDF}(t) = \log\frac{N}{\operatorname{DF}(t)}$

其中 $N$ 是文档总数，$\operatorname{DF}(t)$ 是包含词项 $t$ 的文档数量。

2. BM25 在词项匹配基础上加入词频饱和与文档长度归一化。

一种常见表达为：

$\operatorname{BM25}(q,d) = \sum_{t\in q} \operatorname{IDF}(t) \frac{ f(t,d)(k_1+1) }{ f(t,d)+k_1 \left( 1-b+b\frac{|d|}{\operatorname{avgdl}} \right) }$

其中：

- $f(t,d)$：词项在文档中的频率。

- $k_1$：控制词频饱和程度。

- $b$：控制文档长度归一化。

- $|d|$：文档长度。

- $\operatorname{avgdl}$：语料库平均文档长度。

课件强调 Sparse Retrievers 的三个特点：

- Feasible to apply：易于实现和部署。

- High efficiency：检索效率较高。

- Fine performance：在许多任务上具有良好效果。

Dense Retrieval（稠密检索）

稠密检索通过神经编码器将查询与文档映射为低维连续向量 $\mathbf q=E_Q(q) $， $\mathbf d=E_D(d)$。再通过向量相似度计算相关性：$s(q,d)=\mathbf q^\top\mathbf d$。对于使用归一化向量的系统，也可采用余弦相似度。

其基本过程： $
\text{Query / Document} \rightarrow \text{Embedding} \rightarrow \text{Vector Index} \rightarrow \text{Similarity Search}$

代表方法是 DPR 和 Contriever。

Dense Retrievers 的主要特点包括：

- Allowing Fine\-tuning：可以针对特定任务微调。

- Better Adaptation：能够学习更适合任务的语义表示。

- Customizable for More Retrieval Goals：可以针对不同检索目标定制。

综合比较

|**维度**|**Sparse Retrieval**|**Dense Retrieval**|
|---|---|---|
|文本表示|高维稀疏词项向量|低维稠密语义向量|
|主要依据|词项匹配及统计权重|向量语义相似性|
|典型方法|TF\-IDF、BM25|DPR、Contriever|
|索引|倒排索引|向量索引|
|训练要求|通常无需神经网络训练|通常依赖预训练编码器|
|优势|高效、可解释、适合精确关键词|语义匹配、可微调、迁移能力|
|局限|容易受到词汇不匹配影响|训练和索引成本较高，可能遗漏精确实体|

两类检索器可以通过 Hybrid Retrieval 结合，在词项匹配与语义匹配之间形成互补。

### 3\.3 Dense Passage Retriever（DPR）

DPR 是面向 Question Answering（QA）的有监督稠密检索器。

**双编码器结构（Dual Encoder）**

DPR 使用两个独立的 BERT 编码器： $\mathbf q=E_Q(q) $， $\mathbf d=E_D(d)$

其中 $E_Q$ 负责查询编码，$E_P$ 负责段落编码，两者不共享参数。

使用 Inner Product Similarity： $\operatorname{sim}(q,p) = E_Q(q)^\top E_P(p)$

检索时对所有候选段落进行评分，选择得分最高的 Top\-$K$ 段落： $\operatorname{TopK}(q) = \underset{p\in\mathcal D}{\operatorname{TopK}} \operatorname{sim}(q,p)$

**有监督训练数据**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjQ2ZmYzYjkwZTlhNDM3N2E4YWE1Y2NhYzM1MWRjNjBfNDg2MGZmOTNmZWFjOGE2YjUwMjc5NGJhNjQyNjg4MWZfSUQ6NzY5ODY2NzQ5OTgxODU1Mjg2MV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

DPR 使用 Question\-Passage Sets： $\mathcal D= \left\{ (q_i,p_i^+,p_{i,1}^-,\ldots,p_{i,n}^-) \right\}_{i=1}^{m}$

其中：

- $q_i$：查询。

- $p_i^+$：相关段落（Positive Passage）。

- $p_{i,j}^-$：不相关段落（Negative Passage）。

- $m$：训练样本数量。

**对比学习目标**

$\mathcal L_i = -\log \frac{ e^{\operatorname{sim}(q_i,p_i^+)} }{ e^{\operatorname{sim}(q_i,p_i^+)} + \sum_{j=1}^{n} e^{\operatorname{sim}(q_i,p_{i,j}^-)} }$

该目标通过增大正例相似度、降低负例相对得分，使检索器能够区分相关与不相关段落。

**In\-batch Negatives（批内负例）**

在一个训练 Batch 中，其他查询的正例段落可作为当前查询的负例。

例如： $(q_1,p_1^+),\ (q_2,p_2^+),\ldots,(q_B,p_B^+)$

对于 $q_1$，$p_1^+$ 是正例，其余段落可作为负例候选。这种方法减少了额外负例采样成本，但存在负例过于简单、难度不足，或错误地将相关段落当成负例的问题。因此，Negative Sample Selection 是影响 DPR 训练效果的重要因素。

### 3\.4 Contriever：无监督通用稠密检索器

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YmM3MTY0NTgxM2ZhMWExMzRmNjNjZDhkNTVlMjczODJfMmQ3NzFlZmIxNTk1NjUwNTY2ZDc2MzdhMTY4Nzk4NGVfSUQ6NzY5ODY2NzQ5OTgxODUzNjQ3N18xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

Contriever 采用无监督对比学习构建通用检索器。

与 DPR 不同，Contriever 对查询和文档使用共享编码器： $\mathbf q=E(q),\mathbf d=E(d)$

其相似度仍可通过内积计算： $s(q,d)=E(q)^\top E(d)$

**无监督对比学习**

Contriever 不要求人工标注的 Question\-Passage Sets，而是从未对齐文档（Unaligned Documents）中构建对比学习样本。

对比目标以正样本 $k_+$、负样本 $k_i$ 和温度参数 $\tau$ 为基础。

标准 InfoNCE 损失可写为： $\mathcal L(q,k_+) = -\log \frac{ \exp(s(q,k_+)/\tau) }{ \exp(s(q,k_+)/\tau) + \sum_{i=1}^{K} \exp(s(q,k_i)/\tau) } $

温度系数 $\tau$ 控制 Softmax 分布的尖锐程度。

**DPR 与 Contriever 对比**

|**比较**|**DPR**|**Contriever**|
|---|---|---|
|定位|Task\-specific|General\-purpose|
|训练|Supervised|Unsupervised|
|编码器|Two Independent BERTs|Shared BERT Encoder|
|数据|Question\-Passage Pairs|Unaligned Documents|
|目标|特定 QA 任务表现|通用语义检索能力|
|迁移|可能依赖目标任务适配|更适合零样本与少样本迁移|

无监督预训练可能改善 Zero\-shot Transfer 和 Few\-shot Learning 场景下的鲁棒性，但并不意味着在所有任务上都优于监督检索器。

### 3\.5 DPR 与 Contriever 的性能比较

两组实验比较检索器性能。

1. End\-to\-end QA：Exact Match Accuracy

Exact Match（EM）表示生成答案与标准答案完全匹配的比例： $\operatorname{EM} = \frac{1}{N} \sum_{i=1}^{N} \mathbb I(\hat y_i=y_i)$

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTc4M2U0ZGUzN2ZjNjI3M2Q3YjAyNTA2MjM4YTExMjJfNDkxNjQ5NjBkZWJiNjhiZDM2M2VlMGQ4MjNkNGM3ZWFfSUQ6NzY5ODY2NzUwMDA1MzQ4MzA0NV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

Single 与 Multi 是课件表格中的训练设定标签，不应理解为单轮和多轮问答。

从结果可以观察到：

- DPR（Single）在 NQ 上达到 41\.5，高于 BM25 的 32\.6。

- DPR 在 TriviaQA 上达到 56\.8，高于 BM25 的 52\.4。

- BM25 在 SQuAD 上仍具有优势。

- BM25\+DPR 的组合并非在所有任务上取得最高分。

- Multi 设定在部分任务上提升显著，但也可能降低其他数据集的表现。

因此，稠密检索通常具有较强的语义匹配能力，但不存在对所有数据集都最优的检索器。

2. 检索 Recall@K

$R@K = \frac{ \text{Top-}K\text{ 中被成功覆盖的相关目标数} }{ \text{全部相关目标数} }$

在开放域 QA 检索评估中，Recall@K 主要反映正确证据是否被前 $K$ 个结果覆盖。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWMzMzlmNDVkYmM1ZWUxNTA1NjdlOTQ1MjFjYmZlNjhfNTFhMWRhZGE0OGQ3ZTgxMmNkN2QyYjdlOWI4MTAzZDVfSUQ6NzY5ODY2NzUwNDQ1NzEwOTAyMV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

还列出了 Inverse Cloze Task、Masked Salient Spans 等无监督预训练方法，用于比较不同预训练目标对检索效果的影响。从 NQ 数据看，Contriever 的 R@20 与 R@100 均超过 BM25，但仍低于监督训练的 DPR。这说明无监督检索器具有竞争力，而任务相关监督信号仍可能带来额外收益。

DPR 与 Contriever 均已广泛应用于 RAG / RA\-LLM 系统：

- DPR：RAG、FiD、RETRO、EPR、UDR 等。

- Contriever：Self\-RAG、Atlas、RAVEN 等。

### 3\.6 面向 In\-Context Learning 的检索器

此前的检索器主要寻找事实证据，而面向 In\-Context Learning（ICL）的检索器主要寻找能够帮助模型完成当前任务的提示或示例。

Prompt Retriever

Prompt Retriever 从候选提示中选择适合当前输入的 Prompt。

结构包括： $\text{Training Data} \rightarrow \text{Unsupervised Retriever} \rightarrow \text{Candidate Prompts}$

再通过 Scoring LM 评价候选提示的质量。

模型还可以使用 Utterance Encoder $E_X$ 与 Prompt Encoder $E_P$，通过对比学习区分：

- Positive Examples

- Hard Negative Examples

Exemplar Retriever（CEIL）

CEIL 通过检索适合当前输入的 Exemplars（示例），优化上下文学习效果。

其核心过程是：

1. 创建训练数据（Creating Training Data）。

2. 建立示例与输入之间的关联。

3. 使用 DPR Retriever 产生检索得分。

4. 使用语言模型计算示例对任务表现的影响。

5. 通过 Alignment Loss 对齐检索器与语言模型的偏好。

与传统证据检索不同，CEIL 更关注：哪些示例能够使语言模型在当前任务上取得更好的表现？

### 3\.7 Search Engine as Retriever

传统 RAG 通常使用预先建立的知识库，但这种方式存在三类局限：

- 实时网页内容难以及时更新到本地知识库。

- 预定义数据库可能受到存储规模限制。

- 无法直接利用 Google、Bing 等成熟搜索引擎长期优化的排序能力。

因此，可以使用 Search Engine 作为外部检索器。多轮搜索过程：

$x\rightarrow q_1\rightarrow D_{q_1}$， $D_{q_1}\rightarrow y_1\rightarrow q_2\rightarrow D_{q_2} $， $D_{q_2}\rightarrow y_2\rightarrow q_3\rightarrow D_{q_3}$

例如，回答一个人物教育经历的问题时，模型可以先检索人物背景，再检索就读大学，最后检索所获学位。

这类方式允许模型依据中间结果继续搜索，体现了检索与生成交替进行的过程。

但网页搜索并不自动保证信息可信，仍需处理来源可靠性、检索噪声与事实验证问题。

## Part 4 Pre\-Retrieval Techniques：检索前优化

检索前优化（Pre\-retrieval）发生在检索器执行之前，其目标是提高查询与检索系统之间的适配程度。

三种主要方法：

|**方法**|**主要操作**|**解决的问题**|
|---|---|---|
|Query Rewriting|改写查询|原始表述不适合检索|
|Query Decomposition|分解查询|复杂问题包含多个信息需求|
|Query Expansion|扩展查询|查询缺少相关关键词或语义信息|

此外，课件将 HyDE 作为独立技术介绍，它通过生成假设文档改变检索输入。

### 4\.1 Query Rewriting 查询改写

查询改写通过语言模型将原始问题转换为更适合检索的表达形式。

$q'=f_{\text{rewrite}}(q)$

其中 $q$ 是原始查询，$q'$ 是改写后的查询。

三种流程：

|**方法**|**流程**|
|---|---|
|Direct Retrieval|Input → Retriever → Documents → LLM Reader|
|LLM Rewriter|Input → Black\-box LLM Rewriter → Web Search → Reader|
|Trainable Rewriter|Input → Small PrLM Rewriter → Web Search → Reader|

Trainable Rewriter 进一步通过 Reward 信号优化改写器，使生成的查询更有利于检索命中和下游回答。

**查询改写与分解的联系**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTc3ZjgxZTY0MGFlZGY2MzI1NzIwZTM2NDFhMGUxNWRfNjRmYzc0NTkwZmU1MWVkOGRkNGQxOGJmNDY1MzdmMzVfSUQ6NzY5ODY2NzUwNDM0Mzg0NjQzNV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

课件示例：What profession do Nicholas Ray and Elia Kazan have in common? 比较两个人的共同职业。

可以改写为：Nicholas Ray profession, Elia Kazan profession。检索到两个人的职业信息后，再综合得到共同职业 Director。同时体现了 Query Decomposition：将复杂问题拆成多个相对独立的检索子任务。

**实验效果**

课件在 HotpotQA、AmbigNQ、PopQA 三个数据集上比较了不同改写方式。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NzczMzNlZjY2OTViM2IxMGRhMjJjNzE2Y2Q3OWVjZjNfMzE5MjIwYmVhNWUwY2QxYmVmYjY2NzYzZjk2ZjUyYTdfSUQ6NzY5ODY2NzUwNDQ1NzEyNTQwNV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

其中 F1 用于衡量预测答案与标准答案之间的匹配程度。

对于常见的抽取式问答 Token\-level F1： $F_1=\frac{2PR}{P+R}$

实验显示，查询改写在多个 QA 数据集上有效，但可训练改写器并非始终优于 LLM Rewriter。例如 PopQA 上后者的 F1 为 49\.74，略高于前者的 49\.51。同时，HotpotQA 的普通 Retrieve\-then\-read 表现甚至低于 Direct，说明引入检索不必然提升答案质量，查询适配与证据质量同样重要。

### 4\.2 HyDE：Hypothetical Document Embeddings

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDJiOWFkNTZhNjc3OTI4NjI0NDE2NjBmNDE4NTVjZTZfYjRlNjMyZDgwNTk3M2RlNTRlYjE0N2YxNzEzNDU5ODRfSUQ6NzY5ODY2NzUwNDExMzE5MjQ4NF8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZWFjMjcwMGNkZTc2NDA5M2Q2MTA4N2E1ODYxNTM4NTFfNmJhYTQwYjBlMThmZDExYTRhNjUxZDc0YjE0MmNjYmZfSUQ6NzY5ODY2NzUwMTU1NDc4MTczMl8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

HyDE 的核心思想：先生成一篇可能回答问题的假设文档，再利用该文档的语义表示检索真实文档。

传统检索： $q\rightarrow \operatorname{Retrieve}(q)$

HyDE： $q \xrightarrow{\text{LLM}} d' \xrightarrow{\text{Encoder}} E(d') \xrightarrow{\text{Search}} \mathcal D_q$

其中 $d'$ 是 Hypothetical Document，即模型生成的假设文档。

**为什么生成假设文档？**

自然语言问题与目标文档在表达形式上可能存在较大差异。例如，问题可能只有几个词，而目标文档是包含背景、术语与详细描述的长段落。HyDE 先生成一段具有文档形式的文本，再执行 Document\-to\-Document Similarity Search，以减小查询与目标文档之间的表示差异。

课件示例涉及：

- 智齿拔除所需时间。

- COVID\-19 对心理健康的影响。

- 韩语表达的领域问题。

这些例子说明，HyDE 可以根据问题类型生成不同风格的假设文档。

**关键限制**

HyDE 生成的文档不一定事实正确。它的用途是辅助检索，而不是直接充当答案。因此必须区分：

$\text{Hypothetical Document}\neq\text{Verified Evidence} $

其主要风险是生成内容偏离问题，导致检索方向错误；同时也增加了一次生成模型调用的延迟与成本。

### 4\.3 Query Expansion 查询扩展

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjQ2ZDU4ZTVkZjNkZGQ3NjNmNmE4ZTIyYjYxOTgzNjFfNjE0OTljNTJlYTYwNjg0OGY1MjQ3ZTc4ZjE3ODM4ZDNfSUQ6NzY5ODY2NzUwMTU1NDc5ODExNl8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=OTYyNWZiMGVmNGRmNTBkZjM5ODg1NmQzMzQ2OTI3YzJfNzBkY2JlNzFiMTYwMDA0NDA1MTI3N2M1NjI0MGEwNDNfSUQ6NzY5ODY2NzUwNDM0MzgzMDA1MV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

Query Expansion 不直接替换原查询，而是为其补充相关信息。

Query2doc 说明了通过 LLM 生成文档来扩展查询的方法。

核心公式： ${ q^+=\operatorname{concat}(q,[SEP],d') }$

其中：

- $q$ 原始查询。

- $d'$LLM 生成的扩展文档。

- $[SEP]$：分隔符。

- $q^+$扩展后的查询。

与 HyDE 的区别在于，Query Expansion 保留原始查询，并追加生成内容。

**实验比较：** MS MARCO dev 与 TREC DL 19 上的 Query2doc 的表现。

- MRR@10：前 10 个结果中第一个相关结果的倒数排名均值。

- R@50、R@1k：前 50、1000 个结果的召回表现。

- nDCG@10：考虑相关性等级与排名位置的归一化折损累积增益。

Query2doc 在两类检索器上均有收益。BM25 的 nDCG@10 从 51\.2 提升至 66\.2，增加 15\.0；DPR 从 64\.7 提升至 68\.7，增加 4\.0。

**三种检索前技术对比**

|**技术**|**对查询的处理**|**主要特点**|
|---|---|---|
|Query Rewriting|重新表达查询|提高检索适配性|
|HyDE|生成假设文档并以其向量检索|缩小问题与文档的语义表示差异|
|Query Expansion|原查询 \+ 生成文档|补充关键词与语义信息|

## Part 5 Post\-Retrieval Techniques：检索后优化

检索后优化（Post\-retrieval）发生在检索器返回候选结果之后，主要解决结果排序不佳、内容冗余、证据错误等问题。四种重点方法：

- Re\-ranking：重新排序候选文档。

- Compression：压缩冗余检索内容。

- Correction：检测并纠正不可靠的检索结果。

- Refiner：抽取与查询相关的原文证据。

### 5\.1 Re\-ranking：检索结果重排

初始检索通常追求较高召回率与较低计算成本，但初检排序未必足够准确。

此外，BM25 与神经检索器采用不同的评分机制，其原始分数通常无法直接比较。

因此，Re2G 使用 Reranker 对候选文档进行统一评分。

两阶段检索

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YmQ1ZTY4Y2E0NDE1MjQ0N2U4NzMxYjY2ZjgxMmQ5NTNfZjdjMDU5ZDExZjIxMjNjMTMwMjg4MzNiYjYzNDk3YzRfSUQ6NzY5ODY2NzQ5OTkyMzQxMDQ2OF8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

普通 RAG 直接使用初检的 Top\-$K$ 结果；Re2G 则先收集较大的 Top\-$N$ 候选集合，再通过重排器筛选出最终的 Top\-$K$ 文档。

BERT Cross\-Encoder 重排模型

Interaction Model Based on Sequence\-pair Classification\.

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MmIzYjhkNWFmNGE3NjRlZTVjNzQwYzlkNDlmZDFmMzlfMzc3MGVlNjViMjZhZWEwYzhiZWI2MGQxYjE2ZGQxZWRfSUQ6NzY5ODY2NzQ5OTgxODU2OTI0NV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

其输入结构为： $[\mathrm{CLS}]\ q\ [\mathrm{SEP}]\ d\ [\mathrm{SEP}] $。查询和文档被共同输入到 BERT 中，使两者能够在注意力层中发生交互。

1. 取 \[CLS\] 对应的输出表示： $\mathbf h_{\mathrm{CLS}} = \operatorname{BERT}(q,d)_{\mathrm{CLS}} $；

2. 相关性分类概率：通过线性层与 Softmax  $P(r\mid q,d) = \operatorname{Softmax}(W\mathbf h_{\mathrm{CLS}}+b)$，其中 $r\in\{\text{yes},\text{no}\}$；

3. 重排分数： $s_{\text{rerank}}(q,d) = P(\text{yes}\mid q,d)$。

Cross\-Encoder 能够对查询与文档进行细粒度交互，但通常需要逐对计算，因此成本高于使用预计算文档向量的双编码器，所以系统通常先执行高效召回，再对少量候选进行精排。

### 5\.2 Retrieved Result Compression：检索结果压缩

检索文档可能包含大量与查询无关的信息，直接输入 LLM 会增加 Token 成本，也可能干扰模型识别关键证据。

Retrieved Result Compression 通过压缩器将长文档转换为更简洁的上下文。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjFmYjI1NjAzNWEyNDJjOTZjYTQxOTFjYWFjZGI5MDJfNmFlN2IyMzYwMjRiMzc4MGM5NWNkNzdiN2Y1NzkyNWFfSUQ6NzY5ODY2NzUwMDA1MzQ2NjY2MV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

$\mathcal D_q \xrightarrow{\text{Compressor}} c_q$，其中 $c_q$ 是压缩后的上下文。

RECOMP 推理流程为： $\text{Retrieve} \rightarrow \text{Compress} \rightarrow \text{Prepend} \rightarrow \text{Black-box LM}$

**Compressor Learning Objectives  **压缩器需要同时满足三个目标：

|**目标**|**含义**|
|---|---|
|Concise|尽可能简洁，降低输入成本|
|Effective|保留有助于下游任务的信息|
|Faithful|忠实于原始检索内容，不引入虚构事实|

这三个目标之间存在权衡：过度压缩可能遗漏关键证据，而仅追求信息完整又无法有效减少 Token。

**RECOMP 案例：**以日产 Xterra 停产年份为例 When did they stop making the Nissan Xterra?

|**方法**|**Context Tokens**|**Answer**|**结果**|
|---|---|---|---|
|No Retrieval|0|2010|错误|
|RALM|749|2015|正确|
|RECOMP|58|2015|正确|

$\text{Token Reduction} = \frac{749-58}{749}\times100\% \approx92.3\% $

压缩比为： $\text{Compression Ratio} = \frac{749}{58} \approx12.91$

说明 RECOMP 在显著减少上下文长度的同时，保留了回答问题所需的关键事实。

### 5\.3 Corrective RAG（CRAG）：纠正式检索增强生成

传统 RAG 往往假设检索结果可直接作为生成依据，但检索器可能返回不相关、错误或存在歧义的文档。

Corrective RAG 引入 Retrieval Evaluator，对检索结果进行评估，并根据结果质量选择不同的知识处理策略。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MWUxNTVjOTQ5YzY4MDc0ZDFmNjBlNGFlNjM2Zjk1NDhfYjdjZTNhMTEzMzRjZjE5MzhlMzdjOGFkYTYyZWQyNDBfSUQ6NzY5ODY2NzUwNDIxMzg3MjE2NF8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDc0MTYwNjZmN2EwNTIyODAxZGUwMDAzM2EzZDhhZDBfMzRmODg3ZDg1YmIwNjc3NGZhMjMxODQ5ZDQzOWRmMTNfSUQ6NzY5ODY2NzUwMDA1MzQ5OTQyOV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

**基本控制流程**

****$\text{Question} \rightarrow \text{Retrieve} \rightarrow \text{Grade}$

若检索结果可靠，则直接使用相关证据；若发现不相关或不可靠文档，则

$\text{Rewrite Query} \rightarrow \text{Web Search} \rightarrow \text{Answer}$

两个问答案例对比：

- Henry Feilden 的职业问题：检索到正确人物信息，回答 Politician。

- Death of a Batman 的编剧问题：检索结果混入其他 Batman 作品信息，模型错误回答 Hamm。

该案例说明，错误检索结果可能诱导生成器给出看似合理但实际错误的答案。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MjgyOTFmYjgzZTEwNDI0OWY4ZDhjYTFhODBjZTE4MWFfZjVlZTJiYzExOTgzNjExOTQyNTZkMmY2ZDA2NWJkZDNfSUQ6NzY5ODY2NzUwMTU1NDk3ODM0MF8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

**CRAG 的三种检索结果状态**

完整架构中，Retrieval Evaluator 将结果分为：

|**状态**|**处理策略**|**生成上下文**|
|---|---|---|
|Correct|Knowledge Refinement|$x+k_{\mathrm{in}}$|
|Ambiguous|Refinement \+ Knowledge Searching|$x+k_{\mathrm{in}}+k_{\mathrm{ex}}$|
|Incorrect|Knowledge Searching|$<br>x+k_{\mathrm{ex}}$|

其中：

- $x$：用户查询。

- $k_{\mathrm{in}}$：从原始检索结果中提炼的知识。

- $k_{\mathrm{ex}}$：通过外部搜索获得的补充知识。

这里的内部知识指初始检索语料中精炼出的内容，并不等同于模型参数化知识。

**Knowledge Refinement**

对原始检索文档进行： $
\text{Decompose} \rightarrow \text{Filter} \rightarrow \text{Recompose}$

即先将文档分解为细粒度片段，再筛除无关信息，最后重组为更可靠的上下文。

**Knowledge Searching**

当初始检索结果不可靠时： $x \xrightarrow{\text{Rewrite}} q' \xrightarrow{\text{Web Search}} \{k_1,\ldots,k_n\} \xrightarrow{\text{Select}} k_{\mathrm{ex}}$

包含 Death of a Batman; screenwriter; Wikipedia 的查询作为示例，说明外部搜索可以通过更明确的查询重新寻找证据。

CRAG 的核心贡献是将检索结果质量评估引入生成流程，避免模型无条件信任初检文档。

### 5\.4 Refiner：相关证据抽取与结构化

Refiner 使用单个 Decoder\-only LLM，从检索文档中自适应抽取与查询相关的原文内容，并保留必要上下文。

Adaptively extract query\-relevant contents verbatim along with the necessary context\. 其中 Verbatim 强调尽可能忠实地抽取原始文本，而非自由改写或生成新的事实。

**Refiner 的处理流程**

$
(q,\mathcal D_q) \xrightarrow{\text{Refiner}} \mathcal C_q$

$
\mathcal C_q \xrightarrow{\text{Downstream LLM}} y$

其中 $\mathcal C_q$ 为筛选和结构化后的证据。

**课件案例**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Yjk3Y2IxODJjNWJmN2NmM2IzZGJhNTkwMmVkMDcwYzNfOTk1NzNhYzg3OTcyM2JmY2U0Zjg2ZjFiNDcyM2RmMzdfSUQ6NzY5ODY2NzUwMTU1NDgxNDUwMF8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

用户询问：Are North Marian High School and Seoul High School both located in the same country?

检索结果包含四个学校的信息。课件中的问题使用 North Marian，而检索结果使用 North Marion，存在拼写不一致。该差异也提示，实体名称匹配错误可能影响证据筛选。

Refiner 通过 Extract and Structure，保留两段关键证据：

1\.1 Seoul High School：位于 South Korea。

1\.2 North Marion High School：位于 United States。

两种结果：

- Without Refiner：模型受到无关学校信息干扰，错误判断两所学校位于同一国家。

- With Refiner：模型依据筛选后的证据，正确判断两所学校位于不同国家。

**Refiner 与 Compression 的区别**

|比较|Compression|Refiner|
|---|---|---|
|核心操作|压缩长文档|抽取查询相关内容|
|主要目标|降低 Token 成本|减少无关证据干扰|
|内容处理|可以进行摘要式改写|强调 Verbatim Extraction|
|输出|精简摘要或压缩上下文|结构化相关证据|
|代表方法|RECOMP|Refiner|

两者都属于检索后优化，但Compression 主要解决上下文冗长，Refiner 更强调证据相关性与保真性。

### 5\.5 RAG 技术体系的综合比较与总结

整个 RAG 系统可以按照信息流分为三个优化阶段：

1. Pre\-Retrieval 优化查询表达

Rewriting · Decomposition · HyDE · Expansion

2. Retrieval 从知识库中召回候选证据

BM25 · DPR · Contriever · Search Engines

3. Post\-Retrieval 优化检索结果的质量与内容

Re\-ranking · Compression · Correction · Refiner

Generation 综合查询与证据生成答案

**关键技术对照**

|**技术**|**处理对象**|**核心机制**|**主要作用**|
|---|---|---|---|
|BM25|查询、文档|稀疏词项匹配|高效关键词检索|
|DPR|查询、段落|双编码器、有监督对比学习|提高特定 QA 任务的检索能力|
|Contriever|查询、文档|共享编码器、无监督对比学习|提高通用语义检索能力|
|Prompt Retriever|提示模板|候选提示评分与学习|选择有效提示|
|CEIL|上下文示例|检索得分与 LM 得分对齐|优化示例选择|
|Query Rewriting|查询|重新表达信息需求|改善查询适配性|
|HyDE|查询|生成假设文档后检索|改善查询与文档的表示匹配|
|Query Expansion|查询|原查询与生成内容拼接|扩大检索覆盖范围|
|Re2G|候选文档|交互式重排|改善候选排序|
|RECOMP|检索文档|内容压缩|减少 Token 与冗余信息|
|Corrective RAG|检索结果|质量评估、精炼与外部搜索|修正不可靠证据|
|Refiner|检索文档|相关内容抽取与结构化|减少证据噪声|

**重要概念辨析**

1. Sparse Retrieval 与 Dense Retrieval

前者依靠词项统计匹配，后者依靠稠密向量的语义相似性。两者可以互补，并非简单的技术替代关系。

2. DPR 与 Contriever

DPR 使用两个独立编码器，通过有监督问答数据学习；Contriever 使用共享编码器，通过无监督对比学习获得通用检索能力。

3. Query Rewriting、HyDE 与 Query Expansion

Rewriting 重新表达查询；HyDE 生成假设文档作为检索输入；Expansion 保留原查询并追加生成内容。

4. Retriever 与 Reranker

Retriever 面向大规模语料进行高效召回，Reranker 对较少候选进行精细评分。两者通常构成粗排与精排的两阶段架构。

5. RECOMP、CRAG 与 Refiner

RECOMP 主要处理上下文冗余，CRAG 主要处理证据质量不可靠，Refiner 主要处理相关证据的抽取与组织。

RAG 的效果不仅取决于是否连接外部知识库，还取决于整条信息处理链的质量。

可以将系统性优化目标概括为：

${ \begin{aligned} \text{RAG Quality}\ \longleftarrow\;&\text{Query Quality}+\text{Retrieval Quality}+\text{Evidence Quality}+\text{Generation Quality} \end{aligned} } $

LLM 的参数化知识存在局限，因此引入外部检索；检索器决定能够找到哪些信息，检索前优化改善信息需求的表达，检索后优化提高证据的相关性、可靠性与紧凑性，生成器最终利用这些证据完成任务。

## Part 6 Agent Memory 智能体记忆

本章围绕智能体如何存储、检索、更新和利用历史信息展开。

核心问题：如何突破大语言模型有限上下文窗口与静态参数知识的限制，使智能体能够在持续交互中积累经验、形成知识、复用技能，并实现长期学习。

本章的知识体系可以归纳为五个层次：

1. 记忆的必要性：LLM 的参数记忆与上下文记忆存在局限，传统 RAG 不能完全替代智能体记忆。

2. 记忆的认知基础：借鉴人类长期记忆的海马体索引理论、模式分离与模式补全机制。

3. 记忆的内容分类：情景记忆（Episodic）、语义记忆（Semantic）和程序性记忆（Procedural）。

4. 记忆的实现与学习：从外部文本存储到参数微调、提示优化、代码库改进及自我反思。

5. 记忆的管理机制：有限上下文下的外部记忆读写、召回、更新与冲突消解。

### 6\.1 智能体记忆的动机与基本概念

#### 6\.1\.1 从人类持续学习到智能体记忆

人类及多数动物能够通过持续经历形成长期记忆，而传统 LLM 的知识主要来自预训练阶段。模型完成训练后，参数通常保持固定，新的交互信息不会自动转化为永久知识。

课件通过神经突触变化说明生物记忆的形成过程：

- 短期记忆（Short\-term Memory）：与短暂的神经活动及突触功能变化相关。

- 长期记忆（Long\-term Memory）：涉及更持久的突触结构变化和神经连接调整。

这一类比揭示了智能体设计的基本要求：不仅需要在当前任务中利用信息，还应能够将重要经验保存下来，供后续任务使用。

然而，直接通过修改 LLM 参数实现持续学习存在困难。

1. 灾难性遗忘（Catastrophic Forgetting）

模型学习新知识时，参数更新可能破坏原有知识，导致旧任务性能下降。

2. 涟漪效应（Ripple Effects）

知识之间存在关联。修改一项事实后，模型可能无法同步更新相关知识。

例如，将某人物的国籍由国家 A 修改为国家 B，可能还需要同步更新其所属国家、语言及其他关联事实。

3. 瞬时学习（Transient Learning）

新知识可能仅在当前上下文中有效，或者在后续参数更新中无法稳定保留。

因此，智能体需要一种能够持续存储、组织和调用信息的记忆机制，而不能完全依赖参数更新。

#### 6\.1\.2 参数记忆与非参数记忆

LLM 的知识存储可以分为两种主要形式。

|**维度**|**参数记忆（Parametric Memory）**|**非参数记忆（Non\-parametric Memory）**|
|---|---|---|
|存储位置|模型权重|外部数据库、文档、记忆库|
|知识更新|通常需要训练或编辑参数|可以直接修改外部数据|
|信息访问|通过模型推理隐式调用|通过检索显式获取|
|持久性|随模型权重保存|由外部存储系统保证|
|主要局限|更新成本、遗忘、知识冲突|检索误差、信息质量、上下文限制|

非参数记忆能够提供额外证据，但并不保证模型正确使用这些证据。

课件研究，说明 LLM 在外部证据与参数知识冲突时，可能接受具有连贯性和说服力的外部信息。

实验包含两种情况：

- Correct Memory：模型原有知识正确，但外部信息提供错误事实。

- Wrong Memory：模型原有知识错误，而外部信息提供正确事实。

例如，模型知道法国首都是巴黎，但外部文本声称首都是尼姆（Nîmes）。模型可能受到外部文本影响而改变答案。这一现象具有双重含义：

- 外部记忆可以帮助纠正模型的过时或错误知识。

- 外部记忆也可能引入错误信息，导致模型放弃原本正确的知识。

因此，记忆系统不仅需要检索能力，还需要证据可信度判断、知识冲突检测和更新控制。

#### 6\.1\.3 短期记忆与长期记忆

智能体通过与环境交互形成行动—观察循环： $ \text{Reasoning} \rightarrow \text{Action} \rightarrow \text{Observation} \rightarrow \text{Reasoning}$

在这一过程中，记忆负责保存过去的观察、行动和推理结果。

|**特征**|**短期记忆（STM）**|**长期记忆（LTM）**|
|---|---|---|
|主要载体|当前上下文窗口|外部存储或持久化模型能力|
|写入方式|追加当前对话与工具结果|显式写入、更新或学习|
|容量|受上下文长度限制|可扩展|
|生命周期|通常局限于当前任务或会话|可以跨任务、跨会话保留|
|主要功能|支持即时推理|支持经验积累和知识复用|

课件强调，短期记忆通常具有三个特点：

- Append\-only：交互内容不断追加。

- Limited context：上下文容量有限。

- Limited attention：即使信息仍处于上下文中，模型也不一定能够有效关注。

长期记忆则强调 Read and Write，即既能检索已有信息，也能写入新的经验、知识与技能。

需要注意：短期记忆和长期记忆的区别主要是生命周期与使用机制，并不等同于是否使用向量数据库。

### 6\.2 RAG 与 Agent Memory 的关系

#### 6\.2\.1 传统 RAG 的局限

检索增强生成（Retrieval\-Augmented Generation, RAG）通过检索外部知识，为模型生成答案提供参考。

其基本过程为： $q \xrightarrow{\text{Retriever}} D_q \xrightarrow{\text{LLM}} y$

其中：

- $q$：用户查询。

- $D_q$：检索得到的相关文档。

- $y$：最终生成结果。

传统 RAG 的知识库通常具有只读特征： $\operatorname{Retrieve}(q) \rightarrow D_q$。这种知识库为 Read\-only LTM（只读长期记忆）。因为传统检索语料往往由外部人员编写，例如维基百科编辑者，而非智能体自身产生。

由此带来两方面限制：

1. 经验来源限制：外部知识库主要保存他人的知识和经验，未必适合当前智能体的特定任务。

2. 存储结构限制：文档最初可能面向人类阅读，而不是为智能体的高效检索和推理设计。

相比之下，Agent Memory 需要支持自主写入： $\operatorname{Write}(m_t,M_t) \rightarrow M_{t+1}$

其中，$M_t$ 为当前记忆状态，$m_t$ 为新产生的记忆内容。

因此，Agent Memory 不仅需要 Retrieve，还需要 Write、Update 和 Delete 等操作。

#### 6\.2\.2 为什么传统 RAG 不总是有效

课件使用一个关于斯坦福大学教授与阿尔茨海默病神经科学研究的问答示例，说明传统 RAG 在复杂关联检索中的不足。传统 RAG 通常根据查询与文档之间的相似度返回相关片段，但复杂问题可能要求模型跨多个事实建立关联。

例如： $\text{Stanford Professor} \rightarrow \text{Research Area} \rightarrow \text{Alzheimer's Disease} $

如果相关信息分散在不同文档中，仅依靠单次相似度检索可能无法恢复完整关系。通过人类记忆进行对比，强调人类可以借助已建立的关联，从部分线索恢复相关信息。

由此引出智能体记忆的两个关键要求：

- 关联组织：不仅存储独立文本，还要建立信息之间的联系。

- 关联检索：能够沿已有关系逐步查找，而不是只执行一次相似度匹配。

这也为后续的记忆索引、遍历式检索与推理增强检索提供了动机。

### 6\.3 人类长期记忆的认知基础

#### 6\.3\.1 海马体索引理论

海马体索引理论（Hippocampal Indexing Theory），作为智能体长期记忆设计的认知启发。

- 新皮层（Neocortex）：参与存储分布式记忆表征。

- 海马体（Hippocampus）：形成指向这些表征及其关联的索引。

记忆可以涉及人物、事件、地点等不同信息。这一理论说明，长期记忆不一定需要将所有内容存储在同一个位置，而可以采用： $\text{Memory Index} \rightarrow \text{Stored Representations} $。索引负责定位和关联，具体记忆内容则分布存储。

#### 6\.3\.2 模式分离与模式补全

海马体索引机制支持两种重要的记忆能力。

1. 模式分离（Pattern Separation）

将相似经历区分为不同记忆，避免信息相互混淆。例如，两次发生在同一家餐厅的会议虽然地点相同，但时间、参与者和讨论内容不同，系统应将其区分为不同事件。

课件将这一机制与新皮层及海马旁区域（Parahippocampus）联系起来。

2. 模式补全（Pattern Completion）

利用部分线索和已有关联恢复较完整的记忆。例如，用户只提到某次项目会议的地点，系统就可能根据关联找到会议时间、参与者和决策结果。

课件指出，这一机制主要与海马体，特别是 CA3 区域有关。

|**机制**|**目标**|**对 Agent Memory 的启发**|
|---|---|---|
|Pattern Separation|区分相似记忆|去重、消歧、避免记忆混合|
|Pattern Completion|从局部线索恢复完整信息|关联检索、多跳检索、上下文恢复|

这两种机制相互补充：模式分离提高记忆的可区分性，模式补全提高记忆的可恢复性。

### 6\.4 智能体长期记忆的分类

课件借鉴人类长期记忆体系，将 Agent Memory 按内容分为三类：

|**记忆类型**|**英文**|**存储内容**|**代表系统**|
|---|---|---|---|
|情景记忆|Episodic Memory|经历、事件、交互记录|Generative Agents|
|语义记忆|Semantic Memory|事实、概念、归纳知识|Generative Agents|
|程序性记忆|Procedural Memory|技能、操作方法、可执行程序|Voyager|

这一分类基于记忆内容，而非底层实现方式。例如，三类记忆都可以使用文本数据库或向量数据库保存，但其语义和用途不同。

#### 6\.4\.1 情景记忆：Episodic Memory

情景记忆保存智能体经历过的具体事件。

其基本形式为： $m_i=(t_i,e_i,c_i) $

- $t_i$：事件发生时间。

- $e_i$：事件内容。

- $c_i$：事件相关上下文。

该表达式是对课件中事件流结构的抽象，并非课件规定的固定数据格式。课件以 Generative Agents 为例，展示了事件记忆的写入与读取机制。

写入：Append\-only Event Streams。

智能体持续记录观察到的事件，形成 Memory Stream（记忆流）。例如：某角色正在计划情人节聚会、某角色邀请朋友参加活动、某角色正在研究聚会安排。这些记录按照时间顺序追加。

读取：Heuristic Retrieval

由于事件流可能非常庞大，系统需要根据启发式评分选择相关记忆。

三个评分因素：

1. Recency：近期性。

2. Importance：重要性。

3. Relevance：相关性。

可以将综合评分概括为： $S(m_i,q)= \alpha R_{\text{recency}}(m_i) +\beta R_{\text{importance}}(m_i) +\gamma R_{\text{relevance}}(m_i,q)$

其中 $\alpha,\beta,\gamma$ 为权重。

示例中，系统根据“现在最期待什么”这一问题，从大量事件中检索与情人节聚会有关的记忆，进而生成回答。

因此，情景记忆的核心机制是： ${\text{Event Recording}\rightarrow\text{Memory Retrieval}\rightarrow\text{Contextual Response}}$

#### 6\.4\.2 语义记忆：Semantic Memory

语义记忆保存从经历中抽象出的稳定知识，而不是单个事件本身。

Write: LLM reasoning over events 即通过 LLM 对多个事件进行推理、归纳和反思，形成更高层次的知识。

例如，智能体观察到：

- Klaus 正在阅读研究文章。

- Klaus 正在做笔记。

- Klaus 正在与图书管理员讨论研究材料。

系统可以将这些观察归纳为：Klaus Mueller is dedicated to research\.

这种由具体观察形成抽象结论的过程，可以表示为： $\{e_1,e_2,\ldots,e_n\} \xrightarrow{\text{Reflection}} k$

其中 $k$ 表示归纳得到的语义知识。

语义记忆的读取方式同样是 Retrieval，但检索对象从具体事件扩展为抽象事实和经验总结。

情景记忆与语义记忆的主要区别：

- 情景记忆回答“发生过什么”。

- 语义记忆回答“从这些经历中知道了什么”。

二者可以相互转化：事件不断积累，经由反思形成语义知识。

#### 6\.4\.3 程序性记忆：Procedural Memory

程序性记忆保存可重复使用的技能或操作程序。课件使用 Voyager 展示程序性记忆的实现。

Voyager 的三个核心组成部分是：

1. Automatic Curriculum（自动课程）：根据当前能力与探索进度生成新的任务。

2. Iterative Prompting Mechanism（迭代提示机制）：结合执行反馈和错误信息反复改进程序。

3. Skill Library（技能库）：保存已验证的代码技能，供后续任务复用。

例如，智能体可能逐步掌握：Mine Wood Log：采集木材、Make Crafting Table：制作工作台、Craft Stone Sword：制作石剑、Make Furnace：制作熔炉、Combat Zombie：对抗僵尸。

其执行过程为： $\text{Task} \rightarrow \text{Skill Retrieval} \rightarrow \text{Code Execution} \rightarrow \text{Feedback} \rightarrow \text{Skill Update} $

课件强调：

- Write: Code\-based skills：将技能保存为代码。

- Read: Embedding retrieval：通过向量检索找到相关技能。

当执行失败时，系统根据环境反馈与错误信息修正代码；当技能通过自我验证后，将其加入技能库。

与情景记忆相比，程序性记忆的重点不是记录过去，而是将成功经验转化为未来可直接执行的能力。

### 6\.5 长期记忆的实现机制

#### 6\.5\.1 基础实现：文本存储与检索

课件将最简单的长期记忆实现称为 Naïve Implementation。它包含两个操作：

Write 将新的经验追加到文本语料库： $M_{t+1}=M_t\cup\{m_t\}$

Read 使用现成检索器获取相关记忆：$M_q=\operatorname{Retrieve}(q,M)$

例如：BM25、Neural Embeddings（神经向量表示）。

这种实现简单、易于扩展，但主要依赖文本相似性，可能难以处理复杂的关联关系。

#### 6\.5\.2 改进方向：关联遍历与索引增强

两类更复杂的实现方式：

1. Online Retrieval by Traversal

通过遍历已有关系进行在线检索。与直接返回相似文本不同，这类方法允许系统沿记忆之间的关联逐步查找。

例如： $m_1\rightarrow m_2\rightarrow m_3$

这与前文模式补全及复杂关系检索的需求相对应。

2. Index Augmentation with Reasoning/Referral

在写入阶段利用推理或引用关系增强记忆索引。

例如，一条新记忆除了保存文本内容，还可以建立与已有事件、人物或知识的关联。

这意味着记忆写入不再只是追加文本，还包括组织和维护索引结构。

两类方法分别改善：读取阶段的关联探索能力、写入阶段的知识组织能力。

### 6\.6 从记忆到学习：长期能力积累的统一视角

将长期记忆进一步扩展为智能体学习的统一框架。这里的 Memory 不仅指外部文本数据库，还包括能够跨任务保留的模型参数、提示策略、程序和反思经验。

#### 6\.6\.1 参数微调 Fine\-tuning Model Weights

最直接的学习方式是更新模型权重： $\theta_{t+1} = \theta_t-\eta\nabla_\theta\mathcal{L}(\theta_t)$

其中：

- $\theta_t$：当前模型参数。

- $\eta$：学习率。

- $\mathcal{L}$：训练损失函数。

课件展示了通过多任务问题、多种推理方法和工具调用轨迹生成训练数据的过程。

涉及的方法包括：Chain\-of\-Thought（CoT）、ReAct、Reflexion。

系统保留正确的执行轨迹，删除错误轨迹，并将有效轨迹重新格式化用于微调。例如，模型可以学习在不同任务中隐式选择适合的推理方法，而不是始终采用固定策略。这种方式将经验写入参数记忆，但可能存在训练成本和灾难性遗忘问题。

#### 6\.6\.2 跨任务提示优化 Prompt Optimization

第二种方式不直接修改模型参数，而是优化提示指令。一个提示优化过程：

$P_{t+1} = \operatorname{Optimize}(P_t,\mathcal{F}_t)$

- $P_t$：当前提示。

- $\mathcal{F}_t$：评估反馈。

- $P_{t+1}$：改进后的提示。

例如，系统针对一组语言任务生成多个候选指令，通过评分模型评估其效果，再保留表现更好的指令。

课件中的图表比较了不同提示优化方法在未见任务上的表现，说明提示优化可以提高跨任务泛化能力。

这类长期记忆保存的是如何指导模型完成任务的策略。

#### 6\.6\.3 改进智能体自身代码库

第三种方式是将学习成果保存到代码库。

以 SWE\-agent 的 Agent–Computer Interface 为例，展示智能体与计算机环境的交互。

智能体可以：Navigate Repository：浏览代码仓库、Search Files：搜索文件、View Files：查看文件、Edit Lines：编辑代码。

环境通过终端、文件系统等接口返回反馈。与参数微调不同，这种方式通过修改外部程序改变系统的后续行为。因此，代码库可以成为一种长期能力存储载体。

#### 6\.6\.4 保存事件与示例供未来检索

第四种方式是将执行经验保存为可检索的示例。

基本过程为： $\text{Experience} \rightarrow \text{Memory Storage} \rightarrow \text{Future Retrieval} $

其典型实现就是前文 Generative Agents 的 Memory Stream。

这种方式无需改变模型参数，能够通过持续积累历史事件支持后续决策。

#### 6\.6\.5 自我反思 Self\-Reflection

第五种方式是将失败经验和改进建议写入后续提示。

课件使用 Reflexion 来说明这一机制。

基本流程为： $\text{Query} \rightarrow \text{LLM} \rightarrow \text{Action} \rightarrow \text{Environment} \rightarrow \text{Reward} $

随后系统根据行动轨迹和奖励进行反思： $r_t= \operatorname{Reflect}(\tau_t,R_t)$

- $\tau_t$：执行轨迹。

- $R_t$：环境反馈或奖励。

- $r_t$：生成的反思内容。

反思内容被加入后续提示，指导下一次尝试。

其特点是：

- 不一定需要更新模型权重。

- 将失败经验转化为自然语言反馈。

- 通过多轮尝试改善后续行为。

#### 6\.6\.6 多种学习方式的组合

课件最后以 BetterTogether 为例，强调不同学习机制可以组合使用。

例如，交替进行提示优化和参数微调：

$P_{t+1}=\operatorname{OptimizePrompt}(P_t,\theta_t)$

$\theta_{t+1}=\operatorname{FineTune}(\theta_t,P_{t+1})$

核心思想：提示与参数可以协同优化，而不是必须单独选择一种方式。

五种学习机制：

|**学习方式**|**主要更新对象**|**保留的长期能力**|
|---|---|---|
|Fine\-tuning|模型参数|模型内部知识与行为模式|
|Prompt Optimization|提示指令|任务执行策略|
|Codebase Improvement|代码库|可执行技能与程序|
|Experience Storage|记忆库|历史事件与示例|
|Self\-Reflection|反思记录或提示上下文|错误经验与改进建议|

这些方法共同说明：智能体长期学习不局限于参数训练，也可以通过外部持久化信息和可复用行为实现。

### 6\.7 外部记忆管理

#### 6\.7\.1 有限上下文下的记忆架构

即使拥有长期记忆，LLM 在单次推理中仍受到上下文窗口限制。以 MemGPT 风格的外部记忆架构为例，展示了有限上下文与外部存储之间的协作。主要组成部分如下：

|**组件**|**作用**|
|---|---|
|System Instructions|保存系统级指令，通常只读|
|Working Context|保存当前工作信息，可读写|
|FIFO Queue|按先进先出方式管理近期消息|
|Output Buffer|为模型输出保留空间|
|Archival Storage|长期归档存储|
|Recall Storage|保存可召回的历史交互|
|Function Executor|执行记忆读写工具|
|Queue Manager|管理消息队列与上下文|

其中，FIFO（First In, First Out）表示先进先出。当上下文窗口接近容量限制时，系统需要决定哪些信息继续保留在工作上下文中，哪些信息移至外部存储。

其基本关系为： $\text{Working Context} \leftrightarrow \text{External Memory}$

#### 6\.7\.2 记忆读写作为工具调用

Reads and writes are function calls the agent issues itself\. 记忆的读取与写入由智能体主动发起工具调用完成。

例如：recall\_storage\.search\("six flags"\)

智能体可以根据当前任务检索历史记录，并将结果重新引入上下文。

这一机制具有三个重要特征：

1. 自主性：智能体决定何时检索或写入记忆。

2. 持久性：信息不依赖当前上下文窗口长期存在。

3. 选择性：只将当前任务需要的信息加载进上下文。

因此，外部记忆管理的核心不只是增加存储容量，还包括控制信息何时进入模型的工作上下文。

### 6\.8 记忆冲突与动态更新

#### 6\.8\.1 记忆更新的必要性

长期记忆可能包含过时、重复或相互矛盾的信息。

例如：

- 旧记忆：用户目前居住在城市 A。

- 新消息：用户已经搬到城市 B。

如果系统仅追加新记录而不处理旧信息，后续检索可能同时返回两个冲突事实。

因此，长期记忆需要动态更新机制。

#### 6\.8\.2 记忆提取与更新流程

以 mem0 风格的记忆管理流程为例，将其分为两个阶段。

**第一阶段：Extraction Phase**

系统读取：当前消息、最近交互记录、已有摘要。

通过 LLM 提取新的候选记忆。

$M_{\text{new}} = \operatorname{Extract}(H_t)$

其中 $H_t$ 表示当前可用的交互历史。

**第二阶段：Update Phase**

系统从已有记忆中检索与新记忆最相似的若干条：

$M_{\text{similar}} = \operatorname{TopK}(M_{\text{new}},M)$

然后根据新旧信息之间的关系选择更新操作。

#### 6\.8\.3 四种记忆更新操作

|**操作**|**触发条件**|**处理方式**|
|---|---|---|
|ADD|不存在相似记忆|当新信息尚未被保存时，创建新的记忆记录|
|UPDATE|新消息修改已有事实|当新信息改变已有事实时，修改对应记忆|
|DELETE|新消息否定已有事实|当新信息明确否定已有事实时，删除不再成立的记忆|
|NOOP|信息已存在或无关|当信息重复、无关或无需保存时，不执行写入|

例如：旧记忆：用户正在学习课程 A；新消息：用户已经完成课程 A。系统应更新学习状态，而不是保留两个相互矛盾的当前状态。

这四种操作共同构成长期记忆的基本维护机制： $M_{t+1} = \operatorname{UpdateMemory}(M_t,m_t,o_t)$

其中 $o_t\in \{\text{ADD},\text{UPDATE},\text{DELETE},\text{NOOP}\} $

需要区分：这是一种对课件更新流程的形式化概括，实际系统还可能涉及时间戳、来源和版本管理等机制。

### 6\.9 智能体记忆的整体架构与总结

#### 6\.9\.1 外部环境与内部记忆

External Environment 与 Internal Memory 有什么区别？二者都可以通过工具访问，但功能不同。

|**维度**|**外部环境（External Environment）**|**内部记忆（Internal Memory）**|
|---|---|---|
|核心功能|提供交互对象与行动反馈|保存信息、经验和技能|
|典型操作|Action / Observation|Read / Write|
|状态变化|行动可能改变环境|写入或学习改变记忆|
|主要作用|执行任务、感知世界|支持推理、检索和长期学习|

例如，智能体访问网页属于与外部环境交互；将网页中的重要事实保存到长期记忆，则属于记忆写入。

二者并非绝对独立：数据库、文件系统等技术载体既可能承载环境状态，也可能承载智能体记忆。区别主要在于其在系统中的功能。

#### 6\.9\.2 Agent Memory 的完整工作循环

综合本章内容，智能体的持续学习过程可以抽象为：

这一过程包含两个相互关联的循环：

任务执行循环 $\text{Reason} \rightarrow \text{Act} \rightarrow \text{Observe}$

记忆学习循环 $\text{Experience} \rightarrow \text{Store} \rightarrow \text{Retrieve} \rightarrow \text{Reflect} \rightarrow \text{Update}$

前者使智能体能够完成当前任务，后者使智能体能够积累经验并改善未来表现。

#### 6\.9\.3 本章核心知识

|**核心问题**|**对应概念或技术**|
|---|---|
|为什么需要记忆？|有限上下文、静态知识、灾难性遗忘|
|为什么传统 RAG 不够？|只读知识库、缺少自主写入、关联检索不足|
|人类记忆提供什么启发？|海马体索引、模式分离、模式补全|
|记忆按内容如何分类？|Episodic / Semantic / Procedural|
|如何读取和写入记忆？|Retrieval、Append、Index Augmentation|
|如何实现长期学习？|Fine\-tuning、Prompt Optimization、Codebase Improvement、Experience Storage、Reflexion|
|如何管理有限上下文？|Working Context、FIFO Queue、Archival Storage、Recall Storage|
|如何处理记忆冲突？|ADD、UPDATE、DELETE、NOOP|

### 6\.10 本章总结

Agent Memory 的本质是构建一种能够跨任务持续保留和利用信息的机制。

本章的逻辑可以归纳为三个层次。

第一，记忆是对 LLM 固有局限的补充。 参数知识难以实时更新，上下文窗口无法保存全部历史信息，传统 RAG 又主要依赖外部只读知识。因此，智能体需要能够自主读写的长期记忆。

第二，长期记忆不仅是存储，还涉及知识组织和能力形成。 情景记忆记录经历，语义记忆归纳知识，程序性记忆保存技能。通过检索、反思和关联机制，智能体能够将过去的经历转化为当前任务所需的信息与能力。

第三，记忆系统需要动态管理。 记忆的价值取决于能否准确检索、合理更新、处理冲突，并与当前推理过程有效结合。长期学习还可以通过参数微调、提示优化、代码改进和反思等多种方式实现。

最终，智能体的能力不再只由预训练模型决定，而由模型、外部记忆、工具和环境交互共同形成。

${ \text{Agent Capability} = f(\text{Model},\text{Memory},\text{Tools},\text{Environment}) }$

# Lecture 8 Agent Infrastructure 智能体基础设施

本讲围绕智能体系统的基础设施展开，重点研究两个相互关联的问题：

1. 推理基础设施（Inference Infrastructure）：如何通过 KV Cache 复用、分层存储和选择性重计算，降低长上下文推理的延迟与成本。

2. 智能体软件架构（Agent Software Architecture）：如何利用复合 AI 系统（Compound AI Systems）与 DSPy，将单一模型调用转化为可组合、可控制、可优化的程序。

两部分分别从计算资源管理与程序结构设计出发，提高智能体系统的效率、可靠性和可维护性。

## Part1 长上下文推理与 KV Cache

### 1\.1 长上下文推理的机遇与挑战

长上下文推理（Long\-context Inference）使大语言模型能够在单次请求中处理大量信息，包括文档、书籍、新闻、代码仓库、对话历史、视频与会议记录等。其核心价值不仅是扩大上下文窗口（Context Window），还在于使模型能够利用更多外部信息完成复杂任务。

上下文长度增加会带来三方面的问题，这三种代价共同限制了长上下文推理的大规模部署。

1. 推理延迟：输入越长，响应时间越长

LLM 推理通常分为两个阶段：

- Prefill（预填充）：处理输入上下文，计算各层的注意力中间状态。

- Decode（解码）：基于已有状态，自回归地逐个生成输出 Token。

总推理时间可以表示为： $T_{\text{total}} = T_{\text{prefill}}+T_{\text{decode}}+T_{\text{other}}$

其中，$T_{\text{other}}$ 包括排队、调度、数据传输等开销。

对于标准全注意力 Transformer，长度为 $L$ 的输入，其 Prefill 计算复杂度可近似表示为： $C_{\text{prefill}} = O(Ld^2+L^2d)$

- $L$：输入 Token 数量；

- $d$：隐藏状态维度；

- $O(Ld^2)$：线性投影与前馈网络的主要计算项；

- $O(L^2d)$：标准注意力计算项。

因此，Prefill 的计算成本并非在所有情况下都严格随上下文长度线性增长。对于标准全注意力，注意力部分具有二次复杂度。

2. 推理成本：GPU 计算与资源消耗增加

长上下文需要更多 GPU 计算资源，并增加 KV Cache 的存储需求。GPU 成本随使用量和上下文长度增加。实际成本不仅取决于 Token 数量，还与模型规模、并发程度、硬件利用率和缓存命中率有关。

3. 输出质量：长上下文中的长尾知识可能难以被准确利用

长上下文并不保证模型能够有效利用其中的全部信息。随着上下文长度增加，模型可能难以准确定位、整合和利用部分信息，尤其是长尾知识（Long\-tail Knowledge）。

因此，上下文容量（Context Capacity）不等于有效信息利用能力（Effective Context Utilization）；长上下文优化既需要解决计算效率问题，也需要关注信息利用质量。

### 1\.2 KV Cache 的原理

KV Cache（Key\-Value Cache）是 Transformer 自回归推理中的一种中间状态缓存机制。

在注意力计算中，输入隐藏状态 $X$ 通过线性变换生成： $Q=XW_Q, K=XW_K,V=XW_V$

注意力输出为： $\operatorname{Attention}(Q,K,V) = \operatorname{softmax} \left( \frac{QK^\top}{\sqrt{d_k}} \right)V$

- $Q$（Query）：当前 Token 用于查询其他 Token 的表示；

- $K$（Key）：用于与 Query 计算匹配程度；

- $V$（Value）：用于生成注意力加权结果。

在因果注意力（Causal Attention）中，历史 Token 不依赖未来 Token。因此，生成新 Token 时，已有 Token 的 K、V 可以在相同计算条件下复用。

若已经生成 $t$ 个 Token，则： $K_{\text{cache}}^{(t)} = [K_1,K_2,\ldots,K_t]$，$V_{\text{cache}}^{(t)} = [V_1,V_2,\ldots,V_t] $

生成第 $t+1$ 个 Token 时，只需计算新的 K、V，并更新缓存：$K_{\text{cache}}^{(t+1)} = [K_{\text{cache}}^{(t)};K_{t+1}]$，$V_{\text{cache}}^{(t+1)} = [V_{\text{cache}}^{(t)};V_{t+1}]$

KV Cache 避免了对历史 Token 的重复 K、V 计算，但新 Token 仍需对历史缓存执行注意力操作，因此不能将其理解为消除了全部注意力计算。

**KV Cache 的基本流程**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=MmIwMDViY2ZmYTVkODEzYzY4ZDZiMzA0MWNlODMxNmJfZWFkMTA1MTg0MzczODQ4ZjY1ZDg2YTNlMDJlMWMwNTJfSUQ6NzY5OTM0NTkzMDYyMTQ3MjI5Ml8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

该流程说明：无论 KV 是重新计算还是从缓存加载，只要缓存有效且计算语义一致，后续生成阶段就能够使用它。

### 1\.3 Prefill 瓶颈与推理性能指标

将长上下文推理的主要瓶颈定位于 Prefill 阶段，并重点使用两个指标评估性能。

1. Time to First Token（TTFT，首 Token 延迟）

指从提交请求到产生第一个输出 Token 的时间。

$TTFT = T_{\text{queue}} + T_{\text{prefill}} + T_{\text{first decode}} + T_{\text{overhead}}$

长上下文通常会显著增加 $T_{\text{prefill}}$，从而提高 TTFT。

2. Inter\-Token Latency（ITL，Token 间延迟）

指相邻两个输出 Token 之间的时间间隔：$ITL_i=t_{i+1}-t_i $，平均 ITL 可表示为：$\overline{ITL} = \frac{1}{N-1} \sum_{i=1}^{N-1}(t_{i+1}-t_i) $

TTFT 衡量开始响应的速度，ITL 衡量持续生成的速度。

二者并不等价：减少 Prefill 时间可能显著改善 TTFT，但不一定提高 Decode 阶段的生成速度。

### 1\.4 跨请求 KV Cache 复用

传统 KV Cache 主要用于同一请求内部的自回归解码，而 PPT 进一步提出跨请求、跨推理引擎的缓存复用。

其基础是：Contexts are often shared across queries\.

多个请求可能共享相同的上下文，例如：

- Book：针对同一本书进行多次问答；

- News：对相同新闻材料执行不同分析；

- Docs：企业内部多个用户访问相同文档；

- Chat History：多轮对话重复包含历史消息。

若每个请求都独立执行 Prefill，就会对共享内容进行重复计算。

**You Only Prefill Once（YOPO）**

当一个推理引擎已经完成某段上下文的 Prefill 后，其他引擎应尽可能复用已有 KV Cache，而非重新计算。

设共享上下文的 Prefill 成本为 $C_p$，共有 $N$ 次请求，不使用跨请求缓存时：$C_{\text{no-cache}}=NC_p$。理想情况下，仅首次请求需要计算：$C_{\text{cache}}=C_p$，理论上可节省：$S=1-\frac{1}{N} $。

实际系统还需要考虑缓存查找、加载、传输和维护开销，因此并不能达到完全零成本的复用。

结论： KV Cache 从单次推理的计算优化机制，进一步发展为跨请求共享的计算结果。其价值在于减少重复 Prefill，但要实现大规模复用，还必须解决存储容量、数据传输和缓存管理问题。

## Part 2 KV Cache 的分层存储与跨设备管理

### 2\.1 KV Cache 的存储容量问题

为了最大化 KV Cache 复用，系统需要存储更多缓存，并延长其保留时间。

理想情况下，每份 KV Cache 应当保存至最后一次复用完成。但由于未来请求无法准确预测，实际系统需要根据访问频率、存储成本和容量限制制定缓存保留与淘汰策略。

**KV Cache 的存储量计算**

对于具有 $N_{\text{layers}}$ 层的 Transformer，KV Cache 的理论存储量为：$M_{\text{KV}} = 2LN_{\text{layers}}N_{\text{kv-heads}}d_{\text{head}}b$

- $L$：缓存的 Token 数量；

- $N_{\text{layers}}$：Transformer 层数；

- $N_{\text{kv-heads}}$：每层 KV Head 数量；

- $d_{\text{head}}$：每个 Head 的维度；

- $b$：每个元素的存储字节数；

- 系数 $2$：分别对应 Key 和 Value。

因此， $M_{\text{KV}}\propto L $即 KV Cache 大小与上下文长度线性相关。在其他条件相同时，增加上下文长度会等比例增加 KV Cache 容量。

对不同模型的 KV Cache 大小进行了比较，说明即使将整张 GPU 显存全部用于缓存，也只能保存有限数量的长文档。以 Llama 3 70B 为例，按图中约 $300\text{ GB}$ / $10^6$ Token 估算，100K Token 的 KV Cache 约为： $M_{\text{100K}} = 300\times\frac{100000}{1000000} = 30\text{ GB} $，若 H100 显存容量为 $80\text{ GB}$，理论上最多保存： $N_{\text{docs}} = \left\lfloor\frac{80}{30}\right\rfloor = 2$。

这尚未计入模型权重、运行时工作区和其他显存占用。

因此，仅依赖 GPU 显存无法满足大规模、长期的 KV Cache 复用需求。

### 2\.2 分层存储架构 Hierarchical Storage

PPT 提出了 KV Cache 存储层次的扩展路线：

GPU Memory: 最快、容量有限，服务于当前推理

CPU RAM: 提供更大容量，支持 GPU–CPU Offloading

SSD: 持久化与大规模本地缓存

S3 / Remote Storage: 远程、跨节点及跨云共享

越往下，通常容量越大、单位容量成本越低，但访问延迟和传输代价越高。

技术演进顺序为： $\text{GPU (2024)} \Rightarrow \text{CPU RAM (2025 Q1)} \Rightarrow \text{SSD} \Rightarrow \text{S3 / Cross-cloud} $分。

分层存储的基本策略是将高频访问的热数据保留在高速存储中，将低频访问的冷数据迁移到容量更大、成本更低的存储介质中。

### 2\.3 计算成本与存储成本的权衡

Compute \(Prefill\) Cost ≫ Storage \(KV Cache\) Cost，重新执行 Prefill 的成本通常显著高于保存 KV Cache 的成本。

需要注意，图中采用两种不同的计费单位：Compute：每百万 Token 的 Prefill 成本；Storage：每百万 Token 每小时的 KV Cache 保存成本。因此，比较时必须考虑缓存保存时间。

设：$C_p$：一次 Prefill 的计算成本；$C_s$：每小时保存对应 KV Cache 的成本；$T$：缓存保存时长；$R$：保存期间发生的有效复用次数；$C_l$：每次加载缓存的成本。

缓存的净收益为：$B=RC_p-(TC_s+RC_l)$，当$RC_p>TC_s+RC_l $缓存才具有正向经济收益。

进一步得到： $R(C_p-C_l)>TC_s$，在 $C_p>C_l$ 的前提下，复用次数的盈亏平衡阈值为： $R> \frac{TC_s}{C_p-C_l}$

这属于基于课件成本比较的进一步推导，并非 PPT 直接给出的公式。

### 2\.4 三种 KV Cache 管理机制

传统缓存方式与三种跨 GPU 管理机制对比：

|**机制**|**核心操作**|**主要目的**|
|---|---|---|
|Traditional KV Cache|缓存仅存在于单次请求和单个引擎中|加速同一请求的解码|
|CPU Offloading|GPU → CPU|扩展缓存容量与生命周期|
|Prefix Caching|在不同请求、不同引擎间共享前缀 KV|避免重复计算相同前缀|
|PD Disaggregation|在 Prefill 与 Decode 引擎之间传输 KV|将两类推理负载分离|

**CPU Offloading（CPU 卸载）**

将 KV Cache 从 GPU 显存迁移到 CPU 内存，在需要时重新加载，从而降低 GPU 显存压力。

**Prefix Caching（前缀缓存）**

当多个请求具有相同的 Token 前缀时，可以复用该前缀的 KV Cache。

例如：$P_1=[A,B,C,Q_1]$，$P_2=[A,B,C,Q_2]$，两个请求均可以复用 $[A,B,C]$ 对应的 KV Cache。

但前缀缓存通常不能直接复用出现在不同前文之后的非前缀片段。这一限制将在第四章进一步讨论。

**Prefill\-Decode Disaggregation（预填充与解码分离）**

将 Prefill 和 Decode 部署到不同推理引擎，由 Prefill 引擎计算 KV Cache，再传输给 Decode 引擎继续生成。其目标是根据两种阶段不同的计算和内存访问特征分别优化资源配置。

三种机制并非互斥，而是可以在同一推理系统中组合使用。

## Part 3 LMCache：独立的 KV Cache 基础设施

### 3\.1 LMCache 的设计目标与架构

LMCache 是位于推理引擎与存储后端之间的独立 KV 缓存层，旨在为不同推理引擎提供统一的 KV Cache 管理能力。

四种基本缓存操作语义：

1. GPU–GPU Transfer：在不同 GPU 之间传输 KV Cache。

2. GPU–CPU Offloading：将 KV Cache 从 GPU 卸载到 CPU。

3. CPU–CPU Transfer：在不同 CPU 内存空间之间传输缓存。

4. Storage Offloading：将 KV Cache 卸载到持久化或远程存储。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTkzYTg2OTI2ZTRjY2Y2ZjYzNzM5Mjk1NmY5YjM5YzlfMWE2YWUyNmNhMzJjMDc1ZjQ1ZmVmOTk5Y2U4ZDJiMzZfSUQ6NzY5OTM0NTkzMjg1MjMzNDExNV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

该架构将缓存管理从推理引擎内部抽离，使缓存能够具有独立的生命周期，并被多个引擎共享。

### 3\.2 LMCache 的三项核心挑战

|**挑战**|**问题来源**|**LMCache 的解决方向**|
|---|---|---|
|缓存 I/O 效率低|分页内存管理、L2/L3 存储访问和 I/O 干扰推理|优化传输路径与缓存操作|
|难以适应推理引擎演进|vLLM、SGLang 的调度器与内存分配器不断变化|通过稳定接口降低耦合|
|缺少交互式管理能力|运维系统无法直接控制缓存|提供实时查询、迁移和管理 API|

新模型频繁发布，可能采用不同的内存分配和缓存布局。因此，如果外部缓存系统深度依赖推理引擎内部实现，就会产生较高的适配成本。LMCache 的设计目标是在推理引擎持续变化的情况下，尽量保持缓存层的独立性。

### 3\.3 LMCache 的性能优化技术

技术优化可以整合为三个主要方向：

1. 计算与 I/O 重叠（Compute–I/O Overlapping）

通过异步执行，使 KV Cache 加载或卸载与 GPU 计算同时进行。

相关技术包括：

- Layer\-wise Pipelining：按 Transformer 层进行流水线传输；

- Request Async \& Prefetch：异步请求与预取；

- KV Cache Proxy：通过缓存代理协调数据访问。

不采用重叠执行时： $T_{\text{serial}}=T_c+T_{io} $；理想完全重叠时：$T_{\text{overlap}} \approx \max(T_c,T_{io})$

因此理论上节省的时间为：$\Delta T = T_c+T_{io}-\max(T_c,T_{io})$。其中，$T_c$ 表示计算时间，$T_{io}$ 表示数据传输时间。

实际系统仍存在流水线启动、同步与资源竞争开销。

2. 批量操作（Batched Operations）

GPU 内存中的最佳计算粒度可能小于网络与存储设备适合处理的数据粒度。如果直接传输大量小型缓存块，会产生频繁的操作开销。因此，LMCache 通过批量操作提高 I/O 效率，包括：

- Configurable Chunk Size：可配置缓存块大小；

- Customized CUDA Kernel：定制 CUDA 内核；

- Batched KV Cache Store/Load：批量缓存读写；

- GPU Transfer Buffering：GPU 传输缓冲。

设每次 I/O 固定开销为 $t_0$，单次数据传输量为 $s$，带宽为 $B$，则： $T_{\text{IO}}=t_0+\frac{s}{B} $。当大量小数据分别传输时，固定开销会被重复支付。通过合并操作，可以减少 I/O 调用次数。

3. 最小化数据复制（Minimum Data Copy）

主要包括：

- Zero Copy：在 PD 分离、远程存储或磁盘传输中尽量减少额外的数据复制；

- Eviction\-based Offloading：根据缓存淘汰策略决定哪些缓存需要迁移到较低层存储。

其共同目标是减少不必要的内存复制、带宽消耗和 GPU 资源占用。

### 3\.4 KVConnector：推理引擎与缓存层解耦

KVConnector 为推理引擎和外部缓存层定义相对稳定的交互边界，使 LMCache 不必直接依赖 vLLM 内部调度器或内存分配器的所有实现细节。七个接口如下：

|**API**|**功能**|
|---|---|
|build\_connector\_meta|构建请求与缓存加载相关的元数据|
|start\_load\_kv|启动从连接器缓冲区加载 KV Cache|
|wait\_for\_layer\_load|检查或等待指定层的 KV 加载完成|
|save\_kv\_layer|将某层 KV 从 vLLM 分页缓冲区保存至连接器缓冲区|
|wait\_for\_save|等待缓存保存操作完成|
|get\_num\_new\_matched\_tokens|获取远程缓存中新匹配的 Token 数量|
|update\_state\_after\_alloc|临时缓冲区分配后更新连接器状态|

这些接口可以归纳为四种功能：元数据维护、缓存加载、缓存保存和状态同步。

其核心价值是实现推理计算与缓存管理的接口解耦。

### 3\.5 LMCache Controller：交互式缓存管理 API

与 KVConnector 主要服务于推理引擎内部交互不同，LMCache Controller 面向用户、管理员和编排系统（Orchestrators）提供缓存控制能力。六个管理 API：

|**API**|**功能**|**典型应用**|
|---|---|---|
|Lookup|根据 Token 列表查询缓存|检查缓存命中|
|Clear|清除缓存|释放资源、缓存维护|
|Pin|持久化缓存或设置 TTL|保留高价值缓存|
|Move|将缓存迁移到其他位置|跨节点迁移、负载调度|
|Compress|压缩 KV Cache|减少存储与传输开销|
|CheckFinish|检查非阻塞控制操作是否完成|异步操作状态管理|

其中，TTL（Time to Live）表示缓存的有效保留时间。

KVConnector 与 Controller 的区别在于：KVConnector 解决推理引擎如何加载和保存 KV；Controller 解决外部系统如何查询、控制和管理 KV。

### 3\.6 LMCache 的性能实验与复用特征

1. KV Cache Offloading 性能

实验比较了 LMCache、原生 vLLM（Naive vLLM）以及两种商业方案。TTFT 随 QPS（Queries Per Second，每秒请求数）的变化；ITL 随 QPS 的变化。图中 LMCache 在较高请求负载下仍保持较低的 TTFT 和 ITL，体现了缓存复用与卸载机制在重复上下文工作负载中的优势。

这一实验结果依赖具体模型、硬件、请求分布和缓存命中情况，不能直接推断所有场景都具有相同的性能提升。

2. 实际 KV Cache 复用率

右侧 CDF（Cumulative Distribution Function，累积分布函数）图展示了不同缓存复用率的分布。

其重要结论是：缓存复用具有明显的不均衡性，少量高复用用户或工作负载能够产生较高的缓存收益。

这意味着缓存管理策略应当关注复用频率，而不只是缓存大小。

### 3\.7 实际部署经验与技术趋势

KV Cache 基础设施发展的技术趋势。

1. 存储 I/O 性能持续提升：$100\text{ MB/s (S3)} \rightarrow 1\text{ GB/s (S3 Express One)} \rightarrow \sim10\text{ GB/s (CAIOS)} $

2. 新型注意力技术可以减少 KV Cache 的存储需求。

3. 系统需要综合考虑缓存压缩、远程数据传输、缓存复用价值和存储层次，而非单纯追求更大的缓存容量。

核心结论是：KV Cache 的价值不仅取决于是否能够缓存，还取决于是否能够以足够低的代价保存、定位、传输和复用。

## Part 4 CacheBlend：非前缀 KV Cache 的选择性重计算

### 4\.1 Prefix Caching 的局限性

传统前缀缓存适用于多个请求共享相同 Token 前缀的场景，但在 RAG（Retrieval\-Augmented Generation）中，检索结果往往由多个独立文档块组成。

例如： $P=[D_1,D_2,D_3,Q] $。其中 $D_i$ 表示检索文档块，$Q$ 表示用户查询。

假设 $D_2$ 的 KV Cache 是在其单独作为输入时生成的，那么将其放在 $D_1$ 后面，并不能保证缓存仍然有效。

原因：KV Cache 不仅与当前 Token 内容有关，还与其前文上下文有关。

因此，相同文本片段在不同上下文位置上可能产生不同的 KV 表示。

**简单拼接缓存为何会降低质量？**

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YjRkY2EwZWE0OTVhOTU2NGY4NjMyMmY4ZmM4NDBiMTVfMjgwZTVmZGJlNjdmZGE4Y2JhZTY5OTZjMWUwZjcwZWNfSUQ6NzY5OTM0NTkzMjg1MjM1MDQ5OV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=YTUzNzQ2NmVjYWY5YjQyNWU1ZDRiYmNjYzg2ODE3OTBfOTk5ODRiNTkzM2JjZmZmZGU3MTBlZTY3ZWJjYjk5NzRfSUQ6NzY5OTM0NTkzMjk0ODgwMzEwN18xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

两个文档块分别包含 Messi 和 Ronaldo 的进球信息，问题要求比较两者的进球数。

完整的 Prefill 可以在 Transformer 的后续层中建立跨文档的信息交互。

但如果直接拼接分别计算得到的文档 KV Cache：$KV_{\text{concat}} = [KV(D_1);KV(D_2)]$ 就可能缺失在完整上下文中应当发生的跨文档注意力交互。

Missing Cross\-Attention（缺失跨片段注意力），这里的 Cross\-Attention 是指不同文档片段之间的注意力交互，并非特指 Encoder–Decoder 架构中的 Cross\-Attention 模块。

对于完整上下文，第二个文档的某层隐藏状态可能依赖第一个文档：$H_{D_2}^{(l)} = f_l(H_{D_1}^{(l-1)},H_{D_2}^{(l-1)})$，而独立计算 $D_2$ 时，这种依赖不存在。

因此：$KV(D_1\oplus D_2) \neq KV(D_1)\oplus KV(D_2)$

一般情况下，不能通过简单拼接独立 KV Cache 来获得完整上下文 Prefill 的结果。

### 4\.3 计算效率与生成质量的权衡

三种缓存策略：

|**策略**|**计算量**|**质量特点**|
|---|---|---|
|Full Prefill|高|保留完整上下文交互|
|Reusing All KV Caches|低|可能缺失跨片段注意力|
|CacheBlend|介于两者之间|通过选择性重计算恢复关键交互|

CacheBlend 的核心思想：Selective Prefill / Selective Recompute（选择性预填充或选择性重计算）。并非重新计算所有 Token，而是在 Transformer 的不同层中选择部分重要 Token，重新计算其 KV 表示，其余 Token 继续复用已有缓存。

### 4\.4 CacheBlend 的分层重计算机制

完整 Prefill 对所有层、所有相关 Token 重新计算 KV；CacheBlend 则只重计算每层的一部分 Token。

设第 $l$ 层需要重计算的 Token 集合为：$S_l\subseteq\{1,2,\ldots,L\} $，那么：$KV_i^{(l)} = \begin{cases} KV_{i,\text{recomputed}}^{(l)}, & i\in S_l\\ KV_{i,\text{cached}}^{(l)}, & i\notin S_l \end{cases}$

不同层可以选择不同的 Token 集合： $S_1\neq S_2\neq\cdots\neq S_N $

这是因为不同层的隐藏状态和注意力交互需求并不相同。

其基本目标是尽量减少重计算量，同时恢复对生成质量影响较大的跨片段交互。

需要注意，课件展示了分层选择性重计算的机制，但没有在该页完整展开 Token 选择算法的数学细节。

### 4\.5 CacheBlend 的性能实验

实验比较了完整 KV 重计算、仅前缀缓存、直接 KV 复用和 CacheBlend。

1. 响应延迟

使用 F1 Score 与 TTFT 评估不同方案的质量和延迟。CacheBlend 在保持较高问答质量的同时，实现了约 $3\times$ 的响应速度提升。

如果基线延迟为 $T$，速度提高三倍意味着：$T_{\text{CacheBlend}}\approx\frac{T}{3}$，对应的延迟降低比例约为： $1-\frac{1}{3} = 66.7\%$

2. 吞吐量

使用平均请求到达率与 TTFT 的关系展示系统吞吐能力。图中 CacheBlend 相较完整重计算可实现约 $3\times$ 的吞吐量提升。吞吐量提升的主要来源是减少重复 Prefill 计算，使相同硬件能够处理更多请求。

### 4\.6 KV Cache 作为 AI\-Native Data

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=Yjg5OGMyZDliOWZkYzZkMTdhNjdmZjNlNzc1M2NlMWZfYzA4ZmIyOGM4MTFhOWZjMGNlZTQzMDZjZTZkNmQyNmZfSUQ6NzY5OTM0NTkzMDk2NTM1NjA2MV8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=M2I1NmFjOTZlMDEzNjQwM2Q4MDk5ZTk4OGIyNjUzY2VfN2M2MjI1NjA0NWZhYWUyYTgzMzM2ODUwNTY2OGU5YTlfSUQ6NzY5OTM0NTkzMDk2NTMzOTY3N18xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

将 KV Cache 提升到更一般的概念：AI\-Native Data（AI 原生数据）

含义：文本、对话、文档等上下文在 LLM 内部会被转换为可供后续计算使用的 KV 表示。与原始文本相比，KV Cache 保存了模型在特定计算条件下形成的中间表示。

三项价值：

- 可复用性：避免重复计算，降低延迟与 GPU 成本。课件给出 $5\text{–}10\times$ 响应速度提升的潜力。

- 注意力信息表示：KV Cache 与模型注意力计算直接相关。

- 上下文操作能力：支持更智能的上下文检索、压缩与融合。

但 KV Cache 不能脱离模型结构、位置编码、上下文依赖和缓存格式等兼容性条件任意复用。

结论： Prefix Caching 解决相同前缀的重复计算问题，CacheBlend 则针对非前缀文档片段，通过少量重计算恢复必要的上下文交互，实现计算效率与生成质量之间的平衡。

## Part 5 复合 AI 系统 Compound AI Systems

### 5\.1 从单体模型到模块化 AI 系统

传统 AI 应用通常以单个大语言模型（Monolithic LM）为核心，通过一次或少量模型调用完成复杂任务。

这种架构存在三个主要问题：

- 控制困难（Hard to Control）：模型内部的推理与决策过程难以进行精细控制。

- 调试困难（Hard to Debug）：输出错误时，难以确定错误来源。

- 改进困难（Hard to Improve）：修改提示词或更换模型可能影响整个系统的行为。

Compound AI Systems：使用语言模型作为专门化组件构建的模块化程序（Modular Programs）。

其核心思想是将复杂任务拆解为多个具有明确职责的模块，通过程序控制模块之间的信息流和执行顺序。

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTcyNmQzNTExMDJlMGEyZDc3ODE5M2YxZDlmYjEzZjZfNDJiNDBjOGRjMTE0NWNiMjJjYmFmZWY4MWFkY2MyYWNfSUQ6NzY5OTM0NTkzMDYyMTUwNTA2MF8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

### 5\.2 Compound AI Systems 的五项优势

通过 RAG、多跳检索和组合式报告生成等例子，归纳了复合 AI 系统的五项优势：

|**优势**|**核心含义**|
|---|---|
|Quality（质量）|组合职责更明确的模型能力，提高系统可靠性|
|Control（控制）|利用工具和程序逻辑控制执行过程，并逐步改进|
|Transparency（透明性）|调试执行轨迹，向用户提供结果来源|
|Efficiency（效率）|使用较小模型，将知识和控制流交由外部组件处理|
|Inference\-time Scaling（推理时扩展）|在推理阶段系统性搜索更优输出|

1. Quality：模块化提高输出质量

通过任务分解，可以为不同子任务配置适合的模型或工具。

例如，报告生成系统可以分别完成信息检索、内容规划、段落生成和结果检查，避免让单一模型承担所有职责。

2. Control：显式控制任务执行

多跳 RAG（Multi\-Hop RAG）可以根据中间结果执行下一轮检索。

这种机制允许系统通过工具获取外部证据，并根据任务需要调整执行路径。

3. Transparency：可追踪与可解释

系统能够记录检索结果、工具调用、模块输入输出和中间决策。

这些记录既有助于定位错误，也可以为用户提供结果来源（Attribution）。

4. Efficiency：降低系统成本

复合系统可以将知识存储、检索和流程控制从模型参数中分离出来。

因此，部分任务可以使用较小的模型完成，而不必完全依赖大规模模型。

5. Inference\-time Scaling：推理时扩展

系统可以在推理阶段投入更多计算资源，例如生成多个候选答案、进行搜索或验证。

其目标不是简单增加 Token 数，而是通过结构化搜索提高获得高质量输出的概率。

### 5\.3 Agentic Frameworks 的三种类型

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTdmZDk1NGEyMjdkNmNkYjViMjM4Njc0MzlmYjM4MzJfODRmN2Y3NTdjYzdlYWYyZGI1NjU0NWYyMWI0MDRlZWFfSUQ6NzY5OTM0NTkzMjk0ODgxOTQ5MV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

智能体框架：

|**类型**|**代表框架**|**主要关注点**|
|---|---|---|
|Agent Development|LangGraph、AutoGen、Crew|会话恢复、低代码、精细控制、并发、流式执行|
|Data\-Driven Optimization|DSPy、TextGrad、Trace|结构化配置、结构化日志、优化算法|
|Holistic Framework|TapeAgents|同时支持状态管理、结构化日志和数据驱动优化|

其中，Agent Development 框架主要解决智能体如何执行任务，Data\-Driven Optimization 框架主要解决智能体如何通过数据改进性能。

TapeAgents 试图结合两者，将智能体表示为可恢复的模块化状态机（Resumable Modular State Machine），并通过结构化日志支持后续优化、微调数据生成和日志复用。

### 5\.4 现有复合系统的 Stringly\-Typed 问题

虽然 Compound AI Systems 在架构上具有模块化特征，但很多系统仍然高度依赖人工编写的 Prompt 字符串。

传统 Prompt 往往混合五种不同职责：

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTM0YzJhOWM3MjExYzNjODgzM2EyNDc2NGJhMjhjNDNfNDFiNzU2YzYzYTk4ZjE2YzQ4NjVlNWE0YTkyNWE0MzhfSUQ6NzY5OTM0NTkzMjAyMjMyMDY3NV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

|**职责**|**对应抽象**|**作用**|
|---|---|---|
|输入输出行为|Signature|定义模块要完成什么任务|
|推理策略|Predictor|定义如何执行模型推理|
|输入输出格式转换|Adapter|构建模型输入并解析输出|
|目标与约束|Metrics / Assertions|定义评价标准和行为限制|
|参数优化|Optimizer|优化提示词或模型权重|

当这些职责都被写入同一个字符串时，系统架构就会与具体 Prompt 的表达方式耦合。这被称为 Stringly\-Typed 问题，即系统过度依赖缺乏明确结构约束的字符串。其后果是修改 Prompt 可能影响多个模块；模型迁移成本较高；优化目标与程序逻辑难以分离；系统难以自动优化。

进一步的研究方向：将 Compound AI Systems 抽象为由自然语言类型化模块组成、且能够学习和优化自身行为的程序。**这构成了 DSPy 的设计动机。**

## Part 6 DSPy：从 Prompt Engineering 到 Language Model Programming

### 6\.1 DSPy 的定义与设计理念

DSPy（Declarative Self\-improving Language Programs in Python）是由 Stanford NLP 研究人员开发的语言模型编程框架。其核心理念为Programming over Prompting（以编程代替直接操作提示词）。

传统方法主要依赖人工设计 Prompt，而 DSPy 将任务定义、执行策略与参数优化分离。

具体而言：

- 程序员定义任务的输入输出和模块关系；

- 框架负责将程序结构转换为模型可以执行的提示；

- 优化器根据数据和评价指标改进提示词或模型参数。

因此，DSPy 并不是取消 Prompt，而是将 Prompt 从人工维护的主要对象转变为可自动生成和优化的实现细节。

### 6\.2 DSPy 的三个核心抽象

DSPy 的核心概念：

|**传统方法**|**DSPy 抽象**|
|---|---|
|Hand\-written Prompts|Signatures|
|Prompting Techniques / Chains|Modules|
|Manual Prompt Engineering|Optimizers \+ DSPy Compiler|

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NTdiN2IxZWNiZWQwZDc5NTc1ZDk1MTM0MGIwOWUyOWJfODAxOGIxYWYwNGE2MDYxNDU5YWFiZTYzODE1ZWNhZjZfSUQ6NzY5OTM0NTkzMzE5NjU3ODM0Ml8xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

这三个抽象分别回答三个问题：

- Signature：任务是什么？

- Module：采用什么推理策略？

- Optimizer：如何根据评价结果改进程序？

### 6\.3 Signature：声明式输入输出规范

Signature 是 DSPy 中描述模型任务的声明式接口。Signature 主要包含三个要素：子任务的简要描述；一个或多个输入字段（Input Fields）；一个或多个输出字段（Output Fields）。例如："context, question \-\> answer"

该 Signature 定义了一个接收上下文和问题、输出答案的任务。其重点是声明需要完成的文本转换，而非手动规定模型必须使用怎样的提示词。

更完整的声明方式可以写为：

```Plain Text
import dspyclass AnswerQuestion(dspy.Signature):    
"""Answer the question using the given context."""    
context = dspy.InputField()    
question = dspy.InputField()    
answer = dspy.OutputField()
```

### 6\.4 Module：将推理技术封装为程序组件

Module 用于封装特定的模型调用方式或推理策略。典型模块包括：

- `dspy.Predict`：基本预测；

- `dspy.ChainOfThought`：链式思考；

- `dspy.ProgramOfThought`：程序辅助推理。

例如：

```Plain Text
qa = dspy.Predict("question -> answer")mt = dspy.ChainOfThought(    
"english_document -> french_translation")rc = dspy.ProgramOfThought(    
"contexts, question -> answer_found: bool")
```

这些模块可以通过不同的 Signature 完成不同任务。

Module 与 Signature 的区别在于：Signature 定义任务接口，Module 负责执行相应的推理过程。

### 6\.5 Adapter 与 Predictor：从程序到 Prompt

DSPy 内部的 Prompt 转换过程。例如：

```Plain Text
self.generate_query = dspy.ChainOfThought(    
"context, question -> query")
```

DSPy 可以根据模块和 Signature 生成结构化 Prompt，其中包含：输入字段说明；输出字段说明；字段格式；推理字段（Reasoning）；最终输出字段（Query）。

在这一过程中：Adapter 负责将结构化字段转换为模型输入，并解析模型输出；Predictor 负责根据模块定义执行模型预测。因此，程序员不必为每次调用手动编写完整 Prompt，而是通过统一接口定义模型行为。

### 6\.6 DSPy 的完整工作流程

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NjBhOWIxZDg0YmJmZTJjNjQwZDYyM2VlZTc3YmNhYmRfZTRiMzQzOTk4NjAxMGRhZGU3ZGNhYjA0YzA5YTcwYTFfSUQ6NzY5OTM0NTkzMDk2NTM4ODgyOV8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

DSPy 的开发流程的五个阶段：

1. Collect Dataset：收集输入输出示例，构建优化数据集

2. Write DSPy Program：定义 Signatures、Modules 和信息流

3. Define Validation Logic：确定评价指标、约束和优化器

4. Compile Program：根据数据和指标优化提示词或模型参数

5. Iterate：改进数据、程序结构或验证逻辑

DSPy 的编译过程可抽象为：$P^* = \operatorname{Compile}(P,D,M,O)$

$P$：原始 DSPy 程序；$D$：用于优化的数据；$M$：评价指标；$O$：优化器；$P^*$：经过优化的程序。

这里的 Compile 不等同于传统编程语言中的机器码编译，而是针对模型调用行为进行参数搜索和优化。

### 6\.7 Optimizer：自动提示词优化

优化器可以同时调整程序中多个模块的提示词或模型参数，而不是孤立地优化单次模型调用。

其典型过程包括：

1. 使用 Adapter 为各模块构建初始 Prompt；

2. 通过 Rejection Sampling（拒绝采样）生成和筛选模块示例；

3. 利用筛选后的示例更新模块配置；

4. 根据评价指标选择表现更好的程序。

#### 三类典型优化方法

|**优化方法**|**DSPy 工具**|**主要机制**|
|---|---|---|
|Automatic Few\-shot Prompting|BootstrapFewShotWithRandomSearch|自动构建和搜索少样本示例|
|Instruction Induction|MIPROv2|自动生成和优化指令及示例|
|Multi\-stage Fine\-tuning|BootstrapFinetune|利用生成的数据执行微调|

MIPROv2 展示了自动优化过程：optimizer = MIPROv2\(\)optimized\_program = optimizer\.compile\(program\)

实际使用时还需要根据 DSPy 版本提供模型、评价指标和数据集等参数。自动优化能够显著改善特定任务的程序表现，但提升幅度取决于数据、任务、模型和评价指标。

### 6\.8 DSPy 的实际应用与研究成果

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZTM3ZTkzNjNlYWFkMGZmNzdkMGY3NjIzYThmZjRmMWFfOTg0OGFmNTYwZDNhZGYyMDA2ZmUzMjZhODc0OWM2ZmJfSUQ6NzY5OTM0NTkzMzE5NjE2ODc0Ml8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=NDUyNmU1ZTkxNjBlYmEyZjg4OTM2NGI0ZjRlODE3MjdfYTVmNTQzNzQxZDljODM3YjM0NWE0YWM1MWIyMzRlMDlfSUQ6NzY5OTM0NTkzNDkyMDA5MzIxM18xNzkyNzQwMjI4OjE3OTI4MjY2MjhfVjM)

![Image](https://internal-api-drive-stream-jp.larksuite.com/space/api/box/stream/download/authcode/?code=ZDQ1MDJiYmQ4ZWZhYTMyMjJjNzViZGY3MjYyNGM4NjJfMTNlNDZiMzFmZTJmMzhmMjhmNTM0NDJjNWM4ZjgxYzBfSUQ6NzY5OTM0NTkzNTI1NTU3MjAwNl8xNzkyNzQwMjI3OjE3OTI4MjY2MjdfVjM)

采用相关自然语言编程与优化思想的研究系统，包括：PATH；IReRa；STORM；EDEN；Efficient Agents；ECG\-Chat。这些案例说明，DSPy 所代表的程序化优化思想已经应用于不同的语言模型任务和研究系统。

### 6\.9 Natural Language Programming：程序优于单体模型的条件

两项核心观点。

第一，在许多任务中，经过合理设计的程序可以比单一模型更准确、更可控、更透明，甚至更高效。

第二，开发者主要需要定义声明式程序，而不必手动规定每个底层实现细节。

高层优化器可以根据任务数据自动改进 Prompt、模型权重或未来可能出现的其他模型参数形式。

这体现了从手工提示词设计到声明式程序优化的转变。

### 6\.10 Natural Language Optimization：自动优化的三项经验

1. 高质量示例的重要性

对于许多任务，自动构建高质量示例（Bootstrapping Good Demonstrations）是有效的优化方法。其基本思想是通过示例展示期望行为，而不只是通过文字描述规则。

2. 指令优化与条件规则

在高质量示例基础上进一步生成和优化指令，可以改善程序表现。当任务包含较多条件判断或复杂规则时，明确的指令尤其重要。

3. Grounding 与 Credit Assignment

优化过程还需要有效的 Grounding（依据外部信息或评价证据建立可靠约束）和明确的 Credit Assignment（贡献归因）。对于多模块系统，如果最终结果错误，需要判断是哪个模块导致了性能下降，才能进行有针对性的优化。

例如，一个 RAG 系统回答错误可能来自检索失败、上下文选择错误或答案生成错误。仅根据最终答案分数优化所有模块，可能无法准确识别问题来源。

因此，DSPy 的长期价值不仅在于自动生成 Prompt，还在于支持基于数据、指标和模块结构的系统性优化。

## 总结

|**技术层次**|**核心问题**|**关键技术**|
|---|---|---|
|推理计算|如何避免重复 Prefill|KV Cache|
|存储基础设施|如何长期保存与共享缓存|Hierarchical Storage、LMCache|
|缓存算法|如何复用非前缀上下文|CacheBlend|
|系统架构|如何提高模型系统的可靠性与可控性|Compound AI Systems|
|程序抽象|如何减少对手写 Prompt 的依赖|DSPy Signature、Module|
|自动优化|如何基于数据持续改进系统|DSPy Optimizer、Compiler|

从整体上看，本讲体现了两个重要转变：

第一，从重复计算到计算结果复用。 KV Cache、LMCache 和 CacheBlend 将模型内部的计算结果转化为可保存、可共享、可管理和可选择性重计算的资源。

第二，从模型调用到程序化智能体系统。 Compound AI Systems 和 DSPy 将模型能力封装为具有明确接口的模块，并通过数据驱动的优化方法改进系统性能。

两条技术路线共同说明：高效、可靠的智能体不仅依赖模型能力，也依赖模型外部的存储系统、执行架构、模块接口与优化机制。


# ORIEN AI Trading PRD

## 1. 产品概述

ORIEN 是一个面向加密交易者的 AI 交易策略训练平台。用户不需要一开始连接钱包或投入真实资金，而是通过自然语言训练一个模拟 AI 交易员，让 AI 理解交易习惯、生成策略规则、模拟候选版本，并在用户批准后进入模拟运行。

在 Hedera x402 黑客松版本中，ORIEN 的核心定位是：

> 一个由 x402 支付机制驱动的 AI Trading Strategy Trainer。AI 交易员在需要外部市场信号、风险分析或模型委员会判断时，通过 x402 按次付费调用服务，并将支付与策略变更过程记录为可审计轨迹。

## 2. 背景与问题

### 2.1 用户痛点

加密交易者常见问题：

- 很难把自己的交易习惯转化成稳定、可执行的策略规则。
- AI Trading 产品常常像黑盒喊单，用户不知道 AI 为什么这样判断。
- 策略调整容易直接影响实盘，风险不可控。
- 不同模型可能给出不同判断，单模型输出容易过度自信。
- 付费交易信号、风控分析、回测服务通常依赖 API Key、订阅或中心化账号体系，不适合 autonomous agent 按需调用。

### 2.2 产品机会

ORIEN 通过“对话训练 + 策略版本 + 模拟验证 + 用户批准”降低 AI Trading 的信任门槛。结合 Hedera x402 后，ORIEN 可以展示一种新的 Agentic Trading 工作流：

```text
用户提出策略调整
-> AI 判断需要外部服务
-> x402 触发按次付款
-> 服务返回市场信号 / 风险分析 / 委员会投票
-> AI 生成候选策略
-> 用户批准
-> 模拟运行并记录审计
```

## 3. 产品目标

### 3.1 MVP 目标

在黑客松 demo 中完成一个最小闭环：

> 用户创建模拟交易员，选择主 AI，在 ETH/USDC 训练室中要求“更早识别有效突破”。AI 将 ETH 突破策略的确认时间从 15 分钟调整为 10 分钟，并通过 x402 付费调用市场信号、风险分析或模型委员会服务。付款完成后，AI 生成打法变更单，用户批准后创建策略并进入 Dashboard。

### 3.2 成功标准

- 用户能在 5 分钟内看懂完整流程。
- 至少一个服务接口由 x402 保护。
- 至少完成一次真实或可演示的 402 Payment Required -> 支付 -> 结果返回流程。
- 产品界面能解释 AI 为什么调整策略，以及调整的收益和代价。
- README 能讲清楚架构、设置步骤、支付流程和 demo 路径。

## 4. 目标用户

### 4.1 核心用户

半专业加密交易者：

- 熟悉 ETH、BTC、永续合约、止损、仓位等概念。
- 有自己的交易习惯，但不一定会写量化策略。
- 愿意先用模拟资金验证 AI 策略。

### 4.2 黑客松评委

评委关注点：

- 是否真实使用 Hedera / x402。
- 是否完成端到端付费请求。
- 是否体现 Agentic Economy，而不是普通 AI Trading 页面。
- 产品故事是否清晰，demo 是否可复现。

## 5. 核心概念

### 5.1 模拟交易员

用户注册后获得 `100 U` 模拟资金，用于训练和观察 AI 策略。MVP 不接实盘，不下真实订单。

### 5.2 ETH 突破策略

当前策略名称：

```text
知秋 01 · ETH 突破
```

基础规则：

| 规则 | 当前值 |
|---|---|
| 市场 | ETH 永续 / ETH-USDC |
| 方向 | 仅做多 |
| 正常行情确认时间 | 15 分钟 |
| 候选确认时间 | 10 分钟 |
| 波动较大时确认时间 | 15 分钟 |
| 单笔使用资金 | 20 U |
| 止损 | -3% |

“突破”指 ETH 价格突破关键阻力位或区间上沿，并出现量能、结构或价格延续等证据，说明本次上涨可能有效，而不是假突破。

### 5.3 打法变更单

AI 不直接修改正在运行的策略，而是生成候选版本：

```text
Current v1: 谨慎确认突破，15 分钟确认
Candidate A: 更早确认突破，10 分钟确认
```

用户批准后，候选版本才进入模拟运行。

### 5.4 模型委员会

模型委员会用于高风险策略变更，例如缩短确认时间、放宽止损、增加仓位或增加杠杆。

委员会由 3 个角色组成：

| 角色 | 职责 | 示例模型 |
|---|---|---|
| 机会席 | 寻找交易成立理由 | Claude Sonnet 5 |
| 反方席 | 寻找假突破和失败场景 | DeepSeek V4 Pro |
| 独立席 | 不预设多空，独立判断 | GPT 5.5 |

投票规则：

```text
至少 2 / 3 支持，候选策略才允许进入下一步。
```

硬风控不可被投票绕过：

- 单笔仓位上限
- 止损
- 杠杆限制
- 单日亏损上限

### 5.5 x402 付费服务

ORIEN 中可被 x402 保护的服务：

| 服务 | 用途 | MVP 是否必须 |
|---|---|---|
| Market Signal API | 判断 ETH 突破是否成立 | 必须 |
| Risk Analysis API | 判断仓位和止损是否合理 | 建议 |
| Model Committee Vote API | 多模型投票判断策略变更 | 加分 |
| Backtest API | 对候选策略做历史模拟 | 加分 |

## 6. MVP 用户流程

### 6.1 页面流程

```text
Landing
-> Create Sim Trader
-> Choose Brain
-> Training Room
-> AI Understanding
-> Change Order
-> Model Committee
-> Create Strategy
-> Dashboard
```

如果开发时间紧，可以压缩为 4 个页面：

```text
/start
/training
/committee
/dashboard
```

### 6.2 详细流程

#### Step 1: 首页

目标：传达产品核心价值。

核心文案：

```text
用对话，训练你的 AI 交易策略。
告诉 AI 你想怎么交易。它会追问、生成规则、模拟新旧版本，再由你决定是否让改变生效。
```

CTA：

```text
训练我的 AI
```

#### Step 2: 创建模拟交易员

用户输入邮箱和验证码，领取 `100 U` 模拟资金。

页面强调：

- 无需钱包
- 不产生真实交易
- 随时重置
- 7 天验证后再决定是否启用真钱

#### Step 3: 选择主 AI

用户选择一个主 AI：

| 类型 | 模型 | 定位 |
|---|---|---|
| 平衡型 | Claude Sonnet 5 | 速度、推理、成本均衡 |
| 快速型 | DeepSeek V4 Flash | 简单观察 |
| 深思型 | DeepSeek V4 Pro | 重大调整 |
| 模型委员会 | Sonnet + V4 Pro + GPT 5.5 | 高风险决策 |

MVP 默认选择平衡型，其余作为可选卡片展示。

#### Step 4: 训练室

页面展示：

- ETH/USDC 当前价格
- 模拟 K 线图
- AI 标记“突破证据出现”
- 当前策略卡片
- 对话输入框

当前策略：

```text
ETH 突破 v1
市场：永续，仅做多
周期：15m
确认时间：15 分钟
单笔仓位：20 U
止损：-3%
```

用户输入：

```text
我想更早识别有效突破
```

#### Step 5: AI 澄清

AI 输出理解：

```text
你真正想改变的是“确认时间”，不是提高仓位或降低风控。
```

AI 建议：

| 项目 | 当前 | 候选 |
|---|---|---|
| 突破确认 | 15 分钟 | 10 分钟 |
| 成交量条件 | 连续放大 | 保持不变 |
| 聪明钱信号 | 辅助参考 | 保持不变 |
| 仓位 | 20 U | 保持不变 |
| 止损 | -3% | 保持不变 |

风险提示：

```text
确认时间缩短后，更容易遇到假突破，交易次数可能增加。
```

#### Step 6: 付费购买外部信号

AI 判断需要调用外部服务：

```text
为了验证这个变更，我需要购买一次 Market Signal API。
```

调用流程：

```text
GET /api/market-signal?pair=ETH-USDC
-> 402 Payment Required
-> Agent pays via x402 on Hedera
-> Retry request with payment proof
-> Return signal result
```

服务返回：

```json
{
  "pair": "ETH-USDC",
  "signal": "breakout_detected",
  "volumeConfirmed": true,
  "volatility": "medium",
  "confidence": 0.74,
  "summary": "ETH has broken above the local resistance with rising volume."
}
```

#### Step 7: 模型委员会投票

如果启用模型委员会，Agent 调用：

```text
POST /api/committee/vote
```

首次请求返回：

```text
402 Payment Required
Price: 0.01 HBAR
```

支付后返回：

```json
{
  "result": "approved",
  "threshold": "2/3",
  "votes": [
    {
      "role": "opportunity",
      "vote": "support",
      "confidence": 0.76,
      "reason": "Breakout has volume support and earlier confirmation improves entry quality."
    },
    {
      "role": "devil_advocate",
      "vote": "oppose",
      "confidence": 0.71,
      "reason": "Shorter confirmation may increase false breakouts during high volatility."
    },
    {
      "role": "independent",
      "vote": "support",
      "confidence": 0.68,
      "reason": "Acceptable if position size and stop loss remain unchanged."
    }
  ]
}
```

页面结果：

```text
首次结果：2 / 3 支持
进入下一步：生成打法变更单
```

#### Step 8: 打法变更单

对比当前策略和候选策略。

| 指标 | Current v1 | Candidate A |
|---|---|---|
| 策略名称 | 谨慎确认突破 | 更早确认突破 |
| 确认时间 | 15 分钟 | 10 分钟 |
| 单笔仓位 | 20 U | 20 U |
| 止损 | -3% | -3% |
| 预期机会 | 较少 | 增加 |
| 假突破风险 | 较低 | 增加 |

安全提示：

```text
这是候选版本。批准前不会影响正在运行的交易员。
```

#### Step 9: 创建策略

用户点击：

```text
创建并开始模拟运行
```

系统创建：

```text
知秋 01 · ETH 突破
```

策略摘要：

```text
市场：ETH 永续，仅做多
正常行情：确认 10 分钟
波动较大时：确认 15 分钟
单笔使用：20 U
止损：-3%
```

#### Step 10: Dashboard

Dashboard 展示：

- 当前模拟资金：100 U
- 当前策略：知秋 01 · ETH 突破
- 今日发现机会
- 模拟买入和卖出记录
- 当天模拟盈亏
- AI 判断原因
- x402 支付记录
- Hedera tx hash
- HCS 审计消息 ID

## 7. 功能需求

### 7.1 前端功能

| 模块 | 功能 | 优先级 |
|---|---|---|
| 首页 | 展示产品价值和 CTA | P0 |
| 注册页 | 邮箱、验证码、领取 100 U | P0 |
| 选择 AI | 展示 4 种模型模式 | P0 |
| 训练室 | K 线、策略卡、对话输入 | P0 |
| AI 澄清页 | 展示 AI 理解和变更建议 | P0 |
| 支付状态 | 展示 402、付款中、付款成功 | P0 |
| 打法变更单 | 当前版本 vs 候选版本 | P0 |
| 模型委员会 | 三模型投票 | P1 |
| Dashboard | 展示模拟运行状态和审计记录 | P0 |

### 7.2 后端功能

| 接口 | 功能 | 优先级 |
|---|---|---|
| `POST /api/agent/message` | 解析用户策略调整意图 | P0 |
| `GET /api/market-signal` | x402 保护的市场信号服务 | P0 |
| `POST /api/risk-analysis` | x402 保护的风险分析服务 | P1 |
| `POST /api/committee/vote` | x402 保护的模型委员会投票 | P1 |
| `POST /api/strategy/create` | 创建模拟策略 | P0 |
| `GET /api/dashboard` | 获取策略运行状态 | P0 |
| `GET /api/audit` | 获取支付和策略变更记录 | P1 |

## 8. x402 与 Hedera 接入

### 8.1 必须完成

MVP 至少保护一个真实服务：

```text
GET /api/market-signal
```

要求：

- 未携带支付凭证时返回 `402 Payment Required`。
- 客户端或 Agent 根据返回信息完成付款。
- 通过 Blocky402 / facilitator 在 Hedera testnet 结算。
- 支付完成后重试请求并获得服务结果。

### 8.2 建议完成

如果时间允许，增加：

- `POST /api/committee/vote` 作为高价值付费服务。
- HCS 写入支付和策略变更审计记录。
- 使用 HTS 代币作为服务支付资产。

### 8.3 审计记录字段

```json
{
  "agentId": "orien-agent-001",
  "strategyId": "zhq-eth-breakout-001",
  "service": "market-signal",
  "amount": "0.005 HBAR",
  "paymentTx": "0.0.xxxxx@...",
  "decision": "reduce_confirmation_15m_to_10m",
  "committeeResult": "2/3 support",
  "timestamp": "2026-09-08T00:00:00+08:00"
}
```

## 9. 非功能需求

### 9.1 安全边界

MVP 不做真实交易，不连接真实交易账户，不提供投资建议承诺。

页面底部需展示：

```text
全部修改先经过模拟验证，不构成投资建议。
```

### 9.2 可解释性

每次策略调整必须展示：

- 用户原始意图
- AI 理解结果
- 修改了什么
- 没有修改什么
- 潜在代价
- 是否通过委员会或风险分析

### 9.3 可演示性

演示环境必须可稳定复现，不依赖实时行情波动。K 线、AI 输出和回测结果可以使用 mock 数据。

## 10. Demo 剧本

1. 用户打开 ORIEN 首页。
2. 用户创建模拟交易员，获得 `100 U`。
3. 用户选择平衡型 AI。
4. 进入 ETH/USDC 训练室，看到 AI 标记“突破证据出现”。
5. 用户输入：“我想更早识别有效突破。”
6. AI 澄清：这是把确认时间从 15 分钟缩短到 10 分钟，不改变仓位和止损。
7. AI 调用 `Market Signal API`，首次请求返回 `402 Payment Required`。
8. Agent 通过 x402 在 Hedera testnet 付款。
9. 支付后服务返回市场信号。
10. 模型委员会投票，2/3 支持。
11. AI 生成打法变更单：Current v1 vs Candidate A。
12. 用户批准，创建 `知秋 01 · ETH 突破`。
13. Dashboard 展示策略、模拟资金、支付记录和审计记录。

## 11. MVP 范围裁剪

### 11.1 必须做

- ETH/USDC 单一市场。
- 单一策略：ETH 突破。
- 单一用户路径：15 分钟确认 -> 10 分钟确认。
- 一个 x402 保护服务。
- 一个支付成功后的返回结果。
- 策略变更单。
- Dashboard。

### 11.2 可以 mock

- K 线行情。
- AI 模型输出。
- 回测结果。
- 模型委员会投票。
- HCS 审计记录展示。

### 11.3 暂不做

- 真实交易下单。
- 多币种策略。
- 复杂回测引擎。
- 用户资产托管。
- 高级风控组合。

## 12. 验收标准

### 12.1 产品验收

- 用户能完成从创建模拟交易员到策略创建的完整流程。
- 用户能看懂 ETH 突破策略被改了什么。
- 用户能看到“确认时间 15 分钟 -> 10 分钟”的收益和风险。
- 用户能看到模型委员会 2/3 支持结果。

### 12.2 技术验收

- 未付款访问付费服务时返回 `402`。
- 付款成功后可以拿到服务结果。
- 页面展示支付状态、金额和交易记录。
- README 包含安装、运行、架构、支付流程和 demo 路径。

## 13. 一句话 Pitch

英文：

> ORIEN is an x402-powered AI trading strategy trainer where agents pay for market intelligence, risk analysis, and model committee votes before evolving a user-approved trading strategy.

中文：

> ORIEN 是一个基于 x402 的 AI 交易策略训练器。AI 交易员会按次付费购买市场信号、风险分析和模型委员会判断，再生成可解释、可批准、可模拟验证的策略变更。


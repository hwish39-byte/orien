# ORIEN AI 交易策略训练器

ORIEN 是一个基于 x402 的 AI 交易策略训练器 demo。模拟交易员会学习用户对 ETH/USDC 突破策略的偏好，按次付费购买市场信号，邀请模型委员会投票，然后生成一个由用户批准后才进入模拟运行的候选策略。

## Demo 演示路径

1. 打开应用，点击 `训练我的 AI`。
2. 领取 `100 U` 模拟资金。
3. 选择默认的平衡型 AI。
4. 在 ETH/USDC 训练室中输入 `我想更早识别有效突破`。
5. 查看 AI 理解结果：确认时间从 `15 分钟` 调整为 `10 分钟`，仓位和止损保持不变。
6. 触发 Market Signal API。第一次请求会返回 `402 Payment Required`。
7. 点击 `模拟付款并重试`，客户端会携带 x402 demo proof 重新请求，并获得市场信号。
8. 查看模型委员会投票结果：`2 / 3 支持`。
9. 批准打法变更单，进入 Dashboard 查看模拟运行状态。

## 本地运行

```bash
npm install
npm run dev
```

然后打开 [http://localhost:3000](http://localhost:3000)。

## API 接口

| 接口 | 用途 |
| --- | --- |
| `POST /api/agent/message` | 解析用户的策略调整意图，并返回可解释的 AI 建议。 |
| `GET /api/market-signal` | x402 保护的市场信号接口。未提供有效 proof 时返回 `402`。 |
| `POST /api/committee/vote` | x402 风格保护的模型委员会投票接口。 |
| `POST /api/strategy/create` | 创建模拟策略候选版本。 |
| `GET /api/dashboard` | 返回模拟运行状态、交易记录和审计记录。 |
| `GET /api/audit` | 返回 x402 支付和策略变更审计记录。 |

## x402 Demo 流程

MVP 使用一个确定性的本地 proof，方便评委在没有真实钱包的情况下复现完整流程：

```bash
curl -i "http://localhost:3000/api/market-signal?pair=ETH-USDC"
```

接口会返回 `402 Payment Required`，并带上支付元数据：

```text
x-accept-payment: x402; network=hedera-testnet; asset=HBAR; amount=0.005; payTo=0.0.482901
```

携带 demo proof 重新请求：

```bash
curl -i "http://localhost:3000/api/market-signal?pair=ETH-USDC" \
  -H "x-payment-proof: demo-x402-proof"
```

第二次请求会返回 ETH 突破信号和一个 mock 的 Hedera testnet 交易哈希。集成边界集中在 `app/api/market-signal/route.ts`，后续可以把当前的 proof 校验替换为真实的 Blocky402 或 Hedera facilitator。

## 项目结构

- `app/page.tsx`：可点击的完整 demo 流程。
- `app/globals.css`：交易驾驶舱风格的界面样式。
- `lib/demo-data.ts`：与 PRD 对齐的确定性 mock 数据。
- `app/api/*/route.ts`：demo API 路由。

## 安全边界

本项目不会连接交易所、钱包或真实交易账户。所有余额、交易记录、市场信号、委员会投票、HCS 消息 ID 和 Hedera 交易哈希均为黑客松 demo 使用的 mock 数据。

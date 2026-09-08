"use client";

import {
  Activity,
  Bot,
  Check,
  ChevronsRight,
  Clock3,
  CreditCard,
  DatabaseZap,
  FileCheck2,
  Gauge,
  KeyRound,
  Landmark,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  auditRecords,
  candles,
  committeeVote,
  strategyCandidate,
  strategyCurrent,
} from "@/lib/demo-data";

type PaymentState = "idle" | "required" | "paying" | "settled";
type DemoStep =
  | "start"
  | "trader"
  | "brain"
  | "training"
  | "understanding"
  | "payment"
  | "committee"
  | "change"
  | "dashboard";

const steps: Array<{ id: DemoStep; label: string }> = [
  { id: "start", label: "Start" },
  { id: "trader", label: "Sim trader" },
  { id: "brain", label: "Brain" },
  { id: "training", label: "Training" },
  { id: "understanding", label: "AI read" },
  { id: "payment", label: "x402" },
  { id: "committee", label: "Committee" },
  { id: "change", label: "Change" },
  { id: "dashboard", label: "Dashboard" },
];

const brains = [
  ["平衡型", "Claude Sonnet 5", "速度、推理、成本均衡"],
  ["快速型", "DeepSeek V4 Flash", "简单观察"],
  ["深思型", "DeepSeek V4 Pro", "重大调整"],
  ["模型委员会", "Sonnet + V4 Pro + GPT 5.5", "高风险决策"],
];

export default function Home() {
  const [step, setStep] = useState<DemoStep>("start");
  const [email, setEmail] = useState("demo@orien.ai");
  const [message, setMessage] = useState("我想更早识别有效突破");
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [signal, setSignal] = useState<typeof import("@/lib/demo-data").marketSignal | null>(null);
  const [strategyCreated, setStrategyCreated] = useState(false);

  const currentStepIndex = steps.findIndex((item) => item.id === step);
  const high = Math.max(...candles);
  const low = Math.min(...candles);

  const candlePath = useMemo(() => {
    return candles
      .map((price, index) => {
        const x = (index / (candles.length - 1)) * 100;
        const y = 92 - ((price - low) / (high - low)) * 74;
        return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
  }, [high, low]);

  async function requestMarketSignal() {
    setPaymentState("required");
    setSignal(null);
    await fetch("/api/market-signal?pair=ETH-USDC");
  }

  async function payAndRetry() {
    setPaymentState("paying");
    await new Promise((resolve) => setTimeout(resolve, 850));
    const response = await fetch("/api/market-signal?pair=ETH-USDC", {
      headers: { "x-payment-proof": "demo-x402-proof" },
    });
    const data = await response.json();
    setSignal(data);
    setPaymentState("settled");
  }

  async function createStrategy() {
    await fetch("/api/strategy/create", { method: "POST" });
    setStrategyCreated(true);
    setStep("dashboard");
  }

  return (
    <main className="shell">
      <aside className="rail" aria-label="Demo flow">
        <div className="brand">
          <span className="brandMark">O</span>
          <div>
            <strong>ORIEN</strong>
            <small>AI strategy trainer</small>
          </div>
        </div>
        <nav className="steps">
          {steps.map((item, index) => (
            <button
              key={item.id}
              className={index <= currentStepIndex ? "step active" : "step"}
              onClick={() => setStep(item.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="railFoot">
          <ShieldCheck size={18} />
          全部修改先经过模拟验证，不构成投资建议。
        </div>
      </aside>

      <section className="stage">
        <header className="topbar">
          <div>
            <p className="eyebrow">Hedera x402 hackathon demo</p>
            <h1>用对话，训练你的 AI 交易策略。</h1>
          </div>
          <div className="walletPill">
            <WalletCards size={18} />
            100 U simulated
          </div>
        </header>

        <div className="workspace">
          <section className="primary">
            {step === "start" && (
              <Panel icon={<Sparkles />} title="创建一个不会碰真钱的交易训练室">
                <p className="lead">
                  告诉 AI 你想怎么交易。它会追问、生成规则、模拟新旧版本，再由你决定是否让改变生效。
                </p>
                <div className="proofStrip">
                  <span>ETH/USDC</span>
                  <span>15m to 10m</span>
                  <span>x402 paid signal</span>
                </div>
                <button className="action" onClick={() => setStep("trader")}>
                  <Play size={18} />
                  训练我的 AI
                </button>
              </Panel>
            )}

            {step === "trader" && (
              <Panel icon={<KeyRound />} title="领取模拟交易员">
                <label className="field">
                  邮箱
                  <input value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <label className="field">
                  验证码
                  <input value="402918" readOnly />
                </label>
                <div className="featureGrid">
                  <span>无需钱包</span>
                  <span>不产生真实交易</span>
                  <span>随时重置</span>
                  <span>7 天后再决定是否启用真钱</span>
                </div>
                <button className="action" onClick={() => setStep("brain")}>
                  <Check size={18} />
                  领取 100 U
                </button>
              </Panel>
            )}

            {step === "brain" && (
              <Panel icon={<Bot />} title="选择主 AI">
                <div className="brainGrid">
                  {brains.map(([type, model, description], index) => (
                    <button
                      key={type}
                      className={index === 0 ? "brain selected" : "brain"}
                      onClick={() => setStep("training")}
                    >
                      <strong>{type}</strong>
                      <span>{model}</span>
                      <small>{description}</small>
                    </button>
                  ))}
                </div>
              </Panel>
            )}

            {step === "training" && (
              <Panel icon={<Activity />} title="ETH/USDC 训练室">
                <Chart path={candlePath} />
                <div className="strategyBar">
                  <Metric label="当前价格" value="$3,540.2" />
                  <Metric label="策略" value="ETH 突破 v1" />
                  <Metric label="确认时间" value="15 分钟" />
                  <Metric label="止损" value="-3%" />
                </div>
                <div className="chatBox">
                  <input value={message} onChange={(event) => setMessage(event.target.value)} />
                  <button onClick={() => setStep("understanding")}>
                    <ChevronsRight size={18} />
                  </button>
                </div>
              </Panel>
            )}

            {step === "understanding" && (
              <Panel icon={<Gauge />} title="AI 理解结果">
                <p className="lead">你真正想改变的是“确认时间”，不是提高仓位或降低风控。</p>
                <Comparison />
                <p className="warning">
                  确认时间缩短后，更容易遇到假突破，交易次数可能增加。
                </p>
                <button className="action" onClick={() => setStep("payment")}>
                  <DatabaseZap size={18} />
                  购买 Market Signal API
                </button>
              </Panel>
            )}

            {step === "payment" && (
              <Panel icon={<CreditCard />} title="x402 付费市场信号">
                <div className="paymentFlow">
                  <StatusItem state="done" label="GET /api/market-signal?pair=ETH-USDC" />
                  <StatusItem
                    state={paymentState === "idle" ? "idle" : "done"}
                    label="402 Payment Required · 0.005 HBAR"
                  />
                  <StatusItem
                    state={paymentState === "settled" ? "done" : paymentState === "paying" ? "live" : "idle"}
                    label="Agent pays via x402 on Hedera testnet"
                  />
                  <StatusItem state={signal ? "done" : "idle"} label="Retry with payment proof, receive signal" />
                </div>
                <div className="buttonRow">
                  <button className="secondary" onClick={requestMarketSignal}>
                    <Lock size={18} />
                    触发 402
                  </button>
                  <button className="action" onClick={payAndRetry} disabled={paymentState === "idle"}>
                    <Landmark size={18} />
                    模拟付款并重试
                  </button>
                </div>
                {signal && (
                  <pre className="code">{JSON.stringify(signal, null, 2)}</pre>
                )}
                {signal && (
                  <button className="action" onClick={() => setStep("committee")}>
                    <Bot size={18} />
                    进入模型委员会
                  </button>
                )}
              </Panel>
            )}

            {step === "committee" && (
              <Panel icon={<Bot />} title="模型委员会投票">
                <div className="voteHeader">首次结果：2 / 3 支持</div>
                <div className="voteGrid">
                  {committeeVote.votes.map((vote) => (
                    <article key={vote.role} className="voteCard">
                      <span>{vote.role}</span>
                      <strong>{vote.vote === "support" ? "支持" : "反对"}</strong>
                      <small>{vote.model} · {(vote.confidence * 100).toFixed(0)}%</small>
                      <p>{vote.reason}</p>
                    </article>
                  ))}
                </div>
                <button className="action" onClick={() => setStep("change")}>
                  <FileCheck2 size={18} />
                  生成打法变更单
                </button>
              </Panel>
            )}

            {step === "change" && (
              <Panel icon={<FileCheck2 />} title="打法变更单">
                <ChangeOrder />
                <p className="warning">这是候选版本。批准前不会影响正在运行的交易员。</p>
                <button className="action" onClick={createStrategy}>
                  <Check size={18} />
                  创建并开始模拟运行
                </button>
              </Panel>
            )}

            {step === "dashboard" && (
              <Panel icon={<Gauge />} title="Dashboard">
                <div className="strategyBar">
                  <Metric label="模拟资金" value="100 U" />
                  <Metric label="当前策略" value="知秋 01" />
                  <Metric label="今日机会" value="3" />
                  <Metric label="今日模拟盈亏" value="+0.8 U" />
                </div>
                <div className="runState">
                  <strong>{strategyCreated ? "策略 v2 正在模拟运行" : "策略 v2 已准备就绪"}</strong>
                  <span>正常行情确认 10 分钟，波动较大时仍确认 15 分钟。</span>
                </div>
                <AuditTable />
              </Panel>
            )}
          </section>

          <aside className="context">
            <section>
              <h2>Current v1</h2>
              <dl>
                <div><dt>市场</dt><dd>{strategyCurrent.market}</dd></div>
                <div><dt>方向</dt><dd>{strategyCurrent.direction}</dd></div>
                <div><dt>确认</dt><dd>{strategyCurrent.confirmationMinutes} 分钟</dd></div>
                <div><dt>仓位</dt><dd>{strategyCurrent.positionSize}</dd></div>
                <div><dt>止损</dt><dd>{strategyCurrent.stopLoss}</dd></div>
              </dl>
            </section>
            <section>
              <h2>Audit trail</h2>
              {auditRecords.map((record) => (
                <div className="auditMini" key={record.paymentTx}>
                  <span>{record.service}</span>
                  <strong>{record.amount}</strong>
                  <small>{record.paymentTx}</small>
                </div>
              ))}
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Panel({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="panel">
      <div className="panelTitle">
        <span className="iconBox">{icon}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Chart({ path }: { path: string }) {
  return (
    <div className="chart">
      <div className="chartTag">突破证据出现</div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="ETH price chart">
        <path className="gridPath" d="M0 78 H100 M0 54 H100 M0 30 H100" />
        <path className="pricePath" d={path} />
        <line className="resistance" x1="0" y1="35" x2="100" y2="35" />
      </svg>
    </div>
  );
}

function Comparison() {
  return (
    <div className="compare">
      {[
        ["突破确认", "15 分钟", "10 分钟"],
        ["成交量条件", "连续放大", "保持不变"],
        ["聪明钱信号", "辅助参考", "保持不变"],
        ["仓位", "20 U", "保持不变"],
        ["止损", "-3%", "保持不变"],
      ].map(([label, current, candidate]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{current}</strong>
          <strong>{candidate}</strong>
        </div>
      ))}
    </div>
  );
}

function ChangeOrder() {
  return (
    <div className="changeOrder">
      <div>
        <span>{strategyCurrent.version}</span>
        <h3>{strategyCurrent.stance}</h3>
        <p>确认时间 {strategyCurrent.confirmationMinutes} 分钟</p>
        <p>单笔仓位 {strategyCurrent.positionSize}</p>
        <p>止损 {strategyCurrent.stopLoss}</p>
        <small>预期机会较少，假突破风险较低。</small>
      </div>
      <div>
        <span>{strategyCandidate.version}</span>
        <h3>{strategyCandidate.stance}</h3>
        <p>确认时间 {strategyCandidate.confirmationMinutes} 分钟</p>
        <p>单笔仓位 {strategyCandidate.positionSize}</p>
        <p>止损 {strategyCandidate.stopLoss}</p>
        <small>预期机会增加，假突破风险增加。</small>
      </div>
    </div>
  );
}

function StatusItem({ label, state }: { label: string; state: "idle" | "live" | "done" }) {
  return (
    <div className={`statusItem ${state}`}>
      <Clock3 size={16} />
      <span>{label}</span>
    </div>
  );
}

function AuditTable() {
  return (
    <div className="auditTable">
      {auditRecords.map((record) => (
        <div key={record.hcsMessageId} className="auditRow">
          <span>{record.service}</span>
          <strong>{record.amount}</strong>
          <small>{record.paymentTx}</small>
          <small>{record.hcsMessageId}</small>
        </div>
      ))}
    </div>
  );
}

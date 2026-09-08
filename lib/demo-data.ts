export const strategyCurrent = {
  id: "zhq-eth-breakout-001",
  name: "知秋 01 · ETH 突破",
  version: "Current v1",
  stance: "谨慎确认突破",
  pair: "ETH-USDC",
  market: "ETH 永续",
  direction: "仅做多",
  timeframe: "15m",
  confirmationMinutes: 15,
  volatileConfirmationMinutes: 15,
  positionSize: "20 U",
  stopLoss: "-3%",
};

export const strategyCandidate = {
  version: "Candidate A",
  stance: "更早确认突破",
  confirmationMinutes: 10,
  volatileConfirmationMinutes: 15,
  positionSize: "20 U",
  stopLoss: "-3%",
  expectedOpportunity: "增加",
  falseBreakoutRisk: "增加",
};

export const marketSignal = {
  pair: "ETH-USDC",
  signal: "breakout_detected",
  volumeConfirmed: true,
  volatility: "medium",
  confidence: 0.74,
  summary: "ETH has broken above the local resistance with rising volume.",
};

export const committeeVote = {
  result: "approved",
  threshold: "2/3",
  votes: [
    {
      role: "机会席",
      model: "Claude Sonnet 5",
      vote: "support",
      confidence: 0.76,
      reason: "量能配合突破，提前确认有机会改善入场质量。",
    },
    {
      role: "反方席",
      model: "DeepSeek V4 Pro",
      vote: "oppose",
      confidence: 0.71,
      reason: "确认时间缩短后，在中等波动里假突破概率会上升。",
    },
    {
      role: "独立席",
      model: "GPT 5.5",
      vote: "support",
      confidence: 0.68,
      reason: "仓位与止损不变，候选版本可以进入模拟验证。",
    },
  ],
};

export const auditRecords = [
  {
    agentId: "orien-agent-001",
    strategyId: "zhq-eth-breakout-001",
    service: "market-signal",
    amount: "0.005 HBAR",
    paymentTx: "0.0.482901@1757295408.000000001",
    hcsMessageId: "0.0.784120-1757295410-000003",
    decision: "reduce_confirmation_15m_to_10m",
    committeeResult: "2/3 support",
    timestamp: "2026-09-08T09:42:00+08:00",
  },
  {
    agentId: "orien-agent-001",
    strategyId: "zhq-eth-breakout-001",
    service: "committee-vote",
    amount: "0.01 HBAR",
    paymentTx: "0.0.482901@1757295415.000000004",
    hcsMessageId: "0.0.784120-1757295417-000006",
    decision: "candidate_a_allowed_for_simulation",
    committeeResult: "2/3 support",
    timestamp: "2026-09-08T09:42:08+08:00",
  },
];

export const candles = [
  3368, 3374, 3362, 3380, 3377, 3386, 3392, 3391, 3404, 3411, 3406, 3422,
  3438, 3445, 3452, 3469, 3476, 3464, 3488, 3502, 3516, 3528, 3540, 3534,
];

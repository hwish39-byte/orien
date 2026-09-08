import { NextResponse } from "next/server";
import { strategyCandidate, strategyCurrent } from "@/lib/demo-data";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json({
    userIntent: body.message ?? "我想更早识别有效突破",
    understanding: "你真正想改变的是确认时间，不是提高仓位或降低风控。",
    recommendation: {
      changed: [
        {
          label: "突破确认",
          current: `${strategyCurrent.confirmationMinutes} 分钟`,
          candidate: `${strategyCandidate.confirmationMinutes} 分钟`,
        },
      ],
      unchanged: [
        { label: "成交量条件", value: "连续放大" },
        { label: "聪明钱信号", value: "辅助参考" },
        { label: "仓位", value: strategyCurrent.positionSize },
        { label: "止损", value: strategyCurrent.stopLoss },
      ],
    },
    risk: "确认时间缩短后，更容易遇到假突破，交易次数可能增加。",
    nextAction: "purchase_market_signal",
  });
}

import { NextResponse } from "next/server";
import { auditRecords, strategyCandidate, strategyCurrent } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    balance: "100 U",
    strategy: {
      ...strategyCurrent,
      version: "v2",
      stance: strategyCandidate.stance,
      confirmationMinutes: strategyCandidate.confirmationMinutes,
    },
    opportunitiesToday: 3,
    pnlToday: "+0.8 U",
    trades: [
      {
        time: "09:48",
        side: "模拟买入",
        price: "3,512.8",
        size: "20 U",
        reason: "突破阻力位后 10 分钟仍保持在区间上沿。",
      },
      {
        time: "10:21",
        side: "观察中",
        price: "3,527.4",
        size: "-",
        reason: "量能继续放大，但波动尚未触发 15 分钟保护确认。",
      },
    ],
    auditRecords,
  });
}

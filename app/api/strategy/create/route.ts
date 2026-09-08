import { NextResponse } from "next/server";
import { strategyCandidate, strategyCurrent } from "@/lib/demo-data";

export async function POST() {
  return NextResponse.json({
    status: "running",
    strategy: {
      ...strategyCurrent,
      version: "v2",
      stance: strategyCandidate.stance,
      confirmationMinutes: strategyCandidate.confirmationMinutes,
      createdAt: "2026-09-08T09:42:20+08:00",
    },
  });
}

import { NextResponse } from "next/server";
import { committeeVote } from "@/lib/demo-data";

export async function POST(request: Request) {
  const proof = request.headers.get("x-payment-proof");

  if (!proof) {
    return NextResponse.json(
      {
        error: "Payment Required",
        protocol: "x402",
        network: "hedera-testnet",
        asset: "HBAR",
        amount: "0.01",
        payTo: "0.0.482901",
        memo: "orien-committee-vote:zhq-eth-breakout-001",
      },
      { status: 402 },
    );
  }

  return NextResponse.json(committeeVote);
}

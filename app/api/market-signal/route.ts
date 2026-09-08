import { NextResponse } from "next/server";
import { marketSignal } from "@/lib/demo-data";

const validProofs = new Set(["demo-x402-proof", "hedera-testnet-demo-proof"]);

export async function GET(request: Request) {
  const proof = request.headers.get("x-payment-proof");

  if (!proof || !validProofs.has(proof)) {
    return NextResponse.json(
      {
        error: "Payment Required",
        protocol: "x402",
        network: "hedera-testnet",
        asset: "HBAR",
        amount: "0.005",
        payTo: "0.0.482901",
        memo: "orien-market-signal:ETH-USDC",
        retryWithHeader: "x-payment-proof",
      },
      {
        status: 402,
        headers: {
          "x-accept-payment": "x402; network=hedera-testnet; asset=HBAR; amount=0.005; payTo=0.0.482901",
        },
      },
    );
  }

  return NextResponse.json({
    ...marketSignal,
    payment: {
      status: "settled",
      network: "hedera-testnet",
      amount: "0.005 HBAR",
      txHash: "0.0.482901@1757295408.000000001",
    },
  });
}

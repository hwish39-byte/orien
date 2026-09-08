import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORIEN AI Trading Strategy Trainer",
  description: "x402-powered AI trading strategy trainer demo for ETH/USDC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

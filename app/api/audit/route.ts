import { NextResponse } from "next/server";
import { auditRecords } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ records: auditRecords });
}

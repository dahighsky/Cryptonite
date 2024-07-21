import { getRandomApiKey } from "@/lib/utils/apiKeyUtils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = getRandomApiKey();
    return NextResponse.json({ apiKey });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

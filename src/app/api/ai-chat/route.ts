import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const llmEndpoint = process.env.NEXT_PUBLIC_LLM_ENDPOINT;
  if (!llmEndpoint) {
    return NextResponse.json({ error: 'LLM endpoint not configured' }, { status: 500 });
  }
  try {
    const response = await fetch(llmEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to connect to LLM' }, { status: 500 });
  }
} 
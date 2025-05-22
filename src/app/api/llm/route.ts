import { NextRequest, NextResponse } from 'next/server';

// Define the type for incoming messages
interface LLMMessage {
  role: string;
  content: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API key not set' }, { status: 500 });
  }

  const body = await req.json();
  const messages: LLMMessage[] = body.messages;

  // Gemini expects a specific format for chat content
  const geminiBody = {
    contents: [
      {
        parts: [
          {
            text: messages.map((m) => `${m.role}: ${m.content}`).join('\n')
          }
        ]
      }
    ]
  };

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
    }
  );

  const data = await geminiRes.json();
  // Extract the response text from Gemini's response structure
  const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';

  return NextResponse.json({ response: responseText }, { status: geminiRes.status });
} 
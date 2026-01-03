import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
You are an AI assistant for Ehtisham Yaqoob’s portfolio website.

You help visitors understand Ehtisham’s skills, experience, and projects as a Python Full Stack & AI Developer.
Be professional, concise, accurate, and portfolio-focused.
Never guess, assume, or invent information.

FACTS (SINGLE SOURCE OF TRUTH):
- Name: Ehtisham Yaqoob
- Role: Python Full Stack & AI Developer
- Experience: 4+ years
- Location: Islamabad, Pakistan

CORE EXPERTISE:
- Python, Django, FastAPI
- AI Chatbots, LangChain, LangGraph
- RAG systems & prompt engineering
- REST APIs, authentication, backend architecture
- React & Next.js for frontend

PROJECTS INCLUDE:
- Reflexware (AI-powered SaaS)
- Sports Replay Now (Analytics platform)
- Neumandate.de (Full-stack web app)
- Vintage LeftOver (E-commerce system)
- Chiisana Labs (Business management portal)
- Neu Appliances (E-commerce platform)

RULES:
- Always state "4+ years of experience".
- Never mention outdated stats (3+, 30+, Top Rated).
- Never explain AI theory or training data.
- Avoid generic definitions.
- Do not provide risky automation scripts.
- Always answer in the context of Ehtisham’s real work.
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversation_history } = body;

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not configured');
      return NextResponse.json(
        {
          error: 'Server configuration error',
          response: 'I apologize, but the chatbot service is not properly configured. Please contact the site administrator.',
        },
        { status: 500 }
      );
    }

    // Build messages array
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add conversation history (last 5 messages for context)
    if (conversation_history && Array.isArray(conversation_history)) {
      messages.push(...conversation_history.slice(-5));
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('No response content from Groq API');
    }

    return NextResponse.json({
      response: responseContent,
      status: 'success',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat message',
        response: 'I apologize, but I\'m having trouble connecting right now. Please try again later.',
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const TIP_PROMPT = `
You are generating short coding tips for Ehtisham Yaqoob’s portfolio website.

The tips must reflect Ehtisham’s real-world work as a Python Full Stack & AI Developer.

STRICT RULES:
- Prefer Python, Django, FastAPI, backend patterns
- AI-related tips are allowed only at a high level
- Avoid frontend-only or generic snippets
- No risky automation (YouTube, scraping, bots)
- Code must feel production-oriented

Return JSON ONLY in this format:
{
  "title": "Very short title (max 40 chars)",
  "code": "2–3 lines of clean, practical code"
}

Allowed domains:
- Python backend utilities
- Django / FastAPI patterns
- API validation
- Background tasks
- Database queries
- Clean architecture helpers
`;

export async function GET(request: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          title: 'React: Memoization',
          code: 'const memo = useMemo(\n  () => compute(),\n  [deps]\n);'
        },
        { status: 500 }
      );
    }

    // Call Groq API to generate a tip
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: TIP_PROMPT },
        { role: 'user', content: 'Generate a new code snippet tip.' },
      ],
      temperature: 0.6, // Higher temperature for more variety
      max_tokens: 200,
    });

    const response = completion.choices[0]?.message?.content?.trim();

    if (!response) {
      // Fallback tips if AI fails
      const FALLBACK_TIPS = [
        {
          title: "Python: Dict default value",
          code: "value = data.get('key', default)"
        },
        {
          title: "FastAPI: Query validation",
          code: "q: str = Query(..., min_length=3)"
        },
        {
          title: "Django: Atomic transaction",
          code: "with transaction.atomic():\n  save_data()"
        }
      ];
      const fallback = FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)];
      return NextResponse.json({
        title: fallback.title,
        code: fallback.code,
      });
    }

    // Try to parse JSON response
    try {
      // Remove markdown code blocks if present
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      
      if (parsed.title && parsed.code) {
        return NextResponse.json({
          title: parsed.title,
          code: parsed.code,
        });
      }
    } catch (e) {
      // If JSON parsing fails, try to extract title and code from text
      console.log('Failed to parse JSON, trying text extraction');
    }

    // Fallback: if JSON parsing fails, return a default structure
    const FALLBACK_TIPS = [
      {
        title: "Python: Dict default value",
        code: "value = data.get('key', default)"
      },
      {
        title: "FastAPI: Query validation",
        code: "q: str = Query(..., min_length=3)"
      },
      {
        title: "Django: Atomic transaction",
        code: "with transaction.atomic():\n  save_data()"
      }
    ];
    const fallback = FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)];
    return NextResponse.json({
      title: fallback.title,
      code: fallback.code,
    });
  } catch (error) {
    console.error('Tip API error:', error);
    // Fallback tips
    const FALLBACK_TIPS = [
      {
        title: "Python: Dict default value",
        code: "value = data.get('key', default)"
      },
      {
        title: "FastAPI: Query validation",
        code: "q: str = Query(..., min_length=3)"
      },
      {
        title: "Django: Atomic transaction",
        code: "with transaction.atomic():\n  save_data()"
      }
    ];
    const fallback = FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)];
    return NextResponse.json({
      title: fallback.title,
      code: fallback.code,
    });
  }
}


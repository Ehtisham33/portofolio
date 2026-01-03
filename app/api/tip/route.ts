import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const TIP_PROMPT = `Generate a short, practical code snippet tip with a title and code.

Return the response in this exact JSON format:
{
  "title": "Brief title (max 50 chars) describing what the code does",
  "code": "The actual code snippet (2-3 lines max)"
}

The code should be related to one of these technologies:
- CSS/Tailwind CSS: utility classes, responsive design, animations
- JavaScript/TypeScript: ES6+ features, async/await, type safety, array methods
- Python: list comprehensions, decorators, context managers
- Database (MongoDB/PostgreSQL): queries, aggregations, indexes
- AWS: CLI commands, S3, Lambda, EC2
- Docker: Dockerfile commands, docker-compose, container management
- React/Next.js: hooks, server components, optimization
- Node.js: Express routes, middleware, error handling

Requirements:
- Title: Very short (max 50 characters), describes what the code does
- Code: 2-3 lines maximum, practical and immediately usable
- Use proper syntax for the language

Example response:
{
  "title": "TypeScript: Safe async fetch",
  "code": "const { data, error } = await fetch(url)\\n  .then(r => r.json())\\n  .catch(e => ({ error: e }));"
}`;

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
      temperature: 0.9, // Higher temperature for more variety
      max_tokens: 200,
    });

    const response = completion.choices[0]?.message?.content?.trim();

    if (!response) {
      // Fallback tips if AI fails
      const fallbackTips = [
        { title: 'TypeScript: Safe async fetch', code: 'const { data, error } = await fetch(url)\n  .then(r => r.json())\n  .catch(e => ({ error: e }));' },
        { title: 'Tailwind: Flexbox utilities', code: 'className="flex items-center\n  justify-between gap-2"' },
        { title: 'JavaScript: Remove duplicates', code: 'const unique = [...new Set(array)];' },
        { title: 'Python: List comprehension', code: 'data = [x*2 for x in range(10)]' },
        { title: 'Docker: Lightweight base image', code: 'FROM node:18-alpine\nWORKDIR /app' },
        { title: 'MongoDB: Query filter', code: 'db.collection.find(\n  { status: "active" }\n)' },
        { title: 'React: State hook', code: 'const [state, setState] =\n  useState(initial);' },
      ];
      const fallback = fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
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
    const fallbackTips = [
      { title: 'TypeScript: Safe async fetch', code: 'const { data, error } = await fetch(url)\n  .then(r => r.json())\n  .catch(e => ({ error: e }));' },
      { title: 'Tailwind: Flexbox utilities', code: 'className="flex items-center\n  justify-between gap-2"' },
      { title: 'JavaScript: Remove duplicates', code: 'const unique = [...new Set(array)];' },
    ];
    const fallback = fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
    return NextResponse.json({
      title: fallback.title,
      code: fallback.code,
    });
  } catch (error) {
    console.error('Tip API error:', error);
    // Fallback tips
    const fallbackTips = [
      { title: 'TypeScript: Safe async fetch', code: 'const { data, error } = await fetch(url)\n  .then(r => r.json())\n  .catch(e => ({ error: e }));' },
      { title: 'Tailwind: Flexbox utilities', code: 'className="flex items-center\n  justify-between gap-2"' },
      { title: 'JavaScript: Remove duplicates', code: 'const unique = [...new Set(array)];' },
      { title: 'Python: List comprehension', code: 'data = [x*2 for x in range(10)]' },
      { title: 'Docker: Lightweight base image', code: 'FROM node:18-alpine\nWORKDIR /app' },
      { title: 'MongoDB: Query filter', code: 'db.collection.find(\n  { status: "active" }\n)' },
      { title: 'React: State hook', code: 'const [state, setState] =\n  useState(initial);' },
    ];
    const fallback = fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
    return NextResponse.json({
      title: fallback.title,
      code: fallback.code,
    });
  }
}


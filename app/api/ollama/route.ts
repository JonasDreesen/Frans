import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({
  type: z.enum(['grammar_feedback', 'pronunciation_tip', 'example_sentence']),
  context: z.string().max(500),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const ollamaUrl = process.env.OLLAMA_BASE_URL
  if (!ollamaUrl) return NextResponse.json({ error: 'Ollama niet geconfigureerd.' }, { status: 503 })

  const { type, context } = schema.parse(await req.json())
  const model = process.env.OLLAMA_MODEL ?? 'llama3.2'

  const prompts: Record<string, string> = {
    grammar_feedback: `Je bent een Frans leraar voor Vlamingen. Geef korte feedback in het Nederlands. Maximaal 2-3 zinnen. Context: ${context}`,
    pronunciation_tip: `Je bent een Frans leraar voor Vlamingen. Geef een korte uitspraaktop in het Nederlands voor: ${context}`,
    example_sentence: `Je bent een Frans leraar voor Vlamingen. Geef 2 voorbeeldzinnen in het Frans met Nederlandse vertaling voor: ${context}`,
  }

  try {
    const res = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt: prompts[type], stream: false }),
    })
    if (!res.ok) throw new Error('Ollama fout')
    const data = await res.json()
    return NextResponse.json({ response: data.response })
  } catch {
    return NextResponse.json({ error: 'Kan Ollama niet bereiken.' }, { status: 503 })
  }
}

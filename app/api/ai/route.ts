import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { askAI, activeProvider, ChatMessage } from '@/lib/ai'
import { z } from 'zod'

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(2000),
      })
    )
    .min(1)
    .max(20),
})

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })
  return NextResponse.json({ provider: activeProvider() })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  try {
    const { messages } = schema.parse(await req.json())
    const { reply, provider } = await askAI(messages as ChatMessage[])
    return NextResponse.json({ reply, provider })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ongeldige invoer.' }, { status: 400 })
    }
    console.error('AI fout:', e)
    return NextResponse.json({ error: 'Er ging iets mis met de AI-coach.' }, { status: 500 })
  }
}

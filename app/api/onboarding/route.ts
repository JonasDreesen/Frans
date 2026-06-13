import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { seedUserContent } from '@/lib/seed'
import { z } from 'zod'

const schema = z.object({
  level: z.enum(['A1', 'A2', 'B1', 'B2']),
  focus: z.array(z.enum(['schrijven', 'luisteren', 'spreken'])).min(1),
  dailyGoal: z.number().int().min(5).max(60),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  try {
    const { level, focus, dailyGoal } = schema.parse(await req.json())

    await prisma.user.update({
      where: { id: session.user.id },
      data: { level, focus, dailyGoal, onboarded: true },
    })

    await seedUserContent(session.user.id, level)

    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ongeldige invoer.' }, { status: 400 })
    }
    console.error('Onboarding fout:', e)
    return NextResponse.json({ error: 'Kon profiel niet instellen.' }, { status: 500 })
  }
}

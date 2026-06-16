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

  let level: 'A1' | 'A2' | 'B1' | 'B2', focus: ('schrijven' | 'luisteren' | 'spreken')[], dailyGoal: number
  try {
    const parsed = schema.parse(await req.json())
    level = parsed.level
    focus = parsed.focus
    dailyGoal = parsed.dailyGoal
  } catch {
    return NextResponse.json({ error: 'Ongeldige invoer.' }, { status: 400 })
  }

  // Kritiek: dit MOET slagen, anders blijft de gebruiker bij elke nieuwe login
  // weer in de introductie belanden (onboarded staat dan nooit echt op true).
  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { level, focus, dailyGoal, onboarded: true },
    })
  } catch (e) {
    console.error('Onboarding: profiel opslaan mislukt:', e)
    return NextResponse.json(
      { error: 'Kon je profiel niet opslaan. Controleer je verbinding en probeer opnieuw.' },
      { status: 500 }
    )
  }

  // Niet-kritiek: als dit faalt, vullen /api/vocabulary en /api/grammar de inhoud
  // automatisch aan bij het eerste bezoek (self-healing), dus dit mag niet blokkeren.
  try {
    await seedUserContent(session.user.id, level)
  } catch (e) {
    console.error('Onboarding: inhoud seeden mislukt (niet kritiek, self-heal volgt):', e)
  }

  return NextResponse.json({ ok: true })
}

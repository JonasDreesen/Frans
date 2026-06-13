import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { calculateNextReview } from '@/lib/srs'
import { z } from 'zod'

const schema = z.object({
  userVocabId: z.string(),
  quality: z.number().int().min(0).max(5),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const body = await req.json()
  const { userVocabId, quality } = schema.parse(body)

  const uv = await prisma.userVocabulary.findFirst({
    where: { id: userVocabId, userId: session.user.id },
  })

  if (!uv) return NextResponse.json({ error: 'Niet gevonden.' }, { status: 404 })

  const result = calculateNextReview(uv.easeFactor, uv.interval, uv.repetitions, quality)
  const correct = quality >= 3

  await prisma.userVocabulary.update({
    where: { id: userVocabId },
    data: {
      easeFactor: result.easeFactor,
      interval: result.interval,
      repetitions: result.repetitions,
      nextReview: result.nextReview,
      mastered: result.mastered,
      lastScore: quality,
      totalCorrect: { increment: correct ? 1 : 0 },
      totalAttempts: { increment: 1 },
    },
  })

  // Log session activity
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  await prisma.learningSession.upsert({
    where: {
      id: `${session.user.id}-${today.toISOString().slice(0, 10)}`,
    },
    update: {
      wordsStudied: { increment: 1 },
      xpGained: { increment: correct ? 10 : 3 },
    },
    create: {
      id: `${session.user.id}-${today.toISOString().slice(0, 10)}`,
      userId: session.user.id,
      date: today,
      wordsStudied: 1,
      xpGained: correct ? 10 : 3,
    },
  })

  return NextResponse.json({ ok: true, nextReview: result.nextReview, mastered: result.mastered })
}

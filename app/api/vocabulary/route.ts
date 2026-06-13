import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { seedUserContent } from '@/lib/seed'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const now = new Date()

  // Zelfherstel: account zonder gekoppelde woordenschat alsnog seeden
  const existingCount = await prisma.userVocabulary.count({ where: { userId: session.user.id } })
  if (existingCount === 0) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { level: true },
    })
    await seedUserContent(session.user.id, user?.level ?? 'A1')
  }

  const dueItems = await prisma.userVocabulary.findMany({
    where: { userId: session.user.id, nextReview: { lte: now } },
    include: { vocabulary: true },
    orderBy: { nextReview: 'asc' },
    take: 20,
  })

  const newItems =
    dueItems.length < 5
      ? await prisma.userVocabulary.findMany({
          where: { userId: session.user.id, repetitions: 0, nextReview: { gt: now } },
          include: { vocabulary: true },
          orderBy: { vocabulary: { order: 'asc' } },
          take: 10 - dueItems.length,
        })
      : []

  const combined = [...dueItems, ...newItems]

  return NextResponse.json({
    items: combined.map((uv) => ({
      userVocabId: uv.id,
      vocabId: uv.vocabularyId,
      dutch: uv.vocabulary.dutch,
      french: uv.vocabulary.french,
      category: uv.vocabulary.category,
      level: uv.vocabulary.level,
      exampleNl: uv.vocabulary.exampleNl,
      exampleFr: uv.vocabulary.exampleFr,
      isBelgian: uv.vocabulary.isBelgian,
      repetitions: uv.repetitions,
      mastered: uv.mastered,
      isDue: uv.nextReview <= now,
    })),
    totalDue: dueItems.length,
  })
}

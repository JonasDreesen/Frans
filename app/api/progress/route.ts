import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const userId = session.user.id
  const now = new Date()

  const [user, masteredCount, completedModules, totalVocab, totalModules, dueCount, recentSessions] =
    await Promise.all([
      prisma.user.findUnique({ where: { id: userId }, select: { level: true, focus: true, dailyGoal: true } }),
      prisma.userVocabulary.count({ where: { userId, mastered: true } }),
      prisma.userGrammar.count({ where: { userId, completed: true } }),
      prisma.userVocabulary.count({ where: { userId } }),
      prisma.userGrammar.count({ where: { userId } }),
      prisma.userVocabulary.count({ where: { userId, nextReview: { lte: now } } }),
      prisma.learningSession.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 30 }),
    ])

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dayStr = d.toISOString().slice(0, 10)
    const found = recentSessions.find((s) => s.date.toISOString().slice(0, 10) === dayStr)
    if (found) streak++
    else if (i > 0) break
  }

  const totalXP = recentSessions.reduce((sum, s) => sum + s.xpGained, 0)
  const weeklyActivity = recentSessions
    .slice(0, 7)
    .map((s) => ({ date: s.date.toISOString().slice(0, 10), words: s.wordsStudied, xp: s.xpGained }))

  return NextResponse.json({
    level: user?.level ?? 'A1',
    focus: user?.focus ?? [],
    dailyGoal: user?.dailyGoal ?? 10,
    streak,
    totalXP,
    vocab: { total: totalVocab, mastered: masteredCount, due: dueCount },
    grammar: { total: totalModules, completed: completedModules },
    weeklyActivity,
  })
}

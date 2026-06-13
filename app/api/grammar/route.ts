import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getModuleBySlug } from '@/lib/content/grammar'
import { z } from 'zod'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const userModules = await prisma.userGrammar.findMany({
    where: { userId: session.user.id },
    include: { module: true },
    orderBy: { module: { order: 'asc' } },
  })

  return NextResponse.json({
    modules: userModules.map((ug) => ({
      userGrammarId: ug.id,
      moduleId: ug.moduleId,
      slug: ug.module.slug,
      titleNl: ug.module.titleNl,
      description: ug.module.description,
      level: ug.module.level,
      order: ug.module.order,
      bestScore: ug.bestScore,
      attempts: ug.attempts,
      completed: ug.completed,
      completedAt: ug.completedAt,
    })),
  })
}

const submitSchema = z.object({
  slug: z.string(),
  score: z.number().int().min(0).max(100),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const { slug, score } = submitSchema.parse(await req.json())

  const mod = await prisma.grammarModule.findUnique({ where: { slug } })
  if (!mod) return NextResponse.json({ error: 'Module niet gevonden.' }, { status: 404 })

  const existing = await prisma.userGrammar.findUnique({
    where: { userId_moduleId: { userId: session.user.id, moduleId: mod.id } },
  })

  const completed = score >= 70
  const bestScore = Math.max(existing?.bestScore ?? 0, score)

  await prisma.userGrammar.update({
    where: { userId_moduleId: { userId: session.user.id, moduleId: mod.id } },
    data: {
      bestScore,
      attempts: { increment: 1 },
      completed: completed || (existing?.completed ?? false),
      completedAt: completed && !existing?.completed ? new Date() : existing?.completedAt,
    },
  })

  const content = getModuleBySlug(slug)
  return NextResponse.json({ ok: true, completed, bestScore, tip: content?.tip })
}

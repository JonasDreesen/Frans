import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { vocabularyData } from '@/lib/content/vocabulary'
import { grammarModules } from '@/lib/content/grammar'
import { z } from 'zod'

const schema = z.object({
  level: z.enum(['A1', 'A2', 'B1', 'B2']),
  focus: z.array(z.enum(['schrijven', 'luisteren', 'spreken'])).min(1),
  dailyGoal: z.number().int().min(5).max(60),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const body = await req.json()
  const { level, focus, dailyGoal } = schema.parse(body)

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: session.user.id },
      data: { level, focus, dailyGoal, onboarded: true },
    })

    const levelMap = { A1: ['A1'], A2: ['A1', 'A2'], B1: ['A1', 'A2', 'B1'], B2: ['A1', 'A2', 'B1', 'B2'] }
    const allowed = levelMap[level as keyof typeof levelMap]
    const items = vocabularyData.filter((v) => allowed.includes(v.level))

    for (const item of items) {
      const vocab = await tx.vocabulary.upsert({
        where: { id: `${item.dutch}-${item.french}`.replace(/[^a-zA-Z0-9-]/g, '_').slice(0, 64) },
        update: {},
        create: {
          id: `${item.dutch}-${item.french}`.replace(/[^a-zA-Z0-9-]/g, '_').slice(0, 64),
          dutch: item.dutch, french: item.french, category: item.category,
          level: item.level, exampleNl: item.exampleNl, exampleFr: item.exampleFr,
          isBelgian: item.isBelgian, order: item.order,
        },
      })
      await tx.userVocabulary.upsert({
        where: { userId_vocabularyId: { userId: session.user.id, vocabularyId: vocab.id } },
        update: {},
        create: { userId: session.user.id, vocabularyId: vocab.id },
      })
    }

    for (const mod of grammarModules) {
      const gm = await tx.grammarModule.upsert({
        where: { slug: mod.slug },
        update: {},
        create: { slug: mod.slug, titleNl: mod.titleNl, description: mod.description, level: mod.level, order: mod.order },
      })
      await tx.userGrammar.upsert({
        where: { userId_moduleId: { userId: session.user.id, moduleId: gm.id } },
        update: {},
        create: { userId: session.user.id, moduleId: gm.id },
      })
    }
  })

  return NextResponse.json({ ok: true })
}

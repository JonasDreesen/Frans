import { prisma } from './db'
import { vocabularyData } from './content/vocabulary'
import { grammarModules } from './content/grammar'

const levelMap: Record<string, string[]> = {
  A1: ['A1'],
  A2: ['A1', 'A2'],
  B1: ['A1', 'A2', 'B1'],
  B2: ['A1', 'A2', 'B1', 'B2'],
}

// Deterministische id zodat herhaald seeden geen duplicaten oplevert
export function vocabId(dutch: string, french: string): string {
  return `${dutch}-${french}`.replace(/[^a-zA-Z0-9-]/g, '_').slice(0, 64)
}

// Zorgt dat de globale content (woordenschat + grammaticamodules) bestaat.
// Eén bulk-query per tabel i.p.v. honderden losse upserts.
export async function ensureGlobalContent(): Promise<void> {
  await Promise.all([
    prisma.vocabulary.createMany({
      data: vocabularyData.map((item) => ({
        id: vocabId(item.dutch, item.french),
        dutch: item.dutch,
        french: item.french,
        category: item.category,
        level: item.level,
        exampleNl: item.exampleNl,
        exampleFr: item.exampleFr,
        isBelgian: item.isBelgian,
        order: item.order,
      })),
      skipDuplicates: true,
    }),
    prisma.grammarModule.createMany({
      data: grammarModules.map((m) => ({
        id: m.slug,
        slug: m.slug,
        titleNl: m.titleNl,
        description: m.description,
        level: m.level,
        order: m.order,
      })),
      skipDuplicates: true,
    }),
  ])
}

// Koppelt de content aan een gebruiker (voortgangsrijen). Snel en idempotent.
export async function seedUserContent(userId: string, level: string): Promise<void> {
  await ensureGlobalContent()

  const allowed = levelMap[level] ?? ['A1']

  const [vocab, modules] = await Promise.all([
    prisma.vocabulary.findMany({ where: { level: { in: allowed } }, select: { id: true } }),
    prisma.grammarModule.findMany({ select: { id: true } }),
  ])

  await Promise.all([
    vocab.length > 0
      ? prisma.userVocabulary.createMany({
          data: vocab.map((v) => ({ userId, vocabularyId: v.id })),
          skipDuplicates: true,
        })
      : Promise.resolve(),
    modules.length > 0
      ? prisma.userGrammar.createMany({
          data: modules.map((m) => ({ userId, moduleId: m.id })),
          skipDuplicates: true,
        })
      : Promise.resolve(),
  ])
}

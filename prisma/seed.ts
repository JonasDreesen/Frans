import { PrismaClient } from '@prisma/client'
import { grammarModules } from '../lib/content/grammar'
import { vocabularyData } from '../lib/content/vocabulary'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding vocabulary...')
  for (const item of vocabularyData) {
    const id = `${item.dutch}-${item.french}`.replace(/[^a-zA-Z0-9-]/g, '_').slice(0, 64)
    await prisma.vocabulary.upsert({
      where: { id },
      update: {},
      create: {
        id,
        dutch: item.dutch,
        french: item.french,
        category: item.category,
        level: item.level,
        exampleNl: item.exampleNl,
        exampleFr: item.exampleFr,
        isBelgian: item.isBelgian,
        order: item.order,
      },
    })
  }
  console.log(`Seeded ${vocabularyData.length} vocabulary items.`)

  console.log('Seeding grammar modules...')
  for (const mod of grammarModules) {
    await prisma.grammarModule.upsert({
      where: { slug: mod.slug },
      update: { titleNl: mod.titleNl, description: mod.description, level: mod.level, order: mod.order },
      create: {
        slug: mod.slug,
        titleNl: mod.titleNl,
        description: mod.description,
        level: mod.level,
        order: mod.order,
      },
    })
  }
  console.log(`Seeded ${grammarModules.length} grammar modules.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

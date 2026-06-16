import { PrismaClient } from '@prisma/client'

// Neon's pooled endpoint (hostname met "-pooler") gebruikt PgBouncer in transaction-modus.
// Prisma moet dan "pgbouncer=true" krijgen (geen named prepared statements) en een laag
// connection_limit, anders falen queries vanuit Vercel's serverless functions soms stil.
function resolveDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL
  if (!url) return url

  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('-pooler.')) {
      if (!parsed.searchParams.has('pgbouncer')) parsed.searchParams.set('pgbouncer', 'true')
      if (!parsed.searchParams.has('connection_limit')) parsed.searchParams.set('connection_limit', '1')
    }
    return parsed.toString()
  } catch {
    return url
  }
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Alleen de datasource-override meegeven als er écht een URL is — geeft Prisma anders
// een expliciete { url: undefined } en gooit het direct een constructor-fout (bv. tijdens
// "next build" of als de env var ooit ontbreekt), terwijl het zonder override netjes
// zelf process.env.DATABASE_URL leest op het moment dat er een query gebeurt.
const resolvedUrl = resolveDatabaseUrl()

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : [],
    ...(resolvedUrl ? { datasources: { db: { url: resolvedUrl } } } : {}),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

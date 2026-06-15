import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Altijd live uitvoeren — nooit cachen
export const dynamic = 'force-dynamic'

// Diagnose-endpoint: open https://jouw-app.vercel.app/api/health
// Toont of de database werkt en of de omgevingsvariabelen zijn ingesteld.
// Lekt GEEN geheime waarden — enkel of ze aanwezig zijn.
export async function GET() {
  const env = {
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    NEXTAUTH_SECRET: Boolean(process.env.NEXTAUTH_SECRET),
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? null,
    AI_provider: process.env.GEMINI_API_KEY
      ? 'gemini'
      : process.env.OLLAMA_BASE_URL
        ? 'ollama'
        : 'ingebouwd',
  }

  let database: { ok: boolean; error?: string; tables?: Record<string, number> } = { ok: false }

  try {
    // Eenvoudige connectiviteitstest
    await prisma.$queryRaw`SELECT 1`

    // Tel rijen per tabel om te bevestigen dat het schema bestaat
    const [users, vocabulary, grammarModules] = await Promise.all([
      prisma.user.count(),
      prisma.vocabulary.count(),
      prisma.grammarModule.count(),
    ])

    database = { ok: true, tables: { users, vocabulary, grammarModules } }
  } catch (e) {
    database = {
      ok: false,
      error: e instanceof Error ? e.message.slice(0, 300) : 'Onbekende databasefout',
    }
  }

  const allGood =
    env.DATABASE_URL && env.NEXTAUTH_SECRET && Boolean(env.NEXTAUTH_URL) && database.ok

  return NextResponse.json(
    {
      status: allGood ? '✅ Alles in orde' : '⚠️ Configuratie onvolledig',
      env,
      database,
      hints: buildHints(env, database),
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  )
}

function buildHints(
  env: { DATABASE_URL: boolean; NEXTAUTH_SECRET: boolean; NEXTAUTH_URL: string | null },
  database: { ok: boolean; error?: string }
): string[] {
  const hints: string[] = []
  if (!env.DATABASE_URL) hints.push('DATABASE_URL ontbreekt in Vercel → voeg toe bij Settings → Environment Variables.')
  if (!env.NEXTAUTH_SECRET) hints.push('NEXTAUTH_SECRET ontbreekt → genereer er een en voeg toe in Vercel.')
  if (!env.NEXTAUTH_URL) hints.push('NEXTAUTH_URL ontbreekt → zet dit op je Vercel-URL (https://...vercel.app).')
  if (env.DATABASE_URL && !database.ok) hints.push('Database onbereikbaar of schema ontbreekt → controleer DATABASE_URL en voer de SQL uit in Neon.')
  if (hints.length === 0) hints.push('Geen problemen gevonden. Als je toch problemen ziet, log opnieuw in.')
  return hints
}

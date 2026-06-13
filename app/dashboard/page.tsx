import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  if (!session.user.onboarded) redirect('/onboarding')

  const userId = session.user.id
  const now = new Date()

  const [dueVocab, masteredVocab, totalVocab, completedModules, totalModules, recentSessions] = await Promise.all([
    prisma.userVocabulary.count({ where: { userId, nextReview: { lte: now } } }),
    prisma.userVocabulary.count({ where: { userId, mastered: true } }),
    prisma.userVocabulary.count({ where: { userId } }),
    prisma.userGrammar.count({ where: { userId, completed: true } }),
    prisma.userGrammar.count({ where: { userId } }),
    prisma.learningSession.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 7 }),
  ])

  // Streak
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
  const vocabPct = totalVocab ? Math.round((masteredVocab / totalVocab) * 100) : 0
  const grammarPct = totalModules ? Math.round((completedModules / totalModules) * 100) : 0

  const levelLabels: Record<string, string> = {
    A1: 'Absolute beginner', A2: 'Elementair', B1: 'Gevorderd beginner', B2: 'Gevorderd',
  }

  const focusLabels: Record<string, string> = {
    schrijven: '✍️ Schrijven', luisteren: '👂 Luisteren', spreken: '🗣️ Spreken',
  }

  return (
    <div className="md:pl-56 min-h-screen bg-slate-50">
      <Navigation />
      <main className="px-4 py-8 md:px-8 pb-24 md:pb-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Goedendag, {session.user.name}! 👋
          </h1>
          <p className="text-slate-500">
            Niveau: <span className="font-medium text-slate-700">{session.user.level}</span>
            {' · '}
            {levelLabels[session.user.level] ?? ''}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-3xl font-bold text-orange-500">{streak}</p>
            <p className="text-sm text-slate-500 mt-1">🔥 Dag streak</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-blue-600">{totalXP}</p>
            <p className="text-sm text-slate-500 mt-1">⭐ XP punten</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-emerald-600">{masteredVocab}</p>
            <p className="text-sm text-slate-500 mt-1">✅ Woorden geleerd</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-purple-600">{dueVocab}</p>
            <p className="text-sm text-slate-500 mt-1">📖 Te herhalen</p>
          </div>
        </div>

        {/* Actie kaart */}
        {dueVocab > 0 && (
          <div className="mb-8 rounded-xl bg-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Klaar voor je dagelijkse herhaling?</p>
                <h2 className="text-xl font-bold">{dueVocab} woorden te herhalen</h2>
                <p className="text-blue-100 text-sm mt-1">~{Math.ceil(dueVocab * 0.5)} minuten</p>
              </div>
              <Link
                href="/woordenschat"
                className="flex-shrink-0 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-all"
              >
                Start →
              </Link>
            </div>
          </div>
        )}

        {/* Voortgang */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">📚 Woordenschat</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">{masteredVocab} / {totalVocab} woorden</span>
              <span className="text-sm font-medium text-slate-700">{vocabPct}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-emerald-500 transition-all" style={{ width: `${vocabPct}%` }} />
            </div>
            <Link href="/woordenschat" className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">
              Oefenen →
            </Link>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">✏️ Grammatica</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">{completedModules} / {totalModules} modules</span>
              <span className="text-sm font-medium text-slate-700">{grammarPct}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-blue-500 transition-all" style={{ width: `${grammarPct}%` }} />
            </div>
            <Link href="/grammatica" className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">
              Oefenen →
            </Link>
          </div>
        </div>

        {/* Focus & weekactiviteit */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-3">🎯 Jouw focus</h3>
            <div className="flex flex-wrap gap-2">
              {session.user.focus.map((f) => (
                <span key={f} className="badge-blue badge text-sm px-3 py-1">
                  {focusLabels[f] ?? f}
                </span>
              ))}
            </div>
            <Link href="/profiel" className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">
              Focus aanpassen →
            </Link>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-3">📅 Activiteit (7 dagen)</h3>
            <div className="flex items-end gap-1 h-16">
              {Array.from({ length: 7 }).map((_, i) => {
                const d = new Date()
                d.setDate(d.getDate() - (6 - i))
                const dayStr = d.toISOString().slice(0, 10)
                const sess = recentSessions.find((s) => s.date.toISOString().slice(0, 10) === dayStr)
                const words = sess?.wordsStudied ?? 0
                const maxWords = Math.max(...recentSessions.map((s) => s.wordsStudied), 1)
                const height = words ? Math.max((words / maxWords) * 100, 15) : 4

                return (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-sm transition-all ${words > 0 ? 'bg-blue-400' : 'bg-slate-200'}`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-slate-400">
                      {['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'][d.getDay()]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

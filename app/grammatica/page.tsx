'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import { grammarModules, GrammarModule, GrammarExercise } from '@/lib/content/grammar'

interface UserModule {
  slug: string
  titleNl: string
  description: string
  level: string
  order: number
  bestScore: number
  attempts: number
  completed: boolean
}

interface Response {
  value: string
  correct: boolean
}

type View = 'list' | 'lesson' | 'exercise' | 'result'

// Vergelijkt antwoorden: hoofdletter-/spatie-ongevoelig, en vergeeft ontbrekende accenten
const COMBINING_MARKS = new RegExp(`[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`, 'g')
function stripAccents(s: string): string {
  return s.normalize('NFD').replace(COMBINING_MARKS, '')
}
function isCorrect(given: string, expected: string): boolean {
  const norm = (s: string) => s.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '')
  const a = norm(given)
  const b = norm(expected)
  return a === b || stripAccents(a) === stripAccents(b)
}

export default function GrammaticaPage() {
  const [userModules, setUserModules] = useState<UserModule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<View>('list')
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [currentEx, setCurrentEx] = useState(0)
  const [responses, setResponses] = useState<Record<string, Response>>({})
  const [typed, setTyped] = useState('')
  const [score, setScore] = useState(0)

  const fetchModules = async () => {
    setError(null)
    try {
      const res = await fetch('/api/grammar')
      if (!res.ok) {
        if (res.status === 401) setError('Je bent niet (meer) ingelogd. Log opnieuw in.')
        else setError(`De modules konden niet laden (fout ${res.status}). Controleer /api/health.`)
        setLoading(false)
        return
      }
      const data = await res.json()
      setUserModules(data.modules ?? [])
    } catch {
      setError('Kon geen verbinding maken met de server.')
    }
    setLoading(false)
  }

  useEffect(() => { fetchModules() }, [])

  const activeModule: GrammarModule | undefined = grammarModules.find((m) => m.slug === activeSlug)
  const exercises = activeModule?.exercises ?? []
  const currentExercise: GrammarExercise | undefined = exercises[currentEx]

  // Reset het tekstveld telkens bij een nieuwe oefening
  useEffect(() => { setTyped('') }, [currentEx, view])

  const openModule = (slug: string) => {
    setActiveSlug(slug)
    setView('lesson')
    setCurrentEx(0)
    setResponses({})
    setScore(0)
  }

  const startExercises = () => {
    setCurrentEx(0)
    setResponses({})
    setView('exercise')
  }

  const recordAnswer = (ex: GrammarExercise, value: string) => {
    setResponses((r) => ({ ...r, [ex.id]: { value, correct: isCorrect(value, ex.answer) } }))
  }

  const goNext = async () => {
    if (currentEx < exercises.length - 1) {
      setCurrentEx((c) => c + 1)
      return
    }
    // Laatste oefening → score berekenen en opslaan
    if (!activeModule) return
    const correctCount = exercises.filter((ex) => responses[ex.id]?.correct).length
    const pct = Math.round((correctCount / exercises.length) * 100)
    setScore(pct)

    await fetch('/api/grammar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: activeModule.slug, score: pct }),
    })
    await fetchModules()
    setView('result')
  }

  const levelColors: Record<string, string> = { A1: 'badge-green', A2: 'badge-amber', B1: 'badge-blue' }

  if (loading) {
    return (
      <div className="md:pl-56 min-h-screen bg-slate-50">
        <Navigation />
        <main className="flex items-center justify-center h-64">
          <div className="text-slate-500">Laden...</div>
        </main>
      </div>
    )
  }

  // ─── OVERZICHT ──────────────────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div className="md:pl-56 min-h-screen bg-slate-50">
        <Navigation />
        <main className="px-4 py-8 md:px-8 pb-24 md:pb-8 max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">✏️ Grammatica</h1>
            <p className="text-slate-500">
              {userModules.filter((m) => m.completed).length} / {userModules.length} modules voltooid
            </p>
          </div>

          {error ? (
            <div className="card border-red-100 bg-red-50">
              <p className="font-semibold text-red-700 mb-1">⚠️ Er ging iets mis</p>
              <p className="text-sm text-red-600 mb-3">{error}</p>
              <button className="btn-secondary" onClick={() => { setLoading(true); fetchModules() }}>Opnieuw proberen</button>
            </div>
          ) : userModules.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-4xl mb-4">📚</p>
              <p className="text-slate-500">Geen modules gevonden. Herlaad de pagina of doe eerst de niveautest.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {userModules.map((mod, idx) => {
                const prevCompleted = idx === 0 || userModules[idx - 1].completed
                const locked = !prevCompleted && !mod.completed

                return (
                  <div key={mod.slug} className={`card flex items-center justify-between gap-4 ${locked ? 'opacity-60' : ''}`}>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        mod.completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {mod.completed ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-slate-900">{mod.titleNl}</p>
                          <span className={`badge ${levelColors[mod.level] ?? 'badge-blue'}`}>{mod.level}</span>
                        </div>
                        <p className="text-sm text-slate-500 truncate">{mod.description}</p>
                        {mod.attempts > 0 && (
                          <p className="text-xs text-slate-400 mt-0.5">Beste score: {mod.bestScore}%</p>
                        )}
                      </div>
                    </div>
                    <button
                      className={locked ? 'btn-secondary py-2 px-3 text-sm cursor-not-allowed' : 'btn-primary py-2 px-3 text-sm'}
                      onClick={() => !locked && openModule(mod.slug)}
                      disabled={locked}
                    >
                      {locked ? '🔒' : mod.completed ? 'Herhalen' : 'Start'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    )
  }

  // ─── LES (uitleg) ───────────────────────────────────────────────────────────
  if (view === 'lesson' && activeModule) {
    return (
      <div className="md:pl-56 min-h-screen bg-slate-50">
        <Navigation />
        <main className="px-4 py-8 md:px-8 pb-24 md:pb-8 max-w-2xl mx-auto">
          <button onClick={() => setView('list')} className="text-sm text-slate-500 hover:text-slate-700 mb-6 inline-block">
            ← Terug naar overzicht
          </button>

          <div className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`badge ${levelColors[activeModule.level] ?? 'badge-blue'}`}>{activeModule.level}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">{activeModule.titleNl}</h1>
            <p className="text-slate-500 mb-4">{activeModule.description}</p>

            <div className="space-y-1 text-sm leading-relaxed">
              {activeModule.explanation.split('\n').map((line, i) => {
                const trimmed = line.trim()
                if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                  return <p key={i} className="font-bold text-slate-900 mt-3">{trimmed.replace(/\*\*/g, '')}</p>
                }
                if (trimmed.startsWith('|')) {
                  const cells = trimmed.split('|').map((c) => c.trim()).filter(Boolean)
                  if (cells.every((c) => /^[-\s]+$/.test(c))) return null
                  return (
                    <div key={i} className="flex gap-2 text-slate-700">
                      {cells.map((c, j) => (
                        <span key={j} className={`flex-1 ${j === 0 ? 'font-medium' : ''}`}>{c.replace(/\*\*/g, '')}</span>
                      ))}
                    </div>
                  )
                }
                if (trimmed.startsWith('- ')) {
                  return <p key={i} className="text-slate-700 ml-3">• {trimmed.slice(2).replace(/\*\*/g, '')}</p>
                }
                if (trimmed === '') return <div key={i} className="h-1.5" />
                return <p key={i} className="text-slate-700">{trimmed.replace(/\*\*/g, '')}</p>
              })}
            </div>

            {activeModule.tip && (
              <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
                <p className="text-sm text-amber-800">💡 <strong>Tip:</strong> {activeModule.tip}</p>
              </div>
            )}
          </div>

          <button className="btn-primary w-full" onClick={startExercises}>
            Oefeningen starten ({exercises.length} oefeningen) →
          </button>
        </main>
      </div>
    )
  }

  // ─── OEFENING ───────────────────────────────────────────────────────────────
  if (view === 'exercise' && activeModule && currentExercise) {
    const progress = (currentEx / exercises.length) * 100
    const response = responses[currentExercise.id]
    const answered = !!response

    return (
      <div className="md:pl-56 min-h-screen bg-slate-50">
        <Navigation />
        <main className="px-4 py-8 md:px-8 pb-24 md:pb-8 max-w-xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <button onClick={() => setView('lesson')} className="text-sm text-slate-500 hover:text-slate-700">← Uitleg</button>
              <span className="text-sm text-slate-500">{currentEx + 1} / {exercises.length}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{currentExercise.question}</h2>

            {currentExercise.context && (
              <p className="mb-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-slate-700">{currentExercise.context}</p>
            )}

            {/* Meerkeuze */}
            {currentExercise.type === 'multiple_choice' && currentExercise.options && (
              <div className="space-y-2">
                {currentExercise.options.map((opt) => {
                  let cls = 'w-full rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all '
                  if (!answered) {
                    cls += 'border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                  } else if (opt === currentExercise.answer) {
                    cls += 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  } else if (opt === response.value) {
                    cls += 'border-red-400 bg-red-50 text-red-600'
                  } else {
                    cls += 'border-slate-200 opacity-50'
                  }
                  return (
                    <button key={opt} className={cls} disabled={answered} onClick={() => recordAnswer(currentExercise, opt)}>
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Invul / vertaal */}
            {(currentExercise.type === 'fill_blank' || currentExercise.type === 'translate') && (
              <div>
                <input
                  type="text"
                  className="input text-center font-mono"
                  placeholder={currentExercise.type === 'fill_blank' ? 'Vul in...' : 'Vertaal...'}
                  value={answered ? response.value : typed}
                  onChange={(e) => setTyped(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && typed.trim() && !answered) recordAnswer(currentExercise, typed) }}
                  disabled={answered}
                  autoFocus
                />
                {!answered && (
                  <button className="btn-primary w-full mt-3" disabled={!typed.trim()} onClick={() => recordAnswer(currentExercise, typed)}>
                    Controleer
                  </button>
                )}
              </div>
            )}

            {/* Feedback — pas zichtbaar NA antwoorden */}
            {answered && (
              <>
                <div className={`mt-4 rounded-lg border px-4 py-3 ${
                  response.correct ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'
                }`}>
                  <p className={`text-sm font-semibold ${response.correct ? 'text-emerald-700' : 'text-red-600'}`}>
                    {response.correct ? '✓ Correct!' : '✗ Niet juist'}
                  </p>
                  {!response.correct && (
                    <p className="text-sm text-slate-700 mt-1">
                      Juiste antwoord: <span className="font-mono font-medium text-blue-700">{currentExercise.answer}</span>
                    </p>
                  )}
                  <p className="text-sm text-slate-600 mt-1">{currentExercise.explanation}</p>
                </div>

                <button className="btn-primary w-full mt-4" onClick={goNext}>
                  {currentEx < exercises.length - 1 ? 'Volgende →' : 'Resultaten bekijken →'}
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    )
  }

  // ─── RESULTAAT ──────────────────────────────────────────────────────────────
  if (view === 'result') {
    return (
      <div className="md:pl-56 min-h-screen bg-slate-50">
        <Navigation />
        <main className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="card max-w-md w-full text-center">
            <p className="text-5xl mb-4">{score >= 70 ? '🎉' : score >= 50 ? '💪' : '📚'}</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{activeModule?.titleNl}</h2>
            <p className="text-slate-500 mb-4">Jouw score</p>
            <p className="text-5xl font-bold text-blue-600 mb-2">{score}%</p>
            <p className="text-sm text-slate-500 mb-6">
              {score >= 70
                ? 'Module voltooid! De volgende module is nu beschikbaar.'
                : 'Probeer opnieuw om de module te voltooien (min. 70%).'}
            </p>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => { setCurrentEx(0); setResponses({}); setView('exercise') }}>
                Herhalen
              </button>
              <button className="btn-primary flex-1" onClick={() => setView('list')}>Overzicht</button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}

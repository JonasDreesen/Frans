'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import { grammarModules, GrammarModule, GrammarExercise } from '@/lib/content/grammar'

interface UserModule {
  userGrammarId: string
  moduleId: string
  slug: string
  titleNl: string
  description: string
  level: string
  order: number
  bestScore: number
  attempts: number
  completed: boolean
}

type View = 'list' | 'lesson' | 'exercise' | 'result'

export default function GrammaticaPage() {
  const [userModules, setUserModules] = useState<UserModule[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<View>('list')
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [currentEx, setCurrentEx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showLesson, setShowLesson] = useState(true)

  const fetchModules = async () => {
    const res = await fetch('/api/grammar')
    const data = await res.json()
    setUserModules(data.modules ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchModules() }, [])

  const activeModule: GrammarModule | undefined = grammarModules.find((m) => m.slug === activeSlug)
  const exercises = activeModule?.exercises ?? []
  const currentExercise: GrammarExercise | undefined = exercises[currentEx]

  const openModule = (slug: string) => {
    setActiveSlug(slug)
    setView('lesson')
    setShowLesson(true)
    setCurrentEx(0)
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  const submitExercise = async () => {
    if (!activeModule) return
    let correct = 0
    for (const ex of exercises) {
      const userAnswer = (answers[ex.id] ?? '').toLowerCase().trim()
      const correctAnswer = ex.answer.toLowerCase().trim()
      if (userAnswer === correctAnswer) correct++
    }
    const pct = Math.round((correct / exercises.length) * 100)
    setScore(pct)
    setSubmitted(true)

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

          <div className="space-y-3">
            {userModules.map((mod, idx) => {
              const prevCompleted = idx === 0 || userModules[idx - 1].completed
              const locked = !prevCompleted && !mod.completed

              return (
                <div
                  key={mod.slug}
                  className={`card flex items-center justify-between gap-4 ${locked ? 'opacity-50' : ''}`}
                >
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
                    className={locked ? 'btn-secondary py-2 px-3 text-sm opacity-50 cursor-not-allowed' : 'btn-primary py-2 px-3 text-sm'}
                    onClick={() => !locked && openModule(mod.slug)}
                    disabled={locked}
                  >
                    {locked ? '🔒' : mod.completed ? 'Herhalen' : 'Start'}
                  </button>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    )
  }

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

            {/* Render explanation as formatted text */}
            <div className="prose prose-sm max-w-none">
              {activeModule.explanation.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="font-bold text-slate-900 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>
                }
                if (line.startsWith('- ')) {
                  return <p key={i} className="text-slate-700 ml-4">{line}</p>
                }
                if (line.startsWith('| ') || line.startsWith('|---')) {
                  return null // Skip markdown tables in simple view
                }
                if (line.trim() === '') return <div key={i} className="h-2" />
                return <p key={i} className="text-slate-700">{line}</p>
              })}
            </div>

            {activeModule.tip && (
              <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
                <p className="text-sm text-amber-800">💡 <strong>Tip:</strong> {activeModule.tip}</p>
              </div>
            )}
          </div>

          <button className="btn-primary w-full" onClick={() => setView('exercise')}>
            Oefeningen starten ({exercises.length} oefeningen) →
          </button>
        </main>
      </div>
    )
  }

  if (view === 'exercise' && activeModule && currentExercise) {
    const progress = ((currentEx) / exercises.length) * 100

    return (
      <div className="md:pl-56 min-h-screen bg-slate-50">
        <Navigation />
        <main className="px-4 py-8 md:px-8 pb-24 md:pb-8 max-w-xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <button onClick={() => setView('lesson')} className="text-sm text-slate-500 hover:text-slate-700">
                ← Uitleg
              </button>
              <span className="text-sm text-slate-500">{currentEx + 1} / {exercises.length}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{currentExercise.question}</h2>

            {currentExercise.context && (
              <p className="mb-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-slate-700">
                {currentExercise.context}
              </p>
            )}

            {currentExercise.type === 'multiple_choice' && currentExercise.options && (
              <div className="space-y-2">
                {currentExercise.options.map((opt) => {
                  const isAnswered = !!answers[currentExercise.id]
                  const isSelected = answers[currentExercise.id] === opt
                  const isCorrect = opt === currentExercise.answer

                  let cls = 'w-full rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all '
                  if (!isAnswered) {
                    cls += 'border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                  } else if (isCorrect) {
                    cls += 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  } else if (isSelected) {
                    cls += 'border-red-400 bg-red-50 text-red-600'
                  } else {
                    cls += 'border-slate-200 opacity-50'
                  }

                  return (
                    <button
                      key={opt}
                      className={cls}
                      onClick={() => {
                        if (!answers[currentExercise.id]) {
                          setAnswers((a) => ({ ...a, [currentExercise.id]: opt }))
                        }
                      }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}

            {(currentExercise.type === 'fill_blank' || currentExercise.type === 'translate') && (
              <div>
                <input
                  type="text"
                  className="input text-center font-mono"
                  placeholder={currentExercise.type === 'fill_blank' ? 'Vul in...' : 'Vertaal...'}
                  value={answers[currentExercise.id] ?? ''}
                  onChange={(e) => {
                    if (!answers[currentExercise.id + '_submitted']) {
                      setAnswers((a) => ({ ...a, [currentExercise.id]: e.target.value }))
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !answers[currentExercise.id + '_submitted']) {
                      setAnswers((a) => ({ ...a, [currentExercise.id + '_submitted']: 'true' }))
                    }
                  }}
                  disabled={!!answers[currentExercise.id + '_submitted']}
                />
                {!answers[currentExercise.id + '_submitted'] && (
                  <button
                    className="btn-primary w-full mt-3"
                    onClick={() => setAnswers((a) => ({ ...a, [currentExercise.id + '_submitted']: 'true' }))}
                  >
                    Controleer
                  </button>
                )}
              </div>
            )}

            {/* Show explanation when answered */}
            {(answers[currentExercise.id] || answers[currentExercise.id + '_submitted']) && (
              <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3">
                <p className="text-sm font-medium text-blue-800">
                  ✓ Antwoord: <span className="font-mono">{currentExercise.answer}</span>
                </p>
                <p className="text-sm text-blue-600 mt-1">{currentExercise.explanation}</p>
              </div>
            )}

            {(answers[currentExercise.id] || answers[currentExercise.id + '_submitted']) && (
              <button
                className="btn-primary w-full mt-4"
                onClick={() => {
                  if (currentEx < exercises.length - 1) {
                    setCurrentEx((c) => c + 1)
                  } else {
                    submitExercise()
                  }
                }}
              >
                {currentEx < exercises.length - 1 ? 'Volgende →' : 'Resultaten bekijken →'}
              </button>
            )}
          </div>
        </main>
      </div>
    )
  }

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
              {score >= 70 ? 'Module voltooid! De volgende module is nu beschikbaar.' : 'Probeer opnieuw om de module te voltooien (min. 70%).'}
            </p>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => {
                setCurrentEx(0)
                setAnswers({})
                setView('exercise')
              }}>
                Herhalen
              </button>
              <button className="btn-primary flex-1" onClick={() => setView('list')}>
                Overzicht
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}

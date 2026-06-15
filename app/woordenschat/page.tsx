'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Navigation from '@/components/Navigation'

interface VocabItem {
  userVocabId: string
  vocabId: string
  dutch: string
  french: string
  category: string
  level: string
  exampleNl: string
  exampleFr: string
  isBelgian: boolean
  repetitions: number
  mastered: boolean
  isDue: boolean
}

type ViewMode = 'queue' | 'card' | 'result'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function generateOptions(correct: string, all: VocabItem[], isFrench: boolean): string[] {
  const pool = all
    .map((v) => (isFrench ? v.french : v.dutch))
    .filter((v) => v !== correct)
  const wrong = shuffle(pool).slice(0, 3)
  return shuffle([correct, ...wrong])
}

export default function WoordenschatPage() {
  const { data: session } = useSession()
  const [items, setItems] = useState<VocabItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<ViewMode>('queue')
  const [current, setCurrent] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [typedAnswer, setTypedAnswer] = useState('')
  const [startTime, setStartTime] = useState(0)
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 })
  const synthRef = useRef<SpeechSynthesis | null>(null)

  const focus = session?.user?.focus ?? ['schrijven']
  const mainFocus = focus[0] as 'schrijven' | 'luisteren' | 'spreken'

  useEffect(() => {
    if (typeof window !== 'undefined') synthRef.current = window.speechSynthesis
  }, [])

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/vocabulary')
      if (!res.ok) {
        if (res.status === 401) setError('Je bent niet (meer) ingelogd. Log opnieuw in.')
        else setError(`De woordenschat kon niet laden (fout ${res.status}). Controleer /api/health.`)
        setLoading(false)
        return
      }
      const data = await res.json()
      setItems(data.items ?? [])
    } catch {
      setError('Kon geen verbinding maken met de server.')
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  const currentItem = items[current]

  useEffect(() => {
    if (currentItem && view === 'card') {
      const isFrench = mainFocus === 'luisteren'
      setOptions(generateOptions(
        isFrench ? currentItem.dutch : currentItem.french,
        items,
        !isFrench
      ))
      setStartTime(Date.now())

      if (mainFocus === 'luisteren') speak(currentItem.french)
    }
  }, [current, currentItem, view, mainFocus, items])

  const speak = (text: string) => {
    if (!synthRef.current) return
    synthRef.current.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'fr-FR'
    u.rate = 0.85
    synthRef.current.speak(u)
  }

  const submitAnswer = async (quality: number) => {
    if (!currentItem) return
    setAnswered(true)
    const correct = quality >= 3
    setSessionStats((s) => ({ ...s, correct: s.correct + (correct ? 1 : 0), incorrect: s.incorrect + (!correct ? 1 : 0) }))

    await fetch('/api/vocabulary/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userVocabId: currentItem.userVocabId, quality }),
    })
  }

  const handleOptionClick = async (opt: string) => {
    if (answered) return
    setSelected(opt)
    const correct = opt === currentItem.french || opt === currentItem.dutch
    await submitAnswer(correct ? 4 : 1)
  }

  const handleTypedSubmit = async () => {
    if (answered || !typedAnswer.trim()) return
    const normalized = (s: string) => s.toLowerCase().trim().replace(/[()]/g, '').trim()
    const isCorrect = normalized(typedAnswer) === normalized(currentItem.french)
    setAnswered(true)
    const elapsed = Date.now() - startTime
    const quality = isCorrect
      ? elapsed < 3000 ? 5 : elapsed < 7000 ? 4 : 3
      : 1
    await submitAnswer(quality)
  }

  const nextCard = () => {
    if (current < items.length - 1) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
      setTypedAnswer('')
    } else {
      setView('result')
    }
  }

  if (loading) {
    return (
      <div className="md:pl-56 min-h-screen bg-slate-50">
        <Navigation />
        <main className="flex items-center justify-center h-64">
          <div className="text-slate-500">Woordenschat laden...</div>
        </main>
      </div>
    )
  }

  if (view === 'queue') {
    return (
      <div className="md:pl-56 min-h-screen bg-slate-50">
        <Navigation />
        <main className="px-4 py-8 md:px-8 pb-24 md:pb-8 max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">📚 Woordenschat</h1>
            <p className="text-slate-500">{items.length} woorden klaar voor herhaling</p>
          </div>

          {error ? (
            <div className="card border-red-100 bg-red-50">
              <p className="font-semibold text-red-700 mb-1">⚠️ Er ging iets mis</p>
              <p className="text-sm text-red-600 mb-3">{error}</p>
              <button className="btn-secondary" onClick={() => fetchItems()}>Opnieuw proberen</button>
            </div>
          ) : items.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-4xl mb-4">🎉</p>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Alles herhaald!</h2>
              <p className="text-slate-500">Je hebt alle woorden voor vandaag herhaald. Kom morgen terug!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{items.filter((i) => i.isDue).length}</p>
                    <p className="text-xs text-slate-500">Te herhalen</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">{items.filter((i) => !i.isDue).length}</p>
                    <p className="text-xs text-slate-500">Nieuw</p>
                  </div>
                  <div className="ml-auto">
                    <span className={`badge ${mainFocus === 'schrijven' ? 'badge-blue' : mainFocus === 'luisteren' ? 'badge-amber' : 'badge-purple'}`}>
                      {mainFocus === 'schrijven' ? '✍️ Schrijven' : mainFocus === 'luisteren' ? '👂 Luisteren' : '🗣️ Spreken'}
                    </span>
                  </div>
                </div>
                <button className="btn-primary w-full" onClick={() => setView('card')}>
                  Begin oefening →
                </button>
              </div>

              <div className="space-y-2">
                {items.slice(0, 8).map((item) => (
                  <div key={item.vocabId} className="card py-3 px-4 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-slate-900">{item.dutch}</span>
                      <span className="mx-2 text-slate-300">→</span>
                      <span className="text-blue-600">{item.french}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.isBelgian && <span className="text-xs">🇧🇪</span>}
                      {item.isDue ? (
                        <span className="badge badge-amber">Herhalen</span>
                      ) : (
                        <span className="badge badge-green">Nieuw</span>
                      )}
                    </div>
                  </div>
                ))}
                {items.length > 8 && (
                  <p className="text-center text-sm text-slate-400">+{items.length - 8} meer woorden</p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    )
  }

  if (view === 'result') {
    const total = sessionStats.correct + sessionStats.incorrect
    const pct = total > 0 ? Math.round((sessionStats.correct / total) * 100) : 0
    return (
      <div className="md:pl-56 min-h-screen bg-slate-50">
        <Navigation />
        <main className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="card max-w-md w-full text-center">
            <p className="text-5xl mb-4">{pct >= 70 ? '🎉' : '💪'}</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Sessie voltooid!</h2>
            <p className="text-slate-500 mb-6">Je hebt {total} woorden geoefend.</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="text-2xl font-bold text-emerald-600">{sessionStats.correct}</p>
                <p className="text-sm text-emerald-600">Correct</p>
              </div>
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-2xl font-bold text-red-500">{sessionStats.incorrect}</p>
                <p className="text-sm text-red-500">Fout</p>
              </div>
            </div>
            <div className="h-3 rounded-full bg-slate-100 mb-6">
              <div className="h-3 rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => { setView('queue'); setCurrent(0); fetchItems() }}>
                Meer oefenen
              </button>
              <a href="/dashboard" className="btn-primary flex-1">Dashboard</a>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!currentItem) return null

  const progress = ((current) / items.length) * 100
  const isMultipleChoice = mainFocus === 'luisteren'
  const isTyped = mainFocus === 'schrijven'

  return (
    <div className="md:pl-56 min-h-screen bg-slate-50">
      <Navigation />
      <main className="px-4 py-8 md:px-8 pb-24 md:pb-8 max-w-xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => setView('queue')} className="text-sm text-slate-500 hover:text-slate-700">
              ← Terug
            </button>
            <span className="text-sm text-slate-500">{current + 1} / {items.length}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200">
            <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="card">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`badge ${currentItem.level === 'A1' ? 'badge-green' : currentItem.level === 'A2' ? 'badge-amber' : 'badge-blue'}`}>
                {currentItem.level}
              </span>
              <span className="text-xs text-slate-400">{currentItem.category}</span>
              {currentItem.isBelgian && <span title="Belgisch Frans">🇧🇪</span>}
            </div>
            {currentItem.repetitions > 0 && (
              <span className="badge badge-green">#{currentItem.repetitions} herhaling</span>
            )}
          </div>

          {/* Question */}
          {mainFocus === 'luisteren' ? (
            <div className="text-center py-6">
              <p className="text-slate-500 mb-4">Wat hoorde je?</p>
              <button
                onClick={() => speak(currentItem.french)}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-white hover:bg-blue-700 transition-all text-lg"
              >
                🔊 Beluister
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-slate-500 mb-2">Hoe zeg je dit in het Frans?</p>
              <p className="text-2xl font-bold text-slate-900">{currentItem.dutch}</p>
              {answered && (
                <button onClick={() => speak(currentItem.french)} className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                  🔊 Uitspraak beluisteren
                </button>
              )}
            </div>
          )}

          {/* Answer area */}
          {isMultipleChoice && (
            <div className="mt-4 space-y-2">
              {options.map((opt) => {
                let cls = 'w-full rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all '
                if (!answered) {
                  cls += 'border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                } else if (opt === currentItem.dutch) {
                  cls += 'border-emerald-500 bg-emerald-50 text-emerald-700'
                } else if (opt === selected) {
                  cls += 'border-red-400 bg-red-50 text-red-600'
                } else {
                  cls += 'border-slate-200 opacity-50'
                }
                return (
                  <button key={opt} className={cls} onClick={() => handleOptionClick(opt)} disabled={answered}>
                    {opt}
                  </button>
                )
              })}
            </div>
          )}

          {isTyped && !answered && (
            <div className="mt-4">
              <input
                type="text"
                className="input text-center text-lg font-mono"
                placeholder="Typ het Franse woord..."
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTypedSubmit()}
                autoFocus
              />
              <button className="btn-primary w-full mt-3" onClick={handleTypedSubmit}>
                Controleer
              </button>
            </div>
          )}

          {/* Feedback */}
          {answered && (
            <div className={`mt-4 rounded-lg p-4 ${
              (selected === currentItem.dutch || selected === currentItem.french ||
               typedAnswer.toLowerCase().trim() === currentItem.french.toLowerCase().trim())
                ? 'bg-emerald-50 border border-emerald-100'
                : 'bg-red-50 border border-red-100'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    {currentItem.dutch} → <span className="text-blue-600">{currentItem.french}</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-1 italic">
                    &ldquo;{currentItem.exampleFr}&rdquo;
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentItem.exampleNl}
                  </p>
                </div>
              </div>
              <button className="btn-primary w-full mt-3" onClick={nextCard}>
                {current < items.length - 1 ? 'Volgende →' : 'Resultaat bekijken →'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

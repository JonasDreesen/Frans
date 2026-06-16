'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { levelTestQuestions, calculateLevel, maxScore } from '@/lib/content/level-test'

type Step = 'test' | 'focus' | 'goal' | 'done'
type Focus = 'schrijven' | 'luisteren' | 'spreken'

export default function OnboardingPage() {
  const { update } = useSession()
  const router = useRouter()
  const [step, setStep] = useState<Step>('test')
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedFocus, setSelectedFocus] = useState<Focus[]>(['schrijven'])
  const [dailyGoal, setDailyGoal] = useState(10)
  const [loading, setLoading] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const question = levelTestQuestions[currentQ]
  const totalQuestions = levelTestQuestions.length

  const handleAnswer = (answer: string) => {
    if (answered) return
    setSelectedAnswer(answer)
    setAnswered(true)
    if (answer === question.answer) {
      setScore((s) => s + question.points)
    }
  }

  const handleNext = () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ((q) => q + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setStep('focus')
    }
  }

  const toggleFocus = (f: Focus) => {
    setSelectedFocus((prev) =>
      prev.includes(f) ? (prev.length > 1 ? prev.filter((x) => x !== f) : prev) : [...prev, f]
    )
  }

  const handleFinish = async () => {
    setLoading(true)
    setError(null)
    const level = calculateLevel(score, maxScore)

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, focus: selectedFocus, dailyGoal }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Opslaan is mislukt. Probeer opnieuw.')
      }

      // Pas de sessie pas aan als opslaan in de database écht is gelukt —
      // anders denk je dat je klaar bent, maar sta je bij de volgende login weer hier.
      await update({ level, focus: selectedFocus, onboarded: true })
      router.push('/dashboard')
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Opslaan is mislukt. Controleer je internetverbinding en probeer opnieuw.'
      )
      setLoading(false)
    }
  }

  const levelFromScore = calculateLevel(score, maxScore)

  if (step === 'test') {
    const progress = ((currentQ + (answered ? 1 : 0)) / totalQuestions) * 100

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center">
            <p className="text-sm text-slate-500 mb-1">Stap 1 van 3</p>
            <h1 className="text-2xl font-bold text-slate-900">Niveautest</h1>
            <p className="mt-1 text-slate-500">Beantwoord {totalQuestions} vragen zodat we je niveau kunnen bepalen.</p>
          </div>

          {/* Progress bar */}
          <div className="mb-6 h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mb-4 text-right text-sm text-slate-500">{currentQ + 1} / {totalQuestions}</p>

          <div className="card">
            <div className="mb-2 flex items-center gap-2">
              <span className={`badge ${question.level === 'A1' ? 'badge-green' : question.level === 'A2' ? 'badge-amber' : 'badge-purple'}`}>
                {question.level}
              </span>
            </div>

            <h2 className="mb-4 text-lg font-semibold text-slate-900">{question.question}</h2>

            {question.context && (
              <p className="mb-4 rounded-lg bg-slate-50 px-4 py-3 font-mono text-slate-700">
                {question.context}
              </p>
            )}

            <div className="space-y-2">
              {question.options?.map((opt) => {
                let cls = 'w-full rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all '
                if (!answered) {
                  cls += 'border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                } else if (opt === question.answer) {
                  cls += 'border-emerald-500 bg-emerald-50 text-emerald-700'
                } else if (opt === selectedAnswer) {
                  cls += 'border-red-400 bg-red-50 text-red-600'
                } else {
                  cls += 'border-slate-200 opacity-50'
                }
                return (
                  <button key={opt} className={cls} onClick={() => handleAnswer(opt)} disabled={answered}>
                    {opt}
                  </button>
                )
              })}
            </div>

            {answered && (
              <div className="mt-4 flex items-center justify-between">
                <p className={`text-sm font-medium ${selectedAnswer === question.answer ? 'text-emerald-600' : 'text-red-500'}`}>
                  {selectedAnswer === question.answer ? '✓ Correct!' : `✗ Antwoord: ${question.answer}`}
                </p>
                <button className="btn-primary py-2 px-4 text-sm" onClick={handleNext}>
                  {currentQ < totalQuestions - 1 ? 'Volgende →' : 'Resultaat bekijken →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (step === 'focus') {
    const focusOptions: { key: Focus; icon: string; label: string; desc: string }[] = [
      { key: 'schrijven', icon: '✍️', label: 'Schrijven', desc: 'Vertaal woorden en zinnen, vul grammatica in.' },
      { key: 'luisteren', icon: '👂', label: 'Luisteren', desc: 'Hoor een Frans woord en kies de juiste betekenis.' },
      { key: 'spreken', icon: '🗣️', label: 'Spreken', desc: 'Spreek Frans en krijg feedback op je uitspraak.' },
    ]

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center">
            <p className="text-sm text-slate-500 mb-1">Stap 2 van 3</p>
            <div className="mb-4 card text-center">
              <p className="text-slate-500">Jouw niveau:</p>
              <p className="text-4xl font-bold text-blue-600">{levelFromScore}</p>
              <p className="text-sm text-slate-500">{score}/{maxScore} punten</p>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Kies je focus</h1>
            <p className="mt-1 text-slate-500">Je kunt meerdere vaardigheden kiezen.</p>
          </div>

          <div className="space-y-3 mb-6">
            {focusOptions.map((f) => (
              <button
                key={f.key}
                onClick={() => toggleFocus(f.key)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                  selectedFocus.includes(f.key)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{f.label}</p>
                    <p className="text-sm text-slate-500">{f.desc}</p>
                  </div>
                  {selectedFocus.includes(f.key) && (
                    <span className="ml-auto text-blue-600 text-lg">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button className="btn-primary w-full" onClick={() => setStep('goal')}>
            Volgende →
          </button>
        </div>
      </div>
    )
  }

  if (step === 'goal') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center">
            <p className="text-sm text-slate-500 mb-1">Stap 3 van 3</p>
            <h1 className="text-2xl font-bold text-slate-900">Dagelijks doel</h1>
            <p className="mt-1 text-slate-500">Hoeveel minuten wil je elke dag oefenen?</p>
          </div>

          <div className="card mb-6">
            <div className="space-y-3">
              {[5, 10, 20, 30].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDailyGoal(mins)}
                  className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                    dailyGoal === mins ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{mins} minuten</p>
                      <p className="text-sm text-slate-500">
                        {mins === 5 && 'Ik heb weinig tijd, maar wil toch oefenen.'}
                        {mins === 10 && 'Een goed begin voor dagelijkse gewoontes.'}
                        {mins === 20 && 'Serieus leren, vlotte voortgang.'}
                        {mins === 30 && 'Intense studie, maximale voortgang.'}
                      </p>
                    </div>
                    {dailyGoal === mins && <span className="text-blue-600 text-lg">✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              ⚠️ {error}
            </div>
          )}

          <button className="btn-primary w-full" onClick={handleFinish} disabled={loading}>
            {loading ? 'Bezig met instellen...' : error ? 'Opnieuw proberen 🔄' : 'Start met leren! 🚀'}
          </button>
        </div>
      </div>
    )
  }

  return null
}

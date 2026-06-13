'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

interface VocabItem {
  userVocabId: string
  dutch: string
  french: string
  category: string
  exampleFr: string
  exampleNl: string
}

type ExerciseType = 'speaking' | 'listening' | 'writing'

export default function OefeningPage() {
  const { data: session } = useSession()
  const [mode, setMode] = useState<ExerciseType | null>(null)
  const [items, setItems] = useState<VocabItem[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null)
  const [sessionCount, setSessionCount] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  const focus = session?.user?.focus ?? ['schrijven']

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any
      const SR = w.SpeechRecognition || w.webkitSpeechRecognition
      if (SR) {
        const recog = new SR()
        recog.lang = 'fr-FR'
        recog.continuous = false
        recog.interimResults = false
        recognitionRef.current = recog
      }
    }
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    const res = await fetch('/api/vocabulary')
    const data = await res.json()
    setItems(data.items?.slice(0, 10) ?? [])
    setCurrent(0)
    setResult(null)
    setTranscript('')
    setLoading(false)
  }

  const startMode = async (m: ExerciseType) => {
    setMode(m)
    await fetchItems()
  }

  const speak = (text: string, onEnd?: () => void) => {
    if (!synthRef.current) return
    synthRef.current.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'fr-FR'
    u.rate = 0.85
    if (onEnd) u.onend = onEnd
    synthRef.current.speak(u)
  }

  const startListening = () => {
    const r = recognitionRef.current
    if (!r) return

    setIsListening(true)
    setTranscript('')
    setResult(null)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    r.onresult = (e: any) => {
      const t = e.results[0][0].transcript
      setTranscript(t)
      setIsListening(false)

      const normalize = (s: string) => s.toLowerCase().trim().replace(/[.,!?]/g, '')
      const correct = normalize(t) === normalize(items[current]?.french ?? '')
      setResult(correct ? 'correct' : 'incorrect')
      setSessionCount((c) => c + 1)
    }

    r.onerror = () => setIsListening(false)
    r.onend = () => setIsListening(false)
    r.start()
  }

  const nextItem = () => {
    if (current < items.length - 1) {
      setCurrent((c) => c + 1)
      setResult(null)
      setTranscript('')
    } else {
      setMode(null)
      setItems([])
    }
  }

  const item = items[current]

  return (
    <div className="md:pl-56 min-h-screen bg-slate-50">
      <Navigation />
      <main className="px-4 py-8 md:px-8 pb-24 md:pb-8 max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">🎯 Oefenen</h1>
          <p className="text-slate-500">Kies een oefenmodus om te starten.</p>
        </div>

        {!mode && (
          <div className="space-y-4">
            {/* Tip */}
            <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-700">
              <strong>Jouw focus:</strong>{' '}
              {focus.map((f: string) => ({ schrijven: '✍️ Schrijven', luisteren: '👂 Luisteren', spreken: '🗣️ Spreken' }[f] ?? f)).join(', ')}
            </div>

            {/* Speaking practice */}
            <div className="card">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🗣️</span>
                <div className="flex-1">
                  <h2 className="font-semibold text-slate-900">Spreken oefenen</h2>
                  <p className="text-sm text-slate-500 mt-1">Zeg het Franse woord hardop. De app herkent je stem en geeft feedback.</p>
                  <p className="text-xs text-slate-400 mt-2">Vereist: microfoon + Chrome/Edge browser</p>
                </div>
              </div>
              <button
                className="btn-primary w-full mt-4"
                onClick={() => startMode('speaking')}
                disabled={!recognitionRef.current}
              >
                {recognitionRef.current ? 'Start spreekmode →' : 'Spraakherkenning niet beschikbaar in deze browser'}
              </button>
            </div>

            {/* Listening practice */}
            <div className="card">
              <div className="flex items-start gap-4">
                <span className="text-3xl">👂</span>
                <div className="flex-1">
                  <h2 className="font-semibold text-slate-900">Luisteren & begrijpen</h2>
                  <p className="text-sm text-slate-500 mt-1">Hoor een Frans woord uitgesproken en type de Nederlandse betekenis.</p>
                </div>
              </div>
              <button className="btn-primary w-full mt-4" onClick={() => startMode('listening')}>
                Start luistermodus →
              </button>
            </div>

            {/* Writing practice */}
            <div className="card">
              <div className="flex items-start gap-4">
                <span className="text-3xl">✍️</span>
                <div className="flex-1">
                  <h2 className="font-semibold text-slate-900">Schrijven & vertalen</h2>
                  <p className="text-sm text-slate-500 mt-1">Zie een Nederlands woord en schrijf de Franse vertaling in volledige zinnen.</p>
                </div>
              </div>
              <button className="btn-primary w-full mt-4" onClick={() => startMode('writing')}>
                Start schrijfmodus →
              </button>
            </div>

            <div className="card text-center py-6">
              <p className="text-2xl mb-2">📚</p>
              <h3 className="font-semibold text-slate-900 mb-1">Wil je meer leren?</h3>
              <p className="text-sm text-slate-500 mb-4">Herhaal je woordenschat of oefen grammatica.</p>
              <div className="flex gap-3 justify-center">
                <Link href="/woordenschat" className="btn-secondary py-2 px-4 text-sm">Woordenschat</Link>
                <Link href="/grammatica" className="btn-secondary py-2 px-4 text-sm">Grammatica</Link>
              </div>
            </div>
          </div>
        )}

        {/* Speaking mode */}
        {mode === 'speaking' && item && !loading && (
          <div className="card text-center">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setMode(null)} className="text-sm text-slate-500">← Terug</button>
              <span className="text-sm text-slate-500">{current + 1} / {items.length}</span>
            </div>

            <p className="text-sm text-slate-500 mb-2">Zeg in het Frans:</p>
            <p className="text-3xl font-bold text-slate-900 mb-2">{item.dutch}</p>
            <p className="text-sm text-slate-400 italic mb-6">({item.exampleNl})</p>

            <button
              onClick={() => speak(item.french)}
              className="text-sm text-blue-600 hover:text-blue-700 mb-4"
            >
              🔊 Ik weet het niet, toon uitspraak
            </button>

            {!result && (
              <button
                onClick={startListening}
                disabled={isListening}
                className={`w-full rounded-xl py-5 text-lg font-semibold transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isListening ? '🎙️ Luisteren...' : '🎙️ Spreek nu'}
              </button>
            )}

            {transcript && (
              <p className="mt-4 text-slate-600">Ik hoorde: <span className="font-mono font-medium">"{transcript}"</span></p>
            )}

            {result && (
              <div className={`mt-4 rounded-lg p-4 ${result === 'correct' ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
                <p className="font-semibold text-slate-900">
                  {result === 'correct' ? '✅ Uitstekend!' : '📖 Juiste uitspraak:'}
                </p>
                <p className="text-blue-600 font-mono text-lg mt-1">{item.french}</p>
                <p className="text-sm text-slate-500 italic mt-1">{item.exampleFr}</p>
                <button className="btn-primary w-full mt-3" onClick={nextItem}>
                  {current < items.length - 1 ? 'Volgend woord →' : 'Sessie afronden ✓'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Listening mode */}
        {mode === 'listening' && item && !loading && (
          <ListeningExercise
            item={item}
            current={current}
            total={items.length}
            onBack={() => setMode(null)}
            onNext={nextItem}
            speak={speak}
          />
        )}

        {/* Writing mode */}
        {mode === 'writing' && item && !loading && (
          <WritingExercise
            item={item}
            current={current}
            total={items.length}
            onBack={() => setMode(null)}
            onNext={nextItem}
            speak={speak}
          />
        )}

        {loading && (
          <div className="text-center py-12 text-slate-500">Oefeningen laden...</div>
        )}
      </main>
    </div>
  )
}

function ListeningExercise({ item, current, total, onBack, onNext, speak }: {
  item: VocabItem; current: number; total: number; onBack: () => void; onNext: () => void; speak: (text: string) => void
}) {
  const [typed, setTyped] = useState('')
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)

  useEffect(() => {
    setTyped('')
    setChecked(false)
    speak(item.french)
  }, [item.french])

  const check = () => {
    const normalize = (s: string) => s.toLowerCase().trim()
    const isCorrect = normalize(typed) === normalize(item.dutch)
    setCorrect(isCorrect)
    setChecked(true)
  }

  return (
    <div className="card text-center">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-sm text-slate-500">← Terug</button>
        <span className="text-sm text-slate-500">{current + 1} / {total}</span>
      </div>

      <p className="text-sm text-slate-500 mb-4">Wat betekent dit Franse woord?</p>

      <button
        onClick={() => speak(item.french)}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-white hover:bg-blue-700 transition-all mb-6"
      >
        🔊 Beluister opnieuw
      </button>

      {!checked ? (
        <div>
          <input
            type="text"
            className="input text-center mb-3"
            placeholder="Nederlandse betekenis..."
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && typed && check()}
            autoFocus
          />
          <button className="btn-primary w-full" onClick={check} disabled={!typed}>Controleer</button>
        </div>
      ) : (
        <div className={`rounded-lg p-4 ${correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
          <p className="font-semibold">{correct ? '✅ Correct!' : '❌ Niet helemaal...'}</p>
          <p className="text-slate-700 mt-1">{item.french} = <span className="font-medium">{item.dutch}</span></p>
          <p className="text-sm text-slate-500 italic mt-1">{item.exampleFr}</p>
          <button className="btn-primary w-full mt-3" onClick={() => { setTyped(''); setChecked(false); onNext() }}>
            {current < total - 1 ? 'Volgend woord →' : 'Sessie afronden ✓'}
          </button>
        </div>
      )}
    </div>
  )
}

function WritingExercise({ item, current, total, onBack, onNext, speak }: {
  item: VocabItem; current: number; total: number; onBack: () => void; onNext: () => void; speak: (text: string) => void
}) {
  const [typed, setTyped] = useState('')
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)

  useEffect(() => { setTyped(''); setChecked(false) }, [item.dutch])

  const check = () => {
    const normalize = (s: string) => s.toLowerCase().trim().replace(/[()]/g, '').trim()
    const isCorrect = normalize(typed) === normalize(item.french)
    setCorrect(isCorrect)
    setChecked(true)
    if (isCorrect) speak(item.french)
  }

  return (
    <div className="card text-center">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-sm text-slate-500">← Terug</button>
        <span className="text-sm text-slate-500">{current + 1} / {total}</span>
      </div>

      <p className="text-sm text-slate-500 mb-2">Schrijf in het Frans:</p>
      <p className="text-3xl font-bold text-slate-900 mb-1">{item.dutch}</p>
      <p className="text-sm text-slate-400 italic mb-6">{item.exampleNl}</p>

      {!checked ? (
        <div>
          <input
            type="text"
            className="input text-center font-mono text-lg mb-3"
            placeholder="Frans woord..."
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && typed && check()}
            autoFocus
          />
          <button className="btn-primary w-full" onClick={check} disabled={!typed}>Controleer</button>
        </div>
      ) : (
        <div className={`rounded-lg p-4 ${correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
          <p className="font-semibold">{correct ? '✅ Bravo!' : '❌ Niet helemaal...'}</p>
          {!correct && <p className="text-sm text-slate-500 mt-1">Jij schreef: <span className="font-mono">{typed}</span></p>}
          <p className="text-slate-700 mt-2">Antwoord: <span className="font-medium font-mono text-blue-600">{item.french}</span></p>
          <p className="text-sm text-slate-500 italic mt-1">{item.exampleFr}</p>
          <div className="flex gap-2 mt-3">
            <button onClick={() => speak(item.french)} className="btn-secondary flex-1 py-2 text-sm">🔊 Uitspraak</button>
            <button className="btn-primary flex-1" onClick={() => { setTyped(''); setChecked(false); onNext() }}>
              {current < total - 1 ? 'Volgende →' : 'Afronden ✓'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

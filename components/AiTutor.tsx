'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'Hoe zeg je "bedankt" in het Frans?',
  'Leg de passé composé uit',
  'Wat is het verschil tussen septante en soixante-dix?',
  'Hoe vervoeg ik het werkwoord "être"?',
]

// Eenvoudige markdown-achtige opmaak: **vet** en *cursief*
function formatLine(line: string, key: number) {
  const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean)
  return (
    <p key={key} className="min-h-[0.5rem]">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i} className="italic text-blue-700">{part.slice(1, -1)}</em>
        }
        return <span key={i}>{part}</span>
      })}
    </p>
  )
}

export default function AiTutor() {
  const { status } = useSession()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  if (status !== 'authenticated') return null

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.slice(-10) }),
      })
      const data = await res.json()
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: data.reply ?? data.error ?? 'Sorry, er ging iets mis.' },
      ])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Kon de AI-coach niet bereiken. Probeer opnieuw.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Zwevende knop */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
          aria-label="Open AI-taalcoach"
        >
          🇫🇷
        </button>
      )}

      {/* Chatvenster */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 md:inset-x-auto md:bottom-6 md:right-6 z-50 flex h-[70vh] md:h-[32rem] w-full md:w-96 flex-col overflow-hidden rounded-t-2xl md:rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-blue-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇫🇷</span>
              <div>
                <p className="text-sm font-semibold leading-tight">Professeur</p>
                <p className="text-xs text-blue-100 leading-tight">Jouw Franse taalcoach</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-blue-100 hover:text-white text-xl leading-none" aria-label="Sluit">
              ✕
            </button>
          </div>

          {/* Berichten */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200 px-3 py-2 text-sm text-slate-700">
                  Bonjour! 👋 Ik help je met Frans leren. Stel me een vraag of kies hieronder:
                </div>
                <div className="space-y-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-left text-xs text-blue-700 hover:bg-blue-50 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm space-y-1 ${
                    m.role === 'user'
                      ? 'rounded-tr-sm bg-blue-600 text-white'
                      : 'rounded-tl-sm border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {m.content.split('\n').map((line, idx) =>
                    m.role === 'user' ? <p key={idx}>{line || ' '}</p> : formatLine(line, idx)
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-3 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Invoer */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input) }}
            className="flex items-center gap-2 border-t border-slate-100 bg-white px-3 py-2.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Stel een vraag..."
              className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-40"
              aria-label="Verstuur"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  )
}

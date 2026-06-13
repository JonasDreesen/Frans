'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

type Focus = 'schrijven' | 'luisteren' | 'spreken'

const focusOptions: { key: Focus; icon: string; label: string }[] = [
  { key: 'schrijven', icon: '✍️', label: 'Schrijven' },
  { key: 'luisteren', icon: '👂', label: 'Luisteren' },
  { key: 'spreken', icon: '🗣️', label: 'Spreken' },
]

const levelInfo: Record<string, { label: string; next?: string; desc: string }> = {
  A1: { label: 'Absolute beginner', next: 'A2', desc: 'Je kent de basisbegroetingen en eenvoudige woorden.' },
  A2: { label: 'Elementair', next: 'B1', desc: 'Je kunt eenvoudige gesprekken voeren over vertrouwde onderwerpen.' },
  B1: { label: 'Gevorderd beginner', next: 'B2', desc: 'Je begrijpt de hoofdpunten in duidelijke standaardtaal.' },
  B2: { label: 'Gevorderd', desc: 'Je kunt met vlotte moedertaalsprekers communiceren.' },
}

export default function ProfielPage() {
  const { data: session, update } = useSession()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [focus, setFocus] = useState<Focus[]>((session?.user?.focus ?? ['schrijven']) as Focus[])

  const toggleFocus = (f: Focus) => {
    setFocus((prev) =>
      prev.includes(f) ? (prev.length > 1 ? prev.filter((x) => x !== f) : prev) : [...prev, f]
    )
  }

  const saveProfile = async () => {
    setSaving(true)
    await fetch('/api/profiel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ focus }),
    })
    await update({ focus })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const level = session?.user?.level ?? 'A1'
  const info = levelInfo[level] ?? levelInfo.A1

  return (
    <div className="md:pl-56 min-h-screen bg-slate-50">
      <Navigation />
      <main className="px-4 py-8 md:px-8 pb-24 md:pb-8 max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">👤 Mijn profiel</h1>
          <p className="text-slate-500">{session?.user?.email}</p>
        </div>

        {/* Niveau */}
        <div className="card mb-4">
          <h2 className="font-semibold text-slate-900 mb-3">🎓 Jouw niveau</h2>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              {level}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{info.label}</p>
              <p className="text-sm text-slate-500">{info.desc}</p>
              {info.next && (
                <p className="text-xs text-blue-600 mt-1">Volgende niveau: {info.next}</p>
              )}
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Je niveau wordt automatisch aangepast op basis van je resultaten.
            Wil je je niveau herberekenen?{' '}
            <Link href="/onboarding" className="text-blue-600 hover:underline">Doe de niveautest opnieuw</Link>
          </p>
        </div>

        {/* Focus aanpassen */}
        <div className="card mb-4">
          <h2 className="font-semibold text-slate-900 mb-3">🎯 Focus aanpassen</h2>
          <div className="space-y-2 mb-4">
            {focusOptions.map((f) => (
              <button
                key={f.key}
                onClick={() => toggleFocus(f.key)}
                className={`w-full rounded-lg border-2 p-3 text-left transition-all flex items-center gap-3 ${
                  focus.includes(f.key) ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-xl">{f.icon}</span>
                <span className="font-medium text-slate-900">{f.label}</span>
                {focus.includes(f.key) && <span className="ml-auto text-blue-600">✓</span>}
              </button>
            ))}
          </div>
          <button className="btn-primary w-full" onClick={saveProfile} disabled={saving}>
            {saving ? 'Opslaan...' : saved ? '✓ Opgeslagen!' : 'Opslaan'}
          </button>
        </div>

        {/* Olama status */}
        <div className="card mb-4">
          <h2 className="font-semibold text-slate-900 mb-2">🤖 AI-feedback (Ollama)</h2>
          <p className="text-sm text-slate-500 mb-3">
            Installeer <a href="https://ollama.com" target="_blank" rel="noopener" className="text-blue-600">Ollama</a> lokaal
            en stel de <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">OLLAMA_BASE_URL</code> omgevingsvariabele
            in om AI-feedback te activeren.
          </p>
          <OllamaStatus />
        </div>

        {/* Uitloggen */}
        <div className="card">
          <h2 className="font-semibold text-slate-900 mb-3">Account</h2>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="btn-secondary w-full text-red-500 border-red-100 hover:bg-red-50"
          >
            🚪 Uitloggen
          </button>
        </div>
      </main>
    </div>
  )
}

function OllamaStatus() {
  const [status, setStatus] = useState<'idle' | 'checking' | 'online' | 'offline'>('idle')

  const check = async () => {
    setStatus('checking')
    const res = await fetch('/api/ollama', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'pronunciation_tip', context: 'bonjour' }),
    })
    setStatus(res.ok ? 'online' : 'offline')
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`h-2.5 w-2.5 rounded-full ${status === 'online' ? 'bg-emerald-500' : status === 'offline' ? 'bg-red-400' : 'bg-slate-300'}`} />
      <span className="text-sm text-slate-600">
        {status === 'idle' && 'Status onbekend'}
        {status === 'checking' && 'Verbinding controleren...'}
        {status === 'online' && 'Ollama actief ✓'}
        {status === 'offline' && 'Ollama niet bereikbaar'}
      </span>
      <button onClick={check} className="ml-auto text-xs text-blue-600 hover:underline">
        {status === 'idle' ? 'Controleer' : 'Opnieuw'}
      </button>
    </div>
  )
}

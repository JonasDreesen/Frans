'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Wachtwoord moet minimaal 8 tekens bevatten.')
      return
    }

    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Er is iets misgegaan.')
      setLoading(false)
      return
    }

    await signIn('credentials', { email, password, redirect: false })
    router.push('/onboarding')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900">
            <span>🇫🇷</span> Frans Leren
          </Link>
          <p className="mt-2 text-slate-500">Begin vandaag nog met leren!</p>
        </div>

        <div className="card">
          <h1 className="mb-6 text-xl font-semibold text-slate-900">Maak een gratis account</h1>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="name">Voornaam</label>
              <input id="name" type="text" className="input" placeholder="Jouw naam"
                value={name} onChange={(e) => setName(e.target.value)} required autoComplete="given-name" />
            </div>
            <div>
              <label className="label" htmlFor="email">E-mailadres</label>
              <input id="email" type="email" className="input" placeholder="jij@voorbeeld.be"
                value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div>
              <label className="label" htmlFor="password">Wachtwoord</label>
              <input id="password" type="password" className="input" placeholder="Minimaal 8 tekens"
                value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" minLength={8} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Account aanmaken...' : 'Maak account aan'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          Al een account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">Log in</Link>
        </p>
      </div>
    </div>
  )
}

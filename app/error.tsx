'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="card max-w-md w-full text-center">
        <p className="text-5xl mb-4">😕</p>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Er ging iets mis</h1>
        <p className="text-sm text-slate-500 mb-4">
          De pagina kon niet geladen worden. Dit komt meestal door een database- of
          configuratieprobleem.
        </p>
        <div className="rounded-lg bg-slate-100 px-3 py-2 text-left text-xs text-slate-600 mb-4 break-words">
          {error.message || 'Onbekende fout'}
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex-1" onClick={() => reset()}>
            Opnieuw proberen
          </button>
          <a className="btn-primary flex-1" href="/api/health">
            Diagnose bekijken
          </a>
        </div>
        <a href="/login" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
          Terug naar inloggen
        </a>
      </div>
    </div>
  )
}

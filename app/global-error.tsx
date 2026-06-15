'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="nl">
      <body style={{ fontFamily: 'system-ui, sans-serif', background: '#f8fafc', margin: 0 }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ maxWidth: 420, width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 48, margin: 0 }}>😕</p>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Er ging iets mis</h1>
            <p style={{ fontSize: 14, color: '#64748b' }}>
              Een onverwachte fout trad op. Probeer opnieuw of bekijk de diagnose.
            </p>
            <div style={{ background: '#f1f5f9', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#475569', textAlign: 'left', wordBreak: 'break-word', margin: '12px 0' }}>
              {error.message || 'Onbekende fout'}
            </div>
            <button
              onClick={() => reset()}
              style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 600, cursor: 'pointer' }}
            >
              Opnieuw proberen
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

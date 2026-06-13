import Link from 'next/link'

const features = [
  {
    icon: '🇧🇪',
    title: 'Belgisch Frans',
    desc: 'Leer Frans zoals het in Brussel en Wallonië gesproken wordt. Met septante, nonante en typisch Belgische uitdrukkingen.',
  },
  {
    icon: '🧠',
    title: 'Slim herhaalsysteem',
    desc: 'Ons SRS-algoritme (gebaseerd op wetenschappelijk onderzoek) zorgt dat je woorden precies herhaalt wanneer je ze dreigt te vergeten.',
  },
  {
    icon: '🎯',
    title: 'Jouw focus',
    desc: 'Kies of je wil focussen op schrijven, luisteren of spreken. De app past zich aan aan jouw leerdoel.',
  },
  {
    icon: '📊',
    title: 'Voortgang bijhouden',
    desc: 'Volg je verbetering met duidelijke statistieken. Zie hoeveel woorden je geleerd hebt en welke grammaticamodules je afgerond hebt.',
  },
]

const methodology = [
  { num: '1', title: 'Spaced Repetition', desc: 'Woorden worden herhaald op het exacte moment dat je ze dreigt te vergeten — zo leer je maximum met minimum inspanning.' },
  { num: '2', title: 'Actief herinneren', desc: 'Actief een antwoord produceren werkt veel beter dan passief lezen. Elke oefening dwingt je om actief na te denken.' },
  { num: '3', title: 'Contextueel leren', desc: 'Woorden worden altijd geleerd in zinnen, niet geïsoleerd. Je brein onthoudt betekenis, niet losse klanken.' },
  { num: '4', title: 'Gemengde oefening', desc: 'Woordenschat, grammatica en conversatie worden afgewisseld zodat je kennis breder verankerd raakt.' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇫🇷</span>
            <span className="text-lg font-bold text-slate-900">Frans Leren</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Inloggen
            </Link>
            <Link href="/registreer" className="btn-primary py-2 px-4 text-sm">
              Begin gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="mb-4 inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          🇧🇪 Speciaal voor Vlamingen
        </div>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900">
          Leer Frans zoals
          <span className="text-blue-600"> een Belg</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
          De slimste manier voor Vlamingen om Frans te leren. Gepersonaliseerd op jouw niveau, met focus op Belgisch Frans dat je echt kunt gebruiken in Brussel en Wallonië.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/registreer" className="btn-primary text-base px-8 py-3.5">
            Maak een gratis account
          </Link>
          <Link href="/login" className="btn-secondary text-base">
            Ik heb al een account
          </Link>
        </div>
      </section>

      {/* Methodologie */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Hoe leer je het beste een taal?</h2>
            <p className="mt-3 text-slate-600">Onze aanpak is gebaseerd op wetenschappelijk onderzoek naar taalverwerving.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((m) => (
              <div key={m.num} className="card">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {m.num}
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">{m.title}</h3>
                <p className="text-sm text-slate-600">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Alles wat je nodig hebt</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="card flex gap-4">
                <div className="text-3xl">{f.icon}</div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-900">{f.title}</h3>
                  <p className="text-sm text-slate-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Klaar om te beginnen?</h2>
          <p className="mb-8 text-blue-100">Maak een gratis account aan en start vandaag nog met leren.</p>
          <Link href="/registreer" className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-blue-600 hover:bg-blue-50 transition-all">
            Begin nu gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-slate-500">
          Frans Leren voor Vlamingen · Gemaakt met ❤️ in België
        </div>
      </footer>
    </main>
  )
}

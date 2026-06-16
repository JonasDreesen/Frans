// Kiest de best beschikbare Franse stem en hergebruikt die, zodat uitspraak-oefeningen
// niet afhankelijk zijn van de eerste (vaak robotachtige) stem die de browser toevallig teruggeeft.
let cachedVoice: SpeechSynthesisVoice | null = null
let cacheReady = false

function scoreVoice(v: SpeechSynthesisVoice): number {
  let score = 0
  const lang = v.lang.toLowerCase()
  if (lang === 'fr-fr') score += 3
  else if (lang.startsWith('fr')) score += 1
  if (/google|microsoft|natural|online|wavenet|neural/i.test(v.name)) score += 2
  if (v.localService === false) score += 1
  return score
}

function pickBestFrenchVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const french = voices.filter((v) => v.lang.toLowerCase().startsWith('fr'))
  if (french.length === 0) return null
  return french.slice().sort((a, b) => scoreVoice(b) - scoreVoice(a))[0]
}

// Laadt de stemmenlijst (sommige browsers vullen die pas async aan) en cachet het resultaat.
export function loadFrenchVoice(): Promise<SpeechSynthesisVoice | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve(null)
      return
    }
    if (cacheReady) {
      resolve(cachedVoice)
      return
    }
    const synth = window.speechSynthesis
    const tryNow = () => {
      const voices = synth.getVoices()
      if (voices.length === 0) return false
      cachedVoice = pickBestFrenchVoice(voices)
      cacheReady = true
      resolve(cachedVoice)
      return true
    }
    if (tryNow()) return
    synth.onvoiceschanged = () => tryNow()
    setTimeout(() => {
      if (!cacheReady) {
        cacheReady = true
        resolve(cachedVoice)
      }
    }, 1000)
  })
}

export function hasFrenchVoice(): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false
  if (cacheReady) return cachedVoice !== null
  return window.speechSynthesis.getVoices().some((v) => v.lang.toLowerCase().startsWith('fr'))
}

// Spreekt Franse tekst uit met de best beschikbare stem. Geeft false terug als
// spraaksynthese niet beschikbaar is in deze browser (bv. oudere Safari-versies).
export function speakFrench(text: string, opts?: { rate?: number; onEnd?: () => void }): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'fr-FR'
  u.rate = opts?.rate ?? 0.9
  if (cachedVoice) u.voice = cachedVoice
  if (opts?.onEnd) u.onend = opts.onEnd
  synth.speak(u)
  return true
}

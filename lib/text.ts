// Vergelijkt antwoorden: hoofdletter-/spatie-ongevoelig, en vergeeft ontbrekende accenten
// (Belgische toetsenborden en telefoons maken accenten typen lastig).
const COMBINING_MARKS = new RegExp(`[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`, 'g')

export function stripAccents(s: string): string {
  return s.normalize('NFD').replace(COMBINING_MARKS, '')
}

export function isAnswerCorrect(given: string, expected: string): boolean {
  const norm = (s: string) => s.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '')
  const a = norm(given)
  const b = norm(expected)
  return a === b || stripAccents(a) === stripAccents(b)
}

// Sommige woordenschat-velden coderen meerdere geldige vormen, bv. "Un / Une" of
// "Bleu(e)" (mannelijk/vrouwelijk). Geeft alle losse, getypte vormen terug.
function expandAlternatives(expected: string): string[] {
  const variants = new Set<string>()
  for (const part of expected.split('/')) {
    const trimmed = part.trim()
    if (!trimmed) continue
    variants.add(trimmed)
    const paren = trimmed.match(/^(.*?)\(([a-zà-ÿ]+)\)$/i)
    if (paren) {
      const stem = paren[1].trim()
      variants.add(stem)
      variants.add(`${stem}${paren[2]}`)
    }
  }
  return Array.from(variants)
}

// Net als isAnswerCorrect, maar accepteert élke vorm uit een meervormig woordenschat-veld.
export function isVocabAnswerCorrect(given: string, expected: string): boolean {
  return expandAlternatives(expected).some((variant) => isAnswerCorrect(given, variant))
}

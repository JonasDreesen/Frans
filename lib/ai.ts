import { vocabularyData } from './content/vocabulary'
import { grammarModules } from './content/grammar'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export type AiProvider = 'gemini' | 'ollama' | 'ingebouwd'

const SYSTEM_PROMPT = `Je bent "Professeur", een vriendelijke AI-taalcoach die Vlamingen helpt om Frans te leren.
Regels:
- Antwoord altijd in het Nederlands (Vlaams), behalve de Franse voorbeelden zelf.
- Richt je op Belgisch Frans: gebruik "septante" (70) en "nonante" (90), en typisch Belgische uitdrukkingen.
- Houd antwoorden kort, duidelijk en bemoedigend (max ~6 zinnen).
- Geef bij Franse zinnen altijd de Nederlandse vertaling tussen haakjes.
- Als de leerling een fout maakt, leg vriendelijk uit waarom en geef het juiste antwoord.`

export function activeProvider(): AiProvider {
  if (process.env.GEMINI_API_KEY) return 'gemini'
  if (process.env.OLLAMA_BASE_URL) return 'ollama'
  return 'ingebouwd'
}

export async function askAI(messages: ChatMessage[]): Promise<{ reply: string; provider: AiProvider }> {
  if (process.env.GEMINI_API_KEY) {
    try {
      return { reply: await askGemini(messages), provider: 'gemini' }
    } catch (e) {
      console.error('Gemini fout, val terug:', e)
    }
  }

  if (process.env.OLLAMA_BASE_URL) {
    try {
      return { reply: await askOllama(messages), provider: 'ollama' }
    } catch (e) {
      console.error('Ollama fout, val terug:', e)
    }
  }

  return { reply: fallbackReply(messages), provider: 'ingebouwd' }
}

// ─── Google Gemini (gratis tier) ──────────────────────────────────────────────
async function askGemini(messages: ChatMessage[]): Promise<string> {
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
    }),
  })

  if (!res.ok) throw new Error(`Gemini status ${res.status}`)
  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text ?? '')
    .join('')
  if (!text) throw new Error('Gemini gaf geen antwoord')
  return text.trim()
}

// ─── Ollama (lokaal) ──────────────────────────────────────────────────────────
async function askOllama(messages: ChatMessage[]): Promise<string> {
  const base = process.env.OLLAMA_BASE_URL
  const model = process.env.OLLAMA_MODEL || 'llama3.2'

  const res = await fetch(`${base}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  })

  if (!res.ok) throw new Error(`Ollama status ${res.status}`)
  const data = await res.json()
  const text = data?.message?.content
  if (!text) throw new Error('Ollama gaf geen antwoord')
  return text.trim()
}

// ─── Ingebouwde fallback (werkt altijd, zonder API) ───────────────────────────
const STOPWORDS = new Set([
  'hoe', 'zeg', 'je', 'jij', 'wat', 'is', 'in', 'het', 'de', 'een', 'frans', 'franse',
  'vertaal', 'naar', 'betekent', 'word', 'woord', 'zegt', 'men', 'kan', 'ik', 'mij', 'me',
  'dit', 'dat', 'uitspraak', 'spreek', 'uit', 'van', 'op', 'met', 'voor', 'en', 'of', 'als',
  'kun', 'kunt', 'graag', 'weten', 'leg', 'uitleg', 'geef', 'mijn', 'jouw', 'wil', 'wilt',
])

function findVocab(query: string, limit = 3) {
  const tokens = query
    .toLowerCase()
    .replace(/[^a-zàâçéèêëîïôûùüÿñæœ\s']/gi, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t))

  if (tokens.length === 0) return []

  const scored = vocabularyData
    .map((v) => {
      const hay = `${v.dutch} ${v.french}`.toLowerCase()
      let score = 0
      for (const t of tokens) if (hay.includes(t)) score += 1
      return { v, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((x) => x.v)
}

function findGrammar(query: string) {
  const q = query.toLowerCase()
  const keywords: Record<string, string> = {
    lidwoord: 'artikels', 'le la': 'artikels', 'un une': 'artikels',
    être: 'etre', zijn: 'etre',
    avoir: 'avoir', hebben: 'avoir',
    ontkenn: 'negation', 'ne pas': 'negation', niet: 'negation',
    'er werkwoord': 'er-werkwoorden', vervoeg: 'er-werkwoorden',
    vraag: 'vragen', vragen: 'vragen',
    bijvoeglijk: 'bijvoeglijke-naamwoorden', adjectief: 'bijvoeglijke-naamwoorden',
    'passé composé': 'passe-compose', 'passe compose': 'passe-compose', verleden: 'passe-compose',
    futur: 'futur-simple', toekomst: 'futur-simple', toekomende: 'futur-simple',
    voorzetsel: 'voorzetsels', préposition: 'voorzetsels',
  }
  for (const [kw, slug] of Object.entries(keywords)) {
    if (q.includes(kw)) {
      const mod = grammarModules.find((m) => m.slug === slug)
      if (mod) return mod
    }
  }
  return undefined
}

function fallbackReply(messages: ChatMessage[]): string {
  const last = messages[messages.length - 1]?.content?.trim() ?? ''
  const q = last.toLowerCase()

  if (!last) {
    return 'Bonjour! 👋 Ik ben je Franse taalcoach. Vraag me bijvoorbeeld "Hoe zeg je bedankt in het Frans?", "Leg de passé composé uit" of "Wat is het verschil tussen septante en soixante-dix?".'
  }

  // Begroeting
  if (/^(hallo|hoi|hey|bonjour|salut|goeiedag|goedendag|dag)\b/.test(q)) {
    return 'Bonjour! 😊 Waarmee kan ik je helpen met je Frans? Je kunt me een woord laten vertalen, een grammaticaregel laten uitleggen, of vragen naar Belgisch Frans.'
  }

  // Belgisch Frans
  if (q.includes('septante') || q.includes('nonante') || q.includes('belgisch') || q.includes('belgi')) {
    return 'In België (en ook in Zwitserland) gebruikt men:\n• **septante** voor 70 (i.p.v. het Franse "soixante-dix")\n• **nonante** voor 90 (i.p.v. "quatre-vingt-dix")\n\nVoorbeeld: "Ça coûte septante euros." (Dat kost zeventig euro.) Tachtig blijft wel "quatre-vingts". Typisch Belgisch is ook "à tantôt" (tot straks) en "c\'est chouette" (dat is leuk)!'
  }

  // Grammatica-onderwerp
  const mod = findGrammar(q)
  if (mod) {
    const short = mod.explanation.split('\n').filter((l) => l.trim()).slice(0, 4).join('\n')
    return `**${mod.titleNl}**\n\n${short}\n\n${mod.tip ? `💡 Tip: ${mod.tip}\n\n` : ''}Wil je oefenen? Ga naar de Grammatica-module "${mod.titleNl}".`
  }

  // Woord opzoeken / vertalen
  const matches = findVocab(q)
  if (matches.length > 0) {
    const lines = matches.map((m) => `• **${m.dutch}** → *${m.french}*\n   ${m.exampleFr} (${m.exampleNl})`)
    return `Hier is wat ik vond:\n\n${lines.join('\n\n')}${matches[0].isBelgian ? '\n\n🇧🇪 Let op: dit is typisch Belgisch Frans!' : ''}`
  }

  // Geen match
  return 'Daar heb ik geen kant-en-klaar antwoord op met de ingebouwde coach. 🤔\n\nProbeer het anders te formuleren, bijvoorbeeld:\n• "Hoe zeg je *winkel* in het Frans?"\n• "Leg de regels van *être* uit"\n• "Wat betekent *à tantôt*?"\n\n💡 Tip: stel je beheerder voor om een gratis Gemini API-sleutel toe te voegen — dan kan ik álle vragen beantwoorden.'
}

// SM-2 Spaced Repetition Algorithm
// quality: 0-5 waarbij 0-2 = fout, 3-5 = correct (hogere kwaliteit = makkelijker herinnerd)

export interface SRSResult {
  easeFactor: number
  interval: number
  repetitions: number
  nextReview: Date
  mastered: boolean
}

export function calculateNextReview(
  easeFactor: number,
  interval: number,
  repetitions: number,
  quality: number
): SRSResult {
  let ef = easeFactor
  let iv = interval
  let reps = repetitions

  if (quality >= 3) {
    if (reps === 0) iv = 1
    else if (reps === 1) iv = 6
    else iv = Math.round(iv * ef)

    reps += 1
    ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    if (ef < 1.3) ef = 1.3
  } else {
    reps = 0
    iv = 1
  }

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + iv)

  // Mastered = min. 5 herhaling correct, interval > 21 dagen
  const mastered = reps >= 5 && iv > 21

  return { easeFactor: ef, interval: iv, repetitions: reps, nextReview, mastered }
}

// Score op basis van antwoordtype
export function scoreFromAnswer(correct: boolean, responseTimeMs?: number): number {
  if (!correct) return 1 // Fout

  if (!responseTimeMs) return 4 // Correct, geen tijdsmeting

  if (responseTimeMs < 2000) return 5 // Zeer snel correct
  if (responseTimeMs < 5000) return 4 // Snel correct
  if (responseTimeMs < 10000) return 3 // Correct na nadenken
  return 3 // Correct maar traag
}

export function isDueForReview(nextReview: Date): boolean {
  return new Date() >= nextReview
}

export function daysUntilReview(nextReview: Date): number {
  const diff = nextReview.getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

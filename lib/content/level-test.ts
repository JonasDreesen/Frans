export interface LevelQuestion {
  id: string
  type: 'multiple_choice' | 'translate'
  question: string
  context?: string
  options?: string[]
  answer: string
  points: number
  level: 'A1' | 'A2' | 'B1'
}

export const levelTestQuestions: LevelQuestion[] = [
  // ─── A1 VRAGEN ────────────────────────────────────────────────────────────
  {
    id: 'lt-1', level: 'A1', points: 1, type: 'multiple_choice',
    question: 'Hoe zeg je "Goedendag" in het Frans?',
    options: ['Bonsoir', 'Bonjour', 'Bonne nuit', 'Au revoir'],
    answer: 'Bonjour',
  },
  {
    id: 'lt-2', level: 'A1', points: 1, type: 'multiple_choice',
    question: 'Wat betekent "Merci"?',
    options: ['Alstublieft', 'Pardon', 'Dank je', 'Tot ziens'],
    answer: 'Dank je',
  },
  {
    id: 'lt-3', level: 'A1', points: 1, type: 'multiple_choice',
    question: 'Hoe zeg je "één" in het Frans?',
    options: ['Deux', 'Trois', 'Un', 'Cinq'],
    answer: 'Un',
  },
  {
    id: 'lt-4', level: 'A1', points: 1, type: 'multiple_choice',
    question: '"Je suis belge." betekent:',
    options: ['Ik ga naar België.', 'Ik ben Belg.', 'Ik hou van België.', 'Ik kom uit België.'],
    answer: 'Ik ben Belg.',
  },
  {
    id: 'lt-5', level: 'A1', points: 1, type: 'multiple_choice',
    question: 'Welk lidwoord hoort bij "café" (mannelijk)?',
    context: '___ café',
    options: ['La', 'Le', 'Les', 'Une'],
    answer: 'Le',
  },
  // ─── A2 VRAGEN ────────────────────────────────────────────────────────────
  {
    id: 'lt-6', level: 'A2', points: 2, type: 'multiple_choice',
    question: '"Nous ___ une réunion." (avoir) - Kies het juiste werkwoord.',
    options: ['avons', 'avez', 'ont', 'a'],
    answer: 'avons',
  },
  {
    id: 'lt-7', level: 'A2', points: 2, type: 'multiple_choice',
    question: 'Hoe zeg je "Zij werkt in Brussel"?',
    options: ['Elle travaille à Bruxelles.', 'Elle travailles à Bruxelles.', 'Elle travaillons à Bruxelles.', 'Elle travaillez à Bruxelles.'],
    answer: 'Elle travaille à Bruxelles.',
  },
  {
    id: 'lt-8', level: 'A2', points: 2, type: 'multiple_choice',
    question: '"Septante" is het Belgische woord voor:',
    options: ['Zestig', 'Zeventig', 'Tachtig', 'Negentig'],
    answer: 'Zeventig',
  },
  {
    id: 'lt-9', level: 'A2', points: 2, type: 'multiple_choice',
    question: 'Hoe zeg je "Ik ga naar het kantoor" in het Frans?',
    options: ['Je vais à le bureau.', 'Je vais au bureau.', 'Je vais du bureau.', 'Je vais en bureau.'],
    answer: 'Je vais au bureau.',
  },
  {
    id: 'lt-10', level: 'A2', points: 2, type: 'multiple_choice',
    question: '"Une bonne collègue" - waarom "bonne" en niet "bon"?',
    options: ['Willekeurig', 'Collègue is vrouwelijk', 'Collègue is meervoud', 'Dat is standaard'],
    answer: 'Collègue is vrouwelijk',
  },
  // ─── B1 VRAGEN ────────────────────────────────────────────────────────────
  {
    id: 'lt-11', level: 'B1', points: 3, type: 'multiple_choice',
    question: 'Hoe zeg je "Ik heb gisteren gewerkt" in het Frans?',
    options: ["J'ai travaillé hier.", "Je travaillais hier.", "Je travaille hier.", "J'allais travailler hier."],
    answer: "J'ai travaillé hier.",
  },
  {
    id: 'lt-12', level: 'B1', points: 3, type: 'multiple_choice',
    question: '"Elle est allée à Bruxelles." - waarom "est" en niet "a"?',
    options: ['Fout, het moet "a" zijn', '"Aller" gebruikt "être" in passé composé', 'Bruxelles vereist être', 'Vrouwelijk onderwerp vereist être'],
    answer: '"Aller" gebruikt "être" in passé composé',
  },
  {
    id: 'lt-13', level: 'B1', points: 3, type: 'multiple_choice',
    question: '"Je ne ___ pas français." (parler) - vul in',
    options: ['parle', 'parles', 'parlons', 'parlez'],
    answer: 'parle',
  },
  {
    id: 'lt-14', level: 'B1', points: 3, type: 'multiple_choice',
    question: 'Wat betekent "À tantôt" in Belgisch Frans?',
    options: ['Tot nooit meer', 'Tot zo meteen / Tot straks', 'Goedemorgen', 'Veel succes'],
    answer: 'Tot zo meteen / Tot straks',
  },
  {
    id: 'lt-15', level: 'B1', points: 3, type: 'multiple_choice',
    question: '"Nous ___ à Bruxelles demain." (aller, futur simple)',
    options: ['irons', 'allons', 'allez', 'irez'],
    answer: 'irons',
  },
]

export function calculateLevel(score: number, maxScore: number): string {
  const pct = score / maxScore
  if (pct < 0.3) return 'A1'
  if (pct < 0.55) return 'A2'
  if (pct < 0.75) return 'B1'
  return 'B2'
}

export const maxScore = levelTestQuestions.reduce((sum, q) => sum + q.points, 0)

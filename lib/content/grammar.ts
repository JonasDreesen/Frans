export interface GrammarExercise {
  id: string
  type: 'multiple_choice' | 'fill_blank' | 'translate'
  question: string
  context?: string
  options?: string[]
  answer: string
  explanation: string
}

export interface GrammarModule {
  slug: string
  titleNl: string
  description: string
  level: 'A1' | 'A2' | 'B1'
  order: number
  explanation: string
  tip?: string
  exercises: GrammarExercise[]
}

export const grammarModules: GrammarModule[] = [
  {
    slug: 'artikels',
    titleNl: 'Lidwoorden (le, la, les, un, une)',
    description: 'Leer de Franse lidwoorden en wanneer je ze gebruikt.',
    level: 'A1',
    order: 1,
    explanation: `In het Frans heeft elk zelfstandig naamwoord een geslacht: mannelijk (masculin) of vrouwelijk (féminin).

**Bepaalde lidwoorden:**
- **le** (de/het) → mannelijk enkelvoud: *le café, le bureau*
- **la** (de/het) → vrouwelijk enkelvoud: *la maison, la voiture*
- **les** (de) → meervoud: *les enfants, les frites*
- **l'** → voor klinker of h: *l'école, l'hôpital*

**Onbepaalde lidwoorden:**
- **un** (een) → mannelijk: *un ami, un livre*
- **une** (een) → vrouwelijk: *une table, une bière*
- **des** (some/een paar) → meervoud: *des frites, des collègues*

**Tip voor Vlamingen:** Het geslacht van een woord kan je niet altijd raden. Leer elk woord samen met zijn lidwoord!`,
    tip: 'Leer elk nieuw woord altijd samen met zijn lidwoord. Zeg altijd "le livre" en niet alleen "livre".',
    exercises: [
      {
        id: 'art-1',
        type: 'multiple_choice',
        question: 'Welk lidwoord gebruik je voor "café" (mannelijk)?',
        context: '___ café est ouvert.',
        options: ['Le', 'La', 'Les', 'Une'],
        answer: 'Le',
        explanation: '"Café" is een mannelijk woord → le café.',
      },
      {
        id: 'art-2',
        type: 'multiple_choice',
        question: 'Welk lidwoord gebruik je voor "bière" (vrouwelijk)?',
        context: '___ bière belge est délicieuse.',
        options: ['Le', 'La', 'Les', 'Un'],
        answer: 'La',
        explanation: '"Bière" is een vrouwelijk woord → la bière.',
      },
      {
        id: 'art-3',
        type: 'multiple_choice',
        question: 'Welk lidwoord gebruik je voor "enfants" (meervoud)?',
        context: '___ enfants jouent dans le parc.',
        options: ['Le', 'La', 'Les', 'Des'],
        answer: 'Les',
        explanation: 'Meervoud + bepaald → les enfants.',
      },
      {
        id: 'art-4',
        type: 'multiple_choice',
        question: 'Welk lidwoord gebruik je voor "école" (vrouwelijk, begint met e)?',
        context: "___ école est fermée aujourd'hui.",
        options: ["Le", "La", "L'", "Un"],
        answer: "L'",
        explanation: 'Vrouwelijk woord dat begint met een klinker → l\'école.',
      },
      {
        id: 'art-5',
        type: 'translate',
        question: 'Vertaal naar het Frans: "Ik wil een bier." (onbepaald)',
        answer: 'Je voudrais une bière.',
        explanation: '"Een bier" is onbepaald en vrouwelijk → une bière.',
      },
      {
        id: 'art-6',
        type: 'multiple_choice',
        question: 'Welk onbepaald lidwoord hoort bij "directeur" (mannelijk)?',
        context: "C'est ___ directeur.",
        options: ['un', 'une', 'des', 'le'],
        answer: 'un',
        explanation: '"Directeur" is mannelijk enkelvoud + onbepaald → un directeur.',
      },
    ],
  },
  {
    slug: 'etre',
    titleNl: 'Het werkwoord "être" (zijn)',
    description: 'Vervoeging van "être" - het meest gebruikte werkwoord in het Frans.',
    level: 'A1',
    order: 2,
    explanation: `**Être = zijn** - De volledige vervoeging in de tegenwoordige tijd:

| Persoon | Frans | Nederlands |
|---------|-------|------------|
| je | **suis** | ik ben |
| tu | **es** | jij bent |
| il/elle | **est** | hij/zij is |
| nous | **sommes** | wij zijn |
| vous | **êtes** | u/jullie zijn |
| ils/elles | **sont** | zij zijn |

**Voorbeelden:**
- *Je suis belge.* → Ik ben Belg.
- *Tu es étudiant?* → Ben jij student?
- *Il est au bureau.* → Hij is op kantoor.
- *Nous sommes à Bruxelles.* → Wij zijn in Brussel.
- *Vous êtes directeur?* → Bent u directeur?
- *Ils sont collègues.* → Zij zijn collega's.`,
    exercises: [
      {
        id: 'etre-1',
        type: 'fill_blank',
        question: 'Vul in: "Ik ben Belg." → "Je ___ belge."',
        answer: 'suis',
        explanation: 'Je + être = je suis',
      },
      {
        id: 'etre-2',
        type: 'multiple_choice',
        question: 'Hoe zeg je "zij is directrice"?',
        options: ['Elle est directrice.', 'Elle suis directrice.', 'Elle sommes directrice.', 'Elle êtes directrice.'],
        answer: 'Elle est directrice.',
        explanation: 'il/elle + être = il/elle est',
      },
      {
        id: 'etre-3',
        type: 'multiple_choice',
        question: '"Nous ___ à Bruxelles." Kies het juiste werkwoord.',
        options: ['êtes', 'sommes', 'sont', 'suis'],
        answer: 'sommes',
        explanation: 'nous + être = nous sommes',
      },
      {
        id: 'etre-4',
        type: 'fill_blank',
        question: '"U bent de directeur." → "Vous ___ le directeur."',
        answer: 'êtes',
        explanation: 'vous + être = vous êtes',
      },
      {
        id: 'etre-5',
        type: 'translate',
        question: 'Vertaal: "Zij zijn collega\'s."',
        answer: "Ils sont collègues.",
        explanation: 'ils/elles + être = ils/elles sont',
      },
    ],
  },
  {
    slug: 'avoir',
    titleNl: 'Het werkwoord "avoir" (hebben)',
    description: 'Vervoeging van "avoir" - essentieel voor veel uitdrukkingen.',
    level: 'A1',
    order: 3,
    explanation: `**Avoir = hebben** - Onmisbaar in het Frans!

| Persoon | Frans | Nederlands |
|---------|-------|------------|
| je | **ai** | ik heb |
| tu | **as** | jij hebt |
| il/elle | **a** | hij/zij heeft |
| nous | **avons** | wij hebben |
| vous | **avez** | u/jullie hebben |
| ils/elles | **ont** | zij hebben |

**Belgische tip:** "avoir" wordt ook gebruikt voor leeftijd: *J'ai 25 ans.* (Ik ben 25 jaar oud.)

**Veelgebruikte uitdrukkingen met avoir:**
- *avoir faim* → honger hebben
- *avoir soif* → dorst hebben
- *avoir raison* → gelijk hebben
- *avoir tort* → ongelijk hebben`,
    exercises: [
      {
        id: 'avoir-1',
        type: 'fill_blank',
        question: '"Ik heb een vraag." → "J\'___ une question."',
        answer: 'ai',
        explanation: 'je + avoir = j\'ai',
      },
      {
        id: 'avoir-2',
        type: 'multiple_choice',
        question: 'Hoe zeg je "Wij hebben een vergadering"?',
        options: ['Nous avons une réunion.', 'Nous avez une réunion.', 'Nous ont une réunion.', 'Nous a une réunion.'],
        answer: 'Nous avons une réunion.',
        explanation: 'nous + avoir = nous avons',
      },
      {
        id: 'avoir-3',
        type: 'translate',
        question: 'Vertaal: "Hij heeft drie kinderen."',
        answer: 'Il a trois enfants.',
        explanation: 'il + avoir = il a',
      },
      {
        id: 'avoir-4',
        type: 'multiple_choice',
        question: '"Tu ___ raison!" Vul in.',
        options: ['as', 'ai', 'a', 'avons'],
        answer: 'as',
        explanation: 'tu + avoir = tu as',
      },
    ],
  },
  {
    slug: 'negation',
    titleNl: 'Ontkenning (ne...pas)',
    description: 'Leer hoe je zinnen ontkent met ne...pas.',
    level: 'A1',
    order: 4,
    explanation: `**Ontkenning in het Frans: ne...pas**

De ontkenning omhult het werkwoord: **ne** + werkwoord + **pas**

- *Je parle français.* → *Je **ne** parle **pas** français.*
- *Elle est au bureau.* → *Elle **n'**est **pas** au bureau.*
- *Nous avons le temps.* → *Nous **n'**avons **pas** le temps.*

**Aandachtspunten:**
- Voor een klinker: "ne" wordt "n'" → *n'est pas*
- In gesproken Belgisch Frans laat men soms "ne" weg: "Je suis pas là" (informeel)
- In formele/schriftelijke taal altijd ne...pas gebruiken!`,
    exercises: [
      {
        id: 'neg-1',
        type: 'translate',
        question: 'Verander naar ontkenning: "Je parle français."',
        answer: 'Je ne parle pas français.',
        explanation: 'Voeg ne...pas toe rond het werkwoord: je ne parle pas',
      },
      {
        id: 'neg-2',
        type: 'multiple_choice',
        question: 'Hoe ontkent men "Elle est directrice"?',
        options: ["Elle n'est pas directrice.", "Elle ne est pas directrice.", "Elle est ne pas directrice.", "Elle pas directrice."],
        answer: "Elle n'est pas directrice.",
        explanation: 'est begint met een klinker: ne + est = n\'est pas',
      },
      {
        id: 'neg-3',
        type: 'fill_blank',
        question: '"Ik heb geen tijd." → "Je n\'___ pas le temps."',
        answer: 'ai',
        explanation: 'Je n\'ai pas le temps → avoir in ontkenning',
      },
    ],
  },
  {
    slug: 'er-werkwoorden',
    titleNl: 'Regelmatige -er werkwoorden',
    description: 'De meest voorkomende categorie: parler, travailler, habiter...',
    level: 'A1',
    order: 5,
    explanation: `**Regelmatige -er werkwoorden** vormen de grootste groep in het Frans.

**Patroon:** Verwijder -er, voeg de uitgang toe:

| Persoon | Uitgang | Voorbeeld: parler |
|---------|---------|-------------------|
| je | **-e** | je parl**e** |
| tu | **-es** | tu parl**es** |
| il/elle | **-e** | il parl**e** |
| nous | **-ons** | nous parl**ons** |
| vous | **-ez** | vous parl**ez** |
| ils/elles | **-ent** | ils parl**ent** |

**Veelgebruikte -er werkwoorden:**
- *habiter* (wonen): j'habite, tu habites...
- *travailler* (werken): je travaille...
- *aimer* (houden van): j'aime...
- *arriver* (aankomen): j'arrive...`,
    exercises: [
      {
        id: 'er-1',
        type: 'fill_blank',
        question: '"Ik woon in Gent." → "J\'___ à Gand." (habiter)',
        answer: 'habite',
        explanation: 'habiter: je → j\'habite (verwijder -er, voeg -e toe)',
      },
      {
        id: 'er-2',
        type: 'multiple_choice',
        question: '"Vous ___ à Bruxelles?" (travailler)',
        options: ['travaillez', 'travaille', 'travaillons', 'travaillent'],
        answer: 'travaillez',
        explanation: 'vous + travailler = vous travaillez',
      },
      {
        id: 'er-3',
        type: 'translate',
        question: 'Vertaal: "Zij spreken Frans." (parler)',
        answer: 'Elles parlent français.',
        explanation: 'ils/elles + parler = ils/elles parlent',
      },
    ],
  },
  {
    slug: 'vragen',
    titleNl: 'Vragen stellen',
    description: 'Hoe stel je vragen in het Frans? Drie manieren!',
    level: 'A2',
    order: 6,
    explanation: `**Drie manieren om te vragen in het Frans:**

**1. Intonatie** (informeel) - stem omhoog aan het einde:
*Tu parles français?* → Spreek jij Frans?

**2. Est-ce que** (neutraal) - voeg "est-ce que" toe voor de zin:
*Est-ce que tu parles français?*

**3. Inversie** (formeel) - wissel subject en werkwoord:
*Parlez-vous français?*

**Vraagwoorden:**
- *Qui?* → Wie?
- *Que / Quoi?* → Wat?
- *Où?* → Waar?
- *Quand?* → Wanneer?
- *Comment?* → Hoe?
- *Pourquoi?* → Waarom?
- *Combien?* → Hoeveel?`,
    exercises: [
      {
        id: 'vr-1',
        type: 'translate',
        question: 'Vertaal (formeel/inversie): "Spreekt u Frans?"',
        answer: 'Parlez-vous français?',
        explanation: 'Formele vraag via inversie: werkwoord-onderwerp',
      },
      {
        id: 'vr-2',
        type: 'multiple_choice',
        question: '"Waar is het toilet?" → kies de juiste vertaling',
        options: ["Où sont les toilettes?", "Quand sont les toilettes?", "Comment sont les toilettes?", "Qui sont les toilettes?"],
        answer: "Où sont les toilettes?",
        explanation: 'Où = waar',
      },
      {
        id: 'vr-3',
        type: 'fill_blank',
        question: '"Hoeveel kost dit?" → "___ coûte cela?"',
        answer: 'Combien',
        explanation: 'Combien = hoeveel (bij prijs)',
      },
    ],
  },
  {
    slug: 'bijvoeglijke-naamwoorden',
    titleNl: 'Bijvoeglijke naamwoorden',
    description: 'Bijvoeglijke naamwoorden passen zich aan aan geslacht en getal.',
    level: 'A2',
    order: 7,
    explanation: `**Bijvoeglijke naamwoorden (adjectifs)** passen zich aan aan:
- **Geslacht:** mannelijk / vrouwelijk (+e)
- **Getal:** enkelvoud / meervoud (+s)

**Basisregel:**
| | Enkelvoud | Meervoud |
|---|---|---|
| Mannelijk | *grand* | *grands* |
| Vrouwelijk | *grande* | *grandes* |

**Onregelmatige vormen:**
- *bon/bonne* (goed) → bonne bière belge
- *beau/belle* (mooi) → une belle ville
- *nouveau/nouvelle* (nieuw) → une nouvelle collègue

**Positie:** Meestal NA het zelfstandig naamwoord:
*un café belge, une bière froide*

**Maar vóór het zelfstandig naamwoord:**
*un grand bureau, une belle ville, un bon rapport*`,
    exercises: [
      {
        id: 'adj-1',
        type: 'multiple_choice',
        question: '"Een goede collega" (vrouwelijk) → kies het juiste bijvoeglijk naamwoord',
        context: 'Une ___ collègue.',
        options: ['bon', 'bonne', 'bons', 'bonnes'],
        answer: 'bonne',
        explanation: '"Collègue" is vrouwelijk → "bon" wordt "bonne"',
      },
      {
        id: 'adj-2',
        type: 'translate',
        question: 'Vertaal: "Belgisch bier" (mannelijk: le bier)',
        answer: 'une bière belge',
        explanation: 'belge verandert niet voor vrouwelijk (eindigt al op -e)',
      },
      {
        id: 'adj-3',
        type: 'fill_blank',
        question: '"Een groot bedrijf." → "Une grande ___."',
        answer: 'entreprise',
        explanation: 'entreprise is vrouwelijk; grande = vrouwelijke vorm van grand',
      },
    ],
  },
  {
    slug: 'passe-compose',
    titleNl: 'Verleden tijd: Le passé composé',
    description: 'De meest gebruikte verleden tijd in het gesproken Frans.',
    level: 'B1',
    order: 8,
    explanation: `**Passé composé** = voltooide handelingen in het verleden.

**Vorming:** avoir/être + voltooid deelwoord (participe passé)

**Met avoir** (de meeste werkwoorden):
*travailler → j'ai travaillé*
*manger → j'ai mangé*
*finir → j'ai fini*

**Met être** (bewegingswerkwoorden + reflexieve):
*aller → je suis allé(e)*
*venir → je suis venu(e)*
*arriver → je suis arrivé(e)*
*partir → je suis parti(e)*

**Onregelmatige deelwoorden:**
- *avoir → eu* (had)
- *être → été* (was)
- *faire → fait* (gedaan)
- *prendre → pris* (genomen)

**Ontkenning:** Je n'ai pas travaillé.`,
    exercises: [
      {
        id: 'pc-1',
        type: 'translate',
        question: 'Vertaal: "Ik heb gisteren gewerkt."',
        answer: "J'ai travaillé hier.",
        explanation: 'travailler → avoir + travaillé',
      },
      {
        id: 'pc-2',
        type: 'multiple_choice',
        question: '"Zij (elle) is naar Brussel gegaan." → kies correct',
        options: ['Elle a allé à Bruxelles.', 'Elle est allée à Bruxelles.', 'Elle est allé à Bruxelles.', 'Elle va allé à Bruxelles.'],
        answer: 'Elle est allée à Bruxelles.',
        explanation: 'aller → être + allé(e). Vrouwelijk subject = allée',
      },
      {
        id: 'pc-3',
        type: 'fill_blank',
        question: '"Wij hebben de vergadering afgerond." → "Nous avons ___ la réunion." (terminer)',
        answer: 'terminé',
        explanation: 'terminer → avoir + terminé',
      },
    ],
  },
  {
    slug: 'futur-simple',
    titleNl: 'Toekomende tijd: Le futur simple',
    description: 'Hoe spreek je over de toekomst in het Frans?',
    level: 'B1',
    order: 9,
    explanation: `**Futur simple** = toekomende tijd

**Vorming:** infinitief + uitgang

| Persoon | Uitgang | Voorbeeld: parler |
|---------|---------|-------------------|
| je | **-ai** | je parler**ai** |
| tu | **-as** | tu parler**as** |
| il/elle | **-a** | il parler**a** |
| nous | **-ons** | nous parler**ons** |
| vous | **-ez** | vous parler**ez** |
| ils/elles | **-ont** | ils parler**ont** |

**Onregelmatig:**
- *être → ser-*: je serai
- *avoir → aur-*: j'aurai
- *aller → ir-*: j'irai
- *faire → fer-*: je ferai
- *venir → viendr-*: je viendrai

**Tip:** In het dagelijks Frans gebruikt men vaak "aller + infinitief" voor de nabije toekomst:
*Je vais travailler demain.* (Ik ga morgen werken.)`,
    exercises: [
      {
        id: 'fut-1',
        type: 'translate',
        question: 'Vertaal: "Ik zal morgen werken."',
        answer: 'Je travaillerai demain.',
        explanation: 'travailler + -ai = travaillerai',
      },
      {
        id: 'fut-2',
        type: 'multiple_choice',
        question: '"De vergadering zal om 9 uur beginnen." → kies correct',
        options: ['La réunion commencera à 9h.', 'La réunion commencerai à 9h.', 'La réunion commencerons à 9h.', 'La réunion commenceront à 9h.'],
        answer: 'La réunion commencera à 9h.',
        explanation: 'il/elle + -a = commencera',
      },
      {
        id: 'fut-3',
        type: 'fill_blank',
        question: '"Wij zullen naar Brussel gaan." → "Nous ___ à Bruxelles." (aller)',
        answer: 'irons',
        explanation: 'aller onregelmatig: ir- + -ons = irons',
      },
    ],
  },
  {
    slug: 'voorzetsels',
    titleNl: 'Voorzetsels (à, de, en, dans...)',
    description: 'De meest gebruikte voorzetsels in het Frans.',
    level: 'B1',
    order: 10,
    explanation: `**Voorzetsels (prépositions)** zijn essentieel voor vloeiend Frans.

**à** → naar, in, op, aan
*Je vais à Bruxelles.* / *Je suis à la gare.*

**de** → van, uit
*Je viens de Gand.* (Ik kom uit Gent.)
*Le bureau du directeur.* (au = à + le, du = de + le)

**en** → in (landen, maanden, jaar):
*Je travaille en Belgique.* / *en janvier*

**dans** → in (ruimte, container):
*Le rapport est dans le bureau.*

**sur** → op: *sur la table*
**sous** → onder: *sous le bureau*
**avec** → met: *avec un collègue*
**pour** → voor: *pour vous*

**Contracties:**
- à + le = **au** (Je vais au bureau.)
- à + les = **aux** (Je parle aux collègues.)
- de + le = **du** (Le café du matin.)
- de + les = **des** (Les frites des Belges.)`,
    exercises: [
      {
        id: 'prep-1',
        type: 'multiple_choice',
        question: '"Ik ga naar het kantoor." → kies het juiste voorzetsel',
        context: 'Je vais ___ bureau.',
        options: ['au', 'à la', 'à le', 'du'],
        answer: 'au',
        explanation: 'à + le bureau = au bureau (contractie)',
      },
      {
        id: 'prep-2',
        type: 'fill_blank',
        question: '"De vergadering van de directeur." → "La réunion ___ directeur."',
        answer: 'du',
        explanation: 'de + le = du (contractie)',
      },
      {
        id: 'prep-3',
        type: 'translate',
        question: 'Vertaal: "Ik werk in België."',
        answer: 'Je travaille en Belgique.',
        explanation: 'landen: gebruik "en" (vrouwelijk land) → en Belgique',
      },
    ],
  },
]

export function getModuleBySlug(slug: string): GrammarModule | undefined {
  return grammarModules.find((m) => m.slug === slug)
}

export function getModulesByLevel(level: string): GrammarModule[] {
  const order = ['A1', 'A2', 'B1', 'B2']
  const idx = order.indexOf(level)
  const allowed = order.slice(0, idx + 1)
  return grammarModules.filter((m) => allowed.includes(m.level))
}

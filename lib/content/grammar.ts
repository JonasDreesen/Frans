export interface GrammarExercise {
  id: string
  // reorder: 'answer' is de volledige zin, woorden worden geschud getoond.
  // listen_choice: 'context' is de Franse tekst die wordt voorgelezen (niet getoond).
  type: 'multiple_choice' | 'fill_blank' | 'translate' | 'reorder' | 'listen_choice'
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
  level: 'A1' | 'A2' | 'B1' | 'B2'
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
  {
    slug: 'bezittelijke-voornaamwoorden',
    titleNl: 'Bezittelijke voornaamwoorden (mon, ta, ses...)',
    description: 'Mon, ton, son, notre, votre, leur — wie bezit wat?',
    level: 'A1',
    order: 11,
    explanation: `**Bezittelijke voornaamwoorden** passen zich aan het geslacht en aantal van het zelfstandig naamwoord aan (NIET aan de eigenaar!).

| Eigenaar | Mannelijk | Vrouwelijk | Meervoud |
|---|---|---|---|
| ik | **mon** père | **ma** mère | **mes** parents |
| jij | **ton** père | **ta** mère | **tes** parents |
| hij/zij | **son** père | **sa** mère | **ses** parents |
| wij | **notre** père | **notre** mère | **nos** parents |
| jullie/u | **votre** père | **votre** mère | **vos** parents |
| zij (mv) | **leur** père | **leur** mère | **leurs** parents |

**Belangrijke valkuil:** "son/sa/ses" betekent zowel "zijn" als "haar"! *Sa voiture* kan "zijn auto" of "haar auto" zijn — de context bepaalt wie de eigenaar is, niet het woordje zelf.

**Extra regel:** voor een vrouwelijk woord dat met een klinker begint, gebruik je **mon/ton/son** in plaats van ma/ta/sa: *mon amie* (niet "ma amie"), om de uitspraak vloeiend te houden.`,
    tip: 'Vergeet niet: "son" en "sa" zeggen niets over of de eigenaar man of vrouw is — enkel het zelfstandig naamwoord telt!',
    exercises: [
      {
        id: 'poss-1',
        type: 'multiple_choice',
        question: 'Welk woord past bij "père" (mannelijk, ik)?',
        context: '___ père travaille à Bruxelles.',
        options: ['mon', 'ma', 'mes', 'ton'],
        answer: 'mon',
        explanation: 'père is mannelijk enkelvoud → mon père.',
      },
      {
        id: 'poss-2',
        type: 'multiple_choice',
        question: 'Welk woord past bij "mère" (vrouwelijk, zijn/haar)?',
        context: 'Elle parle avec ___ mère.',
        options: ['son', 'sa', 'ses', 'leur'],
        answer: 'sa',
        explanation: 'mère is vrouwelijk enkelvoud → sa mère (ook al is "sa" hetzelfde voor "zijn" en "haar").',
      },
      {
        id: 'poss-3',
        type: 'fill_blank',
        question: 'Onze collega\'s zijn sympathiek. → "___ collègues sont sympathiques."',
        answer: 'Nos',
        explanation: 'meervoud + wij → nos collègues.',
      },
      {
        id: 'poss-4',
        type: 'translate',
        question: 'Vertaal: "Zijn/haar auto is rood."',
        answer: 'Sa voiture est rouge.',
        explanation: 'voiture is vrouwelijk → sa (niet "son", dat is voor mannelijke woorden of woorden die met klinker beginnen).',
      },
      {
        id: 'poss-5',
        type: 'reorder',
        question: 'Zet de woorden in de juiste volgorde:',
        context: 'Jullie ouders wonen in Wallonië.',
        answer: 'Vos parents habitent en Wallonie.',
        explanation: 'Vos (jullie, meervoud) + parents + habitent + en Wallonie.',
      },
      {
        id: 'poss-6',
        type: 'listen_choice',
        question: 'Luister en kies de juiste vertaling.',
        context: 'Mon frère habite à Liège.',
        options: ['Mijn broer woont in Luik.', 'Jouw broer woont in Luik.', 'Zijn zus woont in Luik.', 'Onze broer woont in Luik.'],
        answer: 'Mijn broer woont in Luik.',
        explanation: 'mon frère = mijn broer.',
      },
    ],
  },
  {
    slug: 'werkwoorden-ir-re',
    titleNl: 'Werkwoorden op -IR en -RE (finir, vendre)',
    description: 'De twee andere regelmatige werkwoordgroepen naast -ER.',
    level: 'A2',
    order: 12,
    explanation: `Naast de -ER werkwoorden (zoals *travailler*) bestaan er twee andere regelmatige groepen.

**Groep 2: -IR werkwoorden** (zoals *finir* = beëindigen)
| je | finis | nous | finissons |
|---|---|---|---|
| tu | finis | vous | finissez |
| il/elle | finit | ils/elles | finissent |

Andere voorbeelden: *choisir* (kiezen), *réussir* (slagen).

**Groep 3: -RE werkwoorden** (zoals *vendre* = verkopen)
| je | vends | nous | vendons |
|---|---|---|---|
| tu | vends | vous | vendez |
| il/elle | vend | ils/elles | vendent |

Andere voorbeelden: *attendre* (wachten), *répondre* (antwoorden).

**Tip:** bij -RE werkwoorden krijgt "il/elle" geen extra letter (vend, niet vendt).`,
    tip: 'Schrijf de vervoeging van een nieuw werkwoord altijd helemaal uit — dat helpt je de patronen te herkennen.',
    exercises: [
      {
        id: 'irre-1',
        type: 'multiple_choice',
        question: 'Hij beëindigt zijn werk. (finir)',
        context: 'Il ___ son travail.',
        options: ['finit', 'finis', 'finissent', 'finissez'],
        answer: 'finit',
        explanation: 'il/elle + finir → finit.',
      },
      {
        id: 'irre-2',
        type: 'multiple_choice',
        question: 'Wij wachten op de trein. (attendre)',
        context: 'Nous ___ le train.',
        options: ['attendons', 'attendez', 'attendent', 'attends'],
        answer: 'attendons',
        explanation: 'nous + attendre → attendons.',
      },
      {
        id: 'irre-3',
        type: 'fill_blank',
        question: 'Zij (meervoud) verkopen wafels. → "Elles ___ des gaufres." (vendre)',
        answer: 'vendent',
        explanation: 'ils/elles + vendre → vendent.',
      },
      {
        id: 'irre-4',
        type: 'translate',
        question: 'Vertaal: "Jij antwoordt snel." (répondre, vite)',
        answer: 'Tu réponds vite.',
        explanation: 'tu + répondre → réponds.',
      },
      {
        id: 'irre-5',
        type: 'reorder',
        question: 'Zet de woorden in de juiste volgorde:',
        context: 'Ik kies de Belgische chocolade.',
        answer: 'Je choisis le chocolat belge.',
        explanation: 'choisir → je choisis.',
      },
      {
        id: 'irre-6',
        type: 'listen_choice',
        question: 'Luister en kies de juiste vertaling.',
        context: "Vous réussissez l'examen.",
        options: ['Jullie slagen voor het examen.', 'Jullie verkopen het examen.', 'Jullie wachten op het examen.', 'Jullie kiezen het examen.'],
        answer: 'Jullie slagen voor het examen.',
        explanation: 'réussir = slagen.',
      },
    ],
  },
  {
    slug: 'reflexieve-werkwoorden',
    titleNl: 'Reflexieve werkwoorden (se lever, s\'appeler)',
    description: 'Werkwoorden met "zich" — me, te, se, nous, vous, se.',
    level: 'A2',
    order: 13,
    explanation: `**Reflexieve werkwoorden** (verbes pronominaux) hebben een extra voornaamwoord dat "terugslaat" op het onderwerp — net als het Nederlandse "zich".

**s'appeler** (zich noemen / heten):
| je | m'appelle | nous | nous appelons |
|---|---|---|---|
| tu | t'appelles | vous | vous appelez |
| il/elle | s'appelle | ils/elles | s'appellent |

**se lever** (opstaan):
*Je me lève à 7 heures.* (Ik sta op om 7 uur.)
*Tu te lèves tôt.* (Jij staat vroeg op.)
*Il se lève tard.* (Hij staat laat op.)

**Patroon:** me/te/se/nous/vous/se + vervoegd werkwoord. Bij je/tu/il/elle/ils wordt me/te/se ingekort tot m'/t'/s' voor een klinker.

**Ontkenning:** *Je ne me lève pas tôt.* — het "ne...pas" omsluit het hele blok: voornaamwoord + werkwoord.`,
    tip: 'Vergeet het reflexieve voornaamwoord niet — "Je appelle" bestaat niet, het moet "Je m\'appelle" zijn.',
    exercises: [
      {
        id: 'refl-1',
        type: 'multiple_choice',
        question: 'Hoe heet jij?',
        context: 'Comment tu ___?',
        options: ["t'appelles", 'appelles', 'vous appelez', "s'appelle"],
        answer: "t'appelles",
        explanation: 'tu + s\'appeler → tu t\'appelles.',
      },
      {
        id: 'refl-2',
        type: 'multiple_choice',
        question: 'Ik sta om 6 uur op. (se lever)',
        context: 'Je ___ à 6 heures.',
        options: ['me lève', 'lève', 'te lèves', 'se lève'],
        answer: 'me lève',
        explanation: 'je + se lever → je me lève.',
      },
      {
        id: 'refl-3',
        type: 'fill_blank',
        question: 'Wij wassen ons elke morgen. → "Nous ___ chaque matin." (se laver)',
        answer: 'nous lavons',
        explanation: 'nous + se laver → nous nous lavons (twee keer "nous": onderwerp + reflexief voornaamwoord).',
      },
      {
        id: 'refl-4',
        type: 'translate',
        question: 'Vertaal: "Hij kleedt zich snel aan." (s\'habiller, vite)',
        answer: "Il s'habille vite.",
        explanation: "il + s'habiller → il s'habille.",
      },
      {
        id: 'refl-5',
        type: 'reorder',
        question: 'Zet de woorden in de juiste volgorde:',
        context: 'Jullie staan laat op op zaterdag.',
        answer: 'Vous vous levez tard le samedi.',
        explanation: 'vous + se lever → vous vous levez.',
      },
      {
        id: 'refl-6',
        type: 'listen_choice',
        question: 'Luister en kies de juiste vertaling.',
        context: "Elle s'appelle Sophie.",
        options: ['Zij heet Sophie.', 'Hij heet Sophie.', 'Wij heten Sophie.', 'Jij heet Sophie.'],
        answer: 'Zij heet Sophie.',
        explanation: "elle s'appelle = zij heet.",
      },
    ],
  },
  {
    slug: 'imparfait',
    titleNl: "L'imparfait (onvoltooid verleden tijd)",
    description: 'Gewoontes en beschrijvingen in het verleden, in contrast met de passé composé.',
    level: 'B1',
    order: 14,
    explanation: `**L'imparfait** beschrijft gewoontes, achtergrond en lopende handelingen in het verleden ("vroeger deed ik...", "het was..."). Het contrasteert met de **passé composé**, die een afgeronde actie op een specifiek moment beschrijft.

**Vorming:** neem de "nous"-vorm van de tegenwoordige tijd, haal "-ons" weg, en voeg toe:
| je | -ais | nous | -ions |
|---|---|---|---|
| tu | -ais | vous | -iez |
| il/elle | -ait | ils/elles | -aient |

*parler* → nous parl**ons** → je parl**ais**, tu parlais, il parlait, nous parlions, vous parliez, ils parlaient

**Uitzondering: être** → j'étais, tu étais, il était, nous étions, vous étiez, ils étaient

**Vergelijking:**
- *Quand j'étais jeune, j'habitais à Gand.* (gewoonte/beschrijving → imparfait)
- *Hier, je suis allé à Bruxelles.* (eenmalige, afgeronde actie → passé composé)

**Vlaamse valkuil:** in spreektaal gebruiken Nederlandstaligen soms passé composé voor alles. Gebruik imparfait voor "wat was de situatie/wat deed je gewoonlijk".`,
    tip: 'Denk aan "vroeger, altijd, elke dag" → imparfait. Denk aan "op dat moment, plots, gisteren om 5u" → passé composé.',
    exercises: [
      {
        id: 'imp-1',
        type: 'multiple_choice',
        question: 'Vroeger woonde ik in Brussel. (habiter)',
        context: "Avant, j'___ à Bruxelles.",
        options: ['habitais', 'ai habité', 'habite', 'habiterai'],
        answer: 'habitais',
        explanation: "gewoonte in het verleden → imparfait: j'habitais.",
      },
      {
        id: 'imp-2',
        type: 'multiple_choice',
        question: 'être in imparfait voor "nous"',
        context: 'Nous ___ très jeunes.',
        options: ['étions', 'sommes', 'serons', 'étaient'],
        answer: 'étions',
        explanation: 'être, imparfait, nous → étions.',
      },
      {
        id: 'imp-3',
        type: 'fill_blank',
        question: 'Elke zondag aten wij frietjes. → "Chaque dimanche, nous ___ des frites." (manger)',
        answer: 'mangions',
        explanation: 'gewoonte → imparfait: nous mangions.',
      },
      {
        id: 'imp-4',
        type: 'translate',
        question: 'Vertaal: "Toen ik klein was, sprak ik geen Frans."',
        answer: "Quand j'étais petit, je ne parlais pas français.",
        explanation: 'beschrijving + gewoonte in het verleden → imparfait voor beide werkwoorden.',
      },
      {
        id: 'imp-5',
        type: 'reorder',
        question: 'Zet de woorden in de juiste volgorde:',
        context: 'Mijn grootmoeder werkte elke dag in de winkel.',
        answer: 'Ma grand-mère travaillait chaque jour dans le magasin.',
        explanation: 'gewoonte → imparfait: travaillait.',
      },
      {
        id: 'imp-6',
        type: 'listen_choice',
        question: 'Luister en kies de juiste vertaling.',
        context: 'Il faisait beau et nous étions heureux.',
        options: ['Het was mooi weer en wij waren gelukkig.', 'Het wordt mooi weer en wij zijn gelukkig.', 'Het was mooi weer en wij zijn gelukkig geweest.', 'Het zal mooi weer zijn.'],
        answer: 'Het was mooi weer en wij waren gelukkig.',
        explanation: 'faisait/étions = imparfait, beschrijving van de situatie.',
      },
    ],
  },
  {
    slug: 'comparatief-superlatief',
    titleNl: 'Vergrotende en overtreffende trap (plus, moins, le plus)',
    description: 'Dingen vergelijken: groter, kleiner, het beste, het goedkoopste.',
    level: 'B1',
    order: 15,
    explanation: `**De vergrotende trap (comparatif):**
- **plus ... que** = meer ... dan: *Paris est plus grand que Bruxelles.*
- **moins ... que** = minder ... dan: *Bruxelles est moins grand que Paris.*
- **aussi ... que** = even ... als: *Le français est aussi utile que l'anglais.*

**Uitzondering: bon → meilleur** (NIET "plus bon"!)
*Ce restaurant est meilleur que l'autre.* (Dit restaurant is beter dan het andere.)

**De overtreffende trap (superlatif):**
- **le/la/les plus + bijvoeglijk naamwoord** = de meest...
*C'est le plus grand bâtiment de Bruxelles.*
- **le/la/les moins + bijvoeglijk naamwoord** = de minst...

**Let op:** het bijvoeglijk naamwoord past zich nog steeds aan geslacht/aantal aan: *la plus grande ville* (vrouwelijk).`,
    tip: "Onthoud \"meilleur\" als uitzondering — heel courant in gesprekken over restaurants en producten!",
    exercises: [
      {
        id: 'comp-1',
        type: 'multiple_choice',
        question: 'Brussel is groter dan Gent.',
        context: 'Bruxelles est ___ grand que Gand.',
        options: ['plus', 'moins', 'aussi', 'meilleur'],
        answer: 'plus',
        explanation: 'groter dan → plus...que.',
      },
      {
        id: 'comp-2',
        type: 'multiple_choice',
        question: 'Dit bier is beter dan dat bier. (bon → uitzondering)',
        context: 'Cette bière est ___ que celle-là.',
        options: ['plus bonne', 'meilleure', 'plus bon', 'aussi bon'],
        answer: 'meilleure',
        explanation: 'bon → meilleur(e), nooit "plus bon"; bière is vrouwelijk → meilleure.',
      },
      {
        id: 'comp-3',
        type: 'fill_blank',
        question: 'Frans is even moeilijk als Engels. → "Le français est ___ difficile que l\'anglais."',
        answer: 'aussi',
        explanation: 'even... als → aussi...que.',
      },
      {
        id: 'comp-4',
        type: 'translate',
        question: 'Vertaal: "Dit is de grootste stad van Wallonië."',
        answer: 'C\'est la plus grande ville de Wallonie.',
        explanation: 'superlatief vrouwelijk → la plus grande.',
      },
      {
        id: 'comp-5',
        type: 'reorder',
        question: 'Zet de woorden in de juiste volgorde:',
        context: 'Deze chocolade is lekkerder dan die wafels.',
        answer: 'Ce chocolat est meilleur que ces gaufres.',
        explanation: 'meilleur que = beter dan.',
      },
      {
        id: 'comp-6',
        type: 'listen_choice',
        question: 'Luister en kies de juiste vertaling.',
        context: 'C\'est le moins cher des deux.',
        options: ['Dit is de goedkoopste van de twee.', 'Dit is de duurste van de twee.', 'Dit is even duur als de andere.', 'Dit is de beste van de twee.'],
        answer: 'Dit is de goedkoopste van de twee.',
        explanation: 'le moins cher = de minst dure = de goedkoopste.',
      },
    ],
  },
  {
    slug: 'relatieve-voornaamwoorden',
    titleNl: 'Relatieve voornaamwoorden (qui, que, où, dont)',
    description: 'Twee zinnen verbinden zonder herhaling.',
    level: 'B1',
    order: 16,
    explanation: `**Relatieve voornaamwoorden** verbinden twee zinnen door herhaling van het onderwerp/object te vermijden.

**qui** = onderwerp van de bijzin (wie/die/dat)
*J'ai un collègue. Il parle français.* → *J'ai un collègue **qui** parle français.*

**que** = lijdend voorwerp van de bijzin (die/dat)
*Voici le rapport. Tu as écrit le rapport.* → *Voici le rapport **que** tu as écrit.*

**où** = plaats of tijd (waar/wanneer)
*C'est la ville où j'habite.*

**dont** = vervangt "de + iets" (waarvan, van wie)
*C'est le projet dont je parle.* ("parler de" → dont)

**Vlaamse valkuil:** in het Nederlands gebruik je vaak "die/dat" voor alles; in het Frans moet je kiezen tussen qui/que op basis van de functie (onderwerp vs. lijdend voorwerp).`,
    tip: 'Vraag jezelf af: is het woord het ONDERWERP van de bijzin (qui) of het LIJDEND VOORWERP (que)?',
    exercises: [
      {
        id: 'rel-1',
        type: 'multiple_choice',
        question: 'De collega die Frans spreekt.',
        context: 'Le collègue ___ parle français.',
        options: ['qui', 'que', 'où', 'dont'],
        answer: 'qui',
        explanation: 'onderwerp van de bijzin → qui.',
      },
      {
        id: 'rel-2',
        type: 'multiple_choice',
        question: 'Het boek dat ik lees.',
        context: 'Le livre ___ je lis.',
        options: ['qui', 'que', 'où', 'dont'],
        answer: 'que',
        explanation: 'lijdend voorwerp → que.',
      },
      {
        id: 'rel-3',
        type: 'fill_blank',
        question: 'De stad waar ik woon. → "La ville ___ j\'habite."',
        answer: 'où',
        explanation: 'plaats → où.',
      },
      {
        id: 'rel-4',
        type: 'translate',
        question: 'Vertaal: "Dit is het project waarover ik spreek."',
        answer: 'C\'est le projet dont je parle.',
        explanation: 'parler DE qqch → dont.',
      },
      {
        id: 'rel-5',
        type: 'reorder',
        question: 'Zet de woorden in de juiste volgorde:',
        context: 'Ik heb een vriend die in Wallonië woont.',
        answer: "J'ai un ami qui habite en Wallonie.",
        explanation: 'onderwerp van de bijzin → qui.',
      },
      {
        id: 'rel-6',
        type: 'listen_choice',
        question: 'Luister en kies de juiste vertaling.',
        context: 'Voici la maison que nous avons achetée.',
        options: ['Dit is het huis dat wij hebben gekocht.', 'Dit is het huis waar wij wonen.', 'Dit is het huis dat te koop staat.', 'Dit is het huis waarvan ik droom.'],
        answer: 'Dit is het huis dat wij hebben gekocht.',
        explanation: 'que + acheter = dat ... gekocht.',
      },
    ],
  },
  {
    slug: 'conditionnel',
    titleNl: 'Le conditionnel (beleefdheid en hypotheses)',
    description: 'Je voudrais, pourriez-vous... en de si-zin.',
    level: 'B2',
    order: 17,
    explanation: `**Le conditionnel présent** gebruik je voor beleefde verzoeken, wensen, en hypothetische situaties.

**Vorming:** infinitief + dezelfde uitgangen als l'imparfait (-ais, -ais, -ait, -ions, -iez, -aient)
*vouloir* → je voudr**ais**, tu voudrais, il voudrait...
*pouvoir* → je pourrais, tu pourrais...
*aimer* → j'aimerais, tu aimerais...

**Beleefdheid:**
*Je voudrais un café, s'il vous plaît.* — veel beleefder dan "Je veux".
*Pourriez-vous m'aider?* (Zou u mij kunnen helpen?)

**Hypothese met si + imparfait:**
*Si j'avais le temps, je voyagerais en Wallonie.*
Patroon: **si + imparfait, ... + conditionnel**

**Onregelmatige stammen** (zoals bij futur simple): être→ser-, avoir→aur-, faire→fer-, aller→ir-.`,
    tip: 'Gebruik "je voudrais" in plaats van "je veux" — dat klinkt veel beleefder, vooral in winkels en restaurants.',
    exercises: [
      {
        id: 'cond-1',
        type: 'multiple_choice',
        question: 'Ik zou graag een koffie willen.',
        context: 'Je ___ un café.',
        options: ['voudrais', 'veux', 'voulais', 'voudra'],
        answer: 'voudrais',
        explanation: 'beleefd verzoek → conditionnel: je voudrais.',
      },
      {
        id: 'cond-2',
        type: 'multiple_choice',
        question: 'Zou u mij kunnen helpen? (pouvoir)',
        context: "___ -vous m'aider?",
        options: ['Pourriez', 'Pouvez', 'Pouviez', 'Pourrez'],
        answer: 'Pourriez',
        explanation: 'beleefde vraag → conditionnel: pourriez-vous.',
      },
      {
        id: 'cond-3',
        type: 'fill_blank',
        question: 'Als ik geld had, zou ik reizen. → "Si j\'avais de l\'argent, je ___ en France." (voyager)',
        answer: 'voyagerais',
        explanation: 'gevolg van si+imparfait → conditionnel: je voyagerais.',
      },
      {
        id: 'cond-4',
        type: 'translate',
        question: 'Vertaal: "Als ik tijd had, zou ik Frans studeren."',
        answer: "Si j'avais le temps, j'étudierais le français.",
        explanation: 'si + imparfait (avais), gevolg + conditionnel (étudierais).',
      },
      {
        id: 'cond-5',
        type: 'reorder',
        question: 'Zet de woorden in de juiste volgorde:',
        context: 'Zou jij mij dat boek kunnen geven?',
        answer: 'Pourrais-tu me donner ce livre?',
        explanation: 'beleefd verzoek met inversie → pourrais-tu.',
      },
      {
        id: 'cond-6',
        type: 'listen_choice',
        question: 'Luister en kies de juiste vertaling.',
        context: "J'aimerais visiter la Wallonie un jour.",
        options: ['Ik zou graag ooit Wallonië bezoeken.', 'Ik bezoek elke dag Wallonië.', 'Ik heb Wallonië bezocht.', 'Ik ga nu naar Wallonië.'],
        answer: 'Ik zou graag ooit Wallonië bezoeken.',
        explanation: 'j\'aimerais + infinitief = ik zou graag ... willen.',
      },
    ],
  },
  {
    slug: 'subjonctif-basis',
    titleNl: 'Le subjonctif (basis): il faut que...',
    description: 'De aanvoegende wijs na uitdrukkingen van noodzaak en wens.',
    level: 'B2',
    order: 18,
    explanation: `**Le subjonctif** gebruik je na bepaalde uitdrukkingen die een wens, noodzaak of twijfel uitdrukken — meestal na "que".

**Triggers:**
- **il faut que** (het is nodig dat / je moet)
- **je veux que** (ik wil dat)

*Il faut que tu viennes.* (Je moet komen.)

**Vorming (regelmatige -ER werkwoorden):** stam van de "ils"-vorm + -e, -es, -e, -ions, -iez, -ent
*parler* → ils parl**ent** → que je parle, que tu parles, qu'il parle, que nous parlions, que vous parliez, qu'ils parlent

**Onregelmatig: être en avoir**
*être* → que je sois, que tu sois, qu'il soit, que nous soyons, que vous soyez, qu'ils soient
*avoir* → que j'aie, que tu aies, qu'il ait, que nous ayons, que vous ayez, qu'ils aient

**Vergelijk:**
*Il faut que je parte.* (subjonctif van partir, na il faut que.)
*Je pense que tu as raison.* (denken/vinden → GEEN subjonctif, gewone tegenwoordige tijd!)`,
    tip: 'Subjonctif is lastig — focus eerst op de vaste uitdrukking "il faut que" + subjonctif, dat gebruik je het vaakst.',
    exercises: [
      {
        id: 'subj-1',
        type: 'multiple_choice',
        question: 'Je moet Frans spreken. (il faut que + parler)',
        context: 'Il faut que tu ___ français.',
        options: ['parles', 'parle', 'parler', 'parlez'],
        answer: 'parles',
        explanation: 'que tu + subjonctif van parler → parles.',
      },
      {
        id: 'subj-2',
        type: 'multiple_choice',
        question: 'être in subjonctif voor "nous"',
        context: "Il faut que nous ___ à l'heure.",
        options: ['soyons', 'sommes', 'serons', 'étions'],
        answer: 'soyons',
        explanation: 'être, subjonctif, que nous → soyons.',
      },
      {
        id: 'subj-3',
        type: 'fill_blank',
        question: 'Ik wil dat jij gelukkig bent. → "Je veux que tu ___ heureux." (être)',
        answer: 'sois',
        explanation: 'que tu + subjonctif van être → sois.',
      },
      {
        id: 'subj-4',
        type: 'translate',
        question: 'Vertaal: "Het is nodig dat wij vertrekken." (partir)',
        answer: 'Il faut que nous partions.',
        explanation: 'il faut que + subjonctif: que nous partions.',
      },
      {
        id: 'subj-5',
        type: 'reorder',
        question: 'Zet de woorden in de juiste volgorde:',
        context: 'Het is nodig dat zij (mv) het contract ondertekenen. (signer)',
        answer: 'Il faut qu\'ils signent le contrat.',
        explanation: 'il faut que + subjonctif van signer → qu\'ils signent.',
      },
      {
        id: 'subj-6',
        type: 'listen_choice',
        question: 'Luister en kies de juiste vertaling.',
        context: 'Il faut que vous ayez de la patience.',
        options: ['Jullie moeten geduld hebben.', 'Jullie hebben geduld gehad.', 'Jullie zullen geduld hebben.', 'Jullie hadden geduld.'],
        answer: 'Jullie moeten geduld hebben.',
        explanation: 'il faut que + subjonctif van avoir (ayez) = jullie moeten ... hebben.',
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

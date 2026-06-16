export interface VocabularyItem {
  dutch: string
  french: string
  category: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  exampleNl: string
  exampleFr: string
  isBelgian: boolean
  order: number
}

export const vocabularyData: VocabularyItem[] = [
  // ─── BEGROETINGEN A1 ───────────────────────────────────────────────────────
  { order: 1, dutch: 'Goedendag', french: 'Bonjour', category: 'Begroetingen', level: 'A1', exampleNl: 'Goedendag, hoe gaat het?', exampleFr: 'Bonjour, comment allez-vous?', isBelgian: false },
  { order: 2, dutch: 'Goedenavond', french: 'Bonsoir', category: 'Begroetingen', level: 'A1', exampleNl: 'Goedenavond, welkom!', exampleFr: 'Bonsoir, bienvenue!', isBelgian: false },
  { order: 3, dutch: 'Goedenacht', french: 'Bonne nuit', category: 'Begroetingen', level: 'A1', exampleNl: 'Goedenacht, slaap goed!', exampleFr: 'Bonne nuit, dormez bien!', isBelgian: false },
  { order: 4, dutch: 'Hoi / Dag (informeel)', french: 'Salut', category: 'Begroetingen', level: 'A1', exampleNl: 'Hoi! Hoe gaat het?', exampleFr: 'Salut! Ça va?', isBelgian: false },
  { order: 5, dutch: 'Tot ziens', french: 'Au revoir', category: 'Begroetingen', level: 'A1', exampleNl: 'Tot ziens, tot morgen!', exampleFr: 'Au revoir, à demain!', isBelgian: false },
  { order: 6, dutch: 'Tot straks (Belgisch)', french: 'À tantôt', category: 'Begroetingen', level: 'A1', exampleNl: 'Tot straks, ik kom terug om 3 uur.', exampleFr: 'À tantôt, je reviens à 15h.', isBelgian: true },
  { order: 7, dutch: 'Tot zo meteen', french: 'À tout à l\'heure', category: 'Begroetingen', level: 'A1', exampleNl: 'Tot zo meteen, ik ben zo terug.', exampleFr: 'À tout à l\'heure, je reviens.', isBelgian: false },
  { order: 8, dutch: 'Fijne dag', french: 'Bonne journée', category: 'Begroetingen', level: 'A1', exampleNl: 'Fijne dag verder!', exampleFr: 'Bonne journée!', isBelgian: false },
  { order: 9, dutch: 'Fijne avond', french: 'Bonne soirée', category: 'Begroetingen', level: 'A1', exampleNl: 'Fijne avond!', exampleFr: 'Bonne soirée!', isBelgian: false },
  { order: 10, dutch: 'Alstublieft (formeel)', french: 'S\'il vous plaît', category: 'Beleefdheid', level: 'A1', exampleNl: 'Een koffie, alstublieft.', exampleFr: 'Un café, s\'il vous plaît.', isBelgian: false },
  { order: 11, dutch: 'Alsjeblieft (informeel)', french: 'S\'il te plaît', category: 'Beleefdheid', level: 'A1', exampleNl: 'Geef mij dat boek, alsjeblieft.', exampleFr: 'Donne-moi ce livre, s\'il te plaît.', isBelgian: false },
  { order: 12, dutch: 'Dank je / Dank u', french: 'Merci', category: 'Beleefdheid', level: 'A1', exampleNl: 'Dank je voor jouw hulp.', exampleFr: 'Merci pour votre aide.', isBelgian: false },
  { order: 13, dutch: 'Heel erg bedankt', french: 'Merci beaucoup', category: 'Beleefdheid', level: 'A1', exampleNl: 'Heel erg bedankt!', exampleFr: 'Merci beaucoup!', isBelgian: false },
  { order: 14, dutch: 'Graag gedaan', french: 'De rien', category: 'Beleefdheid', level: 'A1', exampleNl: 'Graag gedaan, geen probleem.', exampleFr: 'De rien, avec plaisir.', isBelgian: false },
  { order: 15, dutch: 'Pardon / Excuseer mij', french: 'Excusez-moi', category: 'Beleefdheid', level: 'A1', exampleNl: 'Pardon, waar is het toilet?', exampleFr: 'Excusez-moi, où sont les toilettes?', isBelgian: false },
  { order: 16, dutch: 'Het spijt me', french: 'Je suis désolé(e)', category: 'Beleefdheid', level: 'A1', exampleNl: 'Het spijt me voor de fout.', exampleFr: 'Je suis désolé pour l\'erreur.', isBelgian: false },
  { order: 17, dutch: 'Aangenaam', french: 'Enchanté(e)', category: 'Begroetingen', level: 'A1', exampleNl: 'Aangenaam, ik ben Jonas.', exampleFr: 'Enchanté, je m\'appelle Jonas.', isBelgian: false },

  // ─── GETALLEN A1 (Belgische specificiteiten) ──────────────────────────────
  { order: 20, dutch: 'Één', french: 'Un / Une', category: 'Getallen', level: 'A1', exampleNl: 'Één koffie, alstublieft.', exampleFr: 'Un café, s\'il vous plaît.', isBelgian: false },
  { order: 21, dutch: 'Twee', french: 'Deux', category: 'Getallen', level: 'A1', exampleNl: 'Twee tickets, alstublieft.', exampleFr: 'Deux billets, s\'il vous plaît.', isBelgian: false },
  { order: 22, dutch: 'Drie', french: 'Trois', category: 'Getallen', level: 'A1', exampleNl: 'Ik heb drie kinderen.', exampleFr: 'J\'ai trois enfants.', isBelgian: false },
  { order: 23, dutch: 'Vier', french: 'Quatre', category: 'Getallen', level: 'A1', exampleNl: 'Vier uur \'s middags.', exampleFr: 'Quatre heures de l\'après-midi.', isBelgian: false },
  { order: 24, dutch: 'Vijf', french: 'Cinq', category: 'Getallen', level: 'A1', exampleNl: 'Vijf minuten.', exampleFr: 'Cinq minutes.', isBelgian: false },
  { order: 25, dutch: 'Tien', french: 'Dix', category: 'Getallen', level: 'A1', exampleNl: 'Tien euro.', exampleFr: 'Dix euros.', isBelgian: false },
  { order: 26, dutch: 'Twintig', french: 'Vingt', category: 'Getallen', level: 'A1', exampleNl: 'Twintig jaar oud.', exampleFr: 'Vingt ans.', isBelgian: false },
  { order: 27, dutch: 'Vijftig', french: 'Cinquante', category: 'Getallen', level: 'A1', exampleNl: 'Vijftig procent.', exampleFr: 'Cinquante pour cent.', isBelgian: false },
  { order: 28, dutch: 'Zeventig (Belgisch: septante)', french: 'Septante', category: 'Getallen', level: 'A1', exampleNl: 'Zeventig: in België zegt men "septante".', exampleFr: 'En Belgique, on dit "septante" pour soixante-dix.', isBelgian: true },
  { order: 29, dutch: 'Tachtig', french: 'Quatre-vingts', category: 'Getallen', level: 'A1', exampleNl: 'Tachtig mensen.', exampleFr: 'Quatre-vingts personnes.', isBelgian: false },
  { order: 30, dutch: 'Negentig (Belgisch: nonante)', french: 'Nonante', category: 'Getallen', level: 'A1', exampleNl: 'Negentig: in België zegt men "nonante".', exampleFr: 'En Belgique, on dit "nonante" pour quatre-vingt-dix.', isBelgian: true },
  { order: 31, dutch: 'Honderd', french: 'Cent', category: 'Getallen', level: 'A1', exampleNl: 'Honderd euro.', exampleFr: 'Cent euros.', isBelgian: false },

  // ─── KLEUREN A1 ───────────────────────────────────────────────────────────
  { order: 40, dutch: 'Rood', french: 'Rouge', category: 'Kleuren', level: 'A1', exampleNl: 'Een rode auto.', exampleFr: 'Une voiture rouge.', isBelgian: false },
  { order: 41, dutch: 'Blauw', french: 'Bleu(e)', category: 'Kleuren', level: 'A1', exampleNl: 'Een blauwe lucht.', exampleFr: 'Un ciel bleu.', isBelgian: false },
  { order: 42, dutch: 'Groen', french: 'Vert(e)', category: 'Kleuren', level: 'A1', exampleNl: 'Het gras is groen.', exampleFr: 'L\'herbe est verte.', isBelgian: false },
  { order: 43, dutch: 'Geel', french: 'Jaune', category: 'Kleuren', level: 'A1', exampleNl: 'Een gele bloem.', exampleFr: 'Une fleur jaune.', isBelgian: false },
  { order: 44, dutch: 'Wit', french: 'Blanc / Blanche', category: 'Kleuren', level: 'A1', exampleNl: 'Witte sneeuw.', exampleFr: 'De la neige blanche.', isBelgian: false },
  { order: 45, dutch: 'Zwart', french: 'Noir(e)', category: 'Kleuren', level: 'A1', exampleNl: 'Een zwarte kat.', exampleFr: 'Un chat noir.', isBelgian: false },
  { order: 46, dutch: 'Grijs', french: 'Gris(e)', category: 'Kleuren', level: 'A1', exampleNl: 'Een grijs pak.', exampleFr: 'Un costume gris.', isBelgian: false },
  { order: 47, dutch: 'Bruin', french: 'Marron', category: 'Kleuren', level: 'A1', exampleNl: 'Bruine ogen.', exampleFr: 'Des yeux marron.', isBelgian: false },

  // ─── FAMILIE A1 ───────────────────────────────────────────────────────────
  { order: 50, dutch: 'De familie', french: 'La famille', category: 'Familie', level: 'A1', exampleNl: 'Mijn familie woont in Gent.', exampleFr: 'Ma famille habite à Gand.', isBelgian: false },
  { order: 51, dutch: 'De vader', french: 'Le père', category: 'Familie', level: 'A1', exampleNl: 'Mijn vader werkt in Brussel.', exampleFr: 'Mon père travaille à Bruxelles.', isBelgian: false },
  { order: 52, dutch: 'De moeder', french: 'La mère', category: 'Familie', level: 'A1', exampleNl: 'Mijn moeder is lerares.', exampleFr: 'Ma mère est enseignante.', isBelgian: false },
  { order: 53, dutch: 'De zoon', french: 'Le fils', category: 'Familie', level: 'A1', exampleNl: 'Ik heb één zoon.', exampleFr: 'J\'ai un fils.', isBelgian: false },
  { order: 54, dutch: 'De dochter', french: 'La fille', category: 'Familie', level: 'A1', exampleNl: 'Mijn dochter studeert in Leuven.', exampleFr: 'Ma fille étudie à Louvain.', isBelgian: false },
  { order: 55, dutch: 'De broer', french: 'Le frère', category: 'Familie', level: 'A1', exampleNl: 'Mijn broer woont in Luik.', exampleFr: 'Mon frère habite à Liège.', isBelgian: false },
  { order: 56, dutch: 'De zus', french: 'La sœur', category: 'Familie', level: 'A1', exampleNl: 'Ik heb twee zussen.', exampleFr: 'J\'ai deux sœurs.', isBelgian: false },
  { order: 57, dutch: 'De grootvader', french: 'Le grand-père', category: 'Familie', level: 'A1', exampleNl: 'Mijn grootvader is 80 jaar oud.', exampleFr: 'Mon grand-père a quatre-vingts ans.', isBelgian: false },
  { order: 58, dutch: 'De grootmoeder', french: 'La grand-mère', category: 'Familie', level: 'A1', exampleNl: 'Mijn grootmoeder woont in Antwerpen.', exampleFr: 'Ma grand-mère habite à Anvers.', isBelgian: false },

  // ─── ETEN & DRINKEN - BELGISCH A1 ─────────────────────────────────────────
  { order: 60, dutch: 'Het bier', french: 'La bière', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Belgisch bier is wereldberoemd.', exampleFr: 'La bière belge est célèbre dans le monde entier.', isBelgian: true },
  { order: 61, dutch: 'De frietjes', french: 'Les frites', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Frietjes zijn uitgevonden in België!', exampleFr: 'Les frites ont été inventées en Belgique!', isBelgian: true },
  { order: 62, dutch: 'De chocolade', french: 'Le chocolat', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Belgische chocolade is de beste.', exampleFr: 'Le chocolat belge est le meilleur.', isBelgian: true },
  { order: 63, dutch: 'De wafels', french: 'Les gaufres', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Ik eet graag Luikse wafels.', exampleFr: 'J\'aime manger des gaufres de Liège.', isBelgian: true },
  { order: 64, dutch: 'De mosselen', french: 'Les moules', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Mosselen met friet is een Belgisch gerecht.', exampleFr: 'Moules-frites, c\'est un plat belge.', isBelgian: true },
  { order: 65, dutch: 'Het brood', french: 'Le pain', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Ik eet elke ochtend brood.', exampleFr: 'Je mange du pain chaque matin.', isBelgian: false },
  { order: 66, dutch: 'De koffie', french: 'Le café', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Een koffie, alstublieft.', exampleFr: 'Un café, s\'il vous plaît.', isBelgian: false },
  { order: 67, dutch: 'Het water', french: 'L\'eau', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Een glas water graag.', exampleFr: 'Un verre d\'eau, s\'il vous plaît.', isBelgian: false },
  { order: 68, dutch: 'De wijn', french: 'Le vin', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Een glas rode wijn.', exampleFr: 'Un verre de vin rouge.', isBelgian: false },
  { order: 69, dutch: 'De kaas', french: 'Le fromage', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Belgische kaas is heerlijk.', exampleFr: 'Le fromage belge est délicieux.', isBelgian: false },
  { order: 70, dutch: 'De melk', french: 'Le lait', category: 'Eten & Drinken', level: 'A1', exampleNl: 'Koffie met melk.', exampleFr: 'Café au lait.', isBelgian: false },

  // ─── WERKWOORDEN A1 ───────────────────────────────────────────────────────
  { order: 75, dutch: 'zijn', french: 'être', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik ben Belg.', exampleFr: 'Je suis belge.', isBelgian: false },
  { order: 76, dutch: 'hebben', french: 'avoir', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik heb een vraag.', exampleFr: 'J\'ai une question.', isBelgian: false },
  { order: 77, dutch: 'spreken', french: 'parler', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik spreek Frans.', exampleFr: 'Je parle français.', isBelgian: false },
  { order: 78, dutch: 'werken', french: 'travailler', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik werk in Brussel.', exampleFr: 'Je travaille à Bruxelles.', isBelgian: false },
  { order: 79, dutch: 'wonen', french: 'habiter', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik woon in Gent.', exampleFr: 'J\'habite à Gand.', isBelgian: false },
  { order: 80, dutch: 'gaan', french: 'aller', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik ga naar Brussel.', exampleFr: 'Je vais à Bruxelles.', isBelgian: false },
  { order: 81, dutch: 'willen', french: 'vouloir', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik wil graag een koffie.', exampleFr: 'Je voudrais un café.', isBelgian: false },
  { order: 82, dutch: 'kunnen', french: 'pouvoir', category: 'Werkwoorden', level: 'A1', exampleNl: 'Kunt u mij helpen?', exampleFr: 'Pouvez-vous m\'aider?', isBelgian: false },
  { order: 83, dutch: 'eten', french: 'manger', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik eet graag frietjes.', exampleFr: 'J\'aime manger des frites.', isBelgian: false },
  { order: 84, dutch: 'drinken', french: 'boire', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik drink graag Belgisch bier.', exampleFr: 'J\'aime boire de la bière belge.', isBelgian: false },

  // ─── PROFESSIONEEL A2-B1 ──────────────────────────────────────────────────
  { order: 90, dutch: 'Het kantoor', french: 'Le bureau', category: 'Professioneel', level: 'A2', exampleNl: 'Mijn kantoor is op de derde verdieping.', exampleFr: 'Mon bureau est au troisième étage.', isBelgian: false },
  { order: 91, dutch: 'De vergadering', french: 'La réunion', category: 'Professioneel', level: 'A2', exampleNl: 'De vergadering begint om 9 uur.', exampleFr: 'La réunion commence à 9 heures.', isBelgian: false },
  { order: 92, dutch: 'De collega', french: 'Le/La collègue', category: 'Professioneel', level: 'A2', exampleNl: 'Mijn collega spreekt vloeiend Frans.', exampleFr: 'Mon collègue parle couramment le français.', isBelgian: false },
  { order: 93, dutch: 'Het verslag', french: 'Le rapport', category: 'Professioneel', level: 'A2', exampleNl: 'Ik schrijf een verslag.', exampleFr: 'Je rédige un rapport.', isBelgian: false },
  { order: 94, dutch: 'De presentatie', french: 'La présentation', category: 'Professioneel', level: 'A2', exampleNl: 'De presentatie duurt één uur.', exampleFr: 'La présentation dure une heure.', isBelgian: false },
  { order: 95, dutch: 'Het project', french: 'Le projet', category: 'Professioneel', level: 'A2', exampleNl: 'Dit project is belangrijk.', exampleFr: 'Ce projet est important.', isBelgian: false },
  { order: 96, dutch: 'De e-mail', french: 'L\'e-mail / Le mail', category: 'Professioneel', level: 'A2', exampleNl: 'Ik stuur je een e-mail.', exampleFr: 'Je t\'envoie un e-mail.', isBelgian: false },
  { order: 97, dutch: 'Het bedrijf', french: 'L\'entreprise', category: 'Professioneel', level: 'A2', exampleNl: 'Ons bedrijf is gevestigd in Brussel.', exampleFr: 'Notre entreprise est établie à Bruxelles.', isBelgian: false },
  { order: 98, dutch: 'De agenda', french: 'L\'agenda', category: 'Professioneel', level: 'A2', exampleNl: 'Kijk in mijn agenda.', exampleFr: 'Regardez dans mon agenda.', isBelgian: false },
  { order: 99, dutch: 'De opleiding', french: 'La formation', category: 'Professioneel', level: 'A2', exampleNl: 'Ik volg een opleiding Frans.', exampleFr: 'Je suis une formation en français.', isBelgian: false },
  { order: 100, dutch: 'Het loon / Het salaris', french: 'Le salaire', category: 'Professioneel', level: 'B1', exampleNl: 'Wat is het salaris?', exampleFr: 'Quel est le salaire?', isBelgian: false },
  { order: 101, dutch: 'De directeur', french: 'Le directeur / La directrice', category: 'Professioneel', level: 'A2', exampleNl: 'De directeur is in vergadering.', exampleFr: 'Le directeur est en réunion.', isBelgian: false },
  { order: 102, dutch: 'De klant', french: 'Le client / La cliente', category: 'Professioneel', level: 'A2', exampleNl: 'De klant heeft gelijk.', exampleFr: 'Le client a toujours raison.', isBelgian: false },
  { order: 103, dutch: 'Het contract', french: 'Le contrat', category: 'Professioneel', level: 'B1', exampleNl: 'Tekenen we het contract?', exampleFr: 'Signons-nous le contrat?', isBelgian: false },
  { order: 104, dutch: 'De deadline', french: 'La date limite / Le deadline', category: 'Professioneel', level: 'A2', exampleNl: 'De deadline is vrijdag.', exampleFr: 'La date limite est vendredi.', isBelgian: false },

  // ─── BELGISCHE UITDRUKKINGEN A2-B1 ────────────────────────────────────────
  { order: 110, dutch: 'Heel erg (informeel)', french: 'Drôlement', category: 'Belgische uitdrukkingen', level: 'A2', exampleNl: 'Dat is heel goed gedaan!', exampleFr: 'C\'est drôlement bien fait!', isBelgian: true },
  { order: 111, dutch: 'Vanmiddag (Belgisch)', french: 'Tantôt', category: 'Belgische uitdrukkingen', level: 'A2', exampleNl: 'Ik doe het vanmiddag.', exampleFr: 'Je le ferai tantôt.', isBelgian: true },
  { order: 112, dutch: 'Dat is leuk / tof!', french: 'C\'est chouette!', category: 'Belgische uitdrukkingen', level: 'A1', exampleNl: 'Dat is echt leuk!', exampleFr: 'C\'est vraiment chouette!', isBelgian: true },
  { order: 113, dutch: 'Nu meteen / Direct', french: 'Tout de suite', category: 'Belgische uitdrukkingen', level: 'A1', exampleNl: 'Ik kom er nu meteen aan.', exampleFr: 'J\'arrive tout de suite.', isBelgian: false },
  { order: 114, dutch: 'Heel erg (informeel sterk)', french: 'Vachement', category: 'Belgische uitdrukkingen', level: 'A2', exampleNl: 'Dat is heel erg goed!', exampleFr: 'C\'est vachement bien!', isBelgian: true },
  { order: 115, dutch: 'Jullie (formeel meervoud)', french: 'Vous', category: 'Belgische uitdrukkingen', level: 'A1', exampleNl: 'Spreekt u Frans? (formeel "u")', exampleFr: 'Parlez-vous français? (vouvoiement)', isBelgian: false },
  { order: 116, dutch: 'Het middagmaal', french: 'Le déjeuner', category: 'Belgische uitdrukkingen', level: 'A2', exampleNl: 'In België is déjeuner de middagmaaltijd.', exampleFr: 'En Belgique, le déjeuner est le repas de midi.', isBelgian: true },
  { order: 117, dutch: 'Het ontbijt', french: 'Le petit-déjeuner', category: 'Belgische uitdrukkingen', level: 'A1', exampleNl: 'Ik eet cornflakes als ontbijt.', exampleFr: 'Je mange des céréales au petit-déjeuner.', isBelgian: false },

  // ─── PLAATSEN B1 ──────────────────────────────────────────────────────────
  { order: 120, dutch: 'Brussel', french: 'Bruxelles', category: 'Plaatsen', level: 'A1', exampleNl: 'Brussel is de hoofdstad van België.', exampleFr: 'Bruxelles est la capitale de la Belgique.', isBelgian: true },
  { order: 121, dutch: 'Wallonië', french: 'La Wallonie', category: 'Plaatsen', level: 'A2', exampleNl: 'Wallonië is de Franstalige regio van België.', exampleFr: 'La Wallonie est la région francophone de la Belgique.', isBelgian: true },
  { order: 122, dutch: 'De trein', french: 'Le train', category: 'Transport', level: 'A1', exampleNl: 'De trein naar Brussel vertrekt om 8 uur.', exampleFr: 'Le train pour Bruxelles part à 8 heures.', isBelgian: false },
  { order: 123, dutch: 'De metro', french: 'Le métro', category: 'Transport', level: 'A1', exampleNl: 'Neem de metro in Brussel.', exampleFr: 'Prenez le métro à Bruxelles.', isBelgian: false },
  { order: 124, dutch: 'De winkel', french: 'Le magasin', category: 'Plaatsen', level: 'A1', exampleNl: 'De winkel sluit om 18 uur.', exampleFr: 'Le magasin ferme à 18 heures.', isBelgian: false },
  { order: 125, dutch: 'Het ziekenhuis', french: 'L\'hôpital', category: 'Plaatsen', level: 'A1', exampleNl: 'Waar is het dichtstbijzijnde ziekenhuis?', exampleFr: 'Où est l\'hôpital le plus proche?', isBelgian: false },
  { order: 126, dutch: 'De apotheek', french: 'La pharmacie', category: 'Plaatsen', level: 'A1', exampleNl: 'Is er een apotheek in de buurt?', exampleFr: 'Y a-t-il une pharmacie près d\'ici?', isBelgian: false },
  { order: 127, dutch: 'De bank', french: 'La banque', category: 'Plaatsen', level: 'A1', exampleNl: 'Ik moet naar de bank.', exampleFr: 'Je dois aller à la banque.', isBelgian: false },

  // ─── TIJD & DATUM A1 ───────────────────────────────────────────────────────
  { order: 130, dutch: 'De tijd', french: 'Le temps', category: 'Tijd & datum', level: 'A1', exampleNl: 'Ik heb geen tijd.', exampleFr: 'Je n\'ai pas le temps.', isBelgian: false },
  { order: 131, dutch: 'Het uur', french: 'L\'heure', category: 'Tijd & datum', level: 'A1', exampleNl: 'Hoe laat is het?', exampleFr: 'Quelle heure est-il?', isBelgian: false },
  { order: 132, dutch: 'Vandaag', french: 'Aujourd\'hui', category: 'Tijd & datum', level: 'A1', exampleNl: 'Vandaag is het maandag.', exampleFr: 'Aujourd\'hui, c\'est lundi.', isBelgian: false },
  { order: 133, dutch: 'Morgen', french: 'Demain', category: 'Tijd & datum', level: 'A1', exampleNl: 'Tot morgen!', exampleFr: 'À demain!', isBelgian: false },
  { order: 134, dutch: 'Gisteren', french: 'Hier', category: 'Tijd & datum', level: 'A1', exampleNl: 'Gisteren was ik ziek.', exampleFr: 'Hier, j\'étais malade.', isBelgian: false },
  { order: 135, dutch: 'De week', french: 'La semaine', category: 'Tijd & datum', level: 'A1', exampleNl: 'Volgende week ga ik op reis.', exampleFr: 'La semaine prochaine, je pars en voyage.', isBelgian: false },
  { order: 136, dutch: 'De maand', french: 'Le mois', category: 'Tijd & datum', level: 'A1', exampleNl: 'Deze maand werk ik veel.', exampleFr: 'Ce mois-ci, je travaille beaucoup.', isBelgian: false },
  { order: 137, dutch: 'Het jaar', french: 'L\'année', category: 'Tijd & datum', level: 'A1', exampleNl: 'Gelukkig nieuwjaar!', exampleFr: 'Bonne année!', isBelgian: false },
  { order: 138, dutch: 'Nu', french: 'Maintenant', category: 'Tijd & datum', level: 'A1', exampleNl: 'Ik moet nu gaan.', exampleFr: 'Je dois partir maintenant.', isBelgian: false },
  { order: 139, dutch: 'Later', french: 'Plus tard', category: 'Tijd & datum', level: 'A1', exampleNl: 'We zien elkaar later.', exampleFr: 'On se voit plus tard.', isBelgian: false },

  // ─── DAGEN VAN DE WEEK A1 ──────────────────────────────────────────────────
  { order: 140, dutch: 'Maandag', french: 'Lundi', category: 'Dagen van de week', level: 'A1', exampleNl: 'Op maandag werk ik thuis.', exampleFr: 'Le lundi, je travaille à la maison.', isBelgian: false },
  { order: 141, dutch: 'Dinsdag', french: 'Mardi', category: 'Dagen van de week', level: 'A1', exampleNl: 'Dinsdag heb ik les.', exampleFr: 'Mardi, j\'ai cours.', isBelgian: false },
  { order: 142, dutch: 'Woensdag', french: 'Mercredi', category: 'Dagen van de week', level: 'A1', exampleNl: 'Woensdagnamiddag is er geen school.', exampleFr: 'Le mercredi après-midi, il n\'y a pas d\'école.', isBelgian: false },
  { order: 143, dutch: 'Donderdag', french: 'Jeudi', category: 'Dagen van de week', level: 'A1', exampleNl: 'Donderdag ga ik sporten.', exampleFr: 'Jeudi, je vais faire du sport.', isBelgian: false },
  { order: 144, dutch: 'Vrijdag', french: 'Vendredi', category: 'Dagen van de week', level: 'A1', exampleNl: 'Vrijdag is mijn lievelingsdag.', exampleFr: 'Vendredi est mon jour préféré.', isBelgian: false },
  { order: 145, dutch: 'Zaterdag', french: 'Samedi', category: 'Dagen van de week', level: 'A1', exampleNl: 'Op zaterdag winkel ik.', exampleFr: 'Le samedi, je fais les courses.', isBelgian: false },
  { order: 146, dutch: 'Zondag', french: 'Dimanche', category: 'Dagen van de week', level: 'A1', exampleNl: 'Zondag rust ik uit.', exampleFr: 'Le dimanche, je me repose.', isBelgian: false },

  // ─── WEER A1/A2 ────────────────────────────────────────────────────────────
  { order: 150, dutch: 'Het weer', french: 'Le temps', category: 'Weer', level: 'A1', exampleNl: 'Hoe is het weer vandaag?', exampleFr: 'Quel temps fait-il aujourd\'hui?', isBelgian: false },
  { order: 151, dutch: 'De zon', french: 'Le soleil', category: 'Weer', level: 'A1', exampleNl: 'De zon schijnt.', exampleFr: 'Le soleil brille.', isBelgian: false },
  { order: 152, dutch: 'De regen', french: 'La pluie', category: 'Weer', level: 'A1', exampleNl: 'Ik hou niet van regen.', exampleFr: 'Je n\'aime pas la pluie.', isBelgian: false },
  { order: 153, dutch: 'De wind', french: 'Le vent', category: 'Weer', level: 'A1', exampleNl: 'Er is veel wind vandaag.', exampleFr: 'Il y a beaucoup de vent aujourd\'hui.', isBelgian: false },
  { order: 154, dutch: 'De sneeuw', french: 'La neige', category: 'Weer', level: 'A1', exampleNl: 'Het sneeuwt in de winter.', exampleFr: 'Il neige en hiver.', isBelgian: false },
  { order: 155, dutch: 'Het is warm', french: 'Il fait chaud', category: 'Weer', level: 'A1', exampleNl: 'Het is warm in de zomer.', exampleFr: 'Il fait chaud en été.', isBelgian: false },
  { order: 156, dutch: 'Het is koud', french: 'Il fait froid', category: 'Weer', level: 'A1', exampleNl: 'Het is koud vandaag.', exampleFr: 'Il fait froid aujourd\'hui.', isBelgian: false },
  { order: 157, dutch: 'De wolk', french: 'Le nuage', category: 'Weer', level: 'A2', exampleNl: 'Er zijn veel wolken.', exampleFr: 'Il y a beaucoup de nuages.', isBelgian: false },
  { order: 158, dutch: 'De storm', french: 'La tempête', category: 'Weer', level: 'A2', exampleNl: 'Er komt een storm aan.', exampleFr: 'Une tempête arrive.', isBelgian: false },
  { order: 159, dutch: 'De temperatuur', french: 'La température', category: 'Weer', level: 'A2', exampleNl: 'Wat is de temperatuur buiten?', exampleFr: 'Quelle est la température extérieure?', isBelgian: false },

  // ─── LICHAAM A1/A2 ─────────────────────────────────────────────────────────
  { order: 160, dutch: 'Het hoofd', french: 'La tête', category: 'Lichaam', level: 'A1', exampleNl: 'Mijn hoofd doet pijn.', exampleFr: 'J\'ai mal à la tête.', isBelgian: false },
  { order: 161, dutch: 'De hand', french: 'La main', category: 'Lichaam', level: 'A1', exampleNl: 'Geef me je hand.', exampleFr: 'Donne-moi ta main.', isBelgian: false },
  { order: 162, dutch: 'De voet', french: 'Le pied', category: 'Lichaam', level: 'A1', exampleNl: 'Mijn voet doet pijn.', exampleFr: 'J\'ai mal au pied.', isBelgian: false },
  { order: 163, dutch: 'De ogen', french: 'Les yeux', category: 'Lichaam', level: 'A1', exampleNl: 'Ze heeft blauwe ogen.', exampleFr: 'Elle a les yeux bleus.', isBelgian: false },
  { order: 164, dutch: 'De mond', french: 'La bouche', category: 'Lichaam', level: 'A1', exampleNl: 'Doe je mond open.', exampleFr: 'Ouvre la bouche.', isBelgian: false },
  { order: 165, dutch: 'De buik', french: 'Le ventre', category: 'Lichaam', level: 'A1', exampleNl: 'Mijn buik doet pijn.', exampleFr: 'J\'ai mal au ventre.', isBelgian: false },
  { order: 166, dutch: 'De rug', french: 'Le dos', category: 'Lichaam', level: 'A2', exampleNl: 'Hij heeft rugpijn.', exampleFr: 'Il a mal au dos.', isBelgian: false },
  { order: 167, dutch: 'Het hart', french: 'Le cœur', category: 'Lichaam', level: 'A2', exampleNl: 'Mijn hart klopt snel.', exampleFr: 'Mon cœur bat vite.', isBelgian: false },
  { order: 168, dutch: 'De neus', french: 'Le nez', category: 'Lichaam', level: 'A1', exampleNl: 'Ze heeft een kleine neus.', exampleFr: 'Elle a un petit nez.', isBelgian: false },
  { order: 169, dutch: 'Het oor', french: 'L\'oreille', category: 'Lichaam', level: 'A1', exampleNl: 'Ik heb oorpijn.', exampleFr: 'J\'ai mal à l\'oreille.', isBelgian: false },

  // ─── GEZONDHEID A2 ─────────────────────────────────────────────────────────
  { order: 170, dutch: 'Ziek zijn', french: 'Être malade', category: 'Gezondheid', level: 'A1', exampleNl: 'Ik ben ziek vandaag.', exampleFr: 'Je suis malade aujourd\'hui.', isBelgian: false },
  { order: 171, dutch: 'De dokter', french: 'Le médecin', category: 'Gezondheid', level: 'A1', exampleNl: 'Ik moet naar de dokter.', exampleFr: 'Je dois aller chez le médecin.', isBelgian: false },
  { order: 172, dutch: 'De pijn', french: 'La douleur', category: 'Gezondheid', level: 'A2', exampleNl: 'Ik heb veel pijn.', exampleFr: 'J\'ai beaucoup de douleur.', isBelgian: false },
  { order: 173, dutch: 'De griep', french: 'La grippe', category: 'Gezondheid', level: 'A2', exampleNl: 'Hij heeft de griep.', exampleFr: 'Il a la grippe.', isBelgian: false },
  { order: 174, dutch: 'De afspraak', french: 'Le rendez-vous', category: 'Gezondheid', level: 'A2', exampleNl: 'Ik heb een afspraak bij de dokter.', exampleFr: 'J\'ai un rendez-vous chez le médecin.', isBelgian: false },
  { order: 175, dutch: 'Het medicijn', french: 'Le médicament', category: 'Gezondheid', level: 'A2', exampleNl: 'Neem dit medicijn driemaal per dag.', exampleFr: 'Prenez ce médicament trois fois par jour.', isBelgian: false },
  { order: 176, dutch: 'Beter worden', french: 'Aller mieux', category: 'Gezondheid', level: 'A2', exampleNl: 'Ik hoop dat je snel beter wordt.', exampleFr: 'J\'espère que tu vas vite aller mieux.', isBelgian: false },
  { order: 177, dutch: 'Gezond', french: 'En bonne santé', category: 'Gezondheid', level: 'A2', exampleNl: 'Hij is heel gezond.', exampleFr: 'Il est en bonne santé.', isBelgian: false },
  { order: 178, dutch: 'De apotheker', french: 'Le pharmacien', category: 'Gezondheid', level: 'A2', exampleNl: 'De apotheker geeft advies.', exampleFr: 'Le pharmacien donne des conseils.', isBelgian: false },

  // ─── HUIS & WONEN A1/A2 ────────────────────────────────────────────────────
  { order: 180, dutch: 'Het huis', french: 'La maison', category: 'Huis & wonen', level: 'A1', exampleNl: 'Ik woon in een groot huis.', exampleFr: 'J\'habite dans une grande maison.', isBelgian: false },
  { order: 181, dutch: 'De kamer', french: 'La pièce', category: 'Huis & wonen', level: 'A1', exampleNl: 'Dit huis heeft vijf kamers.', exampleFr: 'Cette maison a cinq pièces.', isBelgian: false },
  { order: 182, dutch: 'De keuken', french: 'La cuisine', category: 'Huis & wonen', level: 'A1', exampleNl: 'Ik kook in de keuken.', exampleFr: 'Je cuisine dans la cuisine.', isBelgian: false },
  { order: 183, dutch: 'De slaapkamer', french: 'La chambre', category: 'Huis & wonen', level: 'A1', exampleNl: 'Mijn slaapkamer is klein.', exampleFr: 'Ma chambre est petite.', isBelgian: false },
  { order: 184, dutch: 'De badkamer', french: 'La salle de bain', category: 'Huis & wonen', level: 'A1', exampleNl: 'De badkamer is boven.', exampleFr: 'La salle de bain est en haut.', isBelgian: false },
  { order: 185, dutch: 'De tuin', french: 'Le jardin', category: 'Huis & wonen', level: 'A1', exampleNl: 'We hebben een mooie tuin.', exampleFr: 'Nous avons un beau jardin.', isBelgian: false },
  { order: 186, dutch: 'De deur', french: 'La porte', category: 'Huis & wonen', level: 'A1', exampleNl: 'Doe de deur dicht.', exampleFr: 'Ferme la porte.', isBelgian: false },
  { order: 187, dutch: 'Het raam', french: 'La fenêtre', category: 'Huis & wonen', level: 'A1', exampleNl: 'Open het raam, alsjeblieft.', exampleFr: 'Ouvre la fenêtre, s\'il te plaît.', isBelgian: false },
  { order: 188, dutch: 'De trap', french: 'L\'escalier', category: 'Huis & wonen', level: 'A2', exampleNl: 'De trap is steil.', exampleFr: 'L\'escalier est raide.', isBelgian: false },
  { order: 189, dutch: 'De muur', french: 'Le mur', category: 'Huis & wonen', level: 'A2', exampleNl: 'Er hangt een schilderij aan de muur.', exampleFr: 'Il y a un tableau accroché au mur.', isBelgian: false },

  // ─── KLEDING A1/A2 ─────────────────────────────────────────────────────────
  { order: 190, dutch: 'De broek', french: 'Le pantalon', category: 'Kleding', level: 'A1', exampleNl: 'Deze broek is te groot.', exampleFr: 'Ce pantalon est trop grand.', isBelgian: false },
  { order: 191, dutch: 'Het hemd', french: 'La chemise', category: 'Kleding', level: 'A1', exampleNl: 'Hij draagt een wit hemd.', exampleFr: 'Il porte une chemise blanche.', isBelgian: false },
  { order: 192, dutch: 'De jas', french: 'Le manteau', category: 'Kleding', level: 'A1', exampleNl: 'Trek je jas aan, het is koud.', exampleFr: 'Mets ton manteau, il fait froid.', isBelgian: false },
  { order: 193, dutch: 'De schoenen', french: 'Les chaussures', category: 'Kleding', level: 'A1', exampleNl: 'Mijn schoenen zijn nieuw.', exampleFr: 'Mes chaussures sont neuves.', isBelgian: false },
  { order: 194, dutch: 'De jurk', french: 'La robe', category: 'Kleding', level: 'A1', exampleNl: 'Ze draagt een mooie jurk.', exampleFr: 'Elle porte une belle robe.', isBelgian: false },
  { order: 195, dutch: 'De muts', french: 'Le bonnet', category: 'Kleding', level: 'A2', exampleNl: 'Draag een muts in de winter.', exampleFr: 'Porte un bonnet en hiver.', isBelgian: false },
  { order: 196, dutch: 'De sjaal', french: 'L\'écharpe', category: 'Kleding', level: 'A2', exampleNl: 'Ik draag graag een sjaal.', exampleFr: 'J\'aime porter une écharpe.', isBelgian: false },
  { order: 197, dutch: 'Dragen', french: 'Porter', category: 'Kleding', level: 'A2', exampleNl: 'Wat draag je morgen?', exampleFr: 'Qu\'est-ce que tu portes demain?', isBelgian: false },
  { order: 198, dutch: 'Passen', french: 'Essayer', category: 'Kleding', level: 'A2', exampleNl: 'Mag ik deze broek passen?', exampleFr: 'Puis-je essayer ce pantalon?', isBelgian: false },
  { order: 199, dutch: 'De maat', french: 'La taille', category: 'Kleding', level: 'A2', exampleNl: 'Welke maat heb je?', exampleFr: 'Quelle taille fais-tu?', isBelgian: false },

  // ─── HOBBY'S & VRIJE TIJD A1/A2 ────────────────────────────────────────────
  { order: 200, dutch: 'Lezen', french: 'Lire', category: 'Hobby\'s & vrije tijd', level: 'A1', exampleNl: 'Ik lees graag boeken.', exampleFr: 'J\'aime lire des livres.', isBelgian: false },
  { order: 201, dutch: 'Sporten', french: 'Faire du sport', category: 'Hobby\'s & vrije tijd', level: 'A1', exampleNl: 'Hij sport elke dag.', exampleFr: 'Il fait du sport tous les jours.', isBelgian: false },
  { order: 202, dutch: 'Zwemmen', french: 'Nager', category: 'Hobby\'s & vrije tijd', level: 'A1', exampleNl: 'We gaan zwemmen in de zomer.', exampleFr: 'Nous allons nager en été.', isBelgian: false },
  { order: 203, dutch: 'Dansen', french: 'Danser', category: 'Hobby\'s & vrije tijd', level: 'A1', exampleNl: 'Ze danst heel goed.', exampleFr: 'Elle danse très bien.', isBelgian: false },
  { order: 204, dutch: 'Muziek luisteren', french: 'Écouter de la musique', category: 'Hobby\'s & vrije tijd', level: 'A1', exampleNl: 'Ik luister graag naar muziek.', exampleFr: 'J\'aime écouter de la musique.', isBelgian: false },
  { order: 205, dutch: 'Koken', french: 'Cuisiner', category: 'Hobby\'s & vrije tijd', level: 'A1', exampleNl: 'Mijn vader kookt elke avond.', exampleFr: 'Mon père cuisine tous les soirs.', isBelgian: false },
  { order: 206, dutch: 'Fotograferen', french: 'Photographier', category: 'Hobby\'s & vrije tijd', level: 'A2', exampleNl: 'Hij houdt van fotograferen.', exampleFr: 'Il aime photographier.', isBelgian: false },
  { order: 207, dutch: 'Wandelen', french: 'Se promener', category: 'Hobby\'s & vrije tijd', level: 'A1', exampleNl: 'We wandelen graag in het park.', exampleFr: 'Nous aimons nous promener dans le parc.', isBelgian: false },
  { order: 208, dutch: 'Fietsen', french: 'Faire du vélo', category: 'Hobby\'s & vrije tijd', level: 'A1', exampleNl: 'In Vlaanderen fietst iedereen.', exampleFr: 'En Flandre, tout le monde fait du vélo.', isBelgian: true },
  { order: 209, dutch: 'Voetballen', french: 'Jouer au football', category: 'Hobby\'s & vrije tijd', level: 'A1', exampleNl: 'De kinderen voetballen buiten.', exampleFr: 'Les enfants jouent au football dehors.', isBelgian: false },

  // ─── EMOTIES & GEVOELENS A2/B1 ─────────────────────────────────────────────
  { order: 210, dutch: 'Blij', french: 'Content(e)', category: 'Emoties & gevoelens', level: 'A1', exampleNl: 'Ik ben heel blij vandaag.', exampleFr: 'Je suis très content aujourd\'hui.', isBelgian: false },
  { order: 211, dutch: 'Verdrietig', french: 'Triste', category: 'Emoties & gevoelens', level: 'A1', exampleNl: 'Ze is verdrietig.', exampleFr: 'Elle est triste.', isBelgian: false },
  { order: 212, dutch: 'Boos', french: 'Fâché(e)', category: 'Emoties & gevoelens', level: 'A2', exampleNl: 'Hij is boos op mij.', exampleFr: 'Il est fâché contre moi.', isBelgian: false },
  { order: 213, dutch: 'Bang', french: 'Effrayé(e)', category: 'Emoties & gevoelens', level: 'A2', exampleNl: 'Het kind is bang in het donker.', exampleFr: 'L\'enfant est effrayé dans le noir.', isBelgian: false },
  { order: 214, dutch: 'Moe', french: 'Fatigué(e)', category: 'Emoties & gevoelens', level: 'A1', exampleNl: 'Ik ben heel moe.', exampleFr: 'Je suis très fatigué.', isBelgian: false },
  { order: 215, dutch: 'Verveeld', french: 'Ennuyé(e)', category: 'Emoties & gevoelens', level: 'A2', exampleNl: 'De kinderen zijn verveeld.', exampleFr: 'Les enfants sont ennuyés.', isBelgian: false },
  { order: 216, dutch: 'Trots', french: 'Fier / Fière', category: 'Emoties & gevoelens', level: 'A2', exampleNl: 'Ik ben trots op jou.', exampleFr: 'Je suis fier de toi.', isBelgian: false },
  { order: 217, dutch: 'Verbaasd', french: 'Surpris(e)', category: 'Emoties & gevoelens', level: 'B1', exampleNl: 'Ik was erg verbaasd.', exampleFr: 'J\'étais très surpris.', isBelgian: false },
  { order: 218, dutch: 'Zenuwachtig', french: 'Nerveux / Nerveuse', category: 'Emoties & gevoelens', level: 'B1', exampleNl: 'Ze is zenuwachtig voor het examen.', exampleFr: 'Elle est nerveuse avant l\'examen.', isBelgian: false },
  { order: 219, dutch: 'Kalm', french: 'Calme', category: 'Emoties & gevoelens', level: 'A2', exampleNl: 'Blijf kalm.', exampleFr: 'Reste calme.', isBelgian: false },

  // ─── ONDERWIJS A1/A2 ───────────────────────────────────────────────────────
  { order: 220, dutch: 'De school', french: 'L\'école', category: 'Onderwijs', level: 'A1', exampleNl: 'De school begint om 8 uur.', exampleFr: 'L\'école commence à 8 heures.', isBelgian: false },
  { order: 221, dutch: 'De universiteit', french: 'L\'université', category: 'Onderwijs', level: 'A1', exampleNl: 'Ze studeert aan de universiteit.', exampleFr: 'Elle étudie à l\'université.', isBelgian: false },
  { order: 222, dutch: 'De leraar', french: 'Le professeur', category: 'Onderwijs', level: 'A1', exampleNl: 'Onze leraar is heel aardig.', exampleFr: 'Notre professeur est très sympa.', isBelgian: false },
  { order: 223, dutch: 'De student', french: 'L\'étudiant(e)', category: 'Onderwijs', level: 'A1', exampleNl: 'Hij is student aan de universiteit.', exampleFr: 'Il est étudiant à l\'université.', isBelgian: false },
  { order: 224, dutch: 'Het examen', french: 'L\'examen', category: 'Onderwijs', level: 'A2', exampleNl: 'Ik heb morgen een examen.', exampleFr: 'J\'ai un examen demain.', isBelgian: false },
  { order: 225, dutch: 'Het huiswerk', french: 'Les devoirs', category: 'Onderwijs', level: 'A1', exampleNl: 'Ik moet mijn huiswerk maken.', exampleFr: 'Je dois faire mes devoirs.', isBelgian: false },
  { order: 226, dutch: 'Leren', french: 'Apprendre', category: 'Onderwijs', level: 'A1', exampleNl: 'Ik leer Frans.', exampleFr: 'J\'apprends le français.', isBelgian: false },
  { order: 227, dutch: 'Studeren', french: 'Étudier', category: 'Onderwijs', level: 'A1', exampleNl: 'Ze studeert elke avond.', exampleFr: 'Elle étudie tous les soirs.', isBelgian: false },

  // ─── TECHNOLOGIE A1/A2 ─────────────────────────────────────────────────────
  { order: 230, dutch: 'De computer', french: 'L\'ordinateur', category: 'Technologie', level: 'A1', exampleNl: 'Ik werk op de computer.', exampleFr: 'Je travaille sur l\'ordinateur.', isBelgian: false },
  { order: 231, dutch: 'Het internet', french: 'L\'internet', category: 'Technologie', level: 'A1', exampleNl: 'Heb je internet thuis?', exampleFr: 'As-tu internet à la maison?', isBelgian: false },
  { order: 232, dutch: 'De gsm', french: 'Le GSM', category: 'Technologie', level: 'A1', exampleNl: 'Mijn gsm is leeg.', exampleFr: 'Mon GSM est déchargé.', isBelgian: true },
  { order: 233, dutch: 'Het wachtwoord', french: 'Le mot de passe', category: 'Technologie', level: 'A2', exampleNl: 'Ik ben mijn wachtwoord vergeten.', exampleFr: 'J\'ai oublié mon mot de passe.', isBelgian: false },
  { order: 234, dutch: 'Downloaden', french: 'Télécharger', category: 'Technologie', level: 'A2', exampleNl: 'Ik download een applicatie.', exampleFr: 'Je télécharge une application.', isBelgian: false },
  { order: 235, dutch: 'Het bestand', french: 'Le fichier', category: 'Technologie', level: 'A2', exampleNl: 'Stuur me het bestand.', exampleFr: 'Envoie-moi le fichier.', isBelgian: false },
  { order: 236, dutch: 'De applicatie', french: 'L\'application', category: 'Technologie', level: 'A2', exampleNl: 'Deze applicatie is heel handig.', exampleFr: 'Cette application est très utile.', isBelgian: false },
  { order: 237, dutch: 'De wifi', french: 'Le wifi', category: 'Technologie', level: 'A1', exampleNl: 'Is er hier wifi?', exampleFr: 'Y a-t-il du wifi ici?', isBelgian: false },

  // ─── BOODSCHAPPEN & RESTAURANT A1/A2 ──────────────────────────────────────
  { order: 240, dutch: 'De supermarkt', french: 'Le supermarché', category: 'Boodschappen & restaurant', level: 'A1', exampleNl: 'Ik ga naar de supermarkt.', exampleFr: 'Je vais au supermarché.', isBelgian: false },
  { order: 241, dutch: 'Het mandje', french: 'Le panier', category: 'Boodschappen & restaurant', level: 'A2', exampleNl: 'Neem een mandje bij de ingang.', exampleFr: 'Prends un panier à l\'entrée.', isBelgian: false },
  { order: 242, dutch: 'De rekening', french: 'L\'addition', category: 'Boodschappen & restaurant', level: 'A1', exampleNl: 'Mag ik de rekening, alstublieft?', exampleFr: 'L\'addition, s\'il vous plaît?', isBelgian: false },
  { order: 243, dutch: 'Bestellen', french: 'Commander', category: 'Boodschappen & restaurant', level: 'A1', exampleNl: 'Wat wil je bestellen?', exampleFr: 'Qu\'est-ce que tu veux commander?', isBelgian: false },
  { order: 244, dutch: 'Het menu', french: 'Le menu', category: 'Boodschappen & restaurant', level: 'A1', exampleNl: 'Mag ik het menu zien?', exampleFr: 'Puis-je voir le menu?', isBelgian: false },
  { order: 245, dutch: 'De ober', french: 'Le serveur', category: 'Boodschappen & restaurant', level: 'A1', exampleNl: 'De ober brengt het eten.', exampleFr: 'Le serveur apporte le repas.', isBelgian: false },
  { order: 246, dutch: 'Lekker', french: 'Délicieux', category: 'Boodschappen & restaurant', level: 'A1', exampleNl: 'Dit gerecht is heel lekker.', exampleFr: 'Ce plat est délicieux.', isBelgian: false },
  { order: 247, dutch: 'De korting', french: 'La réduction', category: 'Boodschappen & restaurant', level: 'A2', exampleNl: 'Is er korting op dit product?', exampleFr: 'Y a-t-il une réduction sur ce produit?', isBelgian: false },
  { order: 248, dutch: 'Betalen', french: 'Payer', category: 'Boodschappen & restaurant', level: 'A1', exampleNl: 'Kan ik met kaart betalen?', exampleFr: 'Puis-je payer par carte?', isBelgian: false },
  { order: 249, dutch: 'Het wisselgeld', french: 'La monnaie', category: 'Boodschappen & restaurant', level: 'A2', exampleNl: 'Hier is uw wisselgeld.', exampleFr: 'Voici votre monnaie.', isBelgian: false },

  // ─── BIJWOORDEN & VOEGWOORDEN A2/B1/B2 ─────────────────────────────────────
  { order: 250, dutch: 'Echter', french: 'Cependant', category: 'Bijwoorden & voegwoorden', level: 'B2', exampleNl: 'Het is duur, echter wel de moeite waard.', exampleFr: 'C\'est cher, cependant ça vaut la peine.', isBelgian: false },
  { order: 251, dutch: 'Daarom', french: 'Donc', category: 'Bijwoorden & voegwoorden', level: 'B1', exampleNl: 'Het regent, daarom blijf ik thuis.', exampleFr: 'Il pleut, donc je reste à la maison.', isBelgian: false },
  { order: 252, dutch: 'Bovendien', french: 'De plus', category: 'Bijwoorden & voegwoorden', level: 'B2', exampleNl: 'Het is goedkoop, bovendien is het lekker.', exampleFr: 'C\'est bon marché, de plus c\'est délicieux.', isBelgian: false },
  { order: 253, dutch: 'Omdat', french: 'Parce que', category: 'Bijwoorden & voegwoorden', level: 'A2', exampleNl: 'Ik blijf thuis omdat ik ziek ben.', exampleFr: 'Je reste à la maison parce que je suis malade.', isBelgian: false },
  { order: 254, dutch: 'Hoewel', french: 'Bien que', category: 'Bijwoorden & voegwoorden', level: 'B2', exampleNl: 'Hoewel het regent, ga ik wandelen.', exampleFr: 'Bien qu\'il pleuve, je vais me promener.', isBelgian: false },
  { order: 255, dutch: 'Dus', french: 'Alors', category: 'Bijwoorden & voegwoorden', level: 'A2', exampleNl: 'Ik ben moe, dus ik ga slapen.', exampleFr: 'Je suis fatigué, alors je vais dormir.', isBelgian: false },
  { order: 256, dutch: 'Eindelijk', french: 'Enfin', category: 'Bijwoorden & voegwoorden', level: 'B1', exampleNl: 'Eindelijk is het weekend!', exampleFr: 'Enfin, c\'est le week-end!', isBelgian: false },
  { order: 257, dutch: 'Trouwens', french: 'D\'ailleurs', category: 'Bijwoorden & voegwoorden', level: 'B2', exampleNl: 'Trouwens, heb je mijn bericht gezien?', exampleFr: 'D\'ailleurs, as-tu vu mon message?', isBelgian: false },
  { order: 258, dutch: 'Namelijk', french: 'À savoir', category: 'Bijwoorden & voegwoorden', level: 'B2', exampleNl: 'Er zijn twee opties, namelijk A en B.', exampleFr: 'Il y a deux options, à savoir A et B.', isBelgian: false },
  { order: 259, dutch: 'Toch', french: 'Quand même', category: 'Bijwoorden & voegwoorden', level: 'B1', exampleNl: 'Het is duur, maar ik koop het toch.', exampleFr: 'C\'est cher, mais je l\'achète quand même.', isBelgian: false },

  // ─── BELGISCHE UITDRUKKINGEN UITGEBREID A2/B1 ─────────────────────────────
  { order: 260, dutch: 'Op kot wonen (studentenkamer)', french: 'Habiter en kot', category: 'Belgische uitdrukkingen', level: 'A2', exampleNl: 'Hij woont op kot in Leuven.', exampleFr: 'Il habite en kot à Louvain.', isBelgian: true },
  { order: 261, dutch: 'Eens (verzachtend woordje)', french: 'Une fois', category: 'Belgische uitdrukkingen', level: 'A2', exampleNl: 'Kom eens hier.', exampleFr: 'Viens une fois ici.', isBelgian: true },
  { order: 262, dutch: 'Ik kan niet komen (Belgisch-Frans)', french: 'Je ne sais pas venir', category: 'Belgische uitdrukkingen', level: 'B1', exampleNl: 'Ik kan morgen niet komen.', exampleFr: 'Je ne sais pas venir demain.', isBelgian: true },
  { order: 263, dutch: 'Binnen (een bepaalde termijn)', french: 'Endéans', category: 'Belgische uitdrukkingen', level: 'B1', exampleNl: 'Antwoord binnen de week.', exampleFr: 'Répondez endéans la semaine.', isBelgian: true },
  { order: 264, dutch: 'Dat smaakt goed', french: 'Ça goûte bon', category: 'Belgische uitdrukkingen', level: 'A2', exampleNl: 'Deze soep smaakt heel goed.', exampleFr: 'Cette soupe, ça goûte bon.', isBelgian: true },
  { order: 265, dutch: 'De vaatdoek', french: 'L\'essuie', category: 'Belgische uitdrukkingen', level: 'A2', exampleNl: 'Geef me de vaatdoek, alsjeblieft.', exampleFr: 'Donne-moi l\'essuie, s\'il te plaît.', isBelgian: true },

  // ─── GEVORDERD FRANS B2 ─────────────────────────────────────────────────────
  { order: 270, dutch: 'Desalniettemin', french: 'Néanmoins', category: 'Gevorderd Frans', level: 'B2', exampleNl: 'Het is moeilijk, desalniettemin probeer ik het.', exampleFr: 'C\'est difficile, néanmoins j\'essaie.', isBelgian: false },
  { order: 271, dutch: 'Meer (in mindere/meerdere mate)', french: 'Davantage', category: 'Gevorderd Frans', level: 'B2', exampleNl: 'We moeten daar meer aandacht aan geven.', exampleFr: 'Nous devons y prêter davantage attention.', isBelgian: false },
  { order: 272, dutch: 'Overwegen', french: 'Envisager', category: 'Gevorderd Frans', level: 'B2', exampleNl: 'Ik overweeg om te verhuizen.', exampleFr: 'J\'envisage de déménager.', isBelgian: false },
  { order: 273, dutch: 'Een vraag opwerpen', french: 'Soulever une question', category: 'Gevorderd Frans', level: 'B2', exampleNl: 'Dit rapport werpt een belangrijke vraag op.', exampleFr: 'Ce rapport soulève une question importante.', isBelgian: false },
  { order: 274, dutch: 'Daarnaast', french: 'Par ailleurs', category: 'Gevorderd Frans', level: 'B2', exampleNl: 'Daarnaast moeten we ook de kosten bekijken.', exampleFr: 'Par ailleurs, il faut aussi examiner les coûts.', isBelgian: false },
  { order: 275, dutch: 'In vraag stellen', french: 'Remettre en question', category: 'Gevorderd Frans', level: 'B2', exampleNl: 'Hij stelt alles in vraag.', exampleFr: 'Il remet tout en question.', isBelgian: false },
  { order: 276, dutch: 'Oproepen (een reactie)', french: 'Susciter', category: 'Gevorderd Frans', level: 'B2', exampleNl: 'Dit voorstel roept veel kritiek op.', exampleFr: 'Cette proposition suscite beaucoup de critiques.', isBelgian: false },
  { order: 277, dutch: 'De uitdaging', french: 'Le défi', category: 'Gevorderd Frans', level: 'B1', exampleNl: 'Dit is een grote uitdaging voor ons.', exampleFr: 'C\'est un grand défi pour nous.', isBelgian: false },

  // ─── WERKWOORDEN UITGEBREID A1 ─────────────────────────────────────────────
  { order: 280, dutch: 'Beginnen', french: 'Commencer', category: 'Werkwoorden', level: 'A1', exampleNl: 'De film begint om 20 uur.', exampleFr: 'Le film commence à 20 heures.', isBelgian: false },
  { order: 281, dutch: 'Eindigen', french: 'Terminer', category: 'Werkwoorden', level: 'A1', exampleNl: 'Wanneer eindigt de les?', exampleFr: 'Quand est-ce que le cours se termine?', isBelgian: false },
  { order: 282, dutch: 'Begrijpen', french: 'Comprendre', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik begrijp het niet.', exampleFr: 'Je ne comprends pas.', isBelgian: false },
  { order: 283, dutch: 'Denken', french: 'Penser', category: 'Werkwoorden', level: 'A1', exampleNl: 'Wat denk je daarvan?', exampleFr: 'Qu\'est-ce que tu en penses?', isBelgian: false },
  { order: 284, dutch: 'Weten', french: 'Savoir', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik weet het niet.', exampleFr: 'Je ne sais pas.', isBelgian: false },
  { order: 285, dutch: 'Kennen', french: 'Connaître', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ken je deze stad?', exampleFr: 'Connais-tu cette ville?', isBelgian: false },
  { order: 286, dutch: 'Zien', french: 'Voir', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik zie je morgen.', exampleFr: 'Je te vois demain.', isBelgian: false },
  { order: 287, dutch: 'Horen', french: 'Entendre', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik hoor je niet goed.', exampleFr: 'Je ne t\'entends pas bien.', isBelgian: false },
  { order: 288, dutch: 'Zoeken', french: 'Chercher', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik zoek mijn sleutels.', exampleFr: 'Je cherche mes clés.', isBelgian: false },
  { order: 289, dutch: 'Vinden', french: 'Trouver', category: 'Werkwoorden', level: 'A1', exampleNl: 'Ik kan mijn telefoon niet vinden.', exampleFr: 'Je ne trouve pas mon téléphone.', isBelgian: false },
  { order: 290, dutch: 'Vragen', french: 'Demander', category: 'Werkwoorden', level: 'A1', exampleNl: 'Mag ik iets vragen?', exampleFr: 'Puis-je demander quelque chose?', isBelgian: false },
  { order: 291, dutch: 'Antwoorden', french: 'Répondre', category: 'Werkwoorden', level: 'A1', exampleNl: 'Antwoord op mijn vraag, alsjeblieft.', exampleFr: 'Réponds à ma question, s\'il te plaît.', isBelgian: false },
  { order: 292, dutch: 'Helpen', french: 'Aider', category: 'Werkwoorden', level: 'A1', exampleNl: 'Kun je me helpen?', exampleFr: 'Peux-tu m\'aider?', isBelgian: false },
]

export function getVocabByLevel(level: string): VocabularyItem[] {
  const levels = { A1: ['A1'], A2: ['A1', 'A2'], B1: ['A1', 'A2', 'B1'], B2: ['A1', 'A2', 'B1', 'B2'] }
  const allowed = levels[level as keyof typeof levels] ?? ['A1']
  return vocabularyData.filter((v) => allowed.includes(v.level))
}

export function getCategories(): string[] {
  const seen = new Map<string, boolean>()
  return vocabularyData.map((v) => v.category).filter((c) => { if (seen.has(c)) return false; seen.set(c, true); return true })
}

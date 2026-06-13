export interface VocabularyItem {
  dutch: string
  french: string
  category: string
  level: 'A1' | 'A2' | 'B1'
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

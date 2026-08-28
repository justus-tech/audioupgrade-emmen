/**
 * DE REVIEWS VAN KLANTEN.
 *
 * ==========================================================================
 * DRIE REGELS DIE NIET ONDERHANDELBAAR ZIJN
 * ==========================================================================
 *
 * 1. Hier staat alleen wat een klant echt heeft gezegd. Niets verzinnen,
 *    niets "mooier maken", niets samenvoegen van twee mensen. Een verzonnen
 *    review is misleidende handelspraktijk (artikel 6:193 BW) en kost je bij
 *    de ACM een boete. Belangrijker: één klant die zijn eigen woorden niet
 *    herkent, vertelt dat door in heel Emmen.
 *
 * 2. Vraag toestemming voordat je iemand op de site zet, ook als hij het je
 *    al per WhatsApp heeft gestuurd. "Mag ik dit op mijn website zetten met
 *    je voornaam en je auto erbij?" is genoeg. Een naam is een persoonsgegeven.
 *
 * 3. Typefouten mag je stilzwijgend rechtzetten. Zinnen herschrijven niet.
 *
 * ==========================================================================
 * WAAROM ER GEEN STERREN OP DE SITE STAAN
 * ==========================================================================
 * Google negeert beoordelingsgegevens die een bedrijf over zichzelf op zijn
 * eigen site zet — dat heet "self-serving" en is sinds 2019 uitgesloten van
 * de sterretjes in de zoekresultaten. Ze markeren als Review of
 * AggregateRating levert dus niets op en oogt als een poging tot sjoemelen.
 *
 * Waar sterren wél tellen: je Google-bedrijfsprofiel. Dáár moet je klanten
 * naartoe sturen. Wat hier staat is voor de bezoeker die al op je site is en
 * twijfelt — en daarvoor werkt een echt citaat beter dan vijf sterretjes.
 *
 * ==========================================================================
 * HOE VUL JE HET IN
 * ==========================================================================
 *
 *   {
 *     tekst:  'Wat de klant schreef. Eén tot vier zinnen werkt het best.',
 *     naam:   'Mark',            // voornaam is genoeg
 *     auto:   'Volkswagen Golf', // waar het over ging; mag weg als dat niet past
 *     plaats: 'Emmen',           // optioneel
 *     datum:  '2026-09',         // jaar en maand, voor de volgorde
 *   }
 *
 * De nieuwste komt vanzelf bovenaan. Staat de lijst leeg, dan verschijnt het
 * blok nergens op de site — er komt dus nooit een leeg kopje "Wat klanten
 * zeggen" te staan.
 */

/** @type {{tekst: string, naam: string, auto?: string, plaats?: string, datum: string}[]} */
export const REVIEWS = [
  // Nog niets. Zie de instructies hierboven voordat je hier iets neerzet.
];

/** De nieuwste eerst. */
export const reviewsOpDatum = () =>
  [...REVIEWS].sort((a, b) => String(b.datum).localeCompare(String(a.datum)));

export default REVIEWS;

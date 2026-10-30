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
 * STERREN: WEL LATEN ZIEN, NOOIT ALS GEGEVENS AANBIEDEN
 * ==========================================================================
 * Google negeert beoordelingsgegevens die een bedrijf over zichzelf op zijn
 * eigen site zet — dat heet "self-serving" en is sinds 2019 uitgesloten van
 * de sterretjes in de zoekresultaten. Ze markeren als Review of
 * AggregateRating (de machineleesbare gegevens in Base.astro) levert dus
 * niets op en oogt als een poging tot sjoemelen. Dat doen we dus niet.
 *
 * Wat wél mag: laten zien wat een klant zelf op Google heeft gegeven. Komt
 * een review van je Google-profiel, zet dan bij `sterren` precies het aantal
 * dat hij daar gaf en bij `bron` 'google'. Dan staat er "★★★★★ op Google"
 * bij, en wie het niet gelooft kan het daar nakijken. Een review die je via
 * WhatsApp kreeg heeft geen sterren: die verzin je er niet bij.
 *
 * Waar sterren het meest tellen blijft je Google-bedrijfsprofiel. Dáár moet
 * je klanten naartoe sturen; zet de link daarom ook in GOOGLE_REVIEWS
 * hieronder, dan staat er onder de reviews "Lees alle reviews op Google".
 *
 * ==========================================================================
 * HOE VUL JE HET IN
 * ==========================================================================
 *
 *   {
 *     tekst:   'Wat de klant schreef. Eén tot vier zinnen werkt het best.',
 *     naam:    'Mark',               // voornaam is genoeg
 *     auto:    'Volkswagen Golf',    // waar het over ging; mag weg
 *     plaats:  'Emmen',              // optioneel
 *     pakket:  'The OEM+ Executive', // optioneel, precies de naam uit site.js
 *     datum:   '2026-09',            // jaar en maand van de oplevering
 *     bron:    'google',             // 'google' of 'whatsapp'; optioneel
 *     sterren: 5,                    // alleen bij bron 'google', zoals gegeven
 *   }
 *
 * De nieuwste komt vanzelf bovenaan. Staat de lijst leeg, dan verschijnt het
 * blok nergens op de site — er komt dus nooit een leeg kopje "Wat klanten
 * zeggen" te staan. Staat er één in, dan krijgt die de hele breedte: een
 * enkele review is geen gat in een rij van drie maar een uitgelicht verhaal.
 */

/**
 * De link naar je reviews op Google. Haal hem op in je Bedrijfsprofiel:
 * "Meer reviews ontvangen" geeft een link om er een te schrijven; voor deze
 * plek wil je de link waarop mensen ze kunnen lezen (je profiel op Google
 * Maps). Leeg laten = geen link op de site.
 */
export const GOOGLE_REVIEWS = '';

/** @type {{tekst: string, naam: string, auto?: string, plaats?: string, pakket?: string, datum: string, bron?: 'google' | 'whatsapp', sterren?: number}[]} */
export const REVIEWS = [
  // Nog niets. Zie de instructies hierboven voordat je hier iets neerzet.
];

/** De nieuwste eerst. */
export const reviewsOpDatum = () =>
  [...REVIEWS].sort((a, b) => String(b.datum).localeCompare(String(a.datum)));

const MAANDEN = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

/** '2026-09' → 'september 2026'. Zo staat het in het stempel bij de review. */
export const maandVan = (datum) => {
  const [jaar, maand] = String(datum).split('-').map(Number);
  return `${MAANDEN[maand - 1]} ${jaar}`;
};

export default REVIEWS;

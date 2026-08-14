/**
 * DE MODELPAGINA'S — de SEO-kern van de site.
 *
 * Elk model krijgt een eigen pagina op /audio-upgrade/[slug]. Dát zijn de
 * pagina's die ranken op zoektermen als "BMW X5 audio upgrade", en daar komt
 * het bezoek vandaan.
 *
 * DE INHOUD STAAT NIET HIER MAAR IN src/data/modellen/
 * Eén bestand per merk. Wil je iets aan een BMW veranderen, dan open je
 * modellen/bmw.js en niets anders. Dit stond ooit allemaal in dit ene
 * bestand — ruim 6300 regels — en dat was niet meer te overzien.
 *
 * Dit bestand doet nog maar twee dingen: alles bij elkaar zetten en er een
 * paar handige lijstjes van maken.
 *
 * WAT ELK MODEL HEEFT
 *   slug         het webadres: /audio-upgrade/<slug>
 *   brand,model  merk en model zoals wij ze schrijven
 *   generaties   welke bouwjaren de pagina dekt
 *   matchers     merk + patroon om een RDW-naam te herkennen
 *   title        wat Google als titel toont
 *   description  wat Google eronder toont
 *   intro        de openingsalinea
 *   problems     drie dingen die af fabriek misgaan
 *   solution     wat wij eraan doen
 *   carplay      of CarPlay kan, en zo niet waarom
 *   packages     welke pakketten passen (weglaten = de vier standaardpakketten)
 *   faq          drie vragen met antwoord, ook voor Google
 *
 * Aanspreekvorm: "je", overal. Titels bevatten bewust " | Audio Upgrade
 * Emmen"; Astro plakt de bedrijfsnaam er niet vanzelf achter zoals
 * Squarespace deed.
 */
import { ALLE_MODELLEN } from './modellen/index.js';

export const MODELS = ALLE_MODELLEN;

/**
 * "Škoda" -> "skoda", "Citroën" -> "citroen", "Lynk & Co" -> "lynk-co".
 *
 * De normalize('NFD') haalt accenten los van de letter, waarna we ze
 * weggooien. Zonder die stap werd Škoda namelijk "koda" en Citroën "citro-n":
 * webadressen waar niemand op zoekt en die eruitzien alsof er iets stuk is.
 */
export const merkSlug = (brand) =>
  String(brand || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Alle modellen van één merk, in de volgorde van het merkbestand. */
export const modellenVanMerk = (slug) => MODELS.filter((m) => merkSlug(m.brand) === slug);

export const modelPerSlug = Object.fromEntries(MODELS.map((m) => [m.slug, m]));

export default MODELS;

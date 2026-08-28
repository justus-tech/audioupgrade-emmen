/**
 * FOTO'S EN VIDEO'S VAN EIGEN WERK.
 *
 * ==========================================================================
 * WAAROM DIT HET BELANGRIJKSTE BESTAND VAN DE SITE WORDT
 * ==========================================================================
 * Alle beelden op de site komen nu van Unsplash. Ze zijn netjes en ze mogen
 * gebruikt worden, maar iemand die iets van auto's weet, ziet binnen twee
 * seconden dat het stockbeeld is. Eén foto van een dashboard dat Justus zelf
 * heeft omgebouwd, doet meer dan alle tien bij elkaar.
 *
 * ==========================================================================
 * WAT ER GEFOTOGRAFEERD MOET WORDEN
 * ==========================================================================
 * Per klus vier beelden, in deze volgorde. Dat is precies het verhaal dat de
 * site vertelt, maar dan echt:
 *
 *   1. VOOR      het dashboard of paneel zoals het eruitzag. Saai mag.
 *   2. OPEN      het paneel eraf, de kabelboom aangesloten op de originele
 *                stekker. Dit is de foto die het verschil maakt: hier zie je
 *                dat er niets is doorgeknipt.
 *   3. DETAIL    een gesoldeerde verbinding met krimpkous, of een
 *                CNC-gefreesde ring op zijn plek. Van dichtbij.
 *   4. NA        alles weer dicht. Moet er precies zo uitzien als bij 1 —
 *                dát is de clou van "onzichtbaar ingebouwd".
 *
 * Praktisch: liggend fotograferen (telefoon op zijn kant), gewoon daglicht of
 * je werklamp, geen flits recht op een scherm. Poets het paneel even af; stof
 * en vingerafdrukken zie je op een grote foto genadeloos. Niet bijsnijden en
 * geen filters — dat doet de site zelf.
 *
 * ==========================================================================
 * WAAR ZET JE ZE NEER
 * ==========================================================================
 * De bestanden in  src/assets/werk/  met een naam die zegt wat het is:
 *   golf-2018-voor.jpg, golf-2018-open.jpg, golf-2018-detail.jpg, ...
 *
 * En dan hieronder invullen. Zolang de lijst leeg is, staat er nergens op de
 * site een leeg fotoblok.
 *
 * ==========================================================================
 * OVER VIDEO
 * ==========================================================================
 * Zet een video NIET op YouTube om hem hier in te bouwen. Dan gaat het IP-adres
 * van elke bezoeker weer naar Google, en dat is precies wat we er net uit
 * hebben gehaald toen we de lettertypen naar de eigen server verhuisden.
 *
 * Een kort filmpje op de site zelf kan wel. Houd het onder de 8 MB en onder
 * de 20 seconden, en lever er een stilstaand beeld bij als omslag. Stuur het
 * bestand door, dan comprimeer ik het en zet ik het erin.
 */

/**
 * @type {{
 *   bestand: string,      // de bestandsnaam in src/assets/werk/
 *   alt: string,          // wat er te zien is, voor wie de foto niet kan zien
 *   auto?: string,        // 'Volkswagen Golf 2018'
 *   fase?: 'voor' | 'open' | 'detail' | 'na',
 *   bijschrift?: string,  // één zin, alleen als hij iets toevoegt
 * }[]}
 */
export const WERK = [
  // Nog niets. Zie de instructies hierboven.
];

/** Alleen de beelden van één klus, op volgorde van het verhaal. */
const VOLGORDE = ['voor', 'open', 'detail', 'na'];
export const werkVanAuto = (auto) =>
  WERK.filter((w) => w.auto === auto).sort(
    (a, b) => VOLGORDE.indexOf(a.fase) - VOLGORDE.indexOf(b.fase)
  );

/** Alle auto's waarvan er beeld is, nieuwste klus eerst. */
export const autosMetWerk = () => [...new Set(WERK.map((w) => w.auto).filter(Boolean))];

export default WERK;

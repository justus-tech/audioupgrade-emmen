/**
 * DE WERKBON — het papier dat bij de auto hoort, niet bij de klant.
 *
 * Drie dingen staan erop, in deze volgorde, omdat je ze in deze volgorde
 * nodig hebt:
 *
 *   1. WELKE AUTO      kenteken, model, en wat er over dit model is vastgelegd
 *   2. WAT ERIN GAAT   elk artikel apart, met artikelnummer, om af te vinken
 *   3. HOE             de werkinstructie, genummerd, van hoes tot proefrit
 *
 * WAT ER NIET OP STAAT, EN WAAROM
 * Geen prijzen. Niet de verkoopprijs (die staat op de offerte) en al helemaal
 * niet de inkoop. Een werkbon ligt op de bumper en gaat mee de werkplaats in;
 * daar hoort geen marge op te liggen.
 *
 * WAT DE APP NIET VOOR JE VERZINT
 * Waar het dossier van dit model leeg is, staat op de werkbon een lege regel
 * met een streep eronder — geen gok. Dat is een bewuste keuze: een verzonnen
 * stekkertype of speakermaat kost een middag, en een verzonnen draadkleur kost
 * de fabrieksgarantie van de klant. Vul je die regel in, dan neem je hem na
 * afloop over in het autodossier en klopt hij de volgende keer vanzelf.
 */
import { nieuwPdf, breekAf, breedteVan } from './pdf.js';
import { SITE } from '../../data/site.js';
import { formatteerKenteken } from '../match.js';
import {
  KLEUR, LINKS, RECHTS, ONDERGRENS,
  kopbalk, voetregel, blokkop, kentekenplaat, vakje, invulregel,
} from './opmaak.js';
import { stuklijst, soortenIn, datumNl } from './rekenen.js';
import { stappenlijst } from './stappen.js';
import { DOSSIER_VELDEN, dossierStand } from './autos.js';

/** Waar de kolom met artikelnummers begint. */
const KOLOM_ARTIKEL = RECHTS - 150;
const KOLOM_AANTAL = RECHTS - 18;

/**
 * De werkbon tekenen.
 *
 * @param {object} offerte   dezelfde offerte als voor de pdf naar de klant
 * @param {object} dossier   wat er over dit model is vastgelegd (mag null zijn)
 * @param {Array}  eigenBlokken  extra werkblokken die Justus zelf heeft gemaakt
 */
export function werkbonPdf(offerte, dossier = null, eigenBlokken = []) {
  const doc = nieuwPdf({
    titel: `Werkbon ${offerte.nummer} - ${SITE.name}`,
    maker: SITE.name,
  });

  const kop = { soort: 'Werkbon', nummer: offerte.nummer, datum: offerte.datum };
  let paginaNr = 1;
  let y = kopbalk(doc, kop) + 30;

  const nieuweBladzijde = () => {
    voetregel(doc, paginaNr, { intern: true });
    doc.nieuwePagina();
    paginaNr += 1;
    y = kopbalk(doc, { ...kop, vervolg: true }) + 26;
  };

  /** Zorgt dat er nog `hoogte` punten over zijn; anders een nieuwe bladzijde. */
  const ruimte = (hoogte) => {
    if (y + hoogte > ONDERGRENS) nieuweBladzijde();
  };

  /* ================= 1. DE AUTO ================= */
  const rechterKolom = LINKS + 292;

  blokkop(doc, 'De auto', LINKS, y);
  let ay = y + 6;
  if (offerte.auto?.kenteken) {
    ay += kentekenplaat(
      doc, formatteerKenteken(offerte.auto.kenteken, offerte.auto.bouwjaar), LINKS, ay
    ) + 14;
  } else {
    ay += 10;
  }
  const autoNaam = [offerte.auto?.merk, offerte.auto?.model].filter(Boolean).join(' ');
  doc.tekst(autoNaam || 'Onbekende auto', LINKS, ay, { grootte: 11, vet: true, kleur: KLEUR.inkt });
  ay += 14;
  const extra = [
    offerte.auto?.bouwjaar && `Bouwjaar ${offerte.auto.bouwjaar}`,
    offerte.auto?.kleur,
  ].filter(Boolean).join('  ·  ');
  if (extra) {
    doc.tekst(extra, LINKS, ay, { grootte: 9, kleur: KLEUR.zacht });
    ay += 13;
  }
  /* Kilometerstand schrijf je bij de auto op, dus daar hoort een lege regel. */
  doc.tekst('Km-stand', LINKS, ay + 3, { grootte: 8, kleur: KLEUR.zacht });
  invulregel(doc, LINKS + 48, ay + 5, 110);
  ay += 16;

  blokkop(doc, 'Klant', rechterKolom, y);
  let ky = y + 16;
  const klantRegels = [
    offerte.klant?.bedrijf,
    offerte.klant?.naam || '—',
    offerte.klant?.telefoon,
  ].filter(Boolean);
  klantRegels.forEach((regel, i) => {
    doc.tekst(regel, rechterKolom, ky, {
      grootte: i === 0 ? 11 : 9.5, vet: i === 0,
      kleur: i === 0 ? KLEUR.inkt : KLEUR.zacht,
    });
    ky += i === 0 ? 15 : 12;
  });
  doc.tekst('Afgesproken', rechterKolom, ky + 3, { grootte: 8, kleur: KLEUR.zacht });
  invulregel(doc, rechterKolom + 62, ky + 5, 96);
  ky += 16;

  y = Math.max(ay, ky) + 14;

  /* ================= HET DOSSIER VAN DIT MODEL ================= */
  const stand = dossierStand(dossier);
  const ingevuldeVelden = DOSSIER_VELDEN.filter((v) => String(dossier?.[v.id] || '').trim());

  ruimte(90);
  blokkop(doc, 'Vastgelegd bij dit model', LINKS, y);
  y += 15;

  if (!dossier) {
    /**
     * Geen dossier. Dat is geen ramp maar wél iets dat je vooraf moet weten,
     * dus het staat er met een oranje streep naast in plaats van klein
     * onderaan.
     */
    doc.vlak(LINKS, y - 9, 2.5, 40, KLEUR.accent);
    const uitleg = [
      'Van dit model is nog niets vastgelegd. Meet ter plekke na: speakermaat,',
      'adapterring, type fabrieksscherm, stekker achter de radio en de doorvoer',
      'naar de accu. Zet het daarna in de werkbak onder Auto\'s — dan staat het',
      'de volgende keer al ingevuld.',
    ];
    uitleg.forEach((regel, i) => {
      doc.tekst(regel, LINKS + 12, y + i * 11, { grootte: 8.5, kleur: KLEUR.inkt });
    });
    y += uitleg.length * 11 + 12;
  } else {
    if (stand.ontbreekt.length) {
      doc.vlak(LINKS, y - 9, 2.5, 13, KLEUR.accent);
      doc.tekst(
        `Let op: ${stand.ontbreekt.length} kerngegeven${stand.ontbreekt.length === 1 ? '' : 's'} ontbreekt nog in het dossier.`,
        LINKS + 12, y, { grootte: 8.5, vet: true, kleur: KLEUR.inkt }
      );
      y += 17;
    }
    /**
     * Twee kolommen: label links, waarde erachter.
     *
     * Een waarde als "Rubber doorvoer linksonder schutbord" past niet in een
     * halve pagina en liep dwars door de kolom ernaast heen. Zulke velden
     * krijgen daarom een eigen regel over de volle breedte. Korte velden
     * blijven met z'n tweeën op een rij staan, anders wordt het blok onnodig
     * lang en moet je scrollen op papier.
     */
    const kolomBreedte = (RECHTS - LINKS) / 2;
    const LABEL = 108;
    const kort = [];
    const lang = [];
    for (const veld of ingevuldeVelden) {
      const waarde = String(dossier[veld.id]);
      if (breedteVan(waarde, 9, true) <= kolomBreedte - LABEL - 8) kort.push([veld, waarde]);
      else lang.push([veld, waarde]);
    }

    kort.forEach(([veld, waarde], i) => {
      const x = LINKS + (i % 2) * kolomBreedte;
      const regelY = y + Math.floor(i / 2) * 13;
      doc.tekst(veld.naam, x, regelY, { grootte: 8, kleur: KLEUR.zacht });
      doc.tekst(waarde, x + LABEL, regelY, { grootte: 9, vet: true, kleur: KLEUR.inkt });
    });
    y += Math.ceil(kort.length / 2) * 13;

    for (const [veld, waarde] of lang) {
      const regels = breekAf(waarde, RECHTS - LINKS - LABEL, 9, true);
      ruimte(regels.length * 12 + 6);
      doc.tekst(veld.naam, LINKS, y, { grootte: 8, kleur: KLEUR.zacht });
      regels.forEach((regel, i) => {
        doc.tekst(regel, LINKS + LABEL, y + i * 12, { grootte: 9, vet: true, kleur: KLEUR.inkt });
      });
      y += regels.length * 12 + 1;
    }
    y += 4;

    /* De bron hoort erbij. Zelf nagemeten weegt zwaarder dan een lijst van
       vijf jaar oud, en dat verschil moet je zien zonder ernaar te zoeken. */
    if (String(dossier.bron || '').trim()) {
      const regels = breekAf(`Bron: ${dossier.bron}`, RECHTS - LINKS, 8);
      ruimte(regels.length * 11 + 6);
      regels.forEach((regel, i) => {
        doc.tekst(regel, LINKS, y + i * 11, { grootte: 8, kleur: KLEUR.zacht });
      });
      y += regels.length * 11;
    }
    y += 10;
  }

  /* ================= 2. DE STUKLIJST ================= */
  const artikelen = stuklijst(offerte.regels || []);

  ruimte(60);
  y += 6;
  doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
  y += 12;
  blokkop(doc, 'Wat erin gaat — afvinken', LINKS, y);
  doc.tekst('Artikelnummer', KOLOM_ARTIKEL, y, {
    grootte: 7, vet: true, kleur: KLEUR.zacht, spatiering: 0.8,
  });
  doc.tekst('Aantal', KOLOM_AANTAL, y, {
    grootte: 7, vet: true, kleur: KLEUR.zacht, uitlijnen: 'rechts', spatiering: 0.8,
  });
  y += 8;
  doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
  y += 16;

  if (!artikelen.length) {
    doc.tekst('Geen artikelen op deze bon.', LINKS, y, { grootte: 9, kleur: KLEUR.zacht });
    y += 16;
  }

  for (const artikel of artikelen) {
    ruimte(20);
    /* Toebehoren staan ingesprongen onder hun hoofdartikel: zo zie je meteen
       welke kabel bij welke speaker hoort. */
    const x = artikel.hoofd ? LINKS : LINKS + 16;
    vakje(doc, x, y - 8);
    const tekstX = x + 16;
    const ruimteVoorNaam = KOLOM_ARTIKEL - tekstX - 8;
    const naam = breekAf(artikel.omschrijving, ruimteVoorNaam, artikel.hoofd ? 9.5 : 9, artikel.hoofd)[0];
    doc.tekst(naam, tekstX, y, {
      grootte: artikel.hoofd ? 9.5 : 9,
      vet: artikel.hoofd,
      kleur: artikel.hoofd ? KLEUR.inkt : KLEUR.zacht,
    });
    if (artikel.leverancier) {
      doc.tekst(artikel.leverancier, tekstX, y + 10, { grootte: 7.5, kleur: KLEUR.zacht });
    }
    doc.tekst(artikel.artikelnummer || '—', KOLOM_ARTIKEL, y, {
      grootte: 8.5, kleur: artikel.artikelnummer ? KLEUR.inkt : KLEUR.zacht,
    });
    doc.tekst(`${artikel.aantal}x`, KOLOM_AANTAL, y, {
      grootte: 9.5, vet: true, kleur: KLEUR.inkt, uitlijnen: 'rechts',
    });
    y += artikel.leverancier ? 22 : 15;
    doc.lijn(LINKS, y - 5, RECHTS, y - 5, KLEUR.lijnZacht);
  }

  /* ================= 3. DE WERKINSTRUCTIE ================= */
  const blokken = stappenlijst(soortenIn(offerte.regels || []), dossier || {}, eigenBlokken);

  ruimte(70);
  y += 14;
  doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
  y += 12;
  blokkop(doc, 'Stap voor stap', LINKS, y);
  y += 8;
  doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
  y += 20;

  for (const blok of blokken) {
    ruimte(46);
    doc.vlak(LINKS, y - 10, RECHTS - LINKS, 17, KLEUR.vlakZacht);
    doc.tekst(blok.naam, LINKS + 8, y + 2, {
      grootte: 9, vet: true, kleur: KLEUR.inkt, spatiering: 0.5,
    });
    y += 22;

    for (const stap of blok.stappen) {
      const tekstX = LINKS + 38;
      const breedte = RECHTS - tekstX;
      const regels = breekAf(stap.tekst, breedte, 9);
      const letRegels = stap.let ? breekAf(stap.let, breedte, 8) : [];
      const hoogte = regels.length * 12 + letRegels.length * 10 + (stap.invullen ? 16 : 0) + 8;
      ruimte(hoogte);

      vakje(doc, LINKS, y - 8);
      doc.tekst(String(stap.nummer), LINKS + 18, y, {
        grootte: 9, vet: true, kleur: KLEUR.accentInkt,
      });
      regels.forEach((regel, i) => {
        doc.tekst(regel, tekstX, y + i * 12, { grootte: 9, kleur: KLEUR.inkt });
      });
      let onder = y + (regels.length - 1) * 12;

      if (stap.waarde) {
        /* Vastgelegd: dan staat het er gewoon, dikgedrukt, zodat je het ziet
           zonder te zoeken.

           Het teken vooraan is een dubbele punthaak en geen pijl: een pijl
           bestaat niet in de tekenset van een pdf en werd stilletjes een
           vraagteken. Er staat een test op dat er nergens een vraagteken in
           een gegenereerd document staat. */
        onder += 12;
        doc.tekst(`» ${stap.waarde}`, tekstX, onder, {
          grootte: 9, vet: true, kleur: KLEUR.accentInkt,
        });
      }
      letRegels.forEach((regel, i) => {
        doc.tekst(regel, tekstX, onder + 11 + i * 10, { grootte: 8, kleur: KLEUR.zacht });
      });
      if (letRegels.length) onder += 11 + (letRegels.length - 1) * 10;

      if (stap.invullen) {
        /* Niet vastgelegd: een lege regel om ter plekke in te vullen. Geen
           gok, geen aanname. */
        onder += 15;
        doc.tekst('Meet na en noteer:', tekstX, onder, { grootte: 8, kleur: KLEUR.zacht });
        invulregel(doc, tekstX + 82, onder + 2, RECHTS - tekstX - 82);
      }
      y = onder + 16;
    }
    y += 6;
  }

  /* ================= AFRONDEN ================= */
  ruimte(96);
  y += 8;
  doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
  y += 16;
  blokkop(doc, 'Na afloop invullen', LINKS, y);
  y += 20;

  const velden = [
    ['Gewerkte uren', 130],
    ['Afwijkingen / meerwerk', RECHTS - LINKS - 140],
  ];
  let vx = LINKS;
  for (const [label, breedte] of velden) {
    doc.tekst(label, vx, y, { grootte: 8, kleur: KLEUR.zacht });
    invulregel(doc, vx, y + 14, breedte);
    vx += breedte + 10;
  }
  y += 34;

  doc.tekst('Nieuw voor het autodossier (neem dit over in de werkbak)', LINKS, y, {
    grootte: 8, vet: true, kleur: KLEUR.accentInkt,
  });
  for (let i = 0; i < 3; i++) invulregel(doc, LINKS, y + 16 + i * 15, RECHTS - LINKS);
  y += 16 + 3 * 15 + 10;

  ruimte(30);
  doc.tekst('Afgerond op', LINKS, y, { grootte: 8, kleur: KLEUR.zacht });
  invulregel(doc, LINKS + 58, y + 2, 100);
  doc.tekst('Paraaf', LINKS + 200, y, { grootte: 8, kleur: KLEUR.zacht });
  invulregel(doc, LINKS + 236, y + 2, 100);

  voetregel(doc, paginaNr, { intern: true });
  return doc;
}

/** Een nette bestandsnaam: werkbon-2026-014-XX99XX.pdf */
export function werkbonBestandsnaam(offerte) {
  const kenteken = String(offerte.auto?.kenteken || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return ['werkbon', offerte.nummer, kenteken].filter(Boolean).join('-') + '.pdf';
}

export { datumNl };

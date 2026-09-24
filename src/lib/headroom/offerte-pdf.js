/**
 * DE OFFERTE ALS PDF — de opmaak.
 *
 * Dit bestand weet hoe een offerte eruitziet; pdf.js weet hoe je een pdf
 * schrijft. Die scheiding is met opzet: wil je de offerte anders indelen,
 * dan hoef je alleen hier te zijn.
 *
 * WAT ER WEL EN NIET OP STAAT
 * Op de offerte staat per regel één bedrag, met montage er al in — en bij
 * een particulier ook de btw. Dat is dezelfde belofte als op de site: de
 * prijs die je ziet is de prijs die je betaalt.
 *
 * Wat er NOOIT op mag: inkoopprijzen, marges en het uurtarief. Die staan
 * alleen in de app, op Justus' eigen telefoon. Er is een test die hierop
 * let, want dit is het soort fout dat je één keer maakt en dan bij een
 * klant op tafel ligt.
 */
import { nieuwPdf, breekAf, breedteVan } from './pdf.js';
import { SITE } from '../../data/site.js';
import {
  KLEUR, LINKS, RECHTS, ONDERGRENS, kopbalk, voetregel, blokkop, kentekenplaat,
  voorwaardenBijlage,
} from './opmaak.js';
import { kernpunten, annuleertermijn } from './voorwaarden.js';
/* De streepjes in een kenteken zitten al in de site: dezelfde functie die de
   kenteken-check gebruikt. Twee keer dezelfde tabel onderhouden gaat een keer
   mis, en dan staat er op een werkbon een ander kenteken dan op de site. */
import { formatteerKenteken } from '../match.js';
import { autoNaam } from './autos.js';
import { euro, regelPrijs, totalen, datumNl, STANDAARD_INSTELLINGEN } from './rekenen.js';

/**
 * De offerte tekenen. Levert een pdf-document op; vraag daar `naarBlob()`
 * of `naarBytes()` aan.
 */
/** Waar de kolom met bedragen begint, zodat omschrijvingen daar stoppen. */
const KOLOM_AANTAL = RECHTS - 118;

export function offertePdf(offerte, inst = STANDAARD_INSTELLINGEN) {
  const zakelijk = !!offerte.zakelijk;
  const doc = nieuwPdf({
    titel: `Offerte ${offerte.nummer} — ${SITE.name}`,
    maker: SITE.name,
  });

  const kop = { soort: 'Offerte', nummer: offerte.nummer, datum: offerte.datum };
  let paginaNr = 1;
  let y = kopbalk(doc, kop) + 34;

  /* ---- aan wie, en welke auto ---------------------------------------- */
  const rechterKolom = LINKS + 292;

  blokkop(doc, 'Voor', LINKS, y);
  const klantRegels = [
    offerte.klant?.bedrijf,
    offerte.klant?.naam,
    offerte.klant?.adres,
    offerte.klant?.telefoon,
    offerte.klant?.email,
  ].filter(Boolean);
  let ky = y + 15;
  if (!klantRegels.length) {
    doc.tekst('—', LINKS, ky, { grootte: 9.5, kleur: KLEUR.zacht });
    ky += 13;
  }
  klantRegels.forEach((regel, i) => {
    /* Afbreken op de breedte van de linkerkolom. Zonder dit liep een lange
       naam of een lang adres dwars door het blok met de auto heen, en dat
       staat dan zo op de offerte bij de klant op tafel. */
    for (const stuk of breekAf(regel, rechterKolom - LINKS - 16, i === 0 ? 11 : 9.5, i === 0)) {
      doc.tekst(stuk, LINKS, ky, {
        grootte: i === 0 ? 11 : 9.5,
        vet: i === 0,
        kleur: i === 0 ? KLEUR.inkt : KLEUR.zacht,
      });
      ky += i === 0 ? 15 : 12;
    }
  });

  blokkop(doc, 'De auto', rechterKolom, y);
  let ay = y + 6;
  if (offerte.auto?.kenteken) {
    ay += kentekenplaat(doc, formatteerKenteken(offerte.auto.kenteken, offerte.auto.bouwjaar), rechterKolom, ay) + 13;
  } else {
    ay += 9;
  }
  const naamVanDeAuto = autoNaam(offerte.auto?.merk, offerte.auto?.model);
  /* "Mercedes-Benz C 180 Kompressor Avantgarde Estate" past niet op één regel
     en liep anders het blad af. */
  /* breekAf levert bij lege tekst één lege regel; die zou hier een gat
     van veertien punten maken bij een auto zonder merk. */
  for (const stuk of (naamVanDeAuto ? breekAf(naamVanDeAuto, RECHTS - rechterKolom, 11, true) : [])) {
    doc.tekst(stuk, rechterKolom, ay, { grootte: 11, vet: true, kleur: KLEUR.inkt });
    ay += 14;
  }
  const autoExtra = [
    offerte.auto?.bouwjaar && `Bouwjaar ${offerte.auto.bouwjaar}`,
    offerte.auto?.kleur,
    offerte.auto?.brandstof,
  ].filter(Boolean).join('  ·  ');
  /* Ook deze regel afbreken: bij een kleurnaam als "Obsidiaanzwart metallic
     met glansafwerking" liep hij het blad af. */
  for (const stuk of (autoExtra ? breekAf(autoExtra, RECHTS - rechterKolom, 9) : [])) {
    doc.tekst(stuk, rechterKolom, ay, { grootte: 9, kleur: KLEUR.zacht });
    ay += 12;
  }

  y = Math.max(ky, ay) + 16;

  /* ---- de regels ------------------------------------------------------ */
  const tabelkop = () => {
    doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
    y += 12;
    doc.tekst('Omschrijving', LINKS, y, { grootte: 7.5, vet: true, kleur: KLEUR.zacht, spatiering: 0.8 });
    doc.tekst('Aantal', KOLOM_AANTAL, y, {
      grootte: 7.5, vet: true, kleur: KLEUR.zacht, uitlijnen: 'rechts', spatiering: 0.8,
    });
    doc.tekst(zakelijk ? 'Bedrag excl. btw' : 'Bedrag', RECHTS, y, {
      grootte: 7.5, vet: true, kleur: KLEUR.zacht, uitlijnen: 'rechts', spatiering: 0.8,
    });
    y += 8;
    doc.lijn(LINKS, y, RECHTS, y, KLEUR.lijn, 0.9);
    y += 18;
  };

  const nieuweBladzijde = () => {
    voetregel(doc, paginaNr);
    doc.nieuwePagina();
    paginaNr += 1;
    y = kopbalk(doc, { ...kop, vervolg: true }) + 26;
    tabelkop();
  };

  tabelkop();

  const regels = Array.isArray(offerte.regels) ? offerte.regels : [];
  for (const regel of regels) {
    const prijs = regelPrijs(regel, inst);
    const titelRegels = breekAf(regel.omschrijving || 'Werkzaamheden', KOLOM_AANTAL - LINKS - 16, 10, true);
    const uitleg = regel.toelichting
      ? breekAf(regel.toelichting, KOLOM_AANTAL - LINKS - 16, 8.5)
      : [];
    const hoogte = titelRegels.length * 13 + uitleg.length * 11 + 14;

    if (y + hoogte > ONDERGRENS) nieuweBladzijde();

    const bovenkant = y;
    titelRegels.forEach((tekst, i) => {
      doc.tekst(tekst, LINKS, y + i * 13, { grootte: 10, vet: true, kleur: KLEUR.inkt });
    });
    let onder = y + (titelRegels.length - 1) * 13;
    uitleg.forEach((tekst, i) => {
      doc.tekst(tekst, LINKS, onder + 12 + i * 11, { grootte: 8.5, kleur: KLEUR.zacht });
    });
    if (uitleg.length) onder += 12 + (uitleg.length - 1) * 11;

    doc.tekst(String(prijs.aantal), KOLOM_AANTAL, bovenkant, {
      grootte: 10, kleur: KLEUR.zacht, uitlijnen: 'rechts',
    });
    doc.tekst(euro(zakelijk ? prijs.exclCent : prijs.inclCent), RECHTS, bovenkant, {
      grootte: 10, vet: true, kleur: KLEUR.inkt, uitlijnen: 'rechts',
    });

    y = onder + 14;
    doc.lijn(LINKS, y - 5, RECHTS, y - 5, KLEUR.lijnZacht);
    y += 5;
  }

  if (!regels.length) {
    doc.tekst('Nog geen regels toegevoegd.', LINKS, y, { grootte: 9.5, kleur: KLEUR.zacht });
    y += 20;
  }

  /* ---- de totalen ----------------------------------------------------- */
  const t = totalen(regels, inst, offerte.kortingExclCent || 0);
  const totaalHoogte = zakelijk ? 78 : 62;
  if (y + totaalHoogte > ONDERGRENS) nieuweBladzijde();

  y += 8;
  const labelX = RECHTS - 132;

  /**
   * De korting staat er als eigen regel op, en met het bedrag dat de klant
   * herkent: inclusief btw bij een particulier, exclusief bij een bedrijf —
   * dezelfde maat als de regels erboven. Een korting die alleen in het totaal
   * verdwijnt ziet niemand, en dan heb je hem voor niets gegeven.
   */
  if (t.kortingExclCent) {
    doc.tekst('Korting', labelX, y, { grootte: 9.5, kleur: KLEUR.zacht, uitlijnen: 'rechts' });
    doc.tekst(
      `-${euro(zakelijk ? t.kortingExclCent : t.kortingInclCent)}`,
      RECHTS, y, { grootte: 9.5, vet: true, kleur: KLEUR.accentInkt, uitlijnen: 'rechts' }
    );
    y += 15;
  }

  if (zakelijk) {
    doc.tekst('Subtotaal excl. btw', labelX, y, { grootte: 9.5, kleur: KLEUR.zacht, uitlijnen: 'rechts' });
    doc.tekst(euro(t.exclCent), RECHTS, y, { grootte: 9.5, kleur: KLEUR.inkt, uitlijnen: 'rechts' });
    y += 15;
    doc.tekst(`Btw ${inst.btwPct}%`, labelX, y, { grootte: 9.5, kleur: KLEUR.zacht, uitlijnen: 'rechts' });
    doc.tekst(euro(t.btwCent), RECHTS, y, { grootte: 9.5, kleur: KLEUR.inkt, uitlijnen: 'rechts' });
    y += 12;
  }

  doc.lijn(labelX - 40, y, RECHTS, y, KLEUR.accent, 1.4);
  y += 17;
  doc.tekst(zakelijk ? 'Totaal incl. btw' : 'Totaal', labelX, y, {
    grootte: 11, vet: true, kleur: KLEUR.inkt, uitlijnen: 'rechts',
  });
  doc.tekst(euro(t.inclCent), RECHTS, y, {
    grootte: 15, vet: true, kleur: KLEUR.accentInkt, uitlijnen: 'rechts',
  });
  y += 14;
  doc.tekst(
    zakelijk
      ? `Inclusief montage. Btw ${inst.btwPct}%: ${euro(t.btwCent)}.`
      : `Inclusief montage en ${inst.btwPct}% btw (${euro(t.btwCent)}).`,
    RECHTS, y, { grootte: 8, kleur: KLEUR.zacht, uitlijnen: 'rechts' }
  );
  y += 30;

  /* ---- de afspraken --------------------------------------------------- */
  /**
   * De korte punten die Justus anders per WhatsApp zou doorgeven. Ze komen
   * uit voorwaarden.js, dat op zijn beurt de voorwaarden van de site leest —
   * dus wat hier staat en wat online staat kan niet uiteenlopen.
   */
  const afspraken = kernpunten({
    soort: 'offerte',
    geldigTot: datumNl(offerte.geldigTot),
    /* Een offerte via WhatsApp is een overeenkomst op afstand; dan geldt de
       bedenktijd. Spreek je het in de werkplaats af, dan niet. */
    opAfstand: offerte.opAfstand !== false,
    startDirect: !!offerte.startDirect,
    /* Een bedrijf heeft geen bedenktijd, en ziet bedragen zonder btw. */
    zakelijk,
    annuleerDagen: annuleertermijn(),
  });
  if (offerte.opmerking) afspraken.push(offerte.opmerking);

  const afsprakenRegels = afspraken.flatMap((zin) => breekAf(`·  ${zin}`, RECHTS - LINKS, 8.5));
  if (y + afsprakenRegels.length * 12 + 26 > ONDERGRENS) nieuweBladzijde();

  blokkop(doc, 'Goed om te weten', LINKS, y);
  y += 15;
  for (const regel of afsprakenRegels) {
    doc.tekst(regel, LINKS, y, { grootte: 8.5, kleur: KLEUR.zacht });
    y += 12;
  }

  voetregel(doc, paginaNr);

  /* De volledige voorwaarden erachter. Uit te zetten per offerte, voor het
     geval de klant ze al heeft of het om een kleine klus gaat. */
  if (offerte.voorwaardenBijlage !== false) {
    voorwaardenBijlage(doc, kop, paginaNr);
  }
  return doc;
}

/** Een nette bestandsnaam: offerte-2026-014-XX99XX.pdf */
export function pdfBestandsnaam(offerte) {
  const kenteken = String(offerte.auto?.kenteken || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return ['offerte', offerte.nummer, kenteken].filter(Boolean).join('-') + '.pdf';
}

export { breedteVan, formatteerKenteken };

/**
 * OPVOLGEN — wie je vandaag een berichtje moet sturen.
 *
 * Een offerte waar geen antwoord op komt, een factuur die blijft liggen, een
 * klant die je na de inbouw nooit meer spreekt: dat zijn de klussen die geld
 * of een goede review kosten, en die vergeet je juist als het druk is. Deze
 * lijst zet ze elke dag voor je klaar, met het bericht er al bij.
 *
 * WANNEER IETS OP DE LIJST KOMT
 * - Offerte verstuurd en na OFFERTE_DAGEN nog niets gehoord.
 * - Factuur verstuurd en na FACTUUR_DAGEN nog niet betaald.
 * - De inbouwdatum is voorbij en de klus staat nog op aanbetaald: dan moet
 *   de eindfactuur nog de deur uit.
 * - NAZORG_DAGEN na de inbouw van een betaalde klus: even vragen hoe het
 *   bevalt. Dat levert de reviews en de doorverwijzingen op.
 *
 * Heb je iemand een bericht gestuurd, dan verdwijnt hij van de lijst en komt
 * hij pas na NOG_EENS_DAGEN terug als er dan nog steeds niets veranderd is.
 * Nazorg vraag je één keer.
 *
 * Alles hier is puur: geen opslag, geen scherm. Zo is het te testen.
 */
import { totalen, STANDAARD_INSTELLINGEN } from './rekenen.js';
import { kaalNummer } from './klanten.js';

export const OFFERTE_DAGEN = 5;
export const FACTUUR_DAGEN = 14;
export const NAZORG_DAGEN = 21;
/* Na zes weken is "hoe bevalt het" geen nazorg meer maar een rare vraag. */
export const NAZORG_TOT_DAGEN = 60;
export const NOG_EENS_DAGEN = 7;

const DAG = 24 * 60 * 60 * 1000;

/** Hele dagen tussen twee momenten, op kalenderdagen. */
export function dagenTussen(van, tot) {
  const a = new Date(van);
  const b = new Date(tot);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
  const dag = (d) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((dag(b) - dag(a)) / DAG);
}

const voornaam = (o) => String(o.klant?.naam || '').trim().split(/\s+/)[0] || '';
const autoVan = (o) => [o.auto?.merk, o.auto?.model].filter(Boolean).join(' ');
const laatsteFactuur = (o) => {
  const lijst = [...(o.facturen || [])];
  if (!lijst.length && o.factuur) lijst.push(o.factuur);
  return lijst.filter((f) => f?.datum).sort((a, b) => new Date(b.datum) - new Date(a.datum))[0] || null;
};
const euro = (cent) => `€ ${(cent / 100).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

/** De WhatsApp-link met het bericht erin; zonder nummer kies je zelf wie. */
export function waLink(telefoon, tekst) {
  const nummer = kaalNummer(telefoon);
  return nummer
    ? `https://wa.me/31${nummer}?text=${encodeURIComponent(tekst)}`
    : `https://wa.me/?text=${encodeURIComponent(tekst)}`;
}

/** De berichten, in de toon van de offerte zelf: kort, "je", met naam. */
export function opvolgBericht(soort, o, { afzender = 'Justus', bedrijf = 'Audio Upgrade Emmen', instellingen } = {}) {
  const hoi = `Hoi${voornaam(o) ? ` ${voornaam(o)}` : ''}`;
  const auto = autoVan(o);
  const groet = `Groet, ${afzender} — ${bedrijf}`;
  if (soort === 'offerte') {
    return `${hoi}, ik wilde even checken of de offerte${auto ? ` voor je ${auto}` : ''} goed is aangekomen. `
      + `Heb je nog vragen, of zal ik een datum voor je vastzetten? ${groet}`;
  }
  if (soort === 'factuur') {
    const f = laatsteFactuur(o);
    const bedrag = f?.inclCent
      ? euro(f.inclCent)
      : euro(totalen(o.regels || [], { ...STANDAARD_INSTELLINGEN, ...instellingen }, o.kortingExclCent || 0).inclCent);
    return `${hoi}, volgens mijn overzicht staat factuur ${f?.nummer || o.nummer} van ${bedrag} nog open. `
      + `Wil je er even naar kijken? Is hij al betaald, dan kun je dit bericht negeren. ${groet}`;
  }
  if (soort === 'nazorg') {
    return `${hoi}, je rijdt nu een paar weken${auto ? ` met je ${auto}` : ''} met de nieuwe set. Hoe bevalt het? `
      + `Moet er iets bijgesteld worden, laat het gerust weten. En ben je tevreden, dan helpt een korte review me enorm. ${groet}`;
  }
  return '';
}

/**
 * Alles wat vandaag opgevolgd moet worden, het dringendste eerst.
 *
 * Elk punt: { soort, offerte, dagen, titel, uitleg, bericht? }. Een punt
 * zonder bericht is iets wat je in de app zelf doet (de eindfactuur).
 */
export function opvolgLijst(offertes = [], { nu = new Date(), instellingen = {}, afzender, bedrijf } = {}) {
  const uit = [];
  const opties = { afzender, bedrijf, instellingen };
  /* Pas terug op de lijst als je de vorige keer lang genoeg geleden stuurde. */
  const netGedaan = (o, soort) => {
    const toen = o.opgevolgd?.[soort];
    if (!toen) return false;
    if (soort === 'nazorg') return true;
    const d = dagenTussen(toen, nu);
    return d !== null && d < NOG_EENS_DAGEN;
  };

  for (const o of Array.isArray(offertes) ? offertes : []) {
    const status = o.status || 'concept';
    const auto = autoVan(o);
    const wie = o.klant?.bedrijf || o.klant?.naam || 'Klant zonder naam';
    const sinds = o.statusSinds || o.datum;

    if (status === 'verstuurd') {
      const dagen = dagenTussen(sinds, nu);
      if (dagen !== null && dagen >= OFFERTE_DAGEN && !netGedaan(o, 'offerte')) {
        const geldig = Number(instellingen.geldigDagen) || STANDAARD_INSTELLINGEN.geldigDagen;
        uit.push({
          soort: 'offerte', offerte: o, dagen, wie,
          titel: 'Offerte opvolgen',
          uitleg: `${dagen} dagen geleden verstuurd${auto ? ` · ${auto}` : ''}${dagenTussen(o.datum, nu) >= geldig ? ' · de offerte is verlopen' : ''}`,
          bericht: opvolgBericht('offerte', o, opties),
        });
      }
    }

    if (status === 'gefactureerd') {
      const f = laatsteFactuur(o);
      const dagen = dagenTussen(f?.datum || sinds, nu);
      if (dagen !== null && dagen >= FACTUUR_DAGEN && !netGedaan(o, 'factuur')) {
        uit.push({
          soort: 'factuur', offerte: o, dagen, wie,
          titel: 'Factuur staat nog open',
          uitleg: `${f?.nummer ? `${f.nummer} · ` : ''}${dagen} dagen geleden gestuurd`,
          bericht: opvolgBericht('factuur', o, opties),
        });
      }
    }

    if (status === 'aanbetaald' && o.inbouwdatum) {
      const dagen = dagenTussen(o.inbouwdatum, nu);
      if (dagen !== null && dagen >= 1 && !netGedaan(o, 'eindfactuur')) {
        uit.push({
          soort: 'eindfactuur', offerte: o, dagen, wie,
          titel: 'Eindfactuur sturen',
          uitleg: `Ingebouwd ${dagen === 1 ? 'gisteren' : `${dagen} dagen geleden`}${auto ? ` · ${auto}` : ''}, de klus staat nog op aanbetaald`,
        });
      }
    }

    /* Alleen bij een betaalde klus: om een review vragen terwijl de factuur
       nog openstaat leest verkeerd. */
    if (status === 'betaald') {
      const dagen = dagenTussen(o.inbouwdatum || sinds, nu);
      if (dagen !== null && dagen >= NAZORG_DAGEN && dagen <= NAZORG_TOT_DAGEN && !netGedaan(o, 'nazorg')) {
        uit.push({
          soort: 'nazorg', offerte: o, dagen, wie,
          titel: 'Vragen hoe het bevalt',
          uitleg: `${Math.floor(dagen / 7)} weken na de inbouw${auto ? ` · ${auto}` : ''}`,
          bericht: opvolgBericht('nazorg', o, opties),
        });
      }
    }
  }

  /* Geld eerst, dan de klant die op antwoord wacht, dan de nazorg. */
  const volgorde = { factuur: 0, eindfactuur: 1, offerte: 2, nazorg: 3 };
  return uit.sort((a, b) => volgorde[a.soort] - volgorde[b.soort] || b.dagen - a.dagen);
}

/** Een veld voor een spreadsheet: puntkomma's en aanhalingstekens veilig. */
const cel = (v) => {
  const t = String(v ?? '');
  return /[";\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
};

/**
 * De klantenlijst als spreadsheet (csv met puntkomma's, zoals Excel in
 * Nederland hem verwacht). Met een BOM vooraan, anders maakt Excel van een é
 * twee rare tekens.
 */
export function klantenCsv(klanten = []) {
  const kop = ['Naam', 'Bedrijf', 'Telefoon', 'E-mail', 'Adres', 'Kentekens', "Auto's", 'Offertes', 'Laatste contact', 'Doorgegaan (incl. btw)'];
  const rijen = klanten.map((k) => [
    k.naam, k.bedrijf, k.telefoon, k.email, k.adres,
    k.autos.map((a) => a.kenteken).filter(Boolean).join(', '),
    k.autos.map((a) => a.naam).filter(Boolean).join(', '),
    k.offertes.length,
    k.laatst ? new Date(k.laatst).toISOString().slice(0, 10) : '',
    (k.omzetCent / 100).toFixed(2).replace('.', ','),
  ]);
  return `﻿${[kop, ...rijen].map((r) => r.map(cel).join(';')).join('\r\n')}\r\n`;
}

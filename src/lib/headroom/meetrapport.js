/**
 * HET MEETRAPPORT — het enige papier dat de klant meekrijgt met meetwaarden.
 *
 * WAAROM DIT BESTAAT
 * Een DSP-afstemming is werk dat je niet kunt zien. De klant hoort verschil,
 * maar heeft niets in handen waaruit blijkt wat er gedaan is. Dit rapport is
 * dat bewijs: de frequentierespons voor en na, in gewone taal uitgelegd, op
 * wit A4 dat thuis uit de printer komt en in de AUE-map gaat.
 *
 * DE VOLGORDE IS HEILIG
 * Voormeting opslaan → afstellen → nameting. Sla je de voormeting over, dan
 * is er niets om mee te vergelijken en kun je hem ook niet inhalen: de auto
 * staat dan al goed. Daarom weigert `ontbreekt()` een geluidsrapport zonder
 * voormeting, en staat diezelfde waarschuwing op de werkbon (stappen.js).
 *
 * WAT ER BEWUST NIET OP STAAT
 * De instellingen per kanaal: vertraging, niveau, fase, filters. Dat is waar
 * de klant voor betaald heeft en waar het vakmanschap in zit. Zet je het op
 * papier dat de auto uit gaat, dan leest de volgende inbouwer jouw afstemming
 * zo over. Die waarden horen in de app bij de auto, niet in dit rapport.
 *
 * WAAROM HET GEEN PDF IS ZOALS DE OFFERTE
 * De offerte en de werkbon worden hier in de app als pdf getekend. Dat kan,
 * want daar staat alleen tekst op. Dit rapport draait om twee schermafbeel-
 * dingen van het meetprogramma, en foto's in een pdf zetten kan onze eigen
 * pdf-schrijver niet. Daarom is dit een echte pagina die je afdrukt: Ctrl+P
 * op de laptop, en "opslaan als pdf" als je hem wilt bewaren of appen.
 *
 * GEEN VERZONNEN CIJFERS
 * Nergens in dit bestand staat hoeveel decibel er gewonnen is of hoeveel
 * stiller iets wordt. Wat de klant leest, is wat Justus zelf intikt, en de
 * grafieken spreken voor zich.
 */
import { SITE } from '../../data/site.js';
import { whatsappLink } from '../whatsapp.js';
import { formatteerKenteken } from '../match.js';
import { qrSvg } from '../qr.js';
import { LICHT } from '../../data/brand.js';
import { datumNl } from './rekenen.js';

/**
 * De twee soorten rapport, en bij welk werk ze horen.
 *
 * `soorten` verwijst naar SOORTEN in rekenen.js — dat is wat er op de offerte
 * staat. Een klus met een DSP krijgt een geluidsrapport. Een klus met een
 * versterker, subwoofer of DSP trekt stroom die de fabrieksbedrading nooit
 * hoefde te leveren, en krijgt daarom een accurapport. Dat is precies wat de
 * site bij de Executive, de Reference en bij Accu & Voeding belooft.
 */
export const RAPPORT_SOORTEN = [
  {
    id: 'geluid',
    naam: 'Geluid',
    kop: 'Meetrapport geluid',
    soorten: ['dsp'],
  },
  {
    id: 'accu',
    naam: 'Accu en voeding',
    kop: 'Meetrapport accu en voeding',
    soorten: ['versterker', 'subwoofer', 'dsp'],
  },
];

/** Welke rapporten horen bij dit werk? */
export function rapportenVoor(soortenInHetWerk = []) {
  const aanwezig = new Set(soortenInHetWerk.filter(Boolean));
  return RAPPORT_SOORTEN.filter((r) => r.soorten.some((s) => aanwezig.has(s)));
}

/**
 * IN HET KORT — drie punten in gewone taal.
 *
 * Dit is de tekst die de klant echt leest; de grafieken bekijkt hij daarna.
 * Het staat er als beginregel, niet als wet: Justus past hem per auto aan.
 * Er staat met opzet geen enkel getal in. Wat er precies is veranderd, laten
 * de twee grafieken zien.
 */
export const KORTE_PUNTEN = [
  {
    kop: 'Tijd',
    tekst: 'Het geluid komt nu van voren, uit het midden van je dashboard, in plaats van uit de deur naast je. Elke luidspreker is zo ingesteld dat zijn geluid op hetzelfde moment bij je oor aankomt.',
  },
  {
    kop: 'Klank',
    tekst: 'De pieken en de gaten die de auto zelf in het geluid legt, zijn eruit gehaald. Stemmen klinken daardoor natuurlijker en je hoeft minder hard te zetten om alles te horen.',
  },
  {
    kop: 'Balans',
    tekst: 'Links en rechts zijn aan elkaar gelijk gemaakt. Het geluidsbeeld blijft daardoor staan waar het hoort, ook als je harder zet.',
  },
];

/** De vier nazorgtips. Voor beide soorten rapport dezelfde eerste twee. */
export const NAZORG_TIPS = [
  'Zet de klankregeling van de radio — bass, treble, balance en fader — op nul. De afstemming zit in de processor. Draai je er in de radio overheen, dan haal je hem er weer uit.',
  'Zet de equalizer in je telefoon uit en stream op de hoogste kwaliteit. Een matig bestand wordt door een goed systeem niet beter, alleen duidelijker.',
  'Gebruik de preset die we hebben ingesteld. Staat er meer dan een in, dan zie je hieronder welke de jouwe is.',
  'Hoor je kraken of brommen, of valt er een luidspreker weg: bel of app meteen. Doorrijden met een defect kost vaker een versterker dan een luidspreker.',
];

/**
 * De accumetingen, in de volgorde waarin je ze doet.
 *
 * Elke regel heeft een waarde voor en een waarde na. De eenheid staat erbij
 * zodat er op het rapport geen kaal getal staat.
 */
export const ACCU_METINGEN = [
  { id: 'rust', naam: 'Rustspanning', eenheid: 'V', uitleg: 'Contact af, motor uit.' },
  { id: 'belast', naam: 'Onder belasting', eenheid: 'V', uitleg: 'Systeem aan op luistervolume.' },
  { id: 'laad', naam: 'Laadspanning', eenheid: 'V', uitleg: 'Motor draaiend.' },
];

/** De velden onderaan het rapport die de klant later nodig heeft. */
export const NAZORG_VELDEN = [
  { id: 'preset', naam: 'Jouw preset' },
  { id: 'bestand', naam: 'Instellingenbestand' },
  { id: 'garantie', naam: 'Garantie' },
  { id: 'nacontrole', naam: 'Nacontrole' },
  { id: 'volgende', naam: 'Volgende meting' },
];

/** Een leeg rapport om mee te beginnen. */
export function leegRapport(soort = 'geluid') {
  return {
    soort,
    nummer: '',
    datum: new Date().toISOString().slice(0, 10),
    klant: '',
    kenteken: '',
    auto: '',
    bouwjaar: '',
    meetpositie: 'Oorhoogte bestuurder, deuren dicht',
    systeem: [],
    kort: KORTE_PUNTEN.map((p) => ({ ...p })),
    /* De schermafbeeldingen. Blijven leeg tot Justus ze erbij zoekt. */
    voorBeeld: '',
    naBeeld: '',
    faseVoor: '',
    faseNa: '',
    responsToelichting: '',
    faseToelichting: '',
    accu: { type: '', metingen: {} },
    accuToelichting: '',
    nazorg: {},
  };
}

/**
 * Het rapportnummer: jj-nnn. 26-001 is het eerste rapport van 2026.
 *
 * Twee cijfers voor het jaar, drie voor de teller. Loopt de teller over de
 * duizend, dan groeit het nummer gewoon mee in plaats van dat hij terugspringt
 * naar 000 — een dubbel rapportnummer is erger dan een nummer van vier cijfers.
 */
export function rapportnummer(volgnummer, datum = new Date()) {
  const d = new Date(datum);
  const jaar = Number.isNaN(d.getTime()) ? new Date() : d;
  const jj = String(jaar.getFullYear()).slice(-2);
  const n = Math.max(1, Math.round(Number(volgnummer) || 1));
  return `${jj}-${String(n).padStart(3, '0')}`;
}

/**
 * Wat er nog ontbreekt voordat dit rapport de deur uit mag.
 *
 * Levert een lijst zinnen op. Is de lijst leeg, dan is het rapport compleet.
 * De eerste regel is de belangrijkste: zonder voormeting is er geen rapport,
 * en dat kun je achteraf niet meer rechtzetten.
 */
export function ontbreekt(rapport = {}) {
  const gemist = [];
  const soort = rapport.soort || 'geluid';

  if (soort === 'geluid') {
    if (!rapport.voorBeeld) {
      gemist.push(
        'De voormeting ontbreekt. Zonder de meting van voor de afstemming laat dit rapport niets zien, en je kunt hem niet alsnog maken — de auto staat nu goed.'
      );
    }
    if (!rapport.naBeeld) {
      gemist.push('De nameting ontbreekt. Draai hem met de meetkop op precies dezelfde plek als de voormeting.');
    }
  }

  if (soort === 'accu') {
    const m = rapport.accu?.metingen || {};
    const leegVoor = ACCU_METINGEN.filter((r) => !String(m[`${r.id}Voor`] || '').trim());
    if (leegVoor.length) {
      gemist.push(
        `Gemeten voor het werk ontbreekt bij: ${leegVoor.map((r) => r.naam.toLowerCase()).join(', ')}. Die meting doe je voordat je de accu afkoppelt; daarna is de waarde weg.`
      );
    }
    const leegNa = ACCU_METINGEN.filter((r) => !String(m[`${r.id}Na`] || '').trim());
    if (leegNa.length) {
      gemist.push(`Gemeten na het werk ontbreekt bij: ${leegNa.map((r) => r.naam.toLowerCase()).join(', ')}.`);
    }
  }

  if (!String(rapport.klant || '').trim()) gemist.push('De naam van de klant ontbreekt.');
  if (!String(rapport.kenteken || '').trim()) gemist.push('Het kenteken ontbreekt.');

  return gemist;
}

/** Een bestandsnaam om mee op te slaan of te delen. */
export function meetrapportBestandsnaam(rapport = {}) {
  const soort = rapport.soort === 'accu' ? 'accu' : 'geluid';
  const plaat = String(rapport.kenteken || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  const delen = ['Meetrapport', soort, rapport.nummer, plaat].filter(Boolean);
  return `${delen.join('-')}.pdf`;
}

/* ================= DE PAGINA ZELF ================= */

/**
 * Tekst die veilig in html mag.
 *
 * Alles wat hier langskomt heeft Justus zelf ingetikt, dus er zit geen
 * kwaadwillende code in. Maar een klantnaam als "Jansen & Zn." of een
 * opmerking met een < erin breekt de pagina, en dat wil je niet ontdekken
 * terwijl de klant naast je staat.
 */
function veilig(tekst) {
  return String(tekst ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Een veld met een label erboven. Leeg veld wordt een streepje, geen gat. */
function veld(label, waarde) {
  return `<div class="mr-veld"><span class="mr-label">${veilig(label)}</span><strong>${
    veilig(String(waarde || '').trim() || '—')
  }</strong></div>`;
}

/** De kentekenplaat, dezelfde als op de offerte: metaal met de oranje band. */
function plaat(kenteken, bouwjaar) {
  const net = formatteerKenteken(kenteken, bouwjaar) || String(kenteken || '');
  return `<div class="mr-plaat"><span class="mr-plaat-band"></span><span class="mr-plaat-tekst">${
    veilig(net.toUpperCase() || '—')
  }</span></div>`;
}

/** Een schermafbeelding over de volle breedte, met het bijschrift eronder. */
function beeld(bron, bijschrift) {
  if (!bron) {
    return `<figure class="mr-beeld mr-beeld-leeg"><div class="mr-leeg">Hier hoort de schermafbeelding van ${
      veilig(bijschrift.toLowerCase())
    }</div><figcaption>${veilig(bijschrift)}</figcaption></figure>`;
  }
  return `<figure class="mr-beeld"><img src="${veilig(bron)}" alt="${
    veilig(bijschrift)
  }" /><figcaption>${veilig(bijschrift)}</figcaption></figure>`;
}

/** De kop van elk blad. Op elk blad dezelfde, zodat losse vellen bij elkaar horen. */
function bladkop(rapport, soortNaam) {
  return `<header class="mr-kop">
      <div class="mr-merk">${veilig(SITE.name)}</div>
      <div class="mr-soort">${veilig(soortNaam)}${
        rapport.nummer ? ` <span class="mr-nr">${veilig(rapport.nummer)}</span>` : ''
      }</div>
    </header>`;
}

/** De voet van elk blad: wie het gemeten heeft en hoe je hem bereikt. */
function bladvoet(paginaNr, totaal) {
  return `<footer class="mr-voet">
      <span>${veilig(SITE.name)} &middot; ${veilig(SITE.phoneDisplay)} &middot; ${veilig(SITE.email)}</span>
      <span>${paginaNr} / ${totaal}</span>
    </footer>`;
}

/** Blad 1: wie, welke auto, wat erin zit en wat je ervan merkt. */
function bladSamenvatting(rapport, soortNaam, nr, totaal) {
  const regels = (rapport.systeem || []).filter(
    (r) => String(r.onderdeel || '').trim() || String(r.merktype || '').trim()
  ).slice(0, 5);

  const systeem = regels.length
    ? `<table class="mr-tabel">
        <thead><tr><th>Onderdeel</th><th>Merk en type</th><th>Plaats</th></tr></thead>
        <tbody>${regels.map((r) => `<tr>
          <td>${veilig(r.onderdeel)}</td>
          <td><strong>${veilig(r.merktype)}</strong></td>
          <td>${veilig(r.plaats)}</td>
        </tr>`).join('')}</tbody>
      </table>`
    : '<p class="mr-leeg-regel">Nog geen onderdelen ingevuld.</p>';

  const punten = (rapport.kort || []).filter((p) => String(p.tekst || '').trim());

  return `<section class="mr-blad">
    ${bladkop(rapport, soortNaam)}
    <div class="mr-titelblok">
      <div class="mr-velden">
        ${veld('Klant', rapport.klant)}
        ${veld('Datum', rapport.datum ? datumNl(rapport.datum) : '')}
        ${veld('Auto', rapport.auto)}
        ${veld('Bouwjaar', rapport.bouwjaar)}
        ${veld('Meetpositie', rapport.meetpositie)}
      </div>
      ${plaat(rapport.kenteken, rapport.bouwjaar)}
    </div>

    <h2 class="mr-h">Jouw systeem</h2>
    ${systeem}

    <h2 class="mr-h">In het kort</h2>
    <div class="mr-punten">${punten.map((p) => `<div class="mr-punt">
      <h3>${veilig(p.kop)}</h3>
      <p>${veilig(p.tekst)}</p>
    </div>`).join('')}</div>

    <div class="mr-handtekening">
      <div class="mr-streep"></div>
      <strong>${veilig(SITE.eigenaar)}</strong>
      <span>${veilig(SITE.eigenaarRol)}</span>
      <span class="mr-meetkop">Gemeten met ${veilig(MEETKOP)}</span>
    </div>
    ${bladvoet(nr, totaal)}
  </section>`;
}

/** De naam van de meetkop. Staat hier en niet los in de tekst verspreid. */
export const MEETKOP = 'B.A.R.N.I.E.';

/** Blad 2: de frequentierespons voor en na, over de volle breedte. */
function bladRespons(rapport, soortNaam, nr, totaal) {
  const toelichting = String(rapport.responsToelichting || '').trim()
    || 'De bovenste grafiek is je auto zoals hij binnenkwam, de onderste zoals hij nu staat. Van links naar rechts loopt de toonhoogte, van laag naar hoog. Van onder naar boven staat hoe hard je die toon hoort. Hoe vlakker de lijn, hoe minder de auto zelf aan het geluid toevoegt.';

  return `<section class="mr-blad">
    ${bladkop(rapport, soortNaam)}
    <h2 class="mr-h">Frequentierespons</h2>
    <p class="mr-uitleg">${veilig(toelichting)}</p>
    ${beeld(rapport.voorBeeld, 'Voor de afstemming')}
    ${beeld(rapport.naBeeld, 'Na de afstemming')}
    ${bladvoet(nr, totaal)}
  </section>`;
}

/** Het optionele blad met looptijd en fase. Alleen als er beeld is. */
function bladFase(rapport, soortNaam, nr, totaal) {
  const toelichting = String(rapport.faseToelichting || '').trim()
    || 'Hier zie je wanneer het geluid van elke luidspreker bij je oor aankomt. Lopen de lijnen gelijk, dan werken de luidsprekers samen in plaats van tegen elkaar in.';

  return `<section class="mr-blad">
    ${bladkop(rapport, soortNaam)}
    <h2 class="mr-h">Looptijd en fase</h2>
    <p class="mr-uitleg">${veilig(toelichting)}</p>
    ${beeld(rapport.faseVoor, 'Voor de afstemming')}
    ${beeld(rapport.faseNa, 'Na de afstemming')}
    ${bladvoet(nr, totaal)}
  </section>`;
}

/** Het accublad: wat er gemeten is voor en na, met de eenheid erbij. */
function bladAccu(rapport, soortNaam, nr, totaal) {
  const m = rapport.accu?.metingen || {};
  const waarde = (sleutel, eenheid) => {
    const t = String(m[sleutel] || '').trim();
    return t ? `${veilig(t)} ${veilig(eenheid)}` : '—';
  };
  const toelichting = String(rapport.accuToelichting || '').trim();

  return `<section class="mr-blad">
    ${bladkop(rapport, soortNaam)}
    <div class="mr-titelblok">
      <div class="mr-velden">
        ${veld('Klant', rapport.klant)}
        ${veld('Datum', rapport.datum ? datumNl(rapport.datum) : '')}
        ${veld('Auto', rapport.auto)}
        ${veld('Accu', rapport.accu?.type)}
      </div>
      ${plaat(rapport.kenteken, rapport.bouwjaar)}
    </div>

    <h2 class="mr-h">Gemeten aan je accu</h2>
    <p class="mr-uitleg">Drie metingen, voor en na het werk: wat je accu levert in rust, wat er
      overblijft terwijl je systeem speelt, en waarmee de motor hem oplaadt. De middelste is de
      belangrijkste — zakt die te ver weg, dan hoor je dat als slappe bas en zie je het als
      dimmende lichten.</p>
    <table class="mr-tabel mr-meet">
      <thead><tr><th>Meting</th><th>Voor</th><th>Na</th></tr></thead>
      <tbody>${ACCU_METINGEN.map((r) => `<tr>
        <td>${veilig(r.naam)}<span class="mr-klein">${veilig(r.uitleg)}</span></td>
        <td>${waarde(`${r.id}Voor`, r.eenheid)}</td>
        <td><strong>${waarde(`${r.id}Na`, r.eenheid)}</strong></td>
      </tr>`).join('')}</tbody>
    </table>

    ${toelichting ? `<h2 class="mr-h">Wat dat betekent</h2><p class="mr-uitleg">${veilig(toelichting)}</p>` : ''}

    <div class="mr-handtekening">
      <div class="mr-streep"></div>
      <strong>${veilig(SITE.eigenaar)}</strong>
      <span>${veilig(SITE.eigenaarRol)}</span>
    </div>
    ${bladvoet(nr, totaal)}
  </section>`;
}

/** Het laatste blad: hoe je het zo houdt, en hoe je ons bereikt. */
function bladNazorg(rapport, soortNaam, nr, totaal, qr) {
  const tips = rapport.soort === 'accu' ? NAZORG_TIPS.slice(2) : NAZORG_TIPS;
  /**
   * Het kenteken zit in het bericht. Scant de klant de code, dan staat er al
   * in zijn WhatsApp om welke auto het gaat — dan hoeft hij dat niet uit te
   * leggen en hoeft Justus het niet te vragen.
   */
  const link = whatsappLink(
    `ik heb een vraag over mijn installatie${rapport.kenteken ? ` (${formatteerKenteken(rapport.kenteken, rapport.bouwjaar)})` : ''}.`
  );
  /* Zwart op wit, want een QR-code moet contrast hebben. Oranje modules scannen
     op papier een stuk slechter. */
  const code = qr || qrSvg(link, { kleur: LICHT.text, titel: 'Stuur een WhatsApp naar Audio Upgrade Emmen' });

  return `<section class="mr-blad">
    ${bladkop(rapport, soortNaam)}
    <h2 class="mr-h">Zo houd je het zo</h2>
    <ol class="mr-tips">${tips.map((t) => `<li>${veilig(t)}</li>`).join('')}</ol>

    <h2 class="mr-h">Jouw gegevens</h2>
    <div class="mr-velden mr-velden-breed">
      ${NAZORG_VELDEN.map((v) => veld(v.naam, rapport.nazorg?.[v.id])).join('')}
    </div>

    <div class="mr-contact">
      <div>
        <h2 class="mr-h">Vragen? App gerust.</h2>
        <p class="mr-uitleg">Een berichtje is sneller dan bellen, en je kunt er meteen een foto of een filmpje van het geluid bij doen.</p>
        <div class="mr-velden">
          ${veld('WhatsApp en telefoon', SITE.phoneDisplay)}
          ${veld('E-mail', SITE.email)}
          ${veld('Werkplaats', `${SITE.street}, ${SITE.postalCode} ${SITE.city}`)}
        </div>
        <p class="mr-klein-los">Uitsluitend op afspraak. Bel even voor het hek.</p>
      </div>
      <div class="mr-qr">
        ${code}
        <span>Scan met je camera<br />en stel je vraag</span>
      </div>
    </div>
    ${bladvoet(nr, totaal)}
  </section>`;
}

/**
 * Het hele rapport als html.
 *
 * Levert de bladen op — geen <html> eromheen. De app zet ze in een blok dat
 * alleen bij het afdrukken zichtbaar is, zodat de opmaak en de letters van de
 * app gewoon meedoen en er niets apart geladen hoeft te worden.
 *
 * `qr` overschrijft de WhatsApp-code. Normaal rekent het rapport hem zelf uit;
 * dat is alleen anders als je hem in een test wilt vastzetten.
 */
export function meetrapportHtml(rapport = {}, { qr = '' } = {}) {
  const soort = rapport.soort === 'accu' ? 'accu' : 'geluid';
  const soortNaam = (RAPPORT_SOORTEN.find((r) => r.id === soort) || RAPPORT_SOORTEN[0]).kop;
  const heeftFase = !!(rapport.faseVoor || rapport.faseNa);

  /* Eerst tellen hoeveel bladen het worden, want dat staat onderaan elk blad.
     Anders staat er op blad 1 al "1 / 3" terwijl het er vier zijn geworden. */
  const bladen = soort === 'accu' ? ['accu', 'nazorg'] : ['samenvatting', 'respons', ...(heeftFase ? ['fase'] : []), 'nazorg'];
  const totaal = bladen.length;

  const tekenaars = {
    samenvatting: bladSamenvatting,
    respons: bladRespons,
    fase: bladFase,
    accu: bladAccu,
    nazorg: (r, s, n, t) => bladNazorg(r, s, n, t, qr),
  };

  return bladen
    .map((naam, i) => tekenaars[naam](rapport, soortNaam, i + 1, totaal))
    .join('\n');
}

export default meetrapportHtml;

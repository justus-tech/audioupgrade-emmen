/**
 * DE KLANTENLIJST — elke klant met zijn offertes en bedradingsplannen.
 *
 * WAAROM AFGELEID EN NIET APART BIJGEHOUDEN
 * Op elke offerte staan de naam, het telefoonnummer, het e-mailadres en het
 * adres van de klant al. Een losse klantenlijst daarnaast zou betekenen dat
 * je alles twee keer invult, en dat die twee uit elkaar gaan lopen zodra je
 * er één bijwerkt. Daarom bouwt deze lijst zich op uit de offertes zelf: één
 * bron, en een nieuwe offerte staat meteen bij de juiste klant.
 *
 * WIE IS DEZELFDE KLANT
 * Een telefoonnummer of e-mailadres is het zekerst: daar verschijnt geen
 * tweede "Henk" mee. Pas als die er niet zijn, telt de naam. Offertes die op
 * één van die punten overeenkomen, horen bij elkaar — ook via een derde: heeft
 * offerte A het nummer van B, en B het e-mailadres van C, dan zijn het er drie
 * van één klant.
 */
import { totalen, STANDAARD_INSTELLINGEN } from './rekenen.js';

/**
 * 06-12345678, +31 6 1234 5678 en 0031612345678 zijn hetzelfde nummer.
 *
 * WAAROM HIER NIET DE LAATSTE NEGEN CIJFERS STAAN
 * Dat stond er eerst, en voor Nederlandse nummers klopt het: na de nul zijn
 * dat er precies negen. Maar Emmen ligt een kwartier van de grens en de site
 * staat ook in het Duits. Een Duits mobiel nummer is langer: een netprefix
 * van drie cijfers (151, 160, 171, 176) en daarachter acht cijfers. Van
 * +49 151 23456789 blijven als laatste negen alleen "123456789" over — de
 * prefix valt eraf. +49 171 23456789 geeft dan hetzelfde, en twee
 * verschillende Duitse klanten werden één.
 *
 * Nagespeeld met vijf Duitse nummers: er bleven drie klanten over in plaats
 * van vijf, en bij de samengevoegde klant stond de omzet van drie mensen
 * opgeteld, met de naam en het nummer van de laatste.
 *
 * Daarom vergelijken we nu het hele nummer inclusief landnummer.
 */
export function kaalNummer(telefoon) {
  const rauw = String(telefoon || '');
  const cijfers = rauw.replace(/[^0-9]/g, '');
  if (cijfers.length < 9) return '';
  /* Internationaal genoteerd: wat er staat is landnummer + nummer. */
  if (rauw.trim().startsWith('+')) return cijfers;
  if (cijfers.startsWith('00')) return cijfers.slice(2);
  /* Nationaal genoteerd. De nul vooraan hoort bij het kengetal en niet bij
     het nummer zelf, dus die gaat eraf. */
  const zonderNul = cijfers.startsWith('0') ? cijfers.slice(1) : cijfers;
  /* Negen cijfers na de nul is een Nederlands nummer. Dan weten we het
     landnummer, en matcht 06-… met +31 6…. Is het langer, dan is het geen
     Nederlands nummer en laten we het staan zoals het getypt is: gokken op
     een land levert juist weer verkeerde paren op. Gevolg is dat iemand die
     zijn Duitse nummer de ene keer als 0151… en de andere keer als +49 151…
     opgeeft, twee keer in de lijst staat. Dat is hinderlijk, maar het is de
     veilige kant: twee keer dezelfde klant zie je en kun je rechtzetten,
     twee klanten in één verbergt er een. */
  return zonderNul.length === 9 ? `31${zonderNul}` : zonderNul;
}

const kaal = (t) => String(t || '').trim().toLowerCase().replace(/\s+/g, ' ');

/** De sleutels waaraan je een klant herkent, sterkste eerst. */
export function klantSleutels(offerte) {
  const k = offerte?.klant || {};
  const uit = [];
  const nummer = kaalNummer(k.telefoon);
  if (nummer) uit.push(`tel:${nummer}`);
  if (kaal(k.email)) uit.push(`mail:${kaal(k.email)}`);
  /* De naam alleen als er niets beters is. Twee keer "Jan" met een ander
     nummer zijn twee mensen. */
  if (!uit.length) {
    const naam = kaal(k.bedrijf) || kaal(k.naam);
    if (naam) uit.push(`naam:${naam}`);
  }
  return uit;
}

/**
 * Alle klanten uit een lijst offertes, de laatst actieve bovenaan.
 *
 * Contactgegevens komen van de nieuwste offerte waar ze op staan: een nieuw
 * telefoonnummer gaat dan voor een oud.
 */
export function klantenUit(offertes = [], eigen = {}) {
  /* Ontbreekt er een instelling, dan de standaard: anders rekent de btw met
     niets en is de omzet nul. */
  const instellingen = { ...STANDAARD_INSTELLINGEN, ...eigen };
  const lijst = (Array.isArray(offertes) ? offertes : []).filter((o) => klantSleutels(o).length);
  /* Samenvoegen met een eenvoudige unie-zoek: elke sleutel wijst naar een
     groep, en groepen die een sleutel delen worden één. */
  const ouder = lijst.map((_, i) => i);
  const wortel = (i) => (ouder[i] === i ? i : (ouder[i] = wortel(ouder[i])));
  const vanSleutel = new Map();
  lijst.forEach((o, i) => {
    for (const s of klantSleutels(o)) {
      if (vanSleutel.has(s)) ouder[wortel(i)] = wortel(vanSleutel.get(s));
      else vanSleutel.set(s, i);
    }
  });

  const groepen = new Map();
  lijst.forEach((o, i) => {
    const w = wortel(i);
    if (!groepen.has(w)) groepen.set(w, []);
    groepen.get(w).push(o);
  });

  const tijd = (o) => new Date(o.datum || 0).getTime() || 0;
  return [...groepen.values()].map((groep) => {
    const nieuwste = [...groep].sort((a, b) => tijd(b) - tijd(a));
    const eerste = (veld) => nieuwste.map((o) => o.klant?.[veld]).find((v) => String(v || '').trim()) || '';
    const autos = new Map();
    for (const o of nieuwste) {
      const plaat = String(o.auto?.kenteken || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      const naam = [o.auto?.merk, o.auto?.model].filter(Boolean).join(' ');
      const sleutel = plaat || naam;
      if (sleutel && !autos.has(sleutel)) autos.set(sleutel, { kenteken: plaat, naam });
    }
    const omzetCent = nieuwste
      .filter((o) => ['aanbetaald', 'gefactureerd', 'betaald'].includes(o.status))
      .reduce((s, o) => s + totalen(o.regels || [], instellingen, o.kortingExclCent || 0).inclCent, 0);
    return {
      /* De sterkste sleutel van de nieuwste offerte: verandert niet als je
         de lijst opnieuw opbouwt, dus bruikbaar om een klant vast te houden. */
      id: klantSleutels(nieuwste[0])[0],
      sleutels: [...new Set(groep.flatMap(klantSleutels))],
      naam: eerste('naam'),
      bedrijf: eerste('bedrijf'),
      telefoon: eerste('telefoon'),
      email: eerste('email'),
      adres: eerste('adres'),
      zakelijk: nieuwste.some((o) => o.zakelijk),
      autos: [...autos.values()],
      offertes: nieuwste,
      laatst: nieuwste[0].datum,
      omzetCent,
    };
  }).sort((a, b) => new Date(b.laatst || 0) - new Date(a.laatst || 0));
}

/** Past deze klant bij wat je in het zoekveld tikt? */
export function klantPast(klant, zoek) {
  const z = kaal(zoek);
  if (!z) return true;
  const hooiberg = [
    klant.naam, klant.bedrijf, klant.email, klant.telefoon, klant.adres,
    ...klant.autos.flatMap((a) => [a.kenteken, a.naam]),
    ...klant.offertes.map((o) => o.nummer),
  ].filter(Boolean).join(' ').toLowerCase();
  const nummer = kaalNummer(zoek);
  const kaalZoek = z.replace(/[^a-z0-9]/g, '');
  return hooiberg.includes(z) || (kaalZoek && hooiberg.replace(/[^a-z0-9]/g, '').includes(kaalZoek))
    || (nummer && kaalNummer(klant.telefoon) === nummer);
}

/** Zoek de klant terug op een van zijn sleutels. */
export function zoekKlant(klanten, id) {
  return klanten.find((k) => k.id === id || k.sleutels.includes(id)) || null;
}

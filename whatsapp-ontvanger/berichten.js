/**
 * WHATSAPP-BERICHTEN UIT EEN MELDING VAN 360DIALOG HALEN.
 *
 * WAT HIER GEBEURT
 * Stuurt een klant je een WhatsApp, dan meldt 360dialog dat aan de ontvanger
 * (worker.js) met een blok JSON in het formaat van Meta. Daar zit veel meer in
 * dan we nodig hebben: leesbevestigingen, afleverstatussen, technische ids.
 * Deze functie haalt er alleen de berichten zelf uit, platgeslagen tot één
 * regel per bericht.
 *
 * DRIE SOORTEN BERICHTEN
 *   messages         Wat een klant jou stuurt.
 *   message_echoes   Wat jij vanuit de WhatsApp Business-app op je telefoon
 *                    terugstuurt. Die komen alleen mee omdat je nummer zowel in
 *                    de app als aan de koppeling hangt. Zo weten we ook wat jij
 *                    al hebt toegezegd.
 *   history          De oude gesprekken die WhatsApp één keer meestuurt als je
 *                    het nummer aansluit (hoogstens een half jaar terug).
 *
 * Let op: dit zijn ALLE één-op-één-gesprekken op het zakelijke nummer, dus ook
 * met leveranciers, vrienden of familie die dat nummer gebruiken. Groepen
 * komen niet mee.
 *
 * Alles hier is los te testen zonder Cloudflare; zie tests/whatsapp.test.js.
 */

/** Alleen de cijfers van een telefoonnummer: "+31 6-12" wordt "31612". */
export function cijfers(nummer) {
  return String(nummer ?? '').replace(/[^0-9]/g, '');
}

/**
 * Wie de klant is, als veilige naam voor een bestand.
 *
 * Meestal is dat het telefoonnummer. Stuurt WhatsApp in de toekomst alleen een
 * gebruikers-id (zonder nummer), dan nemen we dat. Er blijven alleen letters,
 * cijfers, - en _ over, zodat het nooit een pad naar een andere map wordt.
 */
export function klantId(waarde) {
  const tekst = String(waarde ?? '');
  if (/^[\d\s+()-]+$/.test(tekst)) return cijfers(tekst).slice(0, 64);
  return tekst.replace(/[^0-9A-Za-z_-]/g, '').slice(0, 64);
}

/** Hoe lang een tekst mag zijn voordat we hem afkappen. Een roman past niet in een offerte. */
const MAX_TEKST = 4000;

/** Soorten berichten met een bestand eraan, en hoe we ze in de tekst noemen. */
const MEDIA = {
  image: 'foto',
  video: 'video',
  audio: 'spraakbericht',
  voice: 'spraakbericht',
  document: 'document',
  sticker: 'sticker',
};

/** Van één bericht een leesbare tekst maken, ook als het geen tekst is. */
export function tekstVan(m) {
  const soort = m?.type ?? 'onbekend';
  let tekst;
  if (soort === 'text') {
    tekst = m.text?.body ?? '';
  } else if (MEDIA[soort]) {
    const bijlage = m[soort] ?? {};
    const naam = soort === 'document' && bijlage.filename ? ` ${bijlage.filename}` : '';
    const onderschrift = bijlage.caption ? ` ${bijlage.caption}` : '';
    tekst = `[${MEDIA[soort]}${naam}]${onderschrift}`;
  } else if (soort === 'location') {
    const l = m.location ?? {};
    tekst = `[locatie ${l.name ?? ''} ${l.latitude ?? ''},${l.longitude ?? ''}]`.replace(/\s+/g, ' ');
  } else if (soort === 'button') {
    tekst = m.button?.text ?? '[knop]';
  } else if (soort === 'interactive') {
    const i = m.interactive ?? {};
    tekst = i.button_reply?.title ?? i.list_reply?.title ?? '[keuze]';
  } else if (soort === 'reaction') {
    tekst = `[reactie ${m.reaction?.emoji ?? ''}]`.replace(' ]', ']');
  } else if (soort === 'contacts') {
    tekst = '[contactkaart]';
  } else {
    tekst = `[${soort}]`;
  }
  return tekst.length > MAX_TEKST ? `${tekst.slice(0, MAX_TEKST)} […]` : tekst;
}

/** Eén bericht in de vorm waarin we het bewaren. */
function bericht(m, richting, klant, namen) {
  const soort = m?.type ?? 'onbekend';
  return {
    id: String(m?.id ?? ''),
    richting,
    klant,
    naam: namen.get(klant) ?? '',
    tijd: Number(m?.timestamp) || 0,
    soort,
    tekst: tekstVan(m),
    mediaId: MEDIA[soort] ? String(m[soort]?.id ?? '') : '',
  };
}

/**
 * Alle berichten uit één melding.
 *
 * `richting` is "in" voor wat de klant stuurt en "uit" voor wat jij stuurt.
 * `klant` is altijd het nummer van de klant, ook bij berichten van jou, zodat
 * een heel gesprek onder één nummer bij elkaar staat.
 *
 * Een bericht zonder id of zonder klantnummer laten we vallen: dat kunnen we
 * niet aan een gesprek koppelen en ook niet tegen dubbel opslaan beschermen.
 */
export function berichtenUit(melding) {
  const uit = [];
  for (const entry of melding?.entry ?? []) {
    for (const change of entry?.changes ?? []) {
      const v = change?.value ?? {};
      const eigenNummer = cijfers(v.metadata?.display_phone_number);
      const namen = new Map(
        (v.contacts ?? []).map((c) => [klantId(c.wa_id ?? c.user_id), c.profile?.name ?? '']),
      );

      for (const m of v.messages ?? []) {
        uit.push(bericht(m, 'in', klantId(m.from ?? m.from_user_id), namen));
      }
      for (const m of v.message_echoes ?? []) {
        uit.push(bericht(m, 'uit', klantId(m.to ?? m.to_user_id), namen));
      }
      for (const deel of v.history ?? []) {
        for (const draad of deel?.threads ?? []) {
          for (const m of draad?.messages ?? []) {
            const vanMij = eigenNummer !== '' && cijfers(m.from) === eigenNummer;
            const klant = klantId(draad.id) || klantId(vanMij ? m.to : m.from);
            uit.push(bericht(m, vanMij ? 'uit' : 'in', klant, namen));
          }
        }
      }
    }
  }
  return uit.filter((b) => b.id !== '' && b.klant !== '');
}

/**
 * Is een bericht al ouder dan de bewaartermijn?
 *
 * We rekenen vanaf het moment dat het bericht verstuurd is, niet vanaf wanneer
 * het hier binnenkwam. Anders zou een bericht van een half jaar oud dat bij het
 * aansluiten meekomt nog eens 90 dagen blijven staan. Een bericht zonder tijd
 * (0) telt hier niet als oud; dat ruimt de ontvanger op na 90 dagen binnen.
 */
export function teOud(tijdSeconden, nuMs, dagen) {
  return tijdSeconden > 0 && tijdSeconden * 1000 < nuMs - dagen * 24 * 60 * 60 * 1000;
}

/** De bewaartermijn in dagen, uit de instelling BEWAAR_DAGEN. Minstens 1, standaard 90. */
export function bewaarDagen(waarde) {
  return Math.max(1, Number(waarde) || 90);
}

/**
 * Van de ruwe tekst van een melding naar de berichten die bewaard moeten worden.
 * Onleesbare meldingen en berichten die al te oud zijn vallen eruit.
 */
export function teBewaren(ruweTekst, nuMs, dagen) {
  let melding;
  try {
    melding = JSON.parse(ruweTekst);
  } catch {
    return [];
  }
  return berichtenUit(melding).filter((b) => !teOud(b.tijd, nuMs, dagen));
}

/**
 * Klopt de meegestuurde sleutel?
 *
 * We vergelijken altijd het hele stuk, ook als het eerste teken al fout is.
 * Anders kan iemand aan de reactietijd afmeten hoeveel tekens hij goed heeft.
 * Is er geen sleutel ingesteld, dan komt niemand erin: liever dicht dan open.
 */
export function sleutelKlopt(gegeven, verwacht) {
  if (!verwacht || typeof gegeven !== 'string') return false;
  const a = new TextEncoder().encode(gegeven);
  const b = new TextEncoder().encode(verwacht);
  let verschil = a.length ^ b.length;
  for (let i = 0; i < b.length; i++) verschil |= (a[i] ?? 0) ^ b[i];
  return verschil === 0;
}

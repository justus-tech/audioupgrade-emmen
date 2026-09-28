/**
 * DE WHATSAPP-ONTVANGER — berichten uit een melding halen en netjes opschrijven.
 *
 * 360dialog stuurt meldingen in het formaat van Meta. Deze tests bewaken dat we
 * daar precies de berichten uithalen (van de klant én van Justus zelf), dat
 * statusmeldingen niet als bericht meetellen, en dat een verkeerde sleutel
 * nooit binnenkomt.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { berichtenUit, sleutelKlopt, tekstVan, cijfers } from '../whatsapp-ontvanger/berichten.js';
import { regelVoor, perKlant, tijdstip, snoei } from '../scripts/whatsapp-berichten.mjs';

const EIGEN = '31644379844';
const KLANT = '31612345678';

const melding = (value) => ({
  object: 'whatsapp_business_account',
  entry: [{ id: 'waba', changes: [{ field: 'messages', value: {
    messaging_product: 'whatsapp',
    metadata: { display_phone_number: '+31 6 44 37 98 44', phone_number_id: '1' },
    ...value,
  } }] }],
});

describe('berichten uit een melding halen', () => {
  test('een tekstbericht van een klant, met zijn naam', () => {
    const [b, ...rest] = berichtenUit(melding({
      contacts: [{ wa_id: KLANT, profile: { name: 'Tonnie' } }],
      messages: [{ from: KLANT, id: 'wamid.1', timestamp: '1790000000', type: 'text',
        text: { body: 'Kan de sub ook onder de kofferbakmat?' } }],
    }));
    assert.equal(rest.length, 0);
    assert.deepEqual(b, {
      id: 'wamid.1', richting: 'in', klant: KLANT, naam: 'Tonnie', tijd: 1790000000,
      soort: 'text', tekst: 'Kan de sub ook onder de kofferbakmat?', mediaId: '',
    });
  });

  test('wat Justus vanuit de app stuurt, komt onder het nummer van de klant', () => {
    const [b] = berichtenUit(melding({
      message_echoes: [{ from: EIGEN, to: KLANT, id: 'wamid.2', timestamp: '1790000100',
        type: 'text', text: { body: 'Ja, dat kan.' } }],
    }));
    assert.equal(b.richting, 'uit');
    assert.equal(b.klant, KLANT);
  });

  test('een foto met onderschrift wordt leesbaar, met het id van de foto erbij', () => {
    const [b] = berichtenUit(melding({
      messages: [{ from: KLANT, id: 'wamid.3', timestamp: '1', type: 'image',
        image: { id: 'media-9', caption: 'mijn dashboard' } }],
    }));
    assert.equal(b.tekst, '[foto] mijn dashboard');
    assert.equal(b.mediaId, 'media-9');
  });

  test('de geschiedenis bij het aansluiten: beide kanten van het gesprek', () => {
    const lijst = berichtenUit(melding({
      history: [{ threads: [{ id: KLANT, messages: [
        { from: KLANT, id: 'h1', timestamp: '10', type: 'text', text: { body: 'Hoi' } },
        { from: EIGEN, to: KLANT, id: 'h2', timestamp: '20', type: 'text', text: { body: 'Hoi!' } },
      ] }] }],
    }));
    assert.deepEqual(lijst.map((b) => [b.id, b.richting, b.klant]), [
      ['h1', 'in', KLANT], ['h2', 'uit', KLANT],
    ]);
  });

  test('leesbevestigingen en afleverstatussen zijn geen berichten', () => {
    assert.deepEqual(berichtenUit(melding({
      statuses: [{ id: 'wamid.1', status: 'read', recipient_id: KLANT }],
    })), []);
  });

  test('rommel of een lege melding breekt niets', () => {
    assert.deepEqual(berichtenUit(null), []);
    assert.deepEqual(berichtenUit({ entry: [{}] }), []);
    assert.deepEqual(berichtenUit(melding({ messages: [{ type: 'text' }] })), []);
  });

  test('andere soorten berichten krijgen een herkenbare tekst', () => {
    assert.equal(tekstVan({ type: 'audio', audio: { id: 'x' } }), '[spraakbericht]');
    assert.equal(tekstVan({ type: 'document', document: { filename: 'factuur.pdf' } }), '[document factuur.pdf]');
    assert.equal(tekstVan({ type: 'reaction', reaction: { emoji: '👍' } }), '[reactie 👍]');
    assert.equal(tekstVan({ type: 'iets_nieuws' }), '[iets_nieuws]');
    assert.ok(tekstVan({ type: 'text', text: { body: 'a'.repeat(5000) } }).endsWith('[…]'));
  });

  test('telefoonnummers worden alleen cijfers', () => {
    assert.equal(cijfers('+31 6-44 37 98 44'), EIGEN);
    assert.equal(cijfers(undefined), '');
  });
});

describe('de sleutel', () => {
  test('alleen precies de goede sleutel komt erin', () => {
    assert.equal(sleutelKlopt('geheim123', 'geheim123'), true);
    assert.equal(sleutelKlopt('geheim124', 'geheim123'), false);
    assert.equal(sleutelKlopt('geheim12', 'geheim123'), false);
    assert.equal(sleutelKlopt('geheim1234', 'geheim123'), false);
    assert.equal(sleutelKlopt(null, 'geheim123'), false);
  });

  test('zonder ingestelde sleutel komt niemand erin, ook niet met een lege', () => {
    assert.equal(sleutelKlopt('', undefined), false);
    assert.equal(sleutelKlopt('', ''), false);
  });
});

describe('het gesprek opschrijven', () => {
  test('tijd in Nederlandse tijd, zoals in een WhatsApp-export', () => {
    // 1 juli 2026 12:00 UTC is 14:00 zomertijd in Emmen.
    assert.equal(tijdstip(Date.UTC(2026, 6, 1, 12, 0) / 1000), '01-07-2026 14:00');
  });

  test('een regel van de klant en een van Justus', () => {
    const t = Date.UTC(2026, 6, 1, 12, 0) / 1000;
    assert.equal(regelVoor({ richting: 'in', naam: 'Tonnie', klant: KLANT, tijd: t, tekst: 'Hoi' }),
      '[01-07-2026 14:00] Tonnie: Hoi');
    assert.equal(regelVoor({ richting: 'uit', naam: '', klant: KLANT, tijd: t, tekst: 'Hoi!' }),
      '[01-07-2026 14:00] Justus: Hoi!');
    assert.equal(regelVoor({ richting: 'in', naam: '', klant: KLANT, tijd: t, tekst: '?' }),
      `[01-07-2026 14:00] +${KLANT}: ?`);
  });

  test('per klant bij elkaar en op volgorde van versturen', () => {
    const k = perKlant([
      { klant: 'A', richting: 'in', naam: 'An', tijd: 30, tekst: '3' },
      { klant: 'B', richting: 'in', naam: '', tijd: 5, tekst: 'x' },
      { klant: 'A', richting: 'uit', naam: '', tijd: 10, tekst: '1' },
    ]);
    assert.deepEqual([...k.keys()], ['A', 'B']);
    assert.equal(k.get('A').naam, 'An');
    assert.deepEqual(k.get('A').berichten.map((b) => b.tekst), ['1', '3']);
  });
});

describe('de bewaartermijn van de kopieën', () => {
  const kop = '# WhatsApp-gesprek met Tonnie (+31612345678)\n\nUitleg.\n\n';
  const grens = Date.UTC(2026, 6, 1) / 1000;

  test('oude berichten gaan eruit, de kop en nieuwe berichten blijven', () => {
    const inhoud = `${kop}[30-06-2026 23:00] Tonnie: oud\n[01-07-2026 09:00] Justus: nieuw\n`;
    assert.equal(snoei(inhoud, grens), `${kop}[01-07-2026 09:00] Justus: nieuw\n`);
  });

  test('een bericht over meer regels gaat in zijn geheel weg of blijft in zijn geheel', () => {
    const inhoud = `${kop}[01-06-2026 10:00] Tonnie: regel 1\nregel 2\n[02-07-2026 10:00] Tonnie: a\nb\n`;
    assert.equal(snoei(inhoud, grens), `${kop}[02-07-2026 10:00] Tonnie: a\nb\n`);
  });

  test('blijft er niets over, dan kan het hele gesprek weg', () => {
    assert.equal(snoei(`${kop}[01-01-2026 10:00] Tonnie: oud\n`, grens), null);
  });

  test('niets te oud: het gesprek blijft precies hetzelfde', () => {
    const inhoud = `${kop}[05-07-2026 10:00] Tonnie: hoi\n`;
    assert.equal(snoei(inhoud, grens), inhoud);
  });
});

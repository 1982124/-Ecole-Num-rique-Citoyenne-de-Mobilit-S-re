'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

const glossarySource = fs.readFileSync(path.join(root, 'public/bamanankan-glossary.js'), 'utf8');
const campaignSource = fs.readFileSync(path.join(root, 'public/safe-mobility-campaigns.js'), 'utf8');

// La voix Bamanankan reste bloquée tant qu'une validation humaine de prononciation n'a pas été réalisée.
assert.match(campaignSource, /function speak\(s\)\{if\(lang!==\x27fr\x27\)return;/u, 'La synthèse vocale doit refuser toute lecture lorsque la langue active est Bamanankan.');
assert.match(campaignSource, /lang=\x27fr-FR\x27/u, 'La synthèse vocale autorisée doit être explicitement française.');
assert.match(campaignSource, /Lecture vocale Bamanankan temporairement désactivée/u, 'L’interface doit expliquer pourquoi la voix Bamanankan est indisponible.');
assert.doesNotMatch(campaignSource, /u\.lang=lang===\x27fr\x27\?\x27fr-FR\x27:\x27bm\x27/u, 'Aucune voix TTS bm ne doit être assignée.');

// Execute the glossary data definition without mounting its UI.
const document = {
  readyState: 'loading',
  querySelector: () => null,
  addEventListener: () => {}
};
const window = {};
vm.runInNewContext(glossarySource, { window, document }, { filename: 'public/bamanankan-glossary.js' });
const terms = window.MBK_BAMANANKAN_TERMS;
assert.ok(Array.isArray(terms), 'Le lexique doit exposer MBK_BAMANANKAN_TERMS.');
assert.ok(terms.length > 0, 'Le lexique Bamanankan ne doit pas être vide.');
assert.equal(new Set(terms.map((term) => term.id)).size, terms.length, 'Chaque terme du lexique doit avoir un identifiant unique.');

for (const term of terms) {
  assert.ok(term.id && term.fr && term.status, 'Chaque entrée doit avoir un identifiant, un libellé français et un statut.');
  assert.ok(['attested', 'pending'].includes(term.status), 'Statut linguistique non reconnu : ' + term.id);
  assert.ok(term.source, 'Chaque entrée doit conserver sa référence : ' + term.id);
  if (term.status === 'attested') {
    assert.ok(term.bm && term.bm.trim(), 'Une forme attestée doit avoir une traduction : ' + term.id);
  }
  if (term.status === 'pending') {
    assert.equal(term.bm, '', 'Un terme en attente ne doit pas afficher une traduction non validée : ' + term.id);
  }
}

// Protect the existing bilingual campaign module without assuming that device
// speech synthesis supports Bamanankan. Voice playback is deliberately not tested.
assert.match(campaignSource, /fr:\{/u, 'Les textes français des campagnes doivent rester présents.');
assert.match(campaignSource, /bm:\{/u, 'Les textes Bamanankan des campagnes doivent rester présents.');
assert.match(campaignSource, /lang==='fr'\s*\?\s*0\s*:\s*1/u, 'Le parcours doit conserver son choix de langue.');
const bmBlock = campaignSource.match(/bm:\{([\s\S]*?)\n\};/u);
assert.ok(bmBlock, 'Le bloc de traduction Bamanankan doit être identifiable.');
const bmLabels = [...bmBlock[1].matchAll(/([A-Za-z][A-Za-z0-9]*):'([^']*)'/gu)];
assert.ok(bmLabels.length >= 20, 'Le bloc Bamanankan doit conserver au moins 20 libellés traduits.');
assert.ok(bmLabels.every(([, , value]) => value.trim().length > 0), 'Aucun libellé Bamanankan ne doit être vide.');
assert.match(bmBlock[1], /[ɛɔɲŋɔ̀ɔ́ɛ̀ɛ́]/u, 'Les caractères spécifiques du Bamanankan doivent être préservés.');

console.log('Contrôles Bamanankan réussis : ' + terms.length + ' entrées de lexique, ' +
  terms.filter((term) => term.status === 'attested').length + ' formes attestées, ' +
  terms.filter((term) => term.status === 'pending').length + ' termes en attente, ' +
  bmLabels.length + ' libellés de campagne. Aucun test vocal n’est imposé.');

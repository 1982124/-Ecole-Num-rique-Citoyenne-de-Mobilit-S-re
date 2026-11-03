# Journal des lots de travail — suivi des issues

> Journal de gouvernance conforme au plan CTO (`docs/PLAN-CTO-QUALITE-ET-ROADMAP.md`). Une ligne par lot ; une PR = un lot cohérent ; aucune fusion sans CI verte, diff relu et décision explicite.

| Lot | Issue | Intitulé | Branche / PR | État | Décision CTO | Date |
|---|---|---|---|---|---|---|
| 1 — Données nationales (profil Mali, sources officielles, constats OMS vérifiés sur afro.who.int le 3 nov. 2026, galerie Bamako) | #18 | Intégration chirurgicale des données du site de référence | `feat/profil-national-sources-oms-galerie` → fusion squash `d3fdad1` | ✅ Fusionné | Fusions des PR #3 et #11 écartées (conflits irrésolubles sur index.html/immersive-courses.js) au profit d'un lot chirurgical autonome ; ANASER 2025 rejeté faute de source primaire ; PR #3 et #11 clôturées comme obsolètes | 3 nov. 2026 |
| 2 — Accueil dynamique : progression recalculée après chaque réponse | #19 | DOM stats, event-bus `mbk:progress-updated`, persistance immersive, remplacement de la couture Strangler Fig | à créer | ⏳ À faire | Refactoring de `index.html` à faire depuis un clone local (risque de corruption via API GitHub démontré) ; découpage en sous-lots ; TDD statique | 3 nov. 2026 (issue ouverte) |
| 3 — Relecture linguistique Bamanankan/Peul | #20 | Glossaire avant quiz ; statuts draft→reviewed→validated ; tons ɛ/ɔ/ɲ/ŋ protégés | PR #12 (draft) conservée en attente | ⏳ À faire | Exige relecture humaine par locuteurs compétents ; Peul = lot distinct ; aucune traduction automatique publiée | 3 nov. 2026 (issue ouverte) |
| 4 — Test manuel PWA, mobile et hors ligne | #21 | Procédure à cocher dans `docs/TEST-MANUEL-PWA.md` ; archive datée par release | cette PR | ⏳ À faire | Procédure gratuite et traçable ; blocage de release en cas d'échec ; vigilance sur la propagation du SW v12 et les limites hors ligne de la galerie | 3 nov. 2026 (issue ouverte) |

## Historique des branches et PR

| Branche | PR | Statut | Note de gouvernance |
|---|---|---|---|
| `feat/sources-officielles-mali` | #3 | Clôturée | Contenu (sources officielles, galerie) intégré par la PR #18 ; branche conservée comme référence |
| `feat/oms-resultats-sur-home` | #11 | Clôturée | Données (OMS, profil national, sources) intégrées par la PR #18 ; tableau de progression reporté au Lot 2 (issue #19) ; branche conservée comme référence |
| `feat/multilingual-quiz-translations` | #12 | Ouverte (draft) | Brouillons de traduction Bambara/Peul — relecture humaine obligatoire avant fusion (Lot 3, issue #20) ; ne pas fusionner tel quel |
| `feat/oms-resultats-merge-manuel` | — | Abandonnée | Branche de fusion manuelle abandonnée après l'échec de la mise à jour automatique ; aucun contenu unique, à supprimer lors d'un nettoyage |
| `feat/profil-national-sources-oms-galerie` | #18 | Fusionnée | Lot 1 des données nationales ; cache SW v12 ; contrôles qualité étendus ; CI verte |
| `docs/test-manuel-pwa-journal-lots` | (cette PR) | — | Procédure de test manuel PWA et journal de gouvernance des lots |

## Règles de mise à jour de ce journal
1. Ajouter une ligne par nouveau lot **avant** d'ouvrir sa PR.
2. Renseigner la décision CTO en une phrase : pourquoi cette option et pas une autre.
3. Mettre à jour l'état à chaque étape (ouverte / CI verte / fusionnée / clôturée).
4. Conserver l'historique complet des branches et PR clôturées — ne jamais réécrire le passé.

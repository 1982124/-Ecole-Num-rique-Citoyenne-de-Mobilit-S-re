# Procédure de test manuel — PWA, mobile et hors ligne

> Procédure d'exécution obligatoire avant chaque release (lot P2 du plan CTO, `docs/PLAN-CTO-QUALITE-ET-ROADMAP.md`). Cocher chaque case, consigner la date, l'appareil, le navigateur et le résultat. Toute case en échec ouvre une issue dédiée et **bloque la release**.

**Application testée :** __________  **Version du cache SW :** __________  **Date :** __________  **Appareil(s) :** __________  **Navigateur(s) :** __________  **Testeur :** __________

## A. Première visite en ligne
- [ ] La page d'accueil charge sans erreur JavaScript (console ouverte, aucun log d'erreur bloquant).
- [ ] Le nom affiché est exactement « Mali BOLIFEN KALANSO » et « École Numérique Citoyenne pour une Mobilité Sûre » (aucune graphie ancienne).
- [ ] Onglet « Sources officielles » : 5 cartes, liens DGT et SGG fonctionnels, avertissement d'exactitude réglementaire affiché, date de vérification visible.
- [ ] Onglet « Enjeux OMS » : chiffres 225 482 (2021), 19 %, +17 % affichés ; mention « données régionales, pas des statistiques nationales maliennes » ; source afro.who.int cliquable avec date de consultation.
- [ ] Onglet « Immersion à Bamako » : 7 photographies chargées, chaque carte ouvre sa page Wikimedia Commons (auteur et licence).
- [ ] Onglets existants (leçons, quiz, situations, scènes immersives, permis, lexique, campagnes, programmes) tous fonctionnels : aucune régression de navigation.

## B. Installation et hors ligne
- [ ] Installation PWA depuis le navigateur ; l'app s'ouvre en standalone avec l'icône.
- [ ] Fermer tous les onglets de l'app, rouvrir, relancer depuis l'écran d'accueil.
- [ ] **Mode avion** activé **après** une première visite réussie : l'accueil et le parcours pédagogique principal (51 panneaux, quiz, situations, scènes immersives, lexique, permis) restent utilisables.
- [ ] Hors ligne, l'onglet « Enjeux OMS » affiche toujours ses chiffres (module précaché par le service worker).
- [ ] Hors ligne, l'onglet « Immersion à Bamako » ne charge pas les images : conforme au comportement documenté (connexion requise pour les photos, cours essentiels hors ligne).
- [ ] Hors ligne, la lecture vocale reste fonctionnelle **selon les voix réellement installées** sur l'appareil ; repli visible si aucune voix adaptée.

## C. Mise à jour du cache et données locales
- [ ] Revenir en ligne : la mise à jour du service worker (skipWaiting) s'applique après réouverture de l'onglet — **consigner ce délai de propagation dans les résultats**.
- [ ] Après mise à jour du cache : progression, favoris et résultats locaux **intacts** (aucune donnée effacée).
- [ ] Vérifier dans DevTools (Application > Cache Storage) qu'une seule version de cache subsiste après activation de la nouvelle.

## D. Écrans et accessibilité
- [ ] Largeurs 360, 375, 390 px : aucun débordement horizontal sur tous les onglets.
- [ ] Largeurs 768, 1024, 1440 px : grilles correctes (2 colonnes desktop, 1 colonne mobile).
- [ ] Navigation complète au clavier : focus visible sur chaque bouton/lien/onglet, ordre logique, pas de piège clavier.
- [ ] Zoom texte 200 % : contenu lisible sans perte ni chevauchement.
- [ ] `prefers-reduced-motion` activé : animations et transitions désactivées.
- [ ] Lecteur d'écran (au moins un passage) : titres, onglets et alertes annoncés correctement.

## E. Réseau lent et poids
- [ ] Simuler « Slow 3G » : app utilisable, pas d'écran blanc prolongé.
- [ ] Poids initial consigné (DevTools > Network) : __________ Ko transférés.
- [ ] Temps de chargement initial consigné : __________ s.

## F. Résultats
- Cases en échec : __________
- Issues ouvertes : #__________
- Décision : ☐ Release autorisée ☐ Release bloquée
- Commentaires : __________

> Archiver ce document rempli dans `docs/resultats-tests/` avec un nom daté (ex. `2026-11-03-pwa-v12.md`). Ne jamais détruire les résultats précédents.

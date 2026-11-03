# Pipeline de traduction des quiz — BOLIFENKO KALANSO

## État de l'intégration

Le dépôt principal est une PWA statique. Il ne contient actuellement ni client Supabase, ni table SQL configurée, ni serveur applicatif relié à une base. Le pipeline ci-dessous est un outil d'administration exécuté côté serveur/local ; il n'est jamais importé dans le navigateur.

## Installation locale

Node.js 20 ou plus est recommandé. Depuis la racine :

```bash
npm install --save-exact @huggingface/inference@4.13.32 @supabase/supabase-js@2.118.0 dotenv@17.2.3
```

Copier `.env.example` vers `.env`, puis renseigner :
- `HF_ACCESS_TOKEN` : jeton Hugging Face avec accès à l'inférence ;
- `SUPABASE_URL` : URL du projet Supabase ;
- `SUPABASE_SERVICE_ROLE_KEY` : clé serveur uniquement, jamais `NEXT_PUBLIC_*`.

Ne jamais placer ces secrets dans le code source, dans `public/`, dans un commit Git ou dans les variables exposées au navigateur.

## Base de données

Examiner d'abord le schéma existant, puis appliquer la migration
`supabase/migrations/202611030001_quiz_translations.sql` dans le projet Supabase de l'application.

La migration crée le référentiel `quiz_questions` s'il n'existe pas et ajoute `quiz_translations`. Si une table `quiz_questions` existe déjà, comparer ses colonnes/types à la migration avant exécution ; ne pas remplacer une table existante.

RLS est activé. Les utilisateurs publics ne peuvent lire que les questions publiées et les traductions approuvées. Les écritures du pipeline sont faites avec la clé serveur et ne doivent jamais être appelées depuis le navigateur.

## Lancer le pipeline

Aperçu sans écriture (par défaut) :

```bash
node scripts/populate-quiz-translations.mjs --limit=10
```

Une seule question :

```bash
node scripts/populate-quiz-translations.mjs --question-id=1
```

Écriture explicite :

```bash
node scripts/populate-quiz-translations.mjs --question-id=1 --write
node scripts/populate-quiz-translations.mjs --limit=10 --write
```

Le script traduit question, options A-D et explication vers `bam_Latn` et `fuv_Latn`. Les questions sans option D ou explication conservent ces champs à null. Le bon choix reste dans la table source : il n'est ni retraduit ni modifié.

Les traductions déjà marquées `reviewed` ou `approved` ne sont jamais écrasées. Les nouvelles versions sont insérées en `needs_review`. L'upsert est idempotent sur `(question_id, language_code)`.

## Audio et fonctionnement hors ligne

Les champs audio contiennent des chemins relatifs prévus, par exemple :
- `assets/audio/bm/questions/1/question.ogg`
- `assets/audio/ff/questions/1/question.ogg`

Le pipeline ne fabrique pas de fichiers audio. Il faudra enregistrer/produire les fichiers, les déposer dans les assets versionnés ou dans un stockage compatible, puis vérifier leur disponibilité avant d'afficher un bouton audio. Pour le mode hors ligne, les fichiers finaux doivent être inclus dans le cache PWA et leur taille optimisée.

## Contrôle qualité obligatoire

NLLB est un brouillon de traduction, pas un validateur juridique ou linguistique. Avant publication :
1. faire relire chaque question, choix et explication par un locuteur compétent de la variété locale ;
2. faire contrôler le sens par un formateur/conseiller routier malien ;
3. conserver les termes juridiques français de référence entre parenthèses lorsque la traduction est incertaine ;
4. vérifier nombres, unités, priorités, interdictions, catégories de permis et sanctions ;
5. ne passer à `approved` qu'après cette double validation.

Le modèle `facebook/nllb-200-3.3B` peut ne pas être disponible sur le fournisseur d'inférence gratuit à tout moment. Le script remonte alors une erreur explicite ; ne pas remplacer silencieusement le modèle ou la langue.

## Limite d'intégration

Aucun projet Supabase n'est actuellement visible via la connexion Supabase de cette session. La migration et le script sont donc préparés dans le dépôt, mais ils n'ont pas été appliqués à une base réelle et aucune traduction n'a été générée/insérée. Le contenu statique actuel du quiz n'est pas migré automatiquement : il faudra d'abord importer ses questions dans `quiz_questions`, puis lancer le script.

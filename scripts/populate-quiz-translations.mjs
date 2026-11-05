import "dotenv/config";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { InferenceClient } from "@huggingface/inference";
import { createClient } from "@supabase/supabase-js";

const MODEL = process.env.HF_TRANSLATION_MODEL || "facebook/nllb-200-3.3B";
const LANGUAGES = [
  { code: "bam_Latn", folder: "bm" },
  { code: "fuv_Latn", folder: "ff" },
];
const FIELDS = ["question_text", "option_a", "option_b", "option_c", "option_d", "explanation"];

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Variable d'environnement manquante : ${name}`);
  return value;
}

const hf = new InferenceClient(requiredEnv("HF_ACCESS_TOKEN"));
const supabase = createClient(
  requiredEnv("SUPABASE_URL"),
  requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false, autoRefreshToken: false } }
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function translateText(text, targetLanguageCode) {
  if (!text?.trim()) return null;
  let lastError;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const result = await hf.translation({
        model: MODEL,
        inputs: text.trim(),
        parameters: { src_lang: "fra_Latn", tgt_lang: targetLanguageCode },
      });
      const translated = Array.isArray(result)
        ? result[0]?.translation_text
        : result?.translation_text;

      if (!translated?.trim()) throw new Error("Réponse de traduction vide.");
      return translated.trim();
    } catch (error) {
      lastError = error;
      const retryable = /429|503|504|timeout|temporar|overload/i.test(
        `${error?.message || ""} ${error?.httpStatus || ""}`
      );
      if (!retryable || attempt === 3) break;
      await sleep(1500 * (2 ** attempt));
    }
  }

  throw new Error(
    `Traduction ${targetLanguageCode} impossible avec ${MODEL}: ${lastError?.message || lastError}`
  );
}

async function getExistingTranslation(questionId, languageCode) {
  const { data, error } = await supabase
    .from("quiz_translations")
    .select("translation_status")
    .eq("question_id", questionId)
    .eq("language_code", languageCode)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function translateQuestion(question, language) {
  const translated = {};

  // Séquentiel pour limiter les pointes de requêtes et les erreurs de quota.
  for (const field of FIELDS) {
    translated[field] = question[field]?.trim()
      ? await translateText(question[field], language.code)
      : null;
    await sleep(250);
  }

  const audioRoot = `assets/audio/${language.folder}/questions/${question.id}`;
  return {
    question_id: question.id,
    language_code: language.code,
    ...translated,
    audio_question_path: `${audioRoot}/question.ogg`,
    audio_option_a_path: `${audioRoot}/option_a.ogg`,
    audio_option_b_path: `${audioRoot}/option_b.ogg`,
    audio_option_c_path: `${audioRoot}/option_c.ogg`,
    audio_option_d_path: question.option_d ? `${audioRoot}/option_d.ogg` : null,
    audio_explanation_path: question.explanation ? `${audioRoot}/explanation.ogg` : null,
    translation_status: "needs_review",
    translation_provider: MODEL,
    reviewed_by: null,
    reviewed_at: null,
    updated_at: new Date().toISOString(),
  };
}

export async function populateDatabaseTranslations(question, { write = false } = {}) {
  if (!question?.id) throw new Error("La question doit avoir un id.");
  for (const field of ["question_text", "option_a", "option_b", "option_c"]) {
    if (!question[field]?.trim()) throw new Error(`Champ requis absent : ${field}`);
  }

  const rows = [];
  for (const language of LANGUAGES) {
    const existing = await getExistingTranslation(question.id, language.code);

    // Une traduction relue ou approuvée ne doit jamais être écrasée par l'IA.
    if (["reviewed", "approved"].includes(existing?.translation_status)) {
      console.log(`Question ${question.id} / ${language.code}: traduction ${existing.translation_status}, conservée.`);
      continue;
    }

    rows.push(await translateQuestion(question, language));
  }

  if (!write) {
    console.log(`Mode aperçu : ${rows.length} traduction(s) préparée(s), aucune écriture.`);
    return rows;
  }

  if (!rows.length) return [];

  const { data, error } = await supabase
    .from("quiz_translations")
    .upsert(rows, { onConflict: "question_id,language_code" })
    .select();

  if (error) throw error;
  return data;
}

async function main() {
  const args = process.argv.slice(2);
  const write = args.includes("--write");
  const idArg = args.find((arg) => arg.startsWith("--question-id="));
  const limitArg = args.find((arg) => arg.startsWith("--limit="));
  const questionId = idArg ? Number(idArg.split("=")[1]) : null;
  const limit = limitArg ? Number(limitArg.split("=")[1]) : 100;

  if (questionId !== null && (!Number.isInteger(questionId) || questionId < 1)) {
    throw new Error("--question-id doit être un entier positif.");
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 500) {
    throw new Error("--limit doit être compris entre 1 et 500.");
  }

  let query = supabase
    .from("quiz_questions")
    .select("id, question_text, option_a, option_b, option_c, option_d, explanation")
    .order("id", { ascending: true })
    .limit(limit);

  if (questionId !== null) query = query.eq("id", questionId);

  const { data: questions, error } = await query;
  if (error) throw error;
  if (!questions?.length) {
    console.log("Aucune question correspondante.");
    return;
  }

  console.log(`${questions.length} question(s) trouvée(s). Mode: ${write ? "ÉCRITURE" : "APERÇU"}.`);
  for (const question of questions) {
    try {
      const saved = await populateDatabaseTranslations(question, { write });
      console.log(`Question ${question.id}: ${saved.length} langue(s) traitée(s).`);
    } catch (error) {
      console.error(`Question ${question.id}: ${error.message}`);
      process.exitCode = 1;
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

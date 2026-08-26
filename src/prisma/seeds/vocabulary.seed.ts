import { db } from '../db.js';

const vocabularyPairs = [
  ['hello', 'hola'],
  ['goodbye', 'adiós'],
  ['please', 'por favor'],
  ['thank you', 'gracias'],
  ['yes', 'sí'],
  ['no', 'no'],
  ['good', 'bueno'],
  ['bad', 'malo'],
  ['morning', 'mañana'],
  ['night', 'noche'],
  ['water', 'agua'],
  ['food', 'comida'],
  ['bread', 'pan'],
  ['milk', 'leche'],
  ['coffee', 'café'],
  ['house', 'casa'],
  ['school', 'escuela'],
  ['book', 'libro'],
  ['friend', 'amigo'],
  ['family', 'familia'],
  ['mother', 'madre'],
  ['father', 'padre'],
  ['brother', 'hermano'],
  ['sister', 'hermana'],
  ['child', 'niño'],
  ['man', 'hombre'],
  ['woman', 'mujer'],
  ['day', 'día'],
  ['week', 'semana'],
  ['today', 'hoy'],
] as const;

export async function seedVocabulary(
  languages: Awaited<
    ReturnType<
      typeof import('./languages.seed.ts').seedLanguages
      >
    >,
) {
  console.log('');
  console.log('Seeding vocabulary...');

  const englishWords = new Map<
      string,
    Awaited<
  ReturnType<
  typeof db.orm.public.Vocabulary.upsert
  >
  >
  >();

  const spanishWords = new Map<
      string,
    Awaited<
  ReturnType<
  typeof db.orm.public.Vocabulary.upsert
  >
  >
  >();

  for (const [english, spanish] of vocabularyPairs) {
    const englishWord =
      await db.orm.public.Vocabulary.upsert({
        conflictOn: {
          languageId: languages.english.id,
          normalizedWord: english,
        },
        create: {
          languageId: languages.english.id,
          word: english,
          normalizedWord: english,
          partOfSpeech: 'word',
          definition: `English word: ${english}`,
        },
        update: {
          word: english,
          partOfSpeech: 'word',
          definition: `English word: ${english}`,
        },
      });

    const spanishWord =
      await db.orm.public.Vocabulary.upsert({
        conflictOn: {
          languageId: languages.spanish.id,
          normalizedWord: spanish,
        },
        create: {
          languageId: languages.spanish.id,
          word: spanish,
          normalizedWord: spanish,
          partOfSpeech: 'word',
          definition: `Spanish word: ${spanish}`,
        },
        update: {
          word: spanish,
          partOfSpeech: 'word',
          definition: `Spanish word: ${spanish}`,
        },
      });

    englishWords.set(english, englishWord);
    spanishWords.set(spanish, spanishWord);

    await db.orm.public.VocabularyTranslation.upsert({
      conflictOn: {
        vocabularyId: englishWord.id,
        languageId: languages.spanish.id,
      },
      create: {
        vocabularyId: englishWord.id,
        languageId: languages.spanish.id,
        translation: spanish,
        normalizedTranslation: spanish,
      },
      update: {
        translation: spanish,
        normalizedTranslation: spanish,
      },
    });

    await db.orm.public.VocabularyTranslation.upsert({
      conflictOn: {
        vocabularyId: spanishWord.id,
        languageId: languages.english.id,
      },
      create: {
        vocabularyId: spanishWord.id,
        languageId: languages.english.id,
        translation: english,
        normalizedTranslation: english,
      },
      update: {
        translation: english,
        normalizedTranslation: english,
      },
    });
  }

  console.log(
    `✓ ${vocabularyPairs.length} English words`,
  );

  console.log(
    `✓ ${vocabularyPairs.length} Spanish words`,
  );

  console.log(
    `✓ ${vocabularyPairs.length * 2} translations`,
  );

  return {
    englishWords,
    spanishWords,
  };
}
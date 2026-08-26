import { db } from '../db.js';

const questionTemplates = [
  {
    question: (word: string) =>
      `What is the translation of "${word}"?`,
    points: 10,
  },
  {
    question: (word: string) =>
      `Choose the correct meaning of "${word}".`,
    points: 10,
  },
  {
    question: (word: string) =>
      `Which answer matches "${word}"?`,
    points: 10,
  },
];

export async function seedExercises(
  lessons: Awaited<
    ReturnType<
      typeof import('./lessons.seed').seedLessons
      >
    >,
  vocabulary: Awaited<
    ReturnType<
      typeof import('./vocabulary.seed').seedVocabulary
      >
    >,
) {
  console.log('');
  console.log('Seeding exercises...');

  let exerciseNumber = 0;

  async function createExercises(
    lessonRows: any[],
    sourceWords: Map<string, any>,
    targetWords: Map<string, any>,
  ) {
    for (const lessonRow of lessonRows) {
      const lessonWords = Array.from(
        sourceWords.values(),
      ).filter((word) =>
        lessonRow.words.some(
          (lessonWord: any) =>
            lessonWord.id === word.id,
        ),
      );

      if (lessonWords.length === 0) {
        continue;
      }

      for (
        let index = 0;
        index < Math.min(3, lessonWords.length);
        index++
      ) {
        const vocabularyWord = lessonWords[index];

        const pair = Array.from(
          sourceWords.entries(),
        ).find(
          ([, value]) =>
            value.id === vocabularyWord.id,
        );

        if (!pair) {
          continue;
        }

        const sourceText = pair[0];

        const translation =
          Array.from(targetWords.entries()).find(
            ([targetWord]) => {
              return true;
            },
          );

        const correctAnswer =
          await findTranslation(
            vocabularyWord.id,
            targetWords,
          );

        if (!correctAnswer) {
          continue;
        }

        const distractors = Array.from(
          targetWords.keys(),
        )
          .filter(
            (value) => value !== correctAnswer,
          )
          .slice(0, 3);

        const options = [
          correctAnswer,
          ...distractors,
        ].sort(() => Math.random() - 0.5);

        exerciseNumber++;

        const template =
          questionTemplates[index];

        const exercise =
          await db.orm.public.Exercise.upsert({
            conflictOn: {
              lessonId: lessonRow.lesson.id,
              number: index + 1,
            },
            create: {
              lessonId: lessonRow.lesson.id,
              number: index + 1,
              type: 'multiple_choice',
              question:
                template.question(sourceText),
              answer: correctAnswer,
              points: template.points,
              isActive: true,
            },
            update: {
              type: 'multiple_choice',
              question:
                template.question(sourceText),
              answer: correctAnswer,
              points: template.points,
              isActive: true,
            },
          });

        for (
          let optionIndex = 0;
          optionIndex < options.length;
          optionIndex++
        ) {
          const value = options[optionIndex];

          await db.orm.public.ExerciseOption.upsert({
            conflictOn: {
              exerciseId: exercise.id,
              number: optionIndex + 1,
            },
            create: {
              exerciseId: exercise.id,
              value,
              label: value,
              isCorrect:
                value === correctAnswer,
              number: optionIndex + 1,
            },
            update: {
              value,
              label: value,
              isCorrect:
                value === correctAnswer,
            },
          });
        }
      }
    }
  }

  await createExercises(
    lessons.englishLessons,
    vocabulary.englishWords,
    vocabulary.spanishWords,
  );

  await createExercises(
    lessons.spanishLessons,
    vocabulary.spanishWords,
    vocabulary.englishWords,
  );

  console.log(
    `✓ ${exerciseNumber} exercises`,
  );

  console.log(
    `✓ ${exerciseNumber * 4} exercise options`,
  );
}

async function findTranslation(
  vocabularyId: number,
  targetWords: Map<string, any>,
) {
  const translation =
    await db.orm.public.VocabularyTranslation.first({
      vocabularyId,
    });

  if (!translation) {
    return null;
  }

  const exists = Array.from(
    targetWords.values(),
  ).some(
    (word) =>
      word.id !== vocabularyId &&
      word.word === translation.translation,
  );

  if (!exists) {
    return translation.translation;
  }

  return translation.translation;
}
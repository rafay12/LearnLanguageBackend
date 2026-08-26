import { db } from '../db.js';

const unitData = [
  {
    number: 1,
    title: 'Getting Started',
    description:
      'Learn basic greetings, introductions and essential expressions.',
    lessons: [
      {
        number: 1,
        title: 'Greetings',
        description:
          'Learn common greetings and polite expressions.',
        vocabulary: [
          'hello',
          'goodbye',
          'please',
          'thank you',
          'yes',
          'no',
        ],
      },
      {
        number: 2,
        title: 'Good Morning',
        description:
          'Learn expressions used throughout the day.',
        vocabulary: [
          'good',
          'morning',
          'night',
          'today',
          'day',
          'week',
        ],
      },
      {
        number: 3,
        title: 'People',
        description:
          'Learn basic words for people around you.',
        vocabulary: [
          'man',
          'woman',
          'child',
          'friend',
          'family',
          'mother',
        ],
      },
    ],
  },
  {
    number: 2,
    title: 'Everyday Life',
    description:
      'Learn vocabulary for home, school and everyday activities.',
    lessons: [
      {
        number: 1,
        title: 'Family',
        description:
          'Learn vocabulary for family members.',
        vocabulary: [
          'mother',
          'father',
          'brother',
          'sister',
          'family',
          'child',
        ],
      },
      {
        number: 2,
        title: 'Places',
        description:
          'Learn vocabulary for common places.',
        vocabulary: [
          'house',
          'school',
          'book',
          'friend',
          'man',
          'woman',
        ],
      },
      {
        number: 3,
        title: 'Food and Drinks',
        description:
          'Learn common food and drink vocabulary.',
        vocabulary: [
          'water',
          'food',
          'bread',
          'milk',
          'coffee',
          'good',
        ],
      },
    ],
  },
  {
    number: 3,
    title: 'Daily Communication',
    description:
      'Practice common words used in everyday communication.',
    lessons: [
      {
        number: 1,
        title: 'Useful Words',
        description:
          'Review essential everyday words.',
        vocabulary: [
          'yes',
          'no',
          'good',
          'bad',
          'please',
          'thank you',
        ],
      },
      {
        number: 2,
        title: 'Time',
        description:
          'Practice words related to time.',
        vocabulary: [
          'morning',
          'night',
          'today',
          'day',
          'week',
          'goodbye',
        ],
      },
      {
        number: 3,
        title: 'Review',
        description:
          'Review the vocabulary from the entire course.',
        vocabulary: [
          'hello',
          'family',
          'house',
          'school',
          'water',
          'friend',
        ],
      },
    ],
  },
];

export async function seedLessons(
  courses: Awaited<
    ReturnType<
      typeof import('./courses.seed.ts').seedCourses
      >
    >,
  vocabulary: Awaited<
    ReturnType<
      typeof import('./vocabulary.seed').seedVocabulary
      >
    >,
) {
  console.log('');
  console.log('Seeding units and lessons...');

  const englishLessons: any[] = [];
  const spanishLessons: any[] = [];

  for (const courseInfo of [
    {
      course: courses.englishCourse,
      words: vocabulary.englishWords,
      output: englishLessons,
    },
    {
      course: courses.spanishCourse,
      words: vocabulary.spanishWords,
      output: spanishLessons,
    },
  ]) {
    for (const unitInfo of unitData) {
      const unit =
        await db.orm.public.Unit.upsert({
          conflictOn: {
            courseId: courseInfo.course.id,
            number: unitInfo.number,
          },
          create: {
            courseId: courseInfo.course.id,
            number: unitInfo.number,
            title: unitInfo.title,
            description: unitInfo.description,
            isActive: true,
          },
          update: {
            title: unitInfo.title,
            description: unitInfo.description,
            isActive: true,
          },
        });

      for (const lessonInfo of unitInfo.lessons) {
        const lesson =
          await db.orm.public.Lesson.upsert({
            conflictOn: {
              unitId: unit.id,
              number: lessonInfo.number,
            },
            create: {
              unitId: unit.id,
              number: lessonInfo.number,
              title: lessonInfo.title,
              description: lessonInfo.description,
              type: 'vocabulary',
              isActive: true,
            },
            update: {
              title: lessonInfo.title,
              description: lessonInfo.description,
              type: 'vocabulary',
              isActive: true,
            },
          });

        courseInfo.output.push({
          lesson,
          words: lessonInfo.vocabulary
            .map((word) => courseInfo.words.get(
              word,
            ))
            .filter(Boolean),
        });

        let position = 1;

        for (const word of lessonInfo.vocabulary) {
          const vocabularyWord =
            courseInfo.words.get(word);

          if (!vocabularyWord) {
            continue;
          }

          await db.orm.public.LessonVocabulary.upsert({
            conflictOn: {
              lessonId: lesson.id,
              vocabularyId: vocabularyWord.id,
            },
            create: {
              lessonId: lesson.id,
              vocabularyId: vocabularyWord.id,
              position,
              isRequired: true,
            },
            update: {
              position,
              isRequired: true,
            },
          });

          position++;
        }
      }
    }
  }

  console.log('✓ 6 units');
  console.log('✓ 18 lessons');
  console.log('✓ Lesson vocabulary links');

  return {
    englishLessons,
    spanishLessons,
  };
}
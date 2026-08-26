import { db } from '../db.js';

export async function seedCourses(
  languages: Awaited<
    ReturnType<
      typeof import('./languages.seed').seedLanguages
      >
    >,
) {
  console.log('');
  console.log('Seeding courses...');

  const englishCourse =
    await db.orm.public.Course.upsert({
      conflictOn: {
        languageVariantId: languages.englishVariant.id,
        code: 'en-us-a1',
      },
      create: {
        languageVariantId:
        languages.englishVariant.id,
        code: 'en-us-a1',
        title: 'English A1',
        description:
          'A beginner English course covering greetings, everyday vocabulary, family, food and daily communication.',
        level: 'A1',
        isActive: true,
      },
      update: {
        title: 'English A1',
        description:
          'A beginner English course covering greetings, everyday vocabulary, family, food and daily communication.',
        level: 'A1',
        isActive: true,
      },
    });

  const spanishCourse =
    await db.orm.public.Course.upsert({
      conflictOn: {
        languageVariantId: languages.spanishVariant.id,
        code: 'es-es-a1',
      },
      create: {
        languageVariantId:
        languages.spanishVariant.id,
        code: 'es-es-a1',
        title: 'Spanish A1',
        description:
          'A beginner Spanish course covering greetings, everyday vocabulary, family, food and daily communication.',
        level: 'A1',
        isActive: true,
      },
      update: {
        title: 'Spanish A1',
        description:
          'A beginner Spanish course covering greetings, everyday vocabulary, family, food and daily communication.',
        level: 'A1',
        isActive: true,
      },
    });

  console.log('✓ English A1');
  console.log('✓ Spanish A1');

  return {
    englishCourse,
    spanishCourse,
  };
}
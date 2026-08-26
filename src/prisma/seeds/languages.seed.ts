import { db } from '../db.js';

export async function seedLanguages() {
  console.log('');
  console.log('Seeding languages...');

  const english = await db.orm.public.Language.upsert({
    conflictOn: {
      code: 'en',
    },
    create: {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      direction: 'ltr',
      isActive: true,
    },
    update: {
      name: 'English',
      nativeName: 'English',
      direction: 'ltr',
      isActive: true,
    },
  });

  const spanish = await db.orm.public.Language.upsert({
    conflictOn: {
      code: 'es',
    },
    create: {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      direction: 'ltr',
      isActive: true,
    },
    update: {
      name: 'Spanish',
      nativeName: 'Español',
      direction: 'ltr',
      isActive: true,
    },
  });

  const englishVariant = await db.orm.public.LanguageVariant.upsert({
    conflictOn: {
      languageId: english.id,
      code: 'en-US',
    },
    create: {
      languageId: english.id,
      code: 'en-US',
      name: 'American English',
      nativeName: 'English',
      region: 'United States',
      description: 'American English for beginner learners.',
      isActive: true,
    },
    update: {
      name: 'American English',
      nativeName: 'English',
      region: 'United States',
      description: 'American English for beginner learners.',
      isActive: true,
    },
  });

  const spanishVariant = await db.orm.public.LanguageVariant.upsert({
    conflictOn: {
      languageId: spanish.id,
      code: 'es-ES',
    },
    create: {
      languageId: spanish.id,
      code: 'es-ES',
      name: 'European Spanish',
      nativeName: 'Español',
      region: 'Spain',
      description: 'European Spanish for beginner learners.',
      isActive: true,
    },
    update: {
      name: 'European Spanish',
      nativeName: 'Español',
      region: 'Spain',
      description: 'European Spanish for beginner learners.',
      isActive: true,
    },
  });

  console.log('✓ English');
  console.log('✓ Spanish');
  console.log('✓ American English');
  console.log('✓ European Spanish');

  return {
    english,
    spanish,
    englishVariant,
    spanishVariant,
  };
}

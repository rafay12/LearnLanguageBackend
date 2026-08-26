import 'dotenv/config';
import { db } from './db.js';

const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    direction: 'rtl',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
  },
];

const variants = [
  {
    languageCode: 'en',
    code: 'en-US',
    name: 'American English',
    nativeName: 'English',
    region: 'United States',
  },
  {
    languageCode: 'en',
    code: 'en-GB',
    name: 'British English',
    nativeName: 'English',
    region: 'United Kingdom',
  },
  {
    languageCode: 'es',
    code: 'es-ES',
    name: 'European Spanish',
    nativeName: 'Español',
    region: 'Spain',
  },
  {
    languageCode: 'es',
    code: 'es-MX',
    name: 'Mexican Spanish',
    nativeName: 'Español',
    region: 'Mexico',
  },
  {
    languageCode: 'fr',
    code: 'fr-FR',
    name: 'French',
    nativeName: 'Français',
    region: 'France',
  },
  {
    languageCode: 'de',
    code: 'de-DE',
    name: 'German',
    nativeName: 'Deutsch',
    region: 'Germany',
  },
  {
    languageCode: 'ar',
    code: 'ar-MSA',
    name: 'Modern Standard Arabic',
    nativeName: 'العربية الفصحى',
    region: 'Arab World',
  },
  {
    languageCode: 'ja',
    code: 'ja-JP',
    name: 'Japanese',
    nativeName: '日本語',
    region: 'Japan',
  },
];

const courses = [
  {
    variantCode: 'en-US',
    code: 'en-us-a1',
    title: 'American English A1',
    description: 'Beginner American English course.',
    level: 'A1',
  },
  {
    variantCode: 'en-US',
    code: 'en-us-a2',
    title: 'American English A2',
    description: 'Elementary American English course.',
    level: 'A2',
  },
  {
    variantCode: 'en-GB',
    code: 'en-gb-a1',
    title: 'British English A1',
    description: 'Beginner British English course.',
    level: 'A1',
  },
  {
    variantCode: 'es-ES',
    code: 'es-es-a1',
    title: 'European Spanish A1',
    description: 'Beginner European Spanish course.',
    level: 'A1',
  },
  {
    variantCode: 'fr-FR',
    code: 'fr-fr-a1',
    title: 'French A1',
    description: 'Beginner French course.',
    level: 'A1',
  },
  {
    variantCode: 'de-DE',
    code: 'de-de-a1',
    title: 'German A1',
    description: 'Beginner German course.',
    level: 'A1',
  },
  {
    variantCode: 'ar-MSA',
    code: 'ar-msa-a1',
    title: 'Modern Standard Arabic A1',
    description: 'Beginner Modern Standard Arabic course.',
    level: 'A1',
  },
  {
    variantCode: 'ja-JP',
    code: 'ja-jp-a1',
    title: 'Japanese A1',
    description: 'Beginner Japanese course.',
    level: 'A1',
  },
];

async function seed() {
  for (const language of languages) {
    await db.orm.public.Language.upsert({
      create: language,
      update: {
        name: language.name,
        nativeName: language.nativeName,
        isActive: true,
      },
      conflictOn: {
        code: language.code,
      },
    });
  }

  for (const variant of variants) {
    const language = await db.orm.public.Language.first({
      code: variant.languageCode,
    });

    if (!language) {
      continue;
    }

    await db.orm.public.LanguageVariant.upsert({
      conflictOn: {
        languageId: language.id,
        code: variant.code,
      },
      create: {
        languageId: language.id,
        code: variant.code,
        name: variant.name,
        nativeName: variant.nativeName,
        region: variant.region,
        isActive: true,
      },
      update: {
        name: variant.name,
        nativeName: variant.nativeName,
        region: variant.region,
        isActive: true,
      },
    });
  }

  for (const course of courses) {
    const variant = await db.orm.public.LanguageVariant.first({
      code: course.variantCode,
    });

    if (!variant) {
      continue;
    }

    await db.orm.public.Course.upsert({
      conflictOn: {
        languageVariantId: variant.id,
        code: course.code,
      },
      create: {
        languageVariantId: variant.id,
        code: course.code,
        title: course.title,
        description: course.description,
        level: course.level,
        isActive: true,
      },
      update: {
        title: course.title,
        description: course.description,
        level: course.level,
        isActive: true,
      },
    });
  }

  console.log(`Seeded ${languages.length} languages.`);
  console.log(`Seeded ${variants.length} language variants.`);
  console.log(`Seeded ${courses.length} Courses variants.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

import 'dotenv/config';
import { db } from './db.js';

const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
  },
  {
    code: 'sd',
    name: 'Sindhi',
    nativeName: 'سنڌي',
  },
  {
    code: 'ps',
    name: 'Pashto',
    nativeName: 'پښتو',
  },
  {
    code: 'fa',
    name: 'Persian',
    nativeName: 'فارسی',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
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

  console.log(`Seeded ${languages.length} languages.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

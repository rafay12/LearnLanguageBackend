import 'dotenv/config';

import { seedLanguages } from './seeds/languages.seed.js';
import { seedCourses } from './seeds/courses.seed.js';
import { seedVocabulary } from './seeds/vocabulary.seed.js';
import { seedLessons } from './seeds/lessons.seed.js';
import { seedExercises } from './seeds/exercises.seed.js';

async function seed() {
  console.log('======================================');
  console.log('Starting LanguageLearning database seed');
  console.log('======================================');

  const languageContext = await seedLanguages();

  const courseContext = await seedCourses(languageContext);

  const vocabularyContext = await seedVocabulary(languageContext);

  const lessonContext = await seedLessons(courseContext, vocabularyContext);

  await seedExercises(lessonContext, vocabularyContext);

  console.log('');
  console.log('======================================');
  console.log('Database seed completed successfully');
  console.log('======================================');
}

seed().catch((error) => {
  console.error('');
  console.error('SEED FAILED');
  console.error(error);
  process.exit(1);
});

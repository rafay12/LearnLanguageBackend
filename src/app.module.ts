import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module.js';
import { HealthModule } from './health/health.module.js';
import { LanguagesModule } from './languages/languages.module.js';
import { LanguageVariantsModule } from './language-variants/language-variants.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { UnitsModule } from './units/units.module.js';
import { LessonsModule } from './lessons/lessons.module.js';
import { ExercisesModule } from './exercises/exercises.module.js';
import { VocabularyModule } from './vocabulary/vocabulary.module.js';
import { LessonVocabularyModule } from './lesson-vocabulary/lesson-vocabulary.module.js';
import { EnrollmentsModule } from './enrollments/enrollments.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthModule,
    LanguagesModule,
    LanguageVariantsModule,
    CoursesModule,
    UnitsModule,
    LessonsModule,
    ExercisesModule,
    VocabularyModule,
    LessonVocabularyModule,
    EnrollmentsModule,
    AuthModule,
  ],
})
export class AppModule {}
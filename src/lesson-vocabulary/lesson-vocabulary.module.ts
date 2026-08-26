import { Module } from '@nestjs/common';

import { LessonVocabularyController } from './lesson-vocabulary.controller.js';
import { LessonVocabularyService } from './lesson-vocabulary.service.js';
import { LessonVocabularyRepository } from './lesson-vocabulary.repository.js';

@Module({
  controllers: [LessonVocabularyController],
  providers: [LessonVocabularyService, LessonVocabularyRepository],
})
export class LessonVocabularyModule {}

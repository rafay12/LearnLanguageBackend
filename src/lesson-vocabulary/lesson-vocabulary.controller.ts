import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { LessonVocabularyService } from './lesson-vocabulary.service.js';

@Controller('lesson-vocabulary')
export class LessonVocabularyController {
  constructor(private readonly service: LessonVocabularyService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('lesson/:lessonId')
  findByLesson(
    @Param('lessonId', ParseIntPipe)
    lessonId: number,
  ) {
    return this.service.findByLessonId(lessonId);
  }

  @Get('vocabulary/:vocabularyId')
  findByVocabulary(
    @Param('vocabularyId', ParseIntPipe)
    vocabularyId: number,
  ) {
    return this.service.findByVocabularyId(vocabularyId);
  }
}

import { Injectable } from '@nestjs/common';

import { LessonVocabularyRepository } from './lesson-vocabulary.repository.js';

@Injectable()
export class LessonVocabularyService {
  constructor(private readonly repository: LessonVocabularyRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  findByLessonId(lessonId: number) {
    return this.repository.findByLessonId(lessonId);
  }

  findByVocabularyId(vocabularyId: number) {
    return this.repository.findByVocabularyId(vocabularyId);
  }
}

import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class LessonVocabularyRepository {
  findAll() {
    return db.orm.public.LessonVocabulary.all();
  }

  findByLessonId(lessonId: number) {
    return db.orm.public.LessonVocabulary.where({ lessonId }).all();
  }

  findByVocabularyId(vocabularyId: number) {
    return db.orm.public.LessonVocabulary.where({ vocabularyId }).all();
  }
}

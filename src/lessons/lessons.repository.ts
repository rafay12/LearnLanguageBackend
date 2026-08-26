import { Injectable } from '@nestjs/common';

import { db } from '../prisma/db.js';

@Injectable()
export class LessonsRepository {
  findAll() {
    return db.orm.public.Lesson.all();
  }

  findById(id: number) {
    return db.orm.public.Lesson.first({ id });
  }

  findByUnitId(unitId: number) {
    return db.orm.public.Lesson.where({ unitId }).all();
  }

  findVocabularyLinks(lessonId: number) {
    return db.orm.public.LessonVocabulary
      .where({ lessonId })
      .all();
  }

  findVocabulary(vocabularyId: number) {
    return db.orm.public.Vocabulary.first({
      id: vocabularyId,
    });
  }

  findVocabularyTranslations(vocabularyId: number) {
    return db.orm.public.VocabularyTranslation
      .where({ vocabularyId })
      .all();
  }

  findExercises(lessonId: number) {
    return db.orm.public.Exercise
      .where({ lessonId })
      .all();
  }

  findExerciseOptions(exerciseId: number) {
    return db.orm.public.ExerciseOption
      .where({ exerciseId })
      .all();
  }
}
import { Injectable } from '@nestjs/common';

import { db } from '../prisma/db.js';

@Injectable()
export class ExercisesRepository {
  findAll() {
    return db.orm.public.Exercise.all();
  }

  findById(id: number) {
    return db.orm.public.Exercise.first({
      id,
    });
  }

  findByLessonId(lessonId: number) {
    return db.orm.public.Exercise.where({
      lessonId,
    }).all();
  }

  findOptions(exerciseId: number) {
    return db.orm.public.ExerciseOption.where({
      exerciseId,
    }).all();
  }
}

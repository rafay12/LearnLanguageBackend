import { Injectable } from '@nestjs/common';

import { db } from '../prisma/db.js';

@Injectable()
export class ExerciseAttemptsRepository {
  create(data: {
    userId: number;
    exerciseId: number;
    answer: string;
    isCorrect: boolean;
    score: number;
  }) {
    return db.orm.public.UserExerciseAttempt.create(data);
  }

  findByUserId(userId: number) {
    return db.orm.public.UserExerciseAttempt.where({ userId }).all();
  }

  findByUserAndExercise(userId: number, exerciseId: number) {
    return db.orm.public.UserExerciseAttempt.where({
      userId,
      exerciseId,
    }).all();
  }
}

import { Injectable } from '@nestjs/common';

import { ExerciseAttemptsRepository } from './exercise-attempts.repository.js';

@Injectable()
export class ExerciseAttemptsService {
  constructor(private readonly repository: ExerciseAttemptsRepository) {}

  create(data: {
    userId: number;
    exerciseId: number;
    answer: string;
    isCorrect: boolean;
    score: number;
  }) {
    return this.repository.create(data);
  }

  findByUserId(userId: number) {
    return this.repository.findByUserId(userId);
  }

  findByUserAndExercise(userId: number, exerciseId: number) {
    return this.repository.findByUserAndExercise(userId, exerciseId);
  }
}

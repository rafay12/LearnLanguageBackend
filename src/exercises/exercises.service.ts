import { Injectable, NotFoundException } from '@nestjs/common';

import { ExerciseAttemptsService } from '../exercise-attempts/exercise-attempts.service.js';

import { ExercisesRepository } from './exercises.repository.js';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly repository: ExercisesRepository,
    private readonly attemptsService: ExerciseAttemptsService,
  ) {}

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const exercise = await this.repository.findById(id);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return exercise;
  }

  findByLessonId(lessonId: number) {
    return this.repository.findByLessonId(lessonId);
  }

  findOptions(exerciseId: number) {
    return this.repository.findOptions(exerciseId);
  }

  async submit(exerciseId: number, userId: number, answer: string) {
    const exercise = await this.repository.findById(exerciseId);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    const submittedAnswer = answer.trim().toLowerCase();

    const correctAnswer = exercise.answer?.trim().toLowerCase();

    const isCorrect =
      correctAnswer !== undefined &&
      correctAnswer !== null &&
      submittedAnswer === correctAnswer;

    const score = isCorrect ? exercise.points : 0;

    const attempt = await this.attemptsService.create({
      userId,
      exerciseId,
      answer,
      isCorrect,
      score,
    });

    return {
      exerciseId,
      correct: isCorrect,
      score,
      maxScore: exercise.points,
      correctAnswer: exercise.answer,
      attemptId: attempt.id,
    };
  }
}

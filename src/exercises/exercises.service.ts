import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ExerciseAttemptsService } from '../exercise-attempts/exercise-attempts.service.js';
import { LessonProgressService } from '../lesson-progress/lesson-progress.service.js';

import { ExercisesRepository } from './exercises.repository.js';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly repository: ExercisesRepository,
    private readonly attemptsService: ExerciseAttemptsService,
    private readonly lessonProgressService: LessonProgressService,
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

  async submit(
    exerciseId: number,
    userId: number,
    answer: string,
  ) {
    const exercise = await this.repository.findById(exerciseId);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    const submittedAnswer = answer.trim().toLowerCase();

    const correctAnswer =
      exercise.answer?.trim().toLowerCase();

    const isCorrect =
      correctAnswer !== undefined &&
      correctAnswer !== null &&
      submittedAnswer === correctAnswer;

    const score = isCorrect ? exercise.points : 0;

    const attempt =
      await this.attemptsService.create({
        userId,
        exerciseId,
        answer,
        isCorrect,
        score,
      });

    /*
     * Update lesson progress.
     *
     * We only automatically update progress when
     * the exercise was answered correctly.
     */
    let lessonProgress = null;

    if (isCorrect) {
      const exercises =
        await this.repository.findByLessonId(
          exercise.lessonId,
        );

      const attempts =
        await this.attemptsService.findByUserId(userId);

      const lessonExerciseIds = new Set(
        exercises.map((item) => item.id),
      );

      const completedExerciseIds = new Set(
        attempts
          .filter(
            (item) =>
              item.isCorrect &&
              lessonExerciseIds.has(item.exerciseId),
          )
          .map((item) => item.exerciseId),
      );

      const completedCount =
        completedExerciseIds.size;

      const totalExercises =
        exercises.length;

      const progress =
        totalExercises === 0
          ? 0
          : Math.round(
            (completedCount / totalExercises) * 100,
          );

      const existing =
        await this.lessonProgressService.findByLessonId(
          exercise.lessonId,
        );

      const userLessonProgress =
        existing.find(
          (item) => item.userId === userId,
        );

      if (userLessonProgress) {
        lessonProgress =
          await this.lessonProgressService.updateProgress(
            userId,
            exercise.lessonId,
            progress,
            score,
          );
      } else {
        await this.lessonProgressService.start(
          userId,
          exercise.lessonId,
        );

        lessonProgress =
          await this.lessonProgressService.updateProgress(
            userId,
            exercise.lessonId,
            progress,
            score,
          );
      }
    }

    return {
      exerciseId,
      correct: isCorrect,
      score,
      maxScore: exercise.points,
      attemptId: attempt.id,
      lessonProgress,
    };
  }
}
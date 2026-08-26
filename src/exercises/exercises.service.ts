import { Injectable, NotFoundException } from '@nestjs/common';

import { ExercisesRepository } from './exercises.repository.js';
import { EXERCISE_TYPES } from './exercise.types.js';

@Injectable()
export class ExercisesService {
  constructor(private readonly repository: ExercisesRepository) {}

  async findAll() {
    const exercises = await this.repository.findAll();

    return exercises
      .filter((exercise) => exercise.isActive)
      .map((exercise) => ({
        id: exercise.id,
        lessonId: exercise.lessonId,
        number: exercise.number,
        type: exercise.type,
        question: exercise.question,
        explanation: exercise.explanation,
        points: exercise.points,
      }));
  }

  async findByLessonId(lessonId: number) {
    const exercises = await this.repository.findByLessonId(lessonId);

    return Promise.all(
      exercises
        .filter((exercise) => exercise.isActive)
        .sort((a, b) => a.number - b.number)
        .map(async (exercise) => {
          const options = await this.repository.findOptions(exercise.id);

          return {
            id: exercise.id,
            lessonId: exercise.lessonId,
            number: exercise.number,
            type: exercise.type,
            question: exercise.question,
            explanation: exercise.explanation,
            points: exercise.points,

            options: options
              .sort((a, b) => a.number - b.number)
              .map((option) => ({
                id: option.id,
                number: option.number,
                value: option.value,
                label: option.label,
              })),
          };
        }),
    );
  }

  async findOne(id: number) {
    const exercise = await this.repository.findById(id);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    const options = await this.repository.findOptions(id);

    return {
      id: exercise.id,
      lessonId: exercise.lessonId,
      number: exercise.number,
      type: exercise.type,
      question: exercise.question,
      explanation: exercise.explanation,
      points: exercise.points,

      options: options
        .sort((a, b) => a.number - b.number)
        .map((option) => ({
          id: option.id,
          number: option.number,
          value: option.value,
          label: option.label,
        })),
    };
  }
}

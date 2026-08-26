import { Injectable, NotFoundException } from '@nestjs/common';

import { ExercisesRepository } from './exercises.repository.js';

@Injectable()
export class ExercisesService {
  constructor(private readonly repository: ExercisesRepository) {}

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
}

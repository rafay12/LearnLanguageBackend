import { Injectable, NotFoundException } from '@nestjs/common';

import { LessonsRepository } from './lessons.repository.js';

@Injectable()
export class LessonsService {
  constructor(private readonly repository: LessonsRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const lesson = await this.repository.findById(id);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }

  findByUnitId(unitId: number) {
    return this.repository.findByUnitId(unitId);
  }
}

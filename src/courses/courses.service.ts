import { Injectable, NotFoundException } from '@nestjs/common';

import { CoursesRepository } from './courses.repository.js';

@Injectable()
export class CoursesService {
  constructor(private readonly repository: CoursesRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const course = await this.repository.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  findByVariantId(languageVariantId: number) {
    return this.repository.findByVariantId(languageVariantId);
  }
}

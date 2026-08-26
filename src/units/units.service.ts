import { Injectable, NotFoundException } from '@nestjs/common';

import { UnitsRepository } from './units.repository.js';

@Injectable()
export class UnitsService {
  constructor(private readonly repository: UnitsRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const unit = await this.repository.findById(id);

    if (!unit) {
      throw new NotFoundException('Unit not found');
    }

    return unit;
  }

  findByCourseId(courseId: number) {
    return this.repository.findByCourseId(courseId);
  }
}

import { Injectable } from '@nestjs/common';

import { EnrollmentsRepository } from './enrollments.repository.js';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly repository: EnrollmentsRepository) {}

  findByUserId(userId: number) {
    return this.repository.findByUserId(userId);
  }

  findByCourseId(courseId: number) {
    return this.repository.findByCourseId(courseId);
  }

  findEnrollment(userId: number, courseId: number) {
    return this.repository.findEnrollment(userId, courseId);
  }
}

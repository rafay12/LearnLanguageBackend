import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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

  async enroll(userId: number, courseId: number) {
    const course = await this.repository.findCourse(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const existingEnrollment = await this.repository.findEnrollment(
      userId,
      courseId,
    );

    if (existingEnrollment) {
      throw new ConflictException('User is already enrolled in this course');
    }

    return this.repository.create(userId, courseId);
  }
}

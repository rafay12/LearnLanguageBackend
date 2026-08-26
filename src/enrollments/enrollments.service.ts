import { Injectable, NotFoundException } from '@nestjs/common';

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

  async isEnrolled(userId: number, courseId: number) {
    const enrollment = await this.repository.findEnrollment(userId, courseId);

    return {
      enrolled: !!enrollment,
    };
  }

  async enroll(userId: number, courseId: number) {
    const existing = await this.repository.findEnrollment(userId, courseId);

    if (existing) {
      return existing;
    }

    return this.repository.create(userId, courseId);
  }

  async getCourseProgress(userId: number, courseId: number) {
    const enrollment = await this.repository.findEnrollment(userId, courseId);

    if (!enrollment) {
      throw new NotFoundException('User is not enrolled in this course');
    }

    const lessons = await this.repository.findCourseLessons(courseId);

    const progress = await this.repository.findUserLessonProgress(userId);

    if (lessons.length === 0) {
      return {
        courseId,
        totalLessons: 0,
        completedLessons: 0,
        progress: 0,
      };
    }

    const lessonIds = new Set(lessons.map((lesson) => lesson.id));

    const completedLessons = progress.filter(
      (item) => lessonIds.has(item.lessonId) && item.status === 'completed',
    ).length;

    const percentage = Math.round((completedLessons / lessons.length) * 100);

    return {
      courseId,
      totalLessons: lessons.length,
      completedLessons,
      progress: percentage,
    };
  }

  async findEnrollment(userId: number, courseId: number) {
    return this.repository.findEnrollment(userId, courseId);
  }
}

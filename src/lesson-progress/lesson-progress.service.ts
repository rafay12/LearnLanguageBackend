import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { LessonProgressRepository } from './lesson-progress.repository.js';

@Injectable()
export class LessonProgressService {
  constructor(private readonly repository: LessonProgressRepository) {}

  findByUserId(userId: number) {
    return this.repository.findByUserId(userId);
  }

  findByLessonId(lessonId: number) {
    return this.repository.findByLessonId(lessonId);
  }

  async start(userId: number, lessonId: number) {
    const lesson = await this.repository.findLesson(lessonId);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const existing = await this.repository.findByUserAndLesson(
      userId,
      lessonId,
    );

    if (existing) {
      return existing;
    }

    return this.repository.create(userId, lessonId);
  }

  async updateProgress(
    userId: number,
    lessonId: number,
    progress: number,
    score: number,
  ) {
    const existing = await this.repository.findByUserAndLesson(
      userId,
      lessonId,
    );

    if (!existing) {
      throw new BadRequestException('Lesson has not been started');
    }

    if (existing.status === 'completed') {
      return existing;
    }

    return this.repository.update(existing.id, {
      status: progress >= 100 ? 'completed' : 'in_progress',
      progress,
      score,
      ...(progress >= 100
        ? {
            completedAt: new Date().toISOString(),
          }
        : {}),
    });
  }

  async complete(userId: number, lessonId: number) {
    const existing = await this.repository.findByUserAndLesson(
      userId,
      lessonId,
    );

    if (!existing) {
      throw new BadRequestException('Lesson has not been started');
    }

    if (existing.status === 'completed') {
      return existing;
    }

    return this.repository.update(existing.id, {
      status: 'completed',
      progress: 100,
      completedAt: new Date().toISOString(),
    });
  }
}

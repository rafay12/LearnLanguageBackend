import { Injectable } from '@nestjs/common';

import { db } from '../prisma/db.js';

@Injectable()
export class LessonProgressRepository {
  findByUserId(userId: number) {
    return db.orm.public.UserLessonProgress.where({ userId }).all();
  }

  findByLessonId(lessonId: number) {
    return db.orm.public.UserLessonProgress.where({ lessonId }).all();
  }

  findByUserAndLesson(userId: number, lessonId: number) {
    return db.orm.public.UserLessonProgress.first({
      userId,
      lessonId,
    });
  }

  findLesson(lessonId: number) {
    return db.orm.public.Lesson.first({
      id: lessonId,
    });
  }

  create(userId: number, lessonId: number) {
    return db.orm.public.UserLessonProgress.create({
      userId,
      lessonId,
      status: 'in_progress',
      progress: 0,
      score: 0,
      startedAt: new Date().toISOString(),
    });
  }

  update(
    id: number,
    data: {
      status?: string;
      progress?: number;
      score?: number;
      startedAt?: string;
      completedAt?: string;
    },
  ) {
    return db.orm.public.UserLessonProgress.where({ id }).update(data);
  }
}

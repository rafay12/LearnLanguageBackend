import { Injectable } from '@nestjs/common';

import { db } from '../prisma/db.js';

@Injectable()
export class EnrollmentsRepository {
  findByUserId(userId: number) {
    return db.orm.public.UserCourse.where({ userId }).all();
  }

  findByCourseId(courseId: number) {
    return db.orm.public.UserCourse.where({ courseId }).all();
  }

  findEnrollment(userId: number, courseId: number) {
    return db.orm.public.UserCourse.first({
      userId,
      courseId,
    });
  }

  findCourse(courseId: number) {
    return db.orm.public.Course.first({
      id: courseId,
    });
  }

  create(userId: number, courseId: number) {
    return db.orm.public.UserCourse.create({
      userId,
      courseId,
    });
  }

  async findCourseLessons(courseId: number) {
    const units = await db.orm.public.Unit.where({ courseId }).all();

    const lessons = [];

    for (const unit of units) {
      const unitLessons = await db.orm.public.Lesson.where({
        unitId: unit.id,
      }).all();

      lessons.push(...unitLessons);
    }

    return lessons;
  }

  findUserLessonProgress(userId: number) {
    return db.orm.public.UserLessonProgress.where({ userId }).all();
  }
}

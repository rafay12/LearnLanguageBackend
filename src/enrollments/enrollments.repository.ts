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
}

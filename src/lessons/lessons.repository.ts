import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class LessonsRepository {
  findAll() {
    return db.orm.public.Lesson.all();
  }

  findById(id: number) {
    return db.orm.public.Lesson.first({ id });
  }

  findByUnitId(unitId: number) {
    return db.orm.public.Lesson.where({ unitId }).all();
  }
}

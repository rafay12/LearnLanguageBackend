import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class UnitsRepository {
  findAll() {
    return db.orm.public.Unit.all();
  }

  findById(id: number) {
    return db.orm.public.Unit.first({ id });
  }

  findByCourseId(courseId: number) {
    return db.orm.public.Unit.where({ courseId }).all();
  }
}

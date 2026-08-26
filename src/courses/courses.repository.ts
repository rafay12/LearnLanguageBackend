import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class CoursesRepository {
  findAll() {
    return db.orm.public.Course.all();
  }

  findById(id: number) {
    return db.orm.public.Course.first({
      id,
    });
  }

  findByVariantId(languageVariantId: number) {
    return db.orm.public.Course.where({
      languageVariantId,
    }).all();
  }
}

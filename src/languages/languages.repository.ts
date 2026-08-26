import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class LanguagesRepository {
  async findAll() {
    return db.orm.public.Language.all();
  }

  async findById(id: number) {
    return db.orm.public.Language.first({ id });
  }
}

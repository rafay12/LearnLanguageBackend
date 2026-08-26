import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class LanguageVariantsRepository {
  async findByLanguageId(languageId: number) {
    return db.orm.public.LanguageVariant.where({ languageId }).all();
  }

  async findById(id: number) {
    return db.orm.public.LanguageVariant.first({ id });
  }
}

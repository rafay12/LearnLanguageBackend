import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class VocabularyRepository {
  findAll() {
    return db.orm.public.Vocabulary.all();
  }

  findById(id: number) {
    return db.orm.public.Vocabulary.first({ id });
  }

  findByLanguageId(languageId: number) {
    return db.orm.public.Vocabulary.where({ languageId }).all();
  }

  findByWord(languageId: number, normalizedWord: string) {
    return db.orm.public.Vocabulary.first({
      languageId,
      normalizedWord,
    });
  }

  findTranslations(vocabularyId: number) {
    return db.orm.public.VocabularyTranslation.where({ vocabularyId }).all();
  }
}

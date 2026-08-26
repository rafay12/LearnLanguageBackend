import { Injectable, NotFoundException } from '@nestjs/common';

import { VocabularyRepository } from './vocabulary.repository.js';

@Injectable()
export class VocabularyService {
  constructor(private readonly repository: VocabularyRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const vocabulary = await this.repository.findById(id);

    if (!vocabulary) {
      throw new NotFoundException('Vocabulary not found');
    }

    return vocabulary;
  }

  findByLanguageId(languageId: number) {
    return this.repository.findByLanguageId(languageId);
  }

  async findByWord(languageId: number, word: string) {
    const vocabulary = await this.repository.findByWord(
      languageId,
      word.toLowerCase().trim(),
    );

    if (!vocabulary) {
      throw new NotFoundException('Word not found');
    }

    return vocabulary;
  }

  findTranslations(vocabularyId: number) {
    return this.repository.findTranslations(vocabularyId);
  }
}

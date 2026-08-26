import { Injectable, NotFoundException } from '@nestjs/common';
import { LanguageVariantsRepository } from './language-variants.repository.js';

@Injectable()
export class LanguageVariantsService {
  constructor(private readonly repository: LanguageVariantsRepository) {}

  async findByLanguageId(languageId: number) {
    return this.repository.findByLanguageId(languageId);
  }

  async findById(id: number) {
    const variant = await this.repository.findById(id);

    if (!variant) {
      throw new NotFoundException('Language variant not found');
    }

    return variant;
  }
}

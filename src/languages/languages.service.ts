import { Injectable, NotFoundException } from '@nestjs/common';
import { LanguagesRepository } from './languages.repository.js';

@Injectable()
export class LanguagesService {
  constructor(private readonly languagesRepository: LanguagesRepository) {}

  async findAll() {
    return this.languagesRepository.findAll();
  }

  async findById(id: number) {
    const language = await this.languagesRepository.findById(id);

    if (!language) {
      throw new NotFoundException('Language not found');
    }

    return language;
  }
}

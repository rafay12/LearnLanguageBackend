import { Injectable } from '@nestjs/common';
import { LanguagesRepository } from './languages.repository.js';

@Injectable()
export class LanguagesService {
  constructor(private readonly languagesRepository: LanguagesRepository) {}

  async findAll() {
    return this.languagesRepository.findAll();
  }
}

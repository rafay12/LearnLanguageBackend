import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { VocabularyService } from './vocabulary.service.js';

@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly service: VocabularyService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('language/:languageId')
  findByLanguage(
    @Param('languageId', ParseIntPipe)
    languageId: number,
  ) {
    return this.service.findByLanguageId(languageId);
  }

  @Get('search')
  findByWord(
    @Query('languageId', ParseIntPipe)
    languageId: number,

    @Query('word')
    word: string,
  ) {
    return this.service.findByWord(languageId, word);
  }

  @Get(':id/translations')
  findTranslations(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findTranslations(id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findById(id);
  }
}

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LanguageVariantsService } from './language-variants.service.js';

@Controller('language-variants')
export class LanguageVariantsController {
  constructor(private readonly service: LanguageVariantsService) {}

  @Get()
  findAll() {
    return this.service.findByLanguageId(1);
  }

  @Get('language/:languageId')
  findByLanguage(@Param('languageId', ParseIntPipe) languageId: number) {
    return this.service.findByLanguageId(languageId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }
}

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LanguagesService } from './languages.service.js';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.languagesService.findById(id);
  }
}

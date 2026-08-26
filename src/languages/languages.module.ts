import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller.js';
import { LanguagesService } from './languages.service.js';
import { LanguagesRepository } from './languages.repository.js';

@Module({
  controllers: [LanguagesController],
  providers: [LanguagesService, LanguagesRepository],
})
export class LanguagesModule {}

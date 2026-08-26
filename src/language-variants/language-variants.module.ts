import { Module } from '@nestjs/common';
import { LanguageVariantsController } from './language-variants.controller.js';
import { LanguageVariantsService } from './language-variants.service.js';
import { LanguageVariantsRepository } from './language-variants.repository.js';

@Module({
  controllers: [LanguageVariantsController],
  providers: [LanguageVariantsService, LanguageVariantsRepository],
})
export class LanguageVariantsModule {}

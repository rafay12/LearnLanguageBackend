import { Module } from '@nestjs/common';

import { VocabularyController } from './vocabulary.controller.js';
import { VocabularyService } from './vocabulary.service.js';
import { VocabularyRepository } from './vocabulary.repository.js';

@Module({
  controllers: [VocabularyController],
  providers: [VocabularyService, VocabularyRepository],
})
export class VocabularyModule {}

import { Module } from '@nestjs/common';

import { LessonsController } from './lessons.controller.js';
import { LessonsService } from './lessons.service.js';
import { LessonsRepository } from './lessons.repository.js';

@Module({
  controllers: [LessonsController],

  providers: [LessonsService, LessonsRepository],

  exports: [LessonsService],
})
export class LessonsModule {}

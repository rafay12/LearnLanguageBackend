import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';

import { LessonProgressController } from './lesson-progress.controller.js';
import { LessonProgressRepository } from './lesson-progress.repository.js';
import { LessonProgressService } from './lesson-progress.service.js';

@Module({
  imports: [AuthModule],
  controllers: [LessonProgressController],
  providers: [LessonProgressService, LessonProgressRepository],
  exports: [LessonProgressService],
})
export class LessonProgressModule {}

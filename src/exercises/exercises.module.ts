import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ExerciseAttemptsModule } from '../exercise-attempts/exercise-attempts.module.js';
import { LessonProgressModule } from '../lesson-progress/lesson-progress.module.js';

import { ExercisesController } from './exercises.controller.js';
import { ExercisesService } from './exercises.service.js';
import { ExercisesRepository } from './exercises.repository.js';

@Module({
  imports: [
    JwtModule.register({}),
    ExerciseAttemptsModule,
    LessonProgressModule,
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService, ExercisesRepository],
})
export class ExercisesModule {}

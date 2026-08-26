import { Module } from '@nestjs/common';

import { ExercisesController } from './exercises.controller.js';
import { ExercisesService } from './exercises.service.js';
import { ExercisesRepository } from './exercises.repository.js';

import { ExerciseAttemptsModule } from '../exercise-attempts/exercise-attempts.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [ExerciseAttemptsModule, AuthModule],

  controllers: [ExercisesController],

  providers: [ExercisesService, ExercisesRepository],

  exports: [ExercisesService],
})
export class ExercisesModule {}

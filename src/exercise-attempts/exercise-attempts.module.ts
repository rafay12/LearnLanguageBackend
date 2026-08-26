import { Module } from '@nestjs/common';

import { ExerciseAttemptsRepository } from './exercise-attempts.repository.js';
import { ExerciseAttemptsService } from './exercise-attempts.service.js';

@Module({
  providers: [ExerciseAttemptsRepository, ExerciseAttemptsService],
  exports: [ExerciseAttemptsService],
})
export class ExerciseAttemptsModule {}

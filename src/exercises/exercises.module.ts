import { Module } from '@nestjs/common';

import { ExercisesController } from './exercises.controller.js';

import { ExercisesService } from './exercises.service.js';

import { ExercisesRepository } from './exercises.repository.js';

@Module({
  controllers: [ExercisesController],

  providers: [ExercisesService, ExercisesRepository],

  exports: [ExercisesService],
})
export class ExercisesModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ExercisesController } from './exercises.controller.js';
import { ExercisesService } from './exercises.service.js';
import { ExercisesRepository } from './exercises.repository.js';

@Module({
  imports: [JwtModule.register({})],
  controllers: [ExercisesController],
  providers: [ExercisesService, ExercisesRepository],
})
export class ExercisesModule {}

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ExercisesService } from './exercises.service.js';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly service: ExercisesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('lesson/:lessonId')
  findByLesson(
    @Param('lessonId', ParseIntPipe)
    lessonId: number,
  ) {
    return this.service.findByLessonId(lessonId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(id);
  }
}

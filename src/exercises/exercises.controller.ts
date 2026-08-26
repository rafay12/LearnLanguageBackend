import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ExercisesService } from './exercises.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { SubmitExerciseDto } from './dto/submit-exercise.dto.js';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get('lesson/:lessonId')
  findByLesson(
    @Param('lessonId', ParseIntPipe)
    lessonId: number,
  ) {
    return this.exercisesService.findByLessonId(lessonId);
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.exercisesService.findById(id);
  }

  @Get(':id/options')
  findOptions(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.exercisesService.findOptions(id);
  }

  @Post(':id/submit')
  @UseGuards(JwtAuthGuard)
  submit(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() dto: SubmitExerciseDto,
    @Req() request: any,
  ) {
    return this.exercisesService.submit(id, request.user.sub, dto.answer);
  }
}

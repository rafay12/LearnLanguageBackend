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

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

import { SubmitExerciseDto } from './dto/submit-exercise.dto.js';
import { ExercisesService } from './exercises.service.js';

import { ExerciseAttemptsService } from '../exercise-attempts/exercise-attempts.service.js';

@Controller('exercises')
export class ExercisesController {
  constructor(
    private readonly service: ExercisesService,

    private readonly attemptsService: ExerciseAttemptsService,
  ) {}

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

  @Post(':id/submit')
  @UseGuards(JwtAuthGuard)
  async submit(
    @Req() request: any,

    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: SubmitExerciseDto,
  ) {
    const { exercise, options } = await this.service.getForSubmission(id);

    const result = this.service.evaluateAnswer(exercise, options, dto.answer);

    const attempt = await this.attemptsService.create({
      userId: request.user.sub,

      exerciseId: exercise.id,

      answer: dto.answer,

      isCorrect: result.correct,

      score: result.score,
    });

    return {
      exerciseId: exercise.id,

      correct: result.correct,

      score: result.score,

      maxScore: result.maxScore,

      explanation: exercise.explanation,

      attemptId: attempt.id,
    };
  }
}

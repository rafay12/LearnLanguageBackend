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

import { UpdateLessonProgressDto } from './dto/update-lesson-progress.dto.js';
import { LessonProgressService } from './lesson-progress.service.js';

@Controller('lesson-progress')
export class LessonProgressController {
  constructor(private readonly service: LessonProgressService) {}

  @Post(':lessonId/start')
  @UseGuards(JwtAuthGuard)
  start(
    @Req() request: any,
    @Param('lessonId', ParseIntPipe)
    lessonId: number,
  ) {
    return this.service.start(request.user.sub, lessonId);
  }

  @Post(':lessonId/progress')
  @UseGuards(JwtAuthGuard)
  updateProgress(
    @Req() request: any,
    @Param('lessonId', ParseIntPipe)
    lessonId: number,
    @Body() dto: UpdateLessonProgressDto,
  ) {
    return this.service.updateProgress(
      request.user.sub,
      lessonId,
      dto.progress,
      dto.score,
    );
  }

  @Post(':lessonId/complete')
  @UseGuards(JwtAuthGuard)
  complete(
    @Req() request: any,
    @Param('lessonId', ParseIntPipe)
    lessonId: number,
  ) {
    return this.service.complete(request.user.sub, lessonId);
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId', ParseIntPipe)
    userId: number,
  ) {
    return this.service.findByUserId(userId);
  }

  @Get('lesson/:lessonId')
  findByLesson(
    @Param('lessonId', ParseIntPipe)
    lessonId: number,
  ) {
    return this.service.findByLessonId(lessonId);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { EnrollmentsService } from './enrollments.service.js';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() request: any, @Body() dto: CreateEnrollmentDto) {
    return this.service.enroll(request.user.sub, dto.courseId);
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId', ParseIntPipe)
    userId: number,
  ) {
    return this.service.findByUserId(userId);
  }

  @Get('course/:courseId')
  findByCourse(
    @Param('courseId', ParseIntPipe)
    courseId: number,
  ) {
    return this.service.findByCourseId(courseId);
  }

  @Get('check')
  findEnrollment(
    @Query('userId', ParseIntPipe)
    userId: number,

    @Query('courseId', ParseIntPipe)
    courseId: number,
  ) {
    return this.service.findEnrollment(userId, courseId);
  }
}

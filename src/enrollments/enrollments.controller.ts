import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { EnrollmentsService } from './enrollments.service.js';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

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

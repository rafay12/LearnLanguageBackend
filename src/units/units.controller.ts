import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { UnitsService } from './units.service.js';

@Controller('units')
export class UnitsController {
  constructor(private readonly service: UnitsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.service.findByCourseId(courseId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }
}

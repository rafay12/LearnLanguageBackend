import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { LessonsService } from './lessons.service.js';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('unit/:unitId')
  findByUnit(
    @Param('unitId', ParseIntPipe)
    unitId: number,
  ) {
    return this.service.findByUnitId(unitId);
  }

  /**
   * Complete lesson-learning payload.
   *
   * This endpoint returns:
   *
   * lesson
   * vocabulary
   * translations
   * exercises
   * exercise options
   */
  @Get(':id/learn')
  getLearningData(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.getLearningData(id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findById(id);
  }
}

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { CoursesService } from './courses.service.js';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('variant/:variantId')
  findByVariant(
    @Param('variantId', ParseIntPipe)
    variantId: number,
  ) {
    return this.coursesService.findByVariantId(variantId);
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.coursesService.findById(id);
  }
}

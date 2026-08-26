import { Module } from '@nestjs/common';

import { EnrollmentsController } from './enrollments.controller.js';
import { EnrollmentsService } from './enrollments.service.js';
import { EnrollmentsRepository } from './enrollments.repository.js';

@Module({
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, EnrollmentsRepository],
})
export class EnrollmentsModule {}

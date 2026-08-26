import { IsInt, Min } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt()
  @Min(1)
  courseId!: number;
}

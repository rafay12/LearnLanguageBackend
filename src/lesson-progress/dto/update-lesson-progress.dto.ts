import { IsInt, Max, Min } from 'class-validator';

export class UpdateLessonProgressDto {
  @IsInt()
  @Min(0)
  @Max(100)
  progress!: number;

  @IsInt()
  @Min(0)
  score!: number;
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubmitExerciseDto {
  @IsString()
  @IsNotEmpty()
  answer!: string;

  @IsOptional()
  @IsString()
  selectedOptionId?: string;
}

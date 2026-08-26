import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitExerciseDto {
  @IsString()
  @IsNotEmpty()
  answer!: string;
}

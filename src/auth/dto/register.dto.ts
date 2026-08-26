import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username may only contain letters, numbers, and underscores',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;
}

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordResetDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;

  // Add other validation rules as needed
}
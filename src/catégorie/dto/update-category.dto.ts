// update-category.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  // Add other properties as needed
}

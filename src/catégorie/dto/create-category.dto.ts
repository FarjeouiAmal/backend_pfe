// create-category.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // Add other properties as needed
}

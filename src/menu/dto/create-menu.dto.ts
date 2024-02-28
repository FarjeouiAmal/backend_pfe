// create-menu.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  // Add other properties as needed
}

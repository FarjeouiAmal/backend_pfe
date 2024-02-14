import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreatedRestoDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly nom: string;

  @IsNotEmpty()
  @IsString()
  readonly adresse: string;

  @IsNotEmpty()
  @IsNumber()
  readonly téléphone: number; 

  role: string; // Set the role directly to 'resto'

  @IsNotEmpty()
  @IsString()
  readonly matricule: string;

  @IsNotEmpty()
  readonly dateInscrit: Date;

}

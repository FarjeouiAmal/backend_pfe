import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsString} from "class-validator";


export class CreatedRestoDto {
  @IsNotEmpty()
  readonly email: string;

  @Prop({ default: 'resto' })
  role: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly adresse: string;

  @IsNotEmpty()
  readonly telephone: string; 

  

  @IsNotEmpty()
  @IsString()
  readonly matricule: string;

  @IsNotEmpty()
  readonly dateInscrit: Date;
}

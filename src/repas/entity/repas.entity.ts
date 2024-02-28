// repas.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categorie } from 'src/catégorie/entity/categorie.entity';

export type RepasDocument = Repas & Document;

@Schema()
export class Repas {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Categorie, categorie => categorie.repas)
  categorie: Categorie;

  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  prix: number;

  @Prop()
  supplements?: string;
}

export const RepasSchema = SchemaFactory.createForClass(Repas);

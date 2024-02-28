// src/auth/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })

export class Resto {
  constructor(data: Partial<Resto>) {
    Object.assign(this, data);
  }


  save(): Resto | PromiseLike<Resto> {
    throw new Error('Method not implemented.');
  }

  @Prop({ default: 'resto' })
  role: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  adresse: string;


  @Prop()
  telephone: string;
  
  @Prop({ default: null })
  resetToken: string | null;

  @Prop({ default: null })
  resetTokenExpires: Date | null;
}


export type RestoDocument = Resto & Document;
export const RestoSchema = SchemaFactory.createForClass(Resto);

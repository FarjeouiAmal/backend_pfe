import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Entity('users')
@Schema({ timestamps: true }) // Ajout du schéma Mongoose
export class User  {
  @PrimaryGeneratedColumn()
  id: string;

  @Prop()
  @Column()
  name: string;

  @Prop({ required: true, unique: true }) // Ajout des options Mongoose
  @Column()
  email: string;

  @Prop()
  @Column()
  password: string;

  @Prop()
  @Column()
  telephone: string;

  @Prop()
  @Column()
  adresse: string;

  @Prop({ required: true })
  @Column()
  role: string;

  @Prop()
  @Column({ nullable: true })
  resetTokenExpires: Date;

  @Prop()
  @Column({ nullable: true })
  resetToken: string;

  save(): User | PromiseLike<User> {
        throw new Error('Method not implemented.');
      }
      
}


export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

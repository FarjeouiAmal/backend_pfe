// src/resto/entities/menu.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resto } from './resto.entity';
import { Prop } from '@nestjs/mongoose';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Prop()
  @Column()
  nomRepas: string;


  @Prop()
  @Column()
  prix: number;


  @Prop()
  @Column()
  description: string;

  @ManyToOne(() => Resto, resto => resto.menus)
  resto: Resto;
}

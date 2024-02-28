// src/resto/entities/resto.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Menu } from './menu.entity';

@Entity()
export class Resto {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Menu, menu => menu.resto)
  menus: Menu[];
}

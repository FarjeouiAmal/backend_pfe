// categorie.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Menu } from 'src/menu/entity/menu.entity';
import { Repas } from 'src/repas/entity/repas.entity';
import { User } from 'src/users/entity/user.entity';

@Entity()
export class Categorie {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, user => user.categories) // Assuming you have a 'categories' property in the User entity
  user: User;

  @ManyToOne(() => Menu, menu => menu.categories)
  menu: Menu;

  @OneToMany(() => Repas, repas => repas.categorie)
  repas: Repas[];
}
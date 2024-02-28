// menu.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { Categorie } from 'src/catégorie//entity/categorie.entity';


@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.menus)
  user: User;

  @OneToMany(() => Categorie, categorie => categorie.menu)
  categories: Categorie[];
}

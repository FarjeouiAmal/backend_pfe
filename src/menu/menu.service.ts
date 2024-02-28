// menu.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entity/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async createMenu(user: User, createMenuDto: CreateMenuDto): Promise<Menu> {
    if (user.role !== 'resto') {
      throw new ForbiddenException('Only users with the role "resto" can create menus.');
    }

    const menu = this.menuRepository.create({ user, ...createMenuDto });
    return await this.menuRepository.save(menu);
  }

  async updateMenu(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.menuRepository.findOne({ relations: ['user'] });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    // Ensure the user has the role "resto" to update the menu
    // You may customize this logic based on your requirements
    if (menu.user.role !== 'resto') {
      throw new ForbiddenException('Only users with the role "resto" can update this menu.');
    }

    Object.assign(menu, updateMenuDto);
    return await this.menuRepository.save(menu);
  }

  async deleteMenu(id: number): Promise<void> {
    const menu = await this.menuRepository.findOne( { relations: ['user'] });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    // Ensure the user has the role "resto" to delete the menu
    // You may customize this logic based on your requirements
    if (menu.user.role !== 'resto') {
      throw new ForbiddenException('Only users with the role "resto" can delete this menu.');
    }

    await this.menuRepository.remove(menu);
  }
}

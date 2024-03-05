// menu.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from './entity/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: Model<Menu>,
  ) {}

  async createMenu(user: User, createMenuDto: CreateMenuDto): Promise<Menu> {
    if (user.role !== 'resto') {
      throw new ForbiddenException('Only users with the role "resto" can create menus.');
    }

    const menu = new this.menuModel({ user, ...createMenuDto });
    return await menu.save();
  }

  async updateMenu(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.menuModel.findByIdAndUpdate(id, updateMenuDto, { new: true });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async deleteMenu(id: string): Promise<void> {
    const result = await this.menuModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
  }
}

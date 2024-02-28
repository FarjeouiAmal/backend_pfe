// src/resto/resto.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resto } from './entity/resto.entity';
import { Menu } from './entity/menu.entity';

@Injectable()
export class RestoService {
  constructor(
    @InjectRepository(Resto)
    private readonly restoRepository: Repository<Resto>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async createMenu(restoId: any, menuData: { nomRepas: string; prix: number; description: string }): Promise<Menu> {
    const resto = await this.restoRepository.findOne(restoId);

    if (!resto) {
      throw new NotFoundException('Resto not found.');
    }

    const menu = this.menuRepository.create(menuData);
    menu.resto = resto;

    return await this.menuRepository.save(menu);
  }

  async getMenusByRestoId(restoId: any): Promise<Menu[]> {
    return await this.menuRepository.find({ where: { resto: { id: restoId } } });
  }
}

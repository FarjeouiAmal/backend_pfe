import { Controller, Post, Param, Body, Get, ParseIntPipe } from '@nestjs/common';
import { RestoService } from './resto.service';

@Controller('resto')
export class RestoController {
  constructor(private readonly restoService: RestoService) {}

  @Post(':restoId/menus')
  async createMenu(@Param('restoId', ParseIntPipe) restoId: number, @Body() menuData: { nomRepas: string; prix: number; description: string }) {
    return this.restoService.createMenu(restoId, menuData);
  }

  @Get(':restoId/menus')
  async getMenusByRestoId(@Param('restoId', ParseIntPipe) restoId: number) {
    return this.restoService.getMenusByRestoId(restoId);
  }
}

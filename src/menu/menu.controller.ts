// menu.controller.ts
import { Controller, Post, Body, UseGuards, Request, Param, Patch, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMenu(@Request() req, @Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(req.user, createMenuDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateMenu(@Request() req, @Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.updateMenu(id, updateMenuDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteMenu(@Request() req, @Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}

// categorie.controller.ts
import { Controller, Post, Body, UseGuards, Request, Param, Patch, Delete } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entity/categorie.entity';

@Controller('categories')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategorie(@Request() req, @Body() createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    return this.categorieService.createCategorie(req.user, createCategorieDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCategorie(@Request() req, @Param('id') id: string, @Body() updateCategorieDto: UpdateCategorieDto): Promise<Categorie> {
    return this.categorieService.updateCategorie(id, updateCategorieDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCategorie(@Request() req, @Param('id') id: number): Promise<void> {
    return this.categorieService.deleteCategorie(id);
  }
}

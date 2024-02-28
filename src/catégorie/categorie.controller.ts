// category.controller.ts
import { Controller, Post, Body, UseGuards, Request, Param, Patch, Delete } from '@nestjs/common';
import { CategoryService } from './categorie.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(req.user, createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCategory(@Request() req, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCategory(@Request() req, @Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}

// categorie.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorie } from './entity/categorie.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Categorie)
    private categoryRepository: Repository<Categorie>,
  ) {}

  async createCategory(user: User, createCategoryDto: CreateCategoryDto): Promise<Categorie> {
    if (user.role !== 'resto') {
      throw new ForbiddenException('Only users with the role "resto" can create categories.');
    }

    const category = this.categoryRepository.create({ user, ...createCategoryDto });
    return await this.categoryRepository.save(category);
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Categorie> {
    const category = await this.categoryRepository.findOne({ relations: ['user'] });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Ensure the user has the role "resto" to update the category
    // You may customize this logic based on your requirements
    if (category.user.role !== 'resto') {
      throw new ForbiddenException('Only users with the role "resto" can update this category.');
    }

    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ relations: ['user'] });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Ensure the user has the role "resto" to delete the category
    // You may customize this logic based on your requirements
    if (category.user.role !== 'resto') {
      throw new ForbiddenException('Only users with the role "resto" can delete this category.');
    }

    await this.categoryRepository.remove(category);
  }
}

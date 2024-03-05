// categorie.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorie } from './entity/categorie.entity';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class CategorieService {
  constructor(
    @InjectModel(Categorie.name)
    private readonly categorieModel: Model<Categorie>,
  ) {}

  async createCategorie(user: User, createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    if (user.role !== 'resto') {
      throw new ForbiddenException('Only users with the role "resto" can create categories.');
    }

    const categorie = new this.categorieModel({ user, ...createCategorieDto });
    return await categorie.save();
  }

  async updateCategorie(id: string, updateCategorieDto: UpdateCategorieDto): Promise<Categorie> {
    const categorie = await this.categorieModel.findById(id);

    if (!categorie) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }

    // Ensure the user has the role "resto" to update the category
    // You may customize this logic based on your requirements
    if (categorie.user.role !== 'resto') {
      throw new ForbiddenException('Only users with the role "resto" can update this categorie.');
    }

    Object.assign(categorie, updateCategorieDto);
    return await categorie.save();
  }

  async deleteCategorie(id: number): Promise<void> {
    const result = await this.categorieModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }
  }

  async getAllCategories(): Promise<Categorie[]> {
    return this.categorieModel.find().exec();
  }

  async getCategoryById(id: string): Promise<Categorie> {
    const categorie = await this.categorieModel.findById(id);

    if (!categorie) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }

    return categorie;
  }
}

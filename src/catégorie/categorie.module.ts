// category.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './categorie.controller';
import { CategoryService } from './categorie.service';
import { Categorie } from './entity/categorie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categorie])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

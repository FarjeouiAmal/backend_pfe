// repas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRepasDto } from './dto/repas.dto';
import { Repas, RepasDocument } from './entity/repas.entity';

@Injectable()
export class RepasService {
  constructor(
    @InjectModel(Repas.name)
    private readonly repasModel: Model<RepasDocument>,
  ) {}

  async createRepas(createRepasDto: CreateRepasDto): Promise<Repas> {
    const repas = new this.repasModel(createRepasDto);
    return await repas.save();
  }

  async updateRepas(id: string, updateRepasDto: CreateRepasDto): Promise<Repas> {
    const repas = await this.repasModel.findByIdAndUpdate(id, updateRepasDto, { new: true });

    if (!repas) {
      throw new NotFoundException(`Repas with ID ${id} not found`);
    }

    return repas;
  }

  async deleteRepas(id: string): Promise<void> {
    const result = await this.repasModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Repas with ID ${id} not found`);
    }
  }

  async getRepasById(id: string): Promise<Repas> {
    const repas = await this.repasModel.findById(id);

    if (!repas) {
      throw new NotFoundException(`Repas with ID ${id} not found`);
    }

    return repas;
  }

  async getAllRepas(): Promise<Repas[]> {
    return this.repasModel.find().exec();
  }
}

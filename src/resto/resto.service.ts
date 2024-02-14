import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resto, RestoDocument } from './schemas/resto.schema';

@Injectable()
export class RestoService {
  constructor(@InjectModel('Resto') private readonly restoModel: Model<RestoDocument>) {}

  async findAll(): Promise<Resto[]> {
    const restos = await this.restoModel.find();
    return restos;
  }

  async create(user: Resto): Promise<Resto> {
    try {
      const res = await this.restoModel.create(user);
      return res;
    } catch (error) {
      if (error.code === 11000 || error.code === 11001) {
        throw new ConflictException('Resto with the same values already exists.');
      } else {
        throw error;
      }
    }
  }

  async findById(id: string): Promise<Resto> {
    const Resto = await this.restoModel.findById(id);

    if (!Resto) {
      throw new NotFoundException('Resto not found.');
    }

    return Resto;
  }

  async findByEmail(email: string): Promise<Resto> {
    const Resto = await this.restoModel.findOne({ email });
    
    return Resto;
  }

  async save(Resto: Resto): Promise<Resto> {
    return await Resto.save();
  }

  async updateById(id: string, Resto: Resto): Promise<Resto> {
    const existingUser = await this.restoModel.findOne({id});

    if (!existingUser) {
      throw new NotFoundException('Resto not found.');
    }

    // Update the existing user's properties
    existingUser.name = Resto.name;
    existingUser.email = Resto.email;
    // Add other properties as needed

    // Save the updated user
    return await existingUser.save();
  }

  async deleteById(id: string): Promise<Resto> {
    return await this.restoModel.findByIdAndDelete(id);
  }

  async findByName(name: string): Promise<Resto | null> {
    const resto = await this.restoModel.findOne({ name });
    return resto;
  }

  async findByTelephone(telephone: string): Promise<Resto | null> {
    const resto = await this.restoModel.findOne({ telephone });
    return resto;
  }

  async findByAdresse(adresse: string): Promise<Resto | null> {
    const resto = await this.restoModel.findOne({ adresse });
    return resto;
  }
}

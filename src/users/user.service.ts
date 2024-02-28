import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private  userModel: Model<UserDocument>,
  ) {}


  async createUser(createUserDto: CreateUserDto, role: string = 'user'): Promise<User> {
    // Check if the role is provided in the createUserDto
    const userRole = createUserDto.role ? createUserDto.role : role;
  
    // Set the role in the createUserDto
    createUserDto.role = userRole;
  
    const user = new this.userModel(createUserDto);
    return await user.save();
  }



  async updateUser(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async getUserByName(name: string): Promise<User> {
    const user = await this.userModel.findOne({ name });

    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }

    return user;
  }

  async getUserByAdresse(adresse: string): Promise<User> {
    const user = await this.userModel.findOne({ adresse });

    if (!user) {
      throw new NotFoundException(`User with address ${adresse} not found`);
    }

    return user;
  }

  async getUserByTelephone(telephone: string): Promise<User> {
    const user = await this.userModel.findOne({ telephone });

    if (!user) {
      throw new NotFoundException(`User with telephone ${telephone} not found`);
    }

    return user;
  }

  async deleteUserById(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<User> {
     const User = await this.userModel.findOne({ email });
        
     return User;
      }


  async save(User: User): Promise<User> {
    return await User.save();
  }
}

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private  userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    // Create the user
    const user = new this.userModel(createUserDto);
    const createdUser = await user.save();

    return createdUser;
  }

  async createResto(createUserDto: CreateUserDto, authorizationHeader: string): Promise<User> {
    // Decode the token to get user information
    const decodedToken = this.decodeTokenFromHeader(authorizationHeader);
  
    // Check if the user has admin role
    if (decodedToken.role !== 'admin') {
      throw new ForbiddenException('Only admins can create restos');
    }
  
    // Set the role for the user being created
    createUserDto.role = 'resto';
  
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
  
    // Perform the resto creation logic here...
    // ...
  
    // Create the user
    const user = new this.userModel(createUserDto);
    console.log(user)
    const createdUser = await user.save();
  
    return createdUser;
  }
  
  async createLivreur(createUserDto: CreateUserDto, authorizationHeader: string): Promise<User> {
    // Decode the token to get user information
    const decodedToken = this.decodeTokenFromHeader(authorizationHeader);
  
    // Check if the user has resto role
    if (decodedToken.role !== 'resto') {
      throw new ForbiddenException('Only restos can create livreurs');
    }
  
    // Set the role for the user being created
    //createUserDto.role = 'livreur';
  
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
  
    // Perform the livreur creation logic here...
    // ...
  
    // Create the user
    const user = new this.userModel(createUserDto);
    console.log(user)
    const createdUser = await user.save();
  
    return createdUser;
  }
  
  // Helper method to decode token from Authorization header
  private decodeTokenFromHeader(authorizationHeader: string): any {
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = this.jwtService.decode(token);
    return decodedToken;
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

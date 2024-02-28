import { Body, Controller, UseGuards, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { AdminRoles } from 'src/auth/Roles/admin-roles.guard';
import { RestoRoles } from 'src/auth/Roles/resto-roles.guard';
import { RolesGuard } from 'src/auth/Roles/roles.guard';


@Controller('users')
export class UserController {
  constructor(private  userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }


  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('name/:name')
  async getUserByName(@Param('name') name: string) {
    return this.userService.getUserByName(name);
  }

  @Get('adresse/:adresse')
  async getUserByAdresse(@Param('adresse') adresse: string) {
    return this.userService.getUserByAdresse(adresse);
  }

  @Get('telephone/:telephone')
  async getUserByTelephone(@Param('telephone') telephone: string) {
    return this.userService.getUserByTelephone(telephone);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }



  @Post('create-resto')
  @UseGuards(RolesGuard, AdminRoles('admin'))
  async createResto(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('create-livreur')
  @UseGuards(RolesGuard, RestoRoles('resto'))
  async createLivreur(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
 
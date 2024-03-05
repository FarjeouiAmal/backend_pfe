import { Body, Controller, UseGuards, Delete, Get, Param, Post, Put, Headers } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
// import { AdminRoles } from 'src/auth/Roles/admin-roles.guard';
// import { RestoRoles } from 'src/auth/Roles/resto-roles.guard';
 import { RolesGuard } from 'src/auth/Roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UserRole } from './entity/user.entity';
import { Admin, Resto } from 'src/auth/Roles/adminResto.decorator';


@Controller('users')
export class UserController {
  constructor(private  userService: UserService) {}

  // @Post()
  // async createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.createUser(createUserDto);
  // }

  // user.controller.ts
  @Post()
  @UseGuards(RolesGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/create-resto')
  @UseGuards(JwtAuthGuard)
  async createResto(@Body() createUserDto: CreateUserDto, @Headers('authorization') authorizationHeader: string) {
    return this.userService.createResto(createUserDto, authorizationHeader);
  }
  
  @Post('/create-livreur')
  @UseGuards(JwtAuthGuard)
  async createLivreur(@Body() createUserDto: CreateUserDto, @Headers('authorization') authorizationHeader: string) {
    return this.userService.createLivreur(createUserDto, authorizationHeader);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('name/:name')
  async getUserByName(@Param('name') name: string) {
    return this.userService.getUserByName(name);
  }


  @UseGuards(JwtAuthGuard)
  @Get('adresse/:adresse')
  async getUserByAdresse(@Param('adresse') adresse: string) {
    return this.userService.getUserByAdresse(adresse);
  }

  @Get('telephone/:telephone')
  async getUserByTelephone(@Param('telephone') telephone: string) {
    return this.userService.getUserByTelephone(telephone);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

}
 
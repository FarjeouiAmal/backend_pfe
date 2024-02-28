import { Body, Controller, UseGuards, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
// import { AdminRoles } from 'src/auth/Roles/admin-roles.guard';
// import { RestoRoles } from 'src/auth/Roles/resto-roles.guard';
 import { RolesGuard } from 'src/auth/Roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';


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
    const { role, ...rest } = createUserDto; // Extract 'role' separately
    return this.userService.createUser({ ...rest, role });
  }

@Post('create-resto')
@UseGuards(RolesGuard)
async createResto(@Body() createUserDto: CreateUserDto) {
  // Ensure only admins can create restos
  const { role, ...rest } = createUserDto; // Extract 'role' separately
  return this.userService.createUser({ ...rest, role: 'resto' });
}

@Post('create-livreur')
@UseGuards(RolesGuard)
async createLivreur(@Body() createUserDto: CreateUserDto) {
  // Ensure only restos can create livreurs
  const { role, ...rest } = createUserDto; // Extract 'role' separately
  return this.userService.createUser({ ...rest, role: 'livreur' });
}



  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get(':id')
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

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

}
 
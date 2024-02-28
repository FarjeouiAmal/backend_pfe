// repas.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateRepasDto } from './dto/repas.dto';
import { RepasService } from './repas.service';
import { RolesGuard } from '../auth/Roles/roles.guard';

@Controller('repas')
export class RepasController {
  constructor(private readonly repasService: RepasService) {}

  @Post()
  @UseGuards(RolesGuard)
  async createRepas(@Body() createRepasDto: CreateRepasDto) {
    // You may want to check the user role here to ensure it's 'resto'
    // For simplicity, assuming 'resto' role is already checked in AuthService
    return this.repasService.createRepas(createRepasDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  async updateRepas(@Param('id') id: string, @Body() updateRepasDto: CreateRepasDto) {
    // You may want to check the user role here to ensure it's 'resto'
    return this.repasService.updateRepas(id, updateRepasDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  async deleteRepas(@Param('id') id: string) {
    // You may want to check the user role here to ensure it's 'resto'
    return this.repasService.deleteRepas(id);
  }

  @Get(':id')
  async getRepasById(@Param('id') id: string) {
    return this.repasService.getRepasById(id);
  }

  @Get()
  async getAllRepas() {
    return this.repasService.getAllRepas();
  }
}

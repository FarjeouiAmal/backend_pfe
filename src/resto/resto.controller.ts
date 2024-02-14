import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RestoService } from './resto.service';
import { CreatedRestoDto } from './dto/created-resto.dto';
import { UpdateRestoDto } from './dto/update-resto.dto';
import { Resto } from './schemas/resto.schema';  

@Controller('restos')
export class RestoController {
  constructor(private restoService: RestoService) {}

  @Get()
  async getAllRestos(): Promise<Resto[]> {
    return this.restoService.findAll();
  }

  @Post()
  async createdResto(@Body() restoDto: CreatedRestoDto): Promise<Resto> {
    restoDto.role = 'resto'; // Set the role in the DTO
    const restoInstance = new Resto(restoDto);
    return this.restoService.create(restoInstance);
  }

  @Get(':id')
  async getResto(
    @Param('id') id: string,
  ): Promise<Resto> {
    return this.restoService.findById(id);  
  }

  @Put(':id')
  async updateResto(@Param('id') id: string, @Body() restoDto: UpdateRestoDto): Promise<Resto> {
    const restoInstance = new Resto(restoDto);
    return this.restoService.updateById(id, restoInstance);
  }

  @Delete(':id')
  async deleteResto(
    @Param('id') id: string,
  ): Promise<Resto> {
    return this.restoService.deleteById(id);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestoController } from './resto.controller';
import { RestoService } from './resto.service';
import { Resto } from './entity/resto.entity';
import { Menu } from './entity/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resto, Menu])],
  controllers: [RestoController],
  providers: [RestoService],
})
export class RestoModule {}

import { Module } from '@nestjs/common';
import { RestoController } from './resto.controller';
import { RestoService } from './resto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Resto, RestoSchema } from './schemas/resto.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Resto', schema: RestoSchema }])],
  controllers: [RestoController],
  providers: [RestoService],
  exports: [RestoService], // Update export token to service class
})
export class RestoModule {}

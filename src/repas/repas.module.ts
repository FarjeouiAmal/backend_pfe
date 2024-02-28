// repas.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepasController } from './repas.controller';
import { RepasService } from './repas.service';
import { Repas, RepasSchema } from './entity/repas.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Repas.name, schema: RepasSchema }]),
  ],
  controllers: [RepasController],
  providers: [RepasService],
})
export class RepasModule {}

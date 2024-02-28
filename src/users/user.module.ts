// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UserSchema } from './entity/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/Roles/roles.guard';
import { RestoRoles } from 'src/auth/Roles/resto-roles.guard';
import { AdminRoles } from 'src/auth/Roles/admin-roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RolesGuard,
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useValue: RestoRoles },  // Update this line
    { provide: APP_GUARD, useValue: AdminRoles}, 
  ],
})
export class UserModule {}

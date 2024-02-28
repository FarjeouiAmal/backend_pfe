// menu.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu } from './entity/menu.entity';
import { UserModule } from 'src/users/user.module'; // Import the UserModule based on your project structure

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    UserModule, // Include the UserModule for User entity and related functionalities
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}

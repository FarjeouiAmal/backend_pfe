import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './auth/mail/mail.module';
import { RepasModule } from './repas/repas.module';
import { CategorieModule } from './catégorie/categorie.module';
import { MenuModule } from './menu/menu.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthModule,
    MailModule,
    RepasModule,
    CategorieModule,
    MenuModule,

  ],
  controllers: [AppController],
  providers: [AppService],

  
})
export class AppModule  {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthenticationMiddleware).forRoutes('*');
  // }
}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { MailService } from 'src/mail/mail.service';
import { RestoService } from 'src/resto/resto.service';
import { RestoModule } from 'src/resto/resto.module';
import { RestoSchema } from 'src/resto/schemas/resto.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRES'),
        },
      }),
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule, // Include ConfigModule to use ConfigService
    RestoModule, // Include RestoModule in the imports array

    MongooseModule.forFeature([{ name: 'Resto', schema: RestoSchema }]),
    ConfigModule, // Include ConfigModule to use ConfigService
    RestoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, RestoService], // Include other providers
  exports: [AuthService], // Export AuthService if it's used outside this module
})
export class AuthModule {}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
//import { AuthenticationMiddleware } from './auth/authentication.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const authService = app.get(AuthService);
  await authService.createDefaultAdmin();

  // Utiliser un tuyau de validation globale (par exemple, class-validator)
  app.useGlobalPipes(new ValidationPipe());

   // Enable CORS
   app.enableCors({
    origin: 'http://localhost:3003', // Update with your actual frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  });
  
  //app.use(AuthenticationMiddleware);

  await app.listen(3004);
}
bootstrap();

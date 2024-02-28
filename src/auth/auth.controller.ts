  import { Body, Controller, Post, Get, UseGuards, HttpException, HttpStatus, Param, UnauthorizedException } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { SignInDto } from './dto/SignIn.dto';
  import { PasswordResetDto } from './dto/password-reset.dto';

  @Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }

      @Post('forgot-password')
      async forgotPassword(@Body() body: { email: string }) {
        await this.authService.sendPasswordResetEmail(body.email);
        // You may choose to return a success response or simply acknowledge the request
      }
    
      @Post('reset-password/:token')
      async resetPassword(@Body() body: PasswordResetDto, @Param('token') token: string) {
        try {
          await this.authService.resetPassword(token, body.newPassword);
          // Password reset successful, you may want to redirect or return a success response
        } catch (error) {
          throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
        }
      }


  
      @Get('decode-token/:token')
      decodeToken(@Param('token') token: string): Promise<any> {
        try {
          return this.authService.decodeToken(token);
        } catch (error) {
          throw new UnauthorizedException('Invalid or expired token');
        }
      }

      
          
  }


  
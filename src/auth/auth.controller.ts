// auth.controller.ts

import { Body, Controller, Post, Get, Param, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { PasswordResetDto } from './dto/password-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    try {
      const result = await this.authService.signIn(signInDto);
      return { token: result.token };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }


  @Post('/forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    try {
      await this.authService.sendPasswordResetEmail(body.email);
      // You may choose to return a success response or simply acknowledge the request
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/reset-password/:token')
  async resetPassword(@Body() body: PasswordResetDto, @Param('token') token: string) {
    try {
      await this.authService.resetPassword(token, body.newPassword);
      // Password reset successful, you may want to redirect or return a success response
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/decode-token/:token')
  async decodeToken(@Param('token') token: string): Promise<any> {
    try {
      return this.authService.decodeToken(token);
    } catch (error) {

      throw new UnauthorizedException(error.message);
    }
  } 
}

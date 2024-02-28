// auth.service.ts

import { Injectable, UnauthorizedException, BadRequestException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/SignIn.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/users/user.service';
import * as crypto from 'crypto';
import { User, UserDocument } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly userService: UserService, 
  ) {}

  async createDefaultAdmin(): Promise<void> {
    const adminUser = {
      email: 'adminadmin@gmail.com',
      password: 'admin123',
      name: 'admin',
      role: 'admin',
    };

    // Check if the default admin user already exists
    const existingAdmin = await this.UserModel.findOne({ email: adminUser.email });

    if (!existingAdmin) {
      // Create the default admin user if it doesn't exist
      const hashedPassword = await bcrypt.hash(adminUser.password, 10);
      await this.UserModel.create({
        ...adminUser,
        password: hashedPassword,
      });
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;

    // Check if the user with the provided credentials exists
    const user = await this.UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate and return the token
      const token = this.jwtService.sign({ id: user._id, name: user.name, email: user.email, role: user.role });
      return { token };
    } else {
      // Handle invalid credentials
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const resto = await this.userService.findByEmail(email); // Use restoService instead of userService
    if (resto) {
      const resetToken = crypto.randomBytes(32).toString('hex'); // Generate a secure random token
      resto.resetToken = resetToken;
      resto.resetTokenExpires = new Date(Date.now() + 3600000); // Token valid for 1 hour
      await this.userService.save(resto);

      // Send reset email
      await this.mailerService.sendMail({
        to: resto.email,
        subject: 'Password Reset',
        template: 'password-reset',
        context: {
          resetToken,
        },
      });
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Find user by reset token and check if it's still valid
    const user = await this.UserModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Update password if the token is valid
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpires = null;

    // Save the updated user data
    try {
      await user.save();
    } catch (error) {
      throw new BadRequestException('Failed to reset password');
    }
  }

  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

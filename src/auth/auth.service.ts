// auth.service.ts

import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
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

  async registerUser(userDto: any): Promise<void> {
    const { email, password, name, role } = userDto;

    // Check if the user already exists
    const existingUser = await this.UserModel.findOne({ email });

    if (!existingUser) {
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      await this.UserModel.create({
        email,
        password: hashedPassword,
        name,
        role,
      });
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;
  
    const user = await this.UserModel.findOne({ email: email.trim() });
  
    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);
  
      if (passwordMatches) {
        const { _id, name, email, role } = user;
        const token = this.jwtService.sign({ id: _id, name, email, role });
        return { token };
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } else {
      throw new UnauthorizedException('User not found');
    }
  }
  

  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetToken = resetToken;
      user.resetTokenExpires = new Date(Date.now() + 3600000);
      await this.userService.save(user);

      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Password Reset',
        template: 'password-reset',
        context: {
          resetToken,
        },
      });
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.UserModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpires = null;

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

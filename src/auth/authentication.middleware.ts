// authentication.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: any, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token) {
      const user = await this.authService.verifyToken(token);
      req.user = user;
    }
    next();
  }
}

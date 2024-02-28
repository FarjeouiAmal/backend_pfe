// // authentication.middleware.ts
// import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Injectable()
// export class AuthenticationMiddleware implements NestMiddleware {
//   constructor(private readonly authService: AuthService) {}

//   async use(req: any, res: Response, next: () => void) {
//     const token = req.headers.authorization;
//     if (token) {
//       const user = await this.authService.verifyToken(token);
//       req.user = user;

//       // Check user roles
//       if (!this.checkRoles(user)) {
//         // User doesn't have the required role, throw an exception or handle accordingly
//         throw new ForbiddenException('Insufficient permissions');
//       }
//     }
//     next();
//   }

//   private checkRoles(user: any): boolean {
//     // Implement your logic for checking user roles
//     if (!user || !user.role) {
//       // Assuming you have a role property in your user object
//       return false;
//     }

//     // Allow both 'admin' and 'resto' roles
//     return ['admin', 'resto'].includes(user.role);
//   }
// }

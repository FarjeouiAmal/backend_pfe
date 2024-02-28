// resto-roles.guard.ts
import { SetMetadata } from '@nestjs/common';

export const RestoRoles = (...roles: string[]) => SetMetadata('roles', roles);

// admin-roles.guard.ts
import { SetMetadata } from '@nestjs/common';

export const AdminRoles = (...roles: string[]) => SetMetadata('roles', roles);

import { UserRole } from '@prisma/client';

export interface I_User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  permissions: UserRole[];
}

export interface I_AuthenticationToken {
  id: number;
  expiry: number;
}

export interface I_AuthenticatedUser extends I_User {
  password: string;
}


import { UserRole } from "@prisma/client";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  permissions: UserRole[];
}

export interface AuthenticationToken {
  id: number;
  expiry: number;
}

export interface AuthenticatedUser extends User {
  password: string;
}

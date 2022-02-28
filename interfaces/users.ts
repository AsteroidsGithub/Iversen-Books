export interface User {
  id: number;
  name: string;
  email: string;
}

export type AuthencationRoles = {
  admin: Boolean | undefined;
  publisher: Boolean | undefined;
  teacher: Boolean | undefined;
  student: Boolean | undefined;
};

export interface AuthenticatedUser extends User {
  roles: AuthencationRoles;
  password: string;
}

import { UserRole } from '@prisma/client';
import { I_BookJSON } from './books';

export interface I_User {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Permissions: UserRole[];
}

export interface I_AuthenticationToken {
  id: number;
  expiry: number;
}

export interface I_AuthenticatedUser extends I_User {
  password: string;
}

export interface I_Class {
  Id: number;
  Name: string;
  Teacher: I_User;
  Students: I_Student[];
}

export interface I_Student {
  Id: number;
  FirstName: string;
  LastName: string;
  Class: I_Class[];
  StudentProgress: I_StudentProgress[];
}

export interface I_StudentProgress {
  Id: number;
  Book: I_BookJSON;
  Student: I_Student;
  Time: number;
  StruggledWords: String[];
}

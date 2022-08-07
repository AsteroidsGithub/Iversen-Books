import { I_BookJSON } from '@Interfaces/books';



import { PrismaClient } from '@prisma/client';

export type UserRole = 'Admin' | 'Publisher' | 'Teacher';

export interface StruggleWord {
  id: number;
  count: number;
  value:
    | 'New Skill'
    | 'Previous Skill'
    | 'New High-Frequency'
    | 'Previous High-Frequency'
    | 'Photo / Context Aware';
  words: string[];
  StudentProgress: StudentProgress;
}

export interface StudentProgress {
  id: number;
  time: number;
  struggledWords: StruggleWord[];
  book: Book;
  student: Student;
}

export interface Book {
  id: number;
  json: I_BookJSON;
  url: string;
  studentProgress: StudentProgress[];
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  class: Class;
  studentProgress: StudentProgress[];
}

export interface Class {
  id: number;
  name: string;
  students: Student[];
  teacher: User;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  permissions: UserRole[];
  classes: Class[];
}

export default new PrismaClient();
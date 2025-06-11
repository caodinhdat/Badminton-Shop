import type { Student } from '@/types/student';
import { MOCK_STUDENTS } from '@/utils/constants';

export class StudentService {
  // Simulate API call to get students
  static async getStudents(): Promise<Student[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_STUDENTS]);
      }, 300);
    });
  }

  // Simulate API call to create student
  static async createStudent(student: Omit<Student, 'id'>): Promise<Student> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent = {
          ...student,
          id: Math.max(...MOCK_STUDENTS.map(s => s.id)) + 1
        };
        resolve(newStudent);
      }, 500);
    });
  }

  // Simulate API call to update student
  static async updateStudent(student: Student): Promise<Student> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(student);
      }, 500);
    });
  }

  // Simulate API call to delete student
  static async deleteStudent(id: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  }
}
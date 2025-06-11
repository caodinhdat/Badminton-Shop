import { ref, computed, reactive } from 'vue';
import type { Student, StudentFilters } from '@/types/student';
import { StudentService } from '@/services/studentService';

export function useStudent() {
  const students = ref<Student[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const filters = reactive<StudentFilters>({
    university: '',
    searchQuery: '',
    selectedDate: '2024-04-25'
  });

  const filteredStudents = computed(() => {
    let filtered = students.value;

    // Filter by university
    if (filters.university) {
      filtered = filtered.filter(student => 
        student.university === filters.university
      );
    }

    // Filter by search query
    if (filters.searchQuery) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    return filtered;
  });

  const loadStudents = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      students.value = await StudentService.getStudents();
    } catch (err) {
      error.value = 'Failed to load students';
      console.error('Error loading students:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const createStudent = async (studentData: Omit<Student, 'id'>) => {
    try {
      isLoading.value = true;
      const newStudent = await StudentService.createStudent(studentData);
      students.value.push(newStudent);
      return newStudent;
    } catch (err) {
      error.value = 'Failed to create student';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateStudent = async (studentData: Student) => {
    try {
      isLoading.value = true;
      const updatedStudent = await StudentService.updateStudent(studentData);
      const index = students.value.findIndex(s => s.id === updatedStudent.id);
      if (index !== -1) {
        students.value[index] = updatedStudent;
      }
      return updatedStudent;
    } catch (err) {
      error.value = 'Failed to update student';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const clearFilters = () => {
    filters.university = '';
    filters.searchQuery = '';
  };

  return {
    students,
    filteredStudents,
    filters,
    isLoading,
    error,
    loadStudents,
    createStudent,
    updateStudent,
    clearFilters
  };
}
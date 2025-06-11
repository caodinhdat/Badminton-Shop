export interface Student {
  id: number;
  university: string;
  department: string;
  class: string;
  name: string;
  phone: string;
}

export interface StudentFilters {
  university: string;
  searchQuery: string;
  selectedDate: string;
}

export interface StudentState {
  students: Student[];
  filteredStudents: Student[];
  filters: StudentFilters;
  isLoading: boolean;
}
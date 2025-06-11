<template>
  <div class="student-view">
    <h1 class="page-title">Student</h1>
    
    <StudentFilters
      :filters="filters"
      @update:filters="filters = $event"
      @display="handleDisplay"
    />
    
    <StudentTable 
      :students="filteredStudents"
      :is-loading="isLoading"
    />
    
    <div class="action-buttons">
      <BaseButton 
        variant="success" 
        @click="handleCreate"
        :loading="isLoading"
      >
        Create
      </BaseButton>
      <BaseButton 
        variant="warning" 
        @click="handleEdit"
        :disabled="isLoading"
      >
        Edit
      </BaseButton>
      <BaseButton 
        variant="primary" 
        @click="handleSave"
        :loading="isLoading"
      >
        Save
      </BaseButton>
    </div>

    <!-- Error message -->
    <div v-if="error" class="error-message">
      {{ error }}
      <button @click="error = null" class="error-close">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStudent } from '@/composables/useStudent';
import StudentFilters from '@/components/student/StudentFilters.vue';
import StudentTable from '@/components/student/StudentTable.vue';
import BaseButton from '@/components/common/BaseButton.vue';

const {
  students,
  filteredStudents,
  filters,
  isLoading,
  error,
  loadStudents,
  createStudent,
  updateStudent,
  clearFilters
} = useStudent();

onMounted(() => {
  loadStudents();
});

const handleDisplay = () => {
  console.log('Display clicked with filters:', filters);
  // This could trigger a new API call with filters
  loadStudents();
};

const handleCreate = () => {
  console.log('Create student clicked');
  // Example: Open modal or navigate to create form
  // For demo, let's create a sample student
  const newStudent = {
    university: 'University A',
    department: 'Computer Science',
    class: 'Class 5',
    name: `Student ${Date.now()}`,
    phone: '555-9999'
  };
  createStudent(newStudent);
};

const handleEdit = () => {
  console.log('Edit student clicked');
  // Example: Open edit modal or navigate to edit form
  if (students.value.length > 0) {
    const studentToEdit = { ...students.value[0] };
    studentToEdit.name = `${studentToEdit.name} (Edited)`;
    updateStudent(studentToEdit);
  }
};

const handleSave = () => {
  console.log('Save students clicked');
  // Example: Save all changes to server
  alert('Students saved successfully!');
};
</script>

<style scoped>
.student-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.page-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.error-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #f8d7da;
  color: #721c24;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
}

.error-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #721c24;
  padding: 0;
  line-height: 1;
}

@media (max-width: 768px) {
  .student-view {
    padding: 15px;
  }
  
  .page-title {
    font-size: 36px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
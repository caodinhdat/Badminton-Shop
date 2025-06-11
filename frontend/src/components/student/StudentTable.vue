<template>
  <div class="student-table-container">
    <div class="table-wrapper">
      <table class="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>University</th>
            <th>Department</th>
            <th>Class</th>
            <th>Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="6" class="loading-cell">
              <div class="loading-spinner"></div>
              Loading students...
            </td>
          </tr>
          <tr v-else-if="students.length === 0">
            <td colspan="6" class="empty-cell">
              No students found
            </td>
          </tr>
          <tr 
            v-else
            v-for="student in students" 
            :key="student.id"
            class="student-row"
          >
            <td>{{ student.id }}</td>
            <td>{{ student.university }}</td>
            <td>{{ student.department }}</td>
            <td>{{ student.class }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Student } from '@/types/student';

interface Props {
  students: Student[];
  isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  isLoading: false
});
</script>

<style scoped>
.student-table-container {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-x: auto;
}

.student-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  min-width: 600px;
}

.student-table th {
  background: #f8f9fa;
  padding: 15px 12px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #ddd;
  white-space: nowrap;
}

.student-table td {
  padding: 15px 12px;
  border-bottom: 1px solid #eee;
  color: #333;
}

.student-row:hover {
  background: #f8f9fa;
}

.student-table tbody tr:last-child td {
  border-bottom: none;
}

.loading-cell,
.empty-cell {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-style: italic;
}

.loading-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
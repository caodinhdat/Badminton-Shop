<template>
  <div class="student-filters">
    <div class="filters-row">
      <BaseInput
        v-model="localFilters.selectedDate"
        type="date"
        class="date-input"
      />
      
      <BaseSelect
        v-model="localFilters.university"
        :options="universityOptions"
        placeholder="Select university"
        class="university-select"
      />
      
      <BaseButton variant="primary" @click="handleDisplay">
        Display
      </BaseButton>
    </div>
    
    <BaseInput
      v-model="localFilters.searchQuery"
      placeholder="Search by name"
      class="search-input"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { StudentFilters } from '@/types/student';
import { UNIVERSITIES } from '@/utils/constants';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import BaseButton from '@/components/common/BaseButton.vue';

interface Props {
  filters: StudentFilters;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:filters': [filters: StudentFilters];
  display: [];
}>();

const localFilters = reactive<StudentFilters>({ ...props.filters });

const universityOptions = UNIVERSITIES.map(uni => ({
  value: uni,
  label: uni
}));

// Watch for changes and emit updates
watch(localFilters, (newFilters) => {
  emit('update:filters', { ...newFilters });
}, { deep: true });

const handleDisplay = () => {
  emit('display');
};
</script>

<style scoped>
.student-filters {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.filters-row {
  display: flex;
  gap: 15px;
  align-items: end;
}

.date-input {
  min-width: 200px;
}

.university-select {
  flex: 1;
}

.search-input {
  width: 100%;
}

@media (max-width: 768px) {
  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .date-input {
    min-width: auto;
  }
}
</style>
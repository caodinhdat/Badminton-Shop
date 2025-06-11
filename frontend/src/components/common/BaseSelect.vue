<template>
  <div class="base-select">
    <label v-if="label" :for="selectId" class="base-select__label">
      {{ label }}
    </label>
    <select
      :id="selectId"
      :value="modelValue"
      :disabled="disabled"
      :class="selectClasses"
      @change="onChange"
    >
      <option value="">{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Option {
  value: string;
  label: string;
}

interface Props {
  modelValue: string;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option'
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;

const selectClasses = computed(() => [
  'base-select__field',
  {
    'base-select__field--disabled': props.disabled
  }
]);

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.base-select__label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.base-select__field {
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.base-select__field:focus {
  outline: none;
  border-color: #007bff;
}

.base-select__field--disabled {
  background: #f8f9fa;
  cursor: not-allowed;
}
</style>
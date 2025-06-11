<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @input="onInput"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <span v-if="error" class="base-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  type?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [];
  focus: [];
}>();

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

const inputClasses = computed(() => [
  'base-input__field',
  {
    'base-input__field--error': props.error,
    'base-input__field--disabled': props.disabled
  }
]);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.base-input__label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.base-input__field {
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;
}

.base-input__field:focus {
  outline: none;
  border-color: #007bff;
}

.base-input__field--error {
  border-color: #dc3545;
}

.base-input__field--disabled {
  background: #f8f9fa;
  cursor: not-allowed;
}

.base-input__field::placeholder {
  color: #999;
}

.base-input__error {
  font-size: 12px;
  color: #dc3545;
}
</style>
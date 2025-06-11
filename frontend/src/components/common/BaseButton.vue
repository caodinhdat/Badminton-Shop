<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
});

defineEmits<{
  click: [];
}>();

const buttonClasses = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'base-button--disabled': props.disabled,
    'base-button--loading': props.loading
  }
]);
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.base-button--sm {
  padding: 8px 16px;
  font-size: 12px;
}

.base-button--md {
  padding: 12px 24px;
  font-size: 14px;
}

.base-button--lg {
  padding: 16px 32px;
  font-size: 16px;
}

.base-button--primary {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.base-button--primary:hover:not(:disabled) {
  background: #0056b3;
  border-color: #0056b3;
}

.base-button--secondary {
  background: white;
  color: #333;
  border-color: #ddd;
}

.base-button--secondary:hover:not(:disabled) {
  border-color: #007bff;
  color: #007bff;
}

.base-button--success {
  background: #28a745;
  color: white;
  border-color: #28a745;
}

.base-button--warning {
  background: #ffc107;
  color: #333;
  border-color: #ffc107;
}

.base-button--danger {
  background: #dc3545;
  color: white;
  border-color: #dc3545;
}

.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
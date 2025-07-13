import { reactive, readonly } from 'vue';
import type { ValidationRule } from '../types/auth';

// Interface cho form data - đơn giản và rõ ràng
interface FormData {
  [fieldName: string]: string;
}

// Interface cho validation rules
interface FormValidationRules {
  [fieldName: string]: ValidationRule;
}

// Interface cho errors
interface FormErrors {
  [fieldName: string]: string;
}

export const useForm = (initialValues: FormData) => {
  // Khởi tạo form data
  const formData = reactive<FormData>({ ...initialValues });
  
  // Khởi tạo errors object
  const errors = reactive<FormErrors>({});

  // Validate một field cụ thể
  const validateField = (fieldName: string, value: string, rules: ValidationRule = {}) => {
    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      errors[fieldName] = `${fieldName} is required`;
      return false;
    }

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      errors[fieldName] = `${fieldName} must be at least ${rules.minLength} characters`;
      return false;
    }

    // Email validation
    if (rules.email && value && !/\S+@\S+\.\S+/.test(value)) {
      errors[fieldName] = 'Invalid email';
      return false;
    }

    // Xóa lỗi nếu validation thành công
    delete errors[fieldName];
    return true;
  };

  // Validate toàn bộ form
  const validateForm = (validationRules: FormValidationRules): boolean => {
    let isValid = true;
    
    // Duyệt qua từng field và validate
    for (const fieldName in validationRules) {
      const fieldValue = formData[fieldName] || '';
      const fieldRules = validationRules[fieldName];
      
      const fieldValid = validateField(fieldName, fieldValue, fieldRules);
      if (!fieldValid) {
        isValid = false;
      }
    }
    
    return isValid;
  };

  // Reset form về trạng thái ban đầu
  const resetForm = () => {
    // Reset form data
    for (const key in formData) {
      formData[key] = initialValues[key] || '';
    }
    
    // Xóa tất cả errors
    for (const key in errors) {
      delete errors[key];
    }
  };

  // Set giá trị cho một field
  const setFieldValue = (fieldName: string, value: string) => {
    formData[fieldName] = value;
  };

  // Set error cho một field
  const setError = (fieldName: string, message: string) => {
    errors[fieldName] = message;
  };

  // Xóa tất cả errors
  const clearErrors = () => {
    for (const key in errors) {
      delete errors[key];
    }
  };

  // Xóa error của một field cụ thể
  const clearFieldError = (fieldName: string) => {
    delete errors[fieldName];
  };

  // Kiểm tra xem form có lỗi không
  const hasErrors = (): boolean => {
    return Object.keys(errors).length > 0;
  };

  // Kiểm tra xem một field có lỗi không
  const hasFieldError = (fieldName: string): boolean => {
    return !!errors[fieldName];
  };

  return {
    // Data
    formData,
    errors: readonly(errors),
    
    // Methods
    validateField,
    validateForm,
    resetForm,
    setFieldValue,
    setError,
    clearErrors,
    clearFieldError,
    hasErrors,
    hasFieldError
  };
};
<template>
  <div class="register-container">
    <form @submit.prevent="handleSubmit" class="register-card">
      <h2 class="register-title">Create an account</h2>
      <p class="register-subtitle">Please fill in the information below</p>

      <!-- Username -->
      <div class="form-group">
        <label class="form-label">User name</label>
        <input 
          type="text" 
          v-model="formData.username"
          class="form-input"
          :class="{ error: hasFieldError('username') }"
          placeholder="Enter your user name"
          @blur="validateUsername"
        />
        <div v-if="hasFieldError('username')" class="error-message">
          {{ errors.username }}
        </div>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label class="form-label">Email</label>
        <input 
          type="email" 
          v-model="formData.email"
          class="form-input"
          :class="{ error: hasFieldError('email') }"
          placeholder="Enter your email"
          @blur="validateEmail"
        />
        <div v-if="hasFieldError('email')" class="error-message">
          {{ errors.email }}
        </div>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label class="form-label">Password</label>
        <input 
          type="password" 
          v-model="formData.password"
          class="form-input"
          :class="{ error: hasFieldError('password') }"
          placeholder="Enter your password"
          @blur="validatePassword"
        />
        <div v-if="hasFieldError('password')" class="error-message">
          {{ errors.password }}
        </div>
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label class="form-label">Confirm password</label>
        <input 
          type="password" 
          v-model="formData.confirmPassword"
          class="form-input"
          :class="{ error: hasFieldError('confirmPassword') }"
          placeholder="Re-enter your password"
          @blur="validateConfirmPassword"
        />
        <div v-if="hasFieldError('confirmPassword')" class="error-message">
          {{ errors.confirmPassword }}
        </div>
      </div>

      <!-- Error / Success -->
      <div v-if="error" class="error-message text-center">{{ error }}</div>
      <div v-if="success" class="success-message text-center">{{ success }}</div>

      <!-- Submit -->
      <button type="submit" class="btn-submit" :disabled="loading">
        <span v-if="loading" class="loading"></span>
        {{ loading ? 'Registering...' : 'Register' }}
      </button>

      <p class="login-footer">
        Already have an account?
        <RouterLink to="/login" class="login-link">Sign in</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '../composables/useForm'
import { useAuth } from '../composables/useAuth'

const emit = defineEmits(['success'])

const {
  formData,
  errors,
  validateForm,
  resetForm,
  validateField,
  setError,
  hasFieldError
} = useForm({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const { register, loading, error, success } = useAuth()

const validationRules = {
  username: { required: true, minLength: 3 },
  email: { required: true, email: true },
  password: { required: true, minLength: 6 },
  confirmPassword: { required: true, minLength: 6 }
}

const validateUsername = () => {
  validateField('username', formData.username, validationRules.username)
}

const validateEmail = () => {
  validateField('email', formData.email, validationRules.email)
}

const validatePassword = () => {
  validateField('password', formData.password, validationRules.password)
}

const validateConfirmPassword = () => {
  validateField('confirmPassword', formData.confirmPassword, validationRules.confirmPassword)
  if (formData.password !== formData.confirmPassword) {
    setError('confirmPassword', 'Passwords do not match')
  }
}

const handleSubmit = async () => {
  if (!validateForm(validationRules)) return

  if (formData.password !== formData.confirmPassword) {
    setError('confirmPassword', 'Passwords do not match')
    return
  }

  try {
    await register(formData.username, formData.email, formData.password)
    console.log('Registration successful')
    // resetForm()
    emit('success') 
  } catch (err) {
    console.error('Registration failed:', err)
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.register-card {
  background: #fff;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.register-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.register-subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #7c3aed;
}

.form-input.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

.success-message {
  color: green;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.btn-submit {
  background: #7c3aed;
  color: #fff;
  border: none;
  padding: 0.8rem;
  width: 100%;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-submit:hover {
  background: #6b21a8;
}

.btn-submit:disabled {
  background: #a78bfa;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 1.5rem;
  font-size: 0.85rem;
}

.login-link {
  color: #7c3aed;
  font-weight: 500;
  text-decoration: none;
  margin-left: 0.2rem;
}

.login-link:hover {
  text-decoration: underline;
}

.text-center {
  text-align: center;
}
</style>

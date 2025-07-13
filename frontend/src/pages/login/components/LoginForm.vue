<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit" class="login-card">
      <h2 class="login-title">Welcome back</h2>
      <p class="login-subtitle">Please enter your details to sign in</p>

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

      <!-- Remember & Forgot -->
      <div class="form-options">
        <label>
          <input type="checkbox" /> Remember for 30 days
        </label>
        <a href="#" class="forgot-link">Forgot password?</a>
      </div>

      <!-- Error / Success -->
      <div v-if="error" class="error-message text-center">{{ error }}</div>
      <div v-if="success" class="success-message text-center">{{ success }}</div>

      <!-- Submit -->
      <button type="submit" class="btn-submit" :disabled="loading">
        <span v-if="loading" class="loading"></span>
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>

      <p class="signup-footer">
        Don’t have an account?
        <RouterLink to="/register" class="create-link">Create account</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '../composables/useForm';
import { useAuth } from '../composables/useAuth';

const { 
  formData, 
  errors, 
  validateForm, 
  resetForm, 
  validateField, 
  hasFieldError 
} = useForm({
  username: '',
  password: ''
});

const { login, loading, error, success } = useAuth();

const validationRules = {
  username: { required: true, minLength: 3 },
  password: { required: true, minLength: 6 }
};

const validateUsername = () => {
  validateField('username', formData.username, validationRules.username);
};

const validatePassword = () => {
  validateField('password', formData.password, validationRules.password);
};

const handleSubmit = async () => {
  if (!validateForm(validationRules)) return;

  try {
    await login(formData.username, formData.password);
    resetForm();
  } catch (err) {
    console.error('Login failed:', err);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-card {
  background: #fff;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.login-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.login-subtitle {
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin: 0.5rem 0 1.2rem;
}

.forgot-link {
  color: #7c3aed;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
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

.signup-footer {
  margin-top: 1.5rem;
  font-size: 0.85rem;
}

.create-link {
  color: #7c3aed;
  font-weight: 500;
  text-decoration: none;
  margin-left: 0.2rem;
}

.create-link:hover {
  text-decoration: underline;
}

.text-center {
  text-align: center;
}
</style>

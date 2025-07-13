import { ref, readonly } from 'vue';
import { authService } from '../services/authService';
import type { User } from '../types/auth';

export const useAuth = () => {
  const loading = ref(false);
  const error = ref('');
  const success = ref('');
  const user = ref<User | null>(null);

  const login = async (username: string, password: string) => {
    loading.value = true;
    error.value = '';
    success.value = '';

    try {
      const result = await authService.login(username, password);
      success.value = 'Login Successful!';
      user.value = result.user || null;
      
      // Lưu token vào localStorage
      if (result.token) {
        localStorage.setItem('token', result.token);
      }
      
      return result;
    } catch (err) {
      error.value = (err as Error).message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    loading.value = true;
    error.value = '';
    success.value = '';

    try {
      const result = await authService.register(username, email, password);
      success.value = result.message || 'Register Success!';
      console.log('Registration successful: ', result);
      return result;
    } catch (err) {
      error.value = (err as Error).message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      user.value = null;
      success.value = 'Logout Successful!';
    } catch (err) {
      error.value = 'Logout Failed';
    }
  };

  const clearMessages = () => {
    error.value = '';
    success.value = '';
  };

  return {
    // State
    loading: readonly(loading),
    error: readonly(error),
    success: readonly(success),
    user: readonly(user),
    
    // Actions
    login,
    register,
    logout,
    clearMessages
  };
};
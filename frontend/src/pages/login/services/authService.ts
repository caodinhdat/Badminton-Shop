import http from '@/service/http';
import type { User, AuthResponse } from '../types/auth';

class AuthService {
  private baseURL = '/api';

  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await http.post(`${this.baseURL}/login`, {
        username,
        password,
      });
      console.log('response: ', response);
      const { token, user } = response.data;

      // Lưu token vào localStorage
      localStorage.setItem('token', token);

      return {
        success: true,
        user,
        token,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login Failed');
    }
  }

  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await http.post(`${this.baseURL}/register`, {
        username,
        email,
        password,
      });
      console.log('response', response);
      return {
        success: true,
        message: response.data?.message || 'Register Success!',
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Register Failed');
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    // Nếu backend có API logout thực, có thể gọi thêm ở đây
    // await http.post(`${this.baseURL}/logout`);
  }

  getCurrentUser(): User | null {
    const token = localStorage.getItem('token');
    if (token) {
      // Giải mã JWT nếu bạn muốn lấy thông tin user
      // Cần cài thư viện: jwt-decode
      // const decoded = jwtDecode(token);
      // return { id: decoded.sub, username: decoded.username, email: decoded.email };
      return null; // Placeholder cho đến khi có giải mã token
    }
    return null;
  }
}

export const authService = new AuthService();

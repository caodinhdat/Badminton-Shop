export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  email?: boolean;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

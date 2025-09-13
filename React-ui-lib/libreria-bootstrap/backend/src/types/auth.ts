export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: { id: number; username: string; role: 'admin' | 'user' }; // ajusta roles
}
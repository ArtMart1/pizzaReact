import api from '../http/index';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/Auth-response';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/login', { email, password });
  }
  // В AuthService.ts при регистрации
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    try {
      const response = await api.post<AuthResponse>('/registration', { email, password });
      console.log('Response from server:', response.data);
      return response;
    } catch (error: any) {
      console.error('Error in registration request:', error.response || error.message);
      throw error;
    }
  }
  static async logout(): Promise<void> {
    return api.post('/logout');
  }
}

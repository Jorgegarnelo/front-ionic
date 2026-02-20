import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  async login(credentials: { email: string; password: string }) {
    const response: any = await firstValueFrom(
      this.http.post(`${this.apiUrl}/login`, credentials)
    );

    if (response && response.user) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user.id.toString());
      localStorage.setItem('role', response.user.role);
    }

    return response;
  }

  async register(userData: any) {
    return await firstValueFrom(
      this.http.post(`${this.apiUrl}/register`, userData)
    );
  }

  logout() {
    localStorage.clear();
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

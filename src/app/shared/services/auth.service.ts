import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://294.cyrotech.ch/users';

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }


  constructor(private http: HttpClient) {}

  /**
   * Führt den Login durch und gibt das JWT-Token zurück
   * @returns Observable mit dem API-Response
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  /**
   * Speichert das Token im localStorage
   * @param token JWT-Token
   */
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Holt das gespeicherte Token
   * @returns Das Token oder null
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Löscht das gespeicherte Token (Logout)
   */
  logout(): void {
    localStorage.removeItem('authToken');
  }
}

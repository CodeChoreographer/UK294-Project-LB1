import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://294.cyrotech.ch/auth'; // Basis-URL für Authentifizierung

  constructor(private http: HttpClient) {}

  /**
   * Führt den Login durch und gibt das JWT-Token zurück
   * @returns Observable mit dem API-Response
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
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

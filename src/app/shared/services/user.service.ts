import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://294.cyrotech.ch/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentifizierungs-Token fehlt');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }

  promoteToAdmin(userId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentifizierungs-Token fehlt');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/${userId}/promote`, {}, { headers });
  }
}

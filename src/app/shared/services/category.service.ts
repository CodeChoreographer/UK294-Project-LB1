import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://294.cyrotech.ch/categories';

  constructor(private http: HttpClient) {}

  createCategory(categoryData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentifizierungs-Token fehlt ');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}`, categoryData, { headers });
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getCategoryById(id: number): Observable<any> {
     return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateCategory(categoryData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentifizierungs-Token fehlt');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.apiUrl}/${categoryData.id}`, categoryData, {
      headers,
    });
  }


  deleteCategory(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentifizierungs-Token fehlt');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

}

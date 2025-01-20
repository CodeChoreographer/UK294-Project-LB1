import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://294.cyrotech.ch/products';

  constructor(private http: HttpClient) {
  }

  createProduct(productData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentifizierungs-Token fehlt ');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}`, productData, {headers});
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  updateProduct(productData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<any>(
      `https://294.cyrotech.ch/products/${productData.id}`,
      productData,
      {headers}
    );
  }

  deleteProduct(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<any>(`https://294.cyrotech.ch/products/${id}`, { headers });
  }

}

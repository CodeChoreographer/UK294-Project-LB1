import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Router } from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [
    CurrencyPipe
  ],
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(private productService: ProductService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.checkAdminStatus();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Laden der Produkte.';
        console.error(err);
      }
    });
  }

  checkAdminStatus(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.isAdmin = decodedToken?.roles?.includes('admin');
      } catch (error) {
        console.error('Fehler beim Decodieren des Tokens:', error);
        this.isAdmin = false;
      }
    } else {
      this.isAdmin = false;
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }
}

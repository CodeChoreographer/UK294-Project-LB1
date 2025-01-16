import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import {CurrencyPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CurrencyPipe,
    NgForOf,
    NgOptimizedImage,
    NgIf
  ]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Laden der Produkte.';
      },
    });
  }
  goToProductDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }
}

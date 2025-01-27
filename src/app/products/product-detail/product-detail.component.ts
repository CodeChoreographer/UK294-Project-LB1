import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {MatAnchor, MatButton} from '@angular/material/button';
import { ProductControllerService, ProductDetailDto } from '../../shared/services/openAPI';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  imports: [
    CurrencyPipe,
    MatAnchor,
    RouterLink
  ],
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: ProductDetailDto | null = null;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductControllerService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductDetails(+productId);
    }
  }

  loadProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data: ProductDetailDto) => {
        this.product = data;
      },
      error: () => {
        this.errorMessage = 'Fehler beim Laden der Produktdetails.';
      },
    });
  }
}

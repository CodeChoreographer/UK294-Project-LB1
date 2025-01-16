import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class ProductCreateComponent {
  productData = {
    sku: '',
    active: true,
    name: '',
    image: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: 0,
  };

  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(): void {
    this.productService.createProduct(this.productData).subscribe({
      next: () => {
        alert('Produkt erfolgreich erstellt!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Fehler beim Erstellen des Produkts.';
      },
    });
  }
}

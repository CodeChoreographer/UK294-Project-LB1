import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { ProductControllerService, CategoryControllerService, ProductCreateDto, CategoryShowDto } from '../../shared/services/openAPI';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  imports: [
    FormsModule,
    MatSlideToggle,
    MatButton,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    MatInput,
    MatTooltip
  ],
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  productData: ProductCreateDto = {
    sku: '',
    active: true,
    name: '',
    image: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: 0,
  };

  categories: CategoryShowDto[] = [];
  errorMessage: string = '';

  constructor(
    private productService: ProductControllerService,
    private categoryService: CategoryControllerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data: CategoryShowDto[]) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Fehler beim Laden der Kategorien:', err);
        this.errorMessage = 'Fehler beim Laden der Kategorien.';
      },
    });
  }

  onSubmit(): void {
    this.productService.createProduct(this.productData).subscribe({
      next: () => {
        alert('Produkt erfolgreich erstellt!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Fehler beim Erstellen des Produkts.';
      },
    });
  }

  goBackToProducts(): void {
    this.router.navigate(['/products']);
  }
}

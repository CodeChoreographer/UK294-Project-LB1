import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatLabel, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import {
  ProductControllerService,
  CategoryControllerService,
  ProductCreateDto,
  CategoryShowDto
} from '../../shared/services/openAPI';

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
    MatTooltip,
    MatAnchor,
    RouterLink,
    MatError
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
    private toastr: ToastrService,
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
        this.toastr.error('Fehler beim Laden der Kategorien.', 'Fehler');
      },
    });
  }

  onSubmit(): void {
    this.productService.createProduct(this.productData).subscribe({
      next: () => {
        this.toastr.success('Produkt erfolgreich erstellt!', 'Erfolg');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Fehler beim Erstellen des Produkts.';
        this.toastr.error(errorMsg, 'Fehler');
      },
    });
  }
}

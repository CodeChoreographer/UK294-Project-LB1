import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  CategoryControllerService,
  CategoryShowDto,
  ProductControllerService,
  ProductDetailDto
} from '../../shared/services/openAPI';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  imports: [MatSlideToggleModule, MatSelectModule, FormsModule, MatInput, MatButton],
})
export class ProductEditComponent implements OnInit {
  productData: ProductDetailDto | null = null;
  categories: Array<CategoryShowDto> = [];
  errorMessage: string = '';
  isAdmin: boolean = false;
  productId: number | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductControllerService,
    private categoryService: CategoryControllerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.params['id'];
    this.checkAdminStatus();
    this.loadProduct();
    this.loadCategories();
  }

  checkAdminStatus(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: () => (this.errorMessage = 'Fehler beim Laden der Kategorien.'),
    });
  }

  loadProduct(): void {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (data) => {
          this.productData = data;
        },
        error: () => (this.errorMessage = 'Fehler beim Laden des Produkts.'),
      });
    }
  }

  onSave(): void {
    if (this.productId && this.productData) {
      this.productService.updateProductById(this.productId, this.productData).subscribe({
        next: () => {
          alert('Produkt erfolgreich aktualisiert!');
          this.router.navigate(['/products']);
        },
        error: () => {
          this.errorMessage = 'Fehler beim Speichern des Produkts.';
        },
      });
    } else {
      console.error('Produkt-ID und Produktdaten sind erforderlich.');
    }
  }

  onDelete(): void {
    const userConfirmed = confirm('Möchten Sie dieses Produkt wirklich löschen?');
    if (!userConfirmed) {
      return;
    }
    if (this.isAdmin && this.productId) {
      this.productService.deleteProductById(this.productId).subscribe({
        next: () => {
          alert('Produkt erfolgreich gelöscht!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.errorMessage = 'Fehler beim Löschen des Produkts.';
          console.error(err);
        },
      });
    }
  }
}

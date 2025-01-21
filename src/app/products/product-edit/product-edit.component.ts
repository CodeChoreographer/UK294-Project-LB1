import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from '../../shared/services/category.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  imports: [MatSlideToggleModule, MatSelectModule, FormsModule, MatInput, MatButton],
})
export class ProductEditComponent implements OnInit {
  productData: any = null;
  categories: any[] = [];
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    this.loadProduct();
    this.loadCategories();
  }

  checkAdminStatus(): void {
    const token = localStorage.getItem('authToken');
    this.isAdmin = !!token;
  }
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: () => (this.errorMessage = 'Fehler beim Laden der Kategorien.'),
    });
  }

  loadProduct(): void {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe({
      next: (data) => (this.productData = data),
      error: () => (this.errorMessage = 'Fehler beim Laden des Produkts.'),
    });
  }


  onSave(): void {
    this.productService.updateProduct(this.productData).subscribe({
      next: () => {
        alert('Produkt erfolgreich aktualisiert!');
        this.router.navigate(['/products']);
      },
      error: () => {
        this.errorMessage = 'Fehler beim Speichern des Produkts.';
      },
    });
  }

  onDelete(): void {
    const userConfirmed = confirm('Möchten Sie dieses Produkt wirklich löschen?');
    if (!userConfirmed) {
      return;
    }
    if (this.isAdmin) {
      this.productService.deleteProduct(this.productData.id).subscribe({
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

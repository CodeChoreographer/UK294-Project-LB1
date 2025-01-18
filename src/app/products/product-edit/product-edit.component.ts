import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from '../../shared/services/category.service';
import {FormsModule} from '@angular/forms';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  imports: [
    FormsModule,
    MatSlideToggle
  ]
})
export class ProductEditComponent implements OnInit {
  productData: any = {};
  categories: any[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.loadCategories();
  }

  loadProduct(): void {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.productData = data;
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Laden des Produkts.';
        console.error(err);
      },
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Fehler beim Laden der Kategorien:', err);
      },
    });
  }

  onSave(): void {
    this.productService.updateProduct(this.productData).subscribe({
      next: () => {
        alert('Produkt erfolgreich aktualisiert!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Speichern des Produkts.';
        console.error(err);
      },
    });
  }

  onDelete(): void {
    if (confirm('Möchten Sie dieses Produkt wirklich löschen?')) {
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

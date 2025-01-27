import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import {
  CategoryControllerService,
  CategoryShowDto,
  ProductControllerService,
  ProductDetailDto
} from '../../shared/services/openAPI';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatAnchor, MatButton} from '@angular/material/button';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  imports: [MatSlideToggleModule, MatSelectModule, FormsModule, MatInput, MatButton, MatAnchor, RouterLink],
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productData: ProductDetailDto | null = null;
  categories: Array<CategoryShowDto> = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductControllerService,
    private categoryService: CategoryControllerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id'];
    this.loadProduct(productId);
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: () => this.toastr.error('Fehler beim Laden der Kategorien', 'Fehler'),
    });
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (data) => {
        this.productData = data;
        this.productData.categoryId = this.productData.category?.id;
      },
      error: () => this.toastr.error('Fehler beim Laden des Produkts', 'Fehler'),
    });
  }


  onSave(): void {
    if (this.productData) {
      this.productService.updateProductById(this.productData.id, this.productData).subscribe({
        next: () => {
          this.toastr.success('Produkt erfolgreich aktualisiert', 'Erfolg');
          this.router.navigate(['/products']);
        },
        error: () => this.toastr.error('Fehler beim Speichern des Produkts', 'Fehler'),
      });
    }
  }

  onDelete(): void {
    Swal.fire({
      title: 'Sind Sie sicher?',
      text: 'Dieses Produkt wird dauerhaft gelöscht!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, löschen!',
      cancelButtonText: 'Abbrechen',
    }).then((result) => {
      if (result.isConfirmed && this.productData) {
        this.productService.deleteProductById(this.productData.id).subscribe({
          next: () => {
            this.toastr.success('Produkt erfolgreich gelöscht', 'Erfolg');
            this.router.navigate(['/products']);
          },
          error: () => this.toastr.error('Fehler beim Löschen des Produkts', 'Fehler'),
        });
      }
    });
  }
}

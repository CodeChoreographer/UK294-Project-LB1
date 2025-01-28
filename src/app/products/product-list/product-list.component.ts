import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import {CurrencyPipe} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableModule
} from '@angular/material/table';
import {MatAnchor, MatButton} from '@angular/material/button';
import {ProductControllerService} from '../../shared/services/openAPI';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [
    CurrencyPipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatTableModule,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatAnchor,
    RouterLink,
  ],
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';
  isAdmin: boolean = false;

  displayedColumns: string[] = ['sku', 'name', 'image', 'price', 'stock', 'actions'];


  constructor(
    private productService: ProductControllerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.isAdmin = this.authService.isAdmin();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => {
        this.errorMessage = 'Fehler beim Laden der Produkte.';
        console.error(err);
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }

  editProduct(id: number): void {
    if (this.isAdmin) {
      this.router.navigate(['/products/edit', id]);
    } else {
      console.error('Unzureichende Berechtigungen.');
    }
  }
}

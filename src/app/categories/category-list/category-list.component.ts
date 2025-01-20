import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ]
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  errorMessage: string = '';
  isAdmin: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.isAdmin = this.authService.isAdmin();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: () => {
        this.errorMessage = 'Fehler beim Laden der Kategorien.';
      },
    });
  }

  editCategory(id: number): void {
    if (this.isAdmin) {
      this.router.navigate(['/categories/edit', id]);
    } else {
      console.error('Unzureichende Berechtigungen.');
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/categories', id]);
  }
}

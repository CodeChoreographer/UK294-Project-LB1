import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatAnchor, MatButton} from '@angular/material/button';
import { CategoryControllerService, CategoryShowDto } from '../../shared/services/openAPI';

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
    MatRowDef,
    MatAnchor,
    RouterLink
  ]
})
export class CategoryListComponent implements OnInit {
  categories: CategoryShowDto[] = [];
  errorMessage: string = '';
  isAdmin: boolean = false;

  displayedColumns: string[] = [ 'name', 'actions'];

  constructor(
    private categoryService: CategoryControllerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.isAdmin = this.authService.isAdmin();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data: CategoryShowDto[]) => {
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
  imports: [
    CurrencyPipe,
    FormsModule,
    NgIf,
    NgForOf
  ]
})
export class CategoryEditComponent implements OnInit {
  categoryData: any = null;
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.loadCategoryDetails(+categoryId);
    }

    const token = localStorage.getItem('authToken');
    this.isAdmin = !!token;
  }


  loadCategoryDetails(id: number): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (data) => {
        this.categoryData = data;
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Laden der Kategorie.';
        console.error(err);
      },
    });
  }

  onSave(): void {
    if (this.isAdmin) {
      console.log('Zu sendende Daten:', this.categoryData);
      this.categoryService.updateCategory(this.categoryData).subscribe({
        next: () => {
          alert('Kategorie erfolgreich aktualisiert!');
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          this.errorMessage = 'Fehler beim Speichern der Änderungen.';
          console.error(err);
        },
      });
    }
  }

  onDelete(): void {
    if (this.isAdmin && confirm('Möchten Sie diese Kategorie wirklich löschen?')) {
      this.categoryService.deleteCategory(this.categoryData.id).subscribe({
        next: () => {
          alert('Kategorie erfolgreich gelöscht!');
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          this.errorMessage = 'Fehler beim Löschen der Kategorie.';
          console.error(err);
        },
      });
    }
  }
}

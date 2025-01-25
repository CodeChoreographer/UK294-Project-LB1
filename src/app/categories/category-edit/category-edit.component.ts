import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CategoryControllerService, CategoryDetailDto, CategoryUpdateDto } from '../../shared/services/openAPI';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  imports: [
    FormsModule,
    CurrencyPipe,
    MatSlideToggle
  ],
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  categoryData: CategoryDetailDto | null = null;
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryControllerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.loadCategoryDetails(+categoryId);
    }

    this.isAdmin = this.authService.isAdmin();
  }

  loadCategoryDetails(id: number): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (data: CategoryDetailDto) => {
        this.categoryData = data;
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Laden der Kategorie.';
        console.error(err);
      },
    });
  }

  onSave(): void {
    if (this.isAdmin && this.categoryData) {
      const updateDto: CategoryUpdateDto = {
        name: this.categoryData.name,
        active: this.categoryData.active,
      };

      this.categoryService.updateCategoryById(this.categoryData.id, updateDto).subscribe({
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
    if (this.isAdmin && this.categoryData && confirm('Möchten Sie diese Kategorie wirklich löschen?')) {
      this.categoryService.deleteCategoryById(this.categoryData.id).subscribe({
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

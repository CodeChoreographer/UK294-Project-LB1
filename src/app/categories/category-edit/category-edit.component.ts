import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CategoryControllerService,
  CategoryDetailDto,
  CategoryUpdateDto,
} from '../../shared/services/openAPI';
import {CurrencyPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  imports: [FormsModule, CurrencyPipe, MatSlideToggle, MatButton, CurrencyPipe, MatButton, MatError, MatInput, MatLabel, MatFormField],
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  categoryData: CategoryDetailDto | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryControllerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const categoryId = +this.route.snapshot.params['id'];
    if (categoryId) {
      this.loadCategoryDetails(categoryId);
    }
  }

  loadCategoryDetails(id: number): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (data) => {
        this.categoryData = data;
      },
      error: () => {
        this.errorMessage = 'Fehler beim Laden der Kategorie.';
      },
    });
  }

  onSave(): void {
    if (this.categoryData) {
      const updateDto: CategoryUpdateDto = {
        name: this.categoryData.name,
        active: this.categoryData.active,
      };

      this.categoryService.updateCategoryById(this.categoryData.id, updateDto).subscribe({
        next: () => {
          this.toastr.success('Kategorie erfolgreich aktualisiert', 'Erfolg');
          this.router.navigate(['/categories']);
        },
        error: () => {
          this.toastr.error('Fehler beim Speichern der Kategorie', 'Fehler');
        },
      });
    }
  }

  onDelete(): void {
    Swal.fire({
      title: 'Sind Sie sicher?',
      text: 'Diese Kategorie wird dauerhaft gelöscht!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, löschen!',
      cancelButtonText: 'Abbrechen',
    }).then((result) => {
      if (result.isConfirmed && this.categoryData) {
        this.categoryService.deleteCategoryById(this.categoryData.id).subscribe({
          next: () => {
            this.toastr.success('Kategorie erfolgreich gelöscht', 'Erfolg');
            this.router.navigate(['/categories']);
          },
          error: () => this.toastr.error('Fehler beim Löschen der Kategorie', 'Fehler'),
        });
      }
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import {FormsModule} from '@angular/forms';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  imports: [
    FormsModule,
    MatSlideToggle
  ],
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent {
  categoryData = {
    name: '',
    active: true,
  };
  errorMessage: string = '';

  constructor(private categoryService: CategoryService, private router: Router) {}

  onSubmit(): void {
    this.categoryService.createCategory(this.categoryData).subscribe({
      next: () => {
        alert('Kategorie erfolgreich erstellt!');
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Fehler beim Erstellen der Kategorie.';
        console.error('API-Fehler:', err);
      },
    });
  }
}

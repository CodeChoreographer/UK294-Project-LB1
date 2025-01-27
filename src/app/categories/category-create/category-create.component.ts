import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { CategoryControllerService, CategoryCreateDto } from '../../shared/services/openAPI';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  imports: [
    FormsModule,
    MatSlideToggle,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatTooltip,
    JsonPipe,
    MatError,
    MatAnchor,
    RouterLink
  ],
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent {
  categoryData: CategoryCreateDto = {
    name: '',
    active: true,
  };
  errorMessage: string = '';

  constructor(
    private categoryService: CategoryControllerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.categoryService.createCategory(this.categoryData).subscribe({
      next: () => {
        this.toastr.success('Kategorie erfolgreich erstellt!', 'Erfolg');
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Fehler beim Erstellen der Kategorie.';
        this.toastr.error(this.errorMessage, 'Fehler');
        console.error('API-Fehler:', err);
      },
    });
  }
}

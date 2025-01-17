import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  imports: [
    NgForOf,
    NgIf
  ]
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  errorMessage: string = '';

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log('Geladene Kategorien:', data);
        this.categories = data;
      },
      error: (err) => {
        console.error('Fehler beim Laden der Kategorien:', err);
        this.errorMessage = 'Fehler beim Laden der Kategorien.';
      },
    });
  }


  editCategory(id: number): void {
    this.router.navigate(['/categories', id]);
  }

}

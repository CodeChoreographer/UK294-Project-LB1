import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import {Router, RouterLink} from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',

  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
    this.checkAdminStatus();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Laden der Kategorien.';
        console.error(err);
      }
    });
  }

  checkAdminStatus(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.isAdmin = decodedToken?.roles?.includes('admin');
      } catch (error) {
        console.error('Fehler beim Decodieren des Tokens:', error);
        this.isAdmin = false;
      }
    } else {
      this.isAdmin = false;
    }
  }

  editCategory(id: number): void {
    this.router.navigate(['/categories/edit', id]);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/categories', id]);
  }

}

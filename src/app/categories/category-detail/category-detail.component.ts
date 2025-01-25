import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import {CurrencyPipe} from '@angular/common';
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  imports: [
    CurrencyPipe,
    RouterLink,
    MatAnchor
  ]
})
export class CategoryDetailComponent implements OnInit {
  categoryData: any = {};
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    const id = this.route.snapshot.params['id'];
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

  goBackToCategories(): void {
    this.router.navigate(['/categories']);
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

}

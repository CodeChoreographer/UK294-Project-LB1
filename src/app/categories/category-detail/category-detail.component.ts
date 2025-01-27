import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {MatAnchor} from "@angular/material/button";
import { CategoryControllerService, CategoryDetailDto } from '../../shared/services/openAPI';

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
  categoryData: CategoryDetailDto | null = null;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryControllerService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    const id = +this.route.snapshot.params['id'];
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
}

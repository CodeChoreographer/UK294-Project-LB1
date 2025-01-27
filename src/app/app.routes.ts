import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  {
    path: 'users',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./users/login/login.component').then((m) => m.LoginComponent),
        data: { title: 'Benutzer Login' },
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./users/register/register.component').then((m) => m.RegisterComponent),
        data: { title: 'Registrieren' },
      },
      {
        path: '',
        loadComponent: () =>
          import('./users/user-list/user-list.component').then((m) => m.UserListComponent),
        canActivate: [AdminGuard],
        data: { title: 'Benutzerliste' },
      },
    ],
  },

  {
    path: 'products',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./products/product-list/product-list.component').then((m) => m.ProductListComponent),
        data: { title: 'WhatsSuperDuperShop' },
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./products/product-create/product-create.component').then((m) => m.ProductCreateComponent),
        canActivate: [AdminGuard],
        data: { title: 'Produkt erstellen' },
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./products/product-detail/product-detail.component').then((m) => m.ProductDetailComponent),
        data: { title: 'Produktdetails' },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./products/product-edit/product-edit.component').then((m) => m.ProductEditComponent),
        canActivate: [AdminGuard],
        data: { title:  'Produkt bearbeiten' },
      },
    ],
  },

  {
    path: 'categories',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./categories/category-list/category-list.component').then((m) => m.CategoryListComponent),
        data: { title: 'Kategorien' },
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./categories/category-create/category-create.component').then((m) => m.CategoryCreateComponent),
        canActivate: [AdminGuard],
        data: { title: 'Kategorie erstellen' },
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./categories/category-detail/category-detail.component').then((m) => m.CategoryDetailComponent),
        data: { title: 'Kategorie-Details' },
      },
      {
        path: ':id/products',
        loadComponent: () =>
          import('./products/product-list/product-list.component').then((m) => m.ProductListComponent),
        data: { title: 'Produkte in Kategorie' },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./categories/category-edit/category-edit.component').then((m) => m.CategoryEditComponent),
        canActivate: [AdminGuard],
        data: { title: 'Kategorie bearbeiten' },
      },
    ],
  },

  {
    path: '403',
    loadComponent: () =>
      import('./error-page/error-page.component').then((m) => m.ErrorPageComponent),
    data: { title: 'Zugriff verweigert', errorCode: '403', errorMessage: 'Keine Berechtigung auf dieser Seite' },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./error-page/error-page.component').then((m) => m.ErrorPageComponent),
    data: { title: 'Seite nicht gefunden', errorCode: '404', errorMessage: 'Seite nicht gefunden' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutesModule {}

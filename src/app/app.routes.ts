import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Standardroute
  {
    path: 'users',
    children: [
      { path: 'login', loadComponent: () => import('./users/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./users/register/register.component').then(m => m.RegisterComponent) },
      { path: '', loadComponent: () => import('./users/user-list/user-list.component').then(m => m.UserListComponent) },
      { path: 'promote', loadComponent: () => import('./users/user-promote/user-promote.component').then(m => m.UserPromoteComponent) },
    ],
  },
  {
    path: 'products',
    children: [
      { path: '', loadComponent: () => import('./products/product-list/product-list.component').then(m => m.ProductListComponent) },
      { path: 'create', loadComponent: () => import('./products/product-create/product-create.component').then(m => m.ProductCreateComponent) },
      { path: ':id', loadComponent: () => import('./products/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
      { path: 'edit/:id', loadComponent: () => import('./products/product-edit/product-edit.component').then(m => m.ProductEditComponent) },
    ],
  },
  {
    path: 'categories',
    children: [
      { path: '', loadComponent: () => import('./categories/category-list/category-list.component').then(m => m.CategoryListComponent) },
      { path: 'create', loadComponent: () => import('./categories/category-create/category-create.component').then(m => m.CategoryCreateComponent) },
      { path: ':id', loadComponent: () => import('./categories/category-detail/category-detail.component').then(m => m.CategoryDetailComponent) },
      { path: 'edit/:id', loadComponent: () => import('./categories/category-edit/category-edit.component').then(m => m.CategoryEditComponent) },
      { path: ':id/products', loadComponent: () => import('./products/product-list/product-list.component').then(m => m.ProductListComponent) },
    ],
  },
  {
    path: 'users',
    children: [
      { path: '', loadComponent: () => import('./users/user-list/user-list.component').then(m => m.UserListComponent) },
    ],
  },

  {
    path: '403',
    loadComponent: () => import('./error-page/error-page.component').then(m => m.ErrorPageComponent),
    data: { errorCode: '403', errorMessage: 'Zugriff verweigert' },
  },
  {
    path: '**',
    loadComponent: () => import('./error-page/error-page.component').then(m => m.ErrorPageComponent),
    data: { errorCode: '404', errorMessage: 'Seite nicht gefunden' },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}

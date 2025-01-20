import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  {
    path: 'users',
    children: [
      { path: 'login', loadComponent: () => import('./users/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./users/register/register.component').then(m => m.RegisterComponent) },
      { path: '', loadComponent: () => import('./users/user-list/user-list.component').then(m => m.UserListComponent), canActivate: [AdminGuard] },
    ],
  },

  {
    path: 'products',
    children: [
      { path: '', loadComponent: () => import('./products/product-list/product-list.component').then(m => m.ProductListComponent) },
      { path: 'create', loadComponent: () => import('./products/product-create/product-create.component').then(m => m.ProductCreateComponent), canActivate: [AdminGuard] },
      { path: ':id', loadComponent: () => import('./products/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
      { path: 'edit/:id', loadComponent: () => import('./products/product-edit/product-edit.component').then(m => m.ProductEditComponent), canActivate: [AdminGuard] },
    ],
  },

  {
    path: 'categories',
    children: [
      { path: '', loadComponent: () => import('./categories/category-list/category-list.component').then(m => m.CategoryListComponent) },
      { path: ':id', loadComponent: () => import('./categories/category-detail/category-detail.component').then(m => m.CategoryDetailComponent) },
      { path: ':id/products', loadComponent: () => import('./products/product-list/product-list.component').then(m => m.ProductListComponent) },
      { path: 'create', loadComponent: () => import('./categories/category-create/category-create.component').then(m => m.CategoryCreateComponent), canActivate: [AdminGuard] },
      { path: 'edit/:id', loadComponent: () => import('./categories/category-edit/category-edit.component').then(m => m.CategoryEditComponent), canActivate: [AdminGuard] },
    ],
  },

  {
    path: '403',
    loadComponent: () => import('./error-page/error-page.component').then(m => m.ErrorPageComponent),
    data: { errorCode: '403', errorMessage: 'Keine Berechtigung auf dieser Seite' },
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

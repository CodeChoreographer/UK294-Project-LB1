import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Standardroute
  { path: 'auth/login', component: LoginComponent }, // Login-Seite
  { path: 'auth/register', component: RegisterComponent }, // Registrierung
  { path: 'products', component: ProductListComponent }, // Produktliste
  { path: 'products/:id', component: ProductDetailComponent }, // Produktdetails
  { path: 'categories', component: CategoryListComponent }, // Kategorienliste
  { path: 'categories/create', component: CategoryCreateComponent }, // Kategorie erstellen
  { path: 'categories/edit/:id', component: CategoryEditComponent }, // Kategorie bearbeiten
  { path: 'categories/:id/products', component: ProductListComponent }, // Produkte von einer Kategorie anzeigen
  { path: '**', redirectTo: '/products' }, // Fallback für ungültige Routen
];

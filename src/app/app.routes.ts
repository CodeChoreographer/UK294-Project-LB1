import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserPromoteComponent } from './users/user-promote/user-promote.component';
import {ProductEditComponent} from './products/product-edit/product-edit.component';
import {CategoryDetailComponent} from './categories/category-detail/category-detail.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Standardroute
  { path: 'users/login', component: LoginComponent }, // Login-Seite
  { path: 'users/register', component: RegisterComponent }, // Registrierung
  { path: 'users', component: UserListComponent }, // Benutzerliste (nur Admins)
  { path: 'users/promote', component: UserPromoteComponent }, // Benutzer zu Admins befördern
  { path: 'products', component: ProductListComponent }, // Produktliste
  { path: 'products/create', component: ProductCreateComponent }, // Produkt erstellen
  { path: 'products/:id', component: ProductDetailComponent }, // Produktdetails
  { path: 'products/edit/:id', component: ProductEditComponent }, // Produktbearbeitung
  { path: 'categories', component: CategoryListComponent }, // Kategorienliste
  { path: 'categories/create', component: CategoryCreateComponent }, // Kategorie erstellen
  { path: 'categories/:id/products', component: ProductListComponent }, // Produkte in einer Kategorie
  { path: 'categories/:id', component: CategoryDetailComponent }, // Kategorie anzeigen
  { path: 'categories/edit/:id', component: CategoryEditComponent }, // Kategorie bearbeiten
  { path: '**', redirectTo: '/products' }, // Fallback für ungültige Routen
];

// wird benötigt, um die Datei als Modul zu definieren, damit die Routen funktionieren
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], //initialisiert die Routen
  exports: [RouterModule],
})
export class AppRoutesModule {}

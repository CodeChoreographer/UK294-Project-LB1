import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule, // Für ngModel
    CommonModule, // Für *ngIf und andere Struktur-Direktiven
  ],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      if (this.username === 'test' && this.password === 'password') {
        this.router.navigate(['/products']);
      } else {
        this.errorMessage = 'Benutzername oder Passwort ist falsch.';
      }
    }, 1000);
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}

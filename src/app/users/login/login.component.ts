import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatTooltip
  ],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}


  onSubmit(): void {
    this.showPassword = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token); // Speichert den Authentifizierungstoken
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Login fehlgeschlagen: Überprüfen Sie Ihre Eingaben.';
      },
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/users/register']);
  }
}

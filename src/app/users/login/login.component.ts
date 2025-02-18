import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatTooltip} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {ToastrService} from 'ngx-toastr';

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
    MatTooltip,
    MatTableModule,
    MatError
  ],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = true;


  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}


  onSubmit(): void {
    this.showPassword = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.toastr.success('Login erfolgreich!', 'Willkommen');
        localStorage.setItem('authToken', response.token);
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

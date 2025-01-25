import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, MatFormField, MatButton, MatInput, MatError, MatLabel, MatTooltip],
})
export class RegisterComponent {
  formData = {
    firstName: '',
    lastName: '',
    street: '',
    zip: '',
    city: '',
    country: '',
    phone: '',
    mobilePhone: '',
    email: '',
    password: '',
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  private validateForm(): boolean {
    if (!/^\d+$/.test(this.formData.zip)) {
      this.errorMessage = 'Die Postleitzahl darf nur aus Zahlen bestehen.';
      return false;
    }

    if (this.formData.country.length !== 2) {
      this.errorMessage = 'Das Land muss genau 2 Buchstaben haben.';
      return false;
    }

    if (!/^\d*$/.test(this.formData.phone) || !/^\d*$/.test(this.formData.mobilePhone)) {
      this.errorMessage = 'Telefonnummern dürfen nur aus Zahlen bestehen.';
      return false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.formData.email)) {
      this.errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      return false;
    }

    if (!/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Za-z\d]).{8,}$/.test(this.formData.password)) {
      this.errorMessage =
        'Das Passwort muss mindestens 8 Zeichen lang sein, eine Zahl, einen Grossbuchstaben und ein Sonderzeichen enthalten.';
      return false;
    }

    return true;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.validateForm()) {
      return;
    }

    this.authService.register(this.formData).subscribe({
      next: () => {
        alert('Registrierung erfolgreich!');
        this.router.navigate(['/users/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registrierung fehlgeschlagen.';
      },
    });
  }
}

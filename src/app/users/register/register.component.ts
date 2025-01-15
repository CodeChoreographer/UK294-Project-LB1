import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    FormsModule,
    NgIf,
  ],
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

  // Überprüfung bei der Eingaben

  private isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }


  private isCountryValid(country: string): boolean {
    return country.length === 2;
  }


  private isZipValid(zip: string): boolean {
    return /^\d+$/.test(zip);
  }


  private isPhoneValid(phone: string): boolean {
    return /^\d*$/.test(phone);
  }


  private isPasswordValid(password: string): boolean {
    const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Za-z\d]).{8,}$/;
    return passwordPattern.test(password);
  }


  onSubmit(): void {
    this.errorMessage = '';

    if (!this.isZipValid(this.formData.zip)) {
      this.errorMessage = 'Die Postleitzahl darf nur aus Zahlen bestehen.';
      return;
    }

    if (!this.isCountryValid(this.formData.country)) {
      this.errorMessage = 'Das Land muss genau 2 Buchstaben haben.';
      return;
    }

    if (!this.isPhoneValid(this.formData.phone) || !this.isPhoneValid(this.formData.mobilePhone)) {
      this.errorMessage = 'Telefonnummern dürfen nur aus Zahlen bestehen.';
      return;
    }

    if (!this.isEmailValid(this.formData.email)) {
      this.errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      return;
    }

    if (!this.isPasswordValid(this.formData.password)) {
      this.errorMessage =
        'Das Passwort muss mindestens 8 Zeichen lang sein und ein Sonderzeichen enthalten.';
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

import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    RouterLink
  ]
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/users/login']);
  }
}

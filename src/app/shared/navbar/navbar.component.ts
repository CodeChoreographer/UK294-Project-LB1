import { AuthService } from '../../shared/services/auth.service';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterLink, MatIcon],
})
export class NavbarComponent {
  lastScrollTop = 0;
  isHidden = false;
  isMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/users/login']);
    this.closeMenu();
  }


  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop && currentScroll > 15) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }

    this.lastScrollTop = currentScroll;
  }
}

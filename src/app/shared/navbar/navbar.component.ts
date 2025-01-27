import { AuthService } from '../../shared/services/auth.service';
import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterLink, MatIcon],
})
export class NavbarComponent {
  lastScrollTop = 0;
  isNavbarVisible = true;
  isMenuOpen = false;

  constructor(private authService: AuthService, private router: Router, private renderer: Renderer2) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/users/login']);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(currentScroll - this.lastScrollTop) > 30) {
        this.isNavbarVisible = false;
      } else {
        this.isNavbarVisible = true;
      }
    }

}

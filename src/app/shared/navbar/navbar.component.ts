import { AuthService } from '../../shared/services/auth.service';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

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
    this.toastr.success('Sie sind jetzt ausgeloggt!', 'Logout');
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

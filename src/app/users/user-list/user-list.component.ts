import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.errorMessage = 'Fehler beim Laden der Benutzer.';
        console.error('Backend-Fehler:', err);
      },
    });
  }

  promoteUser(userId: number): void {
    this.userService.promoteToAdmin(userId).subscribe({
      next: () => {
        alert(`Benutzer mit ID ${userId} wurde erfolgreich zum Admin befördert.`);
        this.loadUsers();
      },
      error: (err) => {
        const backendMessage = err.error?.response || 'Unbekannter Fehler vom Backend.';
        this.errorMessage = `Fehler beim Befördern des Benutzers: ${backendMessage}`;
      },
    });
  }
}

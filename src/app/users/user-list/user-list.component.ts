import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import {MatAnchor, MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    MatButton,
    MatHeaderRow,
    MatRow,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef,
    MatTable,
    MatAnchor
  ]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'address', 'phone', 'email', 'role', 'actions'];

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



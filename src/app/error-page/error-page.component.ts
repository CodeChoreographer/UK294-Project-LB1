import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  errorCode: string = '404';
  errorMessage: string = 'Seite nicht gefunden';

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      if (data['errorCode']) {
        this.errorCode = data['errorCode'];
        this.errorMessage = data['errorMessage'] || this.errorMessage;
      }
    });
  }
}

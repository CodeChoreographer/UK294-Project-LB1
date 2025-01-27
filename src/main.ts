import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { inject } from '@angular/core';
import { AuthService } from './app/shared/services/auth.service';
import {provideToastr} from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([
      (req, next) => inject(AuthService).authInterceptor(req, next),
    ])),
    provideAnimationsAsync(),
    provideToastr(),
  ],
}).catch((err) => console.error(err));

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { commonInterceptorInterceptor } from './service/common-interceptor.interceptor';
import { NgxPrintModule } from 'ngx-print';

export const appConfig: ApplicationConfig = {
  providers: [NgxPrintModule, provideAnimations(), provideToastr({
    positionClass: 'toast-bottom-right',
  }), provideHttpClient(withInterceptors([commonInterceptorInterceptor])), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};

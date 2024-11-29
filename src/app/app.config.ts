import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { cachingInterceptor } from './core/interceptors/caching.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';

const config: SocketIoConfig = { url: environment.host, options: { autoConnect : false ,transports: ['websocket', 'polling', 'flashsocket']} };


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(),
    provideAnimations(), // required animations providers
    provideToastr(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor,cachingInterceptor])),
    importProvidersFrom(SocketIoModule.forRoot(config))
  ]
};

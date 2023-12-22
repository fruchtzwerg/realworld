import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideQueryDevTools } from '@ngneat/query-devtools';

import { environment } from '../environment/environment';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), environment.production ? [] : provideQueryDevTools()],
};

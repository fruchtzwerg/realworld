import 'iconify-icon';

import { provideZoneChangeDetection } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';

// bootstrapApplication(AppComponent, appConfig).catch((err) =>
//   console.error(err)
// );

platformBrowser()
  .bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()] })
  .catch((err) => console.error(err));

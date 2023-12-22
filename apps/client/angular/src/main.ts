import 'iconify-icon';

import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';

// bootstrapApplication(AppComponent, appConfig).catch((err) =>
//   console.error(err)
// );

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

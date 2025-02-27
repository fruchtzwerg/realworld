import { CUSTOM_ELEMENTS_SCHEMA, NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ApiModule } from '../api/api.module';
import { NavbarComponent } from '../common/components/navbar/navbar.component';

import { appConfig } from './app.config';
import { AppComponent } from './components/app/app.component';
import { AppHeaderComponent } from './components/header/app-header.component';
import { RouteResolverService } from './services/route-resolver.service';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, RouterModule, ApiModule, AppHeaderComponent, NavbarComponent],
  exports: [ApiModule],
  providers: [
    appConfig.providers,
    provideAppInitializer(() => {
      const initializerFn = (
        (resolverService: RouteResolverService) => () =>
          resolverService.subscribeRoutes()
      )(inject(RouteResolverService));
      return initializerFn();
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

import { HttpClientModule } from '@angular/common/http';
import { NgModule, inject } from '@angular/core';

import { AuthStorageService } from '../modules/auth/services/auth-storage.service';

import { restClient } from './providers/rest-client.provider';
import { ArticleApiService } from './services/article-api.service';
import { ProfileApiService } from './services/profile-api.service';
import { UserApiService } from './services/user-api.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [restClient, AuthStorageService, UserApiService, ProfileApiService, ArticleApiService],
})
export class ApiModule {}

export const injectUserApi = () => inject(UserApiService);
export const injectProfileApi = () => inject(ProfileApiService);
export const injectArticleApi = () => inject(ArticleApiService);

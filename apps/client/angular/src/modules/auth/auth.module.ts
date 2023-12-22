import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthStorageService } from './services/auth-storage.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthStorageService, AuthService],
})
export class AuthModule {}

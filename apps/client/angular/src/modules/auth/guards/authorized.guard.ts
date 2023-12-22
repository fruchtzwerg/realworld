import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthStorageService } from '../services/auth-storage.service';

export const authorizedGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthStorageService).token$.pipe(
    map((token) => (!token ? router.createUrlTree(['/login']) : true))
  );
};

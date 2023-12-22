import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Tab } from '../../../common/components/tabs/tabs.component';
import { AuthStorageService } from '../../auth/services/auth-storage.service';
import { tabs } from '../constants/tabs.const';

export const tabsResolver: ResolveFn<Tab[]> = (route) => {
  const storage = inject(AuthStorageService);
  const tag = route.paramMap.get('tag');

  return tabs(!!storage.token$.value, tag);
};

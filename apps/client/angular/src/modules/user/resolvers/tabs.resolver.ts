import { ResolveFn } from '@angular/router';

import { Tab } from '../../../common/components/tabs/tabs.component';
import { tabs } from '../constants/tabs.const';

export const tabsResolver: ResolveFn<Tab[]> = async (route) => {
  const username = route.paramMap.get('username');
  if (!username) throw new Error('Invalid route: Username is required.');

  return tabs(username);
};

import { satisfies } from '@realworld/utils';

import { Tab } from '../../../common/components/tabs/tabs.component';

const optionalFeed = (isLoggedIn: boolean) =>
  isLoggedIn
    ? [
        {
          id: 'feed',
          label: 'Your Feed',
          filter: {},
          href: '/home/feed',
        },
      ]
    : [];

const optionalTag = (tag: string | undefined | null) =>
  tag
    ? [
        {
          id: tag,
          label: tag,
          filter: { tag },
          icon: 'ion-pound',
          href: `/home/${tag}`,
        },
      ]
    : [];

export const tabs = (isLoggedIn: boolean, tag: string | undefined | null) =>
  satisfies<Tab[]>()([
    ...optionalFeed(!!isLoggedIn),
    {
      id: 'global',
      label: 'Global Feed',
      filter: {},
      href: '/home',
    },
    ...optionalTag(tag),
  ]);

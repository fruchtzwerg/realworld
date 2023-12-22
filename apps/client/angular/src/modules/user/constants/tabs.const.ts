import { satisfies } from '@realworld/utils';

import { Tab } from '../../../common/components/tabs/tabs.component';

export const tabs = (author: string) =>
  satisfies<Tab[]>()([
    {
      id: 'authored',
      label: 'My Articles',
      filter: { author },
      href: `/profile/${author}`,
    },
    {
      id: 'favorited',
      label: 'Favorited Articles',
      filter: { favorited: author },
      href: `/profile/${author}/favorites`,
    },
  ]);

import { Profile, User } from '@realworld/dto';
import { satisfies } from '@realworld/utils';

import { RouterCommand } from '../../utils/navigation.utils';

export interface MenuItem {
  id: string;
  name: string;
  icon?: string | null;
  user?: User | Profile | null;
  href: string | RouterCommand;
}

export const Menu = {
  private: (user: User) =>
    satisfies<MenuItem[]>()([
      {
        id: 'home',
        name: 'Home',
        href: '/home',
      },
      {
        id: 'new_article',
        name: 'New Article',
        icon: 'ion-compose',
        href: '/editor',
      },
      {
        id: 'settings',
        name: 'Settings',
        icon: 'ion-gear-a',
        href: '/settings',
      },
      {
        id: 'profile',
        name: user.username || 'Profile',
        user: user,
        href: `/profile/${user.username ?? ''}`,
      },
    ]),

  public: () =>
    satisfies<MenuItem[]>()([
      {
        id: 'home',
        name: 'Home',
        href: '/home',
      },
      {
        id: 'login',
        name: 'Sign in',
        href: '/login',
      },
      {
        id: 'register',
        name: 'Sign up',
        href: '/register',
      },
    ]),
};

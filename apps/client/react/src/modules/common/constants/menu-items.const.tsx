import { FunctionComponent } from 'react';
import IconEditor from 'virtual:icons/ion/compose';
import IconSettings from 'virtual:icons/ion/gear-a';
import IconPerson from 'virtual:icons/ion/person-circle-outline';

import { User } from '@realworld/dto';

export interface MenuItem {
  name: string;
  href: string;
  icon?:
    | FunctionComponent<React.SVGProps<SVGSVGElement>>
    | FunctionComponent<React.ImgHTMLAttributes<HTMLImageElement>>;
}

export const menuItems = {
  public: (): MenuItem[] => [
    { name: 'Home', href: '/articles/global' },
    { name: 'Sign in', href: '/login' },
    { name: 'Sign up', href: '/register' },
  ],
  private: (user: User): MenuItem[] => [
    { name: 'Home', href: '/articles/global' },
    { name: 'New Article', href: '/editor', icon: IconEditor },
    { name: 'Settings', href: '/settings', icon: IconSettings },
    {
      name: user.username,
      href: `/profile/${user.username}`,
      icon: user.image
        ? () => <img src={user.image ?? ''} alt="" className="w-[1.2em] h-[1.2em] rounded-full" />
        : IconPerson,
    },
  ],
};

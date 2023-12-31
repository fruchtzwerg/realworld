import classNames from 'classnames';
import { HTMLAttributes } from 'react';

import { Profile, User } from '@realworld/dto';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  user?: User | Profile | null;
  size?: keyof typeof sizes;
}

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-14 h-14',
  xl: 'w-24 h-24',
};

export function Avatar({ className, user, size }: AvatarProps) {
  return !user ? (
    <div className={classNames([className, sizes[size ?? 'md'], 'rounded-full skeleton'])}></div>
  ) : user.image ? (
    <img
      src={user.image}
      alt="avatar"
      className={classNames([className, 'rounded-full', sizes[size ?? 'md']])}
    />
  ) : (
    <div
      className={classNames([
        className,
        'flex items-center justify-center w-8 h-8 text-2xl rounded-full bg-base-content/20',
      ])}
    >
      {user.username?.[0].toUpperCase()}
    </div>
  );
}

export default Avatar;

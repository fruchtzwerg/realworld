import { type FunctionalComponent } from 'vue';

import type { Profile, User } from '@realworld/dto';

type AvatarProps = { user: User | Profile | null; size?: keyof typeof sizes };

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-14 h-14',
  xl: 'w-24 h-24',
};

export const Avatar: FunctionalComponent<AvatarProps> = (props) =>
  !props.user ? (
    <div class={[sizes[props.size ?? 'md'], 'rounded-full skeleton']}></div>
  ) : props.user.image ? (
    <img src={props.user.image} alt="avatar" class={['rounded-full', sizes[props.size ?? 'md']]} />
  ) : (
    <div class="flex items-center justify-center w-8 h-8 text-2xl rounded-full bg-base-content/20">
      {props.user.username?.[0].toUpperCase()}
    </div>
  );

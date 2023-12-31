import classNames from 'classnames';
import IconRemove from 'virtual:icons/ion/minus-round';
import IconAdd from 'virtual:icons/ion/plus-round';

import { Profile } from '@realworld/dto';

import useProfileGet from '../../api/hooks/profile.get';
import useToggleFollow from '../../api/hooks/toggle-follow';
import { useUserGet } from '../../api/hooks/user.get';

export interface FollowProps {
  username: Profile['username'];
  contrast?: boolean;
}

export function Follow({ username, contrast }: FollowProps) {
  const { user } = useUserGet();
  const { profile, isFetching: profile_isPending } = useProfileGet(username);
  const { toggleFollow, isPending } = useToggleFollow(profile);

  return profile ? (
    <button
      className={classNames([
        'btn btn-outline btn-sm',
        {
          'text-neutral-content hover:text-neutral hover:bg-neutral-content': contrast,
        },
        { 'btn-active active': profile.following },
      ])}
      disabled={!user || user.username === profile.username || isPending || profile_isPending}
      onClick={toggleFollow}
    >
      <slot>
        {profile.following ? <IconRemove /> : <IconAdd />}
        <span>
          {profile.following ? 'Unfollow ' : 'Follow '}
          {profile.username}
        </span>
      </slot>
    </button>
  ) : (
    <div className="w-10 h-4 skeleton" />
  );
}

export default Follow;

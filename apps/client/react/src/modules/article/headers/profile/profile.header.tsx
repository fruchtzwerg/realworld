import { Link, useParams } from 'react-router-dom';
import IconSettings from 'virtual:icons/ion/gear-a';

import useProfileGet from '../../../common/api/hooks/profile.get';
import { useUserGet } from '../../../common/api/hooks/user.get';
import Avatar from '../../../common/components/avatar/avatar';
import Follow from '../../../common/components/follow/follow';

/* eslint-disable-next-line */
export interface ProfileHeaderProps {}

export function ProfileHeader(props: ProfileHeaderProps) {
  const { username } = useParams();
  const { profile } = useProfileGet(username);
  const { user } = useUserGet();

  const wrapperClass = 'p-8 mb-8 bg-neutral text-neutral-content';

  return profile ? (
    <div className={wrapperClass}>
      <div className="flex flex-col items-center max-w-6xl px-4 mx-auto space-y-2">
        <Avatar user={profile} size="xl"></Avatar>

        <h1 className="text-2xl font-bold text-center">{profile.username}</h1>
        <p className="text-base font-light text-center max-w-[60ch]">{profile.bio}</p>

        <div className="space-x-2 place-self-end">
          {username && username !== user?.username ? (
            <Follow username={username} />
          ) : (
            <Link to="/settings" className="btn btn-outline btn-sm btn-accent">
              <IconSettings />
              <span>Edit Profile Settings</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={wrapperClass}>
      <div className="flex flex-col items-center max-w-6xl gap-4 mx-auto">
        <Avatar size="xl" />

        <div className="w-40 h-6 skeleton" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="h-4 skeleton w-[60ch]" key={index} />
        ))}
        <div className="h-8 skeleton w-44 place-self-end" />
      </div>
    </div>
  );
}

export default ProfileHeader;

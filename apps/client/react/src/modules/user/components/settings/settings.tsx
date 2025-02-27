import { FormEventHandler } from 'react';

import { shallowSparse } from '@realworld/utils';

import { useUserGet } from '../../../common/api/hooks/user.get';
import { useUserUpdate } from '../../../common/api/hooks/user.update';
import { useToken } from '../../../common/hooks/token';

/* eslint-disable-next-line */
export interface SettingsProps {}

export function Settings(props: SettingsProps) {
  const [, setToken] = useToken();
  const { data } = useUserGet();
  const { mutate, isPending } = useUserUpdate();

  const submit: FormEventHandler = (event) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const image = (data.get('image') as string) || undefined;
    const username = (data.get('username') as string) || undefined;
    const bio = (data.get('bio') as string) || undefined;
    const email = (data.get('email') as string) || undefined;
    const password = (data.get('password') as string) || undefined;

    const user = shallowSparse({ image, username, bio, email, password });

    mutate({ body: { user } });
  };

  return (
    <form onSubmit={submit} className="flex flex-col w-full max-w-xl gap-4 mx-auto mt-6">
      <h1 className="mx-auto text-[2.5rem] leading-[2.75rem] font-medium">Your Settings</h1>
      <input
        name="image"
        type="text"
        className="input input-bordered"
        placeholder="URL of profile picture"
        value={data?.body.user.image ?? undefined}
        disabled={isPending}
      />
      <input
        name="username"
        type="text"
        className="input input-bordered input-lg"
        placeholder="Username"
        value={data?.body.user.username ?? undefined}
        disabled={isPending}
      />
      <textarea
        name="bio"
        rows={6}
        className="textarea textarea-bordered textarea-lg"
        placeholder="Short bio about you"
        value={data?.body.user.bio ?? undefined}
        disabled={isPending}
      />
      <input
        name="email"
        type="text"
        className="input input-bordered input-lg"
        placeholder="Email"
        value={data?.body.user.email ?? undefined}
        disabled={isPending}
      />
      <input
        name="password"
        type="password"
        className="input input-bordered input-lg"
        placeholder="New Password"
        disabled={isPending}
      />

      <button className="btn btn-primary btn-lg place-self-end" disabled={isPending}>
        {isPending && <div className="loading loading-spinner"></div>}
        <span>Update Settings</span>
      </button>

      <div className="my-0 divider" />

      <button
        type="button"
        className="btn btn-outline btn-error place-self-start"
        onClick={() => setToken(null)}
        disabled={isPending}
      >
        Or click here to logout.
      </button>
    </form>
  );
}

export default Settings;

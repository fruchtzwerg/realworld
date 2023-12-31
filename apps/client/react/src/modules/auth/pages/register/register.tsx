import { FormEventHandler } from 'react';

import { useRegister } from '../../../common/api/hooks/register';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  const { mutate, isPending } = useRegister();

  const submit: FormEventHandler = (event) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const email = data.get('email') as string | null;
    const username = data.get('username') as string | null;
    const password = data.get('password') as string | null;

    if (!email || !username || !password) return;

    mutate({ body: { user: { email, username, password } } });
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto mt-6 space-y-4">
      <h1 className="text-[2.5rem] leading-[2.75rem] font-medium">Sign in</h1>
      <p className="!mt-2 text-primary">Need an account?</p>

      <form onSubmit={submit} className="flex flex-col w-full gap-4">
        <input
          name="email"
          type="text"
          className="input input-bordered input-lg"
          placeholder="Email"
          disabled={isPending}
        />
        <input
          name="username"
          type="text"
          className="input input-bordered input-lg"
          placeholder="Username"
          disabled={isPending}
        />
        <input
          name="password"
          type="password"
          className="input input-bordered input-lg"
          placeholder="Password"
          disabled={isPending}
        />

        <button className="btn btn-primary btn-lg place-self-end" disabled={isPending}>
          {isPending && <div className="loading loading-spinner"></div>}
          <span>Sign in</span>
        </button>
      </form>
    </div>
  );
}

export default Register;

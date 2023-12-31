import { ElementType, HTMLAttributes, PropsWithChildren } from 'react';

export interface CommentShellProps<T extends keyof HTMLElementTagNameMap>
  extends HTMLAttributes<HTMLElementTagNameMap[T]> {
  as: T;
  actions?: React.ReactNode;
}

export function CommentShell<T extends keyof HTMLElementTagNameMap>({
  as,
  children,
  actions,
  ...rest
}: PropsWithChildren<CommentShellProps<T>>) {
  const Component = as as ElementType;

  return (
    <Component
      className="overflow-auto card card-bordered border-base-300 dark:border-neutral"
      {...rest}
    >
      {/* body */}
      <div className="p-0 card-body">{children}</div>

      {/* actions */}
      <div className="px-5 py-3 card-actions bg-base-200">{actions}</div>
    </Component>
  );
}

export default CommentShell;

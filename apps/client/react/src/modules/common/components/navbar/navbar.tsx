import classnames from 'classnames';
import { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useUserGet } from '../../api/hooks/user.get';
import { menuItems } from '../../constants/menu-items.const';

/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  const { data, isSuccess } = useUserGet();

  const items = useMemo(
    () => (isSuccess ? menuItems.private(data.body.user) : menuItems.public()),
    [isSuccess, data]
  );

  return (
    <header>
      <div className="flex items-center justify-between max-w-6xl px-4 py-2 mx-auto text-md h-14">
        {/* logo */}
        <Link to="/" className="text-2xl leading-[3.75rem] font-bold text-primary font-title">
          conduit
        </Link>

        {/* menu */}
        <nav>
          <ol className="flex items-center h-full gap-4">
            {items.map((item) => (
              <li className="h-full" key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    classnames([
                      'flex items-center h-full space-x-1 text-base-content/60 hover:text-base-content/90',
                      { 'active !text-base-content/100': isActive },
                    ])
                  }
                >
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

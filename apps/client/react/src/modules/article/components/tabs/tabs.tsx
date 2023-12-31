import classNames from 'classnames';
import { HTMLProps } from 'react';
import { NavLink } from 'react-router-dom';

export interface Tab {
  id: string;
  href?: string;
  label: string;
  icon?: JSX.Element;
}

export interface TabsProps extends HTMLProps<HTMLOListElement> {
  tabs: Tab[];
}

export function Tabs({ tabs, className }: TabsProps) {
  return (
    <div role="tablist" className={classNames([className, 'tabs tabs-bordered'])}>
      {tabs.map((tab) => (
        <NavLink
          to={tab.href ?? tab.id}
          key={tab.id}
          role="tab"
          end
          className={({ isActive }) =>
            classNames([
              'tab gap-1 tab-border-none',
              { 'tab-active active text-primary [--bc:none]': isActive },
            ])
          }
        >
          {tab.icon && tab.icon}
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default Tabs;

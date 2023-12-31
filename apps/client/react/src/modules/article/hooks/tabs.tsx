import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import IconPound from 'virtual:icons/ion/pound';

import { useUserGet } from '../../common/api/hooks/user.get';
import { Tab } from '../components/tabs/tabs';

export function useTabs(staticTabs: Tab[]) {
  const match = useMatch({ path: '/articles/:tag' });
  const [tabs, setTabs] = useState<Tab[]>(staticTabs);
  const { isSuccess: hasUser } = useUserGet();

  useEffect(() => {
    setTabs(
      [
        hasUser ? { id: 'feed', href: '/articles/feed', label: 'Your Feed' } : null,
        ...staticTabs,
        ['feed', 'global', null, undefined].includes(match?.params.tag) ||
        staticTabs.some((tab) => tab.id === match?.params.tag)
          ? null
          : {
              id: match?.params.tag,
              href: `/articles/${match?.params.tag}`,
              label: match?.params.tag,
              icon: <IconPound />,
            },
      ].filter(Boolean) as Tab[]
    );
  }, [hasUser, match?.params.tag, staticTabs]);

  return { tabs };
}

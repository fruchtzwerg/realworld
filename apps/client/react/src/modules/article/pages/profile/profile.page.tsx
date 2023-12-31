import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Profile } from '@realworld/dto';
import { satisfies } from '@realworld/utils';

import { PageProps, useHeader } from '../../../../app/app.context';
import { useArticlesGet } from '../../../common/api/hooks/articles.get';
import ArticleList from '../../components/article-list/article-list';
import Tabs, { Tab } from '../../components/tabs/tabs';

export interface ProfilePageProps extends PageProps {
  tab: ReturnType<typeof getTabs>[number]['id'];
}

const getTabs = (username: Profile['username']) =>
  satisfies<Tab[]>()([
    { id: 'my-articles', href: `/profile/${username}`, label: 'My Articles' },
    { id: 'favorites', href: `/profile/${username}/favorites`, label: 'Favorited Articles' },
  ]);

export function ProfilePage({ tab, header }: ProfilePageProps) {
  const { username } = useParams();
  const articlesResult = useArticlesGet(
    'articles',
    tab === 'favorites' ? { favorited: username } : { author: username }
  );

  useHeader(header);

  const tabs = useMemo(() => getTabs(username!), [username]);

  return (
    <div>
      <Tabs tabs={tabs} className="w-fit" />
      <ArticleList {...articlesResult} />
    </div>
  );
}

export default ProfilePage;

import { useParams } from 'react-router-dom';

import { PageProps, useHeader } from '../../../../app/app.context';
import { useArticlesGet } from '../../../common/api/hooks/articles.get';
import { useUserGet } from '../../../common/api/hooks/user.get';
import ArticleList from '../../components/article-list/article-list';
import Tabs, { Tab } from '../../components/tabs/tabs';
import TagList from '../../components/tag-list/tag-list';
import { useTabs } from '../../hooks/tabs';

export interface FeedProps extends PageProps {
  tab?: 'feed' | 'global';
}

export const staticTabs: Tab[] = [{ id: 'global', href: '/articles/global', label: 'Global Feed' }];

export function Feed({ header, tab }: FeedProps) {
  const { tag } = useParams();
  const { isSuccess } = useUserGet();
  const { tabs } = useTabs(staticTabs);

  const selectedTab = tab ?? tag ?? 'global';

  useHeader(header);

  const articlesResult = useArticlesGet(selectedTab === 'feed' ? 'feed' : 'articles', {
    tag: staticTabs.some((tab) => tab.id === selectedTab) ? undefined : selectedTab,
  });

  return (
    <div className="grid grid-areas-[feed_tags] grid-cols-[1fr_auto] gap-x-8">
      <div className="grid-in-[feed]">
        {/* tabs */}
        <Tabs tabs={tabs} className="w-fit" />

        {/* articles */}
        <ArticleList {...articlesResult} />
      </div>

      {/* tags */}
      {isSuccess && <TagList className="grid-in-[tags]" />}
    </div>
  );
}

export default Feed;

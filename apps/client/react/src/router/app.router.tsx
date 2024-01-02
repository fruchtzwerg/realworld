import { Navigate, createBrowserRouter } from 'react-router-dom';

import App from '../app/app';
import ArticleHeader from '../modules/article/headers/article/article.header';
import FeedHeader from '../modules/article/headers/feed/feed.header';
import ProfileHeader from '../modules/article/headers/profile/profile.header';
import ArticlePage from '../modules/article/pages/article/article.page';
import CreateArticle from '../modules/article/pages/create/article.create';
import Feed from '../modules/article/pages/feed/feed';
import ProfilePage from '../modules/article/pages/profile/profile.page';
import Login from '../modules/auth/pages/login/login';
import Register from '../modules/auth/pages/register/register';
import Settings from '../modules/user/components/settings/settings';

export const router = createBrowserRouter(
  [
    {
      path: '*',
      element: <App />,
      children: [
        {
          path: 'articles',
          children: [
            { path: 'feed', element: <Feed header={<FeedHeader />} tab="feed" /> },
            { path: 'global', element: <Feed header={<FeedHeader />} tab="global" /> },
            { path: ':tag', element: <Feed header={<FeedHeader />} /> },
            { path: '', element: <Navigate to="global" /> },
          ],
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'settings', element: <Settings /> },
        {
          path: 'profile/:username',
          children: [
            { path: '', element: <ProfilePage tab="my-articles" header={<ProfileHeader />} /> },
            {
              path: 'favorites',
              element: <ProfilePage tab="favorites" header={<ProfileHeader />} />,
            },
          ],
        },
        { path: 'article/:slug', element: <ArticlePage header={<ArticleHeader />} /> },
        { path: 'editor', element: <CreateArticle /> },
        { path: '', element: <Navigate to="articles" /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

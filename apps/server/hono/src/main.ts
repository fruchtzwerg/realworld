import { serve } from '@hono/node-server';
import { apiReference } from '@scalar/hono-api-reference';
import { compress } from 'hono/compress';
import { csrf } from 'hono/csrf';
import { showRoutes } from 'hono/dev';
import { etag } from 'hono/etag';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { openAPISpecs } from 'hono-openapi';

import { environment } from './environment/environment';
import { factory } from './factory/app.factory';
import { createArticleRouter, createFavoriteRouter, useCommentRouter } from './modules/article';
import { createAuthRouter } from './modules/auth';
import { useProfileRouter } from './modules/profile';
import { useTagRouter } from './modules/tag';
import { createUserRouter } from './modules/user';

const app = factory.createApp();

app.use(secureHeaders(), etag(), compress(), csrf(), logger(), trimTrailingSlash());

app.route('/api/articles', createArticleRouter());
app.route('/api/articles/:slug/favorite', createFavoriteRouter());
app.route('/api/articles/:slug/comments', useCommentRouter());
app.route('/api/users', createAuthRouter());
app.route('/api/user', createUserRouter());
app.route('/api/profiles', useProfileRouter());
app.route('/api/tags', useTagRouter());

app.get(
  '/swagger',
  openAPISpecs(app, {
    documentation: {
      info: {
        title: 'Realworld Conduit API',
        version: '1.0.0',
        description: 'Hono API',
      },
      servers: [{ url: `http://localhost:${environment.port}`, description: 'Local Server' }],
    },
  })
);

// app.get('/swagger', swaggerUI({ url: '/doc' }));
app.get('/docs', apiReference({ theme: 'saturn', spec: { url: '/swagger' } }));

serve({ port: environment.port, ...app }).on('listening', () => {
  showRoutes(app, { verbose: false });
  console.info(`\nListening on port ${environment.port}\n`);
});

import { serve } from '@hono/node-server';
import { OpenAPIGenerator } from '@orpc/openapi';
import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { apiReference } from '@scalar/hono-api-reference';
import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { csrf } from 'hono/csrf';
import { etag } from 'hono/etag';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { trimTrailingSlash } from 'hono/trailing-slash';

import { contract } from '@realworld/dto';

import { environment } from './environment/environment';
import { createContext } from './router/bootstrap';
import { router } from './router/procedures';

const app = new Hono();

app.use(secureHeaders(), etag(), compress(), csrf(), logger(), trimTrailingSlash());

const handler = new OpenAPIHandler(router);

app.use('/api/*', async (c, next) => {
  const context = await createContext(c.req.raw.headers);
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/api',
    context,
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});

app.get('/api/swagger', async (c) => {
  const spec = await openAPIGenerator.generate(contract, {
    info: {
      title: 'Realworld Conduit API',
      version: '1.0.0',
      description: 'Hono API',
    },
    servers: [{ url: `/api`, description: 'Local Server' }],
    components: {
      securitySchemes: {
        Token: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  });
  return c.json(spec);
});

app.get('/docs', apiReference({ theme: 'saturn', spec: { url: '/api/swagger' } }));

serve({ port: environment.port, ...app }, (info) => {
  console.info(`\nListening on port ${info.port}\n`);
});

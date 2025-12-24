import { Controller, Get } from '@nestjs/common';
import { OpenAPIGenerator } from '@orpc/openapi';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';

import { contract } from '@realworld/dto';

import { Public } from '../../modules/auth/decorators/public.decorator';

const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});

@Controller('docs')
export class DocsController {
  @Get('spec.json')
  @Public()
  async getDocumentationJson() {
    return await openAPIGenerator.generate(contract, {
      info: {
        title: 'Conduit RealWorld API',
        version: '1.0.0',
      },
      servers: [{ url: '/api' } /** Should use absolute URLs in production */],
      security: [{ bearerAuth: [] }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
    });
  }

  @Get()
  @Public()
  async getDocumentation() {
    const html = `
    <!doctype html>
    <html>
      <head>
        <title>My Client</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="app"></div>

        <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
        <script>
          Scalar.createApiReference('#app', {
            url: '/api/docs/spec.json',
            authentication: {
              securitySchemes: {
                bearerAuth: {
                  token: 'default-token',
                },
              },
            },
          })
        </script>
      </body>
    </html>
  `;

    return html;
  }
}

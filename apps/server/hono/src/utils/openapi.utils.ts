import { AppRoute, AppRouter } from '@ts-rest/core';
import { describeRoute } from 'hono-openapi';
import { resolver } from 'hono-openapi/zod';

export const openapi = <T extends AppRoute | AppRouter>(contract: T) => {
  const responses = Object.entries(contract.responses).reduce((acc, [code, schema]) => {
    return {
      ...acc,
      [+code]: {
        content: schema ? { 'application/json': { schema: resolver(schema as any) } } : null,
      },
    };
  }, {});

  return describeRoute({
    description: contract.description,
    responses,
  });
};

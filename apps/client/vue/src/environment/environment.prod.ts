import type { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: import.meta.env.API_URL ?? '/api',
};

import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  port: 3000,
  database: {
    adapter: 'prisma',
    // uri: 'mongodb://localhost/nest',
  },
  jwt: {
    secret: 'nest',
    expiresIn: 604_800, // 7d in s
    alg: 'HS256',
  },
};

import { Environment } from './environment.model';

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
// if (!process.env.CLIENT_PATH) throw new Error('CLIENT_PATH not set');

export const environment: Environment = {
  production: true,
  port: +(process.env.PORT || 80),
  database: {
    adapter: 'prisma',
    // uri: 'mongodb://localhost/nest',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: 604_800, // 7d in s
    alg: 'HS512',
  },
};

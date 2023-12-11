import { Environment } from './environment.model';

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
if (!process.env.CLIENT_PATH) throw new Error('CLIENT_PATH not set');

export const environment: Environment = {
  production: true,
  port: 80,
  database: {
    adapter: 'mongoose',
    uri: 'mongodb://localhost/nest',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  },
  clientPath: process.env.CLIENT_PATH,
};

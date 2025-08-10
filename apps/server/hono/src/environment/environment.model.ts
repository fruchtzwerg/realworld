import { SignatureAlgorithm } from 'hono/utils/jwt/jwa';
import { SignatureKey } from 'hono/utils/jwt/jws';

interface PrismaConfig {
  adapter: 'prisma';
}

interface MongooseConfig {
  adapter: 'mongoose';
  uri: string;
}

export interface Environment {
  production: boolean;
  port: number;
  database: PrismaConfig | MongooseConfig;
  jwt: {
    secret: SignatureKey;
    expiresIn: number;
    alg: SignatureAlgorithm;
  };
}

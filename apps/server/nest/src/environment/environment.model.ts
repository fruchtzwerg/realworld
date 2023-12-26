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
    secret: string;
    expiresIn: string;
  };
  clientPath: string;
}

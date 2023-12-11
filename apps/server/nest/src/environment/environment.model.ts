interface MongooseConfig {
  adapter: 'mongoose';
  uri: string;
}

export interface Environment {
  production: boolean;
  port: number;
  database: MongooseConfig;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  clientPath: string;
}

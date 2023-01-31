import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV ?? 'development'}.env`),
});

interface AppEnvironmentVariable {
  NODE_ENV: 'development' | 'production';
  PORT: number | string;
  DB_URL: string;
}

const getEnvVariable = (): AppEnvironmentVariable => ({
  ...(process.env as any),
});

export { getEnvVariable };
export type { AppEnvironmentVariable };

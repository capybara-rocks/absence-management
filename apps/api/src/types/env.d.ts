declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    REDIS_URL: string;
    CACHE_EXPIRATION: string;
  }
}

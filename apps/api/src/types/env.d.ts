declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    REDIS_URL: string;
    ACCESS_TOKEN_SECRET_KEY: string;
    REFRESH_TOKEN_SECRET_KEY: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
    CACHE_EXPIRATION: string;
  }
}

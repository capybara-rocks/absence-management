const config = {
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  redisUrl: process.env.REDIS_URL,
  secretKey: {
    accessToken: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshToken: process.env.REFRESH_TOKEN_SECRET_KEY,
  },
  expiresIn: {
    accessToken: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshToken: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  cacheExpiresIn: Number(process.env.CACHE_EXPIRATION),
};

export default config;

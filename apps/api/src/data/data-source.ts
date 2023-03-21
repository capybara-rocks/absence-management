import { DataSource } from 'typeorm';

import config from '../config';
import { Leave } from '../entity/Leave';
import migrations from '../migration';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: false,
  logging: true,
  subscribers: [],
  entities: [Leave],
  migrations,
  extra: {
    trustServerCertificate: true,
    trustedConnection: true,
  },
  options: {
    useUTC: true,
    encrypt: true,
  },
});

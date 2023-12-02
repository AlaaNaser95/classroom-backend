import * as dotenv from 'dotenv';
import { DatabaseType } from 'typeorm';

dotenv.config();
const env = process.env;
const ormConfig = {
  type: env.DATABASE_TYPE || 'mysql',
  host: env.DATABASE_HOST || 'localhost',
  port: env.DATABASE_PORT || 3306,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE,
  entities: ['dist/database/entities/*.js'],
  synchronize: env.DATABASE_SYNC || false,
  autoLoadEntities: true,
  logging: env.DATABASE_LOGGING || false,
  migrationsTableName: 'migrations',
  migrations: ['dist/database/migrations/*.js'],
  seeds: ['dist/database/seeders/**/*.seeder.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default ormConfig;

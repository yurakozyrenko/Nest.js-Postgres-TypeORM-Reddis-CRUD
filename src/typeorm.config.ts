import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();
import { DATA_MESSAGES } from './constants/constants';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: String(process.env.DATABASE_PASS),
  database: process.env.DATABASE_NAME,
  entities: ['*/**/*.entity.ts'],
  migrations: ['src/migration/*.ts'],
  //   synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log(DATA_MESSAGES.INITIALIZED);
  })
  .catch((err) => {
    console.error(DATA_MESSAGES.ERROR, err);
  });

export default AppDataSource;

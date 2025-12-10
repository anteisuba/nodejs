import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { logger } from './loggerHelper.js';

dotenv.config();

const databaseConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
};

console.log('DB CONFIG =>', databaseConfig); // ✅ 调试用：查看实际加载的配置

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    port: databaseConfig.port,  // ✅ 加上端口！
    dialect: 'postgres',
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log('✅ Connection has been established successfully.');
} catch (error) {
  logger.error(`❌ Unable to connect to the database: ${error.message}`);
  throw error;
}

export default sequelize;

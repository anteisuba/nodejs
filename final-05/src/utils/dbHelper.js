import { Sequelize } from 'sequelize';
const databaseConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

const sequelize = new Sequelize(
    databaseConfig.database, 
    databaseConfig.username, 
    databaseConfig.password, 
    {
    host: databaseConfig.host,
    dialect: 'postgres'
  });

  export default sequelize;
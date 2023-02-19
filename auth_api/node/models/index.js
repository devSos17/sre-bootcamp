import { Sequelize } from "sequelize";
import config from "config";

const dbConfig = config.get("dbConfig");

const sequelize = new Sequelize(
    dbConfig.db,
    process.env.DB_USERNAME || dbConfig.user,
    process.env.DB_PASSWORD || dbConfig.password,
    {
        host: process.env.DB_HOST || dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool: dbConfig.pool,
        define: {
            timestamps: false,
        },
    }
);

export default sequelize;

export const User = require("./User.js")(sequelize);

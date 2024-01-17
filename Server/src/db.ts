// db.js
import {Sequelize} from "sequelize";
import logger from "./logger";


const host :string = process.env.POSTGRES_HOST ?? "";
const username :string = process.env.POSTGRES_USER ?? "";
const password :string = process.env.POSTGRES_PASSWORD ?? "";
const port :number =  parseInt(process.env.POSTGRES_PORT ?? "", 10);
const db : string = process.env.POSTGRES_DB ?? "";

export const sequelize :Sequelize = new Sequelize( {
    dialect: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: db,
    logging: (msg :string) => logger.info(msg)
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        logger.info('Connection has been established successfully.');
    })
    .catch((err) => {
        logger.error('Unable to connect to the database:', err);
    });
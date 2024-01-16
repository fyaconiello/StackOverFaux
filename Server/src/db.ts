// db.js
import {Sequelize} from "sequelize";
import {logger} from "./logger";

const host :string = process.env.POSTGRES_HOST ?? "postgres";
const username :string = process.env.POSTGRES_USER ?? "";
const password :string = process.env.POSTGRES_PASSWORD ?? "";
const port :string = process.env.POSTGRES_PORT ?? "5432";
const db : string = process.env.POSTGRES_DB ?? "";

export const sequelize :Sequelize = new Sequelize(db, username, password, {
    host: host + ":" + port,
    dialect: 'postgres',
    logging: (msg :string) => logger.info(msg)
});

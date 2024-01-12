// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import winston, {Logger} from "winston";

dotenv.config();

// Pull server settings from .env config.
const port :number = Number(process.env.PORT ?? 3000);
const host :string = process.env.HOST ?? "0.0.0.0";

const app :Express = express();

// Set up logging.
const logger :Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'logs/combined.log'
        }),
    ],
});

if ('production' !== process.env.NODE_ENV) {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// @TODO: refactor endpoints into Express Router
app.get('/', (req :Request, res :Response) :void => {
    res.send('Express + TypeScript Server / HOME');
});

app.listen(port, host, () :void => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
});
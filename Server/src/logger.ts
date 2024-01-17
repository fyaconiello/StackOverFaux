// src/logger.ts
import winston, {Logger} from "winston";

// Set up logging into buckets by log level + combined file.
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

// Add non-production console reporting.
if ('production' !== process.env.NODE_ENV) {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger
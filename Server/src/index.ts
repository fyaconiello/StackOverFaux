// src/index.ts
import express, {
    Express,
    Request,
    Response,
    Router
} from "express";
import logger from "./logger";
import questionRoutes from "./routes/questions";

// Pull server settings from environment variables set in container
const port :number = Number(process.env.SERVER_PORT ?? 3000);
const host :string = process.env.SERVER_HOST ?? "0.0.0.0";

// Initialize Express app
const app :Express = express();

// Set up Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a middleware to handle pagination
app.use((req: Request, res: Response, next) => {
    const {
        page = "1",
        limit = "10"
    } = req.query;
    // @ts-ignore
    req.page = parseInt(page as string, 10);
    // @ts-ignore
    req.limit = parseInt(limit as string, 10);
    // @ts-ignore
    req.offset = (req.page - 1) * req.limit;

    next();
});

// Routes
app.use("/questions", questionRoutes);

// Begin listening
app.listen(port, host, () :void => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
});
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

routes(app);

export default app;
import pino from "pino";
import "dotenv/config";

export const logger = pino({
  level: process.env.LOGLEVEL,
  transport: process.env.NODE_ENV ? undefined : { target: "pino-pretty" }
});
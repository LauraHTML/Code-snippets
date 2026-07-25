import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

async function checkDatabase() {
  if (mongoose.connection.readyState === 1) {
    return true;
  }
  throw new Error("Banco de dados não está conectado");
}

router.get("/health", async (req, res) => {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      database: "unknown",
    },
  };

  try {
    await checkDatabase();
    health.checks.database = "ok";
    res.status(200).json(health);
  } catch (error) {
    health.status = "error";
    health.checks.database = "fail";
    health.error = error.message;
    res.status(503).json(health);
  }
});

export default router;

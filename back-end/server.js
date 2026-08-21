import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { validateEnv } from "./src/config/validateEnv.js";  

import app from "./src/app.js";
import mongoose from "mongoose";
import conectaDatabase from "./src/config/dbConnect.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ambiente = process.env.NODE_ENV || "development";

dotenv.config({ path: path.resolve(__dirname, `.env.${ambiente}`)})

const porta = process.env.PORT || 8080;
validateEnv(); 

async function iniciarServidor() {
  try {
    app.listen(porta, () => {
      console.log(`Servidor rodando na porta ${porta}`);
    });
    await conectaDatabase();
  } catch (erro) {
    console.error("Falha ao iniciar servidor:", erro.message);
    process.exit(1); 
  }
}

iniciarServidor();
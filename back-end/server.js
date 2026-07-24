import "dotenv/config";
import { validateEnv } from "./src/config/validateEnv.js";  
import app from "./src/app.js";
import mongoose from "mongoose";
import conectaDatabase from "./src/config/dbConnect.js";

const porta = process.env.PORT || 8080;
validateEnv(); 

app.post("/", async (req, res) => {
  try {
    res.status(200).json({ ok: true });
  } catch (erro) {
    console.error("Erro:", erro);
    res.status(500).json({ erro: erro.mensagem || "Erro interno do servidor" });
  }
})

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
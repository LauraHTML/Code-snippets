import "dotenv/config";
import app from "./src/app.js";
import mongoose from "mongoose";
import conectaDatabase from "./src/config/dbConnect.js";

const porta = 8080;

app.post("/", async (req, res) => {
  try {
    res.status(200).json({ ok: true })

  } catch (erro) {
    console.error("ERRO:", erro)
    res.status(500).json({ erro: erro.mensagem || "Erro interno do servidor" })
  }
})


async function iniciarServidor() {
  try {
    
    await conectaDatabase();

    app.listen(porta, () => {
      console.log(`✓ Servidor rodando na porta ${porta}`);
    });
  } catch (erro) {
    console.error("✗ Falha ao iniciar servidor:", erro.message);
    process.exit(1); 
  }
}

iniciarServidor();
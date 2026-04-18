import "dotenv/config";
import app from "./src/app.js";
import mongoose from "mongoose";

const porta = 8080;

app.post("/", async (req, res) => {
  try {
    console.log(req.body)

    res.status(200).json({ ok: true })

  } catch (erro) {
    console.error("ERRO:", erro)
    res.status(500).json({ erro: erro.message })
  }
})

app.listen(porta, () => {
  console.log("servidor rodando!", porta);
});
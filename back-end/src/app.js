import express from "express";
import conectaDatabase from "./config/dbConnect.js";
import codigo from "./models/Codigo.js";

const conexao = await conectaDatabase();

conexao.on("error" , (erro) => {
    console.error("Erro de conexão",erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso")
});

const app = express();
app.use(express.json());


app.use(express.json());

app.get("/codigos", async (req, res) => {
  const listaCodigos = await codigo.find({});
  res.status(200).json(listaCodigos);
});

app.get("/codigos/:id", (req, res) => {
    const index = buscarCodigo(req.params.id);
    res.status(200).json(codigos[index]);
})

app.post("/codigos", (req, res) => {
    codigos.push(req.body);
    res.status(201).send("codigo adicionado com sucesso");
});

app.put("/codigos/:id", (req, res) => {
  const index = buscarCodigo(req.params.id);
  codigos[index].linguagem = req.body.linguagem;
  res.status(200).json(codigos);
});

app.get("/", (req, res) => {
    res.status(200).send("Servidor inicial");
});

app.delete("/codigos/:id", (req, res) => {
  const index = buscarCodigo(req.params.id);
  codigos.splice(index, 1);
  res.status(200).send("código removido com sucesso");
});

export default app;
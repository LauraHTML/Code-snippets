import express from "express";

const app = express();
app.use(express.json());

const codigos = {
    id: 1, 
    codigo: 'console.log("hello world")',
    linguagem: 'javaScript',
    id: 2, 
    codigo: '$dia = segunda',
    linguagem: 'php',
}

app.use(express.json());

app.get("/codigos", (req,res) => {
    res.status(200).json(codigos)
})

app.post("/codigos", (req, res) => {
  codigos.push(req.body);
  res.status(201).send("codigo adicionado com sucesso");
});

app.get("/codigos/:id", (req, res) => {
  const index = buscaCodigo(req.params.id);
  res.status(200).json(livros[index]);
})

app.get("/", (req, res) => {
  res.status(200).send("Servidor inicial");
});

export default app;
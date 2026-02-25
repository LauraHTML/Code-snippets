import express from "express";

const app = express();
app.use(express.json());

const codigos = [
    {
        id: 1,
        codigo: 'console.log("hello world")',
        linguagem: 'javaScript',
    },
    {
        id: 2,
        codigo: '$dia = segunda',
        linguagem: 'php',
    }
]



app.use(express.json());

app.get("/codigos", (req, res) => {
    res.status(200).json(codigos)
})

app.post("/codigos", (req, res) => {
    codigos.push(req.body);
    res.status(201).send("codigo adicionado com sucesso");
});

function buscarCodigo(id) {
    return codigos.findIndex(codigo => {
        return codigo.id === Number(id);
    })
}

app.get("/codigos/:id", (req, res) => {
    const index = buscarCodigo(req.params.id);
    res.status(200).json(codigos[index]);
})

app.put("/codigos/:id", (req, res) => {
  const index = buscarCodigo(req.params.id);
  codigos[index].linguagem = req.body.linguagem;
  res.status(200).json(codigos);
});

app.get("/", (req, res) => {
    res.status(200).send("Servidor inicial");
});

export default app;
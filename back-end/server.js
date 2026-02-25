import app from "./src/app.js";

const porta = 3000;

const codigos = {
    id: 1, 
    codigo: 'console.log("hello world")',
    linguagem: 'javaScript'
}

app.get("/codigos", (req,res) => {
    res.status(200).json(codigos)
})

app.listen(porta, () => {
  console.log("servidor rodando!");
});
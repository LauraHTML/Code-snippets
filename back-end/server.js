import http from "http";
const porta = 8080;

const rotas = { 
    "/": "Rota base",
    "/codigo":"Códigos salvos",
    "/linguagens":"linguagens usadas"
}


const server = http.createServer((req,res) => {
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.end(rotas[req.url]);
});

server.listen(porta, () => {
    console.log("Servidor rodando")
})
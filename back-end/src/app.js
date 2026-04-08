import express from "express";
import cookieParser from "cookie-parser";
import conectaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
const conexao = await conectaDatabase();

conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso")
});

const app = express();

// Middleware para parsear cookies
app.use(cookieParser());

routes(app);

export default app;
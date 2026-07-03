import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import conectaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
const conexao = await conectaDatabase();

conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    // console.log("Conexão com o banco feita com sucesso")
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

routes(app);

export default app;
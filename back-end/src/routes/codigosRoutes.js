import express from "express";
import CodigoController from "../controllers/codigoController.js";
import { verificarToken } from "../middleware/autenticacao.js";

const routes = express.Router();

// Rotas protegidas (com autenticação)
routes.get("/codigos", verificarToken, CodigoController.listarCodigos);
routes.get("/codigos/:id", verificarToken, CodigoController.listarCodigoPorId);
routes.get("/codigos/busca", verificarToken, CodigoController.buscarCodigoPorTitulo);
routes.post("/codigos", verificarToken, CodigoController.inserirCodigo);
routes.put("/codigos/:id", verificarToken, CodigoController.atualizarCodigo);
routes.delete("/codigos/:id", verificarToken, CodigoController.excluirCodigo);

export default routes;
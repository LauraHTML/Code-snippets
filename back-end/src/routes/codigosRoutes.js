import express from "express";
import CodigoController from "../controllers/codigoController.js";

const routes = express.Router();

routes.get("/codigos", CodigoController.listarCodigos);
routes.get("/codigos/:id", CodigoController.listarCodigoPorId);
routes.post("/livros", CodigoController.inserirCodigo);
routes.put("/livros", CodigoController.atualizarCodigo);

export default routes;
import express from "express";
import CodigoController from "../controllers/codigoController.js";

const routes = express.Router();

routes.get("/codigos", CodigoController.listarCodigos);
routes.get("/codigos/:id", CodigoController.listarCodigoPorId);
routes.post("/codigos", CodigoController.inserirCodigo);
routes.put("/codigos/:id", CodigoController.atualizarCodigo);
routes.delete("/codigos/:id", CodigoController.excluirCodigo);

export default routes;
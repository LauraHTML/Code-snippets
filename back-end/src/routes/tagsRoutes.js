import express from "express";
import TagController from "../controllers/tagController.js";
import { verificarToken } from "../middleware/autenticacao.js";

const routes = express.Router();

routes.get("/tags",verificarToken, TagController.listarTags);
routes.get("/tags/:id",verificarToken, TagController.listarTagsPorId);
routes.post("/tags",verificarToken, TagController.inserirTags);
routes.put("/tags/:id",verificarToken, TagController.atualizarTag);
routes.delete("/tags/:id",verificarToken, TagController.excluirTag);

export default routes;
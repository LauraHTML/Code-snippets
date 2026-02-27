import express from "express";
import TagController from "../controllers/tagController.js";

const routes = express.Router();

routes.get("/tags", TagController.listarTags);
routes.get("/tags/:id", TagController.listarTagsPorId);
routes.post("/tags", TagController.inserirTags);
routes.put("/tags/:id", TagController.atualizarTag);
routes.delete("/tags/:id", TagController.excluirTag);

export default routes;
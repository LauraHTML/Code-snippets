import express from "express";
import CodigoController from "../controllers/codigoController.js";

const routes = express.Router();

routes.get("/codigos", CodigoController.listarCodigos);

export default routes;
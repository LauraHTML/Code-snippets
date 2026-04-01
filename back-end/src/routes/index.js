import express from "express";
import codigos from "./codigosRoutes.js";
import tags from "./tagsRoutes.js";
import usuario from "./usuarioRotas.js";
import cors from "cors"

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Code Snippets"));

  app.use(cors())
  //rotas
  app.use(express.json(), codigos, tags, usuario);
};

export default routes;
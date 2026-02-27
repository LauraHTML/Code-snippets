import express from "express";
import codigos from "./codigosRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Code Snippets"));

  //rotas de codigos
  app.use(express.json(), codigos);
};

export default routes;
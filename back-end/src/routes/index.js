import express from "express";
import codigos from "./codigosRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Code Snippets"));

  app.use(express.json(), codigos);
};

export default routes;
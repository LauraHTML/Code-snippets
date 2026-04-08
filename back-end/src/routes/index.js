import express from "express";
import codigos from "./codigosRoutes.js";
import tags from "./tagsRoutes.js";
import usuario from "./usuarioRotas.js";
import cors from "cors"
import "dotenv/config";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Code Snippets"));

  app.use(cors({credentials:true, 
    origin: process.env.CLIENT_URL, 
    allowedHeaders: ["Content-type", "Authorization"], 
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"]}))
  //rotas
  app.use(express.json(), codigos, tags, usuario);
};

export default routes;
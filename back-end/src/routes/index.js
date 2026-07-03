import express from "express";
import codigos from "./codigosRoutes.js";
import tags from "./tagsRoutes.js";
import usuario from "./usuarioRotas.js";
import cors from "cors"
import "dotenv/config";

const allowedOrigins = process.env.CLIENT_URL?.split(',') || []

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Code Snippets"));

  app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
    allowedHeaders: ["Content-type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    maxAge: 86400
  }))
  //rotas
  app.use(express.json(), codigos, tags, usuario);
};

export default routes;
import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const routes = express.Router();

routes.post("/cadastro", UsuarioController.CadastrarUsuario);
routes.post("/login", UsuarioController.Login);
// routes.post("/auth/callback")

export default routes;
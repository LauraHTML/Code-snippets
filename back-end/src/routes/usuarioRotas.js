import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import { verificarToken } from "../middleware/autenticacao.js";

const routes = express.Router();

routes.post("/cadastro", UsuarioController.CadastrarUsuario);
routes.post("/login", UsuarioController.Login);
routes.get("/usuario", verificarToken, UsuarioController.verificarAutenticacao);

export default routes;
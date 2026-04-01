import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  id_usuario: { type: mongoose.Schema.Types.ObjectId },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
}, { versionKey: false }
, { collection: "codigos"});

const usuario = mongoose.model("usuario", usuarioSchema, "usuario");

export default usuario; 
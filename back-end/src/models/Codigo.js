import mongoose from "mongoose";
import { tagsSchema } from "./Tags.js";

const codigosSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: true },
  codigo: { type: String },
  linguagem: { type: String },
  tags: tagsSchema,
  dataCriacao: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false }
, { collection: "codigos"});

const codigo = mongoose.model("codigos", codigosSchema, "codigos");

export default codigo;
import mongoose from "mongoose";

const codigosSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: true },
  codigo: { type: String },
  linguagem: { type: String },
  tags: { type: [String] },
  favoritado: { type: Boolean },
  dataCriacao: { type: Date }
}, { versionKey: false }
, { collection: "codigos"});

const codigo = mongoose.model("codigos", codigosSchema);

export default codigo;
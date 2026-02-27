import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: true },
  cor: { type: String }
}, { versionKey: false });

const tags = mongoose.model("tags", tagsSchema);

export { tags, tagsSchema };
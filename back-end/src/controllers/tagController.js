import { tags } from "../models/Tags.js";

class TagController {

     static async listarTags (req, res) {
    try {
      const listarTags = await tags.find({});
      res.status(200).json(listarTags);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async listarTagsPorId (req, res) {
    try {
      const id = req.params.id;
      const tagEncontrada = await tags.findById(id);
      res.status(200).json(tagEncontrada);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do tag` });
    }
  };

  static async atualizarTag (req, res) {
    try {
      const id = req.params.id;
      await tags.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "Tag atualizado com sucesso!"});
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao atualizar tag` });
    }
  };

  static async excluirTag (req, res) {
    try {
      const id = req.params.id;
      await tags.findByIdAndDelete(id);
      res.status(200).json({message: "Tag excluido com sucesso!"});
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao excluir tag` });
    }
  };

    static async inserirTags (req, res) {
    try {
      const novaTag = await tags.create(req.body);
      res.status(201).json({ message: "criado com sucesso", tags: novaTag });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao inserir nova tag` });
    }
  }


}

export default TagController;
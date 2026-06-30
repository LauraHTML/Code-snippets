import { tags } from "../models/Tags.js";

class TagController {

  static async listarTags(req, res) {
    try {
      const listarTags = await tags.find({ idUsuario: req.usuario.id_usuario });
      res.status(200).json(listarTags, { status: 'sucesso', titulo: 'Tag encontrada', mensagem: "Tag encontrada com sucesso!" });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro ao listar tags', mensagem: `${erro.mensagem} - falha na requisição` });
    }
  };

  static async listarTagsPorId(req, res) {
    try {
      const id = req.params.id;

      const tagEncontrada = await tags.findOne({ _id: id, idUsuario: req.usuario.id_usuario });

      if (!tagEncontrada) {
        return res.status(404).json({  status: 'erro',  titulo: 'Não encontrado',  mensagem: 'Tag não encontrada'});
      }

      return res.status(200).json({ status: 'sucesso', titulo: 'Tag encontrada', mensagem: 'Tag encontrada com sucesso!', tag: tagEncontrada
      });
    } catch (erro) {
      return res.status(500).json({ status: 'erro', titulo: 'Erro ao listar tags por id', mensagem: `${erro.mensagem} - falha na requisição do tag` });
    }
  };

  static async atualizarTag(req, res) {
    try {
      const id = req.params.id;
      await tags.findByIdAndUpdate({ _id: id, idUsuario: req.usuario.id_usuario }, req.body);
      res.status(200).json({ status: 'sucesso', titulo: 'Tag atualizada', mensagem: "Tag atualizada com sucesso!" });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro ao atualizar tag', mensagem: `${erro.mensagem} - falha ao atualizar tag` });
    }
  };

  static async excluirTag(req, res) {
    try {
      const id = req.params.id;
      await tags.findByIdAndDelete({ _id: id, idUsuario: req.usuario.id_usuario });
      res.status(200).json({ status: 'sucesso', titulo: 'Tag excluida', mensagem: "Tag excluida com sucesso!" });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na exclusão', mensagem: `${erro.mensagem} - falha ao excluir tag` });
    }
  };

  static async inserirTags(req, res) {
    try {
      const novaTag = await tags.create({ ...req.body, idUsuario: req.usuario.id_usuario });
      res.status(201).json({ status: 'sucesso', titulo: 'Tag criada', mensagem: "Tag criada com sucesso", tags: novaTag });
    } catch (erro) {
      console.error('Erro ao criar tag:', erro);
      res.status(500).json({ status: 'erro', titulo: 'Erro ao criar tag', mensagem: `${erro.mensagem} - falha ao inserir nova tag` });
    }
  }


}

export default TagController;
import { tags } from "../models/Tags.js";
import mongoose from "mongoose";

class TagController {

  static stringCerta(value) {
    //verifica se é valida e não esta vazia
    return typeof value === 'string' && value.trim() !== '';
  }

  static async encontrarTag(tagId, userId) {
    //retorna verdadeiro se tiver um id e se tem o formato certo do mongoose
    if (!TagController.stringCerta(tagId) || !mongoose.isValidObjectId(tagId)) {
      return null;
    }
    return TagsModel.findOne({ _id: tagId, idUsuario: userId });
  }

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

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ status: 'erro', titulo: 'ID inválido', mensagem: 'O ID da tag é inválido' });
      }

      const tagEncontrada = await tags.findOne({ _id: id, idUsuario: req.usuario.id_usuario });

      if (!tagEncontrada) {
        return res.status(404).json({ status: 'erro', titulo: 'Não encontrado', mensagem: 'Tag não encontrada' });
      }

      return res.status(200).json({
        status: 'sucesso', titulo: 'Tag encontrada', mensagem: 'Tag encontrada com sucesso!', tag: tagEncontrada
      });
    } catch (erro) {
      return res.status(500).json({ status: 'erro', titulo: 'Erro ao listar tags por id', mensagem: `${erro.mensagem} - falha na requisição do tag` });
    }
  };

  static async atualizarTag(req, res) {
    try {
      const id = req.params.id;
      const { titulo, cor } = req.body;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ status: 'erro', titulo: 'ID inválido', mensagem: 'O ID da tag é inválido' });
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ status: 'erro', titulo: 'Dados ausentes', mensagem: 'Forneça pelo menos um campo para atualização' });
      }

      const payloadAtualizado = {};

      if (titulo !== undefined) {
        if (!TagController.stringCerta(titulo)) {
          return res.status(400).json({ status: 'erro', titulo: 'Título inválido', mensagem: 'O título deve estar preenchido' });
        }
        payloadAtualizado.titulo = titulo.trim();
      }

      if (cor !== undefined) {
        if (!TagController.stringCerta(cor)) {
          return res.status(400).json({ status: 'erro', titulo: 'Cor inválida', mensagem: 'Escolha uma cor para a tag' });
        }
        payloadAtualizado.cor = cor.trim();
      }

      if (Object.keys(payloadAtualizado).length === 0) {
        return res.status(400).json({ status: 'erro', titulo: 'Dados inválidos', mensagem: 'Nenhum campo válido foi enviado para atualização' });
      }

      const tagAtualizada = await tags.findOneAndUpdate(
        { _id: id, idUsuario: req.usuario.id_usuario },
        payloadAtualizado,
        { returnDocument: 'after' }
      );

      res.status(200).json({ status: 'sucesso', titulo: 'Tag atualizada', mensagem: "Tag atualizada com sucesso!" });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na atualização', mensagem: `${erro} - falha ao atualizar tag` });
    }
  };

  static async excluirTag(req, res) {
    try {
      const id = req.params.id;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ status: 'erro', titulo: 'ID inválido', mensagem: 'O ID da tag é inválido' });
      }

      const tagExcluida = await tags.findByIdAndDelete({ _id: id, idUsuario: req.usuario.id_usuario });

      if (!tagExcluida) {
        return res.status(404).json({ status: 'erro', titulo: 'Erro na exclusão', mensagem: 'Tag não encontrada' });
      }

      res.status(200).json({ status: 'sucesso', titulo: 'Tag excluida', mensagem: "Tag excluida com sucesso!" });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na exclusão', mensagem: `${erro} - falha ao excluir tag` });
    }
  };

  static async inserirTags(req, res) {
    try {
      const idUsuario = req.usuario.id_usuario;
      const novaTag = await tags.create({ ...req.body, idUsuario });
      //verifica se tem metodo toobject do mongoose
      const tag = novaTag.toObject ? novaTag.toObject() : novaTag;

      res.status(201).json({ status: 'sucesso', titulo: 'Tag criada', mensagem: 'Tag criada com sucesso', tag: tag, tags: tag });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro ao criar tag', mensagem: `${erro} - falha ao inserir nova tag` });
    }
  }


}

export default TagController;
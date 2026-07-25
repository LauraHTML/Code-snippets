import codigo from "../models/Codigo.js";
import mongoose from "mongoose";
import { tags as TagsModel } from "../models/Tags.js";

class CodigoController {

  static stringCerta(value) {
    //verifica se é valida e não esta vazia
    return typeof value === 'string' && value.trim() !== '';
  };

  static async encontrarTag(tagId, userId) {
    //retorna verdadeiro se tiver um id e se tem o formato certo do mongoose
    if (!CodigoController.stringCerta(tagId) || !mongoose.isValidObjectId(tagId)) {
      return null;
    }

    return TagsModel.findOne({ _id: tagId, idUsuario: userId });
  };

  static async listarCodigos(req, res) {
    try {
      const usuario = req.usuario.id_usuario;
      const listarCodigos = await codigo.find({ idUsuario: usuario }).populate('tags');
      res.status(200).json(listarCodigos);
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na listagem', mensagem: `${erro} - falha na requisição` });
    }
  };

  static async listarCodigoPorId(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ status: 'erro', titulo: 'ID inválido', mensagem: 'O ID do código é inválido' });
      }

      const codigoEncontrado = await codigo.findOne({ _id: id, idUsuario: req.usuario.id_usuario });

      if (!codigoEncontrado) {
        return res.status(404).json({ status: 'erro', titulo: 'Não encontrado', mensagem: 'Código não encontrado' });
      }

      res.status(200).json(codigoEncontrado);
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na busca', mensagem: `${erro} - falha na requisição do código` });
    }
  };

  static async atualizarCodigo(req, res) {
    try {
      const { id } = req.params;
      const { titulo, codigo: conteudo, linguagem, tag, tags: tagsBody } = req.body;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ status: 'erro', titulo: 'ID inválido', mensagem: 'O ID do código é inválido' });
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ status: 'erro', titulo: 'Dados ausentes', mensagem: 'Forneça pelo menos um campo para atualização' });
      }

      const payloadAtualizado = {};

      if (titulo !== undefined) {
        if (!CodigoController.stringCerta(titulo)) {
          return res.status(400).json({ status: 'erro', titulo: 'Título inválido', mensagem: 'O título deve estar preenchido' });
        }
        payloadAtualizado.titulo = titulo.trim();
      }

      if (conteudo !== undefined) {
        if (!CodigoController.stringCerta(conteudo)) {
          return res.status(400).json({ status: 'erro', titulo: 'Código inválido', mensagem: 'O código deve ser uma string não vazia' });
        }
        payloadAtualizado.codigo = conteudo.trim();
      }

      if (linguagem !== undefined) {
        if (!CodigoController.stringCerta(linguagem)) {
          return res.status(400).json({ status: 'erro', titulo: 'Linguagem inválida', mensagem: 'A linguagem deve ser uma string não vazia' });
        }
        payloadAtualizado.linguagem = linguagem.trim();
      }

      const tagId = tag ?? tagsBody;
      if (tagId !== undefined) {
        if (!CodigoController.stringCerta(tagId) || !mongoose.isValidObjectId(tagId)) {
          return res.status(400).json({ status: 'erro', titulo: 'Tag inválida', mensagem: 'O ID da tag deve ser válido' });
        }

        const tagEncontrada = await CodigoController.encontrarTag(tagId, req.usuario.id_usuario);
        if (!tagEncontrada) {
          return res.status(404).json({ status: 'erro', titulo: 'Tag não encontrada', mensagem: 'Tag selecionada não existe para este usuário' });
        }

        payloadAtualizado.tags = tagEncontrada;
      }

      if (Object.keys(payloadAtualizado).length === 0) {
        return res.status(400).json({ status: 'erro', titulo: 'Dados inválidos', mensagem: 'Nenhum campo válido foi enviado para atualização' });
      }

      const codigoAtualizado = await codigo.findOneAndUpdate(
        { _id: id, idUsuario: req.usuario.id_usuario },
        payloadAtualizado,
        { new: true }
      );

      if (!codigoAtualizado) {
        return res.status(403).json({ status: 'erro', mensagem: 'Acesso não autorizado' });
      }

      return res.status(200).json({ status: 'sucesso', titulo: 'Código atualizado', mensagem: 'Código atualizado com sucesso!' });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na atualização', mensagem: `${erro} - falha ao atualizar código` });
    }
  };

  static async excluirCodigo(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ status: 'erro', titulo: 'ID inválido', mensagem: 'O ID do código é inválido' });
      }

      const codigoExcluido = await codigo.findOneAndDelete({ _id: id, idUsuario: req.usuario.id_usuario });
      if (!codigoExcluido) {
        return res.status(404).json({ status: 'erro', titulo: 'Erro na exclusão', mensagem: 'Código não encontrado' });
      }

      res.status(200).json({ status: 'sucesso', titulo: 'Código excluido', mensagem: 'Código excluido com sucesso!' });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na exclusão', mensagem: `${erro} - falha ao excluir código` });
    }
  };

  static async inserirCodigo(req, res) {
    try {
      const usuario = req.usuario.id_usuario;
      const { titulo, linguagem, codigo: conteudo, tag } = req.body;

      if (!req.body) {
        return res.status(400).json({ status: 'erro', titulo: 'Body ausente', mensagem: 'O corpo da requisição não foi enviado' });
      }

      if (!CodigoController.stringCerta(titulo)) {
        return res.status(400).json({ status: 'erro', titulo: 'Título inválido', mensagem: 'O título é obrigatório' });
      }
      if (!CodigoController.stringCerta(linguagem)) {
        return res.status(400).json({ status: 'erro', titulo: 'Linguagem inválida', mensagem: 'A linguagem é obrigatória' });
      }
      if (!CodigoController.stringCerta(conteudo)) {
        return res.status(400).json({ status: 'erro', titulo: 'Código inválido', mensagem: 'O conteúdo do código é obrigatório' });
      }
      if (!CodigoController.stringCerta(tag) || !mongoose.isValidObjectId(tag)) {
        return res.status(400).json({ status: 'erro', titulo: 'Tag inválida', mensagem: 'O ID da tag deve ser válido' });
      }

      const tagEncontrada = await CodigoController.encontrarTag(tag, usuario);
      if (!tagEncontrada) {
        return res.status(404).json({ status: 'erro', titulo: 'Tag não encontrada', mensagem: 'Tag selecionada não existe para este usuário' });
      }

      const codigoCompleto = {
        titulo: titulo.trim(),
        codigo: conteudo.trim(),
        linguagem: linguagem.trim(),
        tags: tagEncontrada,
        idUsuario: usuario
      };

      const codigoCriado = await codigo.create(codigoCompleto);

      return res.status(201).json({ status: 'sucesso', titulo: 'Código criado', mensagem: 'Código criado com sucesso', codigo: codigoCriado });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na criação', mensagem: `${erro} - falha ao inserir novo código` });
    }
  }

  static async buscarCodigoPorTitulo(req, res) {
    let titulo = req.query.titulo;

    try {
      if (typeof titulo !== 'string' || titulo.trim() == '') {
        return res.status(400).json({ status: 'erro', titulo: 'Erro ao buscar', erro: 'Título deve ser texto' });
      }

      titulo = titulo.trim().toLowerCase();
      if (!/^[a-zA-Z0-9\s\-_áéíóúàâãõç]+$/i.test(titulo)) {
        return res.status(400).json({ erro: 'Título contém caracteres inválidos' });
      }

      if (titulo.length === 0 || titulo.length > 100) {
        return res.status(400).json({ erro: 'Título inválido' });
      }

      const codigoPorTitulo = await codigo.find({ titulo: titulo, idUsuario: req.usuario.id_usuario });
      res.status(200).json(codigoPorTitulo);
    }
    catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na busca', mensagem: `${erro} - falha na busca` })
    }
  }


}

export default CodigoController;
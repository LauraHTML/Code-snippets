import codigo from "../models/Codigo.js";
import mongoose from "mongoose";
import { tags as TagsModel } from "../models/Tags.js";

class CodigoController {

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
      const id = req.params.id;
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
      const id = req.params.id;
      const { titulo, codigo: conteudo, linguagem, tag, tags: tagsBody } = req.body;
      const updatePayload = {};

      if (titulo !== undefined) updatePayload.titulo = titulo;
      if (conteudo !== undefined) updatePayload.codigo = conteudo;
      if (linguagem !== undefined) updatePayload.linguagem = linguagem;

      const tagId = tag ?? tagsBody;
      if (tagId !== undefined) {
        const tagEncontrada = await TagsModel.findOne({ _id: tagId, idUsuario: req.usuario.id_usuario });

        if (!tagEncontrada) {
          return res.status(404).json({
            status: 'erro',
            titulo: 'Tag não encontrada',
            mensagem: 'Tag selecionada não existe para este usuário'
          });
        }

        updatePayload.tags = tagEncontrada;
      }

      const codigoAtualizado = await codigo.findOneAndUpdate({ _id: id, idUsuario: req.usuario.id_usuario },updatePayload, { new: true }, {returnDocument: 'after'});

      if (!codigoAtualizado) {
        return res.status(403).json({
          status: 'erro',
          mensagem: 'Acesso não autorizado'
        });
      }

      return res.status(200).json({ status: 'sucesso', titulo: 'Código atualizado', mensagem: "Código atualizado com sucesso!" });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na atualização', mensagem: `${erro} - falha ao atualizar código` });
    }
  };

  static async excluirCodigo(req, res) {
    try {
      const codigoExcluido = await codigo.findByIdAndDelete({
        _id: req.params.id,
        idUsuario: req.usuario.id_usuario
      });
      if (!codigoExcluido) {
        return res.status(404).json({ status: 'erro', titulo: 'Erro na exclusão', mensagem: "Código não encontrado" })
      }

      res.status(200).json({ status: 'sucesso', titulo: 'Código excluido', mensagem: "Código excluido com sucesso!" });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na exclusão', mensagem: `${erro} - falha ao excluir código` });
    }
  };

  static async inserirCodigo(req, res) {
    try {
      const usuario = req.usuario.id_usuario;
      const { titulo, linguagem, codigo: conteudo, tag } = req.body;

      const tagEncontrada = await TagsModel.findOne({ _id: tag, idUsuario: usuario });

      if (!tagEncontrada) {
        return res.status(404).json({ status: 'erro', titulo: 'Tag não encontrada', mensagem: 'Tag selecionada não existe para este usuário' });
      }

      const codigoCompleto = {
        titulo,
        codigo: conteudo,
        linguagem,
        tags: tagEncontrada,
        idUsuario: usuario
      };

      const codigoCriado = await codigo.create(codigoCompleto);

      return res.status(201).json({ status: 'sucesso', titulo: 'Código criado', mensagem: "Código criado com sucesso", codigo: codigoCriado });
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
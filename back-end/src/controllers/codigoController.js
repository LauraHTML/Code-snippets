import codigo from "../models/Codigo.js";
import { tags } from "../models/Tags.js";

class CodigoController {

  static async listarCodigos(req, res) {
    try {
      const listarCodigos = await codigo.find({ idUsuario: req.usuario.id_usuario });
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
      const codigoAtualizado = await codigo.findByIdAndUpdate(
        { _id: id, idUsuario: req.usuario.id_usuario },req.body,{ new: true });

      if (!codigoAtualizado) {
        return res.status(403).json({
          status: 'erro',
          mensagem: 'Acesso não autorizado'
        });
      }

      res.status(200).json({ status: 'sucesso', titulo: 'Código atualizado', mensagem: "Código atualizado com sucesso!" });
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
    const novoCodigo = req.body;
    try {
      const tagEncontrada = await tags.findById(novoCodigo.tags);
      const codigoCompleto = { ...novoCodigo, tags: { ...tagEncontrada._doc }, idUsuario: req.usuario.id_usuario };
      const codigoCriado = await codigo.create(codigoCompleto);
      res.status(201).json({ status: 'sucesso', titulo: 'Código criado', mensagem: "Código criado com sucesso", codigo: codigoCriado });
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
      titulo = titulo.replace(/[$<>'"\\]/g, '');

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
import codigo from "../models/Codigo.js";
import { tags } from "../models/Tags.js";

class CodigoController {

  static async listarCodigos(req, res) {
    try {
      const listarCodigos = await codigo.find({ idUsuario: req.id_usuario });
      res.status(200).json(listarCodigos);
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na listagem', mensagem: `${erro} - falha na requisição` });
    }
  };

  static async listarCodigoPorId(req, res) {
    try {
      const id = req.params.id;
      const codigoEncontrado = await codigo.findById(id);
      res.status(200).json(codigoEncontrado);
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na busca', mensagem: `${erro} - falha na requisição do código` });
    }
  };

  static async atualizarCodigo(req, res) {
    try {
      const id = req.params.id;
      await codigo.findByIdAndUpdate(id, req.body);
      res.status(200).json({ status: 'sucesso', titulo: 'Código atualizado', mensagem: "Código atualizado com sucesso!" });
    } catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na atualização', mensagem: `${erro} - falha ao atualizar código` });
    }
  };

  static async excluirCodigo(req, res) {
    try {
      const codigo = await codigo.findByIdAndDelete({
        _id: req.params.id,
        userId: req.id_usuario
      });
      if (!codigo) {
        return res.status(404).json({status:'erro', titulo:'Erro na exclusão', mensagem: "Código não encontrado" })
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
    const titulo = req.query.titulo;
    try {
      const codigoPorTitulo = await codigo.find({ titulo: titulo });
      res.status(200).json(codigoPorTitulo);
    }
    catch (erro) {
      res.status(500).json({ status: 'erro', titulo: 'Erro na busca', mensagem: `${erro} - falha na busca` })
    }
  }


}

export default CodigoController;
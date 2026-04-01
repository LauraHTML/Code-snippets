import codigo from "../models/Codigo.js";
import { tags } from "../models/Tags.js";

class CodigoController {

     static async listarCodigos (req, res) {
    try {
      const listarCodigos = await codigo.find({});
      res.status(200).json(listarCodigos);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async listarCodigoPorId (req, res) {
    try {
      const id = req.params.id;
      const codigoEncontrado = await codigo.findById(id);
      res.status(200).json(codigoEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do código` });
    }
  };

  static async atualizarCodigo (req, res) {
    try {
      const id = req.params.id;
      await codigo.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "Código atualizado com sucesso!"});
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao atualizar código` });
    }
  };

  static async excluirCodigo (req, res) {
    try {
      const id = req.params.id;
      await codigo.findByIdAndDelete(id);
      res.status(200).json({message: "Código excluido com sucesso!"});
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao excluir código` });
    }
  };

    static async inserirCodigo (req, res) {
      const novoCodigo = req.body;
    try {
      const tagEncontrada = await tags.findById(novoCodigo.tags);
      const codigoCompleto = { ...novoCodigo, tags: {...tagEncontrada._doc}}
      const codigoCriado = await codigo.create(codigoCompleto);
      res.status(201).json({ message: "Código criado com sucesso", codigo: codigoCriado });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao inserir novo código` });
    }
  }

  static async buscarCodigoPorTitulo (req,res) {
      const titulo = req.query.titulo;
    try {
      const codigoPorTitulo = await codigo.find({ titulo: titulo});
      res.status(200).json(codigoPorTitulo);
    }
    catch(erro){
      res.status(500).json({ message: `${erro.message} - falha na busca`})
    }
  }


}

export default CodigoController;
import codigo from "../models/Codigo.js";

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

    static async inserirCodigo (req, res) {
    try {
      const novoCodigo = await codigo.create(req.body);
      res.status(201).json({ message: "criado com sucesso", codigo: novoCodigo });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao inserir novo código` });
    }
  }


}

export default CodigoController;
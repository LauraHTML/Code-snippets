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

    static async cadastrarLivro (req, res) {
    try {
      const novoLivro = await livro.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoLivro });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  }


}

export default CodigoController;
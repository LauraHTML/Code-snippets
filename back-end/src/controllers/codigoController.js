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


}

export default CodigoController;
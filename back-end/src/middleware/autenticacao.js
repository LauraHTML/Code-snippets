import express from 'express';
import codigo from '../models/Codigo.js';
import jwt from 'jsonwebtoken';

const routes = express.Router();

export const verificarToken = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                status: 'erro',
                titulo: 'Não autorizado',
                mensagem: 'Token não fornecido'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = decoded;
        req.usuario.id_usuario = decoded.id;
        console.log(decoded);
        next();
    } catch (erro) {
        if (erro.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'erro',
                titulo: 'Sessão expirada',
                mensagem: 'Seu token expirou, faça login novamente'
            });
        }

        return res.status(401).json({
            status: 'erro',
            titulo: 'Token inválido',
            mensagem: 'Token inválido ou mal formatado'
        });
    }
};

//proteção da rota de código
routes.get('/codigos', verificarToken, async (req, res) => {
    const codigos = await codigo.find({
        idUsuario: new mongoose.Types.ObjectId(req.userId)
    }).sort({ dataCriacao: -1 });

    res.json(codigos);
});

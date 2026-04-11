import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import usuario from '../models/Usuario.js';

const JWT_CONFIG = {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h'
};

class UsuarioController {
    static async CadastrarUsuario(req, res) {
        try {

            const { nome, email, senha } = req.body;

            if (!req.body) {
                return res.status(400).json({ mensagem: "Body não recebido" })
            }

            if (!nome || nome.trim() === '') {
                return res.status(400).json({ status: 'erro', titulo: 'O campo nome está vazio', mensagem: 'O nome é obrigatório' });
            }
            if (!email || email.trim() === '') {
                return res.status(400).json({ status: 'erro', titulo: 'O campo email está vazio', mensagem: 'O email é obrigatório' });
            }
            if (!senha || senha.trim() === '') {
                return res.status(400).json({ status: 'erro', titulo: 'O campo senha está vazio', mensagem: 'A senha é obrigatória' });
            }

            //validar formato
            if (nome.length < 2) {
                return res.status(400).json({ status: 'erro', titulo: 'Nome curto', mensagem: 'O nome deve ter pelo menos 2 caracteres' })
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ status: 'erro', titulo: 'Email inválido', mensagem: 'Formato de email inválido' });
            }
            if (senha.length < 6) {
                return res.status(400).json({ status: 'aviso', titulo: 'Senha curta', mensagem: 'A senha deve ter pelo menos 6 caracteres' });
            }

            //usuário já existe?
            const buscaEmail = await usuario.findOne({ email: email.trim().toLowerCase() });

            if (buscaEmail) {
                console.log('Usuário já existe no banco de dados');
                return res.status(409).json({ status: 'aviso', titulo: 'Email inválido', mensagem: 'Email já cadastrado' });
            }

            //hash da senha
            const saltRounds = 10;
            const senhaHash = await bcrypt.hash(senha.trim(), saltRounds);

            const novoUsuario = {
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                senha: senhaHash,
            }

            await usuario.create(novoUsuario);

            res.status(201).json({ status: 'sucesso', titulo: 'Cadastro concluído', mensagem: "Usuário criado com sucesso", usuario: { nome: novoUsuario.nome, email: novoUsuario.email } });
        }
        catch (erro) {
            res.status(500).json({ status: 'erro', titulo: 'Não foi possível criar usuário', mensagem: `${erro} - falha ao criar novo usuário` });
        }
    }

    static async verificarCredenciais(email, senha) {
        try {
            const usuarioEncontrado = await usuario.findOne({ email: email.toLowerCase() });

            if (!usuarioEncontrado) {
                throw new Error("O email está errado");
            }

            const senhaCorreta = await bcrypt.compare(senha.trim(), usuarioEncontrado.senha);

            if (senhaCorreta === false) {
                throw new Error("A senha está errada");
            }

            // Retornar usuário sem a senha
            const { senha: _, ...usuarioSemSenha } = usuarioEncontrado.toObject ? usuarioEncontrado.toObject() : usuarioEncontrado;
            return usuarioSemSenha;
        } catch (erro) {
            console.error('Erro ao fazer login:', erro);
            throw erro;
        }
    }

    static async Login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || email.trim() === '') {
                return res.status(400).json({ status: 'aviso', titulo: 'Insira o seu email', mensagem: 'O email é obrigatório' });
            }

            if (!senha || senha.trim() === '') {
                return res.status(400).json({ status: 'aviso', titulo: 'Insira a sua senha', mensagem: 'A senha é obrigatória' });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ status: 'aviso', titulo: 'Formato de email inválido', mensagem: 'Formato de email inválido' });
            }

            const usuarioLogin = await UsuarioController.verificarCredenciais(email.trim(), senha);

            if (!usuarioLogin) {
                return res.status(401).json({ status: 'erro', titulo: 'Erro no email ou senha', mensagem: 'Email ou senha incorretos' });
            }

            // Gerar token JWT
            const token = jwt.sign(
                {
                    id: usuarioLogin._id,
                    email: usuarioLogin.email,
                    tipo: usuarioLogin.tipo
                },
                JWT_CONFIG.secret,
                { expiresIn: JWT_CONFIG.expiresIn }
            );

            res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production' })
            res.status(200).json({
                status: 'sucesso',
                titulo: 'Login realizado com sucesso!',
                mensagem: 'Login realizado com sucesso!',
                dados: {
                    token,
                    usuario: {
                        id: usuarioLogin._id,
                        nome: usuarioLogin.nome,
                        email: usuarioLogin.email,
                        tipo: usuarioLogin.tipo
                    }
                }
            });
            console.log("usuario logado com sucesso")
        } catch (erro) {
            console.error('Erro ao fazer login:', erro);
            res.status(500).json({ status: 'erro', titulo: 'Erro no login', mensagem: `${erro.mensagem} - não foi possível processar o login` });
        }
    }

    static async verificarAutenticacao(req, res) {
        try {
            return res.status(200).json({
                status: 'sucesso',
                autenticado: true,
                usuario: {
                    id: req.usuario.id,
                    email: req.usuario.email,
                }
            });
        } catch (erro) {
            res.status(500).json({ status: 'erro', mensagem: 'Erro ao verificar autenticação' });
        }
    }
}

export default UsuarioController;
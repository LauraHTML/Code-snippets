import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conectaDatabase() {
    try {
        // Fail-fast: configurações de timeout agressivas
        const opcoes = {
            connectTimeoutMS: 5000,      // Falha rápido se não conectar em 5s
            socketTimeoutMS: 45000,      // Timeout para operações
            serverSelectionTimeoutMS: 5000, // Falha rápido na seleção de servidor
            retryWrites: true,           // Retry automático para writes
            maxPoolSize: 10,             // Tamanho da pool de conexão
            minPoolSize: 2,              // Manter mínimo de conexões
        };

        if (!process.env.DB_CONNECTION_STRING) {
            throw new Error("DB_CONNECTION_STRING não está definida nas variáveis de ambiente");
        }

        await mongoose.connect(process.env.DB_CONNECTION_STRING, opcoes);

        console.log("✓ Conectado ao MongoDB com sucesso");
        return mongoose.connection;
    } catch (erro) {
        console.error("✗ ERRO CRÍTICO de conexão com banco de dados:", erro.message);
        // Re-lançar o erro para que a aplicação falhe na inicialização
        throw erro;
    }
}

export default conectaDatabase;
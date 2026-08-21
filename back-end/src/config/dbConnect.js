import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conectaDatabase() {
    try {
        const opcoes = {
            connectTimeoutMS: 5000,      
            socketTimeoutMS: 45000,      
            serverSelectionTimeoutMS: 5000, 
            retryWrites: true,         
            maxPoolSize: 10,             
            minPoolSize: 2,             
        };

        if (!process.env.DB_CONNECTION_STRING) {
            throw new Error("DB_CONNECTION_STRING não está definida nas variáveis de ambiente");
        }

        await mongoose.connect(process.env.DB_CONNECTION_STRING, opcoes);

        console.log("Conectado ao MongoDB com sucesso");
        return mongoose.connection;
    } catch (erro) {
        console.error("Erro de conexão com banco de dados:", erro.message);
        throw erro;
    }
}

export default conectaDatabase;
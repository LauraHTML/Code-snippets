import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function conectaDatabase() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Banco conectado com sucesso!");
        return mongoose.connection;
    } catch (erro) {
        console.error("Erro de conexão ): :", erro);
    }
}

export default conectaDatabase;
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

export async function bancoMongoDb() {
    process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
    process.env.CLIENT_URL ??= "http://localhost:3000";

    if (!mongoServer) {
        mongoServer = await MongoMemoryServer.create();
        process.env.DB_CONNECTION_STRING = mongoServer.getUri();
    }

    if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            connectTimeoutMS: 10000,
            socketTimeoutMS: 20000,
            serverSelectionTimeoutMS: 10000,
        });
    }

    return { mongoServer };
}

export async function finalizarBancoMongoDb() {
    if (mongoServer) {
        await mongoServer.stop();
        mongoServer = null;
    }

    if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
    }
}

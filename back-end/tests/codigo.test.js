import { beforeAll, afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";

import Codigo from "../src/models/Codigo.js";
import { tags as TagsModel } from "../src/models/Tags.js";
import Usuario from "../src/models/Usuario.js";

let app;
let mongoServer;
let usuarioCriado;
let tagCriada;

describe("POST /codigos", () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = "test-secret";
        process.env.CLIENT_URL = "http://localhost:3000";

        mongoServer = await MongoMemoryServer.create();
        process.env.DB_CONNECTION_STRING = mongoServer.getUri();

        const { default: appModule } = await import("../src/app.js");
        app = appModule;
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await Promise.all([
            Codigo.deleteMany({}),
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Usuário Teste",
            email: "teste@email.com",
            senha: "123456"
        });

        tagCriada = await TagsModel.create({
            titulo: "JavaScript",
            cor: "#f1e05a",
            idUsuario: usuarioCriado._id
        });
    });

    it("cria um código quando os dados são válidos", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET);

        const response = await request(app)
            .post("/codigos")
            .set("Cookie", [`token=${token}`])
            .send({
                titulo: "Exemplo de integração",
                linguagem: "javascript",
                codigo: "const mensagem = 'teste';",
                tag: tagCriada._id.toString()
            });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe("sucesso");
        expect(response.body.codigo.titulo).toBe("Exemplo de integração");

        const codigoSalvo = await Codigo.findOne({ idUsuario: usuarioCriado._id });
        expect(codigoSalvo).not.toBeNull();
        expect(codigoSalvo?.titulo).toBe("Exemplo de integração");
    });
});

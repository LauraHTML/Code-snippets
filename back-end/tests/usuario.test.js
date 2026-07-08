import { beforeAll, afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoMemoryServer } from "mongodb-memory-server";

import Codigo from "../src/models/Codigo.js";
import { tags as TagsModel } from "../src/models/Tags.js";
import Usuario from "../src/models/Usuario.js";

let app;
let mongoServer;
let usuarioCriado;
let tagCriada;
let codigoCriado;

describe("POST /cadastro", () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = "test-secret";
        process.env.CLIENT_URL ??= "http://localhost:3000";

        mongoServer = await MongoMemoryServer.create();
        process.env.DB_CONNECTION_STRING = mongoServer.getUri();

        const { default: appModule } = await import("../src/app.js");
        app = appModule;
    });

    beforeEach(async () => {
        await Promise.all([
            Usuario.deleteMany({})
        ]);
    });

    it("Cria um novo usuário", async () => {
        const response = await request(app)
            .post("/cadastro")
            .send({
                nome: "Novo Usuário",
                email: "novo@email.com",
                senha: "123456"
            });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe("sucesso");
        expect(response.body.titulo).toBe("Cadastro concluído");
    });
});

describe("POST /login", () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = "test-secret";
        process.env.CLIENT_URL ??= "http://localhost:3000";

        mongoServer = await MongoMemoryServer.create();
        process.env.DB_CONNECTION_STRING = mongoServer.getUri();

        const { default: appModule } = await import("../src/app.js");
        app = appModule;
    });

    beforeEach(async () => {
        await Promise.all([
            Usuario.deleteMany({})
        ]);

        const senhaHash = await bcrypt.hash("senha123", 10);

        await Usuario.create({
            nome: "Usuário Login",
            email: "login@email.com",
            senha: senhaHash
        });
    });

    it("Fazer login do usuário criado", async () => {
        const response = await request(app)
            .post("/login")
            .send({
                email: "login@email.com",
                senha: "senha123"
            });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("sucesso");
        expect(response.body.titulo).toBe("Sucesso no login");
    });
});

describe("GET /usuario", () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = "test-secret";
        process.env.CLIENT_URL ??= "http://localhost:3000";

        mongoServer = await MongoMemoryServer.create();
        process.env.DB_CONNECTION_STRING = mongoServer.getUri();

        const { default: appModule } = await import("../src/app.js");
        app = appModule;
    });

    beforeEach(async () => {
        await Promise.all([
            Usuario.deleteMany({})
        ]);

        const senhaHash = await bcrypt.hash("senha123", 10);

        usuarioCriado = await Usuario.create({
            nome: "Usuário Teste",
            email: "teste@email.com",
            senha: senhaHash
        });

    });

    it("Busca um usuário específico", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET);

        const response = await request(app)
            .get(`/usuario`)
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("sucesso");
    });
});
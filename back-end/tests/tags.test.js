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
let codigoCriado;

describe("GET /tags", () => {
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
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Tags",
            email: "tags@email.com",
            senha: "123456"
        });

        tagCriada = await TagsModel.create({
            titulo: "JavaScript",
            cor: "#2f81f7",
            idUsuario: usuarioCriado._id
        });
    });

    it("Busca as tags criadas pelo usuário", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET);

        const response = await request(app)
            .get("/tags")
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });
});

describe("GET /tags", () => {
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
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Tags",
            email: "tags@email.com",
            senha: "123456"
        });

        tagCriada = await TagsModel.create({
            titulo: "JavaScript",
            cor: "#2f81f7",
            idUsuario: usuarioCriado._id
        });
    });

    it("Acesso negado para visualizar as tags", async () => {

        const response = await request(app)
            .get("/tags")
            .set("Cookie", [`token`]);

        expect(response.status).toBe(401);
        expect(response.body.status).toBe("erro");
        expect(response.body.titulo).toBe("Não autorizado");
    });
});

describe("POST /tags", () => {
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
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Tags",
            email: "tags@email.com",
            senha: "123456"
        });

        tagCriada = await TagsModel.create({
            titulo: "Nova tag",
            cor: "#d2991d",
            idUsuario: usuarioCriado._id
        });
    });

    it("Cria uma nova tag", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET);

        const response = await request(app)
            .post("/tags")
            .set("Cookie", [`token=${token}`])
            .send({ titulo: "Nova tag", cor: "#d2991d" });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe("sucesso");
        expect(response.body.tag).toMatchObject({ titulo: "Nova tag", cor: "#d2991d" });
    });
});

describe("POST /tags", () => {
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
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Tags",
            email: "tags@email.com",
            senha: "123456"
        });

        tagCriada = await TagsModel.create({
            titulo: "Nova tag",
            cor: "#d2991d",
            idUsuario: usuarioCriado._id
        });
    });

    it("Acesso negado para criar uma nova tag", async () => {

        const response = await request(app)
            .post("/tags")
            .set("Cookie", [`token`])
            .send({ titulo: "Nova tag", cor: "#d2991d" });

        expect(response.status).toBe(401);
        expect(response.body.status).toBe("erro");
        expect(response.body.titulo).toBe("Não autorizado");
    });
});


describe("PUT /tags", () => {
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
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Tags",
            email: "tags@email.com",
            senha: "123456"
        });

        tagCriada = await TagsModel.create({
            titulo: "laura",
            cor: "#2f81f7",
            idUsuario: usuarioCriado._id
        });
    })


    it("atualiza uma tag existente", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET);


        const response = await request(app)
            .put(`/tags/${tagCriada._id.toString()}`)
            .set("Cookie", [`token=${token}`])
            .send({
                titulo: "Teste",
                cor: "#2f81f7",
                idUsuario: usuarioCriado._id
            });

        const tagAtualizada = await TagsModel.findById(tagCriada._id);
        expect(tagAtualizada).not.toBeNull();
        expect(tagAtualizada?.titulo).toBe("Teste");
        expect(tagAtualizada?.cor).toBe("#2f81f7");
    });
});

describe("PUT /tags", () => {
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
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Tags",
            email: "tags@email.com",
            senha: "123456"
        });

        tagCriada = await TagsModel.create({
            titulo: "laura",
            cor: "#2f81f7",
            idUsuario: usuarioCriado._id
        });
    })


    it("Acesso negado para atualizar tag", async () => {
        const response = await request(app)
            .put(`/tags/${tagCriada._id.toString()}`)
            .set("Cookie", [`token`])
            .send({
                titulo: "Teste",
                cor: "#2f81f7",
                idUsuario: usuarioCriado._id
            });

        expect(response.status).toBe(401);
        expect(response.body.status).toBe("erro");
        expect(response.body.titulo).toBe("Não autorizado");
    });
});

describe("DELETE /tags", () => {
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
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Tags",
            email: "tags@email.com",
            senha: "123456"
        });

        const tagCriada = await TagsModel.create({
            titulo: "deletar",
            cor: "#f1e05a",
            idUsuario: usuarioCriado._id
        });

    });

    it("Deleta uma tag pelo id", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET);

        const response = await request(app)
            .delete(`/tags/${tagCriada._id.toString()}`)
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(false);
    });
});

describe("DELETE /tags", () => {
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
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Tags",
            email: "tags@email.com",
            senha: "123456"
        });

        const tagCriada = await TagsModel.create({
            titulo: "deletar",
            cor: "#f1e05a",
            idUsuario: usuarioCriado._id
        });

    });

    it("Acessso negado para deletar tag", async () => {

        const response = await request(app)
            .delete(`/tags/${tagCriada._id.toString()}`)
            .set("Cookie", [`token`]);

        expect(response.status).toBe(401);
        expect(response.body.status).toBe("erro");
        expect(response.body.titulo).toBe("Não autorizado");
    });
});
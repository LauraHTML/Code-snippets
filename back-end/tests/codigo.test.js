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

describe("GET /codigos", () => {
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
            Codigo.deleteMany({}),
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Usuário Teste",
            email: "teste@email.com",
            senha: "123456"
        });
    });

    it("Busca os códigos salvos pelo usuário", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET);

        tagCriada = await TagsModel.create({
            titulo: "JavaScript",
            cor: "#f1e05a",
            idUsuario: usuarioCriado._id
        });

        await Codigo.create({
            titulo: "Exemplo de código",
            linguagem: "javascript",
            codigo: "const mensagem = 'teste';",
            tags: tagCriada,
            idUsuario: usuarioCriado._id
        });

        const response = await request(app)
            .get("/codigos")
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].titulo).toBe("Exemplo de código");
    });
});

describe("GET /codigos", () => {
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
            Codigo.deleteMany({}),
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Usuário Teste",
            email: "teste@email.com",
            senha: "123456"
        });

        const tagCriada = await TagsModel.create({
            titulo: "c++",
            cor: "#f1e05a",
            idUsuario: usuarioCriado._id
        });

        codigoCriado = await Codigo.create({
            titulo: "Exemplo de busca",
            linguagem: "c++",
            codigo: "const mensagem = 'teste';",
            tags: tagCriada,
            idUsuario: usuarioCriado._id
        });
    });

    it("Busca um código específico pelo id", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET); 

        const response = await request(app)
            .get(`/codigos/${codigoCriado._id.toString()}`)
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(200);
        expect(response.body.titulo).toBe("Exemplo de busca");
    });
});

describe("POST /codigos", () => {
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


describe("PUT /codigos", () => {
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
            titulo: "laura",
            cor: "#f1e05a",
            idUsuario: usuarioCriado._id
        });

        codigoCriado = await Codigo.create({
            titulo: "codigo top",
            linguagem: "laura",
            codigo: "const mensagem = 'ola';",
            tag: tagCriada._id.toString(),
            idUsuario: usuarioCriado._id
        });
    })


    it("atualiza um código existente", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET);


        const response = await request(app)
            .put(`/codigos/${codigoCriado._id.toString()}`)
            .set("Cookie", [`token=${token}`])
            .send({
                titulo: "conexao com banco",
                linguagem: "javascript",
                codigo: "const conexao = true;",
                tag: tagCriada._id.toString()
            });

        const codigoAtualizado = await Codigo.findById(codigoCriado._id);
        expect(codigoAtualizado).not.toBeNull();
        expect(codigoAtualizado?.titulo).toBe("conexao com banco");
        expect(codigoAtualizado?.linguagem).toBe("javascript");
        expect(codigoAtualizado?.codigo).toBe("const conexao = true;");
    });
})

describe("DELETE /codigos", () => {
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
            Codigo.deleteMany({}),
            TagsModel.deleteMany({}),
            Usuario.deleteMany({})
        ]);

        usuarioCriado = await Usuario.create({
            nome: "Usuário Teste",
            email: "teste@email.com",
            senha: "123456"
        });

        const tagCriada = await TagsModel.create({
            titulo: "JavaScript",
            cor: "#f1e05a",
            idUsuario: usuarioCriado._id
        });

        codigoCriado = await Codigo.create({
            titulo: "Exemplo de integração",
            linguagem: "javascript",
            codigo: "const mensagem = 'teste';",
            tags: tagCriada,
            idUsuario: usuarioCriado._id
        });
    });

    it("Deleta um código pelo id", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET);

        const response = await request(app)
            .delete(`/codigos/${codigoCriado._id.toString()}`)
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(false);
    });
});
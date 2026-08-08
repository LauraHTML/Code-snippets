import { beforeAll, afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Usuario from "../src/models/Usuario.js";
import { bancoMongoDb, finalizarBancoMongoDb } from "./testSetup.js";

let app;
let usuarioCriado;

describe("POST /cadastro", () => {
    beforeAll(async () => {
        await bancoMongoDb();

        const { default: appModule } = await import("../src/app.js");
        app = appModule;
    });

    afterAll(async () => {
        await finalizarBancoMongoDb();
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
        await bancoMongoDb();

        const { default: appModule } = await import("../src/app.js");
        app = appModule;
    });

    afterAll(async () => {
        await finalizarBancoMongoDb();
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
        expect(response.body.titulo).toBe("Login realizado com sucesso!");

        const setCookieHeader = response.headers["set-cookie"];
        expect(setCookieHeader).toBeDefined();

        const tokenCookie = setCookieHeader.find((cookie) => cookie.startsWith("token=") && cookie.includes("eyJ"));
        expect(tokenCookie).toBeDefined();

        const token = tokenCookie.split(";")[0].split("=")[1];
        expect(token).toBeDefined();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        expect(decoded.id).toBeDefined();
    });
});

describe("GET /usuario", () => {
    beforeAll(async () => {
        await bancoMongoDb();

        const { default: appModule } = await import("../src/app.js");
        app = appModule;
    });

    afterAll(async () => {
        await finalizarBancoMongoDb();
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


describe("GET /logout", () => {
    beforeAll(async () => {
        await bancoMongoDb();

        const { default: appModule } = await import("../src/app.js");
        app = appModule;
    });

    afterAll(async () => {
        await finalizarBancoMongoDb();
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

    it("Fazer logout", async () => {
        const token = jwt.sign({ id: usuarioCriado._id.toString() }, process.env.JWT_SECRET);

        const response = await request(app)
            .post(`/logout`)
            .set("Cookie", [`token=${token}`]);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("sucesso");
    });
});
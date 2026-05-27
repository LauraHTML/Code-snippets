import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.API_GEMINI_KEY });
// const response = await ai.models.generateContent({
//     model: "gemini-3.5-flash",
//     contents: `Você é um assistente especializado em documentação. Escreva um arquivo README.md completo e em formato Markdown conforme a entrada do usuário: ${conteudo}. Retorne APENAS o código Markdown do README, sem nenhum texto introdutório ou conclusivo.`,
//   });

export async function POST(req: Request): Promise<Response> {
    try {
        const data = await req.json();
        const prompt = data.input || "Gerar uma estrutura de readme para um projeto mobile em Kotlin com Jetpack compose";

        const result = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: `Você é um assistente especializado em documentação. Escreva um arquivo README.md completo e em formato Markdown conforme a entrada do usuário: ${prompt}. Retorne APENAS o código Markdown do README, sem nenhum texto introdutório ou conclusivo, não desvie do que for descrito pelo usuário.`,
        });

        const text = result.text;
        console.log("resposta do gemini: ", text);
        return NextResponse.json({ readme: text });
    } catch (error: any) {
        console.error("Erro ao gerar README:", error);
        return NextResponse.json(
            { error: error.message || "Erro ao gerar README" },
            { status: 500 }
        );
    }
}
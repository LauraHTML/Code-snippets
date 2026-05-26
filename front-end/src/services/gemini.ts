import { GoogleGenAI } from "@google/genai";
import { marked } from "marked";

const ai = new GoogleGenAI({ apiKey: `AIzaSyD6EYBLgwvAPN-l-rg4TebM32I4cn4e9Nc` });

export async function gemini(conteudo: string){
    const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Você é um assistente especializado em documentação. Escreva um arquivo README.md completo e em formato Markdown conforme a seguinte entrada do usuário:${conteudo}. Retorne APENAS o código Markdown do README, sem nenhum texto introdutório ou conclusivo.`,
  });

  return response.text;
  }
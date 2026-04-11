"use client";
import { useState } from "react";

import Editor from '@monaco-editor/react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";

type Linguagem = 'javascript' | 'typescript' | 'python' | 'java' | 'csharp' | 'php';

interface CodeEditorProps {
    codeSnippets: Record<Linguagem, string>;
    onChange: (codigo: string, lang: Linguagem) => void;
    initialCode?: string;
    initialLang?: Linguagem;
}

export function CodeEditor({ codeSnippets, onChange, initialCode, initialLang }: CodeEditorProps) {
    const [linguagem, setLinguagem] = useState<Linguagem>(initialLang ?? "javascript");
    const [codigoUsuario, setCodigoUsuario] = useState<string>(initialCode ?? codeSnippets.javascript);

    const selecionado = (novaLinguagem: string) => {
        const lang = novaLinguagem as Linguagem;
        setLinguagem(lang);
        setCodigoUsuario(codeSnippets[lang]);
        onChange(codeSnippets[lang], lang);
    };

    return (
        <>
            <Select onValueChange={selecionado}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="linguagem" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="C#">C#</SelectItem>
                        <SelectItem value="php">PHP</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Editor height="300px" language={linguagem} theme="vs-dark" value={codigoUsuario}
                onChange={(value) => {
                    const novoCodigo = value || "";
                    setCodigoUsuario(novoCodigo);
                    onChange(novoCodigo, linguagem)
                }}
            />
        </>
    );
}

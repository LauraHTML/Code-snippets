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
    codInicial?: string;
    lingInicial?: Linguagem;
}

export function CodeEditor({ codeSnippets, onChange, codInicial, lingInicial }: CodeEditorProps) {
    const [linguagem, setLinguagem] = useState<Linguagem>(lingInicial ?? "javascript");
    const [codigoUsuario, setCodigoUsuario] = useState<string>(codInicial ?? codeSnippets.javascript);

    const selecionado = (novaLinguagem: string) => {
        const linguagemSelecionada = novaLinguagem as Linguagem;
        setLinguagem(linguagemSelecionada);
        setCodigoUsuario(codeSnippets[linguagemSelecionada]);
        onChange(codeSnippets[linguagemSelecionada], linguagemSelecionada);
    };

    return (
        <>
            <Select value={linguagem} onValueChange={selecionado}>
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

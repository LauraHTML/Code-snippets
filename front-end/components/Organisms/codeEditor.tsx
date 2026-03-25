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
} from "@/components/ui/select";

type Linguagem = 'javascript' | 'typescript' | 'python' | 'java' | 'csharp' | 'php';

interface CodeEditorProps {
    codeSnippets: Record<Linguagem, string>;
    onChange: (lang: Linguagem) => void;
}

export function CodeEditor({ codeSnippets, onChange }: CodeEditorProps) {
    const [linguagem, setLinguagem] = useState<Linguagem>("javascript");
    const [codigoUsuario, setCodigoUsuario] = useState<string>(codeSnippets.javascript);

    const selecionado = (novaLinguagem: string) => {
        const lang = novaLinguagem as Linguagem;
        setLinguagem(lang);
        setCodigoUsuario(codeSnippets[lang]);
        onChange(lang);
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
            <Editor height="300px" language={linguagem} theme="vs-dark" value={codigoUsuario} onChange={(value) => setCodigoUsuario(value || "")} />
        </>
    );
}

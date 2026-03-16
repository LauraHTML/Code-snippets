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

//  const code_snippets = {
//   javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
//   typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
//   python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
//   java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
//   csharp:
//     'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
//   php: "<?php\n\n$name = 'Alex';\necho $name;\n",
// };

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
                        <SelectItem value="csharp">C#</SelectItem>
                        <SelectItem value="php">PHP</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Editor height="300px" language={linguagem} theme="vs-dark" value={codigoUsuario} onChange={(value) => setCodigoUsuario(value || "")} />
        </>
    );
}

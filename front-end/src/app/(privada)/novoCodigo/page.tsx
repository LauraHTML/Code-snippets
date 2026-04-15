"use client";
import { useEffect, useState } from "react";

import { AppSidebar } from "@/src/components/app-sidebar";
import { Tags } from "@/src/types";

import { criarCodigo } from "@/src/services/codigosService"
import { criarTag } from "@/src/services/tagsServices";

import { SiteHeader } from "@/src/components/site-header";
import {
    SidebarInset,
    SidebarProvider,
} from "@/src/components/ui/sidebar";

//formulário
import { toast } from "sonner";
import { Form } from "@/src/components/ui/form";
import {
    FieldSet,
    Field,
    FieldLabel,
    FieldDescription,
    FieldError
} from "@/src/components/ui/field"
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

//criar tag
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import { CodeEditor } from "@/src/components/Organisms/codeEditor";

export default function NovoCodigo() {

    //linguagens
    const codeSnippets = {
        javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
        typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
        python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
        java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
        csharp:
            'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
        php: "<?php\n\n$name = 'Alex';\necho $name;\n",
    };

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [loading, setLoading] = useState(false)

    //codigos
    const [codigo, setCodigo] = useState<string>("");
    const [linguagem, setLinguagem] = useState("javascript")
    const [titulo, setTitulo] = useState<string>("");
    const [tag, setTag] = useState<string>("");

    //tags
    const [novaTag, setNovaTag] = useState<string>("")
    const [listaTags, setListaTags] = useState([])

    //cor
    type Cor = "azul" | "amarelo" | "verde" | "roxo";
    const [cor, setCor] = useState<Cor>('azul');

    const coresTag = {
        azul: "#2f81f7",
        amarelo: "#d2991d",
        verde: "#3fb950",
        roxo: "#a371f7"
    }

    async function handleCriarTag(e) {
        e.preventDefault()
        setErrors({})
    
        // Validação local
        const newErrors: any = {}
        if (!tag.trim()) newErrors.nome = "Dê um nome para a nova tag"
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors)
          return
        }
    
        setLoading(true)
        try {
          const response = await criarTag(tag, cor)
          toast.success(response.titulo, {
            position: "top-center", style: {
              '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
              '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
              '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
            } as React.CSSProperties
          })
          setTag("")
    
        } catch (erro: any) {
          toast.error(`Erro no cadastro: ${erro.titulo}`, {
            description: `${erro.mensagem}`, position: "top-center", style: erro.status === 'erro' ? {
              '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
              '--normal-text': 'var(--destructive)',
              '--normal-border': 'var(--destructive)'
            } as React.CSSProperties : {
              '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
              '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
              '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
            } as React.CSSProperties
          },)
        } finally {
          setLoading(false)
        }
      }


    return (<>
        <SidebarProvider
            style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)", } as React.CSSProperties}>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                            <div className="px-4 lg:px-5">

                                <FieldSet >
                                    <Field>
                                        <FieldLabel htmlFor="titulo">Título para o trecho de código</FieldLabel>
                                        <Input
                                            id="titulo"
                                            placeholder="Ex: Exercício de python"
                                            onChange={(e) => setTitulo(e.target.value)}
                                        />
                                        <FieldDescription>Dê um nome para o trecho de código.</FieldDescription>

                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="tags">Tags</FieldLabel>
                                        <Input className="w-1/2" type="text" id="tags" value={novaTag} onChange={(e) => setNovaTag(e.target.value)} placeholder="Ex: MySql" />
                                            <FieldLabel htmlFor="tags">Cor da tag</FieldLabel>
                                            <div className="grid grid-cols-4 grid-rows-flow w-1/2 bg-input border p-2 rounded-md ">                                               
                                                {Object.keys(coresTag).map((cor,index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => setCor(cor as Cor)}
                                                        className="w-full h-8 rounded border-2"
                                                        style={{
                                                            backgroundColor: coresTag[cor as Cor],
                                                            borderColor: cor === cor ? '#000' : '#ccc'
                                                        }}
                                                        title={cor}
                                                    />
                                                ))}
                                            </div>
                                        <Button onClick={handleCriarTag} type="button">Criar tag</Button>
                                    </Field>
                                    <Field>
                                        <Select onValueChange={(value) => setTag(value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Selecione uma tag" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value={'titulo'}>ouaua</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <FieldDescription>Use as tags para organizar seus códigos.</FieldDescription>

                                    </Field>
                                    <Field>
                                        <CodeEditor
                                            codeSnippets={codeSnippets}
                                            onChange={(novoCodigo: string, novaLinguagem: string) => {
                                                setCodigo(novoCodigo);
                                                setLinguagem(novaLinguagem);
                                            }}
                                        />
                                        <FieldError></FieldError>
                                    </Field>
                                    <Button type="submit" >Enviar</Button>
                                </FieldSet>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    </>)
}

//modal
"use client";
import { useEffect, useState } from "react";

import { Tags } from "@/app/page"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

//formulário
import { TCodigos } from "@/components/Molecules/colunas";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError
} from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//tabs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//criar tag
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Pencil,Trash } from "lucide-react"
import { CodeEditor } from "@/components/Organisms/codeEditor";

interface ModalAtualizar {
    codigoSelecionado: TCodigos
    atualizar: (dados: TCodigos) => void
}

export function ModalAtualizar({ codigoSelecionado, atualizar }: ModalAtualizar) {
    //codigos
    const [codigo, setCodigo] = useState<string>("");
    const [linguagem, setLinguagem] = useState("javascript")

    //tags
    const [novaTag, setNovaTag] = useState<string>("")
    const [listaTags, setListaTags] = useState<Tags>([])
    const [dadosFormulario, setDadosFormulario] = useState<Partial<TCodigos>>({});

    useEffect(() => {
        if (codigoSelecionado) setDadosFormulario(codigoSelecionado);
        else setDadosFormulario({});
    }, [codigoSelecionado]);

    const { register, reset, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            titulo: "", 
            tag: ""
        }
    });

    useEffect(() => {
        if (codigoSelecionado) {
            reset({
                titulo: codigoSelecionado.titulo,
                tag: typeof codigoSelecionado.tags === "string"
                    ? codigoSelecionado.tags
                    : codigoSelecionado.tags?.[0]?._id ?? ""
            });
            setCodigo(codigoSelecionado.codigo);
            setLinguagem(codigoSelecionado.linguagem);
        }
    }, [codigoSelecionado])

    //linguagens
    type Linguagem = 'javascript' | 'typescript' | 'python' | 'java' | 'csharp' | 'php';
    const codeSnippets = {
        javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
        typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
        python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
        java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
        csharp:
            'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
        php: "<?php\n\n$name = 'Alex';\necho $name;\n",
    };


    const CriarTags = async () => {
        try {
            const res = await fetch('http://localhost:8080/tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: novaTag,
                    cor: "#f4d812"
                })
            });
            if (res.ok) {
                toast.success("Tag criada com sucesso", {
                    position: "top-center", style: {
                        '--normal-bg':
                            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                        '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                        '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                    } as React.CSSProperties
                })

                const handleAdicionarTagLista = (novaTag: string) => {
                    setListaTags((prevLista) => [...prevLista, novaTag]);
                }
                handleAdicionarTagLista(res)
            } else {
                console.error("Erro ao criar tag", res)
            }
        } catch (erro) {
            toast.error("Erro ao criar tag", {
                position: "top-center", style: {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                } as React.CSSProperties
            })
        }

    };

    useEffect(() => {
        async function fetchTags() {
            try {
                const res = await fetch("http://localhost:8080/tags")

                if (!res.ok) {
                    throw new Error("Erro na resposta da API")
                }

                const tags: Tags[] = await res.json()
                setListaTags(tags)

            } catch (error) {
                console.error("Erro detalhado:", error)
            }

        }
        fetchTags()
    }, []);

    
    const enviar = handleSubmit((formData) => {
       const tagCompleta = listaTags.find(t => t._id === formData.tag);
    atualizar({
        ...codigoSelecionado,
        titulo: formData.titulo,
        tags: tagCompleta,
        codigo: codigo,           
        linguagem: linguagem,
    });
});


    return (<>
        <Dialog>
            <DialogTrigger className="px-4 py-2 hover:bg-accent inline-flex items-center justify-center gap-2 [&_svg:not([class*='size-'])]:size-4"><Pencil />Atualizar</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Atualizar código selecionado</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                    <Tabs defaultValue="info" className="w-full-[100%]">
                        <TabsList>
                            <TabsTrigger value="info">Info</TabsTrigger>
                            <TabsTrigger value="codigo">Código</TabsTrigger>
                        </TabsList>
                        <TabsContent value="info">
                            <Form>
                                <form >
                                    <Field className="py-2">
                                        <FieldLabel htmlFor="titulo">Título para o trecho de código</FieldLabel>
                                        <Input
                                            id="titulo"
                                            placeholder="Ex: Exercício de python"
                                            {...register("titulo", { required: "Título é obrigatório" })}
                                        />
                                        <FieldDescription>Dê um nome para o trecho de código.</FieldDescription>
                                        {errors.titulo && <FieldError>{errors.titulo.message}</FieldError>}
                                    </Field>
                                    <Field className="py-2">
                                        <FieldLabel htmlFor="tags">Tags</FieldLabel>
                                        <div className="flex flex-row gap-3">
                                            <Input type="text" id="tags" value={novaTag} onChange={(e) => setNovaTag(e.target.value)} placeholder="Ex: MySql" />
                                            <Button type="button" onClick={CriarTags}>Criar tag</Button>
                                        </div>

                                        <Controller
                                            name="tag"
                                            control={control}
                                            rules={{ required: "Selecione uma tag" }}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Selecione uma tag" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {listaTags && listaTags.length > 0 ? (
                                                                listaTags.map((item, index) => (
                                                                    <SelectItem key={index} value={item._id}>{item.titulo}</SelectItem>
                                                                ))) :
                                                                (<p>Crie uma tag</p>)}

                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )} />
                                        <FieldDescription>Use as tags para organizar seus códigos.</FieldDescription>
                                        {errors.tag && <FieldError>{errors.tag.message}</FieldError>}
                                    </Field>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="codigo">
                            <Form>
                                <form className="space-y-8 w-full py-10 bg-card p-4 rounded-md border">
                                    <Field>
                                        <CodeEditor
                                            codeSnippets={codeSnippets}
                                            initialCode={codigoSelecionado.codigo}       
                                            initialLang={codigoSelecionado.linguagem as Linguagem}  
                                            onChange={(novoCodigo, novaLinguagem) => {
                                                setCodigo(novoCodigo); 
                                                setLinguagem(novaLinguagem);
                                            }}
                                        />
                                        <FieldError></FieldError>
                                    </Field>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
                <Button onClick={enviar}>Atualizar</Button>
            </DialogContent>
        </Dialog>
    </>)
}
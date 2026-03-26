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
import { CodeEditor } from "@/components/Organisms/codeEditor";

interface ModalAtualizar {
  codigoSelecionado: TCodigos
  atualizar: (dados: TCodigos) => void
}

export function ModalAtualizar({ codigoSelecionado, atualizar }: ModalAtualizar) {
    const [dadosFormulario, setDadosFormulario] = useState<Partial<TCodigos>>({});

    useEffect(() => {
    if (codigoSelecionado) setDadosFormulario(codigoSelecionado);
    else setDadosFormulario({}); // limpa o form para criação
  }, [codigoSelecionado]);

    const { register, reset, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: { titulo: "",tag: ""
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
    const codeSnippets = {
        Javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
        Typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
        Python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
        Java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
        Csharp:
            'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
        php: "<?php\n\n$name = 'Alex';\necho $name;\n",
    };

    //codigos
    const [codigo, setCodigo] = useState<string>("");
    const [linguagem, setLinguagem] = useState("javascript")

    //tags
    const [novaTag, setNovaTag] = useState<string>("")
    const [listaTags, setListaTags] = useState<Tags>([])

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

    const criarCodigo = async (data: any) => {

        // se tag foi selecionada
        if (!data.tag) {
            toast.warning("Selecione uma tag", {
                position: "top-center",
                style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
                } as React.CSSProperties
            });
            return;
        }

        if (!linguagem.trim()) {
            toast.warning("Adicione uma linguagem", {
                position: "top-center", style: {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                } as React.CSSProperties
            });
            return;
        }

        // se código estiver vazio
        if (!codigo.trim()) {
            toast.warning("Adicione um código", {
                position: "top-center", style: {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                } as React.CSSProperties
            });
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/codigos/${data._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: data.titulo,
                    codigo: codigo,
                    linguagem: linguagem,
                    tags: data.tag
                })
            });

            if (res.ok) {
                toast.success("Código atualizado com sucesso!", {
                    position: "top-center", style: {
                        '--normal-bg':
                            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                        '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                        '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                    } as React.CSSProperties
                })
                console.log("Código atualizado com sucesso!")
            }
            else {
                const erro = await res.json()
                toast.error("Erro ao criar código", {
                    position: "top-center", style: {
                        '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                        '--normal-text': 'var(--destructive)',
                        '--normal-border': 'var(--destructive)'
                    } as React.CSSProperties
                });
                console.error("Erro do servidor:", res.status, erro)
            }
        }
        catch (erro) {
            toast.error("Erro ao criar código", {
                position: "top-center",
                style: {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
                } as React.CSSProperties
            });
            console.error('Erro ao criar novo código', erro)
        }
    }

    return (<>
        <Dialog>
            <DialogTrigger>Atualizar</DialogTrigger>
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
                                    )}/>
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
                                    onChange={(lang) => {
                                        setLinguagem(lang);
                                        setCodigo(codeSnippets[lang]);
                                    }}
                                />
                                <FieldError></FieldError>
                            </Field>
                        </form>
                    </Form>
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
                <Button onClick={() => atualizar(dadosFormulario as TCodigos)}>Atualizar</Button>
            </DialogContent>
        </Dialog>
    </>)
}
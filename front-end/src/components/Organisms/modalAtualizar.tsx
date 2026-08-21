"use client";
import { useEffect, useState } from "react";
import { atualizarCodigo } from "@/src/services/codigosService";

import { Tags } from "@/src/app/(privada)/codigos/page";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog"

import { TCodigos } from "@/src/components/Molecules/colunas";
import { toast } from "sonner";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError
} from "@/src/components/ui/field"
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import { SquarePen } from "lucide-react";
import { CodeEditor } from "@/src/components/Organisms/codeEditor";
import { criarTag, listarTags } from "@/src/services/tagsServices";

interface ModalAtualizar {
    codigoSelecionado: TCodigos
    atualizar: (dados: TCodigos) => void
}

export function ModalAtualizar({ codigoSelecionado, atualizar }: ModalAtualizar) {
    const [codigo, setCodigo] = useState<string>("");
    const [linguagem, setLinguagem] = useState("javascript");
    const [titulo, setTitulo] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const [listaTags, setListaTags] = useState<Tags[]>([])
    const [tagIdSelecionada, setTagIdSelecionada] = useState<string>("")

    const fetchTags = async () => {
        try {
            const tags = await listarTags();
            setListaTags(tags);

        } catch (erro) {
            console.error("Erro ao carregar tags:", erro);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    useEffect(() => {
        if (codigoSelecionado && listaTags.length > 0) {
            const tagId = typeof codigoSelecionado.tags === "string"
                ? codigoSelecionado.tags
                : Array.isArray(codigoSelecionado.tags)
                    ? codigoSelecionado.tags[0]?._id ?? ""
                    : codigoSelecionado.tags?._id ?? "";

            const tagExiste = listaTags.some(t => t._id === tagId);
            if (tagExiste) {
                setTagIdSelecionada(tagId);
            }
        }
    }, [codigoSelecionado, listaTags]);

    useEffect(() => {
        if (codigoSelecionado) {
            setTitulo(codigoSelecionado.titulo);
            setCodigo(codigoSelecionado.codigo);
            setLinguagem(codigoSelecionado.linguagem);
        }
    }, [codigoSelecionado])

    type Linguagem = 'javascript' | 'typescript' | 'python' | 'java' | 'csharp' | 'php';
    const codeSnippets = {
        javascript: '',
        typescript: '',
        python: '',
        java: '',
        csharp: '',
        php: '',
    };

    async function handleAtualizar(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (!tagIdSelecionada.trim()) toast.error(`Selecione uma tag`, {
            description: `Selecione uma tag para vincular ao seu código atual`, position: "top-center", style: {
                '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                '--normal-text': 'var(--destructive)',
                '--normal-border': 'var(--destructive)'
            } as React.CSSProperties
        });

        if (!linguagem) toast.error(`Selecione uma linguagem`, {
            description: `Selecione uma linguagem para vincular ao seu código atual`, position: "top-center", style: {
                '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                '--normal-text': 'var(--destructive)',
                '--normal-border': 'var(--destructive)'
            } as React.CSSProperties
        });
        setLoading(true);

        try {
            const res = await atualizarCodigo(
                codigoSelecionado._id,
                titulo,
                linguagem,
                codigo,
                tagIdSelecionada);

            toast.success(res.titulo, {
                description: `${res.mensagem}`,
                position: "top-center", style: {
                    '--normal-bg':
                        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            });

            const dadosAtualizados: TCodigos = {
                _id: codigoSelecionado._id,
                titulo: titulo.trim() || codigoSelecionado.titulo,
                linguagem,
                codigo,
                tags: tagIdSelecionada,
                dataCriacao: codigoSelecionado.dataCriacao,
            };
            atualizar(dadosAtualizados);
        }
        catch (erro: any) {
            toast.error(`Erro ao criar código: ${erro.titulo}`, {
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
            },);
        }
        finally {
            setLoading(false);
        }
    };

    return (<>
        <Dialog>
            <DialogTrigger className="text-sm whitespace-nowrap px-4 py-2 hover:bg-accent flex items-center justify-start gap-2 [&_svg:not([class*='size-'])]:size-4"><SquarePen />Atualizar</DialogTrigger>
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
                            <Field className="py-2">
                                <FieldLabel htmlFor="titulo">Título para o trecho de código</FieldLabel>
                                <Input
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    id="titulo"
                                    placeholder={codigoSelecionado.titulo}
                                />
                                <FieldDescription>Dê um nome para o trecho de código.</FieldDescription>

                            </Field>

                            <Select value={tagIdSelecionada} onValueChange={(value: string) => setTagIdSelecionada(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione uma tag" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {listaTags.length === 0 && <p>Crie uma tag</p>}

                                        {listaTags.map((tag) => (
                                            <SelectItem key={tag._id} value={tag._id}>
                                                {tag.titulo}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>


                        </TabsContent>
                        <TabsContent value="codigo">
                            <form className="space-y-8 w-full py-10 bg-card p-4 rounded-md border">
                                <Field>
                                    <CodeEditor
                                        codeSnippets={codeSnippets}
                                        codInicial={codigoSelecionado.codigo}
                                        lingInicial={codigoSelecionado.linguagem as Linguagem}
                                        onChange={(novoCodigo, novaLinguagem) => {
                                            setCodigo(novoCodigo);
                                            setLinguagem(novaLinguagem);
                                        }}
                                    />
                                    <FieldError></FieldError>
                                </Field>
                            </form>
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
                <Button onClick={handleAtualizar}>Atualizar</Button>
            </DialogContent>
        </Dialog>
    </>)
}
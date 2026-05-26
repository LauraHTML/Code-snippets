"use client";
import { useRef, useState } from "react";

import { Button } from "@/src/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";
import {
    IconChevronDown,
    IconCloud,
    IconCode,
    IconDeviceLaptop,
    IconHistory,
    IconPaperclip,
    IconPlus,
    IconSend,
    IconWorld,
    IconSparkles2,
} from "@tabler/icons-react";

type Input = {
    // modelo: string,
    conteudo?: string,
    enviar: () => void,
}

export default function PromptForm({ conteudo: conteudoInicial = "", enviar}: Input) {
    const [conteudo, setConteudo] = useState(conteudoInicial);
    const [selectedModel, setSelectedModel] = useState("Modelo");
    const [autoMode, setAutoMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (conteudo.trim()) {
        }
        setConteudo("");
    };

    return (
        <div className="w-4xl">
            <div className="bg-background border border-border rounded-2xl overflow-hidden">

                <div className="px-3 pt-3 pb-2 grow">
                    <form onSubmit={handleSubmit}>
                        <Textarea
                            value={conteudo}
                            onChange={(e) => setConteudo(e.target.value)}
                            placeholder="Descreva o seu projeto para gerar o readme"
                            className="w-full bg-transparent! p-0 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground resize-none border-none outline-none text-sm min-h-10 max-h-[40vh]"
                            rows={1}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = "auto";
                                target.style.height = target.scrollHeight + "px";
                            }}
                        />
                    </form>
                </div>

                <div className="mb-2 px-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 rounded-full border border-border hover:bg-accent"
                                >
                                    <IconPlus className="size-3" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="start"
                                className="max-w-xs rounded-2xl p-1.5"
                            >
                                <DropdownMenuGroup className="space-y-1">
                                    <DropdownMenuItem
                                        className="rounded-[calc(1rem-6px)]"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <IconPaperclip size={16} className="opacity-60" />
                                        Attach Files
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="rounded-[calc(1rem-6px)]"
                                        onClick={() => { }}
                                    >
                                        <IconCode size={16} className="opacity-60" />
                                        Code Interpreter
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="rounded-[calc(1rem-6px)]"
                                        onClick={() => { }}
                                    >
                                        <IconWorld size={16} className="opacity-60" />
                                        Web Search
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="rounded-[calc(1rem-6px)]"
                                        onClick={() => { }}
                                    >
                                        <IconHistory size={16} className="opacity-60" />
                                        Chat History
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>

                    <div>
                        <Button
                            type="submit"
                            disabled={!conteudo.trim()}
                            className="size-7 p-0 rounded-full bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={enviar}
                        >
                            <IconSend className="size-3 fill-primary" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-0 pt-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 rounded-full border border-transparent hover:bg-accent text-muted-foreground"
                        >
                            <IconSparkles2 className="size-5" />
                            <span>{selectedModel}</span>
                            <IconChevronDown className="size-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="max-w-xs rounded-2xl p-1.5 bg-popover border-border"
                    >
                        <DropdownMenuGroup className="space-y-1">
                            <DropdownMenuItem
                                className="rounded-[calc(1rem-6px)]"
                                onClick={() => setSelectedModel("gemini-3-flash-preview")}
                            >
                                <IconSparkles2 size={20} className="opacity-60" />
                                Gemini 3 Flash
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="rounded-[calc(1rem-6px)]"
                                onClick={() => setSelectedModel("gemini-3.5-flash-preview")}
                            >
                                <IconSparkles2 size={20} className="opacity-60" />
                                Gemini 3.5 Flash
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex-1" />
            </div>
        </div>
    );
}

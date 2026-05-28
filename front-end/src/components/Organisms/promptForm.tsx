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
    enviar: (conteudo: string) => void,
}

export default function PromptForm({ enviar }: Input) {
    const [conteudo, setConteudo] = useState("");
    const [selectedModel, setSelectedModel] = useState("Modelo");
    const [autoMode, setAutoMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (conteudo.trim()) {
            
            enviar(conteudo);
            setConteudo("");
        }
    };

    return (
        <div className="w-4xl">
            <div className="bg-background border border-border rounded-2xl overflow-hidden">

                <div className="px-3 pt-3 pb-2 grow">
                    <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-4">
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
                        <Button
                            type="submit"
                            disabled={!conteudo.trim()}
                            className=" p-0 rounded-full bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <p>Enviar</p>
                            <IconSend className="size-3 fill-primary" />
                        </Button>
                    </form>
                </div>

                
            </div>

            <div className="flex items-center gap-0 pt-2">
                

                <div className="flex-1" />
            </div>
        </div>
    );
}

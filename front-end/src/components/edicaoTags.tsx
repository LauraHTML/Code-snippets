"use client";

import { useState } from "react";
import { X, Plus, Tag as TagIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Tags } from "@/src/types";

export type Tag = {
    id: string;
    name: string;
    snippetCount?: number;
};

interface EdicaoTags {
    initialTags: Tag[];
    onTagsChange?: (tags: Tag[]) => void;
}

export function TagManager({ initialTags, onTagsChange }: EdicaoTags) {
    const [tags, setTags] = useState<Tag[]>(initialTags);
    const [inputValue, setInputValue] = useState("");

    const handleAddTag = (e?: React.KeyboardEvent | React.MouseEvent) => {
        if (e && 'key' in e && e.key !== "Enter") return;
        if (!inputValue.trim()) return;

        if (tags.some((tag) => tag.name.toLowerCase() === inputValue.toLowerCase())) {
            setInputValue("");
            return;
        }

        const newTag: Tag = {
            id: crypto.randomUUID(), // Geração temporária de ID
            name: inputValue.trim(),
        };

        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setInputValue("");
        onTagsChange?.(updatedTags);
    };

    const handleRemoveTag = (idToRemove: string) => {
        const updatedTags = tags.filter((tag) => tag.id !== idToRemove);
        setTags(updatedTags);
        onTagsChange?.(updatedTags);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Input para adicionar nova tag */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Adicionar nova tag (pressione Enter)"
                        className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>
                <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Criar
                </button>
            </div>

            {/* Lista de tags em formato de Chips/Badges */}
            <div className="flex flex-wrap gap-2 p-4 min-h-[100px] bg-zinc-900/50 border border-zinc-800 rounded-lg">
                {tags.length === 0 ? (
                    <p className="text-sm text-zinc-500 w-full text-center my-auto">
                        Nenhuma tag criada ainda.
                    </p>
                ) : (
                    tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 text-zinc-200 text-sm rounded-full border border-zinc-700 group transition-colors hover:bg-zinc-700"
                        >
                            {tag.name}
                            <button
                                onClick={() => handleRemoveTag(tag.id)}
                                className="ml-1 p-0.5 rounded-full hover:bg-zinc-600 hover:text-red-400 transition-colors focus:outline-none"
                                aria-label={`Remover tag ${tag.name}`}
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))
                )}
            </div>
        </div>

    );
}
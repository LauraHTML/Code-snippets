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
} from "@/components/ui/select"

export function ModalNovoCodigo() {
    const [linguagem, setLinguagem] = useState("javascript")

    console.log(linguagem)
    return (
        <>
            <Select onValueChange={(value) => setLinguagem(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="linguagem" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="php">PHP</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Editor height="300px" defaultLanguage={linguagem} theme="vs-dark" />
        </>
    )
}

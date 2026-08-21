"use client";
import { Badge } from "@/src/components/ui/badge"

interface LinguagensProps {
    linguagem: string;
}

export function LinguagensBadge({ linguagem}:LinguagensProps) {

    return (
        <>
            <Badge>{linguagem}</Badge>
        </>
    )
}
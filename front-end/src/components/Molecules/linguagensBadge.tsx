"use client";
import * as React from "react"
import { useEffect, useState } from "react";
import { useIsMobile } from "@/src/hooks/use-mobile"

import { BadgeTag } from "@/src/components/section-cards"
import { ControlePaginacao } from "@/src/components/Molecules/paginacao"
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
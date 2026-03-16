"use client";
import * as React from "react"
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile"

import { BadgeTag } from "@/components/section-cards"
import { ControlePaginacao } from "@/components/Molecules/paginacao"
import { Badge } from "@/components/ui/badge"

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
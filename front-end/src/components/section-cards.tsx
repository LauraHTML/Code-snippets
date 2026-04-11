import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Tag, Folder } from "lucide-react";

import { Badge } from "@/src/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

interface TagsProps {
  TituloTag: string;
  corBadge: string;
}

export function BadgeTag({ TituloTag, corBadge}:TagsProps) {
  return (

      <Badge style={{backgroundColor:corBadge}} className="text-background">{TituloTag}</Badge>

  )
}

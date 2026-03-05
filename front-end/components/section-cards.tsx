import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Tag, Folder } from "lucide-react";

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({ TituloTag }: { TituloTag?: string }) {
  return (

      <Card className="/card">
        <CardHeader>
          <CardDescription> </CardDescription>
            <Tag className="size-8" />
          <CardAction>
            
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
               {TituloTag}
            </CardTitle>
          </div>
        </CardFooter>
      </Card>

  )
}

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

export function SectionCards({ TituloTag = "tituloTag" }: { TituloTag?: string }) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4"> 
      <Card className="@container/card">
        <CardHeader>
          <CardDescription> </CardDescription>
            <Tag className="size-8" />
          <CardAction>
            <Badge variant="outline">
              <Folder />
              5 tags
            </Badge>
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
      <Card className="@container/card">
        <CardHeader>
          <CardDescription> </CardDescription>
            <Tag className="size-8" />
          <CardAction>
            <Badge variant="outline">
              <Folder />
              7 tags
            </Badge>
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
      <Card className="@container/card">
        <CardHeader>
          <CardDescription> </CardDescription>
            <Tag className="size-8" />
          <CardAction>
            <Badge variant="outline">
              <Folder />
              3 tags
            </Badge>
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
      <Card className="@container/card">
        <CardHeader>
          <CardDescription> </CardDescription>
            <Tag className="size-8" />
          <CardAction>
            <Badge variant="outline">
              <Folder />
              1 tag
            </Badge>
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
    </div>
  )
}

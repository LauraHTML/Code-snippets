import { AppSidebar } from "@/components/app-sidebar";

import { SiteHeader } from "@/components/site-header";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { BarraPesquisa } from "@/components/Organisms/barraPesquisa"

export default function Linguagens() {

    return (<>
        <SidebarProvider
            style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)", } as React.CSSProperties}>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <main className="flex flex-1 flex-col py-3 gap-4 px-4 lg:px-5">                  
                    <BarraPesquisa />

                    <section className="flex flex-col">
                        <div className="bg-card w-fit px-3 pt-3 rounded-top-md">
                            <Button>JavaScript V</Button>
                        </div>
                        <div className="bg-card p-4 rounded-md grid grid-cols-2 gap-3">
                            <div className="bg-background h-90 rounded-md"></div>
                            <div className="bg-background h-90 rounded-md"></div>
                        </div>
                    </section>
                    <section className="flex flex-col gap-3">
                        <div>
                            <Button>Python V</Button>
                        </div>
                        <div className="bg-card p-4 rounded-md grid grid-cols-2 gap-3">
                            <div className="bg-background h-90 rounded-md"></div>
                            <div className="bg-background h-90 rounded-md"></div>
                        </div>
                    </section>             
                </main>
            </SidebarInset>
        </SidebarProvider>
    </>)
}

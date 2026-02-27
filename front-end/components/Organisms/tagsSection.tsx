import { SectionCards } from "@/components/section-cards"

export function TagsSection() {
    return(
        <>
        <div className="py-3 px-4">
            <div className="flex flex-col gap-3 bg-card p-4 rounded-xl">
               <h1 className="text-xl">Tags</h1>
                <SectionCards /> 
            </div>
        </div>
        </>
    )
}
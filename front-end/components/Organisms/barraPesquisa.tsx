//ui
import { Input } from "../ui/input"
import { Button } from "../ui/button"


export function BarraPesquisa(){
    return(<>
    <div className="bg-card flex space-x-3 rounded-lg p-3 shadow-lg">
        <Input />
        <Button variant={"secondary"}>Pesquisar</Button>
    </div>
    </>)
}
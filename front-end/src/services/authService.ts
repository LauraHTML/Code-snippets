export async function verificarAutenticacao() {
    try {
        const res = await fetch("http://localhost:8080/usuario", {
            method: "GET",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(res.ok){
            const data = await res.json();
            return data
        }
    } catch (erro) {
        console.error("Erro ao verificar autenticação:", erro);
        return false;
    }
}

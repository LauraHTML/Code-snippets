
export async function verificarAutenticacao() {
    try {
        const res = await fetch("http://localhost:8080/codigos", {
            method: "GET",
            credentials: "include", // envia cookies automaticamente
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.status === 401) {
            return false; 
        }

        return res.ok; // autenticado
    } catch (erro) {
        console.error("Erro ao verificar autenticação:", erro);
        return false;
    }
}

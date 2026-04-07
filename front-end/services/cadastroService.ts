
export async function cadastro(email: string, senha: string, nome:string) {
    try {
        const res = await fetch("http://localhost:8080/cadastro", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, senha, nome }),
        })

        if (!res.ok) {
            console.error(res)
            throw new Error(`HTTP error ${res.status}`);
        }
8
        return await res.json()
    }
    catch(erro){
        throw new Error(`${erro} - falha ao criar novo usuário`);
    }
 
}
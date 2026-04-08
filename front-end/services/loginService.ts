export async function login(email: string, senha: string) {
    try {
        const res = await fetch("http://localhost:8080/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, senha }),
        })

        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
        }

        return await res.json()
    }
    catch(erro){
        throw new Error(`${erro} - falha ao logar novo usuário`);
    }
 
}
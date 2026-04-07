import { auth0 } from "@/lib/auth0";

export async function login(email: string, senha: string, nome:string) {
    try {
        const token = await auth0.getAccessToken();
        const res = await fetch("http://localhost:8080/login", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({ email, senha, nome }),
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
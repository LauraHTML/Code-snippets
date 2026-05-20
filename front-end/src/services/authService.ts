export async function verificarAutenticacao() {
    try {
        const res = await fetch("http://localhost:8080/usuario", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status === 401) return false;
        if (!res.ok) return false;

        const data = await res.json();
        return data?.autenticado === true;
    } catch (erro) {
        console.error("Erro ao verificar autenticação:", erro);
        return false;
    }
}


export async function logout() {
    try {
        const res = await fetch("http://localhost:8080/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            return true;
        }
        return false;
    } catch (erro) {
        console.error("Erro ao fazer logout:", erro);
        return false;
    }
}

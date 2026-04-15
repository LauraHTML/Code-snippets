
export async function listarTags() {
    try {
        const res = await fetch("http://localhost:8080/tags", {
            method: "GET",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json"
            }
        });

        const tags = await res.json();

        if (tags.status === 'erro') {
            throw {
                titulo: tags.titulo || 'Erro ao listar',
                mensagem: tags.mensagem || 'Falha ao buscar tags',
                status: tags.status
            };
        }

        if (!res.ok) {
            throw new Error(`Erro HTTP ${res.status}`);
        }

        return tags;
    } catch (erro: any) {
        throw {
            titulo: erro.titulo || 'Erro ao listar tags',
            mensagem: erro.mensagem || erro.message || 'Falha ao buscar tags',
            status: erro.status || 'erro'
        };
    }
}


export async function criarTag(titulo: string, cor: string) {
    try {
        const res = await fetch("http://localhost:8080/tags", {
            method: "POST",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ titulo, cor })
        });

        const dados = await res.json();

        if (dados.status === 'erro') {
            throw {
                titulo: dados.titulo || 'Erro ao criar',
                mensagem: dados.mensagem || 'Falha ao criar tag',
                status: dados.status
            };
        }

        return dados;
    } catch (erro: any) {
        throw {
            titulo: erro.titulo || 'Erro ao criar',
            mensagem: erro.mensagem || erro.message || 'Falha ao criar tag',
            status: erro.status || 'erro'
        };
    }
}

export async function atualizarTag(id: string, titulo: string, cor: string) {
    try {
        const res = await fetch(`http://localhost:8080/tags/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ titulo, cor })
        });

        const dados = await res.json();

        if (dados.status === 'erro') {
            throw {
                titulo: dados.titulo || 'Erro ao atualizar',
                mensagem: dados.mensagem || 'Falha ao atualizar código',
                status: dados.status
            };
        }

        return dados;
    } catch (erro: any) {
        throw {
            titulo: erro.titulo || 'Erro ao atualizar',
            mensagem: erro.mensagem || erro.message || 'Falha ao atualizar tag',
            status: erro.status || 'erro'
        };
    }
}

export async function deletarTag(id: string) {
    try {
        const res = await fetch(`http://localhost:8080/tags/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const dados = await res.json();

        if (dados.status === 'erro') {
            throw {
                titulo: dados.titulo || 'Erro ao deletar',
                mensagem: dados.mensagem || 'Falha ao deletar tag',
                status: dados.status
            };
        }

        return dados;
    } catch (erro: any) {
        throw {
            titulo: erro.titulo || 'Erro ao deletar',
            mensagem: erro.mensagem || erro.message || 'Falha ao deletar tag',
            status: erro.status || 'erro'
        };
    }
}

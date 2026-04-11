
export async function listarCodigos() {
    try {
        const res = await fetch("http://localhost:8080/codigos", {
            method: "GET",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json"
            }
        });

        const codigos = await res.json();

        if (codigos.status === 'erro') {
            throw {
                titulo: codigos.titulo || 'Erro ao listar',
                mensagem: codigos.mensagem || 'Falha ao buscar códigos',
                status: codigos.status
            };
        }

        if (!res.ok) {
            throw new Error(`Erro HTTP ${res.status}`);
        }

        return codigos;
    } catch (erro: any) {
        throw {
            titulo: erro.titulo || 'Erro ao listar códigos',
            mensagem: erro.mensagem || erro.message || 'Falha ao buscar códigos',
            status: erro.status || 'erro'
        };
    }
}


export async function criarCodigo(titulo: string, linguagem: string, codigo: string, tag: string) {
    try {
        const res = await fetch("http://localhost:8080/codigos", {
            method: "POST",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ titulo, linguagem, codigo })
        });

        const dados = await res.json();

        if (dados.status === 'erro') {
            throw {
                titulo: dados.titulo || 'Erro ao criar',
                mensagem: dados.mensagem || 'Falha ao criar código',
                status: dados.status
            };
        }

        return dados;
    } catch (erro: any) {
        throw {
            titulo: erro.titulo || 'Erro ao criar código',
            mensagem: erro.mensagem || erro.message || 'Falha ao criar código',
            status: erro.status || 'erro'
        };
    }
}

export async function atualizarCodigo(id: string, titulo: string, descricao: string, linguagem: string, codigo: string) {
    try {
        const res = await fetch(`http://localhost:8080/codigos/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ titulo, descricao, linguagem, codigo })
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
            titulo: erro.titulo || 'Erro ao atualizar código',
            mensagem: erro.mensagem || erro.message || 'Falha ao atualizar código',
            status: erro.status || 'erro'
        };
    }
}

export async function deletarCodigo(id: string) {
    try {
        const res = await fetch(`http://localhost:8080/codigos/${id}`, {
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
                mensagem: dados.mensagem || 'Falha ao deletar código',
                status: dados.status
            };
        }

        return dados;
    } catch (erro: any) {
        throw {
            titulo: erro.titulo || 'Erro ao deletar código',
            mensagem: erro.mensagem || erro.message || 'Falha ao deletar código',
            status: erro.status || 'erro'
        };
    }
}

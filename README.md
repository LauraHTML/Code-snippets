# Snippet Vault

Um aplicativo web completo para armazenar e gerenciar trechos de código.
Este projeto permite que os desenvolvedores salvem trechos de código úteis, os organizem por linguagem e tags e os pesquisem rapidamente.

## ✨ Features

* Salve trechos de código (em breve)
* Organize trechos por linguagem de programação (em breve)
* Adicione tags personalizadas (em breve)
* Marque trechos como favoritos (em breve)
* Visualize todos os trechos salvos em uma interface limpa
* Exibição de código com destaque de sintaxe (em breve)
* Operações CRUD completas (em breve)

## 🛠 Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* TailwindCSS

### Backend

* Node.js
* Express

### Database

* MongoDB

## 📂 Estrutura do projeto

```
snippet-vault
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── app.js
│   └── server.js
│
├── frontend
│   ├── app
│   ├── components
│   └── services
│
└── README.md
```

## 🚀 Iniciar projeto

### 1. Clone o repositório

```
git clone https://github.com/your-username/snippet-vault.git
```

### 2. Instalar dependências

Back-end:

```
cd backend
npm install
```

Frontend:

```
cd frontend
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` no back-end.

Example:

```
PORT=8080
MONGO_URI=your_database_connection
```

### 4. Inicie o back-end

```
npm run dev
```

A API vai estar rodando em:

```
http://localhost:8080
```

### 5. Inicie o front-end

```
npm run dev
```

A aplicação vai estar em:

```
http://localhost:3000
```

## 📡 API Endpoints

| Método | Endpoint     | Descrição               |
| ------ | ------------ | ----------------------- |
| GET    | /codigos     | Pegar todos os snippets |
| POST   | /codigos     | Criar um novo snippet   |
| PATCH  | /codigos/:id | Atualizar um snippet    |
| DELETE | /codigos/:id | Deletar um snippet      |

## 📘 Exemplo de um snippet

```json
{
  "_id": "123",
  "title": "Mapear array",
  "language": "JavaScript",
  "code": "const numeros = [1,2,3];",
  "tags": ["array", "javascript"],
  "isFavorite": false,
  "createdAt": "2026-03-09"
}
```

## 🎯 Objetivo do projeto

Este projeto foi criado como um projeto de portfólio para praticar:

* Desenvolvimento full-stack
* Design de API REST
* Comunicação front-end–back-end
* TypeScript em uma aplicação real
* Modelagem de banco de dados

## 🔮 Melhores futuras da aplicação

* Autenticação de usuário
* Pesquisa por tags
* Gerador de README
* copiar e colar código

## 👩‍💻 Autor

Laura Sampaio

Se você gostou deste projeto ou o achou útil, sinta-se à vontade para dar uma ⭐ ao repositório.

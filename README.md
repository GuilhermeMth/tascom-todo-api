# TASCOM Bootcamp desafio back-end

API de lista de tarefas construída com **Node.js**, **Express**, **Sequelize** e **PostgreSQL**.

A aplicação entrega:

- Cadastro e login de usuários com JWT.
- CRUD de tarefas.
- CRUD de tags.
- Associação de múltiplas tags em uma tarefa.
- Filtro de tarefas por tags.
- Isolamento de dados por usuário autenticado.

## Tecnologias

- Node.js
- Express
- Sequelize
- PostgreSQL
- bcryptjs
- jsonwebtoken

## Estrutura do projeto

- `app.js`: entrypoint da aplicação.
- `config/`: configuração de banco.
- `models/`: models e associações do Sequelize.
- `migrations/`: migrations do banco.
- `src/`: controllers, services, rotas e middlewares.

## Variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`.

### Exemplo

```env
APP_PORT=4173
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=sequelize_todo_app
DB_HOST=localhost
DB_DIALECT=postgres
JWT_SECRET=change-me
JWT_EXPIRES_IN=7d
```

## Como rodar

1. Instale as dependências.
2. Configure o `.env`.
3. Rode as migrations no banco.
4. Inicie a aplicação com `npm run dev`.

## Autenticação

As rotas de tarefas e tags exigem token JWT no header:

```http
Authorization: Bearer <token>
```

### Endpoints de autenticação

- `POST /auth/register`
- `POST /auth/login`

### Exemplo de payload

```json
{
  "name": "Guilherme",
  "email": "guilherme@email.com",
  "password": "123456"
}
```

## Endpoints

### Health check

- `GET /`

### Usuários

- `POST /auth/register`
- `POST /auth/login`

### Tarefas

- `POST /todo`
- `GET /todo`
- `GET /todo/:id`
- `PUT /todo/:id`
- `DELETE /todo/:id`
- `POST /todo/:id/tags`

#### Campos de tarefa

- `title`
- `status` com valores `Em andamento` ou `Finalizado`
- `description`
- `priority` opcional
- `tagIds` opcional para vincular tags na criação ou atualização

#### Filtro de tarefas

- `GET /todo?tagIds=1,2`
- `GET /todo?tags=Estudo,Matemática`

### Tags

- `POST /tags`
- `GET /tags`
- `GET /tags/:id`
- `PUT /tags/:id`
- `DELETE /tags/:id`

#### Campos de tag

- `name`
- `color`

## Observações

- O usuário autenticado só acessa suas próprias tarefas e tags.
- As migrations precisam ser executadas antes do uso da API.
- O arquivo `.env` está ignorado no Git; use `.env.example` como base.

# Desafio back-end

O objetivo é desenvolver a estrutura do banco e rotas de um aplicativo de lista de tarefas (to do list) utilizando **NodeJS** e como SGDB **PostgreSQL**. Utilizar o framework **Express** para lidar com as requisições e respostas do servidor e o **Sequelize** como ORM.

## **Requisitos**

- Deverá ser possível criar, listar, editar e deletar tarefas.
    - Atributos mínimos necessários para uma criação de tarefa:
        1. Título
        2. Status (Em andamento e Finalizado)
        3. Descrição
- Deverá ser possível criar, listar, editar e deletar etiquetas(tags) que poderão ser atreladas a tarefas. Uma tarefa pode estar relacionada a múltiplas tags. É importante ser possível filtrar tarefas por suas tags.
    - Atributos mínimos necessários para a criação de uma tag:
        1. Nome
        2. Cor
- Ex:
    - Atrelar uma tag de “Estudo” a uma tarefa genérica que envolve estudos.
    - Filtrar tarefas por múltiplas tags, procurar todas as tarefas que possuam a tag “Estudo” e as tags “Matemática” e “Física”, por exemplo.

Sinta-se à vontade, caso queira, para expandir a estrutura definida neste documento.

## Desafio Bônus

Criar um módulo de autenticação (Cadastro de usuário e Login) e alterar a estrutura das tarefas para que um usuário veja apenas suas próprias tags e tarefas.

## Autenticação

- `POST /auth/register` para criar usuário.
- `POST /auth/login` para autenticar e receber um token JWT.
- As rotas de tarefas e tags exigem `Authorization: Bearer <token>`.

## Variáveis de ambiente

- `JWT_SECRET` para assinar os tokens.
- `JWT_EXPIRES_IN` para definir a validade do token, opcional.

## O que será avaliado

- [ ]  🐱 GIT - Organização de commits e processos.
- [ ]  🧹 CÓDIGO - Organização, Semântica, Síntaxe, Estrutura e Legibilidade.
- [ ]  🎯 OBJETIVO - Se o objetivo foi concluído.
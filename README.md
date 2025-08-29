# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes e automação de APIs.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repo>
   cd pgats-API
   ```
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express @apollo/server@4 express@^4 cors body-parser graphql graphql-tag jsonwebtoken
   ```

## Como rodar a API REST

```bash
node server.js
```
A API REST estará disponível em `http://localhost:3000`.

## Como rodar a API GraphQL

```bash
node graphql/server.js
```
A API GraphQL estará disponível em `http://localhost:4000/graphql`.

## Documentação Swagger (REST)

Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais (REST)

- `POST /users/register` — Registro de usuário
- `POST /users/login` — Login de usuário
- `GET /users` — Listar usuários
- `POST /transfers` — Realizar transferência
- `GET /transfers` — Listar transferências

## Operações principais (GraphQL)

- `register` — Mutation para registrar usuário
- `login` — Mutation para login e obtenção de token JWT
- `users` — Query para listar usuários
- `createTransfer` — Mutation para realizar transferência (requer JWT)
- `transfers` — Query para listar transferências

## Regras de negócio
- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor).

## Estrutura de diretórios
- `controller/` — Rotas e validações HTTP (REST)
- `service/` — Lógica de negócio
- `model/` — Dados em memória
- `middleware/` — Middlewares de autenticação
- `graphql/` — API GraphQL (typeDefs, resolvers, app.js, server.js)
- `app.js` — Configuração do Express REST
- `server.js` — Inicialização do servidor REST
- `swagger.json` — Documentação da API REST
## Exemplos de Queries e Mutations GraphQL

### Registrar usuário
```graphql
mutation {
   register(username: "julio", password: "123456", favorecidos: ["priscila"]) {
      username
      favorecidos
   }
}
```

### Login
```graphql
mutation {
   login(username: "julio", password: "123456") {
      token
      user { username favorecidos }
   }
}
```

### Criar transferência (autenticado)
```graphql
mutation {
   createTransfer(from: "julio", to: "priscila", value: 100) {
      from
      to
      value
      date
   }
}
```

### Listar usuários
```graphql
query {
   users {
      username
      favorecidos
   }
}
```

### Listar transferências
```graphql
query {
   transfers {
      from
      to
      value
      date
   }
}
```

## Testes
A API foi estruturada para facilitar testes automatizados com Supertest, importando o `app.js` sem iniciar o servidor.

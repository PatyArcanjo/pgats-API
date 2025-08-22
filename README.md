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
   npm install express swagger-ui-express
   ```

## Como rodar a API

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Documentação Swagger

Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais

- `POST /users/register` — Registro de usuário
- `POST /users/login` — Login de usuário
- `GET /users` — Listar usuários
- `POST /transfers` — Realizar transferência
- `GET /transfers` — Listar transferências

## Regras de negócio
- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor).

## Estrutura de diretórios
- `controller/` — Rotas e validações HTTP
- `service/` — Lógica de negócio
- `model/` — Dados em memória
- `app.js` — Configuração do Express
- `server.js` — Inicialização do servidor
- `swagger.json` — Documentação da API

## Testes
A API foi estruturada para facilitar testes automatizados com Supertest, importando o `app.js` sem iniciar o servidor.

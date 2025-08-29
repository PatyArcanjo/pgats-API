// app.js para ApolloServer
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');
    return { token, req };
  },
});

async function startApollo() {
  await server.start();
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      const authHeader = req.headers['authorization'] || '';
      const token = authHeader.replace('Bearer ', '');
      return { token, req };
    },
  }));
}

startApollo();

module.exports = app;
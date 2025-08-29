const { gql } = require('graphql-tag');

module.exports = gql`
  type User {
    username: String!
    favorecidos: [String!]!
    saldo: Float!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Transfer {
    from: String!
    to: String!
    value: Float!
    date: String
  }

  type Query {
    users: [User]
    transfers: [Transfer]
  }

  type Mutation {
    register(username: String!, password: String!, favorecidos: [String]): User
    login(username: String!, password: String!): AuthPayload
    createTransfer(from: String!, to: String!, value: Float!): Transfer
  }
`;

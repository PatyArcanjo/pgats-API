const userService = require('../service/userService');
const transferService = require('../service/transferService');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

module.exports = {
  Query: {
    users: () => userService.listUsers(),
    transfers: () => transferService.listTransfers(),
  },
  Mutation: {
    register: (_, { username, password, favorecidos }) => {
      return userService.registerUser({ username, password, favorecidos });
    },
    login: (_, { username, password }) => {
      const user = userService.loginUser({ username, password });
      const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    createTransfer: (_, { from, to, value }, context) => {
      if (!context.token) throw new Error('Token não fornecido');
      try {
        jwt.verify(context.token, SECRET);
      } catch (err) {
        throw new Error('Token inválido');
      }
      return transferService.transfer({ from, to, value });
    },
  },
  User: {
    favorecidos: (parent) => Array.isArray(parent.favorecidos) ? parent.favorecidos : [],
    saldo: (parent) => typeof parent.saldo === 'number' ? parent.saldo : 0,
  },
};

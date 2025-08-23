const bcrypt = require('bcryptjs');

// In-memory user database
const users = [];  // inicia o banco vazio, mas poderiamos inicializar com alguns usuários
module.exports = {
  users
};

// para pré cadastrar os usuários
//const users = [
//  { 
//    username: 'alice', 
//    password: bcrypt.hashSync('password123', 8),
//    favorecidos: ['bob'], 
//    saldo: 10000 
//  },
//];  
//module.exports = {
//  users
//};

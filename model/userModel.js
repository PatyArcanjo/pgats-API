const bcrypt = require('bcryptjs');

// In-memory user database
// const users = [];  // inicia o banco vazio, mas poderiamos inicializar com alguns usuários
// module.exports = {
//   users
// };

//para pré cadastrar os usuários
const users = [
 { 
   username: 'julio', 
   password: bcrypt.hashSync('123456', 8),
   favorecidos: ['priscila'], 
   saldo: 10000 
 }
];  

module.exports = {
 users
};
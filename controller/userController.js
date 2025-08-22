const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

// Registro de usuário
router.post('/register', (req, res) => {
  const { username, password, favorecidos } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  try {
    const user = userService.registerUser({ username, password, favorecidos });
    res.status(201).json(user);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  try {
    const user = userService.authenticateUser(username, password);
    res.json({ message: 'Login realizado com sucesso', user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Consulta de usuários
router.get('/', (req, res) => {
  res.json(userService.getAllUsers());
});

module.exports = router;

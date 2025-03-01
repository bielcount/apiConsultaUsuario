const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

// Rota para listar todos os usuários
router.get('/users', getAllUsers);

// Rota para buscar um usuário pelo ID
router.get('/users/:id', getUserById);

// Rota para adicionar um novo usuário
router.post('/users', createUser);

// Rota para atualizar um usuário pelo ID
router.put('/users/:id', updateUser);

// Rota para excluir um usuário pelo ID
router.delete('/users/:id', deleteUser);

module.exports = router;

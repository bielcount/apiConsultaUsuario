const User = require('../models/User');

// Retorna todos os usuários
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao carregar os usuários." });
    }
};

// Retorna um usuário pelo ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "Usuário não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o usuário." });
    }
};

// Adiciona um novo usuário
const createUser = async (req, res) => {
    try {
        const { nome, email, senha, telefone, cnpj } = req.body;

        if (!nome || !email || !senha || !telefone || !cnpj) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const newUser = new User({ nome, email, senha, telefone, cnpj });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar o usuário." });
    }
};

// Atualiza um usuário pelo ID
const updateUser = async (req, res) => {
    try {
        const { nome, email, senha, telefone, cnpj } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { nome, email, senha, telefone, cnpj }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar o usuário." });
    }
};

// Exclui um usuário pelo ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        res.json({ message: "Usuário removido com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir o usuário." });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };

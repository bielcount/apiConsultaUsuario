const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/userData.json');

// Função para carregar os usuários do JSON
const getUsers = () => {
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
};

// Função para salvar os usuários no JSON
const saveUsers = (users) => {
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

// Retorna todos os usuários
const getAllUsers = (req, res) => {
    try {
        const users = getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao carregar os usuários." });
    }
};

// Retorna um usuário pelo ID
const getUserById = (req, res) => {
    try {
        const users = getUsers();
        const user = users.find(u => u.id === parseInt(req.params.id));

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
const createUser = (req, res) => {
    try {
        const users = getUsers();
        const { nome, email, senha, telefone, cnpj } = req.body;

        if (!nome || !email || !senha || !telefone || !cnpj) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1, // Gerando novo ID
            nome,
            email,
            senha,
            telefone,
            cnpj
        };

        users.push(newUser);
        saveUsers(users);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar o usuário." });
    }
};

// Atualiza um usuário pelo ID
const updateUser = (req, res) => {
    try {
        let users = getUsers();
        const { id } = req.params;
        const { nome, email, senha, telefone, cnpj } = req.body;

        const index = users.findIndex(u => u.id === parseInt(id));

        if (index === -1) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        users[index] = { ...users[index], nome, email, senha, telefone, cnpj };
        saveUsers(users);
        res.json(users[index]);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar o usuário." });
    }
};

// Exclui um usuário pelo ID
const deleteUser = (req, res) => {
    try {
        let users = getUsers();
        const { id } = req.params;

        const filteredUsers = users.filter(u => u.id !== parseInt(id));

        if (users.length === filteredUsers.length) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        saveUsers(filteredUsers);
        res.json({ message: "Usuário removido com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir o usuário." });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };

const User = require('../models/User');
const axios = require('axios');

// Função para buscar dados de endereço usando o ViaCEP
async function buscarEnderecoPorCEP(cep) {
    try {
        console.log(`Buscando endereço para o CEP: ${cep}`);
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            throw new Error('CEP não encontrado');
        }
        console.log('Endereço encontrado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar CEP:', error.message);
        throw new Error('Erro ao buscar CEP: ' + error.message);
    }
}

// Criar um novo usuário
const createUser = async (req, res) => {
    try {
        const {
            nome,
            sobrenome,
            email,
            senha,
            tipoUsuario,
            rg,
            cpf,
            inscricaoEstadual,
            pessoa,
            telefone,
            cnpj,
            cep,
            numero
        } = req.body;

        console.log('Recebido payload para criar usuário:', req.body);

        // Validar campos obrigatórios
        if (!nome || !sobrenome || !email || !senha) {
            return res.status(400).json({ error: "Nome, sobrenome, email e senha são obrigatórios." });
        }

        // Gerar o próximo ID incremental
        const nextId = await getNextId();
        console.log('Próximo ID gerado:', nextId);

        // Buscar dados de endereço usando o CEP (se fornecido)
        let endereco = null;
        if (cep) {
            endereco = await buscarEnderecoPorCEP(cep);
            if (numero) {
                endereco.numero = numero;
            }
        }

        // Criar o usuário no banco de dados
        const newUser = new User({
            id: nextId, // Usar o ID gerado
            nome,
            sobrenome,
            email,
            senha,
            tipoUsuario,
            rg,
            cpf,
            inscricaoEstadual,
            pessoa,
            telefone,
            cnpj,
            endereco
        });

        await newUser.save();
        console.log('Usuário criado com sucesso:', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Listar todos os usuários
const getAllUsers = async (req, res) => {
    try {
        console.log('Buscando todos os usuários');
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Buscar um usuário por ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(`Buscando usuário com ID: ${userId}`);
        const user = await User.findById(userId);
        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error.message);
        res.status(500).json({ error: error.message });
    }
};

//Encontrar o maior ID
async function getNextId() {
    try {
        const lastUser = await User.findOne().sort({ id: -1 }); // Encontra o usuário com o maior ID
        if (lastUser && lastUser.id) {
            return lastUser.id + 1; // Retorna o próximo ID
        } else {
            return 1; // Se não houver usuários, começa com 1
        }
    } catch (error) {
        console.error('Erro ao buscar o próximo ID:', error.message);
        throw new Error('Erro ao gerar ID incremental');
    }
}

// Atualizar um usuário
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const {
            nome,
            sobrenome,
            email,
            senha,
            tipoUsuario,
            rg,
            cpf,
            inscricaoEstadual,
            pessoa,
            telefone,
            cnpj,
            cep,
            numero
        } = req.body;

        console.log(`Atualizando usuário com ID: ${userId}`, req.body);

        // Buscar dados de endereço usando o CEP (se fornecido)
        let endereco = null;
        if (cep) {
            endereco = await buscarEnderecoPorCEP(cep);
            if (numero) {
                endereco.numero = numero;
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                nome,
                sobrenome,
                email,
                senha,
                tipoUsuario,
                rg,
                cpf,
                inscricaoEstadual,
                pessoa,
                telefone,
                cnpj,
                endereco
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            console.log('Usuário não encontrado');
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        console.log('Usuário atualizado com sucesso:', updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
        res.status(500).json({ error: error.message });
    }
};;

// Deletar um usuário
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(`Deletando usuário com ID: ${userId}`);
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            console.log('Usuário não encontrado');
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        console.log('Usuário deletado com sucesso:', deletedUser);
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // ID numérico, obrigatório e único
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tipoUsuario: { type: Number, enum: [1, 2, 3, 4, 5] }, // Tipo de usuário (1, 2, 3, 4, 5)
    rg: { type: String },
    cpf: { type: String },
    inscricaoEstadual: { type: String },
    pessoa: { type: String, enum: ['Física', 'Jurídica'] }, // Pessoa Física ou Jurídica
    telefone: { type: String },
    cnpj: { type: String },
    endereco: {
        cep: { type: String },
        logradouro: { type: String },
        numero: { type: String },
        complemento: { type: String },
        bairro: { type: String },
        localidade: { type: String },
        uf: { type: String },
        estado: { type: String },
        regiao: { type: String },
        ibge: { type: String },
        gia: { type: String },
        ddd: { type: String },
        siafi: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
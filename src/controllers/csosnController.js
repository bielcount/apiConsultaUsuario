const csosnData = require("../data/csosnData.json");

// Retorna todos os códigos CSOSN
const getAllCsosn = (req, res) => {
    if (!csosnData || csosnData.length === 0) {
        return res.status(404).json({ error: "Nenhum código CSOSN encontrado" });
    }
    res.json(csosnData);
};

// Retorna um CSOSN específico pelo código
const getCsosnByCode = (req, res) => {
    const { codigo } = req.params;
    const csosn = csosnData.find(item => item.codigo === codigo);

    if (!csosn) {
        return res.status(404).json({ error: "Código CSOSN não encontrado" });
    }

    res.json(csosn);
};

module.exports = {
    getAllCsosn,
    getCsosnByCode
};

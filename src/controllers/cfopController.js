const cfopData = require("../data/cfopsData.json"); // Certifique-se que esse arquivo existe

const getAllCfops = (req, res) => {
    res.json(cfopData);
};

const getCfopByCode = (req, res) => {
    const { codigo } = req.params;
    const cfop = cfopData.find((item) => item.codigo === codigo);

    if (!cfop) {
        return res.status(404).json({ error: "Código CFOP não encontrado" });
    }

    res.json(cfop);
};

module.exports = { getAllCfops, getCfopByCode };

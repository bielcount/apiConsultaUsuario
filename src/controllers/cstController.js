const fs = require("fs");
const path = require("path");

const getAllCsts = (req, res) => {
  const filePath = path.join(__dirname, "../data/cstData.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler o arquivo CST" });
    }
    res.json(JSON.parse(data));
  });
};

const getCstByCode = (req, res) => {
  const filePath = path.join(__dirname, "../data/cstData.json");
  const codigo = req.params.codigo;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler o arquivo CST" });
    }

    const csts = JSON.parse(data);
    const cst = csts.find((item) => item.codigo === codigo);

    if (!cst) {
      return res.status(404).json({ error: "CST não encontrado" });
    }

    res.json(cst);
  });
};

module.exports = { getAllCsts, getCstByCode };

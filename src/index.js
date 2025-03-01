const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Importando rotas
const csosnRoutes = require("./routes/csosnRoutes");
const cstRoutes = require("./routes/cstRoutes");
const cfopRoutes = require("./routes/cfopRoutes"); // Adicionando CFOP

// Registrando as rotas
app.use("/api", csosnRoutes);
app.use("/api", cstRoutes);
app.use("/api", cfopRoutes); // Agora CFOP está incluído

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

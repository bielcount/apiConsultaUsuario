const express = require("express");
const router = express.Router();

// Importando as rotas corretamente
const cfopRoutes = require("./cfopRoutes");
const csosnRoutes = require("./csosnRoutes");
const cstRoutes = require("./cstRoutes");

// Usando as rotas
router.use(cfopRoutes);
router.use(csosnRoutes);
router.use(cstRoutes);

module.exports = router;

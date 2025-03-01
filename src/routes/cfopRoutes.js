const express = require("express");
const router = express.Router();
const { getAllCfops, getCfopByCode } = require("../controllers/cfopController");

router.get("/cfop", getAllCfops);
router.get("/cfop/:codigo", getCfopByCode);

module.exports = router;

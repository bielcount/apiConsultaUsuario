const express = require("express");
const router = express.Router();
const { getAllCsts, getCstByCode } = require("../controllers/cstController");

router.get("/cst", getAllCsts);
router.get("/cst/:codigo", getCstByCode);

module.exports = router;

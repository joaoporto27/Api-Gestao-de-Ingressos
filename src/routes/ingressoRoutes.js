const express = require("express");
const router = express.Router();
const ingressoController = require("../controllers/ingressoController");

router.get("/ingressos", ingressoController.getAllIngressos);
router.get("/ingressos/:id", ingressoController.getIngresso);
router.post("/ingressos", ingressoController.createIngresso);
router.put("/ingressos/:id", ingressoController.updateIngresso);
router.delete("/ingressos/:id", ingressoController.deleteIngresso);

module.exports = router;

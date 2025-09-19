const express = require('express');
const controller = require("../controllers/tarefaController")
const router = express.Router();

router.get('/', controller.listarTarefas);

router.post('/', controller.criarTarefas);

router.get("/:id", controller.listarTarefasId);

router.put("/:id", controller.alterarTarefas);

router.delete("/:id", controller.deletarTarefas );


module.exports = router;
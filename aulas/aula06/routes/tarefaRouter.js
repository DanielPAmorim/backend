const express = require('express');
const controller = require("../controllers/tarefaController")
const router = express.Router();

router.get('/', controller.listarTarefas);

router.post('/', controller.criarTarefas);

router.get("/:id", controller.buscarTarefa, controller.obterTarefa);

router.put("/:id", controller.buscarTarefa, controller.atualizarTarefas);

router.delete("/:id", controller.buscarTarefa, controller.removerTarefas );


module.exports = router;
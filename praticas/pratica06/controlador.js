const Tarefa = require('./modelo');

async function adicionarTarefa(nome, concluida) {
    const tarefa = new Tarefa(nome, concluida);
    await tarefa.inserir();
    return tarefa;
}

async function buscarTarefa(nome) {
    const tarefa = new Tarefa();
    tarefa.nome = nome;
    return await tarefa.buscar();
}

async function atualizarTarefa(nome, novoStatus) {
    const tarefa = new Tarefa();
    tarefa.nome = nome;

    const tarefaEncontrada = await tarefa.buscar();

    if (tarefaEncontrada) {
        tarefa.concluida = novoStatus; 
        await tarefa.alterar();
        return true; 
    }
    return false;
}

async function removerTarefa(nome) {
    const tarefa = new Tarefa();
    tarefa.nome = nome;

    const tarefaEncontrada = await tarefa.buscar();

    if (tarefaEncontrada) {
        await tarefa.deletar();
        return true; 
    }
    return false;
}

module.exports = { removerTarefa, adicionarTarefa, atualizarTarefa, buscarTarefa };
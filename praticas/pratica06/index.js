const readline = require('readline-sync');
const controlador = require('./controlador');

async function Menu() {
    while (true) {
        console.log('\n--- Menu Principal ---');
        console.log('1 - Adicionar Tarefa');
        console.log('2 - Buscar Tarefa');
        console.log('3 - Atualizar Tarefa');
        console.log('4 - Remover Tarefa');
        console.log('5 - Sair');

        const opcao = readline.question('Escolha uma opcao: ');

        switch (parseInt(opcao)) {
            case 1: {
                const nome = readline.question('Informe o nome da tarefa: ');
                const statusInput = readline.question('A tarefa esta concluida? (sim/nao): ').toLowerCase();
                const concluida = (statusInput === 'sim');

                await controlador.adicionarTarefa(nome, concluida);
                console.log('Tarefa adicionada com sucesso!');
                break;
            }
            case 2: {
                const nome = readline.question('Informe o nome da tarefa a ser buscada: ');
                const tarefa = await controlador.buscarTarefa(nome);

                if (tarefa) {
                    console.log('--- Tarefa Encontrada ---');
                    console.log(`ID: ${tarefa._id}`);
                    console.log(`Nome: ${tarefa.nome}`);
                    console.log(`Concluída: ${tarefa.concluida ? 'Sim' : 'Não'}`);
                } else {
                    console.log('Tarefa nao encontrada.');
                }
                break;
            }
            case 3: {
                const nome = readline.question('Informe o nome da tarefa a ser atualizada: ');
                const statusInput = readline.question('Qual o novo status? (concluida/pendente): ').toLowerCase();
                const concluida = (statusInput === 'concluida');

                const atualizou = await controlador.atualizarTarefa(nome, concluida);

                if (atualizou) {
                    console.log('Tarefa atualizada com sucesso!');
                } else {
                    console.log('Erro: Tarefa nao encontrada.');
                }
                break;
            }
            case 4: {
                const nome = readline.question('Informe o nome da tarefa a ser removida: ');
                const removeu = await controlador.removerTarefa(nome);

                if (removeu) {
                    console.log('Tarefa removida com sucesso!');
                } else {
                    console.log('Erro: Tarefa nao encontrada.');
                }
                break;
            }
            case 5:
                console.log('Saindo do sistema...');
                process.exit(0);
        }
    }
}

Menu();
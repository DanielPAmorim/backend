const conectarDB = require('./database');

class Tarefa {
    db = null;
    collection = null;
    id = null; 

    constructor(nome, concluida, id = null) {
        this.nome = nome;
        this.concluida = concluida;
        this.id = id;
    }

    async init() {
        if (!this.db) { 
            this.db = await conectarDB();
            this.collection = this.db.collection('tarefas');
        }
    }

    async inserir() {
        if (!this.collection) await this.init();
        const resultado = await this.collection.insertOne({ nome: this.nome, concluida: this.concluida });
        this.id = resultado.insertedId;
        return resultado;
    }

    async alterar() {
        if (!this.collection) await this.init();
        const resultado = await this.collection.updateOne(
            { _id: this.id },
            { $set: { nome: this.nome, concluida: this.concluida } }
        );
        return resultado;
    }

    async deletar() {
        if (!this.collection) await this.init();
        const resultado = await this.collection.deleteOne({ nome: this.nome });
        return resultado;
    }

    async buscar() {
        if (!this.collection) await this.init();
        const resultado = await this.collection.findOne({ nome: this.nome });

        if (!resultado) {
            return null;
        }
        
        this.id = resultado._id;
        this.nome = resultado.nome;
        this.concluida = resultado.concluida;
        return resultado;
    }
}

module.exports = Tarefa;
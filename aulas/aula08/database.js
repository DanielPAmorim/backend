const { MongoClient } = require("mongodb");

const url = "mongodb+srv://Daniel:$enha123@cluster0.1wykged.mongodb.net/";

const client = new MongoClient(url);


async function conecta(){
    try{
        await client.connect();
        return client.db("agenda");
    }catch(e){
        console.log("Erro ao conectar no MongoDB", e.message);
    }
}

module.exports = conecta;
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://danielpamorim_db_user:$enha@pratica06.unfrkqm.mongodb.net/";

const client = new MongoClient(url);

async function conectarDb() {
    await client.connect();
    return client.db("agenda");
};

module.exports = conectarDb;
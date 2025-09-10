// importa o framework
const express = require("express");

// importa middlleware de terceiros
const cors = require('cors');

//importa middleware de rota
const router = require('./routerTarefa');

// cria uma instacia da aplicação
const app = express();

// middleware embutido ou integrado
app.use(express.json());
//?param1=valor&param2 = valor2
app.use(express.urlencoded({extended: false})); 

// importa middlleware de terceiros
app.use(cors());

//middleware de aplição
app.use((req, res, next) => {
  console.log("Passei aqui")
  next();
});

app.use('/tarefas', router);

// middleware de error
app.use ((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("Algo de errado não está certo!");
});


// inicia a aplicação
app.listen(3000, () => {
  console.log("App está ON! http://localhost:3000");
});
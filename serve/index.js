const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');


//configurando leitura json
app.use(
  express.urlencoded({
    extended: true,
  }),     
)
app.use(express.json())
app.use(cors());

//rotas da api
const rotasProduto = require('./routes/Produtoroutes')

app.use('/produto', rotasProduto)


//configurando porta e conexão com o banco de dados

mongoose.connect("mongodb://127.0.0.1/projectAsa", {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log("conexão feita!");
      app.listen(3000)
    })
    .catch((error) => {
      console.log("Erro ao conectar" + error);
    });
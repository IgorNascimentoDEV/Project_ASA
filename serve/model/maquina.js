'use strict'

const mongoose = require('mongoose');

const Maquina = mongoose.model('Maquina', {
    nºS:{
        type: String
    },
    nome:{
        type: String
    },
    empresa:{
        type: String
    },
    colab:{
        type: String
    },
    setor:{
        type:String
    },
    memoria: {
        type: String
    },
    ram:{
        type:String
    },
    processador:{
        type: String
    },
    oficce: {
        type: String
    }
})

module.exports = Maquina;
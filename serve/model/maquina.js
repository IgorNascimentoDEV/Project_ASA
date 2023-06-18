'use strict'

const mongoose = require('mongoose');

const Maquina = mongoose.model('Maquina', {
    NºS:{
        type: String
    },
    Nome:{
        type: String
    },
    Empresa:{
        type: String
    },
    Colab:{
        type: String
    },
    memoria: {
        type: String
    },
    Ram:{
        type:String
    },
    Processador:{
        type: String
    },
    Oficce: {
        type: String
    }
})

module.exports = Maquina;
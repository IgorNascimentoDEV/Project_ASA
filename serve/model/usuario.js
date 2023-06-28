'use strict'

const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario', {
    email:{
        type: String
    },
    password:{
        type: String
    }
})

module.exports = Usuario;
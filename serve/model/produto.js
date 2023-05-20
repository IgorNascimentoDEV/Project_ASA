'use strict'

const mongoose = require( 'mongoose' )

const Produto = mongoose.model('Produto', {
  modelo: {
    type: String,
  },
  linha: {
    type: String,
  },
 data: {
    type: String,
  },
  imei: {
    type: String,
  },
  colaborador: {
    type: String,
  },
  obs: {
    type: String,
  }

})


module.exports = Produto;
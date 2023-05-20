const router = require('express').Router()

const Produto = require('../model/Produto')

//rotas / endpoint 

//LEITURA
router.get("/", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  try {
    const produto = await Produto.find();
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


//LEITURA POR ID
router.get('/:id', async(req, res) => {

  const id = req.params.id

  try {
    
    const produto = await Produto.findOne({_id: id})

    if(!produto){
      res.status(422).json({error: "A produto nao foi encontrada"})
      return
    }

    res.status(200).json(produto)
    return

  } catch (error) {
    res.status(500).json({error: error})
  }
})

//CRIANDO DADOS
router.post('/', async(req, res) =>{

  const {
    modelo,
    linha,
    data,
    ime,
    colaborador,
    obs
  } = req.body

  if(!modelo){
    res.status(422).json({error: 'Campos obrigatorios!'})
  }

  const produto = {
    modelo,
    linha,
    data,
    ime,
    colaborador,
    obs
  }

  try {
    await Produto.create(produto);
    res.status(201).json({message: 'produto inserida com sucesso'})
  } catch (error) {
    res.status(500).json({error: error});
  }
})  

//ATUALIZAR 
router.put('/:id', async(req, res) => {
  const id = req.params.id

  const {
    modelo,
    linha,
    data,
    ime,
    colaborador,
    obs
  } = req.body

  const produto = {
    modelo,
    linha,
    data,
    ime,
    colaborador,
    obs
  }

  try {
    
    const updateProduto = await Produto.updateOne({_id: id}, produto)

    if(updateProduto.matchedCount === 0){
      res.status(422).json({error: "A produto nao foi encontrada"})
      return
    }

    res.status(200).json(noticia)


  } catch (error) {
    res.status(500).json({error: error})
  }
})

//DELETE
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const produto = await Produto.findOne({_id: id})

  if(!produto){
    res.status(422).json({error: "A produto nao foi encontrada"})
    return
  }

  try {
    
    await Produto.deleteOne({_id: id})
    res.status(200).json({message: "usuario removido com sucesso"}) 

  } catch (error) {
    res.status(500).json({error: error})
  }
})

module.exports = router;
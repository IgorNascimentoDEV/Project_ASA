const router = require("express").Router();

const Maquina = require("../model/maquina");
const Produto = require("../model/produto");

//rotas / endpoint

//LEITURA
router.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  try {
    const produto = await Produto.find();
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//LEITURA POR ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const produto = await Produto.findOne({ _id: id });

    if (!produto) {
      res.status(422).json({ error: "A produto nao foi encontrada" });
      return;
    }

    res.status(200).json(produto);
    return;
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//CRIANDO DADOS
router.post("/", async (req, res) => {
  const {
    modelo,
    linha,
    data,
    imei,
    colaborador,
    setor,
    funcao,
    matricula,
    backup,
    obs,
  } = req.body;

  if (!modelo) {
    res.status(422).json({ error: "Campos obrigatorios!" });
  }

  const produto = {
    modelo,
    linha,
    data,
    imei,
    colaborador,
    setor,
    funcao,
    matricula,
    backup,
    obs,
  };

  try {
    await Produto.create(produto);
    res.status(201).json({ message: "produto inserida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//ATUALIZAR
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const {
    modelo,
    linha,
    data,
    imei,
    colaborador,
    setor,
    funcao,
    matricula,
    backup,
    obs,
  } = req.body;

  const produto = {
    modelo,
    linha,
    data,
    imei,
    colaborador,
    setor,
    funcao,
    matricula,
    backup,
    obs,
  };

  try {
    const updateProduto = await Produto.updateOne({ _id: id }, produto);

    if (updateProduto.matchedCount === 0) {
      res.status(422).json({ error: "A produto nao foi encontrada" });
      return;
    }

    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//DELETE
router.delete("/:imei", async (req, res) => {
  const imei = req.params.imei;

  const produto = await Produto.findOne({ imei: imei });

  if (!produto) {
    res.status(422).json({ error: "A produto nao foi encontrada" });
    return;
  }

  try {
    await Produto.deleteOne({ imei: imei });
    res.status(200).json({ message: "produto  removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**Configuração da rotas de maquina */

//Leitura
router.get("/maquina/dev", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  try {
    const maquina = await Maquina.find();
    res.status(200).json(maquina);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Leitura por Id
router.get("/maquina/dev/:id", async (req, res) => {
  const id = req.params._id
  try {
    const maquina = await Maquina.findOne({ id: id });

    if (!maquina) {
      res.status(422).json({ error: "A maquina não foi encontrada" });
    }

    res.status(200).json(maquina);
    return;
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Criando dado
router.post("/maquina/dev", async (req, res) => {
  const { NºS, Nome, Empresa, Colab, memoria, Ram, Processador, Oficce } =
    req.body;

  if (!Nome) {
    res.status(422).json({ error: "Campo nome é obrigatorio" });
  }
  const maquina = {
    NºS,
    Nome,
    Empresa,
    Colab,
    memoria,
    Ram,
    Processador,
    Oficce,
  };

  try {
    await Maquina.create(maquina);
    res.status(200).json({ message: "Maquina inserida com sucesso" });
  } catch (error) {
    res.status(500).json({ errror: error });
  }
});

//Editando
router.put("/maquina/dev/:id", async (req, res) => {
    
  const id = req.params._id;
  
  const { NºS, Nome, Empresa, Colab, memoria, Ram, Processador, Oficce } =
    req.body;

    const maquina = {
      NºS,
      Nome,
      Empresa,
      Colab,
      memoria,
      Ram,
      Processador,
      Oficce,
    };

    try {
      const updateMaquina = await Maquina.updateOne({id: id}, maquina);

      if(updateMaquina.matchedCount === 0){
        res.status(422).json({error: "A maquina não foi encontrada"});
        return
      }

      res.status(200).json(maquina);
    } catch (error) {
        res.status(500).json({error: error});      
    }
});

//Excluir
router.delete("/maquina/dev/:id", async (req, res) => {
  const id = req.params._id

  const maquina = await Maquina.findOne({id: id});

  if(!maquina){
    res.status(422).json({error: "A maquina não foi encontrada"});
    return
  }

  try {
    await Maquina.deleteOne({id: id});
    res.status(200).json({message: "Maquina excluida com sucesso"});
  } catch (error) {
    res.status(500).json({error: error})
  }
});

module.exports = router;

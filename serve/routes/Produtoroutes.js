const router = require("express").Router();

const Maquina = require("../model/maquina");
const Produto = require("../model/produto");
const Usuario = require("../model/usuario");

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
  const id = req.params.id;
  try {
    const maquina = await Maquina.findOne({ _id: id });

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
  const {
    nºS,
    nome,
    empresa,
    colab,
    setor,
    memoria,
    ram,
    processador,
    oficce,
    obs,
  } = req.body;

  if (!nome) {
    res.status(422).json({ error: "Campo nome é obrigatorio" });
    return;
  }

  const maquina = {
    nºS,
    nome,
    empresa,
    colab,
    setor,
    memoria,
    ram,
    processador,
    oficce,
    obs,
  };

  try {
    await Maquina.create(maquina);
    res.status(200).json({ message: "Maquina inserida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
//Editando
router.put("/maquina/dev/:id", async (req, res) => {
  const id = req.params.id;

  const {
    nºS,
    nome,
    empresa,
    colab,
    setor,
    memoria,
    ram,
    processador,
    oficce,
    obs,
  } = req.body;

  const maquina = {
    nºS,
    nome,
    empresa,
    colab,
    setor,
    memoria,
    ram,
    processador,
    oficce,
    obs,
  };

  try {
    const updateMaquina = await Maquina.updateOne({ _id: id }, maquina);

    if (updateMaquina.matchedCount === 0) {
      res.status(422).json({ error: "A maquina não foi encontrada" });
      return;
    }

    res.status(200).json(maquina);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Excluir
router.delete("/maquina/dev/:id", async (req, res) => {
  const id = req.params.id;

  const maquina = await Maquina.findOne({ _id: id });

  if (!maquina) {
    res.status(422).json({ error: "A maquina não foi encontrada" });
    return;
  }

  try {
    await Maquina.deleteOne({ _id: id });
    res.status(200).json({ message: "Maquina excluida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Cadastrar usuários
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(422).json({ error: "Os campos são obrigatórios!" });
    return;
  }

  try {
    const existingUser = await Usuario.findOne({ email, password });

    if (existingUser) {
      res.status(200).json(existingUser._id);
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  //Depois valida pra cadastrar
  // try {
  //   const usuario = {
  //     email,
  //     password,
  //   };

  //   await Usuario.create(usuario);
  //   res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
});

// Rota para verificar se o usuário está cadastrado
router.get("/login", async (req, res) => {
  const { email } = req.query;

  try {
    const existingUser = await Usuario.findOne({ email });

    if (existingUser) {
      res.status(200).json({ message: "Usuário cadastrado" });
    } else {
      res.status(404).json({ message: "Usuário não cadastrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

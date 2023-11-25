import React from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import "../index.css";
import InputGroup from "react-bootstrap/InputGroup";
import { BiSolidPencil, BiSolidTrash } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
class Colaborador extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      matricula: 0,
      nome: "",
      empresa: "",
      funcao: "",
      licenca: "",
      setor: "",
      usuario: "",
      senha: "",
      movimentacao: [],
      colaboradores: [],
      tecnico: false,
      modalAberto: false,
      modalExcluirAberto: false,
      paginaAtual: 1,
      itensPorPagina: 5,
      termoBusca: "", // Termo de busca
      requisicao: "", //para edição
      endoint: "http://localhost:5062/api/colaborador",
      showPassword: false
    };
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  componentDidMount() {
    this.buscarColaboradores();
  }

  buscarColaboradores = async () => {
    try {
      const response = await fetch(this.state.endoint);

      if (!response.ok) {
        throw new Error("Erro ao buscar colaboradores.");
      }

      const dados = await response.json();
      this.setState({ colaboradores: dados });
    } catch (error) {
      console.error("Erro na busca de colaboradores:", error.message);
      // Aqui você pode adotar alguma estratégia para lidar com o erro,
      // como mostrar uma mensagem de erro na interface do usuário.
    }
  };

  // Deleta um colaborador do servidor
  deletarColaborador = () => {
    fetch(this.state.endoint + "/" + this.state.id, {
      method: "DELETE",
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarColaboradores();
      }
    });
    this.fecharModalExcluir();
  };

  // Carrega os dados de um colaborador
  carregarDados = (id, requisicao) => {
    fetch(this.state.endoint + "/" + id, { method: "GET" })
      .then((resposta) => resposta.json())
      .then((colaborador) => {
        this.setState({
          id: id,
          matricula: colaborador.matricula,
          nome: colaborador.nome,
          empresa: colaborador.empresa,
          funcao: colaborador.funcao,
          setor: colaborador.setor,
          licenca: colaborador.licenca,
          usuario: colaborador.usuario,
          senha: colaborador.senha,
        });
        try{
          fetch("http://localhost:5062/movimentacao/api/Movimentacao/colaborador/" + colaborador.matricula, { method: "GET" })
        .then((res) => res.json())
        .then((movimentacoes) => {
          this.setState({
            movimentacao: movimentacoes
          }, () => {
            console.log(this.state.movimentacao);
          });
        });
        }catch{
          this.setState({
            movimentacao: []
          })
        }
        
        if (this.state.usuario === "") {
          this.state.tecnico = false
        }
        if (requisicao === "editar") {
          this.state.requisicao = "editar"
          this.abrirModal();
        } else {
          this.abrirModalExcluir(id);
        }

      });
  };

  // Cadastra um novo colaborador no servidor
  cadastraColaborador = (colaborador) => {
    fetch(this.state.endoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(colaborador),
    }).then((response) => {
      if (response.ok) {
        this.buscarColaboradores();
      } else {
        alert("Matricula ou Usuario já existente");
      }
    });
  };

  // Atualiza um colaborador no servidor
  atualizarColaborador = (colaborador) => {
    fetch(this.state.endoint + "/" + this.state.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(colaborador),
    }).then((response) => {
      if (response.ok) {
        this.buscarColaboradores();
      } else {
        alert("Não foi possível atualizar o colaborador.");
      }
    });
  };

  // Renderiza a tabela de colaboradores
  renderTabela() {
    const { colaboradores, paginaAtual, itensPorPagina, termoBusca } =
      this.state;

    // Filtra os colaboradores com base no termo de busca
    const colaboradoresFiltrados = colaboradores.filter((colaborador) =>
      this.filtrarColaborador(colaborador, termoBusca)
    );

    // Calcula os índices dos itens a serem exibidos na página atual
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const colaboradoresPaginados = colaboradoresFiltrados.slice(
      indiceInicial,
      indiceFinal
    );

    return (
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Empresa</th>
                <th>Função</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {colaboradoresPaginados.map((colaborador) => (
                <tr key={colaborador.matricula}>
                  <td>{colaborador.matricula}</td>
                  <td>{colaborador.nome}</td>
                  <td>{colaborador.empresa}</td>
                  <td>{colaborador.funcao}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() =>
                        this.carregarDados(colaborador.id, "editar")
                      }
                      style={{ marginRight: "1rem" }}
                    >
                      Atualizar
                      <BiSolidPencil className="icon-list" />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        this.carregarDados(colaborador.id, "excluir")
                      }
                    >
                      Excluir
                      <BiSolidTrash className="icon-list" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="page">
            <Pagination.Prev
              disabled={paginaAtual === 1}
              onClick={() => this.atualizarPaginaAtual(paginaAtual - 1)}
            />
            <Pagination.Item>{paginaAtual}</Pagination.Item>
            <Pagination.Next
              disabled={
                paginaAtual ===
                Math.ceil(colaboradoresFiltrados.length / itensPorPagina)
              }
              onClick={() => this.atualizarPaginaAtual(paginaAtual + 1)}
            />
          </Pagination>
        </Card.Body>
      </Card>
    );
  }

  togglePasswordVisibility() {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword
    }));
  }

  atualizarPaginaAtual = (pagina) => {
    this.setState({
      paginaAtual: pagina,
    });
  };

  // Atualiza o estado "nome" com o valor do input correspondente
  atualizarMatricula = (e) => {
    this.setState({
      matricula: e.target.value,
    });
  };
  // Atualiza o estado "nome" com o valor do input correspondente
  atualizarNome = (e) => {
    this.setState({
      nome: e.target.value,
    });
  };

  // Atualiza o estado "empresa" com o valor do input correspondente
  atualizarEmpresa = (e) => {
    this.setState({
      empresa: e.target.value,
    });
  };

  // Atualiza o estado "funcao" com o valor do input correspondente
  atualizarFuncao = (e) => {
    this.setState({
      funcao: e.target.value,
    });
  };

  // Atualiza o estado "setor" com o valor do input correspondente
  atualizarSetor = (e) => {
    this.setState({
      setor: e.target.value,
    });
  };

  // Atualiza o estado "licenca" com o valor do input correspondente
  atualizarLicenca = (e) => {
    this.setState({
      licenca: e.target.value,
    });
  };

  atualizarTecnico = (e) => {
    this.setState({
      tecnico: e.target.value,
    });
  }

  atualizarUsuario = (e) => {
    this.setState({
      usuario: e.target.value,
    })
  }

  atualizarSenha = (e) => {
    this.setState({
      senha: e.target.value,
    })
  }

  // Executa o cadastro ou atualização do colaborador
  submit = () => {
    const { matricula, nome, empresa, funcao, setor, licenca, usuario, senha } = this.state;

    if (
      matricula === 0 ||
      nome === "" ||
      empresa === "" ||
      funcao === "" ||
      setor === ""
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    if (this.state.requisicao === "editar") {
      const colaborador = {
        matricula,
        nome,
        empresa,
        funcao,
        setor,
        licenca,
        usuario,
        senha
      };
      this.atualizarColaborador(colaborador);
      this.fecharModal();
    } else {
      const colaborador = {
        matricula,
        nome,
        empresa,
        funcao,
        setor,
        licenca,
        usuario,
        senha
      };
      this.cadastraColaborador(colaborador);
      this.fecharModal();
    }
  };

  // Limpa o formulário e abre o modal de edição
  reset = () => {
    this.setState({
      matricula: "",
      nome: "",
      empresa: "",
      funcao: "",
      setor: "",
      licenca: "",
      requisicao: "",
      usuario: "",
      senha: "",
      movimentacao: []
    });
    this.abrirModal();
  };

  // Fecha o modal de edição
  fecharModal = () => {
    this.setState({
      modalAberto: false,
    });
  };

  // Abre o modal de edição
  abrirModal = () => {
    this.setState({
      modalAberto: true,
    });
  };

  // Fecha o modal de exclusão
  fecharModalExcluir = () => {
    this.setState({
      modalExcluirAberto: false,
    });
  };

  // Abre o modal de exclusão
  abrirModalExcluir = (matricula) => {
    this.setState({
      modalExcluirAberto: true,
      matricula: matricula,
    });
  };

  // Filtra os colaboradores com base no termo de busca
  filtrarColaborador = (colaborador, termoBusca) => {
    const { nome, empresa, funcao, setor, matricula } = colaborador;
    const termoBuscaLowerCase = termoBusca.toLowerCase();

    // Função utilitária para verificar se o valor é uma string
    const isString = (value) => typeof value === 'string';

    return (
      (isString(nome) && nome.toLowerCase().includes(termoBuscaLowerCase)) ||
      (isString(empresa) && empresa.toLowerCase().includes(termoBuscaLowerCase)) ||
      (isString(funcao) && funcao.toLowerCase().includes(termoBuscaLowerCase)) ||
      (isString(setor) && setor.toLowerCase().includes(termoBuscaLowerCase)) ||
      (typeof matricula === 'number' && matricula.toString().includes(termoBuscaLowerCase))
    );
  };



  // Atualiza o estado "termoBusca" com o valor do input de busca correspondente
  atualizarTermoBusca = (e) => {
    this.setState({
      termoBusca: e.target.value,
    });
  };

  render() {
    const { termoBusca } = this.state;

    return (
      <div>
        <Modal
          show={this.state.modalAberto}
          onHide={this.fecharModal}
          className="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Colaborador</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Label>Matrícula</Form.Label>
                  <Form.Control
                    placeholder="Matrícula"
                    type="Number"
                    value={this.state.matricula}
                    onChange={this.atualizarMatricula}
                    className="input_padrão"
                  />
                </Col>
                <Col>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    placeholder="Nome do Colaborador"
                    type="text"
                    value={this.state.nome}
                    onChange={this.atualizarNome}
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control
                    placeholder="Empresa"
                    type="text"
                    value={this.state.empresa}
                    onChange={this.atualizarEmpresa}
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                  />
                </Col>
                <Col>
                  <Form.Label>Função</Form.Label>
                  <Form.Control
                    placeholder="Função"
                    type="text"
                    value={this.state.funcao}
                    onChange={this.atualizarFuncao}
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Licença</Form.Label>
                  <Form.Control
                    placeholder="Licença"
                    type="text"
                    value={this.state.licenca}
                    onChange={this.atualizarLicenca}
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                  />
                </Col>
                <Col>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    placeholder="Setor"
                    type="text"
                    value={this.state.setor}
                    onChange={this.atualizarSetor}
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  controlId="formEmprestimo"
                  style={{ marginTop: "2.3rem" }}>
                  <Form.Check
                    type="checkbox"
                    label="Tecnico"
                    checked={this.state.tecnico}
                    onChange={(e) =>
                      this.setState({ tecnico: e.target.checked })
                    }
                  />
                </Col>
              </Row>

              {this.state.tecnico === true && (
                <Row>
                  <Col>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                      placeholder="Usuario"
                      type="text"
                      value={this.state.usuario}
                      onChange={(e) =>
                        this.setState({ usuario: e.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                      placeholder="Senha"
                      type={this.state.showPassword ? "text" : "password"}
                      value={this.state.senha}
                      onChange={(e) =>
                        this.setState({ senha: e.target.value })
                      }
                    />
                    <span className="password-icon-col" onClick={this.togglePasswordVisibility}>
                      {this.state.showPassword ? <BsEye /> : <BsEyeSlash />}
                    </span>
                  </Col>
                </Row>
              )}

              {this.state.movimentacao.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <h4>Lista de Movimentações</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Data Movimentação</th>
                        <th>Equipamento</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.movimentacao.map((movimentacao) => (
                        <tr key={movimentacao.id}>
                          <td>{movimentacao.dataMovimentacao}</td>
                          <td>
                            {movimentacao.equipamento && movimentacao.equipamento.identificador !== "null"
                              ? movimentacao.equipamento.identificador
                              : "N/A"
                            }
                          </td>
                          <td>{movimentacao.tipo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.fecharModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.submit}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="novo">
          <p className="frasepage">CADASTRO DE COLABORADOR</p>
          <div className="pesquisa">
            <InputGroup>
              <Form.Control
                placeholder="Pesquisar..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="Search"
                value={termoBusca}
                onChange={this.atualizarTermoBusca}
              />
              <Button variant="outline-secondary" id="button-addon2">
                Buscar
              </Button>
            </InputGroup>
          </div>

          <Button
            variant="primary"
            type="submit"
            onClick={this.reset}
            style={{ width: "8rem" }}
          >
            Novo
          </Button>
        </div>

        <div>
          <Modal
            className="modal-excluir"
            show={this.state.modalExcluirAberto}
            onHide={this.fecharModalExcluir}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmação de Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja excluir este colaborador?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.fecharModalExcluir}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => this.deletarColaborador()}
              >
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {this.renderTabela()}
      </div>
    );
  }
}

export default Colaborador;

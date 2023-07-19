import React from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import "../index.css";
import InputGroup from "react-bootstrap/InputGroup";
import {BiSolidPencil, BiSolidTrash} from "react-icons/bi";

class Produto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      modelo: "",
      linha: "",
      data: "",
      imei: "",
      colaborador: "",
      setor: "",
      funcao: "",
      matricula: "",
      backup: "",
      obs: "",
      produtos: [],
      modalAberto: false,
      modalExcluirAberto: false,
      paginaAtual: 1,
      itensPorPagina: 9,
      termoBusca: "", // Termo de busca
    };
  }

  componentDidMount() {
    this.buscarProduto();
  }

  // Busca os produtos do servidor
  buscarProduto = () => {
    fetch("http://localhost:4000/produto/")
      .then((resposta) => resposta.json())
      .then((dados) => {
        this.setState({ produtos: dados });
      });
  };

  // Deleta um produto do servidor
  deletarProduto = (imei) => {
    fetch("http://localhost:4000/produto/" + imei, { method: "DELETE" }).then(
      (resposta) => {
        if (resposta.ok) {
          this.buscarProduto();
        }
      }
    );
    this.fecharModalExcluir();
  };

  // Carrega os dados de um aparelho
  carregarDados = (id, requisicao) => {
    fetch("http://localhost:4000/produto/" + id, { method: "GET" })
      .then((resposta) => resposta.json())
      .then((produto) => {
        this.setState({
          id: id,
          modelo: produto.modelo,
          linha: produto.linha,
          data: produto.data,
          imei: produto.imei,
          colaborador: produto.colaborador,
          setor: produto.setor,
          funcao: produto.funcao,
          matricula: produto.matricula,
          backup: produto.backup,
          obs: produto.obs,
        });

        if (requisicao === "editar") {
          this.abrirModal();
        } else {
          this.abrirModalExcluir();
        }
      });
  };

  // Cadastra um novo produto no servidor
  cadastraProduto = (produto) => {
    fetch("http://localhost:4000/produto/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    }).then((response) => {
      if (response.ok) {
        this.buscarProduto();
      } else {
        alert("Não foi possível adicionar o produto.");
      }
    });
  };

  // Atualiza um produto no servidor
  atualizarProduto = (produto) => {
    fetch("http://localhost:4000/produto/" + produto.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    }).then((response) => {
      if (response.ok) {
        this.buscarProduto();
      } else {
        alert("Não foi possível atualizar o produto." + produto.imei);
      }
    });
  };

  // Renderiza a tabela de produtos
  renderTabela() {
    const { produtos, paginaAtual, itensPorPagina, termoBusca } = this.state;

    // Filtra os produtos com base no termo de busca
    const produtosFiltrados = produtos.filter((produto) =>
      this.filtrarProduto(produto, termoBusca)
    );

    // Calcula os índices dos itens a serem exibidos na página atual
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const produtosesPaginados = produtosFiltrados.slice(
      indiceInicial,
      indiceFinal
    );

    return (
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>IMEI</th>
                <th>Linha</th>
                <th>Colab.</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {produtosesPaginados.map((produto) => (
                <tr key={produto._id}>
                  <td>{produto.imei}</td>
                  <td>{produto.linha}</td>
                  <td>{produto.colaborador}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => this.carregarDados(produto._id, "editar")}
                      style={{ marginRight: "1rem" }}
                    >
                      Atualizar
                      <BiSolidPencil className="icon-list"/>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.carregarDados(produto._id, "excluir")}
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
                Math.ceil(produtosFiltrados.length / itensPorPagina)
              }
              onClick={() => this.atualizarPaginaAtual(paginaAtual + 1)}
            />
          </Pagination>
        </Card.Body>
      </Card>
    );
  }

  atualizarPaginaAtual = (pagina) => {
    this.setState({
      paginaAtual: pagina,
    });
  };

  // Atualiza o estado "modelo" com o valor do input correspondente
  atualizarModelo = (e) => {
    this.setState({
      modelo: e.target.value,
    });
  };

  // Atualiza o estado "linha" com o valor do input correspondente
  atualizarLinha = (e) => {
    this.setState({
      linha: e.target.value,
    });
  };

  // Atualiza o estado "data" com o valor do input correspondente
  atualizarData = (e) => {
    this.setState({
      data: e.target.value,
    });
  };

  // Atualiza o estado "imei" com o valor do input correspondente
  atualizarImei = (e) => {
    this.setState({
      imei: e.target.value,
    });
  };

  // Atualiza o estado "colaborador" com o valor do input correspondente
  atualizarColaborador = (e) => {
    this.setState({
      colaborador: e.target.value,
    });
  };
  // Atualiza o estado "setor" com o valor do input correspondente
  atualizarSetor = (e) => {
    this.setState({
      setor: e.target.value,
    });
  };
  // Atualiza o estado "funcao" com o valor do input correspondente
  atualizarFuncao = (e) => {
    this.setState({
      funcao: e.target.value,
    });
  };
  // Atualiza o estado "matricula" com o valor do input correspondente
  atualizarMatricula = (e) => {
    this.setState({
      matricula: e.target.value,
    });
  };

  // Atualiza o estado "Backup" com o valor do input correspondente
  atualizarBackup = (e) => {
    this.setState({
      backup: e.target.value,
    });
  };

  // Atualiza o estado "obs" com o valor do input correspondente
  atualizarObs = (e) => {
    this.setState({
      obs: e.target.value,
    });
  };

  // Executa o cadastro ou atualização do produto
  submit = () => {
    const {
      id,
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
    } = this.state;

    if (modelo === "" || imei === "" || backup === "") {
      alert("Os campo de Modelo, Imei e Backup são obrigatórios");
      return;
    }

    if (id === "") {
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

      this.cadastraProduto(produto);
      this.fecharModal();
    } else {
      const produto = {
        id,
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
      this.atualizarProduto(produto);
      this.fecharModal();
    }
  };

  // Limpa o formulário e abre o modal de edição
  reset = () => {
    this.setState({
      id: "",
      modelo: "",
      linha: "",
      data: "",
      imei: "",
      colaborador: "",
      setor: "",
      funcao: "",
      matricula: "",
      backup: "",
      obs: "",
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
  abrirModalExcluir = (id) => {
    this.setState({
      modalExcluirAberto: true,
      id: id,
    });
  };

  // Filtra os produtos com base no termo de busca
  filtrarProduto = (produto, termoBusca) => {
    const { modelo, linha, backup, setor, colaborador, imei } = produto;
    const termoBuscaLowerCase = termoBusca.toLowerCase();

    return (
      (modelo && modelo.toLowerCase().includes(termoBuscaLowerCase)) ||
      (linha && linha.toLowerCase().includes(termoBuscaLowerCase)) ||
      (backup && backup.toLowerCase().includes(termoBuscaLowerCase)) ||
      (setor && setor.toLowerCase().includes(termoBuscaLowerCase)) ||
      (colaborador &&
        colaborador.toLowerCase().includes(termoBuscaLowerCase)) ||
      (imei && imei.toLowerCase().includes(termoBuscaLowerCase))
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
            <Modal.Title>Atrelamento de aparelho</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  placeholder="id"
                  value={this.state.id}
                  readOnly={true}
                  style={{ display: "none" }}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    placeholder="MODELO"
                    type="text"
                    value={this.state.modelo}
                    onChange={this.atualizarModelo}
                  />
                </Col>
                <Col>
                  <Form.Label>Linha</Form.Label>
                  <Form.Control
                    placeholder="LINHA"
                    type="text"
                    value={this.state.linha}
                    onChange={this.atualizarLinha}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    placeholder="MODELO"
                    type="date"
                    value={this.state.data}
                    onChange={this.atualizarData}
                  />
                </Col>
                <Col>
                  <Form.Label>IMEI</Form.Label>
                  <Form.Control
                    placeholder="IMEI"
                    type="text"
                    value={this.state.imei}
                    onChange={this.atualizarImei}
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder="NOME DO COLABORADOR"
                  value={this.state.colaborador}
                  onChange={this.atualizarColaborador}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    placeholder="SETOR"
                    type="text"
                    value={this.state.setor}
                    onChange={this.atualizarSetor}
                  />
                </Col>
                <Col>
                  <Form.Label>Funcão</Form.Label>
                  <Form.Control
                    placeholder="FUNÇÃO"
                    type="text"
                    value={this.state.funcao}
                    onChange={this.atualizarFuncao}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Label>Matricula</Form.Label>
                  <Form.Control
                    placeholder="Matricula"
                    type="text"
                    value={this.state.matricula}
                    onChange={this.atualizarMatricula}
                  />
                </Col>
                <Col>
                  <Form.Label>Backup</Form.Label>
                  <Form.Select
                    aria-label="Backup"
                    value={this.state.backup}
                    onChange={this.atualizarBackup}
                  >
                    <option value="">Backup</option>
                    <option value="SIM">SIM</option>
                    <option value="NÃO">NÃO</option>
                  </Form.Select>
                </Col>
              </Row>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Observação</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={this.state.obs}
                  onChange={this.atualizarObs}
                />
              </Form.Group>
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
          <p className="frasepage">APARELHOS E LINHAS</p>
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
          {" "}
          <Modal
            className="modal-excluir"
            show={this.state.modalExcluirAberto}
            onHide={this.fecharModalExcluir}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmação de Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja excluir este produto?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.fecharModalExcluir}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => this.deletarProduto(this.state.imei)}
              >
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="tabela">{this.renderTabela()}</div>
      </div>
    );
  }
}

export default Produto;

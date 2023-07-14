import React from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Modal,
  Card,
  Pagination,
} from "react-bootstrap";
import "../index.css";
import InputGroup from "react-bootstrap/InputGroup";

class Maquina extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      numeroSerie: "",
      nome: "",
      empresa: "",
      colab: "",
      setor: "",
      memoria: "",
      ram: "",
      processador: "",
      office: "",
      obs: "",
      maquinas: [],
      modalAberto: false,
      modalExcluirAberto: false,
      paginaAtual: 1,
      itensPorPagina: 9,
    };
  }

  componentDidMount() {
    this.buscaMaquinas();
  }

  // Buscar maquina do servidor
  buscaMaquinas = () => {
    fetch("http://localhost:4000/produto/maquina/dev")
      .then((response) => response.json())
      .then((dados) => {
        this.setState({ maquinas: dados });
      });
  };

  // Cadastra um novo maquina no servidor
  cadastraMaquina = (maquina) => {
    fetch("http://localhost:4000/produto/maquina/dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maquina),
    }).then((response) => {
      if (response.ok) {
        this.buscaMaquinas();
      } else {
        alert("Não foi possível adicionar o produto");
      }
    });
  };

  // Deletar maquina no servidor
  deletarMaquina = (id) => {
    fetch("http://localhost:4000/produto/maquina/dev/" + id, {
      method: "DELETE",
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscaMaquinas();
      }
    });
    this.fecharModalExcluir();
  };

  // Atualizar dados da maquina
  atualizarMaquina = (maquina) => {
    fetch("http://localhost:4000/produto/maquina/dev/" + maquina.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maquina),
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscaMaquinas();
      } else {
        alert("Não foi possível atualizar a maquina");
      }
    });
  };

  // Carregar dados de uma maquina
  carregarDados = (id, requisicao) => {
    fetch("http://localhost:4000/produto/maquina/dev/" + id, { method: "GET" })
      .then((resposta) => resposta.json())
      .then((maquina) => {
        this.setState({
          id: id,
          numeroSerie: maquina.numeroSerie,
          nome: maquina.nome,
          empresa: maquina.empresa,
          colab: maquina.colab,
          setor: maquina.setor,
          memoria: maquina.memoria,
          ram: maquina.ram,
          processador: maquina.processador,
          office: maquina.office,
          obs: maquina.obs,
        });

        if (requisicao === "editar") {
          this.abrirModal();
        } else {
          this.abrirModalExcluir(id);
        }
      });
  };

  // Executa o cadastro ou a atualização da maquina
  submit = () => {
    const {
      id,
      numeroSerie,
      nome,
      empresa,
      colab,
      setor,
      memoria,
      ram,
      processador,
      office,
      obs,
    } = this.state;

    if (nome === "" || empresa === "" || setor === "") {
      alert("Os campos de Nome, Empresa, Setor são obrigatórios");
      return;
    }

    if (id === "") {
      const maquina = {
        numeroSerie,
        nome,
        empresa,
        colab,
        setor,
        memoria,
        ram,
        processador,
        office,
        obs,
      };

      this.cadastraMaquina(maquina);
      this.fecharModal();
    } else {
      const maquina = {
        id,
        numeroSerie,
        nome,
        empresa,
        colab,
        setor,
        memoria,
        ram,
        processador,
        office,
        obs,
      };

      this.atualizarMaquina(maquina);
      this.fecharModal();
    }
  };

  reset = () => {
    this.setState({
      id: "",
      numeroSerie: "",
      nome: "",
      empresa: "",
      colab: "",
      setor: "",
      memoria: "",
      ram: "",
      processador: "",
      office: "",
      obs: "",
    });
    this.abrirModal();
  };

  // Abre o modal de exclusão
  abrirModalExcluir = (id) => {
    this.setState({
      modalExcluirAberto: true,
      id: id,
    });
  };

  // Fecha o modal da exclusão
  fecharModalExcluir = () => {
    this.setState({
      modalExcluirAberto: false,
      id: "",
    });
  };

  // Abre o modal de cadastramento/edição
  abrirModal = () => {
    this.setState({
      modalAberto: true,
    });
  };

  // Fecha o modal de cadastramento/edição
  fecharModal = () => {
    this.setState({
      modalAberto: false,
    });
  };

  renderTabela() {
    const { maquinas, paginaAtual, itensPorPagina } = this.state;

    // Calcula os índices dos itens a serem exibidos na página atual
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const maquinasPaginadas = maquinas.slice(indiceInicial, indiceFinal);

    return (
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome maquina</th>
                <th>Colab</th>
                <th>Setor</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {maquinasPaginadas.map((maquina) => (
                <tr key={maquina._id}>
                  <td>{maquina.nome}</td>
                  <td>{maquina.colab}</td>
                  <td>{maquina.setor}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => this.carregarDados(maquina._id, "editar")}
                      style={{ marginRight: "1rem" }}
                    >
                      Atualizar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.carregarDados(maquina._id, "excluir")}
                    >
                      Excluir
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
                paginaAtual === Math.ceil(maquinas.length / itensPorPagina)
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

  atualizarNumeroSerie = (e) => {
    this.setState({
      numeroSerie: e.target.value,
    });
  };

  atualizarNome = (e) => {
    this.setState({
      nome: e.target.value,
    });
  };

  atualizarSetor = (e) => {
    this.setState({
      setor: e.target.value,
    });
  };

  atualizarEmpresa = (e) => {
    this.setState({
      empresa: e.target.value,
    });
  };

  atualizarMemoria = (e) => {
    this.setState({
      memoria: e.target.value,
    });
  };

  atualizarRam = (e) => {
    this.setState({
      ram: e.target.value,
    });
  };

  atualizarProcessador = (e) => {
    this.setState({
      processador: e.target.value,
    });
  };

  atualizarOffice = (e) => {
    this.setState({
      office: e.target.value,
    });
  };

  atualizarColab = (e) => {
    this.setState({
      colab: e.target.value,
    });
  };

  atualizarObs = (e) => {
    this.setState({
      obs: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Modal show={this.state.modalAberto} onHide={this.fecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Atrelamento de Maquina</Modal.Title>
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
                  <Form.Label>Numero</Form.Label>
                  <Form.Control
                    placeholder="Número de Série"
                    type="text"
                    value={this.state.numeroSerie}
                    onChange={this.atualizarNumeroSerie}
                  />
                </Col>
                <Col>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    placeholder="Nome da Maquina"
                    type="text"
                    value={this.state.nome}
                    onChange={this.atualizarNome}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    placeholder="Setor"
                    type="text"
                    value={this.state.setor}
                    onChange={this.atualizarSetor}
                  />
                </Col>
                <Col>
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control
                    placeholder="Empresa"
                    type="text"
                    value={this.state.empresa}
                    onChange={this.atualizarEmpresa}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Label>Memoria</Form.Label>
                  <Form.Control
                    placeholder="Memoria"
                    type="text"
                    value={this.state.memoria}
                    onChange={this.atualizarMemoria}
                  />
                </Col>
                <Col>
                  <Form.Label>Ram</Form.Label>
                  <Form.Control
                    placeholder="Ram"
                    type="text"
                    value={this.state.ram}
                    onChange={this.atualizarRam}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Label>Processador</Form.Label>
                  <Form.Control
                    placeholder="Processador"
                    type="text"
                    value={this.state.processador}
                    onChange={this.atualizarProcessador}
                  />
                </Col>
                <Col>
                  <Form.Label>Office</Form.Label>
                  <Form.Control
                    placeholder="Ano - Chave"
                    type="text"
                    value={this.state.office}
                    onChange={this.atualizarOffice}
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder="Nome do Colaborador"
                  value={this.state.colab}
                  onChange={this.atualizarColab}
                />
              </Form.Group>

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
          <p className="frasepage">MAQUINAS E LICENÇAS</p>
          <div className="pesquisa">
            <InputGroup>
              <Form.Control
                placeholder="Pesquisar..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="Search"
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
            show={this.state.modalExcluirAberto}
            onHide={this.fecharModalExcluir}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmação de Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Tem certeza que deseja excluir esta maquina?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.fecharModalExcluir}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => this.deletarMaquina(this.state.id)}
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

export default Maquina;

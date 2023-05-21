import React from "react";
import { Table, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import "../index.css";
import InputGroup from "react-bootstrap/InputGroup";

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
      obs: "",
      produtos: [],
      modalAberto: false,
    };
  }

  componentDidMount() {
    this.buscarProduto();
  }

  buscarProduto = () => {
    fetch("http://localhost:4000/produto/")
      .then((resposta) => resposta.json())
      .then((dados) => {
        this.setState({ produtos: dados });
      });
  };

  deletarProduto = (id) => {
    fetch("http://localhost:4000/produto/" + id, { method: "DELETE" }).then(
      (resposta) => {
        if (resposta.ok) {
          this.buscarProduto();
        }
      }
    );
  };

  carregarDados = (id) => {
    fetch("http://localhost:4000/produto/" + id, { method: "GET" })
      .then((resposta) => resposta.json())
      .then((produto) => {
        this.setState({
          id: produto._id,
          modelo: produto.modelo,
          linha: produto.linha,
          data: produto.data,
          imei: produto.imei,
          colaborador: produto.colaborador,
          obs: produto.obs,
        });
        this.abrirModal();
      });
  };

  cadastraProduto = (produto) => {
    fetch("http://localhost:4000/produto/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    }).then((response) => {
      if (response.ok) {
        this.buscarProduto();
      } else {
        alert("Não foi possivel adcionar o produto");
      }
    });
  };

  atualizarProduto = (produto) => {
    fetch("http://localhost:4000/produto/" + produto.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    }).then((response) => {
      if (response.ok) {
        this.buscarProduto();
      } else {
        alert("Não foi possivel atualizar o produto");
      }
    });
  };

  renderTabela() {
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
              {this.state.produtos.map((produto) => (
                <tr>
                  <td>{produto.imei}</td>
                  <td>{produto.linha}</td>
                  <td>{produto.colaborador}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => this.carregarDados(produto._id)}
                      style={{ marginRight: "1rem" }}
                    >
                      Atualizar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.deletarProduto(produto._id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }

  atualizarModelo = (e) => {
    this.setState({
      modelo: e.target.value,
    });
  };
  atualizarLinha = (e) => {
    this.setState({
      linha: e.target.value,
    });
  };
  atualizarData = (e) => {
    this.setState({
      data: e.target.value,
    });
  };
  atualizarImei = (e) => {
    this.setState({
      imei: e.target.value,
    });
  };
  atualizarColaborador = (e) => {
    this.setState({
      colaborador: e.target.value,
    });
  };
  atualizarObs = (e) => {
    this.setState({
      obs: e.target.value,
    });
  };

  submit = () => {
    const { id, modelo, linha, data, imei, colaborador, obs } = this.state;

    if (
      modelo === "" ||
      linha === "" ||
      data === "" ||
      imei === "" ||
      colaborador === "" ||
      obs === ""
    ) {
      alert("Por favor, preencha todos os campos antes de cadastrar.");
      return;
    }

    if (id === "") {
      const produto = {
        modelo,
        linha,
        data,
        imei,
        colaborador,
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
        obs,
      };
      this.atualizarProduto(produto);
      this.fecharModal();
    }
  };

  reset = () => {
    this.setState({
      id: "",
      modelo: "",
      linha: "",
      data: "",
      imei: "",
      colaborador: "",
      obs: "",
    });
    this.abrirModal();
  };

  fecharModal = () => {
    this.setState({
      modalAberto: false,
    });
  };
  abrirModal = () => {
    this.setState({
      modalAberto: true,
    });
  };

  render() {
    return (
      <div>
        <Modal show={this.state.modalAberto} onHide={this.fecharModal}>
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
          <div className="pesquisa">
            <InputGroup >
              <Form.Control
                placeholder="Pesquisar..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
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

        <div className="tabela">{this.renderTabela()}</div>
      </div>
    );
  }
}

export default Produto;

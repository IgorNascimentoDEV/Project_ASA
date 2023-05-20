import React from "react";
import { Table, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

class Produto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modelo: "",
      linha: "",
      data: "",
      imei: "",
      colaborador: "",
      obs: "",
      produtos: [],
    };
  }

  componentDidMount() {
    this.buscarProduto();
  }
  componentWillUnmount() {}

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

  cadastraProduto = (produto) => {
    fetch("http://localhost:4000/produto/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    })
    .then(response => {
        if(response.ok){
            this.buscarProduto();
        }else{
            alert("Não foi possivel adcionar o produto")
        }
    })
  };

  renderTabela() {
    return (
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
                PUT{" "}
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
    const produto = {
      modelo: this.state.modelo,
      linha: this.state.linha,
      data: this.state.data,
      imei: this.state.imei,
      colaborador: this.state.colaborador,
      obs: this.state.obs,
    };

    this.cadastraProduto(produto);
  };

  render() {
    return (
      <div>
        <div>
          <Form>
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

            <Form.Group className="mb-3" controlId="formGrid">
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

            <Button variant="primary" type="submit" onClick={this.submit}>
              Salvar
            </Button>
          </Form>
        </div>

        {this.renderTabela()}
      </div>
    );
  }
}

export default Produto;

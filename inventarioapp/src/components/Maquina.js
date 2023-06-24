import React from "react";
import { Table, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import "../index.css";
import InputGroup from "react-bootstrap/InputGroup";

class Maquina extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      nºS: "",
      nome: "",
      empresa: "",
      colab: "",
      setor: "",
      memoria: "",
      ram: "",
      processador: "",
      oficce: "",
      obs: "",
      maquinas: [],
      modalAberto: false,
      modalExcluirAberto: false,
    };
  }
  componentDidMount() {
    this.buscaMaquinas();
  }

  //Buscar maquina do servidor
  buscaMaquinas = () => {
    fetch("http://localhost:4000/produto/maquina/dev")
      .then((response) => response.json())
      .then((dados) => {
        this.setState({ maquinas: dados });
      });
  };

  //Cadastra um novo maquina no servidor
  cadastraMaquina = (maquina) => {
    fetch("http://localhost:4000/produto/maquina/dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maquina),
    }).then((response) => {
      if(response.ok){
        this.buscaMaquinas();
      }else{
        alert("Não foi possivel adicionar o produto");
      }
    });
  };

  //Deletar maquina no servidor
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

  //Atualizar dados da maquina
  atualizarMaquina = (maquina) => {
    fetch("http://localhost:4000/produto/maquina/dev/" + maquina.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maquina),
    }).then((resposta) => {
      if(resposta.ok){
        this.buscaMaquinas();
      } else {
        alert("Não foi possivel atualizar a maquina")
      }
    })
  }

  //Carregar dados de uma maquina
  carregarDados = (id, requisicao) => {
    fetch("http://localhost:4000/produto/maquina/dev/" + id, { method: "GET" })
      .then((resposta) => resposta.json())
      .then((maquina) => {
        this.setState({
          id: id,
          nºS: maquina.nºS,
          nome: maquina.nome,
          empresa: maquina.empresa,
          colab: maquina.colab,
          setor: maquina.setor,
          memoria: maquina.memoria,
          ram: maquina.ram,
          processador: maquina.processador,
          oficce: maquina.oficce,
          obs: maquina.obs
        });

        if (requisicao === "editar") {
          this.abrirModal();
        } else {
          this.abrirModalExcluir(id);
        }
      });
  };

  //Executa o cadastro ou a atualização da maquina
  submit = () => {
    const {
      id,
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
    } = this.state;

    if(nome === "" || empresa === "" || setor === ""){
      alert("Os campos de Nome, Empresa, Setor são obrigatorios");
      return;
    }

    if(id === ""){
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

      this.cadastraMaquina(maquina);
      this.fecharModal();
    }else{
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

      this.atualizarMaquina(maquina);
      this.fecharModal();
    }
  };

  reset = () => {
    this.setState({
      id: "",
      nºS: "",
      nome: "",
      empresa: "",
      colab: "",
      setor: "",
      memoria: "",
      ram: "",
      processador: "",
      oficce: "",
      obs: "",
    });
    this.abrirModal();
  };

  //Abre o modal de exclusão
  abrirModalExcluir = (id) => {
    this.setState({
      modalExcluirAberto: true,
      id: id,
    });
  };
  //Fecha o modal da exclusão
  fecharModalExcluir = (id) => {
    this.setState({
      modalExcluirAberto: false,
      id: id,
    });
  };
  //abre o modal de cadastramento/edição
  abrirModal = () => {
    this.setState({
      modalAberto: true,
    });
  };
  //fecha o modal de cadastramento/edição
  fecharModal = () => {
    this.setState({
      modalAberto: false,
    });
  };

  renderTabela() {
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
              {this.state.maquinas.map((maquina) => (
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
        </Card.Body>
      </Card>
    );
  }

  atualizarNºS  = (e) => {
    this.setState({
      nºS: e.target.value,
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
  }

  atualizarOficce = (e) => {
    this.setState({
      oficce: e.target.value,
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
                    placeholder="NºS"
                    type="text"
                    value={this.state.nºS}
                    onChange={this.atualizarNºS}
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
                    placeholder="SETOR"
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
                  <Form.Label>Oficce</Form.Label>
                  <Form.Control
                    placeholder="Ano - Chave"
                    type="text"
                    value={this.state.oficce}
                    onChange={this.atualizarOficce}
                  />
                </Col>
              </Row>


              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  placeholder="NOME DO COLABORADOR"
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
          <div className="pesquisa">
            <InputGroup>
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

        <div>
          {" "}
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

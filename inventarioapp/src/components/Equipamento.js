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
import { BiSolidPencil, BiSolidTrash } from "react-icons/bi";

class Equipamento extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idEquipamento: "",
      tipoAtivo: "",
      data: "",
      modelo: "",
      nomeMaquina: "",
      linha: "",
      numeroDeSerie: "",
      armazenamento: "",
      memoriaRam: "",
      processador: "",
      office: "",
      observacao: "",
      equipamentos: [],
      equipamentosFiltrados: [],
      modalAberto: false,
      modalExcluirAberto: false,
      paginaAtual: 1,
      itensPorPagina: 9,
      termoBusca: "",
      emprestimo: false,
      requisicao: "",
    };
  }

  componentDidMount() {
    this.buscaEquipamentos();
  }

  // Buscar equipamentos do servidor
  buscaEquipamentos = () => {
    fetch("http://localhost:8080/equipamentos")
      .then((response) => response.json())
      .then((dados) => {
        this.setState({ equipamentos: dados, equipamentosFiltrados: dados });
      });
  };

  // Cadastrar um novo equipamento no servidor
  cadastraEquipamento = (equipamento) => {
    fetch("http://localhost:8080/equipamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipamento),
    }).then((response) => {
      if (response.ok) {
        this.buscaEquipamentos();
      } else {
        alert("Não foi possível adicionar o produto");
      }
    });
  };

  // Deletar equipamento no servidor
  deletarEquipamento = (id) => {
    try {
      fetch("http://localhost:8080/equipamentos/" + id, {
        method: "DELETE",
      }).then((resposta) => {
        if (resposta.ok) {
          this.buscaEquipamentos();
        } else {
          // Verificar o status da resposta para determinar se a exclusão é permitida ou não
          if (resposta.status === 500) {
            alert("O registro não pode ser excluído pois está sendo referenciado em movimentação");
          } else {
            alert("Ocorreu um erro ao excluir o registro.");
          }
        }
      });
      this.fecharModalExcluir();
    } catch (error) {
      alert("Ocorreu um erro ao excluir o registro.");
      this.fecharModalExcluir();
    }
  };

  // Atualizar dados do equipamento
  atualizarEquipamento = (equipamento) => {
    fetch("http://localhost:8080/equipamentos/" + equipamento.idEquipamento, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipamento),
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscaEquipamentos();
      } else {
        alert("Não foi possível atualizar o equipamento");
      }
    });
  };

  // Carregar dados de um equipamento
  carregarDados = (id, requisicao) => {
    fetch("http://localhost:8080/equipamentos/" + id, {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((equipamento) => {
        this.setState({
          idEquipamento: id,
          data: equipamento.data,
          modelo: equipamento.modelo,
          armazenamento: equipamento.armazenamento,
          memoriaRam: equipamento.memoriaRam,
          processador: equipamento.processador,
          office: equipamento.office,
          nomeMaquina: equipamento.nomeMaquina,
          numeroDeSerie: equipamento.numeroDeSerie,
          linha: equipamento.linha,
          emprestimo: equipamento.emprestimo,
          tipo: equipamento.tipo,
          observacao: equipamento.observacao,
        });

        if (requisicao === "editar") {
          this.abrirModal();
        } else {
          this.abrirModalExcluir(id);
        }
      });
  };

  // Executar o cadastro ou a atualização do equipamento
  submit = () => {
    const {
      idEquipamento,
      data,
      modelo,
      armazenamento,
      memoriaRam,
      processador,
      office,
      nomeMaquina,
      numeroDeSerie,
      linha,
      emprestimo,
      tipo,
      observacao,
    } = this.state;

    if (tipo === "" || idEquipamento === "" || data === "") {
      alert("Os campos Tipo de Ativo, ID Equipamento e Data são obrigatórios");
      return;
    }

    if (this.state.requisicao === "editar") {
      const equipamento = {
        idEquipamento,
        data,
        modelo,
        armazenamento,
        memoriaRam,
        processador,
        office,
        nomeMaquina,
        numeroDeSerie,
        linha,
        emprestimo,
        tipo,
        observacao,
      };

      this.atualizarEquipamento(equipamento);
      this.fecharModal();
    } else {
      const equipamento = {
        idEquipamento,
        data,
        modelo,
        armazenamento,
        memoriaRam,
        processador,
        office,
        nomeMaquina,
        numeroDeSerie,
        linha,
        emprestimo,
        tipo,
        observacao,
      };

      this.cadastraEquipamento(equipamento);
      this.fecharModal();
    }
  };

  reset = () => {
    this.setState({
      idEquipamento: "",
      data: "",
      modelo: "",
      armazenamento: "",
      memoriaRam: "",
      processador: "",
      office: "",
      nomeMaquina: "",
      numeroDeSerie: "",
      linha: "",
      emprestimo: "",
      tipo: "",
      observacao: "",
      requisicao: "",
    });
    this.abrirModal();
  };

  // Abre o modal de edição
  abrirModal = (requisicao) => {
    this.setState({
      modalAberto: true,
      requisicao: requisicao,
    });
  };

  // Abrir o modal de exclusão
  abrirModalExcluir = (id) => {
    this.setState({
      modalExcluirAberto: true,
      idEquipamento: id,
    });
  };

  // Fechar o modal da exclusão
  fecharModalExcluir = () => {
    this.setState({
      modalExcluirAberto: false,
      idEquipamento: "",
    });
  };

  // Abrir o modal de cadastramento
  abrirModal = () => {
    this.setState({
      modalAberto: true,
    });
  };

  // Fechar o modal de cadastramento/edição
  fecharModal = () => {
    this.setState({
      modalAberto: false,
    });
  };

  // Atualizar o termo de busca
  atualizarTermoBusca = (event) => {
    const termoBusca = event.target.value;
    const { equipamentos } = this.state;

    const equipamentosFiltrados = equipamentos.filter((equipamento) =>
      this.filtrarEquipamento(equipamento, termoBusca)
    );

    this.setState({
      termoBusca,
      equipamentosFiltrados,
    });
  };

  filtrarEquipamento = (equipamento, termoBusca) => {
    const {
      idEquipamento,
      modelo,
      linha,
      tipoAtivo,
      nomeMaquina,
    } = equipamento;
    const termoBuscaLowerCase = termoBusca.toLowerCase();
  
    // Verifica se os valores são strings antes de chamar o toLowerCase
    const idEquipamentoStr = idEquipamento ? idEquipamento.toString() : "";
    const modeloStr = modelo ? modelo.toString() : "";
    const linhaStr = linha ? linha.toString() : "";
    const tipoAtivoStr = tipoAtivo ? tipoAtivo.toString() : "";
    const nomeMaquinaStr = nomeMaquina ? nomeMaquina.toString() : "";
  
    return (
      (idEquipamentoStr && idEquipamentoStr.toLowerCase().includes(termoBuscaLowerCase)) ||
      (modeloStr && modeloStr.toLowerCase().includes(termoBuscaLowerCase)) ||
      (linhaStr && linhaStr.toLowerCase().includes(termoBuscaLowerCase)) ||
      (tipoAtivoStr && tipoAtivoStr.toLowerCase().includes(termoBuscaLowerCase)) ||
      (nomeMaquinaStr && nomeMaquinaStr.toLowerCase().includes(termoBuscaLowerCase))
    );
  };

  // Atualizar o estado de emprestimo
  atualizarEmprestimo = (e) => {
    this.setState({
      emprestimo: e.target.checked,
    });
  };

  // Atualizar o estado dos campos do equipamento
  atualizarIdEquipamento = (e) => {
    this.setState({
      idEquipamento: e.target.value,
    });
  };

  atualizarNomeEquipamento = (e) => {
    this.setState({
      nomeMaquina: e.target.value,
    });
  };

  atualizarTipoAtivo = (e) => {
    this.setState({
      tipo: e.target.value,
    });
  };

  atualizarData = (e) => {
    this.setState({
      data: e.target.value,
    });
  };

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

  atualizarArmazenamento = (e) => {
    this.setState({
      armazenamento: e.target.value,
    });
  };

  atualizarMemoriaRam = (e) => {
    this.setState({
      memoriaRam: e.target.value,
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

  atualizarObs = (e) => {
    this.setState({
      observacao: e.target.value,
    });
  };

  renderTabela() {
    const { equipamentosFiltrados, paginaAtual, itensPorPagina } = this.state;

    // Calcula os índices dos itens a serem exibidos na página atual
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const equipamentosPaginados = equipamentosFiltrados.slice(
      indiceInicial,
      indiceFinal
    );

    return (
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tipo de Ativo</th>
                <th>ID Equipamento</th>
                <th>Data</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {equipamentosPaginados.map((equipamento) => (
                <tr key={equipamento.idEquipamento}>
                  <td>{equipamento.tipo}</td>
                  <td>{equipamento.idEquipamento}</td>
                  <td>{equipamento.data}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() =>
                        this.carregarDados(equipamento.idEquipamento, "editar")
                      }
                      style={{ marginRight: "1rem" }}
                    >
                      Atualizar
                      <BiSolidPencil className="icon-list" />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        this.carregarDados(equipamento.idEquipamento, "excluir")
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
                Math.ceil(equipamentosFiltrados.length / itensPorPagina)
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
  }

  render() {
    const { termoBusca } = this.state;

    return (
      <div>
        <Modal show={this.state.modalAberto} onHide={this.fecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Ativos</Modal.Title>
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
                  <Form.Label>Tipo de Ativo</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.tipo}
                    onChange={(e) => this.setState({ tipo: e.target.value })}
                  >
                    <option value="">Selecione o tipo de ativo</option>
                    <option value="Maquina">Maquina</option>
                    <option value="Telefone">Telefone</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>ID Equipamento</Form.Label>
                  <Form.Control
                    placeholder="ID do Equipamento"
                    type="text"
                    value={this.state.idEquipamento}
                    onChange={(e) =>
                      this.setState({ idEquipamento: e.target.value })
                    }
                  />
                </Col>
                <Col>
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    type="date"
                    value={this.state.data}
                    onChange={(e) => this.setState({ data: e.target.value })}
                  />
                </Col>
                <Col>
                  <Form.Group
                    controlId="formEmprestimo"
                    style={{ marginTop: "2.3rem" }}
                  >
                    <Form.Check
                      type="checkbox"
                      label="Emprestimo"
                      checked={this.state.emprestimo}
                      onChange={(e) =>
                        this.setState({ emprestimo: e.target.checked })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              {this.state.tipo === "Maquina" && (
                <>
                  <Row>
                    <Col>
                      <Form.Label>Modelo</Form.Label>
                      <Form.Control
                        placeholder="Modelo da Máquina"
                        type="text"
                        value={this.state.modelo}
                        onChange={(e) =>
                          this.setState({ modelo: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        placeholder="NOME da Máquina"
                        type="text"
                        value={this.state.nomeMaquina}
                        onChange={(e) =>
                          this.setState({ nomeMaquina: e.target.value })
                        }
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Label>Armazenamento</Form.Label>
                      <Form.Control
                        placeholder="Capacidade de Armazenamento"
                        type="text"
                        value={this.state.armazenamento}
                        onChange={(e) =>
                          this.setState({ armazenamento: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label>Memória RAM</Form.Label>
                      <Form.Control
                        placeholder="Memória RAM"
                        type="text"
                        value={this.state.memoriaRam}
                        onChange={(e) =>
                          this.setState({ memoriaRam: e.target.value })
                        }
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Label>Processador</Form.Label>
                      <Form.Control
                        placeholder="Processador da Máquina"
                        type="text"
                        value={this.state.processador}
                        onChange={(e) =>
                          this.setState({ processador: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label>Office</Form.Label>
                      <Form.Control
                        placeholder="Ano - Chave do Office"
                        type="text"
                        value={this.state.office}
                        onChange={(e) =>
                          this.setState({ office: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Observação</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={this.state.obs}
                      onChange={(e) => this.setState({ obs: e.target.value })}
                    />
                  </Form.Group>
                </>
              )}

              {this.state.tipo === "Telefone" && (
                <>
                  <Row>
                    <Col>
                      <Form.Label>Modelo</Form.Label>
                      <Form.Control
                        placeholder="Modelo da Telefone"
                        type="text"
                        value={this.state.modelo}
                        onChange={(e) =>
                          this.setState({ modelo: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label>Linha</Form.Label>
                      <Form.Control
                        placeholder="Linha do Telefone"
                        type="text"
                        value={this.state.linha}
                        onChange={(e) =>
                          this.setState({ linha: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Observação</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={this.state.observacao}
                      onChange={(e) =>
                        this.setState({ observacao: e.target.value })
                      }
                    />
                  </Form.Group>
                </>
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
          <p className="frasepage">MÁQUINAS E LICENÇAS</p>
          <div className="pesquisa">
            <InputGroup>
              <Form.Control
                placeholder="Pesquisar..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="search"
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
              Tem certeza que deseja excluir este equipamento?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.fecharModalExcluir}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  this.deletarEquipamento(this.state.idEquipamento)
                }
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

export default Equipamento;

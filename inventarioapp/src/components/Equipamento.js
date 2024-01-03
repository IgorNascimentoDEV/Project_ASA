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
import MaskedInput from 'react-text-mask';

class Equipamento extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      identificador: "",
      tipo: "",
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
      movimentacao: [],
      equipamentos: [],
      equipamentosFiltrados: [],
      modalAberto: false,
      modalExcluirAberto: false,
      paginaAtual: 1,
      itensPorPagina: 5,
      termoBusca: "",
      emprestimo: false,
      requisicao: "",
      endpoint: "http://stockhub.asanet.com.br:5555/equipamento/api/Equipamento",
    };
  }

  componentDidMount() {
    this.buscaEquipamentos();
  }

  // Buscar equipamentos do servidor
  buscaEquipamentos = () => {
    fetch(this.state.endpoint)
      .then((response) => response.json())
      .then((dados) => {
        this.setState({ equipamentos: dados, equipamentosFiltrados: dados });
      });
  };

  // Cadastrar um novo equipamento no servidor
  cadastraEquipamento = (equipamento) => {
    equipamento.emprestimo = false;
    fetch(this.state.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipamento),
    }).then((response) => {
      if (response.ok) {
        this.buscaEquipamentos();
      } else {
        alert("Já existe uma maquina cadastrada com essa identificação");
      }
    });
  };

  // Deletar equipamento no servidor
  deletarEquipamento = (id) => {
    try {
      fetch(this.state.endpoint + "/" + id, {
        method: "DELETE",
      }).then((resposta) => {
        if (resposta.ok) {
          this.buscaEquipamentos();
        } else {
          // Verificar o status da resposta para determinar se a exclusão é permitida ou não
          if (resposta.status === 500) {
            alert(
              "O registro não pode ser excluído pois está sendo referenciado em movimentação"
            );
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
    fetch(this.state.endpoint + "/" + this.state.id, {
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
    fetch(this.state.endpoint + "/" + id, {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((equipamento) => {
        this.setState({
          id: id,
          identificador: equipamento.identificador,
          data: equipamento.data,
          modelo: equipamento.modelo,
          armazenamento: equipamento.armazenamento,
          memoriaRam: equipamento.memoriaRam,
          processador: equipamento.processador,
          office: equipamento.office,
          nomeMaquina: equipamento.nomeMaquina,
          numeroDeSerie: equipamento.numeroDeSerie,
          movimentacao: equipamento.movimentacao,
          linha: equipamento.linha,
          emprestimo: equipamento.emprestimo,
          tipo: equipamento.tipo,
          observacao: equipamento.observacao,
        });

        if (requisicao == "editar") {
          this.state.requisicao = "editar";
          this.abrirModal();
        } else {
          this.abrirModalExcluir(id);
        }
      });
  };

  // Executar o cadastro ou a atualização do equipamento
  submit = () => {
    const {
      identificador,
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

    if (tipo === "" || identificador === "" || data === "") {
      alert("Os campos Tipo de Ativo, ID Equipamento e Data são obrigatórios");
      return;
    }

    if (this.state.requisicao === "editar") {
      const equipamento = {
        identificador,
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
        identificador,
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
      identificador: "",
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
      movimentacao: []
    });
    this.abrirModal();
  };

  // Abre o modal de edição
  abrirModal = () => {
    this.setState({
      modalAberto: true,
    });
  };

  // Abrir o modal de exclusão
  abrirModalExcluir = (id) => {
    this.setState({
      modalExcluirAberto: true,
      identificador: id,
    });
  };

  // Fechar o modal da exclusão
  fecharModalExcluir = () => {
    this.setState({
      modalExcluirAberto: false,
      identificador: "",
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
    const { identificador, modelo, linha, tipo, nomeMaquina } = equipamento;
    const termoBuscaLowerCase = termoBusca.toLowerCase();

    // Verifica se os valores são strings antes de chamar o toLowerCase
    const identificadorStr = identificador ? identificador.toString() : "";
    const modeloStr = modelo ? modelo.toString() : "";
    const linhaStr = linha ? linha.toString() : "";
    const tipoAtivoStr = tipo ? tipo.toString() : "";
    const nomeMaquinaStr = nomeMaquina ? nomeMaquina.toString() : "";

    return (
      (identificadorStr &&
        identificadorStr.toLowerCase().includes(termoBuscaLowerCase)) ||
      (modeloStr && modeloStr.toLowerCase().includes(termoBuscaLowerCase)) ||
      (linhaStr && linhaStr.toLowerCase().includes(termoBuscaLowerCase)) ||
      (tipoAtivoStr &&
        tipoAtivoStr.toLowerCase().includes(termoBuscaLowerCase)) ||
      (nomeMaquinaStr &&
        nomeMaquinaStr.toLowerCase().includes(termoBuscaLowerCase))
    );
  };

  // Atualizar o estado de emprestimo
  atualizarEmprestimo = (e) => {
    this.setState({
      emprestimo: e.target.checked,
    });
  };

  // Atualizar o estado dos campos do equipamento
  atualizaridentificador = (e) => {
    this.setState({
      identificador: e.target.value,
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
                <th>Modelo</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {equipamentosPaginados.map((equipamento) => (
                <tr key={equipamento.identificador}>
                  <td>{equipamento.tipo}</td>
                  <td>{equipamento.identificador}</td>
                  <td>{equipamento.modelo}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() =>
                        this.carregarDados(equipamento.id, "editar")
                      }
                      style={{ marginRight: "1rem" }}
                    >
                      Atualizar
                      <BiSolidPencil className="icon-list" />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        this.carregarDados(equipamento.id, "excluir")
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
  };


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
                    <option value="Maquina">Computador</option>
                    <option value="Telefone">Telefone</option>

                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>ID Equipamento</Form.Label>
                  <Form.Control
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                    placeholder="ID do ativo"
                    type="text"
                    value={this.state.identificador}
                    onChange={(e) =>
                      this.setState({ identificador: e.target.value })
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
                      disabled
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
                        style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                        placeholder="Modelo da máquina"
                        type="text"
                        value={this.state.modelo}
                        onChange={(e) =>
                          this.setState({ modelo: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label>HostName</Form.Label>
                      <Form.Control
                        style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                        placeholder="Host da máquina"
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
                        style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                        placeholder="Capacidade de armazenamento"
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
                        style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
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
                        style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                        placeholder="Processador da máquina"
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
                        style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                        placeholder="Ano - Chave do office"
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
                      style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                      as="textarea"
                      placeholder="Patrimônio:"
                      rows={3}
                      value={this.state.observacao}
                      onChange={(e) => this.setState({ observacao: e.target.value })}
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
                        style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                        placeholder="Modelo da telefone"
                        type="text"
                        value={this.state.modelo}
                        onChange={(e) =>
                          this.setState({ modelo: e.target.value })
                        }
                      />
                    </Col>
                    <Col>
                      <Form.Label>Linha</Form.Label>
                      <MaskedInput
                        mask={["(", /\d/, /\d/, ")", ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        guide={false}
                        style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                        placeholder="(xx) xxxxx-xxxx"
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

              {this.state.movimentacao.length > 0 && (
                <div>
                  <h4>Lista de Movimentações</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Data Movimentação</th>
                        <th>Colaborador</th>
                        <th>Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.movimentacao.map((movimentacao) => (
                        <tr key={movimentacao.codigoMovimentacao}>
                          <td>{movimentacao.dataMovimentacao}</td>
                          <td>
                            {movimentacao.colaborador &&
                              movimentacao.colaborador.nome}
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
          <p className="frasepage">CADASTRAMENTO DE ATIVOS</p>
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
                  this.deletarEquipamento(this.state.identificador)
                }
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

export default Equipamento;

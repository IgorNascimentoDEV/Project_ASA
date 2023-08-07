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

class MovimentacaoEquipamento extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      dataMovimentacao: "",
      codigoColaborador: "",
      codigoEquipamento: "",
      tipo: "",
      movimentacoes: [],
      movimentacaoFiltrados: [],
      modalAberto: false,
      paginaAtual: 1,
      itensPorPagina: 9,
      termoBusca: "", // Termo de busca
      requisicao: "", // para edição
    };
  }

  componentDidMount() {
    this.buscarMovimentacoes();
  }

  buscarMovimentacoes = async () => {
    try {
      const response = await fetch("http://localhost:8080/movimentacoes");

      if (!response.ok) {
        throw new Error("Erro ao buscar movimentações.");
      }

      const dados = await response.json();
      console.log(dados);
      this.setState({ movimentacoes: dados });
    } catch (error) {
      console.error("Erro na busca de movimentações:", error.message);
      // Aqui você pode adotar alguma estratégia para lidar com o erro,
      // como mostrar uma mensagem de erro na interface do usuário.
    }
  };

  // Carregar dados de um equipamento
  carregarDados = (id) => {
    fetch("http://localhost:8080/movimentacoes/" + id, {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((movimentacao) => {
        this.setState({
          id : id,
          dataMovimentacao: movimentacao.dataMovimentacao,
          codigoColaborador: movimentacao.codigoColaborador,
          codigoEquipamento: movimentacao.codigoEquipamento,
          tipo: movimentacao.tipo,
        });
        this.abrirModal();
      });
  };

  // Cadastra uma nova movimentação no servidor
  cadastraMovimentacao = (movimentacao) => {
    fetch("http://localhost:8080/movimentacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movimentacao),
    }).then((response) => {
      if (response.ok) {
        this.buscarMovimentacoes();
      } else {
        alert("Não foi possível adicionar a movimentação.");
      }
    });
  };

  // Renderiza a tabela de movimentações
  renderTabela() {
    const { movimentacoes, paginaAtual, itensPorPagina, termoBusca } =
      this.state;

    // Filtra as movimentações com base no termo de busca
    const movimentacoesFiltradas = movimentacoes.filter((movimentacao) =>
      this.filtrarMovimentacao(movimentacao, termoBusca)
    );

    // Calcula os índices dos itens a serem exibidos na página atual
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    const movimentacoesPaginadas = movimentacoesFiltradas.slice(
      indiceInicial,
      indiceFinal
    );

    return (
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Data Movimentação</th>
                <th>Colaborador</th>
                <th>Equipamento</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoesPaginadas.map((movimentacao) => (
                <tr key={movimentacao.codigoMovimentacao}>
                  <td>{movimentacao.dataMovimentacao}</td>
                  <td>
                    {movimentacao.colaborador && movimentacao.colaborador.nome}
                  </td>
                  <td>
                    {movimentacao.equipamento && movimentacao.equipamento.tipo}
                  </td>
                  <td>{movimentacao.tipo}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => this.carregarDados(movimentacao.idMovimentacao)}
                      style={{ marginRight: "1rem" }}
                    >
                      Visualizar
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
                Math.ceil(movimentacoesFiltradas.length / itensPorPagina)
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

  // Atualiza o estado "dataMovimentacao" com o valor do input correspondente
  atualizarDataMovimentacao = (e) => {
    this.setState({
      dataMovimentacao: e.target.value,
    });
  };

  // Atualiza o estado "codigoColaborador" com o valor do input correspondente
  atualizarCodigoColaborador = (e) => {
    this.setState({
      codigoColaborador: e.target.value,
    });
  };

  // Atualiza o estado "codigoEquipamento" com o valor do input correspondente
  atualizarCodigoEquipamento = (e) => {
    this.setState({
      codigoEquipamento: e.target.value,
    });
  };

  // Atualiza o estado "tipo" com o valor do input correspondente
  atualizarTipo = (e) => {
    this.setState({
      tipo: e.target.value,
    });
  };

  // Executa o cadastro ou atualização da movimentação
  submit = () => {
    const { dataMovimentacao, codigoColaborador, codigoEquipamento, tipo } =
      this.state;

    if (
      dataMovimentacao === "" ||
      codigoColaborador === "" ||
      codigoEquipamento === "" ||
      tipo === ""
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    const movimentacao = {
      dataMovimentacao,
      codigoColaborador,
      codigoEquipamento,
      tipo,
    };

    if (this.state.requisicao === "editar") {
      this.atualizarMovimentacao(movimentacao);
      this.fecharModal();
    } else {
      this.cadastraMovimentacao(movimentacao);
      this.fecharModal();
    }
  };

  // Limpa o formulário e abre o modal de edição
  reset = () => {
    this.setState({
      dataMovimentacao: "",
      codigoColaborador: "",
      codigoEquipamento: "",
      tipo: "",
      requisicao: "",
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
  abrirModal = (requisicao) => {
    this.setState({
      modalAberto: true,
      requisicao: requisicao,
    });
  };

  // Filtra as movimentações com base no termo de busca
  filtrarMovimentacao = (movimentacao, termoBusca) => {
    const {id, dataMovimentacao, tipo, colaborador, equipamento } = movimentacao;
    const termoBuscaLowerCase = termoBusca.toLowerCase();

    return (
      (dataMovimentacao &&
        dataMovimentacao.toLowerCase().includes(termoBuscaLowerCase)) ||
      (colaborador &&
        colaborador.nome.toLowerCase().includes(termoBuscaLowerCase)) ||
      (equipamento &&
        equipamento.tipo.toLowerCase().includes(termoBuscaLowerCase)) ||
      (tipo && tipo.toLowerCase().includes(termoBuscaLowerCase)) 
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
            <Modal.Title>Movimentação de Equipamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Label>Data da Movimentação</Form.Label>
                  <Form.Control
                    type="date"
                    value={this.state.dataMovimentacao}
                    onChange={this.atualizarDataMovimentacao}
                  />
                </Col>
                <Col>
                  <Form.Label>Código do Colaborador</Form.Label>
                  <Form.Control
                    placeholder="Código do Colaborador"
                    type="text"
                    value={this.state.codigoColaborador}
                    onChange={this.atualizarCodigoColaborador}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Código do Equipamento</Form.Label>
                  <Form.Control
                    placeholder="Código do Equipamento"
                    type="text"
                    value={this.state.codigoEquipamento}
                    onChange={this.atualizarCodigoEquipamento}
                  />
                </Col>
                <Col>
                  <Form.Label>Tipo de movimentação</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Tipo de Movimentação"
                    value={this.state.tipo}
                    onChange={this.atualizarTipo}
                  >
                    <option value="">Selecione a movimentação</option>
                    <option value="Maquina">SAIDA</option>
                    <option value="Telefone">ENTRADA</option>
                  </Form.Control>
                </Col>
              </Row>
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
          <p className="frasepage">CADASTRO DE MOVIMENTAÇÃO DE EQUIPAMENTO</p>
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
        {this.renderTabela()}
      </div>
    );
  }
}

export default MovimentacaoEquipamento;

import React from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import "../index.css";
import InputGroup from "react-bootstrap/InputGroup";

class MovimentacaoEquipamento extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      dataMovimentacao: "",
      idColaborador: 0,
      identificador: "",
      tipo: "",
      colaborador: {},
      equipamento: {},
      movimentacoes: [],
      movimentacaoFiltrados: [],
      modalAberto: false,
      modalAbertoVisualiza: false,
      paginaAtual: 1,
      itensPorPagina: 5,
      termoBusca: "", // Termo de busca
      requisicao: "", // para edição
      endpoint:"http://stockhub.asanet.com.br:5555/movimentacao/api/Movimentacao"
    };
  }

  componentDidMount() {
    this.buscarMovimentacoes();
  }

  buscarMovimentacoes = async () => {
    try {
      const response = await fetch(this.state.endpoint);

      if (!response.ok) {
        throw new Error("Erro ao buscar movimentações.");
      }

      const dados = await response.json();
      this.setState({ movimentacoes: dados });
    } catch (error) {
      console.error("Erro na busca de movimentações:", error.message);
      // Aqui você pode adotar alguma estratégia para lidar com o erro,
      // como mostrar uma mensagem de erro na interface do usuário.
    }
    console.log(this.state.equipamento)
  };

  // Carregar dados de um equipamento
  carregarDados = (id) => {
    fetch(this.state.endpoint + "/" + id, {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((movimentacao) => {
        this.setState({
          id: id,
          dataMovimentacao: movimentacao.dataMovimentacao,
          idColaborador: movimentacao.idColaborador,
          identificador: movimentacao.identificador,
        });
        this.state.tipo = movimentacao.tipo
        this.state.colaborador = movimentacao.colaborador
        this.state.equipamento = movimentacao.equipamento
        this.abrirModalVisualiza();
      });
  };

  // Cadastra uma nova movimentação no servidor
  cadastraMovimentacao = (movimentacao) => {
    fetch(this.state.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movimentacao),
    })
      .then(async (response) => {
        if (response.ok) {
          // Se a movimentação foi adicionada com sucesso, solicite o download do termo gerado
          const pdfBlob = await response.blob();
          const url = window.URL.createObjectURL(pdfBlob);

          // Crie um link <a> para iniciar o download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'termo_responsabilidade.pdf';

          // Adicione o link <a> ao DOM e clique nele para iniciar o download
          document.body.appendChild(a);
          a.click();

          // Limpe o objeto URL
          window.URL.revokeObjectURL(url);

          // Em seguida, atualize a lista de movimentações
          this.buscarMovimentacoes();
        } else {
          alert("Não foi possível adicionar a movimentação.");
        }
      })
      .catch((error) => {
        console.error("Erro ao cadastrar a movimentação:", error);
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
                      onClick={() => this.carregarDados(movimentacao.id)}
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

  // Atualiza o estado "idColaborador" com o valor do input correspondente
  atualizaridColaborador = (e) => {
    this.setState({
      idColaborador: e.target.value,
    });
  };

  // Atualiza o estado "identificador" com o valor do input correspondente
  atualizarIdentificador = (e) => {
    this.setState({
      identificador: e.target.value,
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
    const { dataMovimentacao, idColaborador, identificador, tipo } =
      this.state;

    if (
      dataMovimentacao === "" ||
      idColaborador === 0 ||
      identificador === 0 ||
      tipo === ""
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    const movimentacao = {
      dataMovimentacao,
      idColaborador,
      identificador,
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
      idColaborador: "",
      identificador: "",
      tipo: "",
      colaborador: null,
      equipamento: null,
      requisicao: ""
    });
    this.abrirModal();
  };

  // Fecha o modal de cadastro
  fecharModal = () => {
    this.setState({
      modalAberto: false,
    });
  };

  // Abre o modal de cadastro
  abrirModal = (requisicao) => {
    this.setState({
      modalAberto: true,
      requisicao: requisicao,
    });
  };


  // Fecha o modal de visualização
  fecharModalVisualiza = () => {
    this.setState({
      modalAbertoVisualiza: false,
    });
  };

  // Abre o modal de visualização
  abrirModalVisualiza = () => {
    this.setState({
      modalAbertoVisualiza: true,
    });
  };

  // Filtra as movimentações com base no termo de busca
  filtrarMovimentacao = (movimentacao, termoBusca) => {
    const { id, dataMovimentacao, tipo, colaborador, equipamento } = movimentacao;
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
                  <Form.Label>Matricula do Colaborador</Form.Label>
                  <Form.Control
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                    placeholder="Matricula do Colaborador"
                    type="text"
                    value={this.state.idColaborador}
                    onChange={this.atualizaridColaborador}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Código do Equipamento</Form.Label>
                  <Form.Control
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                    placeholder="Código do Equipamento"
                    type="text"
                    value={this.state.identificador}
                    onChange={this.atualizarIdentificador}
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
                    <option value="SAIDA">SAIDA</option>
                    <option value="ENTRADA">ENTRADA</option>
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


        <Modal
          show={this.state.modalAbertoVisualiza}
          onHide={this.fecharModalVisualiza}
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
                  <Form.Label>Tipo de movimentação</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Tipo de Movimentação"
                    value={this.state.tipo}
                    onChange={this.atualizarTipo}
                  >
                    <option value="">Selecione a movimentação</option>
                    <option value="SAIDA">SAIDA</option>
                    <option value="ENTRADA">ENTRADA</option>
                  </Form.Control>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Código do Equipamento</Form.Label>
                  <Form.Control
                  style={{padding: "0.375rem 0.75rem", margin: "0px"}}
                    placeholder="Código do Equipamento"
                    type="text"
                    value={this.state.equipamento ? this.state.equipamento.identificador : ""}
                  />
                </Col>

                <Col>
                  <Form.Label>Código do Colaborador</Form.Label>
                  <Form.Control
                    style={{padding: "0.375rem 0.75rem", margin: "0px"}}
                    placeholder="Código do Colaborador"
                    type="text"
                    value={this.state.colaborador ? this.state.colaborador.matricula : ""}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Equipamento</Form.Label>
                  <Form.Control
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                    placeholder="Equipamento"
                    type="text"
                    value={this.state.equipamento ? this.state.equipamento.tipo : ""}
                  />
                </Col>

                <Col>
                  <Form.Label>Colaborador</Form.Label>
                  <Form.Control
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                    placeholder="Colaborador"
                    type="text"
                    value={this.state.colaborador ? this.state.colaborador.nome : ""}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Equipamento Modelo</Form.Label>
                  <Form.Control
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                    placeholder="Equipamento Modelo"
                    type="text"
                    value={this.state.equipamento ? this.state.equipamento.modelo : ""}
                  />
                </Col>

                <Col>
                  <Form.Label>Colaborador Setor</Form.Label>
                  <Form.Control
                    style={{ padding: "0.375rem 0.75rem", margin: "0px" }}
                    placeholder="Colaborador"
                    type="text"
                    value={this.state.colaborador ? this.state.colaborador.setor : ""}
                  />
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.fecharModalVisualiza}>
              Sair
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="novo">
          <p className="frasepage">MOVIMENTAÇÕES DE ATIVOS</p>
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

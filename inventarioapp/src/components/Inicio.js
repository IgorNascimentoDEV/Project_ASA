import React from "react";
import Card from "react-bootstrap/Card";
import smartphone from "../assets/smartphone.png";
import monitor from "../assets/computer.png";
import "../App.css";

class Inicio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
      maquinas: [],
    };
  }

  componentDidMount() {
    this.buscarMaquinas();
    this.buscarProduto();
  }

  // Buscar máquinas do servidor
  buscarMaquinas = () => {
    fetch("http://localhost:4000/produto/maquina/dev")
      .then((response) => response.json())
      .then((dados) => {
        this.setState({ maquinas: dados });
      });
  };

  // Buscar os produtos do servidor
  buscarProduto = () => {
    fetch("http://localhost:4000/produto/")
      .then((resposta) => resposta.json())
      .then((dados) => {
        this.setState({ produtos: dados });
      });
  };

  renderCards() {
    const { maquinas, produtos } = this.state;
    const quantidadeProdutos = produtos.length;
    const quantidadeProdutosBackup = produtos.filter(
      (produto) => produto.backup === "SIM"
    ).length;
    const quantidadeMaquinas = maquinas.length;

    return (
      <div className="box">
        <div className="header-inicio">
          <p className="fraseinicio">VISUALIZAÇÃO DOS DADOS</p>
        </div>
        <div className="cards">
          <Card
            style={{ width: "18rem", height: "1rem" }}
            className="card-inicio"
          >
            <div className="card-img">
              <Card.Img variant="top" src={smartphone} className="img-card" />
            </div>
            <Card.Body>
              <Card.Title>Telefones</Card.Title>
              <Card.Text>
                Quantidade de produtos: {quantidadeProdutos}
              </Card.Text>
              <Card.Text>
                Quantidade de produtos em backup: {quantidadeProdutosBackup}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }} className="card-inicio">
            <div className="card-img">
              <Card.Img variant="top" src={monitor} className="img-card" />
            </div>
            <Card.Body>
              <Card.Title>Máquinas</Card.Title>
              <Card.Text>
                Quantidade de máquinas cadastradas: {quantidadeMaquinas}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderCards()}</div>;
  }
}

export default Inicio;

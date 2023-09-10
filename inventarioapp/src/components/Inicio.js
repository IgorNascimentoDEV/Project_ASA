import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import smartphone from "../assets/smartphone.png";
import monitor from "../assets/computer.png";
import "../App.css";
import { Chart } from "chart.js";
import 'chart.js/auto';


class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
      maquinas: [],
      celulares: [],
    };
  }

  componentDidMount() {
    this.buscarMaquinas();
  }

  // Buscar máquinas do servidor
  buscarMaquinas = () => {
    fetch("http://localhost:5062/equipamento/api/Equipamento")
      .then((response) => response.json())
      .then((dados) => {
        this.setState({ produtos: dados });
        this.calcularQuantidades();
        this.renderChart();
      });
  };

  calcularQuantidades() {
    const { produtos } = this.state;

    const celulares = produtos.filter((celular) => celular.tipo === "Telefone");
    const maquinas = produtos.filter((maquina) => maquina.tipo === "Maquina");

    this.setState({
      celulares,
      maquinas,
    });
  }

  renderChart() {
    const ctx = document.getElementById("backupChart").getContext("2d");
    const { produtos } = this.state;
  
    // Filtrar máquinas e telefones
    const maquinas = produtos.filter((produto) => produto.tipo === "Maquina");
    const celulares = produtos.filter((produto) => produto.tipo === "Telefone");
  
    // Calcular quantidades de backup
    const quantidadeBkpMaquina = maquinas.filter((maquina) => !maquina.emprestimo).length;
    const quantidadeBkpCelular = celulares.filter((celular) => !celular.emprestimo).length;
  
    // Destrua o gráfico anterior, se existir
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Máquinas", "Telefones"],
        datasets: [
          {
            label: "Cadastrados",
            data: [maquinas.length, celulares.length],
            backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
          {
            label: "Backup",
            data: [quantidadeBkpMaquina, quantidadeBkpCelular],
            backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  
  
  renderCards() {
    return (
      <div className="box">
        <div className="header-inicio">
          <p className="fraseinicio">VISUALIZAÇÃO DOS DADOS</p>
        </div>
        <div className="chart-container">
          <canvas id="backupChart" width="22.5rem" height="9.9rem"></canvas>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderCards()}
        
      </div>
    );
  }
}

export default Inicio;

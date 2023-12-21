import React, { Component } from "react";
import { Chart } from "chart.js";
import "chart.js/auto";
import { BiSolidDownload } from "react-icons/bi";
import "../index.css";

class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
      maquinas: [],
      celulares: [],
    };

    // Referência para o gráfico Chart.js
    this.chart = null;
  }

  componentDidMount() {
    // Carrega o Chart.js antes de buscar as máquinas
    this.loadChartLibrary().then(() => {
      this.buscarMaquinas();
    });
  }

  // Função para carregar o Chart.js de forma assíncrona
  loadChartLibrary = async () => {
    await import("chart.js");
  };

  // Buscar máquinas do servidor
  buscarMaquinas = () => {
    fetch("http://localhost:5062/equipamento/api/Equipamento")
      .then((response) => response.json())
      .then((dados) => {
        this.setState({ produtos: dados }, () => {
          this.calcularQuantidades();
          this.renderChart();
        });
      });
  };

  // Calcular quantidades de máquinas e celulares
  calcularQuantidades() {
    const { produtos } = this.state;

    const celulares = produtos.filter((celular) => celular.tipo === "Telefone");
    const maquinas = produtos.filter((maquina) => maquina.tipo === "Maquina");

    this.setState({
      celulares,
      maquinas,
    });
  }

  // Função para exportar os dados em formato CSV
  exportarParaCSV = () => {
    const { produtos } = this.state;

    // ... (código para exportar para CSV)
  };

  // Renderizar o gráfico
  renderChart() {
    const ctx = document.getElementById("backupChart").getContext("2d");
    const { produtos } = this.state;

    // Filtrar máquinas e telefones
    const maquinas = produtos.filter((produto) => produto.tipo === "Maquina");
    const celulares = produtos.filter((produto) => produto.tipo === "Telefone");

    // Calcular quantidades de backup
    const quantidadeBkpMaquina = maquinas.filter((maquina) => !maquina.emprestimo).length;
    const quantidadeBkpCelular = celulares.filter((celular) => !celular.emprestimo).length;

    // Destruir o gráfico anterior, se existir
    if (this.chart) {
      this.chart.destroy();
    }

    // Criar um novo gráfico Chart.js
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

  // Renderizar os cartões e o botão de exportação CSV
  renderCardsAndButton() {
    return (
      <div>
        <div className="box">
          <div className="header-inicio">
            <p className="frasepage">VISUALIZAÇÃO DOS DADOS</p>
          </div>
          <div className="chart-container">
            <canvas id="backupChart" width="22.5rem" height="9.9rem"></canvas>
          </div>
        </div>

        <button
          className="butto-export-csv"
          onClick={this.exportarParaCSV}>
          <BiSolidDownload className="icon" />
          Baixar
        </button>
      </div>
    );
  }

  render() {
    return <div>{this.renderCardsAndButton()}</div>;
  }
}

export default Inicio;

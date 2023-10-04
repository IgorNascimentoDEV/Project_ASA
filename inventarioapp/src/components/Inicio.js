import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import smartphone from "../assets/smartphone.png";
import monitor from "../assets/computer.png";
import "../App.css";
import { Chart } from "chart.js";
import "chart.js/auto";
import {
  BiSolidDownload
} from "react-icons/bi";

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

  // Função para exportar os dados em formato CSV
  exportarParaCSV = () => {
    const { produtos } = this.state;

    // Função para formatar a data no formato "dd/mm/yyyy"
    const formatarData = (data) => {
      const dataObj = new Date(data);
      const dia = dataObj.getDate().toString().padStart(2, "0");
      const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
      const ano = dataObj.getFullYear();
      return `${dia}/${mes}/${ano}`;
    };

    // Cabeçalho descritivo
    let csvContent = "ID;Identificador;Tipo;Data de Aquisicao;Modelo;Nome da Maquina;Linha;Numero de Serie;Armazenamento;Memoria RAM;Processador;Office;Observacao;Emprestimo\n";

    produtos.forEach((produto) => {
      const {
        id,
        identificador,
        tipo,
        data,
        modelo,
        nomeMaquina,
        linha,
        numeroDeSerie,
        armazenamento,
        memoriaRam,
        processador,
        office,
        observacao,
        emprestimo,
      } = produto;

      // Construir uma linha para cada produto
      const linhaCSV = `${id};${identificador};${tipo};"${formatarData(data)}";"${modelo}";"${nomeMaquina}";"${linha}";"${numeroDeSerie}";"${armazenamento}";"${memoriaRam}";"${processador}";"${office}";"${observacao}";${emprestimo}\n`;

      csvContent += linhaCSV;
    });

    // Criar um Blob com o conteúdo CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    // Criar um link para download do arquivo CSV
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "dados.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


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
          <p className="frasepage">VISUALIZAÇÃO DOS DADOS</p>
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

        <button
          className="butto-export-csv"
          onClick={this.exportarParaCSV}>
          <BiSolidDownload className="icon" />
          Baixar
        </button>
      </div>
    );
  }
}

export default Inicio;

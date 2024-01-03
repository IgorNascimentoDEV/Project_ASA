import React, { Component } from "react";
import { Chart } from "chart.js";
import "chart.js/auto";
import { BiSolidDownload } from "react-icons/bi";
import "../index.css";
import Button from 'react-bootstrap/Button';

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
    fetch("http://stockhub.asanet.com.br:5555/equipamento/api/Equipamento")
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

  exportarParaCSV = () => {
    const { produtos } = this.state;
  
    // Criar um array de strings representando as linhas do CSV
    const linhasCSV = [];
  
    // Adicionar cabeçalho
    const cabecalho = ["Identificador", "Data", "Modelo", "Armazenamento", "Memoria RAM", "Processador", "Office", "Nome da Maquina", "Numero de Serie", "Linha", "Emprestimo", "Tipo", "Observacao"].join(";");
    linhasCSV.push(cabecalho);
  
    // Adicionar dados
    produtos.forEach((produto) => {
      // Substituir quebras de linha nas observações por espaços
      const observacaoLimpa = produto.observacao.replace(/[\r\n]+/g, ' ');
  
      const linha = [
        produto.identificador,
        produto.data,
        produto.modelo,
        produto.armazenamento,
        produto.memoriaRam,
        produto.processador,
        produto.office,
        produto.nomeMaquina,
        produto.numeroDeSerie,
        produto.linha,
        produto.emprestimo,
        produto.tipo,
        observacaoLimpa
      ].join(";");
      linhasCSV.push(linha);
    });
  
    // Converter o array de strings em uma única string, separando as linhas por quebras de linha
    const conteudoCSV = linhasCSV.join("\n");
  
    // Criar um objeto Blob com o conteúdo CSV
    const blob = new Blob([conteudoCSV], { type: "text/csv;charset=utf-8" });
  
    // Criar um link de download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dados.csv";
  
    // Adicionar o link ao documento, clicá-lo e removê-lo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        <Button
          variant="info"
          className="butto-export-csv"
          onClick={this.exportarParaCSV}>
          <BiSolidDownload className="icon" />
          Baixar
        </Button>
      </div>
    );
  }

  render() {
    return <div>{this.renderCardsAndButton()}</div>;
  }
}

export default Inicio;

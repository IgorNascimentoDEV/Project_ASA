using Api.Domain.DTOs;
using Api.Domain.Interfaces;
using Api.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.Threading.Tasks;
using Document = iTextSharp.text.Document;
using Api.Servico;

namespace Api.Controllers
{
    [ApiController]
    [Route("movimentacao/api/[controller]")]
    public class MovimentacaoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMovimentacaoRepository _movimentacaoRepository;
        private readonly IColaboradorRepository _colaboradorRepository;
        private readonly IEquipamentoRepository _equipamentoRepository;
        private readonly GeradorTermos _termo;

        public MovimentacaoController(
            IMapper mapper,
            IMovimentacaoRepository movimentacaoRepository,
            IColaboradorRepository colaboradorRepository,
            IEquipamentoRepository equipamentoRepository,
            GeradorTermos termo)
        {
            _mapper = mapper;
            _movimentacaoRepository = movimentacaoRepository;
            _colaboradorRepository = colaboradorRepository;
            _equipamentoRepository = equipamentoRepository;
            _termo = termo;
        }

        [HttpPost]
        public async Task<IActionResult> SaveMovimentacao([FromBody] MovimentacaoDto movimentacaoDto)
        {
            if (movimentacaoDto == null)
                return BadRequest("Dados inválidos");

            var movimentacaoModel = _mapper.Map<MovimentacaoModel>(movimentacaoDto);

            var colaborador = await _colaboradorRepository.GetColaboradorByMatriculaAsync(movimentacaoModel.IdColaborador);
            if (colaborador == null)
                return NotFound("Colaborador não encontrado");

            var equipamento = await _equipamentoRepository.GetEquipamentoByIdentificadorAsync(movimentacaoDto.identificador);
            if (equipamento == null)
                return NotFound("Equipamento não encontrado");

            movimentacaoModel.Equipamento = equipamento;
            movimentacaoModel.Colaborador = colaborador;
            movimentacaoModel.IdEquipamento = equipamento.Id;

            bool concluidaComSucesso = true;

            if (movimentacaoModel.Tipo.Equals("SAIDA") && concluidaComSucesso)
            {
                if (equipamento.Emprestimo == false)
                {
                    equipamento.Emprestimo = true;
                }
                else
                {
                    return BadRequest("Equipamento já emprestado");
                }
            }

            if (movimentacaoModel.Tipo.Equals("ENTRADA") && concluidaComSucesso)
            {
                if (equipamento.Emprestimo == true)
                {
                    equipamento.Emprestimo = false;
                }
                else
                {
                    return BadRequest("Equipamento já está em estoque");
                }
            }

            colaborador.Movimentacao.Add(movimentacaoModel);
            equipamento.Movimentacao.Add(movimentacaoModel);

            _movimentacaoRepository.Add(movimentacaoModel);
            await _movimentacaoRepository.SaveChangesAsync();

            await _colaboradorRepository.SaveChangesAsync();
            await _equipamentoRepository.SaveChangesAsync();

            // Gerar o PDF
            if (equipamento.Tipo == "Telefone" && movimentacaoDto.Tipo == "ENTRADA")
            {
                byte[] pdfBytes = _termo.GenerateTermoDevolucaoAtivo(colaborador.Nome, colaborador.Matricula, equipamento.Identificador, equipamento.Modelo, equipamento.Linha, equipamento.Observacao, movimentacaoModel.Tipo);
                // Retornar o PDF como parte da resposta HTTP com cabeçalhos apropriados
                return File(pdfBytes, "application/pdf", "termo_responsabilidade.pdf");
            }

            if(equipamento.Tipo == "Telefone" && movimentacaoDto.Tipo == "SAIDA")
            {
                byte[] pdfBytes = _termo.GenerateTermoResponsabilidade(colaborador.Nome, colaborador.Matricula, equipamento.Identificador, equipamento.Modelo, equipamento.Linha, equipamento.Observacao, movimentacaoModel.Tipo);
                // Retornar o PDF como parte da resposta HTTP com cabeçalhos apropriados
                return File(pdfBytes, "application/pdf", "termo_responsabilidade.pdf");
            }
            
            if(equipamento.Tipo == "Maquina" && movimentacaoDto.Tipo == "ENTRADA")
            {
             byte[] pdfBytes = _termo.GenerateTermoDevolucaoMaquina(colaborador.Nome, colaborador.Matricula, equipamento.Identificador, equipamento.Modelo, equipamento.NomeMaquina, equipamento.Observacao, movimentacaoModel.Tipo);
                // Retornar o PDF como parte da resposta HTTP com cabeçalhos apropriados
                return File(pdfBytes, "application/pdf", "termo_responsabilidade.pdf");
            }

            if (equipamento.Tipo == "Maquina" && movimentacaoDto.Tipo == "SAIDA")
            {
                byte[] pdfBytes = _termo.GenerateTermoResponsabilidadeMaquina(colaborador.Nome, colaborador.Matricula, equipamento.Identificador, equipamento.Modelo, equipamento.NomeMaquina, equipamento.Observacao, movimentacaoModel.Tipo);
                // Retornar o PDF como parte da resposta HTTP com cabeçalhos apropriados
                return File(pdfBytes, "application/pdf", "termo_responsabilidade.pdf");
            }
            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMovimentacoes()
        {
            var movimentacoes = await _movimentacaoRepository.GetMovimentacaoAsync();
            return movimentacoes == null ? NotFound() : Ok(movimentacoes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovimentacaoById(long id)
        {
            var movimentacao = await _movimentacaoRepository.GetMovimentacaoByIdAsync(id);
            return movimentacao == null ? NotFound() : Ok(movimentacao);
        }


        [HttpGet("colaborador/{colaboradorId}")]
        public async Task<IActionResult> GetMovimentacoesByColaboradorId(long colaboradorId)
        {
            var movimentacoes = await _movimentacaoRepository.GetMovimentacoesByColaboradorIdAsync(colaboradorId);

            if (movimentacoes == null || movimentacoes.Count == 0)
            {
                return NotFound($"Nenhuma movimentação encontrada para o colaborador com ID {colaboradorId}");
            }

            return Ok(movimentacoes);
        }


        private byte[] SavePdfDocument(Document document)
        {
            using (var memoryStream = new MemoryStream())
            {
                var writer = PdfWriter.GetInstance(document, memoryStream);
                document.CloseDocument(); // Fecha o documento corretamente

                return memoryStream.ToArray();
            }
        }

       
    }
}
    
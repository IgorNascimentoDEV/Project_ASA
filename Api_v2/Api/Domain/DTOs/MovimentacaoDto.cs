using Api.Domain.Models;

namespace Api.Domain.DTOs
{
    public class MovimentacaoDto
    {
        public string DataMovimentacao { get; set; }
        public string Tipo { get; set; }
        public long IdColaborador { get; set; }
        public string identificador { get; set; }
        public string termo { get; set; }
        public string? Carregador { get; set; }
        public string? Chamado { get; set; }
        public float? ValorEquipamento { get; set; }
        public string? Observacao { get; set; }
    }
}

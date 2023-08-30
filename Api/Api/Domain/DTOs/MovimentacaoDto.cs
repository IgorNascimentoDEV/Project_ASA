using Api.Domain.Models;

namespace Api.Domain.DTOs
{
    public class MovimentacaoDto
    {
        public string DataMovimentacao { get; set; }
        public string Tipo { get; set; }
        public long IdColaborador { get; set; }
        public long IdEquipamento { get; set; }
    }
}

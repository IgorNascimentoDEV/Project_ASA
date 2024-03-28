namespace Api.Domain.Models
{
    public class MovimentacaoModel : Base
    {
        public string DataMovimentacao { get; set; }
        public ColaboradorModel Colaborador { get; set; }
        public EquipamentoModel Equipamento { get; set; }
        public string Tipo { get; set; }
        public long IdColaborador { get; set; }
        public long IdEquipamento { get; set; }
        public string? Carregador { get; set; }
        public string? Chamado { get; set; }
        public float? ValorEquipamento { get; set; }
        public string? Observacao { get; set; }
    }
}

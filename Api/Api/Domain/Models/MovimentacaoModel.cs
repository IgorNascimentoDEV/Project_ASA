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
    }
}

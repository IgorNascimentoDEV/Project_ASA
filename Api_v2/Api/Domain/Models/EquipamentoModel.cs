namespace Api.Domain.Models
{
    public class EquipamentoModel : Base
    {
        public string Identificador { get; set; }
        public string Data { get; set; }
        public string Modelo { get; set; }
        public string Anydesk { get; set; }
        public string Office { get; set; }
        public string OfficeChave { get; set; }
        public string NomeMaquina { get; set; }
        public string Linha { get; set; }
        public bool Emprestimo { get; set; }
        public string Tipo { get; set; }
        public int Patrimonio { get; set; }
        public string Observacao { get; set; }

        public List<MovimentacaoModel> Movimentacao { get; set; }
    }
}

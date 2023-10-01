namespace Api.Domain.Models
{
    public class ColaboradorModel : Base
    {
        public long Matricula { get; set; }
        public string Nome { get; set; }
        public string Empresa { get; set; }
        public string Licenca { get; set; }
        public string Funcao { get; set; }
        public string Setor { get; set; }
        public string Usuario { get; set; }
        public string Senha { get; set; }

        public List<MovimentacaoModel> Movimentacao { get; set; }
    }
}

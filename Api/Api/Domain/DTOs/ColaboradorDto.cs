using Api.Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace Api.Domain.DTOs
{
    public class ColaboradorDto
    {
        long Id { get; set; }
        [Required] long Matricula { get; set; }
        [Required] string Nome { get; set; }
        [Required] string Empresa { get; set; }
        [Required] string Licenca { get; set; }
        [Required] string Funcao { get; set; }
        [Required] string Setor { get; set; }
        [Required] List<MovimentacaoModel> Movimentacoes { get; set; }
    }
}


using System.ComponentModel.DataAnnotations;
namespace StockHub.Domain.DTOs
{
   public record ColaboradorRecordDto(
        long Matricula,
        [Required] string Nome,
        [Required] string Empresa,
        [Required] string Licenca,
        [Required] string Funcao,
        [Required] string Setor
    );
}

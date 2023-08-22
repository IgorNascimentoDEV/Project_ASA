using Api.Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace Api.Domain.DTOs
{
    public class ColaboradorDto
    {
        public long Matricula { get; set; }
        public string Nome { get; set; }
        public string Empresa { get; set; }
        public string Licenca { get; set; }
        public string Funcao { get; set; }
        public string Setor { get; set; }
    }
}

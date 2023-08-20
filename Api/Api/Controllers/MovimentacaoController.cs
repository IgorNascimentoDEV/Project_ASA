using Api.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("movi/api/[controller]")]
    public class MovimentacaoController : Controller
    {
        private readonly IMovimentacaoRepository _repository;
        public MovimentacaoController(IMovimentacaoRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet("movimentacoes")]
        public async Task<IActionResult> GetMovimentacao()
        {
            var movimentacoes = await _repository.GetMovimentacaoAsync();

            return movimentacoes == null ? NotFound() : Ok(movimentacoes);
        }

    }
}

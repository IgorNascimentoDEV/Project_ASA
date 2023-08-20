using Api.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ColaboradorHomeController : ControllerBase
    {
        private readonly IColaboradorRepository _repository;
        public ColaboradorHomeController(IColaboradorRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetColaborador() 
        {
            var colaboradores = await _repository.GetColaboradorAsync();

            return colaboradores == null ? NotFound() : Ok(colaboradores);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetColaboradorById(int id)
        {
            var colaborador = await _repository.GetColaboradorByIdAsync(id);

            return colaborador == null ? NotFound() : Ok(colaborador);
        }
    } 
}

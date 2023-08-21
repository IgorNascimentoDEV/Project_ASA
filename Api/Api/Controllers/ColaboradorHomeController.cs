using Api.Domain.DTOs;
using Api.Domain.Interfaces;
using Api.Domain.Models;
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

        [HttpPost]
        public async Task<IActionResult> PostColaborador(ColaboradorModel colaborador)
        {
            if (colaborador == null) return BadRequest("dados invalidos"); 
            
            _repository.Add(colaborador);

            return await _repository.SaveChangesAsync() ? Ok(colaborador) : BadRequest("error ao salvar ao colaborador");
        }
    } 
}

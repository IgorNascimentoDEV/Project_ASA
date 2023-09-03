using Api.Domain.DTOs;
using Api.Domain.Interfaces;
using Api.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ColaboradorController : ControllerBase
    {
        private readonly IColaboradorRepository _repository;
        private readonly IMapper _mapper;
        public ColaboradorController(IColaboradorRepository repository, IMapper mapper)
        {
            this._repository = repository;
            this._mapper = mapper; 
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
        public async Task<IActionResult> PostColaborador(ColaboradorDto colaborador)
        {
            if (colaborador == null)
            {
                return BadRequest("Dados inválidos");
            }

            // Verificar se já existe um colaborador com a mesma matrícula
            var existingColaborador = await _repository.GetColaboradorByMatriculaAsync(colaborador.Matricula);

            if (existingColaborador != null)
            {
                return BadRequest("Já existe um colaborador com a mesma matrícula.");
            }

            var colaboradorAdicionar = _mapper.Map<ColaboradorModel>(colaborador);

            _repository.Add(colaboradorAdicionar);

            return await _repository.SaveChangesAsync() ? Ok(colaboradorAdicionar) : BadRequest("Erro ao salvar o colaborador.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutColaborador(int id, ColaboradorDto colaborador)
        {
            if (id <= 0) return BadRequest("Usuário não informado");

            var colaboradorBanco = await _repository.GetColaboradorByIdAsync(id);

            var colaboradorAtualizar = _mapper.Map(colaborador, colaboradorBanco);

            _repository.Update(colaboradorAtualizar);

            return await _repository.SaveChangesAsync() ? Ok(colaboradorAtualizar) : BadRequest("error ao atualizar");
        }

        [HttpGet("matricula/{matricula}")]
        public async Task<IActionResult> GetColaboradorByMatricula(long matricula)
        {
            var colaborador = await _repository.GetColaboradorByMatriculaAsync(matricula);

            return colaborador == null ? NotFound() : Ok(colaborador);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColaborador(int id)
        {
            if (id <= 0) return BadRequest("Usuário não informado");

            var colaboradorExclui = await _repository.GetColaboradorByIdAsync(id);

            if (colaboradorExclui == null) return NotFound("colaborador não encontrado");

            _repository.Delete(colaboradorExclui);

            return await _repository.SaveChangesAsync()
                 ? Ok("Colaborador deletado com sucesso")
                 : BadRequest("Erro ao deletar o colaborador");
        }
    } 
}

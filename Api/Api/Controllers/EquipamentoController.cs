using Api.Domain.DTOs;
using Api.Domain.Interfaces;
using Api.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("equipamento/api/[controller]")]
    public class EquipamentoController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IEquipamentoRepository _repository;
        public EquipamentoController(IEquipamentoRepository repository, IMapper mappper)
        {
            this._mapper = mappper;
            this._repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetEquipamento()
        {
            var equipamentos = await _repository.GetEquipamentosAsync();

            return equipamentos == null ? NotFound() : Ok(equipamentos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEquipamentoById(int id)
        {
            var equipamento = await _repository.GetEquipamentoByIdAsync(id);
            return equipamento == null ? NotFound() : Ok(equipamento);
        }

        [HttpPost]
        public async Task<IActionResult> PostEquipamento(EquipamentoDto equipamento)
            {
            if (equipamento == null) return BadRequest("dados invalidos");

            var equipamentoAdicionar = _mapper.Map<EquipamentoModel>(equipamento);

            _repository.Add(equipamentoAdicionar);

            return await _repository.SaveChangesAsync() ? Ok(equipamentoAdicionar) : BadRequest("error ao salvar o equipamento");
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutEquipamento(int id, EquipamentoDto equipamento)
        {
            if (id <= 0) return BadRequest("Equipamento não informado");

            var equipamentoBanco = await _repository.GetEquipamentoByIdAsync(id);

            var equipamentoAtualizar = _mapper.Map(equipamento, equipamentoBanco);

            _repository.Update(equipamentoBanco);

            return await _repository.SaveChangesAsync() ? Ok(equipamentoAtualizar) : BadRequest("error ao atualizar");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipamento(int id)
        {
            if (id <= 0) return BadRequest("Equipamento não informado");

            var equipamentoExclui = await _repository.GetEquipamentoByIdAsync(id);

            if (equipamentoExclui == null) return NotFound("equipamento não encontrado");

            _repository.Delete(equipamentoExclui);

            return await _repository.SaveChangesAsync()
                 ? Ok("Equipamento deletado com sucesso")
                 : BadRequest("Erro ao deletar o equipamento");
        }


    }
}

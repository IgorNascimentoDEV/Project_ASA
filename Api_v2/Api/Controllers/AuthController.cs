using Api.Domain.DTOs;
using Api.Domain.Interfaces;
using Api.Domain.Models;
using Api.Servico;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IColaboradorRepository _repository;
        public AuthController(IColaboradorRepository repository, IMapper mapper)
        {
            this._repository = repository;
            this._mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Auth(string username, string password)
        {
            var VerificarColaborador = await _repository.GetColaboradorUsuarioAsync(username);

            if (VerificarColaborador == null)
            {
                return BadRequest("Usuário não existe");
            }

            if (VerificarColaborador.Senha == password)
            {
                // Aqui você pode continuar com a lógica para gerar o token, se necessário.
                var token = TokenService.GenerateToken(_repository.GetColaboradorUsuarioAsync(VerificarColaborador.Usuario));
                return Ok(token);
            }

            return BadRequest("Usuário ou senha inválidos");
        }
    }
}
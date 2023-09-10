using Api.Domain.Interfaces;
using Api.Servico;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : Controller
    {
        private readonly IColaboradorRepository _repository;
        public AuthController(IColaboradorRepository repository, IMapper mapper)
        {
            this._repository = repository;
        }
         
        [HttpPost]
        public IActionResult Auth(string username, string password)
        {

            if (username == "igor" && password == "123")
            {
                var token = TokenService.GenerateToken(_repository.GetColaboradorByMatriculaAsync(5579));
                return Ok(token);
            }

            return BadRequest("username or password invalid");
        }
    }
}
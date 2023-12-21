using Api.Domain.Models;

namespace Api.Domain.Interfaces
{
    public interface IColaboradorRepository : IBaseRepository
    {
        Task<IEnumerable<ColaboradorModel>> GetColaboradorAsync();
        Task<ColaboradorModel> GetColaboradorByIdAsync(long id);
        Task<ColaboradorModel> GetColaboradorByMatriculaAsync(long matricula);
        Task<ColaboradorModel> GetColaboradorUsuarioAsync(string usuario);
    }
}

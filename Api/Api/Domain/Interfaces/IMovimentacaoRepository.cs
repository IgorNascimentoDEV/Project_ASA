using Api.Domain.Models;

namespace Api.Domain.Interfaces
{
    public interface IMovimentacaoRepository : IBaseRepository
    {
        Task<IEnumerable<MovimentacaoModel>> GetMovimentacaoAsync();
        Task<MovimentacaoModel> GetMovimentacaoByIdAsync(long id);
    }
}

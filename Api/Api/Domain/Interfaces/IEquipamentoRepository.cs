using Api.Domain.Models;

namespace Api.Domain.Interfaces
{
    public interface IEquipamentoRepository : IBaseRepository
    {
        Task<IEnumerable<EquipamentoModel>> GetEquipamentosAsync();
        Task<EquipamentoModel> GetEquipamentoByIdAsync(int id);

    }
}

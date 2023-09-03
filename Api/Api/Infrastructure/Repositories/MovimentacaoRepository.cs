using Api.Domain.Interfaces;
using Api.Domain.Models;
using Api.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Api.Infrastructure.Repositories
{
    public class MovimentacaoRepository : BaseRepository, IMovimentacaoRepository
    {
        private readonly ApplicationDbContext _context;
        public MovimentacaoRepository(ApplicationDbContext context) : base(context)
        {
            this._context = context;
        }



        public async Task<IEnumerable<MovimentacaoModel>> GetMovimentacaoAsync()
        {
            return await _context.Movimentacoes.Include(x => x.Colaborador).Include(x => x.Equipamento).ToListAsync();
        }

        public async Task<MovimentacaoModel> GetMovimentacaoByIdAsync(long id)
        {
            return await _context.Movimentacoes.Include(x => x.Colaborador).Include(x => x.Equipamento).Where(x => x.Id == id).FirstOrDefaultAsync();
        }
    }
}

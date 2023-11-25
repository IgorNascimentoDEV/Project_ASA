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
        public async Task<List<MovimentacaoModel>> GetMovimentacoesByColaboradorIdAsync(long colaboradorId)
        {
            return await _context.Movimentacoes
                .Include(x => x.Colaborador)
                .Include(x => x.Equipamento)
                .Where(x => x.Colaborador.Matricula == colaboradorId)
                .ToListAsync();
        }
    }
}

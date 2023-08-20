using Api.Domain.Interfaces;
using Api.Domain.Models;
using Api.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Api.Infrastructure.Repositories
{
    public class ColaboradorRepository : BaseRepository, IColaboradorRepository
    {
        private readonly ApplicationDbContext _context;
        public ColaboradorRepository(ApplicationDbContext context) : base(context) 
        {
            this._context = context;
        }


        public async Task<IEnumerable<ColaboradorModel>> GetColaboradorAsync()
        {
            return await _context.Colaboradores.Include(x => x.Movimentacao).ToListAsync();
        }

        public async Task<ColaboradorModel> GetColaboradorByIdAsync(long id)
        {
            return await _context.Colaboradores.Include(x => x.Movimentacao).Where(x => x.Id == id).FirstOrDefaultAsync();
        }
    }
}

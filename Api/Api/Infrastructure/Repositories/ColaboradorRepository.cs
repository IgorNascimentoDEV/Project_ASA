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
            return await _context.Colaboradores.Include(x => x.Movimentacao).ThenInclude(m => m.Equipamento).ToListAsync();
        }

        public async Task<ColaboradorModel> GetColaboradorByIdAsync(long id)
        {
            return await _context.Colaboradores.Include(x => x.Movimentacao).ThenInclude(m => m.Equipamento).Where(x => x.Id == id).FirstOrDefaultAsync();
        }
        public async Task<ColaboradorModel> GetColaboradorByMatriculaAsync(long matricula)
        {
            return await _context.Colaboradores.Include(x => x.Movimentacao).ThenInclude(m => m.Equipamento).Where(x => x.Matricula == matricula).FirstOrDefaultAsync();
        }

        public async Task<ColaboradorModel> GetColaboradorUsuarioAsync(string usuario)
        {
            return await _context.Colaboradores
                .Where(x => x.Usuario == usuario)
                .FirstOrDefaultAsync();
        }
    }
}

﻿using Api.Domain.Interfaces;
using Api.Domain.Models;
using Api.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Api.Infrastructure.Repositories
{
    public class EquipamentoRepository : BaseRepository, IEquipamentoRepository
    {
        private readonly ApplicationDbContext _context;
        public EquipamentoRepository(ApplicationDbContext context) : base(context)
        {
            this._context = context;
        }

        public async Task<EquipamentoModel> GetEquipamentoByIdAsync(long id)
        {
            return await _context.Equipamentos.Include(x => x.Movimentacao).ThenInclude(m => m.Colaborador).Where(x => x.Id == id).FirstOrDefaultAsync();    
        }

        public async Task<EquipamentoModel> GetEquipamentoByIdentificadorAsync(string identificador)
        {
            return await _context.Equipamentos.Include(x => x.Movimentacao).ThenInclude(m => m.Colaborador).Where(x => x.Identificador == identificador).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<EquipamentoModel>> GetEquipamentosAsync()
        {
            return await _context.Equipamentos.Include(x => x.Movimentacao).ThenInclude(m => m.Colaborador).ToListAsync(); ;
        }
    }
}

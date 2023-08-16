using Microsoft.EntityFrameworkCore;
using StockHub.Domain.Models;

namespace StockHub.Infrastructure.Persistence
{
    public class ConnectionContext : DbContext
    {
        public ConnectionContext(DbContextOptions<ConnectionContext> options) : base(options) { }

        public DbSet<ColaboradorModel> Colaboradores { get; set; }
        public DbSet<EquipamentoModel> Equipamentos { get; set; }
        public DbSet<MovimentacaoModel> Movimentacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
        }
    }
}


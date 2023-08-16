using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Infrastructure.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        { }

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

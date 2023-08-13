using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockHub.Domain.Models;

namespace StockHub.Map
{
    public class MovimentacaoMap : BaseMap<MovimentacaoModel>
    {
        public MovimentacaoMap() : base("tb_movimentacao") { }
        public override void Configure(EntityTypeBuilder<MovimentacaoModel> builder)
        {
            base.Configure(builder);

            builder.ToTable("tb_movimentacao");
            builder.Property(x => x.DataMovimentacao).HasColumnName("data_movimentacao").HasColumnType("varchar(20)").IsRequired();
            builder.Property(x => x.Colaborador).HasColumnName("colaboorador").IsRequired();
            builder.Property(x => x.Equipamento).HasColumnName("equipamento").IsRequired();
            builder.Property(x => x.Tipo).HasColumnName("tipo_movimentacao").IsRequired();

            // Relacionamento com Colaborador
            builder.HasOne(x => x.Colaborador)
                .WithMany()
                .HasForeignKey(x => x.CodigoColaborador)
                .HasPrincipalKey(x => x.Matricula)
                .OnDelete(DeleteBehavior.Restrict);

            // Relacionamento com Equipamento
            builder.HasOne(x => x.Equipamento)
                .WithMany()
                .HasForeignKey(x => x.CodigoEquipamento)
                .HasPrincipalKey(x => x.IdEquipamento)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

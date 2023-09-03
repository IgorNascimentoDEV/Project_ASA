using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Map
{
    public class MovimentacaoMap : BaseMap<MovimentacaoModel>
    {
        public MovimentacaoMap() : base("tb_movimentacao") { }
        public override void Configure(EntityTypeBuilder<MovimentacaoModel> builder)
        {
            base.Configure(builder);

            builder.ToTable("tb_movimentacao");
            builder.Property(x => x.DataMovimentacao).HasColumnName("data_movimentacao").HasColumnType("varchar(20)").IsRequired();
            //builder.Property(x => x.Colaborador).HasColumnName("colaboorador").IsRequired();
            //builder.Property(x => x.Equipamento).HasColumnName("equipamento").IsRequired();
            builder.Property(x => x.Tipo).HasColumnName("tipo_movimentacao").IsRequired();

            // Relacionamento com Colaborador
            builder.Property(x => x.IdColaborador).HasColumnName("id_colaborador").IsRequired();
            builder.HasOne(x => x.Colaborador).WithMany(x => x.Movimentacao).HasForeignKey(x => x.IdColaborador);

            // Relacionamento com Equipamento
            builder.Property(x => x.IdEquipamento).HasColumnName("id_equipamento").IsRequired();
            builder.HasOne(x => x.Equipamento).WithMany(x => x.Movimentacao).HasForeignKey(x => x.IdEquipamento);
        }
    }
}

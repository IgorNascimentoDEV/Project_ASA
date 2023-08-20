using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Map
{
    public class EquipamentoMap : BaseMap<EquipamentoModel>
    {
        public EquipamentoMap() : base("tb_equipamento") { }

        public override void Configure(EntityTypeBuilder<EquipamentoModel> builder)
        {
            base.Configure(builder);

            builder.ToTable("tb_equipamento");
            builder.Property(x => x.IdEquipamento).HasColumnName("id_equipamento").HasColumnType("varchar(50)").IsRequired();
            builder.Property(x => x.Data).HasColumnName("data").HasColumnType("varchar(50)").IsRequired();
            builder.Property(x => x.Modelo).HasColumnName("modelo").HasColumnType("varchar(50)");
            builder.Property(x => x.Armazenamento).HasColumnName("armazenamento").HasColumnType("varchar(50)");
            builder.Property(x => x.MemoriaRam).HasColumnName("memoria_ram").HasColumnType("varchar(50)");
            builder.Property(x => x.Processador).HasColumnName("processador").HasColumnType("varchar(50)");
            builder.Property(x => x.Office).HasColumnName("office").HasColumnType("varchar(50)");
            builder.Property(x => x.NomeMaquina).HasColumnName("nome_maquina").HasColumnType("varchar(50)");
            builder.Property(x => x.NumeroDeSerie).HasColumnName("numero_serie").HasColumnType("varchar(50)");
            builder.Property(x => x.Linha).HasColumnName("linha").HasColumnType("varchar(50)");
            builder.Property(x => x.Emprestimo).HasColumnName("emprestimo").HasColumnType("boolean");
            builder.Property(x => x.Tipo).HasColumnName("tipo").HasColumnType("varchar(50)");
            builder.Property(x => x.Observacao).HasColumnName("observação").HasColumnType("varchar(250)");

        }

    }
}

using Api.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Map
{
    public class ColaboradorMap : BaseMap<ColaboradorModel>
    {
        public ColaboradorMap() : base("tb_colaborador") { }

        public override void Configure(EntityTypeBuilder<ColaboradorModel> builder)
        {
            base.Configure(builder);

            builder.ToTable("tb_colaborador");

            builder.Property(x => x.Setor).HasColumnName("setor").HasColumnType("varchar(50)").IsRequired();
            builder.Property(x => x.Matricula).HasColumnName("matricula").HasColumnType("int").IsRequired();
            builder.Property(x => x.Nome).HasColumnName("nome").HasColumnType("varchar(100)").IsRequired();
            builder.Property(x => x.Empresa).HasColumnName("empresa").HasColumnType("varchar(50)").IsRequired();
            builder.Property(x => x.Licenca).HasColumnName("licenca").HasColumnType("varchar(50)").IsRequired();
            builder.Property(x => x.Funcao).HasColumnName("funcao").HasColumnName("varchar(50)").IsRequired();
            builder.Property(x => x.Usuario).HasColumnName("usuario").HasColumnType("varchar(30)");
            builder.Property(x => x.Senha).HasColumnName("senha").HasColumnType("varchar(30)");
        }
    }
}

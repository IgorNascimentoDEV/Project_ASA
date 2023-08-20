﻿// <auto-generated />
using Api.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230819015824_crinadoBanco")]
    partial class crinadoBanco
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Api.Domain.Models.ColaboradorModel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Empresa")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("empresa");

                    b.Property<string>("Funcao")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("varchar(50)");

                    b.Property<string>("Licenca")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("licenca");

                    b.Property<int>("Matricula")
                        .HasColumnType("int")
                        .HasColumnName("matricula");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("nome");

                    b.Property<string>("Setor")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("setor");

                    b.HasKey("Id");

                    b.ToTable("tb_colaborador", (string)null);
                });

            modelBuilder.Entity("Api.Domain.Models.EquipamentoModel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Armazenamento")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("armazenamento");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("data");

                    b.Property<bool>("Emprestimo")
                        .HasColumnType("boolean")
                        .HasColumnName("emprestimo");

                    b.Property<string>("IdEquipamento")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("id_equipamento");

                    b.Property<string>("Linha")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("linha");

                    b.Property<string>("MemoriaRam")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("memoria_ram");

                    b.Property<string>("Modelo")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("modelo");

                    b.Property<string>("NomeMaquina")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("nome_maquina");

                    b.Property<string>("NumeroDeSerie")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("numero_serie");

                    b.Property<string>("Observacao")
                        .IsRequired()
                        .HasColumnType("varchar(250)")
                        .HasColumnName("observação");

                    b.Property<string>("Office")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("office");

                    b.Property<string>("Processador")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("processador");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("tipo");

                    b.HasKey("Id");

                    b.ToTable("tb_equipamento", (string)null);
                });

            modelBuilder.Entity("Api.Domain.Models.MovimentacaoModel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("DataMovimentacao")
                        .IsRequired()
                        .HasColumnType("varchar(20)")
                        .HasColumnName("data_movimentacao");

                    b.Property<string>("EquipamentoIdEquipamento")
                        .HasColumnType("varchar(50)");

                    b.Property<long>("IdColaborador")
                        .HasColumnType("bigint")
                        .HasColumnName("id_colaborador");

                    b.Property<long>("IdEquipamento")
                        .HasColumnType("bigint")
                        .HasColumnName("id_equipamento");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("tipo_movimentacao");

                    b.HasKey("Id");

                    b.HasIndex("EquipamentoIdEquipamento");

                    b.HasIndex("IdColaborador");

                    b.ToTable("tb_movimentacao", (string)null);
                });

            modelBuilder.Entity("Api.Domain.Models.MovimentacaoModel", b =>
                {
                    b.HasOne("Api.Domain.Models.EquipamentoModel", "Equipamento")
                        .WithMany("Movimentacao")
                        .HasForeignKey("EquipamentoIdEquipamento")
                        .HasPrincipalKey("IdEquipamento");

                    b.HasOne("Api.Domain.Models.ColaboradorModel", "Colaborado")
                        .WithMany("Movimentacao")
                        .HasForeignKey("IdColaborador")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Colaborado");

                    b.Navigation("Equipamento");
                });

            modelBuilder.Entity("Api.Domain.Models.ColaboradorModel", b =>
                {
                    b.Navigation("Movimentacao");
                });

            modelBuilder.Entity("Api.Domain.Models.EquipamentoModel", b =>
                {
                    b.Navigation("Movimentacao");
                });
#pragma warning restore 612, 618
        }
    }
}

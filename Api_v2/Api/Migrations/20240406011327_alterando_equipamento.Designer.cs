﻿// <auto-generated />
using System;
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
    [Migration("20240406011327_alterando_equipamento")]
    partial class alterando_equipamento
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
                        .HasColumnType("varchar(50)")
                        .HasColumnName("funcao");

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

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasColumnName("senha");

                    b.Property<string>("Setor")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("setor");

                    b.Property<string>("Usuario")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasColumnName("usuario");

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

                    b.Property<string>("Anydesk")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("anydesk");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("data");

                    b.Property<bool>("Emprestimo")
                        .HasColumnType("boolean")
                        .HasColumnName("emprestimo");

                    b.Property<string>("Identificador")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("identificador");

                    b.Property<string>("Linha")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("linha");

                    b.Property<string>("Modelo")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("modelo");

                    b.Property<string>("NomeMaquina")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("nome_maquina");

                    b.Property<string>("Observacao")
                        .IsRequired()
                        .HasColumnType("varchar(250)")
                        .HasColumnName("observacao");

                    b.Property<string>("Office")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("office");

                    b.Property<string>("OfficeChave")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("office_chave");

                    b.Property<int>("Patrimonio")
                        .HasColumnType("integer")
                        .HasColumnName("patrimonio");

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

                    b.Property<string>("Carregador")
                        .HasColumnType("text");

                    b.Property<string>("Chamado")
                        .HasColumnType("text");

                    b.Property<string>("DataMovimentacao")
                        .IsRequired()
                        .HasColumnType("varchar(20)")
                        .HasColumnName("data_movimentacao");

                    b.Property<long>("IdColaborador")
                        .HasColumnType("bigint")
                        .HasColumnName("id_colaborador");

                    b.Property<long>("IdEquipamento")
                        .HasColumnType("bigint")
                        .HasColumnName("id_equipamento");

                    b.Property<string>("Observacao")
                        .HasColumnType("text");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("tipo_movimentacao");

                    b.Property<float?>("ValorEquipamento")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("IdColaborador");

                    b.HasIndex("IdEquipamento");

                    b.ToTable("tb_movimentacao", (string)null);
                });

            modelBuilder.Entity("Api.Domain.Models.MovimentacaoModel", b =>
                {
                    b.HasOne("Api.Domain.Models.ColaboradorModel", "Colaborador")
                        .WithMany("Movimentacao")
                        .HasForeignKey("IdColaborador")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.Domain.Models.EquipamentoModel", "Equipamento")
                        .WithMany("Movimentacao")
                        .HasForeignKey("IdEquipamento")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Colaborador");

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

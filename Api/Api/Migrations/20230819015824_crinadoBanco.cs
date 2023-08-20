﻿using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class crinadoBanco : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tb_colaborador",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    matricula = table.Column<int>(type: "int", nullable: false),
                    nome = table.Column<string>(type: "varchar(100)", nullable: false),
                    empresa = table.Column<string>(type: "varchar(50)", nullable: false),
                    licenca = table.Column<string>(type: "varchar(50)", nullable: false),
                    varchar50 = table.Column<string>(name: "varchar(50)", type: "text", nullable: false),
                    setor = table.Column<string>(type: "varchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_colaborador", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tb_equipamento",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_equipamento = table.Column<string>(type: "varchar(50)", nullable: false),
                    data = table.Column<string>(type: "varchar(50)", nullable: false),
                    modelo = table.Column<string>(type: "varchar(50)", nullable: false),
                    armazenamento = table.Column<string>(type: "varchar(50)", nullable: false),
                    memoria_ram = table.Column<string>(type: "varchar(50)", nullable: false),
                    processador = table.Column<string>(type: "varchar(50)", nullable: false),
                    office = table.Column<string>(type: "varchar(50)", nullable: false),
                    nome_maquina = table.Column<string>(type: "varchar(50)", nullable: false),
                    numero_serie = table.Column<string>(type: "varchar(50)", nullable: false),
                    linha = table.Column<string>(type: "varchar(50)", nullable: false),
                    emprestimo = table.Column<bool>(type: "boolean", nullable: false),
                    tipo = table.Column<string>(type: "varchar(50)", nullable: false),
                    observação = table.Column<string>(type: "varchar(250)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_equipamento", x => x.id);
                    table.UniqueConstraint("AK_tb_equipamento_id_equipamento", x => x.id_equipamento);
                });

            migrationBuilder.CreateTable(
                name: "tb_movimentacao",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    data_movimentacao = table.Column<string>(type: "varchar(20)", nullable: false),
                    EquipamentoIdEquipamento = table.Column<string>(type: "varchar(50)", nullable: true),
                    tipo_movimentacao = table.Column<string>(type: "text", nullable: false),
                    id_colaborador = table.Column<long>(type: "bigint", nullable: false),
                    id_equipamento = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_movimentacao", x => x.id);
                    table.ForeignKey(
                        name: "FK_tb_movimentacao_tb_colaborador_id_colaborador",
                        column: x => x.id_colaborador,
                        principalTable: "tb_colaborador",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_movimentacao_tb_equipamento_EquipamentoIdEquipamento",
                        column: x => x.EquipamentoIdEquipamento,
                        principalTable: "tb_equipamento",
                        principalColumn: "id_equipamento");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tb_movimentacao_EquipamentoIdEquipamento",
                table: "tb_movimentacao",
                column: "EquipamentoIdEquipamento");

            migrationBuilder.CreateIndex(
                name: "IX_tb_movimentacao_id_colaborador",
                table: "tb_movimentacao",
                column: "id_colaborador");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tb_movimentacao");

            migrationBuilder.DropTable(
                name: "tb_colaborador");

            migrationBuilder.DropTable(
                name: "tb_equipamento");
        }
    }
}

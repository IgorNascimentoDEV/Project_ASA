using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class adicionandomovimentacao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Carregador",
                table: "tb_movimentacao",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Chamado",
                table: "tb_movimentacao",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Observacao",
                table: "tb_movimentacao",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "ValorEquipamento",
                table: "tb_movimentacao",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Carregador",
                table: "tb_movimentacao");

            migrationBuilder.DropColumn(
                name: "Chamado",
                table: "tb_movimentacao");

            migrationBuilder.DropColumn(
                name: "Observacao",
                table: "tb_movimentacao");

            migrationBuilder.DropColumn(
                name: "ValorEquipamento",
                table: "tb_movimentacao");
        }
    }
}

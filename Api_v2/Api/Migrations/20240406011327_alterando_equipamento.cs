using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class alterando_equipamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "armazenamento",
                table: "tb_equipamento");

            migrationBuilder.RenameColumn(
                name: "processador",
                table: "tb_equipamento",
                newName: "office_chave");

            migrationBuilder.RenameColumn(
                name: "memoria_ram",
                table: "tb_equipamento",
                newName: "anydesk");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "office_chave",
                table: "tb_equipamento",
                newName: "processador");

            migrationBuilder.RenameColumn(
                name: "anydesk",
                table: "tb_equipamento",
                newName: "memoria_ram");

            migrationBuilder.AddColumn<string>(
                name: "armazenamento",
                table: "tb_equipamento",
                type: "varchar(50)",
                nullable: false,
                defaultValue: "");
        }
    }
}

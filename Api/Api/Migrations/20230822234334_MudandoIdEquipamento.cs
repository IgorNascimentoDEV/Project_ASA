using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class MudandoIdEquipamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tb_movimentacao_tb_equipamento_EquipamentoIdEquipamento",
                table: "tb_movimentacao");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_tb_equipamento_id_equipamento",
                table: "tb_equipamento");

            migrationBuilder.RenameColumn(
                name: "EquipamentoIdEquipamento",
                table: "tb_movimentacao",
                newName: "EquipamentoIdentificador");

            migrationBuilder.RenameIndex(
                name: "IX_tb_movimentacao_EquipamentoIdEquipamento",
                table: "tb_movimentacao",
                newName: "IX_tb_movimentacao_EquipamentoIdentificador");

            migrationBuilder.RenameColumn(
                name: "id_equipamento",
                table: "tb_equipamento",
                newName: "identificador");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_tb_equipamento_identificador",
                table: "tb_equipamento",
                column: "identificador");

            migrationBuilder.AddForeignKey(
                name: "FK_tb_movimentacao_tb_equipamento_EquipamentoIdentificador",
                table: "tb_movimentacao",
                column: "EquipamentoIdentificador",
                principalTable: "tb_equipamento",
                principalColumn: "identificador");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tb_movimentacao_tb_equipamento_EquipamentoIdentificador",
                table: "tb_movimentacao");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_tb_equipamento_identificador",
                table: "tb_equipamento");

            migrationBuilder.RenameColumn(
                name: "EquipamentoIdentificador",
                table: "tb_movimentacao",
                newName: "EquipamentoIdEquipamento");

            migrationBuilder.RenameIndex(
                name: "IX_tb_movimentacao_EquipamentoIdentificador",
                table: "tb_movimentacao",
                newName: "IX_tb_movimentacao_EquipamentoIdEquipamento");

            migrationBuilder.RenameColumn(
                name: "identificador",
                table: "tb_equipamento",
                newName: "id_equipamento");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_tb_equipamento_id_equipamento",
                table: "tb_equipamento",
                column: "id_equipamento");

            migrationBuilder.AddForeignKey(
                name: "FK_tb_movimentacao_tb_equipamento_EquipamentoIdEquipamento",
                table: "tb_movimentacao",
                column: "EquipamentoIdEquipamento",
                principalTable: "tb_equipamento",
                principalColumn: "id_equipamento");
        }
    }
}

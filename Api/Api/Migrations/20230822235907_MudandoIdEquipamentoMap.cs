using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class MudandoIdEquipamentoMap : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tb_movimentacao_tb_equipamento_EquipamentoIdentificador",
                table: "tb_movimentacao");

            migrationBuilder.DropIndex(
                name: "IX_tb_movimentacao_EquipamentoIdentificador",
                table: "tb_movimentacao");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_tb_equipamento_identificador",
                table: "tb_equipamento");

            migrationBuilder.DropColumn(
                name: "EquipamentoIdentificador",
                table: "tb_movimentacao");

            migrationBuilder.CreateIndex(
                name: "IX_tb_movimentacao_id_equipamento",
                table: "tb_movimentacao",
                column: "id_equipamento");

            migrationBuilder.AddForeignKey(
                name: "FK_tb_movimentacao_tb_equipamento_id_equipamento",
                table: "tb_movimentacao",
                column: "id_equipamento",
                principalTable: "tb_equipamento",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tb_movimentacao_tb_equipamento_id_equipamento",
                table: "tb_movimentacao");

            migrationBuilder.DropIndex(
                name: "IX_tb_movimentacao_id_equipamento",
                table: "tb_movimentacao");

            migrationBuilder.AddColumn<string>(
                name: "EquipamentoIdentificador",
                table: "tb_movimentacao",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_tb_equipamento_identificador",
                table: "tb_equipamento",
                column: "identificador");

            migrationBuilder.CreateIndex(
                name: "IX_tb_movimentacao_EquipamentoIdentificador",
                table: "tb_movimentacao",
                column: "EquipamentoIdentificador");

            migrationBuilder.AddForeignKey(
                name: "FK_tb_movimentacao_tb_equipamento_EquipamentoIdentificador",
                table: "tb_movimentacao",
                column: "EquipamentoIdentificador",
                principalTable: "tb_equipamento",
                principalColumn: "identificador");
        }
    }
}

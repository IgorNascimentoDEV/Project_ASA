namespace StockHub.Domain.DTOs
{
    public record MovimentacaoRecordDto(
        string DataMovimentacao,
        long CodigoColaborador,
        long CodigoEquipamento,
        string Tipo
    );
}

namespace StockHubAPI.Dtos
{
    public record EquipamentoRecordDto(
        long IdEquipamento,
        string Data,
        string Modelo,
        string Armazenamento,
        string MemoriaRam,
        string Processador,
        string Office,
        string NomeMaquina,
        string NumeroDeSerie,
        string Linha,
        bool Emprestimo,
        string Tipo,
        string Observacao
    );
}
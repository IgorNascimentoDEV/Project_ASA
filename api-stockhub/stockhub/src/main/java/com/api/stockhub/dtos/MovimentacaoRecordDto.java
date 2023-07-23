package com.api.stockhub.dtos;

public record MovimentacaoRecordDto(String dataMovimentacao, Long codigoColaborador, Long codigoEquipamento, String tipo) {
}

package com.api.stockhub.dtos;

public record EquipamentoRecordDto(Long idEquipamento,String data, String modelo, String armazenamento,
		String memoriaRam, String processador, String office, String nomeMaquina, String numeroDeSerie, String linha,
		 boolean emprestimo,String tipo, String observacao) {

}

package com.api.stockhub.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ColaboradorRecordDto( Long matricula, @NotBlank String nome, @NotBlank String empresa,
		@NotBlank String licenca, @NotBlank String funcao, @NotBlank String setor) {

}

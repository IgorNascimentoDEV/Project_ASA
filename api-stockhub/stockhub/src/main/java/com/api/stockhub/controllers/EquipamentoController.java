package com.api.stockhub.controllers;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.stockhub.dtos.EquipamentoRecordDto;
import com.api.stockhub.models.EquipamentoModel;
import com.api.stockhub.repositories.EquipamentoRepository;

import jakarta.validation.Valid;

@RestController
public class EquipamentoController {

	@Autowired
	EquipamentoRepository equipamentoRepository;

	@PostMapping("/equipamentos")
	public ResponseEntity<EquipamentoModel> saveEquipamento(
			@RequestBody @Valid EquipamentoRecordDto equipamentoRecordDto) {

		var equipamentoModel = new EquipamentoModel();
		BeanUtils.copyProperties(equipamentoRecordDto, equipamentoModel);
		return ResponseEntity.status(HttpStatus.CREATED).body(equipamentoRepository.save(equipamentoModel));
	}

	@GetMapping("/equipamentos")
	public ResponseEntity<List<EquipamentoModel>> getAllEquipamentos() {
		return ResponseEntity.status(HttpStatus.OK).body(equipamentoRepository.findAll());
	}
}

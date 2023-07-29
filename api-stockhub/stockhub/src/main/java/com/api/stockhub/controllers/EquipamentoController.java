package com.api.stockhub.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.stockhub.dtos.ColaboradorRecordDto;
import com.api.stockhub.dtos.EquipamentoRecordDto;
import com.api.stockhub.models.ColaboradorModel;
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

	@GetMapping("/equipamentos/{id}")
	public ResponseEntity<Object> getOneEquipamento(@PathVariable(value = "id") Long id) {
		Optional<EquipamentoModel> equipamento0 = equipamentoRepository.findById(id);
		if (equipamento0.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("equipamento não encontardo");
		}
		return ResponseEntity.status(HttpStatus.OK).body(equipamento0.get());
	}

	@PutMapping("/equipamentos/{id}")
	public ResponseEntity<Object> updateEquipamento(@PathVariable(value = "id") Long id,
			@RequestBody @Valid EquipamentoRecordDto equipamentoRecordDto) {

		Optional<EquipamentoModel> equipamento0 = equipamentoRepository.findById(id);
		if (equipamento0.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Equipamento não encontrado");
		}
		var equipamentoModel = equipamento0.get();
		BeanUtils.copyProperties(equipamentoRecordDto, equipamentoModel);
		return ResponseEntity.status(HttpStatus.OK).body(equipamentoRepository.save(equipamentoModel));
	}

	@DeleteMapping("/equipamentos/{id}")
	public ResponseEntity<Object> deleteEquipamento(@PathVariable(value = "id") Long id) {
		Optional<EquipamentoModel> equipamento0 = equipamentoRepository.findById(id);
		if (equipamento0.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Equipamento não encontrado");
		}
		equipamentoRepository.delete(equipamento0.get());
		return ResponseEntity.status(HttpStatus.OK).body("Equipamento deletado do sistema");
	}

}

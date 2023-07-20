package com.api.stockhub.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.stockhub.dtos.ColaboradorRecordDto;
import com.api.stockhub.models.ColaboradorModel;
import com.api.stockhub.repositories.ColaboradorRepository;

import jakarta.validation.Valid;

@RestController
public class ColaboradorController {

	@Autowired
	ColaboradorRepository colaboradorRepository;

	@PostMapping("/colaboradores")
	public ResponseEntity<ColaboradorModel> saveColaborador(
			@RequestBody @Valid ColaboradorRecordDto colaboradorRecordDto) {
		var colaboradorModel = new ColaboradorModel();
		BeanUtils.copyProperties(colaboradorRecordDto, colaboradorModel);
		return ResponseEntity.status(HttpStatus.CREATED).body(colaboradorRepository.save(colaboradorModel));
	}

	@GetMapping("/colaboradores")
	public ResponseEntity<List<ColaboradorModel>> getAllColaboradores() {
		return ResponseEntity.status(HttpStatus.OK).body(colaboradorRepository.findAll());
	}

	@GetMapping("/colaboradores/{id}")
	public ResponseEntity<Object> getOneColaborador(@PathVariable(value = "id") Long id) {
		Optional<ColaboradorModel> colaborador0 = colaboradorRepository.findById(id);
		if (colaborador0.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Colaborador não encontrado");
		}
		return ResponseEntity.status(HttpStatus.OK).body(colaborador0.get());
	}

	@PutMapping("/colaboradores/{id}")
	public ResponseEntity<Object> updateColaborador(@PathVariable(value = "id") Long id,
			@RequestBody @Valid ColaboradorRecordDto colaboradorRecordDto) {
		
		Optional<ColaboradorModel> colaborador0 = colaboradorRepository.findById(id);
		if (colaborador0.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Colaborador não encontrado");
		}
		var colaboradorModel = colaborador0.get();
		BeanUtils.copyProperties(colaboradorRecordDto, colaboradorModel);
		return ResponseEntity.status(HttpStatus.OK).body(colaboradorRepository.save(colaboradorModel));
	}
	
	@DeleteMapping("/colaboradores/{id}")
	public ResponseEntity<Object> deleteColaborador(@PathVariable(value="id") Long id) {
		Optional<ColaboradorModel> colaborador0 = colaboradorRepository.findById(id);
		if (colaborador0.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Colaborador não encontrado");
		}
		colaboradorRepository.delete(colaborador0.get());
		return ResponseEntity.status(HttpStatus.OK).body("Colaborador deletado do sistema");
	}

}
